import type { Metadata } from "next";
import { Crimson_Pro, Manrope, JetBrains_Mono, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import DisclaimerModal from "@/components/DisclaimerModal";

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
  title: { template: "%s | TN-Info.in", default: "TN-Info.in — Tamil Nadu Open Data" },
  description:
    "Open-source civic data platform for Tamil Nadu — 38 districts, 234 constituencies, every scheme. Free REST API and RSS feeds.",
  keywords: [
    "Tamil Nadu",
    "TN election",
    "TNEA",
    "government schemes",
    "open data",
    "civic tech",
    "Tamil Nadu districts",
  ],
  authors: [{ name: "Destrosec", url: "https://destrosec.com" }],
  metadataBase: new URL("https://tn-info.in"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://tn-info.in",
    siteName: "TN-Info.in",
    title: "TN-Info.in — Tamil Nadu Open Data",
    description:
      "Open-source civic data platform for Tamil Nadu — 38 districts, 234 constituencies, every scheme.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TN-Info.in" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TN-Info.in — Tamil Nadu Open Data",
    description: "Open-source civic data for Tamil Nadu — free API, RSS feeds, 38 districts.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${manrope.variable} ${jetbrainsMono.variable} ${notoSansTamil.variable}`}
    >
      <body data-lang="en">
        <DisclaimerModal />
        {children}
      </body>
    </html>
  );
}
