# GeomeTree — Game Design Document (v0.4)

## 0. Narrative frame — a Flatland RPG

The mechanics sit inside a story, told RPG-style through text. You are a
two-dimensional creature (a nod to *Flatland*) who lives in the **World-Tree**,
a structure whose branches thread every dimension and whose leaves are all that
lives. The Tree is **dying** — a rot spreads dimension to dimension — and only
building **form** can heal it. Each stage is a branch / a dimension you restore.

- **Prologue** (typewriter story modal on first play): the premise above.
- **Per-stage narration**: every form shows a chapter label and a short in-character
  beat in a dedicated story panel, above the (kept) geometry "field note".
- **Act transitions** (full-screen story beats): **II · Flatland** (the triangle
  closes and the plane returns), **III · The Ascent** (folding a point *up* into
  depth — 3D), **IV · The Rot** (the enemies: *imaginary planes* that breed rot in
  Euclidean space; from here, building is battle). The crown hints at the 4th
  dimension and time.
- **Epilogue**: the rot breaks, and the one thing worth saving — the **seed, a
  single point** — is carried down and replanted, looping the game (the replay
  button is "Replant the seed").

Acts map onto the **thirteen** forms: I Awakening (line) · II Flatland
(triangle→hexagon) → **II The Crooked** (irregular pentagon, concave dart) ·
III The Ascent (tetra→octa) · IV The Rot (icosahedron) · V The Crown
(dodecahedron) · VI The Fourth Dimension (tesseract).

### The Crooked — non-regular polygons (irregular pentagon, concave dart)
Between the regular 2-D shapes and the ascent to 3-D, the rot *warps* two branches:
an **irregular** (scalene) pentagon — same rules, no symmetry — and a **concave
dart** with a reflex angle that dents inward. They teach that a polygon need not be
regular, and that every solid ahead is built only from *convex* faces.

### The Rot — enemy encounter (icosahedron, dodecahedron, tesseract)
On these high branches the enemies are real: **imaginary planes** (red shards)
drift around the form and, on a timer, **strike a placed edge and un-draw it**
(a red flash, a corruption counter, a "⚠ The Rot" badge). You cannot kill what is
imaginary — you *out-build* it: complete the form before it comes apart. The
strike telegraphs (a shard brightens and reaches toward the shape), and the
interval tightens act by act (4.0s → 3.6s → 3.2s), so it stays winnable while
pressuring your time score. Completing the form banishes the planes.

