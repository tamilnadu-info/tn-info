import type { MetadataRoute } from "next";
import { TN_NEWS } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://news.tn-info.in";

  const newsUrls = [
    ...TN_NEWS.hot.map((n) => ({
      url: `${base}/${n.id}`,
      lastModified: new Date(n.isoDate),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...TN_NEWS.hidden.map((n) => ({
      url: `${base}/${n.id}`,
      lastModified: new Date(n.isoDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...newsUrls,
  ];
}
