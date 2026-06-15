export const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "May 28, 2026",
    service: "Plumbing",
    comment:
      "Excellent service! The plumber arrived on time, fixed the leaking pipe quickly, and left everything clean. Highly recommended.",
  },
  {
    id: 2,
    name: "Michael Brown",
    rating: 4,
    date: "May 25, 2026",
    service: "Electrical",
    comment:
      "Very professional electrician. The installation was completed safely and efficiently. Good experience overall.",
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 5,
    date: "May 22, 2026",
    service: "Home Cleaning",
    comment:
      "The cleaning team did an amazing job. Every room looked spotless and smelled fresh. Will definitely book again.",
  },
  {
    id: 4,
    name: "James Wilson",
    rating: 4,
    date: "May 20, 2026",
    service: "AC Repair",
    comment:
      "Quick response and fair pricing. My AC is working perfectly now. Customer support was helpful too.",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    rating: 5,
    date: "May 18, 2026",
    service: "Painting",
    comment:
      "Great attention to detail. The painters were friendly and completed the work exactly as requested.",
  },
  {
    id: 6,
    name: "David Anderson",
    rating: 3,
    date: "May 15, 2026",
    service: "Plumbing",
    comment:
      "The issue was fixed, but the technician arrived later than expected. Overall, the quality of work was good.",
  },
  {
    id: 7,
    name: "Sophia Taylor",
    rating: 5,
    date: "May 12, 2026",
    service: "Carpentry",
    comment:
      "Fantastic craftsmanship. The custom shelves look beautiful and feel very sturdy.",
  },
  {
    id: 8,
    name: "Daniel Lee",
    rating: 4,
    date: "May 10, 2026",
    service: "Pest Control",
    comment:
      "Professional team and effective treatment. The pest problem has significantly improved.",
  },
];
const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
  star,
  count: reviews.filter((r) => r.rating === star).length,
  pct: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
}));

export const tagColors = {
    Plumbing: "bg-blue-50 text-blue-700",
    Electrical: "bg-green-50 text-green-700",
    "Home Cleaning": "bg-cyan-50 text-cyan-700",
    "AC Repair": "bg-orange-50 text-orange-700",
    Painting: "bg-pink-50 text-pink-700",
    Carpentry: "bg-amber-50 text-amber-700",
    "Pest Control": "bg-red-50 text-red-700",
  };