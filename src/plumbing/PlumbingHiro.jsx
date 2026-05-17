import { useEffect, useRef, useState } from "react";
import { badges, plumbers, services } from "../../data/PlumberData.jsx";
import PlumberDetail from "./PlumberDetail.jsx";
import ResultsPanel from "./ResultsPanel.jsx";
import { Link } from "react-router-dom";


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
  const [query, setQuery] = useState({ location: "", service: serviceName || services[0] });

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
            <Link to="/services" className="hover:text-[#1E3A5F] cursor-pointer transition-colors">
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
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FF4D7D] shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder-gray-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter location"
                />
                {location && (
                  <button onClick={() => setLocation("")} className="text-gray-300 hover:text-gray-500 transition-colors" aria-label="Clear location">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
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
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FF4D7D] shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <span className="flex-1 text-left">{selected}</span>
                  <svg viewBox="0 0 24 24" className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open && (
                  <ul role="listbox" className="absolute z-20 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden text-sm">
                    {services.map((s) => (
                      <li
                        key={s}
                        role="option"
                        aria-selected={selected === s}
                        onClick={() => { setSelected(s); setOpen(false); }}
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
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
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
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-red-50 to-blue-50 scale-90 opacity-80" />
            <svg viewBox="0 0 260 260" className="relative z-10 w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
              <rect x="55" y="145" width="150" height="85" rx="10" fill="#1e3a5f" />
              <rect x="55" y="145" width="150" height="18" rx="4" fill="#16304f" />
              <rect x="100" y="135" width="60" height="20" rx="6" fill="#1e3a5f" />
              <rect x="148" y="68" width="14" height="90" rx="7" fill="#e53e3e" transform="rotate(12 148 68)" />
              <circle cx="160" cy="72" r="10" fill="none" stroke="#e53e3e" strokeWidth="5" />
              <rect x="95" y="55" width="12" height="95" rx="6" fill="#718096" transform="rotate(-8 95 55)" />
              <circle cx="90" cy="62" r="9" fill="none" stroke="#718096" strokeWidth="5" />
              <rect x="62" y="210" width="35" height="14" rx="4" fill="#a0aec0" />
              <rect x="72" y="204" width="16" height="10" rx="3" fill="#cbd5e0" />
              <rect x="160" y="212" width="35" height="12" rx="4" fill="#a0aec0" />
              <rect x="168" y="206" width="16" height="10" rx="3" fill="#cbd5e0" />
              <rect x="108" y="40" width="18" height="50" rx="4" fill="#a0aec0" />
              <rect x="88" y="38" width="58" height="14" rx="5" fill="#718096" />
              <rect x="88" y="30" width="10" height="14" rx="3" fill="#718096" />
              <rect x="136" y="30" width="10" height="14" rx="3" fill="#718096" />
              <ellipse cx="117" cy="104" rx="6" ry="9" fill="#4299e1" opacity="0.85" />
              <polygon points="117,92 111,104 123,104" fill="#4299e1" opacity="0.85" />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PlumbingHero;