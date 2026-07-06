# Plan: Reclaim domain from Framer + build native Crosby ad landing page

## Context

Kyle bought a $50/mo Alignable ad as the lone "Crosby Advertiser" and wants the ad link to
land Crosby businesses on a Crosby-only offer page ("Free Crosby AI Opportunity Audit — first
10 this month"). He built that page in Framer. Framer's connect-domain flow repointed his
**entire** `bartlettlabs.io` at Framer, which took the whole real site offline, and the Framer
page renders broken (content frozen right on desktop) and incomplete.

**Root cause of "site isn't loading" (confirmed):** Cloudflare DNS points the whole domain at
Framer, bypassing the real Next.js app on Coolify (which is healthy and running).
- apex `bartlettlabs.io` → A `31.43.160.6` / `31.43.161.6` (Framer)
- `www` → CNAME `sites.framer.app`; both return `server: Framer/…`, no `_next/static`.
- Coolify app `bartlettlabs-site` (uuid `y088wgs44okc484kwowk88s8`, server `149.28.249.119`,
  fqdn `bartlettlabs.io,www.bartlettlabs.io`, redirect `non-www`) is up, just gets no traffic.

**Decisions (confirmed with Kyle):**
1. Domain: reclaim apex + www to Coolify; keep the Framer page on `crosby.bartlettlabs.io` as a
   temporary bridge, retire it after the native page ships.
2. Build a **dedicated, native `/crosby-ai`** ad landing page. Leave `/areas/crosby` (evergreen
   SEO area page, 1 of 21) untouched.
3. CTA → **on-page lead form → GoHighLevel**, A2P-compliant.
4. **Expand** beyond the Framer design (add proof, how-it-works, local trust, FAQ).

## Part A — Reclaim the domain (urgent; fixes the down site)

DNS is at Cloudflare (`lynn/romina.ns.cloudflare.com`). I'll apply via Cloudflare API if a token
is available in env; otherwise hand Kyle the exact records. Framer-side change is Kyle's (his
Framer account).

- **apex `bartlettlabs.io`**: remove Framer A records; add `A → 149.28.249.119`, **DNS-only (grey)**.
- **`www`**: replace `CNAME sites.framer.app` with `CNAME → bartlettlabs.io` (or `A 149.28.249.119`),
  DNS-only. Coolify already redirects www→non-www.
- **new `crosby`**: `CNAME → sites.framer.app` (use the exact target Framer shows), then in the
  Framer project move the connected domain from apex/www to `crosby.bartlettlabs.io`.
- SSL: Coolify issues Let's Encrypt via Traefik — grey-cloud lets it validate. After propagation,
  verify cert; if stuck from the Framer period, restart the Coolify app (`restart_application`).
- No Coolify config change needed (fqdn + redirect already correct).

## Part B — Build native `/crosby-ai` (repo)

Reuse the existing system: `.growth-*` utility classes + brand tokens in `src/app/globals.css`
(Warm Parchment `#F5F3F0`, Houston Navy `#03202F`, Astros Orange `#FF5910`), `PageShell` /
`SiteHeader` / `SiteFooter`, `ProofStrip`, `siteConfig` (`src/content/site.ts`), and the `crosby`
`ServiceAreaProfile` neighborhoods (`src/content/growth-system.ts:625`).

**Files to create:**
- `src/app/crosby-ai/page.tsx` — route + `metadata` (title "AI Automation built for Crosby, TX
  businesses | Bartlett Labs", description = subhead, OG tags). Renders `<CrosbyAiLanding/>` in `PageShell`.
- `src/components/site/CrosbyAiLanding.tsx` — section composition (server component where possible).
- `src/components/site/CrosbyLeadForm.tsx` — client form, reusing ContactForm styling
  (`card-warm`, `btn-primary`, `eyebrow`, field styles). Anchor `#audit`; all CTAs scroll here.
- `src/app/api/crosby-lead/route.ts` — server route → `findOrCreateContact()` from `src/lib/ghl.ts`
  with `tags: ["crosby-ai","alignable"]`, `source: "crosby-ai-landing"` (attribution for ad ROI),
  `companyName`, name/email/phone. JSON in, `{ok}` out, with error handling.

**Sections (faithful design + expansions):**
1. **Hero** (2-col, parchment): kicker "Built for Crosby, TX local operators", H1 "AI Automation
   built for Crosby, TX businesses.", subhead, primary CTA "Claim Your Free Crosby AI Opportunity
   Audit" (→ `#audit`), trust line. Right: "Missed Lead Assistant · Active 24/7" demo card (SMS
   mock, `<60 sec` / `24/7`). Proper responsive stack on mobile — fixes the frozen-right bug.
2. **The Crosby Missed-Call Gap** (navy): H2 "Your best leads call when you're already working." +
   body + "first 5 minutes" callout + "A normal Crosby workday" card + "Thousands" revenue callout.
3. **The Solution** (parchment): 3 cards — Instant Text-Back / Review Booster / Fully Managed + footer note.
4. **Proof strip** *(expansion)*: capability stats via `ProofStrip` — under-2-min text-back, 24/7,
   7-day launch, built & run for you. No fabricated results (compliance).
5. **How it works** *(expansion)*: 3 steps — Map the leak → Build the system → Launch with you.
6. **Local trust** *(expansion)*: "Serving all of Crosby" neighborhoods (Newport, Barrett, Lake
   Houston, FM 2100, Indian Shores, Crosby-Lynchburg) + "Proud Crosby community sponsor on Alignable."
7. **FAQ** *(expansion)*: objection handling — new app? cost/commitment? data safe? after-hours?
8. **Closing CTA** (navy): badge "CROSBY COMMUNITY SPONSOR ON ALIGNABLE", H2 "Claim one of the first
   10 free Crosby AI Opportunity Audits this month.", body, 3 mini-cards (Lead leaks / Response plan
   / Review lift).
9. **Lead form** (`#audit`): `CrosbyLeadForm` → `/api/crosby-lead`.

**Compliance:** mirror the site's A2P posture — phone = optional callback, form does **not** enroll
in SMS (reuse ContactForm's consent language + link to `/sms-opt-in`). No fake testimonials/numbers.

**Tracking (ad ROI):** on submit success fire Meta Pixel `Lead` (`window.fbq`) + PostHog
`posthog.capture('crosby_audit_submitted', {source:'alignable'})`; `crosby_audit_cta_click` on CTA
clicks. Reuse existing `MetaPixel` + `PostHogProvider`.

**Optional:** add `redirects()` to `next.config.ts` for `/crosby` → `/crosby-ai` (cleaner ad URL).

## Part C — Ship + point the ad
Push to GitHub `main` → trigger Coolify deploy (`y088wgs44okc484kwowk88s8`) → verify live → point the
Alignable ad at `https://bartlettlabs.io/crosby-ai`.

## Verification
- **DNS:** `dig +short bartlettlabs.io` → `149.28.249.119`; `curl -sSI https://bartlettlabs.io` → no
  `server: Framer`, real Next.js HTML; homepage renders. `crosby.bartlettlabs.io` serves Framer.
- **Page:** `npm run build` clean; Interceptor visual check `/crosby-ai` on desktop/tablet/mobile —
  confirm frozen-right is gone, layout correct.
- **Lead form:** submit a test lead → appears in GHL tagged `crosby-ai` + `alignable`, source
  `crosby-ai-landing`. Meta Pixel `Lead` + PostHog event fire (verify in PostHog/Pixel Helper).
- **Redirect (if added):** `/crosby` → `/crosby-ai`.
- Commit + push + Coolify deploy verified on the live URL.
