# Bartlett Labs Site Asset Checklist

Updated: 2026-03-22

## What Is Already Done

- The live site now has a central asset manifest in `src/content/assets.ts`.
- Founder photos and work screenshots will swap in automatically once the expected files exist in `public/images/...`.
- If a file is missing, the current placeholder stays in place cleanly. No broken image state should appear.

## Fastest Win

If you only get a small window to gather assets, prioritize these in order:

1. Homepage founder portrait
2. About-page founder portrait
3. Santiago's Auto Repair primary screenshot
4. 5 Stars Electric primary screenshot
5. Doggie World Grooming primary screenshot

Those first five assets cover the biggest trust surfaces on the homepage, about page, and top of the work story.

## Founder Photos

### 1. Homepage Hero Portrait

- Drop path: `public/images/founder/kyle-home-portrait.jpg`
- Used on: `/`
- Minimum size: `1600 x 2000`
- Preferred ratio: `4:5`
- Best version:
  - vertical portrait
  - direct eye contact
  - approachable but confident
  - neutral or lightly textured background
  - enough extra space to survive mobile cropping

### 2. About Page Portrait

- Drop path: `public/images/founder/kyle-about-portrait.jpg`
- Used on: `/` and `/about`
- Minimum size: `1600 x 2000`
- Preferred ratio: `4:5`
- Best version:
  - different image than the homepage
  - slightly more personal or environmental is fine
  - still clean and professional
  - avoid cluttered background elements

## Work Screenshots

General guidance for every work screenshot:

- Drop format: `.jpg`
- Minimum size: `1600 x 1000`
- Preferred ratio: `16:10`
- Best capture:
  - desktop browser width
  - readable text
  - strongest above-the-fold section
  - minimal browser chrome
  - no giant empty margins

### 1. Santiago's Auto Repair

- Drop path: `public/images/work/santiagos-auto-repair-primary.jpg`
- Used on: `/`, `/work`
- Best shot: homepage or service-page hero with strongest booking / trust layout

### 2. 5 Stars Electric

- Drop path: `public/images/work/five-stars-electric-primary.jpg`
- Used on: `/work`
- Best shot: lead-capture or trust-heavy section

### 3. Doggie World Grooming

- Drop path: `public/images/work/doggie-world-grooming-primary.jpg`
- Used on: `/work`
- Best shot: scheduling or service-overview view

### 4. Lake Houston Fitness

- Drop path: `public/images/work/lake-houston-fitness-primary.jpg`
- Used on: `/work`
- Best shot: membership or class-schedule section

### 5. CYCLE Landscaping

- Drop path: `public/images/work/cycle-landscaping-primary.jpg`
- Used on: `/work`
- Best shot: gallery-forward or estimate-request section

### 6. Straight Off the Road BBQ

- Drop path: `public/images/work/straight-off-the-road-bbq-primary.jpg`
- Used on: `/work`
- Best shot: menu or catering conversion section

## Screenshot Capture Tips

- If a page looks best on desktop, use desktop. Do not force mobile screenshots into the current layout.
- JPG is preferred for photos and full-page screenshots.
- PNG is fine if text sharpness matters more than file size.
- Keep the screenshot honest. No fake analytics overlays or invented proof.

## When You Have More Time Later

Nice-to-have follow-ups after the core asset drop:

- second screenshot per work item for future gallery expansion
- real project photography if any concepts become live client work
- a tighter founder headshot crop for future social/share graphics
- custom OG image built from the final portrait

## Drop-In Rule

Once you have the files:

1. place them at the exact paths above
2. rebuild or redeploy the site
3. the manifest-backed placeholders should swap automatically

No additional copy rewrite should be needed just to show the assets.
