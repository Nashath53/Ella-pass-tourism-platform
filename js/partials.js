/* STATUS: RED - DO NOT EDIT unless you know JavaScript. This file is the engine of the site.
   One wrong character can break every page. Ask for help or copy the file first as a backup. */
/* ==========================================================================
   partials.js  -  SHARED HEADER, MENU, FOOTER, BOTTOM BAR
   --------------------------------------------------------------------------
   A static site has no server to share one header file, so every page has
   empty mount points (#siteHeader, #siteFooter, #siteDock) and app.js calls
   renderPartials() once. Edit the strings below to change the header or
   footer for the WHOLE site.  Pages inside /guest use data-base="../".
   ========================================================================== */

/* Local esc helper — app.js also defines this globally, but partials.js
   loads first and needs its own safe version for innerHTML strings. */
function esc(v) {
  var str = String(v == null ? "" : v).replace(/\{\{OWNER:[^}]*\}\}/g, "");
  return str.replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

/* [href, label, icon]. "primary" links appear in the desktop bar. */
const NAV = [
  { id: "home",      href: "index.html",        label: "Home",          icon: "compass" },
  { id: "things",    href: "things-to-do.html", label: "Things to Do",  icon: "binoculars",    primary: true },
  { id: "history",   href: "history.html",       label: "History",       icon: "book",          primary: true },
  { id: "food",      href: "food.html",          label: "Food & Cafés",  icon: "cup-hot",       primary: true },
  { id: "stay",      href: "stay.html",          label: "Stay",          icon: "house-heart",   primary: true },
  { id: "transport", href: "transport.html",     label: "Transport",     icon: "scooter",       primary: true },
  { id: "safety",    href: "safety.html",        label: "Safety",        icon: "shield-check",  primary: true },
  { id: "plan",      href: "plan.html",          label: "Plan My Day",   icon: "stars" },
  { id: "book",      href: "book.html",          label: "Book",          icon: "calendar-check" },
  { id: "contact",   href: "contact.html",       label: "Contact",       icon: "chat-heart" },
  { id: "about",     href: "about.html",         label: "About",         icon: "info-circle" }
];

const BRAND_MARK = '<svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M2 26 L12 8 L18 18 L22 12 L30 26Z" fill="currentColor"/><circle cx="24" cy="8" r="3.2" fill="var(--gold)"/></svg>';

function partialsBase() { return document.body.dataset.base || ""; }

/* The sun/moon button. Both icons are in the page; CSS shows the right one. */
function themeButton() {
  return '<button type="button" class="icon-btn" data-theme-btn aria-label="Switch to dark theme">' +
         '<span class="theme-ico theme-ico--sun">' + EC.ico("sun") + '</span><span class="theme-ico theme-ico--moon">' + EC.ico("moon-stars") + "</span></button>";
}

/* Visitor / Sri Lankan switch */
function modeSwitch(extraClass) {
  /* Read saved mode from localStorage so this works before app.js initialises state */
  let m = "visitor";
  try { m = localStorage.getItem("ellaMode") || "visitor"; } catch (e) { /* storage blocked */ }
  return '<div class="seg ' + (extraClass || "") + '" role="group" aria-label="Choose your view">' +
         '<button type="button" data-mode-btn="visitor" aria-pressed="' + (m === "visitor" ? "true" : "false") + '">Visitor</button>' +
         '<button type="button" data-mode-btn="local" aria-pressed="' + (m === "local" ? "true" : "false") + '">Local</button></div>';
}

