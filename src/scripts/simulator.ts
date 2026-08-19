// The simulator island: the only interactive JavaScript on the site.
// Implements Annex II arithmetic as amended 19 August 2026: real-capital
// retention, three-year smoothing collar floored at 2 % of capital, no
// leverage, everything in constant euros. Designated value crystallises
// as a continuing flow: the first wave over ten years from the median
// event lag, later cohorts growing at the chosen rate.

const ADULTS = 350e6;
const VALUE_MULTIPLE = 10; // firm value as a multiple of covered revenue
const YEARS = 30;

interface Inputs { revBn: number; lag: number; ret: number; growth: number }
interface Series { dist: number[]; stake: number[] }

function run({ revBn, lag, ret, growth }: Inputs): Series {
  const r = ret / 100;
  const g = growth / 100;
  const flowAtFull = (revBn * VALUE_MULTIPLE) / 10; // EUR bn of firm value crystallising per year
  let capital = 0; // EUR bn, real
  const dist: number[] = [];
  const stake: number[] = [];
  const history: number[] = [];
  for (let y = 0; y < YEARS; y++) {
    const growthYears = Math.max(0, y - (lag + 10));
    const flow = y >= lag ? flowAtFull * Math.pow(1 + g, growthYears) : 0;
    // Annex II: distributable capped by realised income (point 2) and by
    // the collar, itself floored at 2 % of capital (point 3 as amended)
    const last3 = history.slice(-3);
    const avg = last3.length ? last3.reduce((a, b) => a + b, 0) / last3.length : 0;
    const d = Math.min(capital * r, Math.max(1.25 * avg, 0.02 * capital));
    capital += capital * r - d + 0.03 * flow;
    history.push(d);
    dist.push((d * 1e9) / ADULTS); // EUR per citizen per year
    stake.push((capital * 1e9) / ADULTS); // DC-31: the stake beside the payout
  }
  return { dist, stake };
}

const $ = (id: string) => document.getElementById(id) as HTMLInputElement;
const I18N = JSON.parse(document.getElementById('sim-i18n')!.textContent || '{}');
const nfInt = new Intl.NumberFormat(I18N.lang || 'en', { maximumFractionDigits: 0 });
const nfDec = new Intl.NumberFormat(I18N.lang || 'en', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmt = (v: number) => (v >= 10 ? nfInt.format(v) : nfDec.format(Math.max(v, 0.1)));

function draw() {
  const inputs: Inputs = { revBn: +$('rev').value, lag: +$('lag').value, ret: +$('ret').value, growth: +$('growth').value };
  $('rev-out').textContent = String(inputs.revBn);
  $('lag-out').textContent = String(inputs.lag);
  $('ret-out').textContent = String(inputs.ret);
  $('growth-out').textContent = String(inputs.growth);

  const centralS = run(inputs);
  const lowS = run({ revBn: inputs.revBn * 0.5, lag: Math.min(15, inputs.lag + 3), ret: Math.max(2, inputs.ret - 1), growth: Math.max(0, inputs.growth - 2) });
  const highS = run({ revBn: inputs.revBn * 1.6, lag: Math.max(3, inputs.lag - 2), ret: Math.min(6, inputs.ret + 1), growth: Math.min(12, inputs.growth + 3) });
  const central = centralS.dist, low = lowS.dist, high = highS.dist;

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
    `<text x="${PL}" y="${PT + 2}" font-size="11" fill="var(--ink-soft)" font-family="var(--ui)">${I18N.axisLabel}</text>`;

  const y20l = low[19], y20h = high[19];
  const payoutLine = (I18N.sentence || '')
    .split('%LOW%').join(fmt(y20l))
    .split('%HIGH%').join(fmt(y20h))
    .split('%YEAR%').join(String(year0 + 19));
  const stakeLine = (I18N.stakeSentence || '')
    .split('%SLOW%').join(nfInt.format(Math.round(lowS.stake[19])))
    .split('%SHIGH%').join(nfInt.format(Math.round(highS.stake[19])))
    .split('%YEAR%').join(String(year0 + 19));
  document.getElementById('sentence')!.textContent = payoutLine + ' ' + stakeLine;
}

for (const id of ['rev', 'lag', 'ret', 'growth']) $(id).addEventListener('input', draw);
document.getElementById('sceptic')!.addEventListener('click', () => {
  $('rev').value = '50'; $('lag').value = '15'; $('ret').value = '2'; $('growth').value = '0'; draw();
});
document.getElementById('reset')!.addEventListener('click', () => {
  $('rev').value = '150'; $('lag').value = '7'; $('ret').value = '4'; $('growth').value = '5'; draw();
});
draw();