### Time-skills — fighting the Rot through time
On the Rot stages the Tree grants two **temporal skills** (the "highest levels use
skills that move through time"), shown in a skill bar:
- **Rewind** (`Z`) — instantly restores every edge the Rot has corrupted (turning
  back time on the decay); 8-second cooldown, a cyan time-ripple. It can even seal
  the form outright.
- **Freeze** (`F`) — halts the Rot for 5 seconds (the imaginary planes hold, tinted
  cyan, and stop striking); 12-second cooldown.
Corrupted edges are tracked so Rewind knows what to restore; manually redrawing a
corrupted edge also repairs it. The skills make the encounter a real push-pull
rather than a race.

### The 4th dimension — the tesseract (final form)
The finale is a genuine 4-D stage: the **tesseract** (16 vertices, 32 edges) is
stored in 4-D coordinates and projected **4-D → 3-D → 2-D** — rotating through the
`xw` and `zw` planes each frame so it folds inside-out (the classic cube-in-a-cube
shadow), then through the normal 3-D view you can drag. You trace the shadow of a
four-dimensional object. It is also the fiercest Rot encounter, at the source of
the blight, and where the seed is finally recovered.

---

# GeomeTree — Game Design Document (earlier notes, v0.3)

> **One-line pitch:** A learning game where geometry *evolves*. You build each
> form by tracing its edges — from a single line, up through the polygons and
> all five Platonic solids, to a dodecahedron — and every form you complete grows
> a branch of your geometry tree, in a synesthetic, audio-reactive build inspired
> by *Tetris Effect*. Finish a form and it **unrolls flat and replays your path
> for points** — up to 1000 per stage.

---

## 1. Design pillars

1. **Geometry is a family tree.** Shapes aren't a flat menu — they *descend*
   from one another. A line begets polygons; polygons are the faces that fold
   into solids; the pentagon you learn in level 4 is literally the face of the
   dodecahedron you build in level 9. Progression *is* the lesson.
2. **Learn by constructing, not memorising.** You never read that "a cube has 12
   edges." You draw all twelve. The count, the structure and the symmetry are
   things your hands discover, not facts on a card.
3. **One verb, ten forms.** Every level uses the same action — *connect two
   vertices to draw the edge between them.* A single mechanic scales from a
   1-edge line to a 30-edge dodecahedron, so difficulty comes from the form, not
   from new rules.
4. **The tree is the score.** "Stack shapes to grow your tree" is the whole
   reward loop. Completing a form lights its node and grows the trunk one branch
   higher. The side panel is a living progress bar shaped like evolution itself.
5. **The build is synesthetic (a *Tetris Effect* nod).** Play is audiovisual, not
   silent. Each edge you draw fires a particle burst and plays the next note of a
   rising pentatonic; completion blooms a shower, a chord and a colour wash. Every
   form owns a **hue zone** — the palette journeys cyan → violet as you evolve —
   and the whole soundtrack climbs in key form by form, so finishing the tree
   *feels* like an ascent.
6. **Completing a form is a payoff, not just a checkmark.** On success the shape
   **unrolls into 2D** and the game **replays the exact path you drew**, vertex by
   vertex, tallying points — rewarding speed and clean, non-repetitive tracing.

---

## 2. The evolution ladder

Ten forms, ordered by increasing dimension and complexity. Each carries one
"fun fact" that is surfaced while you build it and again on completion — the
learning payload. Forms 6–10 are the **complete set of five Platonic solids**.

| # | Form | Dim | V | E | Teaching beat |
|---|------|-----|---|---|---------------|
| 1 | Line | 1D | 2 | 1 | The shortest path between two points; the atom of every later shape. |
| 2 | Triangle | 2D | 3 | 3 | The only rigid polygon — why trusses and bridges are triangulated. |
| 3 | Square | 2D | 4 | 4 | Tiles the plane with no gaps. |
| 4 | Pentagon | 2D | 5 | 5 | Hides the golden ratio φ; foreshadows the finale's faces. |
| 5 | Hexagon | 2D | 6 | 6 | Nature's most efficient tiling — honeycomb. |
| 6 | Tetrahedron | 3D | 4 | 6 | The first solid; simplest Platonic solid. |
| 7 | Cube | 3D | 8 | 12 | Euler's formula V − E + F = 2 appears (8 − 12 + 6). |
| 8 | Octahedron | 3D | 6 | 12 | The cube's dual — swap faces for corners. |
| 9 | Icosahedron | 3D | 12 | 30 | The most faces of any Platonic solid; the dodecahedron's dual (and many virus shells). |
| 10 | Dodecahedron | 3D | 20 | 30 | The crown: 12 pentagons; Plato's shape for the cosmos. |

The arc: **1D → 2D polygons of rising order → 3D solids of rising complexity →
dodecahedron.** The pentagon (form 4) is deliberately taught before the
dodecahedron (form 10) so the player recognises its twelve faces. Vertex count
rises monotonically across the solids (4 → 8 → 6… → 12 → 20); the icosahedron
sits just before its dual, the dodecahedron, so the duality lands right as the
tree crowns.

---

## 3. Core mechanic — *trace the form*

- Each level presents the target form's **vertices** as glowing dots and its
  **edges** as faint dashed ghosts.
- **Click a vertex, then a neighbouring vertex** → the edge between them lights
  up. Each edge is drawn **one at a time**: after a successful edge the selection
  clears, so no vertex auto-repeats as the start of the next edge — you pick a
  vertex, then a neighbour, for every edge. A vertex can never connect to itself,
  and an edge can never be drawn twice. (Solids still require passing *through* a
  vertex more than once across separate edges — the tetra…dodeca have no
  single-stroke path — but each individual edge is its own deliberate act.)
- Clicking a non-adjacent vertex (no target edge, or one already drawn) simply
  re-anchors the trace to that vertex — mistakes cost nothing.
- Complete **every** target edge → the form blooms (a burst ring, a particle
  shower, a colour wash and a resolving chord) and a **Grow →** button advances
  you up the tree.

### Synesthetic feedback (the *Tetris Effect* layer)
- **Colour zones.** Each form owns a hue on a cyan→violet journey; edges,
  vertices, the ambient nebula glow, drifting motes, particles and the tree
  thumbnails all take that hue, so evolving the tree reads as moving through
  zones.
- **Particles & pulse.** Placing an edge fires a hue-tinted burst at its midpoint;
  completion fires a full shower from the centre. An ambient glow and the vertices
  breathe on a ~90 BPM beat.
- **A rising soundtrack.** Every placed edge plays the next note of a major
  pentatonic (never dissonant), so tracing a form *is* a little ascending melody;
  completion arpeggiates a major chord with a low bloom. The musical key climbs
  form by form (G3 → G4 across the ten), and audio initialises on the first click
  (respecting autoplay) — a **Sound** toggle mutes it.

### Score reveal (unroll + path replay)
On completion the game runs a short reveal, then shows the score with the **Grow →**
button (click/tap or Enter/Space skips straight to the score):
- **Unroll to 2D.** The completed wireframe animates flat: every vertex eases onto
  an even circle laid out in the vertices' angular order. This guarantees a clean,
  overlap-free 2D figure for any form (a 3D solid "unrolls" into a flat ring of its
  vertices; a polygon barely moves, since it is already circular).
- **Path replay.** A glowing marker retraces the **exact order the player drew the
  edges**, lighting each vertex as it arrives and sparking a burst + a soft
  pentatonic tick — literally "drawing the path the player took from vertex to
  vertex."
- **Scoring — 1000 points per stage.** As the path replays, a **base of 500**
  accrues (each vertex is a share of points). Then a **time bonus of up to 500** is
  added — the faster you traced (par ≈ 1 second per edge), the higher — and **50
  points are deducted per repeated-edge attempt** (clicking to redraw an edge
  already drawn). `stage = clamp(500 + timeBonus − 50·repeats, 0, 1000)`. Stage
  scores sum into a running total shown in the tree panel and on the victory
  screen, persisted to `localStorage`.

### 3D forms
- Solids render as **depth-shaded wireframes** — nearer edges brighter and
  thicker — projected from real 3D coordinates.
- On entering a 3D level the solid does a one-turn **reveal spin**, then settles.
  **Drag** to rotate it yourself; a **Spin** toggle re-enables gentle
  auto-rotation. Hit-testing always uses the live projected vertex positions, so
  clicking works whether the solid is still or turning.

### The tree panel
- A vertical ladder (root at the bottom, crown at the top) with a wireframe
  thumbnail per form. **Completed** nodes are lit and connected by a glowing
  branch; the **current** node pulses; **future** nodes are dim. Progress is
  saved to `localStorage`, so the tree keeps growing across visits.

---

## 4. Why the mechanic teaches

- **Vertices, edges, faces become tangible.** You feel that a hexagon is "one
  more side than a pentagon," and that a dodecahedron is *made of* the pentagon
  you already know.
- **Counting by doing.** The edge counter (`n / total`) turns "how many edges
  does a cube have?" into something you watch tick to 12.
- **Dimensional intuition.** Watching a flat pentagon give way to a solid you can
  spin makes the jump from 2D to 3D physical rather than abstract.

---

## 5. Technical notes

- Single self-contained `geometree.html` — HTML canvas, no dependencies, matches
  the Aileron cyan/dark house style (Orbitron / Inter / Space Mono).
- 2D forms use explicit perimeter edges; 3D solids derive their edge set
  automatically by connecting every vertex pair at the minimum pairwise distance
  — which yields exactly the right edges for the tetra (6), cube (12), octa (12),
  icosa (30) and dodeca (30). Icosahedron and dodecahedron vertices are generated
  from the classic golden-ratio coordinates.
- Particles and motes are lightweight canvas primitives drawn with additive
  (`lighter`) compositing; audio is synthesised live with the Web Audio API
  (oscillators + gain envelopes) — no asset files.
- `?embed=1` strips the page chrome and reports its height to a parent, so the
  homepage can iframe just the board (same convention as DNA Chess).

---

## 6. Backlog / future forms

- **Net-folding view** — assemble a solid by folding its 2D net, making the
  face-count explicit.
- **Duality mode** — morph a solid into its dual (cube↔octahedron,
  dodecahedron↔icosahedron) by turning faces into vertices on screen.
- **Timed / fewest-clicks challenge** and a shareable "tree grown" card.
- **Star polygons & tilings** — a 2D branch of the tree (pentagram from the
  pentagon's diagonals).
