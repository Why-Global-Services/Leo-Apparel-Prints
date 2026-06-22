// src/app/account/components/Orders.jsx
"use client";
import { useState, useEffect } from "react";
import {
  Package, ChevronRight, ShoppingBag, Clock, CheckCircle2,
  Truck, XCircle, RotateCcw, ArrowLeft, Calendar, CreditCard,
  MapPin, Star, AlertCircle, RefreshCw
} from "lucide-react";
import axiosClient from "../../../lib/axios";

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Ordered:        { bg: "#dbeafe", text: "#2563eb", icon: ShoppingBag,   label: "Ordered" },
  Processing:     { bg: "#fef9c3", text: "#ca8a04", icon: Clock,          label: "Processing" },
  Shipped:        { bg: "#ede9fe", text: "#7c3aed", icon: Truck,          label: "Shipped" },
  Delivered:      { bg: "#dcfce7", text: "#16a34a", icon: CheckCircle2,   label: "Delivered" },
  Cancelled:      { bg: "#fee2e2", text: "#dc2626", icon: XCircle,        label: "Cancelled" },
  "Return Request": { bg: "#ffedd5", text: "#ea580c", icon: RotateCcw,   label: "Return Requested" },
  Returned:       { bg: "#f1f5f9", text: "#475569", icon: RotateCcw,      label: "Returned" },
  Pending:        { bg: "#fef9c3", text: "#ca8a04", icon: Clock,          label: "Pending" },
  Approved:       { bg: "#dbeafe", text: "#2563eb", icon: CheckCircle2,   label: "Approved" },
};


const PAYMENT_STATUS_CONFIG = {
  Completed: {
    bg: "#dcfce7",
    text: "#16a34a",
    label: "Paid",
  },
  Pending: {
    bg: "#fef9c3",
    text: "#ca8a04",
    label: "Pending",
  },
  Failed: {
    bg: "#fee2e2",
    text: "#dc2626",
    label: "Failed",
  },
};

const getStatusConfig = (status) =>
  STATUS_CONFIG[status] || { bg: "#f1f5f9", text: "#64748b", icon: Package, label: status || "Unknown" };

// ─── Badge component ──────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = getStatusConfig(status);
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full capitalize"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <Icon size={12} />
      {cfg.label}
    </span>
  );
}

function PaymentBadge({ status }) {
  const cfg =
    PAYMENT_STATUS_CONFIG[status] || {
      bg: "#f1f5f9",
      text: "#475569",
      label: status,
    };

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
      style={{
        background: cfg.bg,
        color: cfg.text,
      }}
    >
      {cfg.label}
    </span>
  );
}

// ─── Parse order items from the backend aggregate structure ───────────────────
// After $unwind + $group with $push, each orderDetails element is a
// SINGLE product wrapper: { products: { productId, sizes, ... , productDetails } }
function parseItems(order) {
  const items = [];
  (order.orderDetails || []).forEach((detail) => {
    // Handle both: single object (aggregate result) and array (legacy)
    const productsRaw = detail.products;
    if (!productsRaw) return;

    const productList = Array.isArray(productsRaw) ? productsRaw : [productsRaw];

    productList.forEach((p) => {
      if (!p) return;
      const pd = p.productDetails || {};
      const sizeList = Array.isArray(p.sizes) ? p.sizes : [];
      const totalQty =
        p.quantity ||
        sizeList.reduce((s, x) => s + (x.quantity || 0), 0) ||
        1;

      items.push({
        name:        pd.productName || pd.name || p.productName || "Custom Kit",
        image:       pd.viewImages?.front || pd.frontImage || pd.productImages?.[0] || null,
        sizes:       sizeList,
        quantity:    totalQty,
        price:       p.price || pd.finalPrice || pd.basePrice || 0,
        subtotal:    p.subtotal || p.price * totalQty || 0,
        orderStatus:  order.orderStatus,
        paymentStatus: order.paymentStatus,
        productId:   p.productId,
        selectedSize: p.selectedSize,
      });
    });
  });
  return items;
}

