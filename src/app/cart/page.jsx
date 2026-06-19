// // "use client";

// // import { useSelector, useDispatch } from "react-redux";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { motion } from "framer-motion";
// // import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";
// // import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";

// // export default function CartPage() {
// //   const dispatch = useDispatch();
// //   const router = useRouter();
// //   const { user } = useSelector((state) => state.auth);
// //   const cartItems = useSelector((state) => state.cart?.items || []);

// //   const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
// //   const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// //   const handleUpdateQuantity = (id, newQuantity) => {
// //     console.log("update quantity",id,newQuantity)
// //     if (newQuantity < 1) {
// //       dispatch(removeFromCart(id));
// //     } else {
// //       dispatch(updateQuantity({ id, quantity: newQuantity }));
// //     }
// //   };

// //   const removeItem = (id) => {
// //     dispatch(removeFromCart(id));
// //   };

// //   const handleGoBack = () => {
// //     router.back();
// //   };

// //   const handleCustomize = (productId, productName) => {
// //     // Clean the product ID - remove any timestamp suffix
// //     let cleanProductId = productId;

// //     // Check if ID has a timestamp (contains hyphen after the pattern PROD-XXXX)
// //     const timestampPattern = /^(PROD-\d+)-/;
// //     if (timestampPattern.test(productId)) {
// //       cleanProductId = productId.match(timestampPattern)[1];
// //     }

// //     console.log("Original ID:", productId);
// //     console.log("Clean ID:", cleanProductId);

// //     if (!cleanProductId) {
// //       console.error("No product ID found");
// //       router.push('/products');
// //       return;
// //     }

// //     // Navigate to product page with clean ID
// //     router.push(`/products/${cleanProductId}`);
// //   };

// //   const handleCheckout = () => {
// //     if (!user) {
// //       // Redirect to login page with return URL
// //       router.push('/auth/login?redirect=/cart');
// //       return;
// //     }
// //     // Proceed to checkout
// //     router.push('/checkout');
// //   };

// //   if (!user) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 py-12">
// //         <div className="max-w-4xl mx-auto px-4">
// //           <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
// //             <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
// //             <h1 className="text-2xl font-bold text-gray-800 mb-2 font-primary">Your Cart</h1>
// //             <p className="text-gray-500 mb-6 font-secondary">Please login to view your cart</p>
// //             <Link
// //               href="/auth/login"
// //               className="btn btn-gradient btn-md inline-flex"
// //             >
// //               Login to Continue
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (cartItems.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 py-12">
// //         <div className="max-w-4xl mx-auto px-4">
// //           <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
// //             <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
// //             <h1 className="text-2xl font-bold text-gray-800 mb-2 font-primary">Your Cart is Empty</h1>
// //             <p className="text-gray-500 mb-6 font-secondary">Looks like you haven't added any items to your cart yet.</p>
// //             <Link
// //               href="/products"
// //               className="btn btn-gradient btn-md inline-flex"
// //             >
// //               Continue Shopping
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Mobile/Tablet Header */}
// //       <div className="sticky top-0 z-20 bg-white shadow-sm mt-2 lg:hidden">
// //         <div className="flex items-center justify-between px-4 py-2.5">
// //           <button
// //             onClick={handleGoBack}
// //             className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center shadow-sm active:scale-95 transition-all duration-200"
// //           >
// //             <ArrowLeft size={12} className="text-white" />
// //           </button>

// //           <h1 className="text-base font-bold italic text-primary-blue-dark">
// //             Cart <span className="text-primary">({cartItemCount})</span>
// //           </h1>

// //           <Link
// //             href="/products"
// //             className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-all duration-200"
// //           >
// //             <ShoppingBag size={16} className="text-gray-700" />
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Desktop Header */}
// //       <div className="hidden lg:block max-w-7xl mx-auto px-7 py-10">
// //         <div className="mb-8 flex justify-between items-center">
// //           <div>
// //             <h1 className="text-4xl text-black font-bold italic uppercase tracking-tighter font-primary">
// //               Shopping{" "}
// //               <span className="text-primary">Cart</span>
// //             </h1>
// //             <p className="text-gray-500 font-secondary">{cartItemCount} items in your cart</p>
// //           </div>

