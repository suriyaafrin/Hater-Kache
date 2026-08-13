export const cx = (...parts) => parts.filter(Boolean).join(" ");

const bdt = new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 });

/** ৳1,250 */
export const taka = (n) => `৳${bdt.format(Math.round(Number(n) || 0))}`;

/** ৳900–1,500 */
export const takaRange = (min, max, per) =>
  `${taka(min)}–${bdt.format(Math.round(max))}${per ? `/${per}` : ""}`;

export const km = (n) => `${Number(n).toFixed(1)} km`;

export const minutes = (n) => (n >= 60 ? `${Math.floor(n / 60)}h ${n % 60}m` : `${n} min`);

/** +880 1711-234567 → 01711-234567 for display in-country. */
export const localPhone = (p = "") => p.replace("+880 ", "0");

export const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const bookingId = () =>
  `HK-${Math.floor(1000 + Math.random() * 8999)}`;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function dayOptions(count = 7) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push({
      key: d.toISOString().slice(0, 10),
      day: i === 0 ? "Today" : i === 1 ? "Tomorrow" : DAYS[d.getDay()],
      date: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
      weekend: d.getDay() === 5,
    });
  }
  return out;
}

export const TIME_SLOTS = [
  { id: "08-10", label: "8:00 – 10:00 AM" },
  { id: "10-12", label: "10:00 AM – 12:00 PM" },
  { id: "12-14", label: "12:00 – 2:00 PM" },
  { id: "14-16", label: "2:00 – 4:00 PM" },
  { id: "16-18", label: "4:00 – 6:00 PM" },
  { id: "18-20", label: "6:00 – 8:00 PM" },
];

export function clockNow(offsetMin = 0) {
  const d = new Date(Date.now() + offsetMin * 60000);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function dateLabel(key) {
  if (!key) return "";
  const d = new Date(key);
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

/** Bangladeshi mobile numbers: 11 digits starting 01. */
export const isValidBdPhone = (v = "") => /^01[3-9]\d{8}$/.test(v.replace(/[\s-]/g, ""));

/** Wrapped so components stay free of impure calls in the render scope. */
export const nowMs = () => Date.now();
