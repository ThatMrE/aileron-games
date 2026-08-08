# FDA: Forever Doesn't Allow — Design & Sources (v2.0)

> **One-line pitch:** An 8-bit *Oregon Trail* reskin where the trail is the U.S.
> drug approval process and you are the patient, not the sponsor. Every
> obstacle is a real, currently-in-force rule; every dollar figure is a
> published statistic with a citation; the health bar is a real clinical scale.
> There is no score and no win state, and that is the argument.

---

## 1. Design pillars

1. **The health bar is a real instrument.** *The Oregon Trail* displayed party
   health as one of four words — *good, fair, poor, very poor*. Oncology
   already has a scale for exactly that: **ECOG performance status**, 0 to 5,
   where **5 means dead**. So the status readout is the real scale, and the
   central catch-22 becomes *mechanical* rather than narrated.
2. **Two HUD numbers in opposition.** Alongside ECOG sits **prior lines of
   therapy** — the other real eligibility criterion. Later-line trials require
   ≥2 prior lines *and* ECOG 0–1. Each line of therapy you accumulate costs you
   performance status. The player watches the two numbers cross. There is no
   week in which both conditions are true.
3. **It is not the FDA's fault, and the game says so.** The single most common
   public misconception is that the agency is the blocker. It usually isn't.
   The game separates the barriers precisely: an **approved** drug used
   off-label is blocked by a **payer**; an **investigational** drug is blocked
   by a **manufacturer**. The FDA authorises the great majority of individual
   expanded-access requests it receives, often within days. The title is
   ironic on purpose.
4. **The pixel art stops when the real person starts.** The end card
   deliberately abandons the 8-bit styling entirely — different fonts, light
   background, ordinary prose. The costume comes off for Abigail Burroughs.
5. **No branch grants a cure.** Death is guaranteed by design, not by a
   balancing accident.

---

## 2. The fixed patient

One patient, no picker (v1 had a disease/insurance selector; it implied a
customisation depth the game does not have, since none of it changes the
outcome).

- **41 years old, metastatic pancreatic adenocarcinoma**, KRAS **G12C** mutation
  (~1–2% of pancreatic cancers).
- **ACA marketplace Silver plan.** This is deliberate: the only public US
  claim-denial dataset covers HealthCare.gov marketplace plans, so the patient
  is marketplace-insured in order for the 19% denial statistic to legitimately
  apply. There is no comparable published denial rate for employer coverage.
- Starts with $12,000 savings — better off than a great many real patients.

**Why this disease.** It produces the Abigail Burroughs trap exactly, with a
real drug: **sotorasib** received accelerated approval for KRAS G12C **lung**
cancer in May 2021. In the pancreatic cohort of the same trial programme it
produced a 21% response rate and 6.9-month median OS — and was never approved
for pancreatic cancer. Same drug, same mutation, wrong organ. Abigail's cancer
was in her head and neck when the cetuximab trials were enrolling colon cancer.

---

## 3. The eight catch-22s

| # | Trap | Chapter | Grounding |
|---|------|---------|-----------|
| 1 | Expanded access requires the manufacturer's agreement, and nothing compels it | Three Doors, door 1 | 21 CFR 312 Subpart I. FDA authorises the *use*; only the sponsor can *supply*. |
| 2 | A single-patient IND still needs a supplier, so the loop closes | Three Doors, door 2 | Granted in days, worth nothing alone. Door 2 opens onto door 1. |
| 3 | Right to Try removed two gatekeepers and left the third | Three Doors, door 3 | Right to Try Act 2018 bypasses FDA *and* the IRB, and does not oblige the manufacturer. |
| 4 | Progression qualifies you; the decline it causes disqualifies you | Screening, Trial A | ECOG 0–1 requirement vs. ≥2 prior lines. Patients at ECOG ≥2 are historically well under 5% of registrational trial enrolment. |
| 5 | Randomisation may spend your remaining time in the control arm | Screening, Trial B | 1:1 randomisation, no guaranteed crossover. |
| 6 | Your insurer covers routine care but not the research-only care | The Research Bill | ACA §2709 / 42 USC §300gg-8 mandates routine costs, excludes the investigational item and anything "solely to satisfy data collection." |
| 7 | IRB queues and clinical holds run on institutional time | The Institutional Crossing | 21 CFR 312.42; 30-day IND window; IRB calendars. |
| 8 | **Off-label is legal but unfunded — and the blocker is not the FDA** | Prior Authorisation | *Added in v2.* The drug is approved, the prescription lawful, and the payer says no. 19% of marketplace in-network claims were denied in 2024. |
| — | Accelerated approval, then withdrawal, ~3 years too late | Countdown | Avastin 2008→2011; Pepaxto 2021→2023-24. |

---

## 4. The Oregon Trail homage, specifically

Researched against the 1971/78 BASIC source and transcriptions of the 1985
Apple II disk, rather than from memory.

**Borrowed:**
- **"You may:"** — the original's characteristic menu prompt, kept verbatim.
- **The river crossing.** 1985 offered *ford / caulk and float / take a ferry /
  wait to see if conditions improve*, and told you the river's width and depth
  first. The Institutional Crossing offers the same four moves against an IRB
  queue and quotes its depth the same way.
- **The tombstone.** "Would you like to write an epitaph?" The 1985 Apple II
  input routine capped epitaphs at **29 characters** from a fixed alphabet
  (letters, digits, space, comma, period, apostrophe, hyphen). Both limits are
  enforced here.
