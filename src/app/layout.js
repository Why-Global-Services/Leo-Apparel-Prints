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
  metadataBase: new URL("https://leocult.com"),

  title: {
    default: "LEO CULT | Premium Custom Sportswear",
    template: "%s | LEO CULT",
  },

  description:
    "LEO CULT creates premium custom sportswear, teamwear and athletic apparel for athletes, teams and brands.",

  keywords: [
    "Custom Sportswear",
    "Sports Jersey",
    "Sports Uniform",
    "Custom Teamwear",
    "LEO CULT",
    "Sportswear Manufacturer",
    "Tirupur Sportswear",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    siteName: "LEO CULT",
    locale: "en_IN",
    type: "website",
    url: "https://leocult.com/",
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
        {/* ADD GTM NOSCRIPT HERE — FIRST THING INSIDE BODY */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NXTBQBDD"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {/* ADD GTM SCRIPT HERE */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NXTBQBDD');
          `}
        </Script>

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
            gtag('config', 'G-VH18Z62S5C');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;
    n.push=n;
    n.loaded=!0;
    n.version='2.0';
    n.queue=[];
    t=b.createElement(e);
    t.async=!0;
    t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}
    (window, document, 'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '3065772337147675');
    fbq('track', 'PageView');
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

          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
