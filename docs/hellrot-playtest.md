# Mondo 3000: Hell Rot — Playtest Report (rules simulation)

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
   line. The game now has 16 endings.
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
  punishing. Consider lowering Iconoclast's Junie gate to Trust ≥ 3.
- **Route D is rare without intent** (under 5% of random players). It is the
  "secret best route" by design, so the Duchess's Issue 3 reading and the
  *Long Look* are its signposts.
- **The new endings need full writing:** summaries are in §3.11. Lines for
  the Duchess and the other cast are still to come.
- **Fabrication rates in the random batch are high** only because the random
  model lies often. They say nothing about real players.

## 7. Next tests

1. A paper prototype of Issue 2, played by hand with dice, to test whether a
   night is fun at 2–4 Runs.
2. A click-through of the City map (the live map artifact) with the new ride
   costs, to check travel times feel right.
3. Re-run this simulation after any change to the meters, the lock or the
   endings.
