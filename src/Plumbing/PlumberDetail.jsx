import React from 'react'
import StarRating from './PlumberRating'
import InfoRow from './InfoRow'
function PlumberDetail({ plumber, onClose }) {
  if (!plumber) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm animate-[fadeIn_0.15s_ease]"
      onClick={onClose}
    >
      
      <div
        className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden "
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="bg-linear-to-br from-[#FF4D7D] to-blue-800 px-6 pt-6 pb-10 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>


          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-[#FF4D7D] flex items-center justify-center text-xl font-bold shadow-lg">
              {plumber.initials}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{plumber.name}</h2>
              <p className="text-blue-200 text-sm mt-0.5">{plumber.service}</p>
              <div className="mt-1 flex items-center gap-2">
                <StarRating rating={plumber.rating} size="lg" />
                <span className="text-blue-200 text-xs">
                  ({plumber.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-5">
            {plumber.available ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-400/20 text-green-200 border border-green-400/30 rounded-full px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available Now
              </span>
            ) : (
              <span className="inline-flex items-center text-xs font-semibold bg-white/10 text-white/60 border border-white/20 rounded-full px-3 py-1">
                Currently Busy
              </span>
            )}
          </div>
        </div>

        <div className="px-6 pt-5 pb-6 space-y-4 -mt-4">
          <div className="bg-[#efabbd4e] border border-blue-100 rounded-2xl px-5 py-3.5 flex items-center justify-between">
            <span className="text-sm text-[#1E3A5F] font-medium">
              Hourly Rate
            </span>
            <span className="text-2xl font-extrabold text-[#39577e]">
              {plumber.rate}
            </span>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 gap-3.5 pt-1">
            <InfoRow
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-[#3a71b8]"
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
              }
              label="Specialisation"
              value={plumber.service}
            />

            <InfoRow
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="Experience"
              value={plumber.experience ?? "5+ years"}
            />

            <InfoRow
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="Phone"
              value={plumber.phone ?? "+1 (555) 000-0000"}
            />

            <InfoRow
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="Email"
              value={
                plumber.email ??
                `${plumber.name.split(" ")[0].toLowerCase()}@haterkache.com`
              }
            />

            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-blue-500"
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
              </div>
              <div>
                <p className="text-xs text-gray-400">Service Areas</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {plumber.areas.map((area) => (
                    <span
                      key={area}
                      className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <InfoRow
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="Jobs Completed"
              value={plumber.jobsCompleted ?? `${plumber.reviews * 3} jobs`}
            />
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-3 bg-[#1E3A5C] hover:bg-blue-900 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Call Now
            </button>
            <button className="flex-1 py-3 bg-[#FF4D7D] hover:bg-[#8d2843] active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-red-200 flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlumberDetail