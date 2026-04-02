"use client";

import { useState } from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";

const ITEMS = [
  {
    text: "Design Your Team's Gear Now —",
    cta: "Launch 3D Designer",
  },
  {
    text: "Free Shipping on Orders Over $75 —",
    cta: "Shop Now",
  },
  {
    text: "New Summer Collection Just Dropped —",
    cta: "Explore Styles",
  },
];

export default function Topbar() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: marquee 22s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          background: "linear-gradient(90deg, #FFF8E1, #FFFFFF)",
          color: "#b45309",
          fontSize: "13px",
          position: "relative",
          overflow: "hidden",
          height: "40px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {/* 🌀 Scrolling track */}
        <div className="marquee-track">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 48px",
                borderRight: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              {/* Dot */}
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#F4A300",
                }}
              />

              {/* Text */}
              <span>{item.text}</span>

              {/* CTA */}
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#F4A300",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {item.cta}
                <FaArrowRight size={10} />
              </span>
            </div>
          ))}
        </div>

        {/* ❌ Close Button (optional — remove if not needed) */}
        <button
          onClick={() => setShow(false)}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#b45309",
            background: "rgba(0,0,0,0.05)",
            border: "none",
            borderRadius: "9999px",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          <FaTimes size={12} />
        </button>
      </div>
    </>
  );
}