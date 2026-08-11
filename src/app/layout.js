


// import { Poppins, Inter } from "next/font/google";
// import "@/app/globals.css";
// import { Providers } from "./providers";
// import LayoutWrapper from "./LayoutWrapper";
// import { Toaster } from "react-hot-toast";
// import Script from "next/script";
// import InitGuest from "./InitGuest";
// import InitInterceptors from "./InitInterceptors";

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
//   metadataBase: new URL("https://www.leocult.com"),

//   title: {
//     default: "LEO CULT",
//     template: "%s | LEO CULT",
//   },

//   description: "Premium custom sportswear manufacturer in Tirupur.",

//   keywords: [
//     "Sports Wear",
//     "Sports Jersey",
//     "Sports Uniform",
//     "LEO CULT",
//   ],

//   icons: {
//     icon: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },

//   openGraph: {
//     siteName: "LEO CULT",
//     locale: "en_IN",
//     type: "website",
//     images: [
//       {
//         url: "/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "LEO CULT Premium Sports Wear",
//       },
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     images: ["/og-image.jpg"],
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       className={`${poppins.variable} ${inter.variable} h-full antialiased`}
//     >
//       <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
//         <Script
//           src="https://accounts.google.com/gsi/client"
//           strategy="afterInteractive"
//         />
//         <Providers>
//           <InitInterceptors />
//           <InitGuest />
//           <Toaster
//             position="top-right"
//             toastOptions={{
//               className: "toast-gradient",
//             }}
//           />
//           <LayoutWrapper>{children}</LayoutWrapper>
//         </Providers>

//       </body>
//     </html>
//   );
// }




import { Poppins, Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "./providers";
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
  metadataBase: new URL("https://www.leocult.com"),

  title: {
    default: "LEO CULT",
    template: "%s | LEO CULT",
  },

  description: "Premium custom sportswear manufacturer in Tirupur.",

  keywords: [
    "Sports Wear",
    "Sports Jersey",
    "Sports Uniform",
    "LEO CULT",
  ],

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    siteName: "LEO CULT",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LEO CULT Premium Sports Wear",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">

        {/* Google Sign-In */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YM3MEXJJ9K"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YM3MEXJJ9K');
          `}
        </Script>

        <Providers>
          <InitInterceptors />
          <InitGuest />

          <Toaster
            position="top-right"
            toastOptions={{
              className: "toast-gradient",
            }}
          />

          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>

      </body>
    </html>
  );
}