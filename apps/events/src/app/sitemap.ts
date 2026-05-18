import type { MetadataRoute } from "next";
import { TN_EVENTS } from "@/data/events";

const BASE = "https://events.tn-info.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const eventPages: MetadataRoute.Sitemap = TN_EVENTS.map((e) => ({
    url: `${BASE}${e.href}`,
    lastModified: new Date(e.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    ...eventPages,
  ];
}
