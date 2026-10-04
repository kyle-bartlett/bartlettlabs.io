/**
 * Marks this browser as Kyle's, so his own visits to the fence proposal pages never text him
 * (src/app/for/track.ts and /api/prospect-event both honor the cookie). Open once per device:
 * https://bartlettlabs.io/api/owner
 */
export function GET() {
  return new Response(
    `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Marked</title><body style="font:18px/1.5 system-ui;margin:32px">This device is marked as Kyle's. Opening a /for/ proposal page here won't text you.</body>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "set-cookie":
          "bl_owner=1; Max-Age=31536000; Path=/; SameSite=Lax; Secure",
        "cache-control": "no-store",
        "x-robots-tag": "noindex",
      },
    },
  );
}
