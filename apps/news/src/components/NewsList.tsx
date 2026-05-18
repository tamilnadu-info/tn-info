"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { TN_NEWS, type NewsItem } from "@/data/news";

type SortKey = "newest" | "district" | "category";

function matches(n: NewsItem, q: string): boolean {
  if (!q) return true;
  const hay = (
    n.headline +
    " " +
    n.summary +
    " " +
    n.source +
    " " +
    n.district +
    " " +
    (n.whyHidden || "")
  ).toLowerCase();
  return hay.includes(q);
}

function sortItems(items: NewsItem[], sort: SortKey): NewsItem[] {
  const copy = [...items];
  if (sort === "newest") {
    copy.sort((a, b) => (b.isoDate || "").localeCompare(a.isoDate || ""));
  } else if (sort === "district") {
    copy.sort((a, b) => a.district.localeCompare(b.district));
  } else if (sort === "category") {
    copy.sort((a, b) => a.tag.localeCompare(b.tag));
  }
  return copy;
}

function FeatCard({ n }: { n: NewsItem }) {
  return (
    <Link className="feat-card" href={n.href}>
      <div className={`feat-thumb tag-${n.tag}`}>
        <span className="tag-pill">{n.tag}</span>
        <span className="dist-pill">{n.district}</span>
        <span className="glyph">{n.glyph || n.tag.slice(0, 3)}</span>
      </div>
      <div className="feat-body">
        <div className="feat-date">{n.date}</div>
        <h4 className="feat-headline eonly">{n.headline}</h4>
        <h4
          className="feat-headline tonly"
          style={{ fontFamily: "var(--ta)", fontWeight: 600 }}
        >
          {n.headlineTa}
        </h4>
        <p className="feat-summary">{n.summary}</p>
        <div className="feat-foot">
          <span className="src">{n.source}</span>
          <span className="arr">Read →</span>
        </div>
      </div>
    </Link>
  );
}

function HidRow({ n }: { n: NewsItem }) {
  return (
    <div className="hid-row">
      <div className="meta-col">
        <span className={`nc-tag tag-${n.tag}`}>{n.tag}</span>
        <span className="dist">{n.district}</span>
      </div>
      <div className="body-col">
        <h4 className="head eonly">
          <Link href={n.href}>{n.headline}</Link>
        </h4>
        <h4
          className="head tonly"
          style={{ fontFamily: "var(--ta)", fontWeight: 600 }}
        >
          <Link href={n.href}>{n.headlineTa}</Link>
        </h4>
        <div className="why">
          <span className="why-lbl">Why this is hidden</span>
          {n.whyHidden}
        </div>
      </div>
      <div className="src-col">
        <span className="src">{n.source}</span>
        <span>{n.date}</span>
        <Link href={n.href} className="arr" aria-label="Read">
          Read →
        </Link>
      </div>
    </div>
  );
}

export default function NewsList() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const hotShown = useMemo(() => {
    return sortItems(
      TN_NEWS.hot.filter((n) => matches(n, query.toLowerCase())),
      sort
    );
  }, [query, sort]);

  const hiddenShown = useMemo(() => {
    return sortItems(
      TN_NEWS.hidden.filter((n) => matches(n, query.toLowerCase())),
      sort
    );
  }, [query, sort]);

  const total = hotShown.length + hiddenShown.length;

  return (
    <div data-testid="news-list">
      {/* Tools */}
      <section className="section" style={{ paddingTop: 32, paddingBottom: 0 }}>
        <div className="page">
          <div className="page-tools">
            <div className="search-bar">
              <div className="ic">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search news… (headline, source, district)"
                aria-label="Search news"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <span className="lbl">Sort</span>
              <div className="sort-row" style={{ display: "inline-flex" }}>
                {(["newest", "district", "category"] as SortKey[]).map((s) => (
                  <button
                    key={s}
                    className={`ev-tg${sort === s ? " on" : ""}`}
                    data-sort={s}
                    onClick={() => setSort(s)}
                  >
                    {s === "newest"
                      ? "Newest"
                      : s === "district"
                      ? "By district"
                      : "By category"}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              <span>{hotShown.length}</span> hot ·{" "}
              <span>{hiddenShown.length}</span> hidden
            </div>
          </div>
        </div>
      </section>

      {/* HOT lane */}
      <section
        className="section"
        id="hot"
        style={{ paddingTop: 24, paddingBottom: 48 }}
      >
        <div className="page">
          <div className="news-lane-hd">
            <span className="badge hot">HOT</span>
            <h3 className="eonly">
              Everyone should <em>know</em> this
            </h3>
            <h3 className="tonly">
              அனைவரும் <em>அறிய</em> வேண்டியது
            </h3>
            <span className="lane-cnt">{hotShown.length} stories</span>
          </div>
          <p className="news-lane-blurb">
            Time-sensitive, well-covered. Mainstream press carried these —
            listed here for completeness.
          </p>
          <div className="feat-grid" style={{ marginTop: 24 }}>
            {hotShown.map((n) => (
              <FeatCard key={n.id} n={n} />
            ))}
          </div>
        </div>
      </section>

      {/* HIDDEN lane */}
      <section
        className="section"
        id="hidden"
        style={{ paddingTop: 24, paddingBottom: 64 }}
      >
        <div className="page">
          <div className="news-lane-hd">
            <span className="badge hidden">HIDDEN</span>
            <h3 className="eonly">
              Stories we <em>surfaced</em>
            </h3>
            <h3 className="tonly">
              நாம் <em>கண்டுபிடித்தவை</em>
            </h3>
            <span className="lane-cnt">{hiddenShown.length} stories</span>
          </div>
          <p className="news-lane-blurb">
            Pulled from RTI replies, internal trackers, audit queues, dashboard
            diffs. Each row carries a &ldquo;Why this is hidden&rdquo; provenance
            line.
          </p>
          <div className="hid-list" style={{ marginTop: 24 }}>
            {hiddenShown.map((n) => (
              <HidRow key={n.id} n={n} />
            ))}
          </div>
          {total === 0 && (
            <div
              style={{
                display: "block",
                padding: 32,
                textAlign: "center",
                fontFamily: "var(--mono)",
                color: "var(--muted)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              No stories match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
