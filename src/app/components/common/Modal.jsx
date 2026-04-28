"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Frosted glass backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="modal-wrapper">
        {/* Close button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X className="modal-close-icon" />
        </button>

        {/* Modal content card */}
        <div className="modal-card">
          {children}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400&display=swap');

        /* ── Backdrop ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(230, 222, 215, 0.35);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          animation: backdropIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ── Wrapper (centers the card) ── */
        .modal-wrapper {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          animation: cardIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ── Close button ── */
        .modal-close-btn {
          position: absolute;
          top: -3rem;
          right: -0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: none;
          background: transparent;
          cursor: pointer;
          opacity: 0.45;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .modal-close-btn:hover {
          opacity: 1;
          transform: rotate(90deg);
        }

        .modal-close-icon {
          width: 1.1rem;
          height: 1.1rem;
          color: #5c4f47;
          stroke-width: 1.5;
        }

        /* ── Card ── */
        .modal-card {
          position: relative;
          background: rgba(255, 252, 249, 0.72);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(255, 248, 242, 0.9);
          border-radius: 1.5rem;
          box-shadow:
            0 2px 4px rgba(180, 160, 140, 0.06),
            0 8px 24px rgba(160, 130, 110, 0.10),
            0 32px 64px rgba(140, 110, 90, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.85);
          overflow: hidden;
          font-family: 'Jost', sans-serif;
          color: #3d3530;
        }

        /* Subtle petal-shimmer top accent */
        .modal-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 220, 190, 0.7) 40%,
            rgba(255, 200, 170, 0.5) 60%,
            transparent
          );
          border-radius: 50%;
        }

        /* Gentle inner glow at bottom */
        .modal-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(
            to top,
            rgba(255, 240, 228, 0.25),
            transparent
          );
          pointer-events: none;
        }

        /* ── Animations ── */
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translate(-50%, -47%) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
}