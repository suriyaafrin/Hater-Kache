import { useEffect, useState } from "react";

function ComplaintModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    techName: "",
    service: "",
    complaint: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.complaint) return;
    setSubmitted(true);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-60 bg-black/45 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-70 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl pointer-events-auto">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#FFE8EF] text-[#FF4D7D] hover:bg-[#FFD6E0] transition-colors text-lg font-bold"
          >
            ×
          </button>

          <div className="p-8 pb-7">
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[#1E3A5C] mb-2">
                  Complaint Submitted!
                </h3>
                <p className="text-sm text-[#7a8fad]">
                  Thank you. Our team will review your complaint and get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-[#FF4D7D]/10 flex items-center justify-center mb-4">
                  <svg width="22" height="22" fill="none" stroke="#FF4D7D" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-[#1E3A5C] mb-1">
                  File a Complaint
                </h2>
                <p className="text-xs text-[#7a8fad] mb-6">
                  Had an issue with a technician? Let us know and we'll look into it.
                </p>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A5C] mb-1.5">
                      Your Name <span className="text-[#FF4D7D]">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahim Uddin"
                      className="w-full border border-[#e8edf5] rounded-xl px-3.5 py-2.5 text-sm text-[#1E3A5C] bg-[#f8f9fb] outline-none focus:border-[#FF4D7D] focus:ring-2 focus:ring-[#FF4D7D]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A5C] mb-1.5">
                      Technician Name
                    </label>
                    <input
                      name="techName"
                      value={form.techName}
                      onChange={handleChange}
                      placeholder="Who was the technician?"
                      className="w-full border border-[#e8edf5] rounded-xl px-3.5 py-2.5 text-sm text-[#1E3A5C] bg-[#f8f9fb] outline-none focus:border-[#FF4D7D] focus:ring-2 focus:ring-[#FF4D7D]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A5C] mb-1.5">
                      Service Category
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full border border-[#e8edf5] rounded-xl px-3.5 py-2.5 text-sm text-[#1E3A5C] bg-[#f8f9fb] outline-none focus:border-[#FF4D7D] focus:ring-2 focus:ring-[#FF4D7D]/10 transition-all"
                    >
                      <option value="">Select a service</option>
                      <option>Plumbing</option>
                      <option>Electrical</option>
                      <option>AC Repair</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A5C] mb-1.5">
                      Your Complaint <span className="text-[#FF4D7D]">*</span>
                    </label>
                    <textarea
                      name="complaint"
                      value={form.complaint}
                      onChange={handleChange}
                      placeholder="Describe what happened in detail..."
                      rows={4}
                      className="w-full border border-[#e8edf5] rounded-xl px-3.5 py-2.5 text-sm text-[#1E3A5C] bg-[#f8f9fb] outline-none focus:border-[#FF4D7D] focus:ring-2 focus:ring-[#FF4D7D]/10 transition-all resize-y"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.complaint}
                  className="mt-5 w-full py-3 bg-[#FF4D7D] text-white text-sm font-bold rounded-full hover:bg-[#e63d6d] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Complaint
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ComplaintModal;