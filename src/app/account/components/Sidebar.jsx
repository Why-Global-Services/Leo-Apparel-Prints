// src/app/account/components/Sidebar.jsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, MapPin, User, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";

const NAV_ITEMS = [
  { label: "Orders", href: "/account/orders", icon: ShoppingCart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Account Details", href: "/account/details", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const user= useSelector((state) => state.auth?.user || []);


console.log("user data in sidebar",user)


  const isActive = (href) => pathname === href;

  // Handle sticky state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.account-header');
      if (header) {
        const headerBottom = header.getBoundingClientRect().bottom;
        setIsSticky(headerBottom <= 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const SidebarContent = () => (
    <>
      {/* User Info */}
      <div
        className="flex items-center gap-3 mb-6 pb-5"
        style={{ borderBottom: "1px solid #e5e7eb" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--primary-blue), var(--accent-dark))",
          }}
        >
          V
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs" style={{ color: "#9ca3af" }}>Welcome Back</p>
          <p
            className="font-semibold text-sm truncate"
            style={{
              color: "#1f2937",
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
           {user.name}
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group"
              style={{
                fontFamily: "var(--font-poppins), Poppins, sans-serif",
                background: active
                  ? "linear-gradient(135deg, var(--primary-blue), var(--accent-dark))"
                  : "transparent",
                color: active ? "#ffffff" : "#4b5563",
              }}
            >
              <Icon size={18} />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
            </Link>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => {
            dispatch(logout());   // clear redux + localStorage
            router.push("/");     // redirect
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mt-2 w-full text-left transition-all duration-200 hover:opacity-80 group"
          style={{
            fontFamily: "var(--font-poppins), Poppins, sans-serif",
            color: "#dc2626",
            background: "#fef2f2",
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden w-full mb-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            color: "#374151",
          }}
        >
          <span className="font-semibold text-sm" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
            Menu
          </span>
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: Sticky, Mobile: Overlay */}
      <div
        className={`
          rounded-2xl p-5 w-full md:w-72 shrink-0
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'fixed inset-y-0 left-0 z-50 w-72 rounded-none overflow-y-auto' : 'hidden md:block'}
          md:sticky md:top-24 md:self-start
        `}
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
      >
        {/* Close button on mobile */}
        {isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 z-50"
          >
            <X size={20} style={{ color: "#6b7280" }} />
          </button>
        )}
        <SidebarContent />
      </div>
    </>
  );
}