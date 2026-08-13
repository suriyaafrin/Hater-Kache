# Hater-Kache · হাতে-কাছে

Trusted professionals, right at your doorstep — a home-service marketplace for Dhaka.

React 19 · Vite · Tailwind v4 · React Router 7

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
```

---

## The idea the design is built around

The brand name means *close at hand*. In Dhaka the difference between a 2 km and an
8 km professional is an hour of someone's evening, so **proximity is treated as the
product's core promise, not a detail**:

- The **proximity ring** — a small arc gauge that fills as a professional gets closer —
  is the signature element. It appears on cards, profiles, the booking flow, tracking
  and the pro dashboard. It encodes real distance, calculated from real coordinates.
- Results rank by closeness first, then reputation (`src/lib/search.js` → `score()`).
- Changing your area in the header genuinely re-sorts and re-times everything.

### Design system

| Token | Value | Used for |
| --- | --- | --- |
| `brand-600` | `#0F7A5A` | Primary actions, active states, verification |
| `brand-900` | `#052B21` | Dark sections, footer, toasts |
| `brand-50/100` | mint | Card tints, selected states |
| `ink` / `ink-muted` / `ink-soft` | green-cast neutrals | Text hierarchy |
| `warn` `danger` `info` | amber / red / blue | Status only, never decoration |

Type: **Bricolage Grotesque** (display) · **Instrument Sans** (UI) · **Anek Bangla**
(Bangla text and the ৳ sign — it is in every stack because Latin faces have no glyph
for U+09F3). Numeric data uses the `.tnum` utility for tabular figures.

All tokens live in `src/index.css` under `@theme`. Change a value there and it
propagates everywhere — no hard-coded hexes in components.

---

## Structure

```
data/                       # content layer — no React except icon imports
  catalog.js                # categories + normalised professionals (the source of truth)
  locations.js              # 19 Dhaka areas with coordinates, distance + ETA maths
  pricing.js                # price bands per category, payment methods, fees
  assistant.js              # symptom library, rewards, review + notification seeds
  serviceLists.js           # sub-services per category
  all-Data/                 # the original per-trade technician records

src/
  lib/          format.js (৳, km, dates) · hooks.js · search.js (filters, sort, synonyms)
  store/        AppContext.jsx (provider) · useApp.js (hook) · bookingStages.js
  ui/           primitives.jsx · brand.jsx (logo, ring, stars, badges) · overlays.jsx
  components/   nav/ · home/ · pro/ · map/ · footer/
  pages/        Home, Services, ServiceDetail, Search, ProProfile, Booking, Tracking,
                Messages, Emergency, Assistant, Account, ProDashboard, HowItWorks,
                About, NotFound
```

`data/catalog.js` enriches each of the 120 technician records deterministically —
badges, bio, portfolio, weekly availability, completion rate — using a seeded hash, so
profiles never change between reloads without a database.

### State

`AppProvider` holds area, favourites, bookings, notifications, chat, points and toasts,
persisted to `localStorage` under `hk.*`. It is seeded with one in-progress booking
(`HK-4821`) and two completed ones so tracking, dashboards and reviews have something
real to show. **Clearing site data resets to that seed.**

---

## Where to plug in real services

Each of these is isolated to one place on purpose:

| Feature | File | What to do |
| --- | --- | --- |
| Map | `src/components/map/MapPanel.jsx` | Drawn SVG that projects genuine lat/lng. Swap the component for Google Maps or Mapbox; keep the `center` / `points` / `route` props. |
| AI assistant | `data/assistant.js` → `diagnose()` | Replace the body with an API call returning `{ problem, causes, service, min, max, urgency, ask }`. The UI already renders that shape. |
| Payments | `data/pricing.js` → `PAYMENT_METHODS` | bKash / Nagad / card / cash are UI-only. No real processing is implemented. |
| Auth | `src/components/nav/AuthModal.jsx` | Mock phone + 4-digit code. Any code works. |
| Portfolio photos | `data/catalog.js` → `buildGallery()` | Set `before` / `after` to image URLs; `<WorkTile>` uses them instead of the drawn tile. |

---

## Notes

- Fully responsive: bottom tab bar, sticky booking CTAs, filter sheets and a full-screen
  booking flow on mobile.
- Accessibility: skip link, visible focus rings, labelled controls, `prefers-reduced-motion`
  respected globally.
- Loading, empty and error states exist for every list surface.
- `npm run lint` is clean; fixes were made at the source rather than with disable comments.
- Route map: `/` `/services` `/services/:slug` `/search` `/pro/:uid` `/book` `/track/:id`
  `/messages` `/emergency` `/assistant` `/account/:tab` `/pro` `/how-it-works` `/about`
