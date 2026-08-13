// Dhaka service areas. Coordinates are approximate neighbourhood centres and are
// used for distance / ETA maths and the map panel. Swap in a geocoding API later —
// every consumer reads `lat` / `lng` from here only.

export const AREAS = [
  { id: "uttara", label: "Uttara", zone: "North", lat: 23.8759, lng: 90.3795 },
  { id: "mirpur", label: "Mirpur", zone: "North", lat: 23.8223, lng: 90.3654 },
  { id: "bashundhara", label: "Bashundhara R/A", zone: "North", lat: 23.8203, lng: 90.425 },
  { id: "gulshan", label: "Gulshan", zone: "Central", lat: 23.7925, lng: 90.4078 },
  { id: "banani", label: "Banani", zone: "Central", lat: 23.7936, lng: 90.4043 },
  { id: "mohakhali", label: "Mohakhali", zone: "Central", lat: 23.7784, lng: 90.4033 },
  { id: "badda", label: "Badda", zone: "East", lat: 23.7806, lng: 90.4258 },
  { id: "rampura", label: "Rampura", zone: "East", lat: 23.7614, lng: 90.421 },
  { id: "khilgaon", label: "Khilgaon", zone: "East", lat: 23.75, lng: 90.427 },
  { id: "tejgaon", label: "Tejgaon", zone: "Central", lat: 23.7639, lng: 90.3931 },
  { id: "mohammadpur", label: "Mohammadpur", zone: "West", lat: 23.766, lng: 90.3585 },
  { id: "dhanmondi", label: "Dhanmondi", zone: "West", lat: 23.7461, lng: 90.3742 },
  { id: "hazaribagh", label: "Hazaribagh", zone: "West", lat: 23.7333, lng: 90.3625 },
  { id: "shahbag", label: "Shahbag", zone: "Central", lat: 23.7383, lng: 90.3956 },
  { id: "ramna", label: "Ramna", zone: "Central", lat: 23.7377, lng: 90.4008 },
  { id: "motijheel", label: "Motijheel", zone: "South", lat: 23.733, lng: 90.4172 },
  { id: "lalbagh", label: "Lalbagh", zone: "South", lat: 23.7185, lng: 90.388 },
  { id: "chawkbazar", label: "Chawkbazar", zone: "South", lat: 23.7167, lng: 90.395 },
  { id: "jatrabari", label: "Jatrabari", zone: "South", lat: 23.7104, lng: 90.438 },
];

export const DEFAULT_AREA_ID = "dhanmondi";

export const areaById = (id) => AREAS.find((a) => a.id === id) || AREAS.find((a) => a.id === DEFAULT_AREA_ID);

export const areaByLabel = (label = "") =>
  AREAS.find((a) => a.label.toLowerCase() === String(label).toLowerCase().trim());

/** Great-circle distance in km. */
export function distanceKm(a, b) {
  if (!a || !b) return 0;
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Dhaka traffic is the honest constraint here — ~13 km/h door to door. */
export function etaMinutes(km) {
  return Math.max(8, Math.round(8 + (km / 13) * 60));
}

export const ZONES = [...new Set(AREAS.map((a) => a.zone))];
