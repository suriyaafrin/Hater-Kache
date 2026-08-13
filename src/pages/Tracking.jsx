import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  LuCheck,
  LuCircleCheckBig,
  LuCopy,
  LuMessageSquare,
  LuNavigation,
  LuPhone,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";
import { proByUid, withDistance } from "../../data/catalog";
import { AREAS } from "../../data/locations";
import { BOOKING_STAGES, stageIndex } from "../store/bookingStages";
import { useApp } from "../store/useApp";
import { useCopy, useInterval } from "../lib/hooks";
import { cx, dateLabel, km as kmLabel, localPhone, minutes, taka, takaRange, TIME_SLOTS } from "../lib/format";
import { Avatar, ProximityRing, VerifiedTick } from "../ui/brand";
import { Button, Card, Tag } from "../ui/primitives";
import { Modal } from "../ui/overlays";
import MapPanel from "../components/map/MapPanel";

export default function Tracking() {
  const { id } = useParams();
  const { bookings, updateBooking, cancelBooking, area, toast } = useApp();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [copied, copy] = useCopy();

  const booking = bookings.find((b) => b.id === id);
  const pro = useMemo(
    () => (booking ? withDistance(proByUid(booking.proUid), area) : null),
    [booking, area]
  );

  // The professional moves closer while you watch the screen.
  const [drift, setDrift] = useState(0);
  useInterval(() => setDrift((d) => Math.min(d + 0.1, 0.9)), booking?.status === "on_the_way" ? 6000 : null);

  if (!booking) return <Navigate to="/account/bookings" replace />;

  const current = stageIndex(booking.status);
  const cancelled = booking.status === "cancelled";
  const liveKm = pro ? Math.max(0.3, pro.km * (1 - drift)) : 0;
  const liveEta = Math.max(3, Math.round((pro?.eta ?? 20) * (1 - drift)));

  const advance = () => {
    const next = BOOKING_STAGES[Math.min(current + 1, BOOKING_STAGES.length - 1)];
    updateBooking(booking.id, { status: next.id });
    toast(`Status updated — ${next.label.toLowerCase()}`);
  };

  return (
    <>
      <div className="border-b border-line bg-canvas">
        <div className="shell py-7 lg:py-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-[26px] font-bold leading-tight sm:text-[32px]">
                  {cancelled ? "Booking cancelled" : BOOKING_STAGES[current].label}
                </h1>
                {booking.emergency && <Tag tone="danger" icon={LuTriangleAlert}>Emergency</Tag>}
              </div>
              <p className="mt-2 text-[15px] text-ink-muted">
                {cancelled ? "No charge was made for this booking." : BOOKING_STAGES[current].note}
              </p>
            </div>

            <button
              onClick={() => copy(booking.id)}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13px] font-semibold transition-colors hover:border-brand-300"
            >
              <span className="text-ink-soft">Booking</span>
              <span className="tnum">{booking.id}</span>
              {copied ? <LuCheck className="size-4 text-brand-600" /> : <LuCopy className="size-4 text-ink-soft" />}
            </button>
          </div>
        </div>
      </div>

      <div className="shell grid gap-8 py-8 lg:grid-cols-[1fr_360px] lg:py-10">
        <div className="min-w-0 space-y-6">
          {!cancelled && booking.status === "on_the_way" && pro && (
            <MapPanel
              center={{ ...AREAS.find((a) => a.id === booking.address.areaId), label: "Your address" }}
              points={[{ ...pro, lat: pro.home.lat, lng: pro.home.lng, km: liveKm }]}
              route={{ uid: pro.uid }}
              height={280}
              label={`${pro.name} is on the way`}
            />
          )}

          <Card className="p-6">
            <ol className="relative">
              {BOOKING_STAGES.map((stage, i) => {
                const state = cancelled ? "idle" : i < current ? "done" : i === current ? "active" : "idle";
                return (
                  <li key={stage.id} className="relative flex gap-4 pb-7 last:pb-0">
                    {i < BOOKING_STAGES.length - 1 && (
                      <span
                        className={cx(
                          "absolute left-[13px] top-7 h-[calc(100%-14px)] w-0.5 rounded-full",
                          state === "done" ? "bg-brand-500" : "bg-line"
                        )}
                      />
                    )}
                    <span
                      className={cx(
                        "relative z-10 grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors",
                        state === "done" && "border-brand-500 bg-brand-500 text-white",
                        state === "active" && "border-brand-500 bg-white text-brand-600",
                        state === "idle" && "border-line bg-white text-ink-soft"
                      )}
                    >
                      {state === "done" ? (
                        <LuCheck className="size-3.5" />
                      ) : state === "active" ? (
                        <span className="size-2.5 rounded-full bg-brand-500" />
                      ) : (
                        <span className="size-2 rounded-full bg-line-strong" />
                      )}
                    </span>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className={cx("text-[14.5px] font-semibold", state === "idle" && "text-ink-soft")}>
                        {stage.label}
                      </p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-ink-muted">{stage.note}</p>
                      {state === "active" && stage.id === "on_the_way" && (
                        <p className="tnum mt-2 inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1.5 text-[13px] font-semibold text-brand-700">
                          <LuNavigation className="size-3.5" /> {kmLabel(liveKm)} away · arriving in {minutes(liveEta)}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            {!cancelled && current < BOOKING_STAGES.length - 1 && (
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                <p className="flex-1 text-[12.5px] text-ink-soft">
                  Demo control — in the live product this moves when the professional updates the job.
                </p>
                <Button size="sm" variant="secondary" onClick={advance}>
                  Advance status
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-[17px] font-bold">Booking details</h2>
            <dl className="mt-4 space-y-3 text-[13.5px]">
              {[
                ["Service", booking.packageLabel],
                ["When", `${dateLabel(booking.day)} · ${TIME_SLOTS.find((t) => t.id === booking.slot)?.label || "—"}`],
                ["Address", `${booking.address.flat ? booking.address.flat + ", " : ""}${booking.address.line}`],
                ["Contact", booking.address.phone],
                ["Problem", booking.problem],
                ["Estimated cost", takaRange(booking.estimate.min, booking.estimate.max)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-line pb-3 last:border-0 last:pb-0">
                  <dt className="shrink-0 text-ink-soft">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {booking.status === "completed" && (
            <Card className="flex flex-wrap items-center gap-4 border-brand-200 bg-brand-50 p-6">
              <LuCircleCheckBig className="size-6 text-brand-600" />
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-semibold">Job completed</p>
                <p className="tnum text-[13px] text-ink-muted">
                  {taka(booking.total)} due · pay with {booking.payment || "your saved method"}
                </p>
              </div>
              <Button to="/account/payments">Pay now</Button>
            </Card>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          {pro && (
            <Card className="p-5">
              <div className="flex items-center gap-3.5">
                <Avatar name={pro.name} initials={pro.initials} size={52} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-display text-[16px] font-bold">
                    {pro.name} <VerifiedTick />
                  </p>
                  <p className="truncate text-[13px] text-ink-muted">{pro.service}</p>
                  <p className="tnum text-[12.5px] text-ink-soft">{localPhone(pro.phone)}</p>
                </div>
                <ProximityRing km={liveKm || pro.km} size={48} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <Button variant="secondary" size="sm" icon={LuMessageSquare} to={`/messages/${booking.id}`}>
                  Chat
                </Button>
                <Button variant="secondary" size="sm" icon={LuPhone} href={`tel:${pro.phone.replace(/\s/g, "")}`}>
                  Call
                </Button>
              </div>

              <Link
                to={`/pro/${pro.uid}`}
                className="mt-3 block text-center text-[13px] font-semibold text-brand-600 hover:text-brand-700"
              >
                View full profile
              </Link>
            </Card>
          )}

          {!cancelled && current < 3 && (
            <Button block variant="outlineDanger" icon={LuX} onClick={() => setConfirmCancel(true)}>
              Cancel booking
            </Button>
          )}

          <div className="rounded-card border border-line bg-canvas p-5">
            <p className="text-[13.5px] font-semibold">Something not right?</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              Support answers from 8am to midnight and can hold the payment while a dispute is reviewed.
            </p>
            <a href="tel:+8809612345678" className="tnum mt-3 inline-block text-[13.5px] font-semibold text-brand-600">
              09612-345678
            </a>
          </div>
        </aside>
      </div>

      <Modal
        open={confirmCancel}
        onClose={() => setConfirmCancel(false)}
        title="Cancel this booking?"
        sub="Cancelling now is free. Within an hour of the slot, a ৳100 fee applies."
        size="sm"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" block onClick={() => setConfirmCancel(false)}>
              Keep booking
            </Button>
            <Button
              variant="danger"
              block
              onClick={() => {
                cancelBooking(booking.id);
                setConfirmCancel(false);
                toast("Booking cancelled", "warn");
              }}
            >
              Cancel it
            </Button>
          </div>
        }
      >
        <p className="text-[14px] leading-relaxed text-ink-muted">
          {pro?.name} has already been assigned to this job. If the timing no longer works, chatting first is usually
          faster than rebooking.
        </p>
      </Modal>
    </>
  );
}
