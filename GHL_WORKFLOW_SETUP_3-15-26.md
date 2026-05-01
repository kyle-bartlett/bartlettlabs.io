# GHL Cold Outreach Workflow — Complete Setup Guide

> Generated: 2026-03-15
> Status: API does NOT support workflow creation. Must build in GHL UI.
> All reference IDs, tags, and email copy verified and ready.

---

## TL;DR — What Was Done vs What You Need To Do

### Done via API (automated):
- [x] Created tracking tags: `outreach-day1-sent`, `outreach-day3-sent`, `outreach-day7-sent`, `outreach-day30-sent`, `outreach-replied`, `outreach-completed`
- [x] Confirmed `outreach-ready` tag already exists
- [x] Confirmed `batch-1` tag already exists
- [x] Verified all pipeline stage IDs
- [x] Verified calendar booking widget URLs

### Must Do in GHL UI:
- [ ] Build the "Cold Outreach Sequence" workflow (Step-by-step below)
- [ ] Set up 4 email actions with wait steps
- [ ] Configure tag trigger + pipeline actions
- [ ] Test with a single contact before batch send

---

## Reference IDs (Copy-Paste Ready)

### Pipeline: Bartlett Labs Sales
| Stage | ID | Position |
|-------|-----|----------|
| New Lead | `fea642a2-93d5-4a99-bb64-e4b72bc31b4a` | 0 |
| **Contacted** | `19fe10c4-6300-4d9e-8496-9a3380c6cb7a` | 1 |
| Audit Scheduled | `d00999f1-87b4-4a8a-8991-e6ac9ef4b2eb` | 2 |
| Audit Completed | `cae4d41d-2b2d-486f-9e90-b1cad0e766e2` | 3 |
| Proposal Sent | `c310134c-14ff-42b8-9f88-b59f40e0569a` | 4 |
| Negotiation | `07ca0b86-db06-48e7-89c1-4af2f573c594` | 5 |
| Won | `5c9fcda0-9f8d-4b42-97bc-133dadf2b46f` | 6 |
| Lost | `4bbe547f-cf49-4d5c-8b50-4d603d11cc31` | 7 |

Pipeline ID: `qiJQN6uoCMrEIWOOQoY1`

### Pipeline: Client Onboarding
| Stage | ID | Position |
|-------|-----|----------|
| Contract Signed | `59f78ccf-6285-4a1a-a3b4-5f16a41c812a` | 0 |
| Kickoff Call | `b61e606f-2bf0-4a44-a0e5-8803f21fce97` | 1 |
| In Progress | `7d745a01-c4cb-47f3-8532-a742c306981c` | 2 |
| Review | `d495b8c4-1a52-49a7-a635-eecad06a6ed1` | 3 |
| Delivered | `09abc505-fc78-4c07-8c05-115432fd84a9` | 4 |
| Follow-Up | `d44775a4-23fa-4277-a65a-a8aff030412c` | 5 |

Pipeline ID: `FzRtAMRkuaH2Ga8uJahD`

### Calendar Booking Links
| Calendar | Widget Slug | Booking URL |
|----------|-------------|-------------|
| Discovery Call | `discovery-call` | `https://api.leadconnectorhq.com/widget/booking/discovery-call` |
| Client Audit | `client-audit` | `https://api.leadconnectorhq.com/widget/booking/client-audit` |
| Project Kickoff | `project-kickoff` | `https://api.leadconnectorhq.com/widget/booking/project-kickoff` |

### Tags (All Confirmed Existing)
- `outreach-ready` — Trigger tag for workflow
- `batch-1` — First send batch
- `outreach-day1-sent` — Applied after Day 1 email
- `outreach-day3-sent` — Applied after Day 3 email
- `outreach-day7-sent` — Applied after Day 7 email
- `outreach-day30-sent` — Applied after Day 30 email
- `outreach-replied` — Manual tag when reply received
- `outreach-completed` — Applied when sequence finishes

### Existing Workflow
- **Name**: "New Workflow : 1773417113496" (draft, created 2026-03-13)
- **ID**: `47868f7a-2cf6-4735-aa4b-c8a8a2ae4ecf`
- **Status**: Draft — you can rename and build on this, or create new

