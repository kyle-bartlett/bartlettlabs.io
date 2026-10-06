/**
 * Marks this browser as Kyle's (src/lib/owner.ts), so his own visits to the fence proposal pages
 * never text him. Only a fresh mark token from RepBot's dial list works: tapping any proposal
 * link at repbot.bartlettlabs.io/dials marks the device and lands on that page. Anyone else
 * gets a refusal and no cookie.
 */
import { OWNER_COOKIE, ownerCookieValue, validMarkToken } from "@/lib/owner";

const page = (status: number, text: string, cookie?: string) =>
  new Response(
    `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Owner mark</title><body style="font:18px/1.5 system-ui;margin:32px">${text}</body>`,
    {
      status,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "x-robots-tag": "noindex",
        ...(cookie ? { "set-cookie": cookie } : {}),
      },
    },
  );

export function GET(req: Request) {
  const url = new URL(req.url);
  const secret = process.env.OWNER_MARK_SECRET;
  if (!secret || !validMarkToken(url.searchParams.get("t"), secret))
    return page(
      403,
      "This link has expired or isn't valid. Open the proposal from your RepBot dial list instead.",
    );

  const cookie = `${OWNER_COOKIE}=${ownerCookieValue(secret)}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
  const next = url.searchParams.get("next") ?? "";
  if (/^\/for\/[a-z0-9-]{1,80}$/.test(next))
    return new Response(null, {
      status: 303,
      headers: {
        location: next,
        "set-cookie": cookie,
        "cache-control": "no-store",
      },
    });
  return page(
    200,
    "This device is marked as Kyle's. Opening a /for/ proposal page here won't text you.",
    cookie,
  );
}
