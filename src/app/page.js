import Image from "next/image";
import HeroSection from "./components/home/HeroSection";
import HowItWorks from "./components/home/HowItWorks";
import ShopBySport from "./components/home/Shopbysport";
import WhyChooseUs from "./components/home/WhyChooseUs";
import TestimonialSection from "./components/home/TestimonialSection";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <HowItWorks />
      <ShopBySport />
      <WhyChooseUs />
      <TestimonialSection />
      <Footer />
    </div>
  );
}
