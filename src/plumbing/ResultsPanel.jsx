import React from 'react'
import PlumberCard from './PlumberCard';
import { LargeSearchIcon } from '../img_folder/img';
function ResultsPanel({
  results,
  loading,
  searched,
  query,
  selectedId,
  onSelect,
}) {
  if (!searched) return null;

  if (loading) {
    return (
      <div className="mt-6 max-w-xl">
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mt-6 max-w-xl bg-white border border-gray-100 rounded-2xl px-6 py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
          <LargeSearchIcon />
        </div>
        <p className="text-sm font-medium text-gray-500">No Technicians found</p>
        <p className="text-xs text-gray-400 mt-1">
          Try a different location or service type
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-700">
          {results.length} Technician{results.length !== 1 ? "s" : ""} found
        </p>
        <p className="text-xs text-gray-400">
          {query.location} · {query.service}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {results.map((p) => (
          <PlumberCard
            key={p.id}
            plumber={p}
            isSelected={selectedId === p.id}
            onClick={() => onSelect(p)}
          />
        ))}
      </div>
    </div>
  );
}


export default ResultsPanel
