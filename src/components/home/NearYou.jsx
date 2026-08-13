import { useMemo, useState } from "react";
import { LuArrowRight, LuMapPin, LuUserSearch } from "react-icons/lu";
import { CATEGORIES, professionalsNear } from "../../../data/catalog";
import { useApp } from "../../store/useApp";
import { useLoading } from "../../lib/hooks";
import { Button, Chip, EmptyState, Reveal, SectionHead } from "../../ui/primitives";
import ProCard, { ProCardSkeleton } from "../pro/ProCard";

const FILTERS = [{ slug: "all", label: "All" }, ...CATEGORIES.slice(0, 5).map((c) => ({ slug: c.slug, label: c.label }))];

export default function NearYou() {
  const { area } = useApp();
  const [filter, setFilter] = useState("all");
  const loading = useLoading([area.id, filter], 500);

  const list = useMemo(
    () => professionalsNear(area, { category: filter === "all" ? null : filter, limit: 6 }),
    [area, filter]
  );

  return (
    <section className="bg-canvas py-16 lg:py-20">
      <div className="shell">
        <SectionHead
          eyebrow="Nearby"
          title="Professionals near you"
          sub={
            <>
              Sorted by how far they are from <span className="font-semibold text-ink">{area.label}</span>. The ring on
              each card fills as they get closer.
            </>
          }
          action={
            <Button variant="secondary" to="/search" iconRight={LuArrowRight}>
              See all
            </Button>
          }
        />

        <div className="no-scrollbar -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {FILTERS.map((f) => (
            <Chip key={f.slug} active={filter === f.slug} onClick={() => setFilter(f.slug)}>
              {f.label}
            </Chip>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProCardSkeleton key={i} />)
            : list.map((pro, i) => (
                <Reveal key={pro.uid} delay={(i % 3) * 70}>
                  <ProCard pro={pro} className="h-full" />
                </Reveal>
              ))}
        </div>

        {!loading && list.length === 0 && (
          <EmptyState
            className="mt-6"
            icon={LuUserSearch}
            title="No professionals in this category yet"
            body={`We are still onboarding for ${area.label}. Try a nearby area or another category.`}
            action={
              <Button to="/services" icon={LuMapPin}>
                Browse all services
              </Button>
            }
          />
        )}
      </div>
    </section>
  );
}
