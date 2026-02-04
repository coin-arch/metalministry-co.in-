import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://forged-fitting.com'),
  title: {
    default: "Forged Fittings Manufacturer | Metal Ministry Inc.",
    template: "%s | Metal Ministry Inc."
  },
  description: "ISO 9001:2015 Certified Manufacturer & Exporter of Threaded & Socket Weld Forged Fittings. Stainless Steel, Carbon Steel, Alloy Steel, and High Nickel Alloys.",
  keywords: ["Forged Fittings", "Socket Weld Fittings", "Threaded Fittings", "Stainless Steel Fittings", "Metal Ministry Inc", "Pipe Fittings Manufacturer", "ASME B16.11"],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://forged-fitting.com',
    title: "Forged Fittings Manufacturer | Metal Ministry Inc.",
    description: "Your trusted partner for premium forged fittings. Certified Manufacturer & Exporter.",
    siteName: "Metal Ministry Inc.",
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Metal Ministry Inc.",
    "image": "https://metalministry.in/images/logo.png",
    "url": "https://metalministry.in",
    "telephone": "+91-9892171042",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "517, Prasad Chambers, Tata Road No. 2, Opera House",
      "addressLocality": "Mumbai",
      "postalCode": "400004",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.956223,
      "longitude": 72.825325
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/metalministry",
      "https://twitter.com/metalministry"
    ]
  };

  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased flex flex-col min-h-screen bg-white text-gray-900`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
