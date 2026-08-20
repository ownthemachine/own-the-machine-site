import subprocess

EP = 'https://own-the-machine-site.s3-website.fr-par.scw.cloud'
PATHS = [
    '/', '/law/', '/law/article-1/', '/law/article-1', '/law/recitals/',
    '/law/annex-2-retention/', '/law/objections/', '/law/ledger/', '/simulator/',
    '/evidence/', '/about/', '/contribute/',
    '/nl/', '/nl/law/article-1/', '/nl/law/objections/', '/nl/simulator/',
    '/fr/law/recitals/', '/de/law/objections/', '/es/evidence/',
    '/downloads/own-the-machine-draft.pdf', '/downloads/own-the-machine-draft.epub',
    '/og/home.png', '/robots.txt', '/sitemap-index.xml',
    '/this-page-does-not-exist/',
]
bad = []
for p in PATHS:
    r = subprocess.run(['curl', '-s', '-o', '/dev/null', '-w', '%{http_code} %{content_type}',
                        '--max-time', '30', EP + p], capture_output=True, text=True, timeout=60)
    code, _, ctype = r.stdout.partition(' ')
    flag = ''
    if p == '/this-page-does-not-exist/':
        flag = '' if code in ('404',) else '  <-- expected 404'
    elif code != '200':
        flag = '  <-- FAIL'
        bad.append(p)
    print(f'{code}  {ctype[:28]:28s} {p}{flag}')
print('\nfailures:', len(bad))
