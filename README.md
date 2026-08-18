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
