import { Link } from "react-router-dom";
import { LuBriefcase, LuClock, LuHeart, LuMapPin } from "react-icons/lu";
import { cx, km as kmLabel, minutes, taka } from "../../lib/format";
import { useApp } from "../../store/useApp";
import { Avatar, BadgeRow, ProximityRing, RatingInline, VerifiedTick } from "../../ui/brand";
import { Button, Card, Skeleton, StatusDot } from "../../ui/primitives";

function FavouriteButton({ uid, name }) {
  const { isFavourite, toggleFavourite, toast } = useApp();
  const on = isFavourite(uid);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        const added = toggleFavourite(uid);
        toast(added ? `${name} saved to favourites` : `${name} removed from favourites`);
      }}
      aria-label={on ? "Remove from favourites" : "Save to favourites"}
      aria-pressed={on}
      className={cx(
        "grid size-9 place-items-center rounded-full border transition-all duration-200 active:scale-90",
        on
          ? "border-danger/20 bg-danger-soft text-danger"
          : "border-line bg-white text-ink-soft hover:border-danger/30 hover:text-danger"
      )}
    >
      <LuHeart className={cx("size-[17px] transition-transform", on && "scale-110")} style={on ? { fill: "currentColor" } : undefined} />
    </button>
  );
}

export default function ProCard({ pro, showBadges = true, className }) {
  return (
    <Card hover className={cx("flex flex-col p-5", className)}>
      <div className="flex items-start gap-3.5">
        <Avatar name={pro.name} initials={pro.initials} size={52} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Link to={`/pro/${pro.uid}`} className="truncate font-display text-[17px] font-bold leading-tight hover:text-brand-700">
              {pro.name}
            </Link>
            <VerifiedTick />
          </div>
          <p className="mt-0.5 truncate text-[13px] text-ink-muted">
            {pro.service} · {pro.categoryLabel}
          </p>
          <div className="mt-1.5 flex items-center gap-3">
            <RatingInline rating={pro.rating} reviews={pro.reviews} />
            {pro.available ? (
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-700">
                <StatusDot /> Available now
              </span>
            ) : (
              <span className="text-[12.5px] font-medium text-ink-soft">Booked today</span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2">
          <FavouriteButton uid={pro.uid} name={pro.name} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 rounded-xl bg-canvas px-3.5 py-3">
        <ProximityRing km={pro.km ?? 2} size={48} />
        <div className="min-w-0 flex-1 space-y-1.5 text-[12.5px] text-ink-muted">
          <p className="flex items-center gap-1.5 truncate">
            <LuMapPin className="size-3.5 shrink-0 text-ink-soft" />
            {pro.home.label} · {kmLabel(pro.km ?? 0)} away
          </p>
          <p className="flex items-center gap-1.5">
            <LuClock className="size-3.5 shrink-0 text-ink-soft" />
            Arrives in about {minutes(pro.eta ?? 20)}
          </p>
          <p className="flex items-center gap-1.5">
            <LuBriefcase className="size-3.5 shrink-0 text-ink-soft" />
            <span className="tnum">{pro.years} yrs</span> · <span className="tnum">{pro.jobs}</span> jobs done
          </p>
        </div>
      </div>

      {showBadges && <BadgeRow ids={pro.badges} max={2} size="sm" className="mt-3.5" />}

      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Starting from</p>
          <p className="tnum font-display text-xl font-bold leading-tight">
            {taka(pro.priceFrom)}
            <span className="text-[13px] font-medium text-ink-muted">/{pro.priceUnit}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" to={`/pro/${pro.uid}`}>
            Profile
          </Button>
          <Button size="sm" to={`/book?pro=${pro.uid}`}>
            Book now
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function ProCardSkeleton() {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3.5">
        <Skeleton className="size-[52px] rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-3/5" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="size-9 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-[86px] rounded-xl" />
      <div className="mt-4 flex items-end justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-9 w-36 rounded-lg" />
      </div>
    </Card>
  );
}

/** Dense variant for dashboards, favourites and booking step 2. */
export function ProRow({ pro, selected, onSelect, action }) {
  return (
    <div
      onClick={onSelect}
      className={cx(
        "flex items-center gap-3.5 rounded-xl border p-3.5 transition-all",
        onSelect && "cursor-pointer",
        selected ? "border-brand-600 bg-brand-50 ring-4 ring-brand-100" : "border-line bg-white hover:border-brand-200"
      )}
    >
      <Avatar name={pro.name} initials={pro.initials} size={44} />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 truncate text-sm font-semibold">
          {pro.name} <VerifiedTick className="size-3.5" />
        </p>
        <p className="truncate text-[12.5px] text-ink-muted">
          {pro.service} · <span className="tnum">{pro.years} yrs</span>
        </p>
        <div className="mt-1 flex items-center gap-2.5">
          <RatingInline rating={pro.rating} reviews={pro.reviews} size={12} />
          {pro.km != null && <span className="tnum text-[12px] text-ink-soft">{kmLabel(pro.km)}</span>}
        </div>
      </div>
      {action ?? (
        <div className="shrink-0 text-right">
          <p className="tnum font-display text-[15px] font-bold">{taka(pro.priceFrom)}</p>
          <p className="text-[11px] text-ink-soft">per {pro.priceUnit}</p>
        </div>
      )}
    </div>
  );
}
