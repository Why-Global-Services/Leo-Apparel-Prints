"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [offerSent, setOfferSent] = React.useState(false);
  const currentYear = new Date().getFullYear();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      url: "https://wa.me/919087149666",
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={20} />,
      url: "https://www.facebook.com/people/Leo-Cult/61589660526471/",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={20} />,
      url: "https://www.instagram.com/_leo_cult_/?fbclid=IwY2xjawS5p1tleHRuA2FlbQIxMQBicmlkETFaQjFzeW1tczZ6RmxIU3BQc3J0YwZhcHBfaWQBMAABHrzBnLnv4kTXFJEyildjjUOE8ZQ5QT77IiH4p3HbAHGYiPluoJV-YTS1sPY0_aem_L60h9F0eCS_p9vfZFW0vRg",
    },
  ];

  return (
    <footer className="relative w-full bg-third overflow-hidden pt-3">
      {/* ── KINETIC TOP BAR ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden bg-primary py-2 select-none z-10">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-10"
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-third font-black italic text-[10px] tracking-widest uppercase font-primary"
            >
              LEO CULT PERFORMANCE • CUSTOM TEAMWEAR • FACTORY DIRECT • PREMIUM FABRICS •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-7 border-b border-white/10">
        {/* ── BRAND COLUMN ── */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 group">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-[900] text-white italic uppercase tracking-tight leading-none group-hover:text-primary transition-colors font-primary">
                LEO<span className="text-primary group-hover:text-white">CULT</span>
              </h2>
              <span className="text-[8px] text-primary font-semibold tracking-[0.3em] uppercase block font-secondary">
                Athletic Apparel Co.
              </span>
            </Link>
          </div>

          <p className="text-white font-normal text-xs leading-relaxed max-w-[280px] opacity-80 font-secondary">
            PREMIUM CUSTOM SPORTSWEAR FOR ELITE ATHLETES. DESIGN YOUR IDENTITY, WE BUILD THE PERFORMANCE.
          </p>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#F4A300",
                  color: "#0F4C81",
                  boxShadow: "0px 10px 20px rgba(244, 163, 0, 0.2)",
                }}
                className="w-12 h-12 border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all duration-300 bg-white/5 p-2 hover:text-primary"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── SHOP CATEGORIES ── */}
        <div className="space-y-6">
          <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase font-primary">
            Collections
          </h4>
          <ul className="space-y-3">
            {[
              "Football Kits",
              "Basketball Gear",
              "Training Wear",
              "Tracksuits",
              "Accessories",
            ].map((link) => (
              <li key={link}>
                <Link
                  href="#"
                  className="text-white font-medium text-xs uppercase hover:text-primary transition-all tracking-tight flex items-center gap-2 group font-secondary"
                >
                  <span className="w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-4" />
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── SERVICES ── */}
        <div className="space-y-6">
          <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase font-primary">
            Services
          </h4>
          <ul className="space-y-3">
            {[
              { label: "Custom Designer", href: "/bulk-enquiry" },
              { label: "Bulk Orders", href: "/bulk-enquiry" },
              { label: "Size Guide", href: "/size-guide" },
              { label: "Shipping Info", href: "/shipping-info" },
              { label: "Testimonials", href: "/testimonials" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-white font-medium text-xs uppercase hover:text-primary transition-all tracking-tight flex items-center gap-2 group font-secondary"
                >
                  <span className="w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── NEWSLETTER ── */}
        <div className="space-y-6">
          <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase font-primary">
            Join the Cult
          </h4>
          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-4">
            <p className="text-white font-semibold text-[10px] italic uppercase tracking-widest leading-snug font-primary">
              Get 10% off your first bulk order.
            </p>
            {offerSent ? (
              <div className="bg-green-500/20 border border-green-500/50 p-3 rounded-lg text-center">
                <p className="text-green-400 font-bold text-xs uppercase tracking-wider">
                  Offer Sent!
                </p>
                <p className="text-green-200 text-[10px] mt-1">
                  Check your email for the discount code.
                </p>
              </div>
            ) : (
              <form
                className="space-y-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email) return;
                  try {
                    await fetch(`${apiUrl}/v1/user/newsletter/claim-offer`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });
                    setOfferSent(true);
                  } catch (err) {
                    console.error("Failed to claim offer", err);
                  }
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL@LEOCULT.COM"
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white font-normal text-[11px] outline-none focus:border-primary transition-colors placeholder:text-white/20 font-secondary"
                />
                <button
                  type="submit"
                  className="btn btn-gradient btn-md btn-shine w-full"
                >
                  Claim Offer
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── LEGAL & CREDITS ── */}
      <div className="max-w-7xl mx-auto px-6 py-5 pb-7 flex flex-col justify-center items-center gap-3.5 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-white/60 font-secondary">
          <Link href="/about-us" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/return-and-refund-policy" className="hover:text-primary transition-colors">
            Return & Refund Policy
          </Link>
        </div>

        <p className="text-white font-normal text-[8px] md:text-[10px] italic tracking-[0.2em] uppercase opacity-60 font-secondary text-center">
          © {currentYear} LEO CULT APPAREL. ALL RIGHTS RESERVED.
        </p>

        <p className="text-white/40 text-[7.5px] md:text-[9px] tracking-widest uppercase font-secondary text-center max-w-2xl leading-relaxed">
          HDFC Bank &bull; A/C: 99998438098 43 &bull; IFSC: HDFC0007447 &bull; Anupparpalayam, Tirupur &bull; GST: 33BRVPP8688J2ZK
        </p>

        {/* Centered on mobile and tablet screens, positioned in bottom-right on desktop */}
        <a
          href="https://whyglobalservices.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-medium uppercase tracking-[0.25em] text-white/60 hover:text-primary transition-colors duration-200 text-center block pt-1.5 lg:pt-0 lg:absolute lg:bottom-2.5 lg:right-6 lg:text-right"
        >
          Powered by Why Global Services
        </a>
      </div>

      {/* Modern Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-primary/30 blur-xl" />
    </footer>
  );
}