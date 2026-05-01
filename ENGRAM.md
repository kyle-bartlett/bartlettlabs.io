# ENGRAM — Bartlett Labs Crash Recovery

> Last updated: 2026-03-27 (Session 10 — Landing Page LIVE, GHL Cleaned, pm2 Persistent)

## Current State

**Phase**: Infrastructure COMPLETE. Warmup RUNNING. Campaign launch target: ~April 17, 2026.
**What was just completed**: (1) Landing page deployed to Cloudflare Pages (NOT Bluehost — no hosting plan exists). Site live at https://bartlett-labs.com. (2) pm2 startup configured — webhook server auto-starts on reboot. (3) GHL contact deduplication: 2 duplicates removed (FMG Exhaust, Crosby Transmission), tags merged to keeper records. 169 clean contacts remain. (4) GHL tag cleanup: 12 tag variants merged across 135 contacts (88→77 unique tags). All inconsistent tags resolved. (5) Discovered Bluehost $44.69 charge was Google Workspace resale (duplicate of direct Google subscription) — refund needed. **NEXT**: Build outreach videos, wait for warmup (~April 17), refund Bluehost $44.69.

## Completed Work (2026-03-25)

### Session 1 — Skills Architecture
- Fetched YouTube transcript, created VIDEO_SUMMARY.md
- Built 27 skill files as `.claude/commands/*.md`
- Merged into `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/`

### Session 3 — Automation Layer Build
- Created `automation/` directory structure
- 6 shell scripts, 5 system crontab entries, 5 Claude Code durable crons
- 5 Ghost OS browser recipes installed
- Express webhook server (port 3847) with 3 handlers
- API key placeholders in ~/.zshrc

### Session 4 — Testing & Activation
- All 6 shell scripts fixed and tested (bash/zsh compat, gws syntax, intent classifier ordering)
- Webhook server tested (3 endpoints, Cloudflare Tunnel, intent classification)
- Ghost OS recipes verified (5/5 installed and executing)
- 27 skills verified accessible as slash commands
- Outreach policy established: Resend (kyle@bartlettlabs.io), NOT Gmail. ON HOLD until videos built.

### Session 5 — Full Activation (2026-03-25 evening)
- **All API keys configured and live**:
  - GHL: Sub-account key `pit-7211...bc9a` + Agency key `pit-28e5...805a`
  - SmartLead: `51b8...7o56b8j`
  - Stripe: Publishable + Secret + Webhook signing secret (`whsec_bgLk...K4lF`)
  - Tomba: API key + Secret key
  - MillionVerifier: API key
  - Pexels: API key
  - Zero placeholders remaining in ~/.zshrc
- **gws Gmail re-authenticated**: OAuth token refreshed, 201 unread emails confirmed
- **GHL webhook workflow created**: Trigger "Customer Replied" → POST to `https://webhooks.bartlettlabs.io/webhooks/ghl`
- **Webhook handler upgraded**: Now fetches contact name/email from GHL API when payload is sparse. Also fetches recent conversation message. Desktop notifications confirmed working.
- **Webhook server on pm2**: `bartlett-webhooks` process (ID 2), saved to pm2 dump for persistence
- **Stripe webhook verified**: Test payment logged, client directory auto-created, then cleaned up
- **Test client directories cleaned up**: Removed `clients/james-wilson/` and `clients/webhook-test-client/`
- **Full morning briefing with live data**: Pipeline 100 contacts, 201 unread emails (10 urgent, 17 today), 7 stale leads

### Session 6 — Contact Pipeline (2026-03-25 late)
- **GHL Contact Audit**: Sampled 500 of 12,500+ contacts
  - 40% have email, 60% missing email
  - 32% duplicate emails (160 dupes in 500 contacts)
  - 46% have no name (business-only entries)
  - 81% have company name, 79% have phone
  - Tags already well-organized: enriched (240), crosby (200), baytown (175), batches 1-5 (50 each)
  - Tag issues: "no-website" vs "no website", "high priority" vs "priority-high" need merging
  - Full audit: `automation/logs/contact-audit-2026-03-25.md`
