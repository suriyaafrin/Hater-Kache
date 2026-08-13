import { Link } from "react-router-dom";
import { LuBellOff, LuCreditCard, LuGift, LuNavigation, LuStar, LuWrench } from "react-icons/lu";
import { cx } from "../../lib/format";
import { useApp } from "../../store/useApp";
import { EmptyState } from "../../ui/primitives";
import { Sheet } from "../../ui/overlays";

const ICONS = {
  job: LuWrench,
  eta: LuNavigation,
  reward: LuGift,
  payment: LuCreditCard,
  review: LuStar,
};

export default function NotificationPanel({ open, onClose }) {
  const { notifications, markAllRead, markRead, unread } = useApp();

  return (
    <Sheet open={open} onClose={onClose} title="Notifications">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="text-[13px] text-ink-muted">
          {unread ? `${unread} unread` : "You are all caught up"}
        </p>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-[13px] font-semibold text-brand-600 hover:text-brand-700">
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="p-5">
          <EmptyState
            icon={LuBellOff}
            title="No notifications"
            body="Booking updates, arrival alerts and payment receipts land here."
          />
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {notifications.map((n) => {
            const Icon = ICONS[n.kind] || LuWrench;
            return (
              <li key={n.id}>
                <Link
                  to={n.to || "/account"}
                  onClick={() => {
                    markRead(n.id);
                    onClose();
                  }}
                  className={cx(
                    "flex gap-3 px-5 py-4 transition-colors hover:bg-canvas",
                    !n.read && "bg-brand-50/60"
                  )}
                >
                  <span
                    className={cx(
                      "mt-0.5 grid size-9 shrink-0 place-items-center rounded-full",
                      n.read ? "bg-canvas text-ink-muted" : "bg-brand-100 text-brand-700"
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start gap-2">
                      <span className={cx("flex-1 text-sm leading-snug", n.read ? "font-medium text-ink-muted" : "font-semibold text-ink")}>
                        {n.title}
                      </span>
                      {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-500" />}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-ink-muted">{n.body}</span>
                    <span className="mt-1.5 block text-[11.5px] text-ink-soft">{n.ago}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Sheet>
  );
}
