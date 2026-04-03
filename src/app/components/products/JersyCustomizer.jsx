"use client";

import { useState, useCallback } from "react";

// ─── Color Palette ────────────────────────────────────────────────────────────
const COLORS = [
  { n: "Black", v: "#111111" },
  { n: "Navy", v: "#1a237e" },
  { n: "Royal Blue", v: "#2962ff" },
  { n: "Electric Blue", v: "#448aff" },
  { n: "Teal", v: "#00bcd4" },
  { n: "Rich Royal", v: "#3f7fcf" },
  { n: "Sky Blue", v: "#81d4fa" },
  { n: "Lavender", v: "#9575cd" },
  { n: "Dark Purple", v: "#4a148c" },
  { n: "Hot Pink", v: "#e91e63" },
  { n: "Light Pink", v: "#f48fb1" },
  { n: "Magenta", v: "#e040fb" },
  { n: "Red", v: "#d32f2f" },
  { n: "Crimson", v: "#b71c1c" },
  { n: "Maroon", v: "#880e4f" },
  { n: "Dark Maroon", v: "#6d1b1b" },
  { n: "Forest Green", v: "#1b5e20" },
  { n: "Lime Green", v: "#76ff03" },
  { n: "Dark Teal", v: "#004d40" },
  { n: "Orange", v: "#ff6d00" },
  { n: "Gold", v: "#ffd600" },
  { n: "Yellow", v: "#ffee58" },
  { n: "Olive", v: "#827717" },
  { n: "Khaki", v: "#bcaaa4" },
  { n: "Brown", v: "#795548" },
  { n: "Tan", v: "#d7ccc8" },
  { n: "Cream", v: "#fff8e1" },
  { n: "Charcoal", v: "#455a64" },
  { n: "Dark Gray", v: "#616161" },
  { n: "Light Gray", v: "#bdbdbd" },
  { n: "Silver", v: "#e0e0e0" },
  { n: "White", v: "#ffffff" },
  { n: "Burnt Orange", v: "#bf360c" },
  { n: "Deep Pink", v: "#c2185b" },
  { n: "Violet", v: "#7b1fa2" },
  { n: "Steel Blue", v: "#546e7a" },
  { n: "Mint", v: "#80cbc4" },
  { n: "Sage", v: "#a5d6a7" },
  { n: "Coral", v: "#ff7043" },
];

