import { useMemo, useState } from "react";
import {
  LuBanknote,
  LuCalendarClock,
  LuCheck,
  LuCircleCheckBig,
  LuMapPin,
  LuStar,
  LuTrendingUp,
  LuX,
} from "react-icons/lu";
import { PROFESSIONALS, proByUid } from "../../data/catalog";
import { AREAS } from "../../data/locations";
import { REVIEW_SEEDS } from "../../data/assistant";
import { useApp } from "../store/useApp";
import { cx, minutes, taka } from "../lib/format";
import { Avatar, BadgeRow, ProximityRing, Stars } from "../ui/brand";
import { Button, Card, EmptyState, Progress, StatusDot, Tag } from "../ui/primitives";

/* The signed-in professional for this demo. Swap for the authenticated user. */
const ME = proByUid("electrical-1") || PROFESSIONALS[0];

const EARNINGS_WEEK = [
  { day: "Sat", amount: 5200 },
  { day: "Sun", amount: 3800 },
  { day: "Mon", amount: 6100 },
  { day: "Tue", amount: 4400 },
  { day: "Wed", amount: 5850 },
  { day: "Thu", amount: 4850 },
  { day: "Fri", amount: 1500 },
];

const INCOMING = [
  { id: "HK-5012", job: "Fan installation", area: "Dhanmondi", km: 1.4, slot: "Today, 4:00–6:00 PM", pay: 900, note: "Two ceiling fans, customer has the fans." },
  { id: "HK-5013", job: "Wiring fault diagnosis", area: "Mohammadpur", km: 3.1, slot: "Tomorrow, 10:00 AM–12:00 PM", pay: 1400, note: "Breaker trips when the geyser runs." },
  { id: "HK-5014", job: "Switch and socket repair", area: "Hazaribagh", km: 4.6, slot: "Tomorrow, 2:00–4:00 PM", pay: 600, note: "Three sockets in the kitchen." },
];

const TODAY = [
  { id: "HK-4998", job: "Light installation", area: "Dhanmondi", time: "9:00 AM", status: "done", pay: 750 },
  { id: "HK-5001", job: "Wiring check", area: "Dhanmondi", time: "11:30 AM", status: "done", pay: 1600 },
  { id: "HK-4821", job: "Wiring fault diagnosis", area: "Dhanmondi", time: "4:00 PM", status: "next", pay: 1400 },
  { id: "HK-5008", job: "Fan installation", area: "Mohammadpur", time: "6:30 PM", status: "upcoming", pay: 1100 },
];

const CHECKLIST = [
  { label: "NID verified", done: true },
  { label: "Skills test passed", done: true },
  { label: "Profile photo", done: true },
  { label: "Portfolio photos (3 of 6)", done: false },
  { label: "Bank or bKash payout details", done: false },
];

