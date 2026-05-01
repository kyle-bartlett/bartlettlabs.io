# IndustryLandingPage Spec

Component: `src/components/site/IndustryLandingPage.tsx`

Route: `/industries/[slug]`

## Data

Uses `IndustryProfile` entries from `src/content/growth-system.ts`.

Each page includes:
- Industry title and local Houston positioning.
- Revenue-loss, response-speed, and review statistics.
- Automation bullets tailored to the trade.
- Keyword themes for search relevance.
- Three shared system engines.
- Links into service-area pages.
- Industry-specific FAQ.

## SEO

- `generateStaticParams()` emits every industry.
- Metadata uses the profile title, summary, and slug.
- JSON-LD is emitted as a local business service page.

## Adaptation Notes

The reference site uses industry pages as deep conversion landing pages. Bartlett Labs keeps that structure but writes original Houston-focused content and avoids RhinoBot trade dress.
