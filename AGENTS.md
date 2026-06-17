# AGENTS.md — MASTER INSTRUCTIONS for bartlettlabs.io

> Read this BEFORE doing anything to the Bartlett Labs website. This applies to
> every agent: Claude Code, cloud agents, marketing platforms, and any automation.
> These rules exist because of real incidents (see §6). Follow them exactly.
> Detailed SMS/A2P rules live in `docs/A2P_SMS_COMPLIANCE.md` — read it before touching
> the chat widget, the contact form, or the SMS pages.

## 0. HARD RULES (never break these)

1. **NEVER change DNS, Cloudflare, or hosting to point `bartlettlabs.io` anywhere
   except the production origin `149.28.249.119`.** Do not repoint the apex, do not
   add a second A record, do not add Workers/Page Rules/Origin Rules that hijack the
   apex. The apex belongs to the real website only.
2. **A new marketing/landing page goes on a SUBDOMAIN, never the apex.**
   e.g. `get.bartlettlabs.io`, `lp.bartlettlabs.io`. Never replace the main site.
3. **The website lives in code, not in a no-code platform.** Kyle + Claude Code own
   the website. Other platforms (e.g. Polsia) must not touch the site, repos, DNS, or Cloudflare.
4. **SMS/A2P: the chat widget goes on form-free pages ONLY.** Never put it on a page
   that collects a phone number or SMS consent, and never make it global (it must NOT
   be in `app/layout.tsx`). It currently lives in `src/app/page.tsx` (homepage only).
   See `docs/A2P_SMS_COMPLIANCE.md`. This is why the carrier kept rejecting the campaign.
5. **Verify before claiming done.** After any deploy, confirm the LIVE site
   (`https://bartlettlabs.io`) serves the real site (title contains "Bartlett Labs",
   Meta Pixel `2282902429201629`, header `x-powered-by: Next.js`).

## 1. Source of truth (canonical)

| Thing | Value |
|-------|-------|
| **Canonical repo (PRODUCTION)** | GitHub `kyle-bartlett/bartlettlabs.io.git`, branch `main` |
| **What deploys the site** | Coolify (app uuid `y088wgs44okc484kwowk88s8`) builds the canonical repo and serves it |
| **Production origin server** | `149.28.249.119` (Vultr, runs Coolify + Traefik) |
| **Live domain** | `https://bartlettlabs.io` (+ `www` redirects to apex). Cloudflare-proxied → origin above |
| **Coolify dashboard** | `https://coolify.bartlettlabs.io` (API is at `http://149.28.249.119:8000/api/v1`, NOT the dashboard host) |
| **Local working dir** | `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/bartlettlabs-site` — its `origin` is the canonical repo |

### Repo history (collapse done 2026-06-16)
There used to be two divergent GitHub repos. This is now resolved:
- `kyle-bartlett/bartlettlabs.io.git` — **CANONICAL**, deployed, and what the local folder tracks.
- `kyle-bartlett/bartlettlabs-site.git` — **ARCHIVED** (read-only). Old stripped-down copy. Do not use.
- Forgejo `kyle/bartlettlabs` and `kyle/bartlettlabs-site` — **ARCHIVED** (stale). Forgejo has no live mirror right now.

Make all website changes on the canonical repo. Do not resurrect the archived repos.

## 2. Deploy workflow (the ONLY supported way to ship)

1. Commit your change to the canonical repo (`origin` / `bartlettlabs.io.git` `main`) and push.
2. **Trigger a Coolify deploy** — Coolify does NOT auto-deploy on push:
   - Coolify MCP: `trigger_deploy` with uuid `y088wgs44okc484kwowk88s8` (`force: true` for a full rebuild), or
   - API: `POST http://149.28.249.119:8000/api/v1/deploy?uuid=y088wgs44okc484kwowk88s8` with `Authorization: Bearer $COOLIFY_API_TOKEN`.
3. Wait for the deploy to finish, then **verify the live site** (§0 rule 5).

## 3. Secrets / tooling notes

- Cloudflare: `CLOUDFLARE_API_TOKEN` in `~/.zshrc` (zone DNS scope; rotate if expired). Zone id `78b07d9796e42aa521c40da157b98258`.
- Coolify: `COOLIFY_API_TOKEN` in `~/.zshrc`. API base `http://149.28.249.119:8000`.
- GitHub: `gh` CLI authed as `kyle-bartlett`. Forgejo: git credential user `kyle` (token).
- Meta Pixel `2282902429201629` (site-wide, `src/components/MetaPixel.tsx`). Polsia's pixel `1721467909009410` — do NOT reintroduce.

## 4. Keep the repo lean

The repo was bloated to 10k+ files with non-site junk (Remotion templates, lead CSVs,
scrapers, screenshots, exports). It's now ~200 files. `.gitignore` blocks the worst
offenders. Do not commit: lead data/CSVs, scraping scripts, screenshots, exports, or
unrelated business docs. Site assets go in `/public`.

## 5. Repo layout

`src/` (Next.js 16 App Router app), `public/`, `scripts/`, `docs/` (incl. this compliance
playbook), config files. Homepage = `src/app/page.tsx` → `GrowthSystemHome`. Header/footer
= `src/components/site/`. Contact form = `src/components/ContactForm.tsx`.

## 6. Incident history (why these rules exist)

- **2026-06-16 — Polsia DNS hijack.** Polsia (marketing platform) built a "PipelineOS"
  landing page and repointed the Cloudflare apex `bartlettlabs.io` to its own Render server
  (a stray proxied A record `216.24.57.1` next to the real `149.28.249.119`), taking the
  site offline. Code/repos/Coolify were untouched — purely DNS. Fix: deleted the rogue
  record. **Lesson: protect the apex; landing pages go on subdomains; platforms never touch DNS.**
- **2026-06-17 — A2P/SMS compliance.** ~10 carrier rejections traced to: opt-in URL pointing
  to a form that didn't exist, a 2FA/use-case mismatch, pre-checked/"optional" consent, and
  terms/privacy links to LeadConnector instead of our own pages. Fixed: widget is the single
  opt-in on the form-free homepage; contact form's SMS consent removed. See `docs/A2P_SMS_COMPLIANCE.md`.
