"use client";
import { useState, useEffect } from "react";
import { X, Home, Building, MapPinned, Landmark, Locate, User, Phone, Check } from "lucide-react";

const STEPS = [
  { id: "contact",  title: "Contact info",     sub: "Who should we contact for this address?" },
  { id: "address",  title: "Address details",  sub: "Where should we deliver?" },
  { id: "location", title: "Location details", sub: "City, state and PIN code" },
  { id: "type",     title: "Address type",     sub: "How would you like to label this address?" },
  { id: "review",   title: "Review & save",    sub: "Double-check your details before saving" },
];

const COUNTRIES = ["India", "United States", "United Kingdom", "Canada", "Australia"];

const EMPTY = {
  fullName: "", phone: "", addressLine1: "", landMark: "",
  city: "", state: "", zipCode: "", country: "India",
  addressType: "HOME", isPrimary: false,
};

export default function AddAddressModal({ isOpen, onClose, onSave, initialData = null }) {
  const [step, setStep]       = useState(0);
  const [formData, setFormData] = useState(EMPTY);
  const [errors, setErrors]   = useState({});
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    setSaved(false);
    setErrors({});
    setFormData(initialData ? { ...EMPTY, ...initialData } : EMPTY);
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const set = (k, v) => setFormData(p => ({ ...p, [k]: v }));

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    const { id } = STEPS[step];
    if (id === "contact") {
      if (!formData.fullName.trim())  e.fullName = "Full name is required";
      if (!formData.phone.trim())     e.phone    = "Phone is required";
      else if (!/^[0-9]{10}$/.test(formData.phone)) e.phone = "Must be 10 digits";
    }
    if (id === "address") {
      if (!formData.addressLine1.trim()) e.addressLine1 = "Address is required";
    }
    if (id === "location") {
      if (!formData.city.trim())    e.city    = "City is required";
      if (!formData.state.trim())   e.state   = "State is required";
      if (!formData.zipCode.trim()) e.zipCode = "PIN code is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (!validate()) return;
    if (step === STEPS.length - 1) {
      await onSave(formData);
      setSaved(true);
    } else {
      setStep(s => s + 1);
    }
  };

  /* ── Field helpers ── */
  const inputClass = (field) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400
     focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
     ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200"}`;

  const iconInput = (icon, field, props = {}) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <input {...props} value={formData[field]}
        onChange={e => set(field, e.target.value)}
        className={`${inputClass(field)} pl-9`} />
      {errors[field] && <p className="mt-1 text-xs text-red-500">{errors[field]}</p>}
    </div>
  );

  /* ── Step panels ── */
  const panels = {
    contact: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Full name <Req /></Label>
          {iconInput(<User size={15} />, "fullName", { placeholder: "Your full name" })}
        </div>
        <div>
          <Label>Phone <Req /></Label>
          {iconInput(<Phone size={15} />, "phone", { placeholder: "10-digit number", maxLength: "10", type: "tel" })}
        </div>
      </div>
    ),

    address: (
      <div className="space-y-4">
        <div>
          <Label>Address line <Req /></Label>
          <div className="relative">
            <MapPinned size={15} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              value={formData.addressLine1}
              onChange={e => set("addressLine1", e.target.value)}
              rows={2}
              placeholder="House no., street, area"
              className={`${inputClass("addressLine1")} pl-9 resize-none`}
            />
            {errors.addressLine1 && <p className="mt-1 text-xs text-red-500">{errors.addressLine1}</p>}
          </div>
        </div>
        <div>
          <Label>Landmark <span className="font-normal text-gray-400 text-xs">(optional)</span></Label>
          <div className="relative">
            <Landmark size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={formData.landMark}
              onChange={e => set("landMark", e.target.value)}
              placeholder="Near a famous building"
              className={`${inputClass("")} pl-9`}
            />
          </div>
        </div>
      </div>
    ),

    location: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>City <Req /></Label>
            <input value={formData.city} onChange={e => set("city", e.target.value)}
              placeholder="City" className={inputClass("city")} />
            {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
          </div>
          <div>
            <Label>State <Req /></Label>
            <input value={formData.state} onChange={e => set("state", e.target.value)}
              placeholder="State" className={inputClass("state")} />
            {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>PIN code <Req /></Label>
            <input value={formData.zipCode} onChange={e => set("zipCode", e.target.value)}
              placeholder="6 digits" maxLength="6" className={inputClass("zipCode")} />
            {errors.zipCode && <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>}
          </div>
          <div>
            <Label>Country</Label>
            <div className="relative">
              <Locate size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select value={formData.country} onChange={e => set("country", e.target.value)}
                className={`${inputClass("")} pl-9`}>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    ),

    type: (
      <div className="space-y-4">
        <div>
          <Label>Address type</Label>
          <div className="flex gap-3">
            {[
              { value: "HOME",   label: "Home",   icon: <Home size={16} /> },
              { value: "OFFICE", label: "Office", icon: <Building size={16} /> },
            ].map(({ value, label, icon }) => (
              <button key={value} type="button" onClick={() => set("addressType", value)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all
                  ${formData.addressType === value
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"}`}>
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => set("isPrimary", !formData.isPrimary)}
          className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
          <span className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all
            ${formData.isPrimary ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}>
            {formData.isPrimary && <Check size={12} strokeWidth={3} className="text-white" />}
          </span>
          <span className="text-sm font-medium text-gray-700">Set as primary address</span>
        </button>
      </div>
    ),

    review: (
      <div>
        <div className="flex gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-200">
            {formData.addressType === "HOME" ? <Home size={11} /> : <Building size={11} />}
            {formData.addressType === "HOME" ? "Home" : "Office"}
          </span>
          {formData.isPrimary && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-200">
              Primary
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
          {[
            ["Full name",   formData.fullName],
            ["Phone",       formData.phone],
            ["Address",     [formData.addressLine1, formData.landMark].filter(Boolean).join(", "), "col-span-2"],
            ["City",        formData.city],
            ["State",       formData.state],
            ["PIN code",    formData.zipCode],
            ["Country",     formData.country],
          ].map(([label, val, extra = ""]) => (
            <div key={label} className={`p-3 ${extra}`}>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm font-medium text-gray-900">{val || "—"}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  /* ── Success screen ── */
  if (saved) return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm p-8 text-center transform animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Check size={26} className="text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Address saved!</h2>
        <p className="text-sm text-gray-500 mb-6">{formData.fullName}'s address has been added.</p>
        <button onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-md">
          Done
        </button>
      </div>
    </div>
  );

  const progress = (step / (STEPS.length - 1)) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>

        {/* Close button - Top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110"
        >
          <X size={16} className="text-gray-600" />
        </button>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Stepper */}
        <div className="flex items-start px-6 pt-5 pb-4 gap-0">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-300
                  ${i < step  ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-500 text-white"
                  : i === step ? "border-blue-500 bg-blue-50 text-blue-600"
                  :              "border-gray-200 text-gray-400"}`}>
                  {i < step ? <Check size={12} strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-xs whitespace-nowrap ${i === step ? "text-blue-600 font-medium" : "text-gray-400"}`}>
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1 mb-4 transition-all duration-300 ${i < step ? "bg-gradient-to-r from-blue-400 to-cyan-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="px-6 pb-2">
          <h2 className="text-base font-semibold text-gray-900 mb-0.5">{STEPS[step].title}</h2>
          <p className="text-sm text-gray-500 mb-4">{STEPS[step].sub}</p>
          {panels[STEPS[step].id]}
        </div>

        {/* Footer with gradient buttons + shine effect */}
        <div className="flex gap-3 px-6 py-4 mt-2 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              Back
            </button>
          )}
          <button onClick={next}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-300 relative overflow-hidden group shadow-md"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
            }}>
            {/* Shine effect */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transform: "translateX(-100%)",
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {step === STEPS.length - 1 ? (initialData ? "Update address" : "Save address") : "Continue"}
            </span>
            
            {/* Hover shine animation */}
            <style jsx>{`
              button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
              }
              button:active {
                transform: translateY(0);
              }
              button span:first-child {
                animation: shine 1.5s infinite;
              }
              @keyframes shine {
                0% { transform: translateX(-100%); }
                20%, 100% { transform: translateX(100%); }
              }
            `}</style>
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Tiny helpers ── */
function Label({ children }) {
  return <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">{children}</label>;
}
function Req() {
  return <span className="text-red-400">*</span>;
}