import { useState, useRef, useEffect } from "react";
import { services } from "../../../data/data";
import { useNavigate } from "react-router-dom";

const capitalize = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function ServiceDropdown({ services, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(value || null);
  const wrapRef = useRef(null);

  useEffect(() => {
    setSelected(value || null);
  }, [value]);

  const filteredServices = services.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (service) => {
    setSelected(service);
    setIsOpen(false);
    setSearchQuery("");
    onChange(capitalize(service.label));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapRef} className="relative flex-1">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer p-0"
      >
        <span
          className={`flex-1 text-left text-sm truncate ${
            selected ? "text-[#FF4D7D] font-medium" : "text-gray-400"
          }`}
        >
          {/* ✅ capitalize the label so first letter always shows uppercase */}
          {selected ? capitalize(selected.label) : "Choose a service…"}
        </span>

        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-[calc(100%+10px)] left-0 right-0 z-50
                     bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
          style={{ animation: "ddFade .15s ease" }}
        >
          <ul className="max-h-52 overflow-y-auto">
            {filteredServices.length === 0 ? (
              <li className="py-4 text-center text-sm text-gray-300">
                No services found
              </li>
            ) : (
              filteredServices.map((s) => {
                const isActive = selected?.label === s.label;
                return (
                  <li
                    key={s.label}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(s);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors
                      ${
                        isActive
                          ? "bg-pink-50 text-[#FF4D7D] font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {s.icon && (
                      <span className="w-5 text-center text-base shrink-0">
                        {s.icon}
                      </span>
                    )}
                    <span className="flex-1">{capitalize(s.label)}</span>
                    {s.tag && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0
                          ${
                            isActive
                              ? "bg-pink-100 text-[#FF4D7D]"
                              : "bg-gray-100 text-gray-400"
                          }`}
                      >
                        {s.tag}
                      </span>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      <style>{`
        @keyframes ddFade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function AllServices() {
  const [service, setService] = useState("");
  const navigate = useNavigate();

  const handleService = (label) => {
    setService(label);
    navigate(`/services/${label.toLowerCase()}`);
  };

  return (
    <section className="min-h-screen mx-auto container max-w-7xl px-20 py-10
                        flex flex-col md:flex-row items-start gap-10">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-5xl font-extrabold text-[#1E3A5F] leading-tight">
            All <span className="text-[#FF4D7D]">Services</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-md leading-relaxed">
            Find professional plumbers for all your home and office plumbing
            needs. Fast, reliable & affordable service near you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 bg-white shadow-lg
                        rounded-2xl p-2 border border-gray-100 max-w-xl">
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl
                          bg-gray-50 border border-gray-200
                          focus-within:border-[#FF4D7D] transition-colors">
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
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83
                   2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33
                   1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09
                   A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06
                   a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06
                   A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3
                   a2 2 0 010-4h.09A1.65 1.65 0 004.6 9
                   a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83
                   2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68
                   a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09
                   a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06
                   a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06
                   A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21
                   a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <ServiceDropdown
              services={services}
              value={service}
              onChange={handleService}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllServices;