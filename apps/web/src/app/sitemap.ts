import type { MetadataRoute } from "next";

const BASE = "https://tn-info.in";

const DISTRICT_IDS = [
  "tiruvallur", "chennai", "chengalpattu", "kanchipuram", "vellore",
  "ranipet", "tirupathur", "krishnagiri", "dharmapuri", "tiruvannamalai",
  "villupuram", "kallakurichi", "cuddalore", "salem", "namakkal",
  "erode", "nilgiris", "tiruppur", "coimbatore", "karur",
  "trichy", "perambalur", "ariyalur", "thanjavur", "tiruvarur",
  "nagapattinam", "mayiladuthurai", "pudukkottai", "sivaganga",
  "ramanathapuram", "dindigul", "theni", "madurai", "virudhunagar",
  "thoothukudi", "tenkasi", "tirunelveli", "kanyakumari",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/news`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/events`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/education`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/#election`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/#districts`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/#api`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const districts: MetadataRoute.Sitemap = DISTRICT_IDS.map((id) => ({
    url: `${BASE}/#district-${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...core, ...districts];
}
