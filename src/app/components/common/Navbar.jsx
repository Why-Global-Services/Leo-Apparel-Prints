// "use client";

// import { useState, useEffect, useRef } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { ChevronDown, User, Menu, X, ShoppingBag } from "lucide-react";

// // ─── Data ───────────────────────────────────────────────────────────────────

// const CRICKET_MENU = {
//   columns: [
//     {
//       title: "BUILD YOUR KIT",
//       links: [
//         { name: "Playing Jersey", href: "/cricket/playing-jersey" },
//         { name: "White T-Shirts", href: "/cricket/white-tshirts" },
//         { name: "Umpire T-Shirts", href: "/cricket/umpire-tshirts" },
//         { name: "White Trousers", href: "/cricket/white-trousers" },
//         { name: "Playing Trousers", href: "/cricket/playing-trousers" },
//         { name: "Caps & Accessories", href: "/cricket/caps-accessories" },
//       ],
//     },
//     {
//       title: "TRAINING WEAR",
//       links: [
//         { name: "Training Jersey", href: "/cricket/training-jersey" },
//         { name: "Training Shorts", href: "/cricket/training-shorts" },
//         { name: "Training Tanks", href: "/cricket/training-tanks" },
//       ],
//     },
//     {
//       title: "ATHLEISURE",
//       links: [
//         { name: "Jacket", href: "/cricket/jacket" },
//         { name: "Hoodie", href: "/cricket/hoodie" },
//         { name: "Travel Trousers", href: "/cricket/travel-trousers" },
//         { name: "& More", href: "/cricket/more" },
//       ],
//     },
//     {
//       title: "CUSTOM SERVICES",
//       links: [
//         { name: "Upload Your Design", href: "/upload-design" },
//         { name: "Large Squad Orders", href: "/contact-sales" },
//       ],
//     },
//   ],
// };

// const SPORTS_INDIA_MENU = [
//   { 
//     name: "Cricket", 
//     href: "/sports/cricket", 
//     accessories: [
//       { name: "Cricket Jersey", href: "/cricket/playing-jersey" },
//       { name: "Cricket Trousers", href: "/cricket/playing-trousers" },
//       { name: "Cricket Cap", href: "/cricket/caps-accessories" },
//       { name: "Batting Gloves", href: "/cricket/accessories" }
//     ]
//   },
//   { 
//     name: "Soccer", 
//     href: "/sports/soccer", 
//     accessories: [
//       { name: "Soccer Jersey", href: "/soccer/jersey" },
//       { name: "Soccer Shorts", href: "/soccer/shorts" },
//       { name: "Soccer Socks", href: "/soccer/socks" },
//       { name: "Shin Guards", href: "/soccer/guards" }
//     ]
//   },
//   { 
//     name: "Tennis", 
//     href: "/sports/tennis", 
//     accessories: [
//       { name: "Tennis Polo", href: "/tennis/polo" },
//       { name: "Tennis Skirt", href: "/tennis/skirt" },
//       { name: "Tennis Shorts", href: "/tennis/shorts" },
//       { name: "Headband", href: "/tennis/headband" }
//     ]
//   },
//   { 
//     name: "Badminton", 
//     href: "/sports/badminton", 
//     accessories: [
//       { name: "Badminton Jersey", href: "/badminton/jersey" },
//       { name: "Badminton Shorts", href: "/badminton/shorts" },
//       { name: "Wristband", href: "/badminton/wristband" },
//       { name: "Headband", href: "/badminton/headband" }
//     ]
//   },
//   { 
//     name: "Pickleball", 
//     href: "/sports/pickleball", 
//     accessories: [
//       { name: "Pickleball Jersey", href: "/pickleball/jersey" },
//       { name: "Pickleball Shorts", href: "/pickleball/shorts" },
//       { name: "Pickleball Cap", href: "/pickleball/cap" },
//       { name: "Visor", href: "/pickleball/visor" }
//     ]
//   },
//   { 
//     name: "Athleisure", 
//     href: "/sports/athleisure", 
//     accessories: [
//       { name: "Hoodie", href: "/athleisure/hoodie" },
//       { name: "Joggers", href: "/athleisure/joggers" },
//       { name: "Training Top", href: "/athleisure/top" },
//       { name: "Training Shorts", href: "/athleisure/shorts" }
//     ]
//   },
// ];