// //           <Link
// //             href="/products"
// //             className="inline-flex items-center gap-2 group cursor-pointer"
// //           >
// //             <span className="text-gray-700 font-medium group-hover:text-primary-blue transition-all duration-300">
// //               Continue Shopping
// //             </span>
// //             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
// //               <ArrowLeft size={18} className="text-white rotate-180" />
// //             </div>
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 lg:px-7 pb-24 lg:pb-0">
// //         <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
// //           {/* Cart Items */}
// //           <div className="flex-1 min-w-0">
// //             {/* Desktop Table Header */}
// //             <div className="hidden lg:grid grid-cols-12 gap-2 p-4 bg-gray-50 rounded-t-2xl border-b font-semibold text-primary-blue-dark text-sm">
// //               <div className="col-span-4">Product Details</div>
// //               <div className="col-span-2 text-center">Customize</div>
// //               <div className="col-span-2 text-center">Price</div>
// //               <div className="col-span-2 text-center">Quantity</div>
// //               <div className="col-span-1 text-center">Total</div>
// //               <div className="col-span-1 text-center">Action</div>
// //             </div>

// //             {/* Cart Items List */}
// //             <div className="space-y-2 lg:space-y-0">
// //               {cartItems.map((item, index) => (
// //                 <motion.div
// //                   key={item.id}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: Math.min(index * 0.05, 0.3) }}
// //                 >
// //                   {/* Mobile Compact Card */}
// //                   <div className="lg:hidden bg-white rounded-lg shadow-sm mt-4 overflow-hidden">
// //                     <div className="p-3">
// //                       <div className="flex gap-3">
// //                         <div className="w-14 h-14 bg-gradient-to-br from-primary-blue-light to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
// //                           <ShoppingBag size={22} className="text-primary-blue" />
// //                         </div>

// //                         <div className="flex-1 min-w-0">
// //                           <div className="flex justify-between items-start gap-1">
// //                             <div className="flex-1">
// //                               <h3 className="font-semibold text-gray-800 font-primary text-sm line-clamp-1">
// //                                 {item.name}
// //                               </h3>
// //                               <p className="text-xs text-gray-500">
// //                                 {item.sport || "Cricket"} {item.size && `• Size: ${item.size}`}
// //                               </p>
// //                             </div>
// //                             <button
// //                               onClick={() => removeItem(item.id)}
// //                               className="p-1 -mt-1 -mr-1 text-gray-400 active:text-red-500 transition-colors"
// //                             >
// //                               <Trash2 size={14} />
// //                             </button>
// //                           </div>

// //                           <div className="flex items-center justify-between mt-2">
// //                             <span className="text-sm font-bold text-primary-blue">₹{item.price}</span>

// //                             <div className="flex items-center gap-2">
// //                               <button
// //                                 onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
// //                                 className="w-5 h-5 rounded-md bg-primary-blue text-white active:bg-primary-blue-dark transition-all duration-200 flex items-center justify-center"
// //                               >
// //                                 <Minus size={12} />
// //                               </button>
// //                               <span className="font-semibold text-gray-800 w-6 text-center text-sm">
// //                                 {item.quantity}
// //                               </span>
// //                               <button
// //                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
// //                                 className="w-5 h-5 rounded-md bg-primary-blue text-white active:bg-primary-blue-dark transition-all duration-200 flex items-center justify-center"
// //                               >
// //                                 <Plus size={12} />
// //                               </button>
// //                             </div>

// //                             <span className="text-xs font-semibold text-gray-700">
// //                               ₹{(item.price * item.quantity).toFixed(0)}
// //                             </span>
// //                           </div>

