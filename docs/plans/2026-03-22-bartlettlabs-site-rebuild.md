# Bartlett Labs Site Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the public Bartlett Labs marketing site around a new trust-first founder narrative, honest proof model, and shared content system.

**Architecture:** The rebuild will replace the current marketing surface with a new content-driven shell while preserving the Next.js App Router and existing blog/legal infrastructure. Shared content modules will feed the primary pages, metadata, redirects, and structured data so facts only live in one place.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, ESLint, Vitest, React Testing Library

## Status Update

Updated: 2026-03-23

### Current State

- Core public-site rebuild is implemented and verified.
- The live marketing shell now uses the new shared content layer, founder-led copy, `/work` consolidation, a first-party `/book` page with the embedded calendar, and cleaned structured data.
- The blog corpus has been rewritten to match the approved truth model.
- Legacy public `/industries/*` pages that still carried stale claims now redirect to `/services` and have been removed from the sitemap.
- Asset prep is now wired: founder photos and work screenshots have a central manifest plus automatic placeholder swap behavior once files land in the expected `public/images/...` paths.
- Next.js build configuration now pins `turbopack.root` to this repo so production builds stop inferring the wrong workspace root from `/Volumes/Bart_26/package-lock.json`.
- The orphaned pre-rebuild marketing components have been removed from the repo, with a regression test guarding that cleanup.
- The remaining utility and compliance pages now run on the rebuilt shell, and the old legacy shell files have been retired.
- The footer now exposes compliance links directly, including a new `/email-opt-out` page.
- A direct HighLevel compliance audit has now been captured in `docs/plans/2026-03-23-bartlettlabs-ghl-compliance-audit.md`.
- Local SMS/contact consent copy has been tightened around the real Bartlett Labs flow instead of generic account-security template language.
- The GHL booking widget consent copy has now been updated in the sub-account admin, while this repo keeps the embedded calendar on a first-party `/book` page with visible compliance links.
- Design source of truth remains:
  - `docs/plans/2026-03-22-bartlettlabs-site-rebuild-design.md`
  - `docs/plans/2026-03-22-bartlettlabs-site-status.md`
  - `docs/plans/2026-03-22-bartlettlabs-site-asset-checklist.md`
  - `docs/plans/2026-03-23-bartlettlabs-ghl-compliance-audit.md`

### Verified

- `npm test`
- `npm run lint`
- `npm run build`
- Browser-checked:
  - `/`
  - `/about`
  - `/contact`
  - `/blog`
  - `/blog/how-ai-agents-are-changing-small-business-operations-2026`
  - `/book`
  - redirect behavior for `/portfolio`, `/demos`, and `/testimonials`
  - redirect behavior for `/industries/distribution` -> `/services`

### Completed Scope

