"use client";

import { usePathname } from "next/navigation";
import NavbarBottom from "./components/common/NavbarBottom";
import Navbar from "./components/common/Navbar";
import RouteLoader from "./components/common/RouteLoader";
import Footer from "./components/home/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");

  return (
    <>
      {!isAuthPage && <NavbarBottom />}
      {!isAuthPage && <Navbar />}

      <RouteLoader>
        <main className="flex-1">{children}</main>
      </RouteLoader>

      {!isAuthPage && <Footer />}
    </>
  );
}