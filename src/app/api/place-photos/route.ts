/**
 * Real Google Business Profile photos for one fence proposal page (src/lib/place-photos.ts).
 * The page asks once per view, when the services section comes near the screen, and keeps its
 * stock images for any slot this doesn't fill. Responses are never cached: Google allows
 * storing place IDs only.
 */
import { getProspect } from "@/app/for/prospects";
import { defaultPhotoDeps, placePhotos } from "@/lib/place-photos";

export const runtime = "nodejs";

// About six page views a day per visitor; each view can use up to seven paid photo requests.
const PER_IP_PER_DAY = 12;
const DAY_MS = 24 * 60 * 60 * 1000;
const perIp = new Map<string, { count: number; since: number }>();

function overDailyLimit(ip: string, now: number): boolean {
  const entry = perIp.get(ip);
  if (!entry || now - entry.since > DAY_MS) {
    if (perIp.size > 5000) perIp.clear();
    perIp.set(ip, { count: 1, since: now });
    return false;
  }
  return ++entry.count > PER_IP_PER_DAY;
}

const reply = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });

export async function GET(req: Request) {
  const prospect = getProspect(new URL(req.url).searchParams.get("slug") ?? "");
  if (!prospect) return reply({ ok: false, error: "Invalid request." }, 400);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (overDailyLimit(ip, Date.now()))
    return reply({ ok: false, reason: "limit" });

  return reply(await placePhotos(prospect, defaultPhotoDeps()));
}
