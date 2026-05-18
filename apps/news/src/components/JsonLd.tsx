import { TN_NEWS } from "@/data/news";

export default function JsonLd() {
  const recentArticles = TN_NEWS.hot.slice(0, 5).map((n) => ({
    "@type": "NewsArticle",
    headline: n.headline,
    description: n.summary,
    datePublished: n.isoDate,
    author: { "@type": "Organization", name: n.source },
    url: `https://news.tn-info.in/${n.id}`,
    articleSection: n.tag,
    keywords: [n.tag, n.district, "Tamil Nadu news", "TN news"].join(", "),
  }));

  const graph = [
    {
      "@type": "Organization",
      "@id": "https://tn-info.in/#org",
      name: "TN-Info.in",
      alternateName: ["TN Info", "Tamil Nadu Info"],
      url: "https://tn-info.in",
    },
    {
      "@type": "WebSite",
      "@id": "https://news.tn-info.in/#website",
      name: "TN News — Tamil Nadu Open News Desk",
      alternateName: ["TN News", "Tamil Nadu News"],
      url: "https://news.tn-info.in",
      publisher: { "@id": "https://tn-info.in/#org" },
      inLanguage: ["en-IN", "ta"],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://news.tn-info.in/#page",
      url: "https://news.tn-info.in",
      name: "TN News | Tamil Nadu News — Hot & Hidden Stories",
      description:
        "TN News — HOT stories and HIDDEN stories surfaced from RTI replies and audit reports. Tamil Nadu open news desk.",
      isPartOf: { "@id": "https://news.tn-info.in/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "TN Info", item: "https://tn-info.in" },
          { "@type": "ListItem", position: 2, name: "TN News", item: "https://news.tn-info.in" },
        ],
      },
    },
    ...recentArticles,
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
