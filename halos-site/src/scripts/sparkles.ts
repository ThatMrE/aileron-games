// Hero sparkles: a field of small twinkling particles that gather into a
// cloud around the cursor, or a finger on touch screens, and scatter again
// when it leaves (after the hover "attract" field on halos.bio). A click or
// tap adds a few.
// Plain 2D canvas, no library.

// Halo Indigo carries the cloud on white; the halo gradient colors add light.
const PALETTE: [string, number][] = [
  ['#4B57B8', 0.34],
  ['#96B8FF', 0.22],
  ['#BEA5FC', 0.24],
  ['#E793FE', 0.2],
];
const DENSITY = 100;          // particles per 400 x 400 px (desktop)
const DENSITY_SMALL = 75;     // lighter on phones, where the hero is tall and CPUs slower
const RADIUS = 250;           // attract distance, px (desktop)
const CORE = 42;              // cloud radius the particles settle into, px (desktop)
const RADIUS_SMALL = 340;     // phones: reach further and hold a bigger cloud,
const CORE_SMALL = 80;        // so it reads under a fingertip
const PULL = 0.32;            // attract strength
const SWIRL = 0.05;           // sideways drift inside the cloud
const DAMPING = 0.9;          // velocity kept per frame while attracted
const ALPHA_BUCKETS = 8;      // batch fills by color and opacity

interface P { x: number; y: number; vx: number; vy: number; bx: number; by: number; r: number; c: number; ph: number; tw: number }

export function mountSparkles(canvas: HTMLCanvasElement, area: HTMLElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let ps: P[] = [];
  const density = () => (w < 640 ? DENSITY_SMALL : DENSITY);
  let reach = RADIUS;
  let coreR = CORE;
  const groups: P[][] = Array.from({ length: PALETTE.length * ALPHA_BUCKETS }, () => []);

  const pickColor = () => {
    let t = Math.random();
    for (let i = 0; i < PALETTE.length; i++) if ((t -= PALETTE[i][1]) <= 0) return i;
    return 0;
  };
  const make = (x = Math.random() * w, y = Math.random() * h): P => {
    const a = Math.random() * Math.PI * 2;
    const s = 0.05 + Math.random() * 0.35;
    return {
      x, y,
      vx: Math.cos(a) * s, vy: Math.sin(a) * s,
      bx: Math.cos(a) * s, by: Math.sin(a) * s,
      r: (0.4 + Math.random() * 2) * (w < 640 ? 1.3 : 1), // 0.4 to 2.4 px; a touch larger on phones
      c: pickColor(),
      ph: Math.random() * Math.PI * 2,
      tw: 0.6 + Math.random() * 1.2,        // twinkle speed
    };
  };

  const resize = () => {
    const rect = area.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    reach = w < 640 ? RADIUS_SMALL : RADIUS;
    coreR = w < 640 ? CORE_SMALL : CORE;
    const target = Math.round((w * h) / (400 * 400) * density());
    while (ps.length < target) ps.push(make());
    ps.length = Math.min(ps.length, target + 100);
  };

  // Pointer, in canvas coordinates. Touch uses passive touch events so it
  // follows the finger without ever blocking scrolling.
  let px = -9999;
  let py = -9999;
  let inside = false;
  const track = (x: number, y: number) => {
    const rect = canvas.getBoundingClientRect();
    px = x - rect.left;
    py = y - rect.top;
    inside = px >= 0 && py >= 0 && px <= rect.width && py <= rect.height;
  };
  const onMove = (e: PointerEvent) => { if (e.pointerType !== 'touch') track(e.clientX, e.clientY); };
  const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) track(t.clientX, t.clientY); };
  const onLeave = () => (inside = false);
  const onClick = (e: PointerEvent) => {
    if (e.pointerType === 'touch') track(e.clientX, e.clientY);
    if (!inside) return;
    for (let i = 0; i < 4; i++) ps.push(make(px + (Math.random() - 0.5) * 8, py + (Math.random() - 0.5) * 8));
    const cap = Math.round((w * h) / (400 * 400) * density()) + 100;
    if (ps.length > cap) ps.splice(0, ps.length - cap);
  };

  const step = (t: number) => {
    for (const p of ps) {
      if (inside) {
        const dx = px - p.x;
        const dy = py - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < reach) {
          // Outside the core: pulled in, weaker toward the edge. Inside: only a
          // faint pull, a slow swirl and more jitter, so they fill a cloud
          // instead of piling up on its rim.
          const core = d < coreR;
          const f = core ? PULL * 0.08 : PULL * (1 - d / reach);
          const jitter = core ? 0.7 : 0.25;
          const ux = dx / d;
          const uy = dy / d;
          p.vx = p.vx * DAMPING + ux * f - uy * SWIRL + (Math.random() - 0.5) * jitter;
          p.vy = p.vy * DAMPING + uy * f + ux * SWIRL + (Math.random() - 0.5) * jitter;
        }
      }
      // Ease back to the resting drift.
      p.vx += (p.bx - p.vx) * 0.01;
      p.vy += (p.by - p.vy) * 0.01;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -4) p.x = w + 4; else if (p.x > w + 4) p.x = -4;
      if (p.y < -4) p.y = h + 4; else if (p.y > h + 4) p.y = -4;
    }

    // One pass to sort particles into color x opacity groups, then one fill per group.
    for (const g of groups) g.length = 0;
    for (const p of ps) {
      // Twinkle between 0.1 and 1.
      const a = 0.55 + 0.45 * Math.sin(t * 0.001 * p.tw + p.ph);
      groups[p.c * ALPHA_BUCKETS + Math.min(ALPHA_BUCKETS - 1, (a * ALPHA_BUCKETS) | 0)].push(p);
    }
    ctx.clearRect(0, 0, w, h);
    groups.forEach((g, i) => {
      if (!g.length) return;
      ctx.beginPath();
      for (const p of g) {
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fillStyle = PALETTE[(i / ALPHA_BUCKETS) | 0][0];
      ctx.globalAlpha = ((i % ALPHA_BUCKETS) + 0.5) / ALPHA_BUCKETS;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  };

  let raf = 0;
  let visible = true;
  const loop = (t: number) => {
    raf = requestAnimationFrame(loop);
    if (visible && !document.hidden) step(t);
  };
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  const ro = new ResizeObserver(resize);

  resize();
  io.observe(area);
  ro.observe(area);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onClick, { passive: true });
  window.addEventListener('touchstart', onTouch, { passive: true });
  window.addEventListener('touchmove', onTouch, { passive: true });
  window.addEventListener('touchend', onLeave, { passive: true });
  window.addEventListener('touchcancel', onLeave, { passive: true });
  document.addEventListener('pointerleave', onLeave);
  raf = requestAnimationFrame(loop);
  canvas.classList.add('is-live');

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onClick);
    window.removeEventListener('touchstart', onTouch);
    window.removeEventListener('touchmove', onTouch);
    window.removeEventListener('touchend', onLeave);
    window.removeEventListener('touchcancel', onLeave);
    document.removeEventListener('pointerleave', onLeave);
  };
}
