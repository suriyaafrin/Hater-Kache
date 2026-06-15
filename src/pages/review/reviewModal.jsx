import { useState } from "react";
import { tagColors } from "../../../data/reviewData";
import StarPicker from "./starPicker";

function WriteReviewModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    service: "",
    rating: 0,
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.service) e.service = "Please select a service.";
    if (!form.rating) e.rating = "Please select a rating.";
    if (!form.comment.trim()) e.comment = "Please write a comment.";
    return e;
  };
  const SERVICE_OPTIONS = Object.keys(tagColors);
  

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    onSubmit({
      id: Date.now(),
      name: form.name.trim(),
      service: form.service,
      rating: form.rating,
      comment: form.comment.trim(),
      date: dateStr,
    });

    setSubmitted(true);
    setTimeout(onClose, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1E3A5F]">Write a Review</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Share your experience with us
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-3xl">
              🎉
            </div>
            <p className="text-[#1E3A5F] font-semibold text-base">
              Thank you for your review!
            </p>
            <p className="text-xs text-gray-400">
              Your feedback has been submitted.
            </p>
          </div>
        ) : (
          <div className="px-6 py-5 flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1E3A5F] block mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Khan"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                className={`w-full text-sm border rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#FF4D7D]/30 focus:border-[#FF4D7D] transition-all text-gray-700 placeholder-gray-300 ${errors.name ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1E3A5F] block mb-1">
                Service
              </label>
              <select
                value={form.service}
                onChange={(e) => {
                  setForm({ ...form, service: e.target.value });
                  setErrors({ ...errors, service: "" });
                }}
                className={`w-full text-sm border rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#FF4D7D]/30 focus:border-[#FF4D7D] transition-all text-gray-700 bg-white ${errors.service ? "border-red-400" : "border-gray-200"}`}
              >
                <option value="">Select a service…</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-xs text-red-400 mt-1">{errors.service}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1E3A5F] block mb-1.5">
                Rating
              </label>
              <StarPicker
                value={form.rating}
                onChange={(v) => {
                  setForm({ ...form, rating: v });
                  setErrors({ ...errors, rating: "" });
                }}
              />
              {errors.rating && (
                <p className="text-xs text-red-400 mt-1">{errors.rating}</p>
              )}
            </div>

           
            <div>
              <label className="text-xs font-semibold text-[#1E3A5F] block mb-1">
                Your Review
              </label>
              <textarea
                rows={3}
                placeholder="What did you think about our service?"
                value={form.comment}
                onChange={(e) => {
                  setForm({ ...form, comment: e.target.value });
                  setErrors({ ...errors, comment: "" });
                }}
                className={`w-full text-sm border rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#FF4D7D]/30 focus:border-[#FF4D7D] transition-all text-gray-700 placeholder-gray-300 resize-none ${errors.comment ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.comment && (
                <p className="text-xs text-red-400 mt-1">{errors.comment}</p>
              )}
            </div>

            
            <div className="flex gap-2 pt-1">
              <button
                onClick={onClose}
                className="flex-1 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 bg-[#FF4D7D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#e6446f] transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WriteReviewModal;
