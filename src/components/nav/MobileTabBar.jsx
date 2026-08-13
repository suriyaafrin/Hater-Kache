import { NavLink } from "react-router-dom";
import { LuGrid2X2, LuHouse, LuMessageSquare, LuSearch, LuUser } from "react-icons/lu";
import { cx } from "../../lib/format";
import { useApp } from "../../store/useApp";

const TABS = [
  { to: "/", label: "Home", icon: LuHouse, end: true },
  { to: "/services", label: "Services", icon: LuGrid2X2 },
  { to: "/search", label: "Search", icon: LuSearch },
  { to: "/messages", label: "Messages", icon: LuMessageSquare, badge: true },
  { to: "/account", label: "Account", icon: LuUser },
];

export default function MobileTabBar() {
  const { activeBooking } = useApp();

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur-md lg:hidden">
      <ul className="grid grid-cols-5">
        {TABS.map((t) => (
          <li key={t.to}>
            <NavLink
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                cx(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[10.5px] font-medium transition-colors",
                  isActive ? "text-brand-700" : "text-ink-soft"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <t.icon className={cx("size-[19px]", isActive && "text-brand-600")} aria-hidden />
                    {t.badge && activeBooking && (
                      <span className="absolute -right-1 -top-0.5 size-2 rounded-full bg-brand-500 ring-2 ring-white" />
                    )}
                  </span>
                  {t.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
