import { TN_EVENTS } from "@/data/events";

export default function JsonLd() {
  const upcomingEvents = TN_EVENTS.slice(0, 10).map((e) => ({
    "@type": "Event",
    name: e.title,
    startDate: e.date,
    location: {
      "@type": "Place",
      name: e.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: e.city,
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    organizer: { "@type": "Organization", name: e.organiser },
    description: e.note,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      e.city.toLowerCase() === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: e.fee === "free" || e.fee === "public",
    url: `https://events.tn-info.in${e.href}`,
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
      "@id": "https://events.tn-info.in/#website",
      name: "TN Info Events",
      alternateName: "Tech Events in Tamil Nadu",
      url: "https://events.tn-info.in",
      publisher: { "@id": "https://tn-info.in/#org" },
      inLanguage: ["en-IN", "ta"],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://events.tn-info.in/#page",
      url: "https://events.tn-info.in",
      name: "Tech Events in Tamil Nadu | TN Info Events Calendar",
      description:
        "Upcoming tech, civic, and political events in Tamil Nadu — hackathons, conferences, meetups.",
      isPartOf: { "@id": "https://events.tn-info.in/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "TN Info", item: "https://tn-info.in" },
          { "@type": "ListItem", position: 2, name: "Events", item: "https://events.tn-info.in" },
        ],
      },
    },
    ...upcomingEvents,
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
