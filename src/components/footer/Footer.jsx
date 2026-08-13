import { Link } from "react-router-dom";
import { LuFacebook, LuInstagram, LuLinkedin, LuMail, LuPhone, LuYoutube } from "react-icons/lu";
import { AREAS } from "../../../data/locations";
import { CATEGORIES } from "../../../data/catalog";
import { LogoMark } from "../../ui/brand";

const COLUMNS = [
  {
    title: "Services",
    links: CATEGORIES.slice(0, 6).map((c) => ({ label: c.label, to: `/services/${c.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Hater-Kache Protection", to: "/about#protection" },
      { label: "Become a professional", to: "/pro" },
      { label: "Careers", to: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help centre", to: "/how-it-works" },
      { label: "Track a booking", to: "/account/bookings" },
      { label: "Rewards", to: "/account/rewards" },
      { label: "Report an issue", to: "/account" },
    ],
  },
];

const SOCIALS = [
  { icon: LuFacebook, label: "Facebook" },
  { icon: LuInstagram, label: "Instagram" },
  { icon: LuYoutube, label: "YouTube" },
  { icon: LuLinkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-900 text-brand-100">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <LogoMark className="bg-white/10" />
              <span className="leading-none">
                <span className="block font-display text-[17px] font-bold text-white">Hater-Kache</span>
                <span className="bn block text-[12px] text-brand-300">হাতে-কাছে</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-200/80">
              Verified home-service professionals across Dhaka, matched by how close they actually are to you.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href="tel:+8809612345678" className="flex items-center gap-2.5 text-brand-100 hover:text-white">
                <LuPhone className="size-4 text-brand-400" /> <span className="tnum">09612-345678</span>
              </a>
              <a href="mailto:hello@haterkache.com" className="flex items-center gap-2.5 text-brand-100 hover:text-white">
                <LuMail className="size-4 text-brand-400" /> hello@haterkache.com
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-400">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-brand-200/85 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-400">Areas we cover</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-brand-200/70">
            {AREAS.map((a) => a.label).join(" · ")}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-brand-200/70">
            © {new Date().getFullYear()} Hater-Kache. Built in Dhaka.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-lg bg-white/5 text-brand-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                <s.icon className="size-[17px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
