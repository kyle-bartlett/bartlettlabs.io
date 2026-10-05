/**
 * What a fence prospect does on their /for/<slug> page, and the "they're looking now" texts.
 *
 * Kinds:
 *  - view: the page stayed open and visible 4 seconds. Sent by the page's own script, so
 *    link-preview fetchers (iMessage, carriers) never count as a visit.
 *  - demo_tap: tapped the RepBot demo line.
 *  - estimate: built a project plan with the estimator.
 *  - chat: sent a message to the demo chat assistant (recorded by /api/prospect-chat).
 *
 * Every event goes to prospect_events in the outbound Postgres (same database as site_leads).
 * Kyle gets a text at most once per device, slug and kind per window, so ten minutes of
 * reading is one text, and his own unmarked visit can't swallow the prospect's. A slug
 * never sends more than MAX_TEXTS_PER_SLUG_HOUR texts an hour, and all slugs together never more
 * than MAX_TEXTS_PER_HOUR, whatever the device ids say.
 * Without a database the window is kept in memory and texts still go out.
 */
import type { Prospect } from "@/app/for/prospects";
import { db } from "@/lib/lead-store";
import { textOwner } from "@/lib/owner-text";

export const EVENT_KINDS = ["view", "demo_tap", "estimate", "chat"] as const;
export type EventKind = (typeof EVENT_KINDS)[number];

const HOUR = 60 * 60 * 1000;
export const MAX_TEXTS_PER_SLUG_HOUR = 4;
/**
 * Across all slugs. The beacon is public and device ids are the caller's to choose, so this
 * is the ceiling on what anyone can make Kyle's phone do: ten real prospects never come close.
 */
export const MAX_TEXTS_PER_HOUR = 8;
/** Minimum gap between two texts for one slug and kind; null = stored, never texted. */
export const ALERT_WINDOW_MS: Record<EventKind, number | null> = {
  view: 6 * HOUR,
  demo_tap: HOUR,
  estimate: null,
  chat: HOUR,
};

export type ProspectEvent = {
  slug: string;
  kind: EventKind;
  visitor: string | null;
  detail: string | null;
};

/** What came before this event, for the text. */
export type Prior = {
  views: number;
  visitors: number;
  lastView: Date | null;
  contactId: number | null;
};

export type EventStore = {
  /** Stores the event; returns its id. */
  record: (e: ProspectEvent) => Promise<number>;
  prior: (slug: string) => Promise<Prior>;
  /**
   * Marks the event alerted unless the same device already got a text for this slug and kind
   * inside the window, or the slug hit MAX_TEXTS_PER_SLUG_HOUR.
   */
  claimAlert: (
    id: number,
    e: ProspectEvent,
    windowMs: number,
  ) => Promise<boolean>;
};

export type EventDeps = {
  store: EventStore | null;
  text: (body: string) => Promise<boolean>;
  now: () => Date;
};

export function defaultEventDeps(): EventDeps {
  return { store: eventStore(), text: textOwner, now: () => new Date() };
}

export function isEventKind(v: unknown): v is EventKind {
  return (
    typeof v === "string" && (EVENT_KINDS as readonly string[]).includes(v)
  );
}

const central = (d: Date) =>
  d
    .toLocaleString("en-US", {
      timeZone: "America/Chicago",
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
    })
    .replace(" AM", "am")
    .replace(" PM", "pm");

function ordinal(n: number): string {
  const s =
    n % 100 >= 11 && n % 100 <= 13
      ? "th"
      : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  return `${n}${s}`;
}

/** The text Kyle gets. `prior` excludes this event. */
export function alertText(p: Prospect, e: ProspectEvent, prior: Prior): string {
  const call = `Call ${p.phone}${prior.contactId ? ` (id ${prior.contactId})` : ""}.`;
  if (e.kind === "demo_tap")
    return `${p.name} tapped the demo line on their page. If (979) 987-4241 rings now, it's probably them. ${call}`;
  if (e.kind === "chat")
    return `${p.name} is trying the chat assistant on their page: "${e.detail ?? ""}". ${call}`;
  const visit =
    prior.views === 0
      ? "first visit"
      : `${ordinal(prior.views + 1)} visit, last one ${central(prior.lastView!)}`;
  const devices =
    prior.visitors > 1 ? `, ${prior.visitors} devices so far` : "";
  return `${p.name} is on their page right now (${visit}${devices}). ${call}`;
}

