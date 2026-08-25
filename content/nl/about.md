---
source: site/content/en/about.md
source-commit: ecd56c3
status: gate-reviewed
---

## Wat dit is

Een opensourceontwerp van een EU-verordening die verzekert dat burgers
van de Unie delen in de kapitaalwaarde die hypergeautomatiseerde
productie schept, voorbereid als basis voor een mogelijk Europees
burgerinitiatief. De wettekst, de toelichting, de bezwaren en elk
reviewoordeel staan in een openbare repository; deze site geeft ze weer.

## Geen document van de EU

Dit is een voorstel van burgers. Het wordt niet uitgegeven, onderschreven of getoetst door de Europese Unie, de Europese Commissie, het Europees Parlement of enige andere instelling, enig ander orgaan of enig bureau of agentschap van de Unie, is daaraan niet verbonden en heeft geen rechtskracht. Het is opgesteld volgens de conventies van de Uniewetgeving omdat een voorstel dat door die instellingen moet worden beoordeeld, hoort aan te komen in de vorm die zij lezen; die vorm is een handreiking aan de lezer, nooit een aanspraak op gezag. De site voert geen embleem van de EU, en het zegel dat zij wel voert, is uitsluitend van dit project.

## Wie

Geïnitieerd door David Vanheeswijck (België). De redactiemethode gebruikt
AI-review op tegenspraak onder verantwoordelijkheid van de redacteur; elk
oordeel en elke afdoening staat in het [register](/law/ledger). Een
organisatorengroep van ten minste zeven burgers uit zeven lidstaten wordt
gevormd als het project zijn eigen toetsmomenten doorstaat.

## Wie dit uitgeeft

