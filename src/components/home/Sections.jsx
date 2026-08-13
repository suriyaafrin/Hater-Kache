import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuBadgeCheck,
  LuBanknote,
  LuCircleCheckBig,
  LuHeadset,
  LuMessagesSquare,
  LuNavigation,
  LuScale,
  LuShieldCheck,
  LuSparkles,
  LuTriangleAlert,
} from "react-icons/lu";
import { CATEGORIES, professionalsNear } from "../../../data/catalog";
import { REVIEW_SEEDS } from "../../../data/assistant";
import { useApp } from "../../store/useApp";
import { Avatar, Stars } from "../../ui/brand";
import { Button, Card, Reveal, SectionHead, Tag } from "../../ui/primitives";
import MapPanel from "../map/MapPanel";

/* ── How it works ────────────────────────────────────────────────────────── */

const STEPS = [
  {
    title: "Describe the problem",
    body: "Type it in plain words, or let the assistant narrow it down for you. Photos help the professional arrive prepared.",
  },
  {
    title: "Compare who is nearby",
    body: "Real distance, real ratings, real prices. No sponsored slots — the closest capable professional ranks first.",
  },
  {
    title: "Book a slot that suits you",
    body: "Pick a two-hour window. You get a written estimate before anyone rings your doorbell.",
  },
  {
    title: "Track, pay, review",
    body: "Watch them arrive, chat if plans change, then pay by bKash, Nagad, card or cash once the job is signed off.",
  },
];

