# Demo assets

The Service Demo Modal supports two display modes per service:

1. **Image-only** (current default) — when `demo.posterPath` is set but `demo.videoPath` is not, the modal renders the static image full-bleed. Lightweight, instant load, no streaming dependency.
2. **Video** — when `demo.videoPath` is set, the modal renders a `<video>` player with the poster image as the preview frame.

The modal automatically picks whichever mode the data has configured. To upgrade a demo from image-only to video, just uncomment the `videoPath` line in `src/content/services.ts` (or `src/content/demoShowcase.ts` for the homepage demos) and drop the MP4 in this folder.

## v1 ships with image-only demos

Until Kyle's GHL business line clears A2P approval, we can't record real GoHighLevel walkthroughs. So v1 ships with AI-generated UI mockup images that look like real product screenshots. Real videos can be swapped in later with no code changes — just replace the JPG and add the MP4.

## Filenames currently in use

- `missed-call-text-back.jpg` — Missed Call Text-Back service + homepage demo
- `automated-follow-ups.jpg` — Automated Follow-Ups service + homepage Make.com demo
- `simple-crm-dashboard.jpg` — Simple CRM Dashboard service + homepage CRM demo
- `consulting-advisory.jpg` — Consulting & Advisory service
- `bartlett-labs-overview.jpg` — top-level overview reel

## When you record real videos

For each demo, drop three files (the modal picks them up automatically):

| File | Format |
|------|--------|
| `<slug>.mp4` | MP4 (H.264 + AAC), 1080p, ≤ 90s, ≤ 4 Mbps |
| `<slug>.webm` | WebM (VP9), optional but smaller, ≤ 2.5 Mbps |
| `<slug>.jpg` | Poster (already exists from v1) |

Then in `services.ts` / `demoShowcase.ts`, uncomment the `videoPath` and `videoPathWebm` lines for that demo.

## Recording reference (for later)

1. **missed-call-text-back** (~60s) — owner misses a call → auto-text fires → lead replies → estimate booked
2. **automated-follow-ups** (~60s) — quote stuck 4 days → follow-up fires → reply → won
3. **simple-crm-dashboard** (~75s) — sticky-note chaos → mobile inbox → desktop pipeline
4. **consulting-advisory** (~75s) — whiteboard breakdown OR talking head OR document review
5. **bartlett-labs-overview** (~90s) — sizzle reel tying all four engines together
