# Bartlett Labs Site Rebuild Status Log

Updated: 2026-03-23

## Source Of Truth

- Design: `docs/plans/2026-03-22-bartlettlabs-site-rebuild-design.md`
- Implementation plan: `docs/plans/2026-03-22-bartlettlabs-site-rebuild.md`
- Asset checklist: `docs/plans/2026-03-22-bartlettlabs-site-asset-checklist.md`
- GHL compliance audit: `docs/plans/2026-03-23-bartlettlabs-ghl-compliance-audit.md`

## Current Position

The core public-site rebuild is complete and verified. The visible marketing surface now matches the approved trust-first direction, and the biggest remaining truth-drift surfaces from the legacy build have now been cleaned off the public site:

- founder-led voice
- canonical facts (`300+`, `13 years`, `Purdue -> Sears -> Belk -> Apple -> Anker`)
- no fake testimonials
- `/work` as the consolidated proof page
- `/book` as the public booking path with a first-party embedded calendar page
- placeholder slots for founder photos and work screenshots
- Next.js build root pinned to this repo to avoid workspace-root drift during builds
- compliance and opt-out pages exposed from the rebuilt footer
- local contact and SMS consent copy tightened around the real Bartlett Labs flow instead of generic compliance-template claims
- HighLevel calendar consent wording updated in the sub-account admin to match the truthful operational SMS flow

## Completed Work

### Core Architecture

- Added Vitest + React Testing Library coverage for the rebuild.
- Created shared content modules for site facts, services, work, and FAQs.
- Rebuilt the global shell around `PageShell`, `SiteHeader`, and `SiteFooter`.

### Rebuilt Pages

- Homepage
- Services
- Work
- About
- Contact
- Blog index
- Blog post wrapper

### Routing And SEO

- `/portfolio` -> `/work`
- `/demos` -> `/work`
- `/testimonials` -> `/work`
- `/book` now renders a Bartlett Labs booking page with the embedded GHL calendar
- legacy `/industries/*` pages now redirect to `/services`
- Replaced old JSON-LD with founder/business/service/FAQ schema that matches approved facts
- Updated `llms.txt`, `llms-full.txt`, and chatbot prompt to remove stale offers and invented proof
- Updated sitemap to include `/work` and remove stale route entries, including the legacy industry pages

### Stability Notes

- Booking CTAs still point to the stable internal `/book` path, but that route now renders a first-party page instead of a direct cross-origin redirect.

### Blog And Content Truth Audit

- Rewrote the inline blog corpus in `src/lib/blog/posts.ts` so the article bodies now match the trust-first rebuild direction.
- Removed stale blog claims tied to fake testimonial language, unsupported turnaround promises, legacy `/portfolio` and `/demos` links, and inflated internal AI-team framing.
- Added a dedicated blog truth-audit test to keep those patterns from slipping back in.
- Updated the blog index and post wrapper copy so the UI no longer announces the blog as "mid-refresh."
- Found four old public `/industries/*` pages during verification, then redirected them to `/services` and removed them from the sitemap because they still contained stale legacy claims.

### Asset Prep

- Added a central asset manifest in `src/content/assets.ts` for founder portraits and work screenshots.
- Updated the placeholder components so they automatically swap to real assets when files are later added at the expected `public/images/...` paths.
- Added targeted tests for the asset manifest plus auto-swap behavior.
- Wrote `docs/plans/2026-03-22-bartlettlabs-site-asset-checklist.md` with the exact file paths, sizing guidance, and priority order for future photo and screenshot capture.

### Cleanup Pass

- Added a regression test for `next.config.ts` so Turbopack stays pinned to the repo root instead of inferring `/Volumes/Bart_26` from the parent lockfile.
- Updated `next.config.ts` to set `turbopack.root` explicitly.
- Added a legacy cleanup test that lists the pre-rebuild orphaned components we do not want drifting back into the codebase.
- Removed the orphaned legacy marketing/component files that no longer power the rebuilt site.

### Compliance Migration

- Migrated the remaining utility and compliance pages to the rebuilt `PageShell`, including `/quiz`, `/calculator`, `/privacy`, `/terms`, `/data-deletion`, `/sms-opt-in`, and `/sms-opt-out`.
- Added a dedicated `/email-opt-out` page so email unsubscribe instructions are no longer buried only inside the privacy policy.
- Split footer navigation into primary links, tools, and compliance links so Privacy, Terms, Email Opt-Out, SMS Opt-In, SMS Opt-Out, and Data Deletion stay easy to find.
- Added sitemap coverage for the compliance routes so they remain discoverable.
- Removed the old `Header`, `Footer`, and `ThemeToggle` files now that those pages no longer depend on the legacy shell.
- Reworked the calculator page copy and structured data so it now uses canonical facts and planning-tool language instead of inflated stats or invented example wins.

### Provider Compliance Audit

- Audited the live HighLevel booking widget plus the current SMS-related site copy against the current Bartlett Labs flow.
- Confirmed the public GHL booking widget was initially rendering a broad generic consent label outside this repo, then updated that consent copy directly in HighLevel.
- Added explicit non-marketing SMS consent copy to the local contact form and surfaced Privacy, Terms, SMS Opt-Out, and Email Opt-Out links next to the embedded calendar.
- Rebuilt `/sms-opt-in` into a truthful explanation page and removed the fake standalone opt-in form.
- Rebuilt `/sms-opt-out` around STOP-first guidance and removed stale 2FA/account language plus the old `24 hours` promise.
- Updated the SMS sections in `/privacy` and `/terms` so they now describe inquiry follow-up, scheduling, project communication, and support instead of invented account-security use cases.
- Added regression tests covering the refreshed contact, SMS opt-in, and SMS opt-out copy.
- Replaced the old `/book` redirect with a dedicated embedded booking page so compliance links remain visibly clickable while someone schedules.

## Verification Snapshot

Passed on 2026-03-23:

- `npm test`
- `npm run lint`
- `npm run build`

Browser-checked:

- `/`
- `/about`
- `/contact`
- `/blog`
- `/blog/how-ai-agents-are-changing-small-business-operations-2026`
- `/book`
- redirect behavior for `/portfolio`, `/demos`, and `/testimonials`
- redirect behavior for `/industries/distribution` -> `/services`

## Known Notes

### Still Intentionally Deferred

- Final founder photos and work screenshots still need to be dropped into the documented asset paths.
- Some legal/compliance copy may still deserve a future provider-specific review if exact platform wording requirements change, but the routes are now surfaced clearly in the site IA.

## Next Phase Queue

1. Asset integration for final founder photos and work screenshots
2. Final truth/UX pass on non-primary utility pages before launch hardening
3. Deployment and launch-prep cleanup once final assets are in place
4. Optional future provider-specific compliance review if platform requirements change again

## End-Of-Day Handoff

Updated at close of work on 2026-03-23:

- All rebuild and compliance changes from today are saved on disk in the `bartlettlabs-site` repo worktree.
- No git commit was created yet; the repo remains intentionally dirty because the rebuild is still in progress.
- The safest restart point tomorrow is to begin with asset integration using `docs/plans/2026-03-22-bartlettlabs-site-asset-checklist.md`.
- After assets are in place, run the final truth/UX pass on utility pages, then move into deployment cleanup.

## Update Rule

At the end of each future work session:

- update this file with what changed
- add any new risks or caveats
- adjust the next-phase queue so the repo always reflects the current plan, not just the original one
