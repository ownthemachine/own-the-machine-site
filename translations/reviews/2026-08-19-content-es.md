---
gate: translation
target: content/es/ (objections, severability, evidence, about, contribute)
verdict: REVISE
disposition: merged-with-fixes
date: 2026-08-19
---

# Long-form content, es: fidelity gate + native-ear gate

Machine draft by a translation agent under the fixed terminology canon,
then the fidelity gate against the English source (two bundles), fixes
applied under the standing editorial policy, then the native-ear gate on
the rendered pages, and its fixes. Native verification remains the
pending top tier; status: gate-reviewed.

## Editor disposition (19 August 2026)

Fidelity: 11 applied, 1 rejected (empresa designada is locked terminology), 3 pattern propagations (take-calques to detraer, resultados nulos, cotejado con).
Native-ear round: applied per the locked-precedent policy (warrant stays,
the trimming metaphor stays, campaign voice protected); details in the
fix-agent reports archived with the session.

## Fidelity reviews (verbatim)


### Bundle: objections

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:50:06+00:00 · tokens in=16102 out=2144
> Prompt: [path removed] · Verbatim model output below — do not edit.

### Review Findings

#### 1. Section 13 (`E. Philosophical > 13. This is universal basic income with extra steps`)
* **Severity:** SHOULD-FIX
* **Target text:** `El lema es la respuesta en seis palabras: capital para todos, el dividendo sigue. El orden es el argumento.`
* **Problem:** False friend / idiom calque. In English, *«so the dividend follows»* means that the dividend is a natural consequence of capital ownership (the order of causation). In Spanish, *«el dividendo sigue»* translates as *«the dividend continues / keeps going»*, obscuring the logical sequence emphasized right after (*«The order is the argument»*).
* **Proposed correction:** `El lema es la respuesta en seis palabras: capital para todos, luego el dividendo. El orden es el argumento.` (or: `...de ahí vendrá el dividendo.`)

---

#### 2. Section 1 (`A. Legal > 1. This is expropriation`)
* **Severity:** SHOULD-FIX
* **Target text:** `...a favor de una reserva pública toma propiedad.` / `Fingir que la dilución no es una toma de valor sería deshonesto...`
* **Problem:** Literal calque of the Anglo-American constitutional law term *«taking»* (*«takes property»* / *«a taking of value»*). In Spanish legal and civic register, *«tomar propiedad»* and *«toma de valor»* are unnatural.
* **Proposed correction:** `...a favor de una reserva pública priva de la propiedad.` / `Fingir que la dilución no es una detracción de valor sería deshonesto...` (or `una privación de valor`).

---

#### 3. Sections 1, 4, 6 (`covered undertaking`, `covered firms`, `covered class`)
* **Severity:** POLISH
* **Target text:** `la empresa designada` (sec. 1), `las empresas designadas` (sec. 4), `La clase designada` (sec. 6)
* **Problem:** *«Covered»* is rendered as *«designada»*. While understandable, this creates terminological confusion with the specific DMA gatekeeper designation mechanism (*«gatekeepers absorbed designation»* / *«los guardianes de acceso absorbieron la designación»*), which is an administrative act, whereas here it refers generally to undertakings falling under the scope of the Regulation (*«empresas sujetas»* / *«empresas cubiertas»* / *«colectivo sujeto»*).
* **Proposed correction:** Use `la empresa sujeta` (sec. 1), `las empresas sujetas` (sec. 4), and `La categoría sujeta` or `El colectivo de empresas afectadas` (sec. 6).

---

VERDICT: REVISE


### Bundle: rest

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:50:14+00:00 · tokens in=12848 out=3732
> Prompt: [path removed] · Verbatim model output below — do not edit.

### severability.md

- **Key path:** `severability.md` (Layer 1)
  **Severity:** SHOULD-FIX
  **Target text:** `y porta la condición de falsación.`
  **Problem:** Literal translation of "carries the falsification condition". In Spanish administrative and legislative prose, an act or document does not "portar" a condition; it *incorpora*, *incluye* or *contiene*.
  **Proposed correction:** `e incorpora la condición de falsación.`

