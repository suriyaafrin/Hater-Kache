import React, { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Home", href: "#", active: true },
    { label: "Location", href: "#location" },
    { label: "Services", href: "#services" },
    { label: "Review", href: "#review" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b border-[#FFD6E0] transition-all duration-300 ${
          scrolled ? "bg-[#f8f9fb]/90 backdrop-blur-md" : "bg-[#f8f9fb]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <a href="#" aria-label="Go to homepage">
            <img src="/Web_Logo.png" alt="Company logo" className="h-12 w-auto" />
          </a>

      
          <ul className="hidden md:flex items-center gap-9 list-none m-0 p-0">
            {navLinks.map(({ label, href, active }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`text-lg font-bold tracking-wide no-underline pb-0.5 border-b-2 transition-colors duration-200 ${
                    active
                      ? "text-[#FF4D7D] border-[#FF4D7D]"
                      : "text-[#1E3A5F] border-transparent hover:text-[#FF4D7D] hover:border-[#FF4D7D]"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

      
          <button className="hidden md:block text-xs font-bold tracking-wide px-5 py-2.5 bg-[#FF4D7D] text-white rounded-full hover:bg-[#e63d6d] active:scale-95 transition-all duration-200">
            Get in touch
          </button>

    
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            className="flex md:hidden items-center justify-center p-2 rounded-lg text-[#12122a] hover:bg-[#FFD6E0] transition-colors duration-200"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      <aside
        id="mobile-drawer"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#f8f9fb] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#FFD6E0]">
          <a href="#" aria-label="Go to homepage" onClick={() => setMenuOpen(false)}>
            <img src="/Web_Logo.png" alt="Company logo" className="h-10 w-auto" />
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-lg text-[#12122a] hover:bg-[#FFD6E0] transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="list-none m-0 px-6 py-4 flex flex-col flex-1">
          {navLinks.map(({ label, href, active }) => (
            <li key={label} className="border-b border-[#FFD6E0]">
              <a
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 py-4 text-sm font-semibold tracking-wide no-underline transition-colors duration-200 ${
                  active
                    ? "text-[#FF4D7D]"
                    : "text-[#12122a] hover:text-[#FF4D7D]"
                }`}
              >
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D7D] inline-block" />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="w-full py-3 bg-[#FF4D7D] text-white text-sm font-bold rounded-full hover:bg-[#e63d6d] active:scale-95 transition-all duration-200 tracking-wide"
          >
            Get in touch
          </button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;