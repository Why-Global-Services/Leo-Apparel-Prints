// "use client";


// const FEATURES = [
//   {
//     title: "Inclusive Sizing",
//     desc: "Men, Women & Youth — XS to 4XL available",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M3 6h18M3 12h18M3 18h18" />
//         <rect x="1" y="3"  width="4" height="4" rx="1" />
//         <rect x="1" y="10" width="4" height="4" rx="1" />
//         <rect x="1" y="17" width="4" height="4" rx="1" />
//       </svg>
//     ),
//   },
//   {
//     title: "3D Design Tool",
//     desc: "Full design freedom with real-time digital sampling",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 2L2 7l10 5 10-5-10-5z" />
//         <path d="M2 17l10 5 10-5" />
//         <path d="M2 12l10 5 10-5" />
//       </svg>
//     ),
//   },
//   {
//     title: "Repeat-Order Ready",
//     desc: "Your custom design stays saved for quick reorders",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     ),
//   },
//   {
//     title: "10–12 Days Delivery",
//     desc: "Fast turnaround with end-to-end tracking",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="1" y="3" width="15" height="13" rx="1" />
//         <path d="M16 8h4l3 3v5h-7V8z" />
//         <circle cx="5.5"  cy="18.5" r="2.5" />
//         <circle cx="18.5" cy="18.5" r="2.5" />
//       </svg>
//     ),
//   },
// ];

// export default function FeatureBar() {
//   return (
//     <section className="bg-white border-t border-b border-[#f0e8d0] overflow-hidden">
//       {/* Gold shimmer bar */}
//       <div className="h-[3px] bg-gradient-to-r from-[#F5A623] via-[#ffd166] to-[#F5A623] bg-[length:200%_auto] animate-shimmer" />

//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#f0e8d0] divide-y lg:divide-y-0">
//           {FEATURES.map((feat, i) => (
//             <div
//               key={feat.title}
//               className="group flex items-center gap-4 px-6 py-7 lg:px-8 transition-colors duration-200 hover:bg-[#fffbf2] cursor-default"
//               style={{ animationDelay: `${i * 80}ms` }}
//             >
//               {/* Icon */}
//               <div className="w-[52px] h-[52px] rounded-[14px] border border-[#e8dfc8] bg-[#fdf8ef] flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-[#F5A623] group-hover:border-[#F5A623]">
//                 <span className="w-6 h-6 block stroke-[#1A1A2E] group-hover:stroke-white transition-colors duration-200">
//                   {feat.icon}
//                 </span>
//               </div>

//               {/* Text */}
//               <div>
//                 <p className="text-[14px] font-extrabold text-[#1A1A2E] leading-tight mb-1 tracking-tight">
//                   {feat.title}
//                 </p>
//                 <p className="text-[12px] text-gray-500 leading-relaxed">
//                   {feat.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    title: "Inclusive Sizing",
    desc: "Men, Women & Youth — XS to 4XL available",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
        <path d="M3 6h18M3 12h18M3 18h18" />
        <rect x="1" y="3" width="4" height="4" rx="1" />
        <rect x="1" y="10" width="4" height="4" rx="1" />
        <rect x="1" y="17" width="4" height="4" rx="1" />
      </svg>
    ),
  },
  {
    title: "3D Design Tool",
    desc: "Full design freedom with real-time digital sampling",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Repeat-Order Ready",
    desc: "Your custom design stays saved for quick reorders",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "10–12 Days Delivery",
    desc: "Fast turnaround with end-to-end tracking",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function FeatureBar() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex gap-4"
            >
              <div className="shrink-0">
                <div className="text-3xl font-bold text-[#003E9B]/20 group-hover:text-[#003E9B]/40 transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="w-10 h-10 mt-2 stroke-[#003E9B] group-hover:stroke-[#003E9B]/70">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#003E9B] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}