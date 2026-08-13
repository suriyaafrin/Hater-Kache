// Structured stand-in for the diagnosis model. `diagnose()` is the only thing
// the UI calls — swap the body for an API request and nothing else changes.

export const SYMPTOM_LIBRARY = [
  {
    id: "ac-not-cooling",
    match: ["ac", "cooling", "cool", "air condition", "এসি", "ঠান্ডা"],
    problem: "AC runs but the room stays warm",
    causes: [
      "Clogged filter choking the airflow",
      "Refrigerant gas below the required level",
      "Condenser coil packed with dust",
      "Compressor not holding pressure",
    ],
    service: { slug: "ac-repair", label: "AC diagnosis & repair", packageId: "deep-clean" },
    min: 500,
    max: 2500,
    urgency: "Book within a day — running it low on gas damages the compressor.",
    ask: "Is the outdoor unit fan spinning?",
  },
  {
    id: "water-leak",
    match: ["leak", "leaking", "water", "pipe", "tap", "পানি", "লিক"],
    problem: "Water leaking from a pipe or tap",
    causes: [
      "Worn washer or cartridge in the tap",
      "Loose or corroded pipe joint",
      "Cracked concealed line behind the wall",
      "Overflow from a blocked drain",
    ],
    service: { slug: "plumbing", label: "Leak repair", packageId: "tap-leak" },
    min: 400,
    max: 2200,
    urgency: "Same-day — a slow leak behind plaster gets expensive fast.",
    ask: "Is the water still running with the main valve closed?",
  },
  {
    id: "power-trip",
    match: ["power", "electric", "trip", "short", "circuit", "spark", "কারেন্ট", "বিদ্যুৎ"],
    problem: "Breaker trips or a socket has no power",
    causes: [
      "Overloaded circuit on one line",
      "Short circuit in a socket or switch",
      "Faulty appliance pulling the line down",
      "Loose neutral at the distribution board",
    ],
    service: { slug: "electrical", label: "Wiring fault diagnosis", packageId: "wiring-check" },
    min: 300,
    max: 1800,
    urgency: "Emergency if you smell burning or see sparks — cut the main first.",
    ask: "Does it trip again immediately after you reset it?",
  },
  {
    id: "fridge-warm",
    match: ["fridge", "refrigerator", "freezer", "ফ্রিজ"],
    problem: "Fridge is running but not cooling",
    causes: [
      "Frost blocking the evaporator fan",
      "Faulty thermostat or sensor",
      "Door gasket no longer sealing",
      "Compressor relay failure",
    ],
    service: { slug: "appliance-repair", label: "Refrigerator repair", packageId: "fridge" },
    min: 400,
    max: 4500,
    urgency: "Within a day if you have food or medicine inside.",
    ask: "Is the freezer compartment still making ice?",
  },
  {
    id: "washing-machine",
    match: ["washing machine", "washer", "spin", "drain", "ওয়াশিং"],
    problem: "Washing machine won't drain or spin",
    causes: [
      "Blocked drain pump filter",
      "Kinked or clogged outlet hose",
      "Worn drive belt",
      "Door lock sensor stuck",
    ],
    service: { slug: "appliance-repair", label: "Washing machine repair", packageId: "washing-machine" },
    min: 400,
    max: 3800,
    urgency: "Not urgent — book the next convenient slot.",
    ask: "Does the drum turn freely by hand?",
  },
  {
    id: "lockout",
    match: ["lock", "key", "locked out", "door", "চাবি", "তালা"],
    problem: "Locked out or the lock is jammed",
    causes: ["Key broken inside the cylinder", "Worn lock mechanism", "Misaligned door frame", "Lost keys"],
    service: { slug: "home-security", label: "Lockout entry", packageId: "lockout" },
    min: 800,
    max: 3500,
    urgency: "Emergency — professionals are on call through the night.",
    ask: "Is it a standard cylinder lock or a digital one?",
  },
  {
    id: "damp-wall",
    match: ["damp", "paint", "wall", "mould", "mold", "peel", "রং", "দেয়াল"],
    problem: "Damp patches or peeling paint on a wall",
    causes: [
      "Seepage from a neighbouring bathroom or pipe",
      "Roof or terrace waterproofing failure",
      "Condensation on an unventilated wall",
      "Paint applied without primer",
    ],
    service: { slug: "painting", label: "Damp patch repair", packageId: "damp-repair" },
    min: 1600,
    max: 6500,
    urgency: "Fix the source before repainting, or it comes back in a month.",
    ask: "Is there a bathroom or kitchen on the other side of that wall?",
  },
  {
    id: "pump",
    match: ["pump", "motor", "no water", "পাম্প"],
    problem: "Water pump not lifting water",
    causes: ["Capacitor failure", "Air lock in the suction line", "Foot valve stuck", "Motor winding burnt"],
    service: { slug: "plumbing", label: "Water pump service", packageId: "pump-service" },
    min: 1200,
    max: 2800,
    urgency: "Same-day — tanks usually run dry within hours.",
    ask: "Does the motor hum without pumping?",
  },
];