// //                           {/* Customize Button with cleaned ID */}
// //                           <button
// //                             onClick={() => handleCustomize(item.id, item.name)}
// //                             className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 btn btn-gradient btn-sm btn-shine text-xs rounded-md"
// //                           >
// //                             <Sparkles size={10} className="text-yellow-200" />
// //                             Customize
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Desktop Layout */}
// //                   <div className="hidden lg:grid lg:grid-cols-12 gap-2 p-4 border-b last:border-b-0 hover:bg-gray-50/30 transition-colors duration-200 items-center">
// //                     <div className="col-span-4">
// //                       <div className="flex gap-3 items-center">
// //                         <div className="w-14 h-14 bg-primary-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
// //                           <ShoppingBag size={24} className="text-primary-blue" />
// //                         </div>
// //                         <div className="flex-1 min-w-0">
// //                           <h3 className="font-semibold text-gray-800 font-primary text-sm truncate">{item.name}</h3>
// //                           <p className="text-xs text-gray-500 font-secondary">{item.sport || "Cricket"}</p>
// //                           {item.size && <p className="text-xs text-gray-400">Size: {item.size}</p>}
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="col-span-2 flex items-center justify-center">
// //                       <button
// //                         onClick={() => handleCustomize(item.id, item.name)}
// //                         className="inline-flex items-center gap-1 px-3 py-1.5 btn btn-gradient btn-sm btn-shine text-xs whitespace-nowrap"
// //                       >
// //                         <Sparkles size={11} className="text-yellow-200" />
// //                         Customize
// //                       </button>
// //                     </div>

// //                     <div className="col-span-2 text-center">
// //                       <span className="font-semibold text-gray-800 text-sm">₹{item.price}</span>
// //                     </div>

// //                     <div className="col-span-2">
// //                       <div className="flex items-center justify-center gap-2">
// //                         <button
// //                           onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
// //                           className="w-7 h-7 rounded-lg bg-primary-blue text-white hover:bg-primary-blue-dark transition-all duration-300 flex items-center justify-center"
// //                         >
// //                           <Minus size={12} />
// //                         </button>
// //                         <span className="font-semibold text-gray-800 w-7 text-center text-sm">{item.quantity}</span>
// //                         <button
// //                           onClick={() => handleUpdateQuantity(item.id, item.quantity +  1)}
// //                           className="w-7 h-7 rounded-lg bg-primary-blue text-white hover:bg-primary-blue-dark transition-all duration-300 flex items-center justify-center"
// //                         >
// //                           <Plus size={12} />
// //                         </button>
// //                       </div>
// //                     </div>

// //                     <div className="col-span-1 text-center">
// //                       <span className="font-bold text-primary-blue text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
// //                     </div>

// //                     <div className="col-span-1 text-center">
// //                       <button
// //                         onClick={() => removeItem(item.id)}
// //                         className="p-1.5 text-gray-400 hover:text-red-500 transition-all duration-300"
// //                       >
// //                         <Trash2 size={15} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Order Summary - Desktop */}
// //           <div className="hidden lg:block lg:w-96 flex-shrink-0">
// //             <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
// //               <h2 className="text-xl font-bold text-gray-800 mb-4 font-primary">Order Summary</h2>

// //               <div className="space-y-3 border-b pb-4">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600 font-secondary">Subtotal</span>
// //                   <span className="font-semibold text-gray-800">₹{total.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600 font-secondary">Shipping</span>
// //                   <span className="font-semibold text-gray-800 text-xs">Calculated at checkout</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600 font-secondary">Tax</span>
// //                   <span className="font-semibold text-gray-800">Included</span>
// //                 </div>
// //               </div>

// //               <div className="flex justify-between mt-4 pb-4 border-b">
// //                 <span className="text-lg font-bold text-gray-800 font-primary">Total</span>
// //                 <span className="text-xl font-bold text-primary-blue">₹{total.toFixed(2)}</span>
// //               </div>

