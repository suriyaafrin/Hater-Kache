import { useState, useRef, useEffect } from "react";
import { PinLocationIcon } from "../../../img_folder/img"; // ✅ 3 levels up
import { LOCATIONS } from "../../../../data/location-Data";



export function LocationDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const shellRef = useRef(null);

  const selectedItem = LOCATIONS.find((l) => l.id === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shellRef.current && !shellRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };

  const hasValue = !!value;

  return (
    <div ref={shellRef} className="relative flex-1">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-2 pr-1 outline-none bg-transparent cursor-pointer transition-colors"
      >
        {/* Pin icon */}
        <span className="shrink-0 text-[#FF4D7D]">
          <PinLocationIcon />
        </span>

        <span
          className={`
            flex-1 text-left text-sm transition-colors truncate
            ${hasValue ? "text-[#1E3A5F] font-semibold" : "text-gray-400 font-normal"}
          `}
        >
          {selectedItem?.label || "Select location..."}
        </span>

        <svg
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF4D7D"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 z-50 w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="py-1">
            {LOCATIONS.map((loc) => {
              const isSelected = loc.id === value;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelect(loc.id)}
                  className={`
                    w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm
                    transition-colors cursor-pointer
                    ${isSelected
                      ? "text-[#1E3A5F] font-bold"
                      : "text-gray-500 font-bold hover:bg-gray-50 hover:text-[#1E3A5F]"
                    }
                  `}
                >
                  <span
                    className={`
                      w-1.5 h-1.5 rounded-full shrink-0 transition-colors
                      ${isSelected ? "bg-[#FF4D7D]" : "border border-gray-300"}
                    `}
                  />
                  {loc.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}