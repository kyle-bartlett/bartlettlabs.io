# Plan: Install Google Analytics (gtag.js) on bartlettlabs.io

## Context
Kyle set up a Google Analytics 4 property (Measurement ID `G-YMYHJ4MZK7`) and needs the gtag.js tag on every page of the bartlettlabs.io site. Google's console shows the raw snippet with the instruction "install on every page immediately after `<head>`, don't add more than one Google tag per page."

The site is a **Next.js 16 App Router** app (`src/` dir, TypeScript). It renders every route through one root layout, `src/app/layout.tsx`, so a single component added there covers the whole site — satisfying "every page" and "only one tag per page" automatically. There is **no existing GA/gtag/GTM code**, so no duplicate-tag risk.

Two important notes that shape the approach:
1. The raw pasted snippet, dropped in as-is, only fires **once** on initial load. On a Next.js SPA, client-side navigation between routes would **not** register page views. The site already solves this for Meta Pixel and PostHog with a route-change tracker; GA must do the same to actually work.
2. The codebase has an established, proven pattern for exactly this: `src/components/MetaPixel.tsx` (a `next/script` client component with a `Suspense`-wrapped route-change pageview tracker, rendered in the layout `<body>`). We mirror it for consistency and to avoid a new dependency.

## Approach
Create a new client component `src/components/GoogleAnalytics.tsx` that mirrors `MetaPixel.tsx`, and render it in the root layout alongside `<MetaPixel />`.

### 1. New file: `src/components/GoogleAnalytics.tsx`
Mirror the structure of `src/components/MetaPixel.tsx` exactly:
- `"use client"` component.
- Hardcode the ID as a constant: `const GA_MEASUREMENT_ID = "G-YMYHJ4MZK7";` (matches the MetaPixel convention of hardcoding the public tag ID — a GA Measurement ID is public-by-design and exposed in the browser regardless. Avoids a Coolify env-var step that could silently break analytics if forgotten.)
- Two `<Script>` tags using `strategy="afterInteractive"` (the correct, Google-recommended strategy for analytics — Next injects them properly; literal DOM position "first in head" is not required):
  - External loader: `<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />`
  - Inline init (mirrors the pasted snippet): defines `dataLayer`, `gtag()`, `gtag('js', new Date())`, `gtag('config', GA_MEASUREMENT_ID)`.
- Add a `GaPageView()` sub-component (mirror of `PixelPageView`): uses `usePathname` + `useSearchParams`, skips the first render (initial `config` already counts as the first page_view), and on subsequent route changes calls `window.gtag('event', 'page_view', { page_path: ... })`. Wrap it in `<Suspense fallback={null}>` (required because `useSearchParams` needs a Suspense boundary).
- Add a `declare global` block extending `Window` with `gtag?: (...args: unknown[]) => void;` and `dataLayer?: unknown[];` (mirrors the `fbq` declaration).

### 2. Edit `src/app/layout.tsx`
- Add import: `import { GoogleAnalytics } from "@/components/GoogleAnalytics";` (next to the `MetaPixel` import, line 4).
- Render `<GoogleAnalytics />` inside `<body>`, right after `<MetaPixel />` (line 95).

That's the entire code change — one new file, two lines in the layout.

## Critical files
- `src/components/MetaPixel.tsx` — the pattern to copy (read-only reference).
- `src/components/GoogleAnalytics.tsx` — **new**.
- `src/app/layout.tsx` — **edit** (import + one JSX line).

## Verification
1. `cd bartlettlabs-site && npm run build` (or the project's build cmd) — confirm it compiles with no type errors.
2. `npm run dev`, open the site, and via the Interceptor skill / browser devtools confirm:
   - Network tab shows a request to `googletagmanager.com/gtag/js?id=G-YMYHJ4MZK7`.
   - Console: `window.dataLayer` is populated and `window.gtag` is a function.
   - Navigate between two routes and confirm a second `page_view` / `collect` request fires (SPA route change tracking works).
3. Ship: commit + `git push origin main` (GitHub `kyle-bartlett/bartlettlabs.io` — this repo is GitHub, not Forgejo), then trigger Coolify deploy (app `y088wgs44okc484kwowk88s8`; it does not auto-deploy on push).
4. On the live site, re-verify the gtag network request loads, then use GA's **"Test installation"** button (or Realtime report) to confirm Google sees traffic.
