// src/app/account/components/AccountDetails.jsx
"use client";
import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, Save, CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function InputField({ label, name, value, onChange, icon, type = "text", required, hint }) {
  return (
    <div className="w-full">
      <label
        className="text-sm font-medium mb-2 block"
        style={{
          color: "#374151",
          fontFamily: "var(--font-poppins), Poppins, sans-serif",
        }}
      >
        {label}
        {required && <span className="ml-1" style={{ color: "var(--primary-blue)" }}>*</span>}
      </label>
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-blue/20"
        style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
        }}
      >
        <span className="shrink-0" style={{ color: "#9ca3af" }}>{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent text-sm outline-none"
          style={{
            color: "#1f2937",
            fontFamily: "var(--font-inter), Inter, sans-serif",
          }}
        />
      </div>
      {hint && (
        <p className="text-xs mt-1.5" style={{ color: "#9ca3af" }}>{hint}</p>
      )}
    </div>
  );
}

function PasswordField({ label, name, value, onChange, show, onToggle }) {
  return (
    <div className="w-full">
      <label
        className="text-sm font-medium mb-2 block"
        style={{
          color: "#374151",
          fontFamily: "var(--font-poppins), Poppins, sans-serif",
        }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-blue/20"
        style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
        }}
      >
        <Lock size={16} className="shrink-0" style={{ color: "#9ca3af" }} />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent text-sm outline-none"
          style={{
            color: "#1f2937",
            fontFamily: "var(--font-inter), Inter, sans-serif",
          }}
        />
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 hover:opacity-70 transition-opacity"
          style={{ color: "#9ca3af" }}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

export default function AccountDetails() {
  const user = useSelector((state) => state.auth.user);
  console.log("user profile",user)
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPwd, setShowPwd] = useState({ current: false, new: false, confirm: false });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
  if (user) {
    setForm((prev) => ({
      ...prev,
      fullName: user.name || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
    }));
  }
}, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const togglePwd = (field) =>
    setShowPwd((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Section header */}
      <div className="mb-8 pb-4 border-b" style={{ borderColor: "#e5e7eb" }}>
        <h2
          className="text-xl sm:text-2xl font-bold"
          style={{
            fontFamily: "var(--font-poppins), Poppins, sans-serif",
          }}
        >
          <span style={{ color: "#1e293b" }}>Account </span>
          <span style={{ color: "var(--primary-blue)" }}>Details</span>
        </h2>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Update your personal information
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-5">
          <InputField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            icon={<User size={16} />}
            required
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            icon={<Mail size={16} />}
            required
          />

          {/* Phone with prefix */}
          <div className="w-full">
            <label
              className="text-sm font-medium mb-2 block"
              style={{
                color: "#374151",
                fontFamily: "var(--font-poppins), Poppins, sans-serif",
              }}
            >
              Phone Number
            </label>
            <div
              className="flex items-center rounded-xl overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-blue/20"
              style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
            >
              <span
                className="px-4 py-3 text-sm font-medium shrink-0"
                style={{
                  color: "#374151",
                  borderRight: "1px solid #e5e7eb",
                  background: "#f3f4f6",
                  fontFamily: "var(--font-poppins), Poppins, sans-serif",
                }}
              >
                +91
              </span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                className="flex-1 px-4 py-3 bg-transparent text-sm outline-none"
                style={{
                  color: "#1f2937",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
                placeholder="9876543210"
              />
              <span className="px-3 shrink-0" style={{ color: "#9ca3af" }}>
                <Phone size={16} />
              </span>
            </div>
            <p className="text-xs mt-1.5" style={{ color: "#9ca3af" }}>
              Optional - 10 digits without country code
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: "#e5e7eb" }}></div>
          </div>
          <div className="relative flex justify-center">
            <span
              className="px-4 text-xs font-semibold bg-white"
              style={{
                color: "#9ca3af",
                fontFamily: "var(--font-poppins), Poppins, sans-serif",
                letterSpacing: "1px",
              }}
            >
              CHANGE PASSWORD (OPTIONAL)
            </span>
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-5">
          <PasswordField
            label="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            show={showPwd.current}
            onToggle={() => togglePwd("current")}
          />
          <PasswordField
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            show={showPwd.new}
            onToggle={() => togglePwd("new")}
          />
          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            show={showPwd.confirm}
            onToggle={() => togglePwd("confirm")}
          />
        </div>

        {/* Save Button - Updated with btn-gradient and btn-shine classes */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-gradient btn-shine w-full flex items-center justify-center gap-2 text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            {saved ? (
              <>
                <CheckCircle size={18} />
                Saved Successfully!
              </>
            ) : saving ? (
              "Saving..."
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}