// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Wind, Zap, ShieldCheck, Activity } from "lucide-react";

// const FEATURES = [
//   {
//     icon: Wind,
//     title: "Breathable Fabric",
//     desc: "Moisture-wicking material for comfort.",
//   },
//   {
//     icon: Zap,
//     title: "High Performance",
//     desc: "Built for speed and endurance.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Durable Quality",
//     desc: "Strong stitching and long life.",
//   },
//   {
//     icon: Activity,
//     title: "Ultimate Comfort",
//     desc: "Flexible and ergonomic fit.",
//   },
// ];

// export default function WhyChooseUs() {
//   return (
//     <section className="w-full bg-[#f6f7f7] py-16 px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//         {/* ── IMAGE — left on desktop only, below content on mobile & tablet ── */}
//         <motion.div
//           initial={{ opacity: 0, x: -80 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="relative order-2 lg:order-1"
//         >
//           <div className="rounded-[30px] overflow-hidden">
//             <Image
//               src="/images/icons/why.png"
//               alt="LEO CULT Sportswear"
//               width={500}
//               height={600}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Logo badge */}
//           <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
//             <Image
//               src="/images/icons/logo.png"
//               alt="LEO CULT Logo"
//               width={370}
//               height={200}
//               className="object-contain"
//             />
//           </div>
//         </motion.div>

//         {/* ── CONTENT — right on desktop only, above image on mobile & tablet ── */}
//         <motion.div
//           initial={{ opacity: 0, x: 80 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="order-1 lg:order-2"
//         >
//           {/* Eyebrow */}
//           <p className="text-[#003E9B] font-semibold mb-3">
//             Why Choose LEO CULT Sportswear?
//           </p>

//           {/* Headline */}
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-gray-900 font-black
//                        leading-[1.1] sm:leading-tight lg:leading-[0.95]
//                        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
//                        tracking-tight"
//           >
//             When You{" "}
//             <span className="text-primary">Need</span>{" "}
//             It Most{" "}
//             Peak{" "}
//             <span className="text-primary">Performance Gear</span>
//           </motion.h2>

//           {/* Description */}
//           <p className="text-gray-500 mt-6 leading-relaxed">
//             Designed for athletes who demand more. Our sportswear combines
//             breathable fabrics, precision fit, and long-lasting durability
//             to keep you performing at your best every day.
//           </p>

//           {/* Features */}
//           <div className="grid grid-cols-2 gap-8 mt-10">
//             {FEATURES.map(({ icon: Icon, title, desc }, i) => (
//               <motion.div
//                 key={title}
//                 initial={{ opacity: 0, y: 16 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
//                 whileHover={{ y: -5 }}
//                 className="flex gap-4 items-start group"
//               >
//                 <div
//                   className="w-12 h-12 flex items-center justify-center rounded-xl
//                              bg-primary/10 text-primary shadow-lg
//                              transition-all duration-300
//                              group-hover:bg-primary group-hover:text-white group-hover:scale-110"
//                 >
//                   <Icon className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-800">{title}</h4>
//                   <p className="text-sm text-gray-500">{desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wind, Zap, ShieldCheck, Activity } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Wind,
    title: "Breathable Fabric",
    desc: "Moisture-wicking material for comfort.",
  },
  {
    icon: Zap,
    title: "High Performance",
    desc: "Built for speed and endurance.",
  },
  {
    icon: ShieldCheck,
    title: "Durable Quality",
    desc: "Strong stitching and long life.",
  },
  {
    icon: Activity,
    title: "Ultimate Comfort",
    desc: "Flexible and ergonomic fit.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#f6f7f7] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Mobile Layout (default) */}
        <div className="lg:hidden">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <p className="text-primary-blue font-bold mb-2 sm:mb-3 text-sm sm:text-base font-secondary text-center">
              Why Choose LEO CULT Sportswear?
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-900 font-black font-primary
                         leading-[1.2] sm:leading-[1.15]
                         text-3xl sm:text-4xl
                         tracking-tight text-center"
            >
              When You{" "}
              <span className="text-primary">Need</span>{" "}
              It Most{" "}
              Peak{" "}
              <span className="text-primary whitespace-nowrap">Performance Gear</span>
            </motion.h2>

            <p className="text-gray-600 mt-4 sm:mt-6 leading-relaxed text-sm sm:text-base font-secondary text-center max-w-2xl mx-auto">
              Designed for athletes who demand more. Our sportswear combines
              breathable fabrics, precision fit, and long-lasting durability
              to keep you performing at your best every day.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-8 sm:mt-10">
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="flex gap-3 sm:gap-4 items-start group"
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center rounded-xl
                               bg-primary/10 text-primary shadow-lg
                               transition-all duration-300
                               group-hover:bg-primary group-hover:text-white group-hover:scale-110"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base font-primary">
                      {title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 font-secondary">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button - Centered */}
            <div className="flex justify-center mt-8 sm:mt-10">
            <Link
              href="/products"
              className="btn btn-gradient btn-md btn-shine inline-flex items-center gap-2 cursor-pointer"
            >
              Shop Now
              <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none">
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
          </motion.div>

          {/* Image Section - Full width on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-8 md:mt-12"
          >
            <div className="rounded-[30px] overflow-hidden max-w-2xl mx-auto">
              <Image
                src="/images/icons/why.png"
                alt="LEO CULT Sportswear"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-2">
              <Image
                src="/images/icons/logo.png"
                alt="LEO CULT Logo"
                width={370}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className="hidden lg:flex lg:flex-row lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:w-1/2"
          >
            <div className="rounded-[30px] overflow-hidden">
              <Image
                src="/images/icons/why.png"
                alt="LEO CULT Sportswear"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-2">
              <Image
                src="/images/icons/logo.png"
                alt="LEO CULT Logo"
                width={370}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <p className="text-primary-blue font-semibold mb-3 text-base font-secondary">
              Why Choose LEO CULT Sportswear?
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-900 font-black font-primary
                         leading-[1.05]
                         text-5xl xl:text-6xl
                         tracking-tight"
            >
              When You{" "}
              <span className="text-primary">Need</span>{" "}
              It Most{" "}
              Peak{" "}
              <span className="text-primary whitespace-nowrap">Performance Gear</span>
            </motion.h2>

            <p className="text-gray-600 mt-6 leading-relaxed text-base font-secondary">
              Designed for athletes who demand more. Our sportswear combines
              breathable fabrics, precision fit, and long-lasting durability
              to keep you performing at your best every day.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-10">
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="flex gap-4 items-start group"
                >
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl
                               bg-primary/10 text-primary shadow-lg
                               transition-all duration-300
                               group-hover:bg-primary group-hover:text-white group-hover:scale-110"
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base font-primary">
                      {title}
                    </h4>
                    <p className="text-sm text-gray-500 font-secondary">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop CTA Button - Centered */}
            <div className="flex justify-center mt-10">
                   <Link
              href="/products"
              className="btn btn-gradient btn-md btn-shine inline-flex items-center gap-2 cursor-pointer"
            >
              Shop Now
              <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none">
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
          </motion.div>
        </div>

      </div>
    </section>
  );
}