- **The gravesite.** The original wrote your tombstone back to the game *disk*,
  so the next player of that copy met your grave ("YOU PASS A GRAVESITE. WOULD
  YOU LIKE TO LOOK CLOSER?"). Reproduced with `localStorage`.
- **Naming your party.** The original had you type the names of the people who
  would then die in front of you. Here you name the one person coming with you,
  and they appear through the script and at the death screen.
- **The palette.** The 1985 version shipped a monitor-calibration screen naming
  its whole colour vocabulary: *Orange, Green, Blue, Violet*, plus black and
  white. Its travel screen was predominantly **black** with a single horizon
  line above the wagon, and terrain shifted **green prairie → purple mountains**
  at the halfway point. The scene here does the same, and uses the colour
  change to mark the player's decline.

**Deliberately inverted:**
- **Occupations.** The original paid a *larger* score multiplier for starting
  poorer (banker $1,600 ×1, carpenter $800 ×2, farmer $400 ×3) — "the harder
  you have to try, the more points you deserve." Here there is one patient and
  no multiplier. Starting with less money earns nothing; it kills you sooner.
- **The Oregon Top Ten.** The original's meta-layer was a high-score board
  rating you Trail Guide / Adventurer / Greenhorn. There is no score here,
  because a score would imply the outcome measured how well you played.
- **Arrival.** The Willamette Valley exists. There is no equivalent here.

**A note on the famous line.** "You have died of dysentery" was **never on
screen**. The game printed "*\<name\> has dysentery*" and later "*\<name\> died
of dysentery*" — a named person, never "you." The remembered phrasing is a
fusion of the two. A generation vividly remembers a sentence nobody saw, which
is apt for a game about a system whose obstacles are almost universally
attributed to the wrong institution.

**Deliberate liberty:** the 1985 travel screen had no multi-layer parallax —
that's a DOS-era feature. The light parallax here is a knowing anachronism.

---

## 5. The reskin lineage (cited in-game)

- **Organ Trail: Director's Cut** — The Men Who Wear Many Hats, 2010 (Flash) /
  2012–13. The canonical reskin.
- **The Migrant Trail** — Gigantic Mechanic with Marco Williams, 2014. The most
  important precedent: it proves the Oregon Trail form is *not neutral*. The
  same mechanics that read as frontier optimism in 1985 read as lethal
  attrition when the traveller is undocumented.
- **MECC's own siblings** — Amazon Trail (1993), Yukon Trail (1994), MayaQuest
  (1995), Africa Trail (1995). The publisher reskinned its own game repeatedly.
- **Spent** (McKinney / Urban Ministries of Durham, 2011), **Cart Life**
  (Hofmeier, 2011), **Papers, Please** (Pope, 2013), **Bury Me, My Love**
  (The Pixel Hunt / ARTE, 2017), **Ayiti: The Cost of Life** (Global Kids /
  Gamelab, 2006).

**The three mechanics that actually carry the weight** (and which every
successful reskin keeps): you type the names of the people who will die;
failure is written to disk and shown to the next player; and every choice
trades one resource against a *different* resource, never simply against money.
This game keeps all three.

---

## 6. Money: sourcing policy

Money is as easy to invent as it is to check, so the in-game Sources sheet
lists **every dollar figure with its own citation and the year it refers to**,
and flags scenario assumptions as assumptions rather than laundering them.

Cited figures used:
- Marketplace Silver deductible **$5,304** (2026, KFF); OOP max **$10,600**
  (2026 self-only, HHS revised figure).
- **19%** of in-network marketplace claims denied in 2024; **<1%** appealed;
  **66%** of appeals upheld; only **5%** of denials cited lack of medical
  necessity while **36%** were logged as "other" (KFF).
- Additional out-of-pocket cost of a cancer diagnosis: **$592.53/month**
  overall, **$719.97/month** at stage IV (JAMA Network Open 2025, 2024 dollars)
  — used to calibrate the weekly care charge.
- CT abdomen/pelvis with contrast: **$1,654** median commercial vs **$431**
  Medicare (Radiology 2021). *This replaced a bone-marrow biopsy in v1, which
  was a myeloma procedure and clinically wrong for this patient.*
- Sotorasib launch list price **$17,900/month** (May 2021).
- Trial travel **~$600/month**; **48%** of phase I participants report ≥$1,000/mo
  out of pocket, **50%** live >300 miles from the clinic (The Oncologist 2021).
- **70%** of US counties had no active cancer trial in 2022 (JCO OP 2024).
- Crowdfunding: median goal **$10,000**, median raised **$4,000**, only **11.5%**
  reach goal (JNCCN 2025).
- Median US household income **$83,730** (Census 2024); **37%** of adults could
  not cover a $400 emergency expense with cash (Federal Reserve).

**Flagged as scenario assumptions, not statistics:** starting savings ($12,000),
20% coinsurance, weekly take-home pay ($850).

**Deliberately omitted:** PET/CT, bone marrow biopsy, single infusion visit and
office visit prices. No source worth citing could be found — the figures that
circulate come from price-comparison sites, not research. The game says so in
its Sources sheet rather than filling the gap with plausible numbers.

---

## 7. Technical notes

- Single self-contained `fda.html`. No dependencies beyond Google Fonts
  (Press Start 2P for headings/HUD, VT323 for body, Inter/Space Mono for the
  end card).
- Pixel art drawn procedurally to a 160×96 canvas with
  `imageSmoothingEnabled = false`, upscaled with `image-rendering: pixelated`.
  No image assets.
- Numbered menus are keyboard-selectable (press 1–4), as the original was.
- Square-wave UI blips via Web Audio, mutable from the nav — and silent from
  the death screen onward, deliberately.
- Bills route through a real deductible → coinsurance → out-of-pocket-maximum
  model rather than being flat subtractions.
- A turn-claim guard (`claimTurn()`) prevents a fast double-click applying one
  choice twice; found by hammer-testing, not by reading the code.