---

## Step-by-Step: Build the Workflow in GHL UI

### Step 0: Open Workflow Builder

1. Go to **GHL Dashboard** > Left sidebar > **Automation** > **Workflows**
2. You'll see the existing draft workflow "New Workflow : 1773417113496"
3. **Option A**: Click on it to edit and repurpose it
4. **Option B**: Click **"+ Create Workflow"** > **"Start from Scratch"**
5. Name it: **"Cold Outreach Sequence"**

---

### Step 1: Set the Trigger

1. Click **"Add New Trigger"**
2. Select **"Contact Tag"**
3. Set to: **Tag Added**
4. Tag: **`outreach-ready`**
5. Click **Save Trigger**

This means: any time a contact gets the `outreach-ready` tag, they enter this workflow.

---

### Step 2: Add Filter (Optional but Recommended)

1. After the trigger, click **"+"** to add an action
2. Select **"If/Else"** (Condition)
3. Condition: **Contact → Email → Is Not Empty**
4. This prevents the workflow from running on contacts without email addresses

Put all subsequent steps inside the "If" (true) branch.

---

### Step 3: Day 1 — "The Gift" Email

1. Click **"+"** inside the If branch
2. Select **"Send Email"**
3. Configure:

**Email Settings:**
- **Subject Line**: `I built something for {{contact.company_name}}`
  - (A/B test later: `{{contact.first_name}} — took a look at {{contact.company_name}} online`)
- **From Name**: Kyle Bartlett
- **From Email**: kyle@bartlettlabs.io (or your configured sending email)

**Email Body (use HTML editor or plain text):**

```
Hey {{contact.first_name}},

I'm Kyle — I run a small web and automation shop here in Crosby.

I was poking around online looking at local businesses, and {{contact.company_name}} caught my eye.

I went ahead and mocked up what a modern site could look like for you. No charge, no obligation — I just like building things.

Take a look: [LANDING PAGE LINK]

If it's useful, I'm happy to chat. If not, no worries at all.

— Kyle
Bartlett Labs | Crosby, TX
(832) 630-4317
```

> **IMPORTANT**: Replace `[LANDING PAGE LINK]` with the actual contact-specific landing page URL.
> If you have a custom field for this (e.g., `{{contact.landing_page_url}}`), use that.
> Otherwise, use a generic portfolio link like `https://portfolio.bartlettlabs.io`

4. Click **Save**

---

### Step 4: Add Tag — Day 1 Sent

1. Click **"+"** after the email
2. Select **"Add Tag"**
3. Tag: **`outreach-day1-sent`**

---

### Step 5: Move Pipeline to "Contacted"

1. Click **"+"**
2. Select **"Add/Update Opportunity"** (or "Pipeline" action)
3. Pipeline: **Bartlett Labs Sales**
4. Stage: **Contacted**
5. This automatically moves the contact's opportunity to the "Contacted" stage

---

### Step 6: Wait 2 Days

1. Click **"+"**
2. Select **"Wait"**
3. Set: **2 Days**
4. This creates the gap between Day 1 and Day 3

---

### Step 7: Reply Check (If/Else)

1. Click **"+"**
2. Select **"If/Else"**
3. Condition: **Contact Tag → Does Not Have Tag → `outreach-replied`**
4. Only continue if they HAVEN'T replied (you'll manually tag `outreach-replied` when someone responds)

---

### Step 8: Day 3 — "The Nudge" Email

Inside the "If" (no reply) branch:

1. Click **"+"**
2. Select **"Send Email"**
3. Configure:

**Subject**: `Re: I built something for {{contact.company_name}}`

**Body:**
```
Hey {{contact.first_name}} — just floating this back up in case it got buried.

I put together a quick walkthrough of what I mocked up for {{contact.company_name}}: [LANDING PAGE LINK]

60 seconds of your time. If it's not useful, I'll leave you alone.

— Kyle
```

4. Click **Save**

---

### Step 9: Add Tag — Day 3 Sent

1. Click **"+"**
2. Select **"Add Tag"**
3. Tag: **`outreach-day3-sent`**

---

### Step 10: Wait 4 Days

