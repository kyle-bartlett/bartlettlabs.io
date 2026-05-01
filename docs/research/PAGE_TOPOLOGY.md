# Page Topology

## Target Homepage Structure

Desktop extraction found 12 major homepage sections and a 1440 x 16749 full-page composition.

1. Dark hero with primary CTA, secondary CTA, and animated system visual.
2. Problem framing around missed calls, after-hours demand, and reviews.
3. Three-engine system: lead capture, lead conversion, reputation growth.
4. Metric band for conversion outcomes.
5. Industry directory grid.
6. Social proof and trust section.
7. Founder credibility section.
8. Process section from kickoff to launch.
9. Service-area directory.
10. Pricing tiers.
11. Expansion modules.
12. Final CTA and footer.

## Bartlett Labs Implementation

Implemented as a Bartlett-branded growth system, not a literal RhinoBot copy.

- Homepage component: `src/components/site/GrowthSystemHome.tsx`
- Data source: `src/content/growth-system.ts`
- Header/dropdowns: `src/components/site/SiteHeader.tsx`
- Industry template: `src/components/site/IndustryLandingPage.tsx`
- Area template: `src/components/site/AreaLandingPage.tsx`

## Generated Pages

- 12 industry routes under `/industries/[slug]`
- 20 service-area routes under `/areas/[slug]`
- Sitemap emits every generated industry and area URL.

## Visual Tokens Extracted

- Target fonts: Inter and Montserrat.
- Target high-contrast base: near-black, white, gray.
- Target accent: orange `rgb(255, 91, 31)`.
- Bartlett adaptation keeps the orange energy but grounds it in Houston Navy `#03202F`, warm parchment `#F5F3F0`, and Bartlett brand copy.

## Content Strategy

- Every industry page gets: market stat, missed-revenue stat, speed/review impact, automations, keyword themes, FAQs, and service-area links.
- Every area page gets: local market snapshot, growth signal, missed-response pressure, neighborhoods, best-fit industries, and CTA.
- Demo/proof content is first-class on the homepage so Bartlett Labs can showcase real systems and videos.
