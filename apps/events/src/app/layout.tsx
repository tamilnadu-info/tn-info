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
    template: "%s | TN Info Events",
    default: "Tech Events in Tamil Nadu | TN Info Events Calendar",
  },
  description:
    "Tech events in Tamil Nadu — conferences, hackathons, civic meetups, and political events. Tamil Nadu's open events calendar with .ics download. Free and updated.",
  keywords: [
    "tech events in TN",
    "tech events Tamil Nadu",
    "Tamil Nadu events",
    "TN events",
    "Chennai tech events",
    "hackathon Tamil Nadu",
    "hackathon TN",
    "civic meetup Tamil Nadu",
    "Tamil Nadu conference",
    "TN calendar",
    "Tamil Nadu tech",
    "TN info events",
    "events in Chennai",
    "Tamil Nadu political events",
    "open data Tamil Nadu",
  ],
  authors: [{ name: "Destrosec", url: "https://destrosec.com" }],
  metadataBase: new URL("https://events.tn-info.in"),
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", ta: "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["ta_IN"],
    url: "https://events.tn-info.in",
    siteName: "TN-Info.in",
    title: "Tech Events in Tamil Nadu | TN Info Events Calendar",
    description:
      "Tech events in Tamil Nadu — conferences, hackathons, civic meetups. Download as .ics. Bilingual (English + Tamil).",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TN Info Events — Tamil Nadu Events Calendar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Events in Tamil Nadu | TN Info Events",
    description:
      "Upcoming tech, civic, and political events in Tamil Nadu. Download as .ics.",
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
  category: "events",
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
