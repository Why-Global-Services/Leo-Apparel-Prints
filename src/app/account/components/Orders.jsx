// src/app/account/components/Orders.jsx
"use client";
import { useState, useEffect } from "react";
import { Package, ChevronRight } from "lucide-react";
import OrderTracking from "./OrderTracking";
import axiosClient from "../../../lib/axios";

const STATUS_COLORS = {
  Delivered:  { bg: "#dcfce7", text: "#16a34a" },
  Shipped:    { bg: "#dbeafe", text: "#2563eb" },
  Processing: { bg: "#fef9c3", text: "#ca8a04" },
  Cancelled:  { bg: "#fee2e2", text: "#dc2626" },
  Pending: { bg: "#fef9c3", text: "#ca8a04" },
  Approved: { bg: "#dbeafe", text: "#2563eb" },
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosClient.get("/v1/user/getOrders");
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
        } else if (Array.isArray(response.data)) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Package size={48} style={{ color: "var(--primary-blue)", opacity: 0.3 }} />
          <p style={{ color: "#94a3b8" }}>No orders yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const statusStr = order.status || "Processing";
            const sc = STATUS_COLORS[statusStr] || STATUS_COLORS.Processing;
            const orderId = order.orderId || order._id;
            const items = order.items || order.cartItems || [];
            return (
              <div
                key={order._id}
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
                      {orderId}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full capitalize"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      {statusStr}
                    </span>
                    <ChevronRight size={16} style={{ color: "var(--primary-blue)" }} />
                  </div>
                </div>

                {/* Items */}
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    {/* Jersey Icon/Image Placeholder */}
                    <div className="relative shrink-0">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                        style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
                      >
                        {item.image || item.product?.imageURL?.[0] ? (
                           <img src={item.image || item.product?.imageURL?.[0]} alt="item" className="w-full h-full object-cover" />
                        ) : "🏏"}
                      </div>
                      <span
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                        style={{ background: "var(--primary-blue)" }}
                      >
                        {item.quantity || item.qty || 1}
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
                        {item.name || item.product?.name || "Custom Kit"}
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
                        ₹{item.price || item.product?.price || 0}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "#94a3b8" }}>Ordered on</p>
                      <p className="text-xs" style={{ color: "#64748b" }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Total and Return note */}
                <div className="mt-4 pt-4 flex justify-between items-center" style={{ borderTop: "1px solid #f1f5f9" }}>
                  <p className="text-sm font-bold" style={{ color: "#1e293b" }}>
                    Total: ₹{order.totalAmount || order.totalPrice || order.total || 0}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}