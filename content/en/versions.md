## Is the text on this site the text you would be signing?

The box above answers that, and it is the only place on this site where the
answer is recorded. It is read at build time from a single file in the
repository, so it cannot quietly fall out of step with the truth by being
forgotten in an edit somewhere. This page explains what the answer means,
and what happens to the text on the day it changes.

## What registration changes

A European citizens' initiative is registered on a fixed text. From the day
the Commission registers one, the annex as registered is what a citizen is
asked to sign, and it cannot be amended afterwards. That requirement is a
good one: a million people should be signing the same sentence.

It sits awkwardly with how this draft is written. The text improves because
it is attacked, and the attacking would not stop the day a form is filed. So
two things have to be true at once, and visible at once:

- the **registered text** is fixed, and is what anyone signed;
- the **living draft** carries on, because the Commission's eventual answer
  should meet the best version of the argument rather than whichever version
  happened to be ready on the filing date.

The failure this page is built to prevent is the ordinary one: a site that
keeps editing its text while people sign something else, and a screenshot six
months later showing that the two do not match.

## The rule, written before it is needed

From the day of registration:

1. The filed text is copied, word for word, into a directory that is never
   edited again. A correction is a new version, never a change to the old
   one.
2. Every page rendering the living draft says that it is the living draft,
   and reaches the registered text in one click.
3. Where the two differ, the difference is published as a diff you can read
   for yourself. Nobody here gets to tell you the change was minor.
4. The frozen text is authoritative for what was signed. The living draft is
   authoritative for nothing at all until it is filed in its turn.

These rules are in [GOVERNANCE.md](https://github.com/ownthemachine/own-the-machine/blob/main/GOVERNANCE.md)
in the repository, adopted on 21 August 2026, which is well before there is
anything to freeze. The timing is the point. A rule about what may be done
to a text that people have signed is worth very little if it is written
after you already know what you would like to change.

## How this page knows

The status above is not typed into this page. It is read at build time from
[versions/REGISTERED.json](https://github.com/ownthemachine/own-the-machine/blob/main/versions/REGISTERED.json)
in the repository, which is the single place the answer is recorded. If that
file ever says something different from this page, the file is right and this
page is a bug.