// ─── Order Detail / Tracking View ────────────────────────────────────────────
function OrderDetail({ order, onBack }) {
  const items       = parseItems(order);
  const statusCfg   = getStatusConfig(order.orderStatus);
  const StatusIcon  = statusCfg.icon;

  const TIMELINE = [
    { key: "Ordered",    label: "Order Placed",      icon: ShoppingBag },
    { key: "Processing", label: "Being Processed",   icon: Clock },
    { key: "Shipped",    label: "Shipped",            icon: Truck },
    { key: "Delivered",  label: "Delivered",          icon: CheckCircle2 },
  ];

  const ORDER_RANK = { Ordered: 0, Processing: 1, Shipped: 2, Delivered: 3 };
  const currentRank = ORDER_RANK[order.orderStatus] ?? -1;

  return (
    <div className="w-full">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold mb-5 hover:opacity-70 transition-opacity"
        style={{ color: "var(--primary-blue)", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
      >
        <ArrowLeft size={16} /> Back to Orders
      </button>

      {/* Header banner */}
      <div
        className="rounded-2xl p-5 mb-6 flex items-center gap-4"
        style={{ background: `linear-gradient(135deg, ${statusCfg.text}, #1e3a8a)` }}
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
          <StatusIcon size={22} color="white" />
        </div>
        <div>
          <p className="text-white font-bold text-base" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
            Order #{order.orderId}
          </p>
          <p className="text-white text-xs" style={{ opacity: 0.8 }}>
            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={order.orderStatus} />
        </div>
      </div>

      {/* Timeline */}
      {!["Cancelled", "Return Request", "Returned"].includes(order.orderStatus) && (
        <div className="bg-white rounded-2xl p-5 mb-5 border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-800 mb-4" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
            Order Progress
          </p>
          <div className="flex items-start gap-0">
            {TIMELINE.map((step, i) => {
              const done = i <= currentRank;
              const active = i === currentRank;
              const TIcon = step.icon;
              return (
                <div key={step.key} className="flex-1 flex flex-col items-center">
                  <div className="flex items-center w-full">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10"
                      style={{
                        background: done ? (active ? "var(--primary-blue)" : "#16a34a") : "#e2e8f0",
                        boxShadow: active ? "0 0 0 3px rgba(0,62,155,0.2)" : "none",
                      }}
                    >
                      <TIcon size={15} color={done ? "white" : "#94a3b8"} />
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div
                        className="flex-1 h-1 rounded-full"
                        style={{ background: i < currentRank ? "#16a34a" : "#e2e8f0" }}
                      />
                    )}
                  </div>
                  <p className="text-xs mt-2 text-center" style={{ color: done ? "#1e293b" : "#94a3b8", fontWeight: active ? 700 : 500, maxWidth: 64 }}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order summary info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Amount", value: `₹${(order.totalPrice || 0).toLocaleString("en-IN")}`, icon: CreditCard },
          { label: "Payment",      value: order.paymentMethod || "—", icon: CreditCard },
          { label: "Ordered On",   value: new Date(order.createdAt).toLocaleDateString("en-IN"), icon: Calendar },
        ].map((info) => (
          <div
            key={info.label}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <p className="text-xs text-gray-400 mb-1">{info.label}</p>
            <p className="text-sm font-bold text-gray-800" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
              {info.value}
            </p>
          </div>
        ))}
      </div>

      {/* Items */}
      <h3 className="text-sm font-bold mb-3" style={{ color: "#1e293b", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
        Your Items ({items.length})
      </h3>
      <div className="flex flex-col gap-3 mb-6">
        {items.map((item, i) => {
          const sc = getStatusConfig(item.orderStatus);
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="relative shrink-0">
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                  >
                    {item.image
                      ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      : <span className="text-2xl">🏏</span>
                    }
                  </div>
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ background: "var(--primary-blue)" }}
                  >
                    {item.quantity}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "#1e293b", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
                    {item.name}
                  </p>
                  {/* Sizes breakdown */}
                  {item.selectedSize && (
                    <div className="mt-1.5">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#f1f5f9", color: "#475569" }}>
                        Size: {item.selectedSize}
                      </span>
                    </div>
                  )}
                  {item.sizes?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {item.sizes.map((s, si) => (
                        <span key={si} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f1f5f9", color: "#475569" }}>
                          {s.size} × {s.quantity}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-sm font-bold mt-1.5" style={{ color: "var(--primary-blue)" }}>
                    ₹{(item.subtotal || item.price * item.quantity || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Status & Review */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <PaymentBadge status={item.paymentStatus} />
                  {item.orderStatus === "Delivered" && (
                    <button
                      className="flex items-center gap-1 text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-all"
                      style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}
                    >
                      <Star size={11} /> Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery address */}
      {order.deliveryAddress && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={15} style={{ color: "var(--primary-blue)" }} />
            <p className="text-sm font-bold text-gray-800" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
              Delivery Address
            </p>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-semibold text-gray-800">{order.deliveryAddress.fullName || order.deliveryAddress.name}</p>
            <p>{order.deliveryAddress.addressLine1 || order.deliveryAddress.address}</p>
            {order.deliveryAddress.landMark && <p className="text-gray-400">{order.deliveryAddress.landMark}</p>}
            <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} — {order.deliveryAddress.zipCode || order.deliveryAddress.pincode}</p>
            <p>Phone: {order.deliveryAddress.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Orders list ─────────────────────────────────────────────────────────
export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosClient.get("/v1/user/getOrders");
      // Backend returns { success, message, data: [...] }
      const raw = response.data?.data || response.data?.orders || response.data || [];
      setOrders(Array.isArray(raw) ? raw : []);
    } catch (err) {
      // 400 "No orders found" is expected when list is empty
      if (err?.response?.status === 400) {
        setOrders([]);
      } else {
        setError("Failed to load orders. Please try again.");
        console.error("Failed to fetch orders:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--primary-blue)", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
        >
          My Orders
        </h2>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
          style={{ color: "var(--primary)",}}
        >
          <RefreshCw size={12} /> Refresh
        </button>
      </div>
      <p className="text-sm mb-6" style={{ color: "#64748b" }}>
        View and track your custom sportswear orders
      </p>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "var(--primary-blue)" }} />
          <p className="text-sm" style={{ color: "#94a3b8" }}>Loading your orders…</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#fee2e2" }}>
            <AlertCircle size={26} style={{ color: "#dc2626" }} />
          </div>
          <p className="text-sm font-semibold" style={{ color: "#dc2626" }}>{error}</p>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all"
            style={{ background: "var(--primary-blue)" }}
          >
            <RefreshCw size={14} /> Try Again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--primary-blue-light)" }}
          >
            <Package size={36} style={{ color: "var(--primary-blue)", opacity: 0.5 }} />
          </div>
          <p className="font-semibold text-gray-600" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>No orders yet</p>
          <p className="text-sm text-center" style={{ color: "#94a3b8", maxWidth: 240 }}>
            Start shopping to see your order history here.
          </p>
          <a
            href="/products"
            className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all"
            style={{ background: "var(--primary-blue)" }}
          >
            Shop Now
          </a>
        </div>
      )}

      {/* Orders list */}
      {!loading && !error && orders.length > 0 && (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const items     = parseItems(order);
            const statusCfg = getStatusConfig(order.orderStatus);
            const StatusIcon = statusCfg.icon;

            return (
              <div
                key={order._id || order.orderId}
                onClick={() => setSelectedOrder(order)}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
              >
                {/* Order header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>Order ID</p>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "#1e293b", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                    >
                      #{order.orderId || order._id}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={order.orderStatus} />
                    <ChevronRight size={16} style={{ color: "var(--primary-blue)" }} />
                  </div>
                </div>

                {/* Items preview */}
                <div className="flex flex-col gap-3">
                  {items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {/* Image */}
                      <div className="relative shrink-0">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                          style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
                        >
                          {item.image
                            ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            : <span className="text-xl">🏏</span>
                          }
                        </div>
                        <span
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                          style={{ background: "var(--primary-blue)" }}
                        >
                          {item.quantity}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-semibold text-sm truncate"
                          style={{ color: "#1e293b", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                        >
                          {item.name}
                        </p>
                        {item.selectedSize && (
                          <div className="mt-1">
                            <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#475569" }}>
                              Size: {item.selectedSize}
                            </span>
                          </div>
                        )}
                        {item.sizes?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.sizes.slice(0, 3).map((s, si) => (
                              <span key={si} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#475569" }}>
                                {s.size}×{s.quantity}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Price & Status */}
                      <div className="flex flex-col items-end shrink-0 gap-1.5">
                        <PaymentBadge status={item.paymentStatus} />
                        <div className="text-right">
                          <p className="text-sm font-bold" style={{ color: "var(--primary-blue)" }}>
                            ₹{(item.subtotal || item.price * item.quantity || 0).toLocaleString("en-IN")}
                          </p>
                          <p className="text-xs" style={{ color: "#94a3b8" }}>
                            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {items.length > 2 && (
                    <p className="text-xs font-medium" style={{ color: "#94a3b8" }}>
                      +{items.length - 2} more item{items.length - 2 > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid #f1f5f9" }}>
                  <p className="text-sm font-bold" style={{ color: "#1e293b" }}>
                    Total: ₹{(order.totalPrice || 0).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
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