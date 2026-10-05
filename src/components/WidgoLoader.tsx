"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The Widgo web chat ("Kyle's AI"). Kyle asked for it on every page (2026-09-10), and
 * AGENTS.md rule 4 keeps any chat off pages that collect a phone number or SMS consent,
 * because carriers rejected the A2P campaign over a chat on the opt-in pages. So it loads
 * everywhere except the routes below.
 *
 * A new page with a phone field or SMS consent goes in NO_CHAT_ROUTES;
 * src/components/WidgoLoader.test.ts fails until it does.
 */
export const NO_CHAT_ROUTES = [
  "/contact",
  "/crosby-ai",
  "/sms-opt-in",
  "/sms-opt-out",
] as const;

export function chatAllowed(pathname: string): boolean {
  return !NO_CHAT_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );
}

export function WidgoLoader() {
  const pathname = usePathname() ?? "/";
  const allowed = chatAllowed(pathname);

  useEffect(() => {
    // Widgo has no teardown API and records the session outside React. Arriving on a
    // no-chat page after it loaded (client-side navigation) needs a full page load, which
    // stops its UI and recording before the visitor reaches the form.
    if (!allowed && document.getElementById("widgo-root"))
      window.location.reload();
  }, [allowed]);

  if (!allowed) return null;
  return (
    <>
      <Script id="widgo-config" strategy="afterInteractive">
        {`window.widgoConfig = { orgId: "org_81eba270b80b4baa", aiUrl: "https://ai.widgo.ai" };`}
      </Script>
      <Script
        id="widgo-loader"
        strategy="afterInteractive"
        src="https://cdn.widgo.ai/widgo.js"
      />
    </>
  );
}
