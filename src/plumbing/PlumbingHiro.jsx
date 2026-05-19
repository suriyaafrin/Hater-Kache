import { useEffect, useRef, useState } from "react";
import PlumberDetail from "./PlumberDetail.jsx";
import ResultsPanel from "./ResultsPanel.jsx";
import { Link } from "react-router-dom";
import { badges,plumbers,services } from "../../data/all-Data/PlumberData.jsx";

const capitalize = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function PlumbingHero({ serviceName }) {
  const [selected, setSelected] = useState(services[0]);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState({
    location: "",
    service: serviceName || services[0],
  });

  const [selectedPlumber, setSelectedPlumber] = useState(null);

  const ddRef = useRef(null);

  const displayName = serviceName ? capitalize(serviceName) : "All Services";

  useEffect(() => {
    const handler = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = () => {
    const loc = location.trim().toLowerCase();
    const svc = selected;

    setLoading(true);
    setSearched(true);
    setSelectedPlumber(null);
    setQuery({ location: location.trim() || "Anywhere", service: svc });

    setTimeout(() => {
      const filtered = plumbers.filter((p) => {
        const matchLoc =
          !loc ||
          p.areas.some(
            (a) =>
              a.toLowerCase().includes(loc) || loc.includes(a.toLowerCase()),
          );
        const matchSvc = svc === "All Services" || p.service === svc;
        return matchLoc && matchSvc;
      });

      filtered.sort((a, b) => {
        if (a.available !== b.available) return a.available ? -1 : 1;
        return b.rating - a.rating;
      });

      setResults(filtered);
      setLoading(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 font-sans">
        {selectedPlumber && (
          <PlumberDetail
            plumber={selectedPlumber}
            onClose={() => setSelectedPlumber(null)}
          />
        )}

        <div className="max-w-6xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link className="hover:text-[#1E3A5F] cursor-pointer transition-colors">
              Home
            </Link>
            <span className="text-gray-300">›</span>
            <Link
              to="/services"
              className="hover:text-[#1E3A5F] cursor-pointer transition-colors"
            >
              Services
            </Link>
            <span className="text-gray-300">›</span>
            <span className="hover:text-[#1E3A5F] cursor-pointer transition-colors">
              {displayName}
            </span>
          </nav>
        </div>

        <section className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start gap-10">
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl font-extrabold text-[#1E3A5F] leading-tight">
                {displayName} <span className="text-[#FF4D7D]">Services</span>
              </h1>
              <p className="mt-4 text-lg text-gray-500 max-w-md leading-relaxed">
                Find professional plumbers for all your home and office plumbing
                needs. Fast, reliable &amp; affordable service near you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 bg-white shadow-lg rounded-2xl p-2 border border-gray-100 max-w-xl">
              <div className="flex item-center gap-2 flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-[#FF4D7D] transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-[#FF4D7D] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder-gray-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter location"
                />
                {location && (
                  <button
                    onClick={() => setLocation("")}
                    className="text-gray-300 hover:text-gray-500 transition-colors"
                    aria-label="Clear location"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="relative" ref={ddRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-[#FF4D7D] transition-colors whitespace-nowrap w-full sm:w-auto"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-[#FF4D7D] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <span className="flex-1 text-left">{selected}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {open && (
                  <ul
                    role="listbox"
                    className="absolute z-20 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden text-sm"
                  >
                    {services.map((s) => (
                      <li
                        key={s}
                        role="option"
                        aria-selected={selected === s}
                        onClick={() => {
                          setSelected(s);
                          setOpen(false);
                        }}
                        className={`px-4 py-2.5 cursor-pointer transition-colors hover:bg-blue-50 hover:text-blue-600 ${selected === s ? "bg-blue-50 text-[#1E3A5F] font-medium" : "text-gray-700"}`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-[#FF4D7D] hover:bg-[#ac143d] active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-red-200 flex items-center gap-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                Search
              </button>
            </div>

            <div className="flex flex-wrap gap-5 pt-2">
              {badges.map((b) => (
                <div key={b.label} className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#FF4D7D] flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    {b.icon}
                  </div>
                  <div className="text-xs leading-tight">
                    <div className="font-bold text-gray-800">{b.label}</div>
                    <div className="text-gray-400">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <ResultsPanel
              results={results}
              loading={loading}
              searched={searched}
              query={query}
              selectedId={selectedPlumber?.id}
              onSelect={setSelectedPlumber}
            />
          </div>

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

              {/* Rim overlay on top of tool handles */}
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
      </div>
    </div>
  );
}

export default PlumbingHero;
