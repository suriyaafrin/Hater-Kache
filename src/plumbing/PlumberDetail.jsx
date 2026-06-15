import React, { useState } from "react";
import StarRating from "./PlumberRating";
import InfoRow from "./InfoRow";
import Bookingform from "./Bookingform";
import {
  AddressIcon,
  CalendarIcon,
  CallIcon,
  CloseIcons,
  EmailIcons,
  PhoneIcons,
  ServiceIcon,
  TaskIcon,
  VerifiedIcon,
} from "../img_folder/img";

function PlumberDetail({ plumber, onClose }) {
  const [showBooking, setShowBooking] = useState(false);

  if (!plumber) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm animate-[fadeIn_0.15s_ease]"
        onClick={onClose}
      >
        <div
          className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-linear-to-br from-[#FF4D7D] to-blue-800 px-6 pt-6 pb-10 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <CloseIcons />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#FF4D7D] flex items-center justify-center text-xl font-bold shadow-lg">
                {plumber.initials}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{plumber.name}</h2>
                <p className="text-blue-200 text-sm mt-0.5">
                  {plumber.service}
                </p>
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

            <div className="grid grid-cols-1 gap-3.5 pt-1">
              <InfoRow
                icon={<ServiceIcon />}
                label="Specialisation"
                value={plumber.service}
              />

              <InfoRow
                icon={<VerifiedIcon />}
                label="Experience"
                value={plumber.experience ?? "5+ years"}
              />

              <InfoRow
                icon={<PhoneIcons />}
                label="Phone"
                value={plumber.phone ?? "+1 (555) 000-0000"}
              />

              <InfoRow
                icon={<EmailIcons />}
                label="Email"
                value={
                  plumber.email ??
                  `${plumber.name?.split(" ")[0]?.toLowerCase() ?? "contact"}@haterkache.com`
                }
              />

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <AddressIcon />
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
                icon={<TaskIcon />}
                label="Jobs Completed"
                value={plumber.jobsCompleted ?? `${plumber.reviews * 3} jobs`}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-3 bg-[#1E3A5C] hover:bg-blue-900 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2">
                <CallIcon />
                Call Now
              </button>

              <button
                onClick={() => setShowBooking(true)}
                className="flex-1 py-3 bg-[#FF4D7D] hover:bg-[#8d2843] active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-red-200 flex items-center justify-center gap-2"
              >
                <CalendarIcon />
                Book
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <Bookingform
          plumber={plumber}
          onClose={() => setShowBooking(false)}
          onConfirm={() => {
            setShowBooking(false);
            onClose();
          }}
        />
      )}
    </>
  );
}

export default PlumberDetail;