function renderPartials(activeId) {
  const base = partialsBase();
  const header = document.getElementById("siteHeader");
  if (header) {
    const dlinks = NAV.filter((n) => n.primary).map((n) =>
      '<a class="dnav__link' + (n.id === activeId ? " is-active" : "") + '" href="' + base + n.href + '"' + (n.id === activeId ? ' aria-current="page"' : "") + ">" + n.label + "</a>"
    ).join("");
    header.innerHTML =
      '<div class="hdr">' +
        '<a class="brand" href="' + base + 'index.html">' + BRAND_MARK + "<span>" + esc(SITE.brand) + "</span></a>" +
        '<nav class="dnav only-desk" aria-label="Main">' + dlinks + "</nav>" +
        '<div class="hdr__actions">' +
          modeSwitch("") + themeButton() +
          '<a class="btn btn-cta btn-sm-x only-desk" href="' + base + 'plan.html" data-track="header:plan">' + EC.ico("stars") + " Plan my day</a>" +
          '<button type="button" class="icon-btn only-mob" id="menuBtn" aria-expanded="false" aria-controls="menuPanel" aria-label="Open menu">' + EC.ico("list") + "</button>" +
        "</div>" +
      "</div>" +
      '<div class="hdr__bar" id="rail" aria-hidden="true"><i></i></div>';

    /* full-screen menu for phones, tablets and small laptops */
    const panel = document.createElement("div");
    panel.className = "menu"; panel.id = "menuPanel"; panel.hidden = true;
    panel.setAttribute("role", "dialog"); panel.setAttribute("aria-modal", "true"); panel.setAttribute("aria-label", "Menu");
    panel.innerHTML =
      '<div class="menu__top"><span class="brand">' + BRAND_MARK + "<span>" + SITE.brand + "</span></span>" +
        '<button type="button" class="icon-btn" id="menuClose" aria-label="Close menu">' + EC.ico("x-lg") + "</button></div>" +
      '<nav class="menu__links" aria-label="Menu">' + NAV.map((n) =>
        '<a class="menu__link' + (n.id === activeId ? " is-active" : "") + '" href="' + base + n.href + '"' + (n.id === activeId ? ' aria-current="page"' : "") + ">" +
        EC.ico(n.icon) + "<span>" + n.label + "</span>" + EC.ico("arrow-right", "menu__go") + "</a>").join("") +
        '<a class="menu__link" href="' + base + 'guest/index.html?p=' + SITE.defaultProperty + '">' + EC.ico("key") + "<span>Guest guide (access code)</span>" + EC.ico("arrow-right", "menu__go") + "</a></nav>" +
      '<div class="menu__bottom"><p class="menu__label">I am a</p>' + modeSwitch("seg--lg") + "</div>";
    document.body.appendChild(panel);
  }

  const footer = document.getElementById("siteFooter");
  if (footer) {
    const L = (href, text) => '<li><a href="' + base + href + '">' + text + "</a></li>";
    footer.innerHTML =
      '<div class="container-xl">' +
        '<div class="footer__grid">' +
          '<div class="footer__about"><a class="brand brand--light" href="' + base + 'index.html">' + BRAND_MARK + "<span>" + esc(SITE.brand) + "</span></a>" +
            "<p>" + SITE.tagline + ". A local guide to Ella, Sri Lanka, for visitors and for guests of partner guesthouses.</p>" +
            '<div class="footer__cta"><a class="btn btn-cta btn-sm-x" href="' + base + 'plan.html">' + EC.ico("stars") + " Plan my day</a>" +
            '<a class="btn btn-ghost btn-sm-x" data-link="whatsapp" href="#" target="_blank" rel="noopener">' + EC.ico("whatsapp") + " WhatsApp</a></div></div>" +
          '<nav class="footer__col" aria-label="Explore"><h2 class="footer__h">Explore</h2><ul>' + L("things-to-do.html", "Things to do") + L("history.html", "History &amp; culture") + L("plan.html", "Plan my day") + L("book.html", "Book a driver or room") + "</ul></nav>" +
          '<nav class="footer__col" aria-label="Practical"><h2 class="footer__h">Practical</h2><ul>' + L("food.html", "Food &amp; cafés") + L("halal-food-ella.html", "Halal food") + L("stay.html", "Stay") + L("transport.html", "Transport") + L("safety.html", "Safety") + "</ul></nav>" +
          '<nav class="footer__col" aria-label="Get in touch"><h2 class="footer__h">Get in touch</h2><ul>' + L("contact.html", "Contact and feedback") + L("about.html", "About EllaPass") + L("privacy.html", "Privacy") + L("contact.html#list-your-business", "List your business") + "</ul></nav>" +
        "</div>" +
        '<div class="footer__bar"><span>&copy; ' + new Date().getFullYear() + " " + SITE.brand + "</span><span>Prices, times and ratings are guides. Confirm locally.</span></div>" +
      "</div>";
  }

  const dock = document.getElementById("siteDock");
  if (dock) {
    const curPage = document.body.dataset.page || "";
    const dA = (href, icon, label, extra) =>
      "<a href=\"" + base + href + "\"" + (extra || "") + (curPage === href.replace(".html","") ? " aria-current=\"page\"" : "") + ">" +
      EC.ico(icon) + "<span>" + label + "</span></a>";
    dock.innerHTML =
      dA("index.html", "house-heart", "Home") +
      dA("things-to-do.html", "compass", "To do") +
      "<a href=\"" + base + "book.html\" class=\"dock__book\">" + EC.ico("calendar-check") + "<span>Book</span></a>" +
      "<a href=\"#\" id=\"savedDockBtn\" data-track=\"dock:saved\">" + EC.ico("bookmark-heart") + "<span>Saved</span><span class=\"dock__badge\" id=\"savedDockCount\" hidden></span></a>" +
      dA("#", "whatsapp", "WhatsApp", ' data-link="whatsapp" data-track="dock:whatsapp" target="_blank" rel="noopener"');
  }
  renderFabs();
}

