
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Briefcase, 
//   Medal,
//   Palette,
//   ChevronDown,
//   Check,
//   ArrowRight
// } from "lucide-react";
// import { useRouter } from "next/navigation";



// const SEGMENTS = ["Custom Sportswear", "Team Uniforms", "School Sports", "Corporate Sports"];
// const SPORTS = ["Cricket", "Soccer", "Tennis", "Badminton", "Basketball", "Hockey", "Pickleball"];
// const APPAREL = ["Jersey / T-Shirt", "Shorts", "Full Kit", "Polo Shirt", "Hoodie", "Track Pants", "Cap"];

// // ─── Premium Dropdown Component with Better Positioning ─────────────────
// function PremiumDropdown({ icon: Icon, placeholder, options, value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative w-full" ref={dropdownRef}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-xl px-5 py-4 text-left text-sm font-medium border border-white/10 hover:border-primary/50 transition-all duration-300 group"
//         style={{ minHeight: "56px" }}
//       >
//         {Icon && <Icon size={18} className="text-primary group-hover:scale-110 transition-transform flex-shrink-0" />}
//         <span className={value ? "text-white flex-1 truncate" : "text-gray-400 flex-1 truncate"}>
//           {value || placeholder}
//         </span>
//         <motion.div
//           animate={{ rotate: open ? 180 : 0 }}
//           transition={{ duration: 0.2 }}
//           className="flex-shrink-0"
//         >
//           <ChevronDown size={16} className="text-gray-400" />
//         </motion.div>
//       </button>
      
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 z-[100] overflow-hidden"
//             style={{ 
//               maxHeight: "300px", 
//               overflowY: "auto",
//               boxShadow: "0 20px 35px -10px rgba(0,0,0,0.5)"
//             }}
//           >
//             {options.map((opt) => (
//               <button
//                 key={opt}
//                 onClick={() => { 
//                   onChange(opt); 
//                   setOpen(false); 
//                 }}
//                 className={`w-full text-left px-5 py-3 text-sm transition-all duration-200 flex items-center justify-between group ${
//                   value === opt 
//                     ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary" 
//                     : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                 }`}
//               >
//                 <span className="truncate">{opt}</span>
//                 {value === opt && <Check size={14} className="text-primary flex-shrink-0 ml-2" />}
//               </button>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ─── Main Hero Section ────────────────────────────────────────────────────
// export default function HeroSection() {
//   const router = useRouter();
//   const [segment, setSegment] = useState("");
//   const [sport, setSport] = useState("");
//   const [apparel, setApparel] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showCustomizer, setShowCustomizer] = useState(false);

//   const handleSubmit = () => {
//     if (!segment || !sport || !apparel) return;
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       console.log({ segment, sport, apparel });
//       // Navigate to products page with selected options as query params
//       router.push(`/products?segment=${encodeURIComponent(segment)}&sport=${encodeURIComponent(sport)}&apparel=${encodeURIComponent(apparel)}`);
//     }, 500);
//   };

//   const handleMobileCustomize = () => {
//     // Navigate directly to products page without form
//     router.push("/products");
//   };

//   const handleBack = () => {
//     setShowCustomizer(false);
//   };

//   const isFormValid = segment && sport && apparel;

//   return (
//     <section className="relative w-full min-h-screen bg-black overflow-hidden">
      
//       {/* ─── Background Image with Overlay ───────────────────────────────── */}
//       <div className="absolute inset-0">
//          <img
//                       src="/images/banners/banner.png"
//                       alt="LEO CULT Sportswear"
//                       width={500}
//                       height={600}
//                       className="w-full h-full object-cover"
//                     />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
//       </div>
      
//       {/* ─── Centered Form Card ──────────────────────────────────────────── */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="w-full max-w-5xl"
//         >
//           {/* Premium Card */}
//           <div className="relative rounded-2xl ">
//             {/* Glass Background */}
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl " />
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
            
//             {/* Border Glow */}
//             <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-primary/30 via-transparent to-secondary/30" />
            
//             {/* Content */}
//             <div className="relative p-6 sm:p-8 md:p-10">
              
//               {/* Desktop View - Full Form */}
//               <div className="hidden md:block">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                   <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
//                     Create Your
//                     <span className="block 
//                       bg-[linear-gradient(to_bottom,#FFF9C4,#FFD54F,#FF9800,#E65100)] 
//                       bg-clip-text text-transparent 
//                       [-webkit-text-stroke:1px_#1a1a1a]
//                       drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
//                     ">
//                       Custom Sportswear
//                     </span>
//                   </h1>
//                 </div>

