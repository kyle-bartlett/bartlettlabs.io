# PostHog: send `audit_booked` from the Cal.com n8n workflow

Added 2026-10-16. The site cannot see a Cal.com booking complete (the calendar is a plain
iframe), so the booking conversion is sent server-side from the n8n workflow
"Cal.com audit booking -> Bartlett Labs CRM" at https://n8n.bartlettlabs.io.
The matching PostHog action "Audit booked" already exists in project 368592.

## One-time setup in n8n (about 2 minutes)

1. Open the workflow "Cal.com audit booking -> Bartlett Labs CRM".
2. Add an **HTTP Request** node and connect it to the output of **Map lead fields**
   (a second branch next to "POST to Bartlett Labs CRM", so it cannot break the CRM path).
3. Set it up like this:
   - Method: `POST`
   - URL: `https://us.i.posthog.com/i/v0/e/`
   - Send Body: on, Body Content Type: `JSON`, Specify Body: `Using JSON`
   - JSON body (paste as-is, it uses n8n expressions):

```json
{
  "api_key": "phc_D23QTwP52DNP3rbyRboLRVcFy7mAdSGjhUAtUtvfvE58",
  "event": "audit_booked",
  "distinct_id": "={{ $json.email }}",
  "properties": {
    "source": "={{ $json.source }}",
    "calcom_uid": "={{ $json.calcom_uid }}",
    "meeting_start": "={{ $json.meeting_start }}",
    "$set": { "email": "={{ $json.email }}", "name": "={{ $json.name }}", "company": "={{ $json.company }}" }
  }
}
```

4. Settings tab of that node: turn on **Continue On Fail** so a PostHog hiccup never blocks the CRM post.
5. Save, then **Execute workflow** with the pinned Cal.com test payload. PostHog shows the event
   under Activity within a minute.

The `api_key` above is the project's public write-only token (the same one in the site's
`NEXT_PUBLIC_POSTHOG_KEY`). It cannot read data.

## What this unlocks

- Web analytics conversion goal = action "Audit booked".
- Funnel: `$pageview` on /book or /contact -> `audit_booked`.
- The person profile in PostHog gets the booker's email, so a replay can be matched to a booking.
