# Bartlett Labs GHL Compliance Audit

Updated: 2026-03-23

## Scope

Audit the rebuilt Bartlett Labs site against the current HighLevel-driven SMS and consent flow, then clean up the local site copy anywhere the codebase was still carrying generic or inaccurate compliance language.

## What Was Confirmed

- The public booking widget can be inspected without touching the codebase and exposes the active Bartlett Labs calendar configuration.
- The sub-account token works against the contacts API once the correct `locationId` is known.
- The sampled contact payloads returned a top-level `dnd` boolean and empty `dndSettings` / `inboundDndSettings` objects, so the current account appears to rely primarily on the coarse DND flag in the records we inspected.

## What Felt Off

- The live external HighLevel booking widget currently shows a broad generic consent label rather than Bartlett Labs-specific operational wording.
- The rebuilt site had local SMS pages that still contained generic template leftovers:
  - 2FA / OTP / account-verification claims
  - a fake standalone opt-in form
  - a `24 hours` manual processing promise
- The local contact form accepted a phone number without any explicit SMS consent language, which is a bad fit for current HighLevel A2P guidance.

## Local Fixes Completed In This Pass

- Added an explicit non-marketing SMS consent checkbox and disclosure block to the contact form.
- Added a calendar compliance note plus direct links to Privacy, Terms, SMS Opt-Out, and Email Opt-Out on the contact page.
- Rebuilt `/sms-opt-in` into an explanation page instead of a fake form.
- Rebuilt `/sms-opt-out` around truthful STOP-first guidance and removed stale account/timing promises.
- Updated the SMS sections in `/privacy` and `/terms` so they describe inquiry follow-up, scheduling, project communication, and support instead of invented account-security flows.
- Added regression tests for the refreshed contact, SMS opt-in, and SMS opt-out copy.

## External Admin Follow-Up

- The HighLevel booking widget consent copy was updated directly in the sub-account admin on 2026-03-23.
- If Bartlett Labs ever wants promotional or marketing SMS, collect that through a separate consent path instead of bundling it into the operational consent flow.
- Before launch, review any future GHL-native forms against the current HighLevel A2P help articles, not just this repo.

## Suggested GHL Calendar Wording

Use this as a starting point for the non-marketing consent line inside the HighLevel booking flow:

> I agree to receive non-marketing text messages from Bartlett Labs about my inquiry, scheduling, reminders, project communication, or support. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. See Privacy Policy and Terms of Service.

If marketing or promotional SMS is ever introduced later, collect that with a separate checkbox instead of expanding this operational consent line.

## Launch Note

The codebase is now in a much safer place than the earlier generic template version. The booking widget copy has been updated in HighLevel, and the site now keeps the embedded calendar on a first-party `/book` page so the compliance links remain visible while someone schedules.
