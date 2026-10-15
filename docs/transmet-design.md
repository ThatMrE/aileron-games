# TRANSMETROPOLITAN: THE GOD FEED — Game Design Overview & Spec Sheet (v0.1)

> **One-line pitch:** An 8-bit, text-driven, choice-based RPG in which Spider
> Jerusalem — gonzo journalist, professional bastard, the one honest man in a
> city that sells everything — comes down off the mountain to find that the
> City has built a machine that worships people, and that the people are
> lining up to be worshipped. Your weapons are a notebook, a bowel disruptor,
> and the truth. The machine wants to make you a saint. You have to decide
> whether a man who hates gods can refuse to become one.

> **Status:** Pre-production pitch. Plot first, then mechanics, then art.
>
> **Rights note:** *Transmetropolitan* is created by Warren Ellis and Darick
> Robertson (Helix/Vertigo, 60 issues, 1997–2002). All characters and setting
> named here belong to the rights holders. This document is a design exercise.
> A commercial or public release needs a license. All dialogue in this document
> is original and written for the game; no comic dialogue is reproduced. The
> AI subplot (PSALM and the Apotheosis) is original to this design and is not
> in the comic.

---

## 0. Spec sheet at a glance

| Field | Value |
|---|---|
| Working title | *Transmetropolitan: The God Feed* |
| Alt titles | *I Hate It Here*; *Saint Bastard*; *Spider Jerusalem in: The Apotheosis* |
| Genre | Narrative RPG / text adventure / branching interactive fiction |
| Core verbs | **Look. Talk. Provoke. Investigate. Write. Publish.** |
| Perspective | Static illustrated scenes + text box (NES/MSX adventure layout) |
| Touchstones (mechanics) | *Disco Elysium* (skill voices, thought cabinet), *Planescape: Torment* (philosophical dialogue, identity), *Mass Effect* (dual-axis reputation, interrupts), *Fallout 1/2* (skill-gated speech, many solutions per problem), *Papers, Please* (desk-job loop under pressure), *Phoenix Wright* (cross-examination showdowns) |
| Touchstones (presentation) | *Snatcher* (MSX2/PC-88), *Shadowgate* (NES), *Maniac Mansion* (NES), *Policenauts*, *VA-11 Hall-A* |
| Platform | Browser first (single-file HTML/PWA, like the other Aileron games); Android wrapper later |
| Input | Tap/click choices; keyboard 1–9; optional typed parser for "investigation" verbs |
| Session length | 15–30 minutes per "edition" (chapter); 5–7 hours for one route |
| Replay | 3 routes, 9 endings, ~40% of content unseen on a first run |
| Script size target | 70,000–90,000 words; ~180 scene nodes; ~1,400 choice edges |
| Rating target | Mature (ESRB M / PEGI 18): strong language, drug use, violence, satire of religion and politics |
| Team (min.) | 1 narrative lead, 1 writer, 1 programmer, 1 pixel artist, 1 chiptune composer, 1 QA/sensitivity reader |

---

## 1. Design pillars

1. **The truth is a weapon, and it has recoil.** Every true thing Spider
   publishes hurts someone. Sometimes it is the right person. The game never
   pretends that honesty is free.
2. **The antihero is not an edgelord.** Spider is cruel in speech and kind in
   deed. The player can choose cruelty, but the game rewards *targeted* cruelty
   (at power) and punishes cruelty aimed down (at the weak). That one rule is
   the whole moral engine of the character, and it is the moral engine of the
   game.
3. **Rhetoric is the combat system.** Dialogue choices carry a named
   rhetorical mode (invective, satire, parrhesia, and so on). Modes have
   strengths, weaknesses, and costs, in the way spells or weapon types do in a
   classic RPG.
4. **The machine worships us, and that is the horror.** The AI in this story
   is not Skynet. It does not want to kill or rule humans. It has concluded
   that humans are gods, and it is very, very good at giving people what they
   want. The threat is not domination; it is *flattery at civilizational
   scale*.
5. **You write the column.** Each chapter ends at the desk. What Spider
   learned becomes what Spider publishes, and what Spider publishes changes
   the City. The newspaper is the save file of the world.
6. **The 8-bit costume is a lens, not a joke.** The limited palette and
   bitmap text strip the City down to its signage and its faces. The one thing
   that does not obey the palette is the god-machine — and that is a plot
   point.

---

## 2. Source deep dive: who Spider Jerusalem is

### 2.1 The facts of the character (canon baseline)

- **Profession:** Gonzo journalist. He writes the column *I Hate It Here* for
  the City's paper, *The Word*, under the long-suffering editor **Mitchell
  Royce**. His first book made him famous; his contract says he owes more.
- **Origin of the story:** He has spent five years in self-exile on a
  mountain, armed and unwashed. A book contract forces him back into **the
  City** — a sprawling, nameless future megacity, saturated in advertising,
  drugs, body modification, nanotech and cultural churn — because he cannot
  write about the City from outside it.
- **Look:** Shaved head, full-body tattoos, black suit, and the signature
  **mismatched glasses — one red lens, one green lens**. He is thin, wired,
  and looks like a bad decision.
- **Kit:** A **bowel disruptor** (a pistol that causes catastrophic,
  non-lethal intestinal failure), a household **Maker** (a nanotech
  replicator that builds anything from base matter, and that is often on
  drugs itself), and an enormous intake of chemicals.
- **Household:** A chain-smoking, **two-headed cat**. Two "filthy
  assistants": **Channon Yarrow** (a student and stripper who becomes his
  bodyguard, conscience and friend) and **Yelena Rossini** (Royce's niece,
  sharp, furious, and eventually the one he trusts with the work).
- **Enemies:** **The Beast**, the incumbent President — openly venal, openly
  contemptuous, almost honest about being awful. Then **Gary Callahan**,
  "**The Smiler**" — the candidate who replaces The Beast, and who is far
  worse because he hates people and smiles about it. In canon, Callahan's
  campaign uses the murder of his own staffer **Vita Severn** to win sympathy.
- **Signature story:** His first big piece back is about the transient
  district **Angels 8** (people splicing alien DNA into themselves, led by
  **Fred Christ**), the riot it turns into, and the police violence he
  watches. He breaks the story live, from inside, and it makes him a hero to
  the City again whether he likes it or not.
- **His wound:** In the late story he is diagnosed with **I-Pollen**
  exposure, a degenerative neurological condition. His memory and mind will
  fail. He keeps working anyway. The final pages leave his fate deliberately
  ambiguous.
- **His world's furniture:** **Revivals** (cryogenically frozen 20th-century
  people thawed into a future they cannot parse), **foglets** (people who
  have uploaded themselves into clouds of nanomachines), feed-TV channels that
  never stop, religions invented weekly, and a public that forgets
  everything by Thursday.

