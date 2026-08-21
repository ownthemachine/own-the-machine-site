---
gate: translation-fidelity, native-ear
target: content/{nl,fr,de,es}/versions.md and the funding section of about.md
date: 2026-08-21
rounds: 2
verdict: round 1 REVISE on 15 of 16; round 2 REVISE on 13 of 16, three fidelity gates cleared
disposition: merged-with-fixes, four findings refused, one regression found by the gate
---

# Editor disposition (21 August 2026)

Two new pieces of copy went through both translation gates in four
languages: the versions page, which is new, and the rewritten funding
section of the about page. Sixteen reviews per round, two rounds, 79 fixes
applied.

## The finding that mattered most was mine

The gate caught a defect I introduced with my own tooling. The first round
of fixes was applied by a script that re-wraps the block it edits, because
these files are hard-wrapped at 76 columns and an exact-string patch fails
on the wrap point rather than on the text. The re-wrapper had no idea what a
markdown link is, and wrapped inside four URLs:

    [GOVERNANCE.md](https://github.com/ownthemachine/own-
    the-machine/blob/main/GOVERNANCE.md)

Every one of those anchors was dead, in all four translations, and nothing
would have said so. The page builds, the prose reads correctly, and the link
text is unchanged; only the target is broken. Two reviewers marked it
BLOCKING and two SHOULD-FIX, which is the correct severity and better than
this repository's own checks managed, because the checks did not look.

They look now. check-translations.mjs fails the deploy if any markdown link
target contains whitespace, since no URL legitimately does. Proved in both
directions: with a URL broken the way the wrapper broke it, the check exits
1 and names the file; with it intact, it exits 0.

This is the third time in two days that a defect has been invisible to
everything except a human-shaped read: the missing severability paragraph,
the unreachable contents list, and now a dead link. The pattern is that the
artefact stays syntactically valid while ceasing to do its job.

## Refused, with reasons

**"Should" strengthened to "must", twice.** Spanish wanted *deberían
firmar* replaced by *deben firmar*, French wanted *devraient signer*
replaced by *doivent signer*. The English is "should be signing", which is
deliberate. The gate's own first rule is that a translation promising more
than the source is a defect, so this is refused under the rule the gate is
applying.

**"Attacked" softened, twice.** German proposed *kritisch hinterfragt* for
*angegriffen* and Spanish proposed *se cuestiona* for *se lo ataca*, both on
register grounds. This file attacks its own text on purpose and says so
everywhere: hostile counsel, objections at full strength. Softening the verb
in two languages and not the other three would misdescribe the method. The
genuine errors inside the same sentences, a tense jump in the German and a
leísmo in the Spanish, were fixed.

**Renaming "living draft" in German and Spanish.** Both native-ear passes
called *lebender Entwurf* and *borrador vivo* calques and proposed
*Arbeitsfassung* and *borrador en curso*. The term is used in five languages
across the site and in the interface strings that render the notice on 120
pages. Consistency is the gate's third rule and it outranks a naturalness
preference in one language.

## Where the gate argued with itself, and who won

Round one told the French to replace *deux choses doivent être vraies* with
*deux conditions doivent être remplies*. Round two objected that conditions
being fulfilled is not the same claim as two things being true, which is
right: the source describes two states of affairs, not two requirements. The
round-two reading won, in a third phrasing that keeps the meaning and the
naturalness both.

The same happened in Dutch. Round one called *de verklaring begint nu*
personification; the fix introduced *wij*, and round two objected that a
first-person plural is not in the source and breaks the parallel with the
preceding sentence. Both were right, and the resolution keeps the
parallelism without the pronoun.

## What the gate found that the checks could not

Consistency defects, three of them, all real:

- Dutch had *reviewpoorten* where this very file already says
  *toetsingspoorten*.
- French had *portes de relecture* against the established *portes de
  contrôle*.
- Spanish had *el iniciador* where the declared-interest section two
  headings above says *el promotor*.

In each case the reviewer proposed a fourth invention of its own, and in
each case the right answer was the term already in the file. A translation
memory would have caught these; a structural check never could, because the
counts all match.

Dutch also produced two gender errors of the class that has caught this
project before: *regel* and *status* are both masculine and both were
referred to with *zij*.

## Residue

Both native-ear gates still return REVISE at round two on the versions page
in all four languages, on naturalness preferences rather than defects. That
is the normal terminal state for this gate on newly written copy and the
reason the governance rule permits a REVISE to merge with a written
disposition. The three fidelity gates that cleared to PUBLISH are the
stronger signal, and no finding at round two alleged a change of meaning
except the two above, both of which were applied.
