// src/app/account/components/Address.jsx
"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Home, Building, MapPin } from "lucide-react";

const INITIAL_DELIVERY = [
  {
    id: 1,
    label: "Delivery Address 1",
    isPrimary: true,
    name: "Kanzi Blank",
    address: "1/53 Belgian Street",
    landmark: "Near Hospital",
    city: "Chennai",
    state: "Tamil",
    pincode: "12345",
    country: "India",
    phone: "08825526803",
    type: "HOME",
  },
];

const TYPE_ICONS = { HOME: Home, OFFICE: Building };
const TYPE_LABELS = { HOME: "Home", OFFICE: "Office" };

function AddressCard({ address, onDelete }) {
  const TypeIcon = TYPE_ICONS[address.type] || Home;

  return (
    <div
      className="rounded-xl p-5 transition-all hover:shadow-md"
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderLeft: address.isPrimary
          ? "3px solid var(--primary-blue)"
          : "1px solid #e5e7eb",
      }}
    >
      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className="text-sm font-semibold"
            style={{
              color: "#1f2937",
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            {address.label}
          </p>
          {address.isPrimary && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#dbeafe", color: "var(--primary-blue)" }}
            >
              Primary
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ background: "#f3f4f6" }}
          >
            <Pencil size={14} style={{ color: "var(--primary-blue)" }} />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ background: "#fef2f2" }}
          >
            <Trash2 size={14} style={{ color: "#dc2626" }} />
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm" style={{ color: "#4b5563" }}>
        <p className="font-semibold" style={{ color: "#1f2937" }}>{address.name}</p>
        <p>{address.address}</p>
        {address.landmark && (
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            Landmark: {address.landmark}
          </p>
        )}
        <p>{address.city}, {address.state} {address.pincode}</p>
        <p>{address.country}</p>
        <p>Phone: {address.phone}</p>
        <div className="flex items-center gap-1.5 pt-2">
          <TypeIcon size={12} style={{ color: "var(--primary-blue)" }} />
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--primary-blue)" }}
          >
            {TYPE_LABELS[address.type] || address.type}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Address() {
  const [deliveryAddresses, setDeliveryAddresses] = useState(INITIAL_DELIVERY);
  const [billingAddress, setBillingAddress] = useState(null);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b" style={{ borderColor: "#e5e7eb" }}>
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            <span style={{ color: "var(--primary-blue)" }}>Address </span>
            <span style={{ color: "var(--primary-blue)" }}>Book</span>
          </h2>
          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
            Manage your billing and delivery addresses
          </p>
        </div>
        
        {/* ✅ FIXED: Added btn-gradient class for gradient effect */}
        <button
          className="btn-gradient btn-shine flex items-center justify-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
          style={{
            fontFamily: "var(--font-poppins), Poppins, sans-serif",
          }}
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing */}
        <div>
          <h3
            className="text-sm font-semibold mb-3 flex items-center gap-2"
            style={{
              color: "#374151",
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            <MapPin size={16} style={{ color: "var(--primary-blue)" }} />
            Billing Address
          </h3>
          {billingAddress ? (
            <AddressCard address={billingAddress} onDelete={() => setBillingAddress(null)} />
          ) : (
            <button
              className="w-full rounded-xl p-10 flex flex-col items-center gap-3 transition-all hover:bg-gray-50 group"
              style={{
                border: "2px dashed #d1d5db",
                background: "transparent",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                style={{ background: "#f3f4f6" }}
              >
                <Plus size={20} style={{ color: "#9ca3af" }} />
              </div>
              <span
                className="text-sm font-medium"
                style={{
                  color: "#6b7280",
                  fontFamily: "var(--font-poppins), Poppins, sans-serif",
                }}
              >
                Add Billing Address
              </span>
            </button>
          )}
        </div>

        {/* Delivery */}
        <div>
          <h3
            className="text-sm font-semibold mb-3 flex items-center gap-2"
            style={{
              color: "#374151",
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            <MapPin size={16} style={{ color: "var(--primary-blue)" }} />
            Delivery Address
          </h3>
          <div className="flex flex-col gap-4">
            {deliveryAddresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                onDelete={() =>
                  setDeliveryAddresses((prev) => prev.filter((a) => a.id !== addr.id))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}