// const RESOURCES_MENU = [
//   { name: "Size Guide", href: "/size-guide" },
//   { name: "Fabric DNA", href: "/fabric-dna" },
//   { name: "FAQ", href: "/faq" },
//   { name: "Price Estimator", href: "/price-estimator" },
//   { name: "Catalog", href: "/catalog" },
//   { name: "Bulk Orders", href: "/bulk-orders" },
// ];

// const NAV_ITEMS = [
//   { id: "cricket", label: "Cricket Uniforms" },
//   { id: "sportsIndia", label: "Sports India" },
//   { id: "resources", label: "Resources" },
// ];

// // ─── Cricket Panel - 4 Columns ───────────────────────────────────────────────
// function CricketPanel() {
//   return (
//     <div className="w-full bg-white">
//       <div className="max-w-7xl mx-auto px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
//           {CRICKET_MENU.columns.map((col, ci) => (
//             <motion.div
//               key={col.title}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.25, delay: ci * 0.05 }}
//             >
//               <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-6 uppercase">
//                 {col.title}
//               </h3>
//               <ul className="space-y-3.5">
//                 {col.links.map((link, li) => (
//                   <motion.li
//                     key={link.name}
//                     initial={{ opacity: 0, x: -6 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.2, delay: ci * 0.05 + li * 0.03 }}
//                   >
//                     <Link
//                       href={link.href}
//                       className="text-[15px] text-gray-600 hover:text-primary transition-colors block"
//                     >
//                       {link.name}
//                     </Link>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Sports India Panel ─────────────────────────────────────────────────────
// function SportsIndiaPanel() {
//   return (
//     <div className="w-full bg-white">
//       <div className="max-w-7xl mx-auto px-8 py-12">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
//           {SPORTS_INDIA_MENU.map((item, i) => (
//             <motion.div
//               key={item.name}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: i * 0.05 }}
//             >
//               <Link href={item.href}>
//                 <h3 className="text-lg font-bold text-gray-900 mb-5 hover:text-primary transition-colors">
//                   {item.name}
//                 </h3>
//               </Link>

//               <div className="space-y-2.5 flex-1">
//                 {item.accessories.map((accessory, idx) => (
//                   <Link
//                     key={idx}
//                     href={accessory.href}
//                     className="block text-[14.5px] text-gray-600 hover:text-primary transition-colors"
//                   >
//                     {accessory.name}
//                   </Link>
//                 ))}
//               </div>

//               <Link
//                 href={item.href}
//                 className="mt-6 text-primary text-sm font-medium hover:underline inline-block"
//               >
//                 View all →
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Resources Panel - Ultra Minimal ────────────────────────────────────
// function ResourcesPanel() {
//   return (
//     <div className="w-full bg-white flex justify-center">
//       <div className="py-8">
//         <ul className="space-y-2">
//           {RESOURCES_MENU.map((item, i) => (
//             <motion.li
//               key={item.name}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.2, delay: i * 0.04 }}
//             >
//               <Link
//                 href={item.href}
//                 className="block text-[15px] text-gray-600 hover:text-primary transition-colors py-1.5 px-4"
//               >
//                 {item.name}
//               </Link>
//             </motion.li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // ─── Mobile Item ────────────────────────────────────────────────────────────
// function MobileItem({ item }) {
//   const [open, setOpen] = useState(false);

//   const getLinks = () => {
//     if (item.id === "cricket") return CRICKET_MENU.columns.flatMap((c) => c.links);
//     if (item.id === "sportsIndia") {
//       return SPORTS_INDIA_MENU.flatMap((s) => [
//         { name: s.name, href: s.href },
//         ...s.accessories.map((a) => ({ name: `  • ${a.name}`, href: a.href })),
//       ]);
//     }
//     if (item.id === "resources") return RESOURCES_MENU;
//     return [];
//   };

//   const links = getLinks();

//   return (
//     <div className="border-b border-gray-100">
//       <button
//         onClick={() => setOpen((v) => !v)}
//         className="flex items-center justify-between w-full py-4 text-base font-semibold text-gray-800"
//       >
//         {item.label}
//         <ChevronDown size={18} strokeWidth={2.5} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="overflow-hidden"
//           >
//             <div className="pb-4 pl-4 space-y-2">
//               {links.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className="block text-sm text-gray-600 hover:text-primary py-1.5 transition-colors"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ─── Cart Drawer ────────────────────────────────────────────────────────────
// function CartDrawer({ isOpen, onClose }) {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     setCartItems([
//       { id: 1, name: "Cricket Jersey", price: 29.99, quantity: 1, sport: "Cricket" },
//       { id: 2, name: "Cricket Trousers", price: 24.99, quantity: 2, sport: "Cricket" },
//     ]);
//   }, []);

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/60 z-[60]"
//           />
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "tween", duration: 0.3 }}
//             className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
//           >
//             <div className="p-5 border-b flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
//               <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//                 <X size={22} />
//               </button>
//             </div>

