"use client";

import { useEffect, useState, useCallback } from "react";
import type { College } from "./page";

interface TneaRow {
  branch_code: string;
  branch_name: string;
  oc: number;
  bc: number;
  bcm: number;
  mbc: number;
  sc: number;
  sca: number;
  st: number;
}

type Tab = "overview" | "cutoff" | "ranks" | "seats";

const TYPE_GRADIENTS: Record<string, string> = {
  "CEG DEPTS": "linear-gradient(160deg, #0d2b0d 0%, #1e5c1e 60%, #2a7a2a 100%)",
  "GOVERNMENT ENGG COLLEGES": "linear-gradient(160deg, #0d2b1a 0%, #1a5c35 60%, #226a40 100%)",
  "GOVERNMENT AIDED COLLEGES": "linear-gradient(160deg, #0d1a2b 0%, #1a3a5c 60%, #22486a 100%)",
  "SELF FINANCING COLLEGES TIER 1": "linear-gradient(160deg, #2b0d0d 0%, #5c1a1a 60%, #7a2222 100%)",
  "SELF FINANCING COLLEGES TIER 2": "linear-gradient(160deg, #2b1a0d 0%, #5c3a1a 60%, #6a4522 100%)",
  "SELF FINANCING COLLEGES TIER 3": "linear-gradient(160deg, #1e1a1d 0%, #35282f 60%, #3d2f37 100%)",
  "ANNAMALAI UNIV": "linear-gradient(160deg, #1e0d2b 0%, #401a5c 60%, #4e2270 100%)",
  "UNIV CONSTITUENT COLLEGES": "linear-gradient(160deg, #0d1e2b 0%, #1a3c5c 60%, #224a6a 100%)",
  "CENTRAL GOVERNMENT ENGG COLLEGES COLLEGES":
    "linear-gradient(160deg, #0d0d2b 0%, #1a1a5c 60%, #22226a 100%)",
};

const TYPE_LABELS: Record<string, string> = {
  "CEG DEPTS": "Govt · CEG Anna University",
  "GOVERNMENT ENGG COLLEGES": "Government Engineering",
  "GOVERNMENT AIDED COLLEGES": "Government Aided",
  "SELF FINANCING COLLEGES TIER 1": "Private · Tier 1",
  "SELF FINANCING COLLEGES TIER 2": "Private · Tier 2",
  "SELF FINANCING COLLEGES TIER 3": "Private · Tier 3",
  "ANNAMALAI UNIV": "Annamalai University",
  "UNIV CONSTITUENT COLLEGES": "University Constituent",
  "CENTRAL GOVERNMENT ENGG COLLEGES COLLEGES": "Central Government",
};

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "cutoff", label: "Cutoff 2025" },
  { id: "ranks", label: "Ranks 2025" },
  { id: "seats", label: "Seats" },
];

const CATS: Record<string, string[]> = {
  "OC / General": ["oc", "oc_partial"],
  BC: ["bc", "bc_partial"],
  BCM: ["bcm", "bcm_partial"],
  MBC: ["mbc", "mbc_partial"],
  SC: ["sc", "sc_partial"],
  "SC(A)": ["sca", "sca_partial"],
  ST: ["st", "st_partial"],
};

interface DataStore {
  cutoff?: TneaRow[];
  ranks?: TneaRow[];
  seats?: TneaRow[];
}

function fmt(v: number) {
  return v > 0 ? v : "—";
}

