/* STATUS: RED - DO NOT EDIT unless you know JavaScript. This file is the engine of the site.
   One wrong character can break every page. Ask for help or copy the file first as a backup. */
/* ==========================================================================
   guest-auth.js  -  GUEST TOKEN VALIDATION
   --------------------------------------------------------------------------
   ** CONVENIENCE GATE, NOT REAL SECURITY. **
   This file decides whether a scanned QR link is allowed to see the
   private Guest Mode guide. It is plain JavaScript running in the
   visitor's own browser, so it cannot stop a technically determined
   person from reading the data anyway. That is an accepted, low-risk
   trade-off for this MVP because Guest Mode only shows convenience
   information (Wi-Fi, check-in time), nothing sensitive.

   TO UPGRADE LATER: replace the body of validateToken() with a fetch()
   call to a real API that checks the token against a real database.
   Every function below keeps the same name and return shape on purpose,
   so the rest of the site (dashboard.html, expired.html) never has to
   change when you make that swap.
   ========================================================================== */

const GuestAuth = (function () {

  const SESSION_KEY = "ellaGuestSession";

  /* Read "?token=XYZ" from the current page's URL. */
  function getTokenFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("token");
  }

  /* Today's date as "YYYY-MM-DD", so it compares cleanly against
     validFrom / validTo without worrying about time-of-day. */
  function todayStr() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  /* The core check. Returns one of:
     { ok: true,  property, booking, token }
     { ok: false, reason: "invalid" }   token not found
     { ok: false, reason: "expired" }   token found but outside its dates */
  function validateToken(rawToken) {
    const token = rawToken ? String(rawToken).trim().toUpperCase() : "";
    /* Note: a top-level "const" is NOT a property of window, so we test it with typeof. */
    if (!token || typeof GUEST_TOKENS === "undefined" || !GUEST_TOKENS[token]) {
      return { ok: false, reason: "invalid" };
    }
    const entry = GUEST_TOKENS[token];
    const today = todayStr();
    if (today < entry.validFrom || today > entry.validTo) {
      return { ok: false, reason: "expired" };
    }
    return { ok: true, property: entry.property, booking: entry.booking, token: token };
  }

  /* Save a valid session for this browser tab only (sessionStorage, not
     localStorage) so refreshing dashboard.html doesn't need the token
     back in the URL. Wrapped in try/catch: some browsers block storage
     in private mode, and the site should not crash if that happens. */
  function saveSession(result) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(result));
    } catch (e) {
      console.warn("Could not save guest session:", e);
    }
  }

  function readSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function clearSession() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
  }

  /* Used by dashboard.html: get a currently-valid guest session, checking
     the token's dates again (don't just trust what was saved earlier -
     a guest could keep a tab open past checkout). */
  function getActiveSession() {
    const session = readSession();
    if (!session || !session.token) return null;
    const recheck = validateToken(session.token);
    if (!recheck.ok) { clearSession(); return null; }
    return recheck;
  }

  return { getTokenFromUrl, validateToken, saveSession, getActiveSession, clearSession };
})();
