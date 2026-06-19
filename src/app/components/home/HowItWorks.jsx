// "use client";

// import { motion, useInView } from "framer-motion";
// import Link from "next/link";
// import { useRef } from "react";

// const STEPS = [
//   {
//     number: "01",
//     label: "Select",
//     title: "Pick your product",
//     desc: "Jerseys, tees, or full team kits. Every style built for real competitive play.",
//   },
//   {
//     number: "02",
//     label: "Design",
//     title: "Build or bring your design",
//     desc: "Craft every detail in our live 3D studio — or drop in artwork you already have.",
//     highlight: true,
//   },
//   {
//     number: "03",
//     label: "Deliver",
//     title: "At your door in 10 days",
//     desc: "Manufactured in-house. Shipped globally. Arrive match-ready without delays.",
//   },
// ];

// const PERKS = [
//   { value: "50+", label: "Product styles" },
//   { value: "10", label: "Day delivery" },
//   { value: "4XL", label: "Size range" },
//   { value: "100%", label: "Custom" },
// ];

// const GUARANTEES = [
//   "Youth – 4XL sizing",
//   "Full design freedom",
//   "Repeat orders",
//   "10-day worldwide delivery",
// ];

// export default function HowItWorks() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <section
//       ref={ref}
//       className="w-full bg-white overflow-x-hidden font-[family-name:var(--font-dm-sans)]"
//     >
//       {/* ── TOP: Heading + Stats ── */}
//       <div className="w-full border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
//           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-8">

//             {/* Heading */}
//             <div className="lg:max-w-2xl">
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={inView ? { opacity: 1 } : {}}
//                 transition={{ duration: 0.4 }}
//                 className="text-primary text-[10px] sm:text-xs font-black tracking-[0.38em] uppercase mb-2 sm:mb-3"
//               >
//                 How It Works
//               </motion.p>

//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.55, delay: 0.07 }}
//                 className="text-gray-900 font-black leading-[1.1] sm:leading-tight lg:leading-[0.93]
//                            text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight"
//               >
//                 From idea
//                 <br />
//                 <span className="text-primary inline-block">to doorstep.</span>
//               </motion.h2>
//             </div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="flex flex-wrap gap-4 sm:gap-6 lg:gap-10"
//             >
//               {PERKS.map((p, i) => (
//                 <motion.div
//                   key={p.label}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={inView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
//                   className="flex flex-col items-center lg:items-start"
//                 >
//                   <span className="text-gray-900 font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter">
//                     {p.value}
//                   </span>
//                   <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap">
//                     {p.label}
//                   </span>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ── STEPS ── */}
//       <div className="w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-8">
//             {STEPS.map((step, i) => (
//               <motion.div
//                 key={step.number}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.55, delay: 0.15 + i * 0.13 }}
//                 className="relative group"
//               >
//                 {/* Number + Label */}
//                 <div className="flex items-center gap-3 mb-3">
//                   <span
//                     className={`font-black text-4xl sm:text-5xl tracking-tighter leading-none transition-colors ${
//                       step.highlight ? "text-primary" : "text-gray-200"
//                     }`}
//                   >
//                     {step.number}
//                   </span>
//                   <span
//                     className={`text-[8px] sm:text-[9px] font-black tracking-[0.28em] uppercase transition-colors ${
//                       step.highlight ? "text-primary" : "text-gray-300"
//                     }`}
//                   >
//                     {step.label}
//                   </span>
//                 </div>

//                 {/* Accent line */}
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={inView ? { width: 40 } : {}}
//                   transition={{ duration: 0.5, delay: 0.35 + i * 0.13 }}
//                   className={`h-0.5 mb-3 rounded-full ${
//                     step.highlight ? "bg-primary" : "bg-gray-200"
//                   }`}
//                   style={{ width: 40 }}
//                 />

//                 {/* Title */}
//                 <h3 className="text-gray-900 font-extrabold text-base sm:text-lg mb-1.5 leading-tight tracking-tight">
//                   {step.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
//                   {step.desc}
//                 </p>

//                 {/* Hover dot */}
//                 <div className="absolute -bottom-3 left-0 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── BOTTOM: Guarantees + CTAs ── */}
//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.5, delay: 0.6 }}
//         className="w-full border-t border-gray-100 bg-gray-50/50"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">

//             {/* Guarantee tags */}
//             <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
//               {GUARANTEES.map((g) => (
//                 <span
//                   key={g}
//                   className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-wide
//                              px-3 py-1.5 bg-white border border-gray-200 text-gray-600
//                              rounded-full whitespace-nowrap"
//                 >
//                   <span className="text-primary text-[10px]">✦</span>
//                   {g}
//                 </span>
//               ))}
//             </div>

//             {/* CTA buttons */}
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
//               <Link
//                 href="/products"
//                 className="group relative inline-flex items-center justify-center gap-2
//                            bg-primary hover:bg-primary/90 text-white font-extrabold
//                            text-xs sm:text-sm px-6 py-3 rounded-xl
//                            transition-all duration-300 w-full sm:w-auto overflow-hidden"
//               >
//                 <span className="relative z-10">Customize Now</span>
//                 <svg
//                   className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
//                   viewBox="0 0 14 14"
//                   fill="none"
//                 >
//                   <path
//                     d="M2 7h10M8 3.5L11.5 7 8 10.5"
//                     stroke="white"
//                     strokeWidth="1.8"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//               </Link>

