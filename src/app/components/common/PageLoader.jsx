"use client";


import Spinner from "./Spinner";

export default function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Spinner />
      <p
        style={{
          marginTop: "20px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#555",
          letterSpacing: "0.5px",
        }}
      >
        Loading…
      </p>
    </div>
  );
}
