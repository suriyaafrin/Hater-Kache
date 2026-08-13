import { useMemo, useState } from "react";
import { Link, NavLink, Navigate, useParams } from "react-router-dom";
import {
  LuArrowRight,
  LuBanknote,
  LuCalendarDays,
  LuCreditCard,
  LuGift,
  LuHeart,
  LuLayoutDashboard,
  LuMessageSquare,
  LuRepeat,
  LuStar,
  LuUser,
} from "react-icons/lu";
import { proByUid, withDistance } from "../../data/catalog";
import { PAYMENT_METHODS } from "../../data/pricing";
import { POINT_RULES, REVIEW_CATEGORIES, REWARD_TIERS } from "../../data/assistant";
import { BOOKING_STAGES, stageIndex } from "../store/bookingStages";
import { useApp } from "../store/useApp";
import { cx, dateLabel, km as kmLabel, taka, TIME_SLOTS } from "../lib/format";
import { Avatar, ProximityRing, Stars, VerifiedTick } from "../ui/brand";
import { Button, Card, EmptyState, Field, Input, Progress, StatusDot, Tag } from "../ui/primitives";
import { Modal } from "../ui/overlays";
import { ProRow } from "../components/pro/ProCard";

const TABS = [
  { id: "", label: "Overview", icon: LuLayoutDashboard },
  { id: "bookings", label: "Bookings", icon: LuCalendarDays },
  { id: "favourites", label: "Favourites", icon: LuHeart },
  { id: "messages", label: "Messages", icon: LuMessageSquare, to: "/messages" },
  { id: "payments", label: "Payments", icon: LuCreditCard },
  { id: "reviews", label: "Reviews", icon: LuStar },
  { id: "rewards", label: "Rewards", icon: LuGift },
  { id: "profile", label: "Profile", icon: LuUser },
];

const VALID = TABS.map((t) => t.id);