//                 {/* Form Row - Desktop */}
//                 <div className="grid grid-cols-4 gap-4 mb-6">
//                   <div className="col-span-1">
//                     <PremiumDropdown
//                       icon={Briefcase}
//                       placeholder="Select Segment"
//                       options={SEGMENTS}
//                       value={segment}
//                       onChange={setSegment}
//                     />
//                   </div>
//                   <div className="col-span-1">
//                     <PremiumDropdown
//                       icon={Medal}
//                       placeholder="Select Sport"
//                       options={SPORTS}
//                       value={sport}
//                       onChange={setSport}
//                     />
//                   </div>
//                   <div className="col-span-1">
//                     <PremiumDropdown
//                       icon={Palette}
//                       placeholder="Select Apparel"
//                       options={APPAREL}
//                       value={apparel}
//                       onChange={setApparel}
//                     />
//                   </div>
//                   <div className="col-span-1">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleSubmit}
//                       disabled={!isFormValid || isSubmitting}
//                       className={`w-full h-full rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
//                         isFormValid && !isSubmitting
//                           ? "bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 cursor-pointer"
//                           : "bg-gray-600/50 cursor-not-allowed opacity-50"
//                       }`}
//                       style={{ minHeight: "56px" }}
//                     >
//                       {isSubmitting ? (
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                           className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                         />
//                       ) : (
//                         <>
//                           <span>Get Started</span>
//                           <ArrowRight size={18} />
//                         </>
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>

//                 {/* Validation Hint */}
//                 {(!segment || !sport || !apparel) && (
//                   <motion.p 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="text-xs text-center text-primary/80 mt-4"
//                   >
//                     Complete all fields to start your custom design journey
//                   </motion.p>
//                 )}

//                 {/* Trust Indicators */}
//                 {isFormValid && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400"
//                   >
//                     <span className="flex items-center gap-1">
//                       <div className="w-1 h-1 bg-primary rounded-full" />
//                       Premium Quality
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <div className="w-1 h-1 bg-primary rounded-full" />
//                       Free Design Support
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <div className="w-1 h-1 bg-primary rounded-full" />
//                       Quick Delivery
//                     </span>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Mobile View - Simplified */}
//               <div className="md:hidden">
//                 {!showCustomizer ? (
//                   /* Initial Mobile View - Only Heading and Button */
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-center"
//                   >
//                     {/* Header */}
//                     <div className="mb-8">
//                       <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
//                         Create Your
//                         <span className="block 
//                           bg-[linear-gradient(to_bottom,#FFF9C4,#FFD54F,#FF9800,#E65100)] 
//                           bg-clip-text text-transparent 
//                           [-webkit-text-stroke:1px_#1a1a1a]
//                           drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
//                         ">
//                           Custom Sportswear
//                         </span>
//                       </h1>
//                       <p className="text-gray-300 text-sm mt-2">
//                         Premium quality custom sportswear for champions
//                       </p>
//                     </div>

//                     {/* Customize Button */}
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleMobileCustomize}
//                       className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
//                     >
//                       <span>Customize Now</span>
//                       <motion.div
//                         animate={{ x: [0, 5, 0] }}
//                         transition={{ duration: 1.5, repeat: Infinity }}
//                       >
//                         <ArrowRight size={20} />
//                       </motion.div>
//                     </motion.button>
//                   </motion.div>
//                 ) : (
//                   /* Mobile Customizer View - Full Form */
//                   <motion.div
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     className="relative"
//                   >
//                     {/* Back Button */}
//                     <button
//                       onClick={handleBack}
//                       className="absolute -top-10 left-0 text-white/70 hover:text-white flex items-center gap-1 text-sm mb-4"
//                     >
//                       ← Back
//                     </button>

//                     {/* Header */}
//                     <div className="text-center mb-6 mt-6">
//                       <h2 className="text-2xl font-bold text-white mb-2">
//                         Customize Your Kit
//                       </h2>
//                       <p className="text-gray-300 text-xs">
//                         Fill in the details to get started
//                       </p>
//                     </div>

