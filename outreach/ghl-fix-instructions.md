# GHL API Fix — Sub-Account Token Required
> Your current token (`pit-28e5...`) is AGENCY-level. It can access locations but NOT contacts.

---

## The Problem

Your Private Integration Token was created at the **agency level**, which only gives access to:
- `locations/search` (works)
- `locations/{id}` (works with version header)

But NOT:
- `contacts/` (401 — "not authorized for this scope")
- `contacts/search` (401)
- Any contact CRUD operations

## The Fix (2 minutes)

1. Log into GHL: https://app.gohighlevel.com
2. Navigate to your **sub-account** (Bartlett Labs location)
3. Go to **Settings** (gear icon) → **Business Profile** → scroll to **Integrations** or **Developer** section
4. Look for **Private Integrations** or **API Keys** at the sub-account level
5. Create a **new** Private Integration Token with these scopes:
   - `contacts.readonly`
   - `contacts.write`
   - `opportunities.readonly` (optional — for deal tracking)
   - `locations.readonly`
   - `conversations.readonly` (optional — for message history)
   - `conversations/message.write` (optional — for sending messages)

**Alternative path**: Settings → Integrations → Create Private Integration Token → select the Bartlett Labs location → enable contact scopes

6. Copy the new token (starts with `pit-`)
7. Give it to me and I'll sync all the enriched contacts

## What I'll Do Once You Have the Token

1. Pull current contacts from GHL
2. Match against enriched CSV by phone number + company name
3. Update contacts with:
   - New email addresses found
   - Owner/contact names discovered
   - Updated tags (enrichment status, outreach status)
   - Website URLs found
4. Create any missing contacts

## Current Token Info (for reference)
- Token: `pit-28e5b91b-fad3-4d50-8c3d-13c63d35805a`
- Level: **Agency** (can see locations, cannot access contacts)
- Company ID: `UTJIw2aDK2cCYE4Cbg7U`
- Location: Bartlett Labs, 2823 Bravo Ridge Ct, Crosby TX 77532
- Location ID (from API): `ILvChunKCb3yCVlGsx3J`

## Note on Location ID
The URL shows `LLvChunKCb3yCVlGsx3J` (starts with L) but the API returns `ILvChunKCb3yCVlGsx3J` (starts with I). Use the API-returned version when making API calls.
