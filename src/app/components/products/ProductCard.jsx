// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight, ShoppingBag, Palette } from "lucide-react";
// import { useState } from "react";

// export default function ProductCard({ product }) {
//   const [imageError, setImageError] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isCustomizing, setIsCustomizing] = useState(false);

//   // Use a fallback image that definitely works
//   const fallbackImage = "https://placehold.co/400x400/e2e8f0/1e293b?text=Product+Image";
  
//   // Ensure we have a valid image URL
//   const mainImageUrl = product.mainImage || fallbackImage;
//   const hoverImageUrl = product.hoverImage || mainImageUrl;

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     setIsAddingToCart(true);
    
//     setTimeout(() => {
//       setIsAddingToCart(false);
//       console.log("Added to cart:", product.name);
//     }, 500);
//   };

//   const handleCustomizeNow = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     setIsCustomizing(true);
    
//     setTimeout(() => {
//       setIsCustomizing(false);
//       console.log("Customize product:", product.name);
//     }, 500);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col transition-all duration-300"
//     >
//       <div className="flex-1 flex flex-col">
//         <Link href={`/products/${product.id}`} className="block">
//           {/* Compact Image Area */}
//           <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//             <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest text-white shadow-sm z-10 uppercase">
//               {product.category}
//             </span>
            
//             {/* Product Image - Smooth transition on hover */}
//             <div className="relative w-full h-full">
//               {!imageError ? (
//                 <>
//                   {/* Main Image */}
//                   <img
//                     src={mainImageUrl}
//                     alt={product.name}
//                     className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
//                       isHovered ? 'opacity-0' : 'opacity-100'
//                     }`}
//                     onError={() => {
//                       console.error("Image failed to load:", mainImageUrl);
//                       setImageError(true);
//                     }}
//                     loading="lazy"
//                     crossOrigin="anonymous"
//                   />
                  
//                   {/* Hover Image */}
//                   <img
//                     src={hoverImageUrl}
//                     alt={`${product.name} - alternate view`}
//                     className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
//                       isHovered ? 'opacity-100' : 'opacity-0'
//                     }`}
//                     onError={() => {
//                       console.error("Hover image failed to load:", hoverImageUrl);
//                     }}
//                     loading="lazy"
//                     crossOrigin="anonymous"
//                   />
//                 </>
//               ) : (
//                 // Fallback when image fails to load
//                 <div className="w-full h-full flex items-center justify-center">
//                   <div className="w-24 h-32 bg-white shadow-sm rounded-lg flex items-center justify-center border border-gray-100">
//                     <span className="text-3xl font-black text-gray-100">
//                       #{parseInt(product.id?.replace(/\D/g, '') || '1') % 99}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Buttons - Smooth slide up on hover */}
//             <div 
//               className={`absolute bottom-0 left-0 right-0 p-3 flex gap-2 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 ease-out ${
//                 isHovered 
//                   ? 'translate-y-0 opacity-100' 
//                   : 'translate-y-full opacity-0'
//               }`}
//             >
//               {/* Add to Cart Button */}
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isAddingToCart}
//                 className="flex-1 bg-white text-black py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//               >
//                 {isAddingToCart ? (
//                   <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <ShoppingBag size={12} /> Add to Cart
//                   </>
//                 )}
//               </button>
              
//               {/* Customize Now Button - Only show if product is customizable */}
//               {product.customizable && product.customizable.length > 0 && (
//                 <button
//                   onClick={handleCustomizeNow}
//                   disabled={isCustomizing}
//                   className="flex-1 bg-primary text-white py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                 >
//                   {isCustomizing ? (
//                     <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <>
//                       <Palette size={12} /> Customize Now
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Info Area */}
//           <div className="p-4 flex flex-col gap-1.5 bg-white">
//             <div className="flex justify-between items-start">
//               <h3 className="text-sm font-bold text-gray-900 tracking-tight flex-1 line-clamp-2">
//                 {product.name}
//               </h3>
//               <span className="text-base font-black text-primary ml-2">${product.price}</span>
//             </div>
            
//             <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
//               {product.description || `${product.name} - Premium quality sports gear`}
//             </p>
            
//             {/* Customization options preview */}
//             {product.customizable && product.customizable.length > 0 && (
//               <div className="flex flex-wrap gap-1.5 mt-1">
//                 {product.customizable.slice(0, 3).map((option, index) => (
//                   <span key={index} className="text-[8px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wider font-medium">
//                     {option}
//                   </span>
//                 ))}
//                 {product.customizable.length > 3 && (
//                   <span className="text-[8px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wider font-medium">
//                     +{product.customizable.length - 3}
//                   </span>
//                 )}
//               </div>
//             )}
            
//             <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-100">
//               <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
//                 {product.sport || product.category}
//               </span>
//               <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter transition-all duration-200 group-hover:text-primary">
//                 Details <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
//               </div>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </motion.div>
//   );
// }



"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Palette } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const fallbackImage = "https://placehold.co/400x400/e2e8f0/1e293b?text=Product+Image";
  const mainImageUrl = product.mainImage || fallbackImage;
  const hoverImageUrl = product.hoverImage || mainImageUrl;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleCustomizeNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCustomizing(true);
    setTimeout(() => setIsCustomizing(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
    >
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        
        {/* --- IMAGE AREA --- */}
        <div className="relative h-64 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-black text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-sm">
              {product.category}
            </span>
          </div>

          <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
            {!imageError ? (
              <img
                src={isHovered ? hoverImageUrl : mainImageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                <ShoppingBag size={40} />
              </div>
            )}
          </div>

          {/* --- HOVER BUTTONS --- */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20"
          >
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-white text-black h-9 text-[9px] font-black uppercase tracking-widest rounded shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              {isAddingToCart ? (
                <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>ADD TO CART</>
              )}
            </button>
            
            {product.customizable && (
              <button
                onClick={handleCustomizeNow}
                disabled={isCustomizing}
                className="flex-1 bg-primary text-white h-9 text-[9px] font-black uppercase tracking-widest rounded shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {isCustomizing ? (
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>CUSTOMIZE</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* --- INFO AREA --- */}
        <div className="p-4 flex flex-col flex-1 bg-white">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-sm font-black text-gray-900 leading-tight uppercase flex-1 group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="text-base font-black text-primary shrink-0">${product.price}</span>
          </div>

          {/* Fixed height container for description to keep cards equal height */}
          <div className="min-h-[32px] mb-3">
             <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
              {product.description || `${product.name} - Professional performance gear for athletes.`}
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
            <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">
              {product.sport || product.category}
            </span>
            <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase tracking-tighter hover:text-primary transition-all">
              DETAILS <ArrowRight size={10} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}