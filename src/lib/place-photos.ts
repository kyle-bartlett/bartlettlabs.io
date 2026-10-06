/**
 * Real photos for the fence proposal pages (/for/<slug>), from each company's Google Business
 * Profile through Places API (New).
 *
 * Calls per page view: one Place Details request with the field mask `photos` (SKU "Place
 * Details Essentials (IDs Only)", no charge) and up to PHOTO_SLOTS Place Photos requests (SKU
 * "Place Details Photos": 1,000 free a month per billing account, then $7 per 1,000).
 * Cost guard: Place Photos requests stop at PLACE_PHOTOS_MONTHLY_CAP (default and ceiling 900)
 * per billing month and PLACE_PHOTOS_DAILY_CAP (default 100) per day, both in Pacific time like
 * Google's invoice and quotas, counted in place_photo_usage and place_photo_daily (outbound
 * Postgres). The counters are claimed before any Google call. If they can't be read or written,
 * the page gets no Google calls at all and keeps its stock images; in production there is no
 * in-memory fallback. Google's quota override on bartlett-crm (100 a day) was not enforced on
 * 2026-10-05 (163 requests went through), so these counters are the real guard.
 * Google policy: only place IDs may be stored, so photo names and photo URLs are fetched fresh
 * for every view and never cached here. A photo is shown only with its own googleMapsUri and
 * every author Google credits for it.
 * Env: GOOGLE_PLACES_API_KEY (server key, restricted to Places API (New) and the server's IP).
 */
import type { Prospect } from "@/app/for/prospects";
import { db } from "@/lib/lead-store";

/** One row of the "Photos from your Google profile" gallery. Also the most a view can cost. */
export const PHOTO_SLOTS = 4;
/** A gallery tile is under 300 CSS px wide; 800 covers a 2x screen. */
export const PHOTO_MAX_WIDTH = 800;
/** Under the 1,000 free a month, leaving room for requests made outside the app. */
export const DEFAULT_MONTHLY_CAP = 900;
/** 25 full page views a day, so one busy day can't spend the month. */
export const DEFAULT_DAILY_CAP = 100;
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

export type PhotoAuthor = {
  name: string;
  /** The author's Google Maps profile. */
  uri: string | null;
  avatar: string | null;
};

/** What the page needs to show one photo with its required credit. */
export type ShownPhoto = {
  src: string;
  width: number;
  height: number;
  /** Uploaded by the business itself rather than a customer. */
  owner: boolean;
  /** Every author Google credits for this photo, in Google's order. Never empty. */
  authors: PhotoAuthor[];
  /** This photo on Google Maps. Photos without one are never shown. */
  mapsUri: string;
};

export type PhotoResult =
  | { ok: true; photos: ShownPhoto[] }
  | { ok: false; reason: "no-key" | "cap" | "error" };

/** The Pacific billing month and day a claim was counted against. */
export type BillingPeriod = { month: string; day: string };

export type PhotoUsage = {
  /**
   * Claims up to `n` photo requests under `monthCap` for the billing month and `dayCap` for
   * the day in `at` (default: now); returns how many were granted. Throws when a counter
   * can't be read or written.
   */
  reserve: (
    n: number,
    monthCap: number,
    dayCap?: number,
    at?: BillingPeriod,
  ) => Promise<number>;
  /**
   * Hands back `n` unused requests to the period they were claimed in, so a claim made just
   * before Pacific midnight never frees budget in the next day or month.
   */
  release: (n: number, at?: BillingPeriod) => Promise<void>;
};

