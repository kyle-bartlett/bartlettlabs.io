# Bartlett Labs Site Rebuild Design

Date: 2026-03-22

## Goal

Rebuild `bartlettlabs.io` as a trust-first founder site that reflects Kyle Bartlett's real experience, honest proof, and real active offers without inheriting drift from the current implementation.

## Locked Business Truths

- Use `300+ automations` as the canonical automation count.
- Use `13 years` as the canonical post-college experience count.
- Career path is `Purdue -> Sears -> Belk -> Apple -> Anker`.
- Testimonials are not real and must be removed from UI, metadata, and schema.
- Do not promise `24-hour quotes` site-wide.
- Use photo and screenshot placeholders for now.
- Public booking links should go through `/book`, which redirects to the active GHL calendar.

## Information Architecture

### Primary Navigation

- Services
- Work
- About
- Blog
- Contact

### Footer-Only Links

- Quiz
- Calculator
- Store
- Privacy Policy
- Data Deletion

### Redirects

- `/portfolio` -> `/work`
- `/demos` -> `/work`
- `/testimonials` -> `/work`
- `/book` -> external GHL booking URL

## Visual System

### Design Direction

Modern Workshop: calm, grounded, high-trust, founder-led, and built for real local businesses rather than AI hype.

### Typography

- Headlines: `Arvo`
- Body: `Public Sans`
- Utility labels: `IBM Plex Mono`

### Color Palette

- Background: `#F4EFE6`
- Surface: `#FBF8F2`
- Primary text: `#142235`
- Secondary text: `#5A6778`
- Accent: `#C96A2B`
- Accent hover: `#A8511C`
- Border: `#D7D0C4`
- Proof highlight: `#2E7C7B`

### Interaction Principles

- Minimal motion only where it adds clarity.
- Strong section rhythm and editorial spacing.
- Larger proof panels instead of dashboard-style widget cards.
- No dark mode for v1.

## Content Strategy

### Homepage

Section order:

1. Hero
2. Credibility strip
3. What I Build
4. How It Works
5. Built for Local Business
6. Who's Behind This
7. FAQ
8. Final CTA

Key rules:

- Remove the fake dashboard widget.
- Keep only the three core service categories.
- Replace testimonials with honest work previews.
- Keep the founder story short and personal.
- Use `/book` for booking CTAs.

### Services

Keep only:

1. Website Design & Development
2. AI Chatbots & Agents
3. Workflow Automation
4. Consulting & Advisory

Remove:

- Social Media Management
- Digital Products
- Starter / Growth / Enterprise pricing tiers

### Work

- Merge portfolio and demos into one page at `/work`.
- Every item is clearly labeled `Demo`.
- Each item includes a large screenshot placeholder, problem, what was built, before, after, and live demo slot.
- No emoji icons, testimonials, or vanity stats bar.

### About

- Fully first person.
- Keep the personal origin story.
- Explicitly include Sears, Belk, Apple, and Anker.
- Remove third-person bio language, the AI-team framing, and stats bars.

### Contact

- Lead with `Start with one useful system.`
- Keep direct contact info and form.
- Keep booking embed.
- Public CTAs resolve through `/book`.

### Blog

- Preserve the route structure.
- Update the surrounding layout to match the new visual system.
- Leave a separate content truth-audit for later.

## Technical Design

### Shared Content Layer

Create shared content modules so canonical facts only exist once:

- `src/content/site.ts`
- `src/content/services.ts`
- `src/content/work.ts`
- `src/content/faqs.ts`

This layer should power:

- navigation and footer links
- business facts
- booking destination
- services content
- work content
- FAQ content
- page metadata where practical

### New Marketing Component Set

Rebuild the marketing UI around a smaller reusable set:

- `SiteHeader`
- `SiteFooter`
- `SectionIntro`
- `PageHero`
- `ProofStrip`
- `ServiceCard`
- `WorkCard`
- `PhotoPlaceholder`
- `ScreenshotPlaceholder`
- `FinalCallout`

### Cleanup Requirements

- Remove fake review and testimonial schema.
- Remove AI-team language.
- Remove pricing tiers from the active marketing surface.
- Remove dark-mode toggle from the marketing shell.
- Remove or disable the chat widget for v1 unless it is intentionally restored later.
- Update sitemap entries to match the new IA.

## Verification Requirements

- `npm run lint`
- `npm run build`
- Browser-check homepage, services, work, about, contact, and blog pages.
- Confirm redirects behave correctly.
- Confirm `/book` resolves correctly.
- Confirm no testimonial or review schema remains.
- Confirm all visible site facts use `300+` and `13 years`.