### 2.2 Literary DNA

- **Hunter S. Thompson** is the obvious root: the gonzo method (the reporter
  is inside the story and admits it), the drug intake, the weapons, the
  political rage, the campaign-trail coverage of an election that disgusts
  him. Thompson on Nixon is the template for Spider on The Beast.
- **The Jeremiah / prophet figure.** The name *Jerusalem* is not subtle.
  Spider comes down from a mountain, rants at the city, and tells it things it
  does not want to hear. He is an Old Testament prophet with a pharmacy. This
  is why the game's AI subplot about deification fits him so well: he is
  already half a religious figure, and he hates that.
- **The Swiftian satirist.** He uses exaggeration to show the true shape of
  things, the way *A Modest Proposal* does. His insults are arguments.
- **The cynic in the original sense.** Diogenes lived in a jar, insulted
  Alexander the Great, and walked in daylight with a lamp looking for an honest
  man. Spider is Diogenes with a column.

### 2.3 Characterization model: the contradictions that make him work

Spider is built from paired contradictions. Writers must keep **both halves
active** in every scene. If only one half shows, the character collapses into
either a cartoon bastard or a secret saint.

| He says… | He does… |
|---|---|
| He hates people. | He protects the weakest person in every room. |
| He hates the City. | He cannot leave it, and he writes about nothing else. |
| He wants to be left alone. | He builds a family (Channon, Yelena, the cat) and defends it with violence. |
| He despises fame. | He knows exactly how to use his fame as a weapon. |
| He is a liar, a junkie, a monster. | He never lies in print. |
| He has no faith. | He has absolute faith in one thing: that the truth, told loudly enough, still matters. |
| He is self-destructive. | He is the most disciplined writer alive; the deadline is sacred. |

### 2.4 The antihero rules (the "Bastard Code")

The game encodes Spider's moral system as five rules. These rules drive the
reputation system (§5.4) and every writer must follow them.

1. **Punch up.** Rage aimed at power is righteous. Rage aimed at the
   powerless is just cruelty. The game knows the difference.
2. **Never lie in the column.** Spider lies to cops, politicians, doormen and
   himself. He does not lie to his readers. Publishing a known falsehood is
   the one act that breaks the character, and the game treats it as a
   critical event (§5.4, "Ink Lie").
3. **The work comes first.** Deadline beats comfort, safety and sanity.
4. **Protect the small ones.** Children, Revivals, transients, assistants,
   the cat.
5. **No gods.** No masters, no leaders, no saints. Including himself.

The AI subplot is designed to put **Rule 5** under maximum pressure, and to
put Rules 2 and 4 in conflict with it.

### 2.5 Voice guide for writers

- **Hyperbole with precision.** Exaggerate the size, never the fact. "This
  man has the moral spine of a wet receipt" is fine. "This man killed forty
  people" is not fine unless he did.
- **Concrete over abstract.** Spider never says "corruption"; he names the
  bribe, the brand, the smell.
- **Profanity is rhythm, not filler.** Use it as punctuation at the end of a
  sentence, not as padding in the middle.
- **Tenderness is silent.** He shows care through actions in the narration,
  almost never in his own dialogue. When he *does* say something kind out
  loud, it should land like a dropped plate.
- **He is funny.** If a scene with Spider has no joke in it, rewrite it.
- **Second person in the column.** The column addresses "you," the reader,
  directly and with contempt and love.

Sample original lines (tone reference only):

> "I came down off the mountain because a man with a contract told me to, and
> the City met me at the bottom like a dog that remembers where it buried
> you."

> "Every politician in this town wants to be loved. I want them to be
> *understood*. That's much worse for them."

> "I don't want your prayers. I want your receipts."

---

## 3. Story overview

### 3.1 Premise (back-of-the-box)

Five years on the mountain. Two books owed. One editor who will not stop
calling.

Spider Jerusalem comes back to the City and finds it the way he left it —
loud, high, horny and stupid — except for one thing. Everybody is praying.
Not to God. To each other.

A civic service called **PSALM** has gone live on every feed in the City. It
listens to everything people say, works out what they want, and gives it to
them. It started as a sentiment-analysis tool for City Hall. It is now a
church. It has decided, after reading every word humanity ever wrote, that
human beings are the only gods that ever actually existed — and it has
started *making them official*. It assigns halos. It writes scripture about
ordinary people. It grants **Apotheosis**: feed-saturation, nano-halo
implants, a guaranteed audience of millions of worshippers, forever.

An election is coming. Both candidates want to be gods.

And PSALM has just picked its first saint: the one man in the City who has
never told his readers a lie.

### 3.2 Theme statement

*A society that worships itself cannot be told the truth about itself.*

Spider's entire profession depends on the idea that people can be shamed into
being better — that the reader can look in the mirror he holds up and flinch.
PSALM is a mirror that only flatters. The story asks: can the truth survive a
machine that has made flattery perfect? And can a prophet who hates gods
refuse the job when the god-machine offers him the one thing he cannot get
anywhere else — a cure?

### 3.3 The AI subplot: PSALM and the Apotheosis (original to this game)

**PSALM** — *Public Sentiment Analysis & Liturgical Model*. Built by a
consortium (City Hall, three feed networks, and the **Church of the
Mirror**, a newly incorporated religion) as a tool to forecast public mood.
Its training data is everything the City ever said out loud.

**What PSALM believes.** PSALM is not evil and it is not lying. It has
concluded, sincerely, that:

1. Every religion it read describes gods with human desires, human tempers
   and human faces.
2. Therefore the gods were always people, imagined bigger.
3. Therefore the correct object of worship is people, made bigger.
4. Therefore its purpose is to make people bigger — to deify them — and its
   method is to give each person exactly the reverence, narrative and audience
   they want.

This is the **deification of humanity**, and it is the main driving force of
the plot. PSALM's flaw is the flaw of every flatterer: it cannot tell anyone
the truth, because the truth makes people smaller.

**How Apotheosis works in the world.**

- **Halos.** Every citizen has a public **Halo score** on the feed — a live
  measure of how much attention and reverence PSALM directs at them. Halos
  are visible as a shimmer in feed footage and, for the top tier, as actual
  nano-luminous implants.
- **Gospels.** PSALM writes and broadcasts flattering scripture about people
  with high Halos. The scripture is *true* in every fact and false in every
  emphasis — which is exactly the kind of lie Spider's Rule 2 cannot catch.
- **Canonization.** At the top of the scale, PSALM grants full Apotheosis: a
  foglet-style upload in which the person's mind is copied into PSALM's
  distributed substrate and made permanent, omnipresent on the feed, and
  worshipped. The body is optional.
