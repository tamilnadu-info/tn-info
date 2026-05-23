import type { Metadata } from "next";
import { Crimson_Pro, Manrope, JetBrains_Mono, Noto_Sans_Tamil } from "next/font/google";
import { SITE_URL } from "@/config/site";
import "./globals.css";
import DisclaimerModal from "@/components/DisclaimerModal";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDrawer from "@/components/MobileDrawer";
import DistrictModal from "@/components/DistrictModal";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-tamil",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FBF6EC",
};

export const metadata: Metadata = {
  title: {
    template: "%s | TN Info — TN-Info.in",
    default: "TN Info | Tamil Nadu Open Data — Districts, Elections, Schemes, News",
  },
  description:
    "TN Info — the open civic data platform for Tamil Nadu. 38 districts, 234 constituencies, 47 government schemes, tech events, and RTI-sourced news. Free REST API and RSS feeds.",
  keywords: [
    "TN Info",
    "TN",
    "Tamil Nadu",
    "Tamil Nadu info",
    "TN news",
    "TN blog",
    "Tamil Nadu news",
    "Tamil Nadu open data",
    "TN election",
    "Tamil Nadu election results",
    "TNEA",
    "Tamil Nadu government schemes",
    "tech events Tamil Nadu",
    "tech events TN",
    "Tamil Nadu districts",
    "civic data India",
    "open data Tamil Nadu",
    "TN government",
    "tamilnadu",
  ],
  authors: [{ name: "Destrosec", url: "https://destrosec.com" }],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "ta": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["ta_IN"],
    url: SITE_URL,
    siteName: "TN-Info.in",
    title: "TN Info | Tamil Nadu Open Data — Districts, Elections, Schemes",
    description:
      "TN Info — open civic data platform for Tamil Nadu. Elections, government schemes, education, tech events, and RTI-sourced news. Free API.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "TN Info — Tamil Nadu Open Data Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TN Info | Tamil Nadu Open Data",
    description:
      "TN Info — elections, schemes, TNEA, tech events, RTI news. Free API for Tamil Nadu civic data.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
  },
  category: "government",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${manrope.variable} ${jetbrainsMono.variable} ${notoSansTamil.variable}`}
    >
      <body data-lang="en">
        <JsonLd />
        <DisclaimerModal />
        <MobileDrawer />
        <DistrictModal />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
