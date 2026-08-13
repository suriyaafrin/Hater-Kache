import { LuBadgeCheck, LuImage, LuStar } from "react-icons/lu";
import { BADGES } from "../../data/catalog";
import { cx, initialsOf } from "../lib/format";
import { Tooltip } from "./primitives";

/* ── Logo ────────────────────────────────────────────────────────────────── */

export function LogoMark({ className }) {
  return (
    <span className={cx("grid size-9 shrink-0 place-items-center rounded-[11px] bg-brand-600 text-white", className)}>
      <svg viewBox="0 0 32 32" className="size-[22px]" aria-hidden>
        <path d="M16 7.5 24 14v10.5a1 1 0 0 1-1 1h-4.6v-6.2h-4.8v6.2H9a1 1 0 0 1-1-1V14l8-6.5Z" fill="currentColor" />
        <circle cx="16" cy="14.6" r="1.9" fill="#0F7A5A" />
      </svg>
    </span>
  );
}

export function Logo({ compact, className }) {
  return (
    <span className={cx("flex items-center gap-2.5", className)}>
      <LogoMark />
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[17px] font-bold tracking-tight text-ink">Hater-Kache</span>
          <span className="bn block text-[12px] font-medium leading-tight text-brand-600">হাতে-কাছে</span>
        </span>
      )}
    </span>
  );
}

/* ── Proximity ring ──────────────────────────────────────────────────────────
   The product's whole promise is "close by", so distance gets its own gauge.
   The arc fills as the professional gets nearer; 8 km is treated as the edge
   of a practical same-day radius in Dhaka traffic.                          */

export function ProximityRing({ km = 2, size = 56, label = true, className }) {
  const stroke = size >= 56 ? 4 : 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const closeness = Math.min(1, Math.max(0.08, 1 - km / 8));
  return (
    <span
      className={cx("relative inline-grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
      title={`${km.toFixed(1)} km away`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-brand-100)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-brand-600)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - closeness)}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="absolute grid place-items-center leading-none">
        <span className="tnum font-display font-bold text-ink" style={{ fontSize: size * 0.3 }}>
          {km.toFixed(1)}
        </span>
        {label && (
          <span className="text-ink-soft" style={{ fontSize: size * 0.155, marginTop: 1 }}>
            km
          </span>
        )}
      </span>
    </span>
  );
}

/* ── Rating ──────────────────────────────────────────────────────────────── */

export function Stars({ value = 0, size = 14, className }) {
  return (
    <span className={cx("inline-flex items-center gap-0.5", className)} aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <LuStar className="absolute inset-0 text-line-strong" style={{ width: size, height: size }} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <LuStar
                className="text-warn"
                style={{ width: size, height: size, fill: "currentColor" }}
              />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function RatingInline({ rating, reviews, size = 13, className }) {
  return (
    <span className={cx("inline-flex items-center gap-1.5 text-[13px]", className)}>
      <LuStar className="size-3.5 text-warn" style={{ fill: "currentColor" }} aria-hidden />
      <span className="tnum font-semibold text-ink" style={{ fontSize: size }}>
        {rating}
      </span>
      {reviews != null && <span className="tnum text-ink-soft">({reviews})</span>}
    </span>
  );
}

/* ── Avatar ──────────────────────────────────────────────────────────────── */

const TINTS = [
  "bg-brand-50 text-brand-700",
  "bg-brand-100 text-brand-800",
  "bg-canvas text-ink",
];

export function Avatar({ name, initials, size = 48, photo, className, ring }) {
  const text = initials || initialsOf(name);
  const tint = TINTS[(text.charCodeAt(0) + (text.charCodeAt(1) || 0)) % TINTS.length];
  return (
    <span
      className={cx(
        "grid shrink-0 place-items-center overflow-hidden rounded-full font-display font-bold",
        tint,
        ring && "ring-2 ring-white",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {photo ? <img src={photo} alt={name} className="size-full object-cover" /> : text}
    </span>
  );
}

/* ── Verification ────────────────────────────────────────────────────────── */

export function VerifiedTick({ className }) {
  return <LuBadgeCheck className={cx("size-4 text-brand-600", className)} aria-label="Verified" />;
}

export function BadgeRow({ ids = [], max, size = "md", className }) {
  const list = (max ? ids.slice(0, max) : ids).map((id) => BADGES[id]).filter(Boolean);
  return (
    <div className={cx("flex flex-wrap gap-1.5", className)}>
      {list.map((b) => (
        <Tooltip key={b.id} label={b.tip}>
          <span
            tabIndex={0}
            className={cx(
              "inline-flex cursor-help items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 font-semibold text-brand-700",
              size === "sm" ? "px-2 py-0.5 text-[10.5px]" : "px-2.5 py-1 text-[11.5px]"
            )}
          >
            <LuBadgeCheck className={size === "sm" ? "size-3" : "size-3.5"} aria-hidden />
            {b.label}
          </span>
        </Tooltip>
      ))}
      {max && ids.length > max && (
        <span className="inline-flex items-center rounded-full border border-line bg-white px-2 py-0.5 text-[10.5px] font-semibold text-ink-muted">
          +{ids.length - max}
        </span>
      )}
    </div>
  );
}

/* ── Portfolio tile ──────────────────────────────────────────────────────────
   Drop real photos into the work item's `before` / `after` fields and this
   renders them instead of the drawn tile.                                   */

export function WorkTile({ src, kind = "before", label, className }) {
  if (src) {
    return <img src={src} alt={label} className={cx("size-full rounded-xl object-cover", className)} />;
  }
  const after = kind === "after";
  const plain = kind === "photo";
  return (
    <div
      className={cx(
        "relative grid size-full place-items-center overflow-hidden rounded-xl border",
        after ? "border-brand-200 bg-brand-50" : "border-line bg-canvas",
        className
      )}
    >
      <svg viewBox="0 0 120 90" className="absolute inset-0 size-full opacity-[0.5]" aria-hidden>
        <defs>
          <pattern id={`grid-${kind}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M10 0H0v10"
              fill="none"
              stroke={after ? "var(--color-brand-200)" : "var(--color-line)"}
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="120" height="90" fill={`url(#grid-${kind})`} />
      </svg>
      {plain ? (
        <LuImage className="relative size-5 text-ink-soft" aria-hidden />
      ) : (
        <span
          className={cx(
            "relative rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-widest",
            after ? "bg-brand-600 text-white" : "bg-white text-ink-muted"
          )}
        >
          {after ? "After" : "Before"}
        </span>
      )}
    </div>
  );
}
