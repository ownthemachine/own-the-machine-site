# Website release — 7 September 2026

The reviewed working-draft claim corrections are live at https://ownthemachine.eu.
The current Article 114 working draft remains the published text. The separate
Article 352 alternative is not substituted into the website or downloads.

Four final website prose reviews returned PUBLISH. This is not clearance of
the underlying legal mechanism: the substantive legal and financial questions,
unvalidated sizing assumptions and disclosed stale summary translations remain
open. Review inputs, raw outputs and dispositions are in the law repository at
commit d2e13cf, campaign/SITE-RELEASE-2026-09-07.md.

The build contains 191 pages and a 190-URL sitemap. Translation structure,
labels, navigation, contents lists, five one-page briefs and CSP checks pass.
Twenty page/theme browser samples passed at desktop and mobile widths with
no axe A/AA findings, horizontal overflow, runtime errors or third-party
requests. These samples do not certify the entire site. The PDF cover was
visually inspected; EPUB archive integrity passed.

Deployment completed on the existing Scaleway EU target; the CDN purge
completed. The live check passed, including all five homepages, key content,
extensionless links, 404 handling, the PDF, TLS and document CSP. Fourteen live
responses, including both downloads, exactly matched the local build. See
verification.json for source commits, timestamps, byte hashes and browser
results, and live-check.txt for the public endpoint check.

All 537 previous storage objects have verified rollback copies in the local
release backup, with an object-key manifest preserving extensionless pages.
Older immutable assets were retained. Source feature branches were pushed;
no merge to main, official filing, signature collection or email send occurred.
