import FooterLower from "./FooterLower";
import FooterMiddle from "./FooterMiddle";

function Footer() {
  return (
    <>
      <div className="w-full px-16 py-5  border-t border-gray-100 bg-[#FFF1F5]">
        <div
          className="bg-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 px-8
      py-4 shadow-sm "
        >
          <div className="flex items-center gap-4">
            <div className="bg-rose-50 rounded-full p-3 shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M10 22c0-3.314 2.686-6 6-6s6 2.686 6 6"
                  stroke="#E8503A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="16"
                  cy="12"
                  r="3"
                  stroke="#E8503A"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 14s1-3 3-3"
                  stroke="#E8503A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M24 14s-1-3-3-3"
                  stroke="#E8503A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[#1E3A5F] text-base leading-snug">
                Need Help Finding a Technician?
              </p>
              <p className="text-[#1E3A5F] text-sm">
                Our support team is available 24/7 to help you
              </p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200" />
          <div className="flex items-center gap-3">
            <div className="bg-rose-50 rounded-full p-2.5 shrink-0">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="5"
                  width="18"
                  height="13"
                  rx="2"
                  stroke="#E8503A"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 7.5L10.106 12.664C10.6674 13.0124 11.3326 13.0124 11.894 12.664L20 7.5"
                  stroke="#E8503A"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-[#1E3A5F] text-xs font-medium tracking-wide">
                Email Us Anytime
              </p>
              <p className="text-[#1E3A5F] font-semibold text-base">
                support@example.com
              </p>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors
        text-white font-semibold text-sm px-6 py-3 rounded-xl
        flex items-center gap-2 whitespace-nowrap shrink-0">
            Contact Support
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <FooterMiddle />
      <FooterLower />
    </>
  );
}

export default Footer;
