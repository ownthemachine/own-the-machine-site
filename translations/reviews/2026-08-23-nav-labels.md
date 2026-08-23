---
gate: translation-fidelity, native-ear
target: the nav and footer labels in src/i18n/*.mjs, five languages
date: 2026-08-23
rounds: 2
verdict: round 1 REVISE on 6 of 8; round 2 all four fidelity gates PUBLISH, native-ear REVISE
disposition: merged-with-fixes; two findings refused and recorded as open document-level work
---

# Editor disposition (23 August 2026)

David noticed that the Dutch footer said *Scheidbaarheid* while the page it
pointed at is headed *Deelbaarheid*, and asked for the labels to be checked
systematically. He was right, and the defect was larger than the one label.

## What had happened

The footer sitemap shipped earlier the same day introduced thirty-five short
labels, written as a set, none of them checked against terminology already
gate-reviewed in the pages they point at. Two were outright inventions: the
Dutch *Scheidbaarheid* and the German *Trennbarkeit*, neither word appearing
anywhere in the page it labelled. No structural check could see it, because
every link resolved and every count matched.

Worse, the labels had never been through a language gate at all. They are UI
strings and were treated as too small to review, which is exactly the
category of text that accumulates errors unobserved.

## What the gates found beyond my own two

The oldest labels, predating this week entirely, carried the most serious
defect. All four languages independently reported that **the Union does not
enact wetten, lois, Gesetze or leyes**: those words denote a national
statute, and an EU act is a verordening, a règlement, a Verordnung, a
reglamento. The page titles had said so correctly all along; only the
navigation said otherwise. An automated label check had flagged exactly this
divergence and it was waved through with an exception reading "the section is
colloquially the law", which was a drafter excusing a real error because it
looked like style. The exception is now narrow: English only, because English
"law" is genuinely generic, and it names the reason.

The ledger metaphor did not survive translation either. *Grootboek*, *Grand
livre*, *Hauptbuch* and *Libro mayor* are strictly bookkeeping terms in their
languages, where the English "ledger" carries a deliberate double meaning for
a project about capital. Three gates called it a false friend. Function beat
metaphor: all four now read Register, Registre, Registro, Register, with the
page titles and body references moved with them so nothing forks.

Also applied: Dutch *Hoe tekenen* for "how to sign", where *tekenen* means to
draw; dangling prepositions in Dutch *Over* and Spanish *Acerca de*; four
labels naming the container rather than the content (*Eén pagina*, *Une
page*, *Eine Seite*, *Una página*); a bare *Questions*/*Preguntas*/
*Vragen*/*Fragen* where every language has a conventional full form; the
Spanish enclitic in *Entenderlo* with no antecedent; and an English comma
splice reproduced in all four footer headings.

## Refused, and recorded rather than dropped

**The severability term.** The gates would replace Dutch *Deelbaarheid* with
*splitsbaarheid*, German *Teilbarkeit* with *Salvatorische Klausel*, Spanish
*Divisibilidad* with *separabilidad*. The German suggestion is wrong: a
salvatorische Klausel is a contract clause, where Teilbarkeit is how the
Court discusses the severability of an act. The Dutch and Spanish suggestions
may well be right, but the words appear throughout a document that was
gate-reviewed whole, and changing the label alone would re-fork the label
from its page, which is the defect being fixed. Recorded as document-level
work for a severability pass, not done here.

**The evidence term.** *Bewijs* and *Preuves* read as forensic proof rather
than an evidence base. The same reasoning applies and more strongly: the word
occurs twenty-five times in the Dutch content alone. Recorded, not churned.

## What now prevents a recurrence

`scripts/check-labels.mjs` requires every nav and footer label to use a word
its own page uses, in title or body, with exceptions listed individually and
each carrying its reason. `scripts/check-reach.mjs` requires all sixteen
pages to be reachable from every sampled page in every language. Both run in
the deploy, ahead of the sync.

The label rule was itself falsified twice while being written. Its first
version compared only the longest word in a label and flagged *Questions
fréquentes* against a page full of questions, because the longest word was
the qualifier. Loosening it to any content word then silently stopped
catching *De wet*, because the two-letter article matched and the wrong noun
was never tested. That was found only by putting all four original defects
back and confirming each is still caught, which is now a script of its own.
A check that has never failed on purpose is not known to work.
