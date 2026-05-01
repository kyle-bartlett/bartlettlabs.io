# SmartLead ↔ GHL Operating SOP

Updated: 2026-04-20
Applies to: Bartlett Labs outbound cold-email workflow
Status: Active operating model

## Non-negotiable system roles

- GHL = source of truth / CRM / pipeline / scheduling / post-reply workflow
- SmartLead = cold outbound sending engine only
- MillionVerifier = verification source
- Local CSV exports = staging artifacts, not live CRM state

## Hard rules

1. Cold outbound sends happen in SmartLead only.
2. Every outbound prospect must exist in GHL before or at the exact time they are loaded into SmartLead.
3. Any real reply must immediately update the GHL contact record.
4. Pipeline stage changes happen in GHL, not SmartLead.
5. Booking, qualification, proposal, onboarding, and deal status live in GHL.
6. `bad` and `error` emails do not enter any send workflow.
7. `risky` emails stay out of the first launch until deliverability looks healthy.

## Current verified lead state

From `houston_leads_30k_verified.csv`:

- total rows: 30,023
- sendable rows before dedupe: 15,312
- unique sendable emails after dedupe: 12,265
- unique good emails: 8,923
- unique risky emails: 3,342
- shared-email review rows: 4,162
- shared-email unique addresses: 1,752

Important:
- Multiple businesses share the same email in many cases.
- Launch exports were deduped by email so the same inbox does not get hit multiple times from different business rows.
- Use `shared_email_review.csv` for chain/location cleanup later.

## Export files created

Folder:
`/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/Outreach_Strategies/exports_2026-04-20`

Primary files:

- `ghl_import_launch_good_first_500.csv`
- `ghl_import_houston_good_unique_8923.csv`
- `ghl_import_houston_risky_unique_3342.csv`
- `ghl_import_houston_good_plus_risky_unique_12265.csv`
- `smartlead_upload_houston_good_unique_8923.json`
- `smartlead_upload_houston_risky_unique_3342.json`
- `smartlead_upload_houston_good_plus_risky_unique_12265.json`
- `smartlead_upload_houston_good_unique_8923.csv`
- `smartlead_upload_houston_risky_unique_3342.csv`
- `smartlead_launch_good_first_500.json`
- `shared_email_review.csv`
- `export_summary.json`

## Recommended launch path

Do not blast the full database immediately.

Launch order:

1. Import the deduped good leads into GHL.
2. Start SmartLead with the first 500 good leads only.
3. Monitor replies, bounces, and inbox health.
4. If healthy, continue with more good leads.
5. Only bring in risky leads after the good-only launch looks stable.

## Exact order of operations

### Phase 1 — CRM load

1. For the first live send, import `ghl_import_launch_good_first_500.csv` into GHL.
2. After the first launch looks healthy, import the broader good-lead file `ghl_import_houston_good_unique_8923.csv` in additional waves.
3. Make sure imported contacts keep batch/source tags.
4. Confirm GHL fields for these columns exist or map cleanly:
   - first_name
   - last_name
   - company_name
   - email
   - phone
   - website
   - address
   - city
   - rating
   - reviews
   - business_type
   - mv_quality
   - mv_result
   - place_id
   - shared_email_count
   - source
   - tags
5. Ensure the import applies tags from the CSV.
6. Do not enroll these contacts into an old GHL cold-email workflow.

### Phase 2 — Outbound engine load

1. Upload `smartlead_launch_good_first_500.json` to the active SmartLead campaign first.
2. Confirm the campaign copy, sending mailbox, and unsubscribe handling are correct.
3. Verify those same 500 already exist in GHL.
4. Only then activate the SmartLead campaign.

### Phase 3 — Reply handoff

1. SmartLead detects a reply.
2. Existing webhook / reply logic tags or updates the matching GHL contact.
3. GHL runs the reply workflow:
   - apply `outreach-replied`
   - notify Kyle
   - move pipeline stage
   - create internal next-step workflow
4. From this point forward, the lead is worked in GHL.

### Phase 4 — Sales process in GHL

After reply, use GHL for:

- qualification
- notes
- tasks
- discovery booking
- audit scheduling
- proposal status
- won / lost outcome
- client onboarding handoff

## Operational checklist

### Before any launch

- [ ] Confirm SmartLead campaign is the only cold-email sender
- [ ] Confirm GHL is the system of record for imported contacts
- [ ] Confirm reply webhook is still active
- [ ] Confirm no old GHL cold-email workflow will also send to these contacts
- [ ] Confirm import field mapping in GHL
- [ ] Confirm test contact exists in both systems

### First launch batch

- [ ] Import `ghl_import_launch_good_first_500.csv` into GHL
- [ ] Upload `smartlead_launch_good_first_500.json` to SmartLead
- [ ] Send internal test if possible
- [ ] Activate campaign on first 500 only
- [ ] Watch replies / bounce behavior / inbox health for 24–48 hours

### Scale-up

- [ ] Continue through remaining good leads in controlled batches
- [ ] Keep GHL import and SmartLead send batches aligned by source tag
- [ ] Do not add risky leads until good-only performance is acceptable
- [ ] Review `shared_email_review.csv` before any chain/location expansion

## Tagging standard

Suggested minimum tags to preserve in GHL:

- `bartlett-labs-outbound`
- `houston`
- `mv-verified`
- `mv-good` or `mv-risky`
- source batch tag from the export
- `shared-email-review` when shared inbox count is greater than 1

## Do not use this older workflow as the primary launch path

`GHL_WORKFLOW_SETUP_3-15-26.md` includes a GHL cold-email sequence.
That older sequence is now superseded by the newer operating model:

- SmartLead sends cold email
- GHL handles CRM and post-reply execution

Use GHL email templates only for warm/manual follow-up after reply, not for initial cold outreach.

## Immediate next action

Start with:

1. GHL import: `ghl_import_launch_good_first_500.csv`
2. SmartLead launch file: `smartlead_launch_good_first_500.json`

Then, once that launch is healthy, continue with `ghl_import_houston_good_unique_8923.csv` and the rest of the good-lead SmartLead file in controlled waves.

That is the cleanest way to start sending now without fragmenting the workflow.
