'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';

const ContactUs = () => {
  return (
    <div className="min-h-screen relative" style={{ background: '#ffffff' }}>
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #020617 0%, #0B3C6D 50%, #1E3A8A 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-28 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase px-3 sm:px-4 py-1 rounded-full" style={{ background: 'rgba(245, 184, 0, 0.1)', color: 'var(--primary)', border: '1px solid rgba(245, 184, 0, 0.2)' }}>
                Get in Touch
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#ffffff' }}>
              Let's Start a
              <br />
              <span
                    className="block text-3xl md:text-5xl xl:text-6xl mt-1
                      bg-[linear-gradient(to_bottom,#FFF9C4,#FFD54F,#FF9800,#E65100)]
                      bg-clip-text text-transparent
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                  >Conversation</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Whether you have a question about our services, pricing, or anything else, 
              our team is ready to answer all your questions.
            </p>
          </div>
        </div>
        
        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </div>

      {/* Contact Information Section - Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column - Contact Details */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: '#020617' }}>
              Contact Information
            </h2>
            <div className="w-16 sm:w-20 h-1 mb-6 sm:mb-8" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))' }}></div>
            <p className="text-base sm:text-lg mb-8 sm:mb-12" style={{ color: '#4A5568' }}>
              We'd love to hear from you. Here's how you can reach us.
            </p>

            <div className="space-y-6 sm:space-y-8">
              {/* Phone */}
              <div className="group cursor-pointer">
                <div className="flex items-start space-x-3 sm:space-x-5">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))', boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2)' }}>
                    <MdPhone className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2" style={{ color: '#020617' }}>Phone</h3>
                    <p className="text-sm sm:text-base md:text-lg mb-1" style={{ color: '#4A5568' }}>+91 90871 49666</p>
                    <p className="text-xs sm:text-sm" style={{ color: '#A0AEC0' }}>Monday – Saturday, 9am – 7pm IST</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group cursor-pointer">
                <div className="flex items-start space-x-3 sm:space-x-5">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))', boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2)' }}>
                    <MdEmail className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2" style={{ color: '#020617' }}>Email</h3>
                    <p className="text-sm sm:text-base md:text-lg mb-1" style={{ color: '#4A5568' }}>leocult@gmail.com</p>
                    <p className="text-xs sm:text-sm" style={{ color: '#A0AEC0' }}>We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Office */}
              <div className="group cursor-pointer">
                <div className="flex items-start space-x-3 sm:space-x-5">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))', boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2)' }}>
                    <MdLocationOn className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2" style={{ color: '#020617' }}>Office</h3>
                    <p className="text-sm sm:text-base md:text-lg" style={{ color: '#4A5568' }}>44A, Chettiyar veethi,</p>
                    <p className="text-sm sm:text-base md:text-lg" style={{ color: '#4A5568' }}>Kariyakaliyamman kovil street,</p>
                    <p className="text-sm sm:text-base md:text-lg" style={{ color: '#4A5568' }}>15-Velampalayam, Tirupur – 641652</p>
                    <p className="text-xs sm:text-sm mt-1" style={{ color: '#A0AEC0' }}>GST: 33BRVPP8688J2ZK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map with Premium Styling */}
          <div className="mt-8 lg:mt-0">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(30, 58, 138, 0.1))', filter: 'blur(20px)' }}></div>
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2661967990077!2d77.33381!3d11.1085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907b0b2b7b0b1%3A0x0!2sVelampalayam%2C%20Tirupur%2C%20Tamil%20Nadu%20641652!5e0!3m2!1sen!2sin!4v1718779000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  className="sm:h-[350px] md:h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="LEO CULT Office Location – Velampalayam, Tirupur"
                ></iframe>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(245, 184, 0, 0.1), rgba(232, 150, 10, 0.1))', filter: 'blur(25px)' }}></div>
            </div>
            
            {/* Stats or Additional Info - Responsive Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="p-3 sm:p-4 rounded-xl" style={{ background: '#F7FAFC' }}>
                <p className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>24/7</p>
                <p className="text-xs sm:text-sm" style={{ color: '#4A5568' }}>Support Available</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl" style={{ background: '#F7FAFC' }}>
                <p className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>100%</p>
                <p className="text-xs sm:text-sm" style={{ color: '#4A5568' }}>Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Social Media Icons - Bottom Right Corner with React Icons */}
      <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50">
        <div className="flex flex-col space-y-2 sm:space-y-3">
          {/* WhatsApp */}
          <a
            href="#"
            className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group overflow-hidden"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#25D366';
              e.currentTarget.style.border = 'none';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-all duration-300 group-hover:scale-110" />
            <span className="absolute right-full mr-2 sm:mr-3 px-2 sm:px-3 py-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg transform group-hover:translate-x-0 translate-x-2">
              WhatsApp
            </span>
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group overflow-hidden"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'radial-gradient(circle at 30% 110%, #ffdb8c, #ff6200, #e4405f, #9b30ff)';
              e.currentTarget.style.border = 'none';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(228, 64, 95, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-all duration-300 group-hover:scale-110" />
            <span className="absolute right-full mr-2 sm:mr-3 px-2 sm:px-3 py-1 bg-gradient-to-r from-[#E4405F] to-[#9B30FF] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg transform group-hover:translate-x-0 translate-x-2">
              Instagram
            </span>
          </a>

          {/* Facebook */}
          <a
            href="#"
            className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group overflow-hidden"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1877F2';
              e.currentTarget.style.border = 'none';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(24, 119, 242, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-all duration-300 group-hover:scale-110" />
            <span className="absolute right-full mr-2 sm:mr-3 px-2 sm:px-3 py-1 bg-gradient-to-r from-[#1877F2] to-[#0E5BC9] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg transform group-hover:translate-x-0 translate-x-2">
              Facebook
            </span>
          </a>

          {/* Twitter */}
          <a
            href="#"
            className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group overflow-hidden"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1DA1F2';
              e.currentTarget.style.border = 'none';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 161, 242, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-all duration-300 group-hover:scale-110" />
            <span className="absolute right-full mr-2 sm:mr-3 px-2 sm:px-3 py-1 bg-gradient-to-r from-[#1DA1F2] to-[#0D8BD9] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg transform group-hover:translate-x-0 translate-x-2">
              Twitter
            </span>
          </a>
        </div>
      </div>

      {/* FAQ or CTA Section - Responsive with Link */}
      <div className="border-t" style={{ borderColor: '#E2E8F0' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#020617' }}>Frequently Asked Questions</h3>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 px-4" style={{ color: '#4A5568' }}>
            Can't find what you're looking for? Check out our FAQ page.
          </p>
          <Link href="/faq">
            <button
              className="btn btn-gradient btn-md btn-shine px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View FAQ Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;