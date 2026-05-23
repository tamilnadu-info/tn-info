"use client";

import { useEffect, useState } from "react";
import type { College } from "./page";

interface CutoffRow {
  branch_code: string;
  branch_name: string;
  oc: number;
  bc: number;
  bcm: number;
  mbc: number;
  sc: number;
  sca: number;
}

const TYPE_GRADIENTS: Record<string, string> = {
  "CEG DEPTS": "linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 100%)",
  "GOVERNMENT ENGG COLLEGES": "linear-gradient(135deg, #1a3a25 0%, #2d5c3a 100%)",
  "GOVERNMENT AIDED COLLEGES": "linear-gradient(135deg, #1a2a3a 0%, #2d4a5c 100%)",
  "SELF FINANCING COLLEGES TIER 1": "linear-gradient(135deg, #3a1a1a 0%, #5c2d2d 100%)",
  "SELF FINANCING COLLEGES TIER 2": "linear-gradient(135deg, #3a2a1a 0%, #5c4a2d 100%)",
  "SELF FINANCING COLLEGES TIER 3": "linear-gradient(135deg, #2a2225 0%, #3d3035 100%)",
  "ANNAMALAI UNIV": "linear-gradient(135deg, #2a1a3a 0%, #4a2d5c 100%)",
  "UNIV CONSTITUENT COLLEGES": "linear-gradient(135deg, #1a2a3a 0%, #2d3a5c 100%)",
  "CENTRAL GOVERNMENT ENGG COLLEGES COLLEGES": "linear-gradient(135deg, #1a1a3a 0%, #2d2d5c 100%)",
};

const TYPE_LABELS: Record<string, string> = {
  "CEG DEPTS": "Govt · CEG",
  "GOVERNMENT ENGG COLLEGES": "Govt Engineering",
  "GOVERNMENT AIDED COLLEGES": "Govt Aided",
  "SELF FINANCING COLLEGES TIER 1": "Private · Tier 1",
  "SELF FINANCING COLLEGES TIER 2": "Private · Tier 2",
  "SELF FINANCING COLLEGES TIER 3": "Private · Tier 3",
  "ANNAMALAI UNIV": "Annamalai University",
  "UNIV CONSTITUENT COLLEGES": "University Constituent",
  "CENTRAL GOVERNMENT ENGG COLLEGES COLLEGES": "Central Govt",
};

interface Props {
  college: College | null;
  onClose: () => void;
}

export default function CollegeModal({ college, onClose }: Props) {
  const [cutoffs, setCutoffs] = useState<CutoffRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!college) return;
    setLoading(true);
    setCutoffs([]);
    fetch(`/api/tnea/cutoff?college=${college.code}&pageSize=200`)
      .then((r) => r.json())
      .then((d) => {
        setCutoffs(d.data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [college]);

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
    "linear-gradient(135deg, #1a1a2a 0%, #2a2a3a 100%)";
  const typeLabel = TYPE_LABELS[college.type] ?? college.type;
  const codeStr = String(college.code).padStart(4, "0");

  return (
    <div className="cm-shade show" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="cm-hd" style={{ background: gradient }}>
          <div className="cm-hd-glyph">{codeStr}</div>
          <div className="cm-hd-body">
            <div className="cm-type-tag">{typeLabel}</div>
            <h3 className="cm-name">{college.name}</h3>
            <div className="cm-dist">{college.dist} · Code {college.code}</div>
          </div>
        </div>

        <div className="cm-body">
          {college.branches.length > 0 && (
            <div className="cm-section">
              <div className="cm-section-lbl">
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

          <div className="cm-section">
            <div className="cm-section-lbl">
              2025 Cutoff Marks · Round 3 closing
            </div>
            {loading ? (
              <div className="cm-loading">Loading cutoffs…</div>
            ) : cutoffs.length === 0 ? (
              <div className="cm-loading">No cutoff data available.</div>
            ) : (
              <div className="cm-cutoff-wrap">
                <table className="cm-cutoff-tbl">
                  <thead>
                    <tr>
                      <th>Branch</th>
                      <th>OC</th>
                      <th>BC</th>
                      <th>BCM</th>
                      <th>MBC</th>
                      <th>SC</th>
                      <th>SCA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cutoffs.map((row, i) => (
                      <tr key={i}>
                        <td className="cm-branch-name">
                          {row.branch_name}
                          <span className="cm-bc">{row.branch_code}</span>
                        </td>
                        <td>{row.oc || "—"}</td>
                        <td>{row.bc || "—"}</td>
                        <td>{row.bcm || "—"}</td>
                        <td>{row.mbc || "—"}</td>
                        <td>{row.sc || "—"}</td>
                        <td>{row.sca || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