Verantwoordelijk voor deze site en voor het ontwerp dat zij weergeeft: David Vanheeswijck, België. Schrijf naar [hello@ownthemachine.eu](mailto:hello@ownthemachine.eu); dat adres bereikt de redacteur, en alles van inhoudelijk belang over de tekst hoort in de openbaarheid thuis, als [issue of pull request](https://github.com/ownthemachine/own-the-machine) op de repository, waar het antwoord te lezen is voor iedereen die het ontwerp aangaat.

Dezelfde persoon is de verwerkingsverantwoordelijke voor de weinige gegevens die deze site meebrengt, hieronder beschreven.

## Belangenverklaring


De tekst is voortgekomen uit een boek van de initiatiefnemer. De
campagne ontvangt niets uit de verkoop van dat boek en verwijst er niet
naar, en elk argument hier is te controleren zonder iets te kopen. Dat
is niet het hele verhaal. Aandacht voor deze campagne is aandacht die
het boek kan bereiken, en de auteur is dezelfde persoon, dus het belang
bestaat of er nu een verwijzing is of niet. Het wordt hier vermeld om
gewogen te worden, niet omdat het is wegontworpen.

## De toetsmomenten

De campagne vordert alleen via gepubliceerde toetsmomenten met stopcriteria:
peilingen naar de ontvankelijkheid voor registratie vóór de oprichting,
oprichting vóór de indiening, indiening vóór de inzameling van
handtekeningen. Als een toetsmoment faalt, zal deze pagina dat zeggen en
blijft de repository staan als publiek goed.

## Financiering

Geen organisatie, geen bankrekening, geen giften en geen geld van derden in
welke vorm dan ook. Niemand is betaald, en niemand heeft hieraan tegen
betaling gewerkt.

"Geen" zeggen zou het makkelijkste antwoord zijn, maar het is niet waar. Het
kost geld om deze site draaiende te houden, en de initiatiefnemer betaalt
dat persoonlijk: het domein, objectopslag en contentlevering bij Scaleway in
Frankrijk, en de API-aanroepen die de toetsen verbruiken. Geen partij,
stichting, vakbond, onderneming, overheidsinstantie of andere particulier
heeft geld, diensten, werktijd of software aan deze campagne bijgedragen.

Verordening (EU) 2019/788 verplicht een geregistreerd initiatief elke bron
te noemen die in een jaar meer dan 500 EUR geeft, en die verklaring actueel
te houden zolang er handtekeningen worden verzameld. Die verplichting begint
bij registratie. Deze verantwoording begint nu al, in campaign/FUNDING.md,
waarin ook de vooraf vastgestelde regels staan over wat nooit zal worden
aanvaard.

## Uw gegevens

Deze site plaatst geen cookies, draait geen analysescripts en laadt niets van derden. Er is geen toestemmingsbanner omdat er niets is om mee in te stemmen.

Wat er niettemin wordt verwerkt, onomwonden gezegd in plaats van weggeredeneerd: elke server die een verzoek beantwoordt, ziet het adres waarvandaan het kwam, dus houdt de host kortstondige technische logs bij, met inbegrip van IP-adressen, om de pagina's uit te leveren en misbruik af te weren. Meer is het niet; die logs worden voor niets anders gelezen, met niets gecombineerd, niet verkocht en niet gedeeld. Schakelt u op deze site tussen papier en plaat, dan wordt die keuze in de opslag van uw eigen browser geschreven en verlaat zij die nooit.

Iedereen in de Unie mag vragen wat er over hem of haar wordt bewaard en kan een klacht indienen bij een toezichthoudende autoriteit; in België is dat de Gegevensbeschermingsautoriteit. Wanneer de ondertekening opengaat, gebeurt dat op het eigen verzamelsysteem van de Europese Commissie krachtens Verordening (EU) 2019/788, niet hier.

## Waar deze site staat

De pagina's die u leest, staan in Scaleway Object Storage in de regio Parijs en worden vanaf het eigen netwerk van Scaleway uitgeleverd. Scaleway is een Frans bedrijf; de bestanden, de cache en het certificaat zijn Europees.

Twee onderdelen zijn dat niet, en een campagne over Europees eigendom hoort te zeggen welke: de DNS van het domein wordt beantwoord door Cloudflare, een Amerikaans bedrijf, al loopt er geen pagina-inhoud doorheen, en de broncode-repository staat bij GitHub, eveneens Amerikaans. De enige uitzondering in de uitleveringsketen is www.ownthemachine.eu, dat naar deze site doorverwijst en zelf geen inhoud bevat.

Niets hier hangt ervan af dat dit zo blijft. De site is een statische build van een openbare repository: hij kan overal, door iedereen, binnen enkele minuten opnieuw worden gebouwd en uitgeleverd.

## Waar de toetsing draait

Elk oordeel in het register is door een model geproduceerd, en de
rekenkracht die het produceerde heeft zelf ook een rechtsgebied. Tot 23
augustus 2026 liepen de toetsen via OpenRouter, een Amerikaanse router. Zij
lopen nu via het Europese eindpunt van Requesty, op modellen die in de Unie
worden gehost zonder enige gegevensbewaring, waarbij de ontwerpen na de
aanroep niet worden bewaard en niet voor training worden gebruikt.

De uitvoerder neemt dat niet op gezag aan. Voordat hij een token
uitgeeft, leest hij de eigen vastlegging van de router over waar het
model draait en wat er met de tekst gebeurt, en hij weigert te starten
tenzij die vastlegging de Europese Unie, nul bewaring en geen gebruik
voor training vermeldt. Wat hij las, wordt in het toetsingsverslag
geschreven, zodat elk oordeel het bewijs draagt in plaats van de
verzekering.

Eén onderscheid verdient het scherp te blijven, omdat het het
onderscheid is waarover dit voorstel gaat. In Europa gehost is niet in
Europa gebouwd. De modellen zijn Amerikaans en draaien op Europese
infrastructuur onder Europese regels, en van wat dit eindpunt aanbiedt
is alleen Mistral een Europees laboratorium. Een campagne over wie de
machine bezit, hoort ronduit te zeggen dat zij nog niet draait op een
machine die Europa bezit.

## Toegankelijkheid

Doel: WCAG 2.1 AA, met vroegtijdige overname van de WCAG 2.2-criteria
voor focusweergave en doelgrootte. De site is volledig met het
toetsenbord te bedienen en respecteert voorkeuren voor verminderde
beweging. Een drempel gevonden?
[Open een issue](https://github.com/ownthemachine/own-the-machine-site/issues).
