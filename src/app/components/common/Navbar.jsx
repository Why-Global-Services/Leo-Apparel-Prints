"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, User, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import AuthModal from "@/app/components/auth/AuthModal";
import { fetchCart } from "@/features/cart/cartThunks";

const EMPTY_CART_ITEMS = [];

// ─── Data ───────────────────────────────────────────────────────────────────

const CRICKET_MENU = {
  columns: [
    {
      title: "BUILD YOUR KIT",
      links: [
        {
          name: "Playing Jersey",
          href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Jersey%20%2F%20T-Shirt",
        },
        {
          name: "Playing Shorts",
          href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Shorts",
        },
        {
          name: "Playing Pants",
          href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Track%20Pants",
        },
      ],
    },
    {
      title: "TRAINING WEAR",
      links: [
        {
          name: "Training Jersey",
          href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Jersey%20%2F%20T-Shirt",
        },
        {
          name: "Training Shorts",
          href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Shorts",
        },
        {
          name: "Training Pants",
          href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Track%20Pants",
        },
      ],
    },
    {
      title: "CUSTOM SERVICES",
      links: [
        { name: "Upload Your Design", href: "/bulk-enquiry" },
        { name: "Large Squad Orders", href: "/bulk-enquiry" },
      ],
    },
  ],
};

const COTTON_TEES_MENU = {
  columns: [
    {
      title: "OUR DESIGNS",
      links: [
        {
          name: "Men's Polo T-Shirts",
          href: "/products?customizationType=CUSTOM_COTTON_TEES&cottonTeeType=OUR_DESIGN&apparel=Mens%20Polo%20T-Shirts",
        },
        {
          name: "Men's Half Sleeve",
          href: "/products?customizationType=CUSTOM_COTTON_TEES&cottonTeeType=OUR_DESIGN&apparel=Mens%20Half%20Sleeve%20T-Shirts",
        },
        {
          name: "Men's Full Sleeve",
          href: "/products?customizationType=CUSTOM_COTTON_TEES&cottonTeeType=OUR_DESIGN&apparel=Mens%20Full%20Sleeve%20T-Shirts",
        },
      ],
    },
    {
      title: "UPLOAD DESIGN",
      links: [
        {
          name: "Men's Polo T-Shirts",
          href: "/products?customizationType=CUSTOM_COTTON_TEES&cottonTeeType=UPLOAD_DESIGN&apparel=Mens%20Polo%20T-Shirts",
        },
        {
          name: "Men's Half Sleeve",
          href: "/products?customizationType=CUSTOM_COTTON_TEES&cottonTeeType=UPLOAD_DESIGN&apparel=Mens%20Half%20Sleeve%20T-Shirts",
        },
        {
          name: "Men's Full Sleeve",
          href: "/products?customizationType=CUSTOM_COTTON_TEES&cottonTeeType=UPLOAD_DESIGN&apparel=Mens%20Full%20Sleeve%20T-Shirts",
        },
      ],
    },
  ],
};

