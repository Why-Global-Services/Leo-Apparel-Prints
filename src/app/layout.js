// import { Poppins, Inter } from "next/font/google";
// import "@/app/globals.css";

// import NavbarBottom from "./components/common/NavbarBottom";
// import Navbar from "./components/common/Navbar";
// import RouteLoader from "./components/common/RouteLoader";
// import Footer from "./components/home/Footer";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata = {
//   title: "LEO Apparel Prints",
//   description: "Custom Sportswear & Jersey Design",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       className={`${poppins.variable} ${inter.variable} h-full antialiased`}
//     >
//       <body className="min-h-screen bg-background text-foreground font-sans">
//         {/* NavbarBottom - appears at top with higher z-index */}
//         <NavbarBottom />
        
//         {/* Navbar - fixed header with lower z-index */}
//         <Navbar />
        
//         {/* Main Content */}
//          <RouteLoader>
//         <main className="flex-1">{children}</main>
//          </RouteLoader>
         
//          <Footer />
       
//       </body>
//     </html>
//   );
// }



import { Poppins, Inter } from "next/font/google";
import "@/app/globals.css";
import {Providers} from "./providers";
import LayoutWrapper from "./LayoutWrapper"; 
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import InitGuest from "./InitGuest";
import InitInterceptors from "./InitInterceptors";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "LEO Apparel Prints",
  description: "Custom Sportswear & Jersey Design",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <Providers>
          <InitInterceptors />
           <InitGuest /> 
          <Toaster
            position="top-right"
            toastOptions={{
              className: "toast-gradient", 
            }}
          />
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
       
      </body>
    </html>
  );
}