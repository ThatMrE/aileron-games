# GeomeTree — Game Design Document (v0.1)

> **One-line pitch:** A learning game where geometry *evolves*. You build each
> form by tracing its edges — from a single line, up through the polygons and
> the Platonic solids, to a dodecahedron — and every form you complete grows a
> branch of your geometry tree.

---

## 1. Design pillars

1. **Geometry is a family tree.** Shapes aren't a flat menu — they *descend*
   from one another. A line begets polygons; polygons are the faces that fold
   into solids; the pentagon you learn in level 4 is literally the face of the
   dodecahedron you build in level 9. Progression *is* the lesson.
2. **Learn by constructing, not memorising.** You never read that "a cube has 12
   edges." You draw all twelve. The count, the structure and the symmetry are
   things your hands discover, not facts on a card.
3. **One verb, nine forms.** Every level uses the same action — *connect two
   vertices to draw the edge between them.* A single mechanic scales from a
   1-edge line to a 30-edge dodecahedron, so difficulty comes from the form, not
   from new rules.
4. **The tree is the score.** "Stack shapes to grow your tree" is the whole
   reward loop. Completing a form lights its node and grows the trunk one branch
   higher. The side panel is a living progress bar shaped like evolution itself.

---

## 2. The evolution ladder

Nine forms, ordered by increasing dimension and complexity. Each carries one
"fun fact" that is surfaced while you build it and again on completion — the
learning payload.

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
| 9 | Dodecahedron | 3D | 20 | 30 | The crown: 12 pentagons; Plato's shape for the cosmos. |

The arc: **1D → 2D polygons of rising order → 3D solids of rising complexity →
dodecahedron.** The pentagon (form 4) is deliberately taught before the
dodecahedron (form 9) so the player recognises its twelve faces.

---

## 3. Core mechanic — *trace the form*

- Each level presents the target form's **vertices** as glowing dots and its
  **edges** as faint dashed ghosts.
- **Click a vertex, then a neighbouring vertex** → the edge between them lights
  up. After a successful edge the second vertex stays selected, so you can
  *walk* around a polygon, tracing edge after edge.
- Clicking a non-adjacent vertex (no target edge, or one already drawn) simply
  re-anchors the trace — mistakes cost nothing.
- Complete **every** target edge → the form blooms (a burst ring; polygons fill
  with light) and a **Grow →** button advances you up the tree.

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
  — which yields exactly the right edges for the tetra (6), cube (12), octa (12)
  and dodeca (30). Dodecahedron vertices are generated from the classic
  golden-ratio coordinates.
- `?embed=1` strips the page chrome and reports its height to a parent, so the
  homepage can iframe just the board (same convention as DNA Chess).

---

## 6. Backlog / future forms

- **Net-folding view** — assemble a solid by folding its 2D net, making the
  face-count explicit.
- **Icosahedron** — complete the set of five Platonic solids (the dodecahedron's
  own dual).
- **Timed / fewest-clicks challenge** and a shareable "tree grown" card.
- **Star polygons & tilings** — a 2D branch of the tree (pentagram from the
  pentagon's diagonals).
