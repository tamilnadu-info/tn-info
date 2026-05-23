"use client";

import { useEffect } from "react";
import type { PolyCollege } from "./page";

interface Props {
  college: PolyCollege | null;
  onClose: () => void;
}

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
  const gradient = isWomen
    ? "linear-gradient(160deg, #2b0d1a 0%, #5c1a35 60%, #7a2248 100%)"
    : "linear-gradient(160deg, #0d1a2b 0%, #1a3a5c 60%, #22486a 100%)";

  return (
    <div className="cm-shade show" onClick={onClose}>
      <div className="cm-modal poly-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={onClose} aria-label="Close">×</button>

        {/* ── Left panel ── */}
        <div className="cm-left" style={{ background: gradient }}>
          <div className="cm-left-glyph">{college.college_code}</div>
          <div className="cm-left-body">
            <div className="cm-type-badge">Government Polytechnic</div>
            <h2 className="cm-college-name">{college.college_name}</h2>
            <div className="cm-college-meta">
              <span>{college.city || college.district}</span>
              <span className="cm-meta-sep">·</span>
              <span>{college.district}</span>
            </div>

            <div className="cm-left-stats">
              <div className="cm-stat">
                <b>{isWomen ? "Women" : "Co-ed"}</b>
                <span>Category</span>
              </div>
              <div className="cm-stat">
                <b>{college.male_hostel === "Yes" ? "✓" : "—"}</b>
                <span>Male hostel</span>
              </div>
              <div className="cm-stat">
                <b>{college.female_hostel === "Yes" ? "✓" : "—"}</b>
                <span>Female hostel</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="cm-right">
          <div className="cm-tab-body" style={{ paddingTop: "8px" }}>
            <div className="cm-overview">
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">College Code</div>
                <div className="cm-ov-val cm-ov-mono">{college.college_code}</div>
              </div>
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">Type</div>
                <div className="cm-ov-val">{college.college_type}</div>
              </div>
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">Category</div>
                <div className="cm-ov-val">{college.category}</div>
              </div>
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">City</div>
                <div className="cm-ov-val">{college.city}</div>
              </div>
              <div className="cm-ov-section">
                <div className="cm-ov-lbl">District</div>
                <div className="cm-ov-val">{college.district}</div>
              </div>
              <div className="cm-ov-section cm-ov-full">
                <div className="cm-ov-lbl">Hostel facilities</div>
                <div className="cm-branch-grid">
                  <span className={`cm-branch-pill${college.male_hostel !== "Yes" ? " cm-pill-muted" : ""}`}>
                    Male hostel · {college.male_hostel}
                  </span>
                  <span className={`cm-branch-pill${college.female_hostel !== "Yes" ? " cm-pill-muted" : ""}`}>
                    Female hostel · {college.female_hostel}
                  </span>
                </div>
              </div>
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
