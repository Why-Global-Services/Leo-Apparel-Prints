"use client";

// src/app/not-found.jsx

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <style>{`
        @keyframes spinDown {
          0%, 100% { transform: none; }
          25%  { transform: translateX(100%); }
          50%  { transform: translateX(100%) translateY(100%); }
          75%  { transform: translateY(100%); }
        }
        @keyframes spinUp {
          0%, 100% { transform: none; }
          25%  { transform: translateX(-100%); }
          50%  { transform: translateX(-100%) translateY(-100%); }
          75%  { transform: translateY(-100%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse404 {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.6; }
        }

        .nf-wrap {
          min-height: 100vh;
          background: #f7f8fc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .nf-box {
          text-align: center;
          animation: fadeUp 0.5s ease both;
        }

        /* Spinner — uses your global brand colors */
        .spinner {
          --size: 30px;
          --first-block-clr: #005bba;
          --second-block-clr: #fed500; 
          width: 100px;
          height: 100px;
          position: relative;
          margin: 0 auto;
        }
        .spinner::before,
        .spinner::after {
          box-sizing: border-box;
          position: absolute;
          content: "";
          width: var(--size);
          height: var(--size);
          top: 50%;
          left: 50%;
          background: var(--first-block-clr);
          animation: spinUp 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
        }
        .spinner::after {
          background: var(--second-block-clr);
          top: calc(50% - var(--size));
          left: calc(50% - var(--size));
          animation: spinDown 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
        }

        /* 404 */
        .nf-code {
          font-size: clamp(76px, 10vw, 160px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -6px;
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pulse404 3s ease-in-out infinite;
          user-select: none;
        }

        /* gold bar */
        .nf-bar {
          width: 48px;
          height: 4px;
          background: #F5A623;
          border-radius: 2px;
          margin: 14px auto 20px;
        }

        .nf-title {
          font-size: 20px;
          font-weight: 800;
          color: #1A1A2E;
          margin: 0 0 10px;
        }

        .nf-desc {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          max-width: 340px;
          margin: 0 auto 32px;
        }

        /* buttons */
        .nf-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .btn-gold {
          background: #F5A623;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-gold:hover {
          background: #d4891a;
          transform: translateY(-1px);
        }
        .btn-outline {
          background: transparent;
          color: #1A1A2E;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 8px;
          border: 2px solid #1A1A2E;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .btn-outline:hover {
          background: #1A1A2E;
          color: #fff;
          transform: translateY(-1px);
        }

        /* chips */
        .nf-chips {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nf-chip {
          font-size: 12px;
          font-weight: 700;
          color: #1A1A2E;
          background: #fff8ec;
          border: 1px solid #f0e5c8;
          padding: 7px 16px;
          border-radius: 20px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .nf-chip:hover {
          background: #fdefc9;
          border-color: #F5A623;
        }

        .nf-label {
          font-size: 11px;
          font-weight: 700;
          color: #bbb;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
      `}</style>

      <div className="nf-wrap">
        <div className="nf-box">

          {/* Global spinner */}
          {/* <div className="spinner" /> */}

          {/* 404 */}
          <div className="nf-code">404</div>

          {/* Gold accent */}
          <div className="nf-bar" />

          <h1 className="nf-title">Page Not Found</h1>
          <p className="nf-desc">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Buttons */}
          <div className="nf-btns">
            <Link href="/" className="btn-gold">Go Home</Link>
            <button onClick={() => router.back()} className="btn-outline">← Go Back</button>
          </div>

        </div>
      </div>
    </>
  );
}