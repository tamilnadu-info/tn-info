export default function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": "https://tn-info.in/#org",
      name: "TN-Info.in",
      alternateName: ["TN Info", "Tamil Nadu Info", "TamilNadu Info", "tn-info"],
      url: "https://tn-info.in",
      description:
        "Open-source civic data platform for Tamil Nadu covering elections, government schemes, education, and news.",
      sameAs: [
        "https://github.com/tamilnadu-info/tn-info",
        "https://news.tn-info.in",
        "https://events.tn-info.in",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://tn-info.in/#website",
      name: "TN Info — Tamil Nadu Open Data",
      alternateName: "TN Info",
      url: "https://tn-info.in",
      publisher: { "@id": "https://tn-info.in/#org" },
      inLanguage: ["en-IN", "ta"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://tn-info.in/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://tn-info.in/#webpage",
      url: "https://tn-info.in",
      name: "TN Info | Tamil Nadu Open Data — Districts, Elections, Schemes",
      isPartOf: { "@id": "https://tn-info.in/#website" },
      about: { "@id": "https://tn-info.in/#org" },
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
            item: "https://tn-info.in",
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
