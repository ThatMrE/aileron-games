# Godsplice — Playtest Report (rules simulation)

> Companion to [hellrot-design.md](hellrot-design.md). The game has no build
> yet, so this playtest runs the **design's rules** in a small simulator: the
> meters, the route lock, the ending conditions and the Hour costs, as the
> design doc states them. It plays 20 scripted playthroughs from the Prologue
> to the Epilogue, then 2,000 random ones, then checks every ending.
>
> A simulation can find holes, contradictions and broken numbers. It cannot
> tell whether a scene is fun. A paper prototype of one Issue is the next
> test (see "Next tests").

---

## 1. Method

- **The model.** Each playthrough makes the Prologue choices, then plays six
  Issues. Each Issue applies the documented rules: boons, rides, columns,
  Parrhesia, Venom and Vow, Trust, relapses, lies, the Halos, Sight and the
  eyes. The route locks at the end of Issue 3. The finale checks every
  ending condition in §3.11.
- **Assumed numbers.** Where the doc said "high" or "low" without a number,
  the simulator used: Route A at Sainthood ≤ 3, Helix ≤ 3, Vow ≥ 5, Yara
  Trust ≥ 3. Routes B and C at a meter ≥ 6 and higher than the other.
  Route D as written. These assumptions are now written into the doc
  (§3.10), with the changes below.
- **Hours.** Each Issue's core path (its Core set pieces, §3.9b) was costed
  at the documented rates, plus side content by profile.

## 2. The 20 playthroughs

Each profile is a different player. "Before" is the rules as they were.
"After" is the rules with the fixes in §4.

| # | Profile | Plan | Before: route, ending | After: route, ending |
|---|---|---|---|---|
| 1 | Heretic purist | Attack both cults, Parrhesia, no Pell | A, 2 Peer Review | A, 2 Peer Review |
| 2 | Heretic with the Hog | Same, takes Pell's help | A, 3 Hog's Bargain | A, 3 Hog's Bargain |
| 3 | Willing saint | Church boons, shuttles, Halos, merges | B, 4 Saint Rot | B, 4 Saint Rot |
| 4 | Iconoclast | Church path, high Junie Trust, refuses | B, 5 Iconoclast | B, 5 Iconoclast |
| 5 | Saint who says no, alone | Church path, low Junie Trust, refuses | B, **no ending** | B, 13 The Unfinished |
| 6 | New Flesh | Theogen boons, rickshaws, full splice | C, 6 New Flesh | C, 6 New Flesh |
| 7 | The Mob | Theogen path, Venom aimed up, refuses | C, 7 The Mob | C, 7 The Mob |
| 8 | Splicer who refuses gently | Theogen path, low Venom, refuses | C, **no ending** | C, 14 Draft |
| 9 | Communion, pure eyes | Balanced boons, both talks, pure eyes | D, 8 Mortal | D, 8 Mortal |
| 10 | Communion, debate lost | Same, loses the debate | D, **no ending** | D, 15 Hung Jury |
| 11 | Communion, mixed eyes | Same, Pale Eye corrupt | B (missed D), **no ending** | B, 13 The Unfinished |
| 12 | The Mountain | Route A, refuses cures, Clarity spent | A, **three endings qualify** | A, 1 The Mountain |
| 13 | Successor | Route A, Yara Trust 5, Clarity 0 | A, **two endings qualify** | A, 9 Successor |
| 14 | Fabricator | Two printed lies | **no route at lock**, 10 | C, 10 Fabrication |
| 15 | Thief of time | Pale Eye corrupt, Stopped Clock | B, 11 (+ an undefined B branch) | B, 11 Midnight Forever |
| 16 | Greedy boon-taker | Takes every boon | C, **no ending** | C, 14 Draft |
| 17 | Relapser | Three relapses, Church path | B, **no ending**, max Clarity 2 | B, 13 The Unfinished, max Clarity 3 |
| 18 | Speedrunner | Files early, no side content | **no route at lock**, no ending | C, 14 Draft |
| 19 | Completionist | Every side quest | **no route at lock**, 2 | A, 2 Peer Review |
| 20 | Naive player | Takes what is offered | B, **no ending** | B, 13 The Unfinished |