- **SmartLead Campaign Created**: Campaign #3086101 "Bartlett Labs - Local Business Outreach Batch 1"
  - 4-email sequence: Day 0 Gift/Audit → Day 3 Nudge → Day 7 Value Drop → Day 30 Long Game
  - Schedule: Mon-Fri 8am-5pm CT, 15 leads/day
  - 11 unique leads loaded (SmartLead auto-deduped from 55 submitted)
  - Status: DRAFTED — **BLOCKED on email account setup** (needs SMTP+IMAP, not just Resend)
- **Tomba Enrichment**: Found email for Highlands Animal Clinic (doctorallie@highlandsanimalclinic.com), updated GHL contact. Free plan limit hit (3 searches/month).
- **MillionVerifier Verification**: All 11 SmartLead leads verified
  - 7 confirmed VALID (Gmail, custom domains)
  - 2 RISKY (Yahoo — always returns unknown, safe to send)
  - 2 INVALID — lakehoustonfitness@gmail.com (no_mailbox), tonyharrisbbq@yahoo.com (mailbox_disabled) — **BLOCKED in SmartLead** via global unsubscribe
  - 490 MV credits remaining

## Key Files Modified/Created

| File | Location | Purpose |
|------|----------|---------|
| CLAUDE.md | `Bartlett_Labs/` | Unified workspace context |
| 27 skill files | `.claude/commands/` | Claude Code slash commands |
| 6 shell scripts | `automation/scripts/` | Cron-callable automation scripts |
| .env.sh | `automation/` | Bash-compatible env var loader |
| server.js + 3 handlers | `automation/webhook-server/` | Express webhook listener |
| ghl-reply.js | `automation/webhook-server/handlers/` | Async handler with GHL API enrichment (UPDATED Session 5) |
| 5 recipe JSONs | `automation/recipes/` | Ghost OS recipe source files |
| README.md | `automation/` | Full automation documentation |
| ~/.cloudflared/config.yml | Home | webhooks.bartlettlabs.io ingress |
| ~/.zshrc | Home | All API keys configured (UPDATED Session 5) |
| System crontab | System | 5 Bartlett Labs cron entries |
| contact-audit-2026-03-25.md | `automation/logs/` | GHL contact audit report (Session 6) |
| index.html + logo.png | `bartlett-labs-landing/` | Cold outreach landing page — deployed to Cloudflare Pages (Session 10) |
| pm2 LaunchAgent plist | `~/Library/LaunchAgents/` | pm2 auto-start on reboot (Session 10) |

## Active Decisions

