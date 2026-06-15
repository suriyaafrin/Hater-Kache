import { LocationIcon, ToolIcon } from "../img_folder/img";
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
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
          isSelected
            ? "bg-[#FF4D7D] text-white"
            : "bg-pink-50 text-[#FF4D7D] group-hover:bg-pink-100"
        }`}
      >
        {plumber?.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1E3A5C] truncate">
          {plumber?.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
          <ToolIcon />
          {plumber?.service}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
          <LocationIcon />
          {plumber?.areas[0]}
          {plumber?.areas.length > 1 && (
            <span className="text-gray-300">
              +{plumber.areas.length - 1} more
            </span>
          )}
        </p>
      </div>

      <div className="shrink-0 text-right space-y-1">
        <p className="text-sm font-bold text-[#1E3A5C]">{plumber?.rate}</p>
        <StarRating rating={plumber?.rating} />
        <p className="text-xs text-[#1E3A5C]">{plumber?.reviews} reviews</p>
      </div>
      
      <div className="shrink-0">
        {plumber?.available ? (
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
