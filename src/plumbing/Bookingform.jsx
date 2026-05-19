import { useState } from "react";
import { timeOptions,requiredFields,fieldLabels,keyframeStyles } from "../../data/all-Data/PlumberData";

function BookingForm({ plumber, onClose, onConfirm }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    countryCode: "+880",
    address: "",
    date: "",
    time: "10:00 AM",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});

  const mock = plumber ?? {
    name: "Rahim Karim",
    service: "Pipe repair",
    rate: "$40/hr",
    initials: "RK",
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const descLen = form.description.length;

  function validate() {
    const newErrors = {};
    requiredFields.forEach((field) => {
      const val = form[field]?.trim?.() ?? form[field];
      if (!val) newErrors[field] = `${fieldLabels[field]} is required`;
    });
    if (form.phone && !/^\d{6,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const shakes = {};
      Object.keys(newErrors).forEach((k) => (shakes[k] = true));
      setShakeFields(shakes);
      setTimeout(() => setShakeFields({}), 500);
      return;
    }
    setSubmitted(true);
    onConfirm?.(form);
  }

  const missingCount = requiredFields.filter((f) => {
    const val = form[f]?.trim?.() ?? form[f];
    return !val;
  }).length;

  const shakeStyle = (field) =>
    shakeFields[field] ? { animation: "shake 0.45s ease" } : undefined;

  const slideUpStyle = { animation: "slideUp 0.2s ease" };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center gap-4 max-w-xs w-full mx-4 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1E3A5F]">
            Booking Confirmed!
          </h3>
          <p className="text-sm text-gray-500">
            Your booking with{" "}
            <span className="font-semibold text-[#FF4D7D]">{mock.name}</span>{" "}
            has been placed successfully.
          </p>
          <button
            onClick={onClose}
            className="mt-2 w-full py-3 bg-[#FF4D7D] text-white font-semibold rounded-xl text-sm hover:bg-[#e0365f] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{keyframeStyles}</style>

      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95dvh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <div className="px-5 pt-5 pb-3 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-[#FF4D7D] bg-pink-50 border border-pink-100 rounded-full px-2.5 py-0.5">
                Step 2
              </span>
              <h2 className="text-base font-bold text-[#1E3A5F]">
                Booking Details
              </h2>
              <button
                onClick={onClose}
                className="ml-auto w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Fill in the details to book your service
            </p>
          </div>

          <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
            {Object.keys(errors).length > 0 && (
              <div
                style={slideUpStyle}
                className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-2xl px-4 py-3"
              >
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-600">
                    Please fill in all required fields
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {Object.values(errors).map((msg, i) => (
                      <li key={i} className="text-xs text-red-400">
                        • {msg}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3">
              <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#FF4D7D] to-blue-700 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow">
                {mock.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E3A5F]">{mock.name}</p>
                <p className="text-xs text-gray-500">
                  {mock.rate} • {mock.service}
                </p>
              </div>
            </div>

            <div style={shakeStyle("fullName")}>
              <label className="block text-xs font-semibold text-[#1E3A5F] mb-1.5">
                Full name <span className="text-[#FF4D7D]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  placeholder="Your name"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-1 transition placeholder:text-gray-300 ${errors.fullName
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/40"
                      : "border-gray-200 focus:border-[#FF4D7D] focus:ring-pink-200"
                    }`}
                />
              </div>
              {errors.fullName && (
                <p
                  style={slideUpStyle}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
                  </svg>
                  {errors.fullName}
                </p>
              )}
            </div>

            <div style={shakeStyle("phone")}>
              <label className="block text-xs font-semibold text-[#1E3A5F] mb-1.5">
                Phone number <span className="text-[#FF4D7D]">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
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
                  </span>
                  <select
                    value={form.countryCode}
                    onChange={handleChange("countryCode")}
                    className="pl-8 pr-2 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4D7D] bg-white appearance-none cursor-pointer"
                  >
                    <option value="+880">+880</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                    <option value="+61">+61</option>
                  </select>
                </div>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  placeholder="Your phone number"
                  className={`flex-1 px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-1 transition placeholder:text-gray-300 ${errors.phone
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/40"
                      : "border-gray-200 focus:border-[#FF4D7D] focus:ring-pink-200"
                    }`}
                />
              </div>
              {errors.phone && (
                <p
                  style={slideUpStyle}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>


            <div style={shakeStyle("address")}>
              <label className="block text-xs font-semibold text-[#1E3A5F] mb-1.5">
                Address <span className="text-[#FF4D7D]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
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
                </span>
                <input
                  type="text"
                  value={form.address}
                  onChange={handleChange("address")}
                  placeholder="Street, area, city"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-1 transition placeholder:text-gray-300 ${errors.address
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/40"
                      : "border-gray-200 focus:border-[#FF4D7D] focus:ring-pink-200"
                    }`}
                />
              </div>
              {errors.address && (
                <p
                  style={slideUpStyle}
                  className="mt-1 text-xs text-red-400 flex items-center gap-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
                  </svg>
                  {errors.address}
                </p>
              )}
            </div>


            <div className="grid grid-cols-2 gap-3">
              <div style={shakeStyle("date")}>
                <label className="block text-xs font-semibold text-[#1E3A5F] mb-1.5">
                  Date <span className="text-[#FF4D7D]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="date"
                    value={form.date}
                    onChange={handleChange("date")}
                    className={`w-full pl-9 pr-2 py-2.5 text-xs border rounded-xl focus:outline-none focus:ring-1 transition text-gray-500 ${errors.date
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/40"
                        : "border-gray-200 focus:border-[#FF4D7D] focus:ring-pink-200"
                      }`}
                  />
                </div>
                {errors.date && (
                  <p style={slideUpStyle} className="mt-1 text-xs text-red-400">
                    Required
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1E3A5F] mb-1.5">
                  Time
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path
                        d="M12 7v5l3 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <select
                    value={form.time}
                    onChange={handleChange("time")}
                    className="w-full pl-9 pr-2 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4D7D] bg-white appearance-none cursor-pointer text-gray-600"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>


            <div>
              <label className="block text-xs font-semibold text-[#1E3A5F] mb-1.5">
                Problem description
              </label>
              <div className="relative">
                <textarea
                  value={form.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 150)
                      handleChange("description")(e);
                  }}
                  placeholder="Describe the issue..."
                  rows={3}
                  className="w-full px-3 pt-2.5 pb-6 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4D7D] focus:ring-1 focus:ring-pink-200 transition resize-none placeholder:text-gray-300"
                />
                <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                  {descLen}/150
                </span>
              </div>
            </div>
          </div>

          <div className="px-5 pb-6 pt-3 shrink-0 border-t border-gray-100">
            {missingCount > 0 && (
              <p className="text-center text-xs text-gray-400 mb-2">
                {missingCount} required field{missingCount > 1 ? "s" : ""} still
                empty
              </p>
            )}
            <button
              onClick={handleSubmit}
              className="w-full py-3.5 bg-[#FF4D7D] hover:bg-[#e0365f] active:scale-[0.98] text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-pink-200 flex items-center justify-center gap-2"
            >
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
              Confirm booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BookingForm;
