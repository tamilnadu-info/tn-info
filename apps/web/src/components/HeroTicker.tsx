"use client";

import { TN_DATA } from "@/data/tn-data";
import { timeAgo } from "@/lib/time";

export default function HeroTicker() {
  const items = TN_DATA.ticker;
  const doubled = [...items, ...items];

  return (
    <div className="ticker-stream" id="ts" data-testid="hero-ticker">
      {doubled.map((t, i) => (
        <span key={i}>
          <span className="tag">{t.tag}</span>
          {t.en}
          <em>{timeAgo(t.time)}</em>
        </span>
      ))}
    </div>
  );
}