export function HowItWorks() {
  return (
    <section className="shell py-16 lg:py-20">
      <SectionHead
        eyebrow="How it works"
        title="From a leaking tap to a fixed one, in four steps"
        sub="The order matters here — each step removes one reason people hesitate before letting a stranger into their home."
      />

      <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 70}>
            <li className="relative h-full rounded-card border border-line bg-white p-6">
              <span className="tnum font-display text-[13px] font-bold tracking-widest text-brand-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[17px] font-bold leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ── Location experience ─────────────────────────────────────────────────── */

export function NearbyMap() {
  const { area } = useApp();
  const points = useMemo(() => professionalsNear(area, { limit: 7 }), [area]);

  return (
    <section className="bg-canvas py-16 lg:py-20">
      <div className="shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead
            eyebrow="Location"
            title="Find professionals near you"
            sub="We rank by travel distance from your area, because in Dhaka the difference between 2 km and 8 km is an hour of your day."
          />

          <dl className="mt-8 space-y-4">
            {[
              { icon: LuNavigation, term: "Distance you can check", desc: "Every card shows the real gap between your area and theirs." },
              { icon: LuCircleCheckBig, term: "Availability that is current", desc: "Only professionals with an open slot today show as available." },
              { icon: LuBanknote, term: "Prices before you commit", desc: "A band, not a mystery — with the final figure agreed on site." },
            ].map((f) => (
              <div key={f.term} className="flex gap-3.5">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white text-brand-600 shadow-soft">
                  <f.icon className="size-[18px]" aria-hidden />
                </span>
                <div>
                  <dt className="text-sm font-semibold">{f.term}</dt>
                  <dd className="mt-0.5 text-[13.5px] leading-relaxed text-ink-muted">{f.desc}</dd>
                </div>
              </div>
            ))}
          </dl>

          <Button className="mt-8" to="/search" iconRight={LuArrowRight}>
            Find professionals near me
          </Button>
        </div>

        <MapPanel center={area} points={points} height={400} label="Professional positions are approximate until a booking is confirmed" />
      </div>
    </section>
  );
}

/* ── Emergency ───────────────────────────────────────────────────────────── */

export function EmergencyStrip() {
  const cases = CATEGORIES.filter((c) => c.emergency).slice(0, 5);

  return (
    <section className="shell py-16 lg:py-20">
      <div className="overflow-hidden rounded-panel border border-danger/15 bg-danger-soft">
        <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Tag tone="danger" icon={LuTriangleAlert}>
              Emergency service
            </Tag>
            <h2 className="mt-4 font-display text-[28px] font-bold leading-tight sm:text-[34px]">
              Need help right now?
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
              On-call professionals answer within minutes, day or night. A ৳300 call-out applies on top of the normal
              rate — we show it before you confirm, never after.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="danger" to="/emergency">
                Get emergency help
              </Button>
              <Button variant="secondary" href="tel:+8809612345678">
                Call 09612-345678
              </Button>
            </div>
          </div>

          <ul className="grid gap-2.5 sm:grid-cols-2">
            {cases.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/emergency?category=${c.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-danger/10 bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-danger-soft text-danger">
                    <c.icon className="size-[18px]" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-semibold">{c.emergency}</span>
                    <span className="block truncate text-[12px] text-ink-soft">{c.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Assistant teaser ────────────────────────────────────────────────────── */

export function AssistantTeaser() {
  return (
    <section className="shell pb-4">
      <div className="grid items-center gap-8 rounded-panel border border-line bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-2">
        <div>
          <Tag tone="brand" icon={LuSparkles}>
            Hater-Kache Assistant
          </Tag>
          <h2 className="mt-4 font-display text-[28px] font-bold leading-tight sm:text-[32px]">
            Not sure what service you need?
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
            Describe the symptom the way you would to a neighbour. You get the likely causes, the right category, a
            price range and the professionals nearby who handle it.
          </p>
          <Button className="mt-6" to="/assistant" iconRight={LuArrowRight}>
            Describe your problem
          </Button>
        </div>

        <div className="rounded-panel border border-line bg-canvas p-5">
          <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-[13.5px] text-white">
            My AC is running but the room isn't cooling.
          </div>
          <div className="mt-3 max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 text-[13.5px] shadow-soft">
            <p className="font-semibold">Likely causes</p>
            <ul className="mt-1.5 space-y-1 text-ink-muted">
              <li>· Clogged filter choking the airflow</li>
              <li>· Refrigerant gas below the required level</li>
              <li>· Condenser coil packed with dust</li>
            </ul>
            <p className="mt-3 border-t border-line pt-3">
              <span className="font-semibold">AC diagnosis &amp; repair</span>
              <span className="tnum block text-ink-muted">৳500–2,500 · 12 professionals nearby</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Protection ──────────────────────────────────────────────────────────── */

const PROMISES = [
  { icon: LuBadgeCheck, title: "Verified professionals", body: "NID, address and references checked before the first job." },
  { icon: LuShieldCheck, title: "Secure payments", body: "Pay through the app or in cash. Money moves only after you confirm." },
  { icon: LuMessagesSquare, title: "Reviews you can trust", body: "Only customers with a completed booking can leave one." },
  { icon: LuHeadset, title: "Support that answers", body: "Real people on the line from 8am to midnight, seven days." },
  { icon: LuScale, title: "Dispute support", body: "If the work is wrong, we mediate and hold the payment until it is settled." },
  { icon: LuCircleCheckBig, title: "Service guarantee", body: "Up to 60 days of workmanship warranty, set per professional." },
];

export function Protection() {
  return (
    <section id="protection" className="bg-brand-900 py-16 text-white lg:py-20">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-400">Hater-Kache Protection</p>
          <h2 className="mt-3 font-display text-[30px] font-bold leading-tight text-white sm:text-[38px]">
            Your home. Your trust. Our responsibility.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-200/80">
            Letting a stranger into your flat is the hard part of this business. These are the six things we do about
            it — each one is a policy, not a slogan.
          </p>
        </div>

        <div className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 70}>
              <div className="h-full rounded-card border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/[0.08]">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white">
                  <p.icon className="size-[19px]" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-[16px] font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-brand-200/75">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reviews ─────────────────────────────────────────────────────────────── */

export function Testimonials() {
  return (
    <section className="shell py-16 lg:py-20">
      <SectionHead
        eyebrow="Reviews"
        title="What customers say after the job"
        sub="Every review here belongs to a completed, paid booking. We do not delete the critical ones."
        action={
          <Button variant="secondary" to="/about" iconRight={LuArrowRight}>
            About our standards
          </Button>
        }
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REVIEW_SEEDS.slice(0, 3).map((r, i) => (
          <Reveal key={r.author} delay={i * 70}>
            <Card className="flex h-full flex-col p-6">
              <Stars value={r.rating} size={15} />
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink">{r.text}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <Avatar name={r.author} size={38} />
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-semibold">{r.author}</p>
                  <p className="truncate text-[12px] text-ink-soft">
                    {r.job} · {r.area}
                  </p>
                </div>
                <Tag tone="brand" className="ml-auto shrink-0">
                  Verified
                </Tag>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Join as a professional ──────────────────────────────────────────────── */

export function ProJoinCta() {
  return (
    <section className="shell pb-4">
      <div className="grid items-center gap-8 rounded-panel bg-brand-50 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">For professionals</p>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight sm:text-[34px]">
            Work in your own area. Keep your own customers.
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-muted">
            Get job requests from streets you already know, set the hours you work, and get paid within two working
            days. No joining fee — we take a flat commission per completed job.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/pro">Open the professional dashboard</Button>
            <Button variant="secondary" to="/how-it-works">
              How the commission works
            </Button>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-4 rounded-panel border border-brand-100 bg-white p-6">
          {[
            { k: "৳4,850", v: "Median daily earning" },
            { k: "5.2", v: "Jobs per working day" },
            { k: "2 days", v: "Payout time" },
          ].map((s) => (
            <div key={s.v}>
              <dt className="tnum font-display text-xl font-bold leading-tight">{s.k}</dt>
              <dd className="mt-1 text-[12px] leading-snug text-ink-soft">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
