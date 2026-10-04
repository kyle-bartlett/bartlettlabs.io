/**
 * Beacon from the fence proposal pages (/for/<slug>): view, demo_tap, estimate.
 * Always answers 204 at once; the work runs after the response (src/lib/prospect-events.ts).
 *
 * Not counted: Kyle's own devices (the bl_owner cookie, set by /api/owner or by opening any
 * /for/ page with ?me=1), crawlers by user agent, and more than EVENTS_PER_WINDOW beacons from
 * one address.
 *
 * Smoke test: an `x-smoke-test: <LEADS_RETRY_KEY>` header stores the event as visitor
 * "smoketest" and prefixes the text "TEST, ignore:". Delete the row afterwards so it doesn't
 * count as a visit.
 */
import { after } from "next/server";
import { getProspect } from "@/app/for/prospects";
import {
  defaultEventDeps,
  isEventKind,
  recordProspectEvent,
} from "@/lib/prospect-events";

export const runtime = "nodejs";

const BOT_UA =
  /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|whatsapp/i;
const EVENTS_PER_WINDOW = 30;
const WINDOW_MS = 10 * 60 * 1000;
const seen = new Map<string, { count: number; since: number }>();

function overLimit(ip: string, now: number): boolean {
  const entry = seen.get(ip);
  if (!entry || now - entry.since > WINDOW_MS) {
    if (seen.size > 5000) seen.clear();
    seen.set(ip, { count: 1, since: now });
    return false;
  }
  return ++entry.count > EVENTS_PER_WINDOW;
}

function isOwnerRequest(req: Request): boolean {
  return /(?:^|;\s*)bl_owner=1(?:;|$)/.test(req.headers.get("cookie") ?? "");
}

const done = () => new Response(null, { status: 204 });

export async function POST(req: Request) {
  if (isOwnerRequest(req) || BOT_UA.test(req.headers.get("user-agent") ?? ""))
    return done();
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (overLimit(ip, Date.now())) return done();

  let body: Record<string, unknown>;
  try {
    // sendBeacon posts text/plain, so read text and parse it ourselves.
    const parsed: unknown = JSON.parse(await req.text());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return done();
    body = parsed as Record<string, unknown>;
  } catch {
    return done();
  }

  const prospect = getProspect(typeof body.slug === "string" ? body.slug : "");
  // chat events only come from /api/prospect-chat, never from a beacon.
  if (!prospect || !isEventKind(body.kind) || body.kind === "chat")
    return done();
  const visitor =
    typeof body.visitor === "string" && /^[a-z0-9]{8,32}$/i.test(body.visitor)
      ? body.visitor
      : null;

  const kind = body.kind;
  const smokeKey = process.env.LEADS_RETRY_KEY?.trim();
  const smoke = !!smokeKey && req.headers.get("x-smoke-test") === smokeKey;
  const deps = defaultEventDeps();
  if (smoke) {
    const text = deps.text;
    deps.text = (b) => text(`TEST, ignore: ${b}`);
  }
  after(() =>
    recordProspectEvent(
      prospect,
      {
        slug: prospect.slug,
        kind,
        visitor: smoke ? "smoketest" : visitor,
        detail: null,
      },
      deps,
    ).catch(() => {}),
  );
  return done();
}
