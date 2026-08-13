import { useState } from "react";
import { LuArrowRight, LuChevronDown } from "react-icons/lu";
import { cx } from "../lib/format";
import { Button, Card, Reveal } from "../ui/primitives";
import { HowItWorks as CustomerSteps, Protection } from "../components/home/Sections";

const PRO_STEPS = [
  { title: "Apply with your NID and trade", body: "Fifteen minutes online. We check the ID and call two references." },
  { title: "Pass the in-person skills test", body: "A category lead watches you do one real job. No fee, no course to buy." },
  { title: "Pick your areas and hours", body: "You only get requests from streets you choose, in the hours you set." },
  { title: "Get paid within two days", body: "Flat 12% commission per completed job. No joining fee, no monthly charge." },
];

const FAQS = [
  {
    q: "How is the price decided?",
    a: "Each service has a published band based on completed jobs in Dhaka. The professional confirms the exact figure after seeing the work, before starting. Parts and materials are billed separately and shown to you first.",
  },
  {
    q: "What if the work is not done properly?",
    a: "Tell us within the warranty window on that professional's profile — between 15 and 60 days. We arrange a return visit at no cost. If it cannot be put right, support mediates and the payment is held until it is settled.",
  },
  {
    q: "Who is coming into my home?",
    a: "Someone whose NID we have checked, whose address we have verified, and who has passed a skills test with our category lead. Most also carry a police verification, marked as Background checked on their profile.",
  },
  {
    q: "Can I ask for the same person again?",
    a: "Yes. Save them to favourites and Book again reuses the same professional and service. Roughly a third of bookings on Hater-Kache are repeats.",
  },
  {
    q: "How do I pay?",
    a: "bKash, Nagad, card or cash, chosen at booking and charged only after the job is marked complete. You can change the method before paying.",
  },
  {
    q: "What happens if I need to cancel?",
    a: "Free until an hour before your slot. Within that hour a ৳100 fee applies, which goes to the professional who kept the time free.",
  },
];

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[15px] font-semibold">{q}</span>
        <LuChevronDown className={cx("size-5 shrink-0 text-ink-soft transition-transform", open && "rotate-180")} />
      </button>
      {open && <p className="pb-5 text-[14px] leading-relaxed text-ink-muted">{a}</p>}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <div className="border-b border-line bg-canvas">
        <div className="shell py-10 lg:py-14">
          <p className="eyebrow">How it works</p>
          <h1 className="mt-3 max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
            No surprises, from the first tap to the final payment.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            Every step exists to answer one question a customer would otherwise have to guess at.
          </p>
        </div>
      </div>

      <CustomerSteps />

      <section className="bg-canvas py-16 lg:py-20">
        <div className="shell">
          <p className="eyebrow">For professionals</p>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight sm:text-[34px]">
            How joining works
          </h2>
          <ol className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PRO_STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <li className="h-full rounded-card border border-line bg-white p-6">
                  <span className="tnum font-display text-[13px] font-bold tracking-widest text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[16px] font-bold leading-snug">{s.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Button className="mt-8" to="/pro" iconRight={LuArrowRight}>
            See the professional dashboard
          </Button>
        </div>
      </section>

      <section className="shell py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-[28px] font-bold leading-tight sm:text-[34px]">Common questions</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              Still unsure about something? Support answers on 09612-345678 from 8am to midnight.
            </p>
            <Button variant="secondary" className="mt-5" href="tel:+8809612345678">
              Call support
            </Button>
          </div>

          <Card className="px-6 py-2">
            {FAQS.map((f) => (
              <Faq key={f.q} {...f} />
            ))}
          </Card>
        </div>
      </section>

      <Protection />
    </>
  );
}
