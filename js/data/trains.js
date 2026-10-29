/* STATUS: GREEN - SAFE TO EDIT. */
/* ==========================================================================
   trains.js  -  NINE ARCH BRIDGE CROSSING TIMES
   --------------------------------------------------------------------------
   Times are the approximate window when each train crosses the bridge.
   source: Sri Lanka Railways notice 18 June 2026, re-checked 16 September 2026
   by Reservations.lk (blog.reservations.lk/nine-arch-bridge-guide/).
   Re-check every two weeks and update recheckDate below.
   days: omit for daily; otherwise list the 3-letter abbreviations that run.
   status: "open" = Nanu Oya-Ella-Badulla line; Kandy-Ella still CLOSED.
   ========================================================================== */
const TRAIN_STATUS = {
  destination: "ella",
  recheckDate: "2026-10-16",
  kandy_ella_closed: true,
  kandy_ella_note: "The Kandy–Ella through train is closed after Cyclone Ditwah. Only the Nanu Oya–Ella–Badulla section runs. Full reopening is expected around early 2027 but no confirmed date has been given.",
  workaround: "Travel Kandy to Nuwara Eliya or Nanu Oya by road, then take the train from Nanu Oya to Ella.",
  reserveUrl: "https://seatreservation.railway.gov.lk"
};

const TRAINS = [
  // Wednesday only (Ella Odyssey)
  { destination: "ella", time: "08:19", windowEnd: "08:43", label: "Toward Ella and Nanu Oya (Ella Odyssey 1044)", days: ["Wed"], sources: ["S1"], sample: false },
  // All days except Wednesday
  { destination: "ella", time: "09:37", windowEnd: "09:52", label: "Toward Ella and Nanu Oya (train 1016)", days: ["Mon","Tue","Thu","Fri","Sat","Sun"], sources: ["S1"], sample: false },
  // Daily
  { destination: "ella", time: "11:27", windowEnd: "11:41", label: "Toward Demodara and Badulla (train 1005)", days: [], sources: ["S1"], sample: false },
  // Wednesday only (Ella Odyssey)
  { destination: "ella", time: "15:21", windowEnd: "15:39", label: "Toward Demodara and Badulla (Ella Odyssey 1043)", days: ["Wed"], sources: ["S1"], sample: false },
  // Daily
  { destination: "ella", time: "15:37", windowEnd: "15:52", label: "Toward Ella and Nanu Oya (train 1006)", days: [], sources: ["S1"], sample: false },
  // All days except Wednesday
  { destination: "ella", time: "16:57", windowEnd: "17:11", label: "Toward Demodara and Badulla (train 1015)", days: ["Mon","Tue","Thu","Fri","Sat","Sun"], sources: ["S1"], sample: false }
];