- **Key path:** `severability.md` (Preamble)
  **Severity:** POLISH
  **Target text:** `y el control de fidelidad de capas revisa los artículos contra él.`
  **Problem:** Anglicism ("revisar contra" from "review against").
  **Proposed correction:** `y el control de fidelidad de capas coteja los artículos con él.`

---

### evidence.md

- **Key path:** `evidence.md` (Section 1 header & intro)
  **Severity:** SHOULD-FIX
  **Target text:** `## 1. La propiedad es estrecha` / `la propiedad del capital productivo en Europa es demasiado estrecha`
  **Problem:** Literal calque of "ownership is narrow". In Spanish financial/economic register, ownership concentration is not described as "estrecha"; the natural and precise terms are *concentrada*, *reducida* or *de base estrecha*.
  **Proposed correction:** `## 1. La propiedad está muy concentrada` (and in intro: `la titularidad del capital productivo en Europa está demasiado concentrada para que...`)

- **Key path:** `evidence.md` (Section 3, bullet 2)
  **Severity:** SHOULD-FIX
  **Target text:** `Los datos de registro daneses sobre unos 25 000 trabajadores encuentran nulos precisos dos años después de ChatGPT`
  **Problem:** Raw calque of the econometric phrase "finds precise nulls". "Encontrar nulos precisos" is unidiomatic machine output.
  **Proposed correction:** `Los datos de registro daneses sobre unos 25 000 trabajadores constatan un efecto nulo preciso dos años después de ChatGPT`

- **Key path:** `evidence.md` (Section 6, bullet 5)
  **Severity:** SHOULD-FIX
  **Target text:** `las patas no están alineadas en el tiempo.`
  **Problem:** Literal translation of "the legs are not aligned in time" (referring to time-series data components). "Patas" is an unacceptable anglicism here.
  **Proposed correction:** `las series no están alineadas en el tiempo.` (or `los periodos no están alineados en el tiempo.`)

- **Key path:** `evidence.md` (Opening paragraph)
  **Severity:** POLISH
  **Target text:** `Una ley en borrador debe a sus lectores tres cosas:`
  **Problem:** Calque of "A draft law". In Spanish legal and civic register, draft proposals are referred to as *Un proyecto legislativo* or *Una propuesta de ley*.
  **Proposed correction:** `Un proyecto legislativo debe a sus lectores tres cosas:`

---

### contribute.md

- **Key path:** `contribute.md` (Ways in / Redacte)
  **Severity:** SHOULD-FIX
  **Target text:** `el linter y los controles saldrán a su encuentro.`
  **Problem:** Calque of the English idiom "the linter and gates will meet you". In Spanish, "salir al encuentro" means greeting, intercepting, or confronting someone on their path.
  **Proposed correction:** `el linter y los controles se encargarán de verificarlo.` (or `el linter y los controles evaluarán la propuesta.`)

---

VERDICT: REVISE


## Native-ear review (verbatim)

# Review

> Reviewer: OpenRouter `google/gemini-3.7-flash` · 2026-08-19T09:56:56+00:00 · tokens in=11919 out=4123
> Prompt: [path removed] · Verbatim model output below — do not edit.

### Findings

* **«El libro mayor muestra a la ley discutiendo consigo misma, y perdiendo los argumentos que merecía perder.»**
  * *Why it grates:* *Libro mayor* is an accounting term (*general ledger*) applied erroneously to a software/governance changelog; the personification (*a la ley discutiendo consigo misma*) is an awkward literal translation.
  * *Natural phrasing:* «El registro de cambios muestra los debates internos del texto legal y cómo se descartaron las posturas insostenibles.»

* **«Divisibilidad: lo que sobrevive a la poda»**
  * *Why it grates:* Unnatural, colloquial translation for the legal doctrine of severability in legislative drafting.
  * *Natural phrasing:* «Separabilidad: disposiciones subsistentes tras la supresión parcial.»

* **«abogado del diablo» / «Fidelidad de capas» / «Restricciones de diseño»**
  * *Why it grates:* Software-development and informal jargon calqued directly into an EU legislative validation protocol.
  * *Natural phrasing:* «Examen crítico independiente», «Correspondencia entre versiones» (o «Concordancia técnico-jurídica») y «Criterios de formulación».