// //               <button
// //                 onClick={handleCheckout}
// //                 className="w-full btn btn-gradient btn-lg btn-shine mt-6"
// //               >
// //                 Proceed to Checkout
// //                 <svg className="w-5 h-5" viewBox="0 0 14 14" fill="none">
// //                   <path
// //                     d="M2 7h10M8 3.5L11.5 7 8 10.5"
// //                     stroke="white"
// //                     strokeWidth="1.8"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Sticky Bottom Checkout Bar */}
// //       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
// //         <div className="px-4 py-3">
// //           <div className="flex justify-between items-center mb-2">
// //             <div>
// //               <p className="text-xs text-gray-500">Total</p>
// //               <p className="text-lg font-bold text-primary-blue">₹{total.toFixed(2)}</p>
// //             </div>
// //             <button
// //               onClick={handleCheckout}
// //               className="flex-1 ml-4 btn btn-gradient btn-md btn-shine py-2.5 text-sm font-semibold"
// //             >
// //               Checkout
// //               <svg className="w-3.5 h-3.5 ml-1.5" viewBox="0 0 14 14" fill="none">
// //                 <path
// //                   d="M2 7h10M8 3.5L11.5 7 8 10.5"
// //                   stroke="white"
// //                   strokeWidth="1.8"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                 />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useSelector, useDispatch } from "react-redux";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";
// import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { user } = useSelector((state) => state.auth);
//   const cartItems = useSelector((state) => state.cart?.items || []);

//   const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
//   const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   const handleUpdateQuantity = (id, newQuantity) => {
//     console.log("update quantity", id, newQuantity);
//     if (newQuantity < 1) {
//       dispatch(removeFromCart(id));
//     } else {
//       dispatch(updateQuantity({ id, quantity: newQuantity }));
//     }
//   };

//   const removeItem = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleGoBack = () => {
//     router.back();
//   };

//   const handleCustomize = (productId, productName) => {
//     // productId should already be the clean product ID
//     console.log("Product ID for customization:", productId);

//     if (!productId) {
//       console.error("No product ID found");
//       router.push('/products');
//       return;
//     }

//     // Navigate to product page with the product ID
//     router.push(`/products/${productId}`);
//   };

//   const handleCheckout = () => {
//     router.push('/checkout');
//   };

//   // Show empty cart message if no items
//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
//             <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
//             <h1 className="text-2xl font-bold text-gray-800 mb-2 font-primary">Your Cart is Empty</h1>
//             <p className="text-gray-500 mb-6 font-secondary">Looks like you haven't added any items to your cart yet.</p>
//             <Link
//               href="/products"
//               className="btn btn-gradient btn-md inline-flex"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile/Tablet Header */}
//       <div className="sticky top-0 z-20 bg-white shadow-sm mt-2 lg:hidden">
//         <div className="flex items-center justify-between px-4 py-2.5">
//           <button
//             onClick={handleGoBack}
//             className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center shadow-sm active:scale-95 transition-all duration-200"
//           >
//             <ArrowLeft size={12} className="text-white" />
//           </button>

//           <h1 className="text-base font-bold italic text-primary-blue-dark">
//             Cart <span className="text-primary">({cartItemCount})</span>
//           </h1>

//           <Link
//             href="/products"
//             className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-all duration-200"
//           >
//             <ShoppingBag size={16} className="text-gray-700" />
//           </Link>
//         </div>
//       </div>

//       {/* Desktop Header */}
//       <div className="hidden lg:block max-w-7xl mx-auto px-7 py-10">
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl text-black font-bold italic uppercase tracking-tighter font-primary">
//               Shopping{" "}
//               <span className="text-primary">Cart</span>
//             </h1>
//             <p className="text-gray-500 font-secondary">{cartItemCount} items in your cart</p>
//           </div>

//           <Link
//             href="/products"
//             className="inline-flex items-center gap-2 group cursor-pointer"
//           >
//             <span className="text-gray-700 font-medium group-hover:text-primary-blue transition-all duration-300">
//               Continue Shopping
//             </span>
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
//               <ArrowLeft size={18} className="text-white rotate-180" />
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 lg:px-7 pb-24 lg:pb-0">
//         <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
//           {/* Cart Items */}
//           <div className="flex-1 min-w-0">
//             {/* Desktop Table Header */}
//             <div className="hidden lg:grid grid-cols-12 gap-2 p-4 bg-gray-50 rounded-t-2xl border-b font-semibold text-primary-blue-dark text-sm">
//               <div className="col-span-4">Product Details</div>
//               <div className="col-span-2 text-center">Customize</div>
//               <div className="col-span-2 text-center">Price</div>
//               <div className="col-span-2 text-center">Quantity</div>
//               <div className="col-span-1 text-center">Total</div>
//               <div className="col-span-1 text-center">Action</div>
//             </div>

