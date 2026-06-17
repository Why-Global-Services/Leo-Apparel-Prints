// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   // Official Brand SVG Paths - Precisely Scaled
//   const Icons = {
//     WhatsApp: () => (
//       <svg fill="currentColor" viewBox="0 0 24 24" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
//         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//       </svg>
//     ),
//     Facebook: () => (
//       <svg fill="currentColor" viewBox="0 0 24 24" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
//         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//       </svg>
//     ),
//     Instagram: () => (
//       <svg fill="currentColor" viewBox="0 0 24 24" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.355 1.078 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.078-1.354 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.354-1.079-1.384-2.126c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36.1.414.223 1.17 1.265.055 1.647.072 4.851.072s3.203-.017 3.585-.072 4.85-.071 1.17-.056 1.805-.25 2.227-.415.562-.217.96-.477 1.382-.896.419-.42.679-.819.896-1.381.164-.422.36-.1.414-.223 1.17-1.265-.055-1.647-.072-4.851-.072s-3.203.015-3.585.071-4.85.072-1.17.055-1.805.25-2.227.415a3.306 3.306 0 0 1-1.382-.896 3.306 3.306 0 0 1-.896-1.381c-.165-.422-.359-.858-.415-2.227-.055-1.265-.071-1.647-.071-4.85zm0 3.678a6.162 6.162 0 1 0 6.162 6.162A6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
//       </svg>
//     ),
//     X: () => (
//       <svg fill="currentColor" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
//         <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.487h2.039L6.486 3.24H4.298l13.311 17.399z" />
//       </svg>
//     )
//   };

//   const socialLinks = [
//     { name: "WhatsApp", icon: <Icons.WhatsApp />, url: "https://wa.me/#" },
//     { name: "Facebook", icon: <Icons.Facebook />, url: "#" },
//     { name: "Instagram", icon: <Icons.Instagram />, url: "#" },
//     { name: "X", icon: <Icons.X />, url: "#" },
//   ];

//   return (
//     <footer className="relative w-full bg-third overflow-hidden pt-3">
      
//       {/* ── KINETIC TOP BAR ── */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden bg-primary py-2 select-none z-10">
//         <motion.div 
//           animate={{ x: [0, -1000] }}
//           transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
//           className="flex whitespace-nowrap gap-10"
//         >
//           {[...Array(10)].map((_, i) => (
//             <span key={i} className="text-third font-black italic text-[10px] tracking-widest uppercase">
//               LEO CULT PERFORMANCE • CUSTOM TEAMWEAR • FACTORY DIRECT • PREMIUM FABRICS •
//             </span>
//           ))}
//         </motion.div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-7 border-b border-white/10">
        
//         {/* ── BRAND COLUMN ── */}
//         <div className="space-y-8">
//           <a href="/" className="inline-block group">
//             <h2 className="text-4xl font-[1000] text-white italic uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
//               LEO<span className="text-primary group-hover:text-white transition-colors">CULT</span>
//             </h2>
//             <span className="text-[9px] text-primary font-black tracking-[0.4em] uppercase block mt-1">
//               Athletic Apparel Co.
//             </span>
//           </a>

//           <p className="text-white font-bold text-xs leading-relaxed max-w-[280px] opacity-90">
//             PREMIUM CUSTOM SPORTSWEAR FOR ELITE ATHLETES. DESIGN YOUR IDENTITY, WE BUILD THE PERFORMANCE.
//           </p>

//           {/* SOCIAL LINKS - Fixed Alignment */}
//           <div className="flex gap-4">
//             {socialLinks.map((social) => (
//               <motion.a
//                 key={social.name}
//                 href={social.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ 
//                   scale: 1.1, 
//                   backgroundColor: "#F4A300",
//                   color: "#0F4C81",
//                   boxShadow: "0px 10px 20px rgba(244, 163, 0, 0.2)"
//                 }}
//                 className="w-12 h-12 border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all duration-300 bg-white/5 p-2"
//               >
//                 {social.icon}
//               </motion.a>
//             ))}
//           </div>
//         </div>

//         {/* ── SHOP CATEGORIES ── */}
//         <div className="space-y-6">
//           <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase">Collections</h4>
//           <ul className="space-y-3">
//             {["Football Kits", "Basketball Gear", "Training Wear", "Tracksuits", "Accessories"].map((link) => (
//               <li key={link}>
//                 <a href="#" className="text-white font-bold text-xs uppercase hover:text-primary transition-all tracking-tight flex items-center gap-2 group">
//                   <span className="w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-4" />
//                   {link}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ── SERVICES ── */}
//         <div className="space-y-6">
//           <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase">Services</h4>
//           <ul className="space-y-3">
//             {["Custom Designer", "Bulk Orders", "Size Guide", "Shipping Info", "Affiliates"].map((link) => (
//               <li key={link}>
//                 <a href="#" className="text-white font-bold text-xs uppercase hover:text-primary transition-all tracking-tight flex items-center gap-2 group">
//                   <span className="w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-4" />
//                   {link}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ── NEWSLETTER ── */}
//         <div className="space-y-6">
//           <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase">Join the Cult</h4>
//           <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-4">
//             <p className="text-white font-black text-[10px] italic uppercase tracking-widest leading-snug">
//               Get 10% off your first custom kit order.
//             </p>
//             <div className="space-y-2">
//               <input 
//                 type="email" 
//                 placeholder="EMAIL@LEOCULT.COM" 
//                 className="w-full bg-transparent border-b border-white/20 py-2 text-white font-bold text-[11px] outline-none focus:border-primary transition-colors placeholder:text-white/20"
//               />
//              <button
//   className="group relative w-full inline-flex items-center justify-center gap-2
//   bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1E3A8A]
//   hover:from-[#1E3A8A] hover:via-[#0284C7] hover:to-[#0EA5E9]
//   text-white font-[1000] italic text-[11px]
//   py-4 rounded-xl
//   transition-all duration-500 shadow-md
//   hover:shadow-[0_0_15px_rgba(14,165,233,0.6)]
//   active:scale-[0.97]
//   uppercase tracking-widest overflow-hidden"
// >
//   {/* TEXT */}
//   <span className="relative z-10">Register</span>

