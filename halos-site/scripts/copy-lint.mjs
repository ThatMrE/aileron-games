// Fails the build if visible copy breaks the brand word rules.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) walk(p);
  else if (p.endsWith('.html')) files.push(p);
});
walk(dist);

const visible = (html) => html
  .replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, '’')
  .replace(/\s+/g, ' ');

// The Notes list cites published titles verbatim; only allowed phrases are exempted there.
const notesBlock = (html) => (html.match(/<ol class="notes__list[\s\S]*?<\/ol>/) || [''])[0];

const rules = [
  { name: 'em dash', re: /—/g },
  { name: '"serum" outside "fetal bovine serum"', re: /\bserum\b/gi, allow: /fetal bovine serum/gi },
  { name: '"artificial"', re: /\bartificial\b/gi },
  { name: '"young blood"', re: /\byoung blood\b/gi, notesOk: true },
  { name: '"anti-aging" outside the cited market name', re: /\banti-aging\b/gi, allow: /anti-aging cosmetics/gi },
  { name: '"cure"', re: /\bcure[sd]?\b/gi },
  { name: '"immortal"', re: /\bimmortal\w*/gi },
  { name: '"Roboto"', re: /\broboto\b/gi },
];

let failures = 0;
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const r of rules) {
    let text = visible(html);
    if (r.notesOk) text = visible(html.replace(notesBlock(html), ' '));
    if (r.allow) text = text.replace(r.allow, ' ');
    const hits = text.match(r.re);
    if (hits) {
      failures++;
      console.error(`copy-lint: ${file.replace(dist, '')}: ${r.name} (${hits.length}x)`);
    }
  }
}

const index = readFileSync(join(dist, 'index.html'), 'utf8');
const hero = visible((index.match(/<section class="hero[\s\S]*?<\/section>/) || [''])[0]).toLowerCase();
for (const must of ['lab-grown', 'free of donors']) {
  if (!hero.includes(must)) { failures++; console.error(`copy-lint: hero is missing "${must}"`); }
}

if (failures) { console.error(`copy-lint: ${failures} problem(s)`); process.exit(1); }
console.log(`copy-lint: ${files.length} page(s) clean`);
