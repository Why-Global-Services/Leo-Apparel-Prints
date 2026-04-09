// src/app/account/components/OrderTracking.jsx
"use client";
import { ArrowLeft, Package, Box, Truck, CheckCircle, Star, Shirt } from "lucide-react";

const STEP_ICONS = {
  order:   Package,
  pack:    Box,
  ship:    Truck,
  deliver: CheckCircle,
};

const STATUS_COLORS = {
  Delivered:  { bg: "#dcfce7", text: "#16a34a" },
  Shipped:    { bg: "#dbeafe", text: "#2563eb" },
  Processing: { bg: "#fef9c3", text: "#ca8a04" },
  Cancelled:  { bg: "#fee2e2", text: "#dc2626" },
};

export default function OrderTracking({ order, onBack }) {
  const completed = order.tracking.filter((s) => s.done).length;
  const progress  = Math.round((completed / order.tracking.length) * 100);

  return (
    <div className="w-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold mb-4 sm:mb-6 hover:opacity-70 transition-opacity"
        style={{
          color: "var(--primary-blue)",
          fontFamily: "var(--font-poppins), Poppins, sans-serif",
        }}
      >
        <ArrowLeft size={16} />
        Back to Orders
      </button>

      {/* Green header */}
      <div
        className="rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 flex items-center gap-3 sm:gap-4"
        style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
      >
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <Shirt size={18} color="white" />
        </div>
        <div>
          <p
            className="text-white font-bold text-sm sm:text-base"
            style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
          >
            Order Tracking
          </p>
          <p className="text-white text-xs" style={{ opacity: 0.8 }}>
            Track your cricket jersey order status
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #16a34a, #22c55e)",
          }}
        />
      </div>

      {/* Tracking Steps - Mobile Optimized */}
      <div className="flex flex-col gap-1 mb-6">
        {order.tracking.map((step, i) => {
          const Icon = STEP_ICONS[step.icon] || Package;
          const isLast = i === order.tracking.length - 1;
          const isHighlight = step.done && (isLast || !order.tracking[i + 1]?.done);

          return (
            <div key={i} className="flex gap-3 sm:gap-4">
              {/* Icon column */}
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: step.done
                      ? "linear-gradient(135deg, #16a34a, #15803d)"
                      : "#f1f5f9",
                  }}
                >
                  <Icon size={16} color={step.done ? "white" : "#94a3b8"} />
                </div>
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 my-1"
                    style={{
                      background: step.done ? "#16a34a" : "#e2e8f0",
                      minHeight: 20,
                    }}
                  />
                )}
              </div>

              {/* Content column */}
              <div
                className="flex-1 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2"
                style={{
                  background: isHighlight ? "#f0fdf4" : "#fafafa",
                  border: isHighlight ? "1px solid #bbf7d0" : "1px solid #f1f5f9",
                }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex-1">
                    <p
                      className="font-semibold text-xs sm:text-sm"
                      style={{
                        fontFamily: "var(--font-poppins), Poppins, sans-serif",
                        color: step.done ? (isHighlight ? "#16a34a" : "#1e293b") : "#cbd5e1",
                      }}
                    >
                      {step.step}
                    </p>
                    <p className="text-xs mt-0.5 flex items-center gap-1 flex-wrap" style={{ color: "#94a3b8" }}>
                      <span>🕐</span> {step.date}
                    </p>
                    {step.note && (
                      <p className="text-xs mt-1 font-medium" style={{ color: "#16a34a" }}>
                        {step.note}
                      </p>
                    )}
                  </div>
                  {step.done && (
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#16a34a" }}
                    >
                      <CheckCircle size={12} color="white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status row */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs mb-6 sm:mb-8 px-1"
        style={{ color: "#94a3b8" }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#22c55e" }} />
          Order {order.status === "Delivered" ? "completed" : "in progress"}
        </span>
        <span>Updated: Just now</span>
      </div>

      {/* Your Items */}
      <h3
        className="text-base font-bold mb-3"
        style={{
          color: "#1e293b",
          fontFamily: "var(--font-poppins), Poppins, sans-serif",
        }}
      >
        Your Items
      </h3>
      
      <div className="flex flex-col gap-3">
        {order.items.map((item) => {
          const sc = STATUS_COLORS[item.status] || STATUS_COLORS.Delivered;
          return (
            <div
              key={item.id}
              className="rounded-xl p-4"
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* Mobile: Column layout, Desktop: Row layout */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Jersey Image/Icon */}
                <div className="relative shrink-0 self-start">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                  >
                    🏏
                  </div>
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ background: "var(--primary-blue)" }}
                  >
                    {item.qty}
                  </span>
                </div>

                {/* Info - Mobile optimized */}
                <div className="flex-1">
                  <p
                    className="font-semibold text-sm"
                    style={{
                      color: "#1e293b",
                      fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    }}
                  >
                    {item.name}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.size && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#475569" }}>
                        Size: {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#475569" }}>
                        Color: {item.color}
                      </span>
                    )}
                    {item.brand && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#475569" }}>
                        {item.brand}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-sm mt-2" style={{ color: "var(--primary-blue)" }}>
                    ₹{item.price}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                    Ordered on {order.date}
                  </p>
                </div>

                {/* Actions - Mobile full width buttons */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 w-full sm:w-auto">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
                    style={{ background: sc.bg, color: sc.text }}
                  >
                    {item.status}
                  </span>
                  <button
                    className="btn-gradient btn-shine flex items-center justify-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 w-full sm:w-auto"
                    style={{
                      fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    }}
                  >
                    <Star size={12} />
                    Write Review
                  </button>
                  {/* {order.status === "Delivered" && (
                    <p className="text-xs text-center sm:text-right" style={{ color: "#94a3b8" }}>
                      Return window closed.
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shipping Information - Mobile Optimized */}
      {order.shippingAddress && (
        <div className="mt-6 pt-4" style={{ borderTop: "1px solid #e2e8f0" }}>
          <h4
            className="text-sm font-semibold mb-3"
            style={{
              color: "#1e293b",
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            Shipping Information
          </h4>
          <div className="text-sm space-y-1" style={{ color: "#64748b" }}>
            <p className="font-medium" style={{ color: "#1e293b" }}>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}