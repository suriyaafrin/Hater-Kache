import { PLATFORM_STATS } from "../../../data/catalog";
import { useCountUp } from "../../lib/hooks";

function Stat({ value, suffix, label, note, decimals = 0 }) {
  const [ref, n] = useCountUp(value, { decimals });
  const shown = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-US");
  return (
    <div ref={ref} className="px-2 text-center sm:px-4">
      <p className="tnum font-display text-[34px] font-bold leading-none tracking-tight text-ink sm:text-[42px]">
        {shown}
        <span className="text-brand-600">{suffix}</span>
      </p>
      <p className="mt-2.5 text-sm font-semibold">{label}</p>
      <p className="mt-1 text-[12.5px] leading-snug text-ink-soft">{note}</p>
    </div>
  );
}

export default function TrustStats() {
  return (
    <section className="border-y border-line bg-canvas">
      <div className="shell grid grid-cols-2 gap-y-10 py-12 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {PLATFORM_STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
