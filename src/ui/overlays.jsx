import { LuCheck, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";
import { cx } from "../lib/format";
import { useEscape, useLockBody } from "../lib/hooks";

export function Backdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-40 bg-brand-900/35 backdrop-blur-[2px] animate-[fade-up_.2s_ease]"
      aria-hidden
    />
  );
}

/** Centered dialog on desktop, bottom sheet on mobile. */
export function Modal({ open, onClose, title, sub, size = "md", footer, children }) {
  useLockBody(open);
  useEscape(onClose, open);
  if (!open) return null;

  const width = { sm: "sm:max-w-md", md: "sm:max-w-lg", lg: "sm:max-w-2xl", xl: "sm:max-w-4xl" }[size];

  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cx(
            "flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-panel bg-white shadow-pop",
            "animate-slide-up sm:rounded-panel",
            width
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
            <div className="min-w-0">
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              {sub && <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{sub}</p>}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="-mr-1 grid size-9 shrink-0 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
            >
              <LuX className="size-[18px]" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

          {footer && <div className="border-t border-line bg-canvas px-5 py-4 sm:px-6">{footer}</div>}
        </div>
      </div>
    </>
  );
}

/** Side sheet (desktop) / full-height panel (mobile). */
export function Sheet({ open, onClose, title, side = "right", width = "max-w-sm", children }) {
  useLockBody(open);
  useEscape(onClose, open);
  if (!open) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          "fixed inset-y-0 z-50 flex w-full flex-col bg-white shadow-pop",
          width,
          side === "right" ? "right-0" : "left-0"
        )}
        style={{ animation: "slide-up .28s cubic-bezier(.2,.7,.3,1) both" }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 grid size-9 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
          >
            <LuX className="size-[18px]" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>
  );
}

/* ── Toasts ──────────────────────────────────────────────────────────────── */

const TOAST_TONES = {
  success: { icon: LuCheck, cls: "bg-brand-900 text-white", accent: "text-brand-300" },
  info: { icon: LuInfo, cls: "bg-brand-900 text-white", accent: "text-brand-300" },
  warn: { icon: LuTriangleAlert, cls: "bg-warn text-white", accent: "text-white" },
  error: { icon: LuTriangleAlert, cls: "bg-danger text-white", accent: "text-white" },
};

export function ToastHost({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6">
      {toasts.map((t) => {
        const tone = TOAST_TONES[t.tone] || TOAST_TONES.success;
        const Icon = tone.icon;
        return (
          <div
            key={t.id}
            role="status"
            className={cx(
              "pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-pop animate-slide-up",
              tone.cls
            )}
          >
            <Icon className={cx("size-4 shrink-0", tone.accent)} aria-hidden />
            <span className="flex-1">{t.message}</span>
            <button onClick={() => onDismiss(t.id)} aria-label="Dismiss" className="opacity-60 hover:opacity-100">
              <LuX className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────────────── */

export function Lightbox({ open, onClose, title, children }) {
  useLockBody(open);
  useEscape(onClose, open);
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-brand-900/80 backdrop-blur-sm" aria-hidden />
      <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-10">
        <div className="w-full max-w-3xl animate-pop-in">
          <div className="mb-3 flex items-center justify-between text-white">
            <p className="text-sm font-semibold">{title}</p>
            <button onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20">
              <LuX className="size-[18px]" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
