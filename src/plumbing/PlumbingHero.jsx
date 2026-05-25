import { useEffect, useRef, useState } from "react";
import PlumberDetail from "./PlumberDetail.jsx";
import ResultsPanel from "./ResultsPanel.jsx";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  PinLocationIcon,
  SearchIcon,
  SearchOutlineIcon,
  SmallCloseIcon,
  ToolboxIllustration,
} from "../img_folder/img.jsx";
import { plumbersServices } from "../../data/serviceLists.js";
import { badges, plumbersWorkers } from "../../data/all-Data/Plumber.jsx";
import { ServiceDropdown } from "../pages/all-services/service-dropdown/index.jsx";
import { services } from "../../data/data.jsx";

const capitalize = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function PlumbingHero({ slug }) {
  const filteredServices = slug
    ? services.find((service) => service.slug === slug).slugData
    : services;
  const [selected, setSelected] = useState(plumbersServices[0]?.label);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState({
    location: "",
    service: slug || plumbersServices[0],
  });

  const [selectedPlumber, setSelectedPlumber] = useState(null);

  const ddRef = useRef(null);

  const displayName = slug ? capitalize(slug) : "All Services";

  useEffect(() => {
    const handler = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Core search logic — safe to call from button, Enter key, or dropdown
  const runSearch = (svc = selected) => {
    const loc = location.trim().toLowerCase();

    setLoading(true);
    setSearched(true);
    setSelectedPlumber(null);
    setQuery({ location: location.trim() || "Anywhere", service: svc });

    setTimeout(() => {
      const filtered = plumbersWorkers.filter((p) => {
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

  // Called only from the dropdown — receives a string value directly
  const handleServiceChange = (value) => {
    setSelected(value);
    runSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
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
                <PinLocationIcon />
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
                    <SmallCloseIcon />
                  </button>
                )}
              </div>

              <div className="flex item-center gap-2 flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-[#FF4D7D] transition-colors">
                {" "}
                <SearchIcon />
                <ServiceDropdown
                  dropDownData={filteredServices.serviceList}
                  onChange={handleServiceChange}
                  value={selected}
                />
              </div>

              <button
                onClick={() => runSearch()}
                className="px-6 py-2.5 bg-[#FF4D7D] hover:bg-[#ac143d] active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-red-200 flex items-center gap-2"
              >
                <SearchOutlineIcon />
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
            <ToolboxIllustration />
          </div>
        </section>
      </div>
    </div>
    
  );
}

export default PlumbingHero;