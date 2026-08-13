// Indicative price bands in BDT. Every booking screen reads from here, so a
// single edit updates the estimator, the category pages and the checkout.

export const PLATFORM_FEE = 50;
export const EMERGENCY_SURCHARGE = 300;

export const PRICE_PACKAGES = {
  plumbing: [
    { id: "tap-leak", label: "Tap or leak repair", min: 400, max: 800, mins: 45 },
    { id: "pipe-fitting", label: "Pipe fitting or replacement", min: 900, max: 2200, mins: 120 },
    { id: "pump-service", label: "Water pump service", min: 1200, max: 2800, mins: 150 },
    { id: "bathroom-fitting", label: "Full bathroom fitting", min: 3500, max: 9000, mins: 480 },
  ],
  electrical: [
    { id: "switch-socket", label: "Switch or socket repair", min: 300, max: 600, mins: 30 },
    { id: "fan-light", label: "Fan or light installation", min: 500, max: 1200, mins: 60 },
    { id: "wiring-check", label: "Wiring fault diagnosis", min: 800, max: 1800, mins: 90 },
    { id: "rewiring", label: "Room rewiring", min: 4000, max: 12000, mins: 480 },
  ],
  "ac-repair": [
    { id: "basic-service", label: "Basic servicing", min: 500, max: 700, mins: 45 },
    { id: "deep-clean", label: "Deep cleaning", min: 900, max: 1500, mins: 90 },
    { id: "gas-refill", label: "Gas refill", min: 1500, max: 2500, mins: 90 },
    { id: "installation", label: "Installation or shifting", min: 2500, max: 5000, mins: 180 },
  ],
  "appliance-repair": [
    { id: "diagnosis", label: "Diagnosis visit", min: 400, max: 600, mins: 30 },
    { id: "fridge", label: "Refrigerator repair", min: 1200, max: 4500, mins: 120 },
    { id: "washing-machine", label: "Washing machine repair", min: 1000, max: 3800, mins: 120 },
    { id: "tv", label: "TV repair", min: 900, max: 5000, mins: 90 },
  ],
  "deep-cleaning": [
    { id: "bathroom", label: "Bathroom deep clean", min: 700, max: 1400, mins: 90 },
    { id: "kitchen", label: "Kitchen deep clean", min: 1200, max: 2500, mins: 150 },
    { id: "sofa", label: "Sofa and carpet clean", min: 1500, max: 3500, mins: 120 },
    { id: "full-home", label: "Full home (2–3 bed)", min: 4500, max: 9000, mins: 420 },
  ],
  painting: [
    { id: "single-room", label: "Single room", min: 3500, max: 6500, mins: 480 },
    { id: "putty-primer", label: "Putty and primer", min: 18, max: 26, mins: 480, per: "sqft" },
    { id: "full-home", label: "Full home (1200 sqft)", min: 22000, max: 42000, mins: 2400 },
    { id: "damp-repair", label: "Damp patch repair", min: 1600, max: 4000, mins: 240 },
  ],
  carpentry: [
    { id: "door-repair", label: "Door or hinge repair", min: 500, max: 1500, mins: 60 },
    { id: "furniture-fix", label: "Furniture repair", min: 800, max: 2500, mins: 120 },
    { id: "assembly", label: "Bed or wardrobe assembly", min: 1200, max: 3000, mins: 180 },
    { id: "custom", label: "Custom cabinet work", min: 8000, max: 30000, mins: 1440 },
  ],
  "home-security": [
    { id: "lockout", label: "Lockout entry", min: 800, max: 1800, mins: 45 },
    { id: "lock-change", label: "Lock replacement", min: 1200, max: 3500, mins: 60 },
    { id: "smart-lock", label: "Smart lock setup", min: 3000, max: 9000, mins: 120 },
    { id: "audit", label: "Home security audit", min: 1500, max: 3000, mins: 90 },
  ],
  "cctv-and-security": [
    { id: "single-cam", label: "Single camera install", min: 1500, max: 3000, mins: 90 },
    { id: "four-cam", label: "4-camera package", min: 12000, max: 22000, mins: 420 },
    { id: "dvr", label: "DVR / NVR setup", min: 2000, max: 5000, mins: 120 },
    { id: "doorbell", label: "Smart doorbell", min: 2500, max: 6000, mins: 90 },
  ],
  laundry: [
    { id: "wash-fold", label: "Wash and fold (per kg)", min: 90, max: 140, mins: 1440, per: "kg" },
    { id: "dry-clean", label: "Dry cleaning (per piece)", min: 180, max: 450, mins: 2880, per: "piece" },
    { id: "blanket", label: "Blanket or curtain", min: 400, max: 900, mins: 2880 },
    { id: "express", label: "Express same-day", min: 600, max: 1500, mins: 480 },
  ],
  ironing: [
    { id: "per-piece", label: "Per piece", min: 15, max: 30, mins: 720, per: "piece" },
    { id: "bundle", label: "20-piece bundle", min: 300, max: 550, mins: 720 },
    { id: "saree", label: "Saree press", min: 60, max: 120, mins: 720, per: "piece" },
    { id: "pickup", label: "Pickup and delivery", min: 100, max: 200, mins: 720 },
  ],
  gardening: [
    { id: "cleanup", label: "Garden clean-up", min: 800, max: 2000, mins: 120 },
    { id: "rooftop", label: "Rooftop garden setup", min: 5000, max: 18000, mins: 480 },
    { id: "trimming", label: "Tree trimming", min: 1200, max: 3500, mins: 180 },
    { id: "maintenance", label: "Monthly maintenance", min: 2500, max: 5000, mins: 240 },
  ],
};

export const packagesFor = (slug) => PRICE_PACKAGES[slug] || PRICE_PACKAGES.plumbing;
export const packageById = (slug, id) => packagesFor(slug).find((p) => p.id === id);

export const PAYMENT_METHODS = [
  { id: "bkash", label: "bKash", hint: "Instant · most used", tone: "#E2136E" },
  { id: "nagad", label: "Nagad", hint: "Instant", tone: "#F6821F" },
  { id: "card", label: "Card", hint: "Visa, Mastercard", tone: "#1A1F71" },
  { id: "cash", label: "Cash", hint: "Pay after the job", tone: "#0F7A5A" },
];