function StatCard({ icon: Icon, value, label, to, tone = "brand" }) {
  const body = (
    <Card hover={!!to} className="flex items-center gap-4 p-5">
      <span
        className={cx(
          "grid size-11 shrink-0 place-items-center rounded-xl",
          tone === "brand" ? "bg-brand-50 text-brand-600" : "bg-canvas text-ink-muted"
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="tnum font-display text-[22px] font-bold leading-none">{value}</p>
        <p className="mt-1.5 truncate text-[12.5px] text-ink-soft">{label}</p>
      </div>
    </Card>
  );
  return to ? <Link to={to}>{body}</Link> : body;
}

function BookingCard({ booking, area, compact }) {
  const pro = proByUid(booking.proUid);
  const near = pro ? withDistance(pro, area) : null;
  const cancelled = booking.status === "cancelled";
  const done = booking.status === "completed";
  const idx = stageIndex(booking.status);

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start gap-4">
        <Avatar name={pro?.name} initials={pro?.initials} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-[16px] font-bold">{booking.packageLabel}</p>
            {cancelled ? (
              <Tag tone="neutral">Cancelled</Tag>
            ) : done ? (
              <Tag tone="brand">Completed</Tag>
            ) : (
              <Tag tone="info">{BOOKING_STAGES[idx].label}</Tag>
            )}
            {booking.emergency && <Tag tone="danger">Emergency</Tag>}
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-[13.5px] text-ink-muted">
            {pro?.name} <VerifiedTick className="size-3.5" />
          </p>
          <p className="tnum mt-1 text-[13px] text-ink-soft">
            {dateLabel(booking.day)} · {TIME_SLOTS.find((t) => t.id === booking.slot)?.label} · {booking.id}
          </p>
        </div>

        <div className="text-right">
          <p className="tnum font-display text-[17px] font-bold">
            {booking.total ? taka(booking.total) : `${taka(booking.estimate.min)}–${booking.estimate.max}`}
          </p>
          <p className="text-[11.5px] text-ink-soft">{booking.total ? "paid" : "estimated"}</p>
        </div>
      </div>

      {!compact && !cancelled && !done && (
        <div className="mt-4">
          <Progress value={((idx + 1) / BOOKING_STAGES.length) * 100} />
          {near && (
            <p className="tnum mt-2 flex items-center gap-2 text-[12.5px] text-ink-muted">
              <StatusDot /> {near.name} is {kmLabel(near.km)} from you
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {!cancelled && !done && (
          <Button size="sm" to={`/track/${booking.id}`}>
            Track service
          </Button>
        )}
        {done && (
          <Button size="sm" icon={LuRepeat} to={`/book?pro=${booking.proUid}&package=${booking.packageId}`}>
            Book again
          </Button>
        )}
        <Button size="sm" variant="secondary" to={`/messages/${booking.id}`}>
          Messages
        </Button>
        {pro && (
          <Button size="sm" variant="secondary" to={`/pro/${pro.uid}`}>
            Profile
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function Account() {
  const { tab = "" } = useParams();
  const { bookings, favourites, area, points, user, setUser, toast, activeBooking } = useApp();
  const [reviewFor, setReviewFor] = useState(null);
  const [stars, setStars] = useState(5);
  const [profile, setProfile] = useState(user);

  const saved = useMemo(
    () => favourites.map((uid) => proByUid(uid)).filter(Boolean).map((p) => withDistance(p, area)),
    [favourites, area]
  );

  const past = bookings.filter((b) => b.status === "completed");
  const upcoming = bookings.filter((b) => !["completed", "cancelled"].includes(b.status));
  const unreviewed = past.filter((b) => !b.reviewed);
  const nextTier = REWARD_TIERS.find((t) => t.at > points) || REWARD_TIERS[REWARD_TIERS.length - 1];
  const prevTier = [...REWARD_TIERS].reverse().find((t) => t.at <= points);
  const tierProgress = ((points - (prevTier?.at || 0)) / (nextTier.at - (prevTier?.at || 0))) * 100;

  if (!VALID.includes(tab)) return <Navigate to="/account" replace />;

  return (
    <div className="shell py-8 lg:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} size={56} />
          <div>
            <h1 className="font-display text-[24px] font-bold leading-tight sm:text-[30px]">{user.name}</h1>
            <p className="tnum text-[13.5px] text-ink-muted">{user.phone} · {area.label}</p>
          </div>
        </div>
        <Button to="/services">Book a service</Button>
      </div>

      <div className="no-scrollbar -mx-5 mt-7 flex gap-1 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:px-0">
        {TABS.map((t) => (
          <NavLink
            key={t.label}
            to={t.to || `/account${t.id ? `/${t.id}` : ""}`}
            end
            className={({ isActive }) =>
              cx(
                "flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-3 text-[13.5px] font-medium transition-colors",
                isActive && !t.to
                  ? "border-brand-600 text-brand-700"
                  : "border-transparent text-ink-muted hover:text-ink"
              )
            }
          >
            <t.icon className="size-4" aria-hidden />
            {t.label}
          </NavLink>
        ))}
      </div>

      <div className="mt-7">
        {tab === "" && (
          <div className="space-y-8">
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={LuCalendarDays} value={upcoming.length} label="Upcoming bookings" to="/account/bookings" />
              <StatCard icon={LuRepeat} value={past.length} label="Services completed" to="/account/bookings" />
              <StatCard icon={LuHeart} value={saved.length} label="Saved professionals" to="/account/favourites" />
              <StatCard icon={LuGift} value={points.toLocaleString()} label="Reward points" to="/account/rewards" />
            </div>

            {activeBooking && (
              <div>
                <h2 className="font-display text-xl font-semibold">Active service</h2>
                <div className="mt-4">
                  <BookingCard booking={activeBooking} area={area} />
                </div>
              </div>
            )}

            {unreviewed.length > 0 && (
              <Card className="flex flex-wrap items-center gap-4 border-brand-200 bg-brand-50 p-5">
                <LuStar className="size-5 text-brand-600" />
                <p className="flex-1 text-[14px]">
                  You have <span className="font-semibold">{unreviewed.length}</span> completed{" "}
                  {unreviewed.length === 1 ? "job" : "jobs"} without a review. Reviews earn 50 points each.
                </p>
                <Button size="sm" to="/account/reviews">
                  Write a review
                </Button>
              </Card>
            )}

            <div>
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-xl font-semibold">Book again</h2>
                <Link to="/account/favourites" className="text-[13.5px] font-semibold text-brand-600 hover:text-brand-700">
                  All favourites
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {saved.slice(0, 4).map((p) => (
                  <ProRow
                    key={p.uid}
                    pro={p}
                    action={
                      <Button size="sm" to={`/book?pro=${p.uid}`}>
                        Book
                      </Button>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-xl font-semibold">Upcoming and active</h2>
              {upcoming.length ? (
                <div className="mt-4 space-y-3.5">
                  {upcoming.map((b) => (
                    <BookingCard key={b.id} booking={b} area={area} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  className="mt-4"
                  icon={LuCalendarDays}
                  title="No upcoming bookings yet"
                  body="Find a professional for your next home service."
                  action={<Button to="/services">Explore services</Button>}
                />
              )}
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">Past bookings</h2>
              <div className="mt-4 space-y-3.5">
                {bookings
                  .filter((b) => ["completed", "cancelled"].includes(b.status))
                  .map((b) => (
                    <BookingCard key={b.id} booking={b} area={area} compact />
                  ))}
              </div>
            </section>
          </div>
        )}

        {tab === "favourites" && (
          <>
            <h2 className="font-display text-xl font-semibold">Your favourite professionals</h2>
            {saved.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {saved.map((p) => (
                  <ProRow
                    key={p.uid}
                    pro={p}
                    action={
                      <div className="flex flex-col items-end gap-2">
                        <ProximityRing km={p.km} size={40} label={false} />
                        <Button size="sm" to={`/book?pro=${p.uid}`}>
                          Book again
                        </Button>
                      </div>
                    }
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                className="mt-5"
                icon={LuHeart}
                title="Nothing saved yet"
                body="Tap the heart on any professional to keep them here for next time."
                action={<Button to="/search">Find professionals</Button>}
              />
            )}
          </>
        )}

        {tab === "payments" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-xl font-semibold">Payment methods</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {PAYMENT_METHODS.map((m) => (
                  <Card key={m.id} className="p-4">
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ background: m.tone }} />
                      <span className="text-[14px] font-semibold">{m.label}</span>
                    </span>
                    <p className="mt-1.5 text-[12.5px] text-ink-soft">{m.hint}</p>
                  </Card>
                ))}
              </div>
              <p className="mt-3 text-[12.5px] text-ink-soft">
                This build does not process real payments — connect a gateway to enable it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">Payment history</h2>
              <div className="mt-4 overflow-hidden rounded-card border border-line">
                <table className="w-full text-left text-[13.5px]">
                  <thead className="bg-canvas text-[12px] uppercase tracking-wider text-ink-soft">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Service</th>
                      <th className="hidden px-4 py-3 font-semibold sm:table-cell">Date</th>
                      <th className="hidden px-4 py-3 font-semibold sm:table-cell">Method</th>
                      <th className="px-4 py-3 text-right font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {past.map((b) => (
                      <tr key={b.id}>
                        <td className="px-4 py-3.5">
                          <p className="font-medium">{b.packageLabel}</p>
                          <p className="tnum text-[12px] text-ink-soft">{b.id}</p>
                        </td>
                        <td className="tnum hidden px-4 py-3.5 text-ink-muted sm:table-cell">{dateLabel(b.day)}</td>
                        <td className="hidden px-4 py-3.5 capitalize text-ink-muted sm:table-cell">{b.payment}</td>
                        <td className="tnum px-4 py-3.5 text-right font-semibold">{taka(b.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {tab === "reviews" && (
          <>
            <h2 className="font-display text-xl font-semibold">Your reviews</h2>
            {past.length ? (
              <div className="mt-5 space-y-3.5">
                {past.map((b) => {
                  const pro = proByUid(b.proUid);
                  return (
                    <Card key={b.id} className="flex flex-wrap items-center gap-4 p-5">
                      <Avatar name={pro?.name} initials={pro?.initials} size={44} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[14.5px] font-semibold">{pro?.name}</p>
                        <p className="tnum text-[13px] text-ink-muted">
                          {b.packageLabel} · {dateLabel(b.day)}
                        </p>
                        {b.reviewed && <Stars value={5} size={13} className="mt-1.5" />}
                      </div>
                      {b.reviewed ? (
                        <Tag tone="brand">Reviewed</Tag>
                      ) : (
                        <Button size="sm" onClick={() => setReviewFor(b)}>
                          Write a review
                        </Button>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                className="mt-5"
                icon={LuStar}
                title="No completed services yet"
                body="After your first job you can rate the work and help other neighbours choose."
                action={<Button to="/services">Explore services</Button>}
              />
            )}
          </>
        )}

        {tab === "rewards" && (
          <div className="space-y-8">
            <Card className="p-6">
              <p className="eyebrow">Hater-Kache Rewards</p>
              <p className="tnum mt-3 font-display text-[44px] font-bold leading-none">
                {points.toLocaleString()}
                <span className="ml-2 text-[16px] font-medium text-ink-muted">points</span>
              </p>
              <Progress value={tierProgress} className="mt-5" />
              <p className="tnum mt-2.5 text-[13.5px] text-ink-muted">
                {Math.max(0, nextTier.at - points)} points until {nextTier.reward.toLowerCase()}.
              </p>
            </Card>

            <section>
              <h2 className="font-display text-xl font-semibold">How you earn</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {POINT_RULES.map((r) => (
                  <Card key={r.label} className="flex items-center justify-between gap-4 p-4">
                    <p className="text-[13.5px]">{r.label}</p>
                    <p className="tnum font-display font-bold text-brand-700">{r.points}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">Rewards</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {REWARD_TIERS.map((t) => {
                  const unlocked = points >= t.at;
                  return (
                    <Card key={t.at} className={cx("p-4", unlocked && "border-brand-200 bg-brand-50")}>
                      <p className="tnum text-[12px] font-semibold text-ink-soft">{t.at} points</p>
                      <p className="mt-1.5 text-[14px] font-semibold">{t.reward}</p>
                      <p className={cx("mt-2 text-[12px] font-semibold", unlocked ? "text-brand-700" : "text-ink-soft")}>
                        {unlocked ? "Unlocked" : `${t.at - points} to go`}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {tab === "profile" && (
          <div className="max-w-lg space-y-5">
            <h2 className="font-display text-xl font-semibold">Your details</h2>
            <Field label="Full name">
              <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </Field>
            <Field label="Mobile number" hint="Used by professionals to reach you on the day.">
              <Input
                className="tnum"
                value={profile.phone}
                maxLength={11}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value.replace(/\D/g, "") })}
              />
            </Field>
            <Field label="Email" hint="For receipts only.">
              <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </Field>
            <Button
              onClick={() => {
                setUser(profile);
                toast("Profile updated");
              }}
            >
              Save changes
            </Button>

            <Card className="mt-8 flex items-center gap-4 p-5">
              <LuBanknote className="size-5 text-brand-600" />
              <p className="flex-1 text-[13.5px] text-ink-muted">
                Work in the trades? Switch to a professional account and start taking jobs.
              </p>
              <Button size="sm" variant="secondary" to="/pro" iconRight={LuArrowRight}>
                Open
              </Button>
            </Card>
          </div>
        )}
      </div>

      <Modal
        open={!!reviewFor}
        onClose={() => setReviewFor(null)}
        title="Rate this service"
        sub={reviewFor ? `${reviewFor.packageLabel} · ${proByUid(reviewFor.proUid)?.name}` : ""}
        size="sm"
        footer={
          <Button
            block
            onClick={() => {
              setReviewFor(null);
              toast("Review posted — 50 points added");
            }}
          >
            Post review
          </Button>
        }
      >
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-[13px] font-semibold">Overall rating</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setStars(n)} aria-label={`${n} stars`}>
                  <LuStar
                    className={cx("size-8 transition-colors", n <= stars ? "text-warn" : "text-line-strong")}
                    style={n <= stars ? { fill: "currentColor" } : undefined}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {REVIEW_CATEGORIES.map((c) => (
              <div key={c} className="flex items-center justify-between gap-4">
                <span className="text-[13.5px] text-ink-muted">{c}</span>
                <Stars value={stars} size={16} />
              </div>
            ))}
          </div>

          <Field label="What should other people know?">
            <textarea
              rows={4}
              placeholder="Was the work done properly? Did the price match the estimate?"
              className="w-full rounded-xl border border-line px-3.5 py-3 text-sm leading-relaxed placeholder:text-ink-soft focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
