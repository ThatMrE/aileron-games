// Lighthouse (mobile, default throttling) against a URL.
// Usage: node scripts/qa-lighthouse.mjs [url] [label]
import { writeFileSync } from 'node:fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const url = process.argv[2] || 'http://localhost:4321/';
const label = process.argv[3] || 'local';
const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH,
  // Lighthouse's own defaults: headless, no forced software GL.
  chromeFlags: ['--headless=new', '--no-sandbox'],
});
const blockedUrlPatterns = process.env.LH_BLOCK ? process.env.LH_BLOCK.split(',') : [];
const result = await lighthouse(url, { port: chrome.port, output: 'html', logLevel: 'error', blockedUrlPatterns });
await chrome.kill();
const { categories, audits } = result.lhr;
const scores = Object.fromEntries(Object.entries(categories).map(([k, c]) => [k, Math.round(c.score * 100)]));
writeFileSync(new URL(`../qa/lighthouse-${label}.html`, import.meta.url), result.report);
console.log(label, scores);
console.log('LCP', audits['largest-contentful-paint'].displayValue, '| TBT', audits['total-blocking-time'].displayValue, '| CLS', audits['cumulative-layout-shift'].displayValue, '| FCP', audits['first-contentful-paint'].displayValue);
for (const [k, c] of Object.entries(categories)) {
  if (c.score === 1) continue;
  const fails = c.auditRefs.map((r) => audits[r.id]).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'manual');
  if (fails.length) console.log(`  ${k}:`, fails.map((a) => `${a.id}${a.displayValue ? ` (${a.displayValue})` : ''}`).join(', '));
}
