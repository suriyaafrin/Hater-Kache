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

import { acRepairServices, acRepairTechnicians } from "./all-Data/acRepair";
import { applianceRepairServices, applianceRepairTechnicians } from "./all-Data/applianceRepair";
import { carpenters, carpentryServices } from "./all-Data/carpentry";
import { cctvSecurityWorkers, cctvServices } from "./all-Data/CCTVSecurity";
import { deepCleaners, deepCleaningServices } from "./all-Data/deepCleaning";
import { electricalServices, electricians } from "./all-Data/electricalData";
import { garbageRemovalServices, garbageRemovalWorkers } from "./all-Data/garbageRemoval";
import { gardeningServices, gardeningWorkers } from "./all-Data/gardening";
import { homeSecurityProviders, homeSecurityServices } from "./all-Data/homeSecurity";
import { ironingServices, ironingWorkers } from "./all-Data/ironing";
import { laundryServices, laundryWorkers } from "./all-Data/laundry";
import { movingShiftingProviders, movingShiftingServices } from "./all-Data/movingShifting";
import { painters, paintingServices } from "./all-Data/painting";
import { pestControlServices, pestControlWorkers } from "./all-Data/pestControl";
import { petCareProviders, petCareServices } from "./all-Data/petCare";
import { plumbers, plumbersServices } from "./all-Data/PlumberData";
import { roofingServices, roofingWorkers } from "./all-Data/roofing";
import { sofaCarpetCleaningWorkers, sofaCarprtCleaningServices } from "./all-Data/sofaCarpetClean";
import { waterTankCleaningServices, waterTankCleaningWorkers } from "./all-Data/waterTankCleaning";