//   {/* 🔥 GOLD ARROW (SAME AS CUSTOMIZE NOW) */}
//   <svg
//     className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
//     viewBox="0 0 14 14"
//     fill="none"
//   >
//     <path
//       d="M2 7h10M8 3.5L11.5 7 8 10.5"
//       stroke="#F5B800"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       style={{ filter: "drop-shadow(0 0 4px #F5B800)" }}
//     />
//   </svg>

//   {/* ✨ SAME SHINE EFFECT */}
//   <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
// </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── LEGAL ── */}
//       <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col lg:flex-row justify-center items-center gap-8 border-t border-white/5">
        
//         <p className="text-white font-bold text-[10px] italic tracking-[0.2em] uppercase opacity-60">
//           © {currentYear} LEO CULT APPAREL. ALL RIGHTS RESERVED.
//         </p>
//       </div>

//       {/* Modern Bottom Glow */}
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-primary/30 blur-xl" />
//     </footer>
//   );
// }






"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [offerSent, setOfferSent] = React.useState(false);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "WhatsApp", icon: <FaWhatsapp size={20} />, url: "https://wa.me/#" },
    { name: "Facebook", icon: <FaFacebook size={20} />, url: "#" },
    { name: "Instagram", icon: <FaInstagram size={20} />, url: "#" },
    { name: "Twitter", icon: <FaTwitter size={20} />, url: "#" },
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
            <span key={i} className="text-third font-black italic text-[10px] tracking-widest uppercase font-primary">
              LEO CULT PERFORMANCE • CUSTOM TEAMWEAR • FACTORY DIRECT • PREMIUM FABRICS •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-7 border-b border-white/10">
        
        {/* ── BRAND COLUMN ── */}
        <div className="space-y-8">
        <div className="flex items-center gap-3 group">
  {/* <Image
    src="/images/icons/mainlogo.jpeg"
    alt="Leo Cult Logo"
    width={50}
    height={50}
    className="rounded-md"
  /> */}

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
                  boxShadow: "0px 10px 20px rgba(244, 163, 0, 0.2)"
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
          <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase font-primary">Collections</h4>
          <ul className="space-y-3">
            {["Football Kits", "Basketball Gear", "Training Wear", "Tracksuits", "Accessories"].map((link) => (
              <li key={link}>
                <Link href="#" className="text-white font-medium text-xs uppercase hover:text-primary transition-all tracking-tight flex items-center gap-2 group font-secondary">
                  <span className="w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-4" />
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── SERVICES ── */}
        <div className="space-y-6">
          <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase font-primary">Services</h4>
          <ul className="space-y-3">
            {["Custom Designer", "Bulk Orders", "Size Guide", "Shipping Info", "Affiliates"].map((link) => (
              <li key={link}>
                <Link href="#" className="text-white font-medium text-xs uppercase hover:text-primary transition-all tracking-tight flex items-center gap-2 group font-secondary">
                  <span className="w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-4" />
                  {link}
                </Link>
              </li>
            ))}
              <li>
                <Link href="/testimonials" className="text-white font-medium text-xs uppercase hover:text-primary transition-all tracking-tight flex items-center gap-2 group font-secondary">
                  <span className="w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-4" />
                  Testimonials
                </Link>
              </li>
          </ul>
        </div>

        {/* ── NEWSLETTER ── */}
        <div className="space-y-6">
          <h4 className="text-primary font-black italic text-[11px] tracking-[0.4em] uppercase font-primary">Join the Cult</h4>
          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-4">
            <p className="text-white font-semibold text-[10px] italic uppercase tracking-widest leading-snug font-primary">
              Get 10% off your first bulk order.
            </p>
            {offerSent ? (
              <div className="bg-green-500/20 border border-green-500/50 p-3 rounded-lg text-center">
                <p className="text-green-400 font-bold text-xs uppercase tracking-wider">Offer Sent!</p>
                <p className="text-green-200 text-[10px] mt-1">Check your email for the discount code.</p>
              </div>
            ) : (
              <form 
                className="space-y-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email) return;
                  try {
                    await fetch("http://localhost:5001/v1/user/newsletter/claim-offer", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email })
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
                <button type="submit" className="btn btn-gradient btn-md btn-shine w-full">
                  Claim Offer
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none">
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

      {/* ── LEGAL ── */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col justify-center items-center gap-4 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-semibold tracking-widest uppercase text-white/60 font-secondary">
          <Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link href="/return-and-refund-policy" className="hover:text-primary transition-colors">Return & Refund Policy</Link>
        </div>
        <p className="text-white font-normal text-[7px] md:text-[10px] italic tracking-[0.2em] uppercase opacity-60 font-secondary">
          © {currentYear} LEO CULT APPAREL. ALL RIGHTS RESERVED.
        </p>
      </div>

      {/* Modern Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-primary/30 blur-xl" />
    </footer>
  );
}