import { useMemo } from "react";
import { LuLayers, LuLocate } from "react-icons/lu";
import { cx, km as kmLabel } from "../../lib/format";


export default function MapPanel({
  center,
  points = [],
  route,
  height = 320,
  label = "Approximate positions",
  className,
}) {
  const W = 640;
  const H = 420;

  const located = useMemo(
    () =>
      points
        .map((p) => ({ ...p, lat: p.lat ?? p.home?.lat, lng: p.lng ?? p.home?.lng }))
        .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng)),
    [points]
  );

  const projected = useMemo(() => {
    if (!center || !Number.isFinite(center.lat) || !located.length) return [];
    const spread = Math.max(
      0.02,
      ...located.map((p) => Math.max(Math.abs(p.lat - center.lat), Math.abs(p.lng - center.lng)))
    );
    const scale = (W * 0.36) / spread;
    return located.map((p) => ({
      ...p,
      x: W / 2 + (p.lng - center.lng) * scale,
      y: H / 2 - (p.lat - center.lat) * scale,
    }));
  }, [center, located]);

  const mover = route ? projected.find((p) => p.uid === route.uid) : null;

  return (
    <div
      className={cx("relative overflow-hidden rounded-panel border border-line bg-brand-50/50", className)}
      style={{ height }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="size-full" role="img" aria-label="Map of nearby professionals">
        <defs>
          <pattern id="streets" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0v48" fill="none" stroke="var(--color-brand-100)" strokeWidth="1.5" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="50%" r="60%">
            <stop offset="55%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.75" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="url(#streets)" />
        <path d={`M0 ${H * 0.62} H${W}`} stroke="var(--color-brand-200)" strokeWidth="7" fill="none" />
        <path d={`M${W * 0.34} 0 V${H}`} stroke="var(--color-brand-200)" strokeWidth="6" fill="none" />
        <path d={`M0 ${H * 0.2} L${W} ${H * 0.42}`} stroke="var(--color-brand-100)" strokeWidth="10" fill="none" />

        {[70, 120, 175].map((r, i) => (
          <circle
            key={r}
            cx={W / 2}
            cy={H / 2}
            r={r}
            fill="none"
            stroke="var(--color-brand-400)"
            strokeDasharray="4 6"
            strokeWidth="1"
            opacity={0.5 - i * 0.13}
          />
        ))}

        {route && mover && (
          <path
            d={`M${mover.x} ${mover.y} Q ${(mover.x + W / 2) / 2} ${mover.y - 40} ${W / 2} ${H / 2}`}
            fill="none"
            stroke="var(--color-brand-600)"
            strokeWidth="3"
            strokeDasharray="7 7"
            strokeLinecap="round"
          />
        )}

        <circle cx={W / 2} cy={H / 2} r="13" fill="var(--color-brand-600)" opacity="0.18" />
        <circle cx={W / 2} cy={H / 2} r="6.5" fill="var(--color-brand-600)" stroke="#fff" strokeWidth="2.5" />

        {projected.map((p) => (
          <g key={p.uid || p.name} transform={`translate(${p.x} ${p.y})`}>
            <circle r="15" fill="#fff" stroke="var(--color-line)" strokeWidth="1.5" />
            <text
              textAnchor="middle"
              dy="4.5"
              fontSize="11"
              fontWeight="700"
              fill="var(--color-brand-700)"
              fontFamily="Instrument Sans, sans-serif"
            >
              {p.initials}
            </text>
          </g>
        ))}

        <rect width={W} height={H} fill="url(#fade)" />
      </svg>

      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg border border-line bg-white/90 px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-muted backdrop-blur">
        <LuLocate className="size-3.5 text-brand-600" />
        {center?.label}
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
        <p className="rounded-lg bg-white/90 px-2.5 py-1.5 text-[11px] text-ink-soft backdrop-blur">{label}</p>
        {projected.some((p) => p.km != null) && (
          <p className="tnum rounded-lg bg-white/90 px-2.5 py-1.5 text-[11px] font-semibold text-ink backdrop-blur">
            Nearest {kmLabel(Math.min(...projected.filter((p) => p.km != null).map((p) => p.km)))}
          </p>
        )}
      </div>

      <button
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg border border-line bg-white/90 text-ink-muted backdrop-blur transition-colors hover:text-ink"
        aria-label="Map layers"
        type="button"
      >
        <LuLayers className="size-4" />
      </button>
    </div>
  );
}
