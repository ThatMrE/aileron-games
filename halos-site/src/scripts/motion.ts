// Scroll choreography. Runs only when motion is allowed; html.motion is set
// by an inline script in <head> under the same condition.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

declare global {
  interface Window { __halosHero?: { progress: number }; __halosLenis?: Lenis }
}

const root = document.documentElement;
const EASE = 'expo.out'; // close to cubic-bezier(0.22, 1, 0.36, 1)
window.__halosHero = { progress: 0 };

function words(el: Element) {
  // Italic word resolves last.
  const all = [...el.querySelectorAll<HTMLElement>('.w')];
  return [...all.filter((w) => !w.querySelector('.w-i')), ...all.filter((w) => w.querySelector('.w-i'))];
}

function initLenis() {
  const lenis = new Lenis({ duration: 1.1, anchors: { offset: -88 } });
  window.__halosLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // Stop smooth scroll while the mobile menu sheet is open.
  new MutationObserver(() => (root.classList.contains('menu-open') ? lenis.stop() : lenis.start())).observe(root, {
    attributes: true,
    attributeFilter: ['class'],
  });
}

function headings() {
  // Hero H1: CSS keyframes, staggered by index with the italic word last.
  document.querySelectorAll('.hero [data-split]').forEach((h) => {
    const ws = words(h);
    ws.forEach((w, i) => w.style.setProperty('--wi', String(i)));
    // Matches the CSS: 0.15s delay + 0.06s per word + 1s duration.
    setTimeout(() => root.classList.add('hero-in'), (0.15 + ws.length * 0.06 + 1) * 1000);
  });

  document.querySelectorAll<HTMLElement>('[data-split]').forEach((h) => {
    if (h.closest('.hero')) return;
    const ws = words(h);
    if (h.hasAttribute('data-split-scrub')) {
      // A reading reveal follows the sentence in order.
      gsap.fromTo(h.querySelectorAll('.w'), { opacity: 0 }, {
        opacity: 1,
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: { trigger: h, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
      });
      return;
    }
    gsap.to(ws, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 1.1,
      stagger: 0.06,
      ease: EASE,
      scrollTrigger: { trigger: h, start: 'top 80%', once: true },
    });
  });
}

function sectionLines() {
  document.querySelectorAll<HTMLElement>('[data-sline]').forEach((s) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 88%', once: true } });
    tl.to(s.querySelector('.sline__rule'), { scaleX: 1, duration: 1.2, ease: 'power3.inOut' })
      .to(s.querySelectorAll('.sline__plus'), { opacity: 0.4, duration: 0.6, ease: EASE }, '-=0.3')
      .to(s.querySelector('.sline__label'), { opacity: 1, duration: 0.6, ease: EASE }, '<');
  });
}

function masks() {
  document.querySelectorAll<HTMLElement>('[data-mask]').forEach((m) => {
    const img = m.querySelector('img');
    const ring = m.dataset.mask === 'ring';
    const tl = gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 85%', end: 'top 30%', scrub: 0.8 } });
    tl.fromTo(
      m,
      { clipPath: ring ? 'circle(30% at 50% 50%)' : 'inset(22% 14% 0% 14% round 999px 999px 16px 16px)' },
      { clipPath: ring ? 'circle(75% at 50% 50%)' : 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'none' },
      0,
    );
    if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none' }, 0);
    if (m.hasAttribute('data-mask-spin')) tl.fromTo(m, { scale: 0.85, rotate: -6 }, { scale: 1, rotate: 0, ease: 'none' }, 0);
  });

  // Product band: arch opens to a 16px card.
  const band = document.querySelector<HTMLElement>('[data-band]');
  if (band) {
    gsap.fromTo(
      band,
      { borderRadius: '50vw 50vw 16px 16px' },
      { borderRadius: '16px 16px 16px 16px', ease: 'none', scrollTrigger: { trigger: band, start: 'top 90%', end: 'top 25%', scrub: 0.8 } },
    );
    const img = band.querySelector('img');
    if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: band, start: 'top 90%', end: 'bottom 40%', scrub: 0.8 } });
  }
}

function windowCurve() {
  const fig = document.querySelector<HTMLElement>('[data-curve]');
  if (!fig) return;
  const curve = fig.querySelector('.window__curve');
  gsap.set(curve, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(fig.querySelectorAll('.window__area, .window__scar, .window__tag, .window__tick'), { opacity: 0 });
  const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 75%', end: 'center 40%', scrub: 0.8 } });
  tl.to(fig.querySelectorAll('.window__tick, .window__tag:first-of-type'), { opacity: 1, duration: 0.2, stagger: 0.05 })
    .to(curve, { strokeDashoffset: 0, duration: 1, ease: 'none' })
    .to(fig.querySelector('.window__area'), { opacity: 1, duration: 0.4 }, '-=0.45')
    .to(fig.querySelectorAll('.window__scar, .window__tag'), { opacity: 1, duration: 0.3 }, '-=0.2');
}

function stickySteps() {
  const wrap = document.querySelector<HTMLElement>('[data-steps]');
  if (!wrap) return;
  const items = [...wrap.querySelectorAll<HTMLElement>('[data-step-item]')];
  const diagram = wrap.querySelector<SVGElement>('.steps__diagram');
  const groups = diagram ? [...diagram.querySelectorAll<SVGGElement>('[data-step]')] : [];
  const progress = wrap.querySelector<HTMLElement>('[data-steps-progress]');

  const setState = (n: number) => {
    groups.forEach((g) => {
      const on = Number(g.dataset.step) <= n;
      g.classList.toggle('is-on', on);
      g.classList.toggle('is-off', !on);
    });
    items.forEach((it, i) => it.classList.toggle('is-active', i + 1 === n));
  };

  gsap.matchMedia().add('(min-width: 960px)', () => {
      wrap.classList.add('is-live');
      setState(0);
      if (progress) {
        gsap.fromTo(progress, { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: wrap.querySelector('.steps__list'), start: 'top 50%', end: 'bottom 50%', scrub: true },
        });
      }
      items.forEach((it, i) => {
        ScrollTrigger.create({
          trigger: it,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setState(i + 1),
          onLeaveBack: () => i === 0 && setState(0),
        });
      });
      return () => { wrap.classList.remove('is-live'); setState(4); };
  });
}

function heroPin() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const state = window.__halosHero!;
  const mm = gsap.matchMedia();
  // Desktop: pin the hero for 1.5 viewport heights while the object morphs.
  mm.add('(min-width: 960px)', () => {
    ScrollTrigger.create({
      trigger: hero, start: 'top top', end: '+=150%', pin: true, scrub: true,
      onUpdate: (self) => (state.progress = self.progress),
    });
  });
  // Mobile: no pinning; the morph follows ordinary scroll through the hero.
  mm.add('(max-width: 959px)', () => {
    ScrollTrigger.create({
      trigger: hero, start: 'top top', end: 'bottom top', scrub: true,
      onUpdate: (self) => (state.progress = self.progress),
    });
  });
}

function fades() {
  ScrollTrigger.batch('[data-fade]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.08 }),
  });
}

if (root.classList.contains('motion')) {
  gsap.registerPlugin(ScrollTrigger);
  initLenis();
  heroPin();
  headings();
  sectionLines();
  masks();
  windowCurve();
  stickySteps();
  fades();
  root.classList.add('motion-ready');
  // Fonts and late images change layout; re-measure once things settle.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
