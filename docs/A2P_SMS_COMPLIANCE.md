# A2P and SMS Compliance Playbook: bartlettlabs.io

## Current state (2026-09-14)

The site collects no SMS consent anywhere. The earlier chat-widget SMS opt-in and its
carrier campaign are retired along with the vendor that ran them.

- **Chat:** Widgo loads once from the shared `src/app/layout.tsx` head using `next/script`
  with `beforeInteractive`: configuration first, then the async loader. The organization is
  `org_81eba270b80b4baa`; the loader is `https://cdn.widgo.ai/widgo.js`, with
  `https://ai.widgo.ai` as the API. Kyle asked for Widgo on every page on September 10, 2026,
  which replaced the old homepage-only rule. Chatting does not enroll visitors in SMS. Chat and
  visitor-activity processing apply site-wide, as the privacy page discloses.
- **Booking:** every booking link and embedded calendar uses Cal.com
  (`https://cal.com/kyle-bartlett-nrhzyw/ai-automation-audit`), a 15-minute AI and automation
  audit. Booking does not enroll visitors in SMS or marketing. Widgo needs its own calendar
  connection; installing the script does not connect one.
- **Contact form (`/contact`):** opens a prefilled email to Kyle. Phone is optional and is not
  an SMS sign-up.
- **Crosby landing page form (`/crosby-ai`):** files the lead in the Bartlett Labs CRM through
  `/api/crosby-lead`. It is not an SMS sign-up.
- **`/sms-opt-in`:** a disclosure page with no form.
- **Assistant knowledge:** `docs/WIDGO_KNOWLEDGE.md`, uploaded to Widgo as a PDF source.

## If SMS opt-in comes back

These rules come from about 10 carrier rejections in June 2026. Apply them before any new
SMS campaign is submitted.

1. **One opt-in per page.** On a page with an SMS opt-in, no other form may collect a phone
   number or SMS consent.
2. **Consent boxes start unchecked.** Pre-checked consent is invalid and was a top rejection
   reason. Never label consent "optional".
3. **Separate the two kinds of consent.** One box for transactional or informational messages,
   one for promotional messages.
4. **Link our own legal pages.** Terms go to `https://bartlettlabs.io/terms` and privacy to
   `https://bartlettlabs.io/privacy`, never a vendor's generic pages.
5. **Every consent disclosure names:** the business (Bartlett Labs LLC), the message types,
   "Msg/data rates apply", "msg frequency varies", "Consent is not a condition of purchase",
   "Text HELP for help and STOP to unsubscribe", and the terms and privacy links.
6. **The opt-in URL in the submission must show the opt-in.** A submission once pointed at
   `/sms-opt-in`, a page with no form, and was rejected.
7. **The opt-in message must match the campaign.** An opt-in message that mentioned 2FA on a
   support and promotional campaign was rejected.

## Submission text that carriers approved (June 2026)

Update the opt-in method to whatever the new opt-in is before reusing any of this.

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

- The site displays **(830) 783-2470** (`siteConfig.phone`, header and footer).
- A future A2P brand registration must use the same number. Reviewers cross-check it.

## Carrier checklist the site already meets

- Site is live with no 404s on linked pages.
- Terms and privacy are linked in the footer (`/terms`, `/privacy`).
- Business name, Crosby, TX address, `kyle@bartlettlabs.io`, and a clickable phone number are
  in the footer.
- No affiliate or lead-buying language.
