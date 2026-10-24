// Screenshots of the hero particle shapes: ring, vial, wheel (and drift),
// by scrolling through the pinned hero. Usage: node scripts/qa-halo.mjs [baseUrl]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const base = process.argv[2] || 'http://localhost:4321';
const out = new URL('../qa/', import.meta.url).pathname;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => m.type() === 'error' && console.log('console:', m.text()));
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.querySelector('.halo.is-live'), null, { timeout: 15000 });
await page.waitForTimeout(3200); // intro settles into the ring
const shots = [['ring', 0], ['vial', 0.28], ['wheel', 0.56], ['drift', 0.8]];
for (const [name, p] of shots) {
  await page.evaluate((y) => window.__halosLenis ? window.__halosLenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y), Math.round(p * 900 * 1.5));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${out}halo-${name}-1440x900.png` });
  console.log(`qa/halo-${name}-1440x900.png`);
}
await browser.close();
