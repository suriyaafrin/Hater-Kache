import React, { useState } from "react";
import { services } from "../../Data/data.jsx";

function ServiceHiro() {
  const [service, setService] = useState("");

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start gap-10">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-5xl font-extrabold text-[#1E3A5F] leading-tight">
            All <span className="text-[#FF4D7D]">Services</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-md leading-relaxed">
            Find professional plumbers for all your home and office plumbing
            needs. Fast, reliable &amp; affordable service near you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 bg-white shadow-lg rounded-2xl p-2 border border-gray-100 max-w-xl">
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-[#FF4D7D] transition-colors">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-[#FF4D7D] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder-gray-400"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Enter A Service"
            />
          </div>

          <button className="px-5 py-2 rounded-xl bg-[#FF4D7D] text-white text-sm font-semibold hover:bg-[#e63d6d] transition-colors shrink-0">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default ServiceHiro;