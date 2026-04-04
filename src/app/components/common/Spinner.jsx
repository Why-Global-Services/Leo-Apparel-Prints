"use client";

export default function Spinner() {
  return (
    <>
      <style>{`
        .spinner {
          --size: 30px;
          --first-block-clr: #005bba;
          --second-block-clr: #fed500;
          width: 100px;
          height: 100px;
          position: relative;
        }
        .spinner::after,
        .spinner::before {
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
        @keyframes spinDown {
          0%, 100% { transform: none; }
          25%       { transform: translateX(100%); }
          50%       { transform: translateX(100%) translateY(100%); }
          75%       { transform: translateY(100%); }
        }
        @keyframes spinUp {
          0%, 100% { transform: none; }
          25%       { transform: translateX(-100%); }
          50%       { transform: translateX(-100%) translateY(-100%); }
          75%       { transform: translateY(-100%); }
        }
      `}</style>
      <div className="spinner" />
    </>
  );
}
