"use client";

import { useState } from "react";
import { TN_EVENTS } from "@/data/events";

const EVENTS_URL = "/events";

type Kind = "all" | "tech" | "political";

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

function untilLabel(diff: number): string {
  if (diff < 0) return `${Math.abs(diff)}d ago`;
  if (diff === 0) return "today";
  if (diff === 1) return "tomorrow";
  if (diff < 7) return `in ${diff} days`;
  if (diff < 30) return `in ${Math.round(diff / 7)} weeks`;
  return `in ${Math.round(diff / 30)} months`;
}

export default function EventsPreview() {
  const [filter, setFilter] = useState<Kind>("all");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [...TN_EVENTS]
    .filter((e) => new Date(e.date) >= today)
    .filter((e) => filter === "all" || e.kind === filter)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  const totalCount = [...TN_EVENTS].filter((e) => new Date(e.date) >= today).length;

  return (
    <section className="section" id="events" style={{ paddingTop: "32px" }}>
      <div className="page">
        <div className="section-head">
          <div>
            <span className="kicker">Calendar</span>
            <h2 className="eonly">Events that <em>need</em> your attention.</h2>
            <h2 className="tonly"><em>கவனம்</em> தேவைப்படும் நிகழ்வுகள்.</h2>
            <p className="lead eonly">
              Tech conferences, hackathons and civic meetups alongside neutrally-listed political and legislative events.
              No commentary on the political lane — schedule, venue and organiser only.
            </p>
          </div>
          <div className="rhs">
            All times IST<br />
            <a href={`${EVENTS_URL}#rss`} style={{ color: "var(--ink)", fontWeight: 600 }}>RSS ↗</a>
            {" · "}
            <a href={`${EVENTS_URL}#ics`} style={{ color: "var(--ink)", fontWeight: 600 }}>iCal ↗</a>
          </div>
        </div>

        <div className="ev-tools">
          <div className="ev-filter">
            {(["all", "tech", "political"] as Kind[]).map((k) => (
              <button
                key={k}
                className={`ev-tg${filter === k ? " on" : ""}`}
                onClick={() => setFilter(k)}
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>
          <div className="ev-cnt">Next {upcoming.length} events · {totalCount} upcoming</div>
        </div>

        <div className="ev-grid">
          {upcoming.map((ev) => {
            const diff = daysUntil(ev.date);
            const isSoon = diff >= 0 && diff <= 14;
            const d = new Date(ev.date);
            const day = d.getDate();
            const mon = d.toLocaleString("en", { month: "short" }).toUpperCase();

            return (
              <a
                key={ev.href}
                className={`ev-card kind-${ev.kind}${isSoon ? " is-soon" : ""}`}
                href={`${EVENTS_URL}/${ev.href.replace("event-detail.html?id=", "")}`}
                target="_blank"
                rel="noopener"
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
                  <div className="ev-where"><b>{ev.city}</b> · {ev.venue}</div>
                  <p className="ev-note">{ev.note}</p>
                  <div className="ev-foot">
                    <span className="ev-org">{ev.organiser}</span>
                    <span className="ev-rsvp">{ev.rsvp} →</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="see-all">
          <a href={EVENTS_URL} target="_blank" rel="noopener">
            Open the full calendar <span className="arr">→</span>
            <span className="ct">{totalCount} events</span>
          </a>
        </div>
      </div>
    </section>
  );
}
