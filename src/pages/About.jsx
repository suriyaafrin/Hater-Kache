import { LuArrowRight } from "react-icons/lu";
import { PLATFORM_STATS } from "../../data/catalog";
import { AREAS } from "../../data/locations";
import { Button, Card, Reveal } from "../ui/primitives";
import { Protection, Testimonials } from "../components/home/Sections";

const PRINCIPLES = [
  {
    title: "Distance is not a detail",
    body: "In Dhaka, the difference between a 2 km and an 8 km professional is an hour of someone's evening. We rank by proximity first and show the number on every card.",
  },
  {
    title: "A price before the doorbell",
    body: "Every category has a published band built from completed jobs. Professionals confirm the figure on site before starting work, never after finishing it.",
  },
  {
    title: "Verification you can inspect",
    body: "Each badge on a profile says what was actually checked — NID, references, police verification, skills test. Hover any badge to read the standard behind it.",
  },
  {
    title: "Reviews stay where they land",
    body: "Only customers with a completed, paid booking can review. We do not remove critical reviews, and professionals cannot pay to hide them.",
  },
];

export default function About() {
  return (
    <>
      <div className="border-b border-line bg-canvas">
        <div className="shell py-10 lg:py-16">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 max-w-3xl font-display text-[32px] font-bold leading-tight sm:text-[44px]">
            Finding a good electrician should not depend on who your neighbour knows.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-muted">
            Hater-Kache — <span className="bn font-semibold text-brand-700">হাতে-কাছে</span>, meaning close at hand —
            started with a simple observation: in most Dhaka households, the phone number of a trusted technician is
            passed around like a family recipe. We are building the version of that trust which does not depend on
            knowing the right person.
          </p>
        </div>
      </div>

      <section className="shell py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 border-b border-line pb-12 lg:grid-cols-4">
          {PLATFORM_STATS.map((s) => (
            <div key={s.label}>
              <p className="tnum font-display text-[32px] font-bold leading-none">
                {s.decimals ? s.value.toFixed(s.decimals) : s.value.toLocaleString()}
                <span className="text-brand-600">{s.suffix}</span>
              </p>
              <p className="mt-2 text-[13.5px] font-semibold">{s.label}</p>
              <p className="mt-1 text-[12.5px] text-ink-soft">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 70}>
              <Card className="h-full p-6">
                <h2 className="font-display text-[18px] font-bold leading-snug">{p.title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{p.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 rounded-panel border border-line bg-canvas p-7 sm:p-10">
          <h2 className="font-display text-[24px] font-bold leading-tight">Where we work</h2>
          <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-muted">
            {AREAS.length} areas across Dhaka metro today. We open a new area only once at least twenty verified
            professionals live in it — dispatching someone across the city defeats the point.
          </p>
          <p className="mt-5 text-[13.5px] leading-relaxed text-ink-muted">{AREAS.map((a) => a.label).join(" · ")}</p>
          <Button className="mt-6" to="/search" iconRight={LuArrowRight}>
            See who covers your area
          </Button>
        </div>
      </section>

      <Testimonials />
      <Protection />
    </>
  );
}
