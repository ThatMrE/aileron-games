# FDA: Forever Doesn't Allow — Game Design & Sources (v1.0)

> **One-line pitch:** An *Oregon Trail* reskin where the wagon is a diagnosis,
> the river fordings are IRB queues, and the trail always ends the same way.
> Every rule the game enforces is a real FDA regulation or a real, cited
> historical outcome. There is no win state, on purpose.

---

## 1. Design pillars

1. **The bureaucracy is the terrain.** Oregon Trail's landmarks (Fort Kearney,
   river crossings, South Pass) become regulatory milestones (IND filing,
   IRB review, randomization). You don't manage oxen and wagon wheels — you
   manage Health, Money, and Hope against a calendar that a terminal
   diagnosis doesn't share with the agency, the sponsor, or your insurer.
2. **Every catch-22 is load-bearing, not decorative.** The seven structural
   traps below aren't random flavor text — they are scripted milestones that
   fire in every playthrough, because they are true of the system in every
   playthrough. Player choice changes how much Health/Money/Hope you have
   left when you hit them, not whether they happen.
3. **No winning branch exists in the code.** This isn't a game you're bad at.
   There is no path through the state machine that ends in "you got the drug
   and lived." That's not a balancing failure — it's the thesis.
4. **The ending is a real person, not a stat block.** The game is fiction (a
   composite disease, a composite patient) but the closing card is not. It
   names a real person, a real drug, and real dates, with citations.

---

## 2. The seven catch-22s (and where they live in the game)

| # | Catch-22 | In-game chapter | Legal/factual grounding |
|---|----------|------------------|--------------------------|
| 1 | Expanded access requires the manufacturer's agreement — and the manufacturer has no obligation, and a real disincentive, to give it. | **Three Doors** | 21 CFR 312.305 / Subpart I: FDA authorizes the *use*, but the sponsor must independently agree to *supply* the drug and cannot be compelled to. FDA authorizes ~99% of individual patient expanded-access requests it receives — the bottleneck is never the agency. |
| 2 | A single-patient IND still needs a supplying manufacturer, so the loop closes on itself. | **Three Doors** | Same CFR subpart. FDA can approve the IND application itself in days (even hours, for emergencies) — an approval to receive a drug no one is obligated to ship you. |
| 3 | By the time you meet the progression criteria that qualify you for a trial, you often fail the performance-status criteria that let you enroll. | **Screening — Trial A** | Registrational oncology trials overwhelmingly restrict to ECOG performance status 0–1; historically well under 5% of patients in pivotal trials leading to FDA approval had ECOG PS ≥2, despite PS-2 patients being a large share of the real-world population. Progression (the thing that makes you eligible for a later-line trial) is often exactly what erodes performance status (the thing that makes you eligible to enroll). |
| 4 | Randomization means you may spend your remaining time in the control arm. | **Screening — Trial B** | Most confirmatory Phase 3 oncology trials are randomized 1:1 or 2:1 against standard of care or placebo; cross-over on progression is not guaranteed by protocol. |
| 5 | Your insurer covers standard of care, but not the standard of care you receive *while on trial* — so being enrolled costs you money. | **On Trial** | ACA §2709 (PHS Act, added 2010, effective 2014) requires most plans to cover *routine patient care costs* during a qualifying trial, but explicitly excludes the investigational article itself and any item "provided solely to satisfy data collection... and not used in direct clinical management." Extra protocol-mandated scans, biopsies, and visits routinely fall outside that line. Medicaid wasn't required to cover routine trial costs until the Clinical Treatment Act (2021), effective Jan 2022. |
| 6 | Site IRB queues and clinical holds run on institutional time, not patient time. | **Institutional Time** | 21 CFR 312.42 gives FDA up to 30 days just to *review* an IND and can impose a clinical hold that stops the clock entirely; IRB continuing review and multi-site amendment cycles routinely add weeks to months, and none of it is expedited because a given patient is running out of time. |
| 7 | Accelerated approval, then withdrawal after the confirmatory trial reads out negative — years after you'd have needed it. | **Countdown (epilogue ticker)** | Real, cited examples, not composites: **Avastin/bevacizumab**, metastatic breast cancer — accelerated approval Feb 2008; confirmatory AVADO/RIBBON1 trials failed to verify benefit; FDA withdrew the indication Nov 18, 2011 (≈3 yrs 9 mo later). **Pepaxto/melphalan flufenamide**, multiple myeloma — accelerated approval Feb 26, 2021; confirmatory OCEAN trial showed a worse-survival signal; withdrawn 2023–24 (≈3 yrs later). |

---

## 3. The ending

The game always ends the same way: the player's Health reaches zero and they
die, mid-process, with no drug in hand. There is no score.

The end card tells the story of **Abigail Burroughs** (1979–2001), diagnosed
with head-and-neck cancer at 19. Cetuximab (Erbitux) was showing promising
results, but was only open to *colon cancer* trial patients — her cancer was
in the wrong organ to qualify. She sought compassionate use and was denied;
she died June 9, 2001, before any pathway resolved. Erbitux received
accelerated approval for colorectal cancer in February 2004 and full approval
for head-and-neck cancer (in combination with radiation) in March 2006 — 2.5
and nearly 5 years after she died. Her father, Frank Burroughs, founded the
Abigail Alliance for Better Access to Developmental Drugs; its 2003 lawsuit
against the FDA reached the D.C. Circuit and lost in 2007, and the Alliance's
advocacy fed directly into the state and federal Right to Try movement that
culminated in the federal Right to Try Act of 2018 — a law that, per catch-22
#1/#2 above, still does not compel any manufacturer to say yes.

