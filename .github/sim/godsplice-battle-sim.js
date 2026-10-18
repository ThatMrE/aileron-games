// Godsplice battle stress test: every party, encounter group, enemy, boss and difficulty.
// Usage: node .github/sim/godsplice-battle-sim.js [html-path] [trials] [all|regular|single|boss|chaos|gauntlet]
const fs = require("fs");
const src = fs.readFileSync(process.argv[2] || require("path").join(__dirname, "../../godsplice.html"), "utf8");
const code = src.slice(src.indexOf("/*BATTLE-ENGINE-START*/"), src.indexOf("/*BATTLE-ENGINE-END*/"));
const BX = new Function(code + "\nreturn BX;")();
const TRIALS = +(process.argv[3] || 4), MODE = process.argv[4] || "all";

function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const HOUSE = ["junie", "yara", "fax", "otto", "bishop", "pru", "mary", "saintnobody"];
const COMBOS = [["hellrot"]];
HOUSE.forEach(a => COMBOS.push(["hellrot", a]));
HOUSE.forEach((a, i) => HOUSE.slice(i + 1).forEach(b => COMBOS.push(["hellrot", a, b])));

// gear a player would plausibly own by each Issue (shops + drops)
function gearFor(id, issue, on) {
  if (!on) return id === "hellrot" ? { acc: "notebook" } : {};
  const phys = ["junie", "pru", "saintnobody"].includes(id);
  const W = issue <= 1 ? (phys ? "newspaper" : "tuningfork") : issue <= 3 ? (phys ? "umbrella" : "haloshard") : (phys ? (id === "junie" ? "tireiron" : "knuckles") : id === "hellrot" ? "gelastic2" : "syringe");
  const A = issue <= 1 ? "labcoat" : issue <= 3 ? (phys ? "leatherjacket" : "labcoat") : issue <= 4 ? (phys ? "derby" : "habit") : (phys ? "kevlar" : "habit");
  const C = id === "hellrot" ? "notebook" : issue <= 2 ? "luckypenny" : issue <= 4 ? "fogcharm" : "cufflinks";
  const eq = { weapon: W, armor: A, acc: C };
  Object.keys(eq).forEach(k => { if (!BX.canEquip(id, eq[k])) eq[k] = k === "weapon" ? "newspaper" : null; });
  return eq;
}
function invFor(issue) { return { coffee: 2 + issue, burrito: Math.floor(issue / 2), salts: 1 + Math.floor(issue / 3), gum: 1 + Math.floor(issue / 2), tonic: Math.floor(issue / 3), antacid: 1, soup: Math.floor(issue / 4), glowstick: issue >= 3 ? 1 : 0 }; }

const errors = [], used = { skills: {}, items: {} }, stat = {};
let battles = 0, actions = 0;
function check(B, where) {
  for (const u of B.units) {
    for (const k of ["hp", "sp"]) if (!Number.isFinite(u[k])) errors.push(`${where}: ${u.n} ${k}=${u[k]}`);
    if (u.hp < 0 || u.hp > u.max.hp) errors.push(`${where}: ${u.n} hp ${u.hp}/${u.max.hp}`);
    if (u.sp < 0 || u.sp > u.max.sp) errors.push(`${where}: ${u.n} sp ${u.sp}/${u.max.sp}`);
    if (u.ko !== (u.hp === 0)) errors.push(`${where}: ${u.n} ko=${u.ko} hp=${u.hp}`);
  }
  for (const [k, v] of Object.entries(B.inv)) if (v < 0) errors.push(`${where}: inv ${k}=${v}`);
}
// chaos player: any legal option, any legal target (covers every skill and item path)
function chaosChoose(B, u) {
  const opts = BX.options(B, u).filter(o => o.ok !== false && !(o.kind === "run" && B.rng() < .9) && !(o.kind === "moreau" && B.rng() < .9));
  const o = opts[Math.floor(B.rng() * opts.length)];
  const S = o.skill ? BX.SKILLS[o.skill] : o.item ? BX.ITEMS[o.item] : null;
  const pool = S ? BX.targetsFor(B, u, S.tgt) : [];
  return Object.assign({}, o, { target: pool.length ? pool[Math.floor(B.rng() * pool.length)].uid : u.uid });
}
function run(B, where, chaos) {
  let n = 0, res;
  while (!(res = BX.endCheck(B))) {
    if (++n > 600) { errors.push(`${where}: stalemate after 600 actions r${B.round} ` + B.units.map(u => `${u.id}:${u.hp}/${u.max.hp}:${u.sp}${u.ko ? "KO" : ""}${Object.keys(u.st).join("")}`).join(" ")); return "stall"; }
    const u = BX.current(B); if (!u) { errors.push(`${where}: no current actor`); return "stall"; }
    const st = BX.startTurn(B, u); check(B, where);
    if (st.skip) continue;
    if (BX.endCheck(B)) break;
    const a = chaos && (u.side === "hero" || B.rng() < .3) ? chaosChoose(B, u) : u.side === "hero" ? BX.autoChoose(B, u) : BX.enemyChoose(B, u);
    let ev;
    try { ev = BX.act(B, u, a); } catch (e) { errors.push(`${where}: throw ${e.message} on ${u.n} ${JSON.stringify(a)}`); return "stall"; }
    for (const e of ev) if (e.amt !== undefined && !Number.isFinite(e.amt)) errors.push(`${where}: event amt ${e.amt}`);
    check(B, where);
  }
  actions += n; battles++;
  for (const [k, v] of Object.entries(B.used.skills)) used.skills[k] = (used.skills[k] || 0) + v;
  for (const [k, v] of Object.entries(B.used.items)) used.items[k] = (used.items[k] || 0) + v;
  return res;
}
function tally(key, res, B) { const s = stat[key] = stat[key] || { n: 0, win: 0, lose: 0, fled: 0, stall: 0, rounds: 0, hpLeft: 0 }; s.n++; if (res === "win") s.win++; else if (res === "lose") s.lose++; else if (res === "fled") s.fled++; else s.stall++; s.rounds += B.round;
  const hs = B.units.filter(u => u.side === "hero"); s.hpLeft += hs.reduce((a, u) => a + u.hp / u.max.hp, 0) / hs.length; }

