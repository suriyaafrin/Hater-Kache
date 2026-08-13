import { LuRotateCcw } from "react-icons/lu";
import { AREAS } from "../../../data/locations";
import { CATEGORIES } from "../../../data/catalog";
import { cx, km as kmLabel } from "../../lib/format";
import { Button, Chip, Field, Select } from "../../ui/primitives";
import { Sheet } from "../../ui/overlays";

const RATINGS = [
  { value: 0, label: "Any" },
  { value: 4, label: "4.0+" },
  { value: 4.5, label: "4.5+" },
  { value: 4.8, label: "4.8+" },
];

const YEARS = [
  { value: 0, label: "Any" },
  { value: 3, label: "3+ yrs" },
  { value: 5, label: "5+ yrs" },
  { value: 8, label: "8+ yrs" },
];

const PRICES = [
  { value: 0, label: "Any" },
  { value: 600, label: "≤ ৳600" },
  { value: 1000, label: "≤ ৳1,000" },
  { value: 1500, label: "≤ ৳1,500" },
];

function Group({ label, children }) {
  return (
    <div className="border-t border-line pt-5 first:border-0 first:pt-0">
      <p className="mb-3 text-[13px] font-semibold">{label}</p>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, label, hint }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-brand-600"
      />
      <span>
        <span className="block text-[13.5px] font-medium">{label}</span>
        {hint && <span className="block text-[12px] text-ink-soft">{hint}</span>}
      </span>
    </label>
  );
}

export function FilterFields({ filters, set, showCategory = true }) {
  return (
    <div className="space-y-5">
      {showCategory && (
        <Group label="Service">
          <Select value={filters.category} onChange={(e) => set({ category: e.target.value })}>
            <option value="all">All services</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </Select>
        </Group>
      )}

      <Group label="Their base area">
        <Select value={filters.area} onChange={(e) => set({ area: e.target.value })}>
          <option value="any">Anywhere in Dhaka</option>
          {AREAS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </Select>
      </Group>

      <Group label={`Distance — within ${kmLabel(filters.maxKm)}`}>
        <input
          type="range"
          min={1}
          max={12}
          step={0.5}
          value={filters.maxKm}
          onChange={(e) => set({ maxKm: Number(e.target.value) })}
          className="w-full accent-brand-600"
          aria-label="Maximum distance"
        />
        <div className="tnum mt-1 flex justify-between text-[11.5px] text-ink-soft">
          <span>1 km</span>
          <span>12 km</span>
        </div>
      </Group>

      <Group label="Rating">
        <div className="flex flex-wrap gap-2">
          {RATINGS.map((r) => (
            <Chip key={r.value} active={filters.minRating === r.value} onClick={() => set({ minRating: r.value })}>
              {r.label}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label="Starting price">
        <div className="flex flex-wrap gap-2">
          {PRICES.map((p) => (
            <Chip key={p.value} active={filters.maxPrice === p.value} onClick={() => set({ maxPrice: p.value })}>
              {p.label}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label="Experience">
        <div className="flex flex-wrap gap-2">
          {YEARS.map((y) => (
            <Chip key={y.value} active={filters.minYears === y.value} onClick={() => set({ minYears: y.value })}>
              {y.label}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label="Availability and trust">
        <div className="space-y-3">
          <Toggle
            checked={filters.availableOnly}
            onChange={(v) => set({ availableOnly: v })}
            label="Available now"
            hint="Has an open slot today"
          />
          <Toggle
            checked={filters.verifiedOnly}
            onChange={(v) => set({ verifiedOnly: v })}
            label="Background checked only"
            hint="Police verification on file"
          />
        </div>
      </Group>
    </div>
  );
}

export function FilterSidebar({ filters, set, reset, count, showCategory }) {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24 rounded-panel border border-line bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold">Filters</h2>
          {count > 0 && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700"
            >
              <LuRotateCcw className="size-3.5" /> Reset
            </button>
          )}
        </div>
        <FilterFields filters={filters} set={set} showCategory={showCategory} />
      </div>
    </aside>
  );
}

export function FilterSheet({ open, onClose, filters, set, reset, results, showCategory }) {
  return (
    <Sheet open={open} onClose={onClose} title="Filters" width="max-w-sm">
      <div className="px-5 py-5">
        <FilterFields filters={filters} set={set} showCategory={showCategory} />
      </div>
      <div className="safe-bottom sticky bottom-0 flex gap-3 border-t border-line bg-white px-5 py-4">
        <Button variant="secondary" onClick={reset} className="flex-1">
          Reset
        </Button>
        <Button onClick={onClose} className="flex-[1.4]">
          Show {results} {results === 1 ? "result" : "results"}
        </Button>
      </div>
    </Sheet>
  );
}

export function SortSelect({ value, onChange, options, className }) {
  return (
    <Field className={cx("w-full sm:w-52", className)}>
      <Select value={value} onChange={(e) => onChange(e.target.value)} aria-label="Sort results">
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            Sort: {o.label}
          </option>
        ))}
      </Select>
    </Field>
  );
}
