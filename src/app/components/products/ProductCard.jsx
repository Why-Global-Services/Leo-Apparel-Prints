// // // "use client";

// // // import Link from "next/link";
// // // import { motion } from "framer-motion";
// // // import { ArrowRight, ShoppingBag, Palette } from "lucide-react";
// // // import { useState } from "react";

// // // export default function ProductCard({ product }) {
// // //   const [imageError, setImageError] = useState(false);
// // //   const [isHovered, setIsHovered] = useState(false);
// // //   const [isAddingToCart, setIsAddingToCart] = useState(false);
// // //   const [isCustomizing, setIsCustomizing] = useState(false);

// // //   const fallbackImage = "https://placehold.co/400x400/e2e8f0/1e293b?text=Product+Image";
// // //   const mainImageUrl = product.mainImage || fallbackImage;
// // //   const hoverImageUrl = product.hoverImage || mainImageUrl;

// // //   const handleAddToCart = (e) => {
// // //     e.preventDefault();
// // //     e.stopPropagation();
// // //     setIsAddingToCart(true);
// // //     setTimeout(() => setIsAddingToCart(false), 500);
// // //     console.log("Added to cart:", product.name);
// // //   };

// // //   const handleCustomizeNow = (e) => {
// // //     e.preventDefault();
// // //     e.stopPropagation();
// // //     setIsCustomizing(true);
// // //     setTimeout(() => setIsCustomizing(false), 500);
// // //     console.log("Customize product:", product.name);
// // //   };

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: 15 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       onMouseEnter={() => setIsHovered(true)}
// // //       onMouseLeave={() => setIsHovered(false)}
// // //       className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
// // //     >
// // //       <Link href={`/products/${product.id}`} className="flex flex-col h-full">

// // //         {/* --- IMAGE AREA - Reduced height for LG screens --- */}
// // //         <div className="relative h-48 xs:h-52 sm:h-56 md:h-60 lg:h-52 xl:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shrink-0">
// // //           {/* Category Badge */}
// // //           <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
// // //             <span className="bg-black/80 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-sm font-secondary">
// // //               {product.category}
// // //             </span>
// // //           </div>

// // //           {/* Product Image with Hover Effect */}
// // //           <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
// // //             {!imageError ? (
// // //               <>
// // //                 {/* Main Image */}
// // //                 <img
// // //                   src={mainImageUrl}
// // //                   alt={product.name}
// // //                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
// // //                     isHovered ? 'opacity-0' : 'opacity-100'
// // //                   }`}
// // //                   onError={() => setImageError(true)}
// // //                   loading="lazy"
// // //                 />

// // //                 {/* Hover Image */}
// // //                 <img
// // //                   src={hoverImageUrl}
// // //                   alt={`${product.name} - alternate view`}
// // //                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
// // //                     isHovered ? 'opacity-100' : 'opacity-0'
// // //                   }`}
// // //                   loading="lazy"
// // //                 />
// // //               </>
// // //             ) : (
// // //               <div className="w-full h-full flex items-center justify-center bg-gray-100">
// // //                 <ShoppingBag size={32} className="sm:w-10 sm:h-10 text-gray-300" />
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Hover Action Buttons */}
// // //           <div
// // //             className={`absolute bottom-0 left-0 right-0 p-2 sm:p-3 flex gap-2 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-all duration-300 ease-out z-20 ${
// // //               isHovered
// // //                 ? 'translate-y-0 opacity-100'
// // //                 : 'translate-y-full opacity-0'
// // //             }`}
// // //           >
// // //             {/* Add to Cart Button */}
// // //             <button
// // //               onClick={handleAddToCart}
// // //               disabled={isAddingToCart}
// // //               className="flex-1 bg-white text-black py-1.5 sm:py-2 lg:py-1.5 text-[8px] sm:text-[9px] lg:text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-primary"
// // //             >
// // //               {isAddingToCart ? (
// // //                 <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
// // //               ) : (
// // //                 <>
// // //                   <ShoppingBag size={12} className="hidden xs:block" />
// // //                   <span className="whitespace-nowrap">ADD TO CART</span>
// // //                 </>
// // //               )}
// // //             </button>

