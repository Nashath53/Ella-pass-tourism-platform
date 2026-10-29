/* STATUS: GREEN - SAFE TO EDIT. This file is CONTENT. Change the text, numbers and links freely.
   Keep the commas, quotes and brackets exactly as they are. Run tools/data-check.html after every edit. */
/* ==========================================================================
   guest-private.js  -  PRIVATE GUEST INFORMATION
   --------------------------------------------------------------------------
   Loaded ONLY by pages inside /guest (never by public pages), so Wi-Fi
   passwords are not shipped to every visitor.
   ** Still NOT real security **: anyone who opens the guest pages can read
   this file in their browser. Do not put anything sensitive here.
   Real protection needs a backend (planned for a later stage).
   Keys must match the ids in PROPERTIES (config.js).
   {property} in a message is replaced by the guesthouse name.
   ========================================================================== */
const GUEST_PRIVATE = {

  "ella-mountain-view": {
    wifiName: "EllaGuest",
    wifiPassword: "Welcome123",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    breakfastTime: "7:00 AM to 10:00 AM",
    houseRules: [
      { icon: "moon-stars",       title: "Quiet hours",    text: "Please keep noise low from 10:00 PM to 6:00 AM." },
      { icon: "thermometer-sun",  title: "Hot water",      text: "Hot water is available morning and evening. Ask reception at other times." },
      { icon: "stack",            title: "Towels",         text: "Fresh towels on request. Reuse yours to save water." },
      { icon: "brush",            title: "Room cleaning",  text: "Rooms are cleaned daily. Hang the sign on your door to skip a day." },
      { icon: "cup-straw",        title: "Drinking water", text: "Boiled drinking water is at reception. Refill your bottle instead of buying plastic." },
      { icon: "bell",             title: "Reception",      text: "Message us on WhatsApp any time and we will help." }
    ],
    // Each opens WhatsApp to the host with a ready message. No payment happens on this site.
    services: [
      { icon: "egg-fried",  title: "Traditional breakfast", text: "Sri Lankan breakfast, ready when you are.", message: "Hello {property}, could we have a traditional Sri Lankan breakfast tomorrow? Please tell me the price and time." },
      { icon: "car-front",  title: "Airport pickup",        text: "A driver waiting for you when you arrive.", message: "Hello {property}, I would like airport pickup. Please tell me the price and how to arrange it." },
      { icon: "basket",     title: "Laundry",               text: "Wash and fold, usually next day.",          message: "Hello {property}, could you arrange laundry for me? Please tell me the price and pickup time." },
      { icon: "compass",    title: "Guided hike",           text: "A local guide for Ella Rock or a tea walk.", message: "Hello {property}, could you arrange a local guide for a hike? Please tell me the options and price." }
    ],
    recommendations: [
      { icon: "sunrise",         title: "Best sunrise spot",         text: "Ten minutes' walk up the lane behind the guesthouse. Go before 6 AM." },
      { icon: "cup-hot",         title: "Our favourite breakfast café", text: "Misty Cup Café is a short walk down the hill, good coffee and quiet mornings." },
      { icon: "signpost-split",  title: "Easy afternoon walk",       text: "Take the tea estate path toward the valley. Flat, shady and quiet." }
    ]
  },

  "green-valley-homestay": {
    wifiName: "GreenValley",
    wifiPassword: "Hello2026",
    checkIn: "12:00 PM",
    checkOut: "10:00 AM",
    breakfastTime: "7:30 AM to 9:30 AM",
    houseRules: [
      { icon: "moon-stars", title: "Quiet hours",  text: "Quiet after 9:30 PM, please." },
      { icon: "cup-hot",    title: "Tea & coffee", text: "Free tea and coffee on the terrace all day." },
      { icon: "bell",       title: "Reception",    text: "Ask the family at any time, we live next door." }
    ],
    services: [
      { icon: "cup-hot", title: "Tea on the terrace", text: "Free tea and coffee all day.", message: "Hello {property}, could we have tea on the terrace?" }
    ],
    recommendations: [
      { icon: "tree", title: "Family walk", text: "Ask us for the shady path behind the house." }
    ]
  }
};