//             <div className="flex-1 p-5 overflow-y-auto">
//               {cartItems.length === 0 ? (
//                 <div className="text-center py-16">
//                   <ShoppingBag size={60} className="mx-auto text-gray-300 mb-4" />
//                   <p className="text-gray-500">Your cart is empty</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {cartItems.map((item) => (
//                     <div key={item.id} className="flex gap-4 border-b pb-5">
//                       <div className="w-20 h-20 bg-gray-100 rounded-lg" />
//                       <div className="flex-1">
//                         <p className="font-medium text-gray-800">{item.name}</p>
//                         <p className="text-sm text-gray-500 mt-1">{item.sport}</p>
//                         <div className="flex justify-between items-center mt-4">
//                           <span className="font-semibold text-primary">${item.price}</span>
//                           <div className="flex items-center gap-3">
//                             <button className="w-7 h-7 border rounded hover:bg-gray-100">-</button>
//                             <span className="font-medium">{item.quantity}</span>
//                             <button className="w-7 h-7 border rounded hover:bg-gray-100">+</button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="p-5 border-t bg-gray-50">
//               <div className="flex justify-between mb-4 text-lg">
//                 <span>Subtotal</span>
//                 <span className="font-bold">${total.toFixed(2)}</span>
//               </div>
//               <button className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90">
//                 Checkout
//               </button>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }
// function AnimatedLogo() {
//   const primaryColor = "#F59E0B";
//   const black = "#000000";

//   // Smaller Scale Dimensions
//   const fontSize = "20px";      // Tightened from 22px
//   const tracking = "3px";      // Tightened from 4px
//   const subtitleSize = "6px";

//   const sliceVariants = {
//     initial: { opacity: 0, x: -4 },
//     animate: (i) => ({
//       opacity: [0, 1, 0.8, 1],
//       x: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.3,
//         repeat: Infinity,
//         repeatDelay: 3,
//       },
//     }),
//   };

//   return (
//     <div className="flex flex-col items-start cursor-default group select-none">
//       <div className="relative">
//         {/* Base Layer */}
//         <h1
//           style={{
//             fontSize: fontSize,
//             fontWeight: 950, // Extra bold for smaller size visibility
//             letterSpacing: tracking,
//             color: primaryColor,
//             lineHeight: "1",
//             fontFamily: "inherit", 
//             textTransform: "uppercase",
//           }}
//         >
//           LEO CULT
//         </h1>

//         {/* Animation Slices */}
//         {[0, 1, 2].map((i) => (
//           <motion.h1
//             key={i}
//             custom={i}
//             variants={sliceVariants}
//             initial="initial"
//             animate="animate"
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               fontSize: fontSize,
//               fontWeight: 950,
//               letterSpacing: tracking,
//               lineHeight: "1",
//               color: primaryColor,
//               textShadow: `0px 0px 5px ${primaryColor}33`,
//               // Precise 3-way split
//               clipPath: `inset(${i * 33.3}% 0 ${(2 - i) * 33.3}% 0)`,
//             }}
//           >
//             LEO CULT
//           </motion.h1>
//         ))}
//       </div>

//       {/* Slim Underline */}
//       <div className="relative w-full h-[1.5px] mt-1 bg-gray-100 rounded-full overflow-hidden">
//         <motion.div
//           animate={{ x: ["-100%", "100%"] }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//             repeatDelay: 1
//           }}
//           className="absolute inset-0 w-1/2 h-full"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`
//           }}
//         />
//       </div>

//       <motion.span
//         animate={{ opacity: [0.5, 1, 0.5] }}
//         transition={{ duration: 3, repeat: Infinity }}
//         className="font-black uppercase mt-0.5"
//         style={{ 
//           fontSize: subtitleSize, 
//           letterSpacing: "4.5px", 
//           color: black 
//         }}
//       >
//         WEAR THE POWER
//       </motion.span>
//     </div>
//   );
// }