// Fallback dedupe when there is no database: slug:kind:visitor -> last text time, plus the
// times of recent texts for the same per-slug and overall hourly caps.
const lastAlert = new Map<string, number>();
let recentTexts: { slug: string; at: number }[] = [];

/** Test hook: forget the in-memory alert history. */
export function resetProspectAlertMemory(): void {
  lastAlert.clear();
  recentTexts = [];
}

/**
 * Stores the event and texts Kyle when the window allows. Never throws.
 * Returns whether a text went out.
 */
export async function recordProspectEvent(
  p: Prospect,
  e: ProspectEvent,
  deps: EventDeps = defaultEventDeps(),
): Promise<boolean> {
  const windowMs = ALERT_WINDOW_MS[e.kind];
  const now = deps.now().getTime();
  let prior: Prior = { views: 0, visitors: 0, lastView: null, contactId: null };
  let shouldText = false;

  try {
    if (!deps.store) throw new Error("no store");
    prior = await deps.store.prior(e.slug);
    const id = await deps.store.record(e);
    shouldText =
      windowMs !== null && (await deps.store.claimAlert(id, e, windowMs));
  } catch (err) {
    if (deps.store)
      console.error(
        `Prospect event store failed (${err instanceof Error ? err.name : "unknown"}).`,
      );
    const key = `${e.slug}:${e.kind}:${e.visitor ?? ""}`;
    const last = lastAlert.get(key);
    recentTexts = recentTexts.filter((t) => now - t.at < HOUR);
    shouldText =
      windowMs !== null &&
      (last === undefined || now - last >= windowMs) &&
      recentTexts.length < MAX_TEXTS_PER_HOUR &&
      recentTexts.filter((t) => t.slug === e.slug).length <
        MAX_TEXTS_PER_SLUG_HOUR;
    if (shouldText) {
      lastAlert.set(key, now);
      recentTexts.push({ slug: e.slug, at: now });
    }
  }

  return shouldText ? deps.text(alertText(p, e, prior)) : false;
}

let ready: Promise<unknown> | null = null;

function ensureTable(s: NonNullable<ReturnType<typeof db>>): Promise<unknown> {
  ready ??= (async () => {
    await s`
      create table if not exists prospect_events (
        id bigserial primary key,
        created_at timestamptz not null default now(),
        slug text not null,
        kind text not null,
        visitor text,
        detail text,
        alerted_at timestamptz
      )`;
    await s`
      create index if not exists prospect_events_slug_kind_idx
        on prospect_events (slug, kind, created_at desc)`;
  })().catch((err) => {
    ready = null;
    throw err;
  });
  return ready;
}

export function eventStore(): EventStore | null {
  const s = db();
  if (!s) return null;
  return {
    async record(e) {
      await ensureTable(s);
      const [row] = await s<{ id: string }[]>`
        insert into prospect_events (slug, kind, visitor, detail)
        values (${e.slug}, ${e.kind}, ${e.visitor}, ${e.detail})
        returning id`;
      return Number(row.id);
    },
    async prior(slug) {
      await ensureTable(s);
      const [row] = await s<
        { views: number; visitors: number; last_view: Date | null }[]
      >`
        select count(*)::int as views,
               count(distinct visitor)::int as visitors,
               max(created_at) as last_view
        from prospect_events
        where slug = ${slug} and kind = 'view'`;
      // contacts is the outbound dial list; fence prospects carry their page slug in meta.
      const [contact] = await s<{ id: string }[]>`
        select id from contacts where meta->>'page' = ${slug} order by id limit 1`.catch(
        () => [],
      );
      return {
        views: row.views,
        visitors: row.visitors,
        lastView: row.last_view,
        contactId: contact ? Number(contact.id) : null,
      };
    },
    async claimAlert(id, e, windowMs) {
      const rows = await s`
        update prospect_events set alerted_at = now()
        where id = ${id}
          and not exists (
            select 1 from prospect_events
            where slug = ${e.slug} and kind = ${e.kind} and id <> ${id}
              and visitor is not distinct from ${e.visitor}
              and alerted_at > now() - ${windowMs / 1000} * interval '1 second'
          )
          and (
            select count(*) from prospect_events
            where slug = ${e.slug} and alerted_at > now() - interval '1 hour'
          ) < ${MAX_TEXTS_PER_SLUG_HOUR}
          and (
            select count(*) from prospect_events
            where alerted_at > now() - interval '1 hour'
          ) < ${MAX_TEXTS_PER_HOUR}
        returning id`;
      return rows.length > 0;
    },
  };
}