// // //             {/* Customize Button - Only if customizable */}
// // //             {product.customizable && product.customizable.length > 0 && (
// // //               <button
// // //                 onClick={handleCustomizeNow}
// // //                 disabled={isCustomizing}
// // //                 className="flex-1 bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] text-white py-1.5 sm:py-2 lg:py-1.5 text-[8px] sm:text-[9px] lg:text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-primary"
// // //               >
// // //                 {isCustomizing ? (
// // //                   <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // //                 ) : (
// // //                   <>
// // //                     <Palette size={12} className="hidden xs:block" />
// // //                     <span className="whitespace-nowrap">CUSTOMIZE</span>
// // //                   </>
// // //                 )}
// // //               </button>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* --- INFO AREA - Reduced padding for LG screens --- */}
// // //         <div className="p-3 sm:p-4 lg:p-3 flex flex-col flex-1 bg-white">
// // //           {/* Title and Price */}
// // //           <div className="flex justify-between items-start gap-2 mb-1 sm:mb-2">
// // //             <h3 className="text-xs sm:text-sm lg:text-xs font-black text-gray-900 leading-tight uppercase flex-1 group-hover:text-primary transition-colors line-clamp-2 font-primary">
// // //               {product.name}
// // //             </h3>
// // //             <span className="text-sm sm:text-base lg:text-sm font-black text-primary shrink-0">
// // //               ${product.price}
// // //             </span>
// // //           </div>

// // //           {/* Description - Fixed height for consistency */}
// // //           <div className="min-h-[28px] sm:min-h-[32px] lg:min-h-[24px] mb-2 sm:mb-3 lg:mb-2">
// // //             <p className="text-[10px] sm:text-[11px] lg:text-[10px] text-gray-500 leading-relaxed line-clamp-2 font-secondary">
// // //               {product.description || `${product.name} - Professional performance gear for athletes.`}
// // //             </p>
// // //           </div>

// // //           {/* Customization Options Preview */}
// // //           {product.customizable && product.customizable.length > 0 && (
// // //             <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 lg:mb-2">
// // //               {product.customizable.slice(0, 3).map((option, index) => (
// // //                 <span key={index} className="text-[7px] sm:text-[8px] lg:text-[7px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-medium font-secondary">
// // //                   {option}
// // //                 </span>
// // //               ))}
// // //               {product.customizable.length > 3 && (
// // //                 <span className="text-[7px] sm:text-[8px] lg:text-[7px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-medium font-secondary">
// // //                   +{product.customizable.length - 3}
// // //                 </span>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* Footer */}
// // //           <div className="mt-auto pt-2 sm:pt-3 lg:pt-2 border-t border-gray-100 flex justify-between items-center">
// // //             <span className="text-[8px] sm:text-[9px] lg:text-[8px] text-gray-400 font-bold tracking-widest uppercase font-secondary">
// // //               {product.sport || product.category}
// // //             </span>
// // //             <div className="flex items-center gap-1 text-[8px] sm:text-[9px] lg:text-[8px] font-black text-gray-400 uppercase tracking-tighter hover:text-primary transition-all group-hover:text-primary font-primary">
// // //               DETAILS
// // //               <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </Link>
// // //     </motion.div>
// // //   );
// // // }

// // "use client";

// // import Link from "next/link";
// // import { motion } from "framer-motion";
// // import { ArrowRight, ShoppingBag, Palette } from "lucide-react";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function ProductCard({ product }) {
// //   const router = useRouter();
// //   const [imageError, setImageError] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [isCustomizing, setIsCustomizing] = useState(false);

// //   const fallbackImage = "https://placehold.co/400x400/e2e8f0/1e293b?text=Product+Image";
// //   const mainImageUrl = product.mainImage || fallbackImage;
// //   const hoverImageUrl = product.hoverImage || mainImageUrl;

// //   const handleCustomizeNow = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setIsCustomizing(true);

// //     // Navigate to product page with customization query parameter
// //     setTimeout(() => {
// //       router.push(`/products/${product.id}?customize=true`);
// //     }, 200);
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 15 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //       className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
// //     >
// //       <Link href={`/products/${product.id}`} className="flex flex-col h-full">

// //         {/* --- IMAGE AREA --- */}
// //         <div className="relative h-48 xs:h-52 sm:h-56 md:h-60 lg:h-52 xl:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shrink-0">
// //           {/* Category Badge */}
// //           <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
// //             <span className="bg-black/80 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-sm font-secondary">
// //               {product.category}
// //             </span>
// //           </div>

// //           {/* Product Image with Hover Effect */}
// //           <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
// //             {!imageError ? (
// //               <>
// //                 {/* Main Image */}
// //                 <img
// //                   src={mainImageUrl}
// //                   alt={product.name}
// //                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
// //                     isHovered ? 'opacity-0' : 'opacity-100'
// //                   }`}
// //                   onError={() => setImageError(true)}
// //                   loading="lazy"
// //                 />

