


// "use client";

// import { useState, useMemo, useCallback } from "react";
// import ProductCard from "./ProductCard";
// import { products } from "@/data/products";
// import {
//   Search,
//   SlidersHorizontal,
//   X,
//   Target,
//   Activity,
//   ChevronDown,
//   Upload,
// } from "lucide-react";
// import Link from "next/link";

// const menuStructure = [
//   { id: "all", label: "All Gear", icon: <Activity size={15} />, subs: [] },
//   { id: "sports", label: "Sports", icon: <Target size={15} />, subs: ["Football", "Cricket", "Tennis", "Basketball"] },
//   { id: "clothes", label: "Clothes", icon: <Activity size={15} />, subs: ["Fabric"] },
// ];

// function SidebarContent({
//   searchTerm,
//   onSearchChange,
//   selectedCategories,
//   onCategoryChange,
//   selectedSubCategories,
//   onSubCategoryChange,
//   onApplyFilters,
// }) {
//   return (
//     <div className="flex flex-col gap-4">
//       {/* Search Input - Applied Directly */}
//       <div className="relative group">
//         <input
//           type="text"
//           placeholder="SEARCH PRODUCTS..."
//           value={searchTerm}
//           onChange={(e) => onSearchChange(e.target.value)}
//           autoComplete="off"
//           className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[10px] sm:text-[11px] font-black tracking-widest outline-none focus:border-[#003E9B] focus:ring-2 focus:ring-[#003E9B]/20 transition-all text-black placeholder:text-slate-400 shadow-sm pr-10 font-secondary"
//         />
//         <Search
//           size={13}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003E9B] pointer-events-none transition-colors"
//         />
//         {searchTerm && (
//           <button
//             onClick={() => onSearchChange("")}
//             className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003E9B] transition-colors"
//           >
//             <X size={13} />
//           </button>
//         )}
//       </div>

//       {/* Navigation with Checkboxes */}
//       <nav className="flex flex-col gap-1">
//         {menuStructure.map((cat) => (
//           <div key={cat.id} className="flex flex-col">
//             {/* Main Category Checkbox */}
//             <label className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#003E9B]/5 rounded-lg transition-colors">
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(cat.id)}
//                 onChange={(e) => onCategoryChange(cat.id, e.target.checked)}
//                 className="w-4 h-4 rounded border-slate-300 text-[#003E9B] focus:ring-[#003E9B]/20 focus:ring-2"
//               />
//               <span className="flex items-center gap-2 flex-1">
//                 <span className={`transition-colors flex-shrink-0 ${
//                   selectedCategories.includes(cat.id) ? "text-[#003E9B]" : "text-slate-400"
//                 }`}>
//                   {cat.icon}
//                 </span>
//                 <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${
//                   selectedCategories.includes(cat.id) ? "text-[#003E9B]" : "text-slate-700"
//                 }`}>
//                   {cat.label}
//                 </span>
//               </span>
//               {cat.subs.length > 0 && (
//                 <ChevronDown
//                   size={11}
//                   className={`transition-transform duration-300 flex-shrink-0 ${
//                     selectedCategories.includes(cat.id) ? "rotate-180" : ""
//                   } text-slate-400`}
//                 />
//               )}
//             </label>

//             {/* Subcategories with Checkboxes */}
//             {selectedCategories.includes(cat.id) && cat.subs.length > 0 && (
//               <div className="flex flex-col ml-8 mt-1 border-l-2 border-[#003E9B]/20 pl-3 gap-1">
//                 {cat.subs.map((sub) => (
//                   <label
//                     key={sub}
//                     className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[#003E9B]/5 rounded-md transition-colors"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedSubCategories.includes(sub)}
//                       onChange={(e) => onSubCategoryChange(sub, e.target.checked)}
//                       className="w-3.5 h-3.5 rounded border-slate-300 text-[#003E9B] focus:ring-[#003E9B]/20 focus:ring-2"
//                     />
//                     <span className={`text-[9px] sm:text-[10px] font-black tracking-widest uppercase ${
//                       selectedSubCategories.includes(sub) ? "text-[#003E9B]" : "text-slate-600"
//                     }`}>
//                       {sub}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>

//       {/* Search Button - Now applies category filters only */}
//       <button
//         onClick={onApplyFilters}
//         className="btn-gradient mt-2 w-full py-2.5 rounded-lg font-black text-[11px] tracking-widest uppercase flex items-center justify-center gap-2"
//       >
//         <Search size={14} />
//         Apply Category Filters
//       </button>

