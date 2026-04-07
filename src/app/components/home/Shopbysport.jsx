"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, Award, Sparkles } from "lucide-react";
import { useRef } from "react";

const SPORTS = [
  {
    id: "soccer",
    name: "SOCCER",
    href: "/sports/soccer",
    src: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=500&fit=crop",
    features: ["Breathable", "Lightweight", "Quick Dry"]
  },
  {
    id: "badminton",
    name: "BADMINTON",
    href: "/sports/badminton",
    src: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop",
    features: ["Quick Dry", "Stretch Fit", "Lightweight"]
  },
  {
    id: "cricket",
    name: "CRICKET",
    desc: "Test whites to T20 kits. Full team customization with name & number printing.",
    cta: "Explore Cricket Collection",
    href: "/sports/cricket",
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=800&fit=crop",
    features: ["Custom Names", "Numbers", "Premium Fabrics"]
  },
  {
    id: "tennis",
    name: "TENNIS",
    href: "/sports/tennis",
    src: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=500&fit=crop",
    features: ["UV Protection", "Moisture Wicking", "Lightweight"]
  },
  {
    id: "pickleball",
    name: "PICKLEBALL",
    href: "/sports/pickleball",
    src: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop",
    features: ["Durable", "Professional Grade", "Quick Dry"]
  },
];

export default function ShopBySport() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const leftSports = SPORTS.filter((s) => ["soccer", "badminton"].includes(s.id));
  const centerSport = SPORTS.find((s) => s.id === "cricket");
  const rightSports = SPORTS.filter((s) => ["tennis", "pickleball"].includes(s.id));

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-b from-gray-50 to-white py-20 px-4 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-red-100/40 to-orange-100/40 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">

        {/* ─── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-12 h-0.5 bg-gradient-to-r from-accent  to-[#003E9B]"
            />
            <span className="text-xs font-bold tracking-[0.2em] text-[#003E9B] uppercase flex items-center gap-1">
              <Sparkles size={12} />
              Custom Sports Apparel
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-12 h-0.5 bg-gradient-to-r from-accent  to-[#003E9B]"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            <span className="text-gray-900">SHOP BY </span>
            <span className="relative inline-block">
              <span className="absolute inset-0 " />
             <span className="relative inline-block">

  {/* Glow Layer (secondary color) */}
  <span className="
    absolute inset-0 
    text-secondary 
    blur-[6px] opacity-60
  ">
    LEO CULT
  </span>

  {/* Main Text */}
  <span className="
    relative  text-primary
  ">
    LEO CULT
  </span>

</span>
            </span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover premium custom sportswear tailored for your sport. Professional quality, personalized design.
          </p>
        </motion.div>

        {/* ─── Three Column Layout: Left (2 cards) | Center (Long) | Right (2 cards) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          
          {/* Left Column - Two Cards Stacked */}
          <div className="lg:col-span-3 space-y-6">
            {leftSports.map((sport, i) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                style={{ height: "250px" }}
              >
                <img
                  src={sport.src}
                  alt={sport.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-2xl font-black text-white mb-2">
                    {sport.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {sport.features.map((feature, idx) => (
                      <span key={idx} className="text-white/70 text-xs">
                        {idx > 0 && "•"} {feature}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={sport.href}
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-all group/link"
                  >
                    <span>Explore</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Column - Long Image */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
            style={{ height: "520px" }}
          >
            <img
              src={centerSport.src}
              alt={centerSport.name}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-3">
                {centerSport.name}
              </h3>
              <p className="text-white/80 text-sm mb-4 max-w-md leading-relaxed">
                {centerSport.desc}
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {centerSport.features.map((feature, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
                          
              <Link
              href="/products"
              className="group relative inline-flex items-center justify-center gap-2
  bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1E3A8A]
  hover:from-[#1E3A8A] hover:via-[#0284C7] hover:to-[#0EA5E9]
  text-white font-extrabold
  text-xs sm:text-sm px-6 py-3 rounded-xl
  transition-all duration-500 shadow-md
  hover:shadow-[0_0_15px_rgba(14,165,233,0.6)]
  w-full sm:w-auto overflow-hidden"
>
              {/* Shine Layer */}
              <span
                className="absolute inset-0 
                bg-gradient-to-r from-transparent via-white/30 to-transparent 
                translate-x-[-100%] 
                group-hover:translate-x-[100%] 
                transition-transform duration-1000 ease-out"
              />

              {/* Text */}
              <span className="relative z-10">Customize Now</span>

              {/* Arrow */}
              <svg
                className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 14 14"
                fill="none"
              >
               <path
              d="M2 7h10M8 3.5L11.5 7 8 10.5"
              stroke="#F5B800"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 4px #F5B800)",
              }}
            />
              </svg>
            </Link>
            </div>
          </motion.div>

          {/* Right Column - Two Cards Stacked */}
          <div className="lg:col-span-3 space-y-6">
            {rightSports.map((sport, i) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                style={{ height: "250px" }}
              >
                <img
                  src={sport.src}
                  alt={sport.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 right-0 left-0 p-5">
                  <h3 className="text-2xl font-black text-white mb-2 text-right">
                    {sport.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3 justify-end">
                    {sport.features.map((feature, idx) => (
                      <span key={idx} className="text-white/70 text-xs">
                        {feature}{idx < sport.features.length - 1 && " •"}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={sport.href}
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-all group/link float-right"
                  >
                    <span>Explore</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Stats & CTA Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-200"
        >
          {/* Stats */}
          <div className="flex items-center gap-6 text-sm overflow-x-auto whitespace-nowrap w-full pb-3 scrollbar-hide">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center">
                <TrendingUp size={18} className="text-red-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">40,000+</div>
                <div className="text-gray-500 text-xs">Teams Kitted Worldwide</div>
              </div>
            </div>
            
            <div className="w-px h-8 bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                <Clock size={18} className="text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">10-Day</div>
                <div className="text-gray-500 text-xs">Delivery Guarantee</div>
              </div>
            </div>
            
            <div className="w-px h-8 bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                <Award size={18} className="text-purple-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Free Design</div>
                <div className="text-gray-500 text-xs">On Every Order</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
       <Link
  href="/products"
className="group relative inline-flex items-center justify-center gap-2
bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1E3A8A]
hover:from-[#1E3A8A] hover:via-[#0284C7] hover:to-[#0EA5E9]
text-white font-extrabold
text-xs sm:text-sm px-6 py-3 rounded-xl
transition-all duration-500 shadow-md
hover:shadow-[0_0_15px_rgba(14,165,233,0.6)]
whitespace-nowrap
overflow-hidden"
>
  {/* Shine Layer */}
  <span
    className="absolute inset-0 
    bg-gradient-to-r from-transparent via-white/30 to-transparent 
    translate-x-[-100%] 
    group-hover:translate-x-[100%] 
    transition-transform duration-1000 ease-out"
  />

  {/* Text */}
  <span className="relative z-10">Customize Now</span>

  {/* Arrow */}
  <svg
    className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
    viewBox="0 0 14 14"
    fill="none"
  >
   <path
  d="M2 7h10M8 3.5L11.5 7 8 10.5"
  stroke="#F5B800"
  strokeWidth="1.8"
  strokeLinecap="round"
  strokeLinejoin="round"
  style={{
    filter: "drop-shadow(0 0 4px #F5B800)",
  }}
/>
  </svg>
</Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}