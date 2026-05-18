"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TN_NEWS, type NewsItem } from "@/data/news";
import { TN_NEWS_BODIES } from "@/data/news-bodies";

interface Props {
  id: string;
}

function findNewsItem(id: string): NewsItem | undefined {
  return (
    TN_NEWS.hot.find((n) => n.id === id) ||
    TN_NEWS.hidden.find((n) => n.id === id)
  );
}

function getLane(n: NewsItem): "hot" | "hidden" {
  return TN_NEWS.hot.find((item) => item.id === n.id) ? "hot" : "hidden";
}

function getRelated(n: NewsItem): NewsItem[] {
  const lane = getLane(n);
  const pool = lane === "hot" ? TN_NEWS.hot : TN_NEWS.hidden;
  return pool.filter((item) => item.id !== n.id).slice(0, 3);
}

export default function NewsDetail({ id }: Props) {
  const [copied, setCopied] = useState(false);
  const item = findNewsItem(id);
  const bodies = item ? TN_NEWS_BODIES[item.id] : undefined;

  useEffect(() => {
    if (item) {
      document.title = `${item.headline} · TN-Info.in`;
    }
  }, [item]);

  if (!item) {
    return (
      <section className="section" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="page">
          <div
            style={{
              padding: 48,
              textAlign: "center",
              fontFamily: "var(--mono)",
              color: "var(--muted)",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Story not found.{" "}
            <Link href="/" style={{ color: "var(--terra)" }}>
              Back to news →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const lane = getLane(item);
  const related = getRelated(item);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div className="page">
        <div
          className="crumbs"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          <a href="https://tn-info.in" style={{ color: "var(--ink-2)" }}>
            TN-Info.in
          </a>
          <span
            className="sep"
            style={{ margin: "0 8px", color: "var(--line)" }}
          >
            /
          </span>
          <Link href="/" style={{ color: "var(--ink-2)" }}>
            News
          </Link>
          <span
            className="sep"
            style={{ margin: "0 8px", color: "var(--line)" }}
          >
            /
          </span>
          <span>{item.headline.slice(0, 60)}…</span>
        </div>

        <div className="detail-wrap">
          <article>
            {/* Hero */}
            <div className={`nd-hero tag-${item.tag}`}>
              <div className="nd-pills">
                <span className={`pill lane-${lane}`}>
                  {lane.toUpperCase()}
                </span>
                <span className="pill">{item.tag}</span>
              </div>
              <span className="nd-glyph">{item.glyph || item.tag.slice(0, 3)}</span>
            </div>

            {/* Eyebrow */}
            <div className="detail-eyebrow">
              <span className="dist">{item.district}</span>
              <span className="sep">·</span>
              <span className="date">{item.date}</span>
              <span className="sep">·</span>
              <span>{item.source}</span>
            </div>

            <h1 className="detail-h1 eonly">{item.headline}</h1>
            <h1
              className="detail-h1 tonly"
              style={{ fontFamily: "var(--ta)", fontWeight: 600 }}
            >
              {item.headlineTa}
            </h1>

            {/* Body paragraphs */}
            <div className="detail-body">
              {bodies ? (
                bodies.map((para, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))
              ) : (
                <p>{item.summary}</p>
              )}
            </div>

            {/* Provenance — hidden lane only */}
            {lane === "hidden" && item.whyHidden && (
              <div className="provenance">
                <span className="pv-lbl">How we found this</span>
                <p className="pv-text">{item.whyHidden}</p>
              </div>
            )}

            {/* Source citation */}
            <div className="source-block">
              <div className="sb-mark">⌘</div>
              <div className="sb-text">
                <div className="sb-lbl">Original source</div>
                <div className="sb-name">{item.source}</div>
              </div>
              <a
                className="sb-cta"
                href={item.sourceUrl}
                target="_blank"
                rel="noopener"
              >
                Open ↗
              </a>
            </div>

            {/* Related stories */}
            <div className="section-sub">
              Related stories{" "}
              <span style={{ color: "var(--ink)", marginLeft: 8 }}>
                · you might also like
              </span>
            </div>
            <div className="related-grid">
              {related.map((r) => (
                <Link key={r.id} className="related-card" href={r.href}>
                  <span className={`rc-tag nc-tag tag-${r.tag}`}>{r.tag}</span>
                  <div className="rc-head">{r.headline}</div>
                  <div className="rc-meta">
                    {r.district} · {r.date}
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <aside className="detail-side">
            <div className="side-block">
              <h4>Story facts</h4>
              <div className="row">
                <span className="k">Lane</span>
                <span className="v">{lane.toUpperCase()}</span>
              </div>
              <div className="row">
                <span className="k">Category</span>
                <span className="v">{item.tag}</span>
              </div>
              <div className="row">
                <span className="k">District</span>
                <span className="v">{item.district}</span>
              </div>
              <div className="row">
                <span className="k">Published</span>
                <span className="v">{item.date}</span>
              </div>
              <div className="row">
                <span className="k">Source</span>
                <span className="v">{item.source}</span>
              </div>
            </div>

            <div className="side-cta">
              <h4>Spot an error?</h4>
              <p>
                We aim for 100% accuracy. If something here is wrong, please
                open an issue — we ship fixes within 24h.
              </p>
              <div className="btn-row">
                <a
                  className="primary"
                  href="https://github.com/tamilnadu-info/issues"
                  target="_blank"
                  rel="noopener"
                >
                  Report ↗
                </a>
                <button className="secondary" onClick={copyLink}>
                  {copied ? "Copied!" : "Copy link"}
                </button>
              </div>
            </div>

            <div className="side-block">
              <h4>Subscribe</h4>
              <div
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                  marginBottom: 12,
                }}
              >
                Get the weekly news digest by RSS or e-mail. No newsletter spam.
              </div>
              <div className="ext-links">
                <a href="/#rss">
                  News RSS <span className="arr">↗</span>
                </a>
                <a href="https://destrosec.com/contact">
                  Weekly e-mail <span className="arr">↗</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