//                     {/* Form Fields */}
//                     <div className="space-y-3 mb-6">
//                       <PremiumDropdown
//                         icon={Briefcase}
//                         placeholder="Select Segment"
//                         options={SEGMENTS}
//                         value={segment}
//                         onChange={setSegment}
//                       />
//                       <PremiumDropdown
//                         icon={Medal}
//                         placeholder="Select Sport"
//                         options={SPORTS}
//                         value={sport}
//                         onChange={setSport}
//                       />
//                       <PremiumDropdown
//                         icon={Palette}
//                         placeholder="Select Apparel"
//                         options={APPAREL}
//                         value={apparel}
//                         onChange={setApparel}
//                       />
//                     </div>

//                     {/* Submit Button */}
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleSubmit}
//                       disabled={!isFormValid || isSubmitting}
//                       className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
//                         isFormValid && !isSubmitting
//                           ? "bg-gradient-to-r from-primary to-secondary hover:shadow-2xl cursor-pointer"
//                           : "bg-gray-600/50 cursor-not-allowed opacity-50"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                           className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                         />
//                       ) : (
//                         <>
//                           <span>Get Started</span>
//                           <ArrowRight size={18} />
//                         </>
//                       )}
//                     </motion.button>

//                     {/* Validation Hint */}
//                     {(!segment || !sport || !apparel) && (
//                       <motion.p 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-xs text-center text-primary/80 mt-4"
//                       >
//                         Complete all fields to continue
//                       </motion.p>
//                     )}
//                   </motion.div>
//                 )}
//               </div>

//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Medal,
  Palette,
  ChevronDown,
  Check,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SEGMENTS = ["Custom Sportswear", "Team Uniforms", "School Sports", "Corporate Sports"];
const SPORTS   = ["Cricket", "Soccer", "Tennis", "Badminton", "Basketball", "Hockey", "Pickleball"];
const APPAREL  = ["Jersey / T-Shirt", "Shorts", "Full Kit", "Polo Shirt", "Hoodie", "Track Pants", "Cap"];

