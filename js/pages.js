/* STATUS: RED - DO NOT EDIT unless you know JavaScript. This file is the engine of the site.
   One wrong character can break every page. Ask for help or copy the file first as a backup. */
/* ==========================================================================
   pages.js  -  WHAT EACH PAGE DOES
   --------------------------------------------------------------------------
   Each HTML page has <body data-page="food"> etc. At the bottom, init() runs
   the matching function below. Pages hold empty containers; the cards are
   built from js/data/*.js, so to change content you edit the data files.
   1 Home (hero sky, live strip)   2 Explore + list pages   3 Transport
   4 Safety   5 Plan My Day   6 Contact   7 Guest Mode   8 Start-up
   The Guest Mode check is a CONVENIENCE GATE, not real security
   (see js/guest-auth.js for the full explanation and upgrade path).
   ========================================================================== */
(function () {
  "use strict";
  const EC = window.EC, ico = EC.ico, S = EC.state;
  const { $, $$, esc, fmt12, fmtDate, todayStr, waLink, telLink, priceRange, fmtLKR, byDest } = EC;

  /* ======================================================================
     1. HOME: time-aware hero + "Ella Now" + next train
     ====================================================================== */
  function zoneTime(tz) {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const g = (t) => Number(parts.find((p) => p.type === t).value);
    const h = g("hour"), m = g("minute"), s = g("second");
    return { h, m, s, minutes: h * 60 + m, seconds: h * 3600 + m * 60 + s };
  }
  const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

  /* dawn | day | golden | night, from Ella's local time and sunrise/sunset */
  function skyPhase(t) {
    const rise = toMin(S.dest.sunrise), set = toMin(S.dest.sunset);
    if (t.minutes < rise - 40 || t.minutes >= set + 50) return "night";
    if (t.minutes < rise + 70) return "dawn";
    if (t.minutes < set - 90) return "day";
    return "golden";
  }
  const PHASE_TIP = {
    night: "It is late. Rest well, and plan tomorrow's adventure.",
    dawn: "Perfect time for a hike. Start early while it is cool.",
    day: "Hot hours. A café, a long lunch or a waterfall are good choices.",
    golden: "Golden hour. Head to a viewpoint for soft light, then dinner."
  };

  function paintHero() {
    const hero = $("#hero"); if (!hero) return;
    const t = zoneTime(S.dest.timeZone), phase = skyPhase(t);
    hero.dataset.sky = phase;
    /* sun or moon travels along an arc across the sky */
    const rise = toMin(S.dest.sunrise), set = toMin(S.dest.sunset);
    let p = (t.minutes - rise) / (set - rise);
    if (p < 0 || p > 1) { const night = (t.minutes >= set ? t.minutes - set : t.minutes + 1440 - set) / (1440 - (set - rise)); p = Math.min(1, Math.max(0, night)); }
    hero.style.setProperty("--ax", (48 + p * 44).toFixed(1) + "%");
    hero.style.setProperty("--ay", (62 - Math.sin(p * Math.PI) * 44).toFixed(1) + "%");
    hero.classList.toggle("is-night", phase === "night");
  }

  /* how far through the daylight hours we are (a small premium touch) */
  function sunBar(t) {
    const rise = toMin(S.dest.sunrise), set = toMin(S.dest.sunset);
    const day = t.minutes >= rise && t.minutes <= set;
    const pct = day ? ((t.minutes - rise) / (set - rise)) * 100 : (t.minutes < rise ? 0 : 100);
    return '<div class="sunbar"><div class="sunbar__track" role="img" aria-label="' + (day ? Math.round(pct) + " percent of daylight has passed" : "It is night") + '"><span class="sunbar__dot" style="--sp:' + pct.toFixed(0) + '%"></span></div>' +
      '<p class="sunbar__lbl">' + esc(day ? dayLeft(set - t.minutes) + " of daylight left" : (t.minutes < rise ? "Sunrise at " + fmt12(S.dest.sunrise) : "Sunset was at " + fmt12(S.dest.sunset))) + "</p></div>";
  }
  const dayLeft = (m) => (m >= 60 ? Math.floor(m / 60) + " h " : "") + (m % 60) + " min";

  function renderNow() {
    const mount = $("#nowMount"); if (!mount) return;
    const t = zoneTime(S.dest.timeZone), phase = skyPhase(t);
    const greet = t.h < 12 ? "Good morning" : (t.h < 17 ? "Good afternoon" : "Good evening");
    const phaseIcon = { night: "moon-stars", dawn: "sunrise", day: "brightness-high", golden: "sunset" }[phase];
    mount.innerHTML =
      '<div class="now__head"><div><p class="now__eyebrow">' + ico(phaseIcon) + " Right now in " + esc(S.dest.name) + "</p><h2>" + greet + "</h2></div>" +
      '<p class="clockpill"><strong>' + esc(fmt12(String(t.h).padStart(2, "0") + ":" + String(t.m).padStart(2, "0"))) + "</strong><small>" + esc(S.dest.name) + " time</small></p></div>" +
      '<p class="now__tip">' + esc(PHASE_TIP[phase]) + "</p>" +
      sunBar(t) +
      '<dl class="suntiles"><div>' + ico("sunrise") + "<dt>Sunrise</dt><dd>" + esc(fmt12(S.dest.sunrise)) + "</dd></div><div>" + ico("sunset") + "<dt>Sunset</dt><dd>" + esc(fmt12(S.dest.sunset)) + "</dd></div></dl>" +
      '<div class="now__foot"><a class="btn btn-soft btn-sm-x" href="' + esc(S.dest.weatherUrl) + '" target="_blank" rel="noopener" data-track="home:weather">' + ico("cloud-sun") + " Check the weather " + ico("box-arrow-up-right", "ico--sm") + "</a><span class=\"fine\">Sun times are approximate</span></div>";
  }

  function renderTrain() {
    const mount = $("#trainMount"); if (!mount) return;
    const S = EC.state;
    /* Get current weekday in Ella's time zone (Asia/Colombo) */
    const wd = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: S.dest.timeZone }).format(new Date());
    const t = zoneTime(S.dest.timeZone);
    const todayMin = t.h * 60 + t.m;

    /* Filter trains to those that run today */
    const todayTrains = TRAINS.filter((tr) => {
      if (!tr.destination || tr.destination !== S.dest.id) return false;
      if (!tr.days || tr.days.length === 0) return true;          // daily
      return tr.days.includes(wd);
    });

    if (!todayTrains.length) {
      mount.innerHTML = "<div class=\"ticket\"><div class=\"ticket__band\"><span>" + ico("train-front") + " Nine Arch Bridge</span><span>No trains today</span></div>" +
        "<div class=\"ticket__foot\"><p class=\"fine\">No scheduled crossings today. " + (TRAIN_STATUS.kandy_ella_closed ? esc(TRAIN_STATUS.kandy_ella_note) : "") + "</p></div></div>";
      return;
    }

    /* Find the next train */
    let next = todayTrains.find((tr) => { const [h, m] = tr.time.split(":").map(Number); return h * 60 + m > todayMin; });
    let tomorrow = false;
    if (!next) { next = todayTrains[0]; tomorrow = true; }

    const [nh, nm] = next.time.split(":").map(Number);
    const diff = tomorrow ? 0 : (nh * 60 + nm) - todayMin;
    const hrs = Math.floor(diff / 60), mins = diff % 60;
    const count = diff === 0 ? "" : (hrs > 0 ? hrs + " h " : "") + mins + " min";
    const pct = Math.min(100, Math.max(0, (todayMin / (24 * 60)) * 100));

    /* Next after this one */
    const idx = todayTrains.indexOf(next);
    const after = todayTrains[(idx + 1) % todayTrains.length];

    mount.innerHTML =
      "<div class=\"ticket__band\"><span>" + ico("train-front") + " Nine Arch Bridge</span><span>Next crossing</span></div>" +
      "<div class=\"ticket__main\"><div><p class=\"ticket__time\">" + esc(fmt12(next.time)) + "</p><p class=\"ticket__dir\">" + esc(next.label) + "</p></div>" +
      "<div class=\"ticket__count\"><span>" + (tomorrow ? "Tomorrow" : "In") + "</span><strong>" + esc(tomorrow ? "First train" : count) + "</strong></div></div>" +
      (tomorrow ? "" : '<div class="ticket__bar" role="presentation"><i style="width:' + pct.toFixed(0) + '%"></i></div>') +
      "<div class=\"ticket__cut\" aria-hidden=\"true\"></div>" +
      "<div class=\"ticket__foot\">" +
        "<p class=\"ticket__later\">" + ico("clock") + " After that: " + esc(fmt12(after.time)) + " — " + esc(after.label) + "</p>" +
        (TRAIN_STATUS.kandy_ella_closed ? "<p class=\"notice notice--alert mt-1\">" + ico("exclamation-circle") + "<span>" + esc(TRAIN_STATUS.kandy_ella_note) + " <a href=\"https://seatreservation.railway.gov.lk\" target=\"_blank\" rel=\"noopener\">Book seats</a></span></p>" : "") +
        '<p class="fine">Times are approximate. Trains can run late. Re-checked: ' + esc(TRAIN_STATUS.recheckDate) + "</p>" +
      "</div>";
  }

  /* hero parallax: layers move a little with the pointer (desktop) */
  function heroParallax() {
    const hero = $("#hero"); if (!hero || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    hero.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--px", (((e.clientX - r.left) / r.width) - 0.5).toFixed(3));
      hero.style.setProperty("--py", (((e.clientY - r.top) / r.height) - 0.5).toFixed(3));
    });
  }

  const TILE_ORDER = {
    visitor: ["things", "quiet", "plan", "food", "stay", "transport", "safety", "explore"],
    local:   ["stay", "food", "transport", "plan", "things", "quiet", "safety", "explore"]
  };
  function orderTiles(mode) {
    const wrap = $("#tiles"); if (!wrap) return;
    TILE_ORDER[mode].forEach((id) => { const t = wrap.querySelector('[data-tile="' + id + '"]'); if (t) wrap.appendChild(t); });
  }

  function pageHome() {
    paintHero(); renderNow(); renderTrain(); heroParallax();
    S.onMode.push(orderTiles);
    setInterval(() => { paintHero(); renderNow(); renderTrain(); }, 20000);

    /* collections: tap one to open Explore already filtered */
    const picks = ["sunrise", "quiet", "laptop", "budget", "rainy-day", "train", "tea", "family"];
    $("#collections").innerHTML = picks.map((id, i) => { const t = EC.TAG_BY_ID[id];
      return '<a class="coll reveal" style="--d:' + (i * 40) + 'ms" href="explore.html?tag=' + id + '" data-track="collection:' + id + '">' + ico(t.icon) + "<strong>" + esc(t.title) + "</strong><span>" + esc(t.blurb) + "</span></a>"; }).join("");

    const cat = EC.catalog();
    const featured = ["place:little-adams-peak", "place:nine-arch-bridge", "quiet:forgotten-viewpoint", "food:misty-cup"].map((k) => cat.find((x) => x.key === k)).filter(Boolean);
    $("#homePlaces").innerHTML = featured.map((it, i) => EC.itemCard(it, "col-sm-6 col-xl-3", i * 60)).join("");
    EC.favs.paint(); EC.observeReveals();
    const spl = $("#homeStays");
    if (spl) { const s = cat.filter((x) => x.kind === "stay"); S.onMode.push((m) => { const sorted = s.slice().sort(m === "local" ? (a, b) => a.price - b.price : (a, b) => b.rating - a.rating).slice(0, 3);
        spl.innerHTML = sorted.map((it, i) => EC.itemCard(it, "col-md-6 col-xl-4", i * 60)).join(""); EC.favs.paint(); EC.observeReveals(); }); EC.applyMode(S.mode, false); }
  }

  /* ======================================================================
     2. EXPLORE + LIST PAGES (all use the same search/filter component)
     ====================================================================== */
  const cheapestFirst = (a, b) => (a.price || 1e9) - (b.price || 1e9);
  const bestRated = (a, b) => b.rating - a.rating;

  function pageExplore() {
    const cat = EC.catalog();
    const kinds = [{ value: "all", label: "Everything" }, { value: "place", label: "Things to do" }, { value: "quiet", label: "Quiet spots" }, { value: "food", label: "Food & cafés" }, { value: "stay", label: "Stays" }];
    EC.mountFilters({
      root: $("#filters"), out: $("#results"), items: cat, card: EC.itemCard, col: "col-sm-6 col-xl-4",
      placeholder: "Search places, cafés, stays, or a mood like “quiet”...", noun: "things", nounOne: "thing",
      groups: [{ key: "kind", label: "Show", options: kinds, get: (it) => it.kind }],
      sorts: [{ value: "auto", label: "Best for me" }, { value: "price", label: "Price: low to high", fn: cheapestFirst }, { value: "rating", label: "Top rated", fn: bestRated }],
      autoSort: (mode) => mode === "local" ? (a, b) => (b.kind === "stay" || b.kind === "food" ? 1 : 0) - (a.kind === "stay" || a.kind === "food" ? 1 : 0) || cheapestFirst(a, b) : null
    });
  }

  function pageList(kinds, groups, sorts, autoSort, extra) {
    return function () {
      const cat = EC.catalog().filter((x) => kinds.indexOf(x.kind) !== -1);
      EC.mountFilters(Object.assign({ root: $("#filters"), out: $("#results"), items: cat, card: EC.itemCard, col: "col-sm-6 col-xl-4", groups, sorts, autoSort }, extra));
    };
  }

  const pageThings = pageList(["place"],
    [{ key: "type", label: "Type", options: [{ value: "all", label: "All" }, { value: "hike", label: "Hikes" }, { value: "sight", label: "Sights" }, { value: "water", label: "Waterfalls" }, { value: "tea", label: "Tea" }], get: (it) => it.cat }],
    [{ value: "auto", label: "Suggested" }, { value: "name", label: "A to Z", fn: (a, b) => a.name.localeCompare(b.name) }], null,
    { placeholder: "Search hikes, views, tea...", noun: "places", nounOne: "place" });

  const pageQuiet = pageList(["quiet"], [], [{ value: "auto", label: "Suggested" }], null, { placeholder: "Search quiet places...", noun: "spots", nounOne: "spot" });

  function pageFood() {
    const cat = EC.catalog().filter((x) => x.kind === "food");
    const nomad = (it) => ((it.raw.wifi === "fast" || it.raw.wifi === "ok") && it.raw.outlets === true) ? "yes" : "no";
    EC.mountFilters({
      root: $("#filters"), out: $("#results"), items: cat, card: EC.itemCard, col: "col-sm-6 col-xl-4", placeholder: "Search cafés, kades, coffee...", noun: "places", nounOne: "place",
      groups: [
        { key: "type", label: "Type", options: [{ value: "all", label: "All" }, { value: "cafe", label: "Café" }, { value: "srilankan", label: "Sri Lankan" }, { value: "vegetarian", label: "Vegetarian" }, { value: "international", label: "International" }], get: (it) => it.cat },
        { key: "work", label: "Remote work", options: [{ value: "all", label: "Any" }, { value: "yes", label: "Laptop friendly" }], get: nomad },
        { key: "price", label: "Price", options: [{ value: "all", label: "All" }, { value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "premium", label: "Premium" }], get: (it) => it.level }
      ],
      sorts: [{ value: "auto", label: "Best for me" }, { value: "price", label: "Price: low to high", fn: cheapestFirst }],
      autoSort: (mode) => mode === "local" ? cheapestFirst : null
    });
  }

  function pageStay() {
    const cat = EC.catalog().filter((x) => x.kind === "stay");
    EC.mountFilters({
      root: $("#filters"), out: $("#results"), items: cat, card: EC.itemCard, col: "col-sm-6 col-xl-4", placeholder: "Search rooms, areas, homestays...", noun: "stays", nounOne: "stay",
      groups: [
        { key: "price", label: "Price", options: [{ value: "all", label: "All" }, { value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "premium", label: "Premium" }], get: (it) => it.level },
        { key: "area", label: "Area", options: [{ value: "all", label: "Anywhere" }, { value: "town", label: "Near town" }, { value: "station", label: "Near station" }, { value: "hills", label: "In the hills" }], get: (it) => it.area }
      ],
      sorts: [{ value: "auto", label: "Best for me" }, { value: "price", label: "Price: low to high", fn: cheapestFirst }, { value: "rating", label: "Top rated", fn: bestRated }],
      autoSort: (mode) => mode === "local" ? cheapestFirst : bestRated
    });
  }

  /* ======================================================================
     3. TRANSPORT: info cards, driver directory (filters), fare splitter
     ====================================================================== */
  function transportCard(t, i) {
    let action;
    if (t.kind === "whatsapp") action = '<a class="btn btn-wa btn-sm-x" href="' + waLink(t.number || S.ctx.whatsapp, (t.message || "").replace(/\{property\}/g, S.ctx.homeName)) + '" target="_blank" rel="noopener" data-track="' + esc(t.id) + ':whatsapp">' + ico("whatsapp") + " " + esc(t.cta) + "</a>";
    else if (t.kind === "call") action = '<a class="btn btn-soft btn-sm-x" href="' + telLink(t.number) + '" data-track="' + esc(t.id) + ':call">' + ico("telephone") + " " + esc(t.cta) + "</a>";
    else { const ext = /^https?:/.test(t.url); action = '<a class="btn btn-soft btn-sm-x" href="' + esc(t.url) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ' data-track="' + esc(t.id) + ':link">' + esc(t.cta) + "</a>"; }
    return '<div class="col-sm-6 col-xl-3"><article class="card-x tr reveal" style="--d:' + (i * 50) + 'ms"><span class="tr__icon">' + ico(t.icon) + "</span><h3>" + esc(t.name) + "</h3><p>" + esc(t.text) + "</p>" + action + "</article></div>";
  }

  function pageTransport() {
    $("#transportGrid").innerHTML = byDest(TRANSPORT).map(transportCard).join("");

    const drivers = byDest(DRIVERS).map((d) => Object.assign({ kind: "driver", tags: d.tags || [], raw: d, rating: d.ratings.average, search: (d.name + " " + d.areas + " " + d.vehicle + " " + (d.bio || "") + " " + (d.languages || []).join(" ") + " " + (d.tags || []).join(" ")).toLowerCase() }, {}));
    EC.mountFilters({
      root: $("#filters"), out: $("#results"), items: drivers, card: (it, col, delay) => EC.driverCard(it.raw, col, delay), col: "col-md-6 col-xl-4",
      placeholder: "Search drivers, places, tours...", noun: "drivers", nounOne: "driver", showVibes: false,
      groups: [{ key: "vehicle", label: "Vehicle", options: [{ value: "all", label: "All" }, { value: "Tuk-tuk", label: "Tuk-tuk" }, { value: "Car", label: "Car / taxi" }], get: (it) => it.raw.vehicle }],
      sorts: [{ value: "auto", label: "Top rated", fn: bestRated }], autoSort: () => bestRated
    });

    /* fare splitter */
    const fares = byDest(FARES), sel = $("#fareRoute"), n = $("#fareN");
    sel.innerHTML = fares.map((f, i) => '<option value="' + i + '">' + esc(f.label) + "</option>").join("");
    let group = 2;
    function paintFare() {
      const f = fares[Number(sel.value)]; if (!f) return;
      n.textContent = group;
      $("#fareTotal").textContent = priceRange(f.priceLKR);
      $("#farePer").textContent = fmtLKR(Math.round(f.priceLKR[0] / group)) + " to " + fmtLKR(Math.round(f.priceLKR[1] / group));
      $("#fareMinus").disabled = group <= 1; $("#farePlus").disabled = group >= 3;
      $("#fareNote").textContent = group >= 3 ? "A standard tuk-tuk usually carries up to 3 passengers." : "Per person if you share one tuk-tuk. Agree the price first.";
    }
    sel.addEventListener("change", paintFare);
    $("#fareMinus").addEventListener("click", () => { if (group > 1) { group--; paintFare(); } });
    $("#farePlus").addEventListener("click", () => { if (group < 3) { group++; paintFare(); } });
    paintFare();
  }

  /* ======================================================================
     4. SAFETY: survival guide, hike checklist with progress ring, SOS
     ====================================================================== */
  function sosCards(el, withHost) {
    let html = S.dest.emergency.map((e) => '<div class="col-sm-6 col-xl-3"><a class="sos" href="tel:' + esc(e.number) + '" data-track="sos:' + esc(e.id) + '">' + ico(e.icon) + '<span><span class="sos__name">' + esc(e.name) + '</span><span class="sos__num">' + esc(e.number) + "</span></span></a></div>").join("");
    if (withHost && S.property) html += '<div class="col-sm-6 col-xl-3"><a class="sos" href="' + telLink(S.property.phone) + '" data-track="sos:host">' + ico("house-heart") + '<span><span class="sos__name">Guesthouse</span><span class="sos__num">' + esc(S.property.phone) + "</span></span></a></div>";
    el.innerHTML = html;
  }

  function pageSafety() {
    $("#survivalGrid").innerHTML = S.dest.survival.map((s, i) => '<div class="col-md-6 col-xl-4"><article class="card-x surv reveal" style="--d:' + (i * 50) + 'ms"><h3>' + ico(s.icon) + esc(s.title) + "</h3><ul>" + s.items.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul></article></div>").join("");
    sosCards($("#sosGrid"), false);

    /* checklist: ticks are remembered on this device */
    const KEY = "ellaCheck", items = S.dest.checklist;
    let done = []; try { done = JSON.parse(EC.storeGet(KEY, "[]")); } catch (e) { done = []; }
    const list = $("#checklist"), ring = $("#ringFg"), label = $("#ringLabel"), msg = $("#ringMsg");
    const C = 2 * Math.PI * 34;
    function paint() {
      const n = items.filter((_, i) => done.indexOf(i) !== -1).length;
      ring.style.strokeDasharray = C.toFixed(1); ring.style.strokeDashoffset = (C * (1 - n / items.length)).toFixed(1);
      label.textContent = n + "/" + items.length;
      msg.textContent = n === items.length ? "You are ready. Enjoy the trail!" : "Tick what you have packed.";
    }
    list.innerHTML = items.map((t, i) => '<li><label class="check"><input type="checkbox" data-i="' + i + '"' + (done.indexOf(i) !== -1 ? " checked" : "") + '><span class="check__box">' + ico("check-lg") + "</span><span>" + esc(t) + "</span></label></li>").join("");
    list.addEventListener("change", (e) => { const i = Number(e.target.dataset.i); const at = done.indexOf(i); if (e.target.checked && at === -1) done.push(i); if (!e.target.checked && at !== -1) done.splice(at, 1); EC.storeSet(KEY, JSON.stringify(done)); paint(); });
    $("#checkReset").addEventListener("click", () => { done = []; EC.storeSet(KEY, "[]"); $$("input", list).forEach((c) => { c.checked = false; }); paint(); });
    paint(); EC.observeReveals();
  }

  /* ======================================================================
     5. PLAN MY DAY
        1. read the three choices  2. find the plan in itineraries.js
        3. swap in budget wording  4. draw the timeline
     ====================================================================== */
  const INTEREST = { hiking: "Hiking", photography: "Photography", food: "Food", relaxing: "Relaxing" };
  const TIMES = { two: "2 Hours", half: "Half Day", full: "Full Day" };
  const BUDGETS = { low: "Low", medium: "Medium", premium: "Premium" };
  let lastPlanText = "";
  const fill = (text, bud) => String(text || "").replace(/\{food\}/g, bud.food).replace(/\{ride\}/g, bud.ride).replace(/\{property\}/g, S.ctx.homeName).replace(/\.\./g, ".");

  function buildPlan(sel) {
    let plan = (ITINERARIES.plans[sel.time] || {})[sel.interest], fallback = false;
    if (!plan) { plan = ITINERARIES.plans.half.relaxing; fallback = true; }
    const bud = ITINERARIES.budget[sel.budget];
    return { fallback, title: "Your " + S.dest.name + " " + (INTEREST[sel.interest] || "") + " Plan", tip: plan.tip, cost: (ITINERARIES.cost[sel.time] || {})[sel.budget],
      steps: plan.steps.map((s) => ({ at: s.at, icon: s.icon, place: s.place, title: fill(s.title, bud), note: fill(s.note, bud) })) };
  }

  function showPlan(sel) {
    const plan = buildPlan(sel), out = $("#planResult");
    let cost = "";
    if (plan.cost) {
      cost = '<span class="tag tag--gold">About ' + esc(priceRange(plan.cost)) + " per person</span>";
      if (S.mode === "visitor") cost += '<span class="tag">about US$' + Math.max(1, Math.round(plan.cost[0] / SITE.usdRate)) + " to " + Math.max(1, Math.round(plan.cost[1] / SITE.usdRate)) + "</span>";
    }
    lastPlanText = plan.title + " (" + TIMES[sel.time] + ", " + BUDGETS[sel.budget] + " budget)\n" + plan.steps.map((s) => fmt12(s.at) + " - " + s.title).join("\n") + "\nTimes are approximate. Planned with " + SITE.brand + ".";
    out.innerHTML =
      '<article class="card-x result"><p class="item__kicker">' + ico("stars") + " Your plan</p><h2>" + esc(plan.title) + "</h2>" +
      '<div class="result__tags"><span class="tag">' + esc(TIMES[sel.time]) + '</span><span class="tag">' + esc(BUDGETS[sel.budget]) + " budget</span>" + cost + "</div>" +
      (plan.fallback ? '<p class="result__tip">We did not have that exact combination, so here is a relaxed plan you can adjust.</p>' : "") +
      '<ol class="tl">' + plan.steps.map((s, i) => '<li style="--d:' + (i * 90) + 'ms"><span class="tl__time">' + esc(fmt12(s.at)) + '</span><span class="tl__mark" aria-hidden="true"></span><div><div class="tl__title">' + ico(s.icon) + esc(s.title) + "</div>" +
        (s.note ? '<p class="tl__note">' + esc(s.note) + "</p>" : "") + (s.place ? '<button type="button" class="linkbtn" data-open-place="' + esc(s.place) + '" data-track="plan:' + esc(s.place) + '">View guide</button>' : "") + "</div></li>").join("") + "</ol>" +
      (plan.tip ? '<p class="result__tip">' + ico("lightbulb") + " " + esc(plan.tip) + "</p>" : "") +
      '<div class="result__actions"><a class="btn btn-wa" href="' + waLink("", lastPlanText) + '" target="_blank" rel="noopener" data-track="plan:share">' + ico("whatsapp") + " Share on WhatsApp</a>" +
      '<button type="button" class="btn btn-soft" id="copyPlan">' + ico("clipboard") + ' Copy plan</button><button type="button" class="btn btn-line" id="resetPlan">' + ico("arrow-counterclockwise") + " Start over</button></div>" +
      '<p class="fine">Travel times are approximate and may change depending on weather, traffic and local conditions.</p></article>';
    EC.trackEvent("plan:generated:" + sel.time + "-" + sel.interest + "-" + sel.budget);
    $("#copyPlan").addEventListener("click", () => EC.copyText(lastPlanText, "Plan copied"));
    $("#resetPlan").addEventListener("click", () => { out.innerHTML = ""; $$("#planForm .chip").forEach((b) => b.setAttribute("aria-pressed", "false")); Object.keys(sel).forEach((k) => { sel[k] = null; }); updateGo(sel); window.scrollTo({ top: 0, behavior: "smooth" }); });
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function updateGo(sel) {
    const n = ["time", "interest", "budget"].filter((k) => sel[k]).length;
    $("#planStep").textContent = n + " of 3 chosen";
    $("#planBar").style.width = (n / 3) * 100 + "%";
    $("#createPlan").classList.toggle("is-ready", n === 3);
    $("#planMsg").textContent = "";
  }
  function pagePlan() {
    const sel = { time: null, interest: null, budget: null };
    $$("#planForm .opt").forEach((btn) => btn.addEventListener("click", () => {
      const g = btn.dataset.group; sel[g] = btn.dataset.value;
      $$('#planForm .opt[data-group="' + g + '"]').forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      updateGo(sel);
    }));
    $("#createPlan").addEventListener("click", () => {
      if (!sel.time || !sel.interest || !sel.budget) { $("#planMsg").textContent = "Choose time, interest and budget to continue."; return; }
      showPlan(sel);
    });
    updateGo(sel);
  }

  /* ======================================================================
     6. CONTACT
     ====================================================================== */
  function pageContact() {
    const a = $("#listBusiness");
    if (a) a.href = waLink(SITE.whatsapp, "Hello " + SITE.brand + ", I own a guesthouse / café / tuk-tuk service in " + S.dest.name + " and I'd like to be listed.");
  }

  /* ======================================================================
     7. GUEST MODE
     ====================================================================== */
  function showAlert(el, message) { el.innerHTML = '<div class="alert-x" role="alert">' + ico("exclamation-circle") + "<span>" + esc(message) + "</span></div>"; }

  /* guest/index.html: the permanent QR on the stand opens ?p=property-id and asks for the code.
     A per-guest link (?token=...) skips the box. */
  function pageGuestEntry() {
    const params = new URLSearchParams(location.search), token = GuestAuth.getTokenFromUrl(), wanted = params.get("p");
    if (token) {
      const r = GuestAuth.validateToken(token);
      if (r.ok && (!wanted || wanted === r.property)) { GuestAuth.saveSession(r); location.replace("dashboard.html"); }
      else location.replace("expired.html?reason=" + (r.ok ? "invalid" : r.reason));
      return;
    }
    const prop = PROPERTIES[wanted];
    $("#entryName").textContent = prop ? prop.name : "your guesthouse";
    $("#codeForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $("#entryMsg"), btn = $("#codeBtn");
      btn.disabled = true; btn.innerHTML = "Checking...";
      setTimeout(() => {                                  // tiny pause so the "Checking..." state is visible
        const r = GuestAuth.validateToken($("#codeInput").value);
        btn.disabled = false; btn.innerHTML = ico("key") + " Open my guide";
        if (!r.ok) { showAlert(msg, r.reason === "expired" ? "That code has expired. Please ask your host for a new one." : "We could not find that code. Please check it and try again."); $("#codeInput").setAttribute("aria-invalid", "true"); $("#codeInput").focus(); return; }
        if (wanted && wanted !== r.property) { showAlert(msg, "That code belongs to a different guesthouse. Please check it with your host."); return; }
        GuestAuth.saveSession(r); location.replace("dashboard.html");
      }, 250);
    });
  }

  function pageGuestDashboard(session) {
    const p = S.property, entry = GUEST_TOKENS[session.token];
    $("#gAccess").textContent = "Your guide is open until " + fmtDate(entry.validTo) + ".";
    const left = Math.round((new Date(entry.validTo + "T00:00:00") - new Date(todayStr() + "T00:00:00")) / 86400000);
    if (left >= 0 && left <= 30) $("#gDays").textContent = left === 0 ? "Last day of your stay" : left + (left === 1 ? " day left" : " days left");

    if (entry.validTo === todayStr() && p.reviewUrl) {
      $("#reviewMount").innerHTML = '<div class="review-banner">' + ico("star-fill") + '<div><strong>Enjoyed your stay?</strong><p>A quick Google review helps a small local business a lot.</p></div><a class="btn btn-cta" href="' + esc(p.reviewUrl) + '" target="_blank" rel="noopener" data-track="' + esc(p.id) + ':review">Leave a Google review</a></div>';
    }
    $("#houseGrid").innerHTML = (p.houseRules || []).map((r) => '<div class="col-md-6 col-xl-4"><div class="house">' + ico(r.icon) + "<div><h3>" + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div></div></div>").join("");
    const services = p.services || [];
    if (services.length) $("#servicesGrid").innerHTML = services.map((s) => '<div class="col-sm-6 col-xl-3"><article class="card-x svc">' + ico(s.icon) + "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + '</p><a class="btn btn-wa btn-sm-x" href="' + waLink(p.whatsapp, s.message.replace(/\{property\}/g, p.name)) + '" target="_blank" rel="noopener" data-track="' + esc(p.id) + ":service:" + esc(s.title) + '">' + ico("whatsapp") + " Request</a></article></div>").join("");
    else $("#g-services").hidden = true;
    $("#recsGrid").innerHTML = (p.recommendations || []).map((r) => '<div class="col-md-6 col-xl-4"><article class="card-x tip">' + ico(r.icon) + "<div><h3>" + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div></article></div>").join("");

    const cat = EC.catalog();
    const show = (id, list, col) => { $(id).innerHTML = list.map((it, i) => EC.itemCard(it, col || "col-sm-6 col-xl-4", i * 50)).join(""); };
    show("#gFood", cat.filter((x) => x.kind === "food").slice(0, 3));
    show("#gThings", cat.filter((x) => x.kind === "place").slice(0, 4), "col-sm-6 col-xl-3");
    $("#gDrivers").innerHTML = byDest(DRIVERS).slice().sort((a, b) => b.ratings.average - a.ratings.average).slice(0, 3).map((d, i) => EC.driverCard(d, "col-md-6 col-xl-4", i * 50)).join("");
    if (p.showNearbyStays) show("#gStays", cat.filter((x) => x.kind === "stay").slice(0, 3));
    else { $("#g-stays").hidden = true; const j = $('a[href="#g-stays"]'); if (j) j.hidden = true; }
    sosCards($("#sosGrid"), true);
    EC.favs.paint(); EC.observeReveals();

    /* If the token runs out while the page is open, move to the expired page */
    setInterval(() => { if (!GuestAuth.getActiveSession()) location.replace("expired.html?reason=expired"); }, 60000);
  }

  function pageGuestExpired() {
    const reason = new URLSearchParams(location.search).get("reason");
    const text = { expired: ["Your access has ended", "Your stay has finished, so the private guest guide is now closed. We hope you enjoyed Ella."],
      invalid: ["We could not open that guide", "The link or code was not recognised. Please check it with your host."],
      session: ["This guide is not open", "You may have opened this page directly, or your access has ended. Ask your host for your access link."] }[reason] || ["Guest guide unavailable", "Please ask your host for your access link."];
    $("#expTitle").textContent = text[0]; $("#expText").textContent = text[1];
  }

  /* ======================================================================
     8. START-UP
     ====================================================================== */
  const PUBLIC = { home: pageHome, explore: pageExplore, things: pageThings, quiet: pageQuiet, food: pageFood, stay: pageStay, transport: pageTransport, safety: pageSafety, plan: pagePlan, contact: pageContact };

  function init() {
    const page = document.body.dataset.page;
    if (page === "guest-entry") {
      EC.boot({ header: "guest", title: PROPERTIES[new URLSearchParams(location.search).get("p")] ? PROPERTIES[new URLSearchParams(location.search).get("p")].name : "Guest Guide" });
      pageGuestEntry();
    } else if (page === "guest-dashboard") {
      const session = GuestAuth.getActiveSession();            // re-checked on every load
      if (!session) { location.replace("expired.html?reason=session"); return; }
      EC.boot({ header: "guest", property: session.property, title: PROPERTIES[session.property].name });
      const dock = $("#siteDock"); if (dock) dock.innerHTML = '<a data-link="whatsapp" href="#" target="_blank" rel="noopener">' + ico("whatsapp") + "<span>WhatsApp</span></a><a data-link=\"call\" href=\"#\">" + ico("telephone") + "<span>Call</span></a><a data-link=\"maps\" href=\"#\" target=\"_blank\" rel=\"noopener\">" + ico("signpost-2") + "<span>Directions</span></a>";
      EC.wireLinks(); pageGuestDashboard(session);
    } else if (page === "guest-expired") {
      EC.boot({}); pageGuestExpired();
    } else {
      EC.boot({});
      (PUBLIC[page] || function () {})();
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
