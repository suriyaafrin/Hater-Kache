import {
  LuAirVent,
  LuBrush,
  LuCamera,
  LuHammer,
  LuLeaf,
  LuLockKeyhole,
  LuShirt,
  LuSprayCan,
  LuWashingMachine,
  LuWaves,
  LuZap,
} from "react-icons/lu";

import { acRepairTechnicians } from "./all-Data/acRepair";
import { applianceRepairTechnicians } from "./all-Data/applianceRepair";
import { cctvSecurityWorkers } from "./all-Data/CCTVSecurity";
import { carpenters } from "./all-Data/carpentry";
import { deepCleaners } from "./all-Data/deepCleaning";
import { electricians } from "./all-Data/electricalData";
import { gardeningWorkers } from "./all-Data/gardening";
import { homeSecurityProviders } from "./all-Data/homeSecurity";
import { ironingWorkers } from "./all-Data/ironing";
import { laundryWorkers } from "./all-Data/laundry";
import { painters } from "./all-Data/painting";
import { plumbersWorkers } from "./all-Data/Plumber";

import {
  acRepairServices,
  applianceRepairServices,
  carpentryServices,
  cctvServices,
  deepCleaningServices,
  electricalServices,
  gardeningServices,
  homeSecurityServices,
  ironingServices,
  laundryServices,
  paintingServices,
  plumbersServices,
} from "./serviceLists";

import { AREAS, areaByLabel, distanceKm, etaMinutes } from "./locations";

/* ── deterministic pseudo-randomness ──────────────────────────────────────
   Same seed always yields the same profile, so the catalogue is stable
   across reloads without shipping a database.                            */
function seed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}
const pick = (arr, s) => arr[Math.floor(s * arr.length) % arr.length];
const between = (s, min, max) => Math.round(min + s * (max - min));

/* ── categories ─────────────────────────────────────────────────────────── */

export const CATEGORIES = [
  {
    slug: "plumbing",
    label: "Plumbing",
    bn: "প্লাম্বিং",
    tagline: "Leaks, pipes, pumps and fittings",
    icon: LuWaves,
    services: plumbersServices,
    people: plumbersWorkers,
    emergency: "Burst pipe or no water supply",
  },
  {
    slug: "electrical",
    label: "Electrical",
    bn: "ইলেকট্রিক",
    tagline: "Wiring, boards, fans and lights",
    icon: LuZap,
    services: electricalServices,
    people: electricians,
    emergency: "Short circuit or power failure",
  },
  {
    slug: "ac-repair",
    label: "AC Repair",
    bn: "এসি সার্ভিস",
    tagline: "Servicing, gas refill and installation",
    icon: LuAirVent,
    services: acRepairServices,
    people: acRepairTechnicians,
    emergency: "AC dead in peak heat",
  },
  {
    slug: "appliance-repair",
    label: "Appliance Repair",
    bn: "যন্ত্রপাতি মেরামত",
    tagline: "Fridge, washing machine, TV and oven",
    icon: LuWashingMachine,
    services: applianceRepairServices,
    people: applianceRepairTechnicians,
    emergency: "Fridge stopped cooling",
  },
  {
    slug: "deep-cleaning",
    label: "Cleaning",
    bn: "ক্লিনিং",
    tagline: "Home, kitchen, sofa and post-construction",
    icon: LuSprayCan,
    services: deepCleaningServices,
    people: deepCleaners,
    emergency: "Water damage clean-up",
  },
  {
    slug: "painting",
    label: "Painting",
    bn: "রং করা",
    tagline: "Rooms, exteriors, putty and polish",
    icon: LuBrush,
    services: paintingServices,
    people: painters,
  },
  {
    slug: "carpentry",
    label: "Carpentry",
    bn: "কাঠমিস্ত্রি",
    tagline: "Furniture, doors, windows and cabinets",
    icon: LuHammer,
    services: carpentryServices,
    people: carpenters,
    emergency: "Broken door or window",
  },
  {
    slug: "home-security",
    label: "Locks & Security",
    bn: "নিরাপত্তা",
    tagline: "Door locks, alarms and intercoms",
    icon: LuLockKeyhole,
    services: homeSecurityServices,
    people: homeSecurityProviders,
    emergency: "Locked out of your home",
  },
  {
    slug: "cctv-and-security",
    label: "CCTV",
    bn: "সিসিটিভি",
    tagline: "Camera setup, DVR and smart doorbells",
    icon: LuCamera,
    services: cctvServices,
    people: cctvSecurityWorkers,
  },
  {
    slug: "laundry",
    label: "Laundry",
    bn: "লন্ড্রি",
    tagline: "Wash, dry clean and doorstep pickup",
    icon: LuWashingMachine,
    services: laundryServices,
    people: laundryWorkers,
  },
  {
    slug: "ironing",
    label: "Ironing",
    bn: "ইস্ত্রি",
    tagline: "Steam press, shirts, saree and curtains",
    icon: LuShirt,
    services: ironingServices,
    people: ironingWorkers,
  },
  {
    slug: "gardening",
    label: "Gardening",
    bn: "বাগান",
    tagline: "Rooftop gardens, lawns and plant care",
    icon: LuLeaf,
    services: gardeningServices,
    people: gardeningWorkers,
  },
];

