"use client";

import { useState, useMemo } from "react";
import type { NewsItem } from "@/data/news";
import type { EduUpdate, College } from "./page";

const TYPE_LABELS: Record<string, string> = {
  "CEG DEPTS": "Govt (CEG)",
  "GOVERNMENT ENGG COLLEGES": "Govt Engineering",
  "GOVERNMENT AIDED COLLEGES": "Govt Aided",
  "SELF FINANCING COLLEGES TIER 1": "Private Tier 1",
  "SELF FINANCING COLLEGES TIER 2": "Private Tier 2",
  "SELF FINANCING COLLEGES TIER 3": "Private Tier 3",
  "ANNAMALAI UNIV": "Annamalai Univ",
  "UNIV CONSTITUENT COLLEGES": "Univ Constituent",
  "CENTRAL GOVERNMENT ENGG COLLEGES COLLEGES": "Central Govt",
};

function typeLabel(t: string) {
  return TYPE_LABELS[t] ?? t;
}

const SECTOR_PILLS = [
  "All",
  "TNEA",
  "TNPSC",
  "TANCA",
  "Scholarship",
  "School",
  "SCERT",
] as const;

const STATUS_PILLS = ["All", "Active", "Upcoming", "Closed"] as const;

type SectorPill = (typeof SECTOR_PILLS)[number];
type StatusPill = (typeof STATUS_PILLS)[number];

function UpdRow({ item, featured }: { item: EduUpdate; featured?: boolean }) {
  const statusColor =
    item.status === "active"
      ? "var(--forest)"
      : item.status === "upcoming"
      ? "var(--warn)"
      : "var(--muted)";

  return (
    <a
      className={`upd-row${featured ? " featured" : ""}`}
      href={item.href}
    >
      <div>
        <div className="meta">
              <span className="nc-tag tag-EDUCATION">{item.tag}</span>
          <span className="det-meta-item" style={{ color: statusColor }}>{item.status}</span>
          <span className="src">{item.source}</span>
        </div>
        <p className="head">{item.headline}</p>
        <p className="sub">{item.summary}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
        <span className="det-meta-item" style={{ whiteSpace: "nowrap" }}>{item.date}</span>
        <span className="arr">→</span>
      </div>
    </a>
  );
}

