import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: [
      "https://tn-info.in/sitemap.xml",
      "https://events.tn-info.in/sitemap.xml",
      "https://news.tn-info.in/sitemap.xml",
    ],
  };
}
