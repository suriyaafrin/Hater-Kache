// src/img_folder/img.jsx

export function PersonIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M10 22c0-3.314 2.686-6 6-6s6 2.686 6 6"
        stroke="#E8503A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="12" r="3" stroke="#E8503A" strokeWidth="1.8" />
      <path d="M8 14s1-3 3-3" stroke="#E8503A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 14s-1-3-3-3" stroke="#E8503A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="18" height="13" rx="2" stroke="#E8503A" strokeWidth="1.7" strokeLinejoin="round" />
      <path
        d="M2 7.5L10.106 12.664C10.6674 13.0124 11.3326 13.0124 11.894 12.664L20 7.5"
        stroke="#E8503A" strokeWidth="1.7" strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

export function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function MenuCloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#FF4D7D" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToolboxIcon() {
  return (
    <svg viewBox="0 0 260 260" className="relative z-10 w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="130" cy="175" rx="110" ry="90" fill="#fce4ec" opacity="0.5" />
      <g fill="#f48fb1" opacity="0.55">
        <circle cx="220" cy="60" r="3" /><circle cx="231" cy="60" r="3" /><circle cx="242" cy="60" r="3" />
        <circle cx="220" cy="71" r="3" /><circle cx="231" cy="71" r="3" /><circle cx="242" cy="71" r="3" />
        <circle cx="220" cy="82" r="3" /><circle cx="231" cy="82" r="3" /><circle cx="242" cy="82" r="3" />
      </g>
      <g fill="#f48fb1" opacity="0.35">
        <circle cx="18" cy="160" r="2.5" /><circle cx="27" cy="160" r="2.5" /><circle cx="36" cy="160" r="2.5" />
        <circle cx="18" cy="169" r="2.5" /><circle cx="27" cy="169" r="2.5" /><circle cx="36" cy="169" r="2.5" />
      </g>
      <rect x="55" y="145" width="150" height="88" rx="10" fill="#f0f0f0" stroke="#d8d8d8" strokeWidth="1" />
      <rect x="55" y="145" width="150" height="14" rx="4" fill="#e0e0e0" />
      <rect x="55" y="220" width="150" height="13" rx="0" fill="#e4e4e4" opacity="0.6" />
      <rect x="48" y="136" width="164" height="18" rx="8" fill="#e0e0e0" stroke="#d0d0d0" strokeWidth="0.8" />
      <path d="M108 136 Q130 112 152 136" fill="none" stroke="#cccccc" strokeWidth="7" strokeLinecap="round" />
      <path d="M108 136 Q130 114 152 136" fill="none" stroke="#ececec" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="68" y="226" width="22" height="7" rx="3.5" fill="#c8c8c8" />
      <rect x="170" y="226" width="22" height="7" rx="3.5" fill="#c8c8c8" />
      <g transform="translate(90 105) rotate(-18)">
        <rect x="-5" y="0" width="10" height="70" rx="5" fill="#9e9e9e" />
        <rect x="-3.5" y="0" width="7" height="70" rx="3.5" fill="#bdbdbd" />
        <ellipse cx="0" cy="-5" rx="10" ry="9" fill="#9e9e9e" />
        <ellipse cx="0" cy="-5" rx="7" ry="6" fill="#bdbdbd" />
        <rect x="-4" y="-11" width="8" height="7" rx="2" fill="#9e9e9e" />
        <ellipse cx="0" cy="70" rx="8" ry="6" fill="#9e9e9e" />
        <rect x="-3" y="65" width="6" height="7" rx="1.5" fill="#9e9e9e" />
      </g>
      <g transform="translate(108 100) rotate(5)">
        <rect x="-4.5" y="0" width="9" height="68" rx="4.5" fill="#8d8d8d" />
        <rect x="-3" y="0" width="6" height="68" rx="3" fill="#adadad" />
        <ellipse cx="0" cy="-4" rx="9" ry="8" fill="#8d8d8d" />
        <ellipse cx="0" cy="-4" rx="6" ry="5.5" fill="#adadad" />
        <rect x="-3.5" y="-10" width="7" height="7" rx="2" fill="#8d8d8d" />
        <ellipse cx="0" cy="68" rx="7" ry="5" fill="#8d8d8d" />
      </g>
      <g transform="translate(133 96) rotate(8)">
        <rect x="-7" y="0" width="14" height="36" rx="6" fill="#e91e8c" />
        <rect x="-5" y="0" width="10" height="36" rx="5" fill="#f06292" />
        <rect x="-7" y="10" width="14" height="3" rx="1.5" fill="#c2185b" opacity="0.5" />
        <rect x="-7" y="19" width="14" height="3" rx="1.5" fill="#c2185b" opacity="0.5" />
        <rect x="-7" y="28" width="14" height="3" rx="1.5" fill="#c2185b" opacity="0.5" />
        <rect x="-5.5" y="33" width="11" height="7" rx="2" fill="#9e9e9e" />
        <rect x="-2.5" y="39" width="5" height="52" rx="2" fill="#bdbdbd" />
        <rect x="-1.5" y="39" width="3" height="52" rx="1.5" fill="#d8d8d8" />
        <polygon points="-3,91 3,91 1.5,100 -1.5,100" fill="#757575" />
      </g>
      <g transform="translate(160 90) rotate(12)">
        <rect x="-10" y="32" width="9" height="52" rx="4" fill="#e91e8c" />
        <rect x="-8" y="32" width="5" height="52" rx="3" fill="#f06292" />
        <rect x="1" y="32" width="9" height="52" rx="4" fill="#e91e8c" />
        <rect x="3" y="32" width="5" height="52" rx="3" fill="#f06292" />
        <circle cx="0" cy="38" r="5" fill="#757575" />
        <circle cx="0" cy="38" r="3" fill="#9e9e9e" />
        <path d="M-10 38 Q-16 16 -11 0 Q-7 -8 -3 0 Q-6 16 -1.5 38Z" fill="#424242" />
        <path d="M-9 38 Q-14 17 -10 2 Q-7 -4 -4 1 Q-6 17 -2 38Z" fill="#616161" />
        <path d="M10 38 Q16 16 11 0 Q7 -8 3 0 Q6 16 1.5 38Z" fill="#424242" />
        <path d="M9 38 Q14 17 10 2 Q7 -4 4 1 Q6 17 2 38Z" fill="#616161" />
      </g>
      <g transform="translate(188 105) rotate(15)">
        <rect x="-6.5" y="0" width="13" height="34" rx="5.5" fill="#1565c0" />
        <rect x="-4.5" y="0" width="9" height="34" rx="4.5" fill="#1e88e5" />
        <rect x="-6.5" y="9" width="13" height="2.5" rx="1.5" fill="#0d47a1" opacity="0.5" />
        <rect x="-6.5" y="17" width="13" height="2.5" rx="1.5" fill="#0d47a1" opacity="0.5" />
        <rect x="-6.5" y="25" width="13" height="2.5" rx="1.5" fill="#0d47a1" opacity="0.5" />
        <rect x="-5" y="31" width="10" height="6" rx="2" fill="#9e9e9e" />
        <rect x="-2.5" y="36" width="5" height="50" rx="2" fill="#bdbdbd" />
        <rect x="-1.5" y="36" width="3" height="50" rx="1.5" fill="#d8d8d8" />
        <rect x="-2.5" y="84" width="5" height="3" fill="#757575" />
        <rect x="-1" y="82" width="2" height="6" fill="#757575" />
      </g>
      <rect x="48" y="136" width="164" height="10" rx="5" fill="#e0e0e0" stroke="#d0d0d0" strokeWidth="0.5" />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FF4D7D] shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83
           2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33
           1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09
           A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06
           a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06
           A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3
           a2 2 0 010-4h.09A1.65 1.65 0 004.6 9
           a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83
           2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68
           a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09
           a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06
           a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06
           A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21
           a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0 C13.4 0 0 13.4 0 30 C0 52.5 30 80 30 80 C30 80 60 52.5 60 30 C60 13.4 46.6 0 30 0 Z" fill="#FF4D7D" />
      <circle cx="30" cy="30" r="10" fill="white" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

