"use client";

import { useState, useMemo, useEffect } from "react";
import type { NewsItem } from "@/data/news";
import type { EduUpdate, College, ArtsCollege, PolyCollege, MedicalCollege } from "./page";
import CollegeModal from "./CollegeModal";
import ArtsModal from "./ArtsModal";
import PolyModal from "./PolyModal";
import MedicalModal from "./MedicalModal";

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

const COL_CATS = ["Engineering", "Arts & Science", "Medical", "Polytechnic"] as const;
type ColCat = (typeof COL_CATS)[number];

const PAGE_SIZE = 10;

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

const NAAC_COLOR: Record<string, string> = {
  "A++": "#4caf50", "A+": "#66bb6a", "A": "#4fc3f7",
  "B++": "#5c8ee0", "B+": "#7986cb", "B": "#9575cd", "C": "#78909c",
};

interface Props {
  updates: EduUpdate[];
  hiddenEdu: NewsItem[];
  colleges: College[];
  artsColleges: ArtsCollege[];
  polyColleges: PolyCollege[];
  medicalColleges: MedicalCollege[];
  districts: string[];
}

export default function EduInteractive({
  updates,
  hiddenEdu,
  colleges,
  artsColleges,
  polyColleges,
  medicalColleges,
  districts,
}: Props) {
  const [sector, setSector] = useState<SectorPill>("All");
  const [statusFilter, setStatusFilter] = useState<StatusPill>("All");
  const [query, setQuery] = useState("");

  const [colQuery, setColQuery] = useState("");
  const [colDist, setColDist] = useState("All");
  const [colType, setColType] = useState("All");
  const [colCat, setColCat] = useState<ColCat>("Engineering");
  const [colPage, setColPage] = useState(1);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const [artsQuery, setArtsQuery] = useState("");
  const [artsDist, setArtsDist] = useState("All");
  const [artsMgmt, setArtsMgmt] = useState("All");
  const [artsPage, setArtsPage] = useState(1);
  const [selectedArts, setSelectedArts] = useState<ArtsCollege | null>(null);

  const [polyQuery, setPolyQuery] = useState("");
  const [polyDist, setPolyDist] = useState("All");
  const [polyType, setPolyType] = useState("All");
  const [polyPage, setPolyPage] = useState(1);
  const [selectedPoly, setSelectedPoly] = useState<PolyCollege | null>(null);

  const [medQuery, setMedQuery] = useState("");
  const [medDist, setMedDist] = useState("All");
  const [medType, setMedType] = useState("All");
  const [medPage, setMedPage] = useState(1);
  const [selectedMed, setSelectedMed] = useState<MedicalCollege | null>(null);

  useEffect(() => { setColPage(1); }, [colQuery, colDist, colType, colCat]);
  useEffect(() => { setArtsPage(1); }, [artsQuery, artsDist, artsMgmt]);
  useEffect(() => { setPolyPage(1); }, [polyQuery, polyDist, polyType]);
  useEffect(() => { setMedPage(1); }, [medQuery, medDist, medType]);

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

  const allFilteredColleges = useMemo(() => {
    if (colCat !== "Engineering") return [];
    const q = colQuery.trim().toLowerCase();
    return colleges.filter((c) => {
      const matchDist = colDist === "All" || c.district === colDist;
      const matchType = colType === "All" || c.type === colType;
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        String(c.code).includes(q) ||
        c.district.toLowerCase().includes(q);
      return matchDist && matchType && matchQ;
    });
  }, [colleges, colQuery, colDist, colType, colCat]);

  const filteredColleges = useMemo(
    () => allFilteredColleges.slice((colPage - 1) * PAGE_SIZE, colPage * PAGE_SIZE),
    [allFilteredColleges, colPage]
  );

  const totalPages = Math.ceil(allFilteredColleges.length / PAGE_SIZE);

  const uniqueTypes = Array.from(new Set(colleges.map((c) => c.type)));
  const uniqueDists = Array.from(new Set(colleges.map((c) => c.district))).sort();

  const allFilteredArts = useMemo(() => {
    const q = artsQuery.trim().toLowerCase();
    return artsColleges.filter((c) => {
      const matchDist = artsDist === "All" || c.district === artsDist;
      const matchMgmt = artsMgmt === "All" || c.management === artsMgmt;
      const matchQ = !q || c.college_name.toLowerCase().includes(q) || c.district.toLowerCase().includes(q);
      return matchDist && matchMgmt && matchQ;
    });
  }, [artsColleges, artsQuery, artsDist, artsMgmt]);
  const filteredArts = useMemo(
    () => allFilteredArts.slice((artsPage - 1) * PAGE_SIZE, artsPage * PAGE_SIZE),
    [allFilteredArts, artsPage]
  );
  const artsTotalPages = Math.ceil(allFilteredArts.length / PAGE_SIZE);
  const artsUniqueDists = Array.from(new Set(artsColleges.map((c) => c.district))).sort();

  const allFilteredPoly = useMemo(() => {
    const q = polyQuery.trim().toLowerCase();
    return polyColleges.filter((c) => {
      const matchDist = polyDist === "All" || c.district === polyDist;
      const matchType = polyType === "All" || c.college_type === polyType;
      const matchQ = !q || c.college_name.toLowerCase().includes(q) || (c.city ?? "").toLowerCase().includes(q) || c.district.toLowerCase().includes(q);
      return matchDist && matchType && matchQ;
    });
  }, [polyColleges, polyQuery, polyDist, polyType]);
  const filteredPoly = useMemo(
    () => allFilteredPoly.slice((polyPage - 1) * PAGE_SIZE, polyPage * PAGE_SIZE),
    [allFilteredPoly, polyPage]
  );
  const polyTotalPages = Math.ceil(allFilteredPoly.length / PAGE_SIZE);
  const polyUniqueDists = Array.from(new Set(polyColleges.map((c) => c.district))).sort();

  const allFilteredMed = useMemo(() => {
    const q = medQuery.trim().toLowerCase();
    return medicalColleges.filter((c) => {
      const matchDist = medDist === "All" || c.district === medDist;
      const matchType = medType === "All" || c.college_type === medType;
      const matchQ = !q || c.college_name.toLowerCase().includes(q) || (c.district ?? "").toLowerCase().includes(q) || (c.city ?? "").toLowerCase().includes(q);
      return matchDist && matchType && matchQ;
    });
  }, [medicalColleges, medQuery, medDist, medType]);
  const filteredMed = useMemo(
    () => allFilteredMed.slice((medPage - 1) * PAGE_SIZE, medPage * PAGE_SIZE),
    [allFilteredMed, medPage]
  );
  const medTotalPages = Math.ceil(allFilteredMed.length / PAGE_SIZE);
  const medUniqueDists = Array.from(new Set(medicalColleges.map((c) => c.district).filter(Boolean))).sort() as string[];

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

          <div className="col-cat-tabs" role="tablist" aria-label="College category">
            {COL_CATS.map((cat) => {
              const count = cat === "Engineering" ? colleges.length
                : cat === "Arts & Science" ? artsColleges.length
                : cat === "Polytechnic" ? polyColleges.length
                : cat === "Medical" ? medicalColleges.length
                : null;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={colCat === cat}
                  className={`col-cat-tab${colCat === cat ? " on" : ""}`}
                  onClick={() => setColCat(cat)}
                >
                  {cat}{count != null ? <span className="col-cat-cnt">{count}</span> : null}
                </button>
              );
            })}
          </div>

          {colCat === "Engineering" ? (
            <>
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
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  value={colType}
                  onChange={(e) => setColType(e.target.value)}
                  aria-label="Filter by type"
                >
                  <option value="All">All types</option>
                  {uniqueTypes.map((t) => (
                    <option key={t} value={t}>{typeLabel(t)}</option>
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
                {allFilteredColleges.length} of {colleges.length} colleges · TNEA 2025 · click row for cutoffs
              </p>

              {allFilteredColleges.length === 0 ? (
                <div className="col-coming-soon">
                  <div className="cs-icon">○</div>
                  <p>No colleges match your search.</p>
                </div>
              ) : (
                <>
                  <div className="col-table">
                    <div className="col-table-hd col-table-hd-engg">
                      <span>Code</span><span>College Name</span><span className="col-type">Type</span><span>Location</span><span />
                    </div>
                    {filteredColleges.map((c) => (
                      <button
                        className="col-row col-row-engg col-row-btn"
                        key={c.code}
                        onClick={() => setSelectedCollege(c)}
                        title="Click for cutoffs and branches"
                      >
                        <span className="code">{c.code}</span>
                        <span className="name">{c.name}</span>
                        <span className="dist">{c.city || c.district}</span>
                        <span className="type">{typeLabel(c.type)}</span>
                        <span className="arr">→</span>
                      </button>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="col-pager">
                      <button
                        className="col-pg-btn"
                        onClick={() => setColPage((p) => Math.max(1, p - 1))}
                        disabled={colPage === 1}
                        aria-label="Previous page"
                      >
                        ←
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                          (p) =>
                            p === 1 ||
                            p === totalPages ||
                            Math.abs(p - colPage) <= 2
                        )
                        .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                          if (idx > 0 && typeof arr[idx - 1] === "number" && (p as number) - (arr[idx - 1] as number) > 1) {
                            acc.push("…");
                          }
                          acc.push(p);
                          return acc;
                        }, [])
                        .map((p, i) =>
                          p === "…" ? (
                            <span
                              key={`ellipsis-${i}`}
                              style={{
                                fontFamily: "var(--mono)",
                                fontSize: "11px",
                                color: "var(--muted)",
                                padding: "0 4px",
                              }}
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={p}
                              className={`col-pg-btn${colPage === p ? " on" : ""}`}
                              onClick={() => setColPage(p as number)}
                              aria-label={`Page ${p}`}
                              aria-current={colPage === p ? "page" : undefined}
                            >
                              {p}
                            </button>
                          )
                        )}
                      <button
                        className="col-pg-btn"
                        onClick={() => setColPage((p) => Math.min(totalPages, p + 1))}
                        disabled={colPage === totalPages}
                        aria-label="Next page"
                      >
                        →
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : colCat === "Arts & Science" ? (
            <>
              <div className="col-search">
                <input
                  type="search"
                  placeholder="Search by name or district…"
                  value={artsQuery}
                  onChange={(e) => setArtsQuery(e.target.value)}
                  aria-label="Search arts colleges"
                />
                <select value={artsDist} onChange={(e) => setArtsDist(e.target.value)} aria-label="Filter by district">
                  <option value="All">All districts</option>
                  {artsUniqueDists.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={artsMgmt} onChange={(e) => setArtsMgmt(e.target.value)} aria-label="Filter by management type">
                  <option value="All">All types</option>
                  <option value="Government">Government</option>
                  <option value="Government Aided">Government Aided</option>
                  <option value="Self Financing">Self Financing</option>
                </select>
              </div>
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "10px" }}>
                {allFilteredArts.length} of {artsColleges.length} colleges · Govt + Aided + Private · TNDCE 2025 · click row for details
              </p>
              {allFilteredArts.length === 0 ? (
                <div className="col-coming-soon"><div className="cs-icon">○</div><p>No colleges match.</p></div>
              ) : (
                <>
                  <div className="col-table">
                    <div className="col-table-hd col-table-hd-arts">
                      <span>College Name</span><span className="col-dist">District</span><span>Type</span><span>NAAC</span><span />
                    </div>
                    {filteredArts.map((c) => (
                      <button key={c.college_code ?? c.college_name} className="col-row col-row-arts col-row-btn" onClick={() => setSelectedArts(c)}>
                        <span className="name">{c.college_name}</span>
                        <span className="dist">{c.district}</span>
                        <span className="type">
                          {c.management === "Government" ? "Govt" : c.management === "Government Aided" ? "Aided" : "SF"}
                        </span>
                        {c.naac_grade ? (
                          <span className="arts-naac" style={{ color: NAAC_COLOR[c.naac_grade] ?? "#aaa" }}>{c.naac_grade}</span>
                        ) : (
                          <span className="arts-naac" style={{ color: "var(--muted)" }}>—</span>
                        )}
                        <span className="arr">→</span>
                      </button>
                    ))}
                  </div>
                  {artsTotalPages > 1 && (
                    <div className="col-pager">
                      <button className="col-pg-btn" onClick={() => setArtsPage((p) => Math.max(1, p - 1))} disabled={artsPage === 1}>←</button>
                      {Array.from({ length: artsTotalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === artsTotalPages || Math.abs(p - artsPage) <= 2)
                        .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                          if (idx > 0 && typeof arr[idx - 1] === "number" && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                          acc.push(p); return acc;
                        }, [])
                        .map((p, i) => p === "…" ? (
                          <span key={`e-${i}`} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)", padding: "0 4px" }}>…</span>
                        ) : (
                          <button key={p} className={`col-pg-btn${artsPage === p ? " on" : ""}`} onClick={() => setArtsPage(p as number)}>{p}</button>
                        ))}
                      <button className="col-pg-btn" onClick={() => setArtsPage((p) => Math.min(artsTotalPages, p + 1))} disabled={artsPage === artsTotalPages}>→</button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : colCat === "Polytechnic" ? (
            <>
              <div className="col-search">
                <input
                  type="search"
                  placeholder="Search by name or district…"
                  value={polyQuery}
                  onChange={(e) => setPolyQuery(e.target.value)}
                  aria-label="Search polytechnic colleges"
                />
                <select value={polyDist} onChange={(e) => setPolyDist(e.target.value)} aria-label="Filter by district">
                  <option value="All">All districts</option>
                  {polyUniqueDists.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={polyType} onChange={(e) => setPolyType(e.target.value)} aria-label="Filter by type">
                  <option value="All">All types</option>
                  <option value="Government">Government</option>
                  <option value="Government Aided">Government Aided</option>
                  <option value="Self Financing">Self Financing</option>
                </select>
              </div>
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "10px" }}>
                {allFilteredPoly.length} of {polyColleges.length} polytechnics · Govt + Aided + Private · click row for details
              </p>
              {allFilteredPoly.length === 0 ? (
                <div className="col-coming-soon"><div className="cs-icon">○</div><p>No colleges match.</p></div>
              ) : (
                <>
                  <div className="col-table">
                    <div className="col-table-hd col-table-hd-poly">
                      <span>Code</span><span>College Name</span><span className="col-dist">District</span><span>Type</span><span />
                    </div>
                    {filteredPoly.map((c) => (
                      <button key={c.college_code ?? c.aicte_id ?? c.college_name} className="col-row col-row-poly col-row-btn" onClick={() => setSelectedPoly(c)}>
                        <span className="code">{c.college_code ?? "—"}</span>
                        <span className="name">{c.college_name}</span>
                        <span className="dist">{c.district}</span>
                        <span className="type">{c.college_type === "Government" ? "Govt" : c.college_type === "Government Aided" ? "Aided" : "SF"}</span>
                        <span className="arr">→</span>
                      </button>
                    ))}
                  </div>
                  {polyTotalPages > 1 && (
                    <div className="col-pager">
                      <button className="col-pg-btn" onClick={() => setPolyPage((p) => Math.max(1, p - 1))} disabled={polyPage === 1}>←</button>
                      {Array.from({ length: polyTotalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === polyTotalPages || Math.abs(p - polyPage) <= 2)
                        .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                          if (idx > 0 && typeof arr[idx - 1] === "number" && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                          acc.push(p); return acc;
                        }, [])
                        .map((p, i) => p === "…" ? (
                          <span key={`e-${i}`} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)", padding: "0 4px" }}>…</span>
                        ) : (
                          <button key={p} className={`col-pg-btn${polyPage === p ? " on" : ""}`} onClick={() => setPolyPage(p as number)}>{p}</button>
                        ))}
                      <button className="col-pg-btn" onClick={() => setPolyPage((p) => Math.min(polyTotalPages, p + 1))} disabled={polyPage === polyTotalPages}>→</button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : colCat === "Medical" ? (
            <>
              <div className="col-search">
                <input
                  type="search"
                  placeholder="Search by name or district…"
                  value={medQuery}
                  onChange={(e) => setMedQuery(e.target.value)}
                  aria-label="Search medical colleges"
                />
                <select value={medDist} onChange={(e) => setMedDist(e.target.value)} aria-label="Filter by district">
                  <option value="All">All districts</option>
                  {medUniqueDists.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={medType} onChange={(e) => setMedType(e.target.value)} aria-label="Filter by type">
                  <option value="All">All types</option>
                  <option value="Government">Government</option>
                  <option value="Government Aided">Government Aided</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "10px" }}>
                {allFilteredMed.length} of {medicalColleges.length} colleges · NMC-approved MBBS · click row for details
              </p>
              {allFilteredMed.length === 0 ? (
                <div className="col-coming-soon"><div className="cs-icon">○</div><p>No colleges match.</p></div>
              ) : (
                <>
                  <div className="col-table">
                    <div className="col-table-hd col-table-hd-med">
                      <span>College Name</span><span className="col-dist">District</span><span>Type</span><span />
                    </div>
                    {filteredMed.map((c) => (
                      <button key={c.college_code} className="col-row col-row-med col-row-btn" onClick={() => setSelectedMed(c)}>
                        <span className="name">{c.college_name}</span>
                        <span className="dist">{c.district ?? "—"}</span>
                        <span className="type">{c.college_type === "Government" ? "Govt" : c.college_type === "Government Aided" ? "Aided" : "Pvt"}</span>
                        <span className="arr">→</span>
                      </button>
                    ))}
                  </div>
                  {medTotalPages > 1 && (
                    <div className="col-pager">
                      <button className="col-pg-btn" onClick={() => setMedPage((p) => Math.max(1, p - 1))} disabled={medPage === 1}>←</button>
                      {Array.from({ length: medTotalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === medTotalPages || Math.abs(p - medPage) <= 2)
                        .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                          if (idx > 0 && typeof arr[idx - 1] === "number" && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                          acc.push(p); return acc;
                        }, [])
                        .map((p, i) => p === "…" ? (
                          <span key={`e-${i}`} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)", padding: "0 4px" }}>…</span>
                        ) : (
                          <button key={p} className={`col-pg-btn${medPage === p ? " on" : ""}`} onClick={() => setMedPage(p as number)}>{p}</button>
                        ))}
                      <button className="col-pg-btn" onClick={() => setMedPage((p) => Math.min(medTotalPages, p + 1))} disabled={medPage === medTotalPages}>→</button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="col-coming-soon">
              <div className="cs-icon">◌</div>
              <p>{colCat} college data — coming soon</p>
            </div>
          )}
        </div>
      </section>

      <CollegeModal college={selectedCollege} onClose={() => setSelectedCollege(null)} />
      <ArtsModal college={selectedArts} onClose={() => setSelectedArts(null)} />
      <PolyModal college={selectedPoly} onClose={() => setSelectedPoly(null)} />
      <MedicalModal college={selectedMed} onClose={() => setSelectedMed(null)} />

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
