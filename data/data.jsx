import { BsShieldLock } from 'react-icons/bs';
import {
  FaBolt,
  FaBroom,
  FaCouch,
  FaFaucet,
  FaHammer,
  FaKey, FaLeaf,
  FaPaintRoller,
  FaTrash,
  FaTruck,
  FaWrench
} from 'react-icons/fa';
import {
  MdAcUnit,
  MdBugReport,
  MdOutlineIron,
  MdOutlineLocalLaundryService,
  MdOutlinePets,
  MdOutlineRoofing,
  MdOutlineWaterDrop, MdVideocam
} from 'react-icons/md';
import { plumbersServices } from './all-Data/PlumberData';

export const services = [
  {
    id: 1,
    label: "Plumbing",
    description: "Fix leaks, pipes & installations",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: <FaFaucet size={28} />,
    slug: "plumbing",
    slugData: plumbersServices|[],
  },
  {
    id: 2,
    label: "Electrical",
    description: "Wiring, repairs & installations",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    icon: <FaBolt size={28} />,
    slug: "electrical",
    slugData: [],
  },
  {
    id: 3,
    label: "Appliance Repair",
    description: "Washing machine, AC, fridge & more",
    bg: "bg-orange-50",
    iconColor: "text-orange-400",
    icon: <FaWrench size={28} />,
    slug: "appliance-repair",
    slugData: [],
  },
  {
    id: 4,
    label: "Painting",
    description: "Home & office painting service",
    bg: "bg-pink-50",
    iconColor: "text-pink-400",
    icon: <FaPaintRoller size={28} />,
    slug: "painting",
    slugData: [],
  },
  {
    id: 5,
    label: "Carpentry",
    description: "Furniture, fittings & woodwork",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: <FaHammer size={28} />,
    slug: "carpentry",
    slugData: [],
  },
  {
    id: 6,
    label: "AC Repair",
    description: "Installation, repair & service",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-500",
    icon: <MdAcUnit size={28} />,
    slug: "ac-repair",
    slugData: [],
  },
  {
    id: 7,
    label: "Lock & Key",
    description: "Lock repair, key duplication & door opening",
    bg: "bg-slate-50",
    iconColor: "text-slate-600",
    icon: <FaKey size={28} />,
    slug: "lock-and-key",
    slugData: [],
  },
  {
    id: 8,
    label: "Deep Cleaning",
    description: "Full home deep cleaning service",
    bg: "bg-teal-50",
    iconColor: "text-teal-500",
    icon: <FaBroom size={28} />,
    slug: "deep-cleaning",
    slugData: [],
  },
  {
    id: 9,
    label: "Pest Control",
    description: "Cockroach, rat & insect removal",
    bg: "bg-lime-50",
    iconColor: "text-lime-600",
    icon: <MdBugReport size={28} />,
    slug: "pest-control",
    slugData: [],
  },
  {
    id: 10,
    label: "CCTV & Security",
    description: "Camera installation & security setup",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    icon: <MdVideocam size={28} />,
    slug: "cctv-and-security",
    slugData: [],
  },
  {
    id: 11,
    label: "Roofing",
    description: "Roof repair, waterproofing & leakage fix",
    bg: "bg-stone-50",
    iconColor: "text-stone-600",
    icon: <MdOutlineRoofing size={28} />,
    slug: "roofing",
    slugData: [],
  },
  {
    id: 12,
    label: "Laundry",
    description: "Wash, dry & fold at your doorstep",
    bg: "bg-violet-50",
    iconColor: "text-violet-500",
    icon: <MdOutlineLocalLaundryService size={28} />,
    slug: "laundry",
    slugData: [],
  },
  {
    id: 13,
    label: "Ironing",
    description: "Clothes ironing & steam press",
    bg: "bg-rose-50",
    iconColor: "text-rose-400",
    icon: <MdOutlineIron size={28} />,
    slug: "ironing",
    slugData: [],
  },
  {
    id: 14,
    label: "Gardening",
    description: "Lawn mowing, pruning & plant care",
    bg: "bg-green-50",
    iconColor: "text-green-600",
    icon: <FaLeaf size={28} />,
    slug: "gardening",
    slugData: [],
  },
  {
    id: 15,
    label: "Water Tank Cleaning",
    description: "Overhead & underground tank cleaning",
    bg: "bg-sky-50",
    iconColor: "text-sky-500",
    icon: <MdOutlineWaterDrop size={28} />,
    slug: "water-tank-cleaning",
    slugData: [],
  },
  {
    id: 16,
    label: "Sofa & Carpet Cleaning",
    description: "Deep cleaning for sofa, rugs & carpet",
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
    icon: <FaCouch size={28} />,
    slug: "sofa-and-carpet-cleaning",
    slugData: [],
  },
  {
    id: 17,
    label: "Garbage Removal",
    description: "Junk, waste & debris disposal",
    bg: "bg-red-50",
    iconColor: "text-red-400",
    icon: <FaTrash size={28} />,
    slug: "garbage-removal",
    slugData: [],
  },
  {
    id: 18,
    label: "Pet Care",
    description: "Pet grooming, sitting & vet visits",
    bg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-500",
    icon: <MdOutlinePets size={28} />,
    slug: "pet-care",
    slugData: [],
  },
  {
    id: 19,
    label: "Home Security",
    description: "Door locks, alarms & safety systems",
    bg: "bg-gray-50",
    iconColor: "text-gray-600",
    icon: <BsShieldLock size={28} />,
    slug: "home-security",
    slugData: [],
  },
  {
    id: 20,
    label: "Moving & Shifting",
    description: "Packing, loading & home shifting",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: <FaTruck size={28} />,
    slug: "moving-and-shifting",
    slugData: [],
  },
];

export const popularServices = [
  "AC Repair",
  "Deep Cleaning",
  "Carpentry",
  "Pest Control",
  "CCTV Install",
  "Lock & Key",
  "Laundry",
  "Gardening",
  "Sofa Cleaning",
  "Moving & Shifting",
]


// export const ShieldIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//     <path d="M10 2L3 5v5c0 4 3 7 7 8 4-1 7-4 7-8V5L10 2z" stroke="#e8503a" strokeWidth="1.5" strokeLinejoin="round" />
//   </svg>
// )

// export const LockIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//     <rect x="4" y="8" width="12" height="9" rx="1.5" stroke="#e8503a" strokeWidth="1.5" />
//     <path d="M7 8V6a3 3 0 016 0v2" stroke="#e8503a" strokeWidth="1.5" strokeLinecap="round" />
//     <circle cx="10" cy="12.5" r="1.5" fill="#e8503a" />
//   </svg>
// )

// export const CheckCircleIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//     <circle cx="10" cy="10" r="7.5" stroke="#e8503a" strokeWidth="1.5" />
//     <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#e8503a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// )





