"use client";

import { useState, useEffect, useRef } from "react";

type Props = { stars: number; contributors: number };

export default function StatRotator({ stars, contributors }: Props) {
  const STATS = [
    { v: "38",                                              en: "Districts",       ta: "மாவட்டங்கள்" },
    { v: "234",                                             en: "Constituencies",  ta: "தொகுதிகள்" },
    { v: "6",                                               en: "Schemes",         ta: "திட்டங்கள்" },
    { v: "16",                                              en: "Events",          ta: "நிகழ்வுகள்" },
    { v: stars > 0 ? stars.toLocaleString("en-IN") : "—",  en: "GitHub stars",    ta: "கிட்ஹப் நட்சத்திரங்கள்" },
    { v: String(contributors),                              en: "Contributors",    ta: "பங்களிப்பாளர்கள்" },
  ];

  const [idx, setIdx] = useState(0);
  const itemRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = itemRef.current;
      if (el) {
        el.style.transform = "translateY(-120%)";
        el.style.opacity = "0";
      }
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % STATS.length);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (itemRef.current) {
              itemRef.current.style.transform = "translateY(0)";
              itemRef.current.style.opacity = "1";
            }
          })
        );
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, [STATS.length]);

  const stat = STATS[idx];

  return (
    <span className="stat-rot" id="statRot" aria-live="polite" data-testid="stat-rotator">
      <span className="roll">
        <span
          className="item"
          ref={itemRef}
          style={{ transform: "translateY(0)", opacity: 1, transition: "transform .55s cubic-bezier(.7,.05,.3,1), opacity .35s ease" }}
        >
          <b>{stat.v}</b>
          <span className="lbl">{stat.en}</span>
          <span className="ta-lbl">· {stat.ta}</span>
        </span>
      </span>
    </span>
  );
}
