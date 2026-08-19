// The simulator island: the only interactive JavaScript on the site.
// Implements Annex II arithmetic (real-capital retention, three-year
// smoothing average, 125 % collar, no leverage) in constant euros.

const ADULTS = 350e6;
const VALUE_MULTIPLE = 10; // firm value as a multiple of covered revenue
const YEARS = 30;

interface Inputs { revBn: number; lag: number; ret: number }

function run({ revBn, lag, ret }: Inputs): number[] {
  const r = ret / 100;
  const totalValueBn = revBn * VALUE_MULTIPLE;
  let capital = 0; // EUR bn, real
  const dist: number[] = [];
  const history: number[] = [];
  for (let y = 0; y < YEARS; y++) {
    // adoption: warrants crystallise linearly over ten years from the lag
    const ramp = Math.min(1, Math.max(0, (y - lag) / 10));
    const prevRamp = Math.min(1, Math.max(0, (y - 1 - lag) / 10));
    capital += 0.03 * totalValueBn * (ramp - prevRamp);
    // real return realised on capital; retention has already preserved
    // real value because everything here is in constant euros
    let distributable = Math.max(0, capital * r);
    // Annex II point 3: collar at 125 % of the three-year average
    const last3 = history.slice(-3);
    const avg = last3.length ? last3.reduce((a, b) => a + b, 0) / last3.length : 0;
    if (avg > 0) distributable = Math.min(distributable, 1.25 * avg);
    capital += Math.max(0, capital * r - distributable); // undistributed income compounds
    history.push(distributable);
    dist.push((distributable * 1e9) / ADULTS); // EUR per citizen per year
  }
  return dist;
}

const $ = (id: string) => document.getElementById(id) as HTMLInputElement;
const fmt = (v: number) => v >= 100 ? Math.round(v).toString() : v.toFixed(0);

function draw() {
  const inputs: Inputs = { revBn: +$('rev').value, lag: +$('lag').value, ret: +$('ret').value };
  $('rev-out').textContent = String(inputs.revBn);
  $('lag-out').textContent = String(inputs.lag);
  $('ret-out').textContent = String(inputs.ret);

  const central = run(inputs);
  const low = run({ revBn: inputs.revBn * 0.5, lag: Math.min(15, inputs.lag + 3), ret: Math.max(2, inputs.ret - 1) });
  const high = run({ revBn: inputs.revBn * 1.6, lag: Math.max(3, inputs.lag - 2), ret: Math.min(6, inputs.ret + 1) });

  const W = 720, H = 300, PL = 52, PB = 30, PT = 12;
  const maxY = Math.max(...high, 10) * 1.08;
  const X = (y: number) => PL + (y / (YEARS - 1)) * (W - PL - 10);
  const Y = (v: number) => H - PB - (v / maxY) * (H - PB - PT);
  const line = (s: number[]) => s.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join('');
  const band = line(high) + low.map((v, i, a) => `L${X(a.length - 1 - i).toFixed(1)} ${Y(a[a.length - 1 - i]).toFixed(1)}`).join('') + 'Z';

  const year0 = 2027;
  const ticksY = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxY * f));
  const svg = document.getElementById('curve')!;
  svg.innerHTML =
    ticksY.map((t) => `<line x1="${PL}" y1="${Y(t)}" x2="${W - 10}" y2="${Y(t)}" stroke="var(--guilloche)" stroke-width="0.6"/>` +
      `<text x="${PL - 8}" y="${Y(t) + 4}" text-anchor="end" font-size="11" fill="var(--ink-soft)" font-family="var(--ui)">${t}</text>`).join('') +
    [0, 10, 20, 29].map((y) => `<text x="${X(y)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="var(--ink-soft)" font-family="var(--ui)">${year0 + y}</text>`).join('') +
    `<path d="${band}" fill="var(--seal-gold)" opacity="0.13"/>` +
    `<path d="${line(central)}" fill="none" stroke="var(--seal-gold)" stroke-width="2"/>` +
    `<text x="${PL}" y="${PT + 2}" font-size="11" fill="var(--ink-soft)" font-family="var(--ui)">EUR per citizen per year, constant 2026 euros</text>`;

  const y20l = low[19], y20h = high[19];
  document.getElementById('sentence')!.textContent =
    `Under these assumptions, a citizen receives roughly EUR ${fmt(y20l)} to ${fmt(y20h)} per year by ${year0 + 19}, ` +
    `rising as the Reserve compounds. The early years hug zero on purpose: the Reserve preserves capital before it distributes, by law.`;
}

for (const id of ['rev', 'lag', 'ret']) $(id).addEventListener('input', draw);
document.getElementById('sceptic')!.addEventListener('click', () => {
  $('rev').value = '50'; $('lag').value = '15'; $('ret').value = '2'; draw();
});
document.getElementById('reset')!.addEventListener('click', () => {
  $('rev').value = '150'; $('lag').value = '7'; $('ret').value = '4'; draw();
});
draw();