//               <Link
//                 href="/bulk-enquiry"
//                 className="inline-flex items-center justify-center gap-2
//                            bg-white hover:bg-gray-50 text-gray-700 font-bold
//                            text-xs sm:text-sm px-6 py-3 rounded-xl
//                            border border-gray-200 transition-all duration-300 w-full sm:w-auto"
//               >
//                 Upload Design
//               </Link>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }


"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import CountUp from "react-countup";

const STEPS = [
  {
    number: "01",
    label: "Select",
    title: "Pick your product",
    desc: "Jerseys, tees, or full team kits. Every style built for real competitive play.",
  },
  {
    number: "02",
    label: "Design",
    title: "Build or bring your design",
    desc: "Craft every detail in our live 3D studio — or drop in artwork you already have.",
    highlight: true,
  },
  {
    number: "03",
    label: "Deliver",
    title: "At your door in 10 days",
    desc: "Manufactured in-house. Shipped globally. Arrive match-ready without delays.",
  },
];

const PERKS = [
  { end: 50,   suffix: "+", label: "Product styles", static: false },
  { end: 10,   suffix: "",  label: "Day delivery",   static: false },
  { end: null, suffix: "",  label: "Size range",     static: true, display: "4XL" },
  { end: 100,  suffix: "%", label: "Custom",         static: false },
];

const GUARANTEES = [
  "Youth – 4XL sizing",
  "Full design freedom",
  "Repeat orders",
  "10-day worldwide delivery",
];

// ─── Single Stat - Simple Style ──────────────────────────────────────────────
function StatItem({ perk, inView, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
      className="flex flex-col items-center"
    >
      {/* Number in primary blue color */}
      <span className="text-primary-blue font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tighter tabular-nums font-primary whitespace-nowrap">
        {perk.static ? (
          perk.display
        ) : (
          <CountUp
            start={0}
            end={perk.end}
            duration={2.2}
            suffix={perk.suffix}
            useEasing
            enableScrollSpy
            scrollSpyOnce
          />
        )}
      </span>
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap mt-0.5 font-secondary">
        {perk.label}
      </span>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HowItWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="w-full bg-white overflow-x-hidden font-secondary"
    >
      {/* ── TOP: Heading + Stats ── */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-8">

            {/* Heading */}
            <div className="lg:max-w-2xl">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="text-primary-blue text-[10px] sm:text-xs font-black tracking-[0.38em] uppercase mb-2 sm:mb-3 font-secondary"
              >
                How It Works
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.07 }}
                className="text-gray-900 font-black leading-[1.1] sm:leading-tight lg:leading-[0.93]
                           text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-primary"
              >
                From idea
                <br />
                <span className="text-primary inline-block">to doorstep.</span>
              </motion.h2>
            </div>

            {/* Stats - 2x2 Grid on Mobile, Single Row on Desktop */}
            <div className="w-full lg:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-end gap-4 sm:gap-6 lg:gap-8"
              >
                {PERKS.map((p, i) => (
                  <StatItem key={p.label} perk={p} inView={inView} index={i} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STEPS ── */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.13 }}
                className="relative group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`font-black text-4xl sm:text-5xl tracking-tighter leading-none transition-colors font-primary ${
                      step.highlight ? "text-primary-blue" : "text-primary-blue"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`text-[8px] sm:text-[9px] font-black tracking-[0.28em] uppercase transition-colors font-secondary ${
                      step.highlight ? "text-primary-blue" : "text-primary-blue"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: 40 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.13 }}
                  className={`h-0.5 mb-4 rounded-full ${
                    step.highlight ? "bg-primary-blue" : "bg-primary-blue"
                  }`}
                  style={{ width: 40 }}
                />

                <h3 className="text-gray-900 font-extrabold text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-3 leading-tight tracking-tight font-primary">
                  {step.title}
                </h3>
                
                <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed font-secondary">
                  {step.desc}
                </p>

                <div className="absolute -bottom-3 left-0 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM: Guarantees + CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full border-t border-gray-100 bg-gray-50/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">

            {/* Guarantee tags */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:flex md:flex-wrap md:max-w-none md:mx-0 justify-center lg:justify-start">
              {GUARANTEES.map((g) => (
                <span
                  key={g}
                  className="inline-flex items-center gap-1.5 text-[8px] md:text-xs font-bold tracking-wide
                             px-3 py-1.5 bg-white border border-gray-200 text-gray-600
                             rounded-full whitespace-nowrap font-secondary"
                >
                  <span className="text-primary text-[10px]">✦</span>
                  {g}
                </span>
              ))}
            </div>

            {/* CTAs with White Arrows */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <Link
                href="/products"
                className="btn btn-gradient btn-md btn-shine text-center inline-flex items-center justify-center gap-2"
              >
                <span>Customize Now</span>
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
              </Link>
              
              <Link
                href="/bulk-enquiry"
                className="btn btn-outline btn-md text-center inline-flex items-center justify-center gap-2 group"
              >
                <span>Upload Design</span>
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
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}