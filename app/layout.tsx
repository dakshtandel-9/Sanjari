import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sanjariherbalhairoil.com"),
  title: {
    default: "Sanjari Herbal Hair Oil | 100% Ayurvedic Hair Growth Solution",
    template: "%s | Sanjari Herbal Hair Oil",
  },
  description:
    "Experience the power of Ayurveda with Sanjari Herbal Hair Oil. 100% natural, chemical-free formula to stop hair fall, promote new hair growth, and restore scalp health naturally.",
  keywords: [
    "Sanjari Herbal Hair Oil",
    "Ayurvedic hair oil for hair growth",
    "natural hair growth oil",
    "stop hair fall solution",
    "best herbal hair oil in India",
    "chemical free hair oil",
    "dandruff control hair oil",
    "ayurvedic scalp treatment",
  ],
  authors: [{ name: "Sanjari Herbals" }],
  creator: "Sanjari Herbals",
  publisher: "Sanjari Herbals",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sanjari Herbal Hair Oil | 100% Ayurvedic Hair Growth Solution",
    description:
      "Experience the power of Ayurveda with Sanjari Herbal Hair Oil. Stop hair fall and promote natural growth.",
    url: "https://www.sanjariherbalhairoil.com",
    siteName: "Sanjari Herbal",
    images: [
      {
        url: "/SANJARI.png",
        width: 800,
        height: 600,
        alt: "Sanjari Herbal Hair Oil Product",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjari Herbal Hair Oil",
    description:
      "Experience the power of Ayurveda with Sanjari Herbal Hair Oil. Stop hair fall and promote natural growth.",
    images: ["/SANJARI.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Sanjari Herbal Hair Oil",
  "image": "https://www.sanjariherbalhairoil.com/SANJARI.png",
  "@id": "https://www.sanjariherbalhairoil.com",
  "url": "https://www.sanjariherbalhairoil.com",
  "telephone": "+917867078601",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123, Green Valley, Koramangala",
    "addressLocality": "Bangalore",
    "postalCode": "560034",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9279,
    "longitude": 77.6271
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
    "closes": "18:00"
  },
  "sameAs": [
    "https://facebook.com",
    "https://instagram.com"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Preloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