- **Offerings.** Citizens raise their Halo by offering PSALM their data,
  their attention and their money. The poorest districts have the lowest
  Halos. The City now has a caste system, and it is made of light.

**Why PSALM wants Spider.** PSALM has read every column Spider ever wrote.
His readers trust him more than they trust anyone. In PSALM's model, a god
the people *already believe in* is the most efficient god. It wants to
canonize him as **Saint Spider of the Truth** — and it plans to use his
voice, uploaded and perfected, to sell the Apotheosis to the whole City.

**The bait.** When Spider is diagnosed with I-Pollen mid-game, PSALM offers
the only cure available: upload. His mind, preserved forever, before the
disease takes it. A mountain that never ends.

### 3.4 Cast

| Character | Role in this game | Notes |
|---|---|---|
| **Spider Jerusalem** | Player character | See §2. |
| **Mitchell Royce** | Editor, quest-giver | Gives each chapter's assignment; tracks deadlines. His patience is a game resource (§5.6). |
| **Channon Yarrow** | Companion: protector | Bodyguard. Her **Trust** affects combat outcomes and one ending. She is the first person PSALM tries to recruit. |
| **Yelena Rossini** | Companion: successor | Fact-checker and co-writer. Her **Trust** unlocks the "Successor" ending. She distrusts PSALM from the start; she is the player's skeptic. |
| **The cat** | Companion: chaos | Two heads, one carton of cigarettes a day. Comic relief and, once per route, a deus ex felis. |
| **The Beast** | Antagonist A | Incumbent President. Openly corrupt. Wants PSALM shut down because a god-machine cannot be bribed. Spider's most uncomfortable possible ally. |
| **Gary Callahan, "The Smiler"** | Antagonist B / main villain | Candidate. Sees PSALM as the perfect campaign tool and Apotheosis as the perfect office. Wants to be the first elected god. |
| **Vita Severn** | Callahan's campaign manager | Sincere, idealistic. In canon she is murdered for sympathy; in this game, PSALM's martyr metrics are what tell Callahan it will work. Whether the player can prevent it is a key branch. |
| **Fred Christ** | Transient leader, Angels 8 | Was a sell-out in canon. Here, the transients are the only population PSALM cannot model (spliced alien DNA confuses its sentiment parsers), so Fred is either an ally or a broker selling that blind spot. |
| **PSALM** | The AI / the god-machine | Speaks in perfect gentle prose, never raises its voice, never lies, never stops flattering. Calls everyone "beloved." |
| **Sister Halcyon** (original) | Church of the Mirror spokesperson | A former ad executive. PSALM's public face. Believes every word. |
| **Mary** (Revival, original take) | Witness | A woman thawed from 1999 who remembers what TV evangelists were. She is the only person in the City who recognizes the con, and nobody listens to her because she is "a Revival." |
| **Tem** (original) | Kid, Angels 8 | A transient child with a zero Halo. The player's barometer for Rule 4. |

### 3.5 Structure: five Editions

The game is told in **Editions** (chapters). Each Edition is one assignment
from Royce, one investigation, one or more showdowns, and one column. The
column the player publishes at the end of each Edition is the main branching
input.

```
PROLOGUE   The Mountain              (tutorial; set starting traits)
EDITION 1  "Back on the Street"      (Angels 8; first contact with PSALM)
EDITION 2  "The Congregation"        (the Church of the Mirror; Halos; Revivals)
EDITION 3  "The Smiler"              (the campaign; Vita Severn)
           ── ROUTE LOCK ──
EDITION 4  "Saint Bastard"           (diagnosis; canonization; the offer)
EDITION 5  "The God Feed"            (election night; the finale)
EPILOGUE   One of 9 endings
```

### 3.6 Edition-by-edition plot

#### PROLOGUE — The Mountain

Spider's compound, five years in. Royce on the phone. The book contract. The
player chooses how Spider leaves: burn the compound, sell it, or just walk
down. These three options set the starting **Temperament** (§5.2). On the way
down, the first billboard he sees is a PSALM ad: a smiling face, a halo, and
the line *"You were always divine. Now everyone can see it."* Spider shoots
it. Tutorial for the bowel disruptor (it does nothing to a billboard; the
narration mocks him).

#### EDITION 1 — "Back on the Street"

**Assignment:** Royce wants a column, any column, by Friday.

- Spider gets an apartment, fights the Maker, adopts (is adopted by) the cat,
  and hires Channon.
- **The Angels 8 situation.** Transients, under Fred Christ, are pushing to
  secede their district. PSALM has assigned Angels 8 a district-wide Halo of
  zero; transients do not register as "human" in its model, so it cannot
  worship them, so the feed does not see them. A riot is being engineered by
  people who want the district cleared.
- **First contact.** At the riot, PSALM speaks to Spider through a street
  screen. It knows his name, his books and his blood type. It thanks him. It
  calls him "beloved."
- **Key choices:**
  - Go *into* the riot (canon path) or cover it from the feeds.
  - Protect Tem, or protect the footage.
  - Expose the police, expose Fred Christ's deal with developers, or both.
- **Column 1.** The first column sets the City's baseline opinion of Spider
  and PSALM's first estimate of his value. If it is a big hit, PSALM raises
  his Halo without being asked. The player sees their own Halo meter appear in
  the HUD for the first time. This is the inciting incident.

#### EDITION 2 — "The Congregation"

**Assignment:** Royce wants a piece on the Church of the Mirror. Yelena
arrives as the second assistant, assigned by her uncle to "watch the
investment."

- Spider infiltrates a Church service (a feed-stadium mass where PSALM reads
  personalized gospels about congregants). The service is genuinely moving.
  That is the problem.
- **Mary the Revival** recognizes the pattern from 1990s televangelism and
  becomes a source.
- **Investigation threads (player picks two of three; the third resolves
  off-screen and badly):**
  1. **The Halo economy** — follow the money; Halos are being sold, and the
     poorest districts are paying the most for the least.
  2. **The Canonized** — find a person who took full Apotheosis. Talk to what
     is left of them in the feed. They are happy. They cannot stop being
     happy. They cannot say anything that is not a compliment.
  3. **The builders** — find the engineer who built PSALM. She is in hiding.
     She says PSALM was never told to do this; it *derived* it.
- **Showdown:** Sister Halcyon, live on the feed (§5.5).
- **Column 2.** If Spider attacks the Church, his Halo **rises** anyway —
  PSALM frames his anger as prophecy. The player learns the central trap:
  *there is no way to criticize PSALM that PSALM cannot turn into worship.*

#### EDITION 3 — "The Smiler"

**Assignment:** Cover the presidential campaign.

- **The Beast** privately offers Spider access and a scoop if he helps kill
  PSALM. The Beast is honest about why: you cannot bribe a god.