const SPORTS_INDIA_MENU = [
  {
    name: "Cricket",
    href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket",
    accessories: [
      {
        name: "Cricket Jersey",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Jersey%20%2F%20T-Shirt",
      },
      {
        name: "Cricket Pants",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Track%20Pants",
      },
      {
        name: "Cricket Shorts",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Cricket&apparel=Shorts",
      },
    ],
  },
  {
    name: "Soccer",
    href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Soccer",
    accessories: [
      {
        name: "Soccer Jersey",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Soccer&apparel=Jersey%20%2F%20T-Shirt",
      },
      {
        name: "Soccer Pants",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Soccer&apparel=Track%20Pants",
      },
      {
        name: "Soccer Shorts",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Soccer&apparel=Shorts",
      },
    ],
  },
  {
    name: "Kabbadi",
    href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Kabbadi",
    accessories: [
      {
        name: "Kabbadi Jersey",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Kabbadi&apparel=Jersey%20%2F%20T-Shirt",
      },
      {
        name: "Kabbadi Pants",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Kabbadi&apparel=Track%20Pants",
      },
      {
        name: "Kabbadi Shorts",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Kabbadi&apparel=Shorts",
      },
    ],
  },
  {
    name: "Volleyball",
    href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Volleyball",
    accessories: [
      {
        name: "Volleyball Jersey",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Volleyball&apparel=Jersey%20%2F%20T-Shirt",
      },
      {
        name: "Volleyball Pants",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Volleyball&apparel=Track%20Pants",
      },
      {
        name: "Volleyball Shorts",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Volleyball&apparel=Shorts",
      },
    ],
  },
  {
    name: "Athletes",
    href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Athletes",
    accessories: [
      {
        name: "Athletes Jersey",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Athletes&apparel=Jersey%20%2F%20T-Shirt",
      },
      {
        name: "Athletes Pants",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Athletes&apparel=Track%20Pants",
      },
      {
        name: "Athletes Shorts",
        href: "/products?segment=Uniforms%2CCustom%20Sportswear&sport=Athletes&apparel=Shorts",
      },
    ],
  },
];

const RESOURCES_MENU = [
  { name: "Size Guide", href: "/size-guide" },
  { name: "Shipping Info", href: "/shipping-info" },
  { name: "FAQ", href: "/faq" },
  { name: "Catalog", href: "/catalog" },
  { name: "Bulk Orders", href: "/bulk-enquiry" },
];

