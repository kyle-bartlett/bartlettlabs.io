# AGENTS.md — MASTER INSTRUCTIONS for bartlettlabs.io

> Read this BEFORE doing anything to the Bartlett Labs website. This applies to
> every agent: Claude Code, cloud agents, marketing platforms, and any automation.
> These rules exist because of a real incident (see bottom). Follow them exactly.

## 0. HARD RULES (never break these)

1. **NEVER change DNS, Cloudflare, or hosting to point `bartlettlabs.io` anywhere
   except the production origin below.** Do not repoint the apex, do not add a
   second A record, do not add Workers/Page Rules/Origin Rules that hijack the
   apex. The apex (`bartlettlabs.io`) belongs to the real website only.
2. **A new marketing/landing page goes on a SUBDOMAIN, never the apex.**
   e.g. `get.bartlettlabs.io`, `lp.bartlettlabs.io`. Never replace the main site.
3. **The website lives in code, not in a no-code platform.** Kyle + Claude Code
   own the website build and cold-email systems. Other platforms (e.g. Polsia)
   must not touch the site, the repos, DNS, or Cloudflare.
4. **Verify before claiming done.** After any deploy, confirm the LIVE site
   (`https://bartlettlabs.io`) actually serves the real site (title contains
   "Bartlett Labs", Meta Pixel id `2282902429201629`, header `x-powered-by: Next.js`).

## 1. Source of truth (canonical)

| Thing | Value |
|-------|-------|
| **Canonical repo (PRODUCTION)** | GitHub `kyle-bartlett/bartlettlabs.io.git`, branch `main` |
| **What deploys the site** | Coolify (app uuid `y088wgs44okc484kwowk88s8`, name `bartlettlabs-site`) builds the canonical repo and serves it |
| **Production origin server** | `149.28.249.119` (Vultr, runs Coolify + Traefik) |
| **Live domain** | `https://bartlettlabs.io` (Cloudflare-proxied → origin above) |
| **Coolify dashboard** | `https://coolify.bartlettlabs.io` |
| **Git host (primary)** | Forgejo `https://git.bartlettlabs.io` |
| **GitHub role** | Mirror of canonical, so cloud agents (no Forgejo/local access) can read/write |

### Repo divergence warning
Two GitHub repos exist and have **drifted apart**:
- `kyle-bartlett/bartlettlabs.io.git` — **CANONICAL**, what Coolify deploys (full site).
- `kyle-bartlett/bartlettlabs-site.git` — a separate, smaller local working copy. **NOT deployed.**

If you make a website change, it MUST land on the **canonical** repo or it will
not go live. Do not push the smaller repo's tree over the canonical one — they
are not the same site. Reconciling these two into one is a known open task.

## 2. Deploy workflow (the ONLY supported way to ship)

1. Commit your change to the **canonical** repo (`bartlettlabs.io.git` `main`).
2. Push to GitHub **and** Forgejo (keep both in sync — see §3).
3. **Trigger a Coolify deploy** — Coolify does NOT auto-deploy on push:
   - Via Coolify MCP: `trigger_deploy` with uuid `y088wgs44okc484kwowk88s8`, or
   - Coolify API: `POST https://coolify.bartlettlabs.io/api/v1/deploy?uuid=y088wgs44okc484kwowk88s8`
     with `Authorization: Bearer $COOLIFY_API_TOKEN`.
4. Wait for the deploy to finish, then **verify the live site** (§0 rule 4).

## 3. Keeping GitHub + Forgejo + Coolify in sync

- Canonical content = `bartlettlabs.io.git`. Treat GitHub and Forgejo as two
  remotes of the SAME history. Push the same commits to both:
  ```
  git remote add github  https://github.com/kyle-bartlett/bartlettlabs.io.git
  git remote add forgejo https://git.bartlettlabs.io/<owner>/bartlettlabs.io.git
  git push github main && git push forgejo main
  ```
- Coolify pulls from **GitHub** (`bartlettlabs.io.git`). So GitHub must always
  have the latest canonical `main` before you trigger a deploy.
- Never let a platform other than this workflow write to these repos.

## 4. Secrets / tooling notes

- Cloudflare: `CLOUDFLARE_API_TOKEN` in `~/.zshrc` (zone DNS scope). Rotate if expired.
- Coolify: `COOLIFY_API_TOKEN` in `~/.zshrc`.
- Meta Pixel (this site): `2282902429201629`. (Polsia's unrelated pixel was `1721467909009410` — do not reintroduce it.)
- The pixel is installed site-wide via `src/components/MetaPixel.tsx`, rendered in
  `src/app/layout.tsx`. It fires PageView on load and on client-side route changes.

## 5. Incident history (why these rules exist)

**2026-06-16 — Polsia DNS hijack.** Kyle signed up for the Polsia marketing
platform. It built a "PipelineOS" landing page and, instead of using a subdomain,
**repointed the Cloudflare DNS for the apex `bartlettlabs.io` to its own Render
server**, taking the real website offline for visitors. The code, repos, and
Coolify deploy were never touched — it was purely a DNS-layer override (a stray
proxied A record `216.24.57.1` added next to the real `149.28.249.119`). Fix:
deleted the rogue record; the real site returned. **Lesson: protect the apex DNS;
landing pages go on subdomains; agents/platforms never touch DNS or hosting.**
