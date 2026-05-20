"use client";

import { useState, useMemo } from "react";
import type { NewsItem } from "@/data/news";

type SortMode = "newest" | "district" | "category";

function sortItems(items: NewsItem[], mode: SortMode): NewsItem[] {
  const copy = [...items];
  if (mode === "newest") return copy.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  if (mode === "district") return copy.sort((a, b) => a.district.localeCompare(b.district));
  return copy.sort((a, b) => a.tag.localeCompare(b.tag));
}

function matchesQuery(item: NewsItem, q: string): boolean {
  return `${item.headline} ${item.district} ${item.source}`.toLowerCase().includes(q);
}

function FeatCard({ item }: { item: NewsItem }) {
  return (
    <a className="feat-card" href={item.href}>
      <div className={`feat-thumb tag-${item.tag}`}>
        {item.glyph && <span className="glyph">{item.glyph}</span>}
        <span className="tag-pill">{item.tag}</span>
        <span className="dist-pill">{item.district}</span>
      </div>
      <div className="feat-body">
        <div className="feat-date">{item.date}</div>
        <h4 className="feat-headline">{item.headline}</h4>
        <p className="feat-summary">{item.summary}</p>
        <div className="feat-foot">
          <span className="src">{item.source}</span>
          <span className="arr">Read →</span>
        </div>
      </div>
    </a>
  );
}

function HidRow({ item }: { item: NewsItem }) {
  return (
    <div className="hid-row">
      <div className="meta-col">
        <span className={`nc-tag tag-${item.tag}`}>{item.tag}</span>
        <span className="dist">{item.district}</span>
      </div>
      <div className="body-col">
        <p className="head">
          <a href={item.href}>{item.headline}</a>
        </p>
        {item.whyHidden && (
          <div className="why">
            <span className="why-lbl">Why hidden</span>
            {item.whyHidden}
          </div>
        )}
      </div>
      <div className="src-col">
        <span className="src">{item.source}</span>
        <span className="arr">→</span>
      </div>
    </div>
  );
}

interface Props {
  hot: NewsItem[];
  hidden: NewsItem[];
}

export default function NewsPageClient({ hot: hotAll, hidden: hiddenAll }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");

  const q = query.trim().toLowerCase();

  const hot = useMemo(() => {
    const filtered = q ? hotAll.filter((i) => matchesQuery(i, q)) : hotAll;
    return sortItems(filtered, sort);
  }, [hotAll, q, sort]);

  const hidden = useMemo(() => {
    const filtered = q ? hiddenAll.filter((i) => matchesQuery(i, q)) : hiddenAll;
    return sortItems(filtered, sort);
  }, [hiddenAll, q, sort]);

  const totalShown = hot.length + hidden.length;
  const totalAll = hotAll.length + hiddenAll.length;

  return (
    <>
      <div className="fp-tools-row">
        <div className="search-bar" style={{ flex: "1 1 280px" }}>
          <span className="ic" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search by headline, district or source…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search news"
          />
        </div>
        <span className="lbl">Sort</span>
        <div className="sort-row" role="group" aria-label="Sort options">
          <button
            className={`ev-tg${sort === "newest" ? " on" : ""}`}
            onClick={() => setSort("newest")}
          >
            Newest
          </button>
          <button
            className={`ev-tg${sort === "district" ? " on" : ""}`}
            onClick={() => setSort("district")}
          >
            By district
          </button>
          <button
            className={`ev-tg${sort === "category" ? " on" : ""}`}
            onClick={() => setSort("category")}
          >
            By category
          </button>
        </div>
        <span className="fp-counts">
          {totalShown} / {totalAll} stories
        </span>
      </div>

      {totalShown === 0 && (
        <div className="fp-no-res">No stories match &ldquo;{query}&rdquo;</div>
      )}

      {hot.length > 0 && (
        <section aria-labelledby="hot-lane-hd" style={{ marginBottom: "56px" }}>
          <div className="news-lane-hd">
            <span className="badge hot">HOT</span>
            <h3 id="hot-lane-hd">
              Everyone should <em>know</em> this
            </h3>
            <span className="lane-cnt">{hot.length} stories</span>
          </div>
          <p className="news-lane-blurb">
            Curated weekly · not algorithmic · stories every Tamil Nadu resident should follow.
          </p>
          <div className="feat-grid">
            {hot.map((item) => (
              <FeatCard key={item.id} item={item} />
            ))}
          </div>
          <div className="see-all">
            <a href="">
              See all HOT stories <span className="arr">→</span>
              <span className="ct">{hotAll.length} total</span>
            </a>
          </div>
        </section>
      )}

      {hidden.length > 0 && (
        <section aria-labelledby="hidden-lane-hd" style={{ marginBottom: "40px" }}>
          <div className="news-lane-hd">
            <span className="badge hidden">HIDDEN</span>
            <h3 id="hidden-lane-hd">
              Stories we <em>surfaced</em>
            </h3>
            <span className="lane-cnt">{hidden.length} stories</span>
          </div>
          <p className="news-lane-blurb">
            Pulled from RTI replies, internal trackers, and audit queues. Each row carries a provenance line.
          </p>
          <div className="hid-list">
            {hidden.map((item) => (
              <HidRow key={item.id} item={item} />
            ))}
          </div>
          <div className="see-all">
            <a href="">
              See all HIDDEN stories <span className="arr">→</span>
              <span className="ct">{hiddenAll.length} total</span>
            </a>
          </div>
        </section>
      )}

      <footer
        style={{
          marginTop: "56px",
          paddingTop: "24px",
          borderTop: "1px dashed var(--line)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "11px",
            color: "var(--muted)",
            letterSpacing: ".06em",
            lineHeight: "1.7",
            maxWidth: "680px",
          }}
        >
          <strong
            style={{
              color: "var(--ink-2)",
              textTransform: "uppercase",
              letterSpacing: ".12em",
            }}
          >
            Editorial note
          </strong>{" "}
          — All stories are sourced from public records, RTI responses, government portals, and
          official department releases. TN-Info does not editorialize or fabricate. Where a source
          is marked <em>#</em>, the original document is held on file. HIDDEN stories are not
          suppressed by anyone — they simply never received mainstream coverage. We surface them
          as a public-interest service.
        </p>
      </footer>
    </>
  );
}
