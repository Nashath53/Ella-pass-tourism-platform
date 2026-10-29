# EllaPass: Your pass to Ella

A mobile-first guide to Ella, Sri Lanka. A free public guide for visitors, plus a private,
temporary Guest Mode for guests of partner guesthouses.
**Stack: HTML5, CSS3, Bootstrap 5 (CSS only), vanilla JavaScript.** No backend, no database, no build step.


## START HERE: the complete guide
Open **`docs/EllaPass-Complete-Guide.html`** (or the `.md` version). It explains, step by step: what you may and must not
change (green / amber / red files), how to add stays, cafés, drivers and photos, the in-site feedback form, publishing,
QR codes (static vs dynamic), guest tokens, registering a new guesthouse, the phase-by-phase plan and how to earn money.

## Helper tools
- `tools/data-check.html`: open it after every edit in `js/data/`. It lists errors and reminders, and has a **token maker**.
- `go/*.html`: the pages behind your QR codes, so a printed QR never has to change (guide, section 9).
- Settings you will use in `js/data/config.js`: `SITE.feedback.endpoint` (in-site feedback form) and `SITE.analytics`.

## Run it
Double-click `index.html`, or use VS Code "Live Server". Needs internet only for Bootstrap CSS and the two
Google fonts (see "Self-host" below). Icons are built in (no icon CDN).
Light and dark themes: use the sun/moon button in the header. It remembers your choice.

## What is where
```
index, explore, things-to-do, quiet-spots, food, stay, transport, safety, plan, contact .html
404.html                 uses absolute paths, so it works from any URL on a real host (not from a folder)
guest/  index (code entry) · dashboard (private guide) · expired (access ended)    all noindex
css/style.css            one stylesheet, colours are variables (light + dark)
js/icons.js              self-hosted icon sprite (Bootstrap Icons, MIT licence)
js/scenes.js             illustrated landscapes shown when there is no photo
js/partials.js           shared header, full-screen menu, footer, mobile action bar
js/app.js                shared logic: theme, saved list, pop-up sheets, cards, search + filters
js/pages.js              what each page does (hero sky, planner, transport, guest pages ...)
js/analytics.js          optional privacy-friendly analytics (off until you set SITE.analytics)
js/guest-auth.js         guest token check (convenience gate, see Security)
js/data/                 ALL CONTENT. Edit these, not the HTML.
  config.js              PUBLIC settings: brand, contact, emergency numbers, survival guide, properties
  tags.js                vibes / collections
  places.js quiet-spots.js food.js stays.js drivers.js transport.js trains.js itineraries.js
  guest-private.js       Wi-Fi, house rules, services (loaded ONLY by /guest pages)
  guest-tokens.js        guest access tokens (loaded ONLY by /guest pages)
  i18n.js                reserved for later translations. Not used yet.
images/icons, images/og  favicon set, app icons, social-share image (made for you)
images/hero places drivers cafes stays    PUT YOUR PHOTOS HERE (each folder has a README)
robots.txt sitemap.xml manifest.webmanifest
```

## Replace these placeholders before showing it to owners or publishing
1. `js/data/config.js`: SITE.whatsapp, SITE.phone, SITE.feedbackUrl (Google Form), SITE.url (your domain),
   each property's whatsapp, phone, mapsUrl, reviewUrl.
2. `robots.txt`, `sitemap.xml` and the `canonical` / `og:url` tags use `https://example.lk`. Replace it
   with your domain in all of them (search the project for `example.lk`).
3. Verify the emergency numbers (Police 119, Ambulance 1990, Fire & Rescue 110) before publishing.
4. `js/data/trains.js`: replace the SAMPLE times with the real timetable, then set `sample: false`.
5. Replace every fictional café, stay and driver with real ones **who agreed to be listed**.
6. `js/data/guest-private.js`: real Wi-Fi details per property. Remove demo tokens `EMV-DEMO`, `EMV-LASTDAY`
   from `guest-tokens.js`, and remove the "demo guest guide" link on `contact.html`.
7. Add your photos (below).

## Photos (I cannot supply real photos, so these are slots. Missing photos show illustrations.)
| Where | File (in `images/`) | Shape and size | Notes |
|---|---|---|---|
| Home hero (optional) | `hero/hero-ella.jpg` | landscape, at least 2400 px wide, under about 250 KB | Only add it if it is sharp and beautiful. A dark overlay keeps text readable. No photo = the living illustrated sky |
| Place / quiet spot | `places/<name>.jpg`, named in the `image` field | 16:10, about 1200x750, under about 120 KB | Add descriptive `imageAlt` text in the data |
| Café / stay | `cafes/...`, `places/...` (set the `image` field) | 16:10 | Get the owner's permission |
| Driver portrait | `drivers/<id>.jpg` (`photo` field) | square, about 600x600 | The driver must agree |
| Vehicle | `drivers/<id>-tuktuk.jpg` (`vehiclePhoto` field) | 16:9, about 1200x675 | |
Compress with a free tool such as Squoosh (WebP or JPEG, quality about 75). Never hotlink photos.

## Drivers: photos, bio and comments
Each driver in `drivers.js` has `photo`, `vehiclePhoto`, `bio`, `languages`, `years`, `ratings` and `reviews[]`.
**All current drivers and comments are fictional samples** (`sample: true`) and show a visible "Sample profile"
or "Sample comment" label. Only publish comments travellers actually gave you (collect them with the feedback
form) and only with permission. Then set `sample: false`.

## Search, filters and collections
Every item has `tags[]` (see `tags.js`). Explore filters everything by vibe, type, price and sort. The
address bar keeps the filters, so `explore.html?tag=quiet` is a shareable collection link.
To add a vibe: add it to `tags.js`, then put its id in the `tags` of the items that belong to it.

## Guest Mode: how the QR works
- **Permanent QR (printed stand):** `https://YOURDOMAIN/guest/index.html?p=ella-mountain-view`. Guests type the code the host sends on WhatsApp.
- **Per-guest link:** `https://YOURDOMAIN/guest/index.html?token=EMV-XYZ123`
- **New booking:** add a line in `guest-tokens.js`:
  `"EMV-ABC456": { property: "ella-mountain-view", booking: "ABC456", validFrom: "2026-11-01", validTo: "2026-11-04" }`
  Use long, hard-to-guess codes for real bookings. Codes are not case sensitive.
- After `validTo` the private guide shows "Access ended". The public guide stays open.
- On the last valid day guests see a "Leave a Google review" banner (needs `reviewUrl`).

## Security (read this)
Guest Mode is a **convenience gate, not real security**. The guest data files are readable by anyone who opens
the guest pages. That is acceptable for Wi-Fi names and check-in times, never for anything sensitive. Public pages
do not load the guest data files. Real protection needs a backend (planned for a later stage); replace
`validateToken()` in `js/guest-auth.js`.

## Tracking
Every WhatsApp, call, directions, hire and CTA button has `data-track`. Events are logged to the console now.
Add a cookieless analytics tool later and forward events in `trackEvent()` (`js/app.js`). It measures taps
(intent). Real bookings happen inside WhatsApp, which the site cannot see. Never send tokens or phone numbers.

## Self-host (recommended before launch)
The page loads Bootstrap CSS and two Google fonts from CDNs. For privacy and offline use, download them, put them
in `vendor/` and `fonts/`, and change the links in the HTML `<head>` (the page still works without the fonts: it
falls back to Georgia and the system font).

## Deploy (free)
Netlify (drag the folder in), Cloudflare Pages, or GitHub Pages. For `404.html` and absolute paths, serve the site
from the domain root. Buy your domain when the first owner pays.
