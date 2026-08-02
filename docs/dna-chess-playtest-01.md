# DNA Chess — Playtest Protocol 01 & v0.1 Break Analysis

> **Purpose:** a runnable first playtest of the v0.1 rules, plus a predicted list
> of what breaks, what's degenerate, and what will confuse players — derived by
> playing the opening out on paper and chasing the board geometry. Read this
> *before* the session so you know what to watch for; record what actually
> happens against the predictions.

Rules under test: [`dna-chess-design.md`](dna-chess-design.md) v0.1.

---

## Part 1 — The session

### Table setup & proxies
- 8×8 board (a chess board works). Row 8 = one player's genome, row 1 = the other's.
- **DNA:** 8 tokens per side on the back rank. You need a way to flip a gene to
  **Silenced** and to **Mutated** (two marker colors, or flip tiles).
- **RNA:** small cubes, one color per side.
- **Proteins:** distinct pieces/labels for Nuclease, Polymerase, Methyltransferase,
  Kinase, Helicase, Ligase.
- **Counters (flag these — see Break I/J):** you also need per-piece dials for
  **RNA decay age** (0–3) and **mutation age** (0–2) on every mutated gene. If
  that feels like a lot to track, that *is* a finding.

### Session goal
Answer three questions:
1. **Economy:** does expressing RNA ever involve a hard choice, or is RNA just
   always abundant?
2. **Win race:** can offense actually reach 5 mutations against a defender who
   is trying to stop it — and is the path legible?
3. **Decisions:** does each turn present a real choice, or is there an obvious
   best move / a stall / a solved rush?

Play **2–3 full games**, then run the four targeted probes below.

---

### Reference opening (both players follow this to a shared mid-game)

Play these moves literally, then go free. "A" = bottom player (genome row 1),
"B" = top (genome row 8). Files a–h.

| Turn | Phase 1 (auto transcription) | Phase 2 (the one action) |
|---|---|---|
| A1 | all 8 genes emit RNA onto **row 2** (a2–h2) | translate **f2+g2+h2 → Nuclease** on h2 |
| B1 | all 8 genes emit RNA onto **row 7** (a7–h7) | translate **a7+b7+c7 → Nuclease** on a7 |
| A2 | genes f,g,h re-emit onto row 2 (now refilled) | move Nuclease h2 → **d6** (diagonal), heading for B's genome |
| B2 | genes a,b,c re-emit | move Nuclease a7 → **e3**, heading for A's genome |
| A3 | (row 2 full → nothing transcribes) | translate 2 RNA → **Kinase**; keep pushing |
| B3 | — | move a piece to intercept A's Nuclease with RNAi |

> **Stop and record after A3/B3:** how many RNA are on the board? How many turns
> did it take to field a Nuclease? Did anyone ever *lack* the RNA to do what they
> wanted? (Predictions in Part 2.)

---

### Targeted probes (set up the position by hand, then play it out)

**Probe A — "The Opening Dump" (economy).** Just run Phase 1 for both sides once.
Count the RNA on the board. *Watch for:* an instant 8-wide wall on rows 2 and 7,
production wildly outrunning the 1-action-per-turn consumption, and RNA never
being scarce. → tests **Break A / systemic**.

**Probe B — "Can a lone Nuclease win?"** Give Player A a single Nuclease and an
undefended enemy genome. Try to mutate all 8 genes with just that one Nuclease.
*Watch for:* it stalls at **4 genes** and physically cannot reach the 5th. →
tests **Break D (the color trap)**. Then hand A a *second* Nuclease and see if
the win becomes reachable.

**Probe C — "Crossing no-man's-land."** Nuclease starts at d5 (center), Player B
has one Nuclease and two RNA free. Can A's Nuclease reach B's genome alive?
*Watch for:* fragile attackers dying mid-board, and whether the game trends
toward a **stall** where nobody can safely cross. → tests **Break L**.

**Probe D — "Repair race."** Set B's genome with **4 mutated genes** (ages fresh),
B has one Ligase behind them; A has a Nuclease adjacent + a Kinase ready.
Play 3 turns. *Watch for:* whether the Kinase **double-mutate** ends it instantly
(3→5 in one turn), or the Ligase can stabilize. → tests **Break F / repair-window
tuning**.

---

