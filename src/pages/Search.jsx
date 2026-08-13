import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LuSearch, LuSlidersHorizontal, LuTriangleAlert, LuUserSearch, LuX } from "react-icons/lu";
import { useApp } from "../store/useApp";
import { useLoading } from "../lib/hooks";
import { DEFAULT_FILTERS, SORTS, activeFilterCount, parseQuery, runSearch } from "../lib/search";
import { Button, EmptyState, Tag } from "../ui/primitives";
import ProCard, { ProCardSkeleton } from "../components/pro/ProCard";
import { FilterSheet, FilterSidebar, SortSelect } from "../components/pro/FilterBar";

const EXAMPLES = ["AC repair", "Plumber near me", "Electrician in Mirpur", "Emergency electrician"];

export default function Search() {
  const { area } = useApp();
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);
  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    category: params.get("category") || parseQuery(initialQ).category || "all",
  }));
  const [sheetOpen, setSheetOpen] = useState(false);

  const loading = useLoading([submitted, filters, area.id], 420);
  const hints = parseQuery(submitted);

  const results = useMemo(
    () => runSearch({ area, query: submitted, filters }),
    [area, submitted, filters]
  );

  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const reset = () => setFilters({ ...DEFAULT_FILTERS });
  const count = activeFilterCount(filters);

  const submit = (value = query) => {
    setSubmitted(value);
    setQuery(value);
    const hinted = parseQuery(value).category;
    if (hinted && hinted !== filters.category) setFilters((f) => ({ ...f, category: hinted }));
    const next = new URLSearchParams(params);
    value ? next.set("q", value) : next.delete("q");
    setParams(next, { replace: true });
  };

  return (
    <>
      <div className="border-b border-line bg-canvas">
        <div className="shell py-8 lg:py-10">
          <h1 className="font-display text-[28px] font-bold leading-tight sm:text-[34px]">Find professionals</h1>
          <p className="mt-2 text-[15px] text-ink-muted">
            Searching near <span className="font-semibold text-ink">{area.label}</span>
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <LuSearch className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-ink-soft" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Try “plumber near me” or “electrician in Mirpur”"
                aria-label="Search professionals"
                className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-10 text-[15px] shadow-soft placeholder:text-ink-soft focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
              />
              {query && (
                <button
                  onClick={() => submit("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-soft hover:bg-canvas hover:text-ink"
                >
                  <LuX className="size-4" />
                </button>
              )}
            </div>
            <Button size="lg" className="h-12" onClick={() => submit()}>
              Search
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[12.5px] text-ink-soft">Examples:</span>
            {EXAMPLES.map((e) => (
              <button
                key={e}
                onClick={() => submit(e)}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {e}
              </button>
            ))}
          </div>

          {hints.emergency && (
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-danger/15 bg-danger-soft px-4 py-3">
              <Tag tone="danger" icon={LuTriangleAlert}>
                Urgent
              </Tag>
              <p className="flex-1 text-[13.5px] text-ink-muted">
                For something happening right now, the emergency desk answers faster than a standard booking.
              </p>
              <Button size="sm" variant="danger" to="/emergency">
                Emergency help
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="shell flex gap-8 py-8 lg:py-10">
        <FilterSidebar filters={filters} set={set} reset={reset} count={count} showCategory />

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[14px] text-ink-muted">
              {loading ? (
                "Searching…"
              ) : (
                <>
                  <span className="tnum font-semibold text-ink">{results.length}</span> professionals
                  {submitted && <> for “{submitted}”</>}
                </>
              )}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={LuSlidersHorizontal}
                onClick={() => setSheetOpen(true)}
                className="lg:hidden"
              >
                Filters{count ? ` (${count})` : ""}
              </Button>
              <SortSelect value={filters.sort} onChange={(sort) => set({ sort })} options={SORTS} />
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.slice(0, 24).map((pro) => (
                <ProCard key={pro.uid} pro={pro} className="h-full" />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={LuUserSearch}
              title="No professionals match those filters"
              body="Widen the distance or drop the rating floor — there are almost certainly people nearby who can help."
              action={
                <Button variant="secondary" onClick={reset}>
                  Reset filters
                </Button>
              }
            />
          )}
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        set={set}
        reset={reset}
        results={results.length}
        showCategory
      />
    </>
  );
}
