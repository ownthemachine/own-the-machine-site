// The Seal: parametric guilloche (hypotrochoid) rosettes, the identity's
// only permitted ornament. Used at build time to inline SVG, so no
// client JavaScript is spent on decoration.

function gcd(a, b) { a = Math.round(a); b = Math.round(b); while (b) [a, b] = [b, a % b]; return a || 1; }

function ringPath(R, r, d, rot, steps) {
  const loops = r / gcd(R, r);
  let path = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * loops;
    const x = (R - r) * Math.cos(t + rot) + d * Math.cos(((R - r) / r) * t + rot);
    const y = (R - r) * Math.sin(t + rot) - d * Math.sin(((R - r) / r) * t + rot);
    path += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return path;
}

/** Full seal for the certificate cover. `animate` draws it once on load. */
export function heroSeal({ size = 220, animate = true } = {}) {
  const rings = [
    [96, 31, 42, 0], [96, 31, 42, 0.35], [74, 23, 30, 0], [52, 17, 20, 0.2], [100, 49, 8, 0],
  ];
  const paths = rings.map(([R, r, d, rot], i) => {
    const cls = animate ? ` class="seal-draw" style="animation-delay:${i * 0.18}s"` : '';
    return `<path d="${ringPath(R, r, d, rot, 2400)}" fill="none" stroke="var(--ink-soft)" stroke-width="0.55"${cls}/>`;
  }).join('');
  return `<svg width="${size}" height="${size}" viewBox="-110 -110 220 220" role="img" aria-label="Guilloche seal of the citizens' certificate">${paths}</svg>`;
}

/** Micro-seal whose geometry derives from a git commit hash: every
    amendment of the law wears its own machine-engraved seal. */
export function commitSeal(hash, size = 46) {
  let seed = 0;
  for (const c of String(hash)) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const r = 5 + (seed % 9);
  const d = 8 + ((seed >> 3) % 11);
  const r2 = Math.max(3, r - 2 - (seed % 3));
  const paths =
    `<path d="${ringPath(21, r, d, 0, 900)}" fill="none" stroke="var(--ink-soft)" stroke-width="0.5"/>` +
    `<path d="${ringPath(15, r2, d * 0.6, 0.4, 700)}" fill="none" stroke="var(--ink-soft)" stroke-width="0.5"/>`;
  return `<svg width="${size}" height="${size}" viewBox="-24 -24 48 48" aria-hidden="true">${paths}</svg>`;
}
