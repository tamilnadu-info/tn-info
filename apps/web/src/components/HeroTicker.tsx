"use client";

import { TN_DATA } from "@/data/tn-data";

export default function HeroTicker() {
  const items = TN_DATA.ticker;
  // Duplicate for seamless CSS loop
  const doubled = [...items, ...items];

  return (
    <div className="ticker-stream" id="ts" data-testid="hero-ticker">
      {doubled.map((t, i) => (
        <span key={i}>
          <span className="tag">{t.tag}</span>
          {t.en}
          <em>{t.time}</em>
        </span>
      ))}
    </div>
  );
}
