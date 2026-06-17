import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | LEO CULT APPAREL',
  description: 'Learn more about LEO CULT APPAREL, our mission, vision, and premium custom sportswear.',
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#e6f0ff] text-slate-800 font-sans pt-16 pb-20">
      
      {/* ── HERO SECTION ── */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-50 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <p className="text-primary-blue font-bold tracking-[0.2em] uppercase text-sm mb-4 font-secondary">
              Elite Athletic Apparel
            </p>
            <h1 className="text-5xl md:text-6xl font-[900] italic uppercase tracking-tighter text-[#09185b] mb-6 font-primary leading-tight">
              WE ARE <br/> <span className="text-primary">LEO CULT</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-secondary">
              At LEO CULT APPAREL, we bring your creative visions to life through high-performance custom sportswear. From elite team uniforms to premium promotional merchandise, we deliver exceptional quality built for champions.
            </p>
            <Link href="/catalog" className="inline-flex items-center justify-center gap-2 bg-[#003E9B] hover:bg-[#002a6e] text-white font-bold text-sm py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20 hover:-translate-y-1 hover:shadow-blue-900/40">
              Explore Collections
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="hidden lg:block lg:w-1/2 relative">
            <div className="aspect-square bg-gradient-to-tr from-[#003E9B]/10 to-primary/20 rounded-[3rem] rotate-3 scale-105 absolute inset-0 transition-transform hover:rotate-6 duration-700"></div>
            <div className="aspect-square bg-white rounded-[3rem] shadow-xl border border-blue-50 relative z-10 flex flex-col items-center justify-center p-12 text-center">
               <h2 className="text-4xl font-[900] text-[#09185b] italic uppercase tracking-tighter mb-2 font-primary">
                 LEO<span className="text-primary">CULT</span>
               </h2>
               <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-8">Performance Engineered</p>
               <div className="grid grid-cols-2 gap-6 w-full">
                 <div className="bg-blue-50 rounded-2xl p-6">
                    <span className="block text-3xl font-black text-[#003E9B] mb-1">100%</span>
                    <span className="text-xs text-slate-600 font-semibold uppercase">Custom</span>
                 </div>
                 <div className="bg-amber-50 rounded-2xl p-6">
                    <span className="block text-3xl font-black text-primary mb-1">24/7</span>
                    <span className="text-xs text-slate-600 font-semibold uppercase">Support</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MISSION, VISION, VALUES ── */}
      <div className="max-w-7xl mx-auto px-6 mt-20 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-[#003E9B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-[900] italic uppercase tracking-tight text-[#09185b] mb-4 font-primary">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-sm font-secondary">
              To empower athletes and teams to express their identity through premium, accessible, and uniquely customized performance apparel that elevates their game.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-[900] italic uppercase tracking-tight text-[#09185b] mb-4 font-primary">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-sm font-secondary">
              To be the leading global destination for custom sportswear, recognized for our innovative manufacturing, cutting-edge designs, and relentless pursuit of excellence.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-2xl font-[900] italic uppercase tracking-tight text-[#09185b] mb-4 font-primary">Our Values</h3>
            <p className="text-slate-600 leading-relaxed text-sm font-secondary">
              Quality, Innovation, Reliability, and Absolute Customer Satisfaction are at the core of every garment we construct and every team we outfit.
            </p>
          </div>
        </div>
      </div>

      {/* ── WHAT WE OFFER & WHY CHOOSE US ── */}
      <div className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-blue-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none"></div>
          <h2 className="text-3xl font-[900] italic uppercase tracking-tight text-[#003E9B] mb-6 font-primary border-b border-gray-100 pb-4 inline-block">
            What We Offer
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed font-secondary">
            We pride ourselves on offering a versatile range of elite athletic products and services tailored for champions:
          </p>
          <ul className="space-y-5">
            {[
              "Custom football kits, basketball gear, and elite training wear.",
              "Advanced sublimation printing, precision embroidery, and premium heat transfers.",
              "Seamless bulk ordering capabilities for clubs, academies, and corporate events.",
              "Dedicated 1-on-1 design assistance from our expert creative team."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 font-secondary">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0 shadow-[0_0_8px_rgba(245,184,0,0.6)]"></div>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-blue-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#003E9B]/5 rounded-bl-[100px] pointer-events-none"></div>
          <h2 className="text-3xl font-[900] italic uppercase tracking-tight text-primary mb-6 font-primary border-b border-gray-100 pb-4 inline-block">
            Why Choose Us?
          </h2>
          <p className="text-slate-600 leading-relaxed font-secondary space-y-6">
            <span>
              When you choose <strong className="text-[#09185b]">LEO CULT</strong>, you are choosing a partner dedicated to absolute excellence. We operate our own manufacturing facilities, using state-of-the-art equipment and sourcing premium performance fabrics to ensure your gear withstands the toughest conditions.
            </span>
            <span className="block mt-4">
              Our dedicated support team works closely with you from initial design concept to final delivery, ensuring a seamless, satisfying experience every step of the way. We don't just make clothes; we engineer performance wear.
            </span>
          </p>
        </div>
      </div>

      {/* ── CTA SECTION ── */}
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="bg-white p-14 rounded-[3rem] shadow-[0_20px_50px_rgb(0,62,155,0.07)] border border-blue-100 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-4xl md:text-5xl font-[900] italic uppercase tracking-tighter text-[#09185b] mb-6 font-primary relative z-10">
            Ready to Build <br /> Your Legacy?
          </h3>
          <p className="text-slate-600 mb-10 max-w-xl mx-auto relative z-10 font-secondary text-lg">
            Explore our premium collections and start designing your custom athletic apparel today. The next level awaits.
          </p>
          <Link href="/catalog" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#003E9B] to-[#002a6e] hover:from-[#002a6e] hover:to-[#09185b] text-white font-[900] italic text-sm py-4 px-12 rounded-xl transition-all duration-300 uppercase tracking-widest relative z-10 hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1">
            Shop Collections
            <svg className="w-4 h-4 ml-1" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
