import React, { useState } from 'react'
import { quickLinks,popularServicess,forCustomers,forTechnicians,LinkColumn } from "../../Data/data.jsx";


function FooterMiddle() {
  const [email, setEmail] = useState("")

  return (
    <div className="bg-[#1E3A5F] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-[repeat(4,1fr)_220px] gap-2 px-6 py-8">

      <LinkColumn title="Quick Links" links={quickLinks} />
      <LinkColumn title="Popular Services" links={popularServicess} />
      <LinkColumn title="For Customers" links={forCustomers} />
      <LinkColumn title="For Technicians" links={forTechnicians} />

      {/* Newsletter */}
      <div className="col-span-2 sm:col-span-1 px-4 py-6">
        <h4 className="text-white text-sm font-semibold mb-5 tracking-wider uppercase">Newsletter</h4>
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
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default FooterMiddle