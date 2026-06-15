import { useState } from "react";
import { CloseIcon } from "../../img_folder/img";
import UpSuccessModal from "./upSuccessModal";


function TechSignUpModal({ onClose, onBack }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", password: "", specialty: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ← only addition

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true); 
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onBack}
            className="absolute top-4 left-4 p-1.5 rounded-lg hover:bg-[#FFD6E0] transition-colors">
            <svg className="w-5 h-5 text-[#1E3A5F]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[#FFD6E0] transition-colors">
            <CloseIcon />
          </button>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-extrabold text-[#1E3A5F]">Technician Sign Up</h2>
            <p className="text-sm text-gray-500 mt-1">Create your technician account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Rahim Uddin" },
              { label: "Phone Number", name: "phone", type: "tel", placeholder: "01XXXXXXXXX" },
              { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type={type} name={name} value={form[name]}
                  onChange={handleChange} placeholder={placeholder} required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#FFD6E0] text-sm text-[#1E3A5F]
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4D7D]/40
                             focus:border-[#FF4D7D] transition"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">
                Specialty
              </label>
              <select name="specialty" value={form.specialty} onChange={handleChange} required
                className="w-full px-4 py-2.5 rounded-xl border border-[#FFD6E0] text-sm text-[#1E3A5F]
                           focus:outline-none focus:ring-2 focus:ring-[#FF4D7D]/40 focus:border-[#FF4D7D]
                           transition bg-white">
                <option value="" disabled>Select your service</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="ac-repair">AC Repair</option>
                <option value="carpentry">Carpentry</option>
                <option value="cleaning">Cleaning</option>
                <option value="painting">Painting</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••" required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#FFD6E0] text-sm text-[#1E3A5F]
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4D7D]/40
                             focus:border-[#FF4D7D] transition pr-11"
                />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF4D7D] text-xs font-semibold transition">
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit"
              className="mt-2 w-full py-3 bg-[#FF4D7D] text-white text-sm font-bold rounded-full
                         hover:bg-[#e63d6d] active:scale-95 transition-all">
              Create Account
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-5">
            Already have an account?{" "}
            <span onClick={() => onBack("signin")}
              className="text-[#FF4D7D] font-bold cursor-pointer hover:underline">
              Sign In instead
            </span>
          </p>
        </div>
      </div>

      {showSuccess && <UpSuccessModal onClose={onClose} />}
    </>
  );
}

export default TechSignUpModal;