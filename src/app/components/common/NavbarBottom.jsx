

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   FaPhoneAlt,
//   FaCube,
//   FaShippingFast,
//   FaHeadset,
//   FaQuestion,
// } from "react-icons/fa";

// export default function NavbarBottom() {
//   const [hide, setHide] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setHide(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const features = [
//     { icon: FaCube, text: "Design in 3D", link: null },
//     { icon: FaShippingFast, text: "Free Worldwide Shipping", link: null },
//     { icon: FaPhoneAlt, text: "+1 847 624 2660", link: "tel:+18476242660" },
//     { icon: FaHeadset, text: "24/7 Support", link: "/contact" },
//     { icon: FaQuestion, text: "FAQ", link: "/faq" },
//   ];

//   const allFeatures = [...features, ...features];

//   return (
//     <div
//       className={`fixed top-0 left-0 right-0 
//       bg-gradient-to-r from-[var(--nav-start)] via-[var(--nav-mid)] to-[var(--nav-end)]
//       text-white z-50 transition-transform duration-300 
//       shadow-lg border-b border-white/10 ${
//         hide ? "-translate-y-full" : "translate-y-0"
//       }`}
//     >
//       <div className="w-full px-4 py-2 sm:py-1.5">

//         {/* Desktop */}
//         <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto gap-6">

//           {/* LEFT */}
//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-2 group cursor-pointer transition hover:-translate-y-[2px]">
//               <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
//                 <FaCube className="text-primary text-base group-hover:text-white transition" />
//               </div>
//               <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
//                 Design in 3D
//               </span>
//             </div>

//             <div className="h-5 w-px bg-white/20" />

//             <div className="flex items-center gap-2 group cursor-pointer transition hover:-translate-y-[2px]">
//               <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
//                 <FaShippingFast className="text-primary text-base group-hover:text-white transition" />
//               </div>
//               <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
//                 Free Worldwide Shipping
//               </span>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-6">
//             <a
//               href="tel:+18476242660"
//               className="flex items-center gap-2 group transition hover:-translate-y-[2px]"
//             >
//               <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
//                 <FaPhoneAlt className="text-primary text-base group-hover:text-white transition" />
//               </div>
//               <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
//                 +1 847 624 2660
//               </span>
//             </a>

//             <div className="h-5 w-px bg-white/20" />

//             <Link
//               href="/contact"
//               className="flex items-center gap-2 group transition hover:-translate-y-[2px]"
//             >
//               <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
//                 <FaHeadset className="text-primary text-base group-hover:text-white transition" />
//               </div>
//               <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
//                 Contact Us
//               </span>
//             </Link>

//             <div className="h-5 w-px bg-white/20" />

//             <Link
//               href="/faq"
//               className="flex items-center gap-2 group transition hover:-translate-y-[2px]"
//             >
//               <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
//                 <FaQuestion className="text-primary text-base group-hover:text-white transition" />
//               </div>
//               <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
//                 FAQ
//               </span>
//             </Link>
//           </div>
//         </div>

//         {/* Mobile - Scrolling Marquee */}
//         <div className="lg:hidden overflow-hidden relative w-full">
//           <div
//             className={`flex items-center gap-6 py-1 marquee-track ${
//               !isHovered ? "animate-marquee" : ""
//             }`}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             onTouchStart={() => setIsHovered(true)}
//             onTouchEnd={() => setIsHovered(false)}
//           >
//             {allFeatures.map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center gap-2 group cursor-pointer transition hover:-translate-y-[2px] flex-shrink-0"
//               >
//                 <div className="bg-white/10 border border-white/20 p-1.5 rounded-full backdrop-blur group-hover:bg-primary transition">
//                   <feature.icon className="text-primary text-xs group-hover:text-white transition" />
//                 </div>

//                 {feature.link ? (
//                   <Link
//                     href={feature.link}
//                     className="text-xs font-medium group-hover:text-primary transition whitespace-nowrap font-secondary"
//                   >
//                     {feature.text}
//                   </Link>
//                 ) : (
//                   <span className="text-xs font-medium group-hover:text-primary transition whitespace-nowrap font-secondary">
//                     {feature.text}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//       {/* Global Marquee Animation Styles */}
//       <style jsx global>{`
//         @keyframes marqueeAnimation {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .marquee-track {
//           width: max-content;
//           animation: marqueeAnimation 20s linear infinite;
//         }