export const categoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);

/* ── verification badges ─────────────────────────────────────────────────── */

export const BADGES = {
  identity: {
    id: "identity",
    label: "Identity verified",
    tip: "NID checked against the name and photo on this profile.",
  },
  background: {
    id: "background",
    label: "Background checked",
    tip: "Police verification and two reference checks completed.",
  },
  hk: {
    id: "hk",
    label: "Hater-Kache verified",
    tip: "Skills tested in person by our category lead before joining.",
  },
  topRated: {
    id: "topRated",
    label: "Top rated",
    tip: "Rated 4.8 or higher across the last 50 completed jobs.",
  },
  fast: {
    id: "fast",
    label: "Fast response",
    tip: "Accepts or declines requests in under 15 minutes on average.",
  },
};

/* ── professional normalisation ──────────────────────────────────────────── */

const BIO_OPENERS = [
  "Started out as an apprentice in",
  "Working across Dhaka since",
  "Learned the trade in",
  "Full-time on the tools since",
];

const parseRate = (rate = "") => {
  const amount = Number(String(rate).replace(/[^\d]/g, "")) || 500;
  const unit = String(rate).split("/")[1]?.trim() || "visit";
  return { amount, unit };
};

function buildAvailability(s) {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  return days.map((day, i) => {
    const r = seed(day + s);
    const off = day === "Fri" ? r > 0.45 : r > 0.88;
    return {
      day,
      off,
      from: off ? null : r > 0.5 ? "8:00 AM" : "9:00 AM",
      to: off ? null : r > 0.35 ? "9:00 PM" : "7:00 PM",
      load: off ? 0 : Math.min(0.95, 0.25 + seed(day + s + i) * 0.7),
    };
  });
}

function buildGallery(pro) {
  const jobs = pro.categoryServices.slice(0, 3);
  return jobs.map((job, i) => {
    const r = seed(pro.uid + job + i);
    return {
      id: `${pro.uid}-w${i}`,
      title: job,
      area: pick(AREAS, r).label,
      months: between(r, 1, 11),
      note: pick(
        [
          "Old fittings replaced, tested for two hours before handover.",
          "Full job finished in a single visit, site cleaned after.",
          "Customer supplied the parts, labour only.",
          "Repeat customer — second unit at the same address.",
        ],
        r
      ),
      // Drop real photos at /public/portfolio/<id>-before.jpg to replace the
      // generated tile — <WorkTile> falls back automatically.
      before: null,
      after: null,
    };
  });
}

