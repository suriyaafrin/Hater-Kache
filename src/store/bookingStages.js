export const BOOKING_STAGES = [
  { id: "requested", label: "Request sent", note: "We passed your job to the professional." },
  { id: "accepted", label: "Professional accepted", note: "The job is confirmed for your slot." },
  { id: "on_the_way", label: "On the way", note: "Follow the live location and ETA." },
  { id: "started", label: "Service started", note: "Work is underway at your address." },
  { id: "completed", label: "Completed", note: "Pay and rate the work." },
];

export const stageIndex = (id) => Math.max(0, BOOKING_STAGES.findIndex((s) => s.id === id));
