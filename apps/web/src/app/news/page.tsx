import type { Metadata } from "next";
import NewsPageClient from "./NewsPageClient";
import { TN_NEWS } from "@/data/news";

export const metadata: Metadata = {
  title: "News desk · TN-Info.in",
  description:
    "Hot + Hidden news from Tamil Nadu — curated weekly from RTI replies, audit queues, and government dashboards.",
};

export default function NewsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="page">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">TN-Info.in</a>
            <span className="sep">/</span>
            <span>News desk</span>
          </nav>
          <h1>
            The news desk —{" "}
            <em>Tamil Nadu</em>, what&apos;s hot &amp; what&apos;s hidden
          </h1>
          <p className="lead">
            A weekly editorial pick. <strong>HOT</strong> = stories every Tamil Nadu
            resident should know. <strong>HIDDEN</strong> = stories surfaced from RTI
            replies, audit queues, and government dashboards that never made headlines.
          </p>
          <p className="lede-ta">
            வாரந்தோறும் தொகுக்கப்படும் செய்திகள் — அனைவரும் அறிய வேண்டியவை &amp;
            மறைக்கப்பட்டவை.
          </p>
        </div>
      </header>
      <main>
        <div className="page" style={{ paddingTop: "32px", paddingBottom: "80px" }}>
          <NewsPageClient hot={TN_NEWS.hot} hidden={TN_NEWS.hidden} />
        </div>
      </main>
    </>
  );
}
