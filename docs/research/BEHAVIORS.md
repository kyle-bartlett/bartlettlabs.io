# RhinoBot Behavior Notes

Source capture: `scripts/inspect-rhinobot.mjs`

Primary references:
- Desktop full-page screenshot: `docs/design-references/rhinobot/home-desktop-full.png`
- Mobile full-page screenshot: `docs/design-references/rhinobot/home-mobile-full.png`
- DOM/style extraction: `docs/research/rhinobot/home-desktop.json`
- Mobile extraction: `docs/research/rhinobot/home-mobile.json`

## Navigation

- Header is fixed over the page and uses dark glass styling.
- Industries and Service Areas are compact dropdowns, not separate top-level pages.
- Industry dropdown exposes 12 vertical pages.
- Service area dropdown exposes local city pages.
- Header CTAs remain visible on desktop: phone link and demo/booking link.
- Mobile navigation collapses behind a menu button.

## Page Motion

- Landing page uses a long dark hero, a continuous ticker band, card hover lifts, and simple reveal/scroll behavior.
- The extracted site does not rely on heavy video or photo content on the homepage; most proof is copy, metrics, founders, and cards.
- Bartlett Labs adaptation adds a demo/proof section because the target site was light on actual videos and product screenshots.

## Interaction Model

- CTAs repeat after major persuasion blocks.
- Industry and area cards are both navigation and sales proof.
- Pricing is treated as a comparison section rather than a standalone quote flow.
- Local pages should feel like SEO landing pages with market-specific stats, nearby places, best-fit trades, and CTA repeats.

## Brand Adaptation

- Do not copy RhinoBot name, mascot, rhino hero, phone, founders, or Austin-specific claims.
- Preserve the information architecture and conversion rhythm.
- Replace Austin/Central Texas context with Houston, Crosby, and surrounding Greater Houston service areas.
- Replace mascot visual with Bartlett Labs system console, pipeline, dispatch, and demo-proof visuals.