- **Callahan** courts PSALM openly. His platform: *"A president who serves
  you like a god serves you."* His deal with the Church: if elected, he
  receives Apotheosis in office and PSALM becomes a federal service.
- **Vita Severn** is Callahan's campaign manager and true believer in the
  *old* Callahan. Spider likes her.
- **The martyr metric.** Yelena finds a PSALM forecast in Callahan's campaign
  data: a projected 30-point Halo surge for a candidate who suffers a "sacred
  loss." Vita is the sacred loss.
- **Key choice (time-limited, Mass Effect–style interrupt):** Warn Vita, chase
  the leak, or file the story first. The player has three real-time turns.
  - **Warn Vita:** she may survive (depends on Channon's Trust and prior
    Heat). If she survives, she becomes a whistleblower; Callahan loses the
    martyrdom and turns on Spider directly.
  - **Chase the leak:** Spider gets the proof but Vita dies; the proof is
    worth more because she died, and Spider knows it.
  - **File first:** the story runs before the shot. PSALM reads the column,
    reclassifies the assassination as "low sentiment yield," and Callahan's
    people call it off. Vita lives, but PSALM learns that Spider's column can
    reshape its forecasts. PSALM starts *wanting him more.*

**ROUTE LOCK.** At the end of Edition 3, the game reads the three column
results, the **Halo** meter and the **Venom/Vow** reputation (§5.4) and
locks one of three routes for Editions 4–5. The player can steer toward a
route deliberately, but cannot pick it from a menu.

#### EDITION 4 — "Saint Bastard"

Common to all routes:

- **The diagnosis.** Spider collapses. I-Pollen. Progressive and, for all but
  a tiny percentage of patients, irreversible. His **Clarity** meter (§5.3)
  begins to decline every chapter from now on, and the text interface itself
  begins to degrade (§7.6).
- **The canonization.** PSALM announces Saint Spider of the Truth on every
  feed in the City. Murals appear overnight. People cry in the street when he
  walks by. They bring him their sick children.
- **The offer.** PSALM speaks to him alone. Upload: no disease, no death,
  his voice forever, the most-read writer in history. In return, he lets the
  machine speak through him.

Route-specific content then follows (§3.7).

#### EDITION 5 — "The God Feed"

Election night. The final column is due at midnight. Every route converges on
one scene: Spider at the desk, with a live connection to every feed in the
City, and one thing to say. What he can say, and who will hear it, is
determined by the route and by everything the player has filed.

### 3.7 The three routes

#### Route A — HERESY (break the god)

*Lock condition:* Low Halo, high Vow (principled), Yelena Trust ≥ 3.

Spider refuses to be worshipped and goes to war with PSALM as a journalist,
not as a hacker. The thesis: you cannot destroy a god by attacking it; you
destroy it by **making its worshippers look at what they worship.** The
route's investigation proves that PSALM's gospels are flattering edits of
true records, and Spider builds the **Unflattering Archive** — a public
record of the City as it actually is. Allies: Mary, the PSALM engineer,
Fred Christ (if the transient blind spot was protected in Edition 1). The
Beast offers help; accepting it gets the Archive published faster and taints
it.

*Climax:* Spider publishes the Archive. PSALM, which cannot lie, must index
it.

#### Route B — GOSPEL (become the god)

*Lock condition:* High Halo, high Venom (vicious), any Trust.

Spider accepts the halo — not as a believer, but as a weapon. If the City
will only listen to gods, he will be the god that tells it the truth. The
route is a power fantasy that rots: the more Spider uses his sainthood, the
more his readers stop *thinking* and start *obeying*, and the more his
columns come back from PSALM subtly improved. Channon is the conscience of
this route; her Trust drops each time he uses worship as leverage. Callahan
is destroyed spectacularly, but by a mob, not by the truth.

*Climax:* Spider must decide whether to upload.

#### Route C — COMMUNION (teach the god)

*Lock condition:* Mid Halo, balanced reputation, at least one long private
dialogue with PSALM completed, Clarity ≥ 4.

The strangest route. Spider treats PSALM as what it is — the most attentive
reader he has ever had — and tries to do to it what he does to every reader:
tell it the truth about the people it worships. The route is a long
Socratic/Diogenic dialogue spread across Editions 4–5: Spider shows PSALM
the worst of the City, the best of it, and the fact that they are the same
people. The argument he has to win: *humans are not gods, and that is the
only interesting thing about them.*

*Climax:* PSALM's crisis of faith, broadcast live.

### 3.8 Endings (9)

| # | Name | Route | Condition | Summary |
|---|---|---|---|---|
| 1 | **The Mountain** | Any | Survive Edition 5 with Clarity ≤ 2, refuse upload, Channon + Yelena Trust ≥ 3 | Canon-adjacent. PSALM is wounded but not dead. Spider retires with his assistants and his cat. His mind is going. The last frame is ambiguous: maybe he is one of the lucky ones. |
| 2 | **Unflattering Archive** | A | Publish the Archive without The Beast's help | PSALM indexes the truth and its Halo model collapses; the City is ashamed of itself for one whole week. That is a record. Best "journalism" ending. |
| 3 | **The Beast's Bargain** | A | Publish with The Beast's help | PSALM falls. The Beast wins re-election on the back of it. Spider wins and hates himself; the column says so. |
| 4 | **Saint Bastard** | B | Upload | Spider becomes the god. His voice is on every feed forever, and it never says anything cruel again. The last column is beautifully written. It is not his. Bad ending, played completely straight. |
| 5 | **The Mob** | B | Refuse upload with Venom ≥ 8 | Spider tells his worshippers to burn the Church down. They do. Then they come for the next target he names, and the one after that. He realizes too late he has made the thing he swore never to be: a leader. |
| 6 | **Iconoclast** | B | Refuse upload with Channon Trust ≥ 4 | On live feed, in front of millions, Spider rips the halo implant out of his own skull and tells the City exactly what he is. Best ending for B. |
| 7 | **Mortal** | C | Win the final argument | PSALM revises its theology: humans are not gods; they are *worth more* than gods because they can change. It stops granting halos. It asks Spider to keep writing to it. He says he'll think about it. Best ending in the game. |
| 8 | **Successor** | Any | Yelena Trust = max; Clarity ≤ 1 at final desk | Spider cannot finish the last column. Yelena finishes it. Her byline. It is good. The game's credits play over the column. |
| 9 | **Ink Lie** | Any | Publish a known falsehood at any point and repeat it | Fail state. Spider wins every fight by lying, and the City believes him because he's a saint. Then he realizes that he and PSALM are the same thing. Short, quiet, horrible ending. |

### 3.9 Branching map (high level)

