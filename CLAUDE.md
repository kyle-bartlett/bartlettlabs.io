# PROJECT BRAIN: Bartlett Labs

## ⚙️ Git & Deploy — READ FIRST (settled, do not re-litigate)
- **This repo is on GitHub, NOT Forgejo.** Canonical: GitHub `kyle-bartlett/bartlettlabs.io`, branch `main`. Kyle uses Forgejo everywhere else — **this website is the one exception, because GitHub-based cloud agents need access to this repo** (and Coolify deploys it from GitHub). Repo-specific instructions win here.
- **Ship:** `git push origin main` → then trigger Coolify (app `y088wgs44okc484kwowk88s8`; it does **not** auto-deploy on push) → verify the live site.
- **Full instruction book:** `docs/GIT_HOSTING.md` + `AGENTS.md` §1. If you're ever unsure GitHub vs Forgejo here, the answer is **GitHub** — read those, don't ask again.

## 🎭 Brand Persona: The Nerdy Hillbilly
- **Voice:** Purdue Engineer meets Small-Town Handshake. Direct, honest, no jargon.
- **Visuals:** Modern Workshop. 
- **Palette:** - Background: Warm Parchment (`#F5F3F0`)
  - Primary Dark: Houston Navy (`#03202F`) - Use for text, dark cards, footer.
  - Primary Action: Astros Orange (`#FF5910`) - Use for main CTAs, highlights.
  - 3D Baseplate: macOS Mail Blue (`#007AFF`)

## 🛠 Tech Stack & UI Conventions
- **Commands:** Use `cc` for general work, `ccr` to resume.
- **Typography:** Arvo (or Roboto Slab) for headlines. Inter for body.
- **Animations:** Use Framer Motion. Spring physics (Mass: 1, Tension: 170, Friction: 26).
- **Interactions:** "Learn More" buttons must open Modals (Pop-ups) with video placeholders, NOT link away immediately.
- **Local Rules:** Always include a clickable phone number in header/footer. Include a Crosby, TX map and Texas Star SVG.

## 📍 Current State
- **Last Milestone:** Initial layout built, transitioning to v2.0 Houston/Workshop aesthetic.
- **Active Context:** Rebuilding Hero 3D animations, Services Modals, and Guarantee Carousel.