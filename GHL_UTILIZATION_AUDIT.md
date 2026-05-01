# GoHighLevel Utilization Audit — Bartlett Labs

> Audited: 2026-03-27 | Cost: ~$100/month

## What You're Using (and it's working)

| Feature | Count | Status |
|---------|-------|--------|
| **Contacts** | 169 | Clean, deduplicated, tagged |
| **Tags** | 77 unique | Cleaned in Session 10 |
| **Pipelines** | 2 | Sales (8 stages) + Onboarding (6 stages) |
| **Calendars** | 3 | Discovery Call, Project Kickoff, Client-Audit |
| **Workflows** | 1 published | Reply Webhook to Bartlett Server |
| **Custom Fields** | 9 | Chatbot Notes, Budget, Lead Source, Score, etc. |
| **Custom Values** | 7 | Company info, Calendar Link, Tagline |
| **Opportunities** | 48 | In pipeline |

## What You're NOT Using (and should be)

### 1. FORMS (0 created) — HIGH PRIORITY
**What it does**: Embed lead capture forms on your website or landing page.
**Why you need it**: Your entire "5-Minute Shop Efficiency Audit" strategy requires a GHL form. Right now bartlett-labs.com has NO lead capture mechanism — visitors can only look and leave.
**Action**: Build the Efficiency Audit intake form with the 6 questions from your design doc, embed on bartlett-labs.com.

### 2. SURVEYS (0 created) — HIGH PRIORITY
**What it does**: Multi-step questionnaires that qualify leads and route them based on answers.
**Why you need it**: The "Shop Efficiency Audit" is designed as a survey with branching logic (answer about invoices → get "Weekend Recovery" blueprint, answer about missed calls → get "Lead Wrangler" blueprint).
**Action**: Build the 6-question audit survey in GHL Survey Builder. Set up conditional "blueprint" responses.

### 3. WORKFLOWS (2 of 3 are drafts) — HIGH PRIORITY
**What it does**: Automated sequences triggered by events (form submit, tag added, opportunity stage change, etc.).
**Why you need it**: You have ONE workflow running (reply webhook). You should have at minimum:
- **Survey Submitted** → Send email with blueprint PDF + SMS to Kyle + SMS to lead
- **New Lead Created** → Welcome email + add to nurture sequence
- **Appointment Booked** → Confirmation email + reminder SMS at 1hr and 15min
- **Opportunity Stage Changed** → Follow-up email when moved to "Proposal Sent"
- **Stale Lead Reminder** → If no contact in 7 days, trigger re-engagement
- **Won** → Client onboarding email sequence
**Action**: Build these 6 workflows. Publish the 2 draft workflows or delete them.

### 4. EMAIL TEMPLATES (likely 0) — MEDIUM PRIORITY
**What it does**: Pre-built emails for workflows, campaigns, and manual sends.
**Why you need it**: Every workflow above needs email content. Build templates for:
- Efficiency Audit results (3 versions based on pain point)
- Welcome/intro email
- Proposal follow-up
- Appointment reminder
- Client onboarding sequence
**Action**: Create templates in Marketing > Emails.

### 5. SMS TEMPLATES — MEDIUM PRIORITY
**What it does**: Pre-built SMS messages for workflows.
**Why you need it**: Speed-to-lead is your #1 selling point ("respond in under 2 minutes"). You need:
- Auto-reply when someone fills out the audit form
- Appointment reminder texts
- Follow-up after proposal sent
**Action**: Build SMS templates and connect them to workflows.

### 6. FUNNELS / WEBSITES — LOW PRIORITY (you have Cloudflare Pages)
**What it does**: GHL can build landing pages and multi-step funnels.
**Why for later**: You already have bartlett-labs.com on Cloudflare Pages. BUT — GHL funnels have native form/survey integration. Worth considering for a dedicated "Efficiency Audit" landing page that's 100% connected to GHL without any embed code.
**Action**: Consider building an audit-specific funnel page in GHL as a complement to your main site.

### 7. SOCIAL PLANNER — LOW PRIORITY
**What it does**: Schedule and publish social media posts across platforms.
**Why you need it**: If you're building outreach videos, you'll need to post them. GHL can schedule posts to Facebook, Instagram, Google Business, LinkedIn.
**Action**: Connect social accounts once video content is ready.

### 8. REPUTATION MANAGEMENT — LOW PRIORITY
**What it does**: Automated review requests to Google/Facebook after service delivery.
**Why for later**: Once you have clients, automate "please leave a review" requests after project delivery. Huge for local SEO.
**Action**: Set up after first client is won.

### 9. INVOICING — NOT NEEDED (use Stripe)
GHL has invoicing but you already have Stripe set up with webhooks. No need to duplicate.

### 10. MEMBERSHIP AREAS — NOT NEEDED
For course/content delivery. Not relevant to your service business model.

## Priority Action Plan

### This Week (Before Warmup Completes ~April 17)
1. Build the **6-question Efficiency Audit survey** in GHL
2. Build the **"Survey Submitted" workflow** (send blueprint + notify Kyle)
3. Embed the survey on **bartlett-labs.com**
4. Build the **"New Lead Created" workflow** (welcome sequence)
5. Build **3 email templates** (audit results x3 pain points)

### Before First Campaign Send
6. Build **"Appointment Booked" workflow** (confirmation + reminders)
7. Build **"Stale Lead" workflow** (7-day re-engagement)
8. Create **SMS templates** for speed-to-lead responses

### After First Client
9. Build **"Won" workflow** (client onboarding)
10. Set up **Reputation Management** (review requests)
11. Connect **Social Planner** for content distribution

## The Bottom Line

You're paying $100/mo for GHL and using maybe **30%** of it. The biggest gaps are **forms, surveys, and workflows** — which are literally the core of your "Efficiency Audit" funnel strategy. The pipeline structure is solid, contacts are clean, but the automation engine isn't built yet. Once those workflows are running, every lead that fills out the audit will get an instant response, a custom blueprint, and a booking link — without you lifting a finger.