//             {/* Cart Items List */}
//             <div className="space-y-2 lg:space-y-0">
//               {cartItems.map((item, index) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                 >
//                   {/* Mobile Compact Card */}
//                   <div className="lg:hidden bg-white rounded-lg shadow-sm mt-4 overflow-hidden">
//                     <div className="p-3">
//                       <div className="flex gap-3">
//                         <div className="w-14 h-14 bg-gradient-to-br from-primary-blue-light to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                           <ShoppingBag size={22} className="text-primary-blue" />
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <div className="flex justify-between items-start gap-1">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-gray-800 font-primary text-sm line-clamp-1">
//                                 {item.name}
//                               </h3>
//                               <p className="text-xs text-gray-500">
//                                 {item.sport || "Cricket"} {item.size && `• Size: ${item.size}`}
//                               </p>
//                             </div>
//                             <button
//                               onClick={() => removeItem(item.id)}
//                               className="p-1 -mt-1 -mr-1 text-gray-400 active:text-red-500 transition-colors"
//                             >
//                               <Trash2 size={14} />
//                             </button>
//                           </div>

//                           <div className="flex items-center justify-between mt-2">
//                             <span className="text-sm font-bold text-primary-blue">₹{item.price}</span>

//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
//                                 className="w-5 h-5 rounded-md bg-primary-blue text-white active:bg-primary-blue-dark transition-all duration-200 flex items-center justify-center"
//                               >
//                                 <Minus size={12} />
//                               </button>
//                               <span className="font-semibold text-gray-800 w-6 text-center text-sm">
//                                 {item.quantity}
//                               </span>
//                               <button
//                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
//                                 className="w-5 h-5 rounded-md bg-primary-blue text-white active:bg-primary-blue-dark transition-all duration-200 flex items-center justify-center"
//                               >
//                                 <Plus size={12} />
//                               </button>
//                             </div>

//                             <span className="text-xs font-semibold text-gray-700">
//                               ₹{(item.price * item.quantity).toFixed(0)}
//                             </span>
//                           </div>

//                           {/* Customize Button - Use productId instead of item.id */}
//                           <button
//                             onClick={() => handleCustomize(item.productId, item.name)}
//                             className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 btn btn-gradient btn-sm btn-shine text-xs rounded-md"
//                           >
//                             <Sparkles size={10} className="text-yellow-200" />
//                             Customize
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Desktop Layout */}
//                   <div className="hidden lg:grid lg:grid-cols-12 gap-2 p-4 border-b last:border-b-0 hover:bg-gray-50/30 transition-colors duration-200 items-center">
//                     <div className="col-span-4">
//                       <div className="flex gap-3 items-center">
//                         <div className="w-14 h-14 bg-primary-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
//                           <ShoppingBag size={24} className="text-primary-blue" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-800 font-primary text-sm truncate">{item.name}</h3>
//                           <p className="text-xs text-gray-500 font-secondary">{item.sport || "Cricket"}</p>
//                           {item.size && <p className="text-xs text-gray-400">Size: {item.size}</p>}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-span-2 flex items-center justify-center">
//                       <button
//                         onClick={() => handleCustomize(item.productId, item.name)}
//                         className="inline-flex items-center gap-1 px-3 py-1.5 btn btn-gradient btn-sm btn-shine text-xs whitespace-nowrap"
//                       >
//                         <Sparkles size={11} className="text-yellow-200" />
//                         Customize
//                       </button>
//                     </div>

//                     <div className="col-span-2 text-center">
//                       <span className="font-semibold text-gray-800 text-sm">₹{item.price}</span>
//                     </div>

//                     <div className="col-span-2">
//                       <div className="flex items-center justify-center gap-2">
//                         <button
//                           onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
//                           className="w-7 h-7 rounded-lg bg-primary-blue text-white hover:bg-primary-blue-dark transition-all duration-300 flex items-center justify-center"
//                         >
//                           <Minus size={12} />
//                         </button>
//                         <span className="font-semibold text-gray-800 w-7 text-center text-sm">{item.quantity}</span>
//                         <button
//                           onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
//                           className="w-7 h-7 rounded-lg bg-primary-blue text-white hover:bg-primary-blue-dark transition-all duration-300 flex items-center justify-center"
//                         >
//                           <Plus size={12} />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="col-span-1 text-center">
//                       <span className="font-bold text-primary-blue text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
//                     </div>

