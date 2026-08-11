# Wetware Arcana — design notes

A biopunk tarot deck **generator**. One file (`tarot.html`), no build step, no network
calls, no assets on disk. Every card — art, palette, defects and all — is generated in
the browser from a single seed string.

## The premise

Tarot is already a technology for reading a system you cannot fully see. Wetware Arcana
keeps the whole Rider–Waite skeleton (22 major arcana, four suits of fourteen) and
re-cultures every card in a wet lab. The Magician has enzymes instead of a wand. Death
is apoptosis, which is a *better* Death card: the organism chooses it, executes it
tidily, and recycles the parts.

Nothing about the archetypes is randomised. What the seed changes is the **print run**.

## The deck

### Major arcana (22)

| # | Card | Was |
|---|------|-----|
| 0 | The Unsequenced | The Fool |
| I | The Splicer | The Magician |
| II | The Ribosome | The High Priestess |
| III | The Bioreactor | The Empress |
| IV | The Patent Holder | The Emperor |
| V | The Ethics Board | The Hierophant |
| VI | The Chimera | The Lovers |
| VII | The Vector | The Chariot |
| VIII | The Immune System | Strength |
| IX | The Cleanroom | The Hermit |
| X | The Centrifuge | Wheel of Fortune |
| XI | The Proofreader | Justice |
| XII | Cryostasis | The Hanged Man |
| XIII | Apoptosis | Death |
| XIV | Homeostasis | Temperance |
| XV | The Dependency | The Devil |
| XVI | Lysis | The Tower |
| XVII | The Extremophile | The Star |
| XVIII | The Prion | The Moon |
| XIX | The Chloroplast | The Sun |
| XX | The Sequencer | Judgement |
| XXI | The Biosphere | The World |

The mapping is meant to be *mechanically* faithful, not just thematically cute.
Justice becomes polymerase proofreading because both are about excising an error
before it is copied. The Devil becomes an auxotroph on a feed line because both are
about a need someone engineered into you. The Moon becomes a prion because both are
distortions that spread by contact rather than by argument.

### Suits (4 × 14)

| Suit | Was | Element | Domain |
|------|-----|---------|--------|
| Plasmids | Wands | Fire | will, drive, whatever copies itself and spreads |
| Cultures | Cups | Water | feeling, relationship, the medium you grow things in |
| Nucleases | Swords | Air | mind, conflict, precision, what cuts and where |
| Organs | Pentacles | Earth | body, labour, property, what can be owned and worn out |

Court ranks are **Spore** (page — the novice, first news), **Vector** (knight — delivery
and momentum), **Matrix** (queen — the medium that holds and grows others) and
**Architect** (king — the one who designs the system everyone else lives inside).

Every one of the 78 cards has hand-written upright and reversed meanings. None of the
text is templated or procedurally assembled.

## What the seed controls

`RNG(seed)` is a mulberry32 PRNG keyed by an FNV-1a hash of the seed string. Each card
draws from its own stream (`RNG(seed + '|' + cardId)`), so a card looks the same every
time you load that seed, and changing the seed re-rolls the whole run at once.

- **Culture medium** — one of eight palettes (Wild Type, Hemorrhage, Chloroplast,
  Cryogen, Sepsis, Anaerobe, Halophile, Nutrient Agar), auto-picked from the seed or
  chosen by hand.
- **Art** — every motif is drawn from scratch as SVG paths. The seed sets counts,
  angles, blob jitter, noise fields and stroke weights. No two seeds draw the same helix.
- **Strain identity** — organism name, lot number and passage number, stamped on the
  bottom of every card and on the back.
- **Print mutations** — 3–8 cards per run come out defective. The defect is *printed on
  the card* (glitch bands, a `MUT` stamp) and named in the card's reading: "a transposon
  jumped in from the card before it". A mutated card reads differently, and only in your
  deck.

## Art engine

Each card is a 320 × 520 SVG built by string concatenation:

- **Frame** — double border, corner brackets, rank/suit header, name plate, the
  traditional name in small caps, a seeded barcode and the lot line.
- **Art window** — 272 × 320, clipped, with a fine grid pattern, a radial paper
  gradient and a Gaussian glow filter so the linework reads as backlit.
- **Motifs** — 22 bespoke generators for the majors (`helix`, `capsid`, `rotor`,
  `apoptosis`, `readout`, …), four suit glyphs for the minors, and one procedural
  humanoid silhouette reused by the courts, the Cleanroom, Cryostasis and the Dependency.
- **Minor layouts** — Aces get a haloed oversized glyph; 2–10 use classic tarot pip
  arrangements with the glyph scaled to the pip count; courts get the silhouette with a
  rank-specific headpiece and the suit glyph on the chest.

Filter, gradient and clip-path IDs are uniquified per render so a page full of 78 inline
SVGs never collides — and so a single exported card is self-contained.

