import type { MetadataRoute } from "next";
import { TN_NEWS } from "@/data/news";

const BASE = "https://news.tn-info.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const hotUrls: MetadataRoute.Sitemap = TN_NEWS.hot.map((n) => ({
    url: `${BASE}/${n.id}`,
    lastModified: new Date(n.isoDate),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const hiddenUrls: MetadataRoute.Sitemap = TN_NEWS.hidden.map((n) => ({
    url: `${BASE}/${n.id}`,
    lastModified: new Date(n.isoDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    ...hotUrls,
    ...hiddenUrls,
  ];
}