* **«Un veredicto REVISE solo se fusiona con una decisión escrita del editor.»**
  * *Why it grates:* Crude mix of untranslated UI tokens (*REVISE*), Git jargon (*fusiona*), and calqued publishing terms (*decisión del editor*).
  * *Natural phrasing:* «Un dictamen de revisión solo se incorpora mediante resolución motivada del redactor.»

* **«las decisiones de abajo son las del editor, en acta.»**
  * *Why it grates:* Literal calque of the English idiom *on record*.
  * *Natural phrasing:* «...constan en acta» o «figuran en el registro oficial.»

* **«a medida que los warrants cristalizan»**
  * *Why it grates:* Financial anglicism (*crystallize*). In Spanish corporate finance, options and warrants are exercised, executed, or liquidated, not "crystallized".
  * *Natural phrasing:* «a medida que los *warrants* se ejercitan [o se liquidan]».

* **«la tabla de restricciones de diseño de abajo es un criterio de fusión: el texto que la viole no se fusiona.»**
  * *Why it grates:* Imports Git terminology (*merge*) into statutory drafting, producing an unintelligible hybrid.
  * *Natural phrasing:* «la tabla de condiciones que figura a continuación constituye un requisito de admisión: el texto que la infrinja será rechazado.»

* **«Los mejores microdatos no encuentran cargos contra la IA»**
  * *Why it grates:* Literal translation of the English idiom *find no indictment / no case against*.
  * *Natural phrasing:* «Los microdatos más sólidos no muestran efectos perjudiciales atribuibles a la IA.»

* **«Esto es una renta básica universal con pasos de más»**
  * *Why it grates:* Word-for-word translation of the English meme/colloquialism *with extra steps*.
  * *Natural phrasing:* «Esto no es más que una renta básica universal con rodeos innecesarios [o mediante una estructura más compleja].»

* **«la batalla por la caracterización decide la registrabilidad»**
  * *Why it grates:* *Caracterización* is a false friend for *legal qualification/classification* (*calificación jurídica*); *registrabilidad* is a clunky neologism for formal admissibility.
  * *Natural phrasing:* «la calificación jurídica determina la admisibilidad del registro.»

* **«La tabla 29 lo dice contra nosotros»**
  * *Why it grates:* Direct translation of *says against us*.
  * *Natural phrasing:* «Los datos del cuadro 29 contradicen nuestra postura.»

* **«reglas de plantilla de primacía del fondo sobre la forma»**
  * *Why it grates:* Calqued noun-stack (*substance-over-form headcount rules*).
  * *Natural phrasing:* «criterios de cómputo de plantilla basados en el principio de primacía del fondo sobre la forma.»

* **«la brecha juvenil de la zona del euro está plana»**
  * *Why it grates:* Literal translation of the English market slang *is flat*.
  * *Natural phrasing:* «la brecha juvenil de la zona del euro permanece estancada [o invariable].»

* **«la cifra de difusión corta en ambos sentidos»**
  * *Why it grates:* Calque of *cuts both ways*.
  * *Natural phrasing:* «el grado de difusión es un arma de doble filo [o admite una doble lectura].»

* **«atrincheramiento desde el primer día»**
  * *Why it grates:* In Spanish public and constitutional law, *entrenchment* is rendered as *blindaje institucional*, *rigidez procedimental*, or *cláusula de salvaguardia*, never *atrincheramiento* (which denotes military digging-in or corporate management entrenchment in a hostile takeover).
  * *Natural phrasing:* «Blindaje estatutario desde el inicio.»

* **«El orden es el argumento»**
  * *Why it grates:* Calque of *The ordering is the argument*.
  * *Natural phrasing:* «En la prelación de los pasos reside el argumento.»

* **«con issues a la espera» / «Abra una issue»**
  * *Why it grates:* Unadapted developer loanword used inconsistently alongside the translated term *incidencia* on the same page.
  * *Natural phrasing:* «con incidencias pendientes» / «Abra una incidencia.»

---

VERDICT: REVISE
