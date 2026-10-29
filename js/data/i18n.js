/* STATUS: GREY - NOT USED YET. Reserved for translations later. Ignore it for now. */
/* ==========================================================================
   i18n.js  -  ALL VISIBLE TEXT
   --------------------------------------------------------------------------
   English ("en") is complete. To add Sinhala or Tamil later, fill "si" or "ta"
   with the same keys. Any missing key falls back to English.
   Tokens like {dest}, {property}, {brand} are replaced automatically.
   A key can have a mode version: "hero.lead.visitor" / "hero.lead.local".
   The page uses the mode version when it exists.
   ========================================================================== */
const I18N = {
  en: {
    "a11y.skip": "Skip to content",

    /* navigation */
    "nav.home": "Home", "nav.stay": "Your Stay", "nav.explore": "Explore {dest}",
    "nav.plan": "Plan My Day", "nav.rooms": "Nearby Stays", "nav.rooms.local": "Cheap Rooms",
    "nav.food": "Food", "nav.transport": "Transport", "nav.emergency": "Emergency",
    "nav.menu": "Open menu", "nav.lang": "Language",
    "mode.label": "Choose your view", "mode.visitor": "Visitor", "mode.local": "Sri Lankan",

    /* hero */
    "hero.small": "Your local guide to a better stay",
    "hero.title": "Welcome to {dest}",
    "hero.lead.visitor": "Discover {dest}'s mountains, viewpoints, cafés, transport and local experiences, all from your phone.",
    "hero.lead.local": "Find cheap rooms, kade meals, bus and train tips and the best places to visit, all from your phone.",
    "hero.plan": "Plan My Day", "hero.explore": "Explore {dest}",
    "hero.for": "Made for guests of",

    /* live strip */
    "now.time": "{dest} time", "now.sunrise": "Sunrise", "now.sunset": "Sunset", "now.approx": "approximate",
    "now.weather": "Check the weather",
    "greet.morning": "Good morning", "greet.afternoon": "Good afternoon", "greet.evening": "Good evening",
    "now.tip.night": "It is late. Rest well, and plan tomorrow's hike below.",
    "now.tip.morning": "Perfect time for a hike. Start early while it is cool.",
    "now.tip.midday": "Hot hours. A café, a long lunch or the waterfall are good choices.",
    "now.tip.golden": "Golden hour is close. Head to a viewpoint for soft light.",
    "now.tip.evening": "Evening in Ella. Time for dinner and a quiet rest.",

    /* next train ticket */
    "train.station": "Nine Arch Bridge", "train.next": "Next train",
    "train.in": "Arrives in", "train.tomorrow": "First train tomorrow at",
    "train.later": "After that", "train.now": "Any moment now",
    "train.note": "Times are approximate. Trains can run late, so confirm with your host or the station.",
    "train.sample": "Sample times. Owner: replace with the real timetable before publishing.",

    /* quick actions */
    "quick.wifi": "Wi-Fi", "quick.network": "Network", "quick.password": "Password",
    "quick.copy": "Copy password", "quick.copied": "Password copied",
    "quick.times": "Check-in and out", "quick.checkin": "Check-in", "quick.checkout": "Check-out",
    "quick.whatsapp": "WhatsApp", "quick.contact": "Contact Guesthouse",
    "quick.location": "Location", "quick.maps": "Open Google Maps",

    /* your stay */
    "stay.title": "Your Stay", "stay.sub": "Everything you need during your stay, in one place.",
    "stay.breakfast": "Breakfast", "stay.breakfastText": "Breakfast is served from {time}.",
    "stay.times": "Check-in / Check-out", "stay.house": "House information",

    /* explore */
    "explore.title": "Explore {dest}", "explore.sub": "The four places most guests visit first.",
    "diff.easy": "Easy", "diff.moderate": "Moderate", "diff.challenging": "Challenging",
    "place.guide": "View Guide", "place.duration": "Time needed", "place.best": "Best time",
    "place.cost": "Cost", "place.how": "How to get there", "place.tips": "Tips",
    "place.safety": "Stay safe", "place.maps": "Open in Maps", "place.ask": "Ask the guesthouse",
    "modal.close": "Close",

    /* plan my day */
    "plan.title": "Plan My {dest} Day", "plan.sub": "Tell us what you have. We'll suggest a simple plan.",
    "plan.time": "Time available", "plan.interest": "What do you like?", "plan.budget": "Budget",
    "opt.time.two": "2 Hours", "opt.time.half": "Half Day", "opt.time.full": "Full Day",
    "opt.interest.hiking": "Hiking", "opt.interest.photography": "Photography",
    "opt.interest.food": "Food", "opt.interest.relaxing": "Relaxing",
    "opt.budget.low": "Low", "opt.budget.medium": "Medium", "opt.budget.premium": "Premium",
    "plan.create": "Create My Plan",
    "plan.missing": "Choose time, interest and budget to continue.",
    "plan.resultTitle": "Your {dest} {interest} Plan",
    "plan.cost": "Rough cost per person",
    "plan.share": "Share on WhatsApp", "plan.copy": "Copy plan", "plan.reset": "Start over",
    "plan.copied": "Plan copied",
    "plan.guide": "View guide",
    "plan.disclaimer": "Travel times are approximate and may change depending on weather, traffic and local conditions.",
    "plan.footer": "Planned with {brand}",

    /* nearby stays */
    "rooms.title.visitor": "Nearby stays", "rooms.title.local": "Cheap rooms near you",
    "rooms.sub.visitor": "Other places to stay nearby, for friends or a longer trip.",
    "rooms.sub.local": "Budget rooms near town, the station and small kades. Message the owner on WhatsApp to check price and availability.",
    "filter.price": "Price", "filter.area": "Area",
    "price.all": "All", "price.low": "Low", "price.medium": "Medium", "price.premium": "Premium",
    "area.any": "Anywhere", "area.town": "Near town", "area.station": "Near station", "area.hills": "In the hills",
    "rooms.night": "per room, per night", "rooms.empty": "No stays match these filters.", "rooms.showAll": "Show all",
    "badge.sponsored": "Sponsored", "badge.verified": "Verified",
    "biz.whatsapp": "WhatsApp", "biz.maps": "Maps",

    /* food */
    "food.title": "Where to eat", "food.sub": "Cafés, kades and restaurants close to your stay.",
    "food.type.all": "All", "food.type.cafe": "Café", "food.type.srilankan": "Sri Lankan",
    "food.type.vegetarian": "Vegetarian", "food.type.international": "International",
    "food.each": "per person", "food.empty": "No places match this filter.",

    /* transport */
    "transport.title": "Getting around {dest}", "transport.sub": "Rides, trains and buses.",
    "transport.notice": "Transport schedules and prices can change. Confirm before travelling.",
    "transport.fares": "Sample tuk-tuk prices", "transport.faresNote": "Sample figures. Agree the price before you start.",

    /* tips, emergency, cta, footer */
    "tips.title": "Useful {dest} tips", "tips.sub": "Small things that make your trip easier.",
    "sos.title": "Need help?", "sos.sub": "Tap a button to call.",
    "sos.note": "For emergencies, contact the appropriate emergency service immediately.",
    "sos.guesthouse": "Guesthouse",
    "cta.title": "Need anything?", "cta.text": "Our team is happy to help during your stay.",
    "cta.wa": "WhatsApp Us", "cta.call": "Call Us", "cta.dir": "Get Directions",
    "footer.tagline": "Digital guest guide for {property}.", "footer.contact": "Contact",
    "footer.powered": "Powered by {brand}",
    "dock.whatsapp": "WhatsApp", "dock.call": "Call", "dock.directions": "Directions",
    "top.label": "Back to top",
    "print.title": "Room guide",

    /* WhatsApp messages */
    "wa.hello": "Hello {property}, I'm a guest and have a question.",
    "wa.place": "Hello, I'd like help arranging a visit to {place}.",
    "wa.stay": "Hello, I'm looking for a room. Is {name} available? I found you on {brand}."
  },

  si: {},   // Sinhala: add translations here later
  ta: {}    // Tamil:   add translations here later
};
