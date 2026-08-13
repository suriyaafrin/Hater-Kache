import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  LuBriefcase,
  LuCalendarCheck,
  LuChevronRight,
  LuClock,
  LuHeart,
  LuMapPin,
  LuMessageSquare,
  LuPhone,
  LuRepeat,
  LuShieldCheck,
} from "react-icons/lu";
import { proByUid, withDistance } from "../../data/catalog";
import { packagesFor } from "../../data/pricing";
import { REVIEW_CATEGORIES, REVIEW_SEEDS } from "../../data/assistant";
import { useApp } from "../store/useApp";
import { cx, km as kmLabel, localPhone, minutes, taka, takaRange } from "../lib/format";
import { Avatar, BadgeRow, ProximityRing, Stars, VerifiedTick, WorkTile } from "../ui/brand";
import { Button, Card, Progress, SectionHead, StatusDot, Tag } from "../ui/primitives";
import { Lightbox } from "../ui/overlays";

const RATING_SPLIT = [78, 15, 4, 2, 1];

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
      <Icon className="size-[18px] shrink-0 text-brand-600" aria-hidden />
      <div className="min-w-0">
        <p className="tnum font-display text-[17px] font-bold leading-none">{value}</p>
        <p className="mt-1 truncate text-[12px] text-ink-soft">{label}</p>
      </div>
    </div>
  );
}

