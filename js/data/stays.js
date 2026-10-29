/* STATUS: GREEN - SAFE TO EDIT. */
/* ==========================================================================
   stays.js — ROOMS AND GUESTHOUSES
   sample: true  = hidden from public pages (shows only with ?preview=1)
   verified: true = only after you visited in person and confirmed details
   status: "verified" | "check" | "unverified"
   halal: set level only after owner confirms in writing (see spec R4)
   ========================================================================== */
const STAYS = [
  {
    id: "station-road-rooms", destination: "ella", sample: true,
    name: "Station Road Rooms", shortName: "Station Road",
    tags: ["budget","train","local"],
    area: "station", level: "low", priceLKR: [3500, 5000],
    distance: "300 m from the railway station",
    note: "Simple clean rooms, hot water, close to the kade.",
    whatsapp: "{{OWNER:whatsapp}}", mapsUrl: "https://www.google.com/maps/search/?api=1&query=guesthouse+Ella+railway+station",
    status: "unverified", verifiedOn: null,
    ratings: { average: 0, count: 0 }, reviews: [],
    sponsored: false, verified: false,
    halal: { level: null }
  },
  {
    id: "kade-corner-inn", destination: "ella", sample: true,
    name: "Kade Corner Inn", shortName: "Kade Corner",
    tags: ["budget","local","family"],
    area: "town", level: "low", priceLKR: [3000, 4500],
    distance: "In the town centre",
    note: "Budget rooms above a small kade. Good for solo travellers and families.",
    whatsapp: "{{OWNER:whatsapp}}", mapsUrl: "https://www.google.com/maps/search/?api=1&query=budget+room+Ella+town",
    status: "unverified", verifiedOn: null,
    ratings: { average: 0, count: 0 }, reviews: [],
    sponsored: false, verified: false,
    halal: { level: null }
  },
  {
    id: "tea-hill-homestay", destination: "ella", sample: true,
    name: "Tea Hill Homestay", shortName: "Tea Hill",
    tags: ["tea","quiet","views","family"],
    area: "hills", level: "medium", priceLKR: [7000, 11000],
    distance: "2 km from town",
    note: "Family homestay on a tea slope with breakfast included.",
    whatsapp: "{{OWNER:whatsapp}}", mapsUrl: "https://www.google.com/maps/search/?api=1&query=homestay+Ella+tea",
    status: "unverified", verifiedOn: null,
    ratings: { average: 0, count: 0 }, reviews: [],
    sponsored: false, verified: false,
    halal: { level: null }
  },
  {
    id: "ella-garden-lodge", destination: "ella", sample: true,
    name: "Ella Garden Lodge", shortName: "Garden Lodge",
    tags: ["quiet","family"],
    area: "town", level: "medium", priceLKR: [8000, 12000],
    distance: "5 minutes from the main road",
    note: "Quiet garden, private balconies and a shared kitchen.",
    whatsapp: "{{OWNER:whatsapp}}", mapsUrl: "https://www.google.com/maps/search/?api=1&query=lodge+Ella+Sri+Lanka",
    status: "unverified", verifiedOn: null,
    ratings: { average: 0, count: 0 }, reviews: [],
    sponsored: false, verified: false,
    halal: { level: null }
  },
  {
    id: "misty-ridge-villa", destination: "ella", sample: true,
    name: "Misty Ridge Villa", shortName: "Misty Ridge",
    tags: ["premium","views","quiet"],
    area: "hills", level: "premium", priceLKR: [18000, 28000],
    distance: "3 km from town",
    note: "Private villa with a pool and valley views.",
    whatsapp: "{{OWNER:whatsapp}}", mapsUrl: "https://www.google.com/maps/search/?api=1&query=villa+Ella+Sri+Lanka",
    status: "unverified", verifiedOn: null,
    ratings: { average: 0, count: 0 }, reviews: [],
    sponsored: true, verified: false,
    halal: { level: null }
  }
];
