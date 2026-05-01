# GHL $497 Trial Sprint — Build Guide

> Build the CRM automation layer in GHL before the plan downgrades to $97.
> SmartLead handles cold email delivery. GHL handles CRM, pipeline, calendars, and post-reply workflows.
> Updated: 2026-03-29 (aligned with Open Brain state)
> Deadline: ~2 weeks (before $497 trial ends)

---

## HOW THE SYSTEMS CONNECT

```
SmartLead (cold email engine)          GHL (CRM / system of record)
━━━━━━━━━━━━━━━━━━━━━━━━━━━          ━━━━━━━━━━━━━━━━━━━━━━━━━━━
Campaign #3086101                      169 contacts (growing)
447 leads loaded                       2 pipelines, 3 calendars
4-email sequence                       Tags, custom fields, workflows
Warmup active since 3/27               Reply handling & notifications
Sends from: kyle.bartlett@             Pipeline stage management
  bartlett-labs.com                     Audit booking & follow-up
Target ready: ~April 17                Proposal tracking

              ┌─────────────────┐
              │  Reply webhook   │
              │  (already built) │
              └────────┬────────┘
                       │
         SmartLead reply → GHL tags contact
         → GHL workflow fires → pipeline updates
```

**Key rules:**
- Cold outreach emails: **SmartLead ONLY** (never GHL, Resend, or Gmail)
- Transactional emails (confirmations, proposals): **Resend** (kyle@bartlettlabs.io)
- CRM / pipeline / calendars: **GHL**
- GHL email templates: For **manual follow-ups and post-reply nurture** (not cold outreach)

---

## MASTER CHECKLIST — All Pending Steps

### Pre-Launch (before campaign goes live ~April 17)

