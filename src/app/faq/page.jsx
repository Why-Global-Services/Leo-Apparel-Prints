'use client';

import { useState } from 'react';
import { 
  ChevronDown, Search, Shirt, ShoppingBag, Printer, 
  RotateCcw, Truck, CreditCard, Sparkles, 
  Award, Shield, Zap, Star, ArrowRight, HelpCircle,
  Diamond, Crown
} from 'lucide-react';

// ─── FAQ DATA ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'products', label: 'Products', icon: Shirt },
  { id: 'customise', label: 'Customisation', icon: Printer },
  { id: 'ordering', label: 'Ordering', icon: ShoppingBag },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'returns', label: 'Returns', icon: RotateCcw },
  { id: 'payment', label: 'Payment', icon: CreditCard },
];

const FAQS = [
  { id: 1, category: 'products', q: 'What sports does LEO CULT cater to?', a: 'LEO CULT designs and manufactures custom sportswear for Cricket, Football, Basketball, Tennis, Badminton, Volleyball, Hockey, and more. If your sport isn\'t listed, contact us — we love a challenge.', popular: true },
  { id: 2, category: 'products', q: 'What types of garments can I customise?', a: 'You can fully customise Jerseys, Trousers, Lowers (track pants / shorts), Jackets, Polo T-Shirts, and full kits. Every garment is available for all major sports.', popular: false },
  { id: 3, category: 'products', q: 'What fabric technologies are available?', a: 'We offer five performance fabrics: ClimateTech Pro (UV protection & elite moisture management), CoolWeave Lite (lightweight breathable), DriFit Ultra (maximum sweat-wicking), Interlock Knit (durable two-layer), and Jacquard Weave (premium textured).', popular: true },
  { id: 4, category: 'customise', q: 'How does the 3D preview customiser work?', a: 'Our real-time 3D Kit Designer lets you switch between a product view and a full 3D model. Change base colour, sleeve colour, collar style, add your club badge, sponsor logos, player names, numbers, and team name — all with instant live preview.', popular: true },
  { id: 5, category: 'customise', q: 'What logo file formats are accepted for upload?', a: 'We accept PNG (transparent background preferred) and SVG. For best print quality, upload at minimum 300 DPI and 300×300 px. Maximum file size is 8 MB per logo.', popular: false },
  { id: 6, category: 'customise', q: 'Can I add both a club badge and a sponsor logo?', a: 'Yes. The designer supports a Club / Team Badge on the front chest, a Front Sponsor Logo on the centre chest, and a Back Sponsor / Secondary Logo on the upper back — all independently uploaded and sized.', popular: true },
  { id: 7, category: 'ordering', q: 'What is the minimum order quantity?', a: 'The minimum order is 10 pieces per design. This applies per garment type — so 10 jerseys and 10 lowers are counted separately.', popular: true },
  { id: 8, category: 'ordering', q: 'How do I submit a player list for a team order?', a: 'In the Order tab of the Kit Designer, download our Excel template, fill in each player\'s name, number, and size, then upload the completed file. Our system maps each row to the correct garment automatically.', popular: false },
  { id: 9, category: 'shipping', q: 'Do you ship across India?', a: 'Yes, we ship to all states and union territories via partnered couriers. Delivery typically takes 3–5 business days after dispatch.', popular: true },
  { id: 10, category: 'payment', q: 'What payment methods do you accept?', a: 'We accept UPI, Net Banking, all major Credit and Debit Cards (Visa, Mastercard, RuPay), and EMI options for orders above ₹5,000. Corporate purchase orders are accepted for verified institutions.', popular: true },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(f => {
    const matchCat = activeCategory === 'all' || f.category === activeCategory;
    const matchSearch = !search.trim() ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);
  const popularFAQs = FAQS.filter(f => f.popular).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      
      {/* ── HERO SECTION WITH LUXURY DESIGN ── */}
      <div className="relative overflow-hidden bg-white">
        {/* Luxury Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-blue/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/3 to-transparent rounded-full blur-3xl" />
        
        {/* Premium Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-blue rounded-full" />
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-accent rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-20 h-20 border border-primary rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Luxury Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-blue/5 to-accent/5 backdrop-blur-sm rounded-full px-6 py-2.5 mb-8 border border-primary-blue/10 shadow-sm">
              <Crown className="w-4 h-4 text-primary-blue" />
              <span className="text-primary-blue text-sm font-medium tracking-wide">LEO CULT · ELITE SUPPORT</span>
              <Diamond className="w-3 h-3 text-primary-blue" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
              Frequently Asked
              <span className="bg-gradient-to-r from-primary-blue via-accent to-primary bg-clip-text text-transparent"> Questions</span>
            </h1>
            
            <p className="text-slate-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about custom jerseys, trousers, lowers and premium sports kits.
            </p>
            
            {/* Luxury Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-blue to-accent rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-transparent rounded-2xl text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-primary-blue/20 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - Premium Compact Cards */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              
              {/* Category Cards - All Primary Blue Active State */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-3">
                <h3 className="text-slate-800 font-semibold mb-3 px-3 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary-blue" />
                  Browse Categories
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setOpenId(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all group ${
                          isActive
                            ? 'bg-primary-blue text-white shadow-sm'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          isActive 
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-sm flex-1 text-left ${
                          isActive ? 'text-white font-medium' : 'text-slate-700'
                        }`}>
                          {category.label}
                        </span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Popular Questions - Primary Blue Theme */}
              <div className="bg-gradient-to-br from-primary-blue/5 to-primary-blue/3 rounded-2xl border border-primary-blue/10 p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-blue flex items-center justify-center shadow-md">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-slate-800 font-semibold text-sm">Most Popular</h3>
                </div>
                <div className="space-y-3">
                  {popularFAQs.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => {
                        setActiveCategory(faq.category);
                        if (openId !== faq.id) {
                          setOpenId(faq.id);
                        }
                      }}
                      className="w-full text-left text-sm text-slate-600 hover:text-primary-blue transition-colors flex items-start gap-2 group"
                    >
                      <span className="text-primary-blue mt-0.5 text-xs">◆</span>
                      <span className="group-hover:underline line-clamp-2">{faq.q}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats - Primary Blue Accents */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 rounded-xl bg-gradient-to-br from-slate-50 to-white">
                    <div className="w-9 h-9 rounded-lg bg-primary-blue/10 flex items-center justify-center mx-auto mb-2">
                      <Users className="w-4 h-4 text-primary-blue" />
                    </div>
                    <div className="text-slate-800 font-bold text-lg">50K+</div>
                    <div className="text-slate-400 text-xs">Customers</div>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-gradient-to-br from-slate-50 to-white">
                    <div className="w-9 h-9 rounded-lg bg-primary-blue/10 flex items-center justify-center mx-auto mb-2">
                      <Globe className="w-4 h-4 text-primary-blue" />
                    </div>
                    <div className="text-slate-800 font-bold text-lg">50+</div>
                    <div className="text-slate-400 text-xs">Countries</div>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-gradient-to-br from-slate-50 to-white">
                    <div className="w-9 h-9 rounded-lg bg-primary-blue/10 flex items-center justify-center mx-auto mb-2">
                      <Award className="w-4 h-4 text-primary-blue" />
                    </div>
                    <div className="text-slate-800 font-bold text-lg">4.9/5</div>
                    <div className="text-slate-400 text-xs">Rating</div>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-gradient-to-br from-slate-50 to-white">
                    <div className="w-9 h-9 rounded-lg bg-primary-blue/10 flex items-center justify-center mx-auto mb-2">
                      <Star className="w-4 h-4 text-primary-blue" />
                    </div>
                    <div className="text-slate-800 font-bold text-lg">10K+</div>
                    <div className="text-slate-400 text-xs">Orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ List - Premium Accordion with Perfect Sizing */}
          <div className="flex-1">
            {/* Result info */}
            <div className="mb-8 flex items-center justify-between">
              <p className="text-slate-500 text-sm">
                Showing <span className="text-primary-blue font-semibold">{filtered.length}</span> of {FAQS.length} questions
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-primary-blue text-sm hover:underline font-medium"
                >
                  Clear search
                </button>
              )}
            </div>

            <div className="space-y-4">
              {filtered.map((faq, index) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'border-primary-blue/30 shadow-xl shadow-primary-blue/5' 
                        : 'border-slate-200 hover:border-primary-blue/20 hover:shadow-md'
                    }`}>
                      <button
                        onClick={() => toggle(faq.id)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/50 transition-colors"
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`inline-flex text-[9px] font-semibold px-2 py-0.5 rounded-full bg-primary-blue text-white uppercase tracking-wide`}>
                              {CATEGORIES.find(c => c.id === faq.category)?.label}
                            </span>
                            {faq.popular && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-primary-blue text-white uppercase tracking-wide">
                                <Star className="w-2 h-2" />
                                Popular
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-800 text-base leading-relaxed">
                            {faq.q}
                          </h3>
                        </div>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                          isOpen 
                            ? 'bg-primary-blue text-white shadow-md' 
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 animate-slide-down">
                          <div className="pt-4 border-t border-slate-100">
                            <p className="text-slate-600 leading-relaxed text-sm">
                              {faq.a}
                            </p>
                            <div className="mt-4 flex items-center gap-4">
                              <button className="text-xs text-slate-500 hover:text-primary-blue transition-colors flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                Helpful
                              </button>
                              <button className="text-xs text-slate-500 hover:text-primary-blue transition-colors">
                                Not helpful
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No results found</h3>
                <p className="text-slate-500 text-sm">
                  Try searching with different keywords or browse our categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-down {
          animation: slide-down 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}

// ThumbsUp component
const ThumbsUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

// Missing icon components
const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Globe = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);