"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, User, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import AuthModal from "@/app/components/auth/AuthModal";

// ─── Data ───────────────────────────────────────────────────────────────────

const CRICKET_MENU = {
  columns: [
    {
      title: "BUILD YOUR KIT",
      links: [
        { name: "Playing Jersey", href: "/cricket/playing-jersey" },
        { name: "White T-Shirts & Trousers", href: "/cricket/white-tshirts" },
      ],
    },
    {
      title: "TRAINING WEAR",
      links: [
        { name: "Training Jersey", href: "/cricket/training-jersey" },
        { name: "Training Shorts", href: "/cricket/training-shorts" },
      ],
    },
    {
      title: "CUSTOM SERVICES",
      links: [
        { name: "Upload Your Design", href: "/upload-design" },
        { name: "Large Squad Orders", href: "/contact-sales" },
      ],
    },
  ],
};

const SPORTS_INDIA_MENU = [
  { 
    name: "Cricket", 
    href: "/sports/cricket", 
    accessories: [
      { name: "Cricket Jersey", href: "/cricket/playing-jersey" },
      { name: "Cricket Trousers", href: "/cricket/playing-trousers" },
      { name: "Cricket Shorts", href: "/cricket/caps-accessories" },
    ]
  },
  { 
    name: "Soccer", 
    href: "/sports/soccer", 
    accessories: [
      { name: "Soccer Jersey", href: "/soccer/jersey" },
      { name: "Soccer Trousers", href: "/soccer/trousers" },
      { name: "Soccer Shorts", href: "/soccer/shorts" },
    ]
  },
  { 
    name: "Tennis", 
    href: "/sports/tennis", 
    accessories: [
      { name: "Tennis Jersey", href: "/tennis/jersey" },
      { name: "Tennis Trousers", href: "/tennis/trousers" },
      { name: "Tennis Shorts ", href: "/tennis/shorts" },
    ]
  },
  { 
    name: "Badminton", 
    href: "/sports/badminton", 
    accessories: [
      { name: "Badminton Jersey", href: "/badminton/jersey" },
      { name: "Badminton Trousers", href: "/badminton/trousers" },
      { name: "Wristband Shorts", href: "/badminton/wristband" },
    ]
  },
  { 
    name: "Pickleball", 
    href: "/sports/pickleball", 
    accessories: [
      { name: "Pickleball Jersey", href: "/pickleball/jersey" },
      { name: "Pickleball Trousers", href: "/pickleball/Trousers" },
      { name: "Pickleball Shorts", href: "/pickleball/shorts" },
    ]
  },
];

const RESOURCES_MENU = [
  { name: "Size Guide", href: "/size-guide" },
  { name: "FAQ", href: "/faq" },
  { name: "Price Estimator", href: "/price-estimator" },
  { name: "Catalog", href: "/catalog" },
  { name: "Bulk Orders", href: "/bulk-orders" },
];

const NAV_ITEMS = [
  { id: "cricket", label: "Cricket Uniforms" },
  { id: "sportsIndia", label: "Sports India" },
  { id: "resources", label: "Resources" },
];

// ─── Panel Components ─────────────────────────────────────────────────