// // ─── Main Navbar ─────────────────────────────────────────────────────────────
// export default function Navbar() {
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [navbarHeight, setNavbarHeight] = useState(68);
//   const [cartOpen, setCartOpen] = useState(false);

//   const leaveTimer = useRef(null);
//   const headerRef = useRef(null);

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     if (headerRef.current) {
//       setNavbarHeight(headerRef.current.getBoundingClientRect().height);
//     }
//   }, []);

//   useEffect(() => {
//     const onResize = () => {
//       if (window.innerWidth >= 768) setMobileOpen(false);
//       if (headerRef.current) {
//         setNavbarHeight(headerRef.current.getBoundingClientRect().height);
//       }
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const onEnter = (id) => {
//     clearTimeout(leaveTimer.current);
//     setActiveMenu(id);
//   };

//   const onLeave = () => {
//     leaveTimer.current = setTimeout(() => setActiveMenu(null), 180);
//   };

//   const stayOpen = () => clearTimeout(leaveTimer.current);

//   return (
//     <>
//       {/* Fixed Header */}
//       <header
//         ref={headerRef}
//         className={`fixed left-0 right-0 z-40 bg-white transition-all duration-300 ${
//           scrolled ? "top-0 shadow-lg" : "top-[40px] pt-3"
//         }`}
//       >
//         <div className="max-w-full mx-auto px-4 md:px-8 flex items-center justify-between h-[80px]">
//           <div className="flex items-center gap-3 h-full">
//             <Image 
//               src="/images/icons/mainlogo.jpeg"
//               alt="logo"
//               width={50}
//               height={30}
//               className="rounded-md"
//             />
//             <AnimatedLogo />
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-1">
//             {NAV_ITEMS.map((item) => (
//               <div
//                 key={item.id}
//                 onMouseEnter={() => onEnter(item.id)}
//                 onMouseLeave={onLeave}
//                 className="relative"
//               >
//                 <button
//                   className={`flex items-center gap-1.5 px-6 py-3 text-[15px] font-medium transition-colors ${
//                     activeMenu === item.id ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
//                   }`}
//                 >
//                   {item.label}
//                   <ChevronDown 
//                     size={15} 
//                     className={`transition-transform duration-200 ${
//                       activeMenu === item.id ? "rotate-180" : ""
//                     }`} 
//                   />
//                 </button>
//                 {activeMenu === item.id && (
//                   <span className="absolute bottom-1 left-6 right-6 h-0.5 bg-primary rounded" />
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Right Side Icons */}
//           <div className="hidden lg:flex items-center gap-4">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="p-2.5 text-gray-700 hover:text-primary rounded-full"
//             >
//               <User size={26} strokeWidth={1.7} />
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setCartOpen(true)}
//               className="p-2.5 text-gray-700 hover:text-primary relative rounded-full"
//             >
//               <ShoppingBag size={26} strokeWidth={1.7} />
//               <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                 2
//               </span>
//             </motion.button>

//             <Link
//               href="/bulk-enquiry"
//               className="group relative inline-flex items-center justify-center gap-2
//                          bg-primary hover:bg-primary/90 text-white font-extrabold
//                          text-xs sm:text-sm px-6 py-3 rounded-xl
//                          transition-all duration-300 w-full sm:w-auto overflow-hidden"
//             >
//               <span className="relative z-10">Bulk Order</span>
//               <svg
//                 className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
//                 viewBox="0 0 14 14"
//                 fill="none"
//               >
//                 <path
//                   d="M2 7h10M8 3.5L11.5 7 8 10.5"
//                   stroke="white"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="lg:hidden p-2 text-gray-700"
//           >
//             {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         <AnimatePresence>
//           {mobileOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="lg:hidden bg-white border-t"
//             >
//               <div className="px-6 py-4">
//                 {NAV_ITEMS.map((item) => (
//                   <MobileItem key={item.id} item={item} />
//                 ))}
//                 <div className="pt-4 space-y-3">
//                   <Link
//                     href="/profile"
//                     className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:border-primary hover:text-primary"
//                   >
//                     <User size={18} /> Profile
//                   </Link>
//                   <button
//                     onClick={() => {
//                       setCartOpen(true);
//                       setMobileOpen(false);
//                     }}
//                     className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:border-primary hover:text-primary"
//                   >
//                     <ShoppingBag size={18} /> Cart
//                   </button>
//                   <Link
//                     href="/quote"
//                     className="group relative inline-flex items-center justify-center gap-2
//                                bg-primary hover:bg-primary/90 text-white font-extrabold
//                                text-xs sm:text-sm px-6 py-3 rounded-xl
//                                transition-all duration-300 w-full sm:w-auto overflow-hidden"
//                   >
//                     <span className="relative z-10">Bulk Order</span>
//                     <svg
//                       className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
//                       viewBox="0 0 14 14"
//                       fill="none"
//                     >
//                       <path
//                         d="M2 7h10M8 3.5L11.5 7 8 10.5"
//                         stroke="white"
//                         strokeWidth="1.8"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       {/* Spacer to push content below fixed header */}
//       <div className="h-[120px]" />

