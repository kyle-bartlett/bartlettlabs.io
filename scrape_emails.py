#!/usr/bin/env python3
"""
Scrape real email addresses from 25K+ business websites.
Uses ThreadPoolExecutor for parallel requests with checkpointing.
"""
import csv, re, ssl, time, os, json
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

INPUT = '/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/houston_leads_30k_enriched.csv'
OUTPUT = '/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/houston_leads_30k_enriched.csv'
CHECKPOINT = '/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/scrape_checkpoint.json'
PROGRESS_LOG = '/Volumes/Bart_26/Dev_Expansion/Personal/Bartlett_Labs/scrape_progress.log'

MAX_WORKERS = 80
TIMEOUT = 8
CHECKPOINT_EVERY = 500

EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')
SKIP_DOMAINS = {
    'sentry.io', 'wixpress.com', 'googleapis.com', 'w3.org', 'schema.org',
    'example.com', 'wordpress.org', 'gravatar.com', 'jquery.com', 'google.com',
    'gstatic.com', 'cloudflare.com', 'cloudflareinsights.com', 'wp.com',
    'bootstrapcdn.com', 'fontawesome.com', 'typekit.net', 'adobe.com',
    'googletagmanager.com', 'facebook.com', 'twitter.com', 'instagram.com',
    'youtube.com', 'linkedin.com', 'yelp.com', 'bbb.org', 'angieslist.com',
    'homeadvisor.com', 'thumbtack.com', 'squarespace.com', 'wix.com',
    'godaddy.com', 'herokuapp.com', 'netlify.com', 'vercel.app',
}
SKIP_SUFFIXES = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.css', '.js')

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE


def extract_domain(url):
    match = re.search(r'https?://(?:www\.)?([^/?#]+)', url)
    return match.group(1).lower() if match else None


def scrape_one(url):
    """Scrape a single URL for email addresses. Returns set of emails or empty set."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        resp = urllib.request.urlopen(req, timeout=TIMEOUT, context=ssl_ctx)
        html = resp.read(500_000).decode('utf-8', errors='ignore')  # max 500KB
        raw_emails = set(EMAIL_RE.findall(html))
        cleaned = set()
        for e in raw_emails:
            e_lower = e.lower()
            if any(s in e_lower for s in SKIP_DOMAINS):
                continue
            if any(e_lower.endswith(s) for s in SKIP_SUFFIXES):
                continue
            if '@' not in e_lower:
                continue
            # Skip emails that look like version strings or hashes
            local_part = e_lower.split('@')[0]
            if len(local_part) > 40:
                continue
            cleaned.add(e_lower)
        return cleaned
    except Exception:
        return set()


def log(msg):
    ts = time.strftime('%H:%M:%S')
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    with open(PROGRESS_LOG, 'a') as f:
        f.write(line + '\n')


def main():
    # Load leads
    with open(INPUT) as f:
        leads = list(csv.DictReader(f))
    log(f"Loaded {len(leads)} leads")

    # Load checkpoint if exists
    scraped_domains = {}
    if os.path.exists(CHECKPOINT):
        with open(CHECKPOINT) as f:
            scraped_domains = json.load(f)
        log(f"Resumed from checkpoint: {len(scraped_domains)} domains already scraped")

    # Build scrape queue — only leads with websites, skip already-scraped domains
    to_scrape = []
    for i, lead in enumerate(leads):
        url = lead.get('website', '').strip()
        if not url:
            continue
        domain = extract_domain(url)
        if not domain or len(domain) < 5 or '.' not in domain:
            continue
        if any(s in url for s in ['facebook.com', 'yelp.com', 'instagram.com', 'twitter.com',
                                   'linkedin.com', 'youtube.com', 'google.com']):
            continue
        if domain in scraped_domains:
            continue
        to_scrape.append((i, url, domain))

    # Dedupe by domain — only scrape each domain once
    seen_domains = set()
    unique_scrapes = []
    for i, url, domain in to_scrape:
        if domain not in seen_domains:
            seen_domains.add(domain)
            unique_scrapes.append((i, url, domain))

    log(f"Domains to scrape: {len(unique_scrapes)} (skipping {len(scraped_domains)} already done)")

    if not unique_scrapes:
        log("Nothing to scrape — all domains already processed")
        return

    # Scrape in parallel
    completed = 0
    found_count = 0
    start_time = time.time()

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {}
        for i, url, domain in unique_scrapes:
            future = executor.submit(scrape_one, url)
            futures[future] = (i, url, domain)

        for future in as_completed(futures):
            i, url, domain = futures[future]
            emails = future.result()
            completed += 1

            if emails:
                # Pick the best email (prefer non-info@ addresses)
                best = None
                for e in sorted(emails):
                    if not e.startswith('info@'):
                        best = e
                        break
                if not best:
                    best = sorted(emails)[0]
                scraped_domains[domain] = best
                found_count += 1
            else:
                scraped_domains[domain] = ''

            # Progress logging
            if completed % 200 == 0:
                elapsed = time.time() - start_time
                rate = completed / elapsed
                remaining = (len(unique_scrapes) - completed) / rate if rate > 0 else 0
                log(f"Progress: {completed}/{len(unique_scrapes)} domains "
                    f"({found_count} found emails, {rate:.0f}/sec, ~{remaining/60:.0f}min left)")

            # Checkpoint
            if completed % CHECKPOINT_EVERY == 0:
                with open(CHECKPOINT, 'w') as f:
                    json.dump(scraped_domains, f)

    # Final checkpoint
    with open(CHECKPOINT, 'w') as f:
        json.dump(scraped_domains, f)

    elapsed = time.time() - start_time
    log(f"Scraping complete: {found_count}/{len(unique_scrapes)} domains had emails "
        f"({found_count/len(unique_scrapes)*100:.1f}%) in {elapsed/60:.1f} minutes")

    # Now update the CSV with real emails
    updated = 0
    for lead in leads:
        url = lead.get('website', '').strip()
        if not url:
            continue
        domain = extract_domain(url)
        if not domain:
            continue
        real_email = scraped_domains.get(domain, '')
        if real_email:
            lead['email_guess'] = real_email
            updated += 1
        # If no real email found but we have a domain, keep the info@ guess

    fieldnames = ['name', 'phone', 'website', 'address', 'city', 'rating', 'reviews', 'type', 'place_id', 'email_guess']
    with open(OUTPUT, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for lead in leads:
            row = {k: lead.get(k, '') for k in fieldnames}
            writer.writerow(row)

    log(f"Updated {updated} leads with real scraped emails. CSV saved to {OUTPUT}")


if __name__ == '__main__':
    main()
