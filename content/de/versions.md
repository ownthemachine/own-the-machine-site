---
source: site/content/en/versions.md
source-commit: ecd56c3
status: gate-reviewed
---

## Ist der Text auf dieser Seite der Text, den Sie unterschreiben würden?

Der Kasten oben beantwortet das, und er ist die einzige Stelle dieser Seite,
an der die Antwort festgehalten wird. Sie wird bei der Generierung der Seite
aus einer einzigen Datei im Repository gelesen und kann deshalb nicht
unbemerkt von der Wahrheit abweichen, weil sie bei einer Bearbeitung
irgendwo vergessen wurde. Diese Seite erklärt, was die Antwort bedeutet und
was mit dem Text an dem Tag geschieht, an dem sie sich ändert.

## Was die Registrierung ändert

Eine Europäische Bürgerinitiative wird auf der Grundlage eines feststehenden
Textes registriert. Von dem Tag an, an dem die Kommission eine registriert,
ist der Anhang in der registrierten Fassung das, was Bürgerinnen und Bürger
unterschreiben sollen, und er kann danach nicht mehr geändert werden. Diese
Anforderung ist sinnvoll: Eine Million Menschen sollten denselben Satz
unterschreiben.

Sie verträgt sich schlecht damit, wie dieser Entwurf entsteht. Der Text wird
besser, weil er angegriffen wird, und diese Angriffe hören nicht an dem Tag
auf, an dem ein Formular eingereicht wird. Zwei Dinge müssen also
gleichzeitig wahr und gleichzeitig sichtbar sein:

- Der **registrierte Text** steht fest und ist das, was jemand
  unterschrieben hat.
- Der **lebende Entwurf** wird fortgeschrieben, weil die spätere Antwort der
  Kommission auf die beste Fassung der Argumentation treffen sollte und
  nicht auf die, die am Einreichungstag zufällig fertig war.

Der Fehler, den diese Seite verhindern soll, ist der gewöhnliche: eine
Seite, die ihren Text weiter bearbeitet, während Menschen etwas anderes
unterschreiben, und ein Bildschirmfoto ein halbes Jahr später, das zeigt,
dass beide nicht übereinstimmen.

## Die Regel, geschrieben, bevor sie gebraucht wird

Vom Tag der Registrierung an gilt:

1. Der eingereichte Text wird Wort für Wort in ein Verzeichnis kopiert, das
   danach nie wieder bearbeitet wird. Eine Korrektur ist eine neue Fassung,
   niemals eine Änderung der alten.
2. Jede Seite, die den lebenden Entwurf zeigt, weist ausdrücklich darauf
   hin, dass es der lebende Entwurf ist, und führt mit einem Klick zum
   registrierten Text.
3. Wo beide voneinander abweichen, wird die Abweichung als Diff
   veröffentlicht, das Sie selbst lesen können. Niemand hier darf Ihnen
   sagen, die Änderung sei geringfügig gewesen.
4. Der festgeschriebene Text ist maßgeblich dafür, was unterschrieben wurde.
   Der lebende Entwurf ist für nichts maßgeblich, bis er seinerseits
   eingereicht wird.

Diese Regeln stehen in [GOVERNANCE.md](https://github.com/ownthemachine/own-the-machine/blob/main/GOVERNANCE.md) im Repository, angenommen am
21. August 2026 und damit lange bevor es etwas einzufrieren gibt. Auf diesen
Zeitpunkt kommt es an. Eine Regel darüber, was mit einem Text geschehen darf,
den Menschen unterschrieben haben, ist wenig wert, wenn sie geschrieben wird,
nachdem man bereits weiß, was man gern ändern würde.

## Woher diese Seite das weiß

Der Stand oben ist nicht in diese Seite eingetragen. Er wird bei der
Generierung der Seite aus
[versions/REGISTERED.json](https://github.com/ownthemachine/own-the-machine/blob/main/versions/REGISTERED.json) im Repository gelesen, der
einzigen Stelle, an der die Antwort festgehalten wird. Sagt diese Datei
jemals etwas anderes als diese Seite, gilt der Stand der Datei; diese Seite
ist dann fehlerhaft.