import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCamera,
  LuCheck,
  LuCircleCheckBig,
  LuImage,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";
import { CATEGORIES, categoryBySlug, professionalsNear, proByUid, withDistance } from "../../data/catalog";
import { EMERGENCY_SURCHARGE, PAYMENT_METHODS, PLATFORM_FEE, packageById, packagesFor } from "../../data/pricing";
import { AREAS } from "../../data/locations";
import { useApp } from "../store/useApp";
import { bookingId, cx, dateLabel, dayOptions, isValidBdPhone, km as kmLabel, nowMs, taka, takaRange, TIME_SLOTS } from "../lib/format";
import { Avatar, ProximityRing } from "../ui/brand";
import { Button, Card, Field, Input, Select, Textarea } from "../ui/primitives";
import { ProRow } from "../components/pro/ProCard";

const STEPS = [
  { id: "service", label: "Service", group: "Service" },
  { id: "pro", label: "Professional", group: "Professional" },
  { id: "schedule", label: "Date & time", group: "Schedule" },
  { id: "address", label: "Address", group: "Address" },
  { id: "details", label: "Problem & photos", group: "Address" },
  { id: "review", label: "Review", group: "Confirm" },
];

const GROUPS = ["Service", "Professional", "Schedule", "Address", "Confirm"];

