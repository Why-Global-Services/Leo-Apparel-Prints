"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "@/lib/axios";

// Static fallback data matching the old avatar-card style
const staticTestimonials = [
  { _id: "s1", customerName: "Rahul", role: "Cricket Player", profileImage: "https://i.pravatar.cc/150?img=1", reviewMessage: "LEO CULT Sportswear delivers premium comfort, durability, and performance for athletes who push limits daily." },
  { _id: "s2", customerName: "Arjun", role: "Football Player", profileImage: "https://i.pravatar.cc/150?img=2", reviewMessage: "Outstanding quality and craftsmanship. Our team loved every piece — the fit, the feel, and the look are all top-notch." },
  { _id: "s3", customerName: "Vikram", role: "Gym Trainer", profileImage: "https://i.pravatar.cc/150?img=3", reviewMessage: "I've never felt more confident in my workout gear. LEO CULT combines style and performance beautifully." },
  { _id: "s4", customerName: "Karthik", role: "Runner", profileImage: "https://i.pravatar.cc/150?img=4", reviewMessage: "Breathable, durable, and stunning design. Exactly what a runner needs for daily training and race days." },
  { _id: "s5", customerName: "Suresh", role: "Athlete", profileImage: "https://i.pravatar.cc/150?img=5", reviewMessage: "World-class sportswear at fair prices. I recommend LEO CULT to every serious athlete I know." },
];

function getVisible(width) {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

export default function TestimonialSection() {
  const [start, setStart]           = useState(0);
  const [visible, setVisible]       = useState(3);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading]       = useState(true);

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      const v = getVisible(window.innerWidth);
      setVisible(v);
      setStart((s) => Math.min(s, Math.max(0, testimonials.length - v)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [testimonials.length]);

  // Fetch from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosClient.get("/v1/user/testimonials");
        const approved = response.data?.data || [];

        // Map backend fields to card fields
        const mapped = approved.map((t) => ({
          _id: t._id,
          customerName: t.customerName,
          role: t.role || "Customer",
          profileImage: t.profileImage || null,
          reviewMessage: t.reviewMessage,
        }));

        let toShow = [...mapped];
        if (mapped.length < 5) {
          toShow = [...mapped, ...staticTestimonials.slice(0, 5 - mapped.length)];
        }

        setTestimonials(toShow);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
        setTestimonials(staticTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(s + 1, testimonials.length - visible));

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

        {/* CARDS + ARROWS WRAPPER */}
        <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4">

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            disabled={start === 0}
            className="btn btn-secondary btn-md rounded-full !p-0 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed z-10"
            aria-label="Previous testimonials"
          >
            <FaChevronLeft size={14} />
          </button>

          {/* CARDS GRID */}
          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-10 pb-4">
              <AnimatePresence mode="wait">
                {loading
                  ? /* Skeleton placeholders */
                    [1, 2, 3].slice(0, visible).map((i) => (
                      <div
                        key={i}
                        className="relative rounded-2xl border-2 border-gray-100 shadow-md bg-white animate-pulse"
                        style={{ minHeight: "200px" }}
                      >
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-[72px] h-[72px] rounded-full bg-gray-200" />
                        <div className="pt-12 pb-6 px-5 text-center space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                          <div className="h-3 bg-gray-200 rounded w-full" />
                          <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
                          <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
                          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mt-4" />
                          <div className="h-3 bg-gray-200 rounded w-1/4 mx-auto" />
                        </div>
                      </div>
                    ))
                  : testimonials.slice(start, start + visible).map((item, index) => (
                      <motion.div
                        key={item._id + index}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.35, delay: index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="relative rounded-2xl border-2 border-primary-blue shadow-md bg-white transition-all duration-300 hover:shadow-xl"
                      >
                        {/* AVATAR — floating above card */}
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
                          <div className="w-[70px] h-[70px] sm:w-[72px] sm:h-[72px] rounded-full bg-primary-blue p-[3px] sm:p-[4px]">
                            <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                              {item.profileImage ? (
                                <img
                                  src={item.profileImage}
                                  alt={item.customerName}
                                  className="w-[56px] h-[56px] sm:w-[58px] sm:h-[58px] rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-primary-blue font-bold text-xl">
                                  {item.customerName?.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* CARD BODY */}
                        <div className="pt-10 sm:pt-12 pb-5 sm:pb-6 px-4 sm:px-5 text-center">
                          <h4 className="text-primary-blue font-bold text-sm sm:text-base mb-2 font-primary">
                            LEO CULT Sportswear
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-secondary">
                            {item.reviewMessage}
                          </p>
                          <p className="font-semibold text-sm sm:text-base text-gray-900 font-primary">
                            {item.customerName}
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

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            disabled={loading || start + visible >= testimonials.length}
            className="btn btn-secondary btn-md rounded-full !p-0 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed z-10"
            aria-label="Next testimonials"
          >
            <FaChevronRight size={14} />
          </button>

        </div>

        {/* Dots indicator for mobile */}
        {!loading && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {Array.from({ length: Math.max(0, testimonials.length - visible + 1) }).map((_, idx) => (
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
        )}

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <a href="/testimonials" className="btn btn-gradient btn-md btn-shine inline-flex">
            View All Testimonials
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
          </a>
        </div>

      </div>
    </section>
  );
}