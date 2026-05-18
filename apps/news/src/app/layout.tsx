import type { Metadata } from "next";
import {
  Crimson_Pro,
  Manrope,
  JetBrains_Mono,
  Noto_Sans_Tamil,
} from "next/font/google";
import "./globals.css";
import MobileDrawer from "@/components/MobileDrawer";

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
    template: "%s | TN-Info News",
    default: "News desk · TN-Info.in",
  },
  description:
    "Hot + Hidden news from Tamil Nadu — mainstream stories plus stories surfaced from RTI replies, audit queues and dashboards.",
  keywords: [
    "Tamil Nadu news",
    "TN news",
    "RTI news",
    "hidden news Tamil Nadu",
    "civic data",
    "open data",
    "Tamil Nadu government",
  ],
  authors: [{ name: "Destrosec", url: "https://destrosec.com" }],
  metadataBase: new URL("https://news.tn-info.in"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://news.tn-info.in",
    siteName: "TN-Info.in",
    title: "News desk · TN-Info.in",
    description:
      "Hot + Hidden news from Tamil Nadu — mainstream stories plus stories surfaced from RTI replies, audit queues and dashboards.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TN-Info News" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "News desk · TN-Info.in",
    description:
      "Hot + Hidden news from Tamil Nadu — RTI-sourced, audit-surfaced, editorially curated.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
  },
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
        <MobileDrawer />
        {children}
      </body>
    </html>
  );
}
