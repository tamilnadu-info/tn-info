import type { Metadata } from "next";
import {
  Crimson_Pro,
  Manrope,
  JetBrains_Mono,
  Noto_Sans_Tamil,
} from "next/font/google";
import "./globals.css";
import MobileDrawer from "@/components/MobileDrawer";
import JsonLd from "@/components/JsonLd";

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
    template: "%s | TN News — TN-Info.in",
    default: "TN News | Tamil Nadu News — Hot & Hidden Stories",
  },
  description:
    "TN News — Tamil Nadu's open news desk. HOT mainstream stories and HIDDEN stories surfaced from RTI replies, audit reports, and government dashboards. Bilingual (English + Tamil).",
  keywords: [
    "TN news",
    "Tamil Nadu news",
    "TN news today",
    "Tamil Nadu today news",
    "TN blog",
    "Tamil Nadu blog",
    "TN info news",
    "RTI news Tamil Nadu",
    "hidden news Tamil Nadu",
    "Tamil Nadu government news",
    "civic data India",
    "TNEA news",
    "Tamil Nadu scheme news",
    "TN election news",
    "open data Tamil Nadu",
    "tamilnadu news",
  ],
  authors: [{ name: "Destrosec", url: "https://destrosec.com" }],
  metadataBase: new URL("https://news.tn-info.in"),
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", ta: "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["ta_IN"],
    url: "https://news.tn-info.in",
    siteName: "TN-Info.in",
    title: "TN News | Tamil Nadu News — Hot & Hidden Stories",
    description:
      "TN News — HOT stories everyone should know + HIDDEN stories from RTI replies and audit queues. Open, free, bilingual.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TN News — Tamil Nadu Open News Desk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TN News | Tamil Nadu News",
    description:
      "TN News — Hot + Hidden stories from Tamil Nadu. RTI-sourced, audit-surfaced, editorially curated.",
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
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
  },
  category: "news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${manrope.variable} ${jetbrainsMono.variable} ${notoSansTamil.variable}`}
    >
      <body data-lang="en">
        <JsonLd />
        <MobileDrawer />
        {children}
      </body>
    </html>
  );
}
