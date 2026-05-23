import { BsShieldLock } from "react-icons/bs";
import {
  FaBolt,
  FaBroom,
  FaFaucet,
  FaHammer,
  FaLeaf,
  FaWrench,
} from "react-icons/fa";
import {
  MdAcUnit,
  MdOutlineIron,
  MdOutlineLocalLaundryService,
  MdVideocam,
} from "react-icons/md";

import { acRepairTechnicians } from "./all-Data/acRepair";
import { applianceRepairTechnicians } from "./all-Data/applianceRepair";
import { cctvSecurityWorkers } from "./all-Data/CCTVSecurity";
import { deepCleaners } from "./all-Data/deepCleaning";
import { electricians } from "./all-Data/electricalData";
import { gardeningWorkers } from "./all-Data/gardening";
import { homeSecurityProviders } from "./all-Data/homeSecurity";
import { ironingWorkers } from "./all-Data/ironing";
import { laundryWorkers } from "./all-Data/laundry";
import { plumbersWorkers } from "./all-Data/Plumber";
import { acRepairServices, applianceRepairServices, carpentryServices, cctvServices, deepCleaningServices, electricalServices, gardeningServices, homeSecurityServices, ironingServices, laundryServices, plumbersServices } from "./serviceLists";

export const services = [
  {
    id: 2,
    label: "Plumbing",
    description: "Fix leaks, pipes & installations",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: <FaFaucet size={28} />,
    slug: "plumbing",
    slugData: {
      serviceList: plumbersServices,
      technicians: plumbersWorkers,
    },
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    label: "Carpentry",
    description: "Furniture, fittings & woodwork",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: <FaHammer size={28} />,
    slug: "carpentry",
    slugData: {
      serviceList: carpentryServices,
      technicians: plumbersWorkers,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
];
