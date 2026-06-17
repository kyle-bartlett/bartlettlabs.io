# A2P / SMS Compliance Playbook — bartlettlabs.io

> **Why this file exists:** the A2P/SMS campaign was rejected ~10 times. This documents
> the EXACT setup that makes the site compliant, the root causes of the rejections, and
> the settings that must never be undone. If you are an agent or a future Kyle: read this
> before touching the chat widget, the contact form, or the SMS pages. Last verified 2026-06-17.

## The one rule that matters most

**On any page where the chat widget is embedded, there must be ZERO forms that collect a
phone number or SMS consent.** The chat widget must be the ONLY SMS opt-in method on that page.
A competing lead/contact form on the same page = automatic rejection.

## Current setup (live, compliant)

| Item | Value |
|------|-------|
| Chat widget | LeadConnector, widget-id `69f82390cc1c63b25b23ba6f`, beta loader (`https://beta.leadconnectorhq.com/loader.js`) |
| Where it's installed | `src/app/page.tsx` — **HOMEPAGE ONLY**, via `next/script` (`afterInteractive`). NOT in `app/layout.tsx`. |
| Homepage forms | **None.** Header, footer, carousel, and demo grid are all form-free. The widget is the sole opt-in. |
| Contact form (`/contact`) | Phone is **optional** and explicitly **not** an SMS sign-up. **No SMS consent checkbox.** No widget on this page. |
| `/sms-opt-in` | Disclosure page (no form). Names the chat widget as the primary opt-in. No widget on this page. |
| Other form pages | `/book`, `/calculator`, `/contact` collect info but do **NOT** have the widget. |
| Meta Pixel | `2282902429201629`, site-wide via `src/components/MetaPixel.tsx` (unrelated to SMS; fine to keep). |

## DO-NOT-UNDO list (code)

1. **Never move the widget into `app/layout.tsx`** or any shared/global component — that would put it on every page, including the form pages, and break compliance.
2. **Never add the widget to** `/contact`, `/book`, `/calculator`, `/sms-opt-in`, or any page with a phone/SMS form.
3. **Never add a phone- or SMS-collecting form to the homepage** (`src/app/page.tsx` / `GrowthSystemHome`).
4. **Never re-add an SMS consent checkbox to the contact form** (`src/components/ContactForm.tsx`). The widget is the single opt-in.

## GHL chat-widget settings that MUST stay set (these live in GoHighLevel, NOT in code)

1. **Both consent checkboxes default to UNCHECKED.** Pre-checked SMS consent is invalid (TCPA/CTIA require an affirmative act) and a top rejection reason.
2. **Two separate checkboxes** — one transactional/informational, one promotional. Marketing consent is not bundled with transactional.
3. **Terms link → `https://bartlettlabs.io/terms`** and **Privacy link → `https://bartlettlabs.io/privacy`** — your OWN pages, never LeadConnector's generic pages. (Your pages already carry full SMS/opt-out/data language.)
4. Each consent disclosure must contain: business name (Bartlett Labs LLC), message types, "Msg/data rates apply," "msg frequency varies," "Consent is not a condition of purchase," "Text HELP for help and STOP to unsubscribe," and the terms + privacy links.

## Approved A2P submission text (reuse verbatim if you ever resubmit)

**Use Case Description:**
> Bartlett Labs LLC sends both customer support and promotional messages to users who interact with the website https://bartlettlabs.io chat widget. Customer care messages may include responses to support requests, ticket updates, appointment coordination, or follow-up communications related to an existing inquiry. Promotional messages may include special offers, discounts, event promotions, and service announcements. Each message type requires separate, explicit consent collected through independent checkboxes in the chat widget. Marketing consent is not combined with transactional consent, and neither is shared with third parties.

**Sample Message #1 (transactional):**
> Hi! This is Bartlett Labs LLC. We received your recent inquiry and a team member will follow up shortly. Reply STOP to unsubscribe. Message and data rates may apply.

**Sample Message #2 (promotional):**
> Hello from Bartlett Labs LLC. We're excited to share a new promotion available for a limited time. Reply STOP to unsubscribe. Message and data rates may apply.

**How do Contacts Opt-in to Messages?**
> Users opt in through the chat widget at https://bartlettlabs.io, which presents an explicit SMS consent checkbox.

**Opt-in Message:**
> Bartlett Labs LLC: You've opted in to receive support and promotional messages. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.

## Phone number

- The site displays **(832) 630-4317** (`siteConfig.phone` → header + footer).
- This must match the phone number registered to the A2P **brand**. Reviewers cross-check it.

## Carrier compliance checklist — how the site satisfies it

- Site is live, no 404s ✓
- TOS + Privacy linked in the footer (`/terms`, `/privacy`) ✓
- Business name, address (Crosby, TX), email (`kyle@bartlettlabs.io`), clickable phone present in footer ✓
- No affiliate / lead-buying language ✓
- Chat widget integrated ✓
- No forms collecting phone/SMS on the widget page ✓

## Root causes of the earlier ~10 rejections (all fixed)

1. **Opt-in URL pointed to a form that didn't exist** — the submission said opt-in was "a form at /sms-opt-in," but that page is a disclosure page with no form. Reviewer found nothing → rejected. Fixed: opt-in is now the chat widget on the homepage, and the submission says so.
2. **2FA mismatch** — the opt-in message said "2FA and account security notifications" while the campaign is support + promotional. Fixed.
3. **Pre-checked / "optional" consent** — boxes now default unchecked; "optional" wording removed.
4. **Terms/Privacy links pointed to LeadConnector** instead of Bartlett Labs' own pages. Fixed in widget settings.
