# Bartlett Labs — Outreach Program
**Effective: March 30, 2026**
**Owner: Kyle Bartlett**

---

## Overview

Bartlett Labs is executing a cold email outreach campaign targeting 30,000+ Texas-area small businesses for AI automation and web development services. The campaign uses a dedicated outreach domain (bartlett-labs.com) that is currently in a 3-week warm-up period. No bulk sending is permitted until the warm-up completes on **April 17, 2026**.

This document is the single source of truth for all outreach operations. Any agent, tool, or team member involved in outreach must follow these rules exactly.

---

## Critical Dates

| Date | Milestone |
|------|-----------|
| March 27, 2026 | Domain warm-up started (SmartLead + Google Workspace) |
| **April 17, 2026** | Warm-up complete. Bulk outreach begins. |
| Ongoing | Manual outreach by Kyle only (now through April 17) |

---

## Email Infrastructure

| Component | Detail |
|-----------|--------|
| **Outreach Domain** | bartlett-labs.com (dedicated outreach domain, isolated from primary domains) |
| **Primary Email** | kyle.bartlett@bartlett-labs.com (Google Workspace Business Starter) |
| **Support Alias** | support@bartlett-labs.com (delivers to same inbox) |
| **DNS** | Cloudflare — MX, SPF, DKIM, DMARC all configured and authenticated |
| **Warm-up Platform** | SmartLead (campaign #3086101, email account ID 17060738) |
| **Warm-up Status** | Active since March 27, reputation score: 100 |
| **Transactional Email** | Resend (kyle@bartlettlabs.io) — for transactional sends only, NOT outreach |

**Why a separate domain?** If bartlett-labs.com gets flagged for spam, the primary domains (bartlettlabs.io, bartstees.com, krbartle@gmail.com) stay clean and unaffected.

---

## Lead Database

| Metric | Count |
|--------|-------|
| **Total leads scraped** | 30,023 |
| **With email addresses** | 25,488 (84.9%) |
| **Real scraped emails** (from actual business websites) | 8,393 |
| **Info@ guesses** (info@theirdomain.com) | ~17,095 |
| **No email found** | ~4,535 |
| **Verified via MillionVerifier** | 490 (367 good, 73 risky, 39 bad, 11 timeout) |
| **Remaining to verify** | 20,250 |
| **Loaded into SmartLead** | 447 (436 verified + 11 manual) |

**Geographic Coverage:** Houston, San Antonio, Austin, Dallas/Fort Worth, and surrounding Texas cities and suburbs.

**Verification:** All 20,250 remaining emails will be verified through MillionVerifier before loading into SmartLead. Only "good" and "risky" results will be uploaded. Bad emails are discarded.

**Data Files:**

| File | Description |
|------|-------------|
| houston_leads_30k.csv | Raw scraped leads (30,023 records) |
| houston_leads_30k_enriched.csv | Enriched with email guesses and metadata |
| mv_remaining_emails.txt | 20,250 emails queued for verification |
| mv_top490_results.csv | First 490 verification results |
| smartlead_upload_batch1.json | 436 leads formatted for SmartLead API |
| verify_all_emails.py | Automated verification script with checkpointing |
| scrape_emails.py | Website email scraper (80 threads, checkpointing) |

All files stored at: `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/`

---

## Sending Platforms

| Platform | Purpose | Status |
|----------|---------|--------|
| **SmartLead** | Cold outreach campaigns (bulk) | Active — warming up, ready April 17 |
| **Resend** | Transactional email only | Active |
| **GoHighLevel** | CRM pipeline, workflows, lead nurture | Active |
| **Gmail (personal)** | Kyle's manual 1:1 outreach only | Active |

---

## SmartLead Campaign Details

- **Campaign Name:** Bartlett Labs - Local Business Outreach Batch 1
- **Campaign ID:** 3086101
- **Status:** DRAFTED (will not send until manually activated after April 17)
- **Email Account:** kyle.bartlett@bartlett-labs.com (ID 17060738)
- **Warm-up Start:** March 27, 2026
- **Warm-up Target Ready:** April 17, 2026
- **Current Reputation:** 100

**Email Sequence (4 touches):**

| Step | Timing | Purpose |
|------|--------|---------|
| Email 1 | Day 0 | The Gift — personalized intro with specific value for their business |
| Email 2 | Day 3 | The Nudge — short follow-up bumping the original |
| Email 3 | Day 7 | The Value Drop — industry insight + booking CTA |
| Email 4 | Day 30 | The Long Game — soft close, door-always-open |

---

## 🔴 OUTREACH RULES (MANDATORY)

### Rule 1: No Bulk Sending Until April 17

**No agent, tool, automation, or team member may send bulk emails before April 17, 2026.** The domain is in warm-up. Sending before the warm-up completes will get the domain blacklisted and destroy the entire campaign infrastructure.

- SmartLead campaign stays in DRAFTED status until April 17.
- No mass emails from any platform (SmartLead, Resend, GHL, Gmail) before April 17.
- The only exception is Kyle's manual 1:1 outreach (see Rule 2).

### Rule 2: Manual Outreach (Now Through April 17)

Kyle Bartlett — and ONLY Kyle Bartlett — may send individual, hand-written emails to prospects before April 17. These are personal 1:1 emails, not automated sequences. No agent sends on Kyle's behalf. Period.

### Rule 3: Approved Outreach Targets (Before April 17)

**Before April 17, outreach is LIMITED to prospects who have a demo website already built for them.** These are the only businesses where we can show real, tangible value immediately.

**Approved targets (demo sites live on bartlettlabs.io):**

| # | Business | Demo URL |
|---|----------|----------|
| 1 | Alfa Plumbing | alfa-plumbing.bartlettlabs.io |
| 2 | Backdraft BBQ | backdraft-bbq.bartlettlabs.io |
| 3 | CN Pet Parlor | cn-pet-parlor.bartlettlabs.io |
| 4 | Crosby Air Conditioning & Heating | crosby-air-heat.bartlettlabs.io |
| 5 | FitGainsters | fitgainsters.bartlettlabs.io |
| 6 | Gearhead Auto | gearhead-auto.bartlettlabs.io |
| 7 | Insect Assassins | insect-assassins.bartlettlabs.io |
| 8 | Olee's Barber | olees-barber.bartlettlabs.io |
| 9 | Pako's Kitchen | pakos-kitchen.bartlettlabs.io |
| 10 | Reyes Landscaping | reyes-landscaping.bartlettlabs.io |
| 11 | Straight Off the Road BBQ | straight-off-the-road-bbq.bartlettlabs.io |
| 12 | Tony's BBQ | tonys-bbq.bartlettlabs.io |
| 13 | Crosby Transmission | (standalone demo) |

**Any prospect NOT on this list is OFF LIMITS until April 17.** After April 17, all 30,000+ leads are fair game through SmartLead.

### Rule 4: Kyle Approves First Drafts

Before any email template is used for the first time (whether manual or automated), Kyle must review and approve it. This applies to:

- The initial SmartLead sequence (all 4 emails in the sequence)
- Any new template created for a specific industry or prospect
- Any modification to an approved template

**Once Kyle approves a template, agents may send it to as many prospects as needed without further approval.** The approval gate is on the first draft only. After that, send at will.

### Rule 5: After April 17 — Full Send

Once the warm-up period completes on April 17:

- SmartLead campaign activates
- All 30,000+ verified leads are valid targets
- Agents may send at scale using approved templates
- Volume targets: ramp from 50/day week 1 → 100/day week 2 → 200+/day week 3
- Monitor bounce rates (keep under 3-5%) and unsubscribe rates
- Log everything: sends, opens, replies, bounces, unsubscribes

### Rule 6: Never Send From Primary Domains

Cold outreach goes through bartlett-labs.com ONLY. Never send outreach from:
- bartlettlabs.io
- bartstees.com
- krbartle@gmail.com
- kyle.bartlett@anker.com (obviously)

These domains are protected. If bartlett-labs.com gets burned, we spin up a new outreach domain. The primary domains stay clean.

### Rule 7: GHL Contact Access

Agents have read access to GHL contacts for research and enrichment purposes only. **No agent may trigger GHL email sends, SMS sends, or workflow activations without Kyle's explicit approval.** GHL is for pipeline management and lead nurture AFTER a prospect responds, not for cold outreach.

---

## Email Templates

Eight industry-specific templates have been built and are ready for Kyle's approval:

| Template | Target Industry | Key Hook |
|----------|----------------|----------|
| A | Business WITH a website (general) | Automation saves time — booking, reviews, CRM |
| B | Business WITHOUT a website | Free mockup, 76% phone-search stat |
| C | Restaurant / Food Service | Online ordering (no DoorDash fees), review automation |
| D | HVAC / Plumbing / Electrical | Missed call text-back, job tracking |
| E | Automotive / Auto Repair | Missed call text-back, service reminders |
| F | Construction / Roofing / Fencing | Quote follow-ups, lead capture, job pipeline |
| G | Landscaping / Lawn Care | Seasonal timing, missed call text-back |
| H | Pressure Washing | Before/after gallery, instant quote calculator |

**Full template text:** `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/automation/outreach/email-templates.md`

**All emails send from:** kyle@bartlettlabs.io (manual) or kyle.bartlett@bartlett-labs.com (SmartLead campaigns)

**Signature block:**
```
Kyle Bartlett
Bartlett Labs | bartlettlabs.io
kyle@bartlettlabs.io
```

---

## Outreach Strategy

### Phase 1: Manual Warm Outreach (Now — April 17)
- Kyle personally emails the 13 approved targets (businesses with demo sites)
- Each email includes a link to their personalized demo landing page
- 1:1, hand-written, conversational tone
- Goal: 3-5 responses, 1-2 audits booked, 1 paying client

### Phase 2: SmartLead Launch (April 17 — May)
- Activate SmartLead campaign with verified leads
- 4-email automated sequence over 30 days per prospect
- Ramp sending volume gradually (50 → 100 → 200/day)
- Monitor deliverability, bounce rates, and reply rates
- Goal: 5-10% reply rate, 2-3 new clients per week

### Phase 3: Scale (May+)
- Upload remaining verified leads in batches of 100-500
- Build additional industry templates as needed
- Add phone/text follow-up for warm leads (GHL workflows)
- Referral program for closed clients
- AI video personalization (HeyGen) for high-value prospects

---

## Key Metrics to Track

| Metric | Target |
|--------|--------|
| Emails sent per week | 50-75 (Phase 1) → 500+ (Phase 2) |
| Reply rate | 5-10% |
| Bounce rate | Under 3% |
| Audits booked per week | 2-3 |
| Close rate (audit → client) | 30-50% |
| Average deal size | $500-$3,500 |

---

## Services Offered

| Service | Price Range | Type |
|---------|------------|------|
| Website build (new) | $500-$5,000+ | One-time |
| Website upgrade/redesign | $500-$3,000+ | One-time |
| Automation setup (booking, reviews, CRM) | $500-$1,500 | One-time |
| Full automation + website package | $1,500-$5,000+ | One-time |
| Social media management | $500-$2,000/mo | Recurring |
| Custom AI builds | $5,000-$25,000+ | Project-based |

---

## Reference Documents

| Document | Location |
|----------|----------|
| Full outreach strategy (March 14) | `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/Outreach_Strategies/nanoClaw_bartlett-labs-outreach-strategy-03-14-26.md` |
| Email templates (8 industries) | `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/automation/outreach/email-templates.md` |
| Campaign batch 1 details | `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/automation/outreach/campaign-batch-1.md` |
| Ready-to-send emails (8 drafted) | `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/automation/outreach/ready-to-send-emails.md` |
| GHL utilization audit | `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/GHL_UTILIZATION_AUDIT.md` |
| GHL build guide | `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/GHL_BUILD_GUIDE.md` |
| CT project memory (lead pipeline) | `/Users/kylebartlett/.claude/projects/-Volumes-Bart-26-Dev-Expansion-Personal-Bartlett-Labs/memory/project_lead_pipeline.md` |
| CT project memory (email setup) | `/Users/kylebartlett/.claude/projects/-Volumes-Bart-26-Dev-Expansion-Personal-Bartlett-Labs/memory/project_email_setup.md` |
| CT project memory (next steps) | `/Users/kylebartlett/.claude/projects/-Volumes-Bart-26-Dev-Expansion-Personal-Bartlett-Labs/memory/project_next_steps.md` |

---

*This document governs all outreach operations for Bartlett Labs. No exceptions without Kyle's direct approval.*
