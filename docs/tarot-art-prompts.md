# Wetware Arcana — image-model prompts for all 78 cards

Copy-paste prompts for Midjourney (v6/v7) or any comparable model, one per card.
Written to match the deck defined in [`tarot-design.md`](./tarot-design.md) and drawn
procedurally in `tarot.html` — same archetypes, same suits, same biopunk logic, but
rendered as painted illustration instead of generated SVG.

---

## How to use these

**Every prompt already ends with the house suffix:**

```
--ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

`--style raw` keeps Midjourney from prettifying the compositions into generic fantasy
art; `--s 300` leaves some stylisation but not enough to wander. Drop `--no text` only
if you *want* garbled pseudo-lettering as texture.

**Two useful aspect ratios:**

| Use | Ratio | Why |
|-----|-------|-----|
| Full card, borders and all | `--ar 2:3` | Standard tarot proportion. Model invents its own frame. |
| Art window only | `--ar 17:20` | Matches the 272 × 320 art window in `tarot.html`, so generated art drops straight into the app's existing frame, name plate and barcode. |

Swap the ratio in the suffix. For the second option, add `full bleed, no border, no frame`
to the prompt — the card furniture is already drawn in code.

**Making 78 cards look like one deck.** Generate a few majors first, pick the single
best image, then append its style reference to every subsequent prompt:

```
--sref <url-or-id> --sw 100
```

Do the same with `--cref` on the recurring hooded technician (they appear in the
Cleanroom, Cryostasis, the Dependency, and all sixteen court cards) so it reads as one
person across the deck. Reuse `--seed` when you want variations of one card rather than
a new idea.

**The four suit props** — keep these identical across all 56 minors, or the suits stop
reading as suits:

- **Plasmid rod** — a slender living rod tipped with a luminous circular DNA loop, budding smaller loops along its length
- **Culture flask** — a heavy Erlenmeyer flask of glowing broth, condensation on the glass, foil cap
- **Nuclease blade** — a surgical blade with a guide-RNA filament threaded through the spine, ring pommel
- **Organ** — a perfused organ in a glass case, cannula tubes and clamps, faintly pulsing

**Palette per suit** (or pick one deck-wide medium from the eight in the app):

- Majors — cyan and teal on deep black, bioluminescent
- Plasmids — amber and magenta, hot
- Cultures — jade and pale cyan, wet
- Nucleases — ice blue and violet, cold
- Organs — oxblood, bone and rust, warm

---

## Major arcana

**0 · The Unsequenced** *(The Fool)*
```
Biopunk tarot card. A hairless young figure in a paper hospital gown steps off the edge of a stainless steel lab bench into a field of white static, arms open, unbothered. Behind them one unread DNA strand dissolves into pixel noise. A small lab beagle in a plastic cone collar at their heels. Cold morning light through cleanroom glass, cyan bioluminescent linework on deep black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**I · The Splicer** *(The Magician)*
```
Biopunk tarot card. A masked technician stands at a black bench, one gloved hand raised holding a glowing guide-RNA filament like a wand, the other pointing down at an open petri dish. Laid on the bench: a plasmid rod, a culture flask, a nuclease blade, a perfused organ in glass. A lemniscate of double helix hovers above their head. Cyan and teal glow, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**II · The Ribosome** *(The High Priestess)*
```
Biopunk tarot card. A veiled figure seated between two pillars built from stacked ribosomal subunits, one matte black one bone white. An mRNA ribbon runs across their lap like an unrolled scroll; behind the veil a growing peptide chain of pearls curls upward. A crescent-shaped cell nucleus rests at their feet. Still, cold, cyan on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**III · The Bioreactor** *(The Empress)*
```
Biopunk tarot card. A pregnant figure enthroned inside a glass stirred-tank fermenter, crowned with twelve rising bubbles, robed in wheat and mycelium. Amber culture broth to her waist, the impeller turning slowly beneath, condensation beading on the curved glass. Warm gold bleeding into teal, lush and fertile, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**IV · The Patent Holder** *(The Emperor)*
```
Biopunk tarot card. An armoured executive seated on a throne welded from filing cabinets and cryogenic freezer drawers, holding a sealed chromosome as a sceptre and a stamped certificate as an orb. Ram-skull finials at the throne corners. A vault door stands closed behind them. Hard institutional steel, cyan on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**V · The Ethics Board** *(The Hierophant)*
```
Biopunk tarot card. Three masked committee members seated in a raised arched review chamber, looking down at two researchers kneeling below with open protocol binders. Crossed pipettes carved into the stone. A heavy approval stamp rests on the bench. Institutional stone and brushed steel, cold overhead light, cyan on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**VI · The Chimera** *(The Lovers)*
```
Biopunk tarot card. Two nude figures of visibly different tissue, one pale one dark, fused along a single glowing seam running down the centre of the image. Above them an enormous winged macrophage spreads its pseudopods in place of an angel. Behind one, a tree of grafted branches; behind the other, a serpent of transfected virus. Cyan and rose, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**VII · The Vector** *(The Chariot)*
```
Biopunk tarot card. An armoured rider stands in a chariot built from a bacteriophage, its tail fibres splayed as wheels, drawn by two icosahedral capsids, one black one white. A sealed payload canister is strapped to the rider's chest. A city of incubator towers recedes behind. Forward momentum, cyan on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**VIII · The Immune System** *(Strength)*
```
Biopunk tarot card. A calm figure gently closing the jaws of an enormous macrophage with bare hands, unhurried, almost tender. A lemniscate floats above her head; antibody blossoms are woven into her hair; the beast's pseudopods curl and slacken. Warm light against cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**IX · The Cleanroom** *(The Hermit)*
```
Biopunk tarot card. A hooded figure alone in a positive-pressure cleanroom, holding up a UV lamp containing a single point of star-white light. Sterile air fogs cold around them, footprints press into a tacky floor mat, one long shadow reaches the far wall. Empty, quiet, cyan on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**X · The Centrifuge** *(Wheel of Fortune)*
```
Biopunk tarot card. A vast centrifuge rotor hangs in the sky, sample tubes racked around its rim, density-gradient bands glowing as spokes. At the four corners of the card, four creatures read the wheel: a sphinx-mouse, a winged fly-cherub, an eagle-phage, a bull-cell. Motion blur at the rim, cyan and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XI · The Proofreader** *(Justice)*
```
Biopunk tarot card. An enthroned figure holds an upright nuclease blade in one hand and a balance made from two petri dishes in the other. Behind the throne a colossal DNA strand runs floor to ceiling with a single scarlet mismatched base being excised from it. Symmetrical, severe, cyan on black with one red accent, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XII · Cryostasis** *(The Hanged Man)*
```
Biopunk tarot card. A figure suspended upside down by one ankle inside a vertical vitrification pod, the other leg crossed behind, face perfectly calm. A halo of frost crystals rings their head; cryogenic tubes rise from the pod like roots; vapour spills from the seal. Pale ice blue and cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XIII · Apoptosis** *(Death)*
```
Biopunk tarot card. A skeletal figure in a lab coat rides a pale dividing cell across the frame. In its wake the cell dismantles itself into neat membrane-bound vesicles, tidy and deliberate. A bishop, a child and a fallen executive lie in the path. Sunrise between two incubator towers on the horizon. Cyan and bone, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XIV · Homeostasis** *(Temperance)*
```
Biopunk tarot card. A winged figure pours culture medium between two flasks in a single impossible unbroken arc, one foot in a water bath, one on dry floor. A feedback loop of tubing curves away toward a distant crown of light. Irises grow from the drain. Balanced, cool, cyan and gold, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XV · The Dependency** *(The Devil)*
```
Biopunk tarot card. A horned figure crouches on a nutrient dispenser above two naked humans, their chains replaced by feed lines and IV tubing running into their navels. The figure holds an inverted Bunsen burner as a torch. Glowing nutrient bags hang overhead like fruit. Sickly amber against black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XVI · Lysis** *(The Tower)*
```
Biopunk tarot card. A containment tower struck by a single bolt of white light, its membrane rupturing outward, the lid blown off like a crown. Two figures fall from the breach amid escaping cytoplasm; organelles and glass fragments hang in the air. Violent, bright, cyan and hot white on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XVII · The Extremophile** *(The Star)*
```
Biopunk tarot card. A naked figure kneels at a black smoker vent on the sea floor, pouring water from two vessels — one into the brine, one onto the rock. Eight stars above, one enormous. A tardigrade perches on a tube worm beside her. Aurora light filtering down through deep water. Cyan, indigo, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XVIII · The Prion** *(The Moon)*
```
Biopunk tarot card. A moon with a subtly misfolded face hangs over a path running between two towers. A crayfish-like protein crawls out of the pool below, spiral fibrils trailing behind it. A dog and a wolf howl on either side of the path, their own outlines beginning to distort. Sickly silver and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XIX · The Chloroplast** *(The Sun)*
```
Biopunk tarot card. A child rides a white horse beneath an enormous green-gold sun whose rays are stacked thylakoid membranes. Chlorophyll sunflowers tower over a garden wall of living algae. A banner streams overhead. Total daylight, no shadow, acid green and warm gold, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XX · The Sequencer** *(Judgement)*
```
Biopunk tarot card. Figures rise with arms outstretched from opened cryogenic storage boxes as a vast chromatogram banner unfurls above them. An angel sounds a horn shaped like a flow cell; base-call peaks radiate outward as trumpets of coloured light. Reverent, upward, cyan with four-colour accents, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**XXI · The Biosphere** *(The World)*
```
Biopunk tarot card. A dancing figure wrapped in a closed ribbon of gut flora, framed inside a laurel wreath of living algae. At the four corners: a sequencer, a beehive, a coral reef, an old-growth forest. A sealed glass ecosphere globe turns at the centre of the wreath. Complete, calm, full spectrum, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

---

## Plasmids *(was Wands — fire, drive, whatever copies itself)*

Palette for the whole suit: **hot amber and magenta on black.** Prop: the **plasmid rod**.

**Ace of Plasmids**
```
Biopunk tarot card. A gloved hand emerges from a cloud of laminar-flow air offering a single plasmid rod, fresh loops budding along its length. Below, an estate of incubator towers under a low sun. Hot amber and magenta on black, bioluminescent linework, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Two of Plasmids**
```
Biopunk tarot card. A researcher stands on a rooftop bioreactor platform holding a globe-shaped culture vessel, one plasmid rod clamped to the parapet and one in hand, surveying a fermentation park stretching to the horizon. Restless, deciding. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Three of Plasmids**
```
Biopunk tarot card. A figure stands with their back turned on a cliff of stacked incubators, watching cargo drones carry sample cases out over the water. Three plasmid rods planted in the rock beside them. Wide horizon, warm haze. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Four of Plasmids**
```
Biopunk tarot card. A garland of glowing colonies strung between four plasmid rods forms a gateway. Two celebrants raise flasks beneath it, a walled facility behind them. Festival light, warm and secure. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Five of Plasmids**
```
Biopunk tarot card. Five youths in stained lab coats scuffle with plasmid rods held like staves, standing on the surface of an enormous agar plate marked with selection zones. Chaotic, unserious, dangerous anyway. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Six of Plasmids**
```
Biopunk tarot card. A victor rides a laboratory transport robot through a crowd of technicians, a laurel of glowing colonies fixed to the plasmid rod they hold aloft. Hands reach up on both sides. Triumphal, warm. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Seven of Plasmids**
```
Biopunk tarot card. A figure on high ground braces with one plasmid rod against six more thrust up at them from below the frame, boots mismatched, footing bad but holding. Defensive, strained. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Eight of Plasmids**
```
Biopunk tarot card. Eight plasmid rods fly in tight formation across an open sky above a landscape of fermentation tanks and irrigation channels, low sun behind them, motion trails. No figures. Speed, arrival. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Nine of Plasmids**
```
Biopunk tarot card. A bandaged guard leans heavily on one plasmid rod, watching off-frame, eight more planted behind them like a palisade fence. Exhausted, still upright. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Ten of Plasmids**
```
Biopunk tarot card. A figure bent almost double under a bundle of ten plasmid rods clutched to their chest, face hidden, walking the last stretch toward a town of incubator towers. Overloaded by their own success. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Spore of Plasmids** *(Page of Wands)*
```
Biopunk tarot card. A young technician stands in a desert of cracked dry agar, holding a plasmid rod up at arm's length and studying it with open curiosity. Salamander glyphs on their coveralls. Bright, unweathered. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Vector of Plasmids** *(Knight of Wands)*
```
Biopunk tarot card. An armoured rider on a rearing bio-mechanical horse, plasmid rod raised overhead, steam venting from the mount's flanks, desert of dry agar behind. Reckless forward energy. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Matrix of Plasmids** *(Queen of Wands)*
```
Biopunk tarot card. A queen seated frontally on a throne carved with salamanders, a plasmid rod in one hand and a sunflower of glowing colonies in the other. A black cat with one shaved surgical patch sits at her feet, staring out. Warm, generous, unbothered. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Architect of Plasmids** *(King of Wands)*
```
Biopunk tarot card. A king enthroned on stone carved with salamanders and bacteriophages, a plasmid rod held upright like a staff of office, a live lizard at the throne's foot. Commanding, seated forward. Hot amber and magenta on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

---

## Cultures *(was Cups — water, feeling, the medium you grow things in)*

Palette for the whole suit: **jade and pale cyan, wet.** Prop: the **culture flask**.

**Ace of Cultures**
```
Biopunk tarot card. A gloved hand emerges from a fog of sterile air holding a culture flask overflowing in five streams into a pool of luminous algae below. A dove-shaped bacteriophage descends toward the flask carrying a wafer. Jade and pale cyan, wet glass, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Two of Cultures**
```
Biopunk tarot card. Two figures step toward each other exchanging culture flasks. Above them floats a caduceus of intertwined DNA topped with a lion-headed macrophage. A quiet co-culture chamber behind. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Three of Cultures**
```
Biopunk tarot card. Three researchers raise culture flasks together in a toast, standing among trays of plated colonies in bloom. Arms crossing, laughing. Jade and pale cyan, warm interior light, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Four of Cultures**
```
Biopunk tarot card. A figure sits cross-legged and unimpressed beneath a mycelium tree, arms folded, three culture flasks lined up before them while a fourth is offered by a hand emerging from a cloud. They are not looking at it. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Five of Cultures**
```
Biopunk tarot card. A cloaked figure stands with head bowed over three shattered culture flasks bleeding broth across the floor, two intact flasks still standing behind them, unnoticed. A bridge leads back to a lit facility. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Six of Cultures**
```
Biopunk tarot card. A child in a small hydroponic courtyard offers a flowering culture flask to another child, both careful with it. Older growth beds and a low wall around them. Nostalgic, soft, jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Seven of Cultures**
```
Biopunk tarot card. A silhouetted figure faces seven culture flasks floating in fog, each holding a different vision: a face, a crown, a coiled serpent, a tumour, jewels, a laurel, and one shrouded glowing shape. Overwhelmed by options. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Eight of Cultures**
```
Biopunk tarot card. A figure with a staff walks away up a rocky slope, back turned, leaving eight culture flasks stacked neatly below under an eclipsed moon. Nothing is broken; they are simply going. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Nine of Cultures**
```
Biopunk tarot card. A satisfied figure sits with arms folded in front of a long curved bench holding nine glowing culture flasks in a row, everything exactly as they wanted it. Jade and pale cyan, warm key light, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Ten of Cultures**
```
Biopunk tarot card. A family stands with arms raised beneath a rainbow arc of ten culture flasks curving over a domed habitat, children dancing to one side. Total belonging. Jade and pale cyan with full-spectrum arc, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Spore of Cultures** *(Page of Cups)*
```
Biopunk tarot card. A youth in a lab coat holds up a culture flask and finds a small fish surfacing inside it, meeting their eye. Genuinely surprised. Shallow water behind. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Vector of Cultures** *(Knight of Cups)*
```
Biopunk tarot card. A knight rides at a slow walk across a shallow stream, carrying a covered culture flask before them with both care and ceremony. Winged helm, calm face. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Matrix of Cultures** *(Queen of Cups)*
```
Biopunk tarot card. A queen on a throne at the water's edge cradles an elaborate lidded culture flask in both hands, gazing into it, unable to look away. Tide pools of luminous algae around the throne's base. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Architect of Cultures** *(King of Cups)*
```
Biopunk tarot card. A king sits enthroned on a raft riding heavy swells of culture broth, holding a flask level and perfectly steady while a fish breaches on one side and a ship pitches on the other. Jade and pale cyan, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

---

## Nucleases *(was Swords — air, mind, what cuts and where)*

Palette for the whole suit: **ice blue and violet, cold.** Prop: the **nuclease blade**.

**Ace of Nucleases**
```
Biopunk tarot card. A gloved hand emerges from a cloud gripping a nuclease blade point-up, a crown of coiled guide RNA ringing the tip, a palm frond and an olive branch hanging from the crown. Barren peaks below. Ice blue and violet on black, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Two of Nucleases**
```
Biopunk tarot card. A blindfolded figure sits on a bench by a still black sea, two nuclease blades crossed over their chest, a crescent moon above. Perfectly balanced, perfectly stuck. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Three of Nucleases**
```
Biopunk tarot card. A single anatomical heart suspended in the centre of the frame, pierced clean through by three nuclease blades, rain falling from a heavy storm cloud behind it. No figures. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Four of Nucleases**
```
Biopunk tarot card. A knight's effigy lies on a tomb of frosted glass, hands together, three nuclease blades mounted on the wall above and one laid along the body beneath. A stained window throws cold light. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Five of Nucleases**
```
Biopunk tarot card. A smirking victor gathers up five nuclease blades on a torn shoreline while two defeated figures walk away with their backs turned, shoulders down. Ragged sky. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Six of Nucleases**
```
Biopunk tarot card. A ferryman poles a shallow boat across flat still water carrying a hooded woman and a child, six nuclease blades stood upright in the hull before them. Calmer water ahead than behind. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Seven of Nucleases**
```
Biopunk tarot card. A figure creeps away from a lit camp carrying five nuclease blades awkwardly in their arms, glancing back over one shoulder. Two more blades remain planted in the ground behind them. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Eight of Nucleases**
```
Biopunk tarot card. A bound and blindfolded figure stands in mud, ringed by eight nuclease blades planted point-down in the ground. The bindings are loose; the ring has a clear gap. A facility looms on the ridge. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Nine of Nucleases**
```
Biopunk tarot card. A figure sits bolt upright in a hospital bed with their face buried in their hands, nine nuclease blades mounted in a rack on the wall behind them. Deep night, single monitor glow. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Ten of Nucleases**
```
Biopunk tarot card. A figure lies face down and still at the water's edge with ten nuclease blades in their back, a red cloak spread beneath them. Beyond, a clean gold dawn breaks over black water. It is completely over. Ice blue and violet with one gold band, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Spore of Nucleases** *(Page of Swords)*
```
Biopunk tarot card. A youth on a windy ridge brandishes a nuclease blade two-handed, hair and coat snapping, clouds racing behind, watching something off-frame. Sharp and untested. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Vector of Nucleases** *(Knight of Swords)*
```
Biopunk tarot card. A knight charges at full gallop straight at the viewer, nuclease blade extended, cloak and mane streaming, storm driving behind. All commitment, no brakes. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Matrix of Nucleases** *(Queen of Swords)*
```
Biopunk tarot card. A stern queen enthroned in cloud, nuclease blade held perfectly upright in her right hand, her left extended open toward the viewer. Butterflies and a severed cord carved into the throne. She has paid for this clarity. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Architect of Nucleases** *(King of Swords)*
```
Biopunk tarot card. A king enthroned facing forward, nuclease blade upright and slightly tilted, crescent moons and butterflies carved into the stone behind. Grey clouds, level gaze, total judicial calm. Ice blue and violet, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

---

## Organs *(was Pentacles — earth, body, what can be owned and worn out)*

Palette for the whole suit: **oxblood, bone and rust, warm.** Prop: the **perfused organ in glass**.

**Ace of Organs**
```
Biopunk tarot card. A gloved hand emerges from a cloud presenting a perfused organ in a glass case, tubing coiled beneath. Below, a garden gate woven from arterial vines opens onto distant hills. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Two of Organs**
```
Biopunk tarot card. A courier juggles two organ cases inside a looping infinity ribbon of perfusion tubing, balancing on the balls of their feet. Cargo ships ride heavy swell behind. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Three of Organs**
```
Biopunk tarot card. A surgeon on scaffolding works on a vast anatomical vault while an engineer and a hospital administrator confer over plans below. Cathedral-scaled operating theatre. Real craft, properly staffed. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Four of Organs**
```
Biopunk tarot card. A seated figure clutches one organ case hard to their chest, balances another on their head, and pins two more beneath their feet. A locked city of freezers behind. Nothing moves. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Five of Organs**
```
Biopunk tarot card. Two figures limp barefoot through snow past a lit clinic window of stained glass showing five organs in a row. One is bandaged, one is on crutches. Neither looks at the window. Oxblood, bone and rust against blue-white snow, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Six of Organs**
```
Biopunk tarot card. A donor in a heavy coat holds a balance scale in one hand and distributes organ cases to two kneeling recipients with the other. The scale is doing the deciding. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Seven of Organs**
```
Biopunk tarot card. A technician leans on a mop at the edge of a growth bed, regarding a heavy vine hung with seven organ cases, none of them ready. Long day, no result yet. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Eight of Organs**
```
Biopunk tarot card. An apprentice at a workbench sutures the eighth organ case by lamplight, seven finished cases mounted on the wall above in a neat column. Tools laid out with care. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Nine of Organs**
```
Biopunk tarot card. A figure in fine robes stands alone in a walled garden of vasculature, a hooded falcon perched on their gloved hand, nine organ cases hung among the vines. Earned, private comfort. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Ten of Organs**
```
Biopunk tarot card. An old man sits beneath an archway with two dogs at his knee while a younger family passes beyond, ten organ cases arranged across the arch as a family tree. Generational, settled. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Spore of Organs** *(Page of Pentacles)*
```
Biopunk tarot card. A youth stands in a ploughed field holding a single organ case up to the light with both hands, entirely absorbed in it. Nothing else in the world. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Vector of Organs** *(Knight of Pentacles)*
```
Biopunk tarot card. A knight sits motionless on a heavy black horse, holding an organ case level in both hands, a ploughed field stretching behind. Nothing dramatic; the delivery will be made. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Matrix of Organs** *(Queen of Pentacles)*
```
Biopunk tarot card. A queen enthroned in a garden of vasculature cradles an organ case in her lap, looking down at it with real affection, a rabbit at her feet and fruiting vines arching overhead. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Architect of Organs** *(King of Pentacles)*
```
Biopunk tarot card. A king in robes patterned with grapevines and capillaries sits on a bull-carved throne, an organ case resting on his knee, a tissue refinery running at full output behind him. Oxblood, bone and rust, ornate thin-line border. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

---

## Extras

**Card back** — one image, used 78 times, so it is worth spending generations on:
```
Biopunk tarot card back, perfectly symmetrical, a vertical double helix centred on a tessellated field of hexagonal cell membranes, fine grid, ornate thin-line frame with corner brackets, bioluminescent cyan on deep black, no figures, no focal point, wallpaper-like repetition. --ar 2:3 --style raw --s 300 --no text, lettering, watermark, signature
```

**Border and frame plate** — generate once, composite under every card:
```
Ornate biopunk tarot card frame, empty centre, thin-line border with corner brackets, a blank name plate at the bottom and a blank numeral cartouche at the top, laboratory specimen-label aesthetic, bioluminescent cyan on deep black, flat, symmetrical, no illustration in the middle. --ar 2:3 --style raw --s 250 --no text, lettering, watermark, signature
```

**Palette swaps.** To reprint the whole deck in another of the app's eight media,
replace the palette clause in every prompt:

| Medium | Replace palette clause with |
|--------|----------------------------|
| Wild Type | `bioluminescent cyan and mint on deep teal-black` |
| Hemorrhage | `arterial crimson and hot magenta on black` |
| Chloroplast | `acid green and yellow on dark olive` |
| Cryogen | `ice blue and lavender on midnight navy` |
| Sepsis | `amber, rust and ochre on dark brown-black` |
| Anaerobe | `violet and shocking pink on near-black purple` |
| Halophile | `salt pink and cold cyan on plum` |
| Nutrient Agar | `pale gold and olive on warm dark grey` |

**If a card comes out too clean.** Add `wet, contaminated, condensation on glass,
biofilm at the edges, slightly diseased`. The deck should never look like clip art of a
laboratory — it should look like something is growing where it should not be.

**If a card comes out too gory.** These are archetypes, not autopsy photos. Add
`clinical restraint, stylised anatomy, illustrated not photographic` and remove any
explicit wound language.

