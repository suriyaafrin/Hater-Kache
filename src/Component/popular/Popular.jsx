import { useEffect, useRef, useState } from "react";
import { services } from "../../../data/data";
import { useNavigate } from "react-router-dom";

const CARD_WIDTH = 132;
const VISIBLE = 4;

function Popular({ serviceList = [], technicians = [] }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const maxIndex = services.length - VISIBLE;

  const scroll = (dir) => {
    setCurrent((prev) => {
      const next = prev + dir * VISIBLE;
      if (next > maxIndex) return 0;
      if (next < 0) return maxIndex;
      return next;
    });
  };

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${current * CARD_WIDTH}px)`;
    }
  }, [current]);

  const activePage = Math.floor(current / VISIBLE);
  const totalPages = Math.ceil(services.length / VISIBLE);

  return (
    <div className="max-w-6xl mx-auto px-6 py-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-xl text-[#1E3A5F]">
          Popular Services
        </h1>

        <div className="flex  gap-5">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-lg border font-bold flex items-center justify-center hover:bg-gray-100 hover:text-black cursor-pointer border-gray-300 bg-[#FF4D7D] text-white"
          >
            ‹
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-lg border font-bold flex items-center justify-center hover:bg-gray-100 hover:text-black cursor-pointer border-gray-300 bg-[#FF4D7D] text-white"
          >
            ›
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-3 transition-transform duration-300 ease-in-out"
        >
          {services.map((service) => (
            <div
              key={service.label}
              className="flex-none w-50 flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-[#FFF1F5] border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer"
              onClick={() => navigate(`/services/${service.label.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <div
                className={`w-13 h-13 rounded-full flex items-center justify-center ${service.bg}`}
              >
                <span className={service.iconColor}>{service.icon}</span>
              </div>
              <p className="font-semibold text-sm text-[#1E3A5F] leading-snug">
                {service.label}
              </p>
              {service.description && (
                <p className="text-xs text-gray-400 leading-snug">
                  {service.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>


      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(Math.min(i * VISIBLE, maxIndex))}
            className="h-1.5 rounded-full transition-all duration-200"
            style={{
              width: i === activePage ? "18px" : "6px",
              background: i === activePage ? "#1E3A5F" : "#d1d5db",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