- Test harness added with Vitest and React Testing Library.
- Shared content modules created for canonical facts, services, work, and FAQs.
- New shell/components built for the rebuilt marketing surface.
- Homepage, Services, Work, About, Contact, Blog index, and Blog post pages moved to the new shell.
- Legacy routes `/portfolio`, `/demos`, and `/testimonials` now redirect to `/work`.
- `/book` now renders a Bartlett Labs booking page with the embedded GHL calendar.
- Review/testimonial schema removed from JSON-LD.
- AI-facing truth files updated to match approved facts.
- Booking CTAs were normalized around the stable internal `/book` path, which now renders the first-party embedded calendar page.
- Blog post bodies were rewritten to remove stale promises, fake proof, and legacy route references.
- Blog shell messaging was updated so it no longer tells visitors the blog is still mid-refresh.
- Added a blog truth-audit test to keep unsupported claims from reappearing.
- Legacy `/industries/distribution`, `/industries/energy`, `/industries/healthcare`, and `/industries/professional-services` pages now redirect to `/services`.
- Sitemap entries for those legacy industry pages were removed.
- Added `src/content/assets.ts` as the source of truth for future founder-photo and work-screenshot drop-ins.
- Updated placeholder components so they automatically render real assets when matching files exist in `public/images/...`.
- Added an asset capture checklist doc with exact filenames, ratios, and priority order.
- Added `src/test/next-config.test.ts` and updated `next.config.ts` so Turbopack root is explicitly pinned to the repo.
- Added `src/test/legacy-components.test.ts` and removed the orphaned pre-rebuild component files that were no longer imported anywhere in the rebuilt site.
- Migrated `/quiz`, `/calculator`, `/privacy`, `/terms`, `/data-deletion`, `/sms-opt-in`, and `/sms-opt-out` to `PageShell`.
- Added `src/app/email-opt-out/page.tsx` plus test coverage so email unsubscribe instructions have a dedicated public route.
- Expanded the rebuilt footer content layer with dedicated compliance links and added those routes to the sitemap.
- Removed `src/components/Header.tsx`, `src/components/Footer.tsx`, and `src/components/ThemeToggle.tsx` after the migration.
- Reworked calculator copy/metadata/structured data to use cautious planning-tool language and canonical proof instead of inflated stats or invented customer stories.
- Added explicit non-marketing SMS consent copy plus compliance links to the local contact flow.
- Rebuilt `/sms-opt-in` as an explanation page instead of a fake standalone form.
- Rebuilt `/sms-opt-out` around STOP-first guidance and removed the stale 2FA/account and `24 hours` template claims.
- Updated the SMS sections in `/privacy` and `/terms` so they now match inquiry follow-up, scheduling, project communication, and support.
- Added regression tests for the refreshed contact and SMS compliance copy.
- Replaced the old `/book` redirect route with a dedicated booking page that embeds the GHL calendar and keeps Privacy, Terms, SMS Opt-Out, and Email Opt-Out links on-page.
- Added test coverage for the new `/book` page and included `/book` in the sitemap.

### Known Follow-Up Work

- Integrate final founder photos and work screenshots by dropping files into the documented paths and redeploying.
- Optionally audit remaining non-primary utility pages before launch hardening.
- Optionally review provider-specific compliance wording again if platform requirements change later.

---

### Task 1: Add Test Infrastructure

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/test/render.tsx`

**Steps:**

1. Add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`.
2. Add a `test` script to `package.json`.
3. Configure Vitest for component and content tests.
4. Run the empty test command to verify the harness boots cleanly.

### Task 2: Create Shared Content Modules

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/services.ts`
- Create: `src/content/work.ts`
- Create: `src/content/faqs.ts`
- Test: `src/content/site.test.ts`

**Steps:**

1. Write a failing test for canonical business facts, primary nav labels, footer-only links, and booking route values.
2. Run the test and confirm it fails because the modules do not exist.
3. Create the shared content modules with the approved facts and IA.
4. Re-run the targeted test and confirm it passes.

### Task 3: Rebuild Global Design Tokens and App Shell

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/components/site/SiteHeader.tsx`
- Create: `src/components/site/SiteFooter.tsx`
- Create: `src/components/site/PageShell.tsx`
- Test: `src/components/site/SiteHeader.test.tsx`

**Steps:**

1. Write a failing header test that asserts the 5-link primary nav and `/book` CTA.
2. Run the test and confirm it fails.
3. Replace the current font stack, color tokens, layout primitives, and shell structure.
4. Build the new header and footer off the shared content layer.
5. Remove dark-mode toggle wiring and chat widget loading from the shell.
6. Re-run the header test and confirm it passes.

### Task 4: Add Placeholder Components and Shared Marketing Blocks

**Files:**
- Create: `src/components/site/SectionIntro.tsx`
- Create: `src/components/site/PageHero.tsx`
- Create: `src/components/site/ProofStrip.tsx`
- Create: `src/components/site/ServiceCard.tsx`
- Create: `src/components/site/WorkCard.tsx`
- Create: `src/components/site/PhotoPlaceholder.tsx`
- Create: `src/components/site/ScreenshotPlaceholder.tsx`
- Create: `src/components/site/FinalCallout.tsx`
- Test: `src/components/site/WorkCard.test.tsx`

