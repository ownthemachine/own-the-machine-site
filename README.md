# ownthemachine.eu (site)

The website and dividend simulator for the Own the Machine campaign.
**The law itself lives in the sibling repository
[own-the-machine](https://github.com/ownthemachine/own-the-machine)**, which is
the single source of truth: this site renders the regulation, memorandum and
evidence from a pinned version of that repo at build time, and never carries
its own copy.

Split from the law repo by design: different licences (AGPL-3.0 here,
CC BY-SA there), different contributors (developers here, lawyers and policy
people there), different cadences (continuous deploys here, versioned
releases there).

Start with PRD.md. Constraints that bind every commit: the site collects
nothing (all ECI signing happens on the Commission's COCS), makes zero
third-party requests, sets no cookies, and the simulator obeys DC-14 of the
law repo's constraints table: the compounding curve, never a first-year
headline.

Licence: AGPL-3.0 (site), MIT (embeddable simulator widget). Nothing here
is public before Gate 1 of campaign/GATES.md in the law repo.

## Keeping private things out of a public repository

These repositories are public. Everything in them is public, and so is every
commit message, which is rendered on the hosting platform and copied into
every clone.

Two things reached them that should not have: a file naming living people
with contact details and private assessments of them, and a session
identifier in every commit message. Both were found by a person reading,
which is not a control.

`.githooks/scan.py` is the control. It runs on every commit, over the staged
content and over the message, and refuses anything matching a short list:
local account names and absolute paths, scratch and job directories, session
identifiers, the names of unrelated private projects, and credentials. The
hooks are versioned rather than living in `.git/hooks`, so a clone gets them:

    git config core.hooksPath .githooks

Run it by hand over any file with `python3 .githooks/scan.py FILE`, or over
what is staged with `python3 .githooks/scan.py --staged`.

If a match is genuinely a false positive, `git commit --no-verify` bypasses
it. Every use of that flag is a decision to publish something the control
objected to, so it should be rare and deliberate.

The co-authorship trailer is deliberately allowed. This project's own rule is
that authorship is a feature when declared and a liability when discovered,
and that applies to machine authorship as much as to the book.
