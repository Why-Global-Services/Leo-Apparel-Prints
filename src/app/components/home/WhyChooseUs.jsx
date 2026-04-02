"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wind, Zap, ShieldCheck, Activity } from "lucide-react";

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
    <section className="w-full bg-[#f6f7f7] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── IMAGE — left on desktop only, below content on mobile & tablet ── */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1"
        >
          <div className="rounded-[30px] overflow-hidden">
            <Image
              src="/images/icons/why.png"
              alt="LEO CULT Sportswear"
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Logo badge */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
            <Image
              src="/images/icons/logo.png"
              alt="LEO CULT Logo"
              width={370}
              height={200}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* ── CONTENT — right on desktop only, above image on mobile & tablet ── */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2"
        >
          {/* Eyebrow */}
          <p className="text-primary font-semibold mb-3">
            Why Choose LEO CULT Sportswear?
          </p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-900 font-black
                       leading-[1.1] sm:leading-tight lg:leading-[0.95]
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                       tracking-tight"
          >
            When You{" "}
            <span className="text-primary">Need</span>{" "}
            It Most{" "}
            Peak{" "}
            <span className="text-primary">Performance Gear</span>
          </motion.h2>

          {/* Description */}
          <p className="text-gray-500 mt-6 leading-relaxed">
            Designed for athletes who demand more. Our sportswear combines
            breathable fabrics, precision fit, and long-lasting durability
            to keep you performing at your best every day.
          </p>

          {/* Features */}
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
                  className="w-12 h-12 flex items-center justify-center rounded-xl
                             bg-primary/10 text-primary shadow-lg
                             transition-all duration-300
                             group-hover:bg-primary group-hover:text-white group-hover:scale-110"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{title}</h4>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}