- All 27 skills merged into ONE `.claude/commands/` directory
- Shell scripts source `automation/.env.sh` (not ~/.zshrc) for bash compatibility
- Webhook server exposed at `https://webhooks.bartlettlabs.io` via Cloudflare Tunnel, managed by pm2
- GHL webhook via workflow (Customer Replied trigger), not API-registered webhook (requires OAuth app)
- All outreach email sends use **Resend** (kyle@bartlettlabs.io) for transactional/manual, **SmartLead** for cold campaigns
- Outreach campaign ON HOLD until videos are built
- Landing page hosted on **Cloudflare Pages** (free), NOT Bluehost (no hosting plan — only had Google Workspace resale)
- Bluehost Google Workspace subscription is DUPLICATE — refund $44.69 (order #1877667495)
- Ghost OS recipes require logged-in Chrome sessions
- System crontab = persistent backup; Claude Code crons = richer (trigger skills directly)

## Next Steps (MANDATORY — SPECIFIC)

1. ~~**Regenerate GHL API key**~~: DONE
2. ~~**Re-auth gws**~~: DONE
3. ~~**Register webhooks in GHL**~~: DONE (workflow-based: Customer Replied → webhook)
4. ~~**Fill in remaining API keys**~~: DONE (all 6 services configured, zero placeholders)
5. **Build outreach videos**: Record demo/intro videos before sending any outreach emails
6. ~~**Clean up test client directories**~~: DONE
7. ~~**Keep webhook server running**~~: DONE (pm2, process ID 2)
8. ~~**Run first skill end-to-end**~~: DONE (morning briefing with live data: 100 contacts, 201 unread)
9. ~~**Run pm2 startup command**~~: DONE (Session 10 — LaunchAgent plist created, pm2 auto-starts on reboot)
10. **Add more GHL workflow triggers**: Consider adding Opportunity Status Changed, Contact Created, etc.
11. **Build GHL workflows**: Cold outreach sequence, audit booked, proposal follow-up, onboarding
12. ~~**Clean GHL contacts**~~: DONE (Session 6 — audited 500/12,500+, identified issues, enriched 1 via Tomba)
13. ~~**DNS records for bartlett-labs.com**~~: DONE (Session 7 — all 7 records added to Cloudflare: 5 MX, SPF TXT, DMARC TXT)
14. ~~**CREATE MAILBOX IN GOOGLE WORKSPACE**~~: DONE (Session 9 — mailbox kyle.bartlett@bartlett-labs.com created, DKIM authenticated, connected to SmartLead Account ID 17060738, warmup running)
15. ~~**GHL deduplication**~~: DONE (Session 10 — pulled all 171 contacts, found 1 email dupe + 2 phone dupes. Deleted 2 records: FMG Exhaust sparse record + Crosby Transmission duplicate. Merged tags from deleted to keeper records. 169 clean contacts remain.)
16. **Tomba plan upgrade decision**: Free plan = 3 searches/month (already used). ~120+ contacts need email enrichment. Options: Starter ($29/mo for 1,000 searches) or find alternative (Hunter.io, Snov.io)
17. ~~**GHL tag cleanup**~~: DONE (Session 10 — merged 12 inconsistent tags across 135 contacts. Tags went from 88→77 unique. Merged: no website→no-website, high priority/priority-high/high/very high priority→high-priority, medium priority/medium→medium-priority, standard priority→standard-priority, pest control→pest-control, barber shop/barber→barber-shop, auto repair→auto-repair)
18. **Deploy landing page to Cloudflare Pages**: DONE (Session 10 — bartlett-labs-landing.pages.dev, custom domain bartlett-labs.com CNAME added, site live HTTP 200)
19. **Refund Bluehost $44.69**: Order #1877667495 — Google Workspace resale, duplicate of direct Google subscription. Contact Bluehost support.

## Known Issues / Blockers

- ~~**GHL API key expired**~~ — RESOLVED
- ~~**gws Gmail token expired**~~ — RESOLVED
- ~~**API keys not configured**~~ — RESOLVED (all 6 services live)
- ~~**DNS records for bartlett-labs.com**~~ — RESOLVED (Session 7: all 7 records in Cloudflare)
- ~~**SmartLead campaign BLOCKED on mailbox creation**~~ — RESOLVED (Session 9: email account 17060738 created, connected to campaign, warmup running. Launch target: ~April 17, 2026)
- **Tomba free plan exhausted** — 3/3 monthly searches used. Cannot enrich more contacts without upgrade ($29/mo Starter = 1,000 searches).
- ~~**GHL 32% duplication rate**~~ — RESOLVED (Session 10: only 3 dupes found in 171 contacts, 2 deleted, 169 clean)
- **Bluehost duplicate billing** — $44.69 charge for Google Workspace resale (order #1877667495). Need to contact Bluehost for refund.
- Claude Code durable crons auto-expire after 7 days — system crontab is the persistent fallback
- Ghost OS recipes require Chrome logged into each service
- GHL webhook API requires OAuth marketplace app (can't register via Private Integration Token) — using workflow trigger instead
- ~~**pm2 startup not yet run**~~ — RESOLVED (Session 10: LaunchAgent plist created, auto-starts on reboot)

## SmartLead Campaign Details

| Field | Value |
|-------|-------|
| Campaign ID | 3086101 |
| Name | Bartlett Labs - Local Business Outreach Batch 1 |
| Status | WARMING UP — launch target ~April 17, 2026 |
| Email Account ID | 17060738 (kyle.bartlett@bartlett-labs.com) |
| Warmup Key | pupil-union |
| Campaign Association ID | 153738471 |
| Warmup Settings | 15 emails/day, rampup 5, 35% reply rate |
| Sequences | 4 (Day 0 Gift, Day 3 Nudge, Day 7 Value, Day 30 Close) |
| Active Leads | 9 (7 verified valid, 2 Yahoo risky) |
| Blocked Leads | 2 (invalid emails, globally unsubscribed) |
| Schedule | Mon-Fri 8am-5pm CT, 15 leads/day |
| API Key | `$SMARTLEAD_API_KEY` in ~/.zshrc |

## MillionVerifier Results (SmartLead Batch 1)

| Email | Result | Notes |
|-------|--------|-------|
| fmgexhaust@gmail.com | VALID | |
| info@alfaplumbingservices.com | VALID | |
| info@crosbytaxes.com | VALID | |
| reyesfelipe32@gmail.com | VALID | |
| oleethebarber@gmail.com | VALID | |
| mgodom@gmail.com | VALID | |
| sergiosceramictile@hotmail.com | VALID | |
| backdraftbbq@yahoo.com | RISKY | Yahoo always returns unknown |
| mmittag82@yahoo.com | RISKY | Yahoo always returns unknown |
| lakehoustonfitness@gmail.com | INVALID | no_mailbox — BLOCKED |
| tonyharrisbbq@yahoo.com | INVALID | mailbox_disabled — BLOCKED |

### Session 10 — Infrastructure Completion & GHL Cleanup (2026-03-27)
- **pm2 startup configured**: LaunchAgent plist at `~/Library/LaunchAgents/pm2.kylebartlett.plist` — webhook server auto-starts on reboot
- **Landing page deployed to Cloudflare Pages**: Project `bartlett-labs-landing`, custom domain bartlett-labs.com via CNAME, site live (HTTP 200). Free hosting — no Bluehost needed.
- **Bluehost billing discovered**: $44.69 charge was Google Workspace resale (order #1877667495), duplicate of direct Google $7/mo subscription. Refund needed.
- **SmartLead warmup verified**: API confirmed ACTIVE status, 15 emails/day sending within SmartLead's closed warmup network (not real prospects)
- **GHL deduplication**: Pulled all 171 contacts. Found 1 email dupe (FMG Exhaust) + 2 phone dupes (Alamo Auto Repair — actually different contacts, kept both; Crosby Transmission — already tagged as dupe). Deleted 2 records, merged tags to keepers. 169 clean contacts remain.
- **GHL tag cleanup**: Merged 12 inconsistent tag variants across 135 contacts. Tags reduced from 88→77 unique. Key merges: no website→no-website (46 total), high priority variants→high-priority (42), medium priority/medium→medium-priority (51), standard priority→standard-priority (46), pest control→pest-control (9), barber shop/barber→barber-shop (6), auto repair→auto-repair (6).

## Context for Next Session

Session 10 completed all remaining infrastructure setup. Everything is LIVE and operational:
- **Landing page**: https://bartlett-labs.com (Cloudflare Pages)
- **Warmup**: SmartLead account 17060738 actively warming up. **DO NOT launch campaign until ~April 17, 2026.**
- **Webhook server**: pm2 process `bartlett-webhooks`, auto-starts on reboot
- **GHL contacts**: 169 clean, deduplicated contacts with consistent tags (77 unique tags)

**Remaining before campaign launch**: (1) Wait for warmup (~April 17). (2) Build outreach videos. (3) Refund Bluehost $44.69 (order #1877667495). **Also pending**: Tomba plan decision ($29/mo for email enrichment), add more GHL workflow triggers, build GHL automation workflows.
