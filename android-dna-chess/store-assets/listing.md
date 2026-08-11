# DNA Chess — Google Play store listing

Copy-paste-ready text and asset checklist for the Play Console listing.

---

## Title (max 30 chars)

```
DNA Chess
```

## Short description (max 80 chars)

```
Chess meets molecular biology: mutate your rival's genes to give them cancer.
```

## Full description (max 4000 chars)

```
Give your opponent cancer — one mutation at a time.

DNA Chess is a two-player molecular strategy game. Your back rank isn't kings and pawns, it's your GENOME: ten genes, ten lives. Run the Central Dogma as a war machine — switch genes on to transcribe RNA, translate that RNA into protein enzymes, and march those enzymes across the cell to edit your opponent's DNA. Mutate six of their ten genes and their cell loses control: cancer, and the game.

It looks like a science diagram and plays like chess.

PLAYS LIKE AN ONLINE CHESS BOARD
• Tap a molecule and its legal moves light up — dots to move, rings to strike.
• A red glow marks a gene about to be mutated: your genome is in "check."
• Selected square and last move stay highlighted, with full a–j / 1–10 coordinates.
If you can play chess on your phone, you already know how to play this.

PICK UP IN 30 SECONDS, THEN GO DEEP
• CORE mode (the default) is a clean, flat board: one action per turn and three enzymes — Nuclease to attack, Ligase to repair, Helicase to defend.
• ADVANCED mode opens up the full game: two actions a turn, protein combos, and a cell full of ORGANELLES — build cheaply at ribosomes, sprint across the endoplasmic reticulum, and trap your rival's pieces in the Golgi apparatus.

PLAY YOUR WAY
• Pass-and-play with a friend on one device.
• Or take on the built-in AI at three difficulty levels — Easy, Normal, or Hard.
• Undo any move, and an end-of-game recap tells you exactly how it was won.

REAL BIOLOGY, AS A GAME
Every piece is a real molecular machine: a CRISPR-style nuclease that cuts DNA, a ligase that repairs it, a helicase that shoves things aside. The whole board is drawn in the style of David Goodsell's "Machinery of Life." You learn how genes become proteins by actually operating the machinery — no textbook required.

MADE FOR PHONES, MADE TO RESPECT YOU
• No ads. No accounts. No in-app purchases.
• Works offline once loaded.
• Collects nothing about you — your game record lives only on your device.

From Aileron Games — where science meets play.
```

## Graphics assets (checklist)

| Asset | Spec | File |
|---|---|---|
| App icon | 512×512 PNG (32-bit) | `store-assets/play-store-icon-512.png` ✅ |
| Feature graphic | 1024×500 PNG/JPG | `store-assets/feature-graphic-1024x500.png` ✅ |
| Phone screenshots | 2–8, 16:9 or 9:16, ≥320px | `store-assets/screenshots/01–05*.png` ✅ (1080×1920) |
| (Optional) 7"/10" tablet shots | — | not provided; the phone shots pass review |

Screenshots included (1080×1920):
1. `01-overview.png` — Run the Central Dogma. Give your opponent cancer.
2. `02-chess-ux.png` — Plays like chess: dots to move, rings to strike, red = in check.
3. `03-howto.png` — Learn in 30 seconds.
4. `04-win.png` — Race to cancer, with a "how it was won" recap.
5. `05-advanced.png` — Then go deep: organelles, combos, AI.

## Categorization

- **App category:** Games → **Board** (alt: Strategy).
- **Tags / keywords:** strategy, board game, chess, biology, science, education, molecular, two-player, offline, AI.
- **Contact email:** hello@aileron.games
- **Website:** https://aileron.games

## Content rating (IARC questionnaire — suggested answers)

The game is abstract (molecular pieces on a board). Answer honestly; expected outcome **Everyone** (possibly Everyone 10+ for the "cancer" disease theme):
- Violence: none (no characters, blood, or realistic violence — abstract molecules).
- Sexual content, profanity, controlled substances, gambling: none.
- Theme note: the win condition references cancer as an abstract game goal; no medical imagery.
- Interacts with users / shares location / user-generated content: **No**.

## Data safety form (declared)

- **Data collected:** none. **Data shared:** none.
- The app is a WebView loading aileron.games; it stores only local game state
  (mode preference, win/loss tally, "seen the how-to" flag) on the device via
  the browser, and requests **INTERNET** only to load the game.
- No account, no analytics, no ads, no third-party SDKs.

## Privacy policy (required by Google Play)

Play requires a hosted privacy-policy URL. **Live at: https://aileron.games/privacy**
(served by `privacy.html`; also linked from the homepage footer). Paste that URL
into the Play Console listing. The page states, in full:

```
Aileron Games does not collect, store, or share any personal data. Our games and
apps have no accounts, no analytics, no advertising, and no third-party trackers.
The DNA Chess app loads the game from aileron.games and saves only your game
preferences and score tally locally on your device. It requests the INTERNET
permission solely to load the game. Contact: hello@aileron.games
```

## Release notes (What's new — v1.0.0)

```
First release! Play DNA Chess on the go — Core mode to learn fast, Advanced
mode for the full game, pass-and-play or vs a 3-level AI. Works offline.
```

## Still to supply before publishing

- ~~Host the privacy policy~~ ✅ live at https://aileron.games/privacy.
- A **feature graphic** is included; a promo video is optional.
- Take/replace screenshots any time from the live app (these were captured from
  aileron.games/dna-chess.html).
- Build & upload the signed `.aab` (see `../README.md`).
