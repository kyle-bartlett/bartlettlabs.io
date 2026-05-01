#!/usr/bin/env python3
"""
Verify 490 emails via MillionVerifier single-email API.
Uses ThreadPoolExecutor for parallel requests.
"""
import urllib.request, json, time, csv, ssl
from concurrent.futures import ThreadPoolExecutor, as_completed

API_KEY = "IhhZzfr2wAEyzUnw4gACFVJQl"
API_URL = "https://api.millionverifier.com/api/v3/"
MAX_WORKERS = 10  # Be nice to their API
TIMEOUT = 15

ssl_ctx = ssl.create_default_context()

def verify_one(email):
    """Returns (email, result_quality, result_text, subresult)"""
    try:
        url = f"{API_URL}?api={API_KEY}&email={urllib.parse.quote(email)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=TIMEOUT, context=ssl_ctx)
        data = json.loads(resp.read().decode())
        # API returns: result (ok/catch_all/unknown/error/invalid/disposable),
        # quality (good/risky/bad), resultcode, free, role
        return (email, data.get('quality', ''), data.get('result', ''),
                data.get('resultcode', ''), data.get('free', False), data.get('role', False))
    except Exception as ex:
        return (email, 'error', str(ex), '', False, False)

import urllib.parse

def main():
    # Load emails
    with open('/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/mv_top490_emails.txt') as f:
        emails = [line.strip() for line in f if line.strip()]

    print(f"Verifying {len(emails)} emails via MillionVerifier...")

    results = []
    completed = 0
    start = time.time()

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(verify_one, e): e for e in emails}
        for future in as_completed(futures):
            result = future.result()
            results.append(result)
            completed += 1
            if completed % 50 == 0:
                elapsed = time.time() - start
                print(f"  {completed}/{len(emails)} verified ({elapsed:.0f}s)")

    elapsed = time.time() - start
    print(f"\nDone in {elapsed:.0f}s")

    # Tally results
    from collections import Counter
    quality_counts = Counter(r[1] for r in results)
    result_counts = Counter(r[2] for r in results)

    print(f"\nQuality breakdown:")
    for q, c in quality_counts.most_common():
        print(f"  {q}: {c}")

    print(f"\nResult breakdown:")
    for r, c in result_counts.most_common():
        print(f"  {r}: {c}")

    # Save full results
    with open('/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/mv_top490_results.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['email', 'quality', 'result', 'resultcode', 'free', 'role'])
        for r in sorted(results, key=lambda x: x[1]):
            writer.writerow(r)

    # Merge back with lead data
    email_results = {r[0]: {'quality': r[1], 'result': r[2], 'resultcode': r[3]} for r in results}

    with open('/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/mv_top490_leads.csv') as f:
        leads = list(csv.DictReader(f))

    fieldnames = ['name','phone','website','address','city','rating','reviews','type','place_id','email_guess','mv_quality','mv_result']
    with open('/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/mv_top490_verified.csv', 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for l in leads:
            e = l.get('email_guess', '').strip()
            r = email_results.get(e, {})
            row = {k: l.get(k, '') for k in fieldnames}
            row['mv_quality'] = r.get('quality', '')
            row['mv_result'] = r.get('result', '')
            writer.writerow(row)

    # Count valid leads
    valid = [r for r in results if r[1] == 'good']
    risky = [r for r in results if r[1] == 'risky']
    bad = [r for r in results if r[1] == 'bad']

    print(f"\n=== SUMMARY ===")
    print(f"GOOD (safe to send): {len(valid)}")
    print(f"RISKY (catch-all/unknown): {len(risky)}")
    print(f"BAD (invalid/disposable): {len(bad)}")
    print(f"\nSaved to mv_top490_results.csv and mv_top490_verified.csv")
    print(f"Credits used: {len(emails)}")
    print(f"Credits remaining: ~{490 - len(emails)}")

if __name__ == '__main__':
    main()
