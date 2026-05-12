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
export const steps = [
  {
    number: 1,
    title: "Choose Service",
    description: "Select the service you need",
    active: true,
    color: "bg-rose-500",
    border: "border-rose-500",
    text: "text-rose-500",
  },
  {
    number: 2,
    title: "Pick Technician",
    description: "Choose from verified professionals",
    active: false,
    color: "bg-blue-900",
    border: "border-blue-900",
    text: "text-blue-900",
  },
  {
    number: 3,
    title: "Book & Pay",
    description: "Schedule and pay securely",
    active: false,
    color: "bg-rose-300",
    border: "border-rose-300",
    text: "text-rose-300",
  },
  {
    number: 4,
    title: "Service Done",
    description: "Get the job done with satisfaction",
    active: false,
    color: "bg-blue-900",
    border: "border-blue-900",
    text: "text-blue-900",
  },
];

export const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L3 5v5c0 4 3 7 7 8 4-1 7-4 7-8V5L10 2z" stroke="#e8503a" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

export const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="4" y="8" width="12" height="9" rx="1.5" stroke="#e8503a" strokeWidth="1.5" />
    <path d="M7 8V6a3 3 0 016 0v2" stroke="#e8503a" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="12.5" r="1.5" fill="#e8503a" />
  </svg>
)

export const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="#e8503a" strokeWidth="1.5" />
    <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#e8503a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const trustItems = [
  {
    icon: <ShieldIcon />,
    title: "Your Safety is Our Priority",
    desc: "All technicians are background verified and trained.",
  },
  {
    icon: <LockIcon />,
    title: "100% Secure Payments",
    desc: "Pay safely using UPI, Cards, Wallets & more.",
  },
  {
    icon: <CheckCircleIcon />,
    title: "Satisfaction Guaranteed",
    desc: "Not happy? We'll make it right.",
  },
]

export const socials = [
  {
    label: "Facebook",
    bg: "bg-[#1877f2]",
    content: <span className="font-bold text-sm text-white">f</span>,
  },
  {
    label: "Instagram",
    bg: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]",
    content: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="#fff" strokeWidth="1.4" />
        <circle cx="8" cy="8" r="3" stroke="#fff" strokeWidth="1.4" />
        <circle cx="11.5" cy="4.5" r="0.8" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    bg: "bg-[#1da1f2]",
    content: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path
          d="M14.5 2.5c-.6.8-1.3 1.5-2.1 2C13 2 11 .5 9 2c-1.2 1-1.7 2.8-1.2 4.3C5.2 6.1 3 4.8 1.5 3c-.6 2 .5 4.2 2.2 5.2-1 0-1.8-.5-2.2-1.1 0 2.2 1.5 3.8 3.8 4.3-.6.1-1.3.1-1.7 0 .5 2.2 2.2 3.3 4.4 3.8-1.7 1.3-4.3 1.8-6.5 1.5 2.2 1.5 4.7 2.2 7.3 2.2 9.2 0 13-7.7 12.5-14.2.9-.7 1.7-1.5 2.2-2.4-.9.4-1.7.6-2.7.6.6-.4 1.2-1 1.5-1.9z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    bg: "bg-[#ff0000]",
    content: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3.5" width="14" height="9" rx="3" fill="#ff0000" stroke="#fff" strokeWidth="1" />
        <path d="M6.5 6l4 2-4 2V6z" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    bg: "bg-[#0a66c2]",
    content: <span className="font-bold text-sm text-white">in</span>,
  },
]

export const payments = [
  { label: "VISA",   color: "text-[#1a1f71]" },
  { label: "MC",     color: "text-[#eb001b]" },
  { label: "UPI",    color: "text-gray-600"   },
  { label: "GPay",   color: "text-[#4285f4]" },
  { label: "PayPal", color: "text-[#00457c]" },
]

export const bottomLinks = ["Privacy Policy", "Terms & Conditions", "Refund Policy"]

export const quickLinks = ["Home", "Services", "Technicians", "How It Works", "About Us", "Blog", "Contact Us"]
export const popularServicess = ["Plumbing", "Electrical", "Appliance Repair", "Painting", "Carpentry", "AC Repair", "Window Cleaning"]
export const forCustomers = ["How It Works", "Book a Service", "Track Your Booking", "Service Areas", "Pricing", "FAQs", "Support"]
export const forTechnicians = ["Become a Technician", "Technician Login", "How It Works", "Earnings", "Resources", "Help Center"]

export const LinkColumn = ({ title, links }) => (
  <div className="px-4 py-6 ">
    <h4 className="text-white text-sm font-semibold mb-5 tracking-wider uppercase">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-slate-400 text-[13px] leading-relaxed hover:text-pink-400 transition-colors duration-150 block py-0.5"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
)