// //                 {/* Hover Image */}
// //                 <img
// //                   src={hoverImageUrl}
// //                   alt={`${product.name} - alternate view`}
// //                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
// //                     isHovered ? 'opacity-100' : 'opacity-0'
// //                   }`}
// //                   loading="lazy"
// //                 />
// //               </>
// //             ) : (
// //               <div className="w-full h-full flex items-center justify-center bg-gray-100">
// //                 <ShoppingBag size={32} className="sm:w-10 sm:h-10 text-gray-300" />
// //               </div>
// //             )}
// //           </div>

// //           {/* Customize Button - Always visible on mobile, visible on hover for desktop */}
// //           {product.customizable && product.customizable.length > 0 && (
// //             <div
// //               className={`absolute bottom-2 sm:bottom-3 left-0 right-0 flex justify-center px-2 sm:px-3 transition-all duration-300 ease-out z-20
// //                 ${isHovered ? 'sm:translate-y-0 sm:opacity-100' : 'sm:translate-y-full sm:opacity-0'}
// //                 translate-y-0 opacity-100
// //               `}
// //             >
// //               <button
// //                 onClick={handleCustomizeNow}
// //                 disabled={isCustomizing}
// //                 className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] text-white py-1.5 sm:py-2 lg:py-1.5 px-3 sm:px-4 text-[10px] sm:text-[9px] lg:text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-primary"
// //               >
// //                 {isCustomizing ? (
// //                   <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                 ) : (
// //                   <>
// //                     <Palette size={12} className="hidden xs:block" />
// //                     <span className="whitespace-nowrap">CUSTOMIZE NOW</span>
// //                   </>
// //                 )}
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* --- INFO AREA --- */}
// //         <div className="p-3 sm:p-4 lg:p-3 flex flex-col flex-1 bg-white">
// //           {/* Title and Price */}
// //           <div className="flex justify-between items-start gap-2 mb-1 sm:mb-2">
// //             <h3 className="text-xs sm:text-sm lg:text-xs font-black text-gray-900 leading-tight uppercase flex-1 group-hover:text-primary transition-colors line-clamp-2 font-primary">
// //               {product.name}
// //             </h3>
// //             <span className="text-sm sm:text-base lg:text-sm font-black text-primary shrink-0">
// //               ${product.price}
// //             </span>
// //           </div>

// //           {/* Description */}
// //           <div className="min-h-[28px] sm:min-h-[32px] lg:min-h-[24px] mb-2 sm:mb-3 lg:mb-2">
// //             <p className="text-[10px] sm:text-[11px] lg:text-[10px] text-gray-500 leading-relaxed line-clamp-2 font-secondary">
// //               {product.description || `${product.name} - Professional performance gear for athletes.`}
// //             </p>
// //           </div>

// //           {/* Customization Options Preview */}
// //           {product.customizable && product.customizable.length > 0 && (
// //             <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 lg:mb-2">
// //               {product.customizable.slice(0, 3).map((option, index) => (
// //                 <span key={index} className="text-[7px] sm:text-[8px] lg:text-[7px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-medium font-secondary">
// //                   {option}
// //                 </span>
// //               ))}
// //               {product.customizable.length > 3 && (
// //                 <span className="text-[7px] sm:text-[8px] lg:text-[7px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-medium font-secondary">
// //                   +{product.customizable.length - 3}
// //                 </span>
// //               )}
// //             </div>
// //           )}

// //           {/* Footer */}
// //           <div className="mt-auto pt-2 sm:pt-3 lg:pt-2 border-t border-gray-100 flex justify-between items-center">
// //             <span className="text-[8px] sm:text-[9px] lg:text-[8px] text-gray-400 font-bold tracking-widest uppercase font-secondary">
// //               {product.sport || product.category}
// //             </span>
// //             <div className="flex items-center gap-1 text-[8px] sm:text-[9px] lg:text-[8px] font-black text-gray-400 uppercase tracking-tighter hover:text-primary transition-all group-hover:text-primary font-primary">
// //               DETAILS
// //               <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
// //             </div>
// //           </div>
// //         </div>
// //       </Link>
// //     </motion.div>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight, ShoppingBag, Palette } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ProductCard({ product }) {
//   const router = useRouter();
//   const [imageError, setImageError] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isCustomizing, setIsCustomizing] = useState(false);

//   const fallbackImage = "https://placehold.co/400x400/e2e8f0/1e293b?text=Product+Image";
//   const mainImageUrl = product.mainImage || fallbackImage;
//   const hoverImageUrl = product.hoverImage || mainImageUrl;