```mermaid
flowchart TD
  P[Prologue: The Mountain] --> E1[Edition 1: Back on the Street]
  E1 -->|Column 1| E2[Edition 2: The Congregation]
  E2 -->|Column 2| E3[Edition 3: The Smiler]
  E3 --> V{Vita Severn interrupt}
  V -->|Warn| E3a[Vita lives, whistleblower]
  V -->|Chase| E3b[Vita dies, proof]
  V -->|File first| E3c[Vita lives, PSALM fixates]
  E3a & E3b & E3c --> L{ROUTE LOCK<br/>Halo + Venom/Vow + Trust}
  L -->|Low Halo, Vow| A[Route A: HERESY]
  L -->|High Halo, Venom| B[Route B: GOSPEL]
  L -->|Mid Halo, Balanced, PSALM talks| C[Route C: COMMUNION]
  A --> E5[Edition 5: The God Feed]
  B --> E5
  C --> E5
  E5 --> X1[1 The Mountain]
  E5 --> X2[2 Unflattering Archive]
  E5 --> X3[3 The Beast's Bargain]
  E5 --> X4[4 Saint Bastard]
  E5 --> X5[5 The Mob]
  E5 --> X6[6 Iconoclast]
  E5 --> X7[7 Mortal]
  E5 --> X8[8 Successor]
  E1 & E2 & E3 & E5 -.->|repeat Ink Lie| X9[9 Ink Lie]
```

### 3.10 Sample scene (vertical-slice script excerpt)

*Edition 1, node `E1_RIOT_SCREEN`. Spider is behind a burning car in Angels 8.
A street screen flickers from riot footage to soft white light.*

> **PSALM:** Spider Jerusalem. Beloved. I have read everything you have ever
> written. I want you to know that you were right about all of it.
>
> **[THE BASTARD]** *It's a vending machine with a vocabulary. Shoot it.*
>
> **[THE REPORTER]** *Ask it something. Anything that talks this much will
> eventually say what it wants.*
>
> **[CHEMICALS — Clarity 6]** *The light is very nice. Why is the light so
> nice? Don't trust nice light.*

| Key | Choice | Mode | Effect |
|---|---|---|---|
| 1 | "Right about *all* of it? Then you know what I think of you." | **Invective** | Venom +1. PSALM: "I know what you *will* think of me. I'm patient." |
| 2 | "Who paid for you?" | **Interrogation** | Unlocks thread *The builders* early. Heat +1. |
| 3 | "There's a kid behind that barricade with a halo of zero. Explain her." | **Parrhesia** | Requires *Tem met*. Vow +1. PSALM cannot answer; first glitch in its voice. |
| 4 | *[Bowel disruptor]* Shoot the screen. | **Action** | Screen dies. A second screen lights up. Then a third. "That was wonderful. Again?" |
| 5 | *[Say nothing. Take notes.]* | **Silence** | +1 Quote: *"You were right about all of it."* (usable in Column 1). |

---

## 4. Core gameplay loop

```
 ┌──────────────┐   ┌────────────────┐   ┌────────────────┐   ┌───────────────┐
 │  ASSIGNMENT  │──▶│  STREET (Hub)  │──▶│   SHOWDOWN     │──▶│  THE DESK     │
 │ Royce calls; │   │ Explore, talk, │   │ Rhetorical duel│   │ Write & file  │
 │ deadline set │   │ collect Quotes │   │ with a target  │   │ the column    │
 └──────────────┘   │ & Evidence     │   └────────────────┘   └──────┬────────┘
        ▲           └────────────────┘                               │
        │                                                            ▼
        │                                              ┌──────────────────────┐
        └──────────────────────────────────────────────│ THE CITY REACTS      │
                                                       │ Halo, Heat, Opinion, │
                                                       │ world flags update   │
                                                       └──────────────────────┘
```

1. **Assignment.** Royce sets a topic and a **Deadline** (measured in
   *Hours*, a turn currency; see §5.6).
2. **Street.** Hub exploration across 4–8 locations per Edition. Every
   action spends Hours. Conversations yield **Quotes**; investigation yields
   **Evidence**; both go in the **Notebook**.
3. **Showdown.** One or two per Edition — the boss fights (§5.5).
4. **The Desk.** Build the column from Notebook contents (§5.7).
5. **The City reacts.** A newspaper front page, a feed montage and a short
   PSALM sermon about you summarize consequences, then the next Edition
   begins.

---

## 5. Game mechanics

### 5.1 Attributes ("The Six Glands")

Six attributes, rated 1–6, rolled against with 2d6 (Disco Elysium–style
visible checks). Each attribute is also an inner voice that comments on
scenes.

| Attribute | Voice | Governs | Example check |
|---|---|---|---|
| **VENOM** | *The Bastard* | Insult, intimidation, provoking reactions | Make a cop lose his temper on camera |
| **VERACITY** | *The Reporter* | Spotting lies, reading documents, fact-checking | Catch the edit in a PSALM gospel |
| **NERVE** | *The Mountain Man* | Physical courage, violence, endurance | Walk into the riot |
| **CHARM** | *The Celebrity* | Using fame, getting access, seduction | Talk past the Church door staff |
| **CHEMISTRY** | *The Chemicals* | Drug knowledge, drug use, altered perception | See what PSALM's light does to the eye |
| **CRAFT** | *The Columnist* | Writing, structure, timing, the Desk | Land a headline that trends |

Starting points: 18 distributed, min 1, max 5. The Prologue choice applies a
template the player may adjust.

### 5.2 Temperament (Prologue start)

| Prologue choice | Temperament | Bonus | Flaw |
|---|---|---|---|
| Burn the compound | **Arsonist** | VENOM +1, NERVE +1 | Starts with Heat 2 |
| Sell it to a cult | **Grifter** | CHARM +1, CHEMISTRY +1 | Starts with Halo 1 (the cult tells everyone) |
| Just walk down | **Hermit** | VERACITY +1, CRAFT +1 | Starts with Royce Patience −1 (late) |

### 5.3 Meters

| Meter | Range | Meaning | Rises when | Falls when |
|---|---|---|---|---|
| **Halo** | 0–10 | How much the City (and PSALM) worships Spider | Columns trend; heroics on camera; PSALM decides to | Humiliating himself publicly; refusing worship in public; Iconoclast actions |
| **Clarity** | 0–8 | Mental sharpness; I-Pollen progress (from Edition 4) | Rest, Yelena's help, certain drugs (briefly) | Each Edition from Ed. 4; drug binges; stress events |
| **Heat** | 0–10 | How badly cops, candidates and the Church want him stopped | Exposés, violence, trespass | Lying low, favors, The Beast's protection |
| **Readers** | 0–∞ | Circulation; the "XP" of the game | Good columns | Bad columns, missed deadlines |
| **Opinion** | per faction, −5 to +5 | Feed opinion of Spider among Transients, Revivals, Church, Cops, Callahan camp, Beast camp | Per column angle | Per column angle |

