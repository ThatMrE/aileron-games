// Full-page screenshots of a running preview (default http://localhost:4321).
// Usage: node scripts/qa-screens.mjs [baseUrl] [--reduced]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const base = process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4321';
const reduced = process.argv.includes('--reduced');
const out = new URL('../qa/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });

const sizes = [[375, 812], [768, 1024], [1440, 900], [1920, 1080]];
const browser = await chromium.launch();
for (const [w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  // Scroll through once so lazy images load and scroll-driven states settle.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  if (broken.length) console.warn(`${w}x${h} broken images:`, broken);
  await page.screenshot({ path: `${out}home-${w}x${h}${reduced ? '-reduced' : ''}.png`, fullPage: true });
  console.log(`qa/home-${w}x${h}.png`);
  await page.close();
}
await browser.close();