export function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
    </svg>
  );
}


export function UserInputIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="9" />

      <path
        d="M12 7v5l3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ToolIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function CloseIcons() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function ServiceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-[#3a71b8]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function VerifiedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function PhoneIcons() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function EmailIcons() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function AddressIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function TaskIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function CallIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function PinLocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-[#FF4D7D] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function SmallCloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function ChevronDownIcon({ open = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M19 9l-7 7-7-7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function SearchOutlineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <circle cx="11" cy="11" r="8" />

      <path
        d="M21 21l-4.35-4.35"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function ToolboxIllustration() {
  return (
    <svg
      viewBox="0 0 260 260"
      className="relative z-10 w-full h-full drop-shadow-xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background glow */}
      <ellipse
        cx="130"
        cy="175"
        rx="110"
        ry="90"
        fill="#fce4ec"
        opacity="0.5"
      />

      {/* Decorative dots */}
      <g fill="#f48fb1" opacity="0.55">
        <circle cx="220" cy="60" r="3" />
        <circle cx="231" cy="60" r="3" />
        <circle cx="242" cy="60" r="3" />
        <circle cx="220" cy="71" r="3" />
        <circle cx="231" cy="71" r="3" />
        <circle cx="242" cy="71" r="3" />
        <circle cx="220" cy="82" r="3" />
        <circle cx="231" cy="82" r="3" />
        <circle cx="242" cy="82" r="3" />
      </g>

      <g fill="#f48fb1" opacity="0.35">
        <circle cx="18" cy="160" r="2.5" />
        <circle cx="27" cy="160" r="2.5" />
        <circle cx="36" cy="160" r="2.5" />
        <circle cx="18" cy="169" r="2.5" />
        <circle cx="27" cy="169" r="2.5" />
        <circle cx="36" cy="169" r="2.5" />
      </g>

      {/* Box body */}
      <rect
        x="55"
        y="145"
        width="150"
        height="88"
        rx="10"
        fill="#f0f0f0"
        stroke="#d8d8d8"
        strokeWidth="1"
      />

      <rect
        x="55"
        y="145"
        width="150"
        height="14"
        rx="4"
        fill="#e0e0e0"
      />

      <rect
        x="55"
        y="220"
        width="150"
        height="13"
        rx="0"
        fill="#e4e4e4"
        opacity="0.6"
      />

      {/* Box rim */}
      <rect
        x="48"
        y="136"
        width="164"
        height="18"
        rx="8"
        fill="#e0e0e0"
        stroke="#d0d0d0"
        strokeWidth="0.8"
      />

      {/* Handle */}
      <path
        d="M108 136 Q130 112 152 136"
        fill="none"
        stroke="#cccccc"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <path
        d="M108 136 Q130 114 152 136"
        fill="none"
        stroke="#ececec"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Feet */}
      <rect
        x="68"
        y="226"
        width="22"
        height="7"
        rx="3.5"
        fill="#c8c8c8"
      />

      <rect
        x="170"
        y="226"
        width="22"
        height="7"
        rx="3.5"
        fill="#c8c8c8"
      />

      {/* Wrench 1 */}
      <g transform="translate(90 105) rotate(-18)">
        <rect
          x="-5"
          y="0"
          width="10"
          height="70"
          rx="5"
          fill="#9e9e9e"
        />

        <rect
          x="-3.5"
          y="0"
          width="7"
          height="70"
          rx="3.5"
          fill="#bdbdbd"
        />

        <ellipse cx="0" cy="-5" rx="10" ry="9" fill="#9e9e9e" />
        <ellipse cx="0" cy="-5" rx="7" ry="6" fill="#bdbdbd" />

        <rect
          x="-4"
          y="-11"
          width="8"
          height="7"
          rx="2"
          fill="#9e9e9e"
        />

        <ellipse cx="0" cy="70" rx="8" ry="6" fill="#9e9e9e" />

        <rect
          x="-3"
          y="65"
          width="6"
          height="7"
          rx="1.5"
          fill="#9e9e9e"
        />
      </g>

      {/* Wrench 2 */}
      <g transform="translate(108 100) rotate(5)">
        <rect
          x="-4.5"
          y="0"
          width="9"
          height="68"
          rx="4.5"
          fill="#8d8d8d"
        />

        <rect
          x="-3"
          y="0"
          width="6"
          height="68"
          rx="3"
          fill="#adadad"
        />

        <ellipse cx="0" cy="-4" rx="9" ry="8" fill="#8d8d8d" />
        <ellipse cx="0" cy="-4" rx="6" ry="5.5" fill="#adadad" />

        <rect
          x="-3.5"
          y="-10"
          width="7"
          height="7"
          rx="2"
          fill="#8d8d8d"
        />

        <ellipse cx="0" cy="68" rx="7" ry="5" fill="#8d8d8d" />
      </g>

      {/* Pink screwdriver */}
      <g transform="translate(133 96) rotate(8)">
        <rect
          x="-7"
          y="0"
          width="14"
          height="36"
          rx="6"
          fill="#e91e8c"
        />

        <rect
          x="-5"
          y="0"
          width="10"
          height="36"
          rx="5"
          fill="#f06292"
        />

        <rect
          x="-7"
          y="10"
          width="14"
          height="3"
          rx="1.5"
          fill="#c2185b"
          opacity="0.5"
        />

        <rect
          x="-7"
          y="19"
          width="14"
          height="3"
          rx="1.5"
          fill="#c2185b"
          opacity="0.5"
        />

        <rect
          x="-7"
          y="28"
          width="14"
          height="3"
          rx="1.5"
          fill="#c2185b"
          opacity="0.5"
        />

        <rect
          x="-5.5"
          y="33"
          width="11"
          height="7"
          rx="2"
          fill="#9e9e9e"
        />

        <rect
          x="-2.5"
          y="39"
          width="5"
          height="52"
          rx="2"
          fill="#bdbdbd"
        />

        <rect
          x="-1.5"
          y="39"
          width="3"
          height="52"
          rx="1.5"
          fill="#d8d8d8"
        />

        <polygon
          points="-3,91 3,91 1.5,100 -1.5,100"
          fill="#757575"
        />
      </g>

      {/* Pliers */}
      <g transform="translate(160 90) rotate(12)">
        <rect
          x="-10"
          y="32"
          width="9"
          height="52"
          rx="4"
          fill="#e91e8c"
        />

        <rect
          x="-8"
          y="32"
          width="5"
          height="52"
          rx="3"
          fill="#f06292"
        />

        <rect
          x="1"
          y="32"
          width="9"
          height="52"
          rx="4"
          fill="#e91e8c"
        />

        <rect
          x="3"
          y="32"
          width="5"
          height="52"
          rx="3"
          fill="#f06292"
        />

        <circle cx="0" cy="38" r="5" fill="#757575" />
        <circle cx="0" cy="38" r="3" fill="#9e9e9e" />

        <path
          d="M-10 38 Q-16 16 -11 0 Q-7 -8 -3 0 Q-6 16 -1.5 38Z"
          fill="#424242"
        />

        <path
          d="M-9 38 Q-14 17 -10 2 Q-7 -4 -4 1 Q-6 17 -2 38Z"
          fill="#616161"
        />

        <path
          d="M10 38 Q16 16 11 0 Q7 -8 3 0 Q6 16 1.5 38Z"
          fill="#424242"
        />

        <path
          d="M9 38 Q14 17 10 2 Q7 -4 4 1 Q6 17 2 38Z"
          fill="#616161"
        />
      </g>

      {/* Blue screwdriver */}
      <g transform="translate(188 105) rotate(15)">
        <rect
          x="-6.5"
          y="0"
          width="13"
          height="34"
          rx="5.5"
          fill="#1565c0"
        />

        <rect
          x="-4.5"
          y="0"
          width="9"
          height="34"
          rx="4.5"
          fill="#1e88e5"
        />

        <rect
          x="-6.5"
          y="9"
          width="13"
          height="2.5"
          rx="1.5"
          fill="#0d47a1"
          opacity="0.5"
        />

        <rect
          x="-6.5"
          y="17"
          width="13"
          height="2.5"
          rx="1.5"
          fill="#0d47a1"
          opacity="0.5"
        />

        <rect
          x="-6.5"
          y="25"
          width="13"
          height="2.5"
          rx="1.5"
          fill="#0d47a1"
          opacity="0.5"
        />

        <rect
          x="-5"
          y="31"
          width="10"
          height="6"
          rx="2"
          fill="#9e9e9e"
        />

        <rect
          x="-2.5"
          y="36"
          width="5"
          height="50"
          rx="2"
          fill="#bdbdbd"
        />

        <rect
          x="-1.5"
          y="36"
          width="3"
          height="50"
          rx="1.5"
          fill="#d8d8d8"
        />

        <rect x="-2.5" y="84" width="5" height="3" fill="#757575" />
        <rect x="-1" y="82" width="2" height="6" fill="#757575" />
      </g>

      {/* Rim overlay */}
      <rect
        x="48"
        y="136"
        width="164"
        height="10"
        rx="5"
        fill="#e0e0e0"
        stroke="#d0d0d0"
        strokeWidth="0.5"
      />
    </svg>
  );
}
export function LargeSearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-gray-300"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="11" cy="11" r="8" />

      <path
        d="M21 21l-4.35-4.35"
        strokeLinecap="round"
      />
    </svg>
  );
}
export const ICONS = {
  droplet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2C6 10 4 14 4 17a8 8 0 0 0 16 0c0-3-2-7-8-15z" />
    </svg>
  ),
  wave: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
      <path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
      <path d="M2 7c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z" />
    </svg>
  ),
  shower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M4 4l4 4" />
      <path d="M4 8A10 10 0 0 1 14 4" />
      <path d="M8 4a10 10 0 0 1 4 10" />
      <line x1="10" y1="14" x2="10.01" y2="14" />
      <line x1="14" y1="16" x2="14.01" y2="16" />
      <line x1="10" y1="18" x2="10.01" y2="18" />
      <line x1="14" y1="20" x2="14.01" y2="20" />
      <line x1="6"  y1="16" x2="6.01"  y2="16" />
      <line x1="6"  y1="20" x2="6.01"  y2="20" />
    </svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  sewage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  searchIcon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};