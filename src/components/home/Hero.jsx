import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight, LuBadgeCheck, LuMapPin, LuSearch } from "react-icons/lu";
import { professionalsNear } from "../../../data/catalog";
import { useApp } from "../../store/useApp";
import { minutes } from "../../lib/format";
import { Avatar, ProximityRing, RatingInline } from "../../ui/brand";
import { Button, StatusDot } from "../../ui/primitives";
import LocationPicker from "../nav/LocationPicker";

const SUGGESTIONS = ["AC repair", "Plumber", "Electrician", "Deep cleaning", "Fridge repair"];

export default function Hero() {
  const navigate = useNavigate();
  const { area } = useApp();
  const [q, setQ] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const nearby = useMemo(() => professionalsNear(area).filter((p) => p.km <= 5), [area]);
  const availableNow = nearby.filter((p) => p.available).length;
  const lead = nearby[0];

  const search = (term = q) => {
    const value = term.trim();
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 to-white">
      <div className="shell grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-brand-700">
            <StatusDot />
            <span className="tnum">{nearby.length}</span> professionals within 5 km of {area.label}
          </span>

          <h1 className="mt-5 font-display text-[38px] font-bold leading-[1.08] tracking-tight sm:text-[52px]">
            Trusted professionals,
            <br />
            right at your <span className="text-brand-600">doorstep</span>.
          </h1>

          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted">
            Find verified technicians and service professionals near you — whenever you need them.
          </p>

          {/* search */}
          <div className="mt-8 rounded-panel border border-line bg-white p-2 shadow-lift">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-ink-soft" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && search()}
                  aria-label="What service do you need?"
                  placeholder="AC repair, plumber…"
                  className="h-12 w-full rounded-xl bg-transparent pl-11 pr-3 text-[15px] text-ink placeholder:text-ink-soft focus:outline-none"
                />
              </div>

              <button
                onClick={() => setPickerOpen(true)}
                className="flex h-12 items-center gap-2 rounded-xl px-3.5 text-left transition-colors hover:bg-canvas sm:w-44 sm:border-l sm:border-line"
              >
                <LuMapPin className="size-[18px] shrink-0 text-brand-600" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-ink-soft">
                    Location
                  </span>
                  <span className="block truncate text-sm font-semibold">{area.label}</span>
                </span>
              </button>

              <Button size="lg" onClick={() => search()} className="h-12 shrink-0">
                Find professionals
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[12.5px] text-ink-soft">Popular:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => search(s)}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button variant="secondary" to="/services" iconRight={LuArrowRight}>
              Explore services
            </Button>
            <p className="flex items-center gap-2 text-[13px] text-ink-muted">
              <LuBadgeCheck className="size-4 text-brand-600" />
              Every professional is NID and skills checked
            </p>
          </div>
        </div>

        {/* visual */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="relative aspect-4/5 overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-b from-brand-100 to-brand-50">
            {/* proximity rings — the same language used on every card */}
            <svg viewBox="0 0 400 500" className="absolute inset-0 size-full" aria-hidden>
              {[80, 130, 180, 230].map((r, i) => (
                <circle
                  key={r}
                  cx="200"
                  cy="300"
                  r={r}
                  fill="none"
                  stroke="var(--color-brand-300)"
                  strokeWidth="1"
                  opacity={0.5 - i * 0.09}
                />
              ))}
            </svg>

            <img
              src="/technician-cutout.png"
              alt="A verified Hater-Kache technician"
              className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto object-contain drop-shadow-xl"
            />

            {lead && (
              <div className="absolute left-4 bottom-24 flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-3 shadow-lift backdrop-blur animate-fade-up">
                <Avatar name={lead.name} initials={lead.initials} size={38} />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold">{lead.name}</p>
                  <RatingInline rating={lead.rating} reviews={lead.reviews} size={12} />
                </div>
                <ProximityRing km={lead.km} size={44} />
              </div>
            )}

            <div
              className="absolute bottom-5 right-4 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-ink-soft">Typical arrival</p>
              <p className="tnum font-display text-2xl font-bold leading-tight text-brand-700">
                {lead ? minutes(lead.eta) : "25 min"}
              </p>
              <p className="text-[12px] text-ink-muted">in {area.label}</p>
            </div>

            <div
              className="absolute left-4 top-5 rounded-xl border border-line bg-white/95 px-3 py-2 shadow-soft backdrop-blur animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              <p className="tnum flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-700">
                <StatusDot /> {availableNow} available now
              </p>
            </div>
          </div>
        </div>
      </div>

      <LocationPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </section>
  );
}