export type PhotoDeps = {
  apiKey: string | undefined;
  fetch: typeof fetch;
  usage: PhotoUsage;
  monthlyCap: number;
  dailyCap?: number;
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

/** Every named author Google credits for a photo, names in full. */
export function photoAuthors(ph: GooglePhoto): PhotoAuthor[] {
  return (ph.authorAttributions ?? []).flatMap((a) => {
    const name = a?.displayName?.trim();
    return name
      ? [
          {
            name,
            uri: safeUrl(a.uri, MAPS_HOST),
            avatar: safeUrl(a.photoUri, IMAGE_HOST),
          },
        ]
      : [];
  });
}

/**
 * The photos to show, best first: the company's own uploads before customer photos, landscape
 * before portrait, Google's order otherwise. Drops small images, banners, the sizes listed in
 * `photoSkipSizes` (logos and graphics, checked by hand), and any photo that can't carry its
 * full credit: no named author, or no link of its own on Google Maps.
 */
export function choosePhotos(
  photos: GooglePhoto[],
  p: Prospect,
): GooglePhoto[] {
  const names = businessNames(p);
  const skip = new Set(p.photoSkipSizes ?? []);
  const score = (ph: GooglePhoto) => {
    const owner = photoAuthors(ph).some((a) => isBusinessAuthor(a.name, names));
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
        !skip.has(`${w}x${h}`) &&
        safeUrl(ph.googleMapsUri, MAPS_HOST) !== null &&
        photoAuthors(ph).length > 0
      );
    })
    .map((ph, i) => ({ ph, i, s: score(ph) }))
    .sort((a, b) => a.s - b.s || a.i - b.i)
    .slice(0, PHOTO_SLOTS)
    .map(({ ph }) => ph);
}

function shown(ph: GooglePhoto, src: string, names: string[]): ShownPhoto {
  const authors = photoAuthors(ph);
  return {
    src,
    width: ph.widthPx ?? 0,
    height: ph.heightPx ?? 0,
    owner: authors.some((a) => isBusinessAuthor(a.name, names)),
    authors,
    // choosePhotos only passes photos that have one.
    mapsUri: safeUrl(ph.googleMapsUri, MAPS_HOST) ?? "",
  };
}

