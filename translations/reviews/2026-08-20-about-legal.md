---
gate: translation
target: content/{en,nl,fr,de,es}/about.md — EU disclaimer, hosting statement, data notice, publisher identification
source-commit: 11757cc
verdict: PUBLISH
disposition: merged-with-fixes
date: 2026-08-20
---

# The about page grows a legal spine

Four additions, prompted by David asking whether the site should say
that it is hosted in the EU, and then whether other legal obligations
were being met.

**Not an EU document.** The site renders a draft Regulation, on a .eu
domain, in the drafting conventions of Union legislation, in five
Union languages, and said nothing to distinguish itself from an
official text. It now disclaims publication, endorsement, affiliation
and review by any Union institution, body, office or agency, states
that it has no legal force, and notes that it carries no EU emblem.

**Where this site lives.** The files, cache and certificate are in
Paris on Scaleway; the DNS is answered by Cloudflare and the source
repository is on GitHub, both American. A campaign about European
ownership is in a poor position to be vague about its own stack, so
the section names both halves.

**Your data.** The page had claimed the site "collects nothing". A
server that answers a request sees the address it came from. The
section now names the technical logs, says what they are and are not
used for, notes that the theme preference never leaves the reader's
browser, and points to the supervisory authority.

**Who publishes this.** There was no publisher identification of any
kind: no name in a legal sense, no contact route beyond a repository
link. Belgian and German rules expect an imprint for anything beyond a
private page, and the GDPR expects a named controller reachable by a
human. hello@ownthemachine.eu was created for the purpose (Cloudflare
Email Routing, forwarding to the editor) and the section directs
substantive argument to the public repository, where the answer can be
read by everyone the draft concerns.

## Editor disposition (20 August 2026)

Four rounds on the first three sections, two on the imprint. The gate
earned its keep on the disclaimer: three of the four translations had
truncated the Union's own formula for "institution, body, office or
agency", the one phrase in the paragraph that has to be complete, and
Dutch had additionally rendered "office or agency" as a single word
where EU drafting uses "bureau of agentschap". Also fixed: affiliation
collapsed into endorsement in three languages; "courtesy to the
reader" as a transactional service in Dutch; several calques around
carrying content and consenting to nothing.

Reviewer: google/gemini-3.7-flash via review.sh; raw outputs in
translations/docreview-{lang}-about-legal.md and
docreview-{lang}-imprint.md at review time.
