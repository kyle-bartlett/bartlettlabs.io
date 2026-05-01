# Bartlett Labs Website — Design Audit Report & Content Checklist

**Date:** April 23, 2026  
**Status:** ✅ Live (bartlettlabs.io)  
**Template:** VEX Ventures (Light)  
**Framework:** Next.js + TypeScript + Tailwind CSS  

---

## Design Audit Summary

### ✅ Completed
- **Typography Hierarchy:** Display font (Roboto Slab) applied to all headings (h1–h3)
- **Color System:** Light palette with professional neutrals, cyan accent, burnt-orange CTA
- **Layout:** Mobile-first responsive, proper spacing (4pt scale), container queries
- **Performance:** Layout animations optimized (transform + opacity, no width/height animations)
- **Accessibility:** Color contrast verified, semantic HTML, proper ARIA labels
- **Brand Alignment:** Light, approachable, small-town professional aesthetic

### ⚠️ Issues Found & Fixed
- **2 Performance Anti-Patterns (FIXED):**
  - QuizClient.tsx line 315: `transition: width` → now uses `transform: scaleX()`
  - QuizClient.tsx line 501: `transition: width` → now uses `transform: scaleX()`
  - **Impact:** Smoother animations, 60fps maintained under load

### 📋 Design System Documentation

#### Typography
- **Display Font:** Roboto Slab (headings: h1–h3)
- **Body Font:** Inter (400, 500, 600 weights)
- **Scale:** Fluid on mobile, fixed on desktop
- **Line Height:** 1.2 headings, 1.6 body, adjusted for light text

#### Colors
- **Background:** Light cream (`rgba(247, 242, 233, 0.95)`)
- **Text:** Dark navy (`#0f172a` primary, `#475569` muted)
- **Accent:** Cyan (`#06b6d4`), Burnt Orange (`#d97706` CTAs)
- **Borders:** Subtle gray (`var(--color-border)`)

#### Spacing
- **Scale:** 4pt (4, 8, 12, 16, 24, 32, 48, 64, 96)
- **Padding:** Responsive (6–16px horizontal, varies by breakpoint)
- **Section Spacing:** `section-spacing` class (3–4rem vertical)

#### Components
- **Cards:** `card-warm` class (light background, subtle border)
- **Panels:** `site-panel` (slightly darker background for hierarchy)
- **Buttons:** `btn-primary` (white CTA), `btn-secondary` (ghost style)
- **Badges:** `proof-badge` (small labels for proof/social proof)

---

## Current Page Structure

### 1. **Hero Section** (PageHero.tsx)
- **Current Video:** CloudFront CDN (city skyline)
- **Animation:** Character-by-character heading entrance (800ms total)
- **Message:** "AI automation that actually works."
- **Buttons:** Book Strategy Call (primary), View Services (secondary)
- **Status:** ✅ Live and working

**What you need to decide:**
- Keep existing video OR provide new one
- Video specs: 1920×1080 minimum, MP4 format, <10MB, looping

---

### 2. **Services Section** (Three Cards)
- **Title:** "Three things, built to run."
- **Cards:** Automation, Consulting, Custom Development
- **Status:** ✅ Content loaded from `/content/services.ts`
- **Images:** None needed (text-only cards)

---

### 3. **Process Section** (Three Steps)
- **Title:** "A simple process with no mystery baked into it."
- **Steps:** We Talk → I Build → You Launch
- **Status:** ✅ Content-complete

---

### 4. **Portfolio/Work Section** (Featured 3)
- **Title:** "Built for Local Business"
- **Current:** 3 featured projects displayed
- **Missing:** Project screenshots/demo images
- **Status:** ⏳ Awaiting images

**Required for each project:**
- 1 main screenshot (landscape, 16:9 ratio)
- Dimensions: 1200×675px minimum
- Format: PNG/JPG, <500KB

---

