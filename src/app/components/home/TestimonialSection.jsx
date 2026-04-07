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

const DATA = [
  { name: "Rahul", role: "Cricket Player", img: "https://i.pravatar.cc/150?img=1" },
  { name: "Arjun", role: "Football Player", img: "https://i.pravatar.cc/150?img=2" },
  { name: "Vikram", role: "Gym Trainer", img: "https://i.pravatar.cc/150?img=3" },
  { name: "Karthik", role: "Runner", img: "https://i.pravatar.cc/150?img=4" },
  { name: "Suresh", role: "Athlete", img: "https://i.pravatar.cc/150?img=5" },
];

function getVisible(width) {
  if (width >= 960) return 3;
  if (width >= 640) return 2;
  return 1;
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
    <section className="w-full bg-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-[#003E9B] text-[10px] font-black tracking-[0.38em] uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            What Athletes Say About Us
          </h2>
        </div>

        {/* CARDS + SIDE ARROWS WRAPPER */}
        <div className="relative flex items-center gap-2 sm:gap-4">

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            disabled={start === 0}
            className="shrink-0 bg-[#003E9B] text-white w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow hover:scale-110 transition disabled:opacity-30 disabled:scale-100"
          >
            <FaChevronLeft size={14} />
          </button>

          {/* CARDS GRID */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 pb-4">
            <AnimatePresence mode="wait">
              {DATA.slice(start, start + visible).map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ scale: 1.04 }}
                  className="relative rounded-2xl border-2 border-[#003E9B] shadow-md bg-white"
                >
                  {/* AVATAR */}
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#003E9B] p-[4px]">
                      <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-[58px] h-[58px] rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="pt-10 pb-6 px-5 text-center">
                    <h4 className="text-[#003E9B] font-bold text-base mb-2">
                      LEO CULT Sportswear
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      LEO CULT Sportswear delivers premium comfort, durability, and
                      performance for athletes who push limits daily.
                    </p>
                    <p className="font-semibold text-sm text-black">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            disabled={start + visible >= DATA.length}
            className="shrink-0 bg-[#003E9B] text-white w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow hover:scale-110 transition disabled:opacity-30 disabled:scale-100"
          >
            <FaChevronRight size={14} />
          </button>

        </div>
      </div>
    </section>
  );
}