## Interface

- **Assay** — fourteen spreads in three groups. Every one is a standard tarot spread
  under a lab coat, and each chip shows what it is traditionally called.

  | Group | Spread | Traditionally |
  |-------|--------|---------------|
  | Quick | Single assay (1) | one-card draw |
  | Quick | Yes / no titration (3) | yes-or-no draw |
  | Quick | Central dogma (3) | situation / action / outcome |
  | Quick | Lineage (3) | past / present / future |
  | Quick | Soma (3) | mind / body / spirit |
  | Structured | Pathway (5) | five-card cross |
  | Structured | Contaminant (5) | shadow work |
  | Structured | Full panel (7) | horseshoe |
  | Structured | Co-culture (7) | relationship spread |
  | Structured | Selection (7) | two-path decision |
  | Structured | Systems scan (7) | chakra / body scan |
  | Structured | Seven-day culture (7) | week ahead |
  | Deep | Whole genome (10) | celtic cross |
  | Deep | Twelve passages (12) | year-ahead wheel |

  Spreads whose shape carries meaning declare a grid: `cols` plus one `[col, row]`
  cell per position. The cross is a cross, the horseshoe is an arc, the celtic cross
  has its staff, and the year is a twelve-card ring around an empty centre. Below
  900px the geometry is dropped and everything falls back to the flowing grid — a
  horseshoe on a phone is just a mess. The yes/no titration reads orientation rather
  than meaning, so selecting it switches reversals on (visibly, via the checkbox)
  rather than silently answering off a stacked deck.

  Cards deal face down and flip on click; `Space` deals a new hand.

- **Draw animation** — dealing runs an inoculation sequence per slot, staggered 85ms
  apart: a luminous droplet falls into the empty slot, a colony blooms where it lands
  (a cyan ring with a pink lysis halo), and the card grows out of the bloom with a
  slight overshoot. Revealing a card runs a gel-electrophoresis scan — a bright band
  sweeping down the face over fine horizontal bands — timed to start 330ms into the
  flip, as the front comes round. All of it is CSS keyframes on four extra elements
  per slot, and all of it collapses to a plain fade under
  `prefers-reduced-motion: reduce`.
- **Lab report** — position, card, orientation, meaning, plus any print mutation. A
  synthesis line reads the shape of the spread itself: majors-heavy vs. bench work,
  dominant suit, proportion reversed.
- **Print run** — all 78 cards as this seed grew them, filterable by arcana or suit,
  with a print stylesheet for a physical contact sheet.
- **Export** — any card as SVG, or as a 3× PNG rasterised through canvas.
- **Permalink** — the seed lives in the URL hash, so a deck is a link.

## Installing it on Android

Wetware Arcana is a PWA, so it installs to an Android home screen in one tap
with no store involved. The pieces follow the same pattern as Weji and Pun
Bearable:

| File | Role |
|------|------|
| `tarot.webmanifest` | `id`/`start_url`/`scope` all `/tarot.html`, standalone display, deck-dark theme, plus two shortcuts (Draw, Deck) |
| `tarot-sw.js` | service worker at scope `/tarot.html`, cache `tarot-v1` |
| `icons/tarot-*.png` | 192 / 512 in `any` and `maskable`, plus apple-touch and favicon |

**The one-click button.** The Wetware Arcana card on the homepage carries an
`Install app` chip. The homepage has no manifest of its own, so in most
browsers `beforeinstallprompt` never fires there — the chip's real job is to
route to `tarot.html?install=1`. The tarot page carries the manifest and the
worker, so the prompt fires there; `?install=1` reveals the in-page
`Install app` button, pulses it and scrolls it into view. Where the browser
*does* offer the prompt on the homepage, the chip fires it directly.

Everything is namespaced. The worker's scope is `/tarot.html` so it coexists
with `dice-sw.js` at `/`, and its cleanup only deletes `tarot-` caches, so it
can never evict a neighbouring app's cache.

**Offline.** Because the deck is generated in the page — no card art or data is
ever fetched — precaching the document and icons is enough for the installed
app to work completely offline: new seeds, new art, all 14 spreads, exports.
Verified by loading the app, going offline, reloading, and dealing a spread.

The app shell is network-first, so a redeployed deck reaches installed users on
their next online launch rather than being pinned to the version they installed.

**Not included:** a Play Store build. That needs a TWA wrapper (see
`docs/ANDROID.md`, the `android/` and `android-weji/` scaffolds, and a
`games.aileron.tarot` entry in `.well-known/assetlinks.json` with a real
signing fingerprint). The PWA route above is what makes the website button
one-click; the store is a separate distribution decision.

## Deliberate non-features

No server, no storage, no analytics. No "your fortune" framing — the page says outright
that it is a generative art toy, not divination and not medical advice. Reversals are a
toggle, not a doctrine.
