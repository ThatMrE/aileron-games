// axe-core accessibility run (WCAG 2 A/AA, including color contrast) on every
// page at mobile and desktop widths. Runs with reduced motion so no text is
// mid-animation. Usage: node scripts/qa-axe.mjs [baseUrl]
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const base = process.argv[2] || 'http://localhost:4321';
const pages = ['/', '/privacy/', '/404.html'];
const widths = [[375, 812], [1440, 900]];
const browser = await chromium.launch();
let total = 0;
const report = [];
for (const path of pages) {
  for (const [w, h] of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeSource });
    const res = await page.evaluate(() =>
      // eslint-disable-next-line no-undef
      axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }),
    );
    for (const v of res.violations) {
      total += v.nodes.length;
      report.push({ path, w, id: v.id, impact: v.impact, nodes: v.nodes.map((n) => ({ target: n.target.join(' '), summary: n.failureSummary })) });
      console.log(`${path} @${w}: ${v.id} (${v.impact}) x${v.nodes.length}`);
      v.nodes.slice(0, 6).forEach((n) => console.log(`   ${n.target.join(' ')} :: ${n.failureSummary.split('\n').slice(1).join(' ').slice(0, 160)}`));
    }
    await page.close();
  }
}
await browser.close();
writeFileSync(new URL('../qa/axe.json', import.meta.url), JSON.stringify(report, null, 2));
console.log(total ? `axe: ${total} violation node(s)` : 'axe: 0 violations');
process.exit(total ? 1 : 0);
