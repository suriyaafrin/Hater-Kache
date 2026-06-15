import React from 'react'

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#1E3A5C]">{label}</p>
        <p className="text-sm font-medium text-[#1E3A5C]">{value}</p>
      </div>
    </div>
  );
}

export default InfoRow
