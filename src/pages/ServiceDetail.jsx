import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { LuChevronRight, LuSlidersHorizontal, LuUserSearch } from "react-icons/lu";
import { categoryBySlug, professionalsNear } from "../../data/catalog";
import { packagesFor } from "../../data/pricing";
import { useApp } from "../store/useApp";
import { useLoading } from "../lib/hooks";
import { takaRange } from "../lib/format";
import { DEFAULT_FILTERS, SORTS, activeFilterCount, runSearch } from "../lib/search";
import { Button, Card, Chip, EmptyState, Tag } from "../ui/primitives";
import ProCard, { ProCardSkeleton } from "../components/pro/ProCard";
import { FilterSheet, FilterSidebar, SortSelect } from "../components/pro/FilterBar";

export default function ServiceDetail() {
  const { slug } = useParams();
  const category = categoryBySlug(slug);
  const { area } = useApp();
  const [sub, setSub] = useState("all-services");
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, category: slug, maxKm: 12 });
  const [sheetOpen, setSheetOpen] = useState(false);
  const loading = useLoading([slug, sub, filters, area.id], 420);

  const results = useMemo(() => {
    if (!category) return [];
    const base = runSearch({ area, filters: { ...filters, category: slug } });
    if (sub === "all-services") return base;
    const label = category.services.find((s) => s.id === sub)?.label;
    return base.filter((p) => p.service === label || p.skills.includes(label));
  }, [area, filters, slug, sub, category]);

  const total = useMemo(
    () => (category ? professionalsNear(area, { category: slug }).length : 0),
    [area, slug, category]
  );

  if (!category) return <Navigate to="/services" replace />;

  const Icon = category.icon;
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const reset = () => setFilters({ ...DEFAULT_FILTERS, category: slug, maxKm: 12 });

  return (
    <>
      <div className="border-b border-line bg-canvas">
        <div className="shell py-8 lg:py-12">
          <nav className="flex items-center gap-1.5 text-[13px] text-ink-soft" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink">Home</Link>
            <LuChevronRight className="size-3.5" />
            <Link to="/services" className="hover:text-ink">Services</Link>
            <LuChevronRight className="size-3.5" />
            <span className="font-medium text-ink">{category.label}</span>
          </nav>

          <div className="mt-5 flex flex-wrap items-start gap-5">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-white">
              <Icon className="size-7" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-[30px] font-bold leading-tight sm:text-[36px]">
                {category.label} <span className="bn text-brand-600">{category.bn}</span>
              </h1>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-muted">{category.tagline}</p>
              <p className="tnum mt-3 text-[13.5px] text-ink-muted">
                <span className="font-semibold text-ink">{total}</span> professionals cover {area.label}
              </p>
            </div>
          </div>

          <div className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {category.services.map((s) => (
              <Chip key={s.id} active={sub === s.id} onClick={() => setSub(s.id)}>
                {s.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <section className="shell py-8">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {packagesFor(slug).map((p) => (
            <Card key={p.id} className="p-4">
              <p className="text-[13px] font-semibold">{p.label}</p>
              <p className="tnum mt-1.5 font-display text-lg font-bold text-brand-700">
                {takaRange(p.min, p.max, p.per)}
              </p>
              <p className="tnum mt-1 text-[12px] text-ink-soft">
                about {p.mins >= 1440 ? `${Math.round(p.mins / 1440)} day` : `${Math.round(p.mins / 60)} hr`} of work
              </p>
            </Card>
          ))}
        </div>
      </section>

      <div className="shell flex gap-8 pb-16 lg:pb-20">
        <FilterSidebar filters={filters} set={set} reset={reset} count={activeFilterCount(filters) - 1} />

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[14px] text-ink-muted">
              {loading ? "Loading…" : <><span className="tnum font-semibold text-ink">{results.length}</span> available</>}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" icon={LuSlidersHorizontal} onClick={() => setSheetOpen(true)} className="lg:hidden">
                Filters
              </Button>
              <SortSelect value={filters.sort} onChange={(sort) => set({ sort })} options={SORTS} />
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => <ProCardSkeleton key={i} />)}
            </div>
          ) : results.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((pro) => (
                <ProCard key={pro.uid} pro={pro} className="h-full" />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={LuUserSearch}
              title={`No ${category.label.toLowerCase()} professionals match`}
              body="Try the full service list, or widen the distance filter."
              action={
                <Button variant="secondary" onClick={() => { setSub("all-services"); reset(); }}>
                  Clear filters
                </Button>
              }
            />
          )}

          {category.emergency && (
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-panel border border-danger/15 bg-danger-soft px-5 py-4">
              <Tag tone="danger">Emergency</Tag>
              <p className="flex-1 text-[13.5px] text-ink-muted">{category.emergency}? On-call professionals respond within minutes.</p>
              <Button size="sm" variant="danger" to={`/emergency?category=${slug}`}>
                Get emergency help
              </Button>
            </div>
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
      />
    </>
  );
}