//       {/* Mega Menu - Positioned below fixed header */}
//       <AnimatePresence>
//         {activeMenu && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/30 z-[45]"
//               style={{ top: `${navbarHeight + (scrolled ? 0 : 40)}px` }}
//               onClick={() => setActiveMenu(null)}
//               onMouseEnter={onLeave}
//             />
            
//             {/* Menu Panel */}
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//               className="fixed left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-100"
//               style={{ top: `${navbarHeight + (scrolled ? 0 : 40)}px` }}
//               onMouseEnter={stayOpen}
//               onMouseLeave={onLeave}
//             >
//               {activeMenu === "cricket" && <CricketPanel />}
//               {activeMenu === "sportsIndia" && <SportsIndiaPanel />}
//               {activeMenu === "resources" && <ResourcesPanel />}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Cart Drawer */}
//       <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
//     </>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, User, Menu, X, ShoppingBag } from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const CRICKET_MENU = {
  columns: [
    {
      title: "BUILD YOUR KIT",
      links: [
        { name: "Playing Jersey", href: "/cricket/playing-jersey" },
        { name: "White T-Shirts & Trousers", href: "/cricket/white-tshirts" },
      ],
    },
    {
      title: "TRAINING WEAR",
      links: [
        { name: "Training Jersey", href: "/cricket/training-jersey" },
        { name: "Training Shorts", href: "/cricket/training-shorts" },
      ],
    },
    {
      title: "CUSTOM SERVICES",
      links: [
        { name: "Upload Your Design", href: "/upload-design" },
        { name: "Large Squad Orders", href: "/contact-sales" },
      ],
    },
  ],
};

const SPORTS_INDIA_MENU = [
  { 
    name: "Cricket", 
    href: "/sports/cricket", 
    accessories: [
      { name: "Cricket Jersey", href: "/cricket/playing-jersey" },
      { name: "Cricket Trousers", href: "/cricket/playing-trousers" },
      { name: "Cricket Shorts", href: "/cricket/caps-accessories" },
    ]
  },
  { 
    name: "Soccer", 
    href: "/sports/soccer", 
    accessories: [
      { name: "Soccer Jersey", href: "/soccer/jersey" },
      { name: "Soccer Trousers", href: "/soccer/trousers" },
      { name: "Soccer Shorts", href: "/soccer/shorts" },
    ]
  },
  { 
    name: "Tennis", 
    href: "/sports/tennis", 
    accessories: [
      { name: "Tennis Jersey", href: "/tennis/jersey" },
      { name: "Tennis Trousers", href: "/tennis/trousers" },
      { name: "Tennis Shorts ", href: "/tennis/shorts" },
    ]
  },
  { 
    name: "Badminton", 
    href: "/sports/badminton", 
    accessories: [
      { name: "Badminton Jersey", href: "/badminton/jersey" },
      { name: "Badminton Trousers", href: "/badminton/trousers" },
      { name: "Wristband Shorts", href: "/badminton/wristband" },
    ]
  },
  { 
    name: "Pickleball", 
    href: "/sports/pickleball", 
    accessories: [
      { name: "Pickleball Jersey", href: "/pickleball/jersey" },
      { name: "Pickleball Trousers", href: "/pickleball/Trousers" },
      { name: "Pickleball Shorts", href: "/pickleball/shorts" },
    ]
  },
];

const RESOURCES_MENU = [
  { name: "Size Guide", href: "/size-guide" },
  { name: "FAQ", href: "/faq" },
  { name: "Price Estimator", href: "/price-estimator" },
  { name: "Catalog", href: "/catalog" },
  { name: "Bulk Orders", href: "/bulk-orders" },
];

