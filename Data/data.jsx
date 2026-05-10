import React from 'react'
import {
  FaFaucet, FaBolt, FaWrench, FaPaintRoller, FaHammer,
  FaTrash, FaBroom, FaTruck, FaKey, FaLeaf, FaDog,
  FaShieldAlt, FaCouch, FaBoxOpen
} from 'react-icons/fa'
import {
  MdAcUnit, MdOutlineRoofing, MdOutlineLocalLaundryService,
  MdOutlinePets, MdSecurity, MdOutlineIron, MdBugReport,
  MdOutlineWaterDrop, MdVideocam
} from 'react-icons/md'
import { BsShieldLock } from 'react-icons/bs'

export const services = [
  {
    label: "Plumbing",
    description: "Fix leaks, pipes & installations",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: <FaFaucet size={28} />,
  },
  {
    label: "Electrical",
    description: "Wiring, repairs & installations",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    icon: <FaBolt size={28} />,
  },
  {
    label: "Appliance Repair",
    description: "Washing machine, AC, fridge & more",
    bg: "bg-orange-50",
    iconColor: "text-orange-400",
    icon: <FaWrench size={28} />,
  },
  {
    label: "Painting",
    description: "Home & office painting service",
    bg: "bg-pink-50",
    iconColor: "text-pink-400",
    icon: <FaPaintRoller size={28} />,
  },
  {
    label: "Carpentry",
    description: "Furniture, fittings & woodwork",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: <FaHammer size={28} />,
  },
  {
    label: "AC Repair",
    description: "Installation, repair & service",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-500",
    icon: <MdAcUnit size={28} />,
  },
  {
    label: "Lock & Key",
    description: "Lock repair, key duplication & door opening",
    bg: "bg-slate-50",
    iconColor: "text-slate-600",
    icon: <FaKey size={28} />,
  },
  {
    label: "Deep Cleaning",
    description: "Full home deep cleaning service",
    bg: "bg-teal-50",
    iconColor: "text-teal-500",
    icon: <FaBroom size={28} />,
  },
  {
    label: "Pest Control",
    description: "Cockroach, rat & insect removal",
    bg: "bg-lime-50",
    iconColor: "text-lime-600",
    icon: <MdBugReport size={28} />,
  },
  {
    label: "CCTV & Security",
    description: "Camera installation & security setup",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    icon: <MdVideocam size={28} />,
  },
  {
    label: "Roofing",
    description: "Roof repair, waterproofing & leakage fix",
    bg: "bg-stone-50",
    iconColor: "text-stone-600",
    icon: <MdOutlineRoofing size={28} />,
  },
  {
    label: "Laundry",
    description: "Wash, dry & fold at your doorstep",
    bg: "bg-violet-50",
    iconColor: "text-violet-500",
    icon: <MdOutlineLocalLaundryService size={28} />,
  },
  {
    label: "Ironing",
    description: "Clothes ironing & steam press",
    bg: "bg-rose-50",
    iconColor: "text-rose-400",
    icon: <MdOutlineIron size={28} />,
  },
  {
    label: "Gardening",
    description: "Lawn mowing, pruning & plant care",
    bg: "bg-green-50",
    iconColor: "text-green-600",
    icon: <FaLeaf size={28} />,
  },
  {
    label: "Water Tank Cleaning",
    description: "Overhead & underground tank cleaning",
    bg: "bg-sky-50",
    iconColor: "text-sky-500",
    icon: <MdOutlineWaterDrop size={28} />,
  },
  {
    label: "Sofa & Carpet Cleaning",
    description: "Deep cleaning for sofa, rugs & carpet",
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
    icon: <FaCouch size={28} />,
  },
  {
    label: "Garbage Removal",
    description: "Junk, waste & debris disposal",
    bg: "bg-red-50",
    iconColor: "text-red-400",
    icon: <FaTrash size={28} />,
  },
  {
    label: "Pet Care",
    description: "Pet grooming, sitting & vet visits",
    bg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-500",
    icon: <MdOutlinePets size={28} />,
  },
  {
    label: "Home Security",
    description: "Door locks, alarms & safety systems",
    bg: "bg-gray-50",
    iconColor: "text-gray-600",
    icon: <BsShieldLock size={28} />,
  },
  {
    label: "Moving & Shifting",
    description: "Packing, loading & home shifting",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: <FaTruck size={28} />,
  },
]

export const trustBadges = [
  {
    label: "Verified",
    sub: "Professionals",
    icon: <BsShieldLock size={16} color="#FF4D7D" />,
  },
  {
    label: "Transparent",
    sub: "Pricing",
    icon: <FaBolt size={16} color="#FF4D7D" />,
  },
  {
    label: "On-time",
    sub: "Service",
    icon: <FaWrench size={16} color="#FF4D7D" />,
  },
]

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