/* Simple header for Guest Mode pages */
function renderGuestHeader(title) {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const base = partialsBase();
  header.innerHTML =
    '<div class="hdr hdr--guest"><span class="brand">' + EC.ico("house-heart") + '<span id="guestTitle"></span></span>' +
    '<div class="hdr__actions">' + themeButton() +
    '<a class="btn btn-line btn-sm-x" href="' + base + 'index.html">' + EC.ico("compass") + " Explore Ella</a></div></div>";
  document.getElementById("guestTitle").textContent = title || "Guest Guide";
}

/* Floating buttons: Saved list (only when something is saved) and Back to top */
function renderFabs() {
  if (document.getElementById("fabs")) return;
  const box = document.createElement("div");
  box.className = "fabs"; box.id = "fabs";
  box.innerHTML =
    '<button type="button" class="fab fab--saved" id="savedBtn" hidden aria-label="Open my saved list">' + EC.ico("heart-fill") + '<span id="savedCount">0</span></button>' +
    '<button type="button" class="fab" id="toTop" hidden aria-label="Back to top">' + EC.ico("arrow-up") + "</button>";
  document.body.appendChild(box);
}

/* Header behaviour: open/close the full-screen menu */
function initHeader() {
  const btn = document.getElementById("menuBtn");
  const panel = document.getElementById("menuPanel");
  if (!btn || !panel) return;
  function open() {
    panel.hidden = false; document.body.classList.add("menu-open"); btn.setAttribute("aria-expanded", "true");
    const first = panel.querySelector(".menu__link"); if (first) first.focus();
  }
  function close() {
    panel.hidden = true; document.body.classList.remove("menu-open"); btn.setAttribute("aria-expanded", "false"); btn.focus();
  }
  btn.addEventListener("click", open);
  document.getElementById("menuClose").addEventListener("click", close);
  panel.addEventListener("click", (e) => { if (e.target.closest(".menu__link")) { panel.hidden = true; document.body.classList.remove("menu-open"); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) close(); });
  /* if the window grows to desktop size while the menu is open, close it */
  window.matchMedia("(min-width: 1100px)").addEventListener("change", (m) => { if (m.matches && !panel.hidden) { panel.hidden = true; document.body.classList.remove("menu-open"); } });
}
