
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




import HeroSection from "./components/home/HeroSection";
import HowItWorks from "./components/home/HowItWorks";
import ShopBySport from "./components/home/Shopbysport";
import WhyChooseUs from "./components/home/WhyChooseUs";
import TestimonialSection from "./components/home/TestimonialSection";
import FeatureBar from "./components/home/FeatureBar";
import ScrollToTop from "./components/common/ScrollToTop";

export const metadata = {
  title: "LEO Apparel Prints — Custom Sportswear & Jersey Design",
  description: "Design premium custom cricket jerseys, football uniforms, and athletic wear for teams and academies. Fast delivery across India.",
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <ShopBySport />
      <WhyChooseUs />
      <TestimonialSection />
      <FeatureBar />
      <ScrollToTop />
    </div>
  );
}