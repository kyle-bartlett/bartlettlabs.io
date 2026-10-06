/**
 * Real Google Business Profile photos for one fence proposal page (src/lib/place-photos.ts).
 * The page asks once per view, when the owner section comes near the screen, and shows the
 * "Photos from your Google profile" gallery only if photos come back. Responses are never
 * cached: Google allows storing place IDs only.
 *
 * Limits, in order: PER_IP_PER_DAY page loads per visitor (Kyle's devices, marked with the
 * bl_owner cookie by /api/owner, skip it), then the monthly cap every request counts against,
 * owner or not, then Google's daily quota on the bartlett-crm project.
 */
import { getProspect } from "@/app/for/prospects";
import { clientIp, ipBucket } from "@/lib/client-ip";
import { defaultPhotoDeps, placePhotos } from "@/lib/place-photos";

export const runtime = "nodejs";

// A few views a day per visitor; each view can use up to four paid photo requests. Kept in
// memory: the site runs as one container, and this limit is about fairness between visitors.
// Cost is bounded by the monthly counter in Postgres and Google's daily quota.
const PER_IP_PER_DAY = 8;
const DAY_MS = 24 * 60 * 60 * 1000;
const perIp = new Map<string, { count: number; since: number }>();

function overDailyLimit(key: string, now: number): boolean {
  const entry = perIp.get(key);
  if (!entry || now - entry.since > DAY_MS) {
    if (perIp.size > 5000) perIp.clear();
    perIp.set(key, { count: 1, since: now });
    return false;
  }
  return ++entry.count > PER_IP_PER_DAY;
}

const isOwner = (req: Request) =>
  /(?:^|;\s*)bl_owner=1(?:;|$)/.test(req.headers.get("cookie") ?? "");

const reply = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });

export async function GET(req: Request) {
  const prospect = getProspect(new URL(req.url).searchParams.get("slug") ?? "");
  if (!prospect) return reply({ ok: false, error: "Invalid request." }, 400);

  if (!isOwner(req)) {
    const ip = clientIp(req.headers);
    if (overDailyLimit(ip ? ipBucket(ip) : "unknown", Date.now()))
      return reply({ ok: false, reason: "limit" });
  }

  return reply(await placePhotos(prospect, defaultPhotoDeps()));
}
