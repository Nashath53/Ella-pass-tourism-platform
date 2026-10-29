/* STATUS: GREEN - SAFE TO EDIT. This file is CONTENT. Change the text, numbers and links freely.
   Keep the commas, quotes and brackets exactly as they are. Run tools/data-check.html after every edit. */
/* ==========================================================================
   quiet-spots.js  -  "HIDDEN & CALM"
   --------------------------------------------------------------------------
   Places for visitors who want solitude, fog and quiet, not crowds.
   Same shape as places.js so it can reuse the same card/modal code.
   ========================================================================== */
const QUIET_SPOTS = [
  {
    id: "forest-tea-path",
    tags: ["quiet","tea","photography","free"],
    scene: "mist",
    imageAlt: "A misty dirt path through tea bushes",
    destination: "ella",
    name: "The Old Tea Estate Path",
    short: "A quiet dirt path through working tea bushes, away from the main trails.",
    overview: "Few tourists find this one. Mornings bring a soft mist over the tea rows, and you may only pass a tea picker or two. Good for slow walking and photography, not for a checklist visit.",
    duration: "1 to 2 hours",
    difficulty: "easy",
    best: "Early morning, when the mist is thickest",
    cost: "Free",
    how: "Ask your guesthouse host to point you to the estate path nearest you. Paths differ by area, so local direction matters more than a map pin.",
    tips: ["Go alone or in a pair, groups break the quiet.", "Greet tea pickers politely, don't photograph people without asking.", "Bring a flask of tea and just sit for a while."],
    safety: "Stay on paths, tea slopes can be steeper than they look.",
    image: "places/quiet-tea-path.jpg",
    art: { a: "#2F7D5B", b: "#0A2C22", icon: "cloud-fog2" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=tea+estate+Ella+Sri+Lanka"
  },
  {
    id: "forgotten-viewpoint",
    tags: ["quiet","views","sunrise","free"],
    scene: "view",
    imageAlt: "A quiet lookout above a cloudy valley",
    destination: "ella",
    name: "The Forgotten Viewpoint",
    short: "A small, unmarked lookout above the valley, usually empty.",
    overview: "Locals know it, guidebooks mostly don't. No stalls, no crowd, just hills and cloud. A good spot to sit with a book or journal.",
    duration: "45 minutes to open-ended",
    difficulty: "easy",
    best: "Late afternoon, before sunset",
    cost: "Free",
    how: "Best reached with local directions, ask your host or a tuk-tuk driver you trust.",
    tips: ["Bring a jacket, it gets cool and windy.", "Pack out anything you bring in."],
    safety: "No railings at the edge, keep a safe distance in fog.",
    image: "places/forgotten-viewpoint.jpg",
    art: { a: "#5B7A8C", b: "#1C2B25", icon: "cloud" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ella+Sri+Lanka+viewpoint"
  },
  {
    id: "riverside-rocks",
    tags: ["quiet","family","free"],
    scene: "river",
    imageAlt: "Flat rocks beside a quiet stream",
    destination: "ella",
    name: "Riverside Rocks",
    short: "Flat rocks beside a quiet stream, good for sitting and reading.",
    overview: "A short walk from town but easy to miss. The water sound and shade make it a good place to slow down mid-hike or after one.",
    duration: "30 to 60 minutes",
    difficulty: "easy",
    best: "Midday, for shade",
    cost: "Free",
    how: "Short walk from the town centre, ask locally for the nearest stream path.",
    tips: ["Rocks can be slippery near the water.", "A good stop to eat a packed lunch quietly."],
    safety: "Water levels rise quickly after rain, don't sit close to the stream then.",
    image: "places/riverside-rocks.jpg",
    art: { a: "#2B6CB0", b: "#173654", icon: "water" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ella+Sri+Lanka+river"
  }
];