**Every ending was reached at least once,** before and after: all 11
original endings, and after the fixes, the five new ones.

**Before the fixes:** 10 of 20 runs ended with no defined ending. Three
runs matched no route at the lock. Two runs qualified for two or three
endings at once. Every profile ran out of Hours on the core story in
Issues 1, 4 and 6.

**After the fixes:** 20 of 20 runs end in exactly one ending. No profile
runs out of Hours on the core story. Only the Completionist (every side
quest) and the Naive player (side quests on most nights) run short, which
is the intended trade: the week holds only some of its side content.

## 3. The 2,000 random playthroughs

Random players make random choices at every point the model has.

| Measure | Before | After |
|---|---|---|
| Ends with no ending | 29% | 0% |
| No route at the lock | 28% | 0% (fallback rule) |
| Two or more endings qualify | 19% | 0% (precedence rule) |
| A worship meter at 10 by New Year's Eve | 73% | 40% |
| Mortal, when played for on purpose | about 0% | 61% |

The 40% that still reach 10 are mostly committed Route B and C players,
which fits those routes.

## 4. What was broken, and the fix

### Holes in the endings

1. **Four route branches had no ending.** Route A without publishing,
   Route B refusing the Merge with Junie Trust below 4, Route C refusing
   the splice with Venom below 8, and Route D losing the debate (or winning
   without pure eyes). **Fix:** five new endings (§3.11): **12 Spiked,
   13 The Unfinished, 14 Draft, 15 Hung Jury, 16 Truce**, each with an Ione
   line. The game now has 16 endings (17 after the Route C fix in §6).
2. **No precedence.** The "Any" endings overlap each other and the route
   endings. **Fix:** an ending precedence rule (§3.11). The Mountain is now
   a choice offered at the final desk, so it beats the automatic Successor.
3. **No route fallback.** A player who drifts matches no route. **Fix:** a
   written lock order and fallback (§3.10).

### Broken numbers

4. **Hours.** At 1 Hour per door, the core story needed 14–16 Hours on a
   13-Hour night. **Fix:** ordinary doors ½ Hour, Story doors 1, travel ¼–½
   by distance, 2–4 Runs a night (§4.3, §5.6).
5. **"Daytime" scenes on a night clock.** **Fix:** a short day segment
   before dusk, off the clock (§4.2).
6. **Meter saturation.** 73% of players maxed a worship meter. **Fix:**
   boons stop at 7, and meters above 5 cool by 1 each dusk (§5.3).
7. **Mortal was unreachable.** Both eyes pure at step 4 cost 12 Sight, and
   the doc set no Sight price or income. **Fix:** Sight prices and income
   (§5.14a), and Mortal now needs both eyes pure with 5 pure steps between
   them. Winning without that gives **Truce**.
8. **Route D's lock was brittle.** "Within 2" failed for any player who took
   a few random boons. **Fix:** both meters ≥ 3 and within 3 (§3.10).
9. **The relapse death spiral.** Three relapses plus the Rot left maximum
   Clarity at 2, so every Run ended in a blackout. **Fix:** a Clarity floor
   of 3 for the Rot and relapses (§5.6).

### Fairness

10. **The Rot could make him a liar.** From Issue 4 THE ROT swaps memories,
    and printing a swapped item counted as a Fabrication. Punishing the
    player for the disease is a "gotcha." **Fix:** a swapped item costs a
    Correction, never a Fabrication (§5.4).
11. **The second lie came without warning.** **Fix:** the Layout warns
    before a second lie, and a retracted lie does not count (§5.4).
12. **A hidden point of no return.** The route locked silently. **Fix:** the
    Duchess reads the player where they stand at dusk on Issue 3, and the
    HUD shows which way the meters point (§3.10).
