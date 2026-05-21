import { useState } from "react";
import { SendIcon } from "../../img_folder/img";

const bottomLinks = ["Privacy Policy", "Terms & Conditions", "Refund Policy"]
const quickLinks = ["Home", "Services", "Technicians", "How It Works", "About Us", "Blog", "Contact Us"]
const popularServicess = ["Plumbing", "Electrical", "Appliance Repair", "Painting", "Carpentry", "AC Repair", "Window Cleaning"]
const forCustomers = ["How It Works", "Book a Service", "Track Your Booking", "Service Areas", "Pricing", "FAQs", "Support"]
const forTechnicians = ["Become a Technician", "Technician Login", "How It Works", "Earnings", "Resources", "Help Center"]
const LinkColumn = ({ title, links }) => (
  <div className="px-4 py-6 ">
    <h4 className="text-white text-sm font-semibold mb-5 tracking-wider uppercase">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-slate-400 text-[13px] leading-relaxed hover:text-pink-400 transition-colors duration-150 block py-0.5"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
function FooterMiddle() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-[#1E3A5F] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-[repeat(4,1fr)_220px] gap-2 px-6 py-8">
      <LinkColumn title="Quick Links" links={quickLinks} />
      <LinkColumn title="Popular Services" links={popularServicess} />
      <LinkColumn title="For Customers" links={forCustomers} />
      <LinkColumn title="For Technicians" links={forTechnicians} />
      

      <div className="col-span-2 sm:col-span-1 px-4 py-6">
        <h4 className="text-white text-sm font-semibold mb-5 tracking-wider uppercase">
          Newsletter
        </h4>
        <p className="text-slate-500 text-[12.5px] leading-relaxed mb-5">
          Subscribe to get updates, offers and tips.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-3.5 py-2.5 text-[12.5px] text-slate-300 placeholder-slate-600 outline-none focus:border-pink-400 transition-colors mb-3"
        />
        <button className="w-full bg-[#FF4D7D] hover:bg-pink-600 active:scale-[0.98] transition-all text-white text-[12.5px] font-semibold py-2.5 px-4 rounded-md flex items-center justify-center gap-2">
          <span>Subscribe</span>
          <SendIcon/>
        </button>
      </div>
    </div>
  );
}

export default FooterMiddle;
