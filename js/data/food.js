/* STATUS: GREEN - SAFE TO EDIT. */
/* ==========================================================================
   food.js — CAFÉS, RESTAURANTS AND KADES
   halal.level: "certified"|"full"|"meat"|"request"|null
   RULE R4: Never set a halal level without verifiedOn date from owner visit.
   sample: true = hidden from public until owner verifies the listing.
   ========================================================================== */
const FOOD_TYPES = {
  cafe: "cup-hot", srilankan: "egg-fried",
  vegetarian: "flower2", international: "globe2"
};

const FOOD = [
  /* ── SAMPLE placeholder cafés (hidden until owner verifies) ── */
  {
    id: "misty-cup", destination: "ella", sample: true,
    name: "Misty Cup Café", type: "cafe", level: "medium",
    tags: ["laptop","views"],
    wifi: "fast", outlets: true, tested: "Not yet tested",
    priceLKR: [1200, 2500], distance: "300 m from the main road",
    desc: "Coffee, smoothie bowls and cakes with a view over the valley.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=cafe+Ella+Sri+Lanka",
    status: "unverified", verifiedOn: null,
    halal: { level: null },
    sponsored: false, verified: false
  },
  {
    id: "ammas-kade", destination: "ella", sample: true,
    name: "Amma's Rice & Curry", type: "srilankan", level: "low",
    tags: ["budget","local","family"],
    wifi: "none", outlets: false, tested: "Not yet tested",
    priceLKR: [600, 1200], distance: "5 minutes' walk",
    desc: "Home-style rice and curry with fresh vegetables and sambol.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=rice+and+curry+Ella+Sri+Lanka",
    status: "unverified", verifiedOn: null,
    halal: { level: null },
    sponsored: false, verified: false
  },
  {
    id: "station-kade", destination: "ella", sample: true,
    name: "Station Road Kade", type: "srilankan", level: "low",
    tags: ["budget","local","train"],
    wifi: "none", outlets: false, tested: "Not yet tested",
    priceLKR: [300, 700], distance: "Near the railway station",
    desc: "A small kade for hoppers, kottu, short eats and hot tea.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=kade+Ella+railway+station",
    status: "unverified", verifiedOn: null,
    halal: { level: null },
    sponsored: false, verified: false
  },

  /* ── HALAL CANDIDATES (unverified — level null until owner confirms) ── */
  {
    id: "ella-heritage-restaurant", destination: "ella", sample: false,
    name: "Ella Heritage Restaurant", type: "srilankan", level: "medium",
    tags: ["local","halal","family","budget"],
    wifi: "none", outlets: false, tested: "Not yet tested",
    priceLKR: [800, 1800], distance: "119A Ella-Passara Road",
    desc: "Described by reviewers as a fully halal restaurant under Muslim family management. Rice and curry, chicken kottu and biryani.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ella+Heritage+Restaurant+Sri+Lanka",
    status: "unverified", verifiedOn: null,
    sources: ["S22","S23"],
    halal: {
      level: null,
      alcohol: false, pork: false,
      verifiedOn: null, verifiedBy: null
      /* OWNER ACTION REQUIRED: visit, photograph the certificate if any,
         then set level to "full" and verifiedOn to the date you visited. */
    },
    sponsored: false, verified: false
  },
  {
    id: "raha-ella", destination: "ella", sample: false,
    name: "Raha Ella", type: "srilankan", level: "low",
    tags: ["local","halal","budget"],
    wifi: "none", outlets: false, tested: "Not yet tested",
    priceLKR: [500, 1200], distance: "No. 1 Passara Road",
    desc: "Reviewers report halal chicken, no beef or pork on the menu.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Raha+Ella+restaurant",
    status: "unverified", verifiedOn: null,
    sources: ["S24"],
    halal: {
      level: null,
      alcohol: false, pork: false,
      verifiedOn: null, verifiedBy: null
    },
    sponsored: false, verified: false
  },
  {
    id: "matey-hut", destination: "ella", sample: false,
    name: "Matey Hut", type: "srilankan", level: "low",
    tags: ["local","halal","budget","laptop"],
    wifi: "ok", outlets: false, tested: "Not yet tested",
    priceLKR: [400, 1000], distance: "No. 91 near the tunnel",
    desc: "Listed as halal-friendly. Check with the owner on current menu and alcohol policy.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Matey+Hut+Ella+Sri+Lanka",
    status: "unverified", verifiedOn: null,
    sources: ["S25"],
    halal: {
      level: null,
      verifiedOn: null, verifiedBy: null
    },
    sponsored: false, verified: false
  },
  {
    id: "green-leaf-veggie", destination: "ella", sample: true,
    name: "Green Leaf Café", type: "vegetarian", level: "medium",
    tags: ["vegetarian","laptop","views","quiet"],
    wifi: "fast", outlets: true, tested: "Not yet tested",
    priceLKR: [900, 2200], distance: "Main street",
    desc: "Plant-based plates, fresh juices and smoothies with a valley view.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=vegetarian+cafe+Ella+Sri+Lanka",
    status: "unverified", verifiedOn: null,
    halal: { level: null },
    sponsored: false, verified: false
  }
];