//         .animate-marquee {
//           animation-play-state: running !important;
//         }

//         .marquee-track:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaCube,
  FaShippingFast,
  FaHeadset,
  FaQuestion,
} from "react-icons/fa";

export default function NavbarBottom() {
  const [hide, setHide] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setHide(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: FaCube, text: "Design in 3D", link: null },
    { icon: FaShippingFast, text: "Free Worldwide Shipping", link: null },
    { icon: FaPhoneAlt, text: "+1 847 624 2660", link: "tel:+18476242660" },
    { icon: FaHeadset, text: "24/7 Support", link: "/contact" },
    { icon: FaQuestion, text: "FAQ", link: "/faq" },
  ];

  const allFeatures = [...features, ...features];

  // Return a simple version during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[var(--nav-start)] via-[var(--nav-mid)] to-[var(--nav-end)] text-white z-50 shadow-lg border-b border-white/10">
        <div className="w-full px-4 py-2 sm:py-1.5">
          <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-white/10 border border-white/20 p-2 rounded-full">
                  <FaCube className="text-primary text-base" />
                </div>
                <span className="text-sm font-medium">Design in 3D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 
      bg-gradient-to-r from-[var(--nav-start)] via-[var(--nav-mid)] to-[var(--nav-end)]
      text-white z-50 transition-transform duration-300 
      shadow-lg border-b border-white/10 ${
        hide ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="w-full px-4 py-2 sm:py-1.5">

        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer transition hover:-translate-y-[2px]">
              <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
                <FaCube className="text-primary text-base group-hover:text-white transition" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
                Design in 3D
              </span>
            </div>

            <div className="h-5 w-px bg-white/20" />

            <div className="flex items-center gap-2 group cursor-pointer transition hover:-translate-y-[2px]">
              <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
                <FaShippingFast className="text-primary text-base group-hover:text-white transition" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
                Free Worldwide Shipping
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+18476242660"
              className="flex items-center gap-2 group transition hover:-translate-y-[2px]"
            >
              <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
                <FaPhoneAlt className="text-primary text-base group-hover:text-white transition" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
                +1 847 624 2660
              </span>
            </a>

            <div className="h-5 w-px bg-white/20" />

            <Link
              href="/contact"
              className="flex items-center gap-2 group transition hover:-translate-y-[2px]"
            >
              <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
                <FaHeadset className="text-primary text-base group-hover:text-white transition" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
                Contact Us
              </span>
            </Link>

            <div className="h-5 w-px bg-white/20" />

            <Link
              href="/faq"
              className="flex items-center gap-2 group transition hover:-translate-y-[2px]"
            >
              <div className="bg-white/10 border border-white/20 p-2 rounded-full backdrop-blur group-hover:bg-primary transition">
                <FaQuestion className="text-primary text-base group-hover:text-white transition" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition font-secondary">
                FAQ
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile - Scrolling Marquee */}
        <div className="lg:hidden overflow-hidden relative w-full">
          <div
            className={`flex items-center gap-6 py-1 marquee-track ${
              !isHovered ? "animate-marquee" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {allFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 group cursor-pointer transition hover:-translate-y-[2px] flex-shrink-0"
              >
                <div className="bg-white/10 border border-white/20 p-1.5 rounded-full backdrop-blur group-hover:bg-primary transition">
                  <feature.icon className="text-primary text-xs group-hover:text-white transition" />
                </div>

                {feature.link ? (
                  <Link
                    href={feature.link}
                    className="text-xs font-medium group-hover:text-primary transition whitespace-nowrap font-secondary"
                  >
                    {feature.text}
                  </Link>
                ) : (
                  <span className="text-xs font-medium group-hover:text-primary transition whitespace-nowrap font-secondary">
                    {feature.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Global Marquee Animation Styles */}
      <style jsx global>{`
        @keyframes marqueeAnimation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          width: max-content;
          animation: marqueeAnimation 20s linear infinite;
        }

        .animate-marquee {
          animation-play-state: running !important;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}