#!/usr/bin/env python3
"""Walk every page type on the EU mirror and report anything that is not 200.

Usage: scripts/verify-eu.py [base-url]
Default base is the bucket's website endpoint; pass https://ownthemachine.eu
to run the same checks against the live domain before and after a flip.
"""
import subprocess, sys

BASE = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else \
    'https://ownthemachine-eu.s3-website.fr-par.scw.cloud'

PATHS = [
    '/', '/law/', '/law/article-1/', '/law/recitals/', '/law/annex-1-counting/',
    '/law/annex-2-retention/', '/law/objections/', '/law/ledger/', '/law/memorandum/',
    '/simulator/', '/evidence/', '/about/', '/contribute/',
    '/nl/', '/nl/law/article-1/', '/nl/law/objections/', '/nl/simulator/',
    '/fr/', '/fr/law/recitals/', '/de/', '/de/law/objections/', '/es/', '/es/evidence/',
    '/downloads/own-the-machine-draft.pdf', '/downloads/own-the-machine-draft.epub',
    '/og/en-index.png', '/og/nl-law-objections.png',
    '/robots.txt', '/sitemap.xml',
]

def code(url):
    r = subprocess.run(['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}',
                        '--max-time', '30', url], capture_output=True, text=True, timeout=60)
    return r.stdout.strip()

print(f'verifying {BASE}\n')
bad = []
for p in PATHS:
    c = code(BASE + p)
    if c != '200':
        bad.append((p, c))
    print(f'{c}  {p}')

missing = code(BASE + '/this-path-does-not-exist/')
print(f'\nmissing path -> {missing}', '(404 page served)' if missing == '404'
      else '(403: bucket hides absent keys; the CDN should serve the 404 page)')

print(f'\nfailures: {len(bad)}')
for p, c in bad:
    print(' ', c, p)
sys.exit(1 if bad else 0)