1. Click **"+"**
2. Select **"Wait"**
3. Set: **4 Days**
4. Gap between Day 3 and Day 7

---

### Step 11: Reply Check #2

1. Click **"+"**
2. Select **"If/Else"**
3. Condition: **Contact Tag → Does Not Have Tag → `outreach-replied`**

---

### Step 12: Day 7 — "The Value Drop" Email

Inside the "If" (no reply) branch:

1. Click **"+"**
2. Select **"Send Email"**
3. Configure:

**Subject**: `Quick thought on {{contact.company_name}}`

**Body:**
```
Hey {{contact.first_name}},

Last one from me — I know you're busy running {{contact.company_name}}.

If you ever want to talk about getting {{contact.company_name}} more visible online, I'm right here in Crosby. 15 minutes, no pitch.

Book a time if you want: https://api.leadconnectorhq.com/widget/booking/discovery-call

— Kyle
```

4. Click **Save**

---

### Step 13: Add Tag — Day 7 Sent

1. Click **"+"**
2. Select **"Add Tag"**
3. Tag: **`outreach-day7-sent`**

---

### Step 14: Wait 23 Days

1. Click **"+"**
2. Select **"Wait"**
3. Set: **23 Days**
4. Gap between Day 7 and Day 30

---

### Step 15: Reply Check #3

1. Click **"+"**
2. Select **"If/Else"**
3. Condition: **Contact Tag → Does Not Have Tag → `outreach-replied`**

---

### Step 16: Day 30 — "The Long Game" Email

Inside the "If" (no reply) branch:

1. Click **"+"**
2. Select **"Send Email"**
3. Configure:

**Subject**: `{{contact.company_name}} came up again`

**Body:**
```
Hey {{contact.first_name}},

Was driving past the other day and remembered I'd put something together for you a few weeks back.

No idea if you ever looked at it, but the mockup is still up if you're curious: [LANDING PAGE LINK]

Either way — hope business is good.

— Kyle
```

4. Click **Save**

---

### Step 17: Add Tag — Day 30 Sent + Outreach Completed

1. Click **"+"**
2. Select **"Add Tag"**
3. Tag: **`outreach-day30-sent`**

4. Click **"+"**
5. Select **"Add Tag"**
6. Tag: **`outreach-completed`**

---

### Step 18: Remove Trigger Tag

1. Click **"+"**
2. Select **"Remove Tag"**
3. Tag: **`outreach-ready`**
4. This prevents re-triggering if the contact is ever re-tagged

---

### Step 19: Final — Internal Notification (Optional)

1. Click **"+"**
2. Select **"Internal Notification"**
3. Type: **Email** or **In-App**
4. Send to: Kyle
5. Message: `Outreach sequence completed for {{contact.first_name}} at {{contact.company_name}}. No reply received. Consider manual follow-up or move to nurture.`

---

## Visual Workflow Diagram

```
[Trigger: Tag "outreach-ready" Added]
    |
    v
[If/Else: Email is not empty?]
    |
    |--> NO --> [End]
    |
    |--> YES
          |
          v
    [Send Email: Day 1 "The Gift"]
          |
          v
    [Add Tag: outreach-day1-sent]
          |
          v
    [Update Pipeline: Contacted]
          |
          v
    [Wait: 2 Days]
          |
          v
    [If/Else: No "outreach-replied" tag?]
          |
          |--> Has tag --> [End - they replied]
          |
          |--> No tag (continue)
                |
                v
          [Send Email: Day 3 "The Nudge"]
                |
                v
          [Add Tag: outreach-day3-sent]
                |
                v
          [Wait: 4 Days]
                |
                v
          [If/Else: No "outreach-replied" tag?]
                |
                |--> Has tag --> [End]
                |
                |--> No tag (continue)
                      |
                      v
                [Send Email: Day 7 "The Value Drop"]
                      |
                      v
                [Add Tag: outreach-day7-sent]
                      |
                      v
                [Wait: 23 Days]
                      |
                      v
                [If/Else: No "outreach-replied" tag?]
                      |
                      |--> Has tag --> [End]
                      |
                      |--> No tag (continue)
                            |
                            v
                      [Send Email: Day 30 "The Long Game"]
                            |
                            v
                      [Add Tag: outreach-day30-sent]
                            |
                            v
                      [Add Tag: outreach-completed]
                            |
                            v
                      [Remove Tag: outreach-ready]
                            |
                            v
                      [Internal Notification]
                            |
                            v
                      [End]
```

