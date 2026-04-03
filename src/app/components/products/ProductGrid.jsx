"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Target, 
  Activity, 
  Zap, 
  ShoppingBag, 
  ChevronDown,
  Upload,
  Sparkles
} from "lucide-react";

export default function ProductGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMainCat, setSelectedMainCat] = useState("all");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Layout structure for the sidebar navigation
  const menuStructure = [
    { id: "all", label: "All Gear", icon: <Activity size={16} />, subs: [] },
    { id: "sports", label: "Sports", icon: <Target size={16} />, subs: ["Football", "Cricket", "Tennis", "Basketball"] },
    { id: "clothes", label: "Clothes", icon: <Activity size={16} />, subs: ["T-Shirts", "Hoodies", "Shorts", "Pants"] },
    { id: "athleisure", label: "Athleisure", icon: <Zap size={16} />, subs: ["Compression", "Joggers", "Jackets"] },
    { id: "accessories", label: "Accessories", icon: <ShoppingBag size={16} />, subs: ["Gym Bags", "Bottles", "Socks"] },
  ];

  // Logic to filter products based on search and category selection
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }
    if (selectedMainCat !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedMainCat);
    }
    if (selectedSubCat) {
      filtered = filtered.filter(p => 
        p.sport?.toLowerCase() === selectedSubCat.toLowerCase() || 
        p.subCategory?.toLowerCase() === selectedSubCat.toLowerCase()
      );
    }
    return filtered;
  }, [searchTerm, selectedMainCat, selectedSubCat]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleUploadDesign = () => {
    console.log("Upload design clicked");
    // Trigger file upload or open modal
    // You can implement your upload logic here
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-8">
      {/* SEARCH BAR - Fixed Visibility */}
      <div className="relative group">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="SEARCH PRODUCTS..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-white border border-slate-300 rounded-md px-4 py-2.5 text-[10px] font-black tracking-widest outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-black placeholder:text-slate-400 shadow-sm pr-10"
        />
        <Search size={14} className="absolute right-3 top-3 text-slate-400 group-focus-within:text-primary pointer-events-none" />
        
        {/* Clear search button */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-8 top-2.5 text-slate-400 hover:text-primary transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* CATEGORY ACCORDION */}
      <nav className="flex flex-col gap-2">
        {menuStructure.map((cat) => (
          <div key={cat.id} className="flex flex-col">
            <button
              onClick={() => {
                if (selectedMainCat === cat.id) {
                  setSelectedMainCat("all"); 
                  setSelectedSubCat("");
                } else {
                  setSelectedMainCat(cat.id);
                  setSelectedSubCat("");
                }
              }}
              className={`flex items-center justify-between p-3 transition-all duration-300 ${
                selectedMainCat === cat.id 
                  ? "bg-primary text-white rounded-lg shadow-lg shadow-primary/20" 
                  : "text-black hover:bg-gray-100 rounded-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest">
                  {cat.label}
                </span>
              </div>
              {cat.subs.length > 0 && (
                <ChevronDown 
                  size={12} 
                  className={`transition-transform duration-300 ${
                    selectedMainCat === cat.id ? "rotate-180" : ""
                  }`} 
                />
              )}
            </button>

            {/* Sub-categories */}
            {selectedMainCat === cat.id && cat.subs.length > 0 && (
              <div className="flex flex-col ml-4 mt-2 border-l-2 border-primary/20 gap-1 py-1 animate-in slide-in-from-left-2 duration-300">
                {cat.subs.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubCat(sub)}
                    className={`
                      text-left text-[10px] font-black tracking-widest uppercase px-4 py-2 transition-all duration-200
                      ${selectedSubCat === sub 
                        ? "text-primary scale-105" 
                        : "text-black/50 hover:text-black hover:pl-6" 
                      }
                    `}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="bg-white h-full w-full overflow-hidden text-foreground">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col py-2">
        
        {/* HEADER SECTION with Upload Button */}
        <header className="flex justify-between items-end shrink-0 mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl text-black font-semibold italic uppercase tracking-tighter">
              Performance <span className="text-primary">Collection</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
              Showing {filteredProducts.length} Premium Results
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Upload Design Button */}
            <button
              onClick={handleUploadDesign}
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 hover:cursor-pointer transition-opacity duration-300" />
              <Upload size={14} className="relative z-10" />
              <span className="relative z-10">Upload Design</span>
            </button>
            
            {/* Mobile Refine Button */}
            <button 
              onClick={() => setIsFilterOpen(true)} 
              className="lg:hidden flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase hover:bg-gray-800 transition-colors"
            >
              <SlidersHorizontal size={14} /> Refine
            </button>
          </div>
        </header>

        <div className="flex flex-1 gap-12 overflow-hidden">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-60 shrink-0 overflow-y-auto pr-4 custom-scrollbar">
            <SidebarContent />
          </aside>

          {/* PRODUCT GRID */}
          <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="bg-gray-50 rounded-full p-8 mb-4">
                  <Search size={48} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-sm text-gray-500 mb-4">
                  We couldn't find any products matching "{searchTerm}"
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedMainCat("all");
                    setSelectedSubCat("");
                  }}
                  className="text-primary text-sm font-bold uppercase tracking-wider hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* CUSTOM SCROLLBAR STYLING */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: var(--primary); 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: var(--secondary); 
        }
      `}</style>

      {/* MOBILE OVERLAY MENU */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setIsFilterOpen(false)} 
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-8 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10">
              <span className="text-xs font-black tracking-widest uppercase">Filter Gear</span>
              <X 
                onClick={() => setIsFilterOpen(false)} 
                className="cursor-pointer text-slate-900 hover:text-primary transition-colors" 
              />
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </div>
  );
}