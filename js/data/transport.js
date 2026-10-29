/* STATUS: GREEN - SAFE TO EDIT. */
const TRANSPORT = [
  {
    id: "tuktuk", destination: "ella", icon: "scooter",
    name: "Tuk-tuk", text: "Book a tuk-tuk through EllaPass for a fair, agreed price and a verified driver.",
    cta: "See drivers & book", kind: "link", url: "#drivers"
  },
  {
    id: "taxi", destination: "ella", icon: "car-front",
    name: "Car / taxi", text: "Long-distance transfers and airport runs with air-conditioned cars.",
    cta: "See car drivers", kind: "link", url: "#drivers"
  },
  {
    id: "train", destination: "ella", icon: "train-front",
    name: "Train",
    text: "Trains run Nanu Oya – Ella – Badulla only. The Kandy–Ella through service is closed after Cyclone Ditwah; full reopening is expected around early 2027. Reserve seats at seatreservation.railway.gov.lk or at the station counter.",
    cta: "Train information", kind: "link", url: "https://seatreservation.railway.gov.lk"
  },
  {
    id: "bus", destination: "ella", icon: "bus-front",
    name: "Bus",
    text: "Buses leave from the main road toward Badulla, Bandarawela and Wellawaya. Minimum fare LKR 34 since July 2026. Ask us on WhatsApp for the next departure.",
    cta: "Ask on WhatsApp", kind: "whatsapp",
    message: "Hello EllaPass, I need the next bus from Ella to {{destination}}. When does it leave?"
  }
];

/* Fair fare board — agree these with your partner drivers before publishing.
   Replace {{OWNER:fare}} with the actual agreed LKR range. */
const FARES = [
  { destination: "ella", label: "Town to Nine Arch Bridge", priceLKR: [400, 800], sources: ["S1"] },
  { destination: "ella", label: "Town to Little Adam's Peak start", priceLKR: [300, 600] },
  { destination: "ella", label: "Town to Ravana Falls", priceLKR: [800, 1500] },
  { destination: "ella", label: "Town to Demodara Loop", priceLKR: [800, 1400] },
  { destination: "ella", label: "Town to Lipton's Seat (1.5 h each way)", priceLKR: [5000, 8000] },
  { destination: "ella", label: "Town to Diyaluma Falls (edge of area)", priceLKR: [5000, 9000] },
  { destination: "ella", label: "Full-day tuk-tuk hire (8 h)", priceLKR: [8000, 14000] }
];
