/* STATUS: RED - DO NOT EDIT unless you know JavaScript. Settings live in js/data/config.js (SITE.analytics).
   analytics.js: loads ONE optional, privacy-friendly analytics script, only if you set SITE.analytics in config.js.
   It is not included on guest pages. If provider is "" nothing is loaded and nothing is sent. */
(function () {
  "use strict";
  var a = (typeof SITE !== "undefined" && SITE.analytics) || {};
  if (!a.provider || !a.src || !a.id) return;
  if (navigator.doNotTrack === "1") return;            // respect the browser's Do Not Track setting
  var s = document.createElement("script");
  s.defer = true; s.src = a.src;
  if (a.provider === "umami") s.setAttribute("data-website-id", a.id);
  if (a.provider === "plausible") s.setAttribute("data-domain", a.id);
  document.head.appendChild(s);
})();
