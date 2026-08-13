import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LuClock, LuPhone, LuShieldCheck, LuTriangleAlert } from "react-icons/lu";
import { CATEGORIES, professionalsNear } from "../../data/catalog";
import { EMERGENCY_SURCHARGE } from "../../data/pricing";
import { useApp } from "../store/useApp";
import { useLoading } from "../lib/hooks";
import { cx, minutes, taka } from "../lib/format";
import { Avatar, ProximityRing, RatingInline, VerifiedTick } from "../ui/brand";
import { Button, Card, EmptyState, Skeleton, StatusDot, Tag } from "../ui/primitives";

const EMERGENCY_CATEGORIES = CATEGORIES.filter((c) => c.emergency);

export default function Emergency() {
  const [params] = useSearchParams();
  const { area } = useApp();
  const [slug, setSlug] = useState(params.get("category") || EMERGENCY_CATEGORIES[0].slug);
  const loading = useLoading([slug, area.id], 450);

  const responders = useMemo(
    () => professionalsNear(area, { category: slug }).filter((p) => p.available).slice(0, 5),
    [area, slug]
  );

  const category = CATEGORIES.find((c) => c.slug === slug);

  return (
    <>
      <div className="border-b border-danger/15 bg-danger-soft">
        <div className="shell py-10 lg:py-14">
          <Tag tone="danger" icon={LuTriangleAlert}>
            Emergency service
          </Tag>
          <h1 className="mt-4 max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
            Need help right now?
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            On-call professionals across Dhaka answer within minutes, day or night. A{" "}
            <span className="tnum font-semibold text-ink">{taka(EMERGENCY_SURCHARGE)}</span> call-out is added to the
            normal rate — shown before you confirm, never after.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="danger" size="lg" href="tel:+8809612345678" icon={LuPhone}>
              Call 09612-345678
            </Button>
            <Button variant="secondary" size="lg" to={`/book?category=${slug}&emergency=1`}>
              Book the nearest professional
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-ink-muted">
            <span className="flex items-center gap-2"><LuClock className="size-4 text-danger" /> Median response 11 minutes</span>
            <span className="flex items-center gap-2"><LuShieldCheck className="size-4 text-danger" /> Background-checked responders only</span>
            <span className="flex items-center gap-2"><StatusDot /> {responders.length} available near {area.label}</span>
          </div>
        </div>
      </div>

      <section className="shell py-10 lg:py-14">
        <h2 className="font-display text-xl font-semibold">What is happening?</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EMERGENCY_CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSlug(c.slug)}
              className={cx(
                "flex items-center gap-3.5 rounded-card border p-4 text-left transition-all",
                slug === c.slug
                  ? "border-danger/40 bg-danger-soft ring-4 ring-danger/5"
                  : "border-line bg-white hover:border-danger/25"
              )}
            >
              <span
                className={cx(
                  "grid size-11 shrink-0 place-items-center rounded-xl",
                  slug === c.slug ? "bg-danger text-white" : "bg-danger-soft text-danger"
                )}
              >
                <c.icon className="size-[21px]" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold">{c.emergency}</span>
                <span className="block truncate text-[12.5px] text-ink-soft">{c.label}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-xl font-semibold">
              Responders on call for {category?.label.toLowerCase()}
            </h2>
            <p className="text-[13px] text-ink-soft">Sorted by who reaches you fastest</p>
          </div>

          <div className="mt-5 space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="flex items-center gap-4 p-4">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-56" />
                    </div>
                    <Skeleton className="h-10 w-28 rounded-lg" />
                  </Card>
                ))
              : responders.map((p) => (
                  <Card key={p.uid} hover className="flex flex-wrap items-center gap-4 p-4">
                    <Avatar name={p.name} initials={p.initials} size={52} />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-[15px] font-semibold">
                        {p.name} <VerifiedTick />
                      </p>
                      <p className="truncate text-[13px] text-ink-muted">{p.service}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-3">
                        <RatingInline rating={p.rating} reviews={p.reviews} />
                        <span className="tnum text-[12.5px] font-semibold text-danger">
                          arrives in {minutes(p.eta)}
                        </span>
                      </div>
                    </div>
                    <ProximityRing km={p.km} size={48} />
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" href={`tel:${p.phone.replace(/\s/g, "")}`} icon={LuPhone}>
                        Call
                      </Button>
                      <Button variant="danger" size="sm" to={`/book?pro=${p.uid}&emergency=1`}>
                        Get help now
                      </Button>
                    </div>
                  </Card>
                ))}
          </div>

          {!loading && responders.length === 0 && (
            <EmptyState
              icon={LuTriangleAlert}
              title="No on-call professional in this area right now"
              body="Call the emergency desk — we can pull someone in from a neighbouring area."
              action={
                <Button variant="danger" href="tel:+8809612345678" icon={LuPhone}>
                  Call 09612-345678
                </Button>
              }
            />
          )}
        </div>

        <div className="mt-10 rounded-panel border border-line bg-canvas p-6">
          <h3 className="font-display text-[16px] font-bold">Before they arrive</h3>
          <ul className="mt-3 grid gap-2.5 text-[13.5px] leading-relaxed text-ink-muted sm:grid-cols-2">
            <li>· Electrical: switch off the main breaker if you smell burning or see sparks.</li>
            <li>· Plumbing: close the main water valve and move anything valuable off the floor.</li>
            <li>· Gas or fire: call 999 first. We are not a replacement for emergency services.</li>
            <li>· Lockout: have an ID with your address ready — responders are required to check it.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