This is presented as a real historical account with citations, clearly
demarcated from the fictional playthrough that precedes it.

---

## 4. Sources consulted (also surfaced in-game via the "Sources" screen)

**Expanded access / compassionate use / Right to Try**
- 21 CFR Part 312, Subpart I — [eCFR](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-D/part-312/subpart-I)
- FDA, *Expanded Access to Investigational Drugs for Treatment Use* — [fda.gov/media/162793](https://www.fda.gov/media/162793/download)
- FDA, *Physician Request for a Single Patient IND for Compassionate or Emergency Use* — [fda.gov](https://www.fda.gov/about-fda/center-drug-evaluation-and-research-cder/physician-request-single-patient-ind-compassionate-or-emergency-use)
- FDA, *Right to Try* — [fda.gov/patients/learn-about-expanded-access-and-other-treatment-options/right-try](https://www.fda.gov/patients/learn-about-expanded-access-and-other-treatment-options/right-try)
- Congressional Research Service, *Right to Try: Access to Investigational Drugs* (R45414) — [congress.gov](https://www.congress.gov/crs-product/R45414)

**Trial eligibility / performance status / randomization**
- *Performance Status Restriction in Phase III Cancer Clinical Trials* — [PMC9671537](https://pmc.ncbi.nlm.nih.gov/articles/PMC9671537/)
- Friends of Cancer Research, *Rethinking ECOG Scores to Improve Patient Access and Clinical Trials Eligibility* — [friendsofcancerresearch.org](https://friendsofcancerresearch.org/news/applied-clinical-trials-online-rethinking-ecog-scores-to-improve-patient-access-and-clinical-trials-eligibility/)

**Insurance coverage of trial costs**
- 42 U.S.C. §300gg-8 (PHS Act §2709) — [uscode.house.gov](https://uscode.house.gov/view.xhtml?req=%28title%3A42+section%3A300gg-8+edition%3Aprelim%29)
- CMS, *ACA Implementation FAQs — Set 15* — [cms.gov](https://www.cms.gov/cciio/resources/fact-sheets-and-faqs/aca_implementation_faqs15)
- Clinical Treatment Act (Consolidated Appropriations Act, 2021), Medicaid routine-cost coverage effective Jan. 1, 2022

**IND review, clinical holds, IRB timing**
- 21 CFR 312.42 (clinical holds) — [eCFR](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-D/part-312)
- WCG, *Questions on the FDA's 30-Day IND Review Period and IRB Approval* — [wcgclinical.com](https://www.wcgclinical.com/insights/questions-on-the-fdas-30-day-ind-review-period-and-irb-approval/)

**Accelerated approval, withdrawal**
- FDA, *Regulatory Decision to Withdraw Avastin (bevacizumab)* — [fda.gov/media/79525](https://www.fda.gov/media/79525/download)
- *The Avastin Story*, NEJM — [nejm.org/doi/full/10.1056/NEJMc1109550](https://www.nejm.org/doi/full/10.1056/NEJMc1109550)
- FDA, *Final Decision on the Proposal to Withdraw Approval of [melphalan flufenamide]* — [fda.gov/media/176510](https://www.fda.gov/media/176510/download)
- FDA, *Withdrawn: FDA grants accelerated approval to melphalan flufenamide...* — [fda.gov](https://www.fda.gov/drugs/resources-information-approved-drugs/withdrawn-fda-grants-accelerated-approval-melphalan-flufenamide-relapsed-or-refractory-multiple)

**Development timelines / success rates**
- PDUFA goals: 10-month standard / 6-month priority review — [FDA, Priority Review](https://www.fda.gov/patients/fast-track-breakthrough-therapy-accelerated-approval-priority-review/priority-review)
- Clinical development success rates (Phase 1 → approval, ~6.7–10%) — Biostatistics/Nature Reviews Drug Discovery literature (see reading list; figures compressed for in-game display).

**Abigail Burroughs / Erbitux / Abigail Alliance**
- *The Drug Chase*, CURE — [curetoday.com](https://www.curetoday.com/view/v4n3---the-drug-chase)
- *Abigail Alliance v. Von Eschenbach: A closer look*, Fierce Biotech — [fiercebiotech.com](https://www.fiercebiotech.com/biotech/abigail-alliance-v-von-eschenbach-a-closer-look)
- *The Abigail Alliance Case*, Neurology Today — [neurologytoday.aan.com](https://neurologytoday.aan.com/doi/10.1097/01.NT.0000337677.15055.11)
- University of Pittsburgh, *Abigail Alliance case discussed: Balancing study drugs, safety* — [utimes.pitt.edu](https://www.utimes.pitt.edu/archives/?p=8605)

---

## 5. Technical notes

- Single self-contained `fda.html`, matching the Aileron dark/cyan house
  style (Orbitron / Inter / Space Mono), no external dependencies beyond the
  shared Google Fonts link used sitewide.
- State machine: a linear array of **chapters**, each either a scripted
  `milestone` (fixed regulatory beat, real citation shown) or a `travel` leg
  (2–3 flavor choices with small, real resource trade-offs). No chapter or
  branch grants a cure or long-term drug access — death is guaranteed by
  Health reaching 0, and the chapter list is long enough relative to disease
  decline rates that it always resolves before the "Countdown" chapter ends.
- HUD tracks Health / Money / Hope / elapsed weeks at all times, styled as a
  case-file readout rather than a game HUD.
- A **Sources** screen (reachable from the end card and a persistent footer
  link) lists the full bibliography above with live links, so every claim
  the game makes is checkable.
