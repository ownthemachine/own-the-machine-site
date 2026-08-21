---
gate: translation
target: content/nl/evidence.md (section 7) + simulator UI strings (forecast, generation, disclaimer)
source-commit: 8c93537
verdict: PUBLISH
disposition: merged-with-fixes
date: 2026-08-19
---

# The long horizon, nl: fidelity gate on evidence section 7 and the new simulator strings

Evidence section 7 (Alaska both ways, the AI-value forecasts held out
of the premise, the fifty-year arithmetic) and the three new simulator
UI strings (forecast button, generation sentence, disclaimer),
translated under the fixed terminology canon and gated against the
English source. This gate run caught a real ambiguity in the English
source ('designated revenue'), which was fixed in the law repo at
commit 8c93537. Native verification remains the pending top tier;
status: gate-reviewed.

## Editor disposition (19 August 2026)

Round 1 (REVISE): doorrekening for the informal gedraaid, slechts
restored, Bandbreedtes for Marges, the generation sentence given its
parallel verbs. Rejected: aangewezen omzet as inkomsten (the reviewer
read fund receipts; the meaning is firm turnover), resolved instead by
disambiguating to omzet van aangewezen ondernemingen, and the English
source itself was clarified (law commit 8c93537). Round 2: PUBLISH.

Reviewer: google/gemini-3.7-flash via review.sh; raw outputs in
translations/docreview-nl-horizon.md at review time.
