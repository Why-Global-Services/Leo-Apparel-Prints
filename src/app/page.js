
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import HeroSection from "./components/home/HeroSection";
// import HowItWorks from "./components/home/HowItWorks";
// import ShopBySport from "./components/home/Shopbysport";
// import WhyChooseUs from "./components/home/WhyChooseUs";
// import TestimonialSection from "./components/home/TestimonialSection";
// import FeatureBar from "./components/home/FeatureBar";

// export default function Home() {
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setShowScrollTop(true);
//       } else {
//         setShowScrollTop(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div>
//       <HeroSection/>
//       <HowItWorks />
//       <ShopBySport />
//       <WhyChooseUs />
//       <TestimonialSection />
//       <FeatureBar />

//       {/* Scroll to Top Button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 bg-primary text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
//           aria-label="Scroll to top"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 10l7-7m0 0l7 7m-7-7v18"
//             />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import HeroSection from "./components/home/HeroSection";
import HowItWorks from "./components/home/HowItWorks";
import ShopBySport from "./components/home/Shopbysport";
import WhyChooseUs from "./components/home/WhyChooseUs";
import TestimonialSection from "./components/home/TestimonialSection";
import FeatureBar from "./components/home/FeatureBar";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <ShopBySport />
      <WhyChooseUs />
      <TestimonialSection />
      <FeatureBar/>

      {/* 🔥 PREMIUM SCROLL BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="group fixed bottom-8 right-8 z-50
  bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1E3A8A]
  hover:from-[#1E3A8A] hover:via-[#0284C7] hover:to-[#0EA5E9]
  text-white rounded-full p-3
  shadow-lg hover:shadow-[0_0_15px_rgba(14,165,233,0.6)]
  transition-all duration-500
  active:scale-90
  overflow-hidden"
        >
          {/* 🔥 GOLD ARROW */}
          <svg
            className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#F5B800"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
              style={{ filter: "drop-shadow(0 0 4px #F5B800)" }}
            />
          </svg>

          {/* ✨ SHINE */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </button>
      )}
    </div>
  );
}