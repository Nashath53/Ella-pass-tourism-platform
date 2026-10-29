/* STATUS: RED - DO NOT EDIT unless you know JavaScript. This file is the engine of the site.
   One wrong character can break every page. Ask for help or copy the file first as a backup. */
/* ==========================================================================
   app.js  -  CORE + REUSABLE UI  (loaded on every page)
   --------------------------------------------------------------------------
   1 Helpers        2 Context (who WhatsApp/Call talk to)   3 Theme + mode
   4 Small UI bits  5 Saved list (hearts)                   6 Pop-up sheet
   7 Cards          8 Search + filter bar                   9 Start-up
   Page-specific code is in pages.js. Everything shared is on window.EC.
   ========================================================================== */
(function () {
  "use strict";
  const EC = (window.EC = window.EC || {});
  const ico = EC.ico;

  /* ======================================================================
     1. HELPERS
     ====================================================================== */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* Escape text before it goes into innerHTML. Every data value passes through esc(). */
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const fmtLKR = (n) => "LKR " + Number(n).toLocaleString("en-US");
  const priceRange = (a) => fmtLKR(a[0]) + " to " + fmtLKR(a[1]);
  function fmt12(hhmm) { const [h, m] = hhmm.split(":").map(Number); return ((h % 12) || 12) + ":" + String(m).padStart(2, "0") + " " + (h < 12 ? "AM" : "PM"); }
  function fmtDate(iso) { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  function todayStr() { const d = new Date(), p = (n) => String(n).padStart(2, "0"); return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); }
  function waLink(number, message) {
    const digits = String(number || "").replace(/\D/g, "");
    return "https://wa.me/" + digits + (message ? "?text=" + encodeURIComponent(message) : "");
  }
  const telLink = (phone) => "tel:" + String(phone || "").replace(/[^\d+]/g, "");
  const storeGet = (k, fallback) => { try { const v = localStorage.getItem(k); return v == null ? fallback : v; } catch (e) { return fallback; } };
  const storeSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: ignore */ } };

  /* Click tracking. Logs today; forwards to analytics later (see analytics notes in README).
     It measures taps (intent). The real booking happens inside WhatsApp, which this site cannot see. */
  function trackEvent(name) {
    console.log("[track]", name);
    /* forward to whichever optional tool js/analytics.js loaded (all are off until you set SITE.analytics) */
    if (window.umami && typeof window.umami.track === "function") window.umami.track(name);
    if (typeof window.plausible === "function") window.plausible(name);
    if (typeof window.gtag === "function") window.gtag("event", "click", { event_label: name });
  }

  /* ======================================================================
     2. CONTEXT: who do the WhatsApp / Call / Directions buttons talk to?
        Public pages -> EllaPass.   Guest pages -> the guesthouse.
     ====================================================================== */
  const state = { base: "", dest: null, property: null, ctx: {}, mode: "visitor", onMode: [] };

  function setupContext(propertyId) {
    state.dest = DESTINATIONS[SITE.defaultDestination];
    state.property = null;
    const pub = PROPERTIES[propertyId];
    if (pub) {
      /* merge public profile + private guest info (private data only exists on /guest pages) */
      state.property = Object.assign({}, pub, typeof GUEST_PRIVATE !== "undefined" ? GUEST_PRIVATE[propertyId] : {});
      state.dest = DESTINATIONS[pub.destination] || state.dest;
      state.ctx = { id: pub.id, name: pub.name, whatsapp: pub.whatsapp, phone: pub.phone, mapsUrl: pub.mapsUrl, homeName: pub.name,
                    waMessage: "Hello " + pub.name + ", I'm a guest and have a question." };
    } else {
      state.ctx = { id: "ella-companion", name: SITE.brand, whatsapp: SITE.whatsapp, phone: SITE.phone, mapsUrl: state.dest.mapsUrl, homeName: "your guesthouse",
                    waMessage: "Hello " + SITE.brand + ", I have a question about " + state.dest.name + "." };
    }
  }
  const byDest = (list) => list.filter((x) => x.destination === state.dest.id);

  function wireLinks() {
    const c = state.ctx;
    $$('[data-link="whatsapp"]').forEach((a) => { a.href = waLink(c.whatsapp, c.waMessage); if (!a.dataset.track) a.dataset.track = c.id + ":whatsapp"; });
    $$('[data-link="call"]').forEach((a) => { a.href = telLink(c.phone); if (!a.dataset.track) a.dataset.track = c.id + ":call"; });
    $$('[data-link="maps"]').forEach((a) => { a.href = c.mapsUrl; if (!a.dataset.track) a.dataset.track = c.id + ":directions"; });
    $$('[data-link="feedback"]').forEach((a) => { a.href = SITE.feedbackUrl; a.target = "_blank"; a.rel = "noopener"; if (!a.dataset.track) a.dataset.track = "feedback:open"; });
    $$("[data-dest]").forEach((el) => { const v = state.dest[el.dataset.dest]; el.textContent = v == null ? "" : v; });
    if (state.property) $$("[data-p]").forEach((el) => { const v = state.property[el.dataset.p]; el.textContent = v == null ? "" : v; });
  }

  /* ======================================================================
     3. THEME (light / dark) + VIEW MODE (Visitor / Sri Lankan)
     ====================================================================== */
  const THEME_KEY = "ellaTheme", MODE_KEY = "ellaMode";
  const theme = {
    get: () => document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    set(t, save) {
      document.documentElement.dataset.theme = t;
      document.documentElement.dataset.bsTheme = t;           // keeps any Bootstrap bits in sync
      const meta = $('meta[name="theme-color"]'); if (meta) meta.setAttribute("content", t === "dark" ? "#0A1410" : "#F7F3EA");
      $$("[data-theme-btn]").forEach((b) => b.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme"));
      if (save) storeSet(THEME_KEY, t);
    },
    init() {
      theme.set(theme.get(), false);       // the tiny script in <head> already chose it; here we sync the buttons
      /* follow the phone/computer setting until the person picks one themselves */
      if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => { if (!storeGet(THEME_KEY, null)) theme.set(e.matches ? "dark" : "light", false); });
    },
    toggle() { theme.set(theme.get() === "dark" ? "light" : "dark", true); trackEvent("theme:" + theme.get()); }
  };

  function applyMode(m, save) {
    state.mode = m === "local" ? "local" : "visitor";
    document.body.dataset.mode = state.mode;
    $$("[data-mode-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.modeBtn === state.mode)));
    if (save) storeSet(MODE_KEY, state.mode);
    state.onMode.forEach((fn) => fn(state.mode));
  }

  /* ======================================================================
     4. SMALL UI BITS: toast, copy, scroll effects, reveal-on-scroll
     ====================================================================== */
  function toast(message) {
    let t = $("#toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast-x"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = message; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function copyText(text, message) {
    const done = () => { toast(message || "Copied"); if (navigator.vibrate) { try { navigator.vibrate(12); } catch (e) { /* ignore */ } } };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { toast("Could not copy. Please copy it by hand."); }
    ta.remove();
  }

  /* little train on the rail line, Back-to-top, and the "scrolled" header shadow */
  function initScrollUi() {
    const rail = $("#rail"), top = $("#toTop"), header = $("#siteHeader");
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (rail) rail.style.setProperty("--p", p.toFixed(4));
      if (top) top.hidden = window.scrollY < 700;
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* fade-up on scroll. If the browser cannot do it, or the person prefers less motion, everything just shows. */
  let revealIO = null;
  function observeReveals() {
    const items = $$(".reveal:not(.in)");
    const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || calm) { items.forEach((el) => el.classList.add("in")); return; }
    if (!revealIO) revealIO = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } }), { threshold: 0.06, rootMargin: "0px 0px -4% 0px" });
    items.forEach((el) => revealIO.observe(el));
  }

  /* ======================================================================
     5. SAVED LIST ("My Ella list"): the heart buttons
     ====================================================================== */
  const FAV_KEY = "ellaFavs";
  const favs = {
    get() { try { const a = JSON.parse(storeGet(FAV_KEY, "[]")); return Array.isArray(a) ? a : []; } catch (e) { return []; } },
    has: (key) => favs.get().indexOf(key) !== -1,
    toggle(key) {
      const list = favs.get(), i = list.indexOf(key);
      if (i === -1) list.push(key); else list.splice(i, 1);
      storeSet(FAV_KEY, JSON.stringify(list)); favs.paint();
      return i === -1;
    },
    clear() { storeSet(FAV_KEY, "[]"); favs.paint(); },
    /* update every heart on the page + the floating counter */
    paint() {
      const list = favs.get();
      $$("[data-fav]").forEach((b) => {
        const on = list.indexOf(b.dataset.fav) !== -1;
        b.setAttribute("aria-pressed", String(on));
        b.setAttribute("aria-label", (on ? "Remove " : "Save ") + (b.dataset.name || "this") + (on ? " from my list" : " to my list"));
      });
      const btn = $("#savedBtn"), count = $("#savedCount");
      if (btn) { btn.hidden = list.length === 0; if (count) count.textContent = list.length; }
    }
  };
  function heartBtn(key, name) {
    return '<button type="button" class="heart" data-fav="' + esc(key) + '" data-name="' + esc(name) + '" aria-pressed="false" aria-label="Save ' + esc(name) + ' to my list">' + ico("heart") + ico("heart-fill") + "</button>";
  }

  /* ======================================================================
     6. POP-UP SHEET (native <dialog>: focus trap + Esc come for free).
        Bottom sheet on phones, centred card on desktop.
     ====================================================================== */
  function ensureSheet() {
    let d = $("#sheet");
    if (d) return d;
    d = document.createElement("dialog"); d.id = "sheet"; d.className = "sheet"; d.setAttribute("aria-labelledby", "sheetTitle");
    d.innerHTML = '<div class="sheet__grab" aria-hidden="true"></div><div class="sheet__head"><h2 id="sheetTitle"></h2><button type="button" class="icon-btn" data-close aria-label="Close">' + ico("x-lg") + '</button></div><div class="sheet__body" id="sheetBody"></div>';
    document.body.appendChild(d);
    d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); });
    d.addEventListener("close", () => { document.documentElement.classList.remove("lock"); d.style.transform = ""; });
    /* swipe down on the handle / title to close (phones) */
    let y0 = null;
    const head = $(".sheet__head", d), grab = $(".sheet__grab", d);
    [head, grab].forEach((el) => {
      el.addEventListener("touchstart", (e) => { y0 = e.touches[0].clientY; }, { passive: true });
      el.addEventListener("touchmove", (e) => { if (y0 == null) return; const dy = e.touches[0].clientY - y0; if (dy > 0) d.style.transform = "translateY(" + dy + "px)"; }, { passive: true });
      el.addEventListener("touchend", (e) => { if (y0 == null) return; const dy = e.changedTouches[0].clientY - y0; y0 = null; if (dy > 100) d.close(); else d.style.transform = ""; });
    });
    return d;
  }
  function openSheet(title, html, extraClass) {
    const d = ensureSheet();
    d.className = "sheet " + (extraClass || "");
    $("#sheetTitle", d).textContent = title;
    $("#sheetBody", d).innerHTML = html;
    $("#sheetBody", d).scrollTop = 0;
    document.documentElement.classList.add("lock");
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
    favs.paint();
    return d;
  }

  /* ======================================================================
     7. CATALOG + CARDS
     ====================================================================== */
  const TAG_BY_ID = {}; TAGS.forEach((t) => { TAG_BY_ID[t.id] = t; });
  const DIFF = { easy: "Easy", moderate: "Moderate", challenging: "Challenging" };
  const FOOD_LABELS = { cafe: "Café", srilankan: "Sri Lankan", vegetarian: "Vegetarian", international: "International" };
  const FOOD_SCENE = { cafe: "cafe", srilankan: "kade", vegetarian: "cafe", international: "cafe" };
  const AREA_LABEL = { town: "Near town", station: "Near station", hills: "In the hills" };
  const LEVEL_LABEL = { low: "Low", medium: "Medium", premium: "Premium" };
  const WIFI_LABEL = { fast: "Fast Wi-Fi", ok: "OK Wi-Fi", none: "No Wi-Fi" };
  const KIND_LABEL = { place: "Things to do", quiet: "Quiet spot", food: "Food & café", stay: "Stay" };
  const KIND_ICON = { place: "binoculars", quiet: "cloud-fog2", food: "cup-hot", stay: "house-heart" };

  /* one flat list so search, filters and the saved list can treat every kind the same way */
  function buildCatalog() {
    const out = [];
    byDest(PLACES).forEach((p) => out.push({ kind: "place", key: "place:" + p.id, id: p.id, name: p.name, text: p.short, tags: p.tags || [], scene: p.scene, image: p.image, alt: p.imageAlt, price: 0, rating: 0, cat: p.category, raw: p, extra: p.category + " " + p.difficulty + " " + p.overview }));
    byDest(typeof QUIET_SPOTS !== "undefined" ? QUIET_SPOTS : []).forEach((p) => out.push({ kind: "quiet", key: "quiet:" + p.id, id: p.id, name: p.name, text: p.short, tags: p.tags || [], scene: p.scene, image: p.image, alt: p.imageAlt, price: 0, rating: 0, raw: p, extra: p.overview }));
    byDest(FOOD).forEach((f) => out.push({ kind: "food", key: "food:" + f.id, id: f.id, name: f.name, text: f.desc, tags: f.tags || [], scene: FOOD_SCENE[f.type] || "cafe", image: f.image, alt: f.imageAlt, price: f.priceLKR[0], rating: 0, cat: f.type, level: f.level, raw: f, extra: f.type + " " + f.level + " " + f.distance + " " + (f.wifi === "fast" ? "wifi" : "") }));
    byDest(STAYS).forEach((s) => out.push({ kind: "stay", key: "stay:" + s.id, id: s.id, name: s.name, text: s.note, tags: s.tags || [], scene: "stay", image: s.image, alt: s.imageAlt, price: s.priceLKR[0], rating: s.ratings ? s.ratings.average : 0, area: s.area, level: s.level, raw: s, extra: s.area + " " + s.level + " " + s.distance }));
    out.forEach((it) => {
      const tagWords = it.tags.map((t) => (TAG_BY_ID[t] ? TAG_BY_ID[t].label : t)).join(" ");
      it.search = (it.name + " " + it.text + " " + tagWords + " " + KIND_LABEL[it.kind] + " " + (it.extra || "")).toLowerCase();
    });
    return out;
  }

  function stars(r) {
    if (!r || !r.count) return '<span class="stars stars--new">New</span>';
    let icons = "";
    for (let i = 1; i <= 5; i++) icons += ico(r.average >= i ? "star-fill" : (r.average >= i - 0.5 ? "star-half" : "star"));
    return '<span class="stars" role="img" aria-label="' + esc(r.average) + " out of 5 from " + esc(r.count) + ' ratings">' + icons + '</span><span class="stars__num">' + esc(r.average.toFixed(1)) + " (" + esc(r.count) + ")</span>";
  }
  function badges(it) {
    return (it.sponsored ? '<span class="badge-x badge-x--sponsored">Sponsored</span>' : "") +
           (it.verified ? '<span class="badge-x badge-x--verified">' + ico("patch-check") + " Verified</span>" : "");
  }
  function tagChips(tags, max) {
    return (tags || []).filter((t) => TAG_BY_ID[t]).slice(0, max || 3).map((t) => '<span class="tagchip">' + ico(TAG_BY_ID[t].icon) + esc(TAG_BY_ID[t].label) + "</span>").join("");
  }
  function nomadBadges(f) {
    if (!f.wifi) return "";
    return '<div class="mini-badges"><span class="mini-badge ' + (f.wifi === "none" ? "" : "mini-badge--good") + '">' + ico("wifi") + esc(WIFI_LABEL[f.wifi] || f.wifi) + "</span>" +
           '<span class="mini-badge ' + (f.outlets ? "mini-badge--good" : "") + '">' + ico("plug") + (f.outlets ? "Power outlets" : "Few outlets") + "</span>" +
           (f.tested ? '<span class="mini-badge mini-badge--rail">' + (/^sample/i.test(f.tested) ? "Sample data" : "Tested " + esc(f.tested)) + "</span>" : "") + "</div>";
  }

  /* picture area: illustrated scene, with an optional real photo on top */
  function artHtml(it, topLeft) {
    return '<div class="item__art">' + EC.scene(it.scene) +
      (it.image ? '<img src="' + state.base + "images/" + esc(it.image) + '" alt="' + esc(it.alt || it.name) + '" loading="lazy" decoding="async" onerror="this.remove()">' : "") +
      (topLeft ? '<span class="pill">' + topLeft + "</span>" : "") + heartBtn(it.key, it.name) + "</div>";
  }

  /* one card for every kind of item */
  function itemCard(it, col, delay) {
    const r = it.raw, k = it.kind;
    let pill = "", meta = "", price = "", actions = "";
    if (k === "place" || k === "quiet") {
      if (r.difficulty) pill = '<span class="dot dot--' + esc(r.difficulty) + '"></span>' + esc(DIFF[r.difficulty]);
      meta = '<ul class="meta"><li>' + ico("clock") + esc(r.duration) + "</li><li>" + ico("sun") + esc(r.best) + "</li></ul>";
      actions = '<button type="button" class="btn btn-soft btn-sm-x" data-open="' + esc(it.key) + '" data-track="' + esc(it.id) + ':details">View guide</button>';
    } else if (k === "food") {
      pill = ico(FOOD_TYPES[r.type] || "cup-hot") + esc(FOOD_LABELS[r.type] || r.type);
      price = '<p class="item__price">' + esc(priceRange(r.priceLKR)) + " <small>per person</small></p>";
      meta = '<ul class="meta"><li>' + ico("geo-alt") + esc(r.distance) + "</li></ul>" + nomadBadges(r);
      actions = '<button type="button" class="btn btn-soft btn-sm-x" data-open="' + esc(it.key) + '" data-track="' + esc(it.id) + ':details">Details</button>' +
                '<a class="btn btn-line btn-sm-x" href="' + esc(r.mapsUrl) + '" target="_blank" rel="noopener" data-track="' + esc(it.id) + ':maps">' + ico("map") + " Maps</a>";
    } else {
      pill = ico("house-heart") + esc(AREA_LABEL[r.area] || r.area);
      price = '<p class="item__price">From ' + esc(fmtLKR(r.priceLKR[0])) + " <small>per room, per night</small></p>";
      meta = '<div class="item__rate">' + stars(r.ratings) + "</div><ul class='meta'><li>" + ico("geo-alt") + esc(r.distance) + "</li></ul>";
      const msg = "Hello, I'm looking for a room. Is " + r.name + " available? I found you on " + SITE.brand + ".";
      actions = '<a class="btn btn-wa btn-sm-x" href="' + waLink(r.whatsapp, msg) + '" target="_blank" rel="noopener" data-track="' + esc(it.id) + ':whatsapp">' + ico("whatsapp") + " WhatsApp</a>" +
                '<button type="button" class="btn btn-line btn-sm-x" data-open="' + esc(it.key) + '" data-track="' + esc(it.id) + ':details">Details</button>';
    }
    return '<div class="' + (col || "col-sm-6 col-lg-4") + '"><article class="card-x item reveal" style="--d:' + (delay || 0) + 'ms">' + artHtml(it, pill) +
      '<div class="item__body"><p class="item__kicker">' + ico(KIND_ICON[k]) + esc(KIND_LABEL[k]) + (badges(r) ? " " + badges(r) : "") + "</p><h3>" + esc(it.name) + "</h3>" +
      '<p class="item__text">' + esc(it.text) + "</p>" + price + meta + '<div class="tagrow">' + tagChips(it.tags, 3) + '</div><div class="item__actions">' + actions + "</div></div></article></div>";
  }

  /* ---- drivers: photo, vehicle, short bio and comments ---- */
  const initials = (name) => String(name).replace(/\(.*?\)/g, "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  function avatarHtml(d, size) {
    return '<span class="avatar avatar--' + (size || "md") + '"><span class="avatar__fb">' + esc(initials(d.name)) + "</span>" +
      (d.photo ? '<img src="' + state.base + "images/" + esc(d.photo) + '" alt="' + esc("Photo of " + d.name) + '" loading="lazy" decoding="async" onerror="this.remove()">' : "") + "</span>";
  }
  function vehicleArt(d) {
    return '<div class="driver__veh">' + EC.scene(d.vehicle === "Car" ? "car" : "tuktuk") +
      (d.vehiclePhoto ? '<img src="' + state.base + "images/" + esc(d.vehiclePhoto) + '" alt="' + esc((d.vehicleNote || d.vehicle) + ", " + d.name) + '" loading="lazy" decoding="async" onerror="this.remove()">' : "") + "</div>";
  }
  /* Status badge: verified = tick (no label), check = "Check before you go", unverified = "Not yet verified" */
  const statusBadge = (item) => {
    if (!item || !item.status || item.status === "verified") return "";
    if (item.status === "check") return '<span class="tagchip tagchip--check">' + ico("exclamation-circle") + " Check before you go" + (item.checkNote ? ": " + esc(item.checkNote) : "") + "</span>";
    return '<span class="tagchip tagchip--unverified">' + ico("info-circle") + " Not yet verified by EllaPass</span>";
  };

  /* Halal badge: only shown when level is set AND verifiedOn is set (Rule R4) */
  const halalBadge = (item) => {
    const h = item && item.halal;
    if (!h || !h.level || !h.verifiedOn) return "";
    const labels = { certified: "Halal certified (HAC)", full: "Fully halal", meat: "Halal meat", request: "Halal on request" };
    return '<span class="tagchip tagchip--halal">' + ico("check-lg") + " " + esc(labels[h.level] || h.level) + "</span>";
  };

  const sampleNote = (d) => d.sample ? '<p class="sample-note">' + ico("exclamation-circle") + "<span>Sample profile. Replace with the real driver's details, photo and comments (with permission).</span></p>" : "";

  function driverCard(d, col, delay) {
    const msg = "Hello " + d.name + ", I found you on " + SITE.brand + ". I'd like to hire you. Are you free?";
    const n = (d.reviews || []).length;
    return '<div class="' + (col || "col-md-6 col-xl-4") + '"><article class="card-x driver reveal" style="--d:' + (delay || 0) + 'ms">' + vehicleArt(d) +
      '<div class="driver__body"><div class="driver__who">' + avatarHtml(d) + "<div><h3>" + esc(d.name) + '</h3><p class="item__kicker">' + ico(d.vehicle === "Car" ? "car-front" : "scooter") + esc(d.vehicle) + (badges(d) ? " " + badges(d) : "") + "</p></div></div>" +
      '<div class="item__rate">' + stars(d.ratings) + (n ? '<span class="rate-note">' + n + (n === 1 ? " comment" : " comments") + "</span>" : "") + "</div>" +
      (d.bio ? '<p class="item__text clamp">' + esc(d.bio) + "</p>" : "") +
      '<ul class="meta">' + (d.languages ? "<li>" + ico("chat-dots") + esc(d.languages.join(", ")) + "</li>" : "") + "<li>" + ico("geo-alt") + esc(d.areas) + "</li></ul>" +
      '<div class="tagrow">' + tagChips(d.tags, 3) + "</div>" + sampleNote(d) +
      '<div class="item__actions"><a class="btn btn-wa btn-sm-x" href="' + waLink(d.whatsapp, msg) + '" target="_blank" rel="noopener" data-track="' + esc(d.id) + ':hire">' + ico("whatsapp") + " Hire on WhatsApp</a>" +
      '<button type="button" class="btn btn-line btn-sm-x" data-open-driver="' + esc(d.id) + '" data-track="' + esc(d.id) + ':profile">Profile &amp; comments</button></div></div></article></div>';
  }

  function openDriver(id) {
    const d = DRIVERS.find((x) => x.id === id); if (!d) return;
    const msg = "Hello " + d.name + ", I found you on " + SITE.brand + ". I'd like to hire you. Are you free?";
    const revs = (d.reviews || []);
    const html = '<div class="dprofile">' + vehicleArt(d) + '<div class="dprofile__who">' + avatarHtml(d, "lg") + "<div><p class=\"item__kicker\">" + ico(d.vehicle === "Car" ? "car-front" : "scooter") + esc(d.vehicle) + (badges(d) ? " " + badges(d) : "") + '</p><div class="item__rate">' + stars(d.ratings) + "</div></div></div></div>" +
      sampleNote(d) + (d.bio ? "<p>" + esc(d.bio) + "</p>" : "") +
      '<dl class="facts">' + (d.languages ? "<div><dt>Languages</dt><dd>" + esc(d.languages.join(", ")) + "</dd></div>" : "") + (d.years ? "<div><dt>Experience</dt><dd>" + esc(d.years) + "</dd></div>" : "") +
      "<div><dt>Areas</dt><dd>" + esc(d.areas) + "</dd></div>" + (d.vehicleNote ? "<div><dt>Vehicle</dt><dd>" + esc(d.vehicleNote) + "</dd></div>" : "") + "</dl>" +
      "<h3>What travellers say</h3>" +
      (revs.length ? '<ul class="revs">' + revs.map((r) => '<li class="rev"><div class="rev__top"><strong>' + esc(r.name) + "</strong><span>" + esc(r.country) + " · " + esc(r.date) + '</span><span class="rev__stars" role="img" aria-label="' + esc(r.rating) + ' out of 5">' + [1, 2, 3, 4, 5].map((i) => ico(r.rating >= i ? "star-fill" : "star")).join("") + "</span></div><p>" + esc(r.text) + "</p>" + (r.sample ? '<span class="tagchip">Sample comment</span>' : "") + "</li>").join("") + "</ul>" : '<p class="empty-note">No comments yet. Be the first to share how it went.</p>') +
      '<p class="fine">Comments come from our feedback form. Agree the price before you go.</p>' +
      '<div class="sheet__actions"><a class="btn btn-wa" href="' + waLink(d.whatsapp, msg) + '" target="_blank" rel="noopener" data-track="' + esc(d.id) + ':hire">' + ico("whatsapp") + " Hire on WhatsApp</a>" +
      '<a class="btn btn-soft" href="' + esc(SITE.feedbackUrl) + '" target="_blank" rel="noopener" data-feedback="driver:' + esc(d.id) + '" data-track="' + esc(d.id) + ':comment">' + ico("pencil-square") + " Add your comment</a></div>";
    openSheet(d.name, html, "sheet--driver");
  }

  /* what shows in the pop-up sheet for each kind */
  function detailHtml(it) {
    const r = it.raw; let body = "";
    const msgBase = (it.kind === "stay") ? "Hello, I'm looking for a room. Is " + r.name + " available? I found you on " + SITE.brand + "." : "Hello, I'd like help arranging a visit to " + it.name + ".";
    const wa = (it.kind === "stay") ? waLink(r.whatsapp, msgBase) : waLink(state.ctx.whatsapp, msgBase);
    if (it.kind === "place" || it.kind === "quiet") {
      body = "<p>" + esc(r.overview) + "</p>" +
        '<dl class="facts"><div><dt>Time needed</dt><dd>' + esc(r.duration) + "</dd></div><div><dt>Best time</dt><dd>" + esc(r.best) + "</dd></div><div><dt>Cost</dt><dd>" + esc(r.cost) + "</dd></div>" +
        (r.difficulty ? "<div><dt>Difficulty</dt><dd>" + esc(DIFF[r.difficulty] || r.difficulty) + "</dd></div>" : "") + "</dl>" +
        "<h3>How to get there</h3><p>" + esc(r.how) + "</p><h3>Tips</h3><ul>" + (r.tips || []).map((t) => "<li>" + esc(t) + "</li>").join("") + "</ul>" +
        (r.safety ? '<p class="callout">' + ico("exclamation-circle") + "<span><strong>Stay safe:</strong> " + esc(r.safety) + "</span></p>" : "");
    } else if (it.kind === "food") {
      body = "<p>" + esc(r.desc) + "</p>" + '<dl class="facts"><div><dt>Type</dt><dd>' + esc(FOOD_LABELS[r.type] || r.type) + "</dd></div><div><dt>Typical price</dt><dd>" + esc(priceRange(r.priceLKR)) + " per person</dd></div><div><dt>Distance</dt><dd>" + esc(r.distance) + "</dd></div></dl>" + nomadBadges(r) +
        '<p class="fine">Prices are typical ranges and can change.</p>';
    } else {
      body = "<p>" + esc(r.note) + "</p>" + '<div class="item__rate">' + stars(r.ratings) + "</div>" +
        '<dl class="facts"><div><dt>Price</dt><dd>' + esc(priceRange(r.priceLKR)) + "</dd></div><div><dt>Per</dt><dd>Room, per night</dd></div><div><dt>Area</dt><dd>" + esc(AREA_LABEL[r.area] || r.area) + "</dd></div><div><dt>Distance</dt><dd>" + esc(r.distance) + "</dd></div></dl>" +
        '<p class="fine">Prices are typical ranges, not guaranteed. Message the owner to check price and availability.</p>';
    }
    return body + '<div class="tagrow tagrow--lg">' + tagChips(it.tags, 8) + "</div>" +
      '<div class="sheet__actions"><a class="btn btn-wa" href="' + wa + '" target="_blank" rel="noopener" data-track="' + esc(it.id) + ':whatsapp">' + ico("whatsapp") + " " + (it.kind === "stay" ? "WhatsApp the owner" : "Ask " + (state.property ? "the guesthouse" : "us")) + "</a>" +
      '<a class="btn btn-soft" href="' + esc(r.mapsUrl) + '" target="_blank" rel="noopener" data-track="' + esc(it.id) + ':maps">' + ico("map") + " Open in Maps</a>" +
      '<button type="button" class="btn btn-line" data-fav-sheet="' + esc(it.key) + '">' + ico("heart") + " Save to my list</button></div>" +
      '<p class="fine"><a href="' + esc(SITE.feedbackUrl) + '" target="_blank" rel="noopener" data-feedback="item:' + esc(it.key) + '">Report a wrong price, time or detail</a></p>';
  }
  /* T-06: Sample items are hidden from public pages unless ?preview=1 is in the URL */
  const SHOW_PREVIEW = new URLSearchParams(location.search).has("preview");
  const hideSample = (list) => SHOW_PREVIEW ? list : (list || []).filter((x) => !x.sample);

  let CATALOG = [];
  function openItem(key) {
    const it = CATALOG.find((x) => x.key === key); if (!it) return;
    openSheet(it.name, detailHtml(it));
    const fb = $("[data-fav-sheet]"); if (fb) { const on = favs.has(key); fb.innerHTML = ico("heart") + (on ? " Saved. Tap to remove" : " Save to my list"); }
  }
  /* "View guide" buttons in the planner point at place ids */
  function openPlaceId(id) { const it = CATALOG.find((x) => x.id === id && (x.kind === "place" || x.kind === "quiet")); if (it) openItem(it.key); }

  /* My Ella list: opens as a sheet */
  function openSaved() {
    const list = favs.get().map((k) => CATALOG.find((x) => x.key === k)).filter(Boolean);
    let html;
    if (!list.length) html = '<p class="empty-note">Tap the heart on any place, café or stay to save it here.</p>';
    else html = '<ul class="saved">' + list.map((it) => '<li><span class="saved__ico">' + ico(KIND_ICON[it.kind]) + '</span><div><strong>' + esc(it.name) + "</strong><small>" + esc(KIND_LABEL[it.kind]) + '</small></div><button type="button" class="icon-btn" data-fav="' + esc(it.key) + '" data-name="' + esc(it.name) + '" aria-pressed="true" aria-label="Remove ' + esc(it.name) + ' from my list">' + ico("trash") + "</button></li>").join("") + "</ul>" +
      '<div class="sheet__actions"><a class="btn btn-wa" href="' + waLink("", "My Ella list (" + SITE.brand + "):\n" + list.map((it) => "- " + it.name).join("\n")) + '" target="_blank" rel="noopener" data-track="saved:share">' + ico("whatsapp") + ' Share on WhatsApp</a><button type="button" class="btn btn-line" id="clearSaved">Clear list</button></div>';
    openSheet("My Ella list", html, "sheet--saved");
    const clr = $("#clearSaved"); if (clr) clr.addEventListener("click", () => { favs.clear(); openSaved(); });
  }

  /* ======================================================================
     8. SEARCH + FILTER BAR (used on Explore, Things, Quiet, Food, Stay, Transport)
        cfg: out (results element), items, card(item,col,delay), col, noun,
             groups [{key,label,options:[{value,label}],get(item)}],
             sorts [{value,label,fn}], autoSort(mode) -> comparator, showVibes
     ====================================================================== */
  function mountFilters(cfg) {
    const root = cfg.root, out = cfg.out, items = cfg.items;
    const sorts = cfg.sorts || [{ value: "auto", label: "Best for me" }];
    const S = { q: "", tags: [], groups: {}, sort: "auto" };
    (cfg.groups || []).forEach((g) => { S.groups[g.key] = "all"; });

    /* read the starting state from the web address, e.g. explore.html?tag=quiet&q=cafe */
    try {
      const p = new URLSearchParams(location.search);
      S.q = p.get("q") || "";
      S.tags = (p.get("tag") || "").split(",").filter((t) => TAG_BY_ID[t]);
      (cfg.groups || []).forEach((g) => { const v = p.get(g.key); if (v && g.options.some((o) => o.value === v)) S.groups[g.key] = v; });
      const so = p.get("sort"); if (so && sorts.some((x) => x.value === so)) S.sort = so;
    } catch (e) { /* ignore */ }

    const tagIds = TAGS.map((t) => t.id).filter((id) => items.some((it) => it.tags.indexOf(id) !== -1));
    const tagCount = (id) => items.filter((it) => it.tags.indexOf(id) !== -1).length;

    root.innerHTML =
      '<div class="fbar">' +
        '<label class="search">' + ico("search") + '<span class="visually-hidden">Search</span><input type="search" id="fq" placeholder="' + esc(cfg.placeholder || "Search...") + '" autocomplete="off" value="' + esc(S.q) + '"><button type="button" class="search__x" id="fqx" aria-label="Clear search" hidden>' + ico("x-lg") + "</button></label>" +
        '<div class="fbar__groups">' + (cfg.groups || []).map((g) => '<div class="fgroup" data-group="' + g.key + '"><span class="fbar__label">' + esc(g.label) + '</span><div class="chips chips--sm"></div></div>').join("") + "</div>" +
        (tagIds.length && cfg.showVibes !== false ? '<div class="fgroup"><span class="fbar__label">Vibe</span><div class="chips chips--sm chips--scroll" id="fvibes">' +
          tagIds.map((id) => '<button type="button" class="chip" data-tag="' + id + '" aria-pressed="false">' + ico(TAG_BY_ID[id].icon) + esc(TAG_BY_ID[id].label) + " <small>" + tagCount(id) + "</small></button>").join("") + "</div></div>" : "") +
        '<div class="fbar__meta"><p class="count" id="fcount" aria-live="polite"></p><button type="button" class="linkbtn" id="fclear" hidden>Clear filters</button>' +
        (sorts.length > 1 ? '<label class="sort"><span>Sort</span><select id="fsort">' + sorts.map((s) => '<option value="' + s.value + '">' + esc(s.label) + "</option>").join("") + "</select></label>" : "") + "</div>" +
      "</div>";

    const qEl = $("#fq", root), qx = $("#fqx", root), cnt = $("#fcount", root), clr = $("#fclear", root), sortEl = $("#fsort", root);
    if (sortEl) sortEl.value = S.sort;

    function drawGroups() {
      (cfg.groups || []).forEach((g) => {
        const box = $('[data-group="' + g.key + '"] .chips', root);
        box.innerHTML = g.options.map((o) => '<button type="button" class="chip" data-gval="' + esc(o.value) + '" aria-pressed="' + (S.groups[g.key] === o.value) + '">' + esc(o.label) + "</button>").join("");
      });
      $$("#fvibes [data-tag]", root).forEach((b) => b.setAttribute("aria-pressed", String(S.tags.indexOf(b.dataset.tag) !== -1)));
    }
    function pushUrl() {
      try {
        const p = new URLSearchParams();
        if (S.q) p.set("q", S.q); if (S.tags.length) p.set("tag", S.tags.join(","));
        (cfg.groups || []).forEach((g) => { if (S.groups[g.key] !== "all") p.set(g.key, S.groups[g.key]); });
        if (S.sort !== "auto") p.set("sort", S.sort);
        history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p.toString() : ""));
      } catch (e) { /* file:// pages may refuse: that is fine */ }
    }
    function apply() {
      const q = S.q.trim().toLowerCase();
      let list = items.filter((it) => (!q || q.split(/\s+/).every((w) => it.search.indexOf(w) !== -1)) &&
        S.tags.every((t) => it.tags.indexOf(t) !== -1) && (cfg.groups || []).every((g) => S.groups[g.key] === "all" || g.get(it) === S.groups[g.key]));
      let cmp = null;
      if (S.sort === "auto") cmp = cfg.autoSort ? cfg.autoSort(state.mode) : null;
      else { const s = sorts.find((x) => x.value === S.sort); cmp = s && s.fn; }
      if (cmp) list = list.slice().sort(cmp);
      const active = !!(q || S.tags.length || (cfg.groups || []).some((g) => S.groups[g.key] !== "all"));
      clr.hidden = !active; qx.hidden = !S.q;
      cnt.textContent = list.length + " " + (list.length === 1 ? (cfg.nounOne || "result") : (cfg.noun || "results"));
      out.innerHTML = list.length ? list.map((it, i) => cfg.card(it, cfg.col, Math.min(i, 8) * 45)).join("") :
        '<div class="col-12"><div class="empty">' + ico("search") + "<div><strong>Nothing matches yet</strong><p>Try fewer filters, or a different word.</p></div>" + '<button type="button" class="btn btn-soft btn-sm-x" id="fclear2">Clear filters</button></div></div>';
      const c2 = $("#fclear2", out); if (c2) c2.addEventListener("click", reset);
      favs.paint(); observeReveals(); drawGroups(); pushUrl();
    }
    function reset() { S.q = ""; S.tags = []; Object.keys(S.groups).forEach((k) => { S.groups[k] = "all"; }); qEl.value = ""; apply(); }

    let timer = null;
    qEl.addEventListener("input", () => { S.q = qEl.value; clearTimeout(timer); timer = setTimeout(apply, 120); });
    qx.addEventListener("click", () => { S.q = ""; qEl.value = ""; apply(); qEl.focus(); });
    clr.addEventListener("click", reset);
    if (sortEl) sortEl.addEventListener("change", () => { S.sort = sortEl.value; apply(); });
    root.addEventListener("click", (e) => {
      const g = e.target.closest("[data-gval]");
      if (g) { S.groups[g.closest("[data-group]").dataset.group] = g.dataset.gval; apply(); return; }
      const t = e.target.closest("[data-tag]");
      if (t) { const i = S.tags.indexOf(t.dataset.tag); if (i === -1) S.tags.push(t.dataset.tag); else S.tags.splice(i, 1); apply(); }
    });
    state.onMode.push(() => { if (S.sort === "auto") apply(); });
    apply();
    return { apply, setTags(tags) { S.tags = tags.filter((t) => TAG_BY_ID[t]); apply(); }, state: S };
  }


  /* ======================================================================
     8b. IN-SITE FEEDBACK FORM
         Opens as a pop-up sheet, sends to the endpoint in SITE.feedback
         (Formspree / Web3Forms ...), and shows a thank-you inside the sheet.
         If no endpoint is set, the button opens the Google Form link instead.
     ====================================================================== */
  const fbReady = () => !!(SITE.feedback && SITE.feedback.endpoint);

  function feedbackContext(spec) {
    /* spec examples: "website", "driver:driver-sunil", "item:place:ella-rock", "guest" */
    const parts = String(spec || "website").split(":");
    if (parts[0] === "driver") { const d = DRIVERS.find((x) => x.id === parts[1]); return { about: "driver", label: d ? d.name : "", id: parts[1] || "" }; }
    if (parts[0] === "item") { const key = parts.slice(1).join(":"); const it = CATALOG.find((x) => x.key === key); return { about: it ? it.kind : "website", label: it ? it.name : "", id: it ? it.id : "" }; }
    if (parts[0] === "guest") return { about: "guest", label: state.property ? state.property.name : "", id: state.property ? state.property.id : "" };
    return { about: "website", label: "", id: "" };
  }
  const ABOUT_LABEL = { website: "This website", place: "A place or activity", quiet: "A quiet spot", food: "A café, kade or restaurant", stay: "A place to stay", driver: "A driver", guest: "My stay at the guesthouse" };

  function openFeedback(spec) {
    if (!fbReady()) { window.open(SITE.feedbackUrl, "_blank", "noopener"); return; }
    const c = feedbackContext(spec);
    const opts = Object.keys(ABOUT_LABEL).filter((k) => k !== "guest" || state.property);
    const html =
      '<form class="fform" id="fbForm" novalidate>' +
        '<p class="fine" style="margin-top:0">Takes one minute. Your feedback helps every traveller who comes after you.</p>' +
        '<div class="field"><label for="fbAbout">What is it about?</label><select id="fbAbout" name="about">' + opts.map((k) => '<option value="' + k + '"' + (k === c.about ? " selected" : "") + ">" + esc(ABOUT_LABEL[k]) + "</option>").join("") + "</select></div>" +
        '<div class="field"><label for="fbWhich">Which one? <small>(optional)</small></label><input id="fbWhich" name="which" type="text" maxlength="80" autocomplete="off" value="' + esc(c.label) + '" placeholder="e.g. a café, a driver, a place"></div>' +
        '<fieldset class="field" aria-describedby="fbRateErr"><legend>Your rating</legend><div class="rate-input" id="fbRate">' +
          [1, 2, 3, 4, 5].map((i) => '<input type="radio" name="rating" id="fbR' + i + '" value="' + i + '"><label for="fbR' + i + '" title="' + i + ' out of 5"><span class="visually-hidden">' + i + " out of 5</span>" + ico("star-fill") + "</label>").join("") +
        '</div><p class="field__err" id="fbRateErr" role="alert"></p></fieldset>' +
        '<div class="field"><label for="fbMsg">Your feedback</label><textarea id="fbMsg" name="message" rows="4" maxlength="1000" aria-describedby="fbMsgErr" placeholder="What was good? What should we fix? Wrong price or time?"></textarea><p class="field__err" id="fbMsgErr" role="alert"></p></div>' +
        '<div class="field"><label for="fbName">Your name <small>(optional)</small></label><input id="fbName" name="name" type="text" maxlength="60" autocomplete="given-name"></div>' +
        '<div class="field"><label for="fbContact">Email or WhatsApp <small>(optional, only if you want a reply)</small></label><input id="fbContact" name="contact" type="text" maxlength="80" autocomplete="off" aria-describedby="fbContactErr"><p class="field__err" id="fbContactErr" role="alert"></p></div>' +
        '<label class="check check--plain"><input type="checkbox" name="may_publish" value="yes"><span class="check__box">' + ico("check-lg") + '</span><span>You may show my comment on the website (without my contact details).</span></label>' +
        '<div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="company" tabindex="-1" autocomplete="off"></label></div>' +
        '<div id="fbStatus" aria-live="polite"></div>' +
        '<button type="submit" class="btn btn-cta w-100" id="fbSend">' + ico("pencil-square") + " Send feedback</button>" +
        '<p class="fine">Your message goes to the ' + esc(SITE.brand) + " team through our form service. Please do not include passwords or private details.</p>" +
      "</form>";
    const d = openSheet("Share your feedback", html, "sheet--form");
    state.fbCtx = c;
    wireFeedbackForm(d, c);
    trackEvent("feedback:open:" + c.about);
  }

  function wireFeedbackForm(d, c) {
    const form = $("#fbForm", d), status = $("#fbStatus", d), send = $("#fbSend", d);
    const paintStars = () => { const v = Number((form.rating.value) || 0); $$("#fbRate label", d).forEach((l, i) => l.classList.toggle("on", i < v)); };
    $$("#fbRate input", d).forEach((r) => r.addEventListener("change", () => { paintStars(); $("#fbRateErr", d).textContent = ""; }));

    function validate() {
      let first = null;
      const fail = (id, msg, field) => { $("#" + id, d).textContent = msg; if (!first) first = field; };
      ["fbRateErr", "fbMsgErr", "fbContactErr"].forEach((id) => { $("#" + id, d).textContent = ""; });
      if (!form.rating.value) fail("fbRateErr", "Please choose a rating from 1 to 5.", $("#fbR1", d));
      const msg = form.message.value.trim();
      if (msg.length < 10) fail("fbMsgErr", "Please write at least 10 characters.", form.message);
      const ct = form.contact.value.trim();
      if (ct && !/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(ct) && !/^\+?[\d\s-]{7,15}$/.test(ct)) fail("fbContactErr", "Enter a valid email or phone number, or leave it empty.", form.contact);
      form.message.setAttribute("aria-invalid", $("#fbMsgErr", d).textContent ? "true" : "false");
      if (first) first.focus();
      return !first;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.innerHTML = "";
      if (!validate()) return;
      if (form.company.value) { showThanks(d, c); return; }           // spam bot filled the hidden field: pretend success
      send.disabled = true; send.innerHTML = "Sending...";
      const fd = new FormData(form);
      fd.delete("company");
      fd.append("subject", SITE.brand + " feedback: " + (ABOUT_LABEL[form.about.value] || "website"));
      fd.append("page", location.pathname.split("/").pop() || "index.html");
      fd.append("property", state.property ? state.property.id : "");     // never the token or booking code
      fd.append("source", state.property ? "guest" : "public");
      Object.keys(SITE.feedback.extra || {}).forEach((k) => fd.append(k, SITE.feedback.extra[k]));
      const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 12000);
      try {
        const res = await fetch(SITE.feedback.endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" }, signal: ctl.signal });
        let body = null; try { body = await res.json(); } catch (x) { /* some services reply without JSON */ }
        if (!res.ok || (body && body.success === false) || (body && body.ok === false)) throw new Error("rejected");
        showThanks(d, c);
        trackEvent("feedback:sent:" + c.about);
      } catch (err) {
        send.disabled = false; send.innerHTML = ico("pencil-square") + " Try again";
        const wa = waLink(state.ctx.whatsapp, "Hello " + SITE.brand + ", my feedback: " + form.message.value.trim().slice(0, 300));
        status.innerHTML = '<div class="alert-x" role="alert">' + ico("exclamation-circle") + "<span>We could not send your feedback" + (err.name === "AbortError" ? " (it took too long)" : "") + ". Check your connection and try again, or send it on <a href=\"" + wa + '" target="_blank" rel="noopener">WhatsApp</a>.</span></div>';
      } finally { clearTimeout(timer); }
    });
  }

  function showThanks(d, c) {
    $("#sheetTitle", d).textContent = "Thank you!";
    $("#sheetBody", d).innerHTML =
      '<div class="thanks" role="status">' + ico("check-lg", "thanks__ico") + "<h3>Your feedback was sent</h3><p>Thank you for helping us keep " + esc(SITE.brand) + " accurate and useful. We read every message.</p>" +
      '<div class="sheet__actions" style="justify-content:center"><button type="button" class="btn btn-soft" data-close>Close</button><button type="button" class="btn btn-line" id="fbAgain">Send another</button></div></div>';
    const again = $("#fbAgain", d); if (again) again.addEventListener("click", () => openFeedback(c.about === "website" ? "website" : (c.id ? c.about + ":" + c.id : c.about)));
  }

  /* ======================================================================
     9. START-UP (shared by every page; pages.js calls EC.boot)
     ====================================================================== */
  function initGlobalClicks() {
    document.addEventListener("click", (e) => {
      const tracked = e.target.closest("[data-track]"); if (tracked) trackEvent(tracked.dataset.track);
      const fbLink = e.target.closest("[data-feedback], [data-link='feedback']");
      if (fbLink && fbReady()) { e.preventDefault(); openFeedback(fbLink.dataset.feedback || "website"); return; }
      const fav = e.target.closest("[data-fav]");
      if (fav) { const on = favs.toggle(fav.dataset.fav); toast(on ? "Saved to your list" : "Removed from your list"); if (fav.closest(".sheet--saved") && !on) openSaved(); return; }
      const favSheet = e.target.closest("[data-fav-sheet]");
      if (favSheet) { const on = favs.toggle(favSheet.dataset.favSheet); favSheet.innerHTML = ico("heart") + (on ? " Saved. Tap to remove" : " Save to my list"); toast(on ? "Saved to your list" : "Removed from your list"); return; }
      const open = e.target.closest("[data-open]"); if (open) { openItem(open.dataset.open); return; }
      const drv = e.target.closest("[data-open-driver]"); if (drv) { openDriver(drv.dataset.openDriver); return; }
      const place = e.target.closest("[data-open-place]"); if (place) { openPlaceId(place.dataset.openPlace); return; }
      const copy = e.target.closest("[data-copy]"); if (copy && state.property) { copyText(state.property[copy.dataset.copy], "Password copied"); return; }
      if (e.target.closest("[data-theme-btn]")) { theme.toggle(); return; }
      if (e.target.closest("#savedBtn")) { openSaved(); return; }
      if (e.target.closest("#toTop")) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      const mb = e.target.closest("[data-mode-btn]"); if (mb) applyMode(mb.dataset.modeBtn, true);
    });
  }

  /* called by pages.js once the page is ready */
  function boot(opts) {
    state.base = document.body.dataset.base || "";
    setupContext(opts && opts.property);
    if (!opts || opts.header !== "guest") renderPartials(document.body.dataset.active || "");
    else { renderGuestHeader(opts.title); renderFabs(); const dock = $("#siteDock"); if (dock) { /* guest pages carry their own dock markup via renderPartials-free path */ } }
    CATALOG = buildCatalog();
    theme.init(); initHeader(); initGlobalClicks(); initScrollUi(); wireLinks();
    applyMode(storeGet(MODE_KEY, "visitor"), false);
    favs.paint(); observeReveals();
    /* Which sticker or QR brought this visitor? e.g. index.html?src=station-sticker (see guide, section 9) */
    try { const src = new URLSearchParams(location.search).get("src"); if (src) trackEvent("qr:" + src.replace(/[^a-z0-9_-]/gi, "").slice(0, 40)); } catch (e) { /* ignore */ }
  }

  Object.assign(EC, { openFeedback, $, $$, esc, fmtLKR, priceRange, fmt12, fmtDate, todayStr, waLink, telLink, storeGet, storeSet, trackEvent, state, byDest,
    setupContext, wireLinks, theme, applyMode, toast, copyText, observeReveals, favs, openSheet, itemCard, driverCard, stars, tagChips, mountFilters,
    buildCatalog, catalog: () => CATALOG, TAG_BY_ID, boot, openSaved, KIND_LABEL });
})();
