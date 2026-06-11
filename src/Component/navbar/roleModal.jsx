import { CloseIcon } from "../../img_folder/img";

function RoleModal({ onClose, onSelect }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[#FFD6E0] transition-colors"
        >
          <CloseIcon />
        </button>

        <div className="mb-7 text-center">
          <h2 className="text-2xl font-extrabold text-[#1E3A5F]">
            Join as a Technician
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Already have an account or new here?
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSelect("signin")}
            className="group flex items-center gap-4 w-full px-5 py-4 border-2 border-[#FFD6E0]
                       rounded-2xl hover:border-[#FF4D7D] hover:bg-[#fff5f8] active:scale-95
                       transition-all text-left"
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FFD6E0]
                             group-hover:bg-[#FF4D7D] transition-colors shrink-0">
              <svg className="w-5 h-5 text-[#FF4D7D] group-hover:text-white transition-colors"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-bold text-[#1E3A5F]">Technician Sign In</p>
              <p className="text-xs text-gray-400 mt-0.5">Log in to your existing account</p>
            </div>
          </button>

          <button
            onClick={() => onSelect("signup")}
            className="group flex items-center gap-4 w-full px-5 py-4 border-2 border-[#FFD6E0]
                       rounded-2xl hover:border-[#FF4D7D] hover:bg-[#fff5f8] active:scale-95
                       transition-all text-left"
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FFD6E0]
                             group-hover:bg-[#FF4D7D] transition-colors shrink-0">
              <svg className="w-5 h-5 text-[#FF4D7D] group-hover:text-white transition-colors"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-bold text-[#1E3A5F]">Technician Sign Up</p>
              <p className="text-xs text-gray-400 mt-0.5">Create a new technician account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleModal;