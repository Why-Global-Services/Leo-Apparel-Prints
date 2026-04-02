import { Poppins, Inter } from "next/font/google";
import "@/app/globals.css";

import NavbarBottom from "./components/common/NavbarBottom";
import Navbar from "./components/common/Navbar";

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
      <body className="min-h-screen bg-background text-foreground font-sans">
        {/* NavbarBottom - appears at top with higher z-index */}
        <NavbarBottom />
        
        {/* Navbar - fixed header with lower z-index */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}