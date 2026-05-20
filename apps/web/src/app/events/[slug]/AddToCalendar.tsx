"use client";

import type { EventItem } from "@/data/events";

function buildSingleICS(ev: EventItem): string {
  const escape = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const dtstart = ev.date.replace(/-/g, "");
  const uid = `${ev.date}-${ev.href.replace(/\//g, "")}@tn-info.in`;
  const description = [ev.organiser, ev.note].filter(Boolean).join(" — ");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TN-Info.in//Events Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:TN-Info Events",
    "X-WR-TIMEZONE:Asia/Kolkata",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART;VALUE=DATE:${dtstart}`,
    `SUMMARY:${escape(ev.title)}`,
    `LOCATION:${escape(ev.venue + ", " + ev.city)}`,
    `DESCRIPTION:${escape(description)}`,
    `CATEGORIES:${escape(ev.kind.toUpperCase())},${escape(ev.cat)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function AddToCalendar({ ev }: { ev: EventItem }) {
  function handleClick() {
    const content = buildSingleICS(ev);
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ev.href.replace("/events/", "")}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      className="ev-ics-btn"
      style={{ width: "100%", justifyContent: "center" }}
      onClick={handleClick}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1" y="2" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1 5h11" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4 1v2M9 1v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      Add to calendar
    </button>
  );
}
