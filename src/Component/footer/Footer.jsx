import {PersonIcon, EmailIcon ,ArrowIcon} from "../../img_folder/img";
import FooterLower from "./FooterLower";
import FooterMiddle from "./FooterMiddle";

function Footer() {
  return (
    <>
      <div className="w-full px-16 py-5 border-t border-gray-100 bg-[#FFF1F5]">
        <div className="bg-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-4 shadow-sm">

          
          <div className="flex items-center gap-4">
            <div className="bg-rose-50 rounded-full p-3 shrink-0">
              <PersonIcon /> {/* ✅ imported from img_folder/img.jsx */}
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
              <EmailIcon />
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

          
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap shrink-0">
            Contact Support
            <ArrowIcon /> 
          </button>

        </div>
      </div>
      <FooterMiddle />
      <FooterLower />
    </>
  );
}

export default Footer;