// Renders public/og.jpg (1200x630) and public/apple-touch-icon.png (180x180)
// with Chromium, so the self-hosted brand fonts are used.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = new URL('../', import.meta.url).pathname;
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(`${root}node_modules/@fontsource/${pkg}/files/${file}`).toString('base64')}`;
const img = (p, type) => `data:${type};base64,${readFileSync(root + p).toString('base64')}`;
const symbol = img('public/brand/halos-symbol.svg', 'image/svg+xml');

const faces = `
  @font-face { font-family: Bodoni; src: url(${font('bodoni-moda', 'bodoni-moda-latin-400-normal.woff2')}); }
  @font-face { font-family: Bodoni; font-style: italic; src: url(${font('bodoni-moda', 'bodoni-moda-latin-400-italic.woff2')}); }
  @font-face { font-family: Inter; font-weight: 800; src: url(${font('inter', 'inter-latin-800-normal.woff2')}); }
  * { margin: 0; box-sizing: border-box; }`;

const og = `<!doctype html><style>${faces}
  body { width: 1200px; height: 630px; background: url(${img('public/img/og-base-1200x630.jpg', 'image/jpeg')}) center / cover; position: relative; }
  .lock { position: absolute; left: 80px; top: 76px; display: flex; align-items: center; gap: 14px; }
  .lock img { height: 44px; }
  .lock span { font: 800 28px Inter; letter-spacing: -0.01em; color: #16191E; }
  h1 { position: absolute; left: 80px; bottom: 92px; width: 560px; font: 400 76px/1.04 Bodoni; color: #16191E; letter-spacing: -0.01em; }
  em { font-style: italic; }
</style>
<div class="lock"><img src="${symbol}"><span>HALOS</span></div>
<h1>Lab-grown human fetal <em>plasma</em>.</h1>`;

const icon = `<!doctype html><style>${faces}
  body { width: 180px; height: 180px; background: #FFFFFF; display: grid; place-items: center; }
  img { height: 112px; }
</style><img src="${symbol}">`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${root}public/og.jpg`, type: 'jpeg', quality: 86 });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(icon);
await page.screenshot({ path: `${root}public/apple-touch-icon.png` });
await browser.close();
console.log('wrote public/og.jpg and public/apple-touch-icon.png');