### Data to record (per game)
- Game length (turns); winner and margin (genes mutated : genes mutated).
- RNA-count curve (count on board after each side's turn for the first 5 turns).
- Proteins built, by type. (Predict: Nuclease + Kinase only; the rest ignored.)
- Total mutations vs total repairs.
- **Every time you had to invent a house rule mid-game** — each one is an
  ambiguity in the spec. Write down the exact situation.
- **Every turn where the best move was obvious** — shallow-decision signal.
- Fun, 1–5, plus the single most confusing moment.

---

## Part 2 — Predicted breaks (what to expect, and why)

Severity: **P0** = likely makes the game not work / not fun. **P1** = distorts
strategy or confuses. **P2** = friction/polish.

### P0 — the economy inverts the intended tension

**Break A — Production outruns consumption ~8:1, so RNA is never scarce.**
Phase 1 fires *all 8 genes every turn*, but Phase 2 lets you take *one* action.
Turn 1 you get 8 RNA and spend at most 3. RNA piles up against the per-gene cap
as a full wall. The whole cost/expression layer — meant to force "offense or
defense with a scarce resource?" — never bites, because you always have plenty.
*Consequence:* the game's central decision evaporates; costs are cosmetic.
→ *Watch:* Probe A. → *Fix:* v0.2 change #1 (regulate expression to 1 gene/turn).

**Break B — The transcription cap is ill-defined and exploitable.**
"1 RNA per gene" but RNA moves away from its gene. Once it slides one square, is
the gene free to fire again? If yes, you pump 2, 3, … RNA from one gene by
nudging the front one aside each turn — the only real limiter is "is the square
directly in front empty," which back-rank geometry makes trivial to clear.
The cap doesn't cap. *Consequence:* confusing bookkeeping that doesn't constrain.
→ *Fix:* replace with a flat **global RNA cap per side** (v0.2 #2).

### P0/P1 — the win condition has a hidden geometric wall

**Break D — A lone Nuclease can mutate at most 4 of the 8 genes. It literally
cannot win.**
The Nuclease moves like a **bishop**, so it is **locked to one square color** for
its entire life. To mutate a gene it must stand **orthogonally in front of it**,
on the square directly ahead (the side squares stay occupied by the neighboring
genes, which remain on the board even when mutated). Those front squares
**alternate color** across the 8 files — so a single color-bound Nuclease can only
ever reach the front of **4 genes** (every other file). Five is the win number.
*Consequence:* a player rushes a Nuclease, mutates 4 genes, and then discovers —
with no explanation the rules ever gave them — that the 5th is unreachable
without a *second, opposite-colored* Nuclease or a rook-moving Polymerase. This
reads as a bug, not depth. → *Watch:* Probe B. → *Fix:* v0.2 #3 — let the
Nuclease mutate **any adjacent gene, diagonals included**; a diagonally-adjacent
front square is the opposite color, so with king-adjacency one Nuclease can reach
all 8. (State it as one line: "a Nuclease edits an enemy gene in any of the
squares touching it.")

### P1 — degenerate lines & dead pieces

**Break F — Kinase double-action enables a 3→5 sudden-death swing.**
A Kinase grants a friendly piece a second action. Set up two adjacent-ish target
genes and one activation converts a 3-mutation position to 5 (a win) in a single
turn with little counterplay. Combined with Break D, the Kinase combo is quietly
the *actual* win route — non-obvious, and it makes the Nuclease look like the win
piece when it isn't. → *Watch:* Probe D. → *Fix:* cap one activation/turn (already
intended), forbid activating another Kinase, and test a variant where the granted
second action **cannot be a mutate**.

**Break E — Silencing is probably a dead mechanic.**
Both silencing tools (RNA adjacency, Methyltransferase) require parking a piece
right next to the enemy back rank — the most dangerous square on the board — for
a *reversible, non-scoring* effect (silenced genes don't count toward cancer).
The reward (stop a gene transcribing) barely matters once RNA is already abundant
(Break A). *Consequence:* Methyltransferase and RNA-silence get ignored; a third
of the "kit" is inert. → *Watch:* Probe... it just won't come up. → *Fix:* give
silencing teeth (e.g., only *silenced* genes can be mutated, making silence a
required setup) **or** cut Methyltransferase from v0.2 to simplify, and add it
back only if the game feels too shallow.

**Break C — Polymerase's "must have started this move in your own half" is
fiddly and overlaps the Nuclease.**
It adds hidden state ("where did this piece start?") and creates the unintuitive
rule that a Polymerase parked in enemy territory can *never* mutate until it
retreats. Two different mutating pieces with a subtle conditional difference will
blur together. → *Fix:* make Polymerase pure transport (drop its mutate) or give
it a non-overlapping job (e.g., duplicate/escort RNA).

### P1 — spatial rules that fight the player

**Break L — The mid-board is a killing field; risk of stall.**
RNA and freshly-arrived proteins are fragile, and the center is contested by both
Nucleases + RNAi. Getting an attacker across alive may be so hard that both sides
wall up and nobody commits → draws / stalling. The turn-limit tiebreak exists but
a game that *ends on the tiebreak by default* isn't working. → *Watch:* Probe C.

**Break G — Your own defenders throttle your own economy.**
Transcription is blocked if the front square is occupied by *anything*, including
your own pieces. So parking a Ligase in front of your gene to defend it also
**shuts that gene off**. That may be nice tension or may just feel bad/confusing.
Decide explicitly whether friendly pieces block transcription. → *this is an
ambiguity to resolve, not a fix.*

### P2 — bookkeeping & timing friction

**Break I — Per-RNA decay timers are heavy and easily gamed.**
Tracking a 0–3 counter on every RNA is a lot for a physical game, and you can
reset it by nudging the piece one square every third turn, so it mostly punishes
forgetfulness. → *Fix:* drop it; use the flat RNA cap (v0.2 #2).

**Break J — Ligase's "mutated within the last 2 turns" needs a timestamp on every
lesion.** More hidden counters, and the attacker must remember each gene's age.
→ *Fix:* simplify to a positional rule — e.g., a Ligase can repair a mutated gene
*only while no enemy piece is adjacent to it* (repair under fire is blocked),
which needs no counter.

**Break H — "Move + optional action" timing needs to be explicit.** Can a piece
already adjacent act **without moving**? Can a just-translated protein act the
same turn? State both (recommended: yes to stationary action; no to same-turn
action for a freshly-built piece).

**Break K — First-player advantage is amplified** by the turn-1 dump: P1 builds
and commits a Nuclease a full tempo ahead. → *Fix:* pie rule, or P2 starts with
1 free RNA / places second.

---

## Part 3 — v0.2 patch to try if the session confirms the above

A minimal change set that targets the P0/P1 breaks without redesigning the game.
Run the *same* protocol against it and compare.

1. **Regulated expression (fixes A, K).** Remove the automatic all-genes tick.
   Instead, **"express a gene" is one of your action choices**: place 1 RNA in
   front of a chosen active gene. Now RNA is scarce, every turn is a real choice,
   and it's *more* biologically apt (regulated gene expression). This is the
   single highest-leverage change — test it first, even alone.
2. **Flat RNA cap 6 per side; delete decay timers (fixes B, I).**
3. **Nuclease mutates any *adjacent* gene, diagonals included (fixes D).**
   One color-unbound line of text; one Nuclease can now threaten all 8.
4. **Polymerase = pure transport (fixes C).** No conditional mutate.
5. **Cut Methyltransferase for the test (addresses E).** Fewer moving parts;
   re-introduce silencing with teeth only if the game feels shallow.
6. **Ligase repair is blocked while an enemy piece is adjacent to the lesion
   (fixes J).** No timestamps.
7. **Kinase:** one activation/turn, can't target a Kinase; test with and without
   "granted action can't be a mutate" (F).
8. Decide **friendly-piece-blocks-transcription** yes/no (G) and the **stationary
   / same-turn action** timing (H); write the answer into the rules.

**Hypothesis for v0.2:** with expression regulated to one gene per turn, RNA
becomes the real currency, the offense/defense choice returns, the Nuclease
becomes a legible win weapon, and the piece count drops enough that a new player
can hold the whole game in their head. If it then feels *too* thin, add silencing
back (with teeth) and the Helicase mind-games — but only then.

---

## Part 4 — On expanding the board

A bigger board is tempting (more lives, more room to maneuver), but it's worth
being precise about *what it does and doesn't fix*, because it interacts with the
breaks above.

**What expanding helps:**
- **Maneuvering room.** 8×8 is cramped once both back ranks wall up. A 10×10 or
  12×12 gives bishops/knights room and reduces early gridlock. This is the real
  benefit.
- **Epic feel / more lives.** More genes = a longer, higher-stakes race. Win
  threshold scales with "more than half": **10 genes → 6 to win, 12 → 7.**

**What expanding does *not* fix (and may worsen):**
- **The color trap (Break D) is size-independent.** A bishop is color-bound at
  any size, and the genes' front squares always alternate color — so a lone
  Nuclease still reaches only *half* the genes (5 of 10, 6 of 12) and stays one
  short of the win. Expanding doesn't help; the king-adjacency fix is still
  required.
- **The economy flood (Break A) gets *worse*.** A 10–12 wide genome dumps an even
  bigger RNA wall per tick. Board size only becomes readable *after* expression is
  regulated (v0.2 #1).
- **The mid-board killing field (Break L) gets *worse*.** A bigger board means a
  *longer* crossing, so fragile attackers are exposed for more turns → more
  stalling and more attrition, not less. "Room to breathe" can backfire into "no
  one can safely commit." If you expand, plan to pair it with something that helps
  attackers survive the crossing (e.g., Helicase escorts, or terrain — see below).

**Recommendation:** don't change the board size to fix the current problems — fix
the *rules* first (regulate expression + king-adjacency mutate on the standard
8×8), because you can't feel the right board size while the economy is inverted.
*Then*, if it plays cramped, scale up deliberately:
- **10×10, 10 genes, win at 6** is the natural "more epic" step — modest, keeps
  the math clean.
- **12×12, 12 genes, win at 7** only if games are running short and you want a
  marathon.

**If the real goal is a more interesting middle** (rather than just size), consider
**structured terrain instead of a bigger empty board**: a few fixed features in the
cytoplasm — e.g., **ribosome tiles** (translating RNA there is cheaper), a
**nuclear-pore chokepoint** each attacker must pass, or **membrane cover** squares
where fragile pieces can't be captured. That adds decisions to the middle without
lengthening the deadly crossing.

---

*Companion to the v0.1 design doc. Findings here are analytical predictions from
paper play; the point of the session is to confirm, refute, or reprioritize them
with real players.*
