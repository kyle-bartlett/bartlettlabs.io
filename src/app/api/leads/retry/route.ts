/**
 * Forwards pending website leads to the CRM (src/lib/leads.ts retryPendingLeads).
 * Called by a Coolify scheduled task inside the container; requires the
 * `x-retry-key` header to match LEADS_RETRY_KEY, so the open internet can't drive it.
 */
import { timingSafeEqual } from "node:crypto";
import { retryPendingLeads } from "@/lib/leads";

export const runtime = "nodejs";

function keyMatches(given: string | null, expected: string): boolean {
  if (!given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const expected = process.env.LEADS_RETRY_KEY?.trim();
  if (!expected || !keyMatches(req.headers.get("x-retry-key"), expected)) {
    return Response.json({ ok: false }, { status: 404 });
  }
  try {
    return Response.json({ ok: true, ...(await retryPendingLeads()) });
  } catch (err) {
    console.error(
      `Lead retry failed (${err instanceof Error ? err.name : "unknown"}).`,
    );
    return Response.json({ ok: false }, { status: 500 });
  }
}
