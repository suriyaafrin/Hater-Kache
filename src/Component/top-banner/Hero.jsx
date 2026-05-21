import React, { useState } from "react";
import { SearchIcon } from "../../img_folder/img";

const trustBadges = [
  { icon: "✅", label: "Verified Pros", sub: "Background checked" },
  { icon: "⚡", label: "Fast Booking", sub: "Same day available" },
  { icon: "🛡️", label: "Insured", sub: "100% protected" },
];

const services = [
  {
    label: "Plumbing",
    position: "top-4 -left-4",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" />
      </svg>
    ),
  },
  {
    label: "Appliance Repair",
    position: "top-4 -right-4",
    bg: "bg-orange-50",
    iconColor: "text-orange-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Electrical",
    position: "bottom-4 -left-4",
    bg: "bg-green-50",
    iconColor: "text-green-500",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: "Painting",
    position: "bottom-4 -right-4",
    bg: "bg-pink-50",
    iconColor: "text-pink-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 3a3 3 0 0 0-3 3l-7 7-1 4 4-1 7-7a3 3 0 0 0 0-6z" />
      </svg>
    ),
  },
];

const popularServices = ["Plumbing", "Electrical", "AC Repair", "Cleaning", "Painting", "Carpentry"];

function Hero() {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (!location.trim()) return;
    console.log("Searching for technicians near:", location);
  };

  const stats = [
    { value: "10K+", label: "Verified technicians" },
    { value: "4.9★", label: "Average rating" },
    { value: "50K+", label: "Jobs completed" },
  ];

  return (
    <section aria-label="Find trusted technicians near you" className="bg-[#f8f9fb]">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">

        <div className="flex-1 min-w-0">
          <p className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase text-[#FF4D7D] mb-3">
            Trusted Service Platform
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1E3A5F] mb-4">
            Find Trusted<br />
            Technicians <span className="text-[#FF4D7D]">Near You</span>
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-7">
            Book reliable and verified professionals for all your home and office service needs.
          </p>

      
          <div
            role="search"
            aria-label="Search technicians by location"
            className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm px-4 py-1.5 gap-3 max-w-sm"
          >
            <SearchIcon/>

            <label htmlFor="location-input" className="sr-only">Enter your location</label>
            <input
              id="location-input"
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 min-w-0 text-sm text-[#1E3A5F] bg-transparent outline-none border-none placeholder-gray-400"
            />

            <button
              onClick={handleSearch}
              aria-label="Search for technicians"
              className="bg-[#FF4D7D] text-white text-xs font-bold tracking-wide rounded-full px-5 py-2.5 whitespace-nowrap shrink-0 hover:bg-[#e63d6d] active:scale-95 transition-all duration-200"
            >
              Search Technician
            </button>
          </div>

          
          <ul className="flex flex-wrap gap-7 list-none m-0 p-0 mt-8">
            {stats.map(({ value, label }) => (
              <li key={label}>
                <p className="text-lg font-extrabold text-[#1E3A5F] m-0 mb-0.5">{value}</p>
                <p className="text-[0.7rem] text-gray-400 m-0 tracking-wide">{label}</p>
              </li>
            ))}
          </ul>

        
          <div className="flex gap-5 mt-6 flex-wrap">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-xs text-[#1E3A5F]">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <div className="font-bold text-[11px] text-[#1E3A5F]">{badge.label}</div>
                  <div className="text-gray-400">{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-1 min-w-0 justify-center items-center">
          <div className="relative w-full max-w-md aspect-3/3">

            <div className="rounded-3xl overflow-hidden w-full h-full">
              <img
                src="/Hiro_img.png"
                alt="A trusted technician at work"
                className="w-full h-full object-contain object-bottom block"
              />
            </div>

            {services.map((s) => (
              <div
                key={s.label}
                className={`absolute ${s.position} z-20 bg-white rounded-2xl shadow-md px-3 py-2.5 flex flex-col items-center gap-1.5 text-[11px] font-semibold text-[#12122a] min-w-20`}
              >
                <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.iconColor} flex items-center justify-center`}>
                  {s.icon}
                </div>
                {s.label}
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;