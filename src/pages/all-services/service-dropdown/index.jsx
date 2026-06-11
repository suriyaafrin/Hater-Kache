import { useState, useRef, useEffect } from "react";

export function ServiceDropdown({ dropDownData, onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const shellRef = useRef(null);

  const selectedItem = dropDownData.find(
    (s) => (s.slug || s.id) === value
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shellRef.current && !shellRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug) => {
    onChange(slug);
    setIsOpen(false);
  };

  const hasValue = value && value !== "All Services" && value !== "all-services";

  return (
    <div ref={shellRef} className="relative flex-1">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-2 pr-1 outline-none bg-transparent cursor-pointer transition-colors"
      >
        {/* Selected icon */}
        {hasValue && selectedItem?.icon && (
          <span className="shrink-0 text-[#FF4D7D]">
            {selectedItem.icon}
          </span>
        )}

        <span
          className={`
            flex-1 text-left text-sm transition-colors truncate
            ${hasValue
              ? "text-[#1E3A5F] font-semibold"
              : "text-gray-400 font-normal"
            }
          `}
        >
          {selectedItem?.label || "Enter a service..."}
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

      {isOpen && (
        <div className="absolute  -left-3.75 top-full mt-1 z-50 w-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="py-1">
            {dropDownData.map((service, index) => {
              const slug = service.slug || service.id;
              const isSelected = slug === value;
              const isAllServices =
                slug === "all-services" || service.label === "All Services";

              return (
                <div key={service.id}>
                  {isAllServices && index !== 0 && (
                    <div className="mx-3 my-1 h-px bg-gray-100" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleSelect(slug)}
                    className={`
                      w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm
                      transition-colors cursor-pointer
                      ${isSelected
                        ? "text-[#1E3A5F] font-bold"
                        : "text-gray-500 font-bold hover:bg-gray-50 hover:text-[#1E3A5F]"
                      }
                    `}
                  >
                    {/* Service icon */}
                    {service.icon ? (
                      <span className="shrink-0 text-base text-[#FF4D7D]">
                        {service.icon}
                      </span>
                    ) : (
                      <span
                        className={`
                          w-1.5 h-1.5 rounded-full shrink-0 transition-colors
                          ${isSelected ? "bg-[#FF4D7D]" : "border border-gray-300"}
                        `}
                      />
                    )}
                    {service.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}