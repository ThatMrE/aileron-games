# DNA Chess — Game Design Document (v0.1)

> **One-line pitch:** A two-player abstract strategy game where you run the
> Central Dogma — DNA → RNA → protein — as a war machine, and win by mutating
> more than half of your opponent's genome until they get cancer.

---

## 1. Design pillars

1. **The Central Dogma *is* the economy.** You don't just move pieces; you
   *express* them. DNA transcribes RNA, RNA translates into proteins, and only
   proteins can reach across the board and edit the enemy genome. Every piece on
   the board is downstream of a gene you chose to switch on.
2. **Information warfare, not annihilation.** You do not win by capturing the
   king. You win by **corrupting information** — flipping healthy genes to
   mutated ones. Cancer is a *loss of regulation*, so the game is about
   dysregulating your opponent faster than they can repair themselves.
3. **Everything is dual-use.** RNA both *builds* (translates to protein) and
   *sabotages* (silences genes, degrades enemy RNA). Proteins both *attack*
   (mutate enemy DNA) and *defend* (repair your own). Tempo is the core tension:
   spend expression on offense or on regulation?
4. **Biologically legible.** Each mechanic maps to a real molecular event, so
   the game teaches the Central Dogma by making you *operate* it.

---

## 2. Components & board

- **Board:** 8×8, 64 tiles — a stylized cell interior (cytoplasm). The two back
  ranks are the **nuclear membranes** where each player's genome sits.
- **The genome (back rank):** Each player starts with **8 DNA pieces** on their
  back rank — 8 genes, and effectively **8 lives**. DNA is immobile.
- **Expressed pieces:** RNA and proteins are *created during play* by expression,
  not placed at setup. There is no fixed army — you build the one you need.
- **Tokens/state:** each DNA piece is **Healthy**, **Silenced** (temporarily
  off), or **Mutated** (permanently corrupted). Track with a marker or a flipped
  tile.

### Starting position

```
Row 0  (opponent genome)   D D D D D D D D
Row 1                      . . . . . . . .
Row 2                      . . . . . . . .
Row 3                      . . . . . . . .   ← cytoplasm (empty at start)
Row 4                      . . . . . . . .
Row 5                      . . . . . . . .
Row 6                      . . . . . . . .
Row 7  (your genome)       D D D D D D D D
```

Nothing is expressed at the start. The board fills up as the game runs.

---

## 3. Win condition

- **You lose when 5 or more of your 8 DNA are Mutated** (strictly more than
  half). That player's cell has lost regulatory control → **cancer** → game over.
- Equivalently: **the first player to mutate ≥5 of the opponent's genes wins.**
- **Silenced ≠ mutated.** Silencing only switches a gene *off* (it can't
  transcribe) and is reversible. Only **Mutated** counts toward the cancer
  threshold. This keeps silencing as a tempo tool, not a win-by-attrition
  shortcut.

> **Optional variant — "Tumor suppressors":** Two of each player's 8 genes are
> face-up **guardian genes** (p53-style). If *either* guardian is mutated, the
> cancer threshold for that player drops from 5 to 4. Rewards targeted attacks
> on key genes over spraying mutations everywhere.

---

## 4. The turn — running the Central Dogma

The phrase behind the design: *"as time goes on, DNA produces RNA out of each
square, moves one square, and takes an action."* We formalize that into a clean,
repeatable turn.

Each turn has **three phases, in order:**

### Phase 1 — Transcription (the passive tick)
Every **active (Healthy, non-silenced) DNA** you control **transcribes**: it
spawns one **RNA** on the empty square directly in front of it (toward the
center). If that square is occupied, transcription of that gene is skipped this
turn (the polymerase is blocked). This is the engine that "produces RNA out of
each square as time goes on."

> To avoid flooding the board, use the **expression cap:** you may keep at most
> **1 RNA per gene** on the board at once. A gene with an un-translated RNA in
> front of it does not transcribe again until that RNA moves or is consumed.

### Phase 2 — One action (move + act)
Choose **one** of your pieces and do **one** of:
- **Move** it (per its movement rules) — and optionally perform its **action**
  at the destination, or
- **Translate:** convert one of your RNA pieces into a **protein** of your choice
  (see roster & costs), or
- **Repair/defensive action** with an eligible piece (e.g., Ligase).

So a turn is: *all genes transcribe → you take one deliberate action.* The board
grows on its own; your skill is in what single lever you pull each turn.

### Phase 3 — Decay (upkeep)
- **RNA is unstable:** each RNA you own gains a **decay counter**. An RNA that
  has been on the board for **3 of your turns without being used** (translated or
  moved to act) **degrades** and is removed. Keeps RNA a *use-it-or-lose-it*
  resource and prevents stalling.

