/* STATUS: GREEN - SAFE TO EDIT. */
/* ==========================================================================
   trips.js — MULTI-DAY ITINERARIES (kind:"itinerary") AND
               SRI LANKA ROUTES THROUGH ELLA (kind:"route")
   RULE R1: This file does NOT replace itineraries.js — both are used.
   RULE R2: Only items inside 40 km of Ella get a booking button.
   RULE R7: Routes are "route ideas". Use "route", not "tour" or "package".
   status CHECK items show a checkNote. Do not hide them — show them honestly.
   ========================================================================== */
const TRIPS = [

/* ══════════════════════════════════════════════════════════
   ITINERARIES — 1 to 3 days inside the Ella area
   ══════════════════════════════════════════════════════════ */

{
  id: "IT-01", kind: "itinerary", destination: "ella",
  title: "Ella in 2 Days: The Classics",
  days: 2, audience: ["first-time","couple","solo"],
  modes: ["visitor","local"], budget: "medium", pace: "moderate",
  transport: ["walk","tuk-tuk"], halalFriendly: false, guide: "optional",
  bookable: true, inArea: true,
  summary: "The two days every first-time visitor remembers: sunrise over the peak, the Nine Arch Bridge with a real train, a tea factory, Ravana Falls and Ella Rock.",
  status: "verified", sources: ["S1","S2","S57","S58"], verifiedOn: "2026-10-16",
  checks: ["Confirm Ella Rock summit fee (reported LKR 930–1,000 for foreigners)", "Tea factory price (LKR 3,000): confirm before booking"],
  dayPlans: [
    {
      day: 1, title: "Sunrise, Nine Arch Bridge and tea", inArea: true,
      steps: [
        { at: "05:45", title: "Little Adam's Peak for sunrise", place: "little-adams-peak", icon: "sunrise", note: "Walk or tuk-tuk to the path start.", status: "verified", sources: ["S2"] },
        { at: "08:00", title: "Breakfast in town", icon: "cup-hot", status: "verified" },
        { at: "09:00", title: "Walk the forest path to Nine Arch Bridge", place: "nine-arch-bridge", icon: "person-walking", note: "About 1.5 km, 20–30 min. Watch train 1016 at 09:37 (Wednesday: 08:19).", status: "verified", sources: ["S1"] },
        { at: "10:15", title: "Coffee at a terrace café above the bridge", icon: "cup-hot", status: "verified", sources: ["S1"] },
        { at: "12:30", title: "Lunch in town", icon: "egg-fried", status: "verified" },
        { at: "14:00", title: "Uva Halpewatte Tea Factory tour (LKR 3,000)", place: "tea-factory-tour", icon: "cup-hot", note: "Closes about 16:30.", status: "check", checkNote: "Confirm factory is open and price before visiting." },
        { at: "16:00", title: "Ravana Falls", place: "ravana-falls", icon: "droplet", status: "verified", sources: ["S2"] }
      ]
    },
    {
      day: 2, title: "Ella Rock and Demodara", inArea: true,
      steps: [
        { at: "06:00", title: "Ella Rock hike via Kital Ella", place: "ella-rock", icon: "person-walking", note: "2–3 h to the summit. Summit fee for foreigners has been reported — confirm locally.", status: "check", checkNote: "Summit fee reported LKR 930–1,000 for foreigners. Confirm before going.", sources: ["S2","S57","S58"] },
        { at: "11:30", title: "Lunch and rest in town", icon: "egg-fried", status: "verified" },
        { at: "14:30", title: "Dowa Rock Temple, then Demodara Loop", place: "demodara-loop", icon: "train-front", note: "Tuk-tuk to both stops.", status: "verified", sources: ["S2","S38"] },
        { at: "17:30", title: "Sunset facing the Ella Gap", icon: "sunset", status: "verified", sources: ["S2"] }
      ]
    }
  ]
},

{
  id: "IT-02", kind: "itinerary", destination: "ella",
  title: "Ella and Haputale in 3 Days",
  days: 3, audience: ["first-time","couple"],
  modes: ["visitor"], budget: "medium", pace: "moderate",
  transport: ["walk","tuk-tuk"], halalFriendly: false, guide: "optional",
  bookable: true, inArea: true,
  summary: "IT-01 plus a dawn tuk-tuk to Lipton's Seat and Adisham Bungalow. Day 3 must fall on a Saturday, Sunday, poya or public holiday for Adisham.",
  status: "check", sources: ["S1","S2","S52","S55","S56"], verifiedOn: "2026-10-16",
  checks: ["Adisham open Saturday, Sunday, poya and holidays only — plan Day 3 date carefully", "Lipton's Seat: mist closes the view by mid-morning, leave Ella by 5:00 AM"],
  dayPlans: [
    { day: 1, title: "Same as IT-01 Day 1", inArea: true, steps: [{ at: "05:45", title: "See IT-01 Day 1", icon: "sunrise", status: "verified" }] },
    { day: 2, title: "Same as IT-01 Day 2", inArea: true, steps: [{ at: "06:00", title: "See IT-01 Day 2", icon: "person-walking", status: "check" }] },
    {
      day: 3, title: "Tea country at dawn", inArea: true,
      steps: [
        { at: "05:00", title: "Leave Ella by tuk-tuk for Lipton's Seat (about 1.5 h)", place: "liptons-seat", icon: "scooter", status: "verified", sources: ["S52"] },
        { at: "06:30", title: "Lipton's Seat: LKR 500 + LKR 200 per tuk-tuk, cash", icon: "sunrise", note: "Mist closes the view by mid-morning.", status: "verified", sources: ["S2","S53"] },
        { at: "08:30", title: "Walk part of the way down through the estate", icon: "person-walking", note: "Full descent about 4 hours.", status: "verified", sources: ["S64"] },
        { at: "10:30", title: "Adisham Bungalow (about LKR 500 foreign, LKR 150–250 local)", icon: "book", note: "Open about 09:00–16:30 on Saturday, Sunday, poya and public holidays only.", status: "check", checkNote: "Adisham: open weekends and holidays only. Verify the current opening days.", sources: ["S55","S56"] },
        { at: "12:30", title: "Lunch in Haputale", icon: "egg-fried", status: "verified" },
        { at: "15:00", title: "Back to Ella by tuk-tuk or afternoon train 1015 (not Wednesday)", icon: "train-front", note: "Train arrives Ella about 16:57.", status: "verified", sources: ["S1"] }
      ]
    }
  ]
},

{
  id: "IT-03", kind: "itinerary", destination: "ella",
  title: "Backpacker Ella on a Budget",
  days: 2, audience: ["backpacker"],
  modes: ["visitor","local"], budget: "low", pace: "moderate",
  transport: ["walk","bus"], halalFriendly: false, guide: "none",
  bookable: false, inArea: true,
  summary: "Free hikes, buses and a cheap train ride. No guide needed. Uses kades for every meal.",
  status: "check", sources: ["S1","S2","S12","S57","S59"], verifiedOn: "2026-10-16",
  checks: ["Bus stop for Ravana Falls: ask a local driver which stop to use", "Ella Rock summit fee for foreigners: check locally"],
  dayPlans: [
    {
      day: 1, title: "Peak, bridge and falls on a budget", inArea: true,
      steps: [
        { at: "05:45", title: "Walk to Little Adam's Peak for sunrise (free)", place: "little-adams-peak", icon: "sunrise", status: "verified", sources: ["S2"] },
        { at: "09:00", title: "Forest path to Nine Arch Bridge for train at 09:37", place: "nine-arch-bridge", icon: "train-front", note: "Wednesday: 08:19.", status: "verified", sources: ["S1"] },
        { at: "11:30", title: "Kade lunch: rice and curry or kottu", icon: "egg-fried", status: "verified" },
        { at: "13:30", title: "Local bus toward Wellawaya to Ravana Falls", place: "ravana-falls", icon: "bus-front", note: "Minimum fare LKR 34. Ask the driver to call the stop.", status: "check", checkNote: "Confirm the bus stop for Ravana Falls with a local before you go.", sources: ["S12"] }
      ]
    },
    {
      day: 2, title: "Ella Rock, train loop and back", inArea: true,
      steps: [
        { at: "06:00", title: "Ella Rock via Kital Ella Falls (start early, carry water)", place: "ella-rock", icon: "person-walking", note: "Summit fee may apply for foreigners.", status: "check", checkNote: "Summit fee reported. Confirm before going.", sources: ["S57","S59"] },
        { at: "11:27", title: "Ride train 1005 from Ella to Demodara (feel the loop)", place: "demodara-loop", icon: "train-front", status: "verified", sources: ["S1"] },
        { at: "13:00", title: "Bus or shared tuk-tuk back to Ella", icon: "scooter", status: "verified" },
        { at: "15:37", title: "Optional: watch train 1006 cross Nine Arch on the way back", place: "nine-arch-bridge", icon: "camera", status: "verified", sources: ["S1"] }
      ]
    }
  ]
},

{
  id: "IT-08", kind: "itinerary", destination: "ella",
  title: "Halal-Friendly Ella",
  days: 2, audience: ["muslim","family","couple"],
  modes: ["visitor","local"], budget: "medium", pace: "moderate",
  transport: ["walk","tuk-tuk"], halalFriendly: true, guide: "optional",
  bookable: true, inArea: true,
  summary: "IT-01 route with every meal at a verified halal place and no bar venues. Ravana Pool Club (bar on site) is excluded. Meal venues are UNVERIFIED until the owner confirms — this plan goes live only after at least two halal places are verified (rule R4).",
  status: "unverified", sources: ["S23","S24"], verifiedOn: null,
  checks: ["All halal meal venues are unverified. DO NOT publish this itinerary until at least 2 halal places are verified by the owner.", "Friday: arrange around Jumu'ah — check nearest mosque and time with {{OWNER}}."],
  dayPlans: [
    {
      day: 1, title: "Sunrise, bridge and tea — halal meals only", inArea: true,
      steps: [
        { at: "05:45", title: "Little Adam's Peak for sunrise", place: "little-adams-peak", icon: "sunrise", status: "verified", sources: ["S2"] },
        { at: "08:00", title: "Halal breakfast (e.g. Ella Heritage Restaurant)", icon: "cup-hot", note: "Confirm halal status with the owner before visiting.", status: "unverified", sources: ["S23"] },
        { at: "09:00", title: "Nine Arch Bridge for train at 09:37", place: "nine-arch-bridge", icon: "train-front", status: "verified", sources: ["S1"] },
        { at: "12:30", title: "Halal lunch (e.g. Raha Ella)", icon: "egg-fried", note: "Confirm halal status before visiting.", status: "unverified", sources: ["S24"] },
        { at: "14:00", title: "Tea Factory tour", place: "tea-factory-tour", icon: "cup-hot", status: "check" },
        { at: "16:00", title: "Ravana Falls", place: "ravana-falls", icon: "droplet", status: "verified" }
      ]
    },
    {
      day: 2, title: "Ella Rock and Demodara — halal meals only", inArea: true,
      steps: [
        { at: "06:00", title: "Ella Rock hike", place: "ella-rock", icon: "person-walking", status: "check" },
        { at: "11:30", title: "Halal lunch", icon: "egg-fried", note: "Use a verified halal place from the halal page.", status: "unverified" },
        { at: "14:30", title: "Dowa Rock Temple and Demodara Loop", place: "demodara-loop", icon: "train-front", status: "verified" },
        { at: "17:30", title: "Dinner at a verified halal restaurant", icon: "egg-fried", status: "unverified" }
      ]
    }
  ]
},

{
  id: "IT-11", kind: "itinerary", destination: "ella",
  title: "Culture and History Day",
  days: 1, audience: ["history","local","family"],
  modes: ["visitor","local"], budget: "low", pace: "easy",
  transport: ["tuk-tuk"], halalFriendly: false, guide: "optional",
  bookable: true, inArea: true,
  summary: "Ancient temples in Badulla, a colonial railway marvel and the Nine Arch Bridge in one day.",
  status: "verified", sources: ["S1","S2","S34","S37","S38","S51"], verifiedOn: "2026-10-16",
  checks: [],
  dayPlans: [
    {
      day: 1, title: "Temples, falls and the bridge", inArea: true,
      steps: [
        { at: "07:00", title: "Muthiyangana Raja Maha Vihara, Badulla (free; best 7–9 AM)", icon: "book", note: "Dress modestly and remove shoes.", status: "verified", sources: ["S37"] },
        { at: "09:30", title: "Dunhinda Falls (optional — about 1.5 km walk each way)", icon: "droplet", status: "verified", sources: ["S51"] },
        { at: "12:00", title: "Dowa Rock Temple", place: "dowa-temple", icon: "book", status: "verified", sources: ["S38"] },
        { at: "13:30", title: "Lunch", icon: "egg-fried", status: "verified" },
        { at: "15:00", title: "Demodara Loop: the gradient and the loop story", place: "demodara-loop", icon: "train-front", status: "verified", sources: ["S34"] },
        { at: "16:45", title: "Nine Arch Bridge history and train 1015 at 16:57 (not Wednesday)", place: "nine-arch-bridge", icon: "camera", status: "verified", sources: ["S1"] }
      ]
    }
  ]
},

{
  id: "IT-12", kind: "itinerary", destination: "ella",
  title: "Rainy-Day and Slow Ella",
  days: 1, audience: ["first-time","couple","family"],
  modes: ["visitor","local"], budget: "medium", pace: "easy",
  transport: ["tuk-tuk"], halalFriendly: false, guide: "none",
  bookable: true, inArea: true,
  summary: "Indoor and covered stops for a rainy or slow day. Avoid Ella Rock, Diyaluma and Nil Diya in heavy rain.",
  status: "check", sources: ["S2","S14","S38"], verifiedOn: "2026-10-16",
  checks: ["Tea factory price: confirm before visiting"],
  dayPlans: [
    {
      day: 1, title: "Tea, spices and a cooking class", inArea: true,
      steps: [
        { at: "09:00", title: "Uva Halpewatte Tea Factory", place: "tea-factory-tour", icon: "cup-hot", status: "check", checkNote: "Confirm open and price before visiting." },
        { at: "11:00", title: "Ella Spice Garden (about 45 min)", place: "ella-spice-garden", icon: "flower1", status: "verified", sources: ["S2"] },
        { at: "12:30", title: "Long lunch at a kade", icon: "egg-fried", status: "verified" },
        { at: "14:30", title: "Dowa Rock Temple (covered cave shrine)", place: "dowa-temple", icon: "book", status: "verified", sources: ["S38"] },
        { at: "16:00", title: "Home cooking class (about 2 h)", place: "cooking-class", icon: "egg-fried", status: "verified", sources: ["S14"] }
      ]
    }
  ]
},

{
  id: "IT-13", kind: "itinerary", destination: "ella",
  title: "Train Lovers' Day",
  days: 1, audience: ["photography","first-time","couple"],
  modes: ["visitor","local"], budget: "low", pace: "easy",
  transport: ["walk","train"], halalFriendly: false, guide: "none",
  bookable: false, inArea: true,
  summary: "See, ride and photograph the hill-country line in one day.",
  status: "check", sources: ["S1","S34"], verifiedOn: "2026-10-16",
  checks: ["Demodara departure time for train 1006: confirm at the station"],
  dayPlans: [
    {
      day: 1, title: "Bridge, loop and golden hour", inArea: true,
      steps: [
        { at: "09:15", title: "Nine Arch Bridge for train 1016 at 09:37 (Wednesday: 08:19)", place: "nine-arch-bridge", icon: "camera", status: "verified", sources: ["S1"] },
        { at: "11:27", title: "Ride train 1005 from Ella to Demodara through the loop", place: "demodara-loop", icon: "train-front", status: "verified", sources: ["S1"] },
        { at: "12:00", title: "Demodara station and loop viewpoints", icon: "binoculars", status: "verified", sources: ["S34"] },
        { at: "15:30", title: "Ride train 1006 back toward Ella", icon: "train-front", note: "Confirm departure time at Demodara station.", status: "check", checkNote: "Confirm departure time at Demodara station on the day." },
        { at: "16:57", title: "Photograph train 1015 at Nine Arch (not Wednesday)", place: "nine-arch-bridge", icon: "camera", status: "verified", sources: ["S1"] }
      ]
    }
  ]
},

/* ══════════════════════════════════════════════════════════
   ROUTES — Sri Lanka journeys that pass through Ella
   RULE R7: These are route IDEAS only. No "tour price" shown.
   Booking buttons ONLY on inArea:true days and transfer cards.
   ══════════════════════════════════════════════════════════ */

{
  id: "R-01", kind: "route", destination: "ella",
  title: "5-Day Hill Country and Wildlife",
  days: 5, audience: ["first-time","couple","family"],
  modes: ["visitor"], budget: "medium", pace: "moderate",
  starts: "Colombo Airport", ends: "Colombo Airport",
  season: "Year-round; best November–April",
  bookable: false, inArea: false,
  summary: "Kandy, Nuwara Eliya, the scenic train to Ella, a dawn trip to Lipton's Seat and a wildlife safari at Udawalawe.",
  status: "check", sources: ["S1","S2","S10","S52"], verifiedOn: "2026-10-16",
  checks: ["Kandy to Nanu Oya by road — Kandy–Ella train is closed", "Lipton's Seat and Udawalawe on Day 4 is a long day — the original itinerary had too many stops", "Confirm Udawalawe safari availability in your season"],
  dayPlans: [
    { day: 1, title: "Arrival to Kandy", inArea: false, outsideNote: "Outside EllaPass area: arrange with an SLTDA-licensed operator.", steps: [{ at: "All day", title: "Airport to Kandy; Temple of the Tooth, Kandy Lake, market. Overnight Kandy.", icon: "compass", status: "unverified" }] },
    { day: 2, title: "Kandy to Nuwara Eliya", inArea: false, outsideNote: "Outside EllaPass area: arrange with an SLTDA-licensed operator.", steps: [{ at: "All day", title: "Ramboda Falls and tea factory; explore Gregory Lake and Nuwara Eliya town. Overnight Nuwara Eliya.", icon: "cup-hot", status: "unverified" }] },
    { day: 3, title: "Scenic train to Ella", inArea: true, steps: [
      { at: "09:00", title: "Train 1005 departs Nanu Oya, arrives Ella 11:27", place: "nine-arch-bridge", icon: "train-front", note: "Book seats at seatreservation.railway.gov.lk.", status: "verified", sources: ["S1","S10"] },
      { at: "15:37", title: "Nine Arch Bridge for train 1006", place: "nine-arch-bridge", icon: "camera", status: "verified", sources: ["S1"] },
      { at: "Overnight", title: "Overnight in Ella", icon: "house-heart", status: "verified" }
    ]},
    { day: 4, title: "Lipton's Seat at dawn, then Udawalawe safari", inArea: false, outsideNote: "Udawalawe is outside the EllaPass 40 km area. Arrange the safari with an SLTDA-licensed operator.", steps: [
      { at: "05:00", title: "Tuk-tuk to Lipton's Seat for dawn (book night before)", place: "liptons-seat", icon: "sunrise", note: "inArea: true for the Lipton's Seat portion.", status: "verified", sources: ["S52"] },
      { at: "12:00", title: "Drive to Udawalawe National Park; afternoon safari", icon: "compass", note: "Outside EllaPass area.", status: "unverified" }
    ]},
    { day: 5, title: "Return to Colombo", inArea: false, outsideNote: "Outside EllaPass area.", steps: [{ at: "All day", title: "Drive to Colombo Airport with optional market stops.", icon: "compass", status: "unverified" }] }
  ]
},

{
  id: "R-02", kind: "route", destination: "ella",
  title: "7-Day Ceylon Highlights",
  days: 7, audience: ["first-time","couple"],
  modes: ["visitor"], budget: "medium", pace: "moderate",
  starts: "Colombo Airport", ends: "Next destination or airport",
  season: "Year-round",
  bookable: false, inArea: false,
  summary: "Sigiriya, Kandy, Nuwara Eliya, the scenic train to Ella, then the south coast and Galle.",
  status: "check", sources: ["S1","S2","S10"], verifiedOn: "2026-10-16",
  checks: ["Kandy–Ella train is closed; use Nanu Oya as the train start", "Day 6 transfer from Ella to the coast is a long drive — depart early"],
  dayPlans: [
    { day: 1, title: "Airport to Sigiriya", inArea: false, outsideNote: "Outside EllaPass area.", steps: [{ at: "All day", title: "Airport pickup and transfer through the countryside. Overnight Sigiriya.", icon: "compass", status: "unverified" }] },
    { day: 2, title: "Sigiriya and village experience", inArea: false, outsideNote: "Outside EllaPass area.", steps: [{ at: "All day", title: "Sigiriya Rock Fortress; optional village experience. Overnight Sigiriya.", icon: "compass", status: "unverified" }] },
    { day: 3, title: "Dambulla, Kandy", inArea: false, outsideNote: "Outside EllaPass area.", steps: [{ at: "All day", title: "Dambulla Cave Temple, Matale spice garden; Temple of the Tooth Kandy. Overnight Kandy.", icon: "compass", status: "unverified" }] },
    { day: 4, title: "Kandy to Nuwara Eliya", inArea: false, outsideNote: "Outside EllaPass area.", steps: [{ at: "All day", title: "Peradeniya Royal Botanical Gardens and a tea estate. Overnight Nuwara Eliya.", icon: "cup-hot", status: "unverified" }] },
    { day: 5, title: "Train to Ella", inArea: true, steps: [
      { at: "09:00", title: "Train 1005 from Nanu Oya, arrives Ella 11:27", place: "nine-arch-bridge", icon: "train-front", status: "verified", sources: ["S1","S10"] },
      { at: "15:00", title: "Ravana Falls or Little Adam's Peak afternoon walk", place: "ravana-falls", icon: "person-walking", status: "verified", sources: ["S2"] },
      { at: "Overnight", title: "Overnight in Ella", icon: "house-heart", status: "verified" }
    ]},
    { day: 6, title: "Transfer to the coast", inArea: false, outsideNote: "Outside EllaPass area. Bookable transfer from Ella.", steps: [
      { at: "09:00", title: "Book a transfer out of Ella — EllaPass can arrange the Ella leg", icon: "scooter", note: "EllaPass provides transfers to Wellawaya junction (about 30 km). Onward travel to the coast is outside the area.", status: "check" },
      { at: "Evening", title: "Arrive Bentota or Mirissa. Overnight beach hotel.", icon: "compass", status: "unverified" }
    ]},
    { day: 7, title: "Galle and departure", inArea: false, outsideNote: "Outside EllaPass area.", steps: [{ at: "All day", title: "Galle Dutch Fort, then transfer to airport or next destination.", icon: "compass", status: "unverified" }] }
  ]
}

];