const NAV_ITEMS = [
  { id: "cricket", label: "Cricket Uniforms" },
  { id: "sportsIndia", label: "Sports India" },
  { id: "resources", label: "Resources" },
];

// ─── Cricket Panel - 4 Columns ───────────────────────────────────────────────
function CricketPanel() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-58 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {CRICKET_MENU.columns.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: ci * 0.05 }}
            >
              <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-6 uppercase font-primary">
                {col.title}
              </h3>
              <ul className="space-y-3.5">
                {col.links.map((link, li) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: ci * 0.05 + li * 0.03 }}
                  >
                    <Link
                      href={link.href}
                      className="text-[15px] text-gray-600 hover:text-primary transition-colors block font-secondary"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sports India Panel ─────────────────────────────────────────────────────
function SportsIndiaPanel() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-28 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {SPORTS_INDIA_MENU.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link href={item.href}>
                <h3 className="text-lg font-bold text-gray-900 mb-5 hover:text-primary transition-colors font-primary">
                  {item.name}
                </h3>
              </Link>

              <div className="space-y-2.5 flex-1">
                {item.accessories.map((accessory, idx) => (
                  <Link
                    key={idx}
                    href={accessory.href}
                    className="block text-[14.5px] text-gray-600 hover:text-primary transition-colors font-secondary"
                  >
                    {accessory.name}
                  </Link>
                ))}
              </div>

              <Link
                href={item.href}
                className="mt-6 text-primary text-sm font-medium hover:underline inline-block font-secondary"
              >
                View all →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Resources Panel - Ultra Minimal ────────────────────────────────────
function ResourcesPanel() {
  return (
    <div className="w-full bg-white flex justify-center">
      <div className="py-8">
        <ul className="space-y-2">
          {RESOURCES_MENU.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
            >
              <Link
                href={item.href}
                className="block text-[15px] text-gray-600 hover:text-primary transition-colors py-1.5 px-4 font-secondary"
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Mobile Item ────────────────────────────────────────────────────────────
function MobileItem({ item }) {
  const [open, setOpen] = useState(false);

  const getLinks = () => {
    if (item.id === "cricket") return CRICKET_MENU.columns.flatMap((c) => c.links);
    if (item.id === "sportsIndia") {
      return SPORTS_INDIA_MENU.flatMap((s) => [
        { name: s.name, href: s.href },
        ...s.accessories.map((a) => ({ name: `  • ${a.name}`, href: a.href })),
      ]);
    }
    if (item.id === "resources") return RESOURCES_MENU;
    return [];
  };

  const links = getLinks();

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-4 text-base font-semibold text-gray-800 font-primary"
      >
        {item.label}
        <ChevronDown size={18} strokeWidth={2.5} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-primary py-1.5 transition-colors font-secondary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Cart Drawer ────────────────────────────────────────────────────────────
function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems([
      { id: 1, name: "Cricket Jersey", price: 29.99, quantity: 1, sport: "Cricket" },
      { id: 2, name: "Cricket Trousers", price: 24.99, quantity: 2, sport: "Cricket" },
    ]);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-black font-primary">Shopping Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full  bg-gray-200 text-primary-blue">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={60} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-secondary">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-xl" />

                  {/* Content */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 font-primary">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500 font-secondary">
                      {item.sport}
                    </p>

                    {/* Price + Quantity */}
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-primary-blue">
                        ₹{item.price}
                      </span>

                      <div className="flex items-center gap-2 ">
                        <button className="w-7 h-7 rounded  hover:bg-gray-200 bg-primary-blue">-</button>
                        <span className="font-medium text-black">{item.quantity}</span>
                        <button className="w-7 h-7 rounded  hover:bg-gray-200 bg-primary-blue">+</button>
                      </div>
                    </div>

                    {/* 🔥 Customize Button */}
                    <button className="btn btn-gradient btn-sm btn-shine mt-3">
                      Customize
                      <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
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
                </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 border-t bg-gray-50 border-gray-300">
              <div className="flex justify-between mb-4 text-lg text-secondary">
                <span className="font-secondary">Subtotal</span>
                <span className="font-bold font-primary">${total.toFixed(2)}</span>
              </div>
             <button className="group relative w-full btn btn-gradient btn-lg btn-shine overflow-hidden">
  
            {/* Text */}
            <span className="relative z-10 flex items-center gap-2 justify-center">
              Proceed to Checkout

              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </span>

            {/* 🔥 Moving Shine Effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


function AnimatedLogo() {
  const letters = "LEOCULT".split("");
  
  // Define your colors here for easy tweaking
  const primaryBlue = "#2563EB"; 
  const darkGray = "#1F2937";

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            animate={{ 
              y: [0, -4, 0],
              // LEO: Cycles B/W (Black to Gray)
              // CULT: Cycles through the Primary Blue
              color: i < 3 
                ? ["#000", "#6B7280", "#000"] 
                : [primaryBlue, "#60A5FA", primaryBlue]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            // ml-2 adds the space before 'C'
            className={`font-primary text-[22px] font-black italic tracking-tighter ${
              i === 3 ? "ml-2" : ""
            }`}
          >
            {l}
          </motion.span>
        ))}
      </div>
      
      <motion.div 
        animate={{ width: ["20%", "100%", "20%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="h-[2px] bg-blue-600 mt-1"
      />
    </div>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(68);
  const [cartOpen, setCartOpen] = useState(false);

  const leaveTimer = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      setNavbarHeight(headerRef.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
      if (headerRef.current) {
        setNavbarHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onEnter = (id) => {
    clearTimeout(leaveTimer.current);
    setActiveMenu(id);
  };

  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const stayOpen = () => clearTimeout(leaveTimer.current);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 z-40 
          bg-[#f2f7fb] backdrop-blur-md 
          transition-all duration-300 border-b border-blue-100 ${
          scrolled ? "top-0 shadow-lg" : "top-[40px] pt-3"
        }`}
      >
        <div className="max-w-full mx-auto px-4 md:px-8 flex items-center justify-between h-[80px]">
          <Link href="/" className="flex items-center gap-3 h-full group">
        <Image 
          src="/images/icons/mainlogo.jpeg"
          alt="logo"
          width={50}
          height={30}
          className="rounded-md transition-transform duration-300 group-hover:scale-105"
        />

        <AnimatedLogo />
      </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => onEnter(item.id)}
                onMouseLeave={onLeave}
                className="relative"
              >
                <button
                  className={`flex items-center gap-1.5 px-6 py-3 text-[15px] font-medium transition-colors font-primary ${
                    activeMenu === item.id ? "text-gray-900" : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.label}
                  <ChevronDown 
                    size={15} 
                    className={`transition-transform duration-200 ${
                      activeMenu === item.id ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                {activeMenu === item.id && (
                  <span className="absolute bottom-1 left-6 right-6 h-0.5 bg-primary rounded" />
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-600 hover:text-primary transition rounded-full"
            >
               <Link href="/account"> <User size={26} strokeWidth={1.7} /> </Link>

            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              className="p-2.5 text-gray-600 hover:text-primary transition relative rounded-full"
            >
              <ShoppingBag size={26} strokeWidth={1.7} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </motion.button>
            
            <Link
              href="/bulk-enquiry"
              className="btn btn-gradient btn-md btn-shine inline-flex"
            >
              Bulk Order
              <svg
                className="w-4 h-4 transition-all duration-300 group-hover:translate-x-2"
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
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-6 py-4">
                {NAV_ITEMS.map((item) => (
                  <MobileItem key={item.id} item={item} />
                ))}
                <div className="pt-4 space-y-3">
                  <Link
                    href="/account"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:border-primary hover:text-primary font-primary"
                  >
                    <User size={18} /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      setCartOpen(true);
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:border-primary hover:text-primary font-primary"
                  >
                    <ShoppingBag size={18} /> Cart
                  </button>
                  <Link
                    href="/bulk-enquiry"
                    className="btn btn-gradient btn-md btn-shine w-full text-center"
                  >
                    Bulk Order
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M8 3.5L11.5 7 8 10.5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="h-[120px]" />

      <AnimatePresence>
        {activeMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-[45]"
              style={{ top: `${navbarHeight + (scrolled ? 0 : 40)}px` }}
              onClick={() => setActiveMenu(null)}
              onMouseEnter={onLeave}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-100"
              style={{ top: `${navbarHeight + (scrolled ? 0 : 40)}px` }}
              onMouseEnter={stayOpen}
              onMouseLeave={onLeave}
            >
              {activeMenu === "cricket" && <CricketPanel />}
              {activeMenu === "sportsIndia" && <SportsIndiaPanel />}
              {activeMenu === "resources" && <ResourcesPanel />}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}