export const services = [
  {
    id: 1,
    label: "Plumbing",
    description: "Fix leaks, pipes & installations",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: <FaFaucet size={28} />,
    slug: "plumbing",
    slugData:{
      serviceList : plumbersServices,
      technicians:plumbers
    }
  },
  {
  id: 2,
  label: "Electrical",
  description: "Wiring, repairs & installations",
  bg: "bg-yellow-50",
  iconColor: "text-yellow-500",
  icon: <FaBolt size={28} />,
  slug: "electrical",
  slugData: {
    serviceList: electricalServices,
    technicians: electricians,
  },
},

{
  id: 3,
  label: "Appliance Repair",
  description: "Washing machine, AC, fridge & more",
  bg: "bg-orange-50",
  iconColor: "text-orange-400",
  icon: <FaWrench size={28} />,
  slug: "appliance-repair",
  slugData: {
    serviceList: applianceRepairServices,
    technicians: applianceRepairTechnicians,
  },
},

{
  id: 4,
  label: "Painting",
  description: "Home & office painting service",
  bg: "bg-pink-50",
  iconColor: "text-pink-400",
  icon: <FaPaintRoller size={28} />,
  slug: "painting",
  slugData: {
    serviceList: paintingServices,
    technicians: painters,
  },
},

{
  id: 5,
  label: "Carpentry",
  description: "Furniture, fittings & woodwork",
  bg: "bg-amber-50",
  iconColor: "text-amber-600",
  icon: <FaHammer size={28} />,
  slug: "carpentry",
  slugData: {
    serviceList: carpentryServices,
    technicians: carpenters,
  },
},

{
  id: 6,
  label: "AC Repair",
  description: "Installation, repair & service",
  bg: "bg-cyan-50",
  iconColor: "text-cyan-500",
  icon: <MdAcUnit size={28} />,
  slug: "ac-repair",
  slugData: {
    serviceList: acRepairServices,
    technicians: acRepairTechnicians,
  },
},

{
  id: 8,
  label: "Deep Cleaning",
  description: "Full home deep cleaning service",
  bg: "bg-teal-50",
  iconColor: "text-teal-500",
  icon: <FaBroom size={28} />,
  slug: "deep-cleaning",
  slugData: {
    serviceList: deepCleaningServices,
    technicians: deepCleaners,
  },
},

{
  id: 9,
  label: "Pest Control",
  description: "Cockroach, rat & insect removal",
  bg: "bg-lime-50",
  iconColor: "text-lime-600",
  icon: <MdBugReport size={28} />,
  slug: "pest-control",
  slugData: {
    serviceList: pestControlServices,
    technicians: pestControlWorkers,
  },
},

{
  id: 10,
  label: "CCTV & Security",
  description: "Camera installation & security setup",
  bg: "bg-indigo-50",
  iconColor: "text-indigo-500",
  icon: <MdVideocam size={28} />,
  slug: "cctv-and-security",
  slugData: {
    serviceList: cctvServices,
    technicians: cctvSecurityWorkers,
  },
},

{
  id: 11,
  label: "Roofing",
  description: "Roof repair, waterproofing & leakage fix",
  bg: "bg-stone-50",
  iconColor: "text-stone-600",
  icon: <MdOutlineRoofing size={28} />,
  slug: "roofing",
  slugData: {
    serviceList: roofingServices,
    technicians: roofingWorkers,
  },
},

{
  id: 12,
  label: "Laundry",
  description: "Wash, dry & fold at your doorstep",
  bg: "bg-violet-50",
  iconColor: "text-violet-500",
  icon: <MdOutlineLocalLaundryService size={28} />,
  slug: "laundry",
  slugData: {
    serviceList: laundryServices,
    technicians: laundryWorkers,
  },
},

{
  id: 13,
  label: "Ironing",
  description: "Clothes ironing & steam press",
  bg: "bg-rose-50",
  iconColor: "text-rose-400",
  icon: <MdOutlineIron size={28} />,
  slug: "ironing",
  slugData: {
    serviceList: ironingServices,
    technicians: ironingWorkers,
  },
},

{
  id: 14,
  label: "Gardening",
  description: "Lawn mowing, pruning & plant care",
  bg: "bg-green-50",
  iconColor: "text-green-600",
  icon: <FaLeaf size={28} />,
  slug: "gardening",
  slugData: {
    serviceList: gardeningServices,
    technicians: gardeningWorkers,
  },
},

{
  id: 15,
  label: "Water Tank Cleaning",
  description: "Overhead & underground tank cleaning",
  bg: "bg-sky-50",
  iconColor: "text-sky-500",
  icon: <MdOutlineWaterDrop size={28} />,
  slug: "water-tank-cleaning",
  slugData: {
    serviceList: waterTankCleaningServices,
    technicians: waterTankCleaningWorkers,
  },
},

{
  id: 16,
  label: "Sofa & Carpet Cleaning",
  description: "Deep cleaning for sofa, rugs & carpet",
  bg: "bg-purple-50",
  iconColor: "text-purple-500",
  icon: <FaCouch size={28} />,
  slug: "sofa-and-carpet-cleaning",
  slugData: {
    serviceList: sofaCarprtCleaningServices,
    technicians: sofaCarpetCleaningWorkers,
  },
},

{
  id: 17,
  label: "Garbage Removal",
  description: "Junk, waste & debris disposal",
  bg: "bg-red-50",
  iconColor: "text-red-400",
  icon: <FaTrash size={28} />,
  slug: "garbage-removal",
  slugData: {
    serviceList: garbageRemovalServices,
    technicians: garbageRemovalWorkers,
  },
},

{
  id: 18,
  label: "Pet Care",
  description: "Pet grooming, sitting & vet visits",
  bg: "bg-fuchsia-50",
  iconColor: "text-fuchsia-500",
  icon: <MdOutlinePets size={28} />,
  slug: "pet-care",
  slugData: {
    serviceList: petCareServices,
    technicians: petCareProviders,
  },
},

{
  id: 19,
  label: "Home Security",
  description: "Door locks, alarms & safety systems",
  bg: "bg-gray-50",
  iconColor: "text-gray-600",
  icon: <BsShieldLock size={28} />,
  slug: "home-security",
  slugData: {
    serviceList: homeSecurityServices,
    technicians: homeSecurityProviders,
  },
},

{
  id: 20,
  label: "Moving & Shifting",
  description: "Packing, loading & home shifting",
  bg: "bg-emerald-50",
  iconColor: "text-emerald-600",
  icon: <FaTruck size={28} />,
  slug: "moving-and-shifting",
  slugData: {
    serviceList: movingShiftingServices,
    technicians: movingShiftingProviders,
  },
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