//                     <div className="col-span-1 text-center">
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="p-1.5 text-gray-400 hover:text-red-500 transition-all duration-300"
//                       >
//                         <Trash2 size={15} />
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Order Summary - Desktop */}
//           <div className="hidden lg:block lg:w-96 flex-shrink-0">
//             <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 font-primary">Order Summary</h2>

//               <div className="space-y-3 border-b pb-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 font-secondary">Subtotal</span>
//                   <span className="font-semibold text-gray-800">₹{total.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 font-secondary">Shipping</span>
//                   <span className="font-semibold text-gray-800 text-xs">Calculated at checkout</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 font-secondary">Tax</span>
//                   <span className="font-semibold text-gray-800">Included</span>
//                 </div>
//               </div>

//               <div className="flex justify-between mt-4 pb-4 border-b">
//                 <span className="text-lg font-bold text-gray-800 font-primary">Total</span>
//                 <span className="text-xl font-bold text-primary-blue">₹{total.toFixed(2)}</span>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 className="w-full btn btn-gradient btn-lg btn-shine mt-6"
//               >
//                 Proceed to Checkout
//                 <svg className="w-5 h-5" viewBox="0 0 14 14" fill="none">
//                   <path
//                     d="M2 7h10M8 3.5L11.5 7 8 10.5"
//                     stroke="white"
//                     strokeWidth="1.8"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </button>