export default function ProDashboard() {
  const { toast } = useApp();
  const [requests, setRequests] = useState(INCOMING);
  const [areas, setAreas] = useState(ME.serviceAreas);
  const [online, setOnline] = useState(true);

  const todayEarnings = TODAY.filter((j) => j.status === "done").reduce((n, j) => n + j.pay, 0);
  const weekTotal = EARNINGS_WEEK.reduce((n, d) => n + d.amount, 0);
  const peak = Math.max(...EARNINGS_WEEK.map((d) => d.amount));
  const completion = Math.round((CHECKLIST.filter((c) => c.done).length / CHECKLIST.length) * 100);

  const decide = (id, accepted) => {
    setRequests((r) => r.filter((x) => x.id !== id));
    toast(accepted ? `Job ${id} accepted` : `Job ${id} declined`, accepted ? "success" : "warn");
  };

  const toggleArea = (label) =>
    setAreas((a) => (a.includes(label) ? a.filter((x) => x !== label) : [...a, label]));

  const stats = useMemo(
    () => [
      { icon: LuCalendarClock, value: TODAY.length, label: "Today's jobs" },
      { icon: LuBanknote, value: taka(todayEarnings), label: "Today's earnings" },
      { icon: LuStar, value: ME.rating, label: "Rating" },
      { icon: LuCircleCheckBig, value: `${ME.completionRate}%`, label: "Completion rate" },
    ],
    [todayEarnings]
  );

  return (
    <div className="shell py-8 lg:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar name={ME.name} initials={ME.initials} size={56} />
          <div>
            <h1 className="font-display text-[24px] font-bold leading-tight sm:text-[30px]">{ME.name}</h1>
            <p className="text-[13.5px] text-ink-muted">
              {ME.categoryLabel} · {ME.home.label}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setOnline((o) => !o);
            toast(online ? "You are now offline — no new requests" : "You are online and taking requests");
          }}
          className={cx(
            "flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-[13.5px] font-semibold transition-colors",
            online ? "border-brand-200 bg-brand-50 text-brand-700" : "border-line bg-white text-ink-muted"
          )}
        >
          <StatusDot on={online} />
          {online ? "Taking requests" : "Offline"}
        </button>
      </div>

      <div className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <s.icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="tnum font-display text-[22px] font-bold leading-none">{s.value}</p>
              <p className="mt-1.5 truncate text-[12.5px] text-ink-soft">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-6">
          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-semibold">Pending requests</h2>
              <p className="tnum text-[13px] text-ink-soft">{requests.length} waiting</p>
            </div>

            {requests.length ? (
              <div className="mt-4 space-y-3">
                {requests.map((r) => (
                  <Card key={r.id} className="p-5">
                    <div className="flex flex-wrap items-start gap-4">
                      <ProximityRing km={r.km} size={52} />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[16px] font-bold">{r.job}</p>
                        <p className="tnum mt-1 flex flex-wrap items-center gap-x-3 text-[13px] text-ink-muted">
                          <span className="flex items-center gap-1.5">
                            <LuMapPin className="size-3.5 text-ink-soft" /> {r.area}
                          </span>
                          <span>{r.slot}</span>
                          <span>{r.id}</span>
                        </p>
                        <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{r.note}</p>
                      </div>
                      <div className="text-right">
                        <p className="tnum font-display text-[18px] font-bold">{taka(r.pay)}</p>
                        <p className="text-[11.5px] text-ink-soft">estimated</p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2.5">
                      <Button size="sm" icon={LuCheck} onClick={() => decide(r.id, true)}>
                        Accept
                      </Button>
                      <Button size="sm" variant="secondary" icon={LuX} onClick={() => decide(r.id, false)}>
                        Decline
                      </Button>
                      <p className="tnum ml-auto self-center text-[12px] text-ink-soft">
                        respond within {minutes(15)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                className="mt-4"
                icon={LuCircleCheckBig}
                title="No pending requests"
                body="You have answered everything. New jobs in your areas will appear here."
              />
            )}
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">Today's schedule</h2>
            <div className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
              {TODAY.map((j) => (
                <div key={j.id} className="flex items-center gap-4 px-5 py-4">
                  <p className="tnum w-20 shrink-0 text-[13px] font-semibold">{j.time}</p>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium">{j.job}</p>
                    <p className="tnum truncate text-[12.5px] text-ink-soft">
                      {j.area} · {j.id}
                    </p>
                  </div>
                  {j.status === "done" ? (
                    <Tag tone="brand">Done</Tag>
                  ) : j.status === "next" ? (
                    <Tag tone="info">Next</Tag>
                  ) : (
                    <Tag tone="neutral">Upcoming</Tag>
                  )}
                  <p className="tnum w-20 shrink-0 text-right text-[13.5px] font-semibold">{taka(j.pay)}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-semibold">Earnings this week</h2>
              <p className="tnum text-[13px] text-ink-soft">{taka(weekTotal)} total</p>
            </div>
            <Card className="mt-4 p-6">
              <div className="flex h-40 items-end gap-2.5">
                {EARNINGS_WEEK.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <span className="tnum text-[10.5px] font-semibold text-ink-soft">{Math.round(d.amount / 100) / 10}k</span>
                    <div
                      className="w-full rounded-t-md bg-brand-500 transition-all hover:bg-brand-600"
                      style={{ height: `${(d.amount / peak) * 100}%` }}
                      title={taka(d.amount)}
                    />
                    <span className="text-[11.5px] text-ink-soft">{d.day}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[13px] text-ink-muted">
                <LuTrendingUp className="size-4 text-brand-600" />
                Payouts land in your bKash within two working days of a completed job.
              </p>
            </Card>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">Recent reviews</h2>
            <div className="mt-4 space-y-3">
              {REVIEW_SEEDS.slice(0, 2).map((r) => (
                <Card key={r.author} className="p-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.author} size={38} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold">{r.author}</p>
                      <p className="text-[12px] text-ink-soft">{r.job} · {r.ago}</p>
                    </div>
                    <Stars value={r.rating} size={14} />
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">{r.text}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[14px] font-semibold">Profile completion</p>
              <p className="tnum font-display text-[17px] font-bold text-brand-700">{completion}%</p>
            </div>
            <Progress value={completion} className="mt-3" />
            <ul className="mt-4 space-y-2.5">
              {CHECKLIST.map((c) => (
                <li key={c.label} className="flex items-center gap-2.5 text-[13px]">
                  <span
                    className={cx(
                      "grid size-5 shrink-0 place-items-center rounded-full",
                      c.done ? "bg-brand-600 text-white" : "border border-dashed border-line-strong"
                    )}
                  >
                    {c.done && <LuCheck className="size-3" />}
                  </span>
                  <span className={c.done ? "text-ink-muted line-through" : "font-medium"}>{c.label}</span>
                </li>
              ))}
            </ul>
            <Button size="sm" variant="secondary" block className="mt-4">
              Finish setup
            </Button>
          </Card>

          <Card className="p-5">
            <p className="text-[14px] font-semibold">Service areas</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              You only receive requests from the areas you select.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {AREAS.slice(0, 10).map((a) => {
                const on = areas.includes(a.label);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleArea(a.label)}
                    className={cx(
                      "rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                      on ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink-muted hover:border-brand-300"
                    )}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-[14px] font-semibold">Your badges</p>
            <BadgeRow ids={ME.badges} className="mt-3" size="sm" />
            <p className="mt-3.5 text-[12.5px] leading-relaxed text-ink-soft">
              Keep your rating above 4.8 across 50 jobs to hold the Top rated badge.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
