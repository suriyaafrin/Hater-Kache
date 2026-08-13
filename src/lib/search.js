import { CATEGORIES, professionalsNear } from "../../data/catalog";
import { AREAS } from "../../data/locations";
const TRADE_WORDS = {
  "air conditioner": "ac-repair",
  "washing machine": "appliance-repair",
  "water pump": "plumbing",
  electrician: "electrical",
  electrical: "electrical",
  electric: "electrical",
  wiring: "electrical",
  switchboard: "electrical",
  plumber: "plumbing",
  plumbing: "plumbing",
  pipe: "plumbing",
  leak: "plumbing",
  tap: "plumbing",
  pump: "plumbing",
  geyser: "plumbing",
  aircon: "ac-repair",
  "ac ": "ac-repair",
  refrigerator: "appliance-repair",
  fridge: "appliance-repair",
  freezer: "appliance-repair",
  microwave: "appliance-repair",
  oven: "appliance-repair",
  appliance: "appliance-repair",
  "tv": "appliance-repair",
  cleaner: "deep-cleaning",
  cleaning: "deep-cleaning",
  clean: "deep-cleaning",
  painter: "painting",
  painting: "painting",
  paint: "painting",
  carpenter: "carpentry",
  carpentry: "carpentry",
  furniture: "carpentry",
  locksmith: "home-security",
  lockout: "home-security",
  lock: "home-security",
  alarm: "home-security",
  cctv: "cctv-and-security",
  camera: "cctv-and-security",
  laundry: "laundry",
  "dry clean": "laundry",
  ironing: "ironing",
  iron: "ironing",
  gardener: "gardening",
  gardening: "gardening",
  garden: "gardening",
  lawn: "gardening",
};

const TRADE_KEYS = Object.keys(TRADE_WORDS).sort((a, b) => b.length - a.length);

export const SORTS = [
  { id: "recommended", label: "Recommended" },
  { id: "nearest", label: "Nearest" },
  { id: "rating", label: "Highest rated" },
  { id: "price", label: "Lowest price" },
  { id: "experience", label: "Most experienced" },
];

export const DEFAULT_FILTERS = {
  category: "all",
  area: "any",
  maxKm: 8,
  minRating: 0,
  maxPrice: 0, // 0 = no ceiling
  availableOnly: false,
  verifiedOnly: false,
  minYears: 0,
  sort: "recommended",
};

function matchesQuery(pro, q) {
  if (!q) return true;
  const term = q.toLowerCase().trim();
  const stripped = term
    .replace(/\b(near me|nearby|in|at|emergency|urgent|best|good)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const haystack = [
    pro.name,
    pro.service,
    pro.categoryLabel,
    pro.home.label,
    ...pro.serviceAreas,
    ...pro.skills,
  ]
    .join(" ")
    .toLowerCase();
  const words = (stripped || term).split(" ").filter(Boolean);
  return words.some((w) => haystack.includes(w));
}

export function parseQuery(q = "") {
  const term = ` ${q.toLowerCase().trim()} `;

  let category = CATEGORIES.find(
    (c) => term.includes(c.label.toLowerCase()) || term.includes(c.slug.replace(/-/g, " "))
  )?.slug;

  if (!category) {
    const hit = TRADE_KEYS.find((k) => new RegExp(`\\b${k.trim()}`).test(term));
    if (hit) category = TRADE_WORDS[hit];
  }

  const area = AREAS.find((a) => term.includes(a.label.toLowerCase()));

  return {
    emergency: /\b(emergency|urgent|right now|asap)\b/.test(term),
    nearMe: /\b(near me|nearby|closest)\b/.test(term),
    category,
    areaId: area?.id,
    areaLabel: area?.label,
  };
}

export function runSearch({ area, query = "", filters = DEFAULT_FILTERS }) {
  let list = professionalsNear(area);
  const hint = query ? parseQuery(query) : null;

  if (filters.category !== "all") list = list.filter((p) => p.categorySlug === filters.category);
  if (filters.area !== "any") list = list.filter((p) => p.home.id === filters.area);
  if (filters.maxKm && !hint?.areaLabel) list = list.filter((p) => p.km <= filters.maxKm);
  if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating);
  if (filters.maxPrice) list = list.filter((p) => p.priceFrom <= filters.maxPrice);
  if (filters.availableOnly) list = list.filter((p) => p.available);
  if (filters.verifiedOnly) list = list.filter((p) => p.badges.includes("background"));
  if (filters.minYears) list = list.filter((p) => p.years >= filters.minYears);
  if (hint?.category) list = list.filter((p) => p.categorySlug === hint.category);
  if (hint?.areaLabel)
    list = list.filter(
      (p) => p.home.label === hint.areaLabel || p.serviceAreas.includes(hint.areaLabel)
    );
  if (query && !hint?.category && !hint?.areaLabel) list = list.filter((p) => matchesQuery(p, query));

  const sorters = {
    nearest: (a, b) => a.km - b.km,
    rating: (a, b) => b.rating - a.rating || a.km - b.km,
    price: (a, b) => a.priceFrom - b.priceFrom,
    experience: (a, b) => b.years - a.years || b.rating - a.rating,
    recommended: (a, b) => score(b) - score(a),
  };
  return [...list].sort(sorters[filters.sort] || sorters.recommended);
}

function score(p) {
  const proximity = Math.max(0, 1 - p.km / 8) * 45;
  const quality = (p.rating - 4) * 22;
  const volume = Math.min(1, p.reviews / 200) * 14;
  const ready = p.available ? 12 : 0;
  const trusted = p.badges.includes("background") ? 6 : 0;
  return proximity + quality + volume + ready + trusted;
}

export const activeFilterCount = (f) =>
  [
    f.category !== "all",
    f.area !== "any",
    f.maxKm !== DEFAULT_FILTERS.maxKm,
    f.minRating > 0,
    f.maxPrice > 0,
    f.availableOnly,
    f.verifiedOnly,
    f.minYears > 0,
  ].filter(Boolean).length;