const BANNER_IMAGES = [
  {
    id: 1,
    src: "/images/banners/banner.png",
    alt: "LEO CULT Sportswear",
    animation: {
      initial:    { opacity: 0, scale: 1.08 },
      animate:    { opacity: 1, scale: 1 },
      exit:       { opacity: 0, scale: 0.95 },
      transition: { duration: 0.9, ease: "easeOut" },
    },
  },
  {
    id: 2,
    src: "/images/banners/banner1.png",
    alt: "Diverse Athletes Collection",
    animation: {
      initial:    { opacity: 0, x: -80 },
      animate:    { opacity: 1, x: 0 },
      exit:       { opacity: 0, x: 80 },
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  },
  {
    id: 3,
    src: "/images/banners/banner2.png",
    alt: "Team Spirit Uniforms",
    animation: {
      initial:    { opacity: 0, y: -60 },
      animate:    { opacity: 1, y: 0 },
      exit:       { opacity: 0, y: 60 },
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function PremiumDropdown({ icon: Icon, placeholder, options, value, onChange }) {
  const [open, setOpen]   = useState(false);
  const ref               = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-xl px-4 py-3 text-left text-sm font-medium border border-white/10 hover:border-primary/50 transition-all duration-300 group"
        style={{ minHeight: "52px" }}
      >
        {Icon && (
          <Icon
            size={17}
            className="text-primary group-hover:scale-110 transition-transform flex-shrink-0"
          />
        )}
        <span className={`flex-1 truncate text-sm ${value ? "text-white" : "text-gray-400"}`}>
          {value || placeholder}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={15} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 z-[200] overflow-hidden"
            style={{ maxHeight: "240px", overflowY: "auto" }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-150 flex items-center justify-between ${
                  value === opt
                    ? "bg-primary/20 text-primary"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="truncate">{opt}</span>
                {value === opt && <Check size={13} className="text-primary flex-shrink-0 ml-2" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Background Carousel ──────────────────────────────────────────────────────
function AutoScrollCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused]             = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setCurrentIndex((i) => (i + 1) % BANNER_IMAGES.length),
      3000
    );
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        {BANNER_IMAGES.map(
          (img, idx) =>
            idx === currentIndex && (
              <motion.div key={img.id} {...img.animation} className="absolute inset-0">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="100vw"
                  quality={90}
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {BANNER_IMAGES.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? "w-7 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const router                          = useRouter();
  const [segment, setSegment]           = useState("");
  const [sport, setSport]               = useState("");
  const [apparel, setApparel]           = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = segment && sport && apparel;

  const handleSubmit = () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(
        `/products?segment=${encodeURIComponent(segment)}&sport=${encodeURIComponent(sport)}&apparel=${encodeURIComponent(apparel)}`
      );
    }, 500);
  };

  return (
    /* 
      KEY FIX: h-screen + overflow-hidden on the section itself
      prevents any scrollbar from appearing on any screen size.
    */
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background */}
      <AutoScrollCarousel />

      {/* ── Content — centred inside full viewport height ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto"
        >
          {/* Glass card */}
          <div className="relative rounded-2xl overflow-visible">
            {/* Glass bg layers */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
            <div className="absolute inset-0 rounded-2xl border border-white/10" />

            {/* ── DESKTOP (md+) ── */}
            <div className="hidden md:block relative px-8 py-8 lg:px-10 lg:py-9">

              {/* Heading */}
              <motion.div
                className="text-center mb-7"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="font-bold text-white leading-tight">
                  {/* Responsive font sizes — never overflow */}
                  <span className="block text-3xl lg:text-4xl xl:text-5xl">
                    Create Your
                  </span>
                  <span
                    className="block text-3xl lg:text-4xl xl:text-5xl mt-1
                      bg-[linear-gradient(to_bottom,#FFF9C4,#FFD54F,#FF9800,#E65100)]
                      bg-clip-text text-transparent
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                  >
                    Custom Sportswear
                  </span>
                </h1>
              </motion.div>

              {/* Form row */}
              <div className="grid grid-cols-4 gap-3">
                <PremiumDropdown
                  icon={Briefcase}
                  placeholder="Select Segment"
                  options={SEGMENTS}
                  value={segment}
                  onChange={setSegment}
                />
                <PremiumDropdown
                  icon={Medal}
                  placeholder="Select Sport"
                  options={SPORTS}
                  value={sport}
                  onChange={setSport}
                />
                <PremiumDropdown
                  icon={Palette}
                  placeholder="Select Apparel"
                  options={APPAREL}
                  value={apparel}
                  onChange={setApparel}
                />

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full rounded-xl font-semibold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFormValid && !isSubmitting
                      ? "bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:shadow-primary/30 cursor-pointer"
                      : "bg-gray-600/40 cursor-not-allowed opacity-50"
                  }`}
                  style={{ minHeight: "52px" }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <span>Get Started</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Hint */}
              <AnimatePresence>
                {!isFormValid && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-center text-primary/70 mt-4"
                  >
                    Complete all fields to start your custom design journey
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Trust badges — only shown when form valid */}
              <AnimatePresence>
                {isFormValid && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400"
                  >
                    {["Premium Quality", "Free Design Support", "Quick Delivery"].map((t) => (
                      <span key={t} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {t}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── MOBILE (< md) ── */}
            <div className="md:hidden relative px-5 py-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="font-bold text-white leading-tight mb-6">
                  <span className="block text-2xl sm:text-3xl">Create Your</span>
                  <span
                    className="block text-2xl sm:text-3xl mt-1
                      bg-[linear-gradient(to_bottom,#FFF9C4,#FFD54F,#FF9800,#E65100)]
                      bg-clip-text text-transparent
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                  >
                    Custom Sportswear
                  </span>
                </h1>

                {/* Mobile dropdowns stacked */}
                <div className="space-y-3 mb-5">
                  <PremiumDropdown
                    icon={Briefcase}
                    placeholder="Select Segment"
                    options={SEGMENTS}
                    value={segment}
                    onChange={setSegment}
                  />
                  <PremiumDropdown
                    icon={Medal}
                    placeholder="Select Sport"
                    options={SPORTS}
                    value={sport}
                    onChange={setSport}
                  />
                  <PremiumDropdown
                    icon={Palette}
                    placeholder="Select Apparel"
                    options={APPAREL}
                    value={apparel}
                    onChange={setApparel}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFormValid && !isSubmitting
                      ? "bg-gradient-to-r from-primary to-secondary hover:shadow-xl cursor-pointer"
                      : "bg-gray-600/40 cursor-not-allowed opacity-50"
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <span>Get Started</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>

                {!isFormValid && (
                  <p className="text-xs text-primary/70 mt-3">
                    Complete all fields to continue
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}