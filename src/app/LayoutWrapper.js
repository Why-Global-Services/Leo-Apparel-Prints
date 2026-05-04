// "use client";

// import { usePathname } from "next/navigation";
// import NavbarBottom from "./components/common/NavbarBottom";
// import Navbar from "./components/common/Navbar";
// import RouteLoader from "./components/common/RouteLoader";
// import Footer from "./components/home/Footer";

// export default function LayoutWrapper({ children }) {
//   const pathname = usePathname();

//   const isAuthPage = pathname.startsWith("/auth");

//   return (
//     <>
//       {!isAuthPage && <NavbarBottom />}
//       {!isAuthPage && <Navbar />}

//       <RouteLoader>
//         <main className="flex-1">{children}</main>
//       </RouteLoader>

//       {!isAuthPage && <Footer />}
//     </>
//   );
// }


"use client";

import { usePathname } from "next/navigation";
import NavbarBottom from "./components/common/NavbarBottom";
import Navbar from "./components/common/Navbar";
import RouteLoader from "./components/common/RouteLoader";
import Footer from "./components/home/Footer";
import { fetchProfile } from "@/features/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const token = useSelector((state) => state.auth.token);
const dispatch = useDispatch();

useEffect(() => {
  if (token) {
    dispatch(fetchProfile());
  }
}, [token]);

  const isAuthPage = pathname.startsWith("/auth");
  
  // Check if we're on a product detail page (any /products/:id)
  const isProductDetailPage = pathname?.match(/^\/products\/[^\/]+$/) && 
    !pathname?.includes('/page') && 
    pathname !== '/products';

  return (
    <>
      {/* Hide navbars on product detail pages */}
      {!isAuthPage && !isProductDetailPage && <NavbarBottom />}
      {!isAuthPage && !isProductDetailPage && <Navbar />}

      <RouteLoader>
        <main className={`flex-1 w-full ${isProductDetailPage ? 'p-0 m-0 overflow-hidden' : ''}`}>
          {children}
        </main>
      </RouteLoader>

      {/* Hide footer on product detail pages */}
      {!isAuthPage && !isProductDetailPage && <Footer />}
    </>
  );
}