export default function ProProfile() {
  const { uid } = useParams();
  const { area, isFavourite, toggleFavourite, toast } = useApp();
  const [work, setWork] = useState(null);

  const base = proByUid(uid);
  const pro = useMemo(() => (base ? withDistance(base, area) : null), [base, area]);

  if (!pro) return <Navigate to="/search" replace />;

  const saved = isFavourite(pro.uid);
  const packages = packagesFor(pro.categorySlug);
  const reviews = REVIEW_SEEDS.slice(0, 4);

  return (
    <>
      <div className="border-b border-line bg-canvas">
        <div className="shell py-7 lg:py-10">
          <nav className="flex items-center gap-1.5 text-[13px] text-ink-soft" aria-label="Breadcrumb">
            <Link to="/services" className="hover:text-ink">Services</Link>
            <LuChevronRight className="size-3.5" />
            <Link to={`/services/${pro.categorySlug}`} className="hover:text-ink">{pro.categoryLabel}</Link>
            <LuChevronRight className="size-3.5" />
            <span className="font-medium text-ink">{pro.name}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-start gap-6">
            <Avatar name={pro.name} initials={pro.initials} size={92} className="shadow-soft" />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h1 className="font-display text-[30px] font-bold leading-tight sm:text-[36px]">{pro.name}</h1>
                <VerifiedTick className="size-5" />
                {pro.available && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-2.5 py-1 text-[12.5px] font-semibold text-brand-700">
                    <StatusDot /> Available now
                  </span>
                )}
              </div>

              <p className="mt-1.5 text-[15px] text-ink-muted">
                {pro.service} · {pro.categoryLabel} · works in {pro.serviceAreas.join(", ")}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]">
                <span className="flex items-center gap-2">
                  <Stars value={pro.rating} size={15} />
                  <span className="tnum font-semibold">{pro.rating}</span>
                  <span className="tnum text-ink-soft">({pro.reviews} reviews)</span>
                </span>
                <span className="tnum flex items-center gap-1.5 text-ink-muted">
                  <LuMapPin className="size-4 text-ink-soft" /> {kmLabel(pro.km)} from {area.label}
                </span>
                <span className="tnum flex items-center gap-1.5 text-ink-muted">
                  <LuClock className="size-4 text-ink-soft" /> replies in {minutes(pro.responseMins)}
                </span>
              </div>

              <BadgeRow ids={pro.badges} className="mt-4" />
            </div>

            <ProximityRing km={pro.km} size={84} className="hidden sm:block" />
          </div>
        </div>
      </div>

      <div className="shell grid gap-8 py-8 lg:grid-cols-[1fr_340px] lg:py-12">
        <div className="min-w-0 space-y-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={LuBriefcase} value={`${pro.years} yrs`} label="Experience" />
            <Stat icon={LuCalendarCheck} value={pro.jobs} label="Jobs completed" />
            <Stat icon={LuShieldCheck} value={`${pro.completionRate}%`} label="Completion rate" />
            <Stat icon={LuRepeat} value={`${pro.repeatRate}%`} label="Repeat customers" />
          </div>

          <section>
            <h2 className="font-display text-xl font-semibold">About</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{pro.bio}</p>
            <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                ["Joined Hater-Kache", pro.joined],
                ["Languages", pro.languages.join(", ")],
                ["Warranty", pro.warranty],
                ["Base area", pro.home.label],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line pb-2.5 text-[13.5px]">
                  <dt className="text-ink-soft">{k}</dt>
                  <dd className="tnum font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">Services offered</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {pro.skills.map((s) => (
                <span key={s} className="rounded-full border border-line bg-white px-3.5 py-2 text-[13.5px] font-medium">
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-semibold">Pricing</h2>
              <p className="tnum text-[13px] text-ink-soft">Starting from {taka(pro.priceFrom)}/{pro.priceUnit}</p>
            </div>
            <div className="mt-4 divide-y divide-line rounded-card border border-line bg-white">
              {packages.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-[14.5px] font-medium">{p.label}</p>
                    <p className="tnum text-[12.5px] text-ink-soft">
                      about {p.mins >= 1440 ? `${Math.round(p.mins / 1440)} day` : `${Math.round(p.mins / 60)} hr`}
                    </p>
                  </div>
                  <p className="tnum shrink-0 font-display text-[15px] font-bold">{takaRange(p.min, p.max, p.per)}</p>
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-[12.5px] text-ink-soft">
              Final price is confirmed after inspection. Parts are billed separately.
            </p>
          </section>

          <section>
            <SectionHead title="Previous work" sub="Photographs are supplied by the professional and checked before they appear here." />
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {pro.gallery.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWork(w)}
                  className="group overflow-hidden rounded-card border border-line bg-white text-left transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="grid grid-cols-2 gap-1 p-1">
                    <div className="aspect-4/3"><WorkTile src={w.before} kind="before" label={w.title} /></div>
                    <div className="aspect-4/3"><WorkTile src={w.after} kind="after" label={w.title} /></div>
                  </div>
                  <div className="px-4 pb-4 pt-2">
                    <p className="text-[13.5px] font-semibold">{w.title}</p>
                    <p className="tnum mt-0.5 text-[12px] text-ink-soft">
                      {w.area} · {w.months} {w.months === 1 ? "month" : "months"} ago
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <SectionHead title="Reviews" sub={`${pro.reviews} reviews from customers with a completed booking.`} />

            <div className="mt-6 grid gap-6 rounded-card border border-line bg-white p-6 sm:grid-cols-[auto_1fr_1fr]">
              <div className="text-center sm:text-left">
                <p className="tnum font-display text-[44px] font-bold leading-none">{pro.rating}</p>
                <Stars value={pro.rating} size={16} className="mt-2" />
                <p className="tnum mt-2 text-[12.5px] text-ink-soft">{pro.reviews} reviews</p>
              </div>

              <div className="space-y-1.5">
                {RATING_SPLIT.map((pct, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="tnum w-3 text-[12px] text-ink-soft">{5 - i}</span>
                    <Progress value={pct} className="flex-1" />
                    <span className="tnum w-8 text-right text-[12px] text-ink-soft">{pct}%</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                {REVIEW_CATEGORIES.map((c, i) => (
                  <div key={c} className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="text-ink-muted">{c}</span>
                    <span className="tnum font-semibold">{(pro.rating - i * 0.1).toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            <ul className="mt-5 space-y-4">
              {reviews.map((r) => (
                <li key={r.author}>
                  <Card className="p-5">
                    <div className="flex items-start gap-3.5">
                      <Avatar name={r.author} size={40} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <p className="text-[14px] font-semibold">{r.author}</p>
                          <Tag tone="brand">Verified customer</Tag>
                          <span className="text-[12px] text-ink-soft">{r.ago}</span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2.5">
                          <Stars value={r.rating} size={13} />
                          <span className="text-[12.5px] text-ink-soft">{r.job}</span>
                        </div>
                        <p className="mt-2.5 text-[14px] leading-relaxed text-ink">{r.text}</p>
                        {r.photos > 0 && (
                          <div className="mt-3 flex gap-2">
                            {Array.from({ length: r.photos }).map((_, i) => (
                              <div key={i} className="size-16"><WorkTile kind="photo" label="Customer photo" /></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">Availability this week</h2>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
              {pro.availability.map((d) => (
                <div
                  key={d.day}
                  className={cx(
                    "rounded-xl border p-3.5 text-center",
                    d.off ? "border-line bg-canvas" : "border-brand-100 bg-brand-50"
                  )}
                >
                  <p className="text-[13px] font-bold">{d.day}</p>
                  {d.off ? (
                    <p className="mt-1.5 text-[12px] text-ink-soft">Day off</p>
                  ) : (
                    <>
                      <p className="tnum mt-1.5 text-[11.5px] leading-tight text-brand-700">{d.from}<br />– {d.to}</p>
                      <Progress value={d.load * 100} className="mt-2.5 h-1" />
                      <p className="tnum mt-1.5 text-[10.5px] text-ink-soft">{Math.round(d.load * 100)}% booked</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* booking rail */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="p-5 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Starting from</p>
            <p className="tnum mt-1 font-display text-[30px] font-bold leading-none">
              {taka(pro.priceFrom)}
              <span className="text-[15px] font-medium text-ink-muted">/{pro.priceUnit}</span>
            </p>

            <div className="mt-4 space-y-2.5 border-y border-line py-4 text-[13.5px]">
              <p className="flex items-center justify-between">
                <span className="text-ink-muted">Distance</span>
                <span className="tnum font-semibold">{kmLabel(pro.km)}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-ink-muted">Typical arrival</span>
                <span className="tnum font-semibold">{minutes(pro.eta)}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-ink-muted">Warranty</span>
                <span className="font-semibold">{pro.warranty}</span>
              </p>
            </div>

            <Button block size="lg" className="mt-4" to={`/book?pro=${pro.uid}`}>
              Book {pro.name.split(" ")[0]}
            </Button>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" icon={LuMessageSquare} to="/messages">
                Chat
              </Button>
              <Button variant="secondary" size="sm" icon={LuPhone} href={`tel:${pro.phone.replace(/\s/g, "")}`}>
                Call
              </Button>
            </div>

            <button
              onClick={() => {
                const added = toggleFavourite(pro.uid);
                toast(added ? `${pro.name} saved to favourites` : `${pro.name} removed from favourites`);
              }}
              className={cx(
                "mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-[13.5px] font-semibold transition-colors",
                saved ? "border-danger/20 bg-danger-soft text-danger" : "border-line text-ink-muted hover:text-ink"
              )}
            >
              <LuHeart className="size-4" style={saved ? { fill: "currentColor" } : undefined} />
              {saved ? "Saved" : "Save for later"}
            </button>

            <p className="tnum mt-4 text-center text-[12px] text-ink-soft">
              Direct line after booking · {localPhone(pro.phone)}
            </p>
          </Card>

          <div className="mt-4 rounded-card border border-brand-100 bg-brand-50 p-5">
            <LuShieldCheck className="size-5 text-brand-600" aria-hidden />
            <p className="mt-2.5 text-[13.5px] font-semibold">Covered by Hater-Kache Protection</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              Payment is held until you confirm the job is done. Disputes are mediated by our support team.
            </p>
          </div>
        </aside>
      </div>

      {/* mobile sticky CTA */}
      <div className="safe-bottom fixed inset-x-0 bottom-16 z-20 flex items-center gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="tnum font-display text-[17px] font-bold leading-none">{taka(pro.priceFrom)}</p>
          <p className="text-[11.5px] text-ink-soft">per {pro.priceUnit} · {kmLabel(pro.km)} away</p>
        </div>
        <Button to={`/book?pro=${pro.uid}`} className="shrink-0">
          Book {pro.name.split(" ")[0]}
        </Button>
      </div>

      <Lightbox open={!!work} onClose={() => setWork(null)} title={work?.title}>
        {work && (
          <div className="rounded-panel bg-white p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-4/3"><WorkTile src={work.before} kind="before" label="Before" /></div>
              <div className="aspect-4/3"><WorkTile src={work.after} kind="after" label="After" /></div>
            </div>
            <p className="mt-4 text-[14px] font-semibold">{work.title}</p>
            <p className="tnum text-[12.5px] text-ink-soft">{work.area} · {work.months} months ago</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{work.note}</p>
          </div>
        )}
      </Lightbox>
    </>
  );
}
