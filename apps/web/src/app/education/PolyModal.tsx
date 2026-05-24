"use client";

import { useEffect } from "react";
import type { PolyCollege } from "./page";

interface Props {
  college: PolyCollege | null;
  onClose: () => void;
}

const TYPE_COLOR: Record<string, string> = {
  Government: "#4fc3f7",
  "Government Aided": "#66bb6a",
  "Self Financing": "#ffa726",
};

export default function PolyModal({ college, onClose }: Props) {
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

  const isWomen = college.category === "Women";
  const isGovt  = college.college_type === "Government";
  const gradient = isWomen
    ? "linear-gradient(160deg, #2b0d1a 0%, #5c1a35 60%, #7a2248 100%)"
    : isGovt
    ? "linear-gradient(160deg, #0d1a2b 0%, #1a3a5c 60%, #22486a 100%)"
    : "linear-gradient(160deg, #1a1a0d 0%, #2d3a1a 60%, #384a22 100%)";

  const typeColor = TYPE_COLOR[college.college_type] ?? "#aaa";
  const glyph = college.college_code ?? college.aicte_id?.slice(-4) ?? college.college_name.slice(0, 4).toUpperCase();

  return (
    <div className="cm-shade show" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={onClose} aria-label="Close">×</button>

        {/* ── Left panel ── */}
        <div className="cm-left" style={{ background: gradient }}>
          <div className="cm-left-glyph">{glyph}</div>
          <div className="cm-left-body">
            <div className="cm-type-badge" style={{ color: typeColor }}>
              {college.college_type} · {college.category}
            </div>
            <h2 className="cm-college-name">{college.college_name}</h2>
            <div className="cm-college-meta">
              <span>{college.city || college.district}</span>
              <span className="cm-meta-sep">·</span>
              <span>{college.district}</span>
            </div>

            <div className="cm-left-stats">
              <div className="cm-stat">
                <b>{college.total_intake ?? "—"}</b>
                <span>Total seats</span>
              </div>
              <div className="cm-stat">
                <b>{college.branches.length || "—"}</b>
                <span>Branches</span>
              </div>
              <div className="cm-stat">
                <b>{college.male_hostel === "Yes" ? "✓" : college.male_hostel === "No" ? "✗" : "—"}</b>
                <span>Male hostel</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="cm-right">
          <div className="cm-tab-body">
            <div className="cm-overview">
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">Type</div>
                <div className="cm-ov-val" style={{ color: typeColor, fontWeight: 700 }}>{college.college_type}</div>
              </div>
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">Category</div>
                <div className="cm-ov-val">{college.category}</div>
              </div>
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">District</div>
                <div className="cm-ov-val">{college.district}</div>
              </div>
              {college.city && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">City</div>
                  <div className="cm-ov-val">{college.city}</div>
                </div>
              )}
              {college.college_code && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">DOTE Code</div>
                  <div className="cm-ov-val cm-ov-mono">{college.college_code}</div>
                </div>
              )}
              {college.aicte_id && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">AICTE ID</div>
                  <div className="cm-ov-val cm-ov-mono" style={{ fontSize: "11px" }}>{college.aicte_id}</div>
                </div>
              )}
              {college.total_intake != null && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">Total intake</div>
                  <div className="cm-ov-val">{college.total_intake}</div>
                </div>
              )}
              {(college.male_hostel != null || college.female_hostel != null) && (
                <div className="cm-ov-section cm-ov-full">
                  <div className="cm-ov-lbl">Hostel</div>
                  <div className="cm-branch-grid">
                    {college.male_hostel != null && (
                      <span className={`cm-branch-pill${college.male_hostel !== "Yes" ? " cm-pill-muted" : ""}`}>
                        Male hostel · {college.male_hostel}
                      </span>
                    )}
                    {college.female_hostel != null && (
                      <span className={`cm-branch-pill${college.female_hostel !== "Yes" ? " cm-pill-muted" : ""}`}>
                        Female hostel · {college.female_hostel}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {college.branches.length > 0 && (
                <div className="cm-ov-section cm-ov-full">
                  <div className="cm-ov-lbl">Diploma branches ({college.branches.length})</div>
                  <div className="cm-branch-grid">
                    {college.branches.map((b) => (
                      <span key={b.name} className="cm-branch-pill">
                        {b.name.replace("ENGINEERING", "Engg").replace("TECHNOLOGY", "Tech")}
                        {b.intake > 0 ? ` · ${b.intake}` : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="cm-ov-section cm-ov-full">
                <div className="cm-ov-lbl">Admission portal</div>
                <div>
                  <a
                    href="https://www.tnpoly.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arts-contact-link"
                  >
                    tnpoly.in →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
