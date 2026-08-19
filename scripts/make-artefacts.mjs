#!/usr/bin/env node
// Generates the downloadable artefacts (PDF and EPUB) of the complete
// draft from src/generated/law.json, into public/downloads/. Run after
// sync-law, before astro build. Both artefacts are stamped with the law
// repo commit so a printed copy is citable to the character.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer';
import JSZip from 'jszip';

const law = JSON.parse(readFileSync(join(process.cwd(), 'src', 'generated', 'law.json'), 'utf8'));
const OUT = join(process.cwd(), 'public', 'downloads');
mkdirSync(OUT, { recursive: true });

const stamp = `Draft at commit ${law.lawCommit}, generated ${law.builtAt.slice(0, 10)}. ` +
  `The living text and its review ledger: github.com/ownthemachine/own-the-machine. Licence CC BY-SA 4.0.`;
const longTitle = 'Regulation of the European Parliament and of the Council on harmonised ' +
  'rules for citizen participation in automated productivity gains (Citizens’ Capital Regulation)';

const sections = [
  { id: 'recitals', title: 'Recitals', html: `<p class="whereas">Whereas:</p>${law.recitals}` },
  ...law.articles.map((a) => ({ id: a.slug, title: `Article ${a.number}: ${a.title}`, html: a.html })),
  ...law.annexes.map((a) => ({ id: a.slug, title: a.title, html: a.html })),
  { id: 'objections', title: 'Memorandum: the objections, at full strength', html: law.objections.html },
  { id: 'severability', title: 'Memorandum: severability', html: law.severability.html },
];

// ---------------------------------------------------------------- PDF
const css = `
  @page { size: A4; margin: 22mm 20mm; }
  body { font-family: Georgia, 'Literata', serif; color: #14352A; font-size: 10.5pt; line-height: 1.55; }
  .cover { text-align: center; page-break-after: always; padding-top: 30mm; }
  .cover .rules { border-top: 2px solid #14352A; border-bottom: 1px solid #14352A; height: 3px; margin-bottom: 14mm; }
  .cover h1 { font-size: 26pt; letter-spacing: 0.12em; margin: 0 0 6mm; }
  .cover .sub { font-style: italic; font-size: 12pt; color: #3E5A4E; max-width: 120mm; margin: 0 auto 10mm; }
  .cover .stamp { font-size: 8.5pt; color: #3E5A4E; margin-top: 40mm; }
  h2.sec { font-size: 14pt; page-break-before: always; margin: 0 0 5mm; }
  h2.first { page-break-before: avoid; }
  p { margin: 0 0 3.2mm; text-align: justify; }
  .law p { padding-left: 7mm; text-indent: -7mm; }
  .para-num { font-weight: bold; }
  table { border-collapse: collapse; font-size: 8pt; margin: 4mm 0; }
  th, td { border: 0.3pt solid #3E5A4E; padding: 1.5mm 2mm; text-align: left; vertical-align: top; }
  blockquote { border-left: 1pt solid #C9D6CC; padding-left: 4mm; color: #3E5A4E; margin: 0 0 3.2mm; }
  a { color: inherit; text-decoration: none; }
`;
const isLaw = (s) => s.id === 'recitals' || s.id.startsWith('article-') || s.id.startsWith('annex-');
const pdfHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
  <div class="cover">
    <div class="rules"></div>
    <h1>OWN&nbsp;THE&nbsp;MACHINE</h1>
    <p class="sub">${longTitle}</p>
    <p class="sub">A citizens’ draft, written in the open, objections first.</p>
    <p class="stamp">${stamp}</p>
  </div>
  ${sections.map((s, i) => `<section class="${isLaw(s) ? 'law' : 'memo'}">
    <h2 class="sec ${i === 0 ? 'first' : ''}">${s.title}</h2>${s.html}</section>`).join('\n')}
</body></html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(pdfHtml, { waitUntil: 'load' });
await page.pdf({
  path: join(OUT, 'own-the-machine-draft.pdf'),
  format: 'A4',
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: `<div style="width:100%;font-size:7pt;color:#3E5A4E;font-family:Georgia,serif;
    display:flex;justify-content:space-between;padding:0 20mm;">
    <span>own the machine · draft ${law.lawCommit}</span>
    <span class="pageNumber"></span></div>`,
  margin: { top: '22mm', bottom: '22mm', left: '20mm', right: '20mm' },
});
await browser.close();

// --------------------------------------------------------------- EPUB
const xhtml = (title, body) => `<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>${title}</title><link rel="stylesheet" href="style.css"/></head>
<body>${body.replace(/<br>/g, '<br/>').replace(/<hr>/g, '<hr/>')}</body></html>`;

const zip = new JSZip();
zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
zip.file('META-INF/container.xml', `<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`);

const chapters = [
  { id: 'cover', title: 'Own the Machine', body: `<section style="text-align:center"><h1>OWN THE MACHINE</h1><p><i>${longTitle}</i></p><p><i>A citizens’ draft, written in the open, objections first.</i></p><p><small>${stamp}</small></p></section>` },
  ...sections.map((s) => ({ id: s.id, title: s.title, body: `<h2>${s.title}</h2>${s.html}` })),
];
for (const c of chapters) zip.file(`OEBPS/${c.id}.xhtml`, xhtml(c.title, c.body));
zip.file('OEBPS/style.css', `body{font-family:serif;line-height:1.5}.para-num{font-weight:bold}
table{border-collapse:collapse;font-size:0.8em}th,td{border:1px solid #888;padding:0.3em}`);
zip.file('OEBPS/nav.xhtml', xhtml('Contents',
  `<nav epub:type="toc"><h2>Contents</h2><ol>${chapters.map((c) => `<li><a href="${c.id}.xhtml">${c.title}</a></li>`).join('')}</ol></nav>`));
zip.file('OEBPS/package.opf', `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid" xml:lang="en">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uid">urn:otm:draft:${law.lawCommit}</dc:identifier>
    <dc:title>Own the Machine: the draft Citizens’ Capital Regulation</dc:title>
    <dc:language>en</dc:language>
    <dc:creator>The Own the Machine drafting project</dc:creator>
    <dc:rights>CC BY-SA 4.0</dc:rights>
    <meta property="dcterms:modified">${law.builtAt.replace(/\.\d+Z$/, 'Z')}</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
    ${chapters.map((c) => `<item id="c-${c.id}" href="${c.id}.xhtml" media-type="application/xhtml+xml"/>`).join('\n    ')}
  </manifest>
  <spine>${chapters.map((c) => `<itemref idref="c-${c.id}"/>`).join('')}</spine>
</package>`);
writeFileSync(join(OUT, 'own-the-machine-draft.epub'), await zip.generateAsync({ type: 'nodebuffer' }));

console.log(`artefacts: PDF + EPUB @ ${law.lawCommit}`);