function ProgressBar({ stepIndex }) {
  const currentGroup = STEPS[stepIndex]?.group;
  const activeIdx = GROUPS.indexOf(currentGroup);
  return (
    <ol className="flex items-center gap-1.5">
      {GROUPS.map((g, i) => (
        <li key={g} className="flex flex-1 items-center gap-1.5">
          <div className="min-w-0 flex-1">
            <div
              className={cx(
                "h-1 rounded-full transition-colors duration-300",
                i < activeIdx ? "bg-brand-600" : i === activeIdx ? "bg-brand-400" : "bg-line"
              )}
            />
            <span
              className={cx(
                "mt-2 hidden truncate text-[11.5px] font-semibold sm:block",
                i <= activeIdx ? "text-brand-700" : "text-ink-soft"
              )}
            >
              {g}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Booking() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { area, addBooking, toast, user } = useApp();

  const preselected = params.get("pro") ? proByUid(params.get("pro")) : null;
  const emergency = params.get("emergency") === "1";

  const [step, setStep] = useState(preselected ? 1 : 0);
  const [categorySlug, setCategorySlug] = useState(preselected?.categorySlug || params.get("category") || "ac-repair");
  const [packageId, setPackageId] = useState(params.get("package") || "");
  const [proUid, setProUid] = useState(preselected?.uid || "");
  const [day, setDay] = useState(dayOptions()[0].key);
  const [slot, setSlot] = useState("");
  const [address, setAddress] = useState({
    areaId: area.id,
    line: "",
    flat: "",
    phone: user.phone || "",
  });
  const [problem, setProblem] = useState("");
  const [photos, setPhotos] = useState([]);
  const [payment, setPayment] = useState("bkash");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  const category = categoryBySlug(categorySlug);
  const packages = packagesFor(categorySlug);
  const chosenPackage = packageById(categorySlug, packageId) || packages[0];

  const pros = useMemo(() => professionalsNear(area, { category: categorySlug, limit: 8 }), [area, categorySlug]);
  const pro = useMemo(() => (proUid ? withDistance(proByUid(proUid), area) : null), [proUid, area]);

  const estimate = {
    min: chosenPackage.min + (emergency ? EMERGENCY_SURCHARGE : 0),
    max: chosenPackage.max + (emergency ? EMERGENCY_SURCHARGE : 0),
  };

  const mid = Math.round((estimate.min + estimate.max) / 2);
  const discount = 50;
  const total = mid + PLATFORM_FEE - discount;

  const validate = () => {
    const e = {};
    const id = STEPS[step].id;
    if (id === "pro" && !proUid) e.pro = "Choose a professional to continue";
    if (id === "schedule" && !slot) e.slot = "Pick a time window";
    if (id === "address") {
      if (address.line.trim().length < 6) e.line = "Add a house and road so they can find you";
      if (!isValidBdPhone(address.phone)) e.phone = "Enter an 11-digit number starting with 01";
    }
    if (id === "details" && problem.trim().length < 10) e.problem = "A sentence or two helps them arrive prepared";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    setErrors({});
    if (step === 0) navigate(-1);
    else setStep(step - 1);
  };

  const confirm = () => {
    const id = bookingId();
    addBooking({
      id,
      proUid,
      categorySlug,
      packageId: chosenPackage.id,
      packageLabel: chosenPackage.label,
      day,
      slot,
      address,
      problem,
      photos,
      status: "requested",
      estimate,
      total,
      payment,
      emergency,
      createdAt: nowMs(),
    });
    setDone(id);
    toast("Booking confirmed — the professional has been notified");
    window.scrollTo({ top: 0 });
  };

  const addPhoto = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4 - photos.length);
    setPhotos((p) => [...p, ...files.map((f) => f.name)]);
  };

  
  if (done) {
    return (
      <div className="shell max-w-lg py-16 text-center lg:py-24">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-50 text-brand-600 animate-pop-in">
          <LuCircleCheckBig className="size-8" />
        </span>
        <h1 className="mt-6 font-display text-[30px] font-bold leading-tight">Booking confirmed</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          {pro?.name} has been notified and usually replies within {pro?.responseMins ?? 20} minutes. You can track
          everything from here.
        </p>

        <Card className="mt-7 p-5 text-left">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="text-[13px] text-ink-muted">Booking ID</span>
            <span className="tnum font-display font-bold">{done}</span>
          </div>
          <dl className="mt-3 space-y-2.5 text-[13.5px]">
            {[
              ["Service", chosenPackage.label],
              ["Professional", pro?.name],
              ["When", `${dateLabel(day)} · ${TIME_SLOTS.find((t) => t.id === slot)?.label}`],
              ["Address", `${address.flat ? address.flat + ", " : ""}${address.line}`],
              ["Estimated cost", takaRange(estimate.min, estimate.max)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Button block to={`/track/${done}`}>Track your service</Button>
          <Button block variant="secondary" to="/account/bookings">All bookings</Button>
        </div>
      </div>
    );
  }

  const id = STEPS[step].id;

  return (
    <div className="shell max-w-3xl py-8 lg:py-12">
      <button onClick={back} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-muted hover:text-ink">
        <LuArrowLeft className="size-4" /> Back
      </button>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-display text-[26px] font-bold leading-tight sm:text-[32px]">{STEPS[step].label}</h1>
          <span className="tnum shrink-0 text-[13px] text-ink-soft">Step {step + 1} of {STEPS.length}</span>
        </div>
        <div className="mt-4"><ProgressBar stepIndex={step} /></div>
      </div>

      {emergency && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-danger/15 bg-danger-soft px-4 py-3">
          <LuTriangleAlert className="size-4 shrink-0 text-danger" />
          <p className="text-[13px] text-ink-muted">
            Emergency booking — a <span className="tnum font-semibold text-ink">{taka(EMERGENCY_SURCHARGE)}</span> call-out
            is added to the estimate.
          </p>
        </div>
      )}

      <div className="mt-7">
        {id === "service" && (
          <div className="space-y-6">
            <Field label="Category">
              <Select value={categorySlug} onChange={(e) => { setCategorySlug(e.target.value); setProUid(""); setPackageId(""); }}>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </Select>
            </Field>

            <div>
              <p className="mb-3 text-[13px] font-semibold">What do you need?</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {packages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPackageId(p.id)}
                    className={cx(
                      "rounded-xl border p-4 text-left transition-all",
                      packageId === p.id ? "border-brand-600 bg-brand-50 ring-4 ring-brand-100" : "border-line bg-white hover:border-brand-200"
                    )}
                  >
                    <p className="text-[14px] font-semibold">{p.label}</p>
                    <p className="tnum mt-1 text-[13px] font-medium text-brand-700">{takaRange(p.min, p.max, p.per)}</p>
                    <p className="tnum mt-0.5 text-[12px] text-ink-soft">
                      about {p.mins >= 1440 ? `${Math.round(p.mins / 1440)} day` : `${Math.round(p.mins / 60)} hr`}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {id === "pro" && (
          <div className="space-y-3">
            <p className="text-[13.5px] text-ink-muted">
              {pros.length} {category.label.toLowerCase()} professionals near {area.label}, closest first.
            </p>
            {pros.map((p) => (
              <ProRow
                key={p.uid}
                pro={p}
                selected={proUid === p.uid}
                onSelect={() => { setProUid(p.uid); setErrors({}); }}
                action={<ProximityRing km={p.km} size={44} />}
              />
            ))}
            {errors.pro && <p className="text-[13px] font-medium text-danger">{errors.pro}</p>}
          </div>
        )}

        {id === "schedule" && (
          <div className="space-y-7">
            <div>
              <p className="mb-3 text-[13px] font-semibold">Pick a day</p>
              <div className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                {dayOptions(7).map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setDay(d.key)}
                    className={cx(
                      "w-20 shrink-0 rounded-xl border px-2 py-3 text-center transition-all",
                      day === d.key ? "border-brand-600 bg-brand-50 ring-4 ring-brand-100" : "border-line bg-white hover:border-brand-200"
                    )}
                  >
                    <p className="text-[12.5px] font-semibold">{d.day}</p>
                    <p className="tnum mt-0.5 text-[12px] text-ink-soft">{d.date}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[13px] font-semibold">Pick a two-hour window</p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {TIME_SLOTS.map((t, i) => {
                  const full = i === 2 && day === dayOptions()[0].key;
                  return (
                    <button
                      key={t.id}
                      disabled={full}
                      onClick={() => { setSlot(t.id); setErrors({}); }}
                      className={cx(
                        "rounded-xl border px-3 py-3 text-[13px] font-medium transition-all",
                        full && "cursor-not-allowed border-line bg-canvas text-ink-soft line-through",
                        !full && slot === t.id && "border-brand-600 bg-brand-50 text-brand-700 ring-4 ring-brand-100",
                        !full && slot !== t.id && "border-line bg-white hover:border-brand-200"
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              {errors.slot && <p className="mt-2 text-[13px] font-medium text-danger">{errors.slot}</p>}
            </div>
          </div>
        )}

        {id === "address" && (
          <div className="space-y-5">
            <Field label="Area" required>
              <Select value={address.areaId} onChange={(e) => setAddress({ ...address, areaId: e.target.value })}>
                {AREAS.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </Select>
            </Field>

            <Field label="House and road" required error={errors.line}>
              <Input
                value={address.line}
                onChange={(e) => setAddress({ ...address, line: e.target.value })}
                placeholder="House 42, Road 9/A"
                invalid={!!errors.line}
              />
            </Field>

            <Field label="Flat, floor or landmark" hint="Anything that saves them a phone call at your gate.">
              <Input
                value={address.flat}
                onChange={(e) => setAddress({ ...address, flat: e.target.value })}
                placeholder="Flat B3, 4th floor — beside the pharmacy"
              />
            </Field>

            <Field label="Mobile number" required error={errors.phone}>
              <Input
                value={address.phone}
                inputMode="numeric"
                maxLength={11}
                onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, "") })}
                placeholder="01711234567"
                invalid={!!errors.phone}
                className="tnum"
              />
            </Field>
          </div>
        )}

        {id === "details" && (
          <div className="space-y-6">
            <Field
              label="Describe the problem"
              required
              error={errors.problem}
              hint="What is happening, since when, and anything you have already tried."
            >
              <Textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows={5}
                placeholder="The AC runs but the room stays warm. Started two days ago, the outdoor fan sounds normal."
              />
            </Field>

            <div>
              <p className="mb-2 text-[13px] font-semibold">Photos <span className="font-normal text-ink-soft">(optional, up to 4)</span></p>
              <div className="flex flex-wrap gap-3">
                {photos.map((name, i) => (
                  <div key={i} className="relative grid size-24 place-items-center rounded-xl border border-line bg-canvas p-2 text-center">
                    <LuImage className="size-5 text-ink-soft" />
                    <span className="mt-1 line-clamp-2 text-[10px] leading-tight text-ink-soft">{name}</span>
                    <button
                      onClick={() => setPhotos(photos.filter((_, x) => x !== i))}
                      aria-label={`Remove ${name}`}
                      className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full border border-line bg-white text-ink-muted shadow-soft hover:text-danger"
                    >
                      <LuX className="size-3.5" />
                    </button>
                  </div>
                ))}
                {photos.length < 4 && (
                  <label className="grid size-24 cursor-pointer place-items-center rounded-xl border border-dashed border-line-strong bg-white text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600">
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={addPhoto} />
                    <LuCamera className="size-5" />
                    <span className="mt-1 text-[11px] font-medium">Add photo</span>
                  </label>
                )}
              </div>
              <p className="mt-2.5 text-[12.5px] text-ink-soft">
                Photos are shared only with the professional you booked.
              </p>
            </div>
          </div>
        )}

        {id === "review" && (
          <div className="space-y-5">
            <Card className="p-5">
              <div className="flex items-center gap-3.5 border-b border-line pb-4">
                {pro && <Avatar name={pro.name} initials={pro.initials} size={48} />}
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[16px] font-bold">{pro?.name}</p>
                  <p className="tnum text-[13px] text-ink-muted">
                    {chosenPackage.label} · {pro && kmLabel(pro.km)} away
                  </p>
                </div>
              </div>

              <dl className="mt-4 space-y-2.5 text-[13.5px]">
                {[
                  ["When", `${dateLabel(day)} · ${TIME_SLOTS.find((t) => t.id === slot)?.label || "—"}`],
                  ["Address", `${address.flat ? address.flat + ", " : ""}${address.line}, ${AREAS.find((a) => a.id === address.areaId)?.label}`],
                  ["Contact", address.phone],
                  ["Problem", problem],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6">
                    <dt className="shrink-0 text-ink-soft">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="p-5">
              <p className="text-[13px] font-semibold">Estimated cost</p>
              <p className="tnum mt-1.5 font-display text-[28px] font-bold leading-none text-brand-700">
                {takaRange(estimate.min, estimate.max)}
              </p>
              <p className="mt-2 text-[12.5px] text-ink-soft">
                Final price may vary after the professional inspects the work.
              </p>

              <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[13.5px]">
                <div className="flex justify-between"><dt className="text-ink-muted">Service (mid estimate)</dt><dd className="tnum font-medium">{taka(mid)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-muted">Platform fee</dt><dd className="tnum font-medium">{taka(PLATFORM_FEE)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-muted">First-booking discount</dt><dd className="tnum font-medium text-brand-700">−{taka(discount)}</dd></div>
                <div className="flex justify-between border-t border-line pt-2.5 text-[15px] font-bold"><dt>Total</dt><dd className="tnum">{taka(total)}</dd></div>
              </dl>
            </Card>

            <div>
              <p className="mb-3 text-[13px] font-semibold">Payment method</p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={cx(
                      "rounded-xl border px-3 py-3.5 text-left transition-all",
                      payment === m.id ? "border-brand-600 bg-brand-50 ring-4 ring-brand-100" : "border-line bg-white hover:border-brand-200"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ background: m.tone }} />
                      <span className="text-[13.5px] font-semibold">{m.label}</span>
                      {payment === m.id && <LuCheck className="ml-auto size-4 text-brand-600" />}
                    </span>
                    <span className="mt-1 block text-[11.5px] text-ink-soft">{m.hint}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[12.5px] text-ink-soft">
                Nothing is charged now. You pay once the job is marked complete.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="safe-bottom sticky bottom-16 z-20 mt-8 flex gap-3 border-t border-line bg-white/95 py-4 backdrop-blur lg:bottom-0">
        <Button variant="secondary" onClick={back} className="shrink-0">
          Back
        </Button>
        {id === "review" ? (
          <Button block onClick={confirm} icon={LuCheck}>
            Confirm booking · {taka(total)}
          </Button>
        ) : (
          <Button block onClick={next} iconRight={LuArrowRight}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