export async function placePhotos(
  p: Prospect,
  deps: PhotoDeps,
): Promise<PhotoResult> {
  if (!deps.apiKey) return { ok: false, reason: "no-key" };
  const headers = { "X-Goog-Api-Key": deps.apiKey };

  // Claim the budget before touching Google: no counter, no Google calls.
  const period = billingPeriod();
  let granted: number;
  try {
    granted = await deps.usage.reserve(
      PHOTO_SLOTS,
      deps.monthlyCap,
      deps.dailyCap ?? Infinity,
      period,
    );
  } catch (err) {
    console.error(
      `Place photos: usage counter unavailable, no Google calls for ${p.slug} (${err instanceof Error ? err.message : "unknown"}).`,
    );
    return { ok: false, reason: "error" };
  }
  if (granted <= 0) return { ok: false, reason: "cap" };

  const giveBack = async (n: number) => {
    if (n <= 0) return;
    try {
      await deps.usage.release(n, period);
    } catch {
      // The counter stays a little high, which only errs on the safe side.
    }
  };

  let candidates: GooglePhoto[];
  try {
    const res = await deps.fetch(`${API}/places/${p.placeId}`, {
      headers: { ...headers, "X-Goog-FieldMask": "photos" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`Place photos: details HTTP ${res.status} for ${p.slug}.`);
      await giveBack(granted);
      return { ok: false, reason: "error" };
    }
    const data = (await res.json()) as { photos?: GooglePhoto[] };
    candidates = choosePhotos(
      Array.isArray(data.photos) ? data.photos : [],
      p,
    ).slice(0, granted);
  } catch (err) {
    console.error(
      `Place photos: details failed for ${p.slug} (${err instanceof Error ? err.name : "unknown"}).`,
    );
    await giveBack(granted);
    return { ok: false, reason: "error" };
  }
  await giveBack(granted - candidates.length);
  if (candidates.length === 0) return { ok: true, photos: [] };

  const names = businessNames(p);
  const results = await Promise.all(
    candidates.map(async (ph) => {
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

const PACIFIC_DATE = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** "YYYY-MM-DD" in Pacific time: Google bills by Pacific month and resets quotas at Pacific midnight. */
export function billingDay(d = new Date()): string {
  const parts = PACIFIC_DATE.formatToParts(d);
  const get = (t: string) => parts.find((x) => x.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** "YYYY-MM" in Pacific time. */
export function billingMonth(d = new Date()): string {
  return billingDay(d).slice(0, 7);
}

export function billingPeriod(d = new Date()): BillingPeriod {
  const day = billingDay(d);
  return { month: day.slice(0, 7), day };
}

/** A fresh in-memory counter, for tests and local development only. */
export function memoryPhotoUsage(): PhotoUsage {
  const state = { month: billingMonth(), day: billingDay(), m: 0, d: 0 };
  const roll = () => {
    if (state.month !== billingMonth())
      Object.assign(state, { month: billingMonth(), m: 0 });
    if (state.day !== billingDay())
      Object.assign(state, { day: billingDay(), d: 0 });
  };
  return {
    async reserve(n, monthCap, dayCap = Infinity) {
      roll();
      const granted = Math.max(
        0,
        Math.min(n, monthCap - state.m, dayCap - state.d),
      );
      state.m += granted;
      state.d += granted;
      return granted;
    },
    async release(n, at = billingPeriod()) {
      roll();
      if (at.month === state.month) state.m = Math.max(0, state.m - n);
      if (at.day === state.day) state.d = Math.max(0, state.d - n);
    },
  };
}

/** Production without a database: every claim fails, so no Google call is ever made. */
const closedUsage: PhotoUsage = {
  async reserve() {
    throw new Error("LEADS_DATABASE_URL is not set");
  },
  async release() {},
};

const devMemory = memoryPhotoUsage();
let ready: Promise<unknown> | null = null;

/**
 * The counters in place_photo_usage (per month) and place_photo_daily (per day). Database
 * errors are thrown, never papered over: placePhotos treats them as "no Google calls". Only
 * outside production (tests, `next dev`) does a missing database fall back to a per-process
 * counter.
 */
export function photoUsage(): PhotoUsage {
  const s = db();
  if (!s)
    return process.env.NODE_ENV === "production" ? closedUsage : devMemory;
  const ensure = () =>
    (ready ??= (async () => {
      await s`
        create table if not exists place_photo_usage (
          month text primary key,
          calls int not null default 0
        )`;
      await s`
        create table if not exists place_photo_daily (
          day text primary key,
          calls int not null default 0
        )`;
    })().catch((err) => {
      ready = null;
      throw err;
    }));
  return {
    async reserve(n, monthCap, dayCap = Infinity, at = billingPeriod()) {
      await ensure();
      const { month: m, day: d } = at;
      return s.begin(async (tx) => {
        await tx`insert into place_photo_usage (month) values (${m}) on conflict (month) do nothing`;
        await tx`insert into place_photo_daily (day) values (${d}) on conflict (day) do nothing`;
        const [month] = await tx<{ calls: number }[]>`
          select calls from place_photo_usage where month = ${m} for update`;
        const [day] = await tx<{ calls: number }[]>`
          select calls from place_photo_daily where day = ${d} for update`;
        const granted = Math.max(
          0,
          Math.min(
            n,
            monthCap - Number(month.calls),
            dayCap - Number(day.calls),
          ),
        );
        if (granted > 0) {
          await tx`update place_photo_usage set calls = calls + ${granted} where month = ${m}`;
          await tx`update place_photo_daily set calls = calls + ${granted} where day = ${d}`;
        }
        return granted;
      });
    },
    async release(n, at = billingPeriod()) {
      if (n <= 0) return;
      await ensure();
      const { month: m, day: d } = at;
      await s`update place_photo_usage set calls = greatest(calls - ${n}, 0) where month = ${m}`;
      await s`update place_photo_daily set calls = greatest(calls - ${n}, 0) where day = ${d}`;
    },
  };
}

export function defaultPhotoDeps(): PhotoDeps {
  const monthly = Number(process.env.PLACE_PHOTOS_MONTHLY_CAP);
  const monthlyCap =
    monthly > 0 ? Math.min(monthly, DEFAULT_MONTHLY_CAP) : DEFAULT_MONTHLY_CAP;
  const daily = Number(process.env.PLACE_PHOTOS_DAILY_CAP);
  return {
    apiKey: process.env.GOOGLE_PLACES_API_KEY?.trim(),
    fetch,
    usage: photoUsage(),
    monthlyCap,
    dailyCap: Math.min(daily > 0 ? daily : DEFAULT_DAILY_CAP, monthlyCap),
  };
}
