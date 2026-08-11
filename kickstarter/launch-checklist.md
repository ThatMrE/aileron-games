# Weji — Kickstarter Launch Checklist

A step-by-step runbook. Pairs with `campaign-plan.md`.

## T‑minus ~8 weeks (now → mid‑Sep)
- [ ] Lock the **launch date/time**. Update it in **two** places in `weji.html`:
      the `LAUNCH_DATE` constant and the copy it renders ("goes live …").
- [ ] Get a real **per-unit manufacturing quote** (board + planchette + finish)
      and confirm shop capacity for the run size.
- [ ] Finalize **funding goal** and **reward prices** in `campaign-plan.md`.
- [ ] Confirm **shipping** approach + regional costs; test a shipping box.
- [ ] Draft the **Kickstarter page** (use the story outline).
- [ ] Start **audience building**: push the web board on socials; every visitor
      is a "Haunt my inbox" candidate.

## Pre-launch page (~3–4 weeks out)
- [ ] Create the Kickstarter **"coming soon" / pre-launch** page.
- [ ] Put its URL in **`PRELAUNCH_URL`** in `weji.html` → the CTA becomes a
      "Follow on Kickstarter" button beside the email capture.
- [ ] Verify **email capture** is flowing: submit a test on
      `https://aileron.games/weji.html`, then check **Netlify → Forms →
      `weji-launch`**. Optionally connect a notification/Zapier → mailing list.
- [ ] Shoot + edit the **campaign video** and hero **GIF**.
- [ ] Prepare all **tier / stretch-goal graphics** and the project thumbnail.

## Launch week
- [ ] Final proofread of the Kickstarter page (rewards, shipping, risks, dates).
- [ ] Warm the **email list**: "we go live [date] — first backers get early-bird."
- [ ] Schedule launch-day social posts.

## Launch day (Oct 1)
- [ ] Campaign goes **live** on Kickstarter.
- [ ] Set **`KICKSTARTER_URL`** in `weji.html` to the live campaign URL, commit,
      and deploy. The board's countdown + form auto-swap to the **Back Weji**
      button. (Verify on production after deploy.)
- [ ] Send the **launch email** to the `weji-launch` list.
- [ ] Post everywhere; ask early backers to share.

## During the campaign
- [ ] Post **updates** (funded!, stretch goals, behind-the-scenes) at least weekly.
- [ ] Reply to comments/messages quickly.
- [ ] Mid-campaign **press / creator** outreach.
- [ ] Reveal **stretch goals** as milestones hit.

## Halloween finale (Oct 27–31)
- [ ] "**Last chance before Halloween**" push to list + socials.
- [ ] Campaign **closes Oct 31**.

## After it funds
- [ ] Thank backers; send the **backer survey** (addresses, add-ons, variants).
- [ ] Place the **manufacturing order**; track against the fulfillment window.
- [ ] Keep backers posted through production → shipping.
- [ ] Consider leaving `KICKSTARTER_URL` pointed at the campaign (or a
      "late pledge"/BackerKit page) after it ends.

---

### The three switches in `weji.html`
| Constant | When to set | Effect |
|---|---|---|
| `LAUNCH_DATE` | now | Drives the countdown + "goes live" copy |
| `PRELAUNCH_URL` | when the coming-soon page exists | Adds a "Follow on Kickstarter" button |
| `KICKSTARTER_URL` | launch day | Swaps countdown/form → "Back Weji on Kickstarter" |
