# Export Pack README

Created: 2026-04-20
Folder: `exports_2026-04-20`

## What this pack is for

This folder contains the cleaned outbound launch exports generated from `houston_leads_30k_verified.csv`.

Use GHL as the source of truth.
Use SmartLead as the outbound sender.

## Counts

- sendable rows before dedupe: 15,312
- unique sendable emails: 12,265
- unique good emails: 8,923
- unique risky emails: 3,342

## Recommended starting files

GHL import first:
- `ghl_import_launch_good_first_500.csv`

SmartLead first launch:
- `smartlead_launch_good_first_500.json`

After that first wave looks healthy, continue with:
- `ghl_import_houston_good_unique_8923.csv`
- `smartlead_upload_houston_good_unique_8923.json`

## Other files

- `ghl_import_houston_good_unique_8923.csv`
- `ghl_import_launch_good_first_500.csv`
- `ghl_import_houston_risky_unique_3342.csv`
- `ghl_import_houston_good_plus_risky_unique_12265.csv`
- `smartlead_upload_houston_good_unique_8923.json`
- `smartlead_upload_houston_risky_unique_3342.json`
- `smartlead_upload_houston_good_plus_risky_unique_12265.json`
- `smartlead_upload_houston_good_unique_8923.csv`
- `smartlead_upload_houston_risky_unique_3342.csv`
- `shared_email_review.csv`
- `export_summary.json`

## Notes

- The export set is deduped by email address.
- Shared inboxes across multiple businesses were intentionally collapsed to avoid hammering the same inbox multiple times.
- Review `shared_email_review.csv` before later expansion into chain/location duplicates.
- Hold risky leads until the good-only launch looks healthy.
