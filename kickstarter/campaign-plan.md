# Weji — Kickstarter Campaign Plan (Halloween launch)

> Working plan to launch **Weji**, the emoji Ouija board, on Kickstarter in
> **October 2026**, timed to Halloween. Numbers marked _(draft)_ are
> placeholders to finalize before launch.

Playable web demo: **https://aileron.games/weji.html** — the live board doubles
as the campaign's top-of-funnel. The pre-launch email capture on that page
feeds the launch-day audience (see "Pre-launch" below).

---

## 1. The pitch (one-liner)

> **Weji** is an emoji Ouija board. Ask it anything; the planchette glides to
> three emoji and the spirits spell out your answer. A laser-cut, stained-wood
> board with a hand-painted planchette — plus a free web version that works on
> any phone.

Born at Global Game Jam, made in RVA.

## 2. Why it wins on Kickstarter at Halloween
- **Seasonal pull:** Ouija + Halloween is a proven gifting/party moment; the
  campaign runs straight into peak spooky-season buying.
- **Instant "get it":** anyone can try the real product in 10 seconds on their
  phone before backing — rare for a physical Kickstarter.
- **Giftable price point** and a genuinely photogenic object (see the shop
  photos in the site gallery).

## 3. Timeline

| Phase | Dates (2026) | Goals |
|---|---|---|
| Build audience | now → Sep 30 | Drive the web demo, collect launch emails, tease on socials |
| **Pre-launch page live** | ~Sep 8 | Kickstarter "coming soon" page collecting follows |
| **Campaign launch** | **Oct 1, 9:00am ET** | Hit 30% day one from the email list |
| Mid-campaign push | Oct 10–20 | Update + press + stretch-goal reveals |
| Halloween finale | Oct 27–31 | "Last chance before Halloween" final surge |
| **Campaign ends** | **Oct 31, 11:59pm** | Close on the holiday |
| Fulfillment | Nov 2026 → Q1 2027 | Produce, pack, ship |

> The site countdown and the `LAUNCH_DATE` constant in `weji.html` are set to
> **Oct 1, 2026**. Change both together if the slot moves.

## 4. Funding goal _(draft)_
- **Goal: $8,000 _(draft)_** — covers a production run of boards + planchettes,
  packaging, Kickstarter/processing fees (~8–10%), and a shipping buffer.
- Keep the public goal at the true minimum viable run so it funds fast; use
  stretch goals for upside. Validate against a real per-unit quote before
  locking.

## 5. Reward tiers _(draft)_

| Tier | Price | What they get |
|---|---|---|
| **The Curious** | $5 | Backer thanks + name in the credits + a set of Weji phone/desktop wallpapers |
| **The Board** | $45 _(draft)_ | One laser-cut, stained-wood Weji board + hand-painted planchette. Early-bird first 100 at **$39** |
| **The Séance (2-pack)** | $80 _(draft)_ | Two boards — one to keep, one to gift |
| **Collector's Edition** | $75 _(draft)_ | Board + planchette in a premium finish, signed + numbered, in a keepsake box |
| **Coven (5-pack)** | $190 _(draft)_ | Five boards for the whole coven / game night / retail try |
| **Haunt Your Shop (wholesale)** | $ TBD | Case pack for oddities/game shops (MOQ + wholesale pricing) |

**Add-ons:** extra planchette ($ TBD); wall-hangable variant; sticker pack.

## 6. Stretch goals _(draft)_
- **+$X — Alternate wood/stain** options unlocked for all boards.
- **+$X — Deluxe planchette** (upgraded paint / inlay) for every board.
- **+$X — Glow-in-the-dark** engraving.
- **+$X — Companion "spirit guide" booklet** of emoji meanings + game modes.

## 7. Page story outline
1. **Hook** — animated GIF of the planchette gliding to three emoji answering a
   question; "Ask the board anything."
2. **Try it now** — link/QR to the live web board so backers play before they pay.
3. **What it is** — the physical object: materials, size (4' × 3' × 0.5" panel
   spec from the build notes), planchette, finish. Beauty photos from the gallery.
4. **How it plays** — ask → planchette → three-emoji reading; party/solo modes.
5. **The story** — Global Game Jam origin, made in RVA, the oddities-shop photos.
6. **Rewards & add-ons** — clear tier cards.
7. **Stretch goals** — the ladder above.
8. **Timeline & shipping** — production and delivery windows; shipping regions.
9. **Risks & challenges** — see below.
10. **Meet the makers** — Aileron Games.

## 8. Asset checklist (build before launch)
- [ ] 30–60s **campaign video** (planchette in action + shop-shot montage + maker piece to camera).
- [ ] Hero **GIF/loop** of a reading (can be captured from the web board).
- [ ] Clean **product photos**: board flat, planchette detail, in-hand, lifestyle. (Field photos already in `/photos`.)
- [ ] **Reward tier** graphics.
- [ ] **Stretch-goal** graphics.
- [ ] Kickstarter **project thumbnail** + feature image.
- [ ] Store/press **one-pager**.

## 9. Risks & challenges (draft copy for the page)
- **Manufacturing:** we've built and finished boards already (see photos); the
  main scale-up risk is lead time on wood + laser time. Mitigation: confirmed
  shop capacity and a per-unit quote before launch.
- **Shipping:** boards are flat and sturdy; we'll test packaging for safe
  transit and quote regional shipping honestly.
- **Timeline:** buffers built into the Nov→Q1 window; we'll only promise dates
  we can hold.

## 10. Pre-launch (happening now)
- The web board's **"Haunt my inbox"** form (Netlify Forms, form name
  `weji-launch`) collects launch-notification emails. Read submissions in the
  Netlify dashboard → **Forms**, or wire a notification/Zapier to a mailing list.
- Stand up the Kickstarter **"coming soon"** page and drop its URL into
  `PRELAUNCH_URL` in `weji.html` to turn the CTA into a "Follow on Kickstarter"
  button.
- On launch day, set `KICKSTARTER_URL` in `weji.html` to the live campaign — the
  countdown/form auto-swap to the **Back Weji** button.

See `launch-checklist.md` for the step-by-step runbook.
