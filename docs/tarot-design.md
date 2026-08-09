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

- **Assay** — five spreads: Single assay (1), Central dogma (3: genotype / phenotype /
  expression), Pathway (5: substrate / catalyst / inhibitor / product / byproduct),
  Full panel (7) and Whole genome (10, a celtic-cross by another name). Cards deal face
  down and flip on click; `Space` deals a new hand.
- **Lab report** — position, card, orientation, meaning, plus any print mutation. A
  synthesis line reads the shape of the spread itself: majors-heavy vs. bench work,
  dominant suit, proportion reversed.
- **Print run** — all 78 cards as this seed grew them, filterable by arcana or suit,
  with a print stylesheet for a physical contact sheet.
- **Export** — any card as SVG, or as a 3× PNG rasterised through canvas.
- **Permalink** — the seed lives in the URL hash, so a deck is a link.

## Deliberate non-features

No server, no storage, no analytics. No "your fortune" framing — the page says outright
that it is a generative art toy, not divination and not medical advice. Reversals are a
toggle, not a doctrine.