**Steps:**

1. Write a failing test for `WorkCard` that asserts the `Demo` label, placeholder copy, and optional live-link handling.
2. Run the test and confirm it fails.
3. Implement the reusable marketing components.
4. Re-run the targeted test and confirm it passes.

### Task 5: Rebuild the Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/site/HomeFaq.tsx`
- Test: `src/app/homepage.test.tsx`

**Steps:**

1. Write a failing homepage test that checks the new headline, proof strip, 3 service cards, and absence of testimonial copy.
2. Run the test and confirm it fails.
3. Rebuild the homepage with the new section order and shared data.
4. Re-run the homepage test and confirm it passes.

### Task 6: Rebuild the Services Page

**Files:**
- Modify: `src/app/services/page.tsx`
- Test: `src/app/services/services-page.test.tsx`

**Steps:**

1. Write a failing test asserting that the page contains exactly the 4 approved service blocks and does not include Social Media, Digital Products, or package tier names.
2. Run the test and confirm it fails.
3. Rebuild the page around the shared services data.
4. Re-run the services test and confirm it passes.

### Task 7: Build the New Work Page and Redirect Legacy Routes

**Files:**
- Create: `src/app/work/page.tsx`
- Modify: `src/app/portfolio/page.tsx`
- Modify: `src/app/demos/page.tsx`
- Modify: `src/app/testimonials/page.tsx`
- Test: `src/app/work/work-page.test.tsx`

**Steps:**

1. Write a failing work-page test that checks demo labeling and screenshot placeholder presence.
2. Run the test and confirm it fails.
3. Build the new `/work` page using the shared work data.
4. Convert `/portfolio`, `/demos`, and `/testimonials` into redirects to `/work`.
5. Re-run the work-page test and confirm it passes.

### Task 8: Rebuild About and Contact

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/ContactSection.tsx`
- Test: `src/app/about/about-page.test.tsx`
- Test: `src/app/contact/contact-page.test.tsx`

**Steps:**

1. Write failing tests for About and Contact:
   - About asserts first-person copy and inclusion of Belk.
   - Contact asserts `/book` CTAs and the `Start with one useful system.` message.
2. Run the tests and confirm they fail.
3. Rebuild both pages to match the approved structure and messaging.
4. Re-run the tests and confirm they pass.

### Task 9: Add `/book`, Rework Metadata, and Remove Fake Schema

**Files:**
- Create: `src/app/book/route.ts`
- Modify: `src/components/JsonLd.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`
- Modify: `src/lib/chatbot-prompt.ts`
- Test: `src/content/seo.test.ts`

**Steps:**

1. Write a failing test for shared SEO/business facts:
   - no testimonial/review schema
   - canonical numbers are `300+` and `13 years`
   - booking path is `/book`
2. Run the test and confirm it fails.
3. Implement `/book`, replace schema, update sitemap, and clean AI-facing files.
4. Re-run the SEO test and confirm it passes.

### Task 10: Restyle Blog Shell and Remove Dead Marketing Imports

**Files:**
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: any dead imports or obsolete component references discovered during build

**Steps:**

1. Update the blog listing and post wrapper to use the new shell and typography.
2. Remove obsolete marketing imports from the new app shell.
3. Run targeted linting on the changed files and fix issues.

### Task 11: Verify End-to-End

**Files:**
- No planned file changes unless verification reveals defects.

**Steps:**

1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Run the app locally and browser-check:
   - `/`
   - `/services`
   - `/work`
   - `/about`
   - `/contact`
   - `/blog`
   - `/portfolio`
   - `/demos`
   - `/testimonials`
   - `/book`
5. Fix any regressions found during verification.