//       {/* Active Filters Display */}
//       {(selectedCategories.length > 0 || selectedSubCategories.length > 0 || searchTerm) && (
//         <div className="pt-3 border-t border-gray-100">
//           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-secondary">
//             Active Filters
//           </p>
//           <div className="flex flex-wrap gap-1.5">
//             {selectedCategories.map((cat) => (
//               <span
//                 key={cat}
//                 className="text-[8px] bg-[#003E9B]/10 text-[#003E9B] px-2.5 py-1 rounded-full font-secondary font-bold flex items-center gap-1"
//               >
//                 {menuStructure.find((c) => c.id === cat)?.label}
//                 <button
//                   onClick={() => onCategoryChange(cat, false)}
//                   className="hover:text-red-600 ml-1"
//                 >
//                   <X size={10} />
//                 </button>
//               </span>
//             ))}
//             {selectedSubCategories.map((sub) => (
//               <span
//                 key={sub}
//                 className="text-[8px] bg-[#003E9B]/10 text-[#003E9B] px-2.5 py-1 rounded-full font-secondary font-bold flex items-center gap-1"
//               >
//                 {sub}
//                 <button
//                   onClick={() => onSubCategoryChange(sub, false)}
//                   className="hover:text-red-600 ml-1"
//                 >
//                   <X size={10} />
//                 </button>
//               </span>
//             ))}
//             {searchTerm && (
//               <span className="text-[8px] bg-[#003E9B]/10 text-[#003E9B] px-2.5 py-1 rounded-full font-secondary font-bold flex items-center gap-1">
//                 "{searchTerm}"
//                 <button
//                   onClick={() => onSearchChange("")}
//                   className="hover:text-red-600 ml-1"
//                 >
//                   <X size={10} />
//                 </button>
//               </span>
//             )}
//             {(selectedCategories.length > 0 || selectedSubCategories.length > 0 || searchTerm) && (
//               <button
//                 onClick={() => {
//                   onSearchChange("");
//                   selectedCategories.forEach(cat => onCategoryChange(cat, false));
//                   selectedSubCategories.forEach(sub => onSubCategoryChange(sub, false));
//                 }}
//                 className="text-[8px] bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-secondary font-bold hover:bg-red-100 transition-colors"
//               >
//                 Clear all
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function ProductGrid() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedSubCategories, setSelectedSubCategories] = useState([]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
  
//   // State for applied category filters (after clicking Apply button)
//   const [appliedCategories, setAppliedCategories] = useState([]);
//   const [appliedSubCategories, setAppliedSubCategories] = useState([]);

//   const handleCategoryChange = useCallback((categoryId, isChecked) => {
//     if (isChecked) {
//       setSelectedCategories(prev => [...prev, categoryId]);
//     } else {
//       setSelectedCategories(prev => prev.filter(id => id !== categoryId));
//       // Also remove any subcategories under this category
//       const category = menuStructure.find(c => c.id === categoryId);
//       if (category) {
//         setSelectedSubCategories(prev => 
//           prev.filter(sub => !category.subs.includes(sub))
//         );
//       }
//     }
//   }, []);

//   const handleSubCategoryChange = useCallback((subCategory, isChecked) => {
//     if (isChecked) {
//       setSelectedSubCategories(prev => [...prev, subCategory]);
//       // Auto-select parent category if not already selected
//       const parentCategory = menuStructure.find(cat => cat.subs.includes(subCategory));
//       if (parentCategory && !selectedCategories.includes(parentCategory.id)) {
//         setSelectedCategories(prev => [...prev, parentCategory.id]);
//       }
//     } else {
//       setSelectedSubCategories(prev => prev.filter(sub => sub !== subCategory));
//     }
//   }, [selectedCategories]);

//   const handleApplyFilters = useCallback(() => {
//     setAppliedCategories([...selectedCategories]);
//     setAppliedSubCategories([...selectedSubCategories]);
//   }, [selectedCategories, selectedSubCategories]);

//   // Search is applied directly - no need for appliedSearchTerm
//   const filteredProducts = useMemo(() => {
//     let filtered = [...products];
    
//     // Apply search filter directly
//     if (searchTerm.trim()) {
//       filtered = filtered.filter((p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
//       );
//     }
    
//     // Apply category filters
//     if (appliedCategories.length > 0 && !appliedCategories.includes("all")) {
//       filtered = filtered.filter((p) =>
//         appliedCategories.includes(p.category?.toLowerCase())
//       );
//     }
    
//     // Apply subcategory filters
//     if (appliedSubCategories.length > 0) {
//       filtered = filtered.filter((p) =>
//         appliedSubCategories.some(sub => 
//           p.subCategory?.toLowerCase() === sub.toLowerCase()
//         )
//       );
//     }
    
//     return filtered;
//   }, [searchTerm, appliedCategories, appliedSubCategories]);

//   const sidebarProps = {
//     searchTerm,
//     onSearchChange: setSearchTerm,
//     selectedCategories,
//     onCategoryChange: handleCategoryChange,
//     selectedSubCategories,
//     onSubCategoryChange: handleSubCategoryChange,
//     onApplyFilters: handleApplyFilters,
//   };

//   return (
//     <div className="bg-white h-full w-full overflow-hidden flex flex-col">

//       {/* DESKTOP HEADER */}
//       <div className="hidden sm:block sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
//           <div className="flex items-center justify-between gap-4">
//             <div>
//               <h1 className="text-xl sm:text-2xl lg:text-3xl text-black font-bold italic uppercase tracking-tighter font-primary">
//                 Performance{" "}
//                 <span className="text-primary">Collection</span>
//               </h1>
//               <p className="text-[8px] sm:text-[9px] font-black text-primary-blue uppercase tracking-[0.2em] mt-1 font-secondary">
//                 Showing {filteredProducts.length} Premium Results
//               </p>
//             </div>
//             <Link href="/bulk-enquiry">
//             <button className="btn-gradient btn-sm inline-flex whitespace-nowrap rounded-md">
//               <Upload size={14} />
//               Upload Design
//             </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE HEADER - Transparent background, only gradient buttons */}
//       <div className="sm:hidden sticky top-0 z-20 bg-transparent">
//         <div className="px-4 pt-5 flex items-center justify-between gap-3">
          
//           {/* Upload Design Button - Gradient background, no white bg */}
//           <Link href="/bulk-enquiry">
//           <button className="flex-1 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider py-3 rounded-xl btn-gradient">
//             <Upload size={16} />
//             <span>Upload Design</span>
//           </button>
//           </Link>

//           {/* Filter Button - Gradient background, no white bg */}
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider btn-gradient"
//           >
//             <SlidersHorizontal size={16} />
//             <span>Filter</span>
//           </button>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 overflow-hidden">
//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
//           <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 h-full py-4 sm:py-6">

//             {/* DESKTOP SIDEBAR */}
//             <aside
//               className="hidden lg:flex lg:flex-col w-52 xl:w-60 shrink-0 pr-2"
//               style={{ maxHeight: "calc(100vh - 90px)", position: "sticky", top: "90px" }}
//             >
//               <div className="flex-1 overflow-y-auto sidebar-scroll min-h-0">
//                 <SidebarContent {...sidebarProps} />
//               </div>
//             </aside>

//             {/* PRODUCT GRID */}
//             <main className="flex-1 overflow-y-auto main-scroll pb-10">
//               {filteredProducts.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center min-h-[400px] text-center py-10">
//                   <div className="bg-gray-50 rounded-full p-8 mb-4">
//                     <Search size={40} className="text-gray-300" />
//                   </div>
//                   <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-primary">
//                     No products found
//                   </h3>
//                   <p className="text-xs sm:text-sm text-gray-500 mb-4 font-secondary max-w-md">
//                     {searchTerm && `We couldn't find any products matching "${searchTerm}"`}
//                     {!searchTerm && appliedCategories.length > 0 && `No products found in selected categories`}
//                     {!searchTerm && appliedCategories.length === 0 && appliedSubCategories.length > 0 && `No products found in selected subcategories`}
//                   </p>
//                   <button
//                     onClick={() => {
//                       setSearchTerm("");
//                       setSelectedCategories([]);
//                       setSelectedSubCategories([]);
//                       setAppliedCategories([]);
//                       setAppliedSubCategories([]);
//                     }}
//                     className="text-[#003E9B] text-xs sm:text-sm font-bold uppercase tracking-wider hover:underline font-secondary"
//                   >
//                     Clear all filters
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
//                   {filteredProducts.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               )}
//             </main>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         /* SCROLLBARS */
//         .sidebar-scroll::-webkit-scrollbar { width: 3px; }
//         .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
//         .sidebar-scroll::-webkit-scrollbar-thumb {
//           background: linear-gradient(
//             180deg,
//             var(--gradient-start),
//             var(--gradient-mid),
//             var(--gradient-end)
//           );
//           border-radius: 99px;
//         }
//         .sidebar-scroll {
//           scrollbar-width: thin;
//           scrollbar-color: var(--gradient-mid) transparent;
//         }

//         .main-scroll::-webkit-scrollbar { width: 5px; }
//         .main-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
//         .main-scroll::-webkit-scrollbar-thumb {
//           background: linear-gradient(
//             180deg,
//             var(--gradient-start),
//             var(--gradient-mid),
//             var(--gradient-end)
//           );
//           border-radius: 10px;
//         }
//         .main-scroll::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(
//             180deg,
//             var(--gradient-end),
//             var(--gradient-mid),
//             var(--gradient-start)
//           );
//         }
//         .main-scroll { scrollbar-width: thin; scrollbar-color: var(--gradient-mid) #f1f5f9; }

//         @media (min-width: 640px) {
//           .main-scroll::-webkit-scrollbar { width: 6px; }
//         }

//         /* Gradient Button Styles - Ensure no white background */
//         .btn-gradient {
//           background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
//           color: white;
//           border: none;
//           transition: all 0.3s ease;
//         }
//         .btn-gradient:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(0,62,155,0.3);
//         }
//         .btn-gradient:active {
//           transform: scale(0.98);
//         }
        
//         /* Override any potential white background */
//         .bg-transparent {
//           background-color: transparent !important;
//         }
//       `}</style>

//       {/* MOBILE FILTER DRAWER */}
//       {isFilterOpen && (
//         <div className="fixed inset-0 z-[100] lg:hidden">
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//             onClick={() => setIsFilterOpen(false)}
//           />
//           <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[82vw] bg-white shadow-2xl flex flex-col">
//             <div
//               className="px-5 py-4 flex justify-between items-center flex-shrink-0 bg-gradient-blue"
//             >
//               <span className="text-xs font-black tracking-widest uppercase font-primary text-white">
//                 Filter Gear
//               </span>
//               <button
//                 onClick={() => setIsFilterOpen(false)}
//                 className="text-white/80 hover:text-white transition-colors p-0.5"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 sidebar-scroll min-h-0">
//               <SidebarContent {...sidebarProps} />
//             </div>

//             <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex-shrink-0">
//               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center font-secondary">
//                 {filteredProducts.length} Premium Results
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, fetchFilterOptions } from "@/features/products/productThunks";
import ProductCard from "./ProductCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  Target,
  Activity,
  ChevronDown,
  Upload,
  Palette,
} from "lucide-react";
import Link from "next/link";