13. **Timed beats could be missed by being elsewhere.** **Fix:** a timed
    beat comes to him, by phone, runner or fog (§4.2).

### Logic

14. **Rosa's "File first" could not work.** The press runs at 6 a.m., but the
    shot is that evening. **Fix:** a one-page extra off the risograph,
    pasted up by the Dissonance. Karl's cameras read it, and the forecast
    flips (§3.9).
15. **Wren Trust was used but never defined.** It gates Delphine's survival.
    **Fix:** five ways to earn it (§3.4).
16. **Smaller fixes:** Moreau's free success is once per Issue everywhere,
    the *Plus One* upgrade is in the Archive, starting meter values are
    written down, and the van no longer crosses the Bay Bridge to reach the
    City it is already in.

## 5. Checked against common critiques of story RPGs

| Common complaint | Known example | Where this design stands |
|---|---|---|
| Endings ignore the player's choices | *Mass Effect 3* (2012) | Every ending carries character lines that read the whole week (Ione, the Duchess, Old Dee and others). The new failure endings come from the player's own route. |
| Hidden timers punish the player | *Fallout* (1997), *Pathfinder: Kingmaker* | The clock is always on screen, and every thread's deadline is in the Threads table (§3.9c). Timed beats now come to the player. |
| A calendar done well | *Persona* games | The model to follow: show deadlines in the game, not only in the doc. |
| Urgent plot, idle side quests | *The Witcher 3* | Each night is time-boxed, so side quests spend the same clock as the plot. |
| A morality bar decides everything | *BioShock*, *KOTOR* | Sainthood and Helix are worship, not virtue, and Venom and Vow are separate. Saturation made them binary; the cooling rule fixes that. |
| Failure that punishes the player for a disability or disease | Common in survival design | Fixed: the Rot's swapped memories are never Fabrications. |
| Failure as content | *Disco Elysium*, *Hades* | Kept: blackouts, lost showdowns and the couch Issue all advance the story. |
| Opaque systems | *Disco Elysium*'s Thought Cabinet | Check odds are shown. Pru's keepsake shows red-check odds. Sight prices are now written down. |
| Too many meters | Large CRPGs | Still a risk: about 20 tracks. The HUD shows only the clock, Sainthood and Helix. Clarity, Heat and Craving should show only when they matter (Heat and Craving at 3+). |
| Romance as a reward for gifts | Common in BioWare-style games | Already handled: no gift or stat buys a romance (§5.15). |

## 6. Still at risk

- **Most random players get a dark ending.** The Unfinished (14%) and
  Draft (11%) are now the commonest endings for players who drift. This is
  the design's "taking boons chooses your god" theme, but it may feel
  punishing. **Iconoclast's Junie gate is now Trust ≥ 3** (was 4). A re-run
  shows the rates barely move: drifting players never raise Junie's Trust
  at all, so the gate is not the bottleneck. Earning her Trust is. **Fix:**
  Junie's steady rule (design §5.15): Trust +1 for each night she rides
  along with no Venom aimed down, and −1 for a night he uses. Re-run on
  2,000 random players: Iconoclast 5.3% → 9.4%, The Unfinished 14.2% →
  9.2%, The Mountain 1.7% → 3.0%. The Relapser still cannot reach
  Iconoclast (his Junie Trust ends at 0), which keeps the design's rule
  that relapses make it harder.
- **Route C had no good refusal.** Refusing the splice gave only The Mob
  (Venom ≥ 8) or Draft, so Draft took 11% of random players. **Fix,** mirroring
  Route B: Yara's steady rule (Trust +1 a night she rides along with no
  Fabrication) and a new ending, **17 The Deep Wards**, for refusing with
  Yara Trust ≥ 3. Re-run on 2,000 random players: Draft 11.0% → 4.8%, The
  Deep Wards 4.8%, no run without an ending. A Route C player who never
  takes Yara along still gets Draft. Side effect: Successor rises from 5.0%
  to 8.8%, because Yara's Trust reaches 5 more often. That fits Successor
  (her byline), but watch it.
