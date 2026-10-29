/* STATUS: GREEN - SAFE TO EDIT. */
/* RULE R1: Do not delete any existing plan. Fix only what is listed. Fixed:
   - icon "shop" → "basket" (shop does not exist in icons.js)
   - two.photography: real bridge time 15:37 / Wednesday 15:21
   - relaxing: removed fixed "6:15 PM" sunset claim
   - train-related steps updated to real crossing times */
const ITINERARIES = {
  budget: {
    low:     { food: "a local kade (hoppers, roti and tea)", ride: "Walk or share a local tuk-tuk" },
    medium:  { food: "a café with a view", ride: "Take a tuk-tuk" },
    premium: { food: "a scenic café or restaurant", ride: "Take a private tuk-tuk or car" }
  },
  cost: {
    two:  { low: [500, 1500],   medium: [1500, 3500],  premium: [4000, 8000] },
    half: { low: [1500, 3000],  medium: [3000, 6000],  premium: [7000, 14000] },
    full: { low: [3000, 5500],  medium: [6000, 11000], premium: [12000, 25000] }
  },
  plans: {
    two: {
      hiking: {
        tip: "Best in the early morning while it is cool.",
        steps: [
          { at: "07:00", icon: "person-walking", title: "Start the walk to Little Adam's Peak", note: "{ride} to the start of the path.", place: "little-adams-peak" },
          { at: "07:30", icon: "binoculars", title: "Enjoy the view from the top", note: "Take your time and drink water." },
          { at: "08:45", icon: "cup-hot", title: "Breakfast at {food}", note: "" }
        ]
      },
      photography: {
        tip: "Late afternoon gives the softest light at the bridge. On Wednesdays the afternoon train is at 15:21.",
        steps: [
          { at: "15:15", icon: "train-front", title: "Nine Arch Bridge", note: "{ride}. Find your spot before the train.", place: "nine-arch-bridge" },
          { at: "15:37", icon: "camera", title: "Photograph train 1006 crossing (Wednesday: 15:21)", note: "Check the next train time at the top of the page." },
          { at: "16:30", icon: "cup-hot", title: "Tea at {food}", note: "" }
        ]
      },
      food: {
        tip: "Try hoppers or kottu if you have not yet.",
        steps: [
          { at: "10:00", icon: "cup-hot", title: "Eat at {food}", note: "" },
          { at: "11:00", icon: "basket", title: "Walk the main street", note: "Look at spices, tea and local snacks." },
          { at: "11:45", icon: "cup-straw", title: "Fresh juice or ginger tea", note: "" }
        ]
      },
      relaxing: {
        tip: "A slow plan for a tired afternoon.",
        steps: [
          { at: "16:00", icon: "cup-hot", title: "Tea at {food}", note: "" },
          { at: "16:45", icon: "tree", title: "Easy walk around town", note: "No rush." },
          { at: "17:30", icon: "sunset", title: "Sunset from {property}", note: "Sunset times change by month — ask your host for today's time." }
        ]
      }
    },
    half: {
      hiking: {
        tip: "Start early. Bring 1 litre of water each.",
        steps: [
          { at: "06:30", icon: "person-walking", title: "Little Adam's Peak", note: "{ride} to the start.", place: "little-adams-peak" },
          { at: "08:00", icon: "cup-hot", title: "Breakfast at {food}", note: "" },
          { at: "09:15", icon: "train-front", title: "Nine Arch Bridge", note: "Walk the forest path. Train 1016 at 09:37 (not Wednesday).", place: "nine-arch-bridge" },
          { at: "11:30", icon: "house-heart", title: "Return to {property}", note: "Shower and rest." }
        ]
      },
      photography: {
        tip: "Morning light is best for photos at the peak and bridge.",
        steps: [
          { at: "07:00", icon: "sunrise", title: "Little Adam's Peak", note: "{ride}. Photograph the valley.", place: "little-adams-peak" },
          { at: "08:30", icon: "train-front", title: "Nine Arch Bridge", note: "Train 1005 at 11:27 daily — plan your arrival.", place: "nine-arch-bridge" },
          { at: "10:00", icon: "cup-hot", title: "Breakfast at {food}", note: "" },
          { at: "11:00", icon: "camera", title: "Ella Gap viewpoint", note: "A wide shot over the valley." },
          { at: "12:00", icon: "house-heart", title: "Return to {property}", note: "" }
        ]
      },
      food: {
        tip: "Order rice and curry for lunch — a local favourite.",
        steps: [
          { at: "08:30", icon: "cup-hot", title: "Breakfast at {food}", note: "" },
          { at: "10:00", icon: "basket", title: "Visit the market or spice shops", note: "" },
          { at: "12:00", icon: "egg-fried", title: "Rice and curry lunch", note: "Ask for the local vegetable curries." },
          { at: "13:30", icon: "cup-straw", title: "Tea and something sweet", note: "" }
        ]
      },
      relaxing: {
        tip: "Choose one or two stops and skip the rest.",
        steps: [
          { at: "08:30", icon: "cup-hot", title: "Slow breakfast at {food}", note: "" },
          { at: "10:00", icon: "droplet", title: "Ravana Falls", note: "{ride}. An easy stop.", place: "ravana-falls" },
          { at: "11:30", icon: "cup-straw", title: "Tea with a view", note: "" },
          { at: "12:30", icon: "house-heart", title: "Rest at {property}", note: "" }
        ]
      }
    },
    full: {
      hiking: {
        tip: "Ella Rock is a serious hike. Start early and tell the guesthouse.",
        steps: [
          { at: "05:30", icon: "person-walking", title: "Start Ella Rock", note: "Ask your host about a local guide.", place: "ella-rock" },
          { at: "10:30", icon: "cup-hot", title: "Late breakfast at {food}", note: "Well earned." },
          { at: "12:30", icon: "house-heart", title: "Rest at {property}", note: "" },
          { at: "14:30", icon: "droplet", title: "Ravana Falls", note: "{ride}.", place: "ravana-falls" },
          { at: "16:30", icon: "train-front", title: "Nine Arch Bridge", note: "Train 1015 at 16:57 (not Wednesday).", place: "nine-arch-bridge" }
        ]
      },
      photography: {
        tip: "Sunrise and golden hour give the best light.",
        steps: [
          { at: "05:45", icon: "sunrise", title: "Sunrise at Little Adam's Peak", note: "{ride} to the start.", place: "little-adams-peak" },
          { at: "08:00", icon: "cup-hot", title: "Breakfast at {food}", note: "" },
          { at: "09:15", icon: "camera", title: "Nine Arch Bridge", note: "Train 1016 at 09:37 (not Wednesday).", place: "nine-arch-bridge" },
          { at: "11:30", icon: "cup-hot", title: "Lunch at {food}", note: "" },
          { at: "14:00", icon: "cup-hot", title: "Uva Halpewatte Tea Factory", note: "{ride}.", place: "tea-factory-tour" },
          { at: "16:30", icon: "sunset", title: "Ella Gap viewpoint", note: "Golden-hour shot over the valley." }
        ]
      },
      food: {
        tip: "A food tour of Ella: factory, kade and a sunset café.",
        steps: [
          { at: "08:00", icon: "cup-hot", title: "Breakfast at {food}", note: "" },
          { at: "10:00", icon: "cup-hot", title: "Tea Factory tour", note: "{ride}.", place: "tea-factory-tour" },
          { at: "12:00", icon: "egg-fried", title: "Rice and curry at a kade", note: "Ask your host which one is good today." },
          { at: "14:30", icon: "tree", title: "Tea plantation walk", note: "See the pickers at work.", place: "tea-plantation-walk" },
          { at: "17:00", icon: "cup-straw", title: "Sunset drink at {food}", note: "Toast the hills." }
        ]
      },
      relaxing: {
        tip: "A slow day. Do not rush.",
        steps: [
          { at: "07:30", icon: "sunrise", title: "Morning walk in the tea", note: "No destination needed." },
          { at: "09:00", icon: "cup-hot", title: "Slow breakfast at {food}", note: "" },
          { at: "11:30", icon: "train-front", title: "Nine Arch Bridge", note: "Train 1005 at 11:27 daily.", place: "nine-arch-bridge" },
          { at: "13:00", icon: "egg-fried", title: "Lunch in town", note: "{food}" },
          { at: "15:00", icon: "droplet", title: "Ravana Falls", note: "{ride}.", place: "ravana-falls" },
          { at: "17:30", icon: "sunset", title: "Sunset at the Ella Gap", note: "Ask your host for the best spot tonight." }
        ]
      }
    }
  }
};
