/* Builds mobile/www/index.html from the canonical web game (../fda.html).
 *
 * fda.html stays the single source of truth. This script applies exactly the
 * changes an offline Android WebView needs, and every substitution is asserted:
 * if the source game changes shape so a replacement no longer matches, the
 * build FAILS rather than silently shipping a half-transformed app.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const wwwDir = join(here, '..', 'www');

let html = await readFile(join(root, 'fda.html'), 'utf8');
const edits = [];

function sub(label, find, replace) {
  const before = html;
  html = html.replace(find, replace);
  if (html === before) {
    throw new Error(
      `build-www: substitution "${label}" matched nothing.\n` +
      `fda.html has changed shape — update mobile/tools/build-www.mjs to match ` +
      `instead of letting the app silently diverge from the game.`
    );
  }
  edits.push(label);
}

/* 1 ─ viewport: cover the display cutout, and pin the scale. This is a
      pixel-art game on a fixed-size canvas; pinch-zoom only smears it. */
sub('viewport',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">');

/* 2 ─ fonts: the remote Google Fonts link cannot resolve offline. Swap it for
      the bundled base64 stylesheet built by tools/fetch-fonts.mjs. */
sub('fonts',
  /<link rel="preconnect"[\s\S]*?family=Press\+Start\+2P[^>]*>/,
  '<link rel="stylesheet" href="fonts/fonts.css">');

/* 3 ─ mobile stylesheet + shim, injected just before </head> and </body>. */
const MOBILE_CSS = `
<style>
  /* ── Android WebView adaptations ────────────────────────────────── */
  html { -webkit-text-size-adjust: 100%; }
  html, body { overscroll-behavior: none; }          /* kill pull-to-refresh + rubber-band */
  body { -webkit-tap-highlight-color: transparent; }

  /* the game is read and tapped, not selected — but never break real inputs */
  body { -webkit-user-select: none; user-select: none; }
  input, textarea { -webkit-user-select: text; user-select: text; }

  /* every tappable thing gets a real touch target and no 300ms zoom delay */
  .opt, .nav-btn, .ebtn, .door button { touch-action: manipulation; }
  .opt { min-height: 48px; display: flex; flex-direction: column; justify-content: center; }
  .nav-btn { min-height: 40px; }
  .ebtn { min-height: 48px; display: inline-flex; align-items: center; }

  /* display cutout / gesture bar */
  nav { padding-top: calc(0.8rem + env(safe-area-inset-top)); }
  .wrap { padding-left: calc(1rem + env(safe-area-inset-left));
          padding-right: calc(1rem + env(safe-area-inset-right)); }
  footer { padding-bottom: calc(2.4rem + env(safe-area-inset-bottom)); }
  .ov { padding-top: calc(1.5rem + env(safe-area-inset-top));
        padding-bottom: calc(1.5rem + env(safe-area-inset-bottom)); }

  /* on a phone the monitor bezel is wasted width */
  @media (max-width: 640px) {
    .monitor { padding: 0.35rem; border-width: 3px; }
    .wrap { padding-top: 0.6rem; }

    /* the site nav is app chrome here — it was costing ~110px of a 915px
       screen before the game even started. Compact it onto one row. */
    nav { padding-bottom: 0.5rem; gap: 0.4rem; align-items: flex-start; }
    .nav-logo { font-size: 0.5rem; }
    .nav-logo small { font-size: 0.72rem; margin-top: 0.2rem; }
    .nav-btn { font-size: 0.42rem; padding: 0.35rem 0.4rem; min-height: 34px; }
    .nav-links { gap: 0.3rem; }
  }
</style>`;

const MOBILE_JS = `
<script>
/* ── Android shell integration ──────────────────────────────────────
   Runs under Capacitor. Everything here is defensive: the same file is
   also openable in a plain browser, where Capacitor is simply absent. */
(function () {
  var Cap = window.Capacitor;
  var isNative = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());

  function plugin(name) {
    return (Cap && Cap.Plugins && Cap.Plugins[name]) || null;
  }

  if (isNative) {
    var sb = plugin('StatusBar');
    if (sb) {
      /* the game is dark; match the system bars to it */
      sb.setStyle && sb.setStyle({ style: 'DARK' });
      sb.setBackgroundColor && sb.setBackgroundColor({ color: '#0b0d13' });
    }
    var sc = plugin('SplashScreen');
    if (sc && sc.hide) setTimeout(function () { sc.hide(); }, 250);
  }

  /* Hardware back button.
     Priority: close an open overlay first; otherwise ask before quitting,
     because leaving mid-run silently discards the playthrough. */
  var App = plugin('App');
  if (App && App.addListener) {
    App.addListener('backButton', function () {
      var open = document.querySelector('.ov.show');
      if (open) { if (window.closeOv) window.closeOv(); return; }
      if (confirm('Leave the trail?')) { App.exitApp && App.exitApp(); }
    });
  }

  /* Links back to the marketing site must leave the app, not navigate the
     WebView to a page that is not bundled. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var external = /^https?:/i.test(href);
    var siteLink = /(^|\\/)index\\.html/.test(href);
    if (!external && !siteLink) return;
    e.preventDefault();
    var url = external ? href : 'https://aileron.games/';
    var Browser = plugin('Browser');
    if (isNative && Browser && Browser.open) Browser.open({ url: url });
    else window.open(url, '_blank', 'noopener');
  }, true);
})();
</script>`;

sub('mobile css', '</head>', MOBILE_CSS + '\n</head>');
sub('mobile js', '</body>', MOBILE_JS + '\n</body>');

/* 4 ─ the WebView has no address bar, so the page title is never seen; but
      keep it meaningful for the PWA/browser case. */
sub('title',
  /<title>[\s\S]*?<\/title>/,
  '<title>FDA: Forever Doesn’t Allow</title>');

await mkdir(wwwDir, { recursive: true });
await writeFile(join(wwwDir, 'index.html'), html);

/* Sanity: no *resource* may load from the network, or the app breaks offline.
   Citation <a href> links are fine and expected — the shim opens them in the
   system browser — so this checks only elements that fetch during render. */
const resourceTags = html.match(/<(?:link|script|img|source|iframe)\b[^>]*>/gi) || [];
const remoteResources = resourceTags.filter(t => /(?:src|href)=["']https?:\/\//i.test(t));
if (remoteResources.length) {
  throw new Error(
    'build-www: these would fetch from the network at render time and break the ' +
    'offline app:\n  ' + remoteResources.join('\n  ')
  );
}
const citations = (html.match(/<a\b[^>]+href=["']https?:\/\//gi) || []).length;

console.log('applied: ' + edits.join(', '));
console.log('remote resources: 0 (verified) — app renders fully offline');
console.log('citation links in static markup: ' + citations + ' (opened in system browser)');
console.log('wrote www/index.html  ' + (Buffer.byteLength(html) / 1024).toFixed(1) + ' KB');