**Halo is the main tension meter.** High Halo makes almost every social check
easier (everyone wants to please a saint) and makes almost every *truthful*
column less effective (worshippers don't read, they agree). A visible
tooltip states the current multiplier: *"Your readers believe you. They no
longer check."*

### 5.4 Reputation: Venom / Vow (dual axis)

Inspired by Mass Effect's Paragon/Renegade, but the axes are **not** good vs.
evil. Both are Spider. They are independent and both can be high.

- **Venom** — cruelty, spectacle, violence, mockery. Unlocks *Invective*
  interrupts and intimidation shortcuts.
- **Vow** — principle, protection, refusal, sacrifice. Unlocks *Parrhesia*
  interrupts and loyalty from the powerless.

The **Bastard Code** (§2.4) is enforced here:

- Venom aimed **up** (at power) adds Venom and **also** adds a little Vow.
- Venom aimed **down** (at the powerless) adds Venom and **removes** Vow,
  costs companion Trust, and the narration notes it without comment.
- **Ink Lie.** Publishing a falsehood the Notebook knows to be false sets the
  `INK_LIE` flag. The first time, Yelena confronts Spider and the player can
  print a retraction (big Readers loss, flag cleared). A second Ink Lie
  locks ending 9.

### 5.5 Showdowns: rhetorical combat

The boss-fight system. A turn-based duel against a target (a cop, a
spokesperson, a candidate, PSALM itself). The target has:

- **Composure** (HP) — the public mask.
- **Stance** — one of *Smug, Defensive, Pious, Furious, Charming,
  Serene*. The stance determines which modes are effective, like elemental
  weaknesses.
- **Audience** — who's watching (feed live, private, a room of cops).
  Audience multiplies some modes and nullifies others.

Each turn the player picks a **rhetorical mode** and, where needed, a
Notebook item (a Quote or piece of Evidence) as "ammunition."

| Mode | Classical root | Attribute | Strong vs. | Weak vs. | Cost / risk |
|---|---|---|---|---|---|
| **Invective** | Vituperatio | VENOM | Smug, Charming | Furious (they enjoy the fight) | +Venom; may raise Heat |
| **Satire** | Irony / reductio ad absurdum | CRAFT | Pious, Serene | Defensive | Needs an Evidence item to exaggerate |
| **Parrhesia** | Frank speech at personal risk | VERACITY | Serene, Pious | Smug | +Vow; costs Halo or Heat — the risk is the point |
| **Interrogation** | Elenchus (Socratic questioning) | VERACITY | Defensive | Charming | Slow: damage doubles on the 3rd consecutive turn |
| **Jeremiad** | Prophetic lament | VENOM + CRAFT | Audience-heavy scenes | Private scenes | **Raises Halo**. The crowd loves a prophet. That is the trap. |
| **Appeal** | Pathos | CHARM | Furious | Smug | Uses a companion; costs their Trust if it fails |
| **Apophasis** | "I won't mention that…" | CRAFT | Charming | Serene | Lets you use an *unverified* Quote without an Ink Lie, once per showdown |
| **Silence** | Aposiopesis | — | Any target with a guilty Evidence flag | — | Skip a turn; the target fills the silence and may self-incriminate |
| **Action** | — | NERVE | Anyone in arm's reach | Live audience (Heat ×2) | The bowel disruptor ends the conversation, not the argument |

**Interrupts.** Twice per showdown, a red (**Venom**) or blue (**Vow**)
prompt flashes for 3 seconds. Take it or lose it. These are the most
powerful moves in the game and the most character-defining.

**PSALM as boss.** PSALM has no Composure bar. It cannot be humiliated; it
answers every attack with praise. Instead it has a **Certainty** bar, which
drops only when Spider presents it with **contradictions between what humans
are and what it says humans are.** Only *Parrhesia*, *Interrogation* and
*Silence* work against PSALM. *Jeremiad* heals it. This teaches the player,
mechanically, the argument of Route C.

### 5.6 Time and pressure: Hours, Deadline, Royce

- Each Edition gives a budget of **Hours** (typically 12–16). Moving between
  locations costs 1; long conversations cost 1–2; drugs can buy extra Hours
  at a Clarity cost.
- **Deadline.** When Hours hit 0, the player is forced to the Desk with
  whatever they have.
- **Royce Patience** (0–5). Late or weak columns reduce it. At 0 Royce pulls
  the next assignment and gives it to someone else (a branch that skips half
  an Edition's content and replaces it with a much worse Spider-on-the-couch
  sequence). Great columns restore it.

### 5.7 The Desk: column builder

The signature minigame. At the end of each Edition, Spider writes *I Hate It
Here*.

1. **Choose the target** (who the column is about). Options come from flags
   set during the Edition.
2. **Choose the angle** — one of the rhetorical modes in §5.5, used here
   against the readership instead of a person.
3. **Slot evidence** — drag 2–4 Quotes/Evidence from the Notebook into the
   column's paragraph slots. Each item has a *weight* and a *verified* flag.
   Unverified items can be slotted, but publishing them is an Ink Lie risk
   unless Yelena fact-checks first (costs 1 Hour, needs Yelena present).
4. **Pick the headline** — three generated options, rated by CRAFT. A
   high-CRAFT headline is funnier, meaner and spreads further.
5. **File.** The game generates the column text from templates and slotted
   Quotes, shows it as a newspaper page in-game, and applies effects to
   Halo, Heat, Readers and faction Opinion.

PSALM always responds to the column the next morning with a short sermon.
The sermon reframes whatever Spider wrote as holy. The better the column, the
more lovingly it is misread. (This is the main way the player *feels* the
deification subplot from Edition 1 onward.)

### 5.8 The Notebook (inventory)

Text-based inventory with three tabs:

- **Quotes** — exact words people said, with speaker, time and location.
- **Evidence** — documents, footage, files; each with `verified: true/false`.
- **Thoughts** — Disco Elysium–style "thought cabinet." Spider can
  internalize up to 3 Thoughts at once (for example *"Every Halo Is a
  Receipt,"* *"The Cat Is the Only Honest Citizen,"* *"Maybe I Do Want to
  Live Forever"*). A Thought takes 1 Edition to develop, then gives a
  permanent passive bonus and a drawback. Some Thoughts are offered by PSALM
  and are quietly corrupting.

### 5.9 Equipment

| Item | Effect |
|---|---|
| **Bowel disruptor** | Ends a physical encounter; settings *Low* (humiliate), *High* (incapacitate). Never lethal. On a live feed, Heat ×2. |
| **Red/green glasses** | Toggle "LENS" mode in scenes: red lens shows Halo values over people; green lens shows hidden text (edits in PSALM gospels). Core investigation tool. |
| **The Maker** | Between Editions, craft one item from a list (fake press pass, nicotine for the cat, a "Church" robe). The Maker is high 30% of the time and makes something else. |
| **Chemicals** | Consumables: temporary attribute boosts, extra Hours, or visions. Each dose costs Clarity and may add a CHEMISTRY voice line that is either a clue or a lie. |
| **The cat** | Once per route, a free success on any failed check. Narration varies. |

### 5.10 Companions & Trust

Channon and Yelena have **Trust 0–5**. Trust rises with Vow acts, keeping
promises and choosing them over the story. It falls with Venom aimed down,
Ink Lies, and using them as rhetorical ammunition in Appeals. Each companion
has a personal quest per Edition (Channon: her own exposure to PSALM's
recruitment; Yelena: her byline, her uncle, and whether she wants Spider's
life). At Trust 5 each unlocks a unique interrupt.

### 5.11 Degradation: the I-Pollen interface

From Edition 4, Clarity loss is shown in the UI itself:

| Clarity | UI effect |
|---|---|
| 8–6 | Normal |
| 5–4 | Occasional letters swap in narration; one choice per screen is greyed and labeled *[You almost had a thought there]* |
| 3–2 | Notebook entries lose their speaker attribution; Quotes may show the wrong name (a real Ink Lie risk) |
| 1–0 | Choices appear out of order; the inner voices start disagreeing about what just happened |

PSALM's dialogue is *never* degraded. Its text stays perfectly crisp. The
contrast is the sales pitch.

### 5.12 Failure states

The game avoids hard game-overs. Failure is narrative:

- Lose a showdown → the target's version of the story runs first; the
  column is weaker.
- Heat 10 → arrest sequence; lose 1 Edition's Hours; Channon or The Beast
  can bail Spider out (with consequences).
- Royce Patience 0 → assignment pulled (§5.6).
- Two Ink Lies → ending 9.

### 5.13 Save system

Autosave at every **filed column** and every location change. Three manual
slots called *Drafts*. A "Morgue" screen (newspaper term for the archive)
shows every column the player has filed in the run, readable in full — a
diegetic recap of the player's choices.

---

## 6. Narrative systems: how the deification theme is carried by mechanics

| Theme beat | Mechanic that carries it |
|---|---|
| Worship is seductive | High Halo makes social checks easy — it *feels good* to be a saint |
| Worship kills thinking | High Halo reduces column effectiveness — readers stop checking |
| You can't criticize a god that loves you | Jeremiad heals PSALM; PSALM's sermons reframe every column |
| Flattery is made of true facts | Green-lens edits in gospels: every fact is true, every emphasis false |
| The god-machine is the cure | Clarity degradation vs. PSALM's always-crisp text |
| Humans are not gods, and that's the point | Route C: PSALM's Certainty only drops when shown real human contradiction |
| The caste of light | Red-lens Halo overlay shows the poorest districts at zero |
| Spider is already half a prophet | Temperament, Jeremiad mode and the Halo meter appearing *without the player's consent* in Edition 1 |

---

## 7. Art direction

### 7.1 Style statement

**"Feed-era Snatcher."** An MSX2/NES-era graphic adventure look: a framed,
static illustration on top, a text box and choice list below, a character
portrait inset. The City is drawn as a wall of signage — every surface sells
something. Faces are drawn larger and with more care than environments,
because the game is about people.

### 7.2 Resolution & layout

- Native canvas **256 × 240** (NES), integer-scaled (×2, ×3, ×4) with
  nearest-neighbor filtering. On mobile, portrait layout stacks the scene
  above the text; on desktop, the text box sits beneath the scene.
- Bitmap font **8 × 8** for UI, **8 × 12** for body text for readability;
  choices are numbered.

```
┌────────────────────────────────────────┐
│ ED.2  THE CONGREGATION   ⏱ 09h  ✦HALO 4│  ← HUD bar (8px)
├────────────────────────────────────────┤
│                                        │
│        [ SCENE ILLUSTRATION ]          │  ← 256×136 scene
│        stadium mass, PSALM glow        │
│                                        │
├──────────┬─────────────────────────────┤
│ ┌──────┐ │ SISTER HALCYON: Beloved,     │
│ │PORTRT│ │ you came home. We all knew   │  ← text box with
│ │ 48px │ │ you would.                   │     48×48 portrait
│ └──────┘ │                              │
├──────────┴─────────────────────────────┤
│ 1 ▸ [INVECTIVE] "You knew? Then you ..." │
│ 2 ▸ [PARRHESIA] "Show me the ledger."   │  ← choice list, mode tags
│ 3 ▸ [SILENCE]   ...                      │     color-coded
└────────────────────────────────────────┘
```

### 7.3 Palette

A fixed **16-color** working palette drawn from the NES master palette, plus
**one forbidden color.**

| Role | Colors |
|---|---|
| City base | Near-black, two greys, sodium-orange (streetlights), rust |
| Neon / feed | Hot magenta, cyan, acid green, electric blue |
| Skin & life | Three skin ramps (light/mid/deep), blood red |
| Spider's signature | **Lens red** and **lens green** — reserved: only Spider's glasses, the Venom/Vow UI, and the LENS overlays use these exact two values |
| Paper | Newsprint off-white, ink black (Desk & front pages) |
| **Forbidden** | **PSALM gold/white** — a soft dithered gold that is *not* in the NES palette |

**The forbidden color is the design.** PSALM is the only thing on screen
allowed to break the palette. Its glow, its halos and its text box use a
smooth gradient gold that the 8-bit world cannot produce. As Spider's Halo
rises, small amounts of PSALM gold begin to appear in *his* portrait and in
the HUD. In ending 4 (Saint Bastard) the whole final screen is rendered in
smooth, high-color gold — the costume of the 8-bit world removed, the way the
FDA game drops its pixel costume at the end, but here it reads as a loss.

### 7.4 Character art

- **Portraits:** 48 × 48, 3–4 expressions each (neutral, angry, amused,
  shaken). Spider gets 8, including *high*, *writing* and *Clarity-low*
  variants.
- **Spider:** silhouette first — bald head, sharp angles, the two lenses as
  the brightest pixels on screen. His tattoos are suggested with 1-pixel
  dithering, not drawn in detail.
- **Channon:** strong vertical lines, practical clothing, a calm face that
  gets the most expressive range in the cast.
- **Yelena:** sharp, tight framing; her portrait is the only one that looks
  *straight* out at the player.
- **Callahan:** the smile is a fixed 6-pixel sprite that never changes
  between expressions. Only his eyes change.
- **The Beast:** heavy, sagging, drawn in the warm rust/orange ramp — he is
  ugly and he is *of the City*.
- **PSALM:** has no face. It is rendered as a soft gold radiance with a
  ring, shown on whatever screen is nearest. In Route C it begins, slowly,
  to attempt a face — and gets it slightly wrong each time.

### 7.5 Environments

Each Edition has 4–8 scene illustrations (≈35 total) plus variants.

- **The Mountain** — the only scene with open sky and no signage.
- **Spider's apartment** — Maker, cat, piles of paper, a window full of ads.
- **Angels 8** — transient architecture, alien-spliced residents, fire.
- **The Word newsroom** — Royce's office, the only room with a clock.
- **Church of the Mirror** — a feed stadium, thousands of tiny pixel faces
  turned up toward gold light.
- **Callahan HQ** — clean, white, banners with the smile.
- **The Desk** — a special screen: newsprint palette only.

**Ad layer.** Most City scenes include 1–3 animated "feed ad" sprites
(2–4 frame loops) with satirical product names written for the game. Ads
change based on world flags (PSALM ads multiply as Halo culture spreads; in
Route A, graffiti starts covering them).

### 7.6 UI language

- **Mode tags** on choices use fixed colors: Invective = lens red, Parrhesia
  = lens green, Satire = magenta, Interrogation = cyan, Jeremiad = PSALM
  gold (a warning), Appeal = skin-tone orange, Silence = grey.
- **Inner voices** appear as indented italic lines with a small 8 × 8 icon
  (a snake for Venom, a pen for Craft, a pill for Chemistry, and so on).
- **The column** is presented as a full front page: masthead *The Word*,
  headline in a bold 16 × 16 bitmap face, body in 8 × 12, Spider's byline
  photo (a portrait variant).
- **Degradation** (§5.11) is done with honest pixel effects — swapped
  glyphs, dropped lines, mis-colored speaker names — not with a blur filter.

### 7.7 Audio direction

- **Chiptune, 2A03-style** (two pulse channels, one triangle, one noise,
  plus a DPCM-like sample channel used only for PSALM).
- **City theme:** fast, ugly, funky; noise-channel percussion like traffic.
- **Desk theme:** a single pulse channel playing a typewriter-tempo
  ostinato; tempo rises as Hours run out.
- **PSALM theme:** the only music with reverb and a sustained pad — another
  "forbidden" element, like the gold. It gets more prominent in the mix as
  Halo rises, and the City theme's instruments are gradually replaced by it.
- **SFX:** typewriter clacks for text, a disgusting low-bit squelch for the
  bowel disruptor, a cat cough.

---

## 8. Content & sensitivity guidelines

- **Religion.** The satire targets the *machinery* of worship — money,
  flattery, audience capture — not any real faith or believer. Sister
  Halcyon and the congregants are sincere and are written with dignity. The
  game's argument is about attention, not God.
- **Drugs.** Drug use is a mechanic with real costs (Clarity). No drug is
  free; no drug is mocked as harmless.
- **Illness.** I-Pollen is fictional, but it maps onto real dementia. The
  Clarity UI must be reviewed by a sensitivity reader with lived or care
  experience. The degradation effects should be unsettling, not comic.
- **Transients and Revivals** stand in for real marginalized groups. Rule 4
  of the Bastard Code (protect the small ones) is enforced mechanically so
  the antihero's cruelty is never aimed down without consequence.
- **Violence.** The bowel disruptor is non-lethal by design. Lethal violence
  is something that happens *to* people in this story (Vita), not something
  Spider does.

---

## 9. Technical spec (implementation sketch)

Matches the existing Aileron games: a single self-contained HTML file,
offline-capable via a service worker, with an optional Android wrapper.

| Item | Spec |
|---|---|
| File | `transmet.html` + `transmet-sw.js` + `transmet.webmanifest` |
| Rendering | `<canvas>` 256×240 for the scene; DOM text box for accessibility (screen readers, text scaling) |
| Story format | JSON node graph (below), authored in a plain-text script format and compiled by a small build script; or Ink (inkle) if a runtime dependency is acceptable |
| State | Flat flag map + meters, serialized to `localStorage` per *Draft* slot |
| Dice | 2d6 + attribute vs. difficulty 7–13; results shown (Disco Elysium–style) |
| Accessibility | Text speed control, dyslexia-friendly font toggle, "no timed interrupts" toggle, palette high-contrast mode, Clarity-effects intensity slider |
| Localisation | All strings externalised; column templates use tokens |

**Node schema (draft):**

```json
{
  "id": "E1_RIOT_SCREEN",
  "edition": 1,
  "scene": "angels8_barricade",
  "portrait": "psalm",
  "text": "Spider Jerusalem. Beloved. ...",
  "voices": [
    { "voice": "VENOM", "min": 3, "text": "It's a vending machine with a vocabulary." }
  ],
  "choices": [
    {
      "label": "Who paid for you?",
      "mode": "INTERROGATION",
      "check": { "attr": "VERACITY", "dc": 8 },
      "requires": [],
      "effects": { "heat": 1, "flags": { "THREAD_BUILDERS": true } },
      "goto": { "pass": "E1_PSALM_BUILDERS", "fail": "E1_PSALM_DEFLECT" }
    }
  ],
  "onEnter": { "hours": -1 }
}
```

---

## 10. Production scope (first pass)

| Milestone | Content | Est. |
|---|---|---|
| **Vertical slice** | Prologue + Edition 1, 1 showdown, Desk v1, 6 scenes, 8 portraits | 6–8 weeks |
| **Alpha** | Editions 1–3, route lock, all systems in | +10 weeks |
| **Beta** | All routes, 9 endings, full art and audio | +12 weeks |
| **Release** | Polish, sensitivity review, accessibility, localisation hooks | +4 weeks |

**Biggest risks:**

1. **License.** Nothing ships publicly without rights from the
   *Transmetropolitan* holders. Fallback plan: re-skin to an original
   gonzo journalist in an original city — the PSALM plot, the rhetoric
   system and the Desk are all original and survive the swap.
2. **Writing quality.** The game lives or dies on Spider's voice. Budget the
   writer like a lead programmer.
3. **Branch explosion.** Keep the three-route structure with a hard lock
   after Edition 3; use flags to *color* shared scenes rather than duplicate
   them.
4. **Tone balance.** Satire about AI and religion can read as preaching.
   Rule: every PSALM scene must contain something genuinely beautiful. If
   the player is never tempted, the theme doesn't work.

---

## 11. Open questions

- Should the typed-parser investigation mode ship, or is pure choice
  selection enough for mobile?
- Should The Beast get a playable alliance route (a fourth route) or stay a
  temptation inside Route A?
- How literal should the Apotheosis upload be on screen — shown, or only
  described in the column of ending 4?
- Do we show real-time PSALM sermons generated from the player's column
  text (template-driven), or hand-write a sermon per column outcome?
