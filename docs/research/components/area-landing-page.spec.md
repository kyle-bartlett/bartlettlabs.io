# AreaLandingPage Spec

Component: `src/components/site/AreaLandingPage.tsx`

Route: `/areas/[slug]`

## Data

Uses `ServiceAreaProfile` entries from `src/content/growth-system.ts`.

Each page includes:
- Local area headline and map-style market framing.
- Population, growth, missed-response, and response-speed stats.
- Local business context.
- Best-fit industry links.
- Neighborhood/service-zone list.
- Shared three-engine system.
- Launch checklist and CTA.

## SEO

- `generateStaticParams()` emits every service area.
- Metadata uses local page title and summary.
- Sitemap includes all area pages.

## Adaptation Notes

The reference site localizes city pages around Central Texas. Bartlett Labs shifts that system to Houston, Crosby, Baytown, Humble, Kingwood, Pasadena, and other Greater Houston markets.
