"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { TN_EVENTS, type EventItem } from "@/data/events";

type FilterKind = "all" | "tech" | "political";
type SortKey = "date" | "city" | "cat";

const FEE_LABELS: Record<string, string> = {
  free: "FREE",
  paid: "PAID",
  public: "PUBLIC",
  invite: "INVITE ONLY",
};

function daysUntil(iso: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const ms = new Date(iso).getTime() - now.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function untilLabel(iso: string): string {
  const d = daysUntil(iso);
  if (d < 0) return `${Math.abs(d)} days ago`;
  if (d === 0) return "today";
  if (d === 1) return "tomorrow";
  if (d < 7) return `in ${d} days`;
  if (d < 30) return `in ${Math.round(d / 7)} weeks`;
  return `in ${Math.round(d / 30)} months`;
}

function dayNum(iso: string): number {
  return new Date(iso).getUTCDate();
}
function monthShort(iso: string): string {
  return new Date(iso)
    .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();
}
function monthKey(iso: string): string {
  return iso.slice(0, 7);
}
function monthLabel(key: string): string {
  const d = new Date(key + "-01");
  return d.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function filterAndSort(
  list: EventItem[],
  kind: FilterKind,
  query: string,
  sort: SortKey
): EventItem[] {
  let arr = [...list];
  if (kind !== "all") arr = arr.filter((e) => e.kind === kind);
  if (query) {
    const q = query.toLowerCase();
    arr = arr.filter((e) =>
      (e.title + " " + e.note + " " + e.city + " " + e.venue + " " + e.organiser + " " + e.cat)
        .toLowerCase()
        .includes(q)
    );
  }
  if (sort === "date") arr.sort((a, b) => a.date.localeCompare(b.date));
  else if (sort === "city") arr.sort((a, b) => a.city.localeCompare(b.city));
  else if (sort === "cat") arr.sort((a, b) => a.cat.localeCompare(b.cat));
  return arr;
}

function groupByMonth(events: EventItem[]): [string, EventItem[]][] {
  const groups = new Map<string, EventItem[]>();
  events.forEach((e) => {
    const k = monthKey(e.date);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(e);
  });
  return [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
function toIcsDate(iso: string): string {
  const d = new Date(iso);
  return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate());
}
function downloadIcs(events: EventItem[]) {
  if (!events.length) return;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TN-Info.in//Events//EN",
    "CALSCALE:GREGORIAN",
  ];
  events.forEach((e, i) => {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:tn-info-${i}-${e.date}@tn-info.in`);
    lines.push(`DTSTAMP:${stamp}`);
    lines.push(`DTSTART;VALUE=DATE:${toIcsDate(e.date)}`);
    lines.push(`SUMMARY:${e.title.replace(/[,;\\]/g, " ")}`);
    lines.push(`LOCATION:${(e.venue + ", " + e.city).replace(/[,;\\]/g, " ")}`);
    lines.push(`DESCRIPTION:${(e.organiser + " — " + e.note).replace(/[,;\\]/g, " ")}`);
    lines.push(`CATEGORIES:${e.kind.toUpperCase()},${e.cat}`);
    lines.push("END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tn-info-events.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function EvCard({ e }: { e: EventItem }) {
  const du = daysUntil(e.date);
  const soon = du <= 14 && du >= 0;
  const feeLabel = FEE_LABELS[e.fee] || e.fee.toUpperCase();
  return (
    <Link
      className={`ev-card kind-${e.kind}${soon ? " is-soon" : ""}`}
      href={e.href}
    >
      <div className="ev-date">
        <div className="ev-day">{dayNum(e.date)}</div>
        <div className="ev-mon">{monthShort(e.date)}</div>
      </div>
      <div className="ev-body">
        <div className="ev-meta">
          <span className="ev-kind">
            {e.kind === "tech" ? "TECH" : "POLITICAL"}
          </span>
          <span className="ev-cat">{e.cat}</span>
          <span className={`ev-fee fee-${e.fee}`}>{feeLabel}</span>
          <span className="ev-until">{untilLabel(e.date)}</span>
        </div>
        <h4 className="ev-title eonly">{e.title}</h4>
        <h4
          className="ev-title tonly"
          style={{ fontFamily: "var(--ta)", fontWeight: 600 }}
        >
          {e.titleTa}
        </h4>
        <div className="ev-where">
          <b>{e.city}</b> · {e.venue}
        </div>
        <div className="ev-note">{e.note}</div>
        <div className="ev-foot">
          <span className="ev-org">{e.organiser}</span>
          <span className="ev-rsvp">{e.rsvp} →</span>
        </div>
      </div>
    </Link>
  );
}

export default function EventsList() {
  const [kind, setKind] = useState<FilterKind>("all");
  const [sort, setSort] = useState<SortKey>("date");
  const [query, setQuery] = useState("");
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const spyObserverRef = useRef<IntersectionObserver | null>(null);

  const shown = useMemo(
    () => filterAndSort(TN_EVENTS, kind, query, sort),
    [kind, query, sort]
  );

  const groups = useMemo(
    () => (sort === "date" ? groupByMonth(shown) : null),
    [shown, sort]
  );

  const setupScrollSpy = useCallback(() => {
    if (spyObserverRef.current) spyObserverRef.current.disconnect();
    spyObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset.month;
            if (key) setActiveMonth(key);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    document.querySelectorAll(".month-group[data-month]").forEach((sec) =>
      spyObserverRef.current!.observe(sec)
    );
  }, []);

  useEffect(() => {
    if (sort === "date" && groups && groups.length > 0) {
      const id = requestAnimationFrame(setupScrollSpy);
      return () => cancelAnimationFrame(id);
    }
  }, [groups, sort, setupScrollSpy]);

  useEffect(() => {
    return () => {
      if (spyObserverRef.current) spyObserverRef.current.disconnect();
    };
  }, []);

  const scrollToMonth = (key: string) => {
    const sec = document.getElementById(`month-${key}`);
    if (sec) {
      const offset = sec.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div data-testid="events-list">
      {/* Tools row 1 */}
      <section className="section" style={{ paddingTop: 32, paddingBottom: 0 }}>
        <div className="page">
          <div
            className="page-tools"
            style={{ gridTemplateColumns: "minmax(0, 1.4fr) auto" }}
          >
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
                type="search"
                placeholder="Search events… (title, organiser, city, venue)"
                aria-label="Search events"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button
                className="btn btn-secondary"
                style={{ padding: "10px 16px", fontSize: 13 }}
                onClick={() => downloadIcs(shown)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ verticalAlign: -2, marginRight: 4 }}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Download .ics
              </button>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                {shown.length} / {TN_EVENTS.length}
              </span>
            </div>
          </div>

          {/* Tools row 2 */}
          <div
            className="page-tools"
            style={{
              gridTemplateColumns: "auto 1fr",
              padding: "10px 14px",
              marginTop: -14,
              borderTop: "none",
              borderRadius: "0 0 var(--r-lg) var(--r-lg)",
            }}
          >
            <div>
              <span className="lbl">Kind</span>
              <div className="filter-row" style={{ display: "inline-flex" }}>
                {(["all", "tech", "political"] as FilterKind[]).map((f) => (
                  <button
                    key={f}
                    className={`ev-tg${kind === f ? " on" : ""}`}
                    data-f={f}
                    onClick={() => setKind(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <span className="lbl" style={{ marginLeft: 18 }}>
                Sort
              </span>
              <div className="sort-row" style={{ display: "inline-flex" }}>
                {(["date", "city", "cat"] as SortKey[]).map((s) => (
                  <button
                    key={s}
                    className={`ev-tg${sort === s ? " on" : ""}`}
                    data-sort={s}
                    onClick={() => setSort(s)}
                  >
                    {s === "date" ? "By date" : s === "city" ? "By city" : "By category"}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                color: "var(--muted)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              {sort === "date" ? "Sorting by date groups events by month" : `Sorted by ${sort}`}
            </div>
          </div>
        </div>
      </section>

      {/* Events main */}
      <section
        className="section"
        style={{ paddingTop: 32, paddingBottom: 80 }}
      >
        <div className="page">
          <div className="ev-page-layout">
            {/* Rail */}
            {sort === "date" && groups && groups.length > 0 ? (
              <aside className="ev-rail" aria-label="Jump to month">
                <div className="rail-lbl">Jump to month</div>
                {groups.map(([key, items]) => (
                  <a
                    key={key}
                    className={`rail-row${activeMonth === key ? " on" : ""}`}
                    href={`#month-${key}`}
                    data-rail-month={key}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToMonth(key);
                    }}
                  >
                    <span className="rl-name">{monthLabel(key)}</span>
                    <span className="rl-cnt">{items.length}</span>
                  </a>
                ))}
              </aside>
            ) : (
              <aside className="ev-rail" aria-label="Navigation">
                <div className="rail-lbl">
                  {shown.length === 0
                    ? "No events"
                    : `Month grouping disabled · sorted by ${sort}`}
                </div>
              </aside>
            )}

            {/* Main */}
            <main>
              {shown.length === 0 ? (
                <div
                  style={{
                    padding: 32,
                    textAlign: "center",
                    fontFamily: "var(--mono)",
                    color: "var(--muted)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    border: "1px dashed var(--line)",
                    borderRadius: "var(--r-lg)",
                  }}
                >
                  No events match your filters.
                </div>
              ) : sort === "date" && groups ? (
                groups.map(([key, items]) => {
                  const tech = items.filter((e) => e.kind === "tech").length;
                  const pol = items.filter((e) => e.kind === "political").length;
                  return (
                    <section
                      key={key}
                      className="month-group"
                      id={`month-${key}`}
                      data-month={key}
                    >
                      <header className="month-hd">
                        <div className="mh-main">
                          <span className="mh-lbl">{monthLabel(key)}</span>
                          <span className="mh-cnt">
                            {items.length} event{items.length === 1 ? "" : "s"}
                          </span>
                        </div>
                        <div className="mh-split">
                          {tech > 0 && (
                            <span className="mh-tag tech">{tech} tech</span>
                          )}
                          {pol > 0 && (
                            <span className="mh-tag political">
                              {pol} political
                            </span>
                          )}
                        </div>
                      </header>
                      <div className="ev-grid">
                        {items.map((e) => (
                          <EvCard key={e.href} e={e} />
                        ))}
                      </div>
                    </section>
                  );
                })
              ) : (
                <section className="month-group">
                  <header className="month-hd">
                    <div className="mh-main">
                      <span className="mh-lbl">
                        {shown.length} events · sorted by {sort}
                      </span>
                    </div>
                  </header>
                  <div className="ev-grid">
                    {shown.map((e) => (
                      <EvCard key={e.href} e={e} />
                    ))}
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
