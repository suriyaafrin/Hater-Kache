function UpSuccessModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="relative flex items-center justify-center mb-5">
          <span className="absolute w-20 h-20 rounded-full bg-[#FFD6E0] animate-ping opacity-30" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4D7D]">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-[#1E3A5F]">Account Created!</h2>
        <p className="text-sm text-gray-500 mt-2">
          Your technician account has been successfully created.
        </p>

        <button
          onClick={onClose}
          className="mt-7 w-full py-3 bg-[#FF4D7D] text-white text-sm font-bold rounded-full
                     hover:bg-[#e63d6d] active:scale-95 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
export default UpSuccessModal;