> **Faster variant:** skip Phase 3 and instead cap total RNA at 6 per side.

---

## 5. The pieces

Movement is described by chess analogy for quick learning; the *action* is what
makes each piece biological.

| Piece | Molecule | Moves like | Signature action |
|---|---|---|---|
| **DNA** | Gene / genome | Immobile (back rank) | *Passive:* transcribes RNA forward each turn |
| **RNA** | mRNA / miRNA | Short rook — up to **3** orthogonally | Silence a gene · degrade enemy RNA · translate → protein |
| **Nuclease** | CRISPR‑Cas9 / restriction enzyme | Bishop — diagonal, any distance | **MUTATE** an adjacent enemy gene (primary win weapon) |
| **Polymerase** | DNA polymerase | Rook — straight, any distance | Fast transport; escorts/mutates on arrival |
| **Methyltransferase** | Epigenetic writer | King — 1 in any direction | **Silence** an adjacent enemy gene (reversible) |
| **Kinase** | Signaling kinase | Knight — L-shape (jumps) | **Activate** an ally (grant it a bonus action) |
| **Helicase** | DNA/RNA helicase | Straight, up to **3**, can push | **Displace** an enemy piece one square back |
| **Ligase** | DNA ligase / repair | King — 1 in any direction | **Repair** one of your Mutated/Silenced genes |

### Piece detail

**DNA (gene).** Eight per player, immobile, on the back rank. States:
- *Healthy* — transcribes each turn.
- *Silenced* — switched off (by an enemy RNA adjacent, or by Methyltransferase).
  Does not transcribe. Reverts to Healthy when the silencing source leaves / after
  one full round (methylation is cleared by your own Ligase or decays).
- *Mutated* — permanently corrupted by a Nuclease/Polymerase edit. Cannot
  transcribe, cannot be silenced (already broken), and **counts toward cancer**.
  Only a **Ligase** can repair a Mutated gene back to Healthy (representing DNA
  repair) — and only within a limited window (see below).

**RNA (mRNA / interfering RNA).** The workhorse and the game's central tension.
- *Movement:* up to 3 squares orthogonally (diffusion through cytoplasm). Slides;
  stops before a blocker.
- *Actions (choose one when it acts):*
  - **Translate → protein:** consume this RNA to create a protein of your choice
    on the RNA's square (subject to cost). This is how you build your army.
  - **Silence:** if the RNA ends its move **adjacent to an enemy gene**, that gene
    is Silenced while the RNA remains adjacent (antisense / RNAi knockdown).
  - **RNA interference:** if the RNA lands on an **enemy RNA**, it degrades it
    (removed). RNA-vs-RNA is the main way to fight the opponent's economy.
  - **Block:** simply occupying the square in front of an enemy gene stops that
    gene from transcribing (Phase 1) — no action needed, just position.
- *Fragility:* any enemy protein or enemy RNA that moves onto it degrades it.

**Nuclease (CRISPR‑Cas9).** Your primary offensive enzyme.
- *Movement:* diagonal, any distance (bishop). Threads between genes.
- *Action — MUTATE:* if it ends adjacent (orthogonally) to an enemy **Healthy or
  Silenced** gene, it edits that gene → **Mutated**. This is the move that wins
  games. High value → the opponent will hunt it with RNAi and Helicase.
- *Cost to build:* the most expensive protein (see costs) — you can't spam it.

**Polymerase.** Transport + secondary offense.
- *Movement:* straight lines, any distance (rook). The fastest way to relocate
  across the board.
- *Action:* on reaching an enemy gene it can **mutate** it (like a nuclease) but
  only if it started its move from your own half of the board (models processive
  replication needing a running start). Otherwise it's pure logistics — it can
  also *carry* a translation (translate an adjacent RNA on arrival).

**Methyltransferase.** The soft-control piece.
- *Movement:* one square any direction (king).
- *Action — SILENCE:* methylates an adjacent enemy gene → Silenced (reversible).
  Cheaper than a nuclease; sets up genes for later mutation or just chokes the
  enemy economy. A silenced gene is also easier to describe as "primed" —
  optional rule: a Nuclease mutating an already-Silenced gene needs no
  adjacency turn (instant).

**Kinase.** The tempo/combo piece.
- *Movement:* knight's L-shape, **jumps** over pieces (signal relays don't need a
  clear path).
- *Action — ACTIVATE:* target one friendly piece; it may immediately take a
  second action this turn (move+act again). Enables combos (e.g., activate a
  Nuclease for a double-mutate) at the cost of building and positioning the
  kinase. One activation per turn.

