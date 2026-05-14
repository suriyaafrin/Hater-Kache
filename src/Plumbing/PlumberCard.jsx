import React from "react";
import StarRating from "./PlumberRating";

function PlumberCard({ plumber, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 bg-white border rounded-2xl px-4 py-3.5
hover:border-[#FF4D7D] hover:shadow-md hover:shadow-pink-50
transition-all duration-200 cursor-pointer group
${
  isSelected
    ? "border-[#FF4D7D] shadow-md shadow-pink-50 ring-1 ring-pink-200"
    : "border-gray-100"
}`}
    >
      {/* Avatar */}
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
          isSelected
            ? "bg-[#FF4D7D] text-white"
            : "bg-pink-50 text-[#FF4D7D] group-hover:bg-pink-100"
        }`}
      >
        {plumber.initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1E3A5C] truncate">
          {plumber.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {plumber.service}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 shrink-0"
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
          {plumber.areas[0]}
          {plumber.areas.length > 1 && (
            <span className="text-gray-300">
              +{plumber.areas.length - 1} more
            </span>
          )}
        </p>
      </div>

      {/* Rating + Rate */}
      <div className="shrink-0 text-right space-y-1">
        <p className="text-sm font-bold text-[#1E3A5C]">{plumber.rate}</p>
        <StarRating rating={plumber.rating} />
        <p className="text-xs text-[#1E3A5C]">{plumber.reviews} reviews</p>
      </div>

      {/* Availability */}
      <div className="shrink-0">
        {plumber.available ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-600 border border-green-100 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Now
          </span>
        ) : (
          <span className="inline-flex items-center text-xs font-medium bg-gray-50 text-gray-400 border border-gray-100 rounded-full px-2.5 py-1">
            Busy
          </span>
        )}
      </div>
    </div>
  );
}

export default PlumberCard;
