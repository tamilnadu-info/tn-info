import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TN_NEWS, type NewsItem } from "@/data/news";
import { NEWS_BODIES } from "@/data/news-bodies";

function findItem(slug: string): NewsItem | undefined {
  return (
    TN_NEWS.hot.find((i) => i.id === slug) ??
    TN_NEWS.hidden.find((i) => i.id === slug)
  );
}

function getRelated(item: NewsItem): NewsItem[] {
  const all = [...TN_NEWS.hot, ...TN_NEWS.hidden];
  return all.filter((i) => i.id !== item.id && i.tag === item.tag).slice(0, 3);
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return {};
  return {
    title: `${item.headline} · TN-Info.in`,
    description: item.summary,
  };
}

export function generateStaticParams() {
  return [...TN_NEWS.hot, ...TN_NEWS.hidden].map((item) => ({
    slug: item.id,
  }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();

  const words = item.headline.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  const bodies = NEWS_BODIES[slug] ?? [];
  const related = getRelated(item);
  const isHidden = TN_NEWS.hidden.some((i) => i.id === slug);

  return (
    <>
      <header className="page-hero">
        <div className="page">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">TN-Info.in</a>
            <span className="sep">/</span>
            <a href="/news">News</a>
            <span className="sep">/</span>
            <span>{item.headline}</span>
          </nav>
          <h1>
            <em>{firstWord}</em>{rest ? ` ${rest}` : ""}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "var(--muted)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              {item.date}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "9.5px",
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: "4px",
              }}
              className={`nc-tag tag-${item.tag}`}
            >
              {item.tag}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                color: "var(--muted)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {item.district}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10.5px",
                color: "var(--ink-2)",
                letterSpacing: ".06em",
              }}
            >
              {item.source}
            </span>
          </div>
        </div>
      </header>

      <main>
        <div className="page">
          <div className="nd-body">
            {bodies.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {isHidden && item.whyHidden && (
              <div className="nd-provenance">
                <span className="prov-lbl">Why this is hidden</span>
                {item.whyHidden}
              </div>
            )}

            <div className="nd-source">
              <span className="src-name">{item.source}</span>
              <div className="src-links">
                {item.sourceUrl && item.sourceUrl !== "#" && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View source →
                  </a>
                )}
                <a href={`mailto:hello@tn-info.in?subject=Error report: ${item.id}`}>
                  Report an error
                </a>
              </div>
            </div>

            {related.length > 0 && (
              <div className="nd-related">
                <h3>Related stories</h3>
                {isHidden ? (
                  <div className="hid-list">
                    {related.map((rel) => (
                      <div className="hid-row" key={rel.id}>
                        <div className="meta-col">
                          <span className={`nc-tag tag-${rel.tag}`}>{rel.tag}</span>
                          <span className="dist">{rel.district}</span>
                        </div>
                        <div className="body-col">
                          <p className="head">
                            <a href={rel.href}>{rel.headline}</a>
                          </p>
                          {rel.whyHidden && (
                            <div className="why">
                              <span className="why-lbl">Why hidden</span>
                              {rel.whyHidden}
                            </div>
                          )}
                        </div>
                        <div className="src-col">
                          <span className="src">{rel.source}</span>
                          <span className="arr">→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="feat-grid">
                    {related.map((rel) => (
                      <a className="feat-card" href={rel.href} key={rel.id}>
                        <div className={`feat-thumb tag-${rel.tag}`}>
                          {rel.glyph && <span className="glyph">{rel.glyph}</span>}
                          <span className="tag-pill">{rel.tag}</span>
                          <span className="dist-pill">{rel.district}</span>
                        </div>
                        <div className="feat-body">
                          <div className="feat-date">{rel.date}</div>
                          <h4 className="feat-headline">{rel.headline}</h4>
                          <p className="feat-summary">{rel.summary}</p>
                          <div className="feat-foot">
                            <span className="src">{rel.source}</span>
                            <span className="arr">Read →</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
