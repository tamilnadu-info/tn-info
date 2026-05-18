import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventDetail from "@/components/EventDetail";
import { TN_EVENTS } from "@/data/events";

interface Props {
  params: Promise<{ id: string }>;
}

function findEvent(id: string) {
  return TN_EVENTS.find((e) => e.href === `/${id}`);
}

export async function generateStaticParams() {
  return TN_EVENTS.map((e) => ({ id: e.href.slice(1) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = findEvent(id);
  if (!event) return { title: "Event not found" };

  const description = `${event.cat} event in ${event.city}, Tamil Nadu — ${event.dateLabel}. Organised by ${event.organiser}. ${event.note}`;

  return {
    title: event.title,
    description,
    keywords: [
      event.cat.toLowerCase(),
      "Tamil Nadu",
      "TN",
      event.city,
      "tech events Tamil Nadu",
      "TN events",
      event.organiser,
    ],
    alternates: { canonical: `https://events.tn-info.in/${id}` },
    openGraph: {
      title: `${event.title} | TN Info Events`,
      description: `${event.cat} · ${event.city} · ${event.dateLabel} — ${event.organiser}`,
      type: "article",
      url: `https://events.tn-info.in/${id}`,
      siteName: "TN-Info.in",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: `${event.cat} · ${event.city} · ${event.dateLabel}`,
    },
  };
}

function EventJsonLd({ event, id }: { event: (typeof TN_EVENTS)[0]; id: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    organizer: { "@type": "Organization", name: event.organiser },
    description: event.note,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      event.city.toLowerCase() === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: event.fee === "free" || event.fee === "public",
    url: `https://events.tn-info.in${event.href}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "TN Info", item: "https://tn-info.in" },
        { "@type": "ListItem", position: 2, name: "Events", item: "https://events.tn-info.in" },
        { "@type": "ListItem", position: 3, name: event.title, item: `https://events.tn-info.in/${id}` },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = findEvent(id);
  if (!event) notFound();

  return (
    <>
      <EventJsonLd event={event} id={id} />
      <Header />
      <EventDetail id={id} />
      <Footer />
    </>
  );
}
