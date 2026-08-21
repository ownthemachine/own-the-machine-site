---
gate: native-ear
target: content/{nl,fr,de,es}/evidence.md and content/{nl,fr,de,es}/plain/
source-commit: 8b0d54f
reviewer: openrouter google/gemini-3.7-flash, NATIVE-EAR-PROMPT.md
verdict: REVISE at every round; closed by editor disposition
disposition: merged-with-fixes, residue recorded
date: 2026-08-21
---

# The gate that was never run

David read the Dutch evidence page and asked why section 1 was headed
"Het bezit is smal". In Dutch, *smal* is the narrowness of a corridor. It
is also a faithful rendering of "Ownership is narrow", which is why every
check this project runs had passed it.

That is the point worth keeping. The project has two translation gates.
The fidelity gate asks whether the translation matches the English. The
completeness check asks whether anything is missing. Both had been run on
these pages, repeatedly, and both had passed. **Neither can catch a calque,
because a calque is faithful and complete.** Only the native-ear pass reads
the page as a reader does, without the English beside it, and the record
showed it had been used exactly twice since the site was built: once on the
machine-translation banner, and once on nothing else.

Running it across everything gave twenty REVISE verdicts out of twenty:
every translated page, in every language.

## What it found

**A provision inverted in Dutch.** `onttrekking aan aandeelhouders` reads
as value taken *from* shareholders. Article 2(13) defines it as value taken
*by* them, out of the undertaking. The Dutch said the opposite of the law
in four places across three files. German and Spanish had it right;
French was right in the legal pages and used a second, different term in
the plain layer.

**A calque this editor had standardised.** The Dutch plain layer said a
warrant *kristalliseert*. Dutch legal usage has no such thing; a right
becomes unconditional or is exercised. Earlier the same day, tidying an
inconsistency, this editor had unified the Dutch spelling onto that word,
making the error consistent rather than removing it. The Dutch site now
uses *omzetting*, the term the corpus already had for the same event.

**A partially translated citation in German.** "Digital Services Taxes in
Europe" had become "Digital Services Taxes in Europa". A source title is
not prose and does not get translated, or the reader cannot find it.

**And, in the evidence pages, the ordinary weight of it:** households that
"are worth" a sum, data that "find" effects, prices "in real terms",
vacancies that "stand at half", a control group that is "built in".

## What the reviewer got wrong

Recorded because the findings were not applied mechanically, and should
not be next time.

* It called Dutch *gecontroleerd* a false friend for *audited* and proposed
  *geauditeerd*. That is backwards: *gecontroleerde jaarrekening* is the
  standard Dutch term and *geauditeerd* is the anglicism. Not applied.
* It proposed Spanish *arrebatado* where the English is about a market
  purchase, not a seizure, and *fracasa* where the mechanism has not failed
  but can fail. The editor for Spanish refused both, with reasons.
* It proposed French *s'effondre* for a falling volume, two paragraphs
  before the same page states there is no collapse in the labour share.
  Refused. Eleven other French findings were refused on similar grounds,
  including *marché intérieur* for a home market, which is the Treaty term
  for the Single Market and means something else.
* The Spanish pass over-corrected on its own account, replacing *usted*
  with *el titular* throughout the citizen-facing articles. Measured across
  languages, English, Dutch and French each address the reader about twenty
  times and Spanish had been left with two. The plain layer exists to speak
  to a person about their own entitlement. Reverted, and the reviewer's
  actual finding turned out to be narrower than the fix applied to it: it
  objected to the calque *propiedad de usted* where Spanish says *propiedad
  suya*, not to the second person as such.

  The revert then corrected this editor in turn. Spanish came back to
  nineteen forms against the English twenty-three, and the gap is not a
  residue to close: Spanish is a null-subject language, so "Si usted tiene
  la ciudadanía ... es titular" carries the second person in the verb ending
  where English needs a second pronoun. Padding it to parity would have
  reintroduced translationese from the other direction. A cross-language
  count is a good instrument for finding that something is wrong, and a poor
  one for deciding when it is right.

## What was deliberately not pursued

The second round on the fixed Dutch evidence page returned REVISE again,
with an entirely new set of findings. That is the expected shape for a page
that had never been reviewed: the first round takes the damaging errors, the
second takes collocation and register, and a later round starts inventing.
All eleven first-round findings were verified absent from the file before
the second round was read, so the process converges rather than circling.

The first round is applied. The rest is recorded here rather than chased,
on the same reasoning the project has used before when a gate began to
oscillate: a reviewer that is wrong five times in one pass does not get the
last word on a document it cannot check against a source.

`objections.md` was deliberately left out of this sweep. It is sixty
thousand characters of legal argument per language, where stiff phrasing is
often correct and where "manifestly outside the framework" must not be
smoothed into something that reads better and means less. It needs a
narrower brief than "make it sound native".

## What changed in the checking, as a result

`scripts/check-translations.mjs` compared paragraph counts against a twelve
per cent tolerance. During this work the English severability page went from
fourteen paragraphs to fifteen, because a caution was added to decomposition
rule 5 warning that the rule is an assumption Gate 1 must test. The
translations stayed at fourteen. Fourteen against fifteen is under
tolerance, so the check said ok while a whole paragraph of the English, and
the most consequential one on that page, existed in no other language. Any
difference is now shown even when it does not fail the check, and the
paragraph is translated.
