import { useState } from "react";
import { reviews as initialReviews, tagColors } from "../../../data/reviewData";
import WriteReviewModal from "./reviewModal";
import StarPicker from "./starPicker";




const avatarColors = [
  "bg-orange-100 text-orange-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-700",
  "bg-red-100 text-red-700",
];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function StarRow({ count, max = 5, size = "text-sm" }) {
  return (
    <div className={`flex gap-0.5 ${size}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < count ? "text-yellow-400" : "text-gray-200"}>★</span>
      ))}
    </div>
  );
}

<StarPicker/>

function ThumbsUp() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
    </svg>
  );
}

<WriteReviewModal/>

export default function Review() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showModal, setShowModal] = useState(false);

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
  }));

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  const recommendPct = Math.round((reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100);

  const handleNewReview = (review) => {
    setReviews((prev) => [review, ...prev]);
  };

  return (
    <div className="py-10 px-4 font-sans">
      {showModal && (
        <WriteReviewModal
          onClose={() => setShowModal(false)}
          onSubmit={handleNewReview}
        />
      )}

      
      <div className="flex flex-col items-center gap-2 max-w-3xl mx-auto mb-8">
        <h3 className="font-bold text-[#1E3A5C] text-2xl">Reviews</h3>
        <p className="text-gray-500 text-sm">See what our customers are saying about us!</p>
      </div>

      
      <div className="flex items-center max-w-6xl mx-auto bg-white border border-gray-100 rounded-2xl px-8 py-6 shadow-sm mb-6">
        <div className="flex flex-col items-center gap-1 min-w-25">
          <span className="text-5xl font-bold text-[#1E3A5F] leading-none">{avgRating}</span>
          <div className="mt-1">
            <StarRow count={Math.round(avgRating)} size="text-xl" />
          </div>
          <span className="text-sm font-semibold text-[#1E3A5F]">Excellent</span>
          <span className="text-xs text-gray-400 text-center">Based on {reviews.length} reviews</span>
        </div>

        <div className="w-px self-stretch bg-gray-100 mx-6" />

        <div className="flex-1 flex flex-col gap-2">
          {ratingBreakdown.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-2 text-right">{star}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#FF4D7D]" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-gray-400 w-5">{count}</span>
            </div>
          ))}
        </div>

        <div className="w-px self-stretch bg-gray-100 mx-6" />

        <div className="flex flex-col items-center gap-1 min-w-20">
          <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#FF4D7D]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-[#1E3A5F]">{recommendPct}%</span>
          <span className="text-xs text-gray-400 text-center leading-snug">Customers recommend us</span>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-100">
        {reviews.map((r, idx) => (
          <div key={r.id} className="px-6 py-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarColors[idx % avatarColors.length]}`}>
                {getInitials(r.name)}
              </div>
              <span className="text-sm font-semibold text-[#1E3A5C]">{r.name}</span>
              <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
              <span className="text-gray-300 text-sm cursor-pointer select-none">•••</span>
            </div>
            <div className="mb-2">
              <StarRow count={r.rating} />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">{r.comment}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${tagColors[r.service] ?? "bg-gray-100 text-gray-600"}`}>
                {r.service}
              </span>
              <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
                <ThumbsUp />
                Helpful
              </button>
            </div>
          </div>
        ))}
      </div>

    
      <div className="max-w-6xl mx-auto mt-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-xl">💬</div>
          <div>
            <p className="text-sm font-semibold text-[#1E3A5C] mb-0.5">Share your experience</p>
            <p className="text-xs text-gray-400">Help others by leaving a review about our service.</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#FF4D7D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap hover:bg-[#e6446f] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
          </svg>
          Write a Review
        </button>
      </div>
    </div>
  );
}