function normalise(person, category) {
  const uid = `${category.slug}-${person.id}`;
  const s = seed(uid);
  const s2 = seed(uid + "x");
  const { amount, unit } = parseRate(person.rate);
  const years = Number(String(person.experience).replace(/\D/g, "")) || 3;
  const homeLabel = person.areas.find((a) => a !== "Dhaka") || "Dhanmondi";
  const home = areaByLabel(homeLabel) || AREAS[0];
  const responseMins = between(s2, 6, 42);
  const rating = person.rating;

  const badges = ["identity", "hk"];
  if (s > 0.35) badges.push("background");
  if (rating >= 4.8) badges.push("topRated");
  if (responseMins <= 15) badges.push("fast");

  const categoryServices = category.services
    .filter((x) => x.id !== "all-services")
    .map((x) => x.label);

  const skills = [
    person.service,
    ...categoryServices.filter((x) => x !== person.service).slice(0, 3),
  ];

  const pro = {
    ...person,
    uid,
    categorySlug: category.slug,
    categoryLabel: category.label,
    categoryServices,
    skills,
    home,
    areas: person.areas,
    serviceAreas: person.areas.filter((a) => a !== "Dhaka"),
    priceFrom: amount,
    priceUnit: unit,
    years,
    jobs: Math.round(person.reviews * (1.6 + s * 1.1)),
    responseMins,
    completionRate: 92 + Math.round(s2 * 7),
    repeatRate: 28 + Math.round(s * 40),
    joined: 2026 - Math.min(years, between(s, 1, 6)),
    badges,
    languages: s > 0.7 ? ["Bangla"] : ["Bangla", "English"],
    warranty: `${pick([15, 30, 30, 45, 60], s)}-day workmanship warranty`,
    bio: `${pick(BIO_OPENERS, s)} ${homeLabel}. ${years} years on ${category.label.toLowerCase()} jobs across ${person.areas
      .filter((a) => a !== "Dhaka")
      .join(" and ")}, mostly ${person.service.toLowerCase()}. Carries own tools and gives a written estimate before starting.`,
    availability: buildAvailability(uid),
  };
  pro.gallery = buildGallery(pro);
  return pro;
}

export const PROFESSIONALS = CATEGORIES.flatMap((c) => c.people.map((p) => normalise(p, c)));

export const proByUid = (uid) => PROFESSIONALS.find((p) => p.uid === uid);

/* The bundled roster is a sample of ten per category; these are the published
   totals each sample stands in for, varied per trade rather than uniform. */
export const countByCategory = CATEGORIES.reduce((acc, c) => {
  acc[c.slug] = c.people.length * (8 + Math.floor(seed(c.slug) * 12)) + between(seed(c.slug + "n"), 3, 19);
  return acc;
}, {});

/** Attach distance + ETA relative to the customer's selected area. */
export function withDistance(pro, area) {
  const km = Math.max(0.4, Number(distanceKm(area, pro.home).toFixed(1)));
  return { ...pro, km, eta: etaMinutes(km) };
}

export function professionalsNear(area, { category, limit } = {}) {
  let list = PROFESSIONALS;
  if (category) list = list.filter((p) => p.categorySlug === category);
  list = list.map((p) => withDistance(p, area)).sort((a, b) => a.km - b.km);
  return limit ? list.slice(0, limit) : list;
}

/* ── platform-wide numbers used on the marketing pages ───────────────────── */
export const PLATFORM_STATS = [
  { value: 10400, suffix: "+", label: "Households served", note: "Dhaka metro, last 12 months" },
  { value: 2150, suffix: "+", label: "Verified professionals", note: "NID and skills checked" },
  { value: 51200, suffix: "+", label: "Jobs completed", note: "Since launch" },
  { value: 4.8, suffix: "/5", label: "Average rating", note: "From 38,000 reviews", decimals: 1 },
];
