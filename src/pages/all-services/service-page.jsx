import { useState, useRef, useEffect } from "react";
import { services } from "../../../data/data";
import { useNavigate } from "react-router-dom";
import Popular from "../../Component/popular/Popular";

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
    <>
    <section className="mx-auto container max-w-7xl px-20 py-10
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

      {/* SVG illustration — moved here as a flex sibling so it sits on the right */}
      <div className="shrink-0 w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-linear-to-br  scale-90 opacity-80" />
          <svg
            viewBox="0 0 260 260"
            className="relative z-10 w-full h-full drop-shadow-xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background glow */}
            <ellipse
              cx="130"
              cy="175"
              rx="110"
              ry="90"
              fill="#fce4ec"
              opacity="0.5"
            />

            {/* Decorative dots */}
            <g fill="#f48fb1" opacity="0.55">
              <circle cx="220" cy="60" r="3" />
              <circle cx="231" cy="60" r="3" />
              <circle cx="242" cy="60" r="3" />
              <circle cx="220" cy="71" r="3" />
              <circle cx="231" cy="71" r="3" />
              <circle cx="242" cy="71" r="3" />
              <circle cx="220" cy="82" r="3" />
              <circle cx="231" cy="82" r="3" />
              <circle cx="242" cy="82" r="3" />
            </g>
            <g fill="#f48fb1" opacity="0.35">
              <circle cx="18" cy="160" r="2.5" />
              <circle cx="27" cy="160" r="2.5" />
              <circle cx="36" cy="160" r="2.5" />
              <circle cx="18" cy="169" r="2.5" />
              <circle cx="27" cy="169" r="2.5" />
              <circle cx="36" cy="169" r="2.5" />
            </g>

            {/* Box body */}
            <rect
              x="55"
              y="145"
              width="150"
              height="88"
              rx="10"
              fill="#f0f0f0"
              stroke="#d8d8d8"
              strokeWidth="1"
            />
            <rect
              x="55"
              y="145"
              width="150"
              height="14"
              rx="4"
              fill="#e0e0e0"
            />
            <rect
              x="55"
              y="220"
              width="150"
              height="13"
              rx="0"
              fill="#e4e4e4"
              opacity="0.6"
            />

            {/* Box rim */}
            <rect
              x="48"
              y="136"
              width="164"
              height="18"
              rx="8"
              fill="#e0e0e0"
              stroke="#d0d0d0"
              strokeWidth="0.8"
            />

            {/* Handle */}
            <path
              d="M108 136 Q130 112 152 136"
              fill="none"
              stroke="#cccccc"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M108 136 Q130 114 152 136"
              fill="none"
              stroke="#ececec"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Feet */}
            <rect
              x="68"
              y="226"
              width="22"
              height="7"
              rx="3.5"
              fill="#c8c8c8"
            />
            <rect
              x="170"
              y="226"
              width="22"
              height="7"
              rx="3.5"
              fill="#c8c8c8"
            />

            {/* Wrench 1 */}
            <g transform="translate(90 105) rotate(-18)">
              <rect
                x="-5"
                y="0"
                width="10"
                height="70"
                rx="5"
                fill="#9e9e9e"
              />
              <rect
                x="-3.5"
                y="0"
                width="7"
                height="70"
                rx="3.5"
                fill="#bdbdbd"
              />
              <ellipse cx="0" cy="-5" rx="10" ry="9" fill="#9e9e9e" />
              <ellipse cx="0" cy="-5" rx="7" ry="6" fill="#bdbdbd" />
              <rect
                x="-4"
                y="-11"
                width="8"
                height="7"
                rx="2"
                fill="#9e9e9e"
              />
              <ellipse cx="0" cy="70" rx="8" ry="6" fill="#9e9e9e" />
              <rect
                x="-3"
                y="65"
                width="6"
                height="7"
                rx="1.5"
                fill="#9e9e9e"
              />
            </g>

            {/* Wrench 2 */}
            <g transform="translate(108 100) rotate(5)">
              <rect
                x="-4.5"
                y="0"
                width="9"
                height="68"
                rx="4.5"
                fill="#8d8d8d"
              />
              <rect
                x="-3"
                y="0"
                width="6"
                height="68"
                rx="3"
                fill="#adadad"
              />
              <ellipse cx="0" cy="-4" rx="9" ry="8" fill="#8d8d8d" />
              <ellipse cx="0" cy="-4" rx="6" ry="5.5" fill="#adadad" />
              <rect
                x="-3.5"
                y="-10"
                width="7"
                height="7"
                rx="2"
                fill="#8d8d8d"
              />
              <ellipse cx="0" cy="68" rx="7" ry="5" fill="#8d8d8d" />
            </g>

            {/* Pink screwdriver */}
            <g transform="translate(133 96) rotate(8)">
              <rect
                x="-7"
                y="0"
                width="14"
                height="36"
                rx="6"
                fill="#e91e8c"
              />
              <rect
                x="-5"
                y="0"
                width="10"
                height="36"
                rx="5"
                fill="#f06292"
              />
              <rect
                x="-7"
                y="10"
                width="14"
                height="3"
                rx="1.5"
                fill="#c2185b"
                opacity="0.5"
              />
              <rect
                x="-7"
                y="19"
                width="14"
                height="3"
                rx="1.5"
                fill="#c2185b"
                opacity="0.5"
              />
              <rect
                x="-7"
                y="28"
                width="14"
                height="3"
                rx="1.5"
                fill="#c2185b"
                opacity="0.5"
              />
              <rect
                x="-5.5"
                y="33"
                width="11"
                height="7"
                rx="2"
                fill="#9e9e9e"
              />
              <rect
                x="-2.5"
                y="39"
                width="5"
                height="52"
                rx="2"
                fill="#bdbdbd"
              />
              <rect
                x="-1.5"
                y="39"
                width="3"
                height="52"
                rx="1.5"
                fill="#d8d8d8"
              />
              <polygon points="-3,91 3,91 1.5,100 -1.5,100" fill="#757575" />
            </g>

            {/* Pliers */}
            <g transform="translate(160 90) rotate(12)">
              <rect
                x="-10"
                y="32"
                width="9"
                height="52"
                rx="4"
                fill="#e91e8c"
              />
              <rect
                x="-8"
                y="32"
                width="5"
                height="52"
                rx="3"
                fill="#f06292"
              />
              <rect
                x="1"
                y="32"
                width="9"
                height="52"
                rx="4"
                fill="#e91e8c"
              />
              <rect
                x="3"
                y="32"
                width="5"
                height="52"
                rx="3"
                fill="#f06292"
              />
              <circle cx="0" cy="38" r="5" fill="#757575" />
              <circle cx="0" cy="38" r="3" fill="#9e9e9e" />
              <path
                d="M-10 38 Q-16 16 -11 0 Q-7 -8 -3 0 Q-6 16 -1.5 38Z"
                fill="#424242"
              />
              <path
                d="M-9 38 Q-14 17 -10 2 Q-7 -4 -4 1 Q-6 17 -2 38Z"
                fill="#616161"
              />
              <path
                d="M10 38 Q16 16 11 0 Q7 -8 3 0 Q6 16 1.5 38Z"
                fill="#424242"
              />
              <path
                d="M9 38 Q14 17 10 2 Q7 -4 4 1 Q6 17 2 38Z"
                fill="#616161"
              />
            </g>

            {/* Blue screwdriver */}
            <g transform="translate(188 105) rotate(15)">
              <rect
                x="-6.5"
                y="0"
                width="13"
                height="34"
                rx="5.5"
                fill="#1565c0"
              />
              <rect
                x="-4.5"
                y="0"
                width="9"
                height="34"
                rx="4.5"
                fill="#1e88e5"
              />
              <rect
                x="-6.5"
                y="9"
                width="13"
                height="2.5"
                rx="1.5"
                fill="#0d47a1"
                opacity="0.5"
              />
              <rect
                x="-6.5"
                y="17"
                width="13"
                height="2.5"
                rx="1.5"
                fill="#0d47a1"
                opacity="0.5"
              />
              <rect
                x="-6.5"
                y="25"
                width="13"
                height="2.5"
                rx="1.5"
                fill="#0d47a1"
                opacity="0.5"
              />
              <rect
                x="-5"
                y="31"
                width="10"
                height="6"
                rx="2"
                fill="#9e9e9e"
              />
              <rect
                x="-2.5"
                y="36"
                width="5"
                height="50"
                rx="2"
                fill="#bdbdbd"
              />
              <rect
                x="-1.5"
                y="36"
                width="3"
                height="50"
                rx="1.5"
                fill="#d8d8d8"
              />
              <rect x="-2.5" y="84" width="5" height="3" fill="#757575" />
              <rect x="-1" y="82" width="2" height="6" fill="#757575" />
            </g>

            <rect
              x="48"
              y="136"
              width="164"
              height="10"
              rx="5"
              fill="#e0e0e0"
              stroke="#d0d0d0"
              strokeWidth="0.5"
            />
          </svg>
        </div>
     
    </section>

    <div className="w-full">
      <Popular />
    </div>
    </>
  );
  
}

export default AllServices;