import { Link } from "react-router-dom";
import { cx } from "../lib/format";
import { useReveal } from "../lib/hooks";


const VARIANTS = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-soft disabled:bg-brand-300",
  secondary:
    "bg-white text-ink border border-line hover:border-line-strong hover:bg-canvas active:bg-brand-50",
  quiet: "bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-200",
  ghost: "text-ink-muted hover:text-ink hover:bg-canvas",
  dark: "bg-brand-900 text-white hover:bg-brand-800",
  danger: "bg-danger text-white hover:brightness-110 active:brightness-95",
  outlineDanger: "border border-danger/30 text-danger bg-danger-soft hover:bg-danger/10",
};

const SIZES = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-13 px-6 text-[15px] gap-2 rounded-xl",
};

export function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  block,
  className,
  children,
  ...rest
}) {
  const cls = cx(
    "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-150",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    block && "w-full",
    className
  );
  const inner = (
    <>
      {Icon && <Icon className="size-[1.15em] shrink-0" aria-hidden />}
      {children}
      {IconRight && <IconRight className="size-[1.15em] shrink-0" aria-hidden />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  const Tag = as || "button";
  return <Tag className={cls} {...rest}>{inner}</Tag>;
}


export function Card({ as: Tag = "div", hover, className, children, ...rest }) {
  return (
    <Tag
      className={cx(
        "rounded-card border border-line bg-white",
        hover && "transition-all duration-200 hover:border-brand-200 hover:shadow-lift hover:-translate-y-0.5",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Chip({ active, className, children, ...rest }) {
  return (
    <button
      type="button"
      className={cx(
        "h-9 shrink-0 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-line bg-white text-ink-muted hover:border-brand-300 hover:text-brand-700",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

const TONES = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  neutral: "bg-canvas text-ink-muted border-line",
  success: "bg-brand-50 text-brand-700 border-brand-100",
  warn: "bg-warn-soft text-warn border-warn/20",
  danger: "bg-danger-soft text-danger border-danger/20",
  info: "bg-info-soft text-info border-info/20",
};

export function Tag({ tone = "neutral", icon: Icon, className, children }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold",
        TONES[tone],
        className
      )}
    >
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {children}
    </span>
  );
}

/** Live availability dot. */
export function StatusDot({ on = true, className }) {
  return (
    <span className={cx("relative inline-flex size-2", className)}>
      {on && <span className="absolute inset-0 rounded-full bg-brand-400 animate-ping-slow" />}
      <span className={cx("relative size-2 rounded-full", on ? "bg-brand-500" : "bg-ink-soft")} />
    </span>
  );
}


export function SectionHead({ eyebrow, title, sub, action, align = "left", className }) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow mb-2.5">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold sm:text-[32px] sm:leading-[1.15]">{title}</h2>
        {sub && <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Reveal({ delay = 0, className, children }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      data-shown={shown}
      className={cx("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}


export function Field({ label, hint, error, required, className, children }) {
  return (
    <label className={cx("block", className)}>
      {label && (
        <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink">
          {label}
          {required && <span className="text-danger">*</span>}
        </span>
      )}
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs font-medium text-danger">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-ink-soft">{hint}</span>
      ) : null}
    </label>
  );
}

const CONTROL =
  "w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink placeholder:text-ink-soft " +
  "transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";

export const Input = ({ className, invalid, ...rest }) => (
  <input className={cx(CONTROL, "h-11", invalid && "border-danger focus:ring-danger/10", className)} {...rest} />
);

export const Textarea = ({ className, rows = 4, ...rest }) => (
  <textarea rows={rows} className={cx(CONTROL, "py-3 leading-relaxed", className)} {...rest} />
);

export const Select = ({ className, children, ...rest }) => (
  <select className={cx(CONTROL, "h-11 appearance-none pr-9", className)} {...rest}>
    {children}
  </select>
);


export const Skeleton = ({ className }) => (
  <div className={cx("skeleton rounded-lg", className)} aria-hidden />
);

export function EmptyState({ icon: Icon, title, body, action, className }) {
  return (
    <div className={cx("flex flex-col items-center rounded-panel border border-dashed border-line-strong bg-canvas px-6 py-14 text-center", className)}>
      {Icon && (
        <span className="mb-4 grid size-12 place-items-center rounded-full bg-white text-brand-600 shadow-soft">
          <Icon className="size-5" aria-hidden />
        </span>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {body && <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", body, onRetry, className }) {
  return (
    <div className={cx("rounded-panel border border-danger/20 bg-danger-soft px-6 py-10 text-center", className)}>
      <h3 className="text-lg font-semibold text-danger">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
        {body || "The request did not go through. Check your connection and try again."}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}


export function Tooltip({ label, children, className }) {
  return (
    <span className={cx("group/tt relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-40 w-52 -translate-x-1/2 scale-95 rounded-lg bg-brand-900 px-3 py-2 text-center text-[11.5px] font-medium leading-snug text-white opacity-0 shadow-pop transition-all duration-150 group-hover/tt:scale-100 group-hover/tt:opacity-100 group-focus-within/tt:scale-100 group-focus-within/tt:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}


export function Progress({ value, className, tone = "bg-brand-600" }) {
  return (
    <div className={cx("h-1.5 w-full overflow-hidden rounded-full bg-line", className)}>
      <div
        className={cx("h-full rounded-full transition-[width] duration-700", tone)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