function SidebarContent({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoryChange,
  selectedSubCategories,
  onSubCategoryChange,
  onApplyFilters,
  onClearAll,
  onRemoveSubCategory,
  onRemoveCategory,
  menuStructure,
}) {
  const isSubSelected = (sub) => {
    const subClean = sub.trim().toLowerCase();
    const subNorm = subClean.replace(/[-\s]/g, "").replace(/tshirts?$/i, "");
    return selectedSubCategories.some((s) => {
      const sClean = s.trim().toLowerCase();
      if (sClean === subClean) return true;
      const sNorm = sClean.replace(/[-\s]/g, "").replace(/tshirts?$/i, "");
      return sNorm === subNorm;
    });
  };

  const hasActiveFilters =
    selectedSubCategories.length > 0 ||
    selectedCategories.includes("all") ||
    searchTerm.trim().length > 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative group">
        <input
          type="text"
          placeholder="SEARCH PRODUCTS..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[10px] sm:text-[11px] font-black tracking-widest outline-none focus:border-[#003E9B] focus:ring-2 focus:ring-[#003E9B]/20 transition-all text-black placeholder:text-slate-400 shadow-sm pr-10 font-secondary"
        />
        <Search
          size={13}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003E9B] pointer-events-none transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003E9B] transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {menuStructure.map((cat) => {
          const isCatChecked = selectedCategories.includes(cat.id);
          const hasSelectedSub = cat.subs.some((sub) => isSubSelected(sub));

          return (
            <div key={cat.id} className="flex flex-col">
              <label className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#003E9B]/5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={isCatChecked || hasSelectedSub}
                  onChange={(e) => onCategoryChange(cat.id, e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#003E9B] focus:ring-[#003E9B]/20 focus:ring-2"
                />
                <span className="flex items-center gap-2 flex-1">
                  <span
                    className={`transition-colors flex-shrink-0 ${
                      isCatChecked || hasSelectedSub
                        ? "text-[#003E9B]"
                        : "text-slate-400"
                    }`}
                  >
                    {cat.icon}
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${
                      isCatChecked || hasSelectedSub
                        ? "text-[#003E9B]"
                        : "text-slate-700"
                    }`}
                  >
                    {cat.label}
                  </span>
                </span>
                {cat.subs.length > 0 && (
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-300 flex-shrink-0 ${
                      isCatChecked || hasSelectedSub ? "rotate-180" : ""
                    } text-slate-400`}
                  />
                )}
              </label>

              {(isCatChecked || hasSelectedSub) && cat.subs.length > 0 && (
                <div className="flex flex-col ml-8 mt-1 border-l-2 border-[#003E9B]/20 pl-3 gap-1">
                  {cat.subs.map((sub) => {
                    const checked = isSubSelected(sub);
                    return (
                      <label
                        key={sub}
                        className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[#003E9B]/5 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) =>
                            onSubCategoryChange(sub, e.target.checked)
                          }
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#003E9B] focus:ring-[#003E9B]/20 focus:ring-2"
                        />
                        <span
                          className={`text-[9px] sm:text-[10px] font-black tracking-widest uppercase ${
                            checked ? "text-[#003E9B]" : "text-slate-600"
                          }`}
                        >
                          {sub}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Apply Button */}
      <button
        onClick={onApplyFilters}
        className="btn-gradient mt-2 w-full py-2.5 rounded-lg font-black text-[11px] tracking-widest uppercase flex items-center justify-center gap-2"
      >
        <Search size={14} />
        Apply Category Filters
      </button>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-secondary">
            Active Filters
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selectedCategories.includes("all") && (
              <span className="text-[8px] bg-[#003E9B]/10 text-[#003E9B] px-2.5 py-1 rounded-full font-secondary font-bold flex items-center gap-1">
                All Gear
                <button
                  onClick={() => onRemoveCategory("all")}
                  className="hover:text-red-600 ml-1"
                >
                  <X size={10} />
                </button>
              </span>
            )}
            {selectedSubCategories.map((sub) => (
              <span
                key={sub}
                className="text-[8px] bg-[#003E9B]/10 text-[#003E9B] px-2.5 py-1 rounded-full font-secondary font-bold flex items-center gap-1"
              >
                {sub}
                <button
                  onClick={() => onRemoveSubCategory(sub)}
                  className="hover:text-red-600 ml-1"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
            {searchTerm && (
              <span className="text-[8px] bg-[#003E9B]/10 text-[#003E9B] px-2.5 py-1 rounded-full font-secondary font-bold flex items-center gap-1">
                "{searchTerm}"
                <button
                  onClick={() => onSearchChange("")}
                  className="hover:text-red-600 ml-1"
                >
                  <X size={10} />
                </button>
              </span>
            )}
            <button
              onClick={onClearAll}
              className="text-[8px] bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-secondary font-bold hover:bg-red-100 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductGrid() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const isUploadDesign =
    searchParams.get("cottonTeeType")?.toUpperCase() === "UPLOAD_DESIGN";

  // ── Redux state ──
  const {
    items: allProducts,
    loading,
    error,
    filterOptions,
  } = useSelector((state) => state.products);

  // ── Local UI state ──
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const menuStructure = useMemo(
    () => [
      {
        id: "all",
        label: "All Gear",
        icon: <Activity size={15} />,
        subs: [],
      },
      {
        id: "sports",
        label: "Sports",
        icon: <Target size={15} />,
        subs: filterOptions?.sports || [],
      },
      {
        id: "apparels",
        label: "Apparels",
        icon: <Activity size={15} />,
        subs: filterOptions?.apparels || [],
      },
    ],
    [filterOptions]
  );

  // Set mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch filter options on mount
  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

  // Sync state with searchParams (runs on initial load and whenever URL changes)
  useEffect(() => {
    if (!mounted) return;

    const urlSport = searchParams.get("sport");
    const urlApparel = searchParams.get("apparel");

    const sports = urlSport
      ? urlSport.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const apparels = urlApparel
      ? urlApparel.split(",").map((a) => a.trim()).filter(Boolean)
      : [];

    const resolvedApparels = apparels.map((a) => {
      const match = filterOptions?.apparels?.find((fa) => {
        const cleanFA = fa.trim().toLowerCase().replace(/[-\s]/g, "").replace(/tshirts?$/i, "");
        const cleanReq = a.trim().toLowerCase().replace(/[-\s]/g, "").replace(/tshirts?$/i, "");
        return cleanFA === cleanReq;
      });
      return match || a;
    });

    const initialSubs = [...sports, ...resolvedApparels];
    const initialCats = [];
    if (sports.length > 0) initialCats.push("sports");
    if (resolvedApparels.length > 0) initialCats.push("apparels");

    setSelectedSubCategories(initialSubs);
    setSelectedCategories(initialCats);
  }, [searchParams, mounted, filterOptions]);

  // Fetch products whenever searchParams change
  useEffect(() => {
    if (!mounted) return;

    const segment = searchParams.get("segment");
    const sport = searchParams.get("sport");
    const apparel = searchParams.get("apparel");
    const customizationType = searchParams.get("customizationType");
    const cottonTeeType = searchParams.get("cottonTeeType");

    // Resolve apparel against available filter options if exact phrasing differs
    let resolvedApparel = apparel;
    if (apparel && filterOptions?.apparels?.length > 0) {
      const match = filterOptions.apparels.find((a) => {
        const cleanA = a.trim().toLowerCase().replace(/[-\s]/g, "").replace(/tshirts?$/i, "");
        const cleanReq = apparel.trim().toLowerCase().replace(/[-\s]/g, "").replace(/tshirts?$/i, "");
        return cleanA === cleanReq;
      });
      if (match) resolvedApparel = match;
    }

    dispatch(
      fetchAllProducts({
        segment: segment || undefined,
        sport: sport || undefined,
        apparel: resolvedApparel || undefined,
        customizationType: customizationType || undefined,
        cottonTeeType: cottonTeeType || undefined,
      })
    );
  }, [dispatch, mounted, searchParams, filterOptions]);

  // Helper to push updated filters to URL
  const updateUrlFilters = useCallback(
    (newSubCategories) => {
      const sportsCategory = menuStructure.find((c) => c.id === "sports");
      const apparelsCategory = menuStructure.find((c) => c.id === "apparels");

      const selectedSports = [];
      const selectedApparels = [];

      newSubCategories.forEach((sub) => {
        const isSport = (sportsCategory?.subs || filterOptions?.sports || []).some(
          (s) => s.trim().toLowerCase() === sub.trim().toLowerCase()
        );
        const isApparel = (apparelsCategory?.subs || filterOptions?.apparels || []).some(
          (a) => a.trim().toLowerCase() === sub.trim().toLowerCase()
        );

        if (isSport) {
          selectedSports.push(sub);
        } else if (isApparel) {
          selectedApparels.push(sub);
        } else {
          const currentUrlSports = (searchParams.get("sport") || "")
            .split(",")
            .map((s) => s.trim().toLowerCase());
          if (currentUrlSports.includes(sub.trim().toLowerCase())) {
            selectedSports.push(sub);
          } else {
            selectedApparels.push(sub);
          }
        }
      });

      const params = new URLSearchParams();
      const segment = searchParams.get("segment");
      const customizationType = searchParams.get("customizationType");
      const cottonTeeType = searchParams.get("cottonTeeType");

      if (segment) params.set("segment", segment);
      if (customizationType) params.set("customizationType", customizationType);
      if (cottonTeeType) params.set("cottonTeeType", cottonTeeType);

      if (selectedSports.length > 0) {
        params.set("sport", selectedSports.join(","));
      }
      if (selectedApparels.length > 0) {
        params.set("apparel", selectedApparels.join(","));
      }

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [menuStructure, filterOptions, searchParams, router, pathname]
  );

  const handleCategoryChange = useCallback(
    (categoryId, isChecked) => {
      if (categoryId === "all") {
        if (isChecked) {
          setSelectedCategories(["all"]);
          setSelectedSubCategories([]);
        } else {
          setSelectedCategories((prev) => prev.filter((id) => id !== "all"));
        }
        return;
      }

      setSelectedCategories((prev) => prev.filter((id) => id !== "all"));

      if (isChecked) {
        setSelectedCategories((prev) => [...prev, categoryId]);
      } else {
        setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
        const category = menuStructure.find((c) => c.id === categoryId);
        if (category) {
          setSelectedSubCategories((prev) =>
            prev.filter(
              (sub) =>
                !category.subs.some(
                  (s) => s.trim().toLowerCase() === sub.trim().toLowerCase()
                )
            )
          );
        }
      }
    },
    [menuStructure]
  );

  const handleSubCategoryChange = useCallback(
    (subCategory, isChecked) => {
      setSelectedCategories((prev) => prev.filter((id) => id !== "all"));

      if (isChecked) {
        setSelectedSubCategories((prev) => [...prev, subCategory]);
        const parentCategory = menuStructure.find((cat) =>
          cat.subs.some(
            (s) => s.trim().toLowerCase() === subCategory.trim().toLowerCase()
          )
        );
        if (parentCategory && !selectedCategories.includes(parentCategory.id)) {
          setSelectedCategories((prev) => [...prev, parentCategory.id]);
        }
      } else {
        setSelectedSubCategories((prev) =>
          prev.filter(
            (sub) =>
              sub.trim().toLowerCase() !== subCategory.trim().toLowerCase()
          )
        );
      }
    },
    [menuStructure, selectedCategories]
  );

  const handleApplyFilters = useCallback(() => {
    if (selectedCategories.includes("all")) {
      handleClearAll();
      setIsFilterOpen(false);
      return;
    }
    updateUrlFilters(selectedSubCategories);
    setIsFilterOpen(false);
  }, [selectedCategories, selectedSubCategories, updateUrlFilters]);

  const handleRemoveSubCategory = useCallback(
    (subToRemove) => {
      const nextSubs = selectedSubCategories.filter(
        (s) => s.trim().toLowerCase() !== subToRemove.trim().toLowerCase()
      );
      setSelectedSubCategories(nextSubs);

      const parentCat = menuStructure.find((cat) =>
        cat.subs.some(
          (s) => s.trim().toLowerCase() === subToRemove.trim().toLowerCase()
        )
      );
      if (parentCat) {
        const hasOtherSubs = nextSubs.some((s) =>
          parentCat.subs.some(
            (ps) => ps.trim().toLowerCase() === s.trim().toLowerCase()
          )
        );
        if (!hasOtherSubs) {
          setSelectedCategories((prev) =>
            prev.filter((c) => c !== parentCat.id)
          );
        }
      }

      updateUrlFilters(nextSubs);
    },
    [selectedSubCategories, menuStructure, updateUrlFilters]
  );

  const handleRemoveCategory = useCallback(
    (catId) => {
      if (catId === "all") {
        setSelectedCategories((prev) => prev.filter((id) => id !== "all"));
        return;
      }
      setSelectedCategories((prev) => prev.filter((id) => id !== catId));
      const category = menuStructure.find((c) => c.id === catId);
      if (category) {
        const nextSubs = selectedSubCategories.filter(
          (sub) =>
            !category.subs.some(
              (s) => s.trim().toLowerCase() === sub.trim().toLowerCase()
            )
        );
        setSelectedSubCategories(nextSubs);
        updateUrlFilters(nextSubs);
      }
    },
    [menuStructure, selectedSubCategories, updateUrlFilters]
  );

  const handleClearAll = useCallback(() => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setIsFilterOpen(false);
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  // ── Filter logic ──
  const filteredProducts = useMemo(() => {
    if (!mounted) return [];
    let filtered = allProducts.filter((p) => p.isActive !== false);
    const customizationType = searchParams.get("customizationType");
    const cottonTeeType = searchParams.get("cottonTeeType");
    const apparelParam = searchParams.get("apparel");
    const sportParam = searchParams.get("sport");

    const matchesValue = (value, expected) =>
      String(value || "").trim().toLowerCase() === String(expected || "").trim().toLowerCase();

    if (customizationType) {
      filtered = filtered.filter((product) =>
        matchesValue(product.customizationType, customizationType)
      );
    }

    if (cottonTeeType) {
      filtered = filtered.filter((product) =>
        matchesValue(product.cottonTeeType, cottonTeeType)
      );
    }

    if (apparelParam) {
      const requestedApparels = apparelParam
        .split(",")
        .map((apparel) => apparel.trim().toLowerCase())
        .filter(Boolean);

      filtered = filtered.filter((product) => {
        const prodApparel = String(product.apparel || "").trim().toLowerCase();
        return requestedApparels.some((req) => {
          if (prodApparel === req) return true;
          const cleanReq = req.replace(/[-\s]/g, "").replace(/tshirts?$/i, "");
          const cleanProd = prodApparel.replace(/[-\s]/g, "").replace(/tshirts?$/i, "");
          return cleanReq === cleanProd;
        });
      });
    }

    if (sportParam) {
      const requestedSports = sportParam
        .split(",")
        .map((sport) => sport.trim().toLowerCase())
        .filter(Boolean);

      filtered = filtered.filter((product) =>
        requestedSports.includes(String(product.sport || "").trim().toLowerCase())
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    return filtered;
  }, [allProducts, searchTerm, mounted, searchParams]);

  const sidebarProps = {
    searchTerm,
    onSearchChange: setSearchTerm,
    selectedCategories,
    onCategoryChange: handleCategoryChange,
    selectedSubCategories,
    onSubCategoryChange: handleSubCategoryChange,
    onApplyFilters: handleApplyFilters,
    onClearAll: handleClearAll,
    onRemoveSubCategory: handleRemoveSubCategory,
    onRemoveCategory: handleRemoveCategory,
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // ── Loading skeleton ──
  if (loading && allProducts.length === 0) {
    return (
      <div className="bg-white h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#003E9B] border-t-transparent rounded-full animate-spin" />
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error && !loading) {
    return (
      <div className="bg-white h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <p className="text-sm font-bold text-red-500">{error}</p>
          <button
            onClick={() => dispatch(fetchAllProducts())}
            className="btn-gradient px-6 py-2.5 rounded-lg text-[11px] font-black tracking-widest uppercase"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full flex flex-col">
      {/* DESKTOP HEADER */}
      <div
        className="hidden sm:block sticky z-20 bg-white border-b border-gray-100 shadow-sm"
        style={{ top: "var(--navbar-height, 80px)" }}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-black font-bold italic uppercase tracking-tighter font-primary">
                Performance{" "}
                <span className="text-primary">Collection</span>
              </h1>
              <p className="text-[8px] sm:text-[9px] font-black text-primary-blue uppercase tracking-[0.2em] mt-1 font-secondary">
                Showing {filteredProducts.length} Premium Results
              </p>
            </div>
            {isUploadDesign ? (
              <Link href="/products">
                <button className="btn-gradient btn-sm inline-flex items-center gap-2 whitespace-nowrap rounded-md">
                  <Palette size={14} />
                  Customize Now
                </button>
              </Link>
            ) : (
              <Link href="/products?customizationType=CUSTOM_COTTON_TEES&cottonTeeType=UPLOAD_DESIGN">
                <button className="btn-gradient btn-sm inline-flex items-center gap-2 whitespace-nowrap rounded-md">
                  <Upload size={14} />
                  Upload Design
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div
        className="sm:hidden sticky z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-3 transition-all duration-200"
        style={{ top: "var(--navbar-height, 64px)" }}
      >
        <div className="px-4 flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={() =>
              router.push(
                isUploadDesign
                  ? "/products"
                  : "/products?customizationType=CUSTOM_COTTON_TEES&cottonTeeType=UPLOAD_DESIGN"
              )
            }
            className="flex-1 h-11 min-h-[44px] max-h-11 box-border border-0 m-0 p-0 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider rounded-xl btn-gradient shadow-sm leading-none select-none cursor-pointer"
          >
            {isUploadDesign ? (
              <>
                <Palette size={16} className="shrink-0" />
                <span className="leading-none whitespace-nowrap">Customize Now</span>
              </>
            ) : (
              <>
                <Upload size={16} className="shrink-0" />
                <span className="leading-none whitespace-nowrap">Upload Design</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex-1 h-11 min-h-[44px] max-h-11 box-border border-0 m-0 p-0 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider rounded-xl btn-gradient shadow-sm leading-none select-none cursor-pointer"
          >
            <SlidersHorizontal size={16} className="shrink-0" />
            <span className="leading-none whitespace-nowrap">Filter</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 h-full py-4 sm:py-6">
            {/* DESKTOP SIDEBAR */}
            <aside
              className="hidden lg:flex lg:flex-col w-52 xl:w-60 shrink-0 pr-2"
              style={{
                maxHeight: "calc(100vh - 90px)",
                position: "sticky",
                top: "90px",
              }}
            >
              <div className="flex-1 overflow-y-auto sidebar-scroll min-h-0">
                <SidebarContent
                menuStructure={menuStructure}
                 {...sidebarProps} />
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <main className="flex-1 overflow-y-auto main-scroll pb-10">
              {filteredProducts.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center py-10">
                  <div className="bg-gray-50 rounded-full p-8 mb-4">
                    <Search size={40} className="text-gray-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-primary">
                    No products found
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 font-secondary max-w-md">
                    {searchTerm &&
                      `We couldn't find any products matching "${searchTerm}"`}
                    {!searchTerm &&
                      (selectedSubCategories.length > 0 || searchParams.toString().length > 0) &&
                      `No products found in selected categories`}
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="text-[#003E9B] text-xs sm:text-sm font-bold uppercase tracking-wider hover:underline font-secondary"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
          border-radius: 99px;
        }
        .sidebar-scroll { scrollbar-width: thin; scrollbar-color: var(--gradient-mid) transparent; }
        .main-scroll::-webkit-scrollbar { width: 5px; }
        .main-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .main-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
          border-radius: 10px;
        }
        .main-scroll { scrollbar-width: thin; scrollbar-color: var(--gradient-mid) #f1f5f9; }
        @media (min-width: 640px) { .main-scroll::-webkit-scrollbar { width: 6px; } }
        .btn-gradient {
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
          color: white;
          border: none;
          transition: all 0.3s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,62,155,0.3);
          }
        }
        .btn-gradient:active { transform: scale(0.98); }
      `}</style>

      {/* MOBILE FILTER DRAWER */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[82vw] bg-white shadow-2xl flex flex-col">
            <div
              className="px-5 py-4 flex justify-between items-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
              }}
            >
              <span className="text-xs font-black tracking-widest uppercase font-primary text-white">
                Filter Gear
              </span>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-0.5"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sidebar-scroll min-h-0">
              <SidebarContent 
              menuStructure={menuStructure}
              {...sidebarProps} />
            </div>
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center font-secondary">
                {filteredProducts.length} Premium Results
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}