---

## How to Trigger the Workflow

Once the workflow is built and **published** (toggle from Draft to Published):

### Option 1: Manual (Recommended for First Batch)
1. Go to **Contacts**
2. Filter by tag `batch-1` (or whatever batch you want)
3. Select contacts (start with 5-10 for testing)
4. Click **"Add Tag"** > `outreach-ready`
5. The workflow triggers automatically

### Option 2: Bulk via API
```bash
# Tag a contact as outreach-ready via API
curl -X PUT "https://services.leadconnectorhq.com/contacts/{contactId}" \
  -H "Authorization: Bearer pit-b1a78b22-c76a-4960-9c6b-f38d993a51ef" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["outreach-ready"]}'
```

---

## Custom Field Needed: Landing Page URL

For the `[LANDING PAGE LINK]` placeholders to work dynamically per contact:

1. Go to **Settings** > **Custom Fields**
2. Create new field:
   - **Name**: `Landing Page URL`
   - **Type**: Text (single line)
   - **Key**: Will auto-generate as `contact.landing_page_url` or similar
3. Go populate this field for each contact with their specific mock-up URL
4. Replace `[LANDING PAGE LINK]` in all email bodies with `{{contact.landing_page_url}}`

If you don't have per-contact landing pages yet, use the portfolio: `https://portfolio.bartlettlabs.io`

---

## Reply Handling (Manual Process)

When someone replies to an outreach email:
1. **Immediately** add the tag `outreach-replied` to their contact
2. This will stop the workflow from sending further automated emails (the If/Else checks catch it)
3. Move their pipeline stage manually based on the conversation:
   - Interested in audit → Move to **Audit Scheduled**
   - Just curious → Keep at **Contacted**, schedule follow-up
   - Not interested → Move to **Lost** or remove from pipeline

---

## Testing Checklist

Before sending to real contacts:

- [ ] Create a test contact with your own email
- [ ] Add `outreach-ready` tag to test contact
- [ ] Verify Day 1 email arrives with correct merge fields
- [ ] Verify pipeline moves to "Contacted"
- [ ] Wait (or manually advance) to check Day 3 email
- [ ] Add `outreach-replied` tag to test — verify sequence stops
- [ ] Remove test tags, reset, test full 4-email flow

---

## GHL Variable Reference

These are the merge fields used in the emails. Verify they work in your GHL:

| Variable | Purpose | Example Output |
|----------|---------|----------------|
| `{{contact.first_name}}` | First name | Kyle |
| `{{contact.company_name}}` | Business name | Joe's Auto Repair |
| `{{contact.email}}` | Email address | joe@example.com |
| `{{contact.landing_page_url}}` | Custom field (create this) | https://portfolio.bartlettlabs.io/joes-auto |

> **Note**: GHL uses `{{contact.company_name}}` — NOT `{{contact.companyName}}`. Verify the exact variable name in your GHL by going to any email editor and clicking the merge field dropdown.

---

## Existing Workflow to Clean Up

The draft workflow "New Workflow : 1773417113496" from March 13 should either be:
- **Repurposed**: Rename it to "Cold Outreach Sequence" and build inside it
- **Deleted**: If you prefer a clean start, delete it and create fresh

---

## Next Steps After Workflow Is Built

1. **Verify sending domain** — Make sure `kyle@bartlettlabs.io` (or your sending email) is verified in GHL > Settings > Email Services
2. **Set daily sending limits** — GHL has limits. Start with 15-20/day max for cold outreach to protect deliverability
3. **Create the landing page custom field** — See "Custom Field Needed" section above
4. **Populate landing page URLs** for batch-1 contacts
5. **Test with 1-2 contacts** using your own email
6. **Send first real batch** — Tag 15-20 `batch-1` contacts with `outreach-ready`
7. **Monitor** — Check GHL > Conversations for replies; tag `outreach-replied` immediately on any response
