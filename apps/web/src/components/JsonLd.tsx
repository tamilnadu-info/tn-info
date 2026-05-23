import { SITE_URL } from "@/config/site";

export default function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "TN-Info.in",
      alternateName: ["TN Info", "Tamil Nadu Info", "TamilNadu Info", "tn-info"],
      url: SITE_URL,
      description:
        "Open-source civic data platform for Tamil Nadu covering elections, government schemes, education, and news.",
      sameAs: ["https://github.com/tamilnadu-info/tn-info"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "TN Info — Tamil Nadu Open Data",
      alternateName: "TN Info",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: ["en-IN", "ta"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "TN Info | Tamil Nadu Open Data — Districts, Elections, Schemes",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#org` },
      description:
        "TN Info — open civic data for Tamil Nadu. 38 districts, 234 constituencies, 47 schemes, TNEA counselling, tech events and RTI-sourced news.",
      inLanguage: "en-IN",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "TN Info",
            item: SITE_URL,
          },
        ],
      },
    },
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
