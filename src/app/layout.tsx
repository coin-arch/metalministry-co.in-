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
    icon: '/images/logo1.png',
    shortcut: '/images/logo1.png',
    apple: '/images/logo1.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased flex flex-col min-h-screen bg-white text-gray-900`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
