import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TN_NEWS, type NewsItem } from "@/data/news";
import { NEWS_BODIES } from "@/data/news-bodies";

function findItem(slug: string): NewsItem | undefined {
  return TN_NEWS.hot.find((i) => i.id === slug) ?? TN_NEWS.hidden.find((i) => i.id === slug);
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
  return { title: item.headline, description: item.summary };
}

export function generateStaticParams() {
  return [...TN_NEWS.hot, ...TN_NEWS.hidden].map((item) => ({ slug: item.id }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();

  const isHidden = TN_NEWS.hidden.some((i) => i.id === slug);
  const lane = isHidden ? "HIDDEN" : "HOT";
  const bodies = NEWS_BODIES[slug] ?? [];
  const related = getRelated(item);

  return (
    <div className="page" style={{ paddingTop: 40 }}>
      <nav className="crumbs" aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
        <a href="/">TN-Info.in</a>
        <span className="sep">/</span>
        <a href="/news">News</a>
        <span className="sep">/</span>
        <span>{item.headline.slice(0, 48)}…</span>
      </nav>

      <div className="detail-wrap">
        <article>
          <div className={`nd-hero tag-${item.tag}`}>
            <div className="nd-pills">
              <span className={`pill lane-${lane.toLowerCase()}`}>{lane}</span>
              <span className="pill">{item.tag}</span>
            </div>
            <span className="nd-glyph">{item.glyph ?? item.tag.slice(0, 2)}</span>
          </div>

          <div className="detail-eyebrow">
            <span className="dist">{item.district}</span>
            <span className="sep">·</span>
            <span className="date">{item.date}</span>
            <span className="sep">·</span>
            <span>{item.source}</span>
          </div>

          <h1 className="detail-h1">{item.headline}</h1>
          {item.headlineTa && (
            <div className="detail-h1-ta">{item.headlineTa}</div>
          )}

          <div className="detail-body">
            {bodies.map((para, i) => <p key={i}>{para}</p>)}
            {bodies.length === 0 && <p>{item.summary}</p>}
          </div>

          {isHidden && item.whyHidden && (
            <div className="provenance">
              <span className="pv-lbl">How we found this</span>
              <p className="pv-text">{item.whyHidden}</p>
            </div>
          )}

          <div className="source-block">
            <div className="sb-mark">⌘</div>
            <div className="sb-text">
              <div className="sb-lbl">Original source</div>
              <div className="sb-name">{item.source}</div>
            </div>
            {item.sourceUrl && item.sourceUrl !== "#" && (
              <a className="sb-cta" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                Open ↗
              </a>
            )}
          </div>

          {related.length > 0 && (
            <>
              <div className="section-sub">Related stories</div>
              <div className="related-grid">
                {related.map((rel) => (
                  <a key={rel.id} className="related-card" href={rel.href}>
                    <span className={`rc-tag nc-tag tag-${rel.tag}`}>{rel.tag}</span>
                    <div className="rc-head">{rel.headline}</div>
                    <div className="rc-meta">{rel.date} · {rel.district}</div>
                  </a>
                ))}
              </div>
            </>
          )}
        </article>

        <aside className="detail-side">
          <div className="side-block">
            <h4>Story facts</h4>
            <div className="row"><span className="k">Lane</span><span className="v">{lane}</span></div>
            <div className="row"><span className="k">Category</span><span className="v">{item.tag}</span></div>
            <div className="row"><span className="k">District</span><span className="v">{item.district}</span></div>
            <div className="row"><span className="k">Published</span><span className="v">{item.date}</span></div>
            <div className="row"><span className="k">Source</span><span className="v">{item.source}</span></div>
          </div>

          <div className="side-cta">
            <h4>Spot an error?</h4>
            <p>We aim for 100% accuracy. If something here is wrong, please open an issue — we ship fixes within 24h.</p>
            <div className="cta-row">
              <a className="primary" href="https://github.com/tamilnadu-info/tn-info/issues" target="_blank" rel="noopener">
                Report ↗
              </a>
              <a className="secondary" href="/news">Back to news desk</a>
            </div>
          </div>

          <div className="side-block">
            <h4>Subscribe</h4>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-2)", marginBottom: 12 }}>
              Get the weekly news digest by RSS. No spam.
            </p>
            <div className="ext-links">
              <a href="#rss">News RSS <span className="arr">↗</span></a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
