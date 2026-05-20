import Hero from "@/components/Hero";
import FocusCards from "@/components/FocusCards";
import Atlas from "@/components/Atlas";
import LiveWire from "@/components/LiveWire";
import DevSection from "@/components/DevSection";
import NewsPreview from "@/components/NewsPreview";
import EventsPreview from "@/components/EventsPreview";

export default function Home() {
  return (
    <main>
      <Hero />
      <FocusCards />
      <Atlas />
      <LiveWire />
      <NewsPreview />
      <EventsPreview />
      <DevSection />
    </main>
  );
}