//   const handleCustomizeNow = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsCustomizing(true);

//     // Navigate to product page with customization query parameter
//     setTimeout(() => {
//       router.push(`/products/${product.id}?customize=true`);
//     }, 200);
//   };

//   const handleViewDetails = (e) => {
//     // This is handled by the Link component
//     // Just prevent default if needed
//     if (e) e.stopPropagation();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
//     >
//       <Link href={`/products/${product.id}`} className="flex flex-col h-full">

//         {/* --- IMAGE AREA --- */}
//         <div className="relative h-48 xs:h-52 sm:h-56 md:h-60 lg:h-52 xl:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shrink-0">
//           {/* Category Badge */}
//           <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
//             <span className="bg-black/80 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-sm font-secondary">
//               {product.category}
//             </span>
//           </div>

//           {/* Product Image with Hover Effect */}
//           <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
//             {!imageError ? (
//               <>
//                 {/* Main Image */}
//                 <img
//                   src={mainImageUrl}
//                   alt={product.name}
//                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
//                     isHovered ? 'opacity-0' : 'opacity-100'
//                   }`}
//                   onError={() => setImageError(true)}
//                   loading="lazy"
//                 />

//                 {/* Hover Image */}
//                 <img
//                   src={hoverImageUrl}
//                   alt={`${product.name} - alternate view`}
//                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
//                     isHovered ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   loading="lazy"
//                 />
//               </>
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                 <ShoppingBag size={32} className="sm:w-10 sm:h-10 text-gray-300" />
//               </div>
//             )}
//           </div>

//           {/* Customize Button - Always visible on mobile, visible on hover for desktop */}
//           {product.customizable && product.customizable.length > 0 && (
//             <div
//               className={`absolute bottom-2 sm:bottom-3 left-0 right-0 flex justify-center px-2 sm:px-3 transition-all duration-300 ease-out z-20
//                 ${isHovered ? 'sm:translate-y-0 sm:opacity-100' : 'sm:translate-y-full sm:opacity-0'}
//                 translate-y-0 opacity-100
//               `}
//             >
//               <button
//                 onClick={handleCustomizeNow}
//                 disabled={isCustomizing}
//                 className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] text-white py-1.5 sm:py-2 lg:py-1.5 px-3 sm:px-4 text-[10px] sm:text-[9px] lg:text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-primary"
//               >
//                 {isCustomizing ? (
//                   <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <Palette size={12} className="hidden xs:block" />
//                     <span className="whitespace-nowrap">CUSTOMIZE NOW</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           )}
//         </div>

//         {/* --- INFO AREA --- */}
//         <div className="p-3 sm:p-4 lg:p-3 flex flex-col flex-1 bg-white">
//           {/* Title and Price */}
//           <div className="flex justify-between items-start gap-2 mb-1 sm:mb-2">
//             <h3 className="text-xs sm:text-sm lg:text-xs font-black text-gray-900 leading-tight uppercase flex-1 group-hover:text-primary transition-colors line-clamp-2 font-primary">
//               {product.name}
//             </h3>
//             <span className="text-sm sm:text-base lg:text-sm font-black text-primary shrink-0">
//               ${product.price}
//             </span>
//           </div>

//           {/* Description */}
//           <div className="min-h-[28px] sm:min-h-[32px] lg:min-h-[24px] mb-2 sm:mb-3 lg:mb-2">
//             <p className="text-[10px] sm:text-[11px] lg:text-[10px] text-gray-500 leading-relaxed line-clamp-2 font-secondary">
//               {product.description ? product.description.substring(0, 80) + '...' : `${product.name} - Professional performance gear for athletes.`}
//             </p>
//           </div>

//           {/* Customization Options Preview */}
//           {/* {product.customizable && product.customizable.length > 0 && (
//             <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 lg:mb-2">
//               {product.customizable.slice(0, 3).map((option, index) => (
//                 <span key={index} className="text-[7px] sm:text-[8px] lg:text-[7px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-medium font-secondary">
//                   {option}
//                 </span>
//               ))}
//               {product.customizable.length > 3 && (
//                 <span className="text-[7px] sm:text-[8px] lg:text-[7px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-medium font-secondary">
//                   +{product.customizable.length - 3}
//                 </span>
//               )}
//             </div>
//           )} */}