// ─── Collar Styles ────────────────────────────────────────────────────────────
const COLLAR_STYLES = [
  {
    name: "Polo Collar",
    icon: (
      <svg viewBox="0 0 36 36" className="w-8 h-8">
        <path d="M6,8 Q18,28 30,8 L28,6 Q18,22 8,6 Z" fill="#555" />
        <path d="M14,8 L18,20 L22,8" fill="none" stroke="#888" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "V-Neck Collar",
    icon: (
      <svg viewBox="0 0 36 36" className="w-8 h-8">
        <path d="M10,6 L18,24 L26,6" fill="none" stroke="#555" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "Round Neck",
    icon: (
      <svg viewBox="0 0 36 36" className="w-8 h-8">
        <path d="M10,8 Q10,22 18,24 Q26,22 26,8" fill="none" stroke="#555" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "Henley Collar",
    icon: (
      <svg viewBox="0 0 36 36" className="w-8 h-8">
        <rect x="11" y="5" width="14" height="18" rx="7" fill="#555" />
        <path d="M15,5 L15,14 L21,14 L21,5" fill="#888" />
      </svg>
    ),
  },
  {
    name: "Crew Neck",
    icon: (
      <svg viewBox="0 0 36 36" className="w-8 h-8">
        <ellipse cx="18" cy="14" rx="9" ry="8" fill="#444" />
      </svg>
    ),
  },
  {
    name: "Mandarin Collar",
    icon: (
      <svg viewBox="0 0 36 36" className="w-8 h-8">
        <path
          d="M10,6 Q10,20 18,20 Q26,20 26,6 L22,6 Q22,16 18,16 Q14,16 14,6 Z"
          fill="#555"
        />
      </svg>
    ),
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColorSwatch({ color, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button
        onClick={() => onSelect(color.v)}
        style={{ backgroundColor: color.v }}
        className={`w-8 h-8 rounded-md transition-transform cursor-pointer ${
          selected ? "ring-2 ring-gray-700 scale-110" : "hover:scale-110"
        } ${color.v === "#ffffff" ? "border border-gray-300" : "border-0"}`}
        title={color.n}
        aria-label={color.n}
      />
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-20 pointer-events-none">
          {color.n}
        </div>
      )}
    </div>
  );
}

function ColorGrid({ selectedColor, onSelect }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {COLORS.map((c) => (
        <ColorSwatch key={c.v} color={c} selected={selectedColor === c.v} onSelect={onSelect} />
      ))}
    </div>
  );
}

function SectionAccordion({ title, isOpen, onToggle, children }) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={`w-full px-4 py-2.5 text-left text-sm font-semibold rounded flex justify-between items-center transition-colors ${
          isOpen ? "bg-[#1a1a6e] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="pt-3 pb-2 px-1">{children}</div>}
    </div>
  );
}

// ─── Jersey SVG Preview ───────────────────────────────────────────────────────

function JerseySVG({ jerseyColor, sleeveColor, designColor, collarColor, teamName, number, font, isBack }) {
  return (
    <svg
      width="260"
      height="310"
      viewBox="0 0 260 310"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Jersey body */}
      <path
        d="M50,30 L10,90 L45,105 L45,280 L215,280 L215,105 L250,90 L210,30 L185,20 Q165,55 130,55 Q95,55 75,20 Z"
        fill={jerseyColor}
        stroke={jerseyColor === "#ffffff" ? "#ccc" : jerseyColor}
        strokeWidth="1"
      />
      {/* Sleeve trims */}
      <path d="M10,90 L45,105 L45,165 L10,150 Z" fill={sleeveColor} opacity="0.9" />
      <path d="M250,90 L215,105 L215,165 L250,150 Z" fill={sleeveColor} opacity="0.9" />
      {/* Side design panel */}
      {!isBack && (
        <>
          <path
            d="M165,55 Q168,90 160,280 L215,280 L215,105 L210,30 Q195,48 165,55 Z"
            fill={designColor}
            opacity="0.75"
          />
          <path
            d="M155,58 Q158,100 152,280 L162,280 Q168,100 165,55 Z"
            fill="#ffffff"
            opacity="0.55"
          />
        </>
      )}
      {/* Back panel stripe */}
      {isBack && (
        <path
          d="M95,55 Q92,90 100,280 L160,280 Q168,100 165,55 Z"
          fill={designColor}
          opacity="0.4"
        />
      )}
      {/* Collar */}
      <path
        d="M95,22 Q95,10 130,8 Q165,10 165,22 L158,30 Q155,45 130,48 Q105,45 102,30 Z"
        fill={collarColor}
        stroke={collarColor === "#ffffff" ? "#ccc" : collarColor}
        strokeWidth="1"
      />
      {/* Collar band */}
      <rect x="124" y="8" width="12" height="22" rx="2" fill={collarColor} opacity="0.7" />
      <circle cx="130" cy="16" r="2.5" fill={collarColor === "#ffffff" ? "#bbb" : "#ffffff"} opacity="0.6" />
      <circle cx="130" cy="26" r="2.5" fill={collarColor === "#ffffff" ? "#bbb" : "#ffffff"} opacity="0.6" />
      {/* Number */}
      <text
        x="115"
        y="185"
        fontFamily={font || "Impact"}
        fontSize="70"
        fontWeight="900"
        fill="rgba(255,255,255,0.28)"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {number || "10"}
      </text>
      {/* Team Name */}
      <text
        x="115"
        y="235"
        fontFamily={font || "Impact"}
        fontSize="13"
        fill="rgba(255,255,255,0.5)"
        textAnchor="middle"
        letterSpacing="2"
      >
        {(teamName || "MY TEAM").toUpperCase()}
      </text>
    </svg>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────

function StylePanel({ state, setState }) {
  const [openSection, setOpenSection] = useState("collar");

  const toggle = (section) =>
    setOpenSection((prev) => (prev === section ? null : section));

  return (
    <div>
      <p className="text-sm text-gray-800 mb-1">
        Built for match day — performance fit, full-color sublimation, ideal for coloured kit formats and T20.
      </p>
      <p className="text-xs text-gray-500 italic mb-4">
        Pro tip: Limit your kit to 2–3 core colors for a clean, professional look.
      </p>

      <SectionAccordion title="Fabric" isOpen={openSection === "fabric"} onToggle={() => toggle("fabric")}>
        <p className="text-xs text-gray-500">Fabric options coming soon.</p>
      </SectionAccordion>

      <SectionAccordion title="Collar" isOpen={openSection === "collar"} onToggle={() => toggle("collar")}>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Choose Collar Style
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          {COLLAR_STYLES.map((cs) => (
            <button
              key={cs.name}
              onClick={() => setState((s) => ({ ...s, selectedCollar: cs.name }))}
              className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center relative transition-all ${
                state.selectedCollar === cs.name
                  ? "border-[#1a1a6e] bg-white shadow"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              title={cs.name}
            >
              {cs.icon}
              {state.selectedCollar === cs.name && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#1a1a6e] rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 9 9" className="w-2 h-2">
                    <polyline points="1.5,4.5 3.5,7 7.5,2" fill="none" stroke="white" strokeWidth="1.5" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="text-xs font-bold text-[#1a1a6e] mb-3">{state.selectedCollar}</p>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Choose Collar Color
        </p>
        <ColorGrid selectedColor={state.collarColor} onSelect={(v) => setState((s) => ({ ...s, collarColor: v }))} />
      </SectionAccordion>

      <SectionAccordion title="Base" isOpen={openSection === "base"} onToggle={() => toggle("base")}>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Choose Base Color
        </p>
        <ColorGrid selectedColor={state.jerseyColor} onSelect={(v) => setState((s) => ({ ...s, jerseyColor: v }))} />
      </SectionAccordion>

      <SectionAccordion title="Sleeve" isOpen={openSection === "sleeve"} onToggle={() => toggle("sleeve")}>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Choose Sleeve Color
        </p>
        <ColorGrid selectedColor={state.sleeveColor} onSelect={(v) => setState((s) => ({ ...s, sleeveColor: v }))} />
      </SectionAccordion>

      <SectionAccordion title="Design Colors" isOpen={openSection === "design"} onToggle={() => toggle("design")}>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Choose Design Color
        </p>
        <ColorGrid selectedColor={state.designColor} onSelect={(v) => setState((s) => ({ ...s, designColor: v }))} />
      </SectionAccordion>
    </div>
  );
}

function LogosPanel() {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="text-sm text-gray-500 font-medium">Upload your team logo</p>
      <button className="px-5 py-2 bg-[#1a1a6e] text-white text-sm rounded-lg font-semibold hover:bg-[#12125a] transition-colors">
        Upload Logo
      </button>
    </div>
  );
}

const FONTS = ["Impact", "Arial Black", "Oswald", "Bebas Neue", "Teko"];

function NameNumberPanel({ state, setState }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
          Team Name
        </label>
        <input
          type="text"
          value={state.teamName}
          onChange={(e) => setState((s) => ({ ...s, teamName: e.target.value }))}
          maxLength={20}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#1a1a6e] outline-none transition-colors"
          placeholder="MY TEAM"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
          Player Name
        </label>
        <input
          type="text"
          value={state.playerName}
          onChange={(e) => setState((s) => ({ ...s, playerName: e.target.value }))}
          maxLength={20}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#1a1a6e] outline-none transition-colors"
          placeholder="PLAYER"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
          Jersey Number
        </label>
        <input
          type="number"
          value={state.number}
          onChange={(e) => setState((s) => ({ ...s, number: e.target.value }))}
          min={0}
          max={99}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[#1a1a6e] outline-none transition-colors"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
          Typography
        </label>
        <div className="flex flex-wrap gap-2">
          {FONTS.map((f) => (
            <button
              key={f}
              onClick={() => setState((s) => ({ ...s, font: f }))}
              style={{ fontFamily: f }}
              className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all ${
                state.font === f
                  ? "border-[#1a1a6e] bg-blue-50 text-gray-900 font-bold"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderPanel({ state }) {
  const [qty, setQty] = useState(10);
  const price = 29.99;
  const discount = qty >= 50 ? 20 : qty >= 25 ? 15 : 0;
  const unitPrice = price * (1 - discount / 100);
  const total = (unitPrice * qty).toFixed(2);

  return (
    <div className="space-y-5">
      <div className="bg-gray-900 rounded-2xl p-6 text-white">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Estimate</p>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-black italic">${total}</span>
          <span className="text-gray-500 text-sm line-through">${(price * qty).toFixed(2)}</span>
        </div>
        <p className="text-gray-400 text-xs mb-4">${unitPrice.toFixed(2)} per unit · {discount > 0 ? `${discount}% bulk discount` : "No discount yet"}</p>
        <div>
          <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold mb-1">
            <span>Bulk Savings</span>
            <span>{qty >= 50 ? "Max discount!" : `Next tier: ${qty >= 25 ? "50" : "25"}+ units`}</span>
          </div>
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((qty / 60) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div>
          <p className="font-black text-base italic text-gray-900">QUANTITY</p>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Min. Order: 10 Units</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQty((q) => Math.max(10, q - 1))}
            className="w-9 h-9 border-2 border-gray-300 rounded-full flex items-center justify-center font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all text-gray-800"
          >
            −
          </button>
          <span className="text-xl font-black italic text-gray-900 w-8 text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-9 h-9 border-2 border-gray-300 rounded-full flex items-center justify-center font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all text-gray-800"
          >
            +
          </button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
        <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Order Summary</p>
        {[
          { label: "Base Color", value: state.jerseyColor },
          { label: "Collar", value: state.selectedCollar },
          { label: "Team", value: state.teamName || "—" },
          { label: "Number", value: `#${state.number}` },
          { label: "Font", value: state.font },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-bold text-gray-800 flex items-center gap-2">
              {label === "Base Color" && (
                <span
                  className="w-4 h-4 rounded-sm border border-gray-300 inline-block"
                  style={{ background: value }}
                />
              )}
              {label !== "Base Color" && value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tabs Config ──────────────────────────────────────────────────────────────

const TABS = [
  {
    id: "style",
    label: "Style",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    id: "logos",
    label: "Logos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "namenumber",
    label: "Name & Number",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
  {
    id: "order",
    label: "Order",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1" strokeWidth="2" />
        <circle cx="20" cy="21" r="1" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
        />
      </svg>
    ),
  },
];

// ─── History Hook ─────────────────────────────────────────────────────────────

function useHistory(initialState) {
  const [history, setHistory] = useState([initialState]);
  const [cursor, setCursor] = useState(0);

  const state = history[cursor];

  const setState = useCallback(
    (updater) => {
      setHistory((prev) => {
        const newState = typeof updater === "function" ? updater(prev[cursor]) : updater;
        const newHistory = prev.slice(0, cursor + 1);
        newHistory.push(newState);
        return newHistory;
      });
      setCursor((c) => c + 1);
    },
    [cursor]
  );

  const undo = useCallback(() => {
    if (cursor > 0) setCursor((c) => c - 1);
  }, [cursor]);

  const redo = useCallback(() => {
    if (cursor < history.length - 1) setCursor((c) => c + 1);
  }, [cursor, history.length]);

  const reset = useCallback(() => {
    setHistory([initialState]);
    setCursor(0);
  }, [initialState]);

  return { state, setState, undo, redo, reset, canUndo: cursor > 0, canRedo: cursor < history.length - 1 };
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_STATE = {
  jerseyColor: "#3b9ed0",
  sleeveColor: "#1a1a6e",
  designColor: "#1a1a5a",
  collarColor: "#ffffff",
  selectedCollar: "Polo Collar",
  teamName: "MY TEAM",
  playerName: "PLAYER",
  number: "10",
  font: "Impact",
};

export default function JerseyCustomizer() {
  const { state, setState, undo, redo, reset, canUndo, canRedo } = useHistory(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState("style");
  const [isBack, setIsBack] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  const renderPanel = () => {
    switch (activeTab) {
      case "style":
        return <StylePanel state={state} setState={setState} />;
      case "logos":
        return <LogosPanel />;
      case "namenumber":
        return <NameNumberPanel state={state} setState={setState} />;
      case "order":
        return <OrderPanel state={state} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const nextIdx = TABS.findIndex((t) => t.id === activeTab);
    if (nextIdx < TABS.length - 1) setActiveTab(TABS[nextIdx + 1].id);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans">
      {/* Top bar */}
      <div className="flex justify-end px-5 py-2 border-b border-gray-200">
        <button className="text-sm font-semibold text-[#1a1a6e] underline hover:opacity-70">
          View Saved Designs
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: Jersey Preview ── */}
        <div className="flex-1 flex flex-col bg-gray-100 p-4 relative min-w-0">
          {/* Action Row */}
          <div className="flex justify-between mb-3">
            <button
              onClick={reset}
              className="bg-[#1a1a6e] text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-[#12125a] transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setIsBack((v) => !v)}
              className="bg-[#1a1a6e] text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-[#12125a] transition-colors"
            >
              {isBack ? "Front View" : "Back View"}
            </button>
          </div>

          {/* Jersey */}
          <div className="flex-1 flex items-center justify-center relative">
            <JerseySVG
              jerseyColor={state.jerseyColor}
              sleeveColor={state.sleeveColor}
              designColor={state.designColor}
              collarColor={state.collarColor}
              teamName={state.teamName}
              number={state.number}
              font={state.font}
              isBack={isBack}
            />
            {/* Undo / Redo */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              <button
                onClick={undo}
                disabled={!canUndo}
                className="bg-[#1a1a6e] disabled:opacity-40 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#12125a] transition-colors"
              >
                UNDO
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="bg-gray-500 disabled:opacity-40 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                REDO
              </button>
            </div>
          </div>

          {/* Live preview card */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-3 text-xs">
            <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200">
              <span className="text-[9px] font-black tracking-widest text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full uppercase">
                Live Preview
              </span>
              <span className="text-[10px] text-gray-400">Real-time customization</span>
            </div>
            <div className="p-3 flex gap-3 items-center">
              <div
                className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0 transition-colors duration-300"
                style={{ background: state.jerseyColor }}
              />
              <div className="flex-1 space-y-1">
                {[
                  ["Team", state.teamName || "—"],
                  ["Number", `#${state.number}`],
                  ["Collar", state.selectedCollar],
                  ["Font", state.font],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400 text-[10px]">{label}</span>
                    <span
                      className="text-gray-700 font-bold text-[10px]"
                      style={label === "Font" ? { fontFamily: state.font } : {}}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat button */}
          {chatOpen && (
            <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow text-sm font-semibold text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat with us
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-600 ml-1 text-xs">✕</button>
            </div>
          )}
        </div>

        {/* ── Right: Customization Panel ── */}
        <div className="w-[400px] flex flex-col border-l border-gray-200 flex-shrink-0">
          {/* Tabs */}
          <div className="flex bg-[#1a1a6e]">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-1 text-[10px] font-bold transition-colors border-none cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white/15 text-white"
                    : "text-white/55 hover:text-white/80 hover:bg-white/10"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable panel */}
          <div className="flex-1 overflow-y-auto p-4">{renderPanel()}</div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 px-4 py-3 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
            >
              {activeTab === "order" ? "Place Order" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}