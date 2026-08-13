import { useMemo, useState } from "react";
import { LuCheck, LuCrosshair, LuMapPin, LuSearch } from "react-icons/lu";
import { AREAS, ZONES, distanceKm } from "../../../data/locations";
import { cx } from "../../lib/format";
import { useApp } from "../../store/useApp";
import { Input } from "../../ui/primitives";
import { Sheet } from "../../ui/overlays";

export default function LocationPicker({ open, onClose }) {
  const { areaId, setAreaId, toast } = useApp();
  const [q, setQ] = useState("");
  const [locating, setLocating] = useState(false);

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ZONES.map((zone) => ({
      zone,
      items: AREAS.filter((a) => a.zone === zone && a.label.toLowerCase().includes(term)),
    })).filter((g) => g.items.length);
  }, [q]);

  const choose = (id, label) => {
    setAreaId(id);
    toast(`Showing professionals near ${label}`);
    onClose();
  };

  const useCurrent = () => {
    if (!navigator.geolocation) {
      toast("Your browser blocked location access", "warn");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const here = { lat: coords.latitude, lng: coords.longitude };
        const nearest = [...AREAS].sort((a, b) => distanceKm(here, a) - distanceKm(here, b))[0];
        setLocating(false);
        choose(nearest.id, nearest.label);
      },
      () => {
        setLocating(false);
        toast("Could not read your location — pick an area instead", "warn");
      },
      { timeout: 8000 }
    );
  };

  return (
    <Sheet open={open} onClose={onClose} title="Choose your area">
      <div className="space-y-4 px-5 py-5">
        <button
          onClick={useCurrent}
          disabled={locating}
          className="flex w-full items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-left transition-colors hover:bg-brand-100 disabled:opacity-70"
        >
          <span className="grid size-9 place-items-center rounded-full bg-white text-brand-600">
            <LuCrosshair className={cx("size-[18px]", locating && "animate-spin")} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-brand-800">
              {locating ? "Finding you…" : "Use my current location"}
            </span>
            <span className="block text-xs text-brand-700/70">We match you to the nearest service area</span>
          </span>
        </button>

        <div className="relative">
          <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search an area — Mirpur, Uttara…"
            className="pl-10"
          />
        </div>

        {groups.length === 0 && (
          <p className="py-8 text-center text-sm text-ink-muted">
            We are not in that area yet. Dhaka metro only, for now.
          </p>
        )}

        {groups.map((group) => (
          <div key={group.zone}>
            <p className="eyebrow mb-2">{group.zone} Dhaka</p>
            <ul className="grid gap-1">
              {group.items.map((a) => {
                const active = a.id === areaId;
                return (
                  <li key={a.id}>
                    <button
                      onClick={() => choose(a.id, a.label)}
                      className={cx(
                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        active ? "bg-brand-50 font-semibold text-brand-700" : "hover:bg-canvas"
                      )}
                    >
                      <LuMapPin className={cx("size-4", active ? "text-brand-600" : "text-ink-soft")} />
                      <span className="flex-1">{a.label}</span>
                      {active && <LuCheck className="size-4 text-brand-600" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
