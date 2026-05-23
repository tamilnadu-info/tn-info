"use client";

import { useEffect } from "react";
import type { ArtsCollege } from "./page";

const NAAC_GRADIENTS: Record<string, string> = {
  "A++": "linear-gradient(160deg, #0a2e0a 0%, #1a5c1a 60%, #226622 100%)",
  "A+":  "linear-gradient(160deg, #0d2b0d 0%, #1e5c1e 60%, #2a7a2a 100%)",
  "A":   "linear-gradient(160deg, #0d1f2b 0%, #1a3f5c 60%, #224d6a 100%)",
  "B++": "linear-gradient(160deg, #0d1a2b 0%, #1a3a5c 60%, #22486a 100%)",
  "B+":  "linear-gradient(160deg, #0d1020 0%, #1a2050 60%, #222862 100%)",
  "B":   "linear-gradient(160deg, #15152b 0%, #28285a 60%, #303070 100%)",
  "C":   "linear-gradient(160deg, #1e1a1e 0%, #35303a 60%, #3d3845 100%)",
};

const NAAC_COLORS: Record<string, string> = {
  "A++": "#4caf50", "A+": "#66bb6a", "A": "#4fc3f7",
  "B++": "#5c8ee0", "B+": "#7986cb", "B": "#9575cd", "C": "#78909c",
};

interface Props {
  college: ArtsCollege | null;
  onClose: () => void;
}

export default function ArtsModal({ college, onClose }: Props) {
  useEffect(() => {
    if (!college) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [college, onClose]);

  if (!college) return null;

  const gradient = college.naac_grade
    ? (NAAC_GRADIENTS[college.naac_grade] ?? "linear-gradient(160deg, #1a1a1a 0%, #2d2d2d 100%)")
    : "linear-gradient(160deg, #1a1a1a 0%, #2d2d2d 100%)";

  const gradeColor = college.naac_grade ? (NAAC_COLORS[college.naac_grade] ?? "#aaa") : "#888";

  const shortCode = college.college_code.slice(0, 4);

  const hasHostel = college.male_seats > 0 || college.female_seats > 0;

  return (
    <div className="cm-shade show" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={onClose} aria-label="Close">×</button>

        {/* ── Left panel ── */}
        <div className="cm-left" style={{ background: gradient }}>
          <div className="cm-left-glyph">{shortCode}</div>
          <div className="cm-left-body">
            <div className="cm-type-badge">{college.region} Region</div>
            <h2 className="cm-college-name">{college.college_name}</h2>
            <div className="cm-college-meta">
              <span>{college.taluk || college.district}</span>
              <span className="cm-meta-sep">·</span>
              <span>{college.district}</span>
            </div>

            <div className="cm-left-stats">
              <div className="cm-stat">
                <b>{college.sanctioned_seats ?? "—"}</b>
                <span>Seats</span>
              </div>
              <div className="cm-stat">
                <b>{college.admit_pct_2025 != null ? `${college.admit_pct_2025}%` : "—"}</b>
                <span>Filled 2025</span>
              </div>
              <div className="cm-stat">
                {college.naac_grade ? (
                  <b style={{ color: gradeColor }}>{college.naac_grade}</b>
                ) : (
                  <b style={{ color: "#666" }}>—</b>
                )}
                <span>NAAC</span>
              </div>
            </div>

            {college.nirf_rank && (
              <div style={{ marginTop: "10px" }}>
                <span className="cm-type-badge" style={{ background: "rgba(255,255,255,.12)" }}>
                  NIRF #{college.nirf_rank}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="cm-right">
          <div className="cm-tab-body" style={{ paddingTop: "8px" }}>
            <div className="cm-overview">
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">Region</div>
                <div className="cm-ov-val">{college.region}</div>
              </div>
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">District</div>
                <div className="cm-ov-val">{college.district}</div>
              </div>
              {college.taluk && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">Taluk</div>
                  <div className="cm-ov-val">{college.taluk}</div>
                </div>
              )}
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">College Code</div>
                <div className="cm-ov-val cm-ov-mono">{college.college_code}</div>
              </div>
              {college.sanctioned_seats != null && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">Sanctioned Seats</div>
                  <div className="cm-ov-val">{college.sanctioned_seats}</div>
                </div>
              )}
              {college.admit_pct_2025 != null && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">Admission % (2025)</div>
                  <div className="cm-ov-val">{college.admit_pct_2025}%</div>
                </div>
              )}
              {college.naac_grade && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">NAAC Grade</div>
                  <div className="cm-ov-val" style={{ color: gradeColor, fontWeight: 700 }}>
                    {college.naac_grade}
                  </div>
                </div>
              )}
              {college.nirf_rank && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">NIRF Rank</div>
                  <div className="cm-ov-val">#{college.nirf_rank}</div>
                </div>
              )}
              {hasHostel && (
                <div className="cm-ov-section cm-ov-full">
                  <div className="cm-ov-lbl">Hostel seats</div>
                  <div className="cm-branch-grid">
                    {college.male_seats > 0 && (
                      <span className="cm-branch-pill">Male · {college.male_seats}</span>
                    )}
                    {college.female_seats > 0 && (
                      <span className="cm-branch-pill">Female · {college.female_seats}</span>
                    )}
                  </div>
                </div>
              )}

              {college.nodal_officer_name && (
                <div className="cm-ov-section cm-ov-full arts-contact-block">
                  <div className="cm-ov-lbl">AFC Nodal Officer</div>
                  <div className="arts-contact">
                    <span className="arts-contact-name">{college.nodal_officer_name}</span>
                    {college.nodal_mobile && (
                      <a href={`tel:${college.nodal_mobile}`} className="arts-contact-link">
                        {college.nodal_mobile}
                      </a>
                    )}
                    {college.nodal_email && (
                      <a href={`mailto:${college.nodal_email}`} className="arts-contact-link">
                        {college.nodal_email}
                      </a>
                    )}
                  </div>
                </div>
              )}
              {college.addl_nodal_name && (
                <div className="cm-ov-section cm-ov-full arts-contact-block">
                  <div className="cm-ov-lbl">Additional Nodal Officer</div>
                  <div className="arts-contact">
                    <span className="arts-contact-name">{college.addl_nodal_name}</span>
                    {college.addl_mobile && (
                      <a href={`tel:${college.addl_mobile}`} className="arts-contact-link">
                        {college.addl_mobile}
                      </a>
                    )}
                    {college.addl_email && (
                      <a href={`mailto:${college.addl_email}`} className="arts-contact-link">
                        {college.addl_email}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