function CricketPanel() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {CRICKET_MENU.columns.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: ci * 0.05 }}
            >
              <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-6 uppercase font-primary">
                {col.title}
              </h3>
              <ul className="space-y-3.5">
                {col.links.map((link, li) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: ci * 0.05 + li * 0.03 }}
                  >
                    <Link
                      href={link.href}
                      className="text-[15px] text-gray-600 hover:text-primary transition-colors block font-secondary"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SportsIndiaPanel() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {SPORTS_INDIA_MENU.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link href={item.href}>
                <h3 className="text-lg font-bold text-gray-900 mb-5 hover:text-primary transition-colors font-primary">
                  {item.name}
                </h3>
              </Link>

              <div className="space-y-2.5 flex-1">
                {item.accessories.map((accessory, idx) => (
                  <Link
                    key={idx}
                    href={accessory.href}
                    className="block text-[14.5px] text-gray-600 hover:text-primary transition-colors font-secondary"
                  >
                    {accessory.name}
                  </Link>
                ))}
              </div>

              <Link
                href={item.href}
                className="mt-6 text-primary text-sm font-medium hover:underline inline-block font-secondary"
              >
                View all →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourcesPanel() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {RESOURCES_MENU.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="flex items-center"
            >
              <Link
                href={item.href}
                className="text-[15px] text-gray-600 hover:text-primary transition-colors py-2 font-secondary"
              >
                {item.name}
              </Link>
              {i < RESOURCES_MENU.length - 1 && (
                <span className="mx-4 text-gray-300">|</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileItem({ item }) {
  const [open, setOpen] = useState(false);

  const getLinks = () => {
    if (item.id === "cricket") return CRICKET_MENU.columns.flatMap((c) => c.links);
    if (item.id === "sportsIndia") {
      return SPORTS_INDIA_MENU.flatMap((s) => [
        { name: s.name, href: s.href },
        ...s.accessories.map((a) => ({ name: `  • ${a.name}`, href: a.href })),
      ]);
    }
    if (item.id === "resources") return RESOURCES_MENU;
    return [];
  };

  const links = getLinks();

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-4 text-base font-semibold text-gray-800 font-primary"
      >
        {item.label}
        <ChevronDown size={18} strokeWidth={2.5} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-primary py-1.5 transition-colors font-secondary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimatedLogo() {
  const letters = "LEOCULT".split("");
  const primaryBlue = "#2563EB"; 

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            animate={{ 
              y: [0, -4, 0],
              color: i < 3 
                ? ["#000", "#6B7280", "#000"] 
                : [primaryBlue, "#60A5FA", primaryBlue]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            className={`font-primary text-[22px] font-black italic tracking-tighter ${i === 3 ? "ml-2" : ""}`}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <motion.div 
        animate={{ width: ["20%", "100%", "20%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="h-[2px] bg-blue-600 mt-1"
      />
    </div>
  );
}

// Tooltip Component
function Tooltip({ text, position = "bottom" }) {
  const positionClasses = {
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} 
      opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
      transition-all duration-300 pointer-events-none z-20 hidden md:block`}
    >
      <div className="relative px-3 py-1.5 text-xs font-medium text-white rounded-lg
        bg-gradient-to-r from-blue-600 to-blue-800
        shadow-xl backdrop-blur-md whitespace-nowrap">
        {text}
        <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-blue-700 
          ${position === "bottom" ? "-top-1" : "-bottom-1"}`}
        />
      </div>
    </div>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const leaveTimer = useRef(null);
  const headerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart?.items || []);

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const openAuthModal = (mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (headerRef.current) {
        setNavbarHeight(headerRef.current.getBoundingClientRect().height);
        // Add CSS variable for navbar height
        document.documentElement.style.setProperty('--navbar-height', `${headerRef.current.getBoundingClientRect().height}px`);
      }
    };
    
    updateNavbarHeight();
    
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
      updateNavbarHeight();
    };
    
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    
    // Observer for navbar changes
    const observer = new ResizeObserver(updateNavbarHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  const onEnter = (id) => {
    clearTimeout(leaveTimer.current);
    setActiveMenu(id);
  };

  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const stayOpen = () => clearTimeout(leaveTimer.current);

  return (
    <>
      {/* Navbar */}
<header
  ref={headerRef}
  className={`fixed left-0 right-0 z-40 bg-[#f2f7fb] transition-all duration-300 ${scrolled ? "top-0" : "top-[40px]"}`}
>
        <div className="max-w-full mx-auto px-4 md:px-8 flex items-center justify-between h-[80px]">
          <Link href="/" className="flex items-center gap-3 h-full group">
            <Image 
              src="/images/icons/mainlogo1.png"
              alt="logo"
              width={140}
              height={140}
              className="rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            {/* <AnimatedLogo /> */}
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => onEnter(item.id)}
                onMouseLeave={onLeave}
                className="relative"
              >
                <button
                  className={`flex items-center gap-1.5 px-6 py-3 text-[15px] font-medium transition-colors font-primary ${
                    activeMenu === item.id ? "text-gray-900" : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.label}
                  <ChevronDown 
                    size={15} 
                    className={`transition-transform duration-200 ${
                      activeMenu === item.id ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                {activeMenu === item.id && (
                  <span className="absolute bottom-1 left-6 right-6 h-0.5 bg-primary rounded" />
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {/* Profile Button */}
            <div className="relative group">
              {user ? (
                <Link href="/account">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 text-gray-600 hover:text-primary rounded-full transition-all duration-300"
                  >
                    <User size={26} strokeWidth={1.7} />
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openAuthModal("login")}
                  className="p-2.5 text-gray-600 hover:text-primary rounded-full transition-all duration-300"
                >
                  <User size={26} strokeWidth={1.7} />
                </motion.button>
              )}
              <Tooltip text={user ? "My Account" : "Login / Sign Up"} position="bottom" />
            </div>

            {/* Cart Button */}
            <div className="relative group">
              <Link href="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 text-gray-600 hover:text-primary rounded-full transition-all duration-300 relative"
                >
                  <ShoppingCart size={26} strokeWidth={1.7} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </motion.button>
              </Link>
              <Tooltip 
                text={
                  cartItemCount === 0 ? "Your cart is empty" : 
                  `View Cart (${cartItemCount} item${cartItemCount > 1 ? 's' : ''})`
                } 
                position="bottom" 
              />
            </div>

            <Link
              href="/bulk-enquiry"
              className="btn btn-gradient btn-md btn-shine inline-flex ml-2"
            >
              Bulk Order
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
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-6 py-4">
                {NAV_ITEMS.map((item) => (
                  <MobileItem key={item.id} item={item} />
                ))}
                <div className="pt-4 space-y-3">
                  {user ? (
                    <Link
                      href="/account"
                      className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:border-primary hover:text-primary font-primary"
                    >
                      <User size={18} />
                      My Account
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        openAuthModal("login");
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:border-primary hover:text-primary font-primary"
                    >
                      <User size={18} />
                      Login / Sign Up
                    </button>
                  )}
                  <Link
                    href="/cart"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:border-primary hover:text-primary font-primary"
                  >
                    <ShoppingCart size={18} />
                    Cart {cartItemCount > 0 && `(${cartItemCount})`}
                  </Link>
                  <Link
                    href="/bulk-enquiry"
                    className="btn btn-gradient btn-md btn-shine w-full text-center"
                  >
                    Bulk Order
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M8 3.5L11.5 7 8 10.5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer - prevents content from hiding under fixed navbar */}
      <div style={{ height: `calc(40px + ${navbarHeight}px)`, width: '100%' }} />

      {/* Dropdown Panels */}
      <AnimatePresence>
        {activeMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-[45]"
              style={{ top: `calc(40px + ${navbarHeight}px)` }}
              onClick={() => setActiveMenu(null)}
              onMouseEnter={onLeave}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-100"
              style={{ 
  top: scrolled 
    ? `${navbarHeight}px` 
    : `calc(40px + ${navbarHeight}px)` 
}}
              onMouseEnter={stayOpen}
              onMouseLeave={onLeave}
            >
              {activeMenu === "cricket" && <CricketPanel />}
              {activeMenu === "sportsIndia" && <SportsIndiaPanel />}
              {activeMenu === "resources" && <ResourcesPanel />}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultMode={authModalMode}
      />
    </>
  );
}


