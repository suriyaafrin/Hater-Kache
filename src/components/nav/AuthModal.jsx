import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft, LuHouse, LuWrench } from "react-icons/lu";
import { cx, isValidBdPhone } from "../../lib/format";
import { useApp } from "../../store/useApp";
import { Button, Field, Input } from "../../ui/primitives";
import { Modal } from "../../ui/overlays";

const ROLES = [
  {
    id: "customer",
    icon: LuHouse,
    title: "I need a service",
    body: "Book verified professionals for your home or office.",
  },
  {
    id: "pro",
    icon: LuWrench,
    title: "I am a professional",
    body: "Get job requests in your area and manage your work.",
  },
];

export default function AuthModal({ open, onClose }) {
  const { setUser, toast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("customer");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const boxes = useRef([]);

  const reset = () => {
    setStep("role");
    setPhone("");
    setName("");
    setCode(["", "", "", ""]);
    setError("");
  };

  const close = () => {
    onClose();
    setTimeout(reset, 200);
  };

  const sendCode = () => {
    if (!isValidBdPhone(phone)) {
      setError("Enter an 11-digit number starting with 01");
      return;
    }
    setError("");
    setStep("code");
    setTimeout(() => boxes.current[0]?.focus(), 60);
  };

  const setDigit = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 3) boxes.current[i + 1]?.focus();
  };

  const verify = () => {
    if (code.join("").length < 4) {
      setError("Enter the 4-digit code");
      return;
    }
    setUser({
      signedIn: true,
      role,
      name: name.trim() || (role === "pro" ? "Rafiq Ahmed" : "Ayesha Siddiqua"),
      phone,
      email: "",
    });
    toast(role === "pro" ? "Signed in to your professional account" : "Signed in");
    close();
    navigate(role === "pro" ? "/pro" : "/account");
  };

  const titles = {
    role: "Sign in to Hater-Kache",
    phone: role === "pro" ? "Professional sign in" : "Sign in or create an account",
    code: "Enter your code",
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={titles[step]}
      sub={
        step === "role"
          ? "One account for booking and for working. Pick how you will use it."
          : step === "phone"
            ? "We send a 4-digit code by SMS. No password to remember."
            : `Sent to ${phone}. Demo build — any 4 digits work.`
      }
      size="sm"
    >
      {step === "role" && (
        <div className="grid gap-3">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setRole(r.id);
                setStep("phone");
              }}
              className="flex items-start gap-3.5 rounded-xl border border-line p-4 text-left transition-all hover:border-brand-300 hover:bg-brand-50"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <r.icon className="size-[18px]" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold">{r.title}</span>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-muted">{r.body}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {step === "phone" && (
        <div className="space-y-4">
          <button
            onClick={() => setStep("role")}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted hover:text-ink"
          >
            <LuArrowLeft className="size-4" /> Back
          </button>

          <Field label="Mobile number" required error={error}>
            <div className="flex items-center gap-2">
              <span className="tnum grid h-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas px-3 text-sm font-semibold text-ink-muted">
                +880
              </span>
              <Input
                value={phone}
                inputMode="numeric"
                maxLength={11}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && sendCode()}
                placeholder="01711234567"
                invalid={!!error}
                className="tnum"
              />
            </div>
          </Field>

          <Field label="Your name" hint="Only used so professionals know who to ask for.">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ayesha Siddiqua" />
          </Field>

          <Button block onClick={sendCode}>
            Send code
          </Button>
          <p className="text-center text-[11.5px] leading-relaxed text-ink-soft">
            By continuing you agree to our terms and privacy policy.
          </p>
        </div>
      )}

      {step === "code" && (
        <div className="space-y-4">
          <button
            onClick={() => setStep("phone")}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted hover:text-ink"
          >
            <LuArrowLeft className="size-4" /> Change number
          </button>

          <div className="flex justify-center gap-3">
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => (boxes.current[i] = el)}
                value={d}
                inputMode="numeric"
                maxLength={1}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !code[i] && i > 0) boxes.current[i - 1]?.focus();
                  if (e.key === "Enter") verify();
                }}
                className={cx(
                  "tnum size-14 rounded-xl border border-line text-center font-display text-2xl font-bold",
                  "focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                )}
              />
            ))}
          </div>

          {error && <p className="text-center text-xs font-medium text-danger">{error}</p>}

          <Button block onClick={verify}>
            Verify and continue
          </Button>
          <p className="text-center text-[13px] text-ink-muted">
            Didn't get it? <button className="font-semibold text-brand-600 hover:underline">Resend in 30s</button>
          </p>
        </div>
      )}
    </Modal>
  );
}