//               {!user && (
//                 <p className="text-xs text-center text-gray-500 mt-3">
//                   Login to complete your purchase
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sticky Bottom Checkout Bar */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
//         <div className="px-4 py-3">
//           <div className="flex justify-between items-center mb-2">
//             <div>
//               <p className="text-xs text-gray-500">Total</p>
//               <p className="text-lg font-bold text-primary-blue">₹{total.toFixed(2)}</p>
//             </div>
//             <button
//               onClick={handleCheckout}
//               className="flex-1 ml-4 btn btn-gradient btn-md btn-shine py-2.5 text-sm font-semibold"
//             >
//               Checkout
//               <svg className="w-3.5 h-3.5 ml-1.5" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M2 7h10M8 3.5L11.5 7 8 10.5"
//                   stroke="white"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//           {!user && (
//             <p className="text-xs text-center text-gray-500 mt-1">
//               Login to complete your purchase
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import {
  fetchCart,
  removeFromCart,
  editCartItem,
} from "@/features/cart/cartThunks";
import AuthModal from "@/app/components/auth/AuthModal";
import toast from "react-hot-toast";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const {
    items: cartItems,
    loading,
    isGuest,
  } = useSelector((state) => state.cart);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");

  const cartItemCount =
    cartItems?.reduce(
      (total, item) =>
        total +
        (item.sizes || []).reduce((sum, size) => sum + size.quantity, 0),
      0,
    ) || 0;

  const total =
    cartItems?.reduce(
      (sum, item) =>
        sum +
        (item.basePrice || item.price || 0) *
        (item.sizes || []).reduce((s, size) => s + size.quantity, 0),
      0,
    ) || 0;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = async (item, sizeName, action) => {
    const updatedSizes = (item.sizes || [])
      .map((size) => {
        if (size.size !== sizeName) {
          return size;
        }

        return {
          ...size,
          quantity:
            action === "increase" ? size.quantity + 1 : size.quantity - 1,
        };
      })
      .filter((size) => size.quantity > 0);

    // ✅ REMOVE ITEM IF EMPTY
    if (updatedSizes.length === 0) {
      try {
        await dispatch(removeFromCart(item.customizationId)).unwrap();

        toast.success("Item removed");
      } catch (error) {
        toast.error("Failed to remove item");
      }

      return;
    }

    try {
      await dispatch(
        editCartItem({
          customizationId: item.customizationId,

          sizes: updatedSizes,
        }),
      ).unwrap();

      toast.success("Cart updated");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (itemId) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleCustomize = (item) => {
    if (!item?.productId) {
      router.push("/products");
      return;
    }

    router.push(
      `/products/${item.productId}?customizationId=${item.customizationId}`,
    );
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    router.push("/checkout");
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = async () => {
    setIsAuthModalOpen(false);
    // Refetch cart after successful login
    await dispatch(fetchCart());
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (cartItems && cartItems.length > 0) {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile/Tablet Header */}
          <div className="sticky top-0 z-20 bg-white shadow-sm mt-2 lg:hidden">
            <div className="flex items-center justify-between px-4 py-2.5">
              <button
                onClick={handleGoBack}
                className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center shadow-sm active:scale-95 transition-all duration-200"
              >
                <ArrowLeft size={12} className="text-white" />
              </button>
              <h1 className="text-base font-bold italic text-primary-blue-dark">
                Cart <span className="text-primary">({cartItemCount})</span>
              </h1>
              <Link
                href="/products"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-all duration-200"
              >
                <ShoppingBag size={16} className="text-gray-700" />
              </Link>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block max-w-7xl mx-auto px-7 py-10">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-4xl text-black font-bold italic uppercase tracking-tighter font-primary">
                  Shopping <span className="text-primary">Cart</span>
                </h1>
                <p className="text-gray-500 font-secondary">
                  {cartItemCount} items in your cart
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 group cursor-pointer"
              >
                <span className="text-gray-700 font-medium group-hover:text-primary-blue transition-all duration-300">
                  Continue Shopping
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <ArrowLeft size={18} className="text-white rotate-180" />
                </div>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 lg:px-7 pb-24 lg:pb-0 bg-white">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
              <div className="flex-1 min-w-0">
                <div className="hidden lg:grid grid-cols-12 gap-2 p-4 bg-gray-50 rounded-t-2xl border-b font-semibold text-primary-blue-dark text-sm">
                  <div className="col-span-4">Product Details</div>
                  <div className="col-span-2 text-center">Customize</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-1 text-center">Total</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>

                <div className="space-y-2 lg:space-y-0">
                  {cartItems.map((item, index) => {
                    // Get the correct ID for operations
                    const itemId = item.customizationId || item.id || item._id;

                    return (
                      <motion.div
                        key={itemId || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.05, 0.3) }}
                      >
                        {/* Mobile Card */}
                        <div className="lg:hidden bg-white rounded-lg shadow-sm mt-4 overflow-hidden">
                          <div className="p-3">
                            <div className="flex gap-3">
                              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.productName || item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-1">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 font-primary text-sm line-clamp-1">
                                      {item.productName || item.name}
                                    </h3>
                                    {(item.sizes || []).length > 0 && (
                                      <p className="text-xs text-gray-500">
                                        {(item.sizes || [])
                                          .map((s) => `${s.size} × ${s.quantity}`)
                                          .join(", ")}
                                      </p>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => removeItem(itemId)}
                                    className="p-1 -mt-1 -mr-1 text-gray-400 active:text-red-500 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-sm font-bold text-primary-blue">
                                    ₹{item.basePrice || item.price}
                                  </span>
                                  <div className="flex flex-col gap-1.5">
                                    {(item.sizes || []).map((s) => (
                                      <div key={s.size} className="flex items-center gap-2">
                                        <span className="text-[11px] font-medium text-gray-500 w-5">{s.size}</span>
                                        <button
                                          onClick={() => handleUpdateQuantity(item, s.size, "decrease")}
                                          className="w-5 h-5 rounded-md bg-primary-blue text-white active:bg-primary-blue-dark transition-all duration-200 flex items-center justify-center"
                                        >
                                          <Minus size={12} />
                                        </button>
                                        <span className="font-semibold text-gray-800 w-5 text-center text-sm">
                                          {s.quantity}
                                        </span>
                                        <button
                                          onClick={() => handleUpdateQuantity(item, s.size, "increase")}
                                          className="w-5 h-5 rounded-md bg-primary-blue text-white active:bg-primary-blue-dark transition-all duration-200 flex items-center justify-center"
                                        >
                                          <Plus size={12} />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700">
                                    ₹
                                    {(
                                      (item.basePrice || item.price || 0) *
                                      (item.sizes || []).reduce(
                                        (sum, size) => sum + size.quantity,
                                        0,
                                      )
                                    ).toFixed(0)}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleCustomize(item)}
                                  className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 btn btn-gradient btn-sm btn-shine text-xs rounded-md"
                                >
                                  <Sparkles
                                    size={10}
                                    className="text-yellow-200"
                                  />{" "}
                                  Customize
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden lg:grid lg:grid-cols-12 gap-2 p-4 border-b last:border-b-0 hover:bg-gray-50/30 transition-colors duration-200 items-center">
                          <div className="col-span-4">
                            <div className="flex gap-3 items-center">
                              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.productName || item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 font-primary text-sm truncate">
                                  {item.productName || item.name}
                                </h3>
                                {(item.sizes || []).length > 0 && (
                                  <p className="text-xs text-gray-400">
                                    {(item.sizes || [])
                                      .map((s) => `${s.size} × ${s.quantity}`)
                                      .join(", ")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center justify-center">
                            <button
                              onClick={() => handleCustomize(item)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 btn btn-gradient btn-sm btn-shine text-xs whitespace-nowrap"
                            >
                              <Sparkles size={11} className="text-yellow-200" />{" "}
                              Customize
                            </button>
                          </div>
                          <div className="col-span-2 text-center">
                            <span className="font-semibold text-gray-800 text-sm">
                              ₹{item.basePrice || item.price}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <div className="flex flex-col items-center justify-center gap-2">
                              {(item.sizes || []).map((s) => (
                                <div key={s.size} className="flex items-center justify-center gap-2">
                                  <span className="text-xs font-medium text-gray-500 w-6 text-right">{s.size}</span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item, s.size, "decrease")}
                                    className="w-6 h-6 rounded-lg bg-primary-blue text-white hover:bg-primary-blue-dark transition-all duration-300 flex items-center justify-center"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="font-semibold text-gray-800 w-6 text-center text-sm">
                                    {s.quantity}
                                  </span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item, s.size, "increase")}
                                    className="w-6 h-6 rounded-lg bg-primary-blue text-white hover:bg-primary-blue-dark transition-all duration-300 flex items-center justify-center"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-span-1 text-center">
                            <span className="font-bold text-primary-blue text-sm">
                              ₹
                              {(
                                (item.basePrice || item.price || 0) *
                                (item.sizes || []).reduce(
                                  (sum, size) => sum + size.quantity,
                                  0,
                                )
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="col-span-1 text-center">
                            <button
                              onClick={() => removeItem(itemId)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-all duration-300"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="hidden lg:block lg:w-96 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 font-primary">
                    Order Summary
                  </h2>
                  <div className="space-y-3 border-b pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-secondary">
                        Subtotal
                      </span>
                      <span className="font-semibold text-gray-800">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-secondary">
                        Shipping
                      </span>
                      <span className="font-semibold text-gray-800 text-xs">
                        Calculated at checkout
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-secondary">Tax</span>
                      <span className="font-semibold text-gray-800">
                        Included
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 pb-4 border-b">
                    <span className="text-lg font-bold text-gray-800 font-primary">
                      Total
                    </span>
                    <span className="text-xl font-bold text-primary-blue">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full btn btn-gradient btn-lg btn-shine mt-6"
                  >
                    Proceed to Checkout
                    <svg className="w-5 h-5" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M8 3.5L11.5 7 8 10.5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {!user && (
                    <p className="text-xs text-center text-gray-500 mt-3">
                      Login to complete your purchase
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Bottom Checkout Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
            <div className="px-4 py-3">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-primary-blue">
                    ₹{total.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex-1 ml-4 btn btn-gradient btn-md btn-shine py-2.5 text-sm font-semibold"
                >
                  Checkout
                  <svg
                    className="w-3.5 h-3.5 ml-1.5"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 7h10M8 3.5L11.5 7 8 10.5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {!user && (
                <p className="text-xs text-center text-gray-500 mt-1">
                  Login to complete your purchase
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          defaultMode={authModalMode}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // Empty cart states
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-primary">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-6 font-secondary">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="btn btn-gradient btn-md inline-flex"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
