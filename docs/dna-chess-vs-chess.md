# DNA Chess vs. Chess — ruleset comparison, simplification verdict & UI adoption

Reference pass over popular chess and chess-family games to answer two questions:
**(1) how far has DNA Chess drifted from "chess-simple", and does it need trimming?**
and **(2) which chess-emulator UI/UX conventions should the board adopt?** (The UI
answer is already implemented — see the last section.)

---

## 1. How DNA Chess maps onto chess

The movement vocabulary is deliberately chess: each enzyme is a chess piece.

| Chess piece | Moves | DNA Chess piece | Same movement? |
|---|---|---|---|
| Bishop | diagonals | **Nuclease** | ✅ diagonal slider |
| Rook | ranks/files | **Polymerase** | ✅ orthogonal slider |
| King | 1 any dir | **Ligase**, Methyltransferase | ✅ 1-step |
| Knight | L-jump | **Kinase** | ✅ jumps |
| Queen | any line | *(none)* | — |
| Pawn | forward | **DNA** (emits RNA forward) / RNA (short slider) | partial |

So *movement* is chess-legible. The divergence is everything **around** movement.

---

## 2. Where it diverges — and what popular variants teach

| Dimension | Standard Chess | **DNA Chess (v0.3)** | Nearest variant precedent |
|---|---|---|---|
| Piece types | 6 | **8** (DNA, RNA, 6 enzymes) | Shogi (8), Hive (5) |
| Getting your army | fixed at setup | **built in play** via RNA economy | Shogi *drops* — but that's **one** rule |
| Capturing | move onto any enemy | only enemy **RNA**; proteins persist, Helicase *displaces* | Arimaa (push/pull, no capture) |
| Turn | 1 move | **2 actions** + Kinase bonus | Arimaa (4 steps) |
| Win | checkmate (1 target) | **mutate 6 of 10 genes** (majority race) | Reversi/Go (majority/territory) |
| Economy | none | **RNA cap, clusters, translation cost, ribosome discount** | deck/eurogames — *not* chess |
| Terrain | none | **3 organelles** (ribosome/ER/Golgi) w/ 3 effects | Xiangqi river & palace |
| Piece state | none | healthy / **silenced** / mutated | — |

**Lessons from the variants:**
- **Shogi** proves mid-game piece acquisition is fine *when the acquisition rule is a single line* ("drop a captured piece"). DNA Chess acquisition is a **multi-step pipeline** (express → grow a cluster → translate → pay cost → maybe a ribosome). That's the heaviest single departure.
- **Xiangqi** shows terrain works when effects are **few and memorable**. Three organelles with three different effects sits right at the ceiling.
- **Onitama / Checkers / Hive** show depth doesn't need many piece types or systems — 1–5 pieces with **one rule each** stay deep and teachable.
- **Arimaa** is the cautionary tale: multi-step turns + pushing were *designed* to be hard to compute and are genuinely hard to **learn**. DNA Chess shares those exact traits (2+ actions, Helicase shoves).

---

## 3. Complexity audit (onboarding cost)

Count the independent systems a first-time player must hold in their head:

- **Chess:** 6 move patterns · capture-by-moving · check/checkmate · (castle/e.p./promotion). ≈ **1 core loop**, learnable in minutes.
- **DNA Chess:** 8 move patterns · 6 distinct *actions* · capture-only-RNA · the RNA **economy** · 3 **terrain** effects · 3 gene **states** + silencing · **2 actions/turn** + Kinase bonus · trap/repair timing · majority win. ≈ **9 systems**.

**Verdict: yes — it needs a simpler on-ramp.** DNA Chess has quietly become an
RTS/eurogame hybrid wearing a chess coat. That's not fatal (Shogi and Arimaa are
complex and loved) — but nothing about the *current* rules lets a newcomer start
small. The two highest-leverage fixes are **(a) UI legibility** and **(b) a Core
ruleset** that defers the advanced systems.

---

## 4. Recommendation — a "Core" game, with the rest as opt-in modules

Keep the full v0.3 as **Advanced**; add a **Core DNA Chess** that a chess player
picks up in five minutes:

**Core (teach in 5 min)**
- 10 genes, **win at 6** mutations. ✅ keep
- **1 action per turn** *(drop the 2-action + Kinase bonus in Core — this removes the swingiest, least-chesslike element)*.
- Actions: **Express · Move · Translate · Mutate · Repair**.
- Enzymes: **Nuclease (attack, bishop), Ligase (repair, king), Helicase (defend, rook-ish)** — 3 pieces, one job each.
- **Flat board** (no organelles). **No silencing.** Repair = restore any freshly-mutated gene.
- Translation kept but flattened: Nuclease = 3 RNA, others = 2.

**Advanced modules (toggle on once Core clicks)**
- Organelle terrain (ribosome / ER / Golgi)
- 2 actions/turn + **Kinase** combos
- **Polymerase** transport, **Methyltransferase** silencing
- Golgi traps, unguarded-only repair

This is the single most impactful change and maps cleanly onto the existing
engine (a mode flag that hides terrain, forces `ACTIONS_PER_TURN = 1`, and limits
the buildable/enemy protein set).

**Smaller simplifications worth making regardless:**
1. **Cut silencing** (or make it *matter* — e.g. only a silenced gene can be mutated). Today it's a positional side-effect most players never use. → *cut in Core.*
2. **Kinase bonus action** is the main "gotcha" that makes turns swingy and hard to read. → *Advanced-only.*
3. **"Repair only an unguarded lesion"** is a subtle timing rule. → In Core, "repair any mutated gene" (still 1 action) is plenty.
4. **Unify the verbs** — every action is already "select a molecule → click a highlighted square." Keep it that way; never add an action that needs a menu the board can't show.

---

## 5. UI/UX adopted from chess emulators (implemented)

The board now follows the same visual grammar as Lichess / Chess.com, so the
complex rules at least *read* like chess — kept in the David Goodsell palette:

- **Legal-move dots** — a dot on every empty square you can move to (indicates
  reach/distance the way a rook's file of dots does).
- **Capture/action rings** — a thick ring hugs any *molecule* you can act on,
  colour-coded by action (mutate = red, degrade = red, repair = green, activate =
  blue, shove = amber). Dot = move, ring = act — exactly the chess dot/ring split.
- **Selected-square highlight** + **last-move highlight** — the selected square
  and the from/to of the last move stay tinted, like every online board.
- **"Check" highlight** — a red radial glows under any gene an enemy Nuclease is
  poised to mutate next turn (the king-in-check cue), and the board frame pulses
  when you're one gene from cancer.
- **Board coordinates** — rank numbers (1–10) down the left, file letters (a–j)
  along the bottom, embedded in the squares.
- **Hover indicator** — hovering a legal destination outlines the square.

Net effect: movement and threats are now readable at a glance, which is the
cheapest 80% of "make it feel like chess." The Core ruleset above is the other
20% — recommended as the next build.

---

*Companion to `dna-chess-design.md` (v0.1 spec) and `dna-chess-playtest-01.md`
(break analysis). The playable board is the full/Advanced v0.3; "Core" is a
proposed mode, not yet built.*
