# Growth Header Spec

Component: `src/components/site/SiteHeader.tsx`

## Desktop

- Fixed dark glass header.
- Bartlett Labs brand lockup.
- Dropdown button for Industries.
- Dropdown button for Service Areas.
- Direct links: How it works, Demos, Pricing, Work, Contact.
- Persistent phone CTA and Request Audit CTA.

## Dropdowns

- Industry dropdown renders every `industries` record from `src/content/growth-system.ts`.
- Service area dropdown renders every `serviceAreas` record.
- Dropdowns are hover/focus driven with compact panels to avoid overwhelming the top nav.

## Mobile

- Single menu button toggles a full mobile panel.
- Mobile panel lists industry and service-area links directly.
- Phone and booking CTAs remain visible in the menu.
