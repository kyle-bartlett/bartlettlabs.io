/**
 * Kyle's device mark, signed so nobody else can claim it. RepBot's dial list (repbot-ai
 * lib/owner-mark.ts) sends him through /api/owner with a two-minute mark token; that sets the
 * bl_owner cookie to `<expiry>.<HMAC>`, valid a year. Owner perks on the server (his own visits
 * never text him, the shared photo pool, test chats) need a valid signature. The browser only
 * checks that a bl_owner cookie exists, which at most lets someone mute their own beacons.
 * Both apps share OWNER_MARK_SECRET; without it nobody is the owner.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const OWNER_COOKIE = "bl_owner";
const YEAR_S = 365 * 24 * 60 * 60;
// A mark token from RepBot is good for two minutes, plus a little clock skew.
const MARK_WINDOW_S = 150;

const nowS = (now: number) => Math.floor(now / 1000);

function mac(secret: string, purpose: string, exp: number): string {
  return createHmac("sha256", secret)
    .update(`${purpose}.${exp}`)
    .digest("base64url");
}

function sign(secret: string, purpose: string, exp: number): string {
  return `${exp}.${mac(secret, purpose, exp)}`;
}

/** True when `value` is `<exp>.<mac>` for this purpose, not expired and not too far ahead. */
function verify(
  value: string | null | undefined,
  secret: string | undefined,
  purpose: string,
  now: number,
  maxAheadS: number,
): boolean {
  if (!secret || !value) return false;
  const m = /^(\d{1,12})\.([A-Za-z0-9_-]{43})$/.exec(value);
  if (!m) return false;
  const exp = Number(m[1]);
  const t = nowS(now);
  if (exp <= t || exp > t + maxAheadS) return false;
  const want = Buffer.from(mac(secret, purpose, exp));
  const got = Buffer.from(m[2]);
  return want.length === got.length && timingSafeEqual(want, got);
}

export function ownerCookieValue(secret: string, now = Date.now()): string {
  return sign(secret, "owner", nowS(now) + YEAR_S);
}

export function markToken(secret: string, now = Date.now()): string {
  return sign(secret, "mark", nowS(now) + 120);
}

export function validMarkToken(
  token: string | null | undefined,
  secret = process.env.OWNER_MARK_SECRET,
  now = Date.now(),
): boolean {
  return verify(token, secret, "mark", now, MARK_WINDOW_S);
}

function cookieValue(header: string | null, name: string): string | null {
  for (const part of (header ?? "").split(/;\s*/)) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i) === name) return part.slice(i + 1);
  }
  return null;
}

/** A request from one of Kyle's marked devices. The old unsigned `bl_owner=1` doesn't count. */
export function isOwnerRequest(
  req: Request,
  secret = process.env.OWNER_MARK_SECRET,
  now = Date.now(),
): boolean {
  return verify(
    cookieValue(req.headers.get("cookie"), OWNER_COOKIE),
    secret,
    "owner",
    now,
    YEAR_S,
  );
}