- **Route D is rare without intent** (under 5% of random players). It is the
  "secret best route" by design, so the Duchess's Issue 3 reading and the
  *Long Look* are its signposts.
- **The new endings need full writing:** summaries are in §3.11. Lines for
  the Duchess and the other cast are still to come.
- **Fabrication rates in the random batch are high** only because the random
  model lies often. They say nothing about real players.

## 6b. The playable wireframe, played by a bot

A playable HTML wireframe of the game (the City map, the House, scenes,
showdowns, the Layout, the route lock and all 17 endings) was played end to
end by a browser bot: 18 full games from the Prologue to midnight on New
Year's Eve, with four play styles (follow the rails, never sleep, ride the
Church's shuttles, take every boon). The final 18 games ran with no errors.
The test found four real problems, all fixed:

1. **The rails steered.** The ★ "fastest ride" was almost always the
   Church's shuttle, so every rail-following player drifted to Saint Rot.
   The ★ now marks the fastest ride with no strings (design §4.6).
2. **Softlocks.** A player could be stranded on the Rock or Treasure Island
   with no legal ride home. The return ferry is now free, the night bus
   links the edges of the map, and ▶ NEXT routes through the right pier.
3. **No way to stay up.** After filing, the only next step was sleep. "Stay
   up and work an hour" now lets a player push toward the 48-hour delirium
   on purpose.
4. **Delirium broke clicking.** The delirium wobble shook the buttons. Now
   only the scene art wobbles.

The two never-sleep games both hit delirium, were sent home to sleep 6
hours, and still finished the week.

### Second pass: point-and-click interiors

Every location is now an 8-bit interior with fixed hotspots (design §4.7).
Villa Delirium is a cutaway of its eight rooms. Only travel moves the clock.

The bot played 16 more games:

| Style | Games | Result |
|---|---|---|
| Mixed (buttons) | 4 | Endings 6, 13, 13, 13 |
| Canvas clicks only | 3 | Endings 14, 13, 13 |
| Takes every boon | 4 | Endings 14, 13, 15, 13 |
| Never sleeps | 3 | Endings 14, 13, 4. All three hit delirium and recovered. |
| Church shuttle every ride | 2 | Ending 4 both times |

There were no errors and no stuck games. The bot checked the clock after
each hotspot click. The clock moved only on a blackout, which counts as the
ride home (2 Hours).

Two findings:

1. **Memory fills fast.** Free hotspots fill the 6 Memory slots in one or
   two locations. Writing down is free now, so this is a click, not a cost.
   Watch that Memory still feels like a risk in a real playtest.
2. **The gate is the hotspot count, not the clock.** Inside a location,
   only Clarity limits a player (story scenes, Dissonance and showdowns
   cost it). Each hotspot works once per Issue, so a room can't be farmed.

### Third pass: walking the rooms

The interiors became top-down rooms walked with WASD (design §4.7). The
bot played 7 more games on the walking version:

| Style | Games | Result |
|---|---|---|
| Mixed (buttons) | 4 | Endings 14, 13, 13, 13 |
| Never sleeps | 2 | Endings 6 and 4. Both hit delirium and recovered. |
| Click a tile, walk there | 1 | Ending 14 |

There were no errors. The clock moved inside a room only on a blackout. A
scripted test walked to the Duchess with the keys, opened the Salon, left
by the ▼ exit, rode to North Beach and played the story by clicking it.
On an emulated phone the D-pad moved Hell Rot and the page did not scroll
sideways.

## 6c. Party battles: the stress test

The wireframe now has party battles in the *Final Fantasy* style (design
§5.5b). The battle rules are one engine. The game and a headless test both
run it. The test played every combination below and checked each step for
errors.

