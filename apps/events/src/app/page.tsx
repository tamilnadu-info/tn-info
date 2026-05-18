import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventsList from "@/components/EventsList";

export const metadata: Metadata = {
  title: "Events calendar · TN-Info.in",
  description:
    "Tamil Nadu tech and political events — conferences, hackathons, civic meetups + neutrally-listed legislative and electoral events.",
};

export default function EventsPage() {
  return (
    <>
      <Header />

      {/* Page hero */}
      <section className="page-hero">
        <div className="page">
          <div className="crumbs">
            <a href="https://tn-info.in">TN-Info.in</a>
            <span className="sep">/</span>
            <span>Events calendar</span>
          </div>
          <h1>
            <span className="eonly">
              The <em>calendar</em> — every event that needs your{" "}
              <em>attention.</em>
            </span>
            <span className="tonly">
              <em>நிகழ்வுகள்</em> — உங்கள் <em>கவனம்</em> தேவைப்படுபவை.
            </span>
          </h1>
          <p className="lead eonly">
            Tech conferences, hackathons and civic meetups alongside
            neutrally-listed political and legislative events. The political lane
            is strictly schedule-only — date, venue, organiser, no opinion.
            Download the whole set as an .ics file at the top right.
          </p>
          <p className="lede-ta tonly">
            தொழில்நுட்ப மாநாடுகள், ஹேக்காத்தான், மற்றும் சட்டப்பேரவை
            அமர்வுகள், இடைத்தேர்தல்கள் போன்ற அரசியல் நிகழ்வுகள் — எந்த
            கருத்தும் இல்லாமல், காலம்/இடம்/அமைப்பாளர் மட்டும்.
          </p>
        </div>
      </section>

      {/* Client-rendered events list */}
      <EventsList />

      <Footer />
    </>
  );
}
