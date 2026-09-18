# Widgo follow-up audit

Checked September 18, 2026 (America/Chicago). Prompts 1–6 pass. Slack is blocked by Widgo's Slack app configuration.

## Results

| Prompt | Result | Production evidence |
| --- | --- | --- |
| 1. Website | PASS | Canonical site deployed; copy, pricing, routes, Widgo loader, tests, build, and live checks pass. |
| 2. CRM inbound API | PASS | CRM release `98e550f`; health 200; authenticated lead creation and duplicate handling pass; full required checks green. |
| 3. Cal.com to CRM | PASS | n8n workflow `U11gbievhFsrNJyv` active; Cal subscription `d865f9a9-c623-4e30-ad17-5a172f4cdadf` active; execution `8` created the CRM lead and delivered the Pushover alert. |
| 4. Knowledge PDF | PASS | Version 2 PDF indexed; old PDF removed; guardrail unchanged; readiness 100%. |
| 5. Widget | PASS | Live Chrome launcher and `Kyle's AI` popup verified; Widgo reports Next.js detected. |
| 6. Hot leads | PASS | n8n workflow `WAqPU11nJunRn3N5` active; execution `9` succeeded through Gmail parsing, CRM creation, `CRM-synced` labeling, and Pushover delivery. |

## Current n8n configuration

- Editor and webhooks: `https://n8n.bartlettlabs.io`
- Production origin: `149.28.249.119`
- Old sslip hostname remains a compatibility route.
- Cal webhook: `https://n8n.bartlettlabs.io/webhook/calcom-booking`
- Hot-lead Gmail query: `from:widgo.ai newer_than:1d`, every five minutes.
- Gmail OAuth account: `krbartle@gmail.com`; no secrets are stored in this document or repository.
- Pushover application: `Bartlett Labs Alerts`; its n8n credential is restricted to
  `api.pushover.net`. Hot-lead and booked-audit alert nodes continue on error, so notification
  downtime cannot block CRM ingestion or Gmail labeling.

## Prompt 6 test evidence

Gmail still contains no vendor-originated message from `widgo.ai`. A live self-addressed message was
delivered after the production Gmail trigger was active. Execution `6` ran in trigger mode through
`Add CRM-synced label`; CRM returned `ok=true`, `created=true`, `duplicate=false`. Gmail message
`1a0b6484aa29cb08` received label `CRM-synced`. The production query
`from:widgo.ai newer_than:1d` and five-minute interval were restored and verified active afterward.

Detailed evidence: `widgo_bartlettlabs/evals/p6-all.evidence.txt`.

## Slack status

Slack login is valid. Widgo's OAuth request fails with `invalid_team_for_non_distributed_app` for
workspace `KB`. Widgo must distribute or allowlist its Slack app before Bartlett Labs can install it.
No local login, DNS, or workspace change can resolve that provider-side restriction.
The authenticated Widgo support thread has been escalated and is `Waiting for a teammate`.
Pushover now supplies the production phone-alert path independently of Slack.

## Closeout

- Kyle confirmed receipt of both production phone alerts on September 18, 2026.
- The operator and showcase architecture views now show the live post-CRM Pushover route; all three Archify artifacts pass 9/9 showcase checks with zero errors and zero warnings.
- Six controlled `example.com` test contacts were archived through an exact ID-and-email guard. Verification returned `active=0` and `archived=6`; no real contacts, companies, or deals were changed.
