# Demo videos

Drop the recorded demo walkthroughs here. The Service Demo Modal will pick
them up automatically — no code changes needed.

## File naming

For each service in `src/content/services.ts`, three files:

| File | Purpose | Format |
|------|---------|--------|
| `<slug>.mp4` | Primary video source | MP4 (H.264 + AAC), 1080p, ≤ 90s |
| `<slug>.webm` | Smaller secondary source | WebM (VP9), 1080p — optional |
| `<slug>.jpg` | Poster frame shown before play | JPEG, 1920×1080 |

Slugs map to the `videoPath` set in each service's `demo` field:

- `missed-call-text-back.{mp4,webm,jpg}`
- `automated-follow-ups.{mp4,webm,jpg}`
- `simple-crm-dashboard.{mp4,webm,jpg}`
- `consulting-advisory.{mp4,webm,jpg}`
- `bartlett-labs-overview.{mp4,webm,jpg}` (top-level overview reel)

## Placeholder behavior

If a video file is missing, the modal automatically falls back to the
"Walkthrough coming soon" placeholder treatment. This means it's safe to
ship the site with a partial set of demos — the missing ones simply
display the placeholder.

## Recording reference

See the recording shot list in the project context doc for what to film
in each clip. Quick summary:

1. **missed-call-text-back** (~60s) — owner misses a call → auto-text fires → lead replies → estimate booked
2. **automated-follow-ups** (~60s) — quote stuck 4 days → follow-up fires → reply → won
3. **simple-crm-dashboard** (~75s) — sticky-note chaos → mobile inbox → desktop pipeline
4. **consulting-advisory** (~75s) — whiteboard breakdown OR talking head OR document review
5. **bartlett-labs-overview** (~90s) — sizzle reel tying all four engines together

## Compression targets

For homepage performance, target:

- MP4 H.264 baseline profile, ≤ 4 Mbps bitrate
- WebM VP9 ≤ 2.5 Mbps bitrate
- Poster JPEG ≤ 200 KB (use `cwebp -q 80` or similar after encoding)

A 60–90 second clip should land around 25–40 MB MP4 and 18–28 MB WebM.
