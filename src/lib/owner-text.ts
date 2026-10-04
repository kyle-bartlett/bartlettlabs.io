/**
 * Text Kyle through the Dial HTTP API, the same pattern as the RepBot app's lib/alert.ts
 * (POST https://api.getdial.ai/api/v1/messages, `Authorization: Bearer <key>`,
 * JSON `{ to, fromNumber, body }`).
 *
 * Env (all three required; any missing = no-op that reports false):
 *   DIAL_API_KEY, DIAL_FROM_NUMBER, ALERT_TO_NUMBER
 *
 * Never throws. True only after Dial answers 2xx.
 */
const DIAL_MESSAGES_URL = "https://api.getdial.ai/api/v1/messages";
const SEND_TIMEOUT_MS = 8000;
export const TEXT_MAX_CHARS = 480;

/** US numbers to E.164: a bare 10-digit number gets +1, an 11 to 15 digit one gets +. */
export function toE164(raw: string | undefined): string | undefined {
  const s = raw?.trim();
  if (!s) return undefined;
  if (s.startsWith("+")) return "+" + s.slice(1).replace(/\D/g, "");
  const d = s.replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length >= 11 && d.length <= 15) return `+${d}`;
  return s;
}

export async function textOwner(text: string): Promise<boolean> {
  const apiKey = process.env.DIAL_API_KEY?.trim();
  const from = toE164(process.env.DIAL_FROM_NUMBER);
  const to = toE164(process.env.ALERT_TO_NUMBER);
  if (!apiKey || !from || !to) {
    console.error("Owner text skipped: Dial env is not set.");
    return false;
  }
  const body =
    text.length <= TEXT_MAX_CHARS
      ? text
      : `${text.slice(0, TEXT_MAX_CHARS - 3).trimEnd()}...`;
  try {
    const res = await fetch(DIAL_MESSAGES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, fromNumber: from, body }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
    if (!res.ok) console.error(`Owner text failed: Dial HTTP ${res.status}.`);
    return res.ok;
  } catch (err) {
    // Never log err.message: it can echo the Authorization header value.
    console.error(
      `Owner text failed (${err instanceof Error ? err.name : "unknown"}).`,
    );
    return false;
  }
}
