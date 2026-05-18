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
    template: "%s | TN-Info Events",
    default: "Events calendar · TN-Info.in",
  },
  description:
    "Tamil Nadu tech and political events — conferences, hackathons, civic meetups + neutrally-listed legislative and electoral events.",
  keywords: [
    "Tamil Nadu events",
    "TN tech events",
    "Chennai events",
    "hackathon Tamil Nadu",
    "civic tech",
    "TN Assembly",
    "Tamil Nadu calendar",
  ],
  authors: [{ name: "Destrosec", url: "https://destrosec.com" }],
  metadataBase: new URL("https://events.tn-info.in"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://events.tn-info.in",
    siteName: "TN-Info.in",
    title: "Events calendar · TN-Info.in",
    description:
      "Tamil Nadu tech and political events — conferences, hackathons, civic meetups + neutrally-listed legislative and electoral events.",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "TN-Info Events" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events calendar · TN-Info.in",
    description:
      "Tamil Nadu events — tech, political, civic. Download as .ics.",
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
