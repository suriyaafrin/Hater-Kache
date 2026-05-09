import React, { useState } from "react";

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
    <section
      aria-label="Find trusted technicians near you"
      className="bg-[#f8f9fb]"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 min-w-0">
          <p className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase text-[#FF4D7D] mb-3">
            Trusted Service Platform
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1E3A5F] mb-4">
            Find Trusted
            <br />
            Technicians <span className="text-[#FF4D7D]">Near You</span>
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-7">
            Book reliable and verified professionals for all your home and
            office service needs.
          </p>

          <div
            role="search"
            aria-label="Search technicians by location"
            className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm px-4 py-1.5 gap-3 max-w-sm"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <label htmlFor="location-input" className="sr-only">
              Enter your location
            </label>
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
                <p className="text-lg font-extrabold text-[#1E3A5F] m-0 mb-0.5">
                  {value}
                </p>
                <p className="text-[0.7rem] text-gray-400 m-0 tracking-wide">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex flex-1 min-w-0 justify-center items-center">
          <div className="relative w-full max-w-md aspect-3/3 rounded-3xl  overflow-hidden">
            
            <img
              src="/Hiro_img.png"
              alt="A trusted technician at work"
              className="w-full h-full object-contain object-bottom block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
