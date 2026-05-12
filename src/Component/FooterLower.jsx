import React from 'react'
import { ShieldIcon, LockIcon, CheckCircleIcon, trustItems, socials, payments, bottomLinks} from "../../Data/data.jsx";


function FooterLower() {
  return (
    <div className="bg-[#0f1628] text-[#c8cfe0]">

      {/* Trust bar */}
      <div className="max-w-7xl mx-auto px-8 py-7 border-t border-[#1e2d4a] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          {trustItems.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 max-w-55 ">
              <div className="w-10.5 h-10.5 rounded-full border border-[#e8503a] flex items-center justify-center shrink-0">
                {icon}
              </div>
              <div>
                <h5 className="text-white text-[13px] font-semibold mb-1">{title}</h5>
                <p className="text-[#8a96b0] text-[12px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex gap-2 shrink-0">
          {socials.map(({ label, bg, content }) => (
            <a
              key={label}
              href="#"
              title={label}
              className={`w-8.5 h-8.5 rounded-full flex items-center justify-center ${bg} hover:opacity-90 transition-opacity`}
            >
              {content}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-8 border-t border-[#1e2d4a]">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-3 flex-wrap">

          <p className="text-[#8a96b0] text-[12px]">
            © 2024 Fixora. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {bottomLinks.map((link, i) => (
              <React.Fragment key={link}>
                <a href="#" className="text-[#8a96b0] text-[12px] hover:text-white transition-colors">
                  {link}
                </a>
                {i < bottomLinks.length - 1 && (
                  <span className="text-[#2a3555]">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#8a96b0] text-[12px]">We accept:</span>
            <div className="flex gap-1.5">
              {payments.map(({ label, color }) => (
                <span
                  key={label}
                  className={`bg-white rounded px-1.5 py-0.5 text-[10px] font-bold ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default FooterLower