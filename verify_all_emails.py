#!/usr/bin/env python3
"""
Verify ~20K emails via MillionVerifier single-email API.
Uses ThreadPoolExecutor with checkpointing for crash recovery.
"""
import urllib.request, urllib.parse, json, time, csv, ssl, os
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import Counter

API_KEY = "IhhZzfr2wAEyzUnw4gACFVJQl"
API_URL = "https://api.millionverifier.com/api/v3/"
MAX_WORKERS = 15
TIMEOUT = 15
CHECKPOINT_EVERY = 500

BASE = os.path.dirname(os.path.abspath(__file__))
INPUT = f'{BASE}/mv_remaining_emails.txt'
CHECKPOINT = f'{BASE}/mv_full_checkpoint.json'
RESULTS_CSV = f'{BASE}/mv_full_results.csv'
LEADS_CSV = f'{BASE}/houston_leads_30k_enriched.csv'
OUTPUT_CSV = f'{BASE}/houston_leads_30k_verified.csv'

ssl_ctx = ssl.create_default_context()


def normalize_email(email):
    return urllib.parse.unquote((email or '')).strip().lower()


def verify_one(email):
    """Returns (email, quality, result, resultcode, free, role)"""
    try:
        email = normalize_email(email)
        url = f"{API_URL}?api={API_KEY}&email={urllib.parse.quote(email)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=TIMEOUT, context=ssl_ctx)
        data = json.loads(resp.read().decode())
        return (email, data.get('quality', ''), data.get('result', ''),
                data.get('resultcode', ''), data.get('free', False), data.get('role', False))
    except Exception as ex:
        return (email, 'error', str(ex), '', False, False)


def save_checkpoint(results_dict):
    with open(CHECKPOINT, 'w') as f:
        json.dump(results_dict, f)


def main():
    # Load emails to verify
    with open(INPUT) as f:
        all_emails = [normalize_email(line) for line in f if normalize_email(line)]

    # Load checkpoint if exists
    results_dict = {}
    if os.path.exists(CHECKPOINT):
        with open(CHECKPOINT) as f:
            results_dict = json.load(f)
        print(f"Resumed from checkpoint: {len(results_dict)} already verified")

    # Filter out already-verified
    to_verify = [e for e in all_emails if e not in results_dict]
    print(f"Total emails: {len(all_emails)}")
    print(f"Already verified: {len(results_dict)}")
    print(f"Remaining: {len(to_verify)}")

    if not to_verify:
        print("Nothing to verify — all done!")
    else:
        completed = 0
        start = time.time()

        with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
            futures = {executor.submit(verify_one, e): e for e in to_verify}
            for future in as_completed(futures):
                result = future.result()
                email = result[0]
                results_dict[email] = {
                    'quality': result[1], 'result': result[2],
                    'resultcode': result[3], 'free': result[4], 'role': result[5]
                }
                completed += 1

                if completed % 200 == 0:
                    elapsed = time.time() - start
                    rate = completed / elapsed
                    remaining = (len(to_verify) - completed) / rate if rate > 0 else 0
                    q_counts = Counter(r['quality'] for r in results_dict.values())
                    print(f"  {completed}/{len(to_verify)} verified "
                          f"({rate:.0f}/sec, ~{remaining/60:.0f}min left) | "
                          f"good:{q_counts.get('good',0)} risky:{q_counts.get('risky',0)} "
                          f"bad:{q_counts.get('bad',0)}")

                if completed % CHECKPOINT_EVERY == 0:
                    save_checkpoint(results_dict)

        # Final checkpoint
        save_checkpoint(results_dict)
        elapsed = time.time() - start
        print(f"\nVerification complete in {elapsed/60:.1f} minutes")

    # Also load the previous 490 results and merge
    prev_results = {}
    prev_path = f'{BASE}/mv_top490_results.csv'
    if os.path.exists(prev_path):
        with open(prev_path) as f:
            for row in csv.DictReader(f):
                prev_results[normalize_email(row['email'])] = {
                    'quality': row['quality'], 'result': row['result'],
                    'resultcode': row.get('resultcode', ''),
                    'free': row.get('free', ''), 'role': row.get('role', '')
                }
        print(f"Loaded {len(prev_results)} previous results from top 490 batch")

    # Merge all results
    all_results = {**prev_results, **results_dict}
    print(f"Total verified emails: {len(all_results)}")

    # Save full results CSV
    with open(RESULTS_CSV, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['email', 'quality', 'result', 'resultcode', 'free', 'role'])
        for email in sorted(all_results.keys()):
            r = all_results[email]
            writer.writerow([email, r['quality'], r['result'],
                           r.get('resultcode', ''), r.get('free', ''), r.get('role', '')])
    print(f"Saved all results to {RESULTS_CSV}")

    # Tally
    quality_counts = Counter(r['quality'] for r in all_results.values())
    result_counts = Counter(r['result'] for r in all_results.values())

    print(f"\n=== QUALITY BREAKDOWN (ALL {len(all_results)} EMAILS) ===")
    for q, c in quality_counts.most_common():
        pct = c / len(all_results) * 100
        print(f"  {q}: {c} ({pct:.1f}%)")

    print(f"\n=== RESULT BREAKDOWN ===")
    for r, c in result_counts.most_common():
        print(f"  {r}: {c}")

    # Merge with full 30K leads CSV
    with open(LEADS_CSV) as f:
        leads = list(csv.DictReader(f))

    fieldnames = ['name', 'phone', 'website', 'address', 'city', 'rating', 'reviews',
                  'type', 'place_id', 'email_guess', 'mv_quality', 'mv_result']
    with open(OUTPUT_CSV, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for lead in leads:
            email = normalize_email(lead.get('email_guess', ''))
            r = all_results.get(email, {})
            row = {k: lead.get(k, '') for k in fieldnames}
            row['mv_quality'] = r.get('quality', '')
            row['mv_result'] = r.get('result', '')
            writer.writerow(row)

    # Final summary
    good = sum(1 for r in all_results.values() if r['quality'] == 'good')
    risky = sum(1 for r in all_results.values() if r['quality'] == 'risky')
    bad = sum(1 for r in all_results.values() if r['quality'] == 'bad')
    errors = sum(1 for r in all_results.values() if r['quality'] == 'error')

    print(f"\n{'='*50}")
    print(f"  FINAL SUMMARY")
    print(f"{'='*50}")
    print(f"  GOOD (safe to send):       {good}")
    print(f"  RISKY (catch-all/unknown):  {risky}")
    print(f"  BAD (invalid/disposable):   {bad}")
    print(f"  ERRORS (timeouts):          {errors}")
    print(f"  TOTAL VERIFIED:             {len(all_results)}")
    print(f"{'='*50}")
    print(f"\n  Ready for SmartLead: {good + risky} leads")
    print(f"  Saved to: {OUTPUT_CSV}")
    print(f"  Credits used: ~{len(all_results)}")


if __name__ == '__main__':
    main()
