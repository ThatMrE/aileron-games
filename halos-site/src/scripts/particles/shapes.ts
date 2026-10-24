// Target positions for the hero particles, one Float32Array (xyz per
// particle) per shape. Units: the halo ring has radius 1.

export const COUNT = 9000;

// Small seeded PRNG so every visit forms the same object.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const gauss = (r: () => number) => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());

/** Loose cloud the particles drift in from. */
export function cloud(n = COUNT) {
  const r = rng(1);
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = r() * 2 - 1;
    const a = r() * Math.PI * 2;
    const rad = 2.2 + r() * 1.8;
    const s = Math.sqrt(1 - u * u);
    out.set([rad * s * Math.cos(a) * 1.3, rad * u, rad * s * Math.sin(a)], i * 3);
  }
  return out;
}

/** The HALOS symbol: a thick ring above a bar, in brand proportions. */
export function ringBar(n = COUNT) {
  const r = rng(2);
  const out = new Float32Array(n * 3);
  // From the symbol SVG: ring r 81.5, stroke 23, bar 186 x 24, bar top at 204.
  const k = 1 / 81.5;
  const ringY = 0.26;                       // ring centre, so the whole lockup sits on 0
  const barY = ringY - (216 - 93) * k;      // bar centre
  const half = 11.5 * k;
  const barW = 186 * k;
  const barH = 24 * k;
  const ringShare = 0.82;
  for (let i = 0; i < n; i++) {
    let x: number, y: number;
    if (r() < ringShare) {
      const a = r() * Math.PI * 2;
      // Triangular spread: densest along the middle of the stroke, so the ring reads solid.
      const rad = 1 + (r() + r() - 1) * half;
      x = Math.cos(a) * rad;
      y = ringY + Math.sin(a) * rad;
    } else {
      x = (r() - 0.5) * barW;
      y = barY + (r() - 0.5) * barH;
    }
    out.set([x, y, (r() - 0.5) * 0.06], i * 3);
  }
  return out;
}

/** A vial: cap, neck, shoulder and body as cylinder surfaces, plus liquid inside. */
export function vial(n = COUNT) {
  const r = rng(3);
  const out = new Float32Array(n * 3);
  // [radius, yBottom, yTop, share]
  const parts: [number, number, number, number][] = [
    [0.42, 0.98, 1.34, 0.12],  // cap
    [0.3, 0.8, 0.98, 0.06],    // neck
    [0.62, -1.3, 0.62, 0.46],  // body wall
  ];
  for (let i = 0; i < n; i++) {
    const t = r();
    let x: number, y: number, z: number;
    let acc = 0;
    let done = false;
    for (const [rad, y0, y1, share] of parts) {
      acc += share;
      if (t < acc) {
        const a = r() * Math.PI * 2;
        x = Math.cos(a) * rad;
        z = Math.sin(a) * rad * 0.7;
        y = y0 + r() * (y1 - y0);
        out.set([x, y, z], i * 3);
        done = true;
        break;
      }
    }
    if (done) continue;
    acc += 0.08;
    if (t < acc) {
      // Shoulder: radius eases from body to neck.
      const s = r();
      const rad = 0.62 + (0.3 - 0.62) * s * s;
      const a = r() * Math.PI * 2;
      out.set([Math.cos(a) * rad, 0.62 + s * 0.18, Math.sin(a) * rad * 0.7], i * 3);
      continue;
    }
    // Liquid: fills the lower body, with a meniscus line near the top.
    const a = r() * Math.PI * 2;
    const rad = Math.sqrt(r()) * 0.56;
    const surface = r() < 0.18;
    y = surface ? 0.18 + (r() - 0.5) * 0.03 : -1.25 + r() * 1.43;
    out.set([Math.cos(a) * rad, y, Math.sin(a) * rad * 0.7], i * 3);
  }
  return out;
}

/** The hallmarks wheel: twelve small clusters around a centre. */
export function wheel(n = COUNT) {
  const r = rng(4);
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = r();
    let x: number, y: number;
    if (t < 0.68) {
      const k = Math.floor(r() * 12);
      const a = (k / 12) * Math.PI * 2 + Math.PI / 2;
      x = Math.cos(a) * 1.45 + gauss(r) * 0.09;
      y = Math.sin(a) * 1.45 + gauss(r) * 0.09;
    } else if (t < 0.88) {
      const a = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * 0.42;
      x = Math.cos(a) * rad;
      y = Math.sin(a) * rad;
    } else {
      // A faint orbit joining the clusters.
      const a = r() * Math.PI * 2;
      x = Math.cos(a) * 1.45;
      y = Math.sin(a) * 1.45;
    }
    out.set([x, y, (r() - 0.5) * 0.2], i * 3);
  }
  return out;
}

/** Released: a wide, gentle drift. */
export function drift(n = COUNT) {
  const r = rng(5);
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    out.set([(r() - 0.5) * 7, (r() - 0.5) * 5 + 1.2, (r() - 0.5) * 3], i * 3);
  }
  return out;
}

/** Colors sampled from the halo gradient and plasma rose, plus a little white. */
export function colors(n = COUNT) {
  const r = rng(6);
  const palette: [string, number][] = [
    ['#96B8FF', 0.3], ['#BEA5FC', 0.26], ['#E793FE', 0.24], ['#EDCDC2', 0.12], ['#FFFFFF', 0.08],
  ];
  const rgb = palette.map(([hex, w]) => [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255, w]);
  const col = new Float32Array(n * 3);
  const size = new Float32Array(n);
  const seed = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let t = r();
    let c = rgb[0];
    for (const p of rgb) { if ((t -= p[3]) <= 0) { c = p; break; } }
    col.set([c[0], c[1], c[2]], i * 3);
    size[i] = 1.4 + r() * 1.6;   // 1.4 to 3 CSS px
    seed[i] = r();
  }
  return { col, size, seed };
}