| # | Step | Owner | Status | Est. Time |
|---|------|-------|--------|-----------|
| 1 | Purchase MillionVerifier $59/25K credit pack | Kyle | PENDING | 5 min |
| 2 | Run verify_all_emails.py on 20,250 remaining emails | Kyle/CT | PENDING | 15-20 min |
| 3 | Upload verified good+risky leads to SmartLead | Kyle/CT | PENDING | 10 min |
| 4 | Refund Bluehost $44.69 (order #1877667495) | Kyle | COMPLETE | — |
| 5 | Build outreach videos (master video + swappable screen recordings) | Kyle | PENDING | 2-3 hrs |
| 6 | Build GHL workflows, funnel, and forms (this guide) | Kyle | PENDING | ~75 min |

### Files Reference (all in `/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/`):
- `verify_all_emails.py` — Email verification script with checkpointing
- `mv_remaining_emails.txt` — 20,250 emails queued for MV
- `houston_leads_30k_enriched.csv` — All 30K Texas leads
- `mv_top490_results.csv` — First 490 MV results
- `smartlead_upload_batch1.json` — 436 leads formatted for SmartLead API
- `scrape_emails.py` — Website email scraper (80 threads)
- `scrape_checkpoint.json` — Domain-to-email mapping

---

## WHAT'S ALREADY DONE IN GHL (via API)

| Item | Status | GHL ID |
|------|--------|--------|
| Outreach Day 1 - The Gift | BUILT | `69c8f1910b7b0f41b92b2f05` |
| Outreach Day 3 - The Nudge | BUILT | `69c8f1910b7b0f24bd2b2f0d` |
| Outreach Day 7 - Value Drop | BUILT | `69c8f192fc73603d5fbe7a83` |
| Outreach Day 30 - The Long Game | BUILT | `69c8f1930810b5630caae60a` |
| Test template (archived) | DELETE IN UI | `69c8f156fe8aef553d7f7edd` |
| Reply Webhook to Bartlett Server | LIVE | (existing workflow) |

**Note on email templates:** These are for manual follow-ups and nurture sequences inside GHL — NOT for cold outreach (SmartLead handles that). Use them when a lead replies and enters the warm pipeline.

### Email Subject Lines (already set):
1. Day 1: "I built something for {{contact.company_name}}"
2. Day 3: "Quick follow-up on that mockup"
3. Day 7: "3 things costing {{contact.company_name}} customers right now"
4. Day 30: "Still thinking about {{contact.company_name}}"

---

## STEP 6: BUILD GHL WORKFLOWS, FUNNEL & FORMS

> These are the CRM automations that fire AFTER SmartLead gets a response.
> Build all of these in the GHL UI. Each section has exact steps.

---

### BUILD 1: Reply Handler Workflow (Priority: CRITICAL)

> When SmartLead detects a reply, it hits your webhook. This workflow processes the reply inside GHL.
> You already have "Reply Webhook to Bartlett Server" live — this workflow is the GHL-side handler.

1. Go to **Automation > Workflows** > Create Workflow
2. Name: **"Inbound Reply Handler"**

#### Trigger:
- **Trigger Type**: Contact Tag Added
- **Tag**: `outreach-replied`
- (Your existing webhook should be tagging contacts when SmartLead detects a reply. If not, add that to the webhook logic.)

#### Actions:
```
1. [Add Tag] — "hot-lead"
2. [Move Pipeline Stage] — Move to "Contacted" in Bartlett Labs Sales pipeline
3. [Internal Notification] — "REPLY: {{contact.first_name}} from {{contact.company_name}} replied to outreach!"
4. [Wait] — 30 minutes
5. [Send Internal Email] — To kyle@bartlettlabs.io
   Subject: "Hot lead — {{contact.company_name}} replied"
   Body: Full contact details + link to GHL contact record
```

---

### BUILD 2: Audit Booked Workflow (Priority: HIGH)

> When someone books a Discovery Call, auto-tag, update pipeline, and send confirmation.

1. Create Workflow: **"Audit Booked — Auto Tag & Notify"**

#### Trigger:
- **Trigger Type**: Appointment Status Changed
- **Calendar**: Discovery Call
- **Status**: Confirmed

#### Actions:
```
1. [Add Tag] — "audit-booked"
2. [Move Pipeline Stage] — Move to "Qualified" in Bartlett Labs Sales pipeline
3. [Internal Notification] — "BOOKED: Discovery Call with {{contact.first_name}} from {{contact.company_name}}!"
4. [Wait] — 5 minutes
5. [Send Email via Resend/GHL] — Confirmation email:
   Subject: "You're booked — talk soon!"
   Body: "Hey {{contact.first_name}}, just confirming our call. I'll take a look at
   {{contact.company_name}} beforehand so we can hit the ground running. If you
   need to reschedule, just reply to this email. — Kyle"
6. [Wait] — 1 hour
7. [Send SMS] — "Hey {{contact.first_name}}, looking forward to our call!
   If you need to reschedule, just reply to this text. — Kyle"
```

---

### BUILD 3: Proposal Follow-Up Workflow (Priority: HIGH)

> After sending a proposal, auto-follow-up if no response.

1. Create Workflow: **"Proposal Follow-Up Sequence"**

#### Trigger:
- **Trigger Type**: Tag Added
- **Tag**: `proposal-sent`

#### Actions:
```
1. [Wait] — 3 days
2. [If/Else] — Check: Contact has tag "deal-won" OR "deal-lost"
   - YES → [End Workflow]
   - NO → Continue
3. [Send Email] — Subject: "Any questions about the proposal?"
   Body: "Hey {{contact.first_name}}, just checking in on the proposal I sent
   over for {{contact.company_name}}. Happy to jump on a quick call if you have
   any questions or want to walk through anything. — Kyle"
4. [Wait] — 4 days
5. [If/Else] — Same check
6. [Send Email] — Subject: "Last check-in on {{contact.company_name}}"
   Body: "Hey {{contact.first_name}}, one last follow-up. I know things get
   busy — if the timing isn't right, no worries at all. The offer stands whenever
   you're ready. Just reply to this email or book a call anytime:
   {{contact.calendar_link}}. Rooting for you either way. — Kyle"
7. [Add Tag] — "needs-follow-up"
```

---

### BUILD 4: Audit Booking Funnel Page (Priority: HIGH)

> A landing page for email CTAs. When a lead clicks "Book a Free Audit" in any email, they land here.

#### In GHL UI:
1. Go to **Sites > Funnels** > Create New Funnel
2. Name: **"Free Business Audit"**
3. Add Step: **"Booking Page"**
4. Use the **blank template** or pick a clean one

#### Page Content (copy-paste into the builder):

**Headline:**
> Get a Free 15-Minute Business Audit

**Subheadline:**
> I'll review your online presence and show you exactly what's working, what's not, and what you can fix today — no strings attached.

**Body:**
> Hi, I'm Kyle Bartlett — a web developer based right here in Crosby, TX. I work with local businesses to build websites, set up online booking, and make sure customers can actually find you on Google.
>
> This isn't a sales call. It's a straight-up audit where I'll show you:
> - How your business shows up (or doesn't) when people search
> - What your competitors are doing online that you're not
> - 2-3 quick wins you can implement immediately
>
> No contracts. No obligations. Just a conversation.

**CTA Button:**
> Book Your Free Audit

**Calendar Embed:**
- Embed your "Discovery Call" calendar widget here

**Footer:**
> Bartlett Labs | Crosby, TX | bartlettlabs.io

#### After building:
- Set the funnel URL path to something clean like `/free-audit`
- Your funnel will be accessible at: `my.bartlettlabs.io/free-audit`
- Update the `{{contact.calendar_link}}` custom value to point here instead of raw calendar link
- Update the CTA links in your SmartLead email sequence to point here too

---

### BUILD 5: Lead Capture Form (Priority: MEDIUM)

> Embed on bartlettlabs.io for organic lead capture. Leads go straight into GHL CRM.

#### In GHL UI:
1. Go to **Sites > Forms** > Create New Form
2. Name: **"Website Lead Capture"**

#### Fields:
```
- First Name (required)
- Last Name
- Email (required)
- Phone
- Business Name
- Dropdown: "What do you need help with?"
  Options: Website, Online Booking, Google Visibility, Social Media, Other
```

#### On Submit:
- Add Tag: `website-lead`
- Add Tag: `inbound`
- Move to Pipeline: Bartlett Labs Sales → "New Lead"
- Internal Notification: "New inbound lead from website: {{contact.first_name}} — {{contact.company_name}}"
- Redirect to: Thank you page or `/free-audit` funnel

#### Embed:
- Copy the embed code and add it to bartlettlabs.io (contact page or footer widget)

---

### BUILD 6: GHL Email Warmup (Priority: LOW — SmartLead handles cold email)

> SmartLead warmup is already active since 3/27 (reputation: 100, target ready ~April 17).
> GHL email warmup for bartlettlabs.io is secondary — only needed if you plan to send
> transactional or nurture emails directly from GHL (not SmartLead).

#### If you want to activate it anyway:
1. Go to **Settings > Email Services**
2. Find **bartlettlabs.io** domain
3. Check DNS verification status
4. If verified: Enable warmup, set to auto-ramp
5. If NOT verified: Add DKIM/SPF/DMARC records in Cloudflare, then verify

**This is optional.** Your cold outreach warmup is handled by SmartLead. GHL warmup only matters if you want to send nurture/follow-up emails directly from GHL workflows (vs Resend).

---

### BUILD 7: Delete Test Template (Priority: LOW)

1. Go to **Marketing > Emails > Templates**
2. Find **"DELETE ME - Test Template"**
3. Delete it

---

## CLEANUP: Contact Tags to Standardize

Your 129 tags have some duplicates. Quick cleanup while you're in there:

| Duplicate | Keep | Delete |
|-----------|------|--------|
| high priority / high-priority / priority-high / very high priority | `priority-high` | others |
| medium priority / medium-priority | `priority-medium` | others |
| standard priority / standard-priority | `priority-standard` | others |
| no website / no-website | `no-website` | other |
| auto repair / auto-repair | `auto-repair` | other |
| barber / barber shop / barber-shop | `barber-shop` | others |
| pest control / pest-control | `pest-control` | other |
| pressure washing / pressure-washing | `pressure-washing` | other |
| real estate | `real-estate` | (add hyphenated version) |
| la porte | `la-porte` | (add hyphenated version) |

---

## GHL BUILD PRIORITY ORDER

| # | Build | Time | Why |
|---|-------|------|-----|
| 1 | **Reply Handler Workflow** | 10 min | SmartLead replies need to flow into GHL pipeline |
| 2 | **Audit Booked Workflow** | 10 min | Auto-tag + notify when someone books a call |
| 3 | **Proposal Follow-Up Workflow** | 10 min | Don't let warm leads go cold |
| 4 | **Audit Booking Funnel** | 15 min | Landing page for all email CTAs |
| 5 | **Lead Capture Form** | 10 min | Organic inbound from bartlettlabs.io |
| 6 | **Tag Cleanup** | 10 min | Housekeeping |
| 7 | **GHL Email Warmup** | 5 min | Optional — SmartLead handles cold email warmup |
| 8 | **Delete Test Template** | 1 min | Cleanup |

**Total estimated time: ~70 minutes in the GHL UI**

---

## FULL LAUNCH CHECKLIST

Before activating SmartLead campaign #3086101:

- [ ] **Step 1**: MillionVerifier $59 credit pack purchased
- [ ] **Step 2**: verify_all_emails.py run on 20,250 remaining emails
- [ ] **Step 3**: Verified leads uploaded to SmartLead
- [x] **Step 4**: Bluehost refund (COMPLETE)
- [ ] **Step 5**: Outreach videos recorded (master video + swappable screen recordings)
- [ ] **Step 6**: GHL workflows, funnel, and form built (this guide)
- [ ] SmartLead warmup complete (~April 17)
- [ ] Review SmartLead email copy with video links inserted
- [ ] Select first batch and activate campaign

**DO NOT activate SmartLead campaign until ALL boxes are checked.**
