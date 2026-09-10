"use client";

import Script from "next/script";
import { useEffect } from "react";

export function WidgoWidget() {
  useEffect(() => {
    return () => {
      // Widgo has no teardown API and records sessions outside React. A full
      // navigation stops its UI, listeners and recording before using forms.
      if (window.location.pathname !== "/") window.location.reload();
    };
  }, []);

  return (
    <>
      <Script id="widgo-config" strategy="afterInteractive">
        {`window.widgoConfig = {
          orgId: "org_81eba270b80b4baa",
          aiUrl: "https://ai.widgo.ai"
        };`}
      </Script>
      <Script
        id="widgo-loader"
        src="https://cdn.widgo.ai/widgo.js"
        strategy="afterInteractive"
      />
    </>
  );
}
