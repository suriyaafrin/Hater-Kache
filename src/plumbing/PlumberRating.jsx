
function StarRating({ rating, size = "sm" }) {
  const full = Math?.floor(rating);
  const half = rating - full >= 0.5;
  const cls = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";

  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`${cls} fill-amber-400 text-amber-400`}
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
      {half && (
        <svg viewBox="0 0 24 24" className={`${cls} text-amber-400`}>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            stroke="currentColor"
            strokeWidth="0"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
      <span className={`ml-1 ${size === "lg" ? "text-sm" : "text-xs"} text-gray-500`}>
        {rating?.toFixed(1)}
      </span>
    </span>
  );
}

export default StarRating;
