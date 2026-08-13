import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { CATEGORIES, countByCategory } from "../../../data/catalog";
import { cx } from "../../lib/format";
import { Button, Reveal, SectionHead } from "../../ui/primitives";

export function CategoryCard({ category, compact }) {
  const Icon = category.icon;
  return (
    <Link
      to={`/services/${category.slug}`}
      className={cx(
        "group flex flex-col rounded-card border border-line bg-white p-5 transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift",
        compact && "p-4"
      )}
    >
      <span
        className={cx(
          "grid place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white",
          compact ? "size-10" : "size-12"
        )}
      >
        <Icon className={compact ? "size-5" : "size-[22px]"} aria-hidden />
      </span>

      <h3 className={cx("mt-4 font-display font-bold leading-tight", compact ? "text-[15px]" : "text-[17px]")}>
        {category.label}
      </h3>
      {!compact && <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{category.tagline}</p>}

      <p className="tnum mt-auto pt-4 text-[12.5px] font-semibold text-ink-soft">
        {countByCategory[category.slug]} professionals
      </p>
    </Link>
  );
}

export default function Categories() {
  return (
    <section className="shell py-16 lg:py-20">
      <SectionHead
        eyebrow="Service categories"
        title="What do you need help with?"
        sub="Twelve categories, each staffed by professionals who work in your area — not a call centre that dispatches whoever is free."
        action={
          <Button variant="secondary" to="/services" iconRight={LuArrowRight}>
            All services
          </Button>
        }
      />

      <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 4) * 60}>
            <CategoryCard category={c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