| What varies | Values |
|---|---|
| Party | Hell Rot alone, Hell Rot and one housemate (8), Hell Rot and two (28): 37 parties |
| Enemies | All 37 encounter groups at every Issue they appear in, each of the 31 enemies alone, and all 4 bosses with and without Moreau |
| Difficulty | Easy, Normal, Hard |
| Gear | None, and the gear a player can own by that Issue |
| Player | An auto-battle player that plays well, and a "chaos" player that picks any legal command and any legal target |

It played **266,652 battles** and about 2.9 million actions. After each
action the test checked that HP and SP stay between 0 and the maximum, that
no number is NaN, that a unit is out exactly when its HP is 0, that no item
count goes below 0, and that no battle runs past 600 actions.

To run it again: `node .github/sim/godsplice-battle-sim.js "" 4 all`. It
reads the battle engine straight out of `godsplice.html`, so it tests the
code the site serves.

**Result: 0 errors, 0 stalemates.** The chaos player used every one of the
66 skills and all 9 consumables.

### What the test found and fixed

| Problem | Fix |
|---|---|
| A confused Pru used Audit on a friend, and the steal code crashed | Audit steals only from the other side |
| Regular fights ended in 1.3 rounds, so difficulty did not matter | Enemy HP ×2; each difficulty now sets enemy damage. Fights now take 2 to 4 rounds |
| Fog Hound, Fog Wisp and Static Gull together won 79% of fights on Hard | The group is now Fog Hound and Static Gull |
| Sister Halcyon and Old Dee won 85–90% on Hard; Brother Cask won 25% | A separate HP scale per boss; Halcyon and Old Dee have less MAG |
| Hell Rot alone met bosses built for three | Enemies scale with party size; a boss sees Hell Rot alone and Junie comes too |
| It took 13 to 19 fights to keep pace each Issue | A flatter XP curve: now 5 to 8 fights per Issue |

### Final balance (auto-battle player, party of three)

| Win rate | Easy | Normal | Hard |
|---|---|---|---|
| One random fight | 100% | 99.9% | 97.5% |
| Five random fights in a row, no rest | 100% | 92.7% | 44.7% |
| A boss | 99.9% | 96.7% | 50.5% |
| A boss, Moreau ready | 97.8%* | 92.0%* | 52.7%* |

\* All party sizes together. With smaller parties the numbers drop. On
Normal, a party of two wins 74% of boss fights and Hell Rot alone wins 22%.

The hardest regular group on Hard is the Fog Hound with a Static Gull (76%).
The hardest boss on Hard is Old Dee and the Circle (22%, or 26% with
Moreau). Mayor Sunday is the longest fight: 26 rounds on Hard.

### The bot plays whole weeks with fights

The browser bot now fights too. It played whole weeks on the last builds
with three styles, on all three difficulties:

| Style | Weeks | Endings | Fights won | Level at the end |
|---|---|---|---|---|
| Mixed: Auto half the time, and "Look for trouble" 12% of the time | 9 | 14, 13, 13, 13, 15, 13, 14, 13, 13 | Every story and boss fight on Easy and Normal; 9 of 13 story fights on one Hard week | 13 to 20 |
| Manual: random commands and targets, every turn | 4 | 14, 4, 4, 13 | 36 of 47 story and boss fights | 5 to 10 |
| Grinder: looks for trouble 35% of the time | 3 | 15, 13, 16 | 173 of 175 | 20 (the cap) |

There were no errors and no time leaks. The bots found three problems on
the way, and all three are fixed:

1. **A player who never walks got no XP.** Random fights start only when
   you walk, so a player who used only the buttons stayed at level 2 and
   lost most story fights. Now every location has a **Look for trouble**
   button. Story fights are at most one level above the party, and a party
   that falls behind meets story enemies one at a time.
2. **The NEXT button could leave the midnight screen.** On Issue 6, a click
   on NEXT took Hell Rot away from the finale, and the week never ended.
   NEXT is now hidden during the finale and during fights. Midnight on
   Issue 6 now always brings back the finale.