// which tables appear at which Issue
const TABLE_ISSUES = { mountain: [0, 1], street: [1, 2, 3, 4, 5, 6], church: [1, 2, 3, 4, 5, 6], theogen: [1, 2, 3, 4, 5, 6], order: [2, 3, 4, 5, 6], machine: [2, 3, 4, 5, 6], fog: [1, 2, 3, 4, 5, 6] };
const BOSS_ISSUE = { halcyon: 2, cask: 3, olddee: 4, sunday: 5 };
let seed = 1;
const t0 = Date.now();
for (const diff of ["easy", "normal", "hard"]) {
  for (const party of COMBOS) {
    for (const gear of [false, true]) {
      if (MODE === "all" || MODE === "regular") for (const [tb, groups] of Object.entries(BX.TABLES)) for (const issue of TABLE_ISSUES[tb]) {
        const lv = BX.ISSUE_LV[issue];
        for (const g of groups) for (let t = 0; t < TRIALS; t++) {
          const rng = mulberry(seed++);
          const B = BX.makeBattle({ party: party.map(id => ({ id, lv, eq: gearFor(id, issue, gear) })), foes: g.map(id => ({ id, lv: Math.max(1, lv + Math.round(rng() * 2 - 1)) })), diff, rng, inv: invFor(issue), cash: 30 + issue * 60, moreau: false });
          const res = run(B, `${diff} ${party.join("+")} ${tb}:${g.join(",")} I${issue}`); tally(`reg|${diff}`, res, B); tally(`reg|${diff}|size${party.length}`, res, B); tally(`tbl|${diff}|${tb}`, res, B); tally(`grp|${diff}|${g.join(",")}`, res, B); tally(`issue|${diff}|${issue}`, res, B);
        }
      }
      if (MODE === "all" || MODE === "single") for (const id of Object.keys(BX.ENEMIES)) { if (BX.ENEMIES[id].boss) continue; for (const issue of [1, 3, 5]) for (let t = 0; t < Math.ceil(TRIALS / 2); t++) {
        const rng = mulberry(seed++), lv = BX.ISSUE_LV[issue];
        const B = BX.makeBattle({ party: party.map(h => ({ id: h, lv, eq: gearFor(h, issue, gear) })), foes: [{ id, lv }], diff, rng, inv: invFor(issue), cash: 80 });
        const res = run(B, `${diff} ${party.join("+")} single:${id} I${issue}`); tally(`single|${diff}`, res, B); tally(`enemy|${diff}|${id}`, res, B);
      } }
      if (MODE === "all" || MODE === "boss") for (const [bid, grp] of Object.entries(BX.BOSSES)) for (const moreau of [false, true]) for (let t = 0; t < TRIALS; t++) {
        const issue = BOSS_ISSUE[bid], lv = BX.ISSUE_LV[issue], rng = mulberry(seed++);
        const B = BX.makeBattle({ party: party.map(h => ({ id: h, lv, eq: gearFor(h, issue, gear) })), foes: grp.map(id => ({ id, lv })), diff, rng, inv: invFor(issue), cash: 150, boss: true, moreau });
        const res = run(B, `${diff} ${party.join("+")} boss:${bid}${moreau ? "+moreau" : ""}`); tally(`boss|${diff}${moreau ? "|moreau" : ""}`, res, B); tally(`bossid|${diff}|${bid}${moreau ? "+M" : ""}`, res, B); tally(`boss|${diff}|size${party.length}`, res, B);
      }
    }
  }
}
if (MODE === "all" || MODE === "chaos") for (const diff of ["easy", "normal", "hard"]) for (const party of COMBOS) for (const issue of [1, 3, 5, 6]) {
  const lv = BX.ISSUE_LV[issue];
  const groups = [...Object.values(BX.TABLES).flat(), ...Object.values(BX.BOSSES)];
  for (const g of groups) { const rng = mulberry(seed++), boss = g.some(id => BX.ENEMIES[id].boss);
    const B = BX.makeBattle({ party: party.map(h => ({ id: h, lv: Math.min(20, lv + 3), eq: gearFor(h, issue, true) })), foes: g.map(id => ({ id, lv })), diff, rng, inv: Object.fromEntries(Object.keys(BX.ITEMS).filter(k => BX.ITEMS[k].type === "use").map(k => [k, 3])), cash: 120, boss, moreau: true });
    const res = run(B, `chaos ${diff} ${party.join("+")} ${g.join(",")} I${issue}`, true); tally(`chaos|${diff}`, res, B); }
}
// attrition: five random fights in a row, HP/SP/items carried, no rest
if (MODE === "all" || MODE === "gauntlet") for (const diff of ["easy", "normal", "hard"]) for (const party of COMBOS) for (const issue of [1, 2, 3, 4, 5, 6]) for (let t = 0; t < TRIALS * 2; t++) {
  const lv = BX.ISSUE_LV[issue], rng = mulberry(seed++), inv = invFor(issue); let mem = party.map(id => ({ id, lv, eq: gearFor(id, issue, true) })), ok = true, B;
  const tabs = Object.keys(TABLE_ISSUES).filter(k => TABLE_ISSUES[k].includes(issue));
  for (let f = 0; f < 5 && ok; f++) {
    B = BX.makeBattle({ party: mem, foes: BX.encounterGroup(tabs[Math.floor(rng() * tabs.length)], lv, rng), diff, rng, inv, cash: 90 });
    const res = run(B, `gauntlet ${diff} ${party.join("+")} I${issue} f${f}`); if (res === "lose" || res === "stall") ok = false;
    mem = B.units.filter(u => u.side === "hero").map((u, i) => ({ id: u.id, lv, eq: mem[i].eq, hp: u.ko ? 0 : u.hp, sp: u.sp }));
    // after a fight the downed get up with 1 HP (as in the game)
    mem.forEach(m => { if (m.hp <= 0) m.hp = 1; });
    // between fights a player tops up from the bag: coffee on anyone under half
    const sts = mem.map(m => BX.heroStats(m.id, m.lv, m.eq).s);
    mem.forEach((m, i) => { while (m.hp < sts[i].hp * .5 && inv.coffee > 0) { inv.coffee--; m.hp = Math.min(sts[i].hp, m.hp + 45); } });
  }
  tally(`gauntlet|${diff}`, ok ? "win" : "lose", B); tally(`gauntlet|${diff}|I${issue}`, ok ? "win" : "lose", B); tally(`gauntlet|${diff}|size${party.length}`, ok ? "win" : "lose", B);
}
const pct = s => (100 * s.win / s.n).toFixed(1).padStart(5) + "%";
const rows = Object.entries(stat).sort();
const out = [];
out.push(`battles ${battles}, actions ${actions}, errors ${errors.length}, ${((Date.now() - t0) / 1000).toFixed(1)}s`);
for (const [k, s] of rows) out.push(`${k.padEnd(34)} n=${String(s.n).padStart(6)} win ${pct(s)} fled ${s.fled} stall ${s.stall} rounds ${(s.rounds / s.n).toFixed(1)} hpLeft ${(100 * s.hpLeft / s.n).toFixed(0)}%`);
const allSk = Object.keys(BX.SKILLS), allIt = Object.keys(BX.ITEMS).filter(k => BX.ITEMS[k].type === "use");
out.push("unused skills: " + allSk.filter(k => !used.skills[k]).join(", "));
out.push("unused items: " + allIt.filter(k => !used.items[k]).join(", "));
out.push("errors (first 20):\n" + [...new Set(errors)].slice(0, 20).join("\n"));
console.log(out.join("\n"));
if (process.env.SIM_OUT) fs.writeFileSync(process.env.SIM_OUT, out.join("\n"));
