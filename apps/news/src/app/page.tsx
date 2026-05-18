import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsList from "@/components/NewsList";

export const metadata: Metadata = {
  title: "News desk · TN-Info.in",
  description:
    "Hot + Hidden news from Tamil Nadu — mainstream stories plus stories surfaced from RTI replies, audit queues and dashboards.",
};

export default function NewsPage() {
  return (
    <>
      <Header />

      {/* Page hero */}
      <section className="page-hero">
        <div className="page">
          <div className="crumbs">
            <a href="https://tn-info.in">TN-Info.in</a>
            <span className="sep">/</span>
            <span>News desk</span>
          </div>
          <h1>
            <span className="eonly">
              The <em>news desk</em> — Tamil Nadu, what&apos;s <em>hot</em>{" "}
              &amp; what&apos;s <em>hidden</em>.
            </span>
            <span className="tonly">
              <em>செய்தி மேசை</em> — தமிழ்நாடு,{" "}
              <em>முக்கியமானவை</em> &amp; <em>கண்டுபிடிக்கப்பட்டவை</em>.
            </span>
          </h1>
          <p className="lead eonly">
            An editorial, weekly-curated feed. The <strong>HOT</strong> lane is
            the headline stuff every Tamil Nadu resident should know. The{" "}
            <strong>HIDDEN</strong> lane is what we surfaced from RTI replies,
            audit queues, internal trackers, and dashboard diffs — each row
            tells you how we found it. Search and sort below.
          </p>
          <p className="lede-ta tonly">
            இது ஆசிரியர் தேர்ந்தெடுத்த, வாரம் ஒருமுறை புதுப்பிக்கப்படும்
            பட்டியல். மக்கள் அறிய வேண்டியவை, மற்றும் RTI / தணிக்கை வரிசை /
            டாஷ்போர்டுகளில் இருந்து நாம் கண்டுபிடித்தவை.
          </p>
        </div>
      </section>

      {/* Client-rendered news list with search/sort */}
      <NewsList />

      <Footer />
    </>
  );
}
