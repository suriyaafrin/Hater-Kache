import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuBell, LuChevronDown, LuMapPin, LuMenu, LuSearch, LuUser, LuX } from "react-icons/lu";
import { cx } from "../../lib/format";
import { useLockBody, useScrolled } from "../../lib/hooks";
import { useApp } from "../../store/useApp";
import { Button } from "../../ui/primitives";
import { Logo } from "../../ui/brand";
import AuthModal from "./AuthModal";
import LocationPicker from "./LocationPicker";
import NotificationPanel from "./NotificationPanel";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/search", label: "Find professionals" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const scrolled = useScrolled(8);
  const navigate = useNavigate();
  const { area, unread, user } = useApp();
  const [menu, setMenu] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useLockBody(menu);

  const linkClass = ({ isActive }) =>
    cx(
      "relative py-1 text-sm font-medium transition-colors",
      isActive ? "text-ink" : "text-ink-muted hover:text-ink",
      isActive &&
        "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-brand-600"
    );

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled ? "border-line bg-white/85 shadow-soft backdrop-blur-md" : "border-transparent bg-white"
        )}
      >
        <div className="shell flex h-16 items-center gap-4 lg:h-[72px]">
          <Link to="/" aria-label="Hater-Kache home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="ml-6 hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setLocationOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink md:inline-flex"
            >
              <LuMapPin className="size-4 text-brand-600" />
              <span className="max-w-28 truncate">{area.label}</span>
              <LuChevronDown className="size-3.5 opacity-60" />
            </button>

            <button
              onClick={() => navigate("/search")}
              aria-label="Search"
              className="grid size-10 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
            >
              <LuSearch className="size-[18px]" />
            </button>

            <button
              onClick={() => setNotifOpen(true)}
              aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
              className="relative grid size-10 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
            >
              <LuBell className="size-[18px]" />
              {unread > 0 && (
                <span className="tnum absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-brand-600 text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>

            {user.signedIn ? (
              <Link
                to={user.role === "pro" ? "/pro" : "/account"}
                className="hidden size-10 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-canvas hover:text-ink sm:grid"
                aria-label="Your account"
              >
                <LuUser className="size-[18px]" />
              </Link>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink sm:block"
              >
                Log in
              </button>
            )}

            <div className="hidden sm:block">
              <Button to="/services" size="sm">
                Get a service
              </Button>
            </div>

            <button
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="grid size-10 place-items-center rounded-lg text-ink transition-colors hover:bg-canvas lg:hidden"
            >
              <LuMenu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brand-900/35 backdrop-blur-[2px]" onClick={() => setMenu(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-xs flex-col bg-white shadow-pop animate-slide-up">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                onClick={() => setMenu(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-lg text-ink-muted hover:bg-canvas"
              >
                <LuX className="size-[18px]" />
              </button>
            </div>

            <button
              onClick={() => {
                setMenu(false);
                setLocationOpen(true);
              }}
              className="flex items-center gap-2.5 border-b border-line px-5 py-3.5 text-left"
            >
              <LuMapPin className="size-4 text-brand-600" />
              <span className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  Service area
                </span>
                <span className="block text-sm font-semibold">{area.label}</span>
              </span>
              <LuChevronDown className="size-4 text-ink-soft" />
            </button>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setMenu(false)}
                  className={({ isActive }) =>
                    cx(
                      "block rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
                      isActive ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-canvas"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="my-2 h-px bg-line" />
              <NavLink to="/assistant" onClick={() => setMenu(false)} className="block rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-canvas">
                Assistant
              </NavLink>
              <NavLink to="/emergency" onClick={() => setMenu(false)} className="block rounded-lg px-3 py-3 text-[15px] font-medium text-danger hover:bg-danger-soft">
                Emergency service
              </NavLink>
              <NavLink to={user.role === "pro" ? "/pro" : "/account"} onClick={() => setMenu(false)} className="block rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-canvas">
                {user.role === "pro" ? "Professional dashboard" : "Your account"}
              </NavLink>
            </nav>

            <div className="safe-bottom space-y-2 border-t border-line px-5 py-4">
              <Button block to="/services" onClick={() => setMenu(false)}>
                Get a service
              </Button>
              {!user.signedIn && (
                <Button
                  block
                  variant="secondary"
                  onClick={() => {
                    setMenu(false);
                    setAuthOpen(true);
                  }}
                >
                  Log in
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <LocationPicker open={locationOpen} onClose={() => setLocationOpen(false)} />
      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