const NAV_ITEMS = [
  { id: "cottonTees", label: "Custom Tees" },
  { id: "sportsIndia", label: "Custom Sports Tees" },
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

function CottonTeesPanel() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-3xl mx-auto">
          {COTTON_TEES_MENU.columns.map((column, ci) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: ci * 0.05 }}
            >
              <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-5 uppercase font-primary">
                {column.title}
              </h3>
              <ul className="space-y-3.5">
                {column.links.map((link, li) => (
                  <motion.li
                    key={link.href}
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

function MobileItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const isCottonTees = item.id === "cottonTees";
  const isSports = item.id === "sportsIndia";

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-4 text-base font-semibold text-gray-800 font-primary hover:text-primary transition-colors"
      >
        <span>{item.label}</span>
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          className={`transition-transform duration-200 text-gray-500 ${open ? "rotate-180 text-primary" : ""}`}
        />
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
            <div className="pb-4 pl-1 sm:pl-2 space-y-3">
              {/* Custom Tees */}
              {isCottonTees &&
                COTTON_TEES_MENU.columns.map((column) => (
                  <div key={column.title} className="bg-gray-50/80 rounded-xl p-3 space-y-1">
                    <p className="text-xs font-bold tracking-wider text-gray-900 uppercase font-primary">
                      {column.title}
                    </p>
                    <div className="pl-2 space-y-0.5">
                      {column.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onNavigate}
                          className="block text-sm text-gray-600 hover:text-primary py-1.5 transition-colors font-secondary"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Custom Sports Tees - Clean expandable cards per sport */}
              {isSports &&
                SPORTS_INDIA_MENU.map((sport) => {
                  const isSubOpen = activeSubMenu === sport.name;
                  return (
                    <div key={sport.name} className="bg-gray-50/80 rounded-xl overflow-hidden mb-1.5 border border-gray-100/50">
                      <button
                        onClick={() => setActiveSubMenu(isSubOpen ? null : sport.name)}
                        className="flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-semibold text-gray-800 font-primary hover:text-primary transition-colors"
                      >
                        <span>{sport.name}</span>
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 text-gray-400 ${isSubOpen ? "rotate-180 text-primary" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {isSubOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 pt-1 space-y-1 border-t border-gray-200/50">
                              {sport.accessories.map((acc, idx) => (
                                <Link
                                  key={idx}
                                  href={acc.href}
                                  onClick={onNavigate}
                                  className="block text-sm text-gray-600 hover:text-primary py-1 transition-colors font-secondary"
                                >
                                  {acc.name}
                                </Link>
                              ))}
                              <Link
                                href={sport.href}
                                onClick={onNavigate}
                                className="block text-xs font-semibold text-primary pt-1 hover:underline font-secondary"
                              >
                                View all {sport.name} →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

              {/* Resources Links */}
              {!isCottonTees &&
                !isSports &&
                RESOURCES_MENU.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={onNavigate}
                    className="block text-sm text-gray-600 hover:text-primary py-1.5 px-3 transition-colors font-secondary rounded-lg hover:bg-gray-50"
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

// Tooltip Component
function Tooltip({ text, position = "bottom" }) {
  const positionClasses = {
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={`
        absolute
        ${positionClasses[position]}
        transition-all duration-300
        pointer-events-none
        z-20 hidden md:block
      `}
    >
      <div className="relative px-3 py-1.5 text-xs font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl backdrop-blur-md whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        {text}
        <div
          className={`
            absolute left-1/2
            -translate-x-1/2
            w-2 h-2 rotate-45
            bg-blue-700
            ${position === "bottom" ? "-top-1" : "-bottom-1"}
          `}
        />
      </div>
    </div>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const leaveTimer = useRef(null);
  const headerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart?.items || EMPTY_CART_ITEMS);
  const cartItemCount = cartItems.length;

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const showAuthenticatedUi = mounted && Boolean(user);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleAccountClick = (event) => {
    if (!showAuthenticatedUi) {
      event.preventDefault();
      openAuthModal("login");
    }
  };

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
        const h = headerRef.current.getBoundingClientRect().height;
        setNavbarHeight(h);
        document.documentElement.style.setProperty("--navbar-height", `${h}px`);
      }
    };

    updateNavbarHeight();

    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const onResize = () => {
      // Tailwind lg breakpoint is 1024px
      if (window.innerWidth >= 1024) setMobileOpen(false);
      updateNavbarHeight();
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

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
      {/* Navbar Header */}
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 z-40 bg-[#f2f7fb] shadow-sm transition-all duration-300 ${
          scrolled ? "top-0 shadow-md" : "top-[var(--topbar-height,40px)]"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 h-full shrink-0 group">
            <Image
              src="/images/icons/mainlogo1.png"
              alt="Leo Cult Logo"
              width={140}
              height={140}
              className="w-28 sm:w-32 md:w-36 h-auto rounded-md transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => onEnter(item.id)}
                onMouseLeave={onLeave}
                className="relative"
              >
                <button
                  className={`flex items-center gap-1.5 px-4 xl:px-6 py-3 text-[15px] font-medium transition-colors font-primary ${
                    activeMenu === item.id
                      ? "text-gray-900"
                      : "text-gray-700 hover:text-primary"
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

          {/* Desktop Action Buttons (Right) */}
          <div className="hidden lg:flex shrink-0 items-center gap-2">
            {/* Profile Button */}
            <div className="relative group">
              <Link href="/account" onClick={handleAccountClick}>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex p-2.5 text-gray-600 hover:text-primary rounded-full transition-all duration-300"
                >
                  <User size={26} strokeWidth={1.7} />
                </motion.span>
              </Link>
              <Tooltip
                text={showAuthenticatedUi ? "My Account" : "Login / Sign Up"}
                position="bottom"
              />
            </div>

            {/* Cart Button */}
            <div className="relative group">
              <Link href="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 text-gray-600 hover:text-primary rounded-full transition-all duration-300 relative inline-flex items-center justify-center"
                >
                  <ShoppingCart size={26} strokeWidth={1.7} />
                  {mounted && cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </span>
                  )}
                </motion.button>
              </Link>
              <Tooltip
                text={
                  cartItemCount === 0
                    ? "Your cart is empty"
                    : `View Cart (${cartItemCount} item${cartItemCount > 1 ? "s" : ""})`
                }
                position="bottom"
              />
            </div>

            {/* Bulk Order CTA */}
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

          {/* Mobile & Tablet Action Buttons (Right) */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2">
            {/* User Account / Login Button */}
            <Link
              href="/account"
              onClick={handleAccountClick}
              aria-label={showAuthenticatedUi ? "My Account" : "Login / Sign Up"}
              className="p-2 sm:p-2.5 text-gray-700 hover:text-primary rounded-full transition-colors inline-flex items-center justify-center hover:bg-black/5"
            >
              <User size={22} strokeWidth={1.8} />
            </Link>

            {/* Cart Button with Count Badge */}
            <Link
              href="/cart"
              aria-label="View Cart"
              className="p-2 sm:p-2.5 text-gray-700 hover:text-primary rounded-full transition-colors relative inline-flex items-center justify-center hover:bg-black/5"
            >
              <ShoppingCart size={22} strokeWidth={1.8} />
              {mounted && cartItemCount > 0 && (
                <span className="absolute 0 top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 sm:text-xs flex items-center justify-center rounded-full shadow-sm">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Tablet Bulk Order button (visible on tablet, hidden on phone) */}
            <Link
              href="/bulk-enquiry"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-700 text-white shadow-sm hover:shadow transition-all"
            >
              Bulk Order
            </Link>

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-700 hover:text-primary rounded-lg transition-colors hover:bg-black/5 focus:outline-none"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-2xl relative z-40 max-h-[calc(100dvh-5rem)] overflow-y-auto"
            >
              <div className="px-5 sm:px-8 py-5">
                {NAV_ITEMS.map((item) => (
                  <MobileItem
                    key={item.id}
                    item={item}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}

                <div className="pt-5 mt-2 border-t border-gray-100 space-y-3">
                  <Link
                    href="/account"
                    onClick={(event) => {
                      handleAccountClick(event);
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-xl text-gray-700 font-medium text-sm hover:border-primary hover:text-primary font-primary transition-colors"
                  >
                    <User size={18} />
                    {showAuthenticatedUi ? "My Account" : "Login / Sign Up"}
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-xl text-gray-700 font-medium text-sm hover:border-primary hover:text-primary font-primary transition-colors"
                  >
                    <ShoppingCart size={18} />
                    Cart {cartItemCount > 0 && `(${cartItemCount})`}
                  </Link>
                  <Link
                    href="/bulk-enquiry"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-gradient btn-md btn-shine w-full text-center"
                  >
                    Bulk Order
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

                {/* Mobile Drawer Footer Info */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 font-secondary">
                  <span>
                    Helpline:{" "}
                    <a
                      href="tel:+919087149666"
                      className="font-semibold text-primary hover:underline"
                    >
                      +91 90871 49666
                    </a>
                  </span>
                  <Link
                    href="/contact-us"
                    onClick={() => setMobileOpen(false)}
                    className="hover:text-primary underline"
                  >
                    24/7 Support
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-[2px]"
            style={{
              top: scrolled
                ? `${navbarHeight}px`
                : `calc(var(--topbar-height, 40px) + ${navbarHeight}px)`,
            }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Spacer - prevents content from hiding under fixed navbar */}
      <div
        style={{
          height: `calc(var(--topbar-height, 40px) + ${navbarHeight}px)`,
          width: "100%",
        }}
      />

      {/* Desktop Dropdown Panels */}
      <AnimatePresence>
        {activeMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-[45]"
              style={{
                top: `calc(var(--topbar-height, 40px) + ${navbarHeight}px)`,
              }}
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
                  : `calc(var(--topbar-height, 40px) + ${navbarHeight}px)`,
              }}
              onMouseEnter={stayOpen}
              onMouseLeave={onLeave}
            >
              {activeMenu === "cottonTees" && <CottonTeesPanel />}
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