function HiddenRow({ item }: { item: NewsItem }) {
  return (
    <a className="upd-row hidden-row" href={item.href}>
      <div>
        <div className="meta">
          <span className={`nc-tag tag-${item.tag}`}>{item.tag}</span>
          <span className="src">{item.district}</span>
        </div>
        <p className="head">{item.headline}</p>
        <p className="sub">{item.summary}</p>
        {item.whyHidden && (
          <div className="why">
            <span className="why-lbl">Why hidden</span>
            {item.whyHidden}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
        <span className="det-meta-item" style={{ whiteSpace: "nowrap" }}
        >
          {item.date}
        </span>
        <span className="arr">→</span>
      </div>
    </a>
  );
}

interface Props {
  updates: EduUpdate[];
  hiddenEdu: NewsItem[];
  colleges: College[];
  districts: string[];
}

export default function EduInteractive({
  updates,
  hiddenEdu,
  colleges,
  districts,
}: Props) {
  const [sector, setSector] = useState<SectorPill>("All");
  const [statusFilter, setStatusFilter] = useState<StatusPill>("All");
  const [query, setQuery] = useState("");

  const [colQuery, setColQuery] = useState("");
  const [colDist, setColDist] = useState("All");
  const [colType, setColType] = useState("All");

  const filteredUpdates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return updates.filter((u) => {
      const matchSector = sector === "All" || u.tag === sector;
      const matchStatus =
        statusFilter === "All" ||
        u.status === statusFilter.toLowerCase();
      const matchQuery =
        !q ||
        u.headline.toLowerCase().includes(q) ||
        u.source.toLowerCase().includes(q) ||
        u.summary.toLowerCase().includes(q);
      return matchSector && matchStatus && matchQuery;
    });
  }, [updates, sector, statusFilter, query]);

  const filteredColleges = useMemo(() => {
    const q = colQuery.trim().toLowerCase();
    return colleges.filter((c) => {
      const matchDist = colDist === "All" || c.dist === colDist;
      const matchType = colType === "All" || c.type === colType;
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        String(c.code).includes(q) ||
        c.dist.toLowerCase().includes(q);
      return matchDist && matchType && matchQ;
    });
  }, [colleges, colQuery, colDist, colType]);

  const uniqueTypes = Array.from(new Set(colleges.map((c) => c.type)));
  const uniqueDists = Array.from(new Set(colleges.map((c) => c.dist))).sort();

  return (
    <>
      <section aria-labelledby="edu-updates-hd" style={{ marginBottom: "48px" }}>
        <div className="news-lane-hd" style={{ marginBottom: "20px" }}>
          <span className="badge" style={{ background: "rgba(226,160,63,.18)", color: "var(--warn)" }}>UPDATES</span>
          <h3 id="edu-updates-hd">All education <em>notifications</em></h3>
          <span className="lane-cnt">{filteredUpdates.length} / {updates.length}</span>
        </div>

        <div className="edu-tools">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="lbl">Sector</span>
            <div className="pill-row" role="group" aria-label="Filter by sector">
              {SECTOR_PILLS.map((p) => (
                <button
                  key={p}
                  className={`pill${sector === p ? " on" : ""}`}
                  onClick={() => setSector(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="lbl">Status</span>
            <div className="pill-row" role="group" aria-label="Filter by status">
              {STATUS_PILLS.map((p) => (
                <button
                  key={p}
                  className={`pill${statusFilter === p ? " on" : ""}`}
                  onClick={() => setStatusFilter(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="lbl">Search</span>
            <div className="search-bar" style={{ flex: "1 1 260px" }}>
              <span className="ic" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search updates…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search education updates"
              />
            </div>
          </div>
        </div>

        {filteredUpdates.length === 0 ? (
          <div className="fp-no-res">No updates match your filters.</div>
        ) : (
          <div className="upd-list">
            {filteredUpdates.map((u, i) => (
              <UpdRow key={u.id} item={u} featured={i === 0 && sector === "All"} />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="hidden-edu-hd" style={{ marginBottom: "56px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              padding: "5px 9px",
              borderRadius: "var(--r-sm)",
              background: "var(--ink)",
              color: "var(--bg)",
            }}
          >
            HIDDEN
          </span>
          <h2
            id="hidden-edu-hd"
            style={{
              margin: 0,
              fontFamily: "var(--serif)",
              fontSize: "22px",
              fontWeight: 500,
              letterSpacing: "-.01em",
            }}
          >
            Stories we <em style={{ fontStyle: "italic", color: "var(--terra)" }}>surfaced</em>
          </h2>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--mono)",
              fontSize: "11px",
              color: "var(--muted)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {hiddenEdu.length} stories
          </span>
        </div>

        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "11px",
            color: "var(--muted)",
            letterSpacing: ".04em",
            lineHeight: 1.6,
            marginBottom: "16px",
          }}
        >
          Education, health and environment stories pulled from RTI replies, internal trackers and audit
          queues — never made mainstream headlines.
        </p>

        {hiddenEdu.length === 0 ? (
          <div className="fp-no-res">No hidden stories in this category yet.</div>
        ) : (
          <div className="upd-list">
            {hiddenEdu.map((item) => (
              <HiddenRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="college-search-hd" style={{ marginBottom: "56px" }}>
        <div className="col-panel">
          <div className="cp-hd">
            <div>
              <h3 id="college-search-hd">
                All <em>{colleges.length}</em> engineering colleges · searchable
              </h3>
              <div className="ta">அனைத்து {colleges.length} பொறியியல் கல்லூரிகள் — தேடக்கூடியது</div>
            </div>
            <a
              className="lk"
              href="https://www.tneaonline.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Full list on tneaonline.org →
            </a>
          </div>

          <div className="col-search">
            <input
              type="search"
              placeholder="Search by name, code or district…"
              value={colQuery}
              onChange={(e) => setColQuery(e.target.value)}
              aria-label="Search colleges"
            />
            <select
              value={colDist}
              onChange={(e) => setColDist(e.target.value)}
              aria-label="Filter by district"
            >
              <option value="All">All districts</option>
              {uniqueDists.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={colType}
              onChange={(e) => setColType(e.target.value)}
              aria-label="Filter by type"
            >
              <option value="All">All types</option>
              {uniqueTypes.map((t) => (
                <option key={t} value={t}>
                  {typeLabel(t)}
                </option>
              ))}
            </select>
          </div>

          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              color: "var(--muted)",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            {filteredColleges.length} of {colleges.length} colleges · TNEA 2025 data
          </p>

          {filteredColleges.length === 0 ? (
            <div
              style={{
                padding: "32px",
                textAlign: "center",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--muted)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                border: "1px dashed var(--line)",
                borderRadius: "var(--r-md)",
              }}
            >
              No colleges match your search.
            </div>
          ) : (
            <div className="col-table">
              {filteredColleges.map((c) => (
                <div className="col-row" key={c.code}>
                  <span className="code">{c.code}</span>
                  <span className="name">{c.name}</span>
                  <span className="dist">{c.dist}</span>
                  <span className="type">{typeLabel(c.type)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="quick-tools-hd" style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <h2
            id="quick-tools-hd"
            style={{
              margin: 0,
              fontFamily: "var(--serif)",
              fontSize: "22px",
              fontWeight: 500,
              letterSpacing: "-.01em",
            }}
          >
            Quick <em style={{ fontStyle: "italic", color: "var(--terra)" }}>tools</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "14px",
          }}
        >
          <div className="comp-app">
            <div className="ap-glyph">T</div>
            <div className="ap-body">
              <div className="ap-kicker">TNEA Tool</div>
              <p className="ap-name">TNEA Cutoff Checker</p>
              <p className="ap-ta">TNEA கட்-ஆஃப் சரிபார்ப்பு</p>
              <p className="ap-blurb">
                Check last-year closing ranks for any college and branch.
                Compare across counselling rounds.
              </p>
              <span className="ap-stat">423 colleges · 116 branches</span>
            </div>
            <span className="ap-cta">Try →</span>
          </div>

          <div className="comp-app">
            <div className="ap-glyph">C</div>
            <div className="ap-body">
              <div className="ap-kicker">Atlas Tool</div>
              <p className="ap-name">College Atlas</p>
              <p className="ap-ta">கல்லூரி வரைபடம்</p>
              <p className="ap-blurb">
                Browse all 423 colleges on an interactive district map.
                Filter by type, management, and intake.
              </p>
              <span className="ap-stat">38 districts covered</span>
            </div>
            <span className="ap-cta">Open →</span>
          </div>

          <div className="comp-app">
            <div className="ap-glyph">S</div>
            <div className="ap-body">
              <div className="ap-kicker">Scholarship Tool</div>
              <p className="ap-name">Scholarship Eligibility</p>
              <p className="ap-ta">உதவித்தொகை தகுதி சரிபார்ப்பு</p>
              <p className="ap-blurb">
                Find every state scholarship you qualify for — Pudhumai Penn,
                BC, SC/SCA, Minority, and central schemes.
              </p>
              <span className="ap-stat">14 active schemes</span>
            </div>
            <span className="ap-cta">Check →</span>
          </div>

          <div className="comp-app">
            <div className="ap-glyph">N</div>
            <div className="ap-body">
              <div className="ap-kicker">TNPSC Tool</div>
              <p className="ap-name">TNPSC Tracker</p>
              <p className="ap-ta">TNPSC தேர்வு கண்காணிப்பு</p>
              <p className="ap-blurb">
                Track all active TNPSC notifications — Group 1, 2, 2A, 4 and
                VAO. Application deadlines, exam dates, results.
              </p>
              <span className="ap-stat">4,002 vacancies open now</span>
            </div>
            <span className="ap-cta">Track →</span>
          </div>
        </div>
      </section>
    </>
  );
}
