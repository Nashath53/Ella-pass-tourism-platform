/* STATUS: GREEN - SAFE TO EDIT. */
/* ==========================================================================
   drivers.js — TUK-TUK AND CAR DRIVERS
   sample: true   = hidden from public (shows only with ?preview=1)
   verified: true = only after you met the driver, saw their licence and took photos
   NEVER combine sample:true and verified:true
   reviews with sample:true are clearly labelled on the page
   ========================================================================== */
const DRIVERS = [
  {
    id: "driver-sunil", destination: "ella", name: "Sunil", sample: true,
    vehicle: "Tuk-tuk", areas: "Town, Nine Arch Bridge, waterfalls",
    tags: ["train","family"],
    whatsapp: "{{OWNER:whatsapp}}",
    photo: "drivers/sunil.jpg", vehiclePhoto: "drivers/sunil-tuktuk.jpg",
    vehicleNote: "Covered tuk-tuk, space for 3 passengers",
    languages: ["English","Sinhala"], years: "10 years driving in Ella",
    bio: "Sunil grew up in Ella and knows the short routes to Nine Arch Bridge and the best spot to wait for the train. Calm driver, good with families.",
    ratings: { average: 0, count: 0 }, reviews: [],
    sponsored: false, verified: false,
    status: "unverified"
  },
  {
    id: "driver-kamal", destination: "ella", name: "Kamal", sample: true,
    vehicle: "Tuk-tuk", areas: "Full-day tours, hiking drop-offs",
    tags: ["hiking","sunrise","adventure"],
    whatsapp: "{{OWNER:whatsapp}}",
    photo: "drivers/kamal.jpg", vehiclePhoto: "drivers/kamal-tuktuk.jpg",
    vehicleNote: "Tuk-tuk with a rain cover, early starts for hikes",
    languages: ["English","Sinhala","Tamil"], years: "7 years, day tours and hikes",
    bio: "Kamal runs early-morning drop-offs for Ella Rock and Little Adam's Peak and offers full-day tours with agreed stops.",
    ratings: { average: 0, count: 0 }, reviews: [],
    sponsored: true, verified: false,
    status: "unverified"
  },
  {
    id: "driver-nadeesha", destination: "ella", name: "Nadeesha", sample: true,
    vehicle: "Car", areas: "Airport and long-distance transfers",
    tags: ["premium"],
    whatsapp: "{{OWNER:whatsapp}}",
    photo: "drivers/nadeesha.jpg", vehiclePhoto: "drivers/nadeesha-car.jpg",
    vehicleNote: "Air-conditioned car for up to 3 passengers with luggage",
    languages: ["English","Sinhala"], years: "9 years, long-distance transfers",
    bio: "Nadeesha drives comfortable long-distance transfers and airport runs, with stops for photos on request.",
    ratings: { average: 0, count: 0 }, reviews: [],
    sponsored: false, verified: false,
    status: "unverified"
  }
];
