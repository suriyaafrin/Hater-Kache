// ─── Services ────────────────────────────────────────────────────────────────
export const plumbersServices = [
  {
    id: 1,
    label: "All Services",
  },
  {
    id: 2,
    label: "Leak Repair",
  },
  {
    id: 3,
    label: "Pipe Installation",
  },
  {
    id: 4,
    label: "Drain Cleaning",
  },
  {
    id: 5,
    label: "Water Heater",
  },
  {
    id: 6,
    label: "Bathroom Fitting",
  },
  {
    id: 7,
    label: "Kitchen Plumbing",
  },
  {
    id: 8,
    label: "Emergency Repair",
  },
];

export const badges = [
  {
    label: "Verified Pros",
    sub: "All pros checked",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Fast Response",
    sub: "Avg 15 mins",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Top-Rated",
    sub: "4.8+ avg rating",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Affordable",
    sub: "Best market price",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// ─── Plumbers ─────────────────────────────────────────────────────────────────
export const plumbers = [
  {
    id: 1,
    name: "Rafiq Ahmed",
    initials: "RA",
    service: "Leak Repair",
    areas: ["Dhaka", "Mirpur", "Dhanmondi"],
    rate: "৳800/hr",
    rating: 4.9,
    reviews: 142,
    available: true,
    experience: "8 yrs",
    phone: "+880 1711-234567",
  },
  {
    id: 2,
    name: "Kamal Hossain",
    initials: "KH",
    service: "Pipe Installation",
    areas: ["Dhaka", "Gulshan", "Banani"],
    rate: "৳750/hr",
    rating: 4.8,
    reviews: 98,
    available: true,
    experience: "6 yrs",
    phone: "+880 1812-345678",
  },
  {
    id: 3,
    name: "Jahir Uddin",
    initials: "JU",
    service: "Drain Cleaning",
    areas: ["Dhaka", "Uttara", "Airport"],
    rate: "৳600/hr",
    rating: 4.7,
    reviews: 73,
    available: false,
    experience: "5 yrs",
    phone: "+880 1913-456789",
  },
  {
    id: 4,
    name: "Sumon Mia",
    initials: "SM",
    service: "Water Heater",
    areas: ["Dhaka", "Mohammadpur", "Lalmatia"],
    rate: "৳900/hr",
    rating: 4.9,
    reviews: 56,
    available: true,
    experience: "10 yrs",
    phone: "+880 1611-567890",
  },
  {
    id: 5,
    name: "Bashir Khan",
    initials: "BK",
    service: "Bathroom Fitting",
    areas: ["Chittagong", "Agrabad", "Nasirabad"],
    rate: "৳850/hr",
    rating: 4.6,
    reviews: 34,
    available: true,
    experience: "4 yrs",
    phone: "+880 1711-678901",
  },
  {
    id: 6,
    name: "Ratan Das",
    initials: "RD",
    service: "Kitchen Plumbing",
    areas: ["Sylhet", "Zindabazar", "Amberkhana"],
    rate: "৳700/hr",
    rating: 4.8,
    reviews: 61,
    available: false,
    experience: "7 yrs",
    phone: "+880 1812-789012",
  },
  {
    id: 7,
    name: "Imran Sheikh",
    initials: "IS",
    service: "Emergency Repair",
    areas: ["Dhaka", "Wari", "Lalbagh"],
    rate: "৳1,200/hr",
    rating: 5.0,
    reviews: 29,
    available: true,
    experience: "12 yrs",
    phone: "+880 1913-890123",
  },
  {
    id: 8,
    name: "Nurul Islam",
    initials: "NI",
    service: "Leak Repair",
    areas: ["Dhaka", "Tejgaon", "Farmgate"],
    rate: "৳780/hr",
    rating: 4.7,
    reviews: 88,
    available: true,
    experience: "9 yrs",
    phone: "+880 1611-901234",
  },
  {
    id: 9,
    name: "Masum Billah",
    initials: "MB",
    service: "Pipe Installation",
    areas: ["Dhaka", "Badda", "Rampura"],
    rate: "৳720/hr",
    rating: 4.5,
    reviews: 45,
    available: false,
    experience: "3 yrs",
    phone: "+880 1711-012345",
  },
  {
    id: 10,
    name: "Delwar Hosen",
    initials: "DH",
    service: "Drain Cleaning",
    areas: ["Dhaka", "Shyamoli", "Kalabagan"],
    rate: "৳650/hr",
    rating: 4.6,
    reviews: 52,
    available: true,
    experience: "6 yrs",
    phone: "+880 1812-123456",
  },
];

export const timeOptions = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
];
export const requiredFields = ["fullName", "phone", "address", "date"];

export const fieldLabels = {
  fullName: "Full name",
  phone: "Phone number",
  address: "Address",
  date: "Date",
};

export const keyframeStyles = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%  { transform: translateX(-6px); }
    40%  { transform: translateX(6px); }
    60%  { transform: translateX(-4px); }
    80%  { transform: translateX(4px); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;