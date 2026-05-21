import { BsShieldLock } from 'react-icons/bs'
import {
  FaBolt,
  FaBroom,
  FaCheckCircle,
  FaCouch,
  FaFaucet,
  FaHammer,
  FaKey,
  FaLeaf,
  FaLock,
  FaPaintRoller,
  FaTrash,
  FaTruck,
  FaWrench
} from 'react-icons/fa'
import {
  MdAcUnit,
  MdBugReport,
  MdOutlineIron,
  MdOutlineLocalLaundryService,
  MdOutlinePets,
  MdOutlineRoofing,
  MdOutlineWaterDrop,
  MdVideocam
} from 'react-icons/md'

export const trustItems = [
  {
    icon: <BsShieldLock />,
    title: "Your Safety is Our Priority",
    desc: "All technicians are background verified and trained.",
  },
  {
    icon: <FaLock />,
    title: "100% Secure Payments",
    desc: "Pay safely using UPI, Cards, Wallets & more.",
  },
  {
    icon: <FaCheckCircle />,
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