function DataTable({
  rows,
  loading,
  cols,
}: {
  rows: TneaRow[];
  loading: boolean;
  cols: string[];
}) {
  if (loading) return <div className="cm-loading">Loading data…</div>;
  if (!rows.length) return <div className="cm-loading">No data available.</div>;
  return (
    <div className="cm-tbl-wrap">
      <table className="cm-tbl">
        <thead>
          <tr>
            <th className="cm-th-branch">Branch</th>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="cm-td-branch">
                <span className="cm-bn">{row.branch_name}</span>
                <span className="cm-bc">{row.branch_code}</span>
              </td>
              {cols.map((c) => {
                const key = c.toLowerCase().replace(/[^a-z]/g, "");
                const val = (row as unknown as Record<string, number>)[key] ?? 0;
                return <td key={c}>{fmt(val)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Props {
  college: College | null;
  onClose: () => void;
}

export default function CollegeModal({ college, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [store, setStore] = useState<DataStore>({});
  const [loading, setLoading] = useState(false);

  const fetchTab = useCallback(
    async (tab: Tab) => {
      if (!college) return;
      const endpoint: Record<Tab, string | null> = {
        overview: null,
        cutoff: "cutoff",
        ranks: "rank",
        seats: "allotments",
      };
      const ep = endpoint[tab];
      if (!ep || store[tab as keyof DataStore]) return;
      setLoading(true);
      try {
        const r = await fetch(
          `/api/tnea/${ep}?college=${college.code}&pageSize=200`
        );
        const d = await r.json();
        setStore((prev) => ({ ...prev, [tab]: d.data ?? [] }));
      } finally {
        setLoading(false);
      }
    },
    [college, store]
  );

  useEffect(() => {
    if (!college) return;
    setActiveTab("overview");
    setStore({});
  }, [college]);

  useEffect(() => {
    if (activeTab !== "overview") fetchTab(activeTab);
  }, [activeTab, fetchTab]);

  useEffect(() => {
    if (!college) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [college, onClose]);

  if (!college) return null;

  const gradient =
    TYPE_GRADIENTS[college.type] ??
    "linear-gradient(160deg, #1a1a1a 0%, #2d2d2d 100%)";
  const typeLabel = TYPE_LABELS[college.type] ?? college.type;
  const mapsUrl = college.gmaps_url || `https://maps.google.com/?q=${encodeURIComponent(college.name + " " + college.district + " Tamil Nadu")}`;
  const websiteUrl = college.college_url || null;

  const cutoffCols = ["OC", "BC", "BCM", "MBC", "SC", "SCA"];

  return (
    <div className="cm-shade show" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {/* ── Left panel ── */}
        <div className="cm-left" style={{ background: gradient }}>
          <div className="cm-left-glyph">{college.code}</div>

          <div className="cm-left-body">
            <div className="cm-type-badge">{typeLabel}</div>
            <h2 className="cm-college-name">{college.name}</h2>
            <div className="cm-college-meta">
              <span>{college.city || college.district}</span>
              <span className="cm-meta-sep">·</span>
              <span>{college.district}</span>
              <span className="cm-meta-sep">·</span>
              <span>Code {college.code}</span>
            </div>

            <div className="cm-left-stats">
              <div className="cm-stat">
                <b>{college.branches.length}</b>
                <span>Branches</span>
              </div>
              <div className="cm-stat">
                <b>2025</b>
                <span>Data year</span>
              </div>
              <div className="cm-stat">
                <b>TNEA</b>
                <span>Counselling</span>
              </div>
            </div>

            <div className="cm-left-links">
              <a
                className="cm-link-btn cm-link-maps"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                View on Maps
              </a>
              {websiteUrl ? (
                <a
                  className="cm-link-btn cm-link-tnea"
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  College Website
                </a>
              ) : (
                <a
                  className="cm-link-btn cm-link-tnea"
                  href="https://www.tneaonline.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  TNEA Portal
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="cm-right">
          <nav className="cm-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTab === t.id}
                className={`cm-tab${activeTab === t.id ? " on" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="cm-tab-body">
            {activeTab === "overview" && (
              <div className="cm-overview">
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">College type</div>
                  <div className="cm-ov-val">{typeLabel}</div>
                </div>
                {college.city && (
                  <div className="cm-ov-section">
                    <div className="cm-ov-lbl">City / Town</div>
                    <div className="cm-ov-val">{college.city}</div>
                  </div>
                )}
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">District</div>
                  <div className="cm-ov-val">{college.district}</div>
                </div>
                {college.constituency && (
                  <div className="cm-ov-section">
                    <div className="cm-ov-lbl">Constituency</div>
                    <div className="cm-ov-val">{college.constituency}</div>
                  </div>
                )}
                {college.pincode && (
                  <div className="cm-ov-section">
                    <div className="cm-ov-lbl">Pincode</div>
                    <div className="cm-ov-val cm-ov-mono">{college.pincode}</div>
                  </div>
                )}
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">TNEA Code</div>
                  <div className="cm-ov-val cm-ov-mono">{college.code}</div>
                </div>
                {college.branches.length > 0 && (
                  <div className="cm-ov-section cm-ov-full">
                    <div className="cm-ov-lbl">
                      Branches offered · {college.branches.length}
                    </div>
                    <div className="cm-branch-grid">
                      {college.branches.map((b) => (
                        <span key={b} className="cm-branch-pill">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="cm-ov-section cm-ov-full">
                  <div className="cm-ov-lbl">Quota categories in TNEA 2025</div>
                  <div className="cm-quota-grid">
                    {Object.keys(CATS).map((cat) => (
                      <span key={cat} className="cm-quota-pill">{cat}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cutoff" && (
              <DataTable
                rows={store.cutoff ?? []}
                loading={loading && !store.cutoff}
                cols={cutoffCols}
              />
            )}

            {activeTab === "ranks" && (
              <DataTable
                rows={store.ranks ?? []}
                loading={loading && !store.ranks}
                cols={cutoffCols}
              />
            )}

            {activeTab === "seats" && (
              <DataTable
                rows={store.seats ?? []}
                loading={loading && !store.seats}
                cols={cutoffCols}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
