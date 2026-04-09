// src/app/account/components/Orders.jsx
"use client";
import { useState } from "react";
import { Package, ChevronRight } from "lucide-react";
import OrderTracking from "./OrderTracking";

// ── Mock data with Cricket Jersey ───────────────────────────────────
const MOCK_ORDERS = [
  {
    id: "ORD-CK-2026-001",
    date: "08/04/2026",
    status: "Delivered",
    total: 1899.00,
    items: [
      { 
        id: 1, 
        name: "Indian Cricket Team Blue Jersey - Virat Kohli #18", 
        price: 1899.00, 
        qty: 1, 
        status: "Delivered",
        size: "L",
        color: "Blue",
        brand: "MYKA Sports"
      },
    ],
    tracking: [
      { step: "Order Placed", date: "Sat, Apr 8", done: true, icon: "order" },
      { step: "Packing", date: "Sun, Apr 9", done: true, icon: "pack" },
      { step: "Shipped", date: "Mon, Apr 10", done: true, icon: "ship" },
      { step: "Delivered", date: "Tue, Apr 11", done: true, icon: "deliver", note: "Order delivered successfully!" },
    ],
    shippingAddress: {
      name: "Jerwin Titus",
      address: "123 Sports Colony",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
      phone: "9876543210"
    }
  },
  {
    id: "ORD-CK-2026-002",
    date: "01/04/2026",
    status: "Shipped",
    total: 2499.00,
    items: [
      { 
        id: 2, 
        name: "Australia Yellow Test Jersey - Pat Cummins #30", 
        price: 2499.00, 
        qty: 1, 
        status: "Shipped",
        size: "XL",
        color: "Yellow",
        brand: "Kookaburra"
      },
    ],
    tracking: [
      { step: "Order Placed", date: "Tue, Apr 1", done: true, icon: "order" },
      { step: "Packing", date: "Wed, Apr 2", done: true, icon: "pack" },
      { step: "Shipped", date: "Thu, Apr 3", done: true, icon: "ship" },
      { step: "Delivered", date: "Expected by Apr 6", done: false, icon: "deliver" },
    ],
    shippingAddress: {
      name: "Jerwin Titus",
      address: "123 Sports Colony",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
      phone: "9876543210"
    }
  },
  {
    id: "ORD-CK-2026-003",
    date: "25/03/2026",
    status: "Processing",
    total: 1599.00,
    items: [
      { 
        id: 3, 
        name: "England Red T20 Jersey - Jos Buttler #63", 
        price: 1599.00, 
        qty: 2, 
        status: "Processing",
        size: "M",
        color: "Red",
        brand: "Woodworm"
      },
    ],
    tracking: [
      { step: "Order Placed", date: "Wed, Mar 25", done: true, icon: "order" },
      { step: "Packing", date: "Processing", done: false, icon: "pack" },
      { step: "Shipped", date: "Pending", done: false, icon: "ship" },
      { step: "Delivered", date: "Pending", done: false, icon: "deliver" },
    ],
    shippingAddress: {
      name: "Jerwin Titus",
      address: "123 Sports Colony",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
      phone: "9876543210"
    }
  }
];

const STATUS_COLORS = {
  Delivered:  { bg: "#dcfce7", text: "#16a34a" },
  Shipped:    { bg: "#dbeafe", text: "#2563eb" },
  Processing: { bg: "#fef9c3", text: "#ca8a04" },
  Cancelled:  { bg: "#fee2e2", text: "#dc2626" },
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (selectedOrder) {
    return (
      <OrderTracking
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div>
      {/* Section Header */}
      <h2
        className="text-xl font-bold mb-1"
        style={{
          color: "var(--primary-blue)", 
          fontFamily: "var(--font-poppins),Poppins, sans-serif",
        }}
      >
        My Orders
      </h2>
      <p className="text-sm mb-6" style={{ color: "#64748b" }}>
        View and track your cricket jersey orders
      </p>

      {/* Empty State */}
      {MOCK_ORDERS.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Package size={48} style={{ color: "var(--primary-blue)", opacity: 0.3 }} />
          <p style={{ color: "#94a3b8" }}>No orders yet</p>
        </div>
      )}

      {/* Orders List */}
      <div className="flex flex-col gap-4">
        {MOCK_ORDERS.map((order) => {
          const sc = STATUS_COLORS[order.status] || STATUS_COLORS.Processing;
          return (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md"
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* Order header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>
                    Order ID
                  </p>
                  <p
                    className="font-semibold text-sm"
                    style={{
                      color: "#1e293b",
                      fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    }}
                  >
                    {order.id}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: sc.bg, color: sc.text }}
                  >
                    {order.status}
                  </span>
                  <ChevronRight size={16} style={{ color: "var(--primary-blue)" }} />
                </div>
              </div>

              {/* Items */}
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {/* Jersey Icon/Image Placeholder */}
                  <div className="relative shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
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
                    <div className="flex flex-wrap gap-2 mt-1">
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
                    </div>
                    <p className="text-sm font-bold mt-1" style={{ color: "var(--primary-blue)" }}>
                      ₹{item.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: "#94a3b8" }}>Ordered on</p>
                    <p className="text-xs" style={{ color: "#64748b" }}>{order.date}</p>
                  </div>
                </div>
              ))}

              {/* Total and Return note */}
              <div className="mt-4 pt-4 flex justify-between items-center" style={{ borderTop: "1px solid #f1f5f9" }}>
                {/* <p className="text-xs" style={{ color: "#ef4444" }}>
                  Return of products should be within 2 days
                </p> */}
                <p className="text-sm font-bold" style={{ color: "#1e293b" }}>
                  Total: ₹{order.total}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}