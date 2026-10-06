/**
 * Real photos for the fence proposal pages (/for/<slug>), from each company's Google Business
 * Profile through Places API (New).
 *
 * Calls per page view: one Place Details request with the field mask `photos` (SKU "Place
 * Details Essentials (IDs Only)", no charge) and up to PHOTO_SLOTS Place Photos requests (SKU
 * "Place Details Photos": 1,000 free a month, then $7 per 1,000).
 * Cost guard: Place Photos requests stop at PLACE_PHOTOS_MONTHLY_CAP (default 900) per calendar
 * month, counted in place_photo_usage (outbound Postgres; in memory when there's no database).
 * Google's own quota on the bartlett-crm project is the hard stop behind it: 32 photo requests
 * a day, so at most 992 in a month.
 * Google policy: only place IDs may be stored, so photo names and photo URLs are fetched fresh
 * for every view and never cached here. Each photo shown must credit its author and link to the
 * photo on Google Maps.
 * Env: GOOGLE_PLACES_API_KEY (server key, restricted to Places API (New) and the server's IP).
 */
import type { Prospect } from "@/app/for/prospects";
import { db } from "@/lib/lead-store";

/** 4 service cards and 3 upgrade cards on each page. */
export const PHOTO_SLOTS = 7;
/** Widest card is about 390 CSS px; 800 covers a 2x screen. */
export const PHOTO_MAX_WIDTH = 800;
export const DEFAULT_MONTHLY_CAP = 900;
const API = "https://places.googleapis.com/v1";
const TIMEOUT_MS = 4_000;
/** Smaller than this on the short side looks soft in a 210 px tall card. */
const MIN_SIDE_PX = 400;
/** Wider or taller than 3:1 is a banner, not a job photo. */
const MAX_ASPECT = 3;

export type GooglePhoto = {
  name?: string;
  widthPx?: number;
  heightPx?: number;
  authorAttributions?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  }[];
  googleMapsUri?: string;
};

/** What the page needs to show one photo with its required credit. */
export type ShownPhoto = {
  src: string;
  width: number;
  height: number;
  /** Uploaded by the business itself rather than a customer. */
  owner: boolean;
  author: { name: string; uri: string | null; avatar: string | null } | null;
  /** This photo on Google Maps. */
  mapsUri: string | null;
};

export type PhotoResult =
  | { ok: true; photos: ShownPhoto[] }
  | { ok: false; reason: "no-key" | "cap" | "error" };

export type PhotoUsage = {
  /** Claims up to `n` photo requests under `cap` for this month; returns how many were granted. */
  reserve: (n: number, cap: number) => Promise<number>;
};

export type PhotoDeps = {
  apiKey: string | undefined;
  fetch: typeof fetch;
  usage: PhotoUsage;
  monthlyCap: number;
};

/** The place ID in a Google Maps place URL's `!19s<placeId>` segment, or null. */
export function placeIdFromMapsUrl(url: string): string | null {
  return url.match(/!19s(ChIJ[A-Za-z0-9_-]+)/)?.[1] ?? null;
}

/** The business name in a Google Maps place URL (/maps/place/<name>/...). */
function mapsName(url: string): string | null {
  const m = url.match(/\/maps\/place\/([^/]+)\//);
  if (!m) return null;
  try {
    return decodeURIComponent(m[1].replace(/\+/g, " "));
  } catch {
    return null;
  }
}

// Words that don't tell two businesses apart: "Westgate Fencing" posts as "Westgate Construction".
const GENERIC = new Set([
  "llc",
  "inc",
  "co",
  "company",
  "corp",
  "the",
  "and",
  "service",
  "services",
  "fence",
  "fences",
  "fencing",
  "construction",
  "solutions",
  "contractor",
  "contractors",
]);
const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const core = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !GENERIC.has(w))
    .join("");

/** Whether a photo's author is the business itself, under any of its names. */
export function isBusinessAuthor(author: string, names: string[]): boolean {
  const a = compact(author);
  const ac = core(author);
  return names.some(
    (n) =>
      (a.length >= 3 && a === compact(n)) || (ac.length >= 3 && ac === core(n)),
  );
}

export function businessNames(p: Prospect): string[] {
  const fromMaps = mapsName(p.googleProfile);
  return [p.name, p.shortName, ...(fromMaps ? [fromMaps] : [])];
}

const PHOTO_NAME = /^places\/[A-Za-z0-9_-]+\/photos\/[A-Za-z0-9_-]+$/;

/**
 * The photos to show, best first: the company's own uploads before customer photos, landscape
 * before portrait (every card is wider than tall), Google's order otherwise. Drops small images,
 * banners and the sizes listed in `photoSkipSizes` (logos and graphics, checked by hand).
 */
export function choosePhotos(
  photos: GooglePhoto[],
  p: Prospect,
): GooglePhoto[] {
  const names = businessNames(p);
  const skip = new Set(p.photoSkipSizes ?? []);
  const score = (ph: GooglePhoto) => {
    const author = ph.authorAttributions?.[0]?.displayName ?? "";
    const owner = isBusinessAuthor(author, names);
    return (owner ? 0 : 2) + ((ph.widthPx ?? 0) >= (ph.heightPx ?? 0) ? 0 : 1);
  };
  return photos
    .filter((ph) => {
      const w = ph.widthPx ?? 0;
      const h = ph.heightPx ?? 0;
      return (
        typeof ph.name === "string" &&
        PHOTO_NAME.test(ph.name) &&
        Math.min(w, h) >= MIN_SIDE_PX &&
        Math.max(w / h, h / w) <= MAX_ASPECT &&
        !skip.has(`${w}x${h}`)
      );
    })
    .map((ph, i) => ({ ph, i, s: score(ph) }))
    .sort((a, b) => a.s - b.s || a.i - b.i)
    .slice(0, PHOTO_SLOTS)
    .map(({ ph }) => ph);
}