//           {/* Footer */}
//           <div className="mt-auto pt-2 sm:pt-3 lg:pt-2 border-t border-gray-100 flex justify-between items-center">
//             <span className="text-[8px] sm:text-[9px] lg:text-[8px] text-gray-400 font-bold tracking-widest uppercase font-secondary">
//               {product.sport || product.category}
//             </span>
//             <div className="flex items-center gap-1 text-[8px] sm:text-[9px] lg:text-[8px] font-black text-gray-400 uppercase tracking-tighter hover:text-primary transition-all group-hover:text-primary font-primary">
//               DETAILS
//               <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Palette } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const fallbackImage =
    "https://placehold.co/400x400/e2e8f0/1e293b?text=Product+Image";

  const mainImageUrl =
    product?.viewImages?.front || product?.images?.[0] || fallbackImage;

  const hoverImageUrl =
    product?.viewImages?.back || product?.images?.[1] || mainImageUrl;

  const productId = product._id || product.id;
  const productPrice = product.basePrice ?? product.price ?? 0;
  const productCategory = product.categoryName || product.category || "";
  const productSubCategory =
    product.subCategoryName || product.sport || productCategory;

  const isCustomizable =
    product.templates &&
    Array.isArray(product.templates) &&
    product.templates.length > 0;

  const handleCardClick = () => {
    router.push(`/product?id=${productId}`);
  };

  const handleCustomizeNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCustomizing(true);
    setTimeout(() => {
      router.push(`/product?id=${productId}`);
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full cursor-pointer"
    >
      {/* IMAGE AREA */}
      <div className="relative h-48 xs:h-52 sm:h-56 md:h-60 lg:h-52 xl:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        {/* Category Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
          <span className="bg-primary backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-sm">
            {product.sport}
          </span>
        </div>

        {product.discountValue > 0 && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <span className="bg-gradient-mid text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-[10px] font-black shadow-md">
              {product.discountType === "percentage"
                ? `${product.discountValue}% OFF`
                : `₹ ${product.discountValue} OFF`}
            </span>
          </div>
        )}

        {/* Image */}
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
          {!imageError ? (
            <img
              src={isHovered ? hoverImageUrl : mainImageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ShoppingBag
                size={32}
                className="sm:w-10 sm:h-10 text-gray-300"
              />
            </div>
          )}
        </div>

        {/* Customize Button */}
        {isCustomizable && (
          <div
            className={`absolute bottom-2 sm:bottom-3 left-0 right-0 flex justify-center px-2 sm:px-3 transition-all duration-300 ease-out z-20
            ${isHovered ? "sm:translate-y-0 sm:opacity-100" : "sm:translate-y-full sm:opacity-0"}
            translate-y-0 opacity-100`}
          >
            <button
              onClick={handleCustomizeNow}
              disabled={isCustomizing}
              className="bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1E3A8A] text-white py-1.5 sm:py-2 lg:py-1.5 px-3 sm:px-4 text-[10px] sm:text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50"
            >
              {isCustomizing ? (
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Palette size={12} className="hidden xs:block" />
                  <span className="whitespace-nowrap">CUSTOMIZE NOW</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* INFO AREA */}
      <div className="p-3 sm:p-4 lg:p-3 flex flex-col flex-1 bg-white">
        <div className="flex justify-between items-start gap-2 mb-1 sm:mb-2">
          <h3 className="text-xs sm:text-sm lg:text-xs font-black text-gray-900 leading-tight uppercase flex-1 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 justify-end">
            {product.discountValue > 0 ? (
              <>
                <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                  ₹{product.basePrice}
                </span>
                <span className="text-sm sm:text-base font-black text-primary">
                  ₹{product.finalPrice}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-base font-black text-primary">
                ₹{product.basePrice}
              </span>
            )}
          </div>
        </div>

        <div className="min-h-[24px] mb-2">
          <p className="text-[10px] sm:text-[11px] lg:text-[10px] text-gray-500 leading-relaxed line-clamp-2">
            {product.description
              ? product.description.substring(0, 80) + "..."
              : `${product.name} — Premium performance gear.`}
          </p>
        </div>

        <div className="mt-auto pt-2 sm:pt-3 lg:pt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="text-[8px] sm:text-[9px] lg:text-[8px] text-gray-400 font-bold tracking-widest uppercase">
            {productSubCategory}
          </span>
          <div className="flex items-center gap-1 text-[8px] sm:text-[9px] lg:text-[8px] font-black text-gray-400 uppercase tracking-tighter hover:text-primary transition-all group-hover:text-primary">
            {isCustomizable ? (
              <>
                CUSTOMIZE
                <Palette
                  size={10}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
              </>
            ) : (
              <>
                DETAILS
                <ArrowRight
                  size={10}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
