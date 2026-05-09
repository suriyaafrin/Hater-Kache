import React, { useState } from 'react'

const services = [
  {
    label: "Plumbing",
    position: "top-3 left-4",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" />
      </svg>
    ),
  },
  {
    label: "Appliance Repair",
    position: "top-3 right-4",
    bg: "bg-orange-50",
    iconColor: "text-orange-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Electrical",
    position: "bottom-8 left-4",
    bg: "bg-green-50",
    iconColor: "text-green-500",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: "Painting",
    position: "bottom-8 right-4",
    bg: "bg-pink-50",
    iconColor: "text-pink-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 3a3 3 0 0 0-3 3l-7 7-1 4 4-1 7-7a3 3 0 0 0 0-6z" />
      </svg>
    ),
  },
]

const trustBadges = [
  {
    label: "Verified",
    sub: "Professionals",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D7D" strokeWidth="2.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Transparent",
    sub: "Pricing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D7D" strokeWidth="2.2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    label: "On-time",
    sub: "Service",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D7D" strokeWidth="2.2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

const popularServices = ["AC Repair", "Deep Cleaning", "Carpentry", "Pest Control", "CCTV Install"]
