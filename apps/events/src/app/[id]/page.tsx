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
  return {
    title: event.title,
    description: `${event.cat} · ${event.city} · ${event.dateLabel} · ${event.organiser}`,
    openGraph: {
      title: event.title,
      description: `${event.cat} · ${event.city} · ${event.dateLabel}`,
      type: "article",
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = findEvent(id);
  if (!event) notFound();

  return (
    <>
      <Header />
      <EventDetail id={id} />
      <Footer />
    </>
  );
}
