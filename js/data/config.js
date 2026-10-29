/* STATUS: GREEN - SAFE TO EDIT. This file is CONTENT. Change the text, numbers and links freely.
   Keep the commas, quotes and brackets exactly as they are. Run tools/data-check.html after every edit. */
/* ==========================================================================
   config.js  -  PUBLIC SETTINGS
   ========================================================================== */
const SITE = {
  brand: "EllaPass",
  url: "https://ellapass.pages.dev",
  tagline: "Your pass to Ella",
  defaultProperty: "ella-mountain-view",
  defaultDestination: "ella",
  serviceRadiusKm: 40,          // booking and guide buttons only show inside this radius
  whatsapp: "{{OWNER:digits-only-with-country-code}}",
  phone: "{{OWNER:phone-number}}",
  feedbackUrl: "https://forms.gle/REPLACE_ME",
  analytics: { provider: "", src: "", id: "" },
  feedback: {
    endpoint: "https://api.web3forms.com/submit",  // Web3Forms — 250 free/month
    extra: { access_key: "{{OWNER:web3forms-access-key}}", subject: "EllaPass feedback" }
  },
  booking: {
    endpoint: "https://api.web3forms.com/submit",
    extra: { access_key: "{{OWNER:web3forms-access-key}}", subject: "EllaPass booking request" }
  }
};

const DESTINATIONS = {
  ella: {
    id: "ella", name: "Ella", country: "Sri Lanka",
    timeZone: "Asia/Colombo",
    sunrise: "06:05", sunset: "18:15",  // {{OWNER: replace with monthly table when available}}
    weatherUrl: "https://www.google.com/search?q=weather+Ella+Sri+Lanka",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ella+Sri+Lanka",
    emergency: [
      { id: "police",    name: "Police",         number: "119",            icon: "shield-check" },
      { id: "ambulance", name: "Ambulance (Suwa Seriya)", number: "1990",  icon: "heart-pulse" },
      { id: "fire",      name: "Fire & Rescue",  number: "110",            icon: "fire" },
      { id: "tourist",   name: "Tourist Hotline",number: "1912",           icon: "people" },
      { id: "tpolice",   name: "Tourist Police", number: "+94112421052",   icon: "shield-lock" }
    ],
    tips: [
      { icon: "alarm",           text: "Start hikes early. Mornings are cooler and clearer." },
      { icon: "droplet",         text: "Carry at least 1.5 litres of water for any hike." },
      { icon: "person-walking",  text: "Wear closed shoes with good grip, not sandals." },
      { icon: "cloud-sun",       text: "Check the weather first. Paths are dangerous after rain." },
      { icon: "shield-lock",     text: "Keep valuables secure and out of sight." },
      { icon: "people",          text: "Ask before photographing people. Be respectful near temples." },
      { icon: "recycle",         text: "Keep Ella clean. Take your rubbish with you." },
      { icon: "train-front",     text: "Trains can be quiet and fast. Never stand on the tracks." }
    ],
    survival: [
      { title: "Tuk-tuk prices", icon: "scooter", items: [
        "Agree the price BEFORE you get in. Say if it is per person or for the whole tuk-tuk.",
        "Ask your host what is fair for your trip before you ask the driver.",
        "For half-day or full-day hire, agree every stop and waiting time first.",
        "Book through EllaPass for an agreed price in writing and a verified driver."
      ]},
      { title: "Common scams to know", icon: "exclamation-circle", items: [
        "Drivers at the station may quote inflated fares. Check the Fair Fares board first.",
        "Unofficial 'guides' near Ella Rock and Nine Arch Bridge are not licensed. Book through EllaPass or ask your host.",
        "Commission detours to gem or spice shops are common on the road. You do not have to stop.",
        "PickMe does not always work in Ella. Use the EllaPass booking form or message a listed driver."
      ]},
      { title: "Leeches and hiking", icon: "bug", items: [
        "Leeches are common on wet and shaded trails, especially after rain.",
        "Wear closed shoes and long socks, and tuck your trousers into them.",
        "Use insect repellent on shoes and socks. Check your legs at every rest.",
        "Do not pull a leech off. Slide a fingernail under its mouth end, then wash the spot."
      ]},
      { title: "Trails and weather", icon: "cloud-lightning-rain", items: [
        "Start early. Afternoon cloud and rain arrive quickly in the hills.",
        "Paths and rocks get slippery when wet. Skip Ella Rock in heavy rain.",
        "Tell your host where you are going and when you expect back.",
        "Carry water, a charged phone and a small torch."
      ]},
      { title: "Trains and tracks", icon: "train-front", items: [
        "Never stand on the track or photograph from the track when a train is near.",
        "Listen and look both ways. Trains are often quieter than you expect.",
        "The Kandy–Ella through train is currently closed. Only Nanu Oya–Ella–Badulla runs.",
        "Reserve seats at seatreservation.railway.gov.lk or at the station counter."
      ]},
      { title: "Money and belonging", icon: "cash-coin", items: [
        "ATMs are in Ella town. Carry small notes for tuk-tuks and kades.",
        "Ask the price before you order, then confirm again before paying.",
        "Most kades and tuk-tuks are cash only."
      ]},
      { title: "Safety for solo travellers", icon: "person", items: [
        "Tell your host your daily plan. The tourist hotline is 1912.",
        "Stick to hikes in daylight. Little Adam's Peak is popular and good for solo walkers.",
        "A cooking class or guided hike is a good way to meet other travellers.",
        "Trust your instincts. If a situation feels wrong, leave."
      ]},
      { title: "Respect local life", icon: "people", items: [
        "Ask before you photograph people, homes or temple ceremonies.",
        "Dress modestly when visiting religious places and remove shoes where asked.",
        "Quiet hours around guesthouses and villages are usually after 10 PM."
      ]}
    ],
    checklist: [
      "Water (at least 1.5 litres)", "Closed shoes with good grip",
      "Long socks and insect repellent (leeches)", "Charged phone and small torch",
      "Rain jacket or poncho", "Told my host where I am going",
      "Checked today's weather", "Small cash for tuk-tuk and snacks"
    ]
  }
};

const PROPERTIES = {
  "ella-mountain-view": {
    id: "ella-mountain-view",
    name: "Ella Mountain View Guesthouse",
    shortName: "Mountain View",
    destination: "ella",
    tagline: "Quiet rooms above the tea slopes",
    whatsapp: "{{OWNER:whatsapp}}",
    phone: "{{OWNER:phone}}",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ella+Mountain+View+Guesthouse+Ella+Sri+Lanka",
    reviewUrl: "{{OWNER:google-review-link}}",
    showNearbyStays: true
  },
  "green-valley-homestay": {
    id: "green-valley-homestay",
    name: "Green Valley Homestay",
    shortName: "Green Valley",
    destination: "ella",
    tagline: "A family home with a terrace",
    whatsapp: "{{OWNER:whatsapp}}",
    phone: "{{OWNER:phone}}",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ella+Sri+Lanka",
    reviewUrl: "{{OWNER:google-review-link}}",
    showNearbyStays: false
  }
};
