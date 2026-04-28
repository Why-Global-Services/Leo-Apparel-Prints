"use client";

import { useState } from "react";
import AuthModal from "@/app/components/auth/AuthModal";

// ─── Sample Data ───────────────────────────────────────────────────────────
const SAMPLE_ITEMS = [
  {
    id: 1,
    name: "Cricket Jersey",
    qty: 1,
    price: 4050,
    originalPrice: 4500,
    gst: 192.86,
    gstPercent: 5,
    image: null,
  },
];

const SAVED_ADDRESSES = [
  {
    id: 1,
    name: "vasanth",
    phone: "1234567890",
    address: "egmore, chennai, TamilNAdu - 123456",
    landmark: "egmore",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [deliveryAddresses, setDeliveryAddresses] = useState(SAVED_ADDRESSES);
  const [selectedDelivery, setSelectedDelivery] = useState(1);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [sameAsDelivery, setSameAsDelivery] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showNewDeliveryForm, setShowNewDeliveryForm] = useState(false);
  const [showNewBillingForm, setShowNewBillingForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "", phone: "", address: "", landmark: "", city: "", state: "", pincode: "",
  });

  const subtotal = SAMPLE_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const savings = SAMPLE_ITEMS.reduce((s, i) => s + (i.originalPrice - i.price) * i.qty, 0);
  const totalCost = SAMPLE_ITEMS.reduce((s, i) => s + i.originalPrice * i.qty, 0);
  const shipping = 0;
  const total = subtotal - couponDiscount + shipping;

  function handleToggleSame(checked) {
    setSameAsDelivery(checked);
    if (checked) {
      const addr = deliveryAddresses.find((a) => a.id === selectedDelivery);
      if (addr) {
        setBillingAddresses([{ ...addr, id: 99 }]);
        setSelectedBilling(99);
      }
    } else {
      setBillingAddresses([]);
      setSelectedBilling(null);
    }
  }

  function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === "SAVE10") {
      setCouponDiscount(Math.round(subtotal * 0.1));
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  }

  function handlePlaceOrder() {
    if (!selectedDelivery) { alert("Please select a delivery address"); return; }
    if (!isLoggedIn) { setShowAuthModal(true); return; }
    alert("Order placed successfully! 🎉");
  }

  function deleteDeliveryAddress(id) {
    setDeliveryAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedDelivery === id) setSelectedDelivery(null);
  }

  function deleteBillingAddress(id) {
    setBillingAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedBilling === id) setSelectedBilling(null);
  }

  function handleAddNewDeliveryAddress() {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      alert("Please fill in all required fields"); return;
    }
    const newId = Math.max(...deliveryAddresses.map((a) => a.id), 0) + 1;
    const fullAddress = `${newAddress.address}, ${newAddress.city}, ${newAddress.state} - ${newAddress.pincode}`;
    setDeliveryAddresses([...deliveryAddresses, { id: newId, name: newAddress.name, phone: newAddress.phone, address: fullAddress, landmark: newAddress.landmark }]);
    setSelectedDelivery(newId);
    setNewAddress({ name: "", phone: "", address: "", landmark: "", city: "", state: "", pincode: "" });
    setShowNewDeliveryForm(false);
  }

  function handleAddNewBillingAddress() {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      alert("Please fill in all required fields"); return;
    }
    const newId = Math.max(...billingAddresses.map((a) => a.id), 0) + 1;
    const fullAddress = `${newAddress.address}, ${newAddress.city}, ${newAddress.state} - ${newAddress.pincode}`;
    setBillingAddresses([...billingAddresses, { id: newId, name: newAddress.name, phone: newAddress.phone, address: fullAddress, landmark: newAddress.landmark }]);
    setSelectedBilling(newId);
    setNewAddress({ name: "", phone: "", address: "", landmark: "", city: "", state: "", pincode: "" });
    setShowNewBillingForm(false);
  }

  return (
    <>
      {/*
        ─────────────────────────────────────────────────────────────────────
        KEY FIX: All checkout-specific button styles use the scoped class
        "co-btn" (checkout-btn) defined in the <style> tag below.
        We do NOT redefine .btn-gradient here — that lives in globals.css
        and is used by the Navbar (Bulk Order) and other pages untouched.
        ─────────────────────────────────────────────────────────────────────
      */}
      <style>{`
        /* Scoped to this page only — prefix "co-" = checkout */
        .co-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-poppins), 'Poppins', sans-serif;
          font-weight: 600;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          /* Gold gradient — used for coupon Apply / Save Address */
          background: linear-gradient(135deg, #F5B800, #E8960A);
          color: #fff;
        }
        .co-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(245, 184, 0, 0.35);
        }
        .co-btn:active { transform: translateY(0); }

        /* Shine sweep on hover */
        .co-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transition: left 0.5s ease;
        }
        .co-btn:hover::before { left: 100%; }

        /* Coupon Apply size */
        .co-btn-sm {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
        }

        /* Save Address size */
        .co-btn-md {
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 13px;
        }

        /* Place Order — full-width, blue gradient (primary-blue) */
        .co-btn-place-order {
          width: 100%;
          padding: 11px 0;
          border-radius: 12px;
          font-size: 14px;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
          color: #fff;
          font-weight: 700;
          letter-spacing: 0.03em;
          box-shadow: 0 4px 14px rgba(14, 165, 233, 0.25);
        }
        .co-btn-place-order:hover {
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.4);
          transform: translateY(-1px);
        }
        .co-btn-place-order:active { transform: translateY(0); }
      `}</style>

      <div className="min-h-screen bg-gray-50 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex max-w-7xl mx-auto px-4 py-8 gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0">
            {/* Delivery + Billing Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-6">

              {/* Delivery Address */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Delivery Address</h2>
                <div className="flex flex-col gap-3">
                  {deliveryAddresses.map((addr) => (
                    <AddressCard
                      key={addr.id}
                      addr={addr}
                      selected={selectedDelivery === addr.id}
                      onSelect={() => setSelectedDelivery(addr.id)}
                      onEdit={() => alert("Edit address")}
                      onDelete={() => deleteDeliveryAddress(addr.id)}
                      showActions
                    />
                  ))}
                </div>
                {!showNewDeliveryForm ? (
                  <AddNewButton onClick={() => setShowNewDeliveryForm(true)} />
                ) : (
                  <NewAddressForm
                    newAddress={newAddress}
                    setNewAddress={setNewAddress}
                    onCancel={() => { setShowNewDeliveryForm(false); setNewAddress({ name: "", phone: "", address: "", landmark: "", city: "", state: "", pincode: "" }); }}
                    onSave={handleAddNewDeliveryAddress}
                  />
                )}
              </div>

              {/* Billing Address */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Billing Address</h2>
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => handleToggleSame(!sameAsDelivery)}
                    className="relative flex-shrink-0"
                    style={{ width: 44, height: 24 }}
                    aria-label="Same as delivery"
                  >
                    <span
                      className="absolute inset-0 rounded-full transition-all duration-300"
                      style={{ background: sameAsDelivery ? "var(--primary)" : "#d1d5db" }}
                    />
                    <span
                      className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-300"
                      style={{ left: sameAsDelivery ? 23 : 3 }}
                    />
                  </button>
                  <span className="text-sm text-gray-600">Same as delivery address</span>
                </div>

                {billingAddresses.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {billingAddresses.map((addr) => (
                      <AddressCard
                        key={addr.id}
                        addr={addr}
                        selected={selectedBilling === addr.id}
                        onSelect={() => setSelectedBilling(addr.id)}
                        onDelete={() => deleteBillingAddress(addr.id)}
                        showActions={!sameAsDelivery}
                        readOnly={sameAsDelivery}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-3">No billing addresses found.</p>
                )}

                {!sameAsDelivery && !showNewBillingForm && (
                  <AddNewButton onClick={() => setShowNewBillingForm(true)} />
                )}
                {!sameAsDelivery && showNewBillingForm && (
                  <NewAddressForm
                    newAddress={newAddress}
                    setNewAddress={setNewAddress}
                    onCancel={() => { setShowNewBillingForm(false); setNewAddress({ name: "", phone: "", address: "", landmark: "", city: "", state: "", pincode: "" }); }}
                    onSave={handleAddNewBillingAddress}
                  />
                )}
              </div>
            </div>

            {/* Review Your Order */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-base">Review Your Order</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">1 item</span>
              </div>
              <div className="px-6 py-4">
                {SAMPLE_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">🕶️</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-[420px] flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm sticky top-8">

              {/* Item summary */}
              {SAMPLE_ITEMS.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 mb-4 border-b border-gray-200">
                  <div className="w-[60px] h-[60px] flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">🕶️</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-snug mb-1">{item.name}</p>
                    <p className="text-xs text-gray-500 mb-1">Qty: {item.qty}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">
                        ₹{item.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        incl. ₹{item.gst} GST
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-green-600 mt-1">
                      Save ₹{savings.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div
                className="rounded-xl p-3 mb-4"
                style={{ background: "rgba(245,184,0,0.08)", border: "1px solid rgba(245,184,0,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">🏷️</span>
                  <span className="text-xs font-semibold text-gray-900">Apply Coupon</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    placeholder="Enter code"
                    disabled={couponApplied}
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-[color:var(--primary-blue)] transition-all"
                  />
                  {couponApplied ? (
                    <button
                      onClick={() => { setCouponApplied(false); setCouponDiscount(0); setCouponCode(""); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: "#ef4444" }}
                    >
                      Remove
                    </button>
                  ) : (
                    /* ✅ co-btn — scoped gold button, doesn't touch global .btn-gradient */
                    <button onClick={handleApplyCoupon} className="co-btn co-btn-sm">
                      Apply
                    </button>
                  )}
                </div>
                {couponApplied && (
                  <p className="text-[10px] text-green-600 mt-1 font-medium">✓ Saved ₹{couponDiscount}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 mb-4">
                <PriceRow label="Total Cost" value={`₹${totalCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`} />
                <PriceRow
                  label="Savings"
                  value={`₹${savings.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
                  valueClass="text-green-600 font-semibold"
                  labelClass="text-green-600 font-semibold"
                />
                {couponApplied && (
                  <PriceRow
                    label="Coupon Discount"
                    value={`-₹${couponDiscount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
                    valueClass="text-green-600 font-semibold"
                    labelClass="text-green-600 font-semibold"
                  />
                )}
                <PriceRow label="Subtotal" value={`₹${subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`} />
                <PriceRow label="Shipping" value="Free" />
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold" style={{ color: "var(--primary)" }}>
                      ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Note */}
              <p className="text-[11px] text-gray-500 mb-4">
                Estimated delivery: <strong className="text-gray-700">Sunday, 26 Apr 2026</strong>
              </p>

              {/* Payment Method */}
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-900 mb-2">Payment Method</p>
                <div className="flex flex-col gap-2">
                  <PaymentOption id="cod" value="cod" label="Cash on Delivery" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                  <PaymentOption id="razorpay" value="razorpay" label="RazorPay (UPI/Cards/NetBanking)" checked={paymentMethod === "razorpay"} onChange={() => setPaymentMethod("razorpay")} />
                </div>
              </div>

              {/* ✅ Place Order — scoped blue gradient, doesn't touch global .btn-gradient */}
              <button onClick={handlePlaceOrder} className="co-btn co-btn-place-order">
                Place Order
              </button>

            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function AddressCard({ addr, selected, onSelect, onEdit, onDelete, showActions, readOnly }) {
  return (
    <div
      onClick={!readOnly ? onSelect : undefined}
      className="relative rounded-xl px-4 py-4 border transition-all duration-200 cursor-pointer"
      style={{
        background: selected ? "rgba(245,184,0,0.08)" : "#fff",
        borderColor: selected ? "var(--primary)" : "#e5e7eb",
        boxShadow: selected ? "0 0 0 1px var(--primary), 0 4px 12px rgba(245,184,0,0.1)" : "none",
      }}
    >
      {showActions && (
        <div className="absolute top-3 right-4 flex gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
            className="text-xs font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "var(--primary-blue)" }}
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
            className="text-xs font-semibold text-red-500 hover:opacity-70 transition-opacity"
          >
            Delete
          </button>
        </div>
      )}
      <p className="text-sm font-bold text-gray-900 pr-20">{addr.name}</p>
      <p className="text-xs text-gray-500 mt-0.5">{addr.phone}</p>
      <p className="text-xs text-gray-600 mt-1">{addr.address}</p>
      {addr.landmark && (
        <p className="text-[11px] text-gray-400 mt-1 italic">Landmark: {addr.landmark}</p>
      )}
    </div>
  );
}

function NewAddressForm({ newAddress, setNewAddress, onCancel, onSave }) {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Add New Address</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FloatingInput label="Full Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} required />
        <FloatingInput label="Phone Number" type="tel" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} required />
        <div className="md:col-span-2">
          <FloatingInput label="Address Line" value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} required />
        </div>
        <FloatingInput label="Landmark (optional)" value={newAddress.landmark} onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })} />
        <FloatingInput label="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} required />
        <FloatingInput label="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} required />
        <FloatingInput label="Pincode" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} required />
      </div>
      <div className="flex gap-3 mt-4">
        {/* ✅ scoped gold button */}
        <button onClick={onSave} className="co-btn co-btn-md">Save Address</button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function FloatingInput({ label, type = "text", value, onChange, required }) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value;
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        className="w-full px-3 pt-5 pb-2 text-sm text-gray-900 bg-white border rounded-lg outline-none transition-all"
        style={{
          borderColor: isFocused ? "var(--primary-blue)" : "#e5e7eb",
          borderWidth: isFocused ? "2px" : "1px",
        }}
        required={required}
      />
      <label
        className="absolute left-3 transition-all duration-200 pointer-events-none"
        style={{
          fontSize: isActive ? 10 : 14,
          top: isActive ? 4 : "50%",
          transform: isActive ? "none" : "translateY(-50%)",
          color: isActive ? "var(--primary-blue)" : "#9ca3af",
        }}
      >
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    </div>
  );
}

function AddNewButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 mt-4 hover:opacity-75 transition-opacity"
      style={{ color: "var(--primary-blue)" }}
    >
      <span
        className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-lg font-bold flex-shrink-0"
        style={{ borderColor: "var(--primary-blue)" }}
      >
        +
      </span>
      <span className="text-sm font-semibold">Add a new address</span>
    </button>
  );
}

function PriceRow({ label, value, labelClass = "text-gray-500", valueClass = "text-gray-600" }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className={labelClass}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

function PaymentOption({ id, value, label, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 border transition-all duration-200"
      style={{
        background: checked ? "rgba(245,184,0,0.08)" : "#fff",
        borderColor: checked ? "var(--primary)" : "#e5e7eb",
      }}
    >
      <div className="relative flex-shrink-0">
        <input id={id} type="radio" name="payment" value={value} checked={checked} onChange={onChange} className="sr-only" />
        <div
          className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all"
          style={{ borderColor: checked ? "var(--primary)" : "#d1d5db" }}
        >
          {checked && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />}
        </div>
      </div>
      <span className="text-xs text-gray-700 font-medium">{label}</span>
    </label>
  );
}