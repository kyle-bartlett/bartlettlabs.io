const GA_MEASUREMENT_ID = "G-YMYHJ4MZK7";

// Server-rendered so the tag lands in the initial HTML <head> — required for
// Google's installation check and for reliable first-load tracking. Placed in
// the layout's <head>. GA4 Enhanced Measurement ("page changes based on
// browser history events", on by default) tracks Next.js client-side route
// changes automatically, so no manual per-route page_view is needed here.
export function GoogleAnalytics() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`,
        }}
      />
    </>
  );
}
