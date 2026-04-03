"use client";
import { useState } from "react";
import { Check, Info, TrendingDown, ShieldCheck, Zap, ChevronRight } from "lucide-react";

const FONTS = ["Impact", "Arial Black", "Bebas Neue", "Oswald", "Teko"];

export default function ProductInfo({ product, onCustomizationChange }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(product.moq || 10);
  const [customization, setCustomization] = useState({
    teamName: "MY TEAM",
    playerName: "PLAYER",
    number: "10",
    font: FONTS[0],
  });

  const updateCustom = (key, val) => {
    const next = { ...customization, [key]: val };
    setCustomization(next);
    onCustomizationChange?.({ color: product.colors[selectedColor], ...next });
  };

  // Premium Pricing Logic
  const unitPrice = product.price;
  const discount = quantity >= 50 ? 20 : quantity >= 25 ? 15 : 0;
  const finalUnitPrice = unitPrice * (1 - discount / 100);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Title & Badge */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase">Pro Performance</span>
          <div className="h-[1px] flex-1 bg-gray-200" />
        </div>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-gray-900 leading-none mb-4">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-600" /> 2-Year Print Warranty</span>
          <span className="flex items-center gap-1"><Zap size={16} className="text-yellow-600" /> 7-Day Fast Track</span>
        </div>
      </div>

      {/* Pricing Card - IRASportsWeras Style */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Total Estimate</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black italic tracking-tighter">${(finalUnitPrice * quantity).toFixed(0)}</span>
                <span className="text-gray-500 text-sm font-bold line-through">${(unitPrice * quantity).toFixed(0)}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-red-600 text-[10px] font-black px-3 py-1.5 rounded-full italic tracking-tighter shadow-lg">
                SAVE {discount}% OFF
              </span>
              <p className="text-gray-400 text-[10px] font-bold mt-2">${finalUnitPrice.toFixed(2)} / UNIT</p>
            </div>
          </div>
          
          {/* Progress Bar for Bulk Savings */}
          <div className="space-y-2">
             <div className="flex justify-between text-[9px] font-black tracking-widest text-gray-500 uppercase">
                <span>Bulk Savings</span>
                <span>Next Tier: 50+ Units</span>
             </div>
             <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-1000 rounded-full" 
                  style={{ width: `${Math.min((quantity/60)*100, 100)}%` }} 
                />
             </div>
          </div>
        </div>
      </div>

      {/* Selection Sections */}
      <div className="space-y-10">
        {/* Color Tiles */}
        <section>
          <h3 className="text-[11px] font-black tracking-[0.2em] text-gray-900 mb-4 uppercase flex items-center gap-2">
            1. Select Base Color <Info size={12} className="text-gray-400" />
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(i)}
                className={`w-14 h-14 rounded-2xl border-4 transition-all flex items-center justify-center ${
                  selectedColor === i ? "border-red-600 scale-110 shadow-xl" : "border-transparent bg-gray-100 hover:scale-105"
                }`}
                style={{ backgroundColor: c }}
              >
                {selectedColor === i && <Check size={24} className="text-white drop-shadow-md" />}
              </button>
            ))}
          </div>
        </section>

        {/* Customization Grid - White Card Style */}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <h3 className="text-[11px] font-black tracking-[0.2em] text-gray-900 uppercase">
            2. Live Customization
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 tracking-widest">TEAM NAME</label>
              <input 
                type="text" 
                value={customization.teamName}
                onChange={(e) => updateCustom("teamName", e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm focus:border-red-600 focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 tracking-widest">JERSEY NUMBER</label>
              <input 
                type="number" 
                value={customization.number}
                onChange={(e) => updateCustom("number", e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm focus:border-red-600 focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-500 tracking-widest">CHOOSE TYPOGRAPHY</label>
            <div className="flex flex-wrap gap-2">
              {FONTS.map(f => (
                <button
                  key={f}
                  onClick={() => updateCustom("font", f)}
                  className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${
                    customization.font === f ? "border-red-600 bg-red-50 text-gray-900 font-bold" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                  style={{ fontFamily: f }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Quantity Controls - IRASportsWeras Style */}
        <section className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div>
            <h4 className="font-black text-lg italic tracking-tight text-gray-900">QUANTITY</h4>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Min. Order: 10 Units</p>
          </div>
          <div className="flex items-center gap-6">
             <button onClick={() => setQuantity(Math.max(10, quantity - 1))} className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all font-bold text-gray-900"> - </button>
             <span className="text-2xl font-black italic text-gray-900">{quantity}</span>
             <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all font-bold text-gray-900"> + </button>
          </div>
        </section>

        {/* Add to Cart CTA - IRASportsWeras Style */}
        <button className="w-full bg-red-600 hover:bg-gray-900 text-white py-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group shadow-lg shadow-red-600/20">
          <span className="text-sm font-black tracking-[0.25em] uppercase">Add to Design Lab</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}