const IMAGE_HOST = /(^|\.)googleusercontent\.com$/;
const MAPS_HOST = /^((www|maps)\.)?google\.com$|^maps\.app\.goo\.gl$/;

/** An https URL on an allowed host (Google returns some as "//host/path"), or null. */
export function safeUrl(raw: string | undefined, host: RegExp): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw.startsWith("//") ? `https:${raw}` : raw);
    return u.protocol === "https:" && host.test(u.hostname)
      ? u.toString()
      : null;
  } catch {
    return null;
  }
}

function shown(ph: GooglePhoto, src: string, names: string[]): ShownPhoto {
  const a = ph.authorAttributions?.[0];
  const authorName = a?.displayName?.trim();
  return {
    src,
    width: ph.widthPx ?? 0,
    height: ph.heightPx ?? 0,
    owner: authorName ? isBusinessAuthor(authorName, names) : false,
    author: authorName
      ? {
          name: authorName.slice(0, 80),
          uri: safeUrl(a?.uri, MAPS_HOST),
          avatar: safeUrl(a?.photoUri, IMAGE_HOST),
        }
      : null,
    mapsUri: safeUrl(ph.googleMapsUri, MAPS_HOST),
  };
}

export async function placePhotos(
  p: Prospect,
  deps: PhotoDeps,
): Promise<PhotoResult> {
  if (!deps.apiKey) return { ok: false, reason: "no-key" };
  const headers = { "X-Goog-Api-Key": deps.apiKey };

  let candidates: GooglePhoto[];
  try {
    const res = await deps.fetch(`${API}/places/${p.placeId}`, {
      headers: { ...headers, "X-Goog-FieldMask": "photos" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`Place photos: details HTTP ${res.status} for ${p.slug}.`);
      return { ok: false, reason: "error" };
    }
    const data = (await res.json()) as { photos?: GooglePhoto[] };
    candidates = choosePhotos(Array.isArray(data.photos) ? data.photos : [], p);
  } catch (err) {
    console.error(
      `Place photos: details failed for ${p.slug} (${err instanceof Error ? err.name : "unknown"}).`,
    );
    return { ok: false, reason: "error" };
  }
  if (candidates.length === 0) return { ok: true, photos: [] };

  let granted: number;
  try {
    granted = await deps.usage.reserve(candidates.length, deps.monthlyCap);
  } catch {
    return { ok: false, reason: "error" };
  }
  if (granted <= 0) return { ok: false, reason: "cap" };

  const names = businessNames(p);
  const results = await Promise.all(
    candidates.slice(0, granted).map(async (ph) => {
      try {
        const res = await deps.fetch(
          `${API}/${ph.name}/media?maxWidthPx=${PHOTO_MAX_WIDTH}&skipHttpRedirect=true`,
          { headers, signal: AbortSignal.timeout(TIMEOUT_MS) },
        );
        if (!res.ok) {
          console.error(
            `Place photos: media HTTP ${res.status} for ${p.slug}.`,
          );
          return null;
        }
        const body = (await res.json()) as { photoUri?: string };
        const src = safeUrl(body.photoUri, IMAGE_HOST);
        return src ? shown(ph, src, names) : null;
      } catch {
        return null;
      }
    }),
  );
  const photos = results.filter((r): r is ShownPhoto => r !== null);
  return photos.length ? { ok: true, photos } : { ok: false, reason: "error" };
}

const month = () => new Date().toISOString().slice(0, 7);

/** A fresh in-memory counter; the app shares one, tests make their own. */
export function memoryPhotoUsage(): PhotoUsage {
  const state = { month: month(), calls: 0 };
  return {
    async reserve(n, cap) {
      if (state.month !== month())
        Object.assign(state, { month: month(), calls: 0 });
      const granted = Math.max(0, Math.min(n, cap - state.calls));
      state.calls += granted;
      return granted;
    },
  };
}

const memory = memoryPhotoUsage();
let ready: Promise<unknown> | null = null;

/** place_photo_usage when the database is reachable, falling back to memory per call. */
export function photoUsage(): PhotoUsage {
  const s = db();
  if (!s) return memory;
  const ensure = () =>
    (ready ??= s`
      create table if not exists place_photo_usage (
        month text primary key,
        calls int not null default 0
      )`.catch((err) => {
      ready = null;
      throw err;
    }));
  return {
    async reserve(n, cap) {
      try {
        await ensure();
        const m = month();
        return await s.begin(async (tx) => {
          await tx`insert into place_photo_usage (month) values (${m}) on conflict (month) do nothing`;
          const [row] = await tx<{ calls: number }[]>`
            select calls from place_photo_usage where month = ${m} for update`;
          const granted = Math.max(0, Math.min(n, cap - Number(row.calls)));
          if (granted > 0)
            await tx`update place_photo_usage set calls = calls + ${granted} where month = ${m}`;
          return granted;
        });
      } catch {
        return memory.reserve(n, cap);
      }
    },
  };
}

export function defaultPhotoDeps(): PhotoDeps {
  const cap = Number(process.env.PLACE_PHOTOS_MONTHLY_CAP);
  return {
    apiKey: process.env.GOOGLE_PLACES_API_KEY?.trim(),
    fetch,
    usage: photoUsage(),
    monthlyCap: cap > 0 ? cap : DEFAULT_MONTHLY_CAP,
  };
}
