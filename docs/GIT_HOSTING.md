# Git Hosting — GitHub vs Forgejo (the settled answer)

> Read this whenever you're unsure where to push `bartlettlabs.io` or why
> the "use Forgejo" rule doesn't apply here. This is the full story so the
> question never has to be re-litigated. Companion to `AGENTS.md` §1.

---

## 1. The one-line answer

**This website lives on GitHub, deploys from GitHub, and you push to GitHub.**
Forgejo is **not** used for this site. It is the **one exception** to Kyle's
"Forgejo everywhere" rule, because GitHub-based **cloud agents need access to
this repo**. Pushing to `origin` (GitHub `kyle-bartlett/bartlettlabs.io`, branch
`main`) is correct.

```
git push origin main        # GitHub — the canonical, deployed repo
# then trigger a Coolify deploy (Coolify does NOT auto-deploy on push)
```

## 2. Why this is confusing (the contradiction to know about)

There are two instruction sources that disagree, on purpose:

| Source | Says | Scope |
|--------|------|-------|
| Global `/Volumes/Bart_26/.claude/CLAUDE.md` | "No longer using GitHub. Git hosting is Forgejo (`git.bartlettlabs.io`)." | **General default** across Kyle's projects |
| This repo's `AGENTS.md` §1 + this doc + the live Coolify config | Canonical = **GitHub** `kyle-bartlett/bartlettlabs.io`; Forgejo archived/no live mirror. | **This repo specifically** |

**Repo-specific instructions win for this repo.** The global rule is the
default direction for Kyle's *other* projects (and possibly this one in the
future), but the production website is on GitHub today because that is what
Coolify actually builds and serves. Don't "fix" the site to Forgejo to satisfy
the global rule — that would break the deploy. If you migrate it later, do §7
deliberately and update **both** files.

## 3. Current reality (verified 2026-06-21)

| Thing | Value |
|-------|-------|
| Canonical repo (PRODUCTION) | GitHub `kyle-bartlett/bartlettlabs.io.git`, branch `main` |
| Local `origin` | the canonical GitHub repo (only remote configured) |
| What deploys the site | Coolify app `y088wgs44okc484kwowk88s8` — clones the **GitHub** repo `main` and builds it |
| Auto-deploy on push? | **No.** Coolify must be triggered after every push (see §4) |
| Production origin server | `149.28.249.119` (Vultr; Coolify + Traefik) |
| Live domain | `https://bartlettlabs.io` (+ `www` → apex), Cloudflare-proxied → origin |
| GitHub auth | `gh` CLI authed as `kyle-bartlett` (scopes incl. `repo`, `workflow`) |
| Forgejo server | `git.bartlettlabs.io` is **up** (HTTP 200) but holds only **archived/stale** copies of this site; it is **not** in the deploy path |

## 4. How to ship (the only supported way)

```bash
# 1. Commit + push to GitHub (origin/main)
git add <files> && git commit -m "..." && git push origin main

# 2. Trigger the Coolify deploy — pick ONE:
#    a) Coolify MCP:  trigger_deploy(uuid="y088wgs44okc484kwowk88s8")
#    b) API:
curl -X POST "http://149.28.249.119:8000/api/v1/deploy?uuid=y088wgs44okc484kwowk88s8" \
     -H "Authorization: Bearer $COOLIFY_API_TOKEN"

# 3. Wait for the build, then verify the LIVE site (AGENTS.md §0 rule 5)
```

## 5. What NOT to do

- **Do not push the site to Forgejo expecting it to deploy** — Coolify pulls
  from GitHub. A Forgejo push goes nowhere near production.
- **Do not resurrect the archived repos:** GitHub `kyle-bartlett/bartlettlabs-site.git`
  (old stripped copy) or the Forgejo `kyle/bartlettlabs*` mirrors. All stale.
- **Do not add a second `origin`** or repoint `origin` to Forgejo without doing
  the full §7 migration (Coolify source must move in lockstep, or the deploy
  silently keeps building the old GitHub repo).
- **Do not delete the GitHub repo** to "force" Forgejo — that orphans the deploy.

## 6. History — why GitHub, not Forgejo

On **2026-06-16** the project had diverged across multiple repos. It was
collapsed to a single canonical repo:

- `kyle-bartlett/bartlettlabs.io.git` (GitHub) — **CANONICAL**, deployed, tracked locally.
- `kyle-bartlett/bartlettlabs-site.git` (GitHub) — **ARCHIVED** (old stripped copy).
- Forgejo `kyle/bartlettlabs`, `kyle/bartlettlabs-site` — **ARCHIVED** (stale, no live mirror).

**Why it stays on GitHub (the actual reason):** GitHub-based **cloud agents**
need to access this repo, so it must stay on GitHub — this is deliberate, not
lag. On top of that, Coolify is wired to the GitHub repo, so GitHub is also
load-bearing for the deploy. Kyle uses Forgejo for everything else; this one
website is the single intentional exception. That's the whole "issue": the
global default is Forgejo, but this repo is GitHub **on purpose**. Do not "fix"
it to Forgejo.

## 7. If you ever move this site to Forgejo (migration runbook — NOT done yet)

**Not planned, and probably never.** This site is on GitHub on purpose —
GitHub-based cloud agents need access to it — so migrating to Forgejo would cut
those agents off. This runbook exists only for completeness if that requirement
ever disappears. Don't start it casually; all steps must land together or the
deploy breaks.

1. **Create the Forgejo repo:** `git.bartlettlabs.io/kyle/bartlettlabs.io` (fresh, not the archived one).
2. **Push the full history:** `git remote add forgejo https://git.bartlettlabs.io/kyle/bartlettlabs.io.git && git push forgejo main` (and tags).
3. **Give Coolify access to Forgejo:** add a deploy key / source (Coolify → app `y088wgs44okc484kwowk88s8` → Source). Forgejo creds: git user `kyle` (token in `~/.zshrc`).
4. **Repoint the Coolify app's git source** from the GitHub repo to the Forgejo repo, same branch `main`.
5. **Repoint local `origin`:** `git remote set-url origin https://git.bartlettlabs.io/kyle/bartlettlabs.io.git` (optionally keep `github` as a backup remote).
6. **Do one full deploy + live verification** before trusting it.
7. **Archive the GitHub repo** only after Forgejo has shipped a verified build.
8. **Update the docs in lockstep:** this file §1–§3, `AGENTS.md` §1, and remove the
   per-repo exception from the global `/Volumes/Bart_26/.claude/CLAUDE.md` (or flip it).

Until every step above is done and verified: **GitHub is production. Push to GitHub.**
