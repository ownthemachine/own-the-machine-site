// Is the live site actually serving what it should be?
//
// The risk this answers is not that object storage falls over. It is that a
// configuration change breaks the site silently and nobody notices for days:
// the bucket policy that replaced owner rights and 403'd the public once
// already (see deploy-eu.sh), a certificate that fails to renew, a DNS change,
// or a deploy that syncs an empty build. Every one of those leaves a site that
// looks fine to whoever made the change and is broken for everyone else.
//
// So this checks what a reader would experience, not what a server reports:
// real pages, in every language, with their content present, over a valid
// certificate, including the deep and extensionless paths that a plain
// index-page ping would never touch.
//
// Runs in CI on a schedule and locally with `node scripts/check-live.mjs`.
// Exit code 1 means something a visitor would notice is wrong.

import { connect } from 'node:tls';

const BASE = process.env.OTM_BASE || 'https://ownthemachine.eu';
const HOST = new URL(BASE).hostname;
const CERT_WARN_DAYS = 21;

const failures = [];
const notes = [];
const fail = (m) => { failures.push(m); console.error('  FAIL  ' + m); };
const ok = (m) => console.log('  ok    ' + m);
const note = (m) => { notes.push(m); console.log('  note  ' + m); };

async function fetchText(path, { redirect = 'follow' } = {}) {
  const res = await fetch(BASE + path, {
    redirect,
    headers: { 'user-agent': 'own-the-machine-uptime-check' },
  });
  const body = res.headers.get('content-type')?.includes('text')
    ? await res.text() : '';
  return { res, body };
}

// 1. Every locale's home page, with content actually present.
console.log('pages');
for (const [label, path, must] of [
  ['en home', '/', 'OWN'],
  ['nl home', '/nl/', 'OWN'],
  ['fr home', '/fr/', 'OWN'],
  ['de home', '/de/', 'OWN'],
  ['es home', '/es/', 'OWN'],
  ['the law', '/law/', 'Article 1'],
  ['objections', '/law/objections/', 'DC-'],
  ['faq', '/faq/', '?'],
  ['brief', '/brief/', '3'],
  ['join', '/join/', 'Member State'],
  ['versions', '/law/versions/', 'registered'],
  ['explanatory memo', '/law/explanatory-memorandum/', 'subsidiarity'],
  ['deep article', '/law/article-5/', 'warrant'],
]) {
  try {
    const { res, body } = await fetchText(path);
    if (!res.ok) fail(`${label} (${path}) returned ${res.status}`);
    else if (body.length < 3000) fail(`${label} (${path}) is only ${body.length} bytes: empty deploy?`);
    else if (!body.includes(must)) fail(`${label} (${path}) is missing expected content`);
    else ok(`${label} ${res.status}, ${body.length} bytes`);
  } catch (e) {
    fail(`${label} (${path}) threw: ${e.message}`);
  }
}

// 2. The extensionless twins: deploy-eu.sh writes these separately, and a
// failed pass 4 would leave every deep link in the site redirecting.
console.log('extensionless paths');
try {
  const { res } = await fetchText('/law/article-5', { redirect: 'manual' });
  if (res.status === 200) ok('/law/article-5 serves directly (no redirect tax)');
  else if (res.status >= 300 && res.status < 400) note(`/law/article-5 redirects (${res.status}); pass 4 of the deploy may not have run`);
  else fail(`/law/article-5 returned ${res.status}`);
} catch (e) { fail('extensionless path threw: ' + e.message); }

// 3. The 404 must be a 404, not a 403. A bucket policy without ListBucket
// turns every missing key into a permission error, which is how this broke.
console.log('error handling');
try {
  const { res } = await fetchText('/this-page-does-not-exist-' + Date.now());
  if (res.status === 404) ok('missing pages return 404');
  else if (res.status === 403) fail('missing pages return 403: the bucket policy has lost ListBucket');
  else fail(`missing pages return ${res.status}`);
} catch (e) { fail('404 check threw: ' + e.message); }

// 4. Downloads: a reader offered a PDF must get a PDF.
console.log('downloads');
try {
  const res = await fetch(BASE + '/downloads/own-the-machine-draft.pdf', { method: 'HEAD' });
  const len = Number(res.headers.get('content-length') || 0);
  if (!res.ok) fail(`draft PDF returned ${res.status}`);
  else if (len < 100000) fail(`draft PDF is only ${len} bytes`);
  else ok(`draft PDF ${res.status}, ${(len / 1024 / 1024).toFixed(1)} MB`);
} catch (e) { fail('PDF check threw: ' + e.message); }

// 5. The certificate, before it expires rather than after.
console.log('certificate');
await new Promise((resolve) => {
  const socket = connect({ host: HOST, port: 443, servername: HOST }, () => {
    const cert = socket.getPeerCertificate();
    if (!cert || !cert.valid_to) fail('no certificate returned');
    else {
      const days = Math.floor((new Date(cert.valid_to) - Date.now()) / 86400000);
      if (days < 0) fail(`certificate EXPIRED ${-days} days ago`);
      else if (days < CERT_WARN_DAYS) fail(`certificate expires in ${days} days`);
      else ok(`certificate valid for ${days} more days (${cert.issuer?.O || 'unknown issuer'})`);
    }
    socket.end();
    resolve();
  });
  socket.on('error', (e) => { fail('TLS connection failed: ' + e.message); resolve(); });
  socket.setTimeout(15000, () => { fail('TLS connection timed out'); socket.destroy(); resolve(); });
});

// 6. Security headers the document carries itself.
console.log('headers');
try {
  const { body } = await fetchText('/');
  if (body.includes('Content-Security-Policy')) ok('CSP present in the document');
  else fail('CSP missing from the document');
} catch (e) { fail('header check threw: ' + e.message); }

console.log('');
if (notes.length) console.log(`${notes.length} note(s), not failures.`);
if (failures.length) {
  console.error(`check-live: ${failures.length} problem(s) a visitor would notice.`);
  process.exit(1);
}
console.log('check-live: the site is serving correctly.');
