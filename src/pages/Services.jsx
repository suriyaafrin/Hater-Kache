import { LuArrowRight, LuSparkles } from "react-icons/lu";
import { CATEGORIES, countByCategory } from "../../data/catalog";
import { packagesFor } from "../../data/pricing";
import { takaRange } from "../lib/format";
import { Button, Card, Reveal, Tag } from "../ui/primitives";
import { CategoryCard } from "../components/home/Categories";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <>
      <div className="border-b border-line bg-canvas">
        <div className="shell py-10 lg:py-14">
          <p className="eyebrow">Services</p>
          <h1 className="mt-3 max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[40px]">
            Twelve categories. One standard of work.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            Pick what you need and we show you who does it near you, what it usually costs, and when they can come.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/search" iconRight={LuArrowRight}>
              Browse all professionals
            </Button>
            <Button variant="secondary" to="/assistant" icon={LuSparkles}>
              Not sure what you need?
            </Button>
          </div>
        </div>
      </div>

      <section className="shell py-10 lg:py-14">
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 50}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-16 lg:pb-20">
        <h2 className="font-display text-2xl font-semibold">What people usually pay</h2>
        <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-muted">
          Indicative bands from completed jobs in Dhaka. The professional confirms the final figure after seeing the
          work.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 6).map((c) => (
            <Card key={c.slug} className="p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <c.icon className="size-[19px]" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[16px] font-bold">{c.label}</h3>
                  <p className="tnum text-[12px] text-ink-soft">{countByCategory[c.slug]} professionals</p>
                </div>
              </div>

              <ul className="mt-4 space-y-2.5">
                {packagesFor(c.slug).slice(0, 3).map((p) => (
                  <li key={p.id} className="flex items-baseline justify-between gap-3 text-[13.5px]">
                    <span className="text-ink-muted">{p.label}</span>
                    <span className="tnum shrink-0 font-semibold">{takaRange(p.min, p.max, p.per)}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/services/${c.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-600 hover:text-brand-700"
              >
                See {c.label.toLowerCase()} professionals <LuArrowRight className="size-4" />
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-panel border border-line bg-canvas px-5 py-4">
          <Tag tone="brand">Note</Tag>
          <p className="flex-1 text-[13.5px] text-ink-muted">
            Parts and materials are charged separately and always shown to you before purchase.
          </p>
        </div>
      </section>
    </>
  );
}
