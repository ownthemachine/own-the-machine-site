---
gate: translation-fidelity (the new about section, four languages)
target: content/{en,nl,fr,de,es}/about.md — "Where the review runs"
date: 2026-08-23
rounds: 1
verdict: PUBLISH in fr and es; REVISE in nl (polish only) and de (one fidelity fix, applied)
disposition: applied and deployed
---

# Disclosing where the review runs (23 August 2026)

The site already tells the reader which parts of its own serving path are
not European, because a campaign about European ownership should say which.
It did not say the same about the review gates, which are the other place
this campaign spends compute, and which handle the draft Regulation itself
before it is filed.

From today the gates run on Requesty's European endpoint, on models hosted
in the Union under zero retention and no training use. The runner verifies
that from the router's own metadata before it spends a token and refuses to
start if the answer is not EU, zero retention and no training. What it read
is stamped into every review record, so the claim on this page is checkable
against the evidence in the law repository rather than taken on trust.

The section states the limit as plainly as the claim: **hosted in Europe is
not built in Europe.** The models are American and only Mistral, among what
this endpoint offers, is a European laboratory. That sentence is the honest
one and it belongs on a page about who owns the machine.

## The gate on its own disclosure

The new section was reviewed through the new routing, which is the first
document to be gated that way. The German had flattened "a jurisdiction of
its own" into "also has a jurisdiction", losing the point that the compute
is subject to a jurisdiction of its own; corrected. The Dutch findings were
polish only. French and Spanish passed.
