/* STATUS: GREEN - SAFE TO EDIT. This file is CONTENT. Change the text, numbers and links freely.
   Keep the commas, quotes and brackets exactly as they are. Run tools/data-check.html after every edit. */
/* ==========================================================================
   guest-tokens.js  -  DEMO GUEST ACCESS TOKENS
   --------------------------------------------------------------------------
   ** THIS IS NOT REAL SECURITY. **
   Anyone can view this file in the browser, so a determined person could
   read every token here. That is fine for now because Guest Mode only
   unlocks convenience information (Wi-Fi name, check-in time), never
   anything sensitive like payment details.
   When you are ready for real protection, replace the lookup inside
   js/guest-auth.js with a fetch() call to a real backend that checks
   tokens against a proper database. Nothing else has to change.

   Format: "TOKEN-CODE": { property, booking, validFrom, validTo }
   property  must match an id in PROPERTIES (config.js)
   validFrom / validTo are inclusive dates, "YYYY-MM-DD"
   ========================================================================== */
/* Helper for DEMO tokens only: today's date (plus or minus some days) as "YYYY-MM-DD"
   in the visitor's own time zone. Real tokens should use fixed dates. */
function demoDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

const GUEST_TOKENS = {
  "EMV-XYZ123": {
    property: "ella-mountain-view",
    booking: "XYZ123",
    validFrom: "2026-09-20",
    validTo: "2026-10-15"
  },
  /* DEMO ONLY: remove EMV-DEMO and EMV-LASTDAY before real guests use the site. */
  "EMV-DEMO": {
    property: "ella-mountain-view",
    booking: "DEMO",
    validFrom: "2020-01-01",
    validTo: "2030-01-01"
  },
  /* Valid until TODAY: use it to show owners the "Enjoyed your stay?" review banner */
  "EMV-LASTDAY": {
    property: "ella-mountain-view",
    booking: "LASTDAY",
    validFrom: demoDate(-3),
    validTo: demoDate(0)
  },
  "GVH-ABC777": {
    property: "green-valley-homestay",
    booking: "ABC777",
    validFrom: "2026-09-01",
    validTo: "2026-09-15" /* deliberately in the past, for testing the expired page */
  }
};
