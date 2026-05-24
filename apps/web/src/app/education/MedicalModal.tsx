"use client";

import { useEffect } from "react";
import type { MedicalCollege } from "./page";

interface Props {
  college: MedicalCollege | null;
  onClose: () => void;
}

const TYPE_COLOR: Record<string, string> = {
  Government: "#4fc3f7",
  "Government Aided": "#66bb6a",
  Private: "#ffa726",
};

export default function MedicalModal({ college, onClose }: Props) {
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

  const isGovt = college.college_type === "Government";
  const gradient = isGovt
    ? "linear-gradient(160deg, #0d1a2b 0%, #1a3a5c 60%, #22486a 100%)"
    : "linear-gradient(160deg, #1a0d0d 0%, #3a1a1a 60%, #4a2222 100%)";

  const typeColor = TYPE_COLOR[college.college_type] ?? "#aaa";
  const glyph = college.college_code.slice(0, 4).toUpperCase();

  return (
    <div className="cm-shade show" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={onClose} aria-label="Close">×</button>

        {/* ── Left panel ── */}
        <div className="cm-left" style={{ background: gradient }}>
          <div className="cm-left-glyph">{glyph}</div>
          <div className="cm-left-body">
            <div className="cm-type-badge" style={{ color: typeColor }}>
              {college.college_type} · MBBS
            </div>
            <h2 className="cm-college-name">{college.college_name}</h2>
            <div className="cm-college-meta">
              <span>{college.city || college.district || "Tamil Nadu"}</span>
              {college.district && college.city && college.district !== college.city && (
                <>
                  <span className="cm-meta-sep">·</span>
                  <span>{college.district}</span>
                </>
              )}
            </div>

            <div className="cm-left-stats">
              <div className="cm-stat">
                <b>{college.mbbs_intake ?? "—"}</b>
                <span>MBBS seats</span>
              </div>
              <div className="cm-stat">
                <b>{isGovt ? "NMC" : "NMC"}</b>
                <span>Approved by</span>
              </div>
              <div className="cm-stat">
                <b>{college.courses.length}</b>
                <span>Courses</span>
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
              {college.district && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">District</div>
                  <div className="cm-ov-val">{college.district}</div>
                </div>
              )}
              {college.city && college.city !== college.district && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">City</div>
                  <div className="cm-ov-val">{college.city}</div>
                </div>
              )}
              {college.pincode && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">Pincode</div>
                  <div className="cm-ov-val cm-ov-mono">{college.pincode}</div>
                </div>
              )}
              {college.mbbs_intake != null && (
                <div className="cm-ov-section">
                  <div className="cm-ov-lbl">MBBS intake</div>
                  <div className="cm-ov-val">{college.mbbs_intake} seats</div>
                </div>
              )}
              {college.university && (
                <div className="cm-ov-section cm-ov-full">
                  <div className="cm-ov-lbl">Affiliated to</div>
                  <div className="cm-ov-val" style={{ fontSize: "12px" }}>{college.university}</div>
                </div>
              )}
              {college.address && (
                <div className="cm-ov-section cm-ov-full">
                  <div className="cm-ov-lbl">Address</div>
                  <div className="cm-ov-val" style={{ fontSize: "12px" }}>{college.address}</div>
                </div>
              )}
              <div className="cm-ov-section cm-ov-full">
                <div className="cm-ov-lbl">Regulatory portal</div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a
                    href="https://msmer.nmc.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arts-contact-link"
                  >
                    NMC MSMER →
                  </a>
                  {isGovt && (
                    <a
                      href="https://www.tnmedicalonline.co.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arts-contact-link"
                    >
                      TN Medical Counselling →
                    </a>
                  )}
                </div>
              </div>
              {college.website && (
                <div className="cm-ov-section cm-ov-full">
                  <div className="cm-ov-lbl">Website</div>
                  <div>
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arts-contact-link"
                      style={{ wordBreak: "break-all", fontSize: "12px" }}
                    >
                      {college.website.replace(/^https?:\/\//, "")} →
                    </a>
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
