"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TN_EVENTS, type EventItem } from "@/data/events";

type Kind = "all" | "tech" | "political";
type SortKey = "date" | "city" | "category";

const TODAY = new Date("2026-05-20");
TODAY.setHours(0, 0, 0, 0);

function daysUntil(dateStr: string): number {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - TODAY.getTime()) / 86400000);
}

function untilLabel(diff: number): string {
  if (diff < 0) return `${Math.abs(diff)} days ago`;
  if (diff === 0) return "today";
  if (diff === 1) return "tomorrow";
  if (diff < 14) return `in ${diff} days`;
  if (diff < 60) return `in ${Math.round(diff / 7)} weeks`;
  return `in ${Math.round(diff / 30)} months`;
}

function monthKey(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function buildICS(events: EventItem[]): string {
  const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TN-Info.in//Events Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:TN-Info Events",
    "X-WR-TIMEZONE:Asia/Kolkata",
  ];
  for (const ev of events) {
    const dtstart = ev.date.replace(/-/g, "");
    const uid = `${ev.date}-${ev.href.replace(/\//g, "")}@tn-info.in`;
    const description = [ev.organiser, ev.note].filter(Boolean).join(" — ");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `SUMMARY:${escape(ev.title)}`,
      `LOCATION:${escape(ev.venue + ", " + ev.city)}`,
      `DESCRIPTION:${escape(description)}`,
      `CATEGORIES:${escape(ev.kind.toUpperCase())},${escape(ev.cat)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function downloadICS(events: EventItem[]) {
  const content = buildICS(events);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tn-info-events.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

interface MonthGroup {
  key: string;
  events: EventItem[];
}

function groupByMonth(events: EventItem[]): MonthGroup[] {
  const map = new Map<string, EventItem[]>();
  for (const ev of events) {
    const k = monthKey(ev.date);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(ev);
  }
  return Array.from(map.entries()).map(([key, evs]) => ({ key, events: evs }));
}

function sortEvents(events: EventItem[], sort: SortKey): EventItem[] {
  const sorted = [...events];
  if (sort === "date") sorted.sort((a, b) => a.date.localeCompare(b.date));
  else if (sort === "city") sorted.sort((a, b) => a.city.localeCompare(b.city) || a.date.localeCompare(b.date));
  else if (sort === "category") sorted.sort((a, b) => a.cat.localeCompare(b.cat) || a.date.localeCompare(b.date));
  return sorted;
}

function EventCard({ ev }: { ev: EventItem }) {
  const diff = daysUntil(ev.date);
  const isSoon = diff >= 0 && diff <= 14;
  const d = new Date(ev.date);
  const day = d.getDate();
  const mon = d.toLocaleString("en", { month: "short" }).toUpperCase();

  return (
    <a
      className={`ev-card kind-${ev.kind}${isSoon ? " is-soon" : ""}`}
      href={ev.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="ev-date">
        <div className="ev-day">{day}</div>
        <div className="ev-mon">{mon}</div>
      </div>
      <div className="ev-body">
        <div className="ev-meta">
          <span className="ev-kind">{ev.kind.toUpperCase()}</span>
          <span className="ev-cat">{ev.cat}</span>
          <span className={`ev-fee fee-${ev.fee}`}>{ev.fee.toUpperCase()}</span>
          <span className="ev-until">{untilLabel(diff)}</span>
        </div>
        <h4 className="ev-title">{ev.title}</h4>
        <div className="ev-where">
          <b>{ev.city}</b> · {ev.venue}
        </div>
        <p className="ev-note">{ev.note}</p>
        <div className="ev-foot">
          <span className="ev-org">{ev.organiser}</span>
          <span className="ev-rsvp">{ev.rsvp} →</span>
        </div>
      </div>
    </a>
  );
}

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<Kind>("all");
  const [sort, setSort] = useState<SortKey>("date");
  const [activeMonth, setActiveMonth] = useState<string>("");
  const groupRefs = useRef<Map<string, HTMLElement>>(new Map());

  const filtered = sortEvents(
    TN_EVENTS.filter((ev) => {
      if (kind !== "all" && ev.kind !== kind) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.titleTa.includes(q) ||
        ev.city.toLowerCase().includes(q) ||
        ev.cat.toLowerCase().includes(q) ||
        ev.organiser.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q)
      );
    }),
    sort,
  );

  const groups = groupByMonth(filtered);

  const setGroupRef = useCallback((key: string, el: HTMLElement | null) => {
    if (el) groupRefs.current.set(key, el);
    else groupRefs.current.delete(key);
  }, []);

  useEffect(() => {
    if (groups.length > 0 && !activeMonth) {
      setActiveMonth(groups[0].key);
    }
  }, [groups, activeMonth]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleMonths = new Set<string>();

    groups.forEach(({ key }) => {
      const el = groupRefs.current.get(key);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleMonths.add(key);
          } else {
            visibleMonths.delete(key);
          }
          if (visibleMonths.size > 0) {
            const first = groups.find((g) => visibleMonths.has(g.key));
            if (first) setActiveMonth(first.key);
          }
        },
        { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [groups]);

  const handleRailClick = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = groupRefs.current.get(key);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveMonth(key);
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="page">
          <nav className="crumbs">
            <a href="/">TN-Info.in</a>
            <span className="sep">/</span>
            <span>Events calendar</span>
          </nav>
          <h1>
            The calendar — every event that <em>needs</em> your attention
          </h1>
          <p className="lead">
            Tech conferences, hackathons, civic meetups and neutrally-listed political and
            legislative events across Tamil Nadu. Schedule, venue and organiser only — no
            commentary on the political lane.
          </p>
          <p className="lede-ta">
            தொழில்நுட்ப மாநாடுகள், ஹேக்காத்தான்கள், குடிமை சந்திப்புகள் மற்றும் அரசியல்
            நிகழ்வுகள் — அட்டவணை, இடம், ஏற்பாட்டாளர் மட்டும்.
          </p>
        </div>
      </div>

      <div className="page" style={{ padding: "32px var(--page-pad) 80px" }}>
        <div className="fp-tools-row">
          <div className="search-bar" style={{ flex: "1 1 260px", minWidth: 0 }}>
            <span className="ic">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search events, cities, organisers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="lbl">Kind</span>
            <div className="filter-row">
              {(["all", "tech", "political"] as Kind[]).map((k) => (
                <button
                  key={k}
                  className={`ev-tg${kind === k ? " on" : ""}`}
                  onClick={() => setKind(k)}
                >
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="lbl">Sort</span>
            <div className="sort-row">
              {([["date", "By date"], ["city", "By city"], ["category", "By category"]] as [SortKey, string][]).map(
                ([k, label]) => (
                  <button
                    key={k}
                    className={`ev-tg${sort === k ? " on" : ""}`}
                    onClick={() => setSort(k)}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>

          <button className="ev-ics-btn" onClick={() => downloadICS(filtered)}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="2" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M1 5h11" stroke="currentColor" strokeWidth="1.3" />
              <path d="M4 1v2M9 1v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Download ICS
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="fp-no-res">No events match your filters.</div>
        ) : (
          <div className="ev-page-layout">
            <nav className="ev-rail">
              <div className="ev-rail-title">Jump to month</div>
              {groups.map(({ key, events: evs }) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className={`ev-rail-item${activeMonth === key ? " active" : ""}`}
                  onClick={(e) => handleRailClick(key, e)}
                >
                  <span>{key.replace(",", "")}</span>
                  <span className="rc">{evs.length}</span>
                </a>
              ))}
            </nav>

            <div>
              {groups.map(({ key, events: evs }) => (
                <section
                  key={key}
                  id={key}
                  className="ev-month-group"
                  ref={(el) => setGroupRef(key, el)}
                >
                  <div className="ev-month-hd">
                    <span className="ev-month-label">
                      {key.split(" ")[0]} <em>{key.split(" ")[1]}</em>
                    </span>
                    <span className="ev-month-meta">
                      {evs.length} event{evs.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="ev-full-grid">
                    {evs.map((ev) => (
                      <EventCard key={ev.href} ev={ev} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