**Helicase.** Board control / defense.
- *Movement:* straight line up to 3, and it can move *into* an enemy piece to
  **push** it one square directly back (if the square behind is empty).
- *Action — DISPLACE:* knock an enemy Nuclease off its adjacency, break an RNA
  silencing lock, or shove a blocker away from your gene.

**Ligase.** Your repair crew / the reason you're not doomed.
- *Movement:* one square any direction (king).
- *Action — REPAIR:* if adjacent to one of your **Mutated** genes, restore it to
  Healthy — but only if that gene was mutated **within the last 2 of your turns**
  (fresh double-strand breaks are repairable; old lesions become fixed). Also
  clears Silencing instantly. Ligase is slow and short-ranged, so you can't just
  turtle behind it.

---

## 6. Expression costs (building proteins)

Translating RNA into protein costs **RNA**. You merge RNA to afford stronger
enzymes. When you translate, spend RNA equal to the cost; the protein appears on
the square of the last RNA spent (must be contiguous/adjacent RNAs).

| Protein | RNA cost | Rationale |
|---|---|---|
| Methyltransferase | 1 | cheap epigenetic control |
| Ligase | 1 | you need affordable repair |
| Kinase | 2 | powerful tempo |
| Helicase | 2 | board control |
| Polymerase | 2 | fast + situational offense |
| **Nuclease** | **3** | the win condition; must be earned |

> Costs are the primary balance dial. If offense dominates in playtests, raise
> Nuclease to 4 or add a "one Nuclease on the board at a time" rule.

---

## 7. Sample flow of a game

1. **Opening (turns 1–4):** genes transcribe; both players push RNA toward
   center. Early RNA is spent building a Methyltransferase or saved toward a
   Nuclease. Fight for the center files with RNAi.
2. **Midgame:** first Nucleases appear and make runs at the enemy back rank.
   Defenders answer with Helicase displacement, RNAi on the enemy's RNA supply,
   and Methyltransferase silencing to slow the opponent's engine.
3. **The mutation race:** each mutated gene is permanent unless repaired within 2
   turns, so tempo around the Ligase becomes decisive. Kinase combos (double
   mutate) can suddenly swing the count from 3 → 5.
4. **Endgame:** as a player nears 5 mutations they must choose between repairing
   (defense) and pushing their own attack. Cancer is a tipping point — once
   regulation collapses it collapses fast.

---

## 8. Open design questions (to resolve in playtesting)

1. **Transcription flooding.** Is "1 RNA per gene" enough, or does the board
   still clog? Alternative: genes transcribe only every *other* turn.
2. **First-move advantage.** Abstract games with a growing economy often favor
   the first player. Consider a pie rule, or player 2 starts with 1 free RNA.
3. **Is silencing too weak / too strong?** If silencing never converts to a win,
   it may feel pointless; the "primed gene = instant mutate" rule ties it back
   into the win condition — test with and without.
4. **Repair window.** 2 turns may make mutations too sticky or too erasable. Tune
   alongside Nuclease cost.
5. **Piece identity of proteins on the board.** Do proteins persist indefinitely,
   or should they also decay (denature) after N turns to keep the board moving?
6. **Draws / stalemate.** Add a turn limit → whoever has mutated *more* enemy
   genes wins; tie → the player with more Healthy genes.

---

## 9. Visual & art direction

- **Aesthetic:** David Goodsell's *Machinery of Life* watercolors — space-filling
  molecular blobs (clusters of overlapping spheres with dark ink outlines), a
  muted, desaturated cytoplasmic palette (olive greens, dusty blues, ochres,
  muted rose), and a crowded, hand-painted "cross-section of a living cell" feel.
  No neon, no gloss.
- **Board:** warm parchment/cytoplasm tiles in two muted earth tones rather than
  stark black/white.
- **Pieces:**
  - *DNA* — a short double-helix segment: two twisting strands of beads with base-
    pair rungs (cool teal backbone, ochre bases). Mutated genes show a jagged
    break and a rust-red lesion.
  - *RNA* — a single wavy strand of rose-colored beads.
  - *Proteins* — compact globular blobs, one muted hue per enzyme, each with a
    small contrasting "active-site" cleft.
- **Reference implementation:** `dna-chess.html` renders all of the above as
  self-contained SVG (deterministic, seeded molecule geometry) with a
  click-a-piece-to-see-legal-moves interaction.

---

*Status: v0.1 design draft — mechanics are internally consistent and playable on
paper, but all numbers (costs, thresholds, decay/repair windows) are
placeholders pending playtest.*