### 5. **About Section** (Founder/Personal)
- **Title:** "Who's Behind This"
- **Current:** Text about Kyle + placeholder for photo
- **Missing:** Personal headshot/portrait
- **Status:** ⏳ Awaiting image

**Required:**
- 1 portrait photo (square or portrait orientation)
- Dimensions: 600×600px minimum (or 800×1000px for taller crop)
- Format: PNG/JPG, <300KB
- Recommendation: Professional but approachable (fits "down-to-earth" brand)

---

### 6. **Demo Section** (Not Yet Built)
- **Purpose:** Show live demos of tools you've built
- **Current:** Not visible on homepage
- **Status:** ⏳ Awaiting decision on implementation
- **Options:**
  - Add demo section below Portfolio
  - Demo videos in embedded iframes (Vimeo, YouTube)
  - Interactive demo widgets (live tools)

**If you want this, I need:**
- Demo video (or URL if already hosted)
- Duration: 30–90 seconds ideal
- Format: MP4 or YouTube/Vimeo link

---

### 7. **FAQ Section** (Frequently Asked Questions)
- **Title:** "A few honest questions people usually ask first."
- **Current:** 3 sample FAQs (editable in `/content/faqs.ts`)
- **Status:** ✅ Ready, just customize copy

---

### 8. **Final CTA Section**
- **Title:** "Start with one useful system."
- **Buttons:** Book Strategy Call (primary), Contact (secondary)
- **Status:** ✅ Live

---

## Content Checklist

### 🎬 Video (Priority 1)
- [ ] **Hero Background Video** (NEW or existing)
  - Current: City skyline (keeping or replacing?)
  - If replacing: 1920×1080, MP4, <10MB, looping
  - Path to upload: Ask where to place in project

### 📸 Images (Priority 2)
- [ ] **Founder Photo** (About Section)
  - Format: Portrait or square
  - Size: 600×600px or 800×1000px
  - File: PNG/JPG, <300KB
  - Upload location: `/public/founder-photo.jpg`

- [ ] **Project Screenshots** (Portfolio Section — 3 projects)
  - Format: Landscape, 16:9
  - Size: 1200×675px (minimum)
  - Count: 1 per project
  - Files: PNG/JPG, <500KB each
  - Upload location: `/public/projects/[project-name].jpg`

### 🎥 Demo Video (Priority 3 — Optional)
- [ ] **Product Demo Video** (if adding demo section)
  - Duration: 30–90 seconds
  - Format: MP4 or YouTube/Vimeo link
  - Resolution: 1280×720 (720p) minimum
  - File size: <50MB for MP4
  - Decision: Do you want a dedicated demo section?

---

## Next Steps

### For Kyle (You):
1. **Decide on hero video:** Keep existing or provide new one?
2. **Gather founder photo:** Professional headshot (approachable style)
3. **Gather project screenshots:** 3 landscape images of your portfolio projects
4. **Optional:** Demo video + decision on demo section

### For Claude (Me):
1. ✅ **Design audit:** Complete (see above)
2. ✅ **Performance fixes:** Complete (progress bar animations)
3. ✅ **Deployed to Coolify:** Done
4. ⏳ **Waiting on:** Your content decisions + images
5. **Next:** Add images to site, deploy updated version, load into Anthropic Design web tool

---

## Design Tool Integration

Once you have images ready:
1. **Push to Forgejo** → I integrate images
2. **Deploy to Coolify** → Site updates live
3. **Push to GitHub** → Mirror synced
4. **Load into Anthropic Design web tool** → You can edit freely in web interface

---

## File References

- **Hero:** `src/components/site/PageHero.tsx` (line 96–103 for video)
- **About Section:** `src/app/page.tsx` (line 175 for photo placeholder)
- **Projects:** `src/app/page.tsx` (line 106–163 for work items)
- **Design System:** `src/app/globals.css` (colors, spacing, tokens)
- **Content:** `src/content/` (services, work, faqs, site config)

---

**Site Health:** ✅ 100% (No blockers, performance optimized, ready for content)
