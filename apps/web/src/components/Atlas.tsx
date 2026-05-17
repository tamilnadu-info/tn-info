"use client";

import { useState, useMemo } from "react";
import { TN_DATA } from "@/data/tn-data";

type Region = "all" | "north" | "central" | "south" | "west";

function regionOf(d: { row: number; col: number }): string {
  if (d.row <= 2) return "north";
  if (d.row >= 7) return "south";
  if (d.col <= 1) return "west";
  return "central";
}

export default function Atlas() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region>("all");

  const districts = TN_DATA.districts;
  const total = districts.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return districts.filter((d) => {
      const matchQ = !q || d.en.toLowerCase().includes(q) || d.ta.includes(query.trim());
      const matchR = region === "all" || regionOf(d) === region;
      return matchQ && matchR;
    });
  }, [query, region, districts]);

  const filterBtns: { label: string; value: Region }[] = [
    { label: "All", value: "all" },
    { label: "North", value: "north" },
    { label: "Central", value: "central" },
    { label: "South", value: "south" },
    { label: "West", value: "west" },
  ];

  return (
    <section
      className="section"
      id="districts"
      style={{ paddingTop: "32px" }}
      data-testid="atlas"
    >
      <div className="page">
        <div className="section-head">
          <div>
            <span className="kicker">The full atlas</span>
            <h2 className="eonly">
              All <em>38</em> districts.
            </h2>
            <h2 className="tonly">
              அனைத்து <em>38</em> மாவட்டங்கள்.
            </h2>
            <p className="lead eonly">
              Click any to open its district dashboard — constituencies, MLAs, active schemes,
              colleges, and upcoming events.
            </p>
          </div>
          <div className="rhs">
            Capital marked in <span style={{ color: "var(--terra)" }}>terracotta</span>
            <br />
            Population from Census 2011
          </div>
        </div>

        <div className="atlas-tools">
          <div className="search-bar">
            <div className="ic">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
            <input
              id="distSearch"
              data-testid="dist-search"
              placeholder="Filter districts… (English or Tamil — e.g. மதுரை)"
              aria-label="Filter districts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="tag-row" id="filtRow">
            {filterBtns.map((btn) => (
              <button
                key={btn.value}
                className={`tg${region === btn.value ? " on" : ""}`}
                data-f={btn.value}
                onClick={() => setRegion(btn.value)}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="cnt" id="dcnt">
            {filtered.length} / {total}
          </div>
        </div>

        <div className="dist-grid" id="distGrid" data-testid="dist-grid">
          {districts.map((d) => {
            const isVisible =
              (region === "all" || regionOf(d) === region) &&
              (!query.trim() ||
                d.en.toLowerCase().includes(query.trim().toLowerCase()) ||
                d.ta.includes(query.trim()));
            return (
              <div
                key={d.id}
                className={`dist-card${d.capital ? " cap" : ""}`}
                data-id={d.id}
                data-name={`${d.en.toLowerCase()} ${d.ta}`}
                data-region={regionOf(d)}
                style={{ display: isVisible ? "" : "none" }}
                onClick={() => window.dispatchEvent(new CustomEvent("tn-open-district", { detail: { slug: d.id } }))}
              >
                <div className="top">
                  <div>
                    <div className="en">{d.en}</div>
                    <div className="ta">{d.ta}</div>
                  </div>
                  <div className="code">{d.en.slice(0, 3).toUpperCase()}</div>
                </div>
                <div className="row">
                  <span>
                    MLAs <b>{d.mlas}</b>
                  </span>
                  <span>
                    Pop <b>{d.pop}</b>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
