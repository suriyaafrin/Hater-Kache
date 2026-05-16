import React from 'react'
import PlumberCard from './PlumberCard';
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
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">No plumbers found</p>
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
          {results.length} plumber{results.length !== 1 ? "s" : ""} found
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