3. **A lost street fight was too harsh, then too sticky.** It first cost a
   full blackout. Now Junie drives you home and one hour passes. The first
   version of that left your Memory unfiled, so the "get home safe" step
   never cleared. Now your Memory goes into the Notebook when you get home.

A scripted test also walked the Prologue: the raccoon fight on the trail,
the cliff stairs and the springs. It covered the Garage party picker, both
shops, the gear menus, items used outside a fight, all four bosses, and a
phone screen 390 px wide with no sideways scroll.

### Talk boxes and battle effects

Talk now opens a menu over the scene (design §4.7e), and every battle move
has an effect (§4.7b). The bot learned to read the text box page by page and
to pick a random option it is allowed to take. It played 10 whole weeks in
three styles:

| Style | Weeks | Endings | Talks per week |
|---|---|---|---|
| Mixed | 4 | 14, 13, 15, 13 | 31 to 36 |
| Manual battles | 3 | 14, 13, 16 | 26 to 31 |
| Click a tile, walk there | 3 | 14, 13, 15 | 28 to 31 |

There were no errors, no time leaks and no stuck boxes. A scripted test
checked the Prologue walk with the box open (Hell Rot does not move until
it closes), the keyboard menu (arrows, Enter, the number keys), Tem's
menu (gentle options only), Benny's menu (Temperament, party, Venom and
coffee options) and a phone screen. A frame capture checked the battle
effects: the swirl, slashes, beams, bubbles, rings, halos, the crit flash,
status markers, Moreau and the victory hop.

### Cash and merchants

Fights now pay cash ($) instead of Ink, and four merchants sell for cash
(design §5.5b). The stress test re-ran clean on the new rules: 142,673
battles, 0 errors. Over a whole run, normal play earns about $1,800. That
buys about one good piece of gear per Issue plus supplies.

A scripted test won a fight in the Loin ($18 to $26). It bought a burrito at
the Ghost Diner counter, sold a coffee back for half price, and switched
the BUY and SELL tabs with the arrow keys. It checked that the Conductor's
night car locks its later stock (for example "Axolotl charm: Issue 5") and
shows each party member's stat change ("Hell Rot: ATK ▲9 · Junie: ATK ▲9").
It also opened Mary's stall at home, and checked a phone screen with no
sideways scroll.

The bots played 4 mixed weeks (endings 15, 13, 15, 13) and 3 weeks walking by
clicking tiles (endings 15, 4, 15), with no errors and no time leaks.
They ended the week holding $300 to $2,300, because the bot rarely
shops. The bots found one problem, in the bot itself: a merchant stall is
never "used up", so the bot's "use the next unused spot" rule kept opening
the shop. The bot now leaves stalls out of that rule and goes shopping by
chance instead.

### Who you bring

Talk options now change with the party (design §4.7e): 28 pair approaches,
23 people with history with one housemate, 10 people who talk only to
Hell Rot alone, and 6 who clam up around someone. A scripted test checked:

- the first time Junie and Yara pair up, they trade lines at home, once only;
- with Junie and Yara, Tem's menu shows the pair approach, Junie's derby
  story, and a greyed "Bring Saint Nobody tonight";
- the pair approach gives a Lead marked "two witnesses";
- with Junie there, Benny's chemist option is greyed: "Not with Junie
  watching";
- alone, Tem's menu shows `[ALONE ★]`.

The bot now picks random party line-ups at home. It played 7 whole weeks
(endings 14, 13, 16, 14, 14, 4, 15) with no errors. It tried 15 different
line-ups and used 8 different pair approaches and 3 history options.

## 7. Next tests

1. A paper prototype of Issue 2, played by hand with dice, to test whether a
   night is fun at 2–4 Runs.
2. A click-through of the City map (the live map artifact) with the new ride
   costs, to check travel times feel right.
3. Re-run this simulation after any change to the meters, the lock or the
   endings.
