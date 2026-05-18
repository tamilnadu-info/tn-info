import type { MetadataRoute } from "next";
import { TN_EVENTS } from "@/data/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://events.tn-info.in";

  const eventUrls = TN_EVENTS.map((e) => ({
    url: `${base}${e.href}`,
    lastModified: new Date(e.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...eventUrls,
  ];
}