export const QUICK_PROMPTS = [
  "My AC is running but the room isn't cooling",
  "Water is leaking under the kitchen sink",
  "The breaker trips whenever I switch on the geyser",
  "Fridge is on but nothing inside is cold",
];

/** Returns the best matching entry, or null when nothing scores. */
export function diagnose(text = "") {
  const q = text.toLowerCase();
  if (q.trim().length < 3) return null;
  let best = null;
  let bestScore = 0;
  for (const entry of SYMPTOM_LIBRARY) {
    const score = entry.match.reduce((n, k) => (q.includes(k) ? n + k.length : n), 0);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore > 0 ? best : null;
}

/* ── rewards ─────────────────────────────────────────────────────────────── */

export const REWARD_TIERS = [
  { at: 500, reward: "৳50 off any booking" },
  { at: 1000, reward: "৳100 off any booking" },
  { at: 1500, reward: "Free AC basic service" },
  { at: 2500, reward: "৳400 off + priority matching" },
];

export const POINT_RULES = [
  { label: "Complete a booking", points: "+100" },
  { label: "Leave a review with photos", points: "+50" },
  { label: "Refer a neighbour who books", points: "+250" },
  { label: "Third booking with the same pro", points: "+150" },
];

/* ── review meta ─────────────────────────────────────────────────────────── */

export const REVIEW_CATEGORIES = ["Service quality", "Professionalism", "Communication", "Value"];

export const REVIEW_SEEDS = [
  {
    author: "Nusrat Jahan",
    area: "Dhanmondi",
    rating: 5,
    ago: "3 days ago",
    job: "AC deep cleaning",
    text: "Came within the hour, laid a sheet down before opening the indoor unit, and showed me how black the filter was. Room was cooling properly the same evening.",
    scores: [5, 5, 5, 4],
    photos: 2,
  },
  {
    author: "Tanvir Rahman",
    area: "Uttara",
    rating: 5,
    ago: "1 week ago",
    job: "Fan installation",
    text: "Quoted ৳600, charged ৳600. No arguing about extra parts. Cleaned up the drill dust himself.",
    scores: [5, 5, 4, 5],
    photos: 0,
  },
  {
    author: "Farhana Akter",
    area: "Mirpur",
    rating: 4,
    ago: "2 weeks ago",
    job: "Kitchen deep clean",
    text: "Good work overall, chimney and slabs look new. Arrived about 40 minutes late because of Mirpur traffic, but he called ahead to tell me.",
    scores: [5, 4, 4, 4],
    photos: 3,
  },
  {
    author: "Sajib Hossain",
    area: "Mohakhali",
    rating: 5,
    ago: "3 weeks ago",
    job: "Leak repair",
    text: "Found the leak inside the wall in ten minutes with a moisture meter. Fixed and repatched, no mess left behind.",
    scores: [5, 5, 5, 5],
    photos: 1,
  },
  {
    author: "Rumana Haque",
    area: "Bashundhara R/A",
    rating: 4,
    ago: "1 month ago",
    job: "Washing machine repair",
    text: "Replaced the drain pump the same day. Slightly pricey for the part but it has run fine for a month.",
    scores: [4, 5, 4, 3],
    photos: 0,
  },
];

/* ── notification seed ───────────────────────────────────────────────────── */

export const NOTIFICATION_SEED = [
  {
    id: "n1",
    kind: "job",
    title: "Rahim Ahmed accepted your request",
    body: "Electrical wiring check · today, 4:00 PM",
    ago: "12 min ago",
    read: false,
    to: "/track/HK-4821",
  },
  {
    id: "n2",
    kind: "eta",
    title: "Your professional is 10 minutes away",
    body: "Track the route live from your booking.",
    ago: "1 hour ago",
    read: false,
    to: "/track/HK-4821",
  },
  {
    id: "n3",
    kind: "reward",
    title: "You earned 100 points",
    body: "250 points until your next ৳100 discount.",
    ago: "Yesterday",
    read: true,
    to: "/account/rewards",
  },
  {
    id: "n4",
    kind: "payment",
    title: "Payment successful",
    body: "৳1,250 paid with bKash for AC deep cleaning.",
    ago: "2 days ago",
    read: true,
    to: "/account/payments",
  },
];
