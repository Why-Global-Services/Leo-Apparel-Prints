// "use client";

// import { useState, useEffect } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const DATA = [
//   { name: "Rahul", role: "Cricket Player", img: "https://i.pravatar.cc/150?img=1" },
//   { name: "Arjun", role: "Football Player", img: "https://i.pravatar.cc/150?img=2" },
//   { name: "Vikram", role: "Gym Trainer", img: "https://i.pravatar.cc/150?img=3" },
//   { name: "Karthik", role: "Runner", img: "https://i.pravatar.cc/150?img=4" },
//   { name: "Suresh", role: "Athlete", img: "https://i.pravatar.cc/150?img=5" },
// ];

// function getVisible(width) {
//   if (width >= 960) return 3;
//   if (width >= 640) return 2;
//   return 1;
// }

// export default function TestimonialSection() {
//   const [start, setStart] = useState(0);
//   const [visible, setVisible] = useState(3);

//   useEffect(() => {
//     const update = () => {
//       const v = getVisible(window.innerWidth);
//       setVisible(v);
//       setStart((s) => Math.min(s, Math.max(0, DATA.length - v)));
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   const prev = () => setStart((s) => Math.max(0, s - 1));
//   const next = () => setStart((s) => Math.min(s + 1, DATA.length - visible));

//   return (
//     <section className="w-full bg-white py-12 px-4 sm:px-6">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <div className="text-center mb-14">
//           <p className="text-primary text-[10px] font-black tracking-[0.38em] uppercase mb-4">
//             How It Works
//           </p>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
//             What Athletes Say About Us
//           </h2>
//         </div>

//         {/* CARDS + SIDE ARROWS WRAPPER */}
//         <div className="relative flex items-center gap-2 sm:gap-4">

//           {/* LEFT ARROW */}
//           <button
//             onClick={prev}
//             disabled={start === 0}
//             className="shrink-0 bg-primary text-white w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow hover:scale-110 transition disabled:opacity-30 disabled:scale-100"
//           >
//             <FaChevronLeft size={14} />
//           </button>

//           {/* CARDS GRID */}
//           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 pb-4">
//             <AnimatePresence mode="wait">
//               {DATA.slice(start, start + visible).map((item) => (
//                 <motion.div
//                   key={item.name}
//                   initial={{ opacity: 0, x: 60 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -60 }}
//                   transition={{ duration: 0.35 }}
//                   whileHover={{ scale: 1.04 }}
//                   className="relative rounded-2xl border-2 border-yellow-400 shadow-md bg-white"
//                 >
//                   {/* AVATAR */}
//                   <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
//                     <div className="w-[72px] h-[72px] rounded-full bg-yellow-400 p-[4px]">
//                       <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
//                         <img
//                           src={item.img}
//                           alt={item.name}
//                           className="w-[58px] h-[58px] rounded-full object-cover"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* CARD BODY */}
//                   <div className="pt-10 pb-6 px-5 text-center">
//                     <h4 className="text-primary font-bold text-base mb-2">
//                       LEO CULT Sportswear
//                     </h4>
//                     <p className="text-gray-500 text-sm leading-relaxed mb-4">
//                       LEO CULT Sportswear delivers premium comfort, durability, and
//                       performance for athletes who push limits daily.
//                     </p>
//                     <p className="font-semibold text-sm text-secondary">{item.name}</p>
//                     <p className="text-xs text-gray-500">{item.role}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           {/* RIGHT ARROW */}
//           <button
//             onClick={next}
//             disabled={start + visible >= DATA.length}
//             className="shrink-0 bg-primary text-white w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow hover:scale-110 transition disabled:opacity-30 disabled:scale-100"
//           >
//             <FaChevronRight size={14} />
//           </button>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const DATA = [
  { name: "Rahul", role: "Cricket Player", img: "https://i.pravatar.cc/150?img=1" },
  { name: "Arjun", role: "Football Player", img: "https://i.pravatar.cc/150?img=2" },
  { name: "Vikram", role: "Gym Trainer", img: "https://i.pravatar.cc/150?img=3" },
  { name: "Karthik", role: "Runner", img: "https://i.pravatar.cc/150?img=4" },
  { name: "Suresh", role: "Athlete", img: "https://i.pravatar.cc/150?img=5" },
];

function getVisible(width) {
  if (width >= 1024) return 3;  // lg screens
  if (width >= 768) return 2;   // md screens
  if (width >= 640) return 2;   // sm screens
  return 1;                      // mobile
}

export default function TestimonialSection() {
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      const v = getVisible(window.innerWidth);
      setVisible(v);
      setStart((s) => Math.min(s, Math.max(0, DATA.length - v)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(s + 1, DATA.length - visible));

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="text-primary-blue text-[10px] sm:text-[11px] font-black tracking-[0.38em] uppercase mb-3 sm:mb-4 font-secondary">
            Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black font-primary">
            What Athletes Say <span className="text-primary">About Us</span>
          </h2>
        </div>

        {/* CARDS + SIDE ARROWS WRAPPER */}
        <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4">

          {/* LEFT ARROW - Using btn class */}
          <button
            onClick={prev}
            disabled={start === 0}
            className="btn btn-secondary btn-md rounded-full !p-0 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed z-10"
            aria-label="Previous testimonials"
          >
            <FaChevronLeft size={14} className="sm:w-4 sm:h-4" />
          </button>

          {/* CARDS GRID */}
          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-10 pb-4">
              <AnimatePresence mode="wait">
                {DATA.slice(start, start + visible).map((item, index) => (
                  <motion.div
                    key={item.name + index}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.35, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative rounded-2xl border-2 border-primary-blue shadow-md bg-white transition-all duration-300 hover:shadow-xl"
                  >
                    {/* AVATAR */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
                      <div className="w-[70px] h-[70px] sm:w-[72px] sm:h-[72px] rounded-full bg-primary-blue p-[3px] sm:p-[4px]">
                        <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-[56px] h-[56px] sm:w-[58px] sm:h-[58px] rounded-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CARD BODY */}
                    <div className="pt-10 sm:pt-12 pb-5 sm:pb-6 px-4 sm:px-5 text-center">
                      <h4 className="text-primary-blue font-bold text-sm sm:text-base mb-2 font-primary">
                        LEO CULT Sportswear
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-secondary">
                        LEO CULT Sportswear delivers premium comfort, durability, and
                        performance for athletes who push limits daily.
                      </p>
                      <p className="font-semibold text-sm sm:text-base text-gray-900 font-primary">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 font-secondary">
                        {item.role}
                      </p>
                    </div>

                    {/* Quote Icon */}
                    <div className="absolute bottom-3 right-3 opacity-10">
                      <svg className="w-8 h-8 text-primary-blue" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT ARROW - Using btn class */}
          <button
            onClick={next}
            disabled={start + visible >= DATA.length}
            className="btn btn-secondary btn-md rounded-full !p-0 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed z-10"
            aria-label="Next testimonials"
          >
            <FaChevronRight size={14} className="sm:w-4 sm:h-4" />
          </button>

        </div>

        {/* Dots indicator for mobile */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {Array.from({ length: DATA.length - visible + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStart(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                start === idx ? "w-6 bg-primary-blue" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <a href="/testimonials" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-500 transition-all">
            View All Testimonials
          </a>
        </div>

      </div>
    </section>
  );
}