import { useState } from "react";
import { LocationPinIcon, SearchIcon } from "../../img_folder/img";

export default function Location() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div className="flex items-center justify-around">
        <div>
          <h2 className="text-2xl font-bold text-[#1E3A5C]">
            Select Location
          </h2>
        </div>

        <div className="flex gap-3 cursor-pointer">
          <LocationPinIcon />
          <h2 className="text-lg font-bold text-gray-400">Use current location</h2>
        </div>
      </div>

     
      <div
        className={`flex items-center max-w-6xl mx-auto mt-10 gap-3 px-10 py-3 rounded-2xl border-2 bg-white transition-all duration-200 shadow-sm
        ${
          focused
            ? "border-[#FF4D7D] shadow-[0_0_0_4px_rgba(30,58,92,0.1)]"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <SearchIcon />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search for a city, area or address..."
          className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      
      <div className=" p-5 max-w-6xl mx-auto mt-8 overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
        <iframe
          title="Dhaka Map"
          src="https://www.google.com/maps?q=Dhaka,Bangladesh&z=12&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </>
  );
}