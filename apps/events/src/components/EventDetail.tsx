"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TN_EVENTS, type EventItem } from "@/data/events";
import { TN_EVENT_BODIES } from "@/data/event-bodies";

interface Props {
  id: string;
}

function findEvent(id: string): EventItem | undefined {
  return TN_EVENTS.find((e) => e.href === `/${id}`);
}

function daysUntil(iso: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((new Date(iso).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
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

function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

const FEE_LABELS: Record<string, string> = {
  free: "FREE",
  paid: "PAID",
  public: "PUBLIC",
  invite: "INVITE ONLY",
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
function toIcsDate(iso: string): string {
  const d = new Date(iso);
  return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate());
}
function downloadSingleIcs(e: EventItem) {
  const stamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TN-Info.in//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:tn-info-${e.href.slice(1)}-${e.date}@tn-info.in`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${toIcsDate(e.date)}`,
    `SUMMARY:${e.title.replace(/[,;\\]/g, " ")}`,
    `LOCATION:${(e.venue + ", " + e.city).replace(/[,;\\]/g, " ")}`,
    `DESCRIPTION:${(e.organiser + " — " + e.note).replace(/[,;\\]/g, " ")}`,
    `CATEGORIES:${e.kind.toUpperCase()},${e.cat}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tn-info-${e.href.slice(1)}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function EventDetail({ id }: Props) {
  const event = findEvent(id);
  const body = event ? TN_EVENT_BODIES[id] : undefined;

  useEffect(() => {
    if (event) {
      document.title = `${event.title} · TN-Info.in`;
    }
  }, [event]);

  if (!event) {
    return (
      <section
        className="section"
        style={{ paddingTop: 40, paddingBottom: 80 }}
      >
        <div className="page">
          <div
            style={{
              padding: 48,
              textAlign: "center",
              fontFamily: "var(--mono)",
              color: "var(--muted)",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Event not found.{" "}
            <Link href="/" style={{ color: "var(--terra)" }}>
              Back to events →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const du = daysUntil(event.date);
  const soon = du >= 0 && du <= 14;
  const feeLabel = FEE_LABELS[event.fee] || event.fee.toUpperCase();

  // Parse date parts
  const dateObj = new Date(event.date);
  const day = dateObj.getUTCDate();
  const mon = dateObj
    .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();
  const yr = dateObj.getUTCFullYear();

  // Related events — same month
  const thisMonthKey = monthKey(event.date);
  const related = TN_EVENTS.filter(
    (e) => e.href !== event.href && monthKey(e.date) === thisMonthKey
  ).slice(0, 3);

  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div className="page">
        {/* Breadcrumbs */}
        <div
          className="crumbs"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          <a href="https://tn-info.in" style={{ color: "var(--ink-2)" }}>
            TN-Info.in
          </a>
          <span
            className="sep"
            style={{ margin: "0 8px", color: "var(--line)" }}
          >
            /
          </span>
          <Link href="/" style={{ color: "var(--ink-2)" }}>
            Events
          </Link>
          <span
            className="sep"
            style={{ margin: "0 8px", color: "var(--line)" }}
          >
            /
          </span>
          <span>{event.title.slice(0, 50)}</span>
        </div>

        {/* Hero card */}
        <div className={`ed-hero kind-${event.kind}`}>
          <div className="ed-date-block">
            <div className="day">{day}</div>
            <div>
              <div className="mon">{mon}</div>
              <div className="yr">{yr}</div>
            </div>
          </div>
          <div>
            <div className="ed-meta">
              <span className="ev-kind">
                {event.kind === "tech" ? "TECH" : "POLITICAL"}
              </span>
              <span className="ev-cat">{event.cat}</span>
              <span className={`ev-fee fee-${event.fee}`}>{feeLabel}</span>
              <span className={`ev-until${soon ? "" : ""}`}>
                {untilLabel(event.date)}
              </span>
            </div>
            <h1
              className="detail-h1 eonly"
              style={{ fontSize: 42, marginBottom: 10 }}
            >
              {event.title}
            </h1>
            <h1
              className="detail-h1 tonly"
              style={{
                fontFamily: "var(--ta)",
                fontWeight: 600,
                fontSize: 36,
                marginBottom: 10,
              }}
            >
              {event.titleTa}
            </h1>
            <div
              style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.5 }}
            >
              <strong>{event.city}</strong> · {event.venue}
              <br />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11.5,
                  color: "var(--muted)",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}
              >
                Organised by
              </span>{" "}
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                {event.organiser}
              </span>
            </div>
          </div>
        </div>

        {/* Two-column body */}
        <div className="detail-wrap">
          <article>
            <div className="section-sub">About this event</div>
            <div className="detail-body">
              {body?.what.map((p, i) => <p key={i}>{p}</p>) ?? (
                <p>{event.note}</p>
              )}
            </div>

            <div className="section-sub">What to expect</div>
            <ul className="expect-list">
              {(body?.expect ?? [event.rsvp]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {body && body.speakers.length > 0 && (
              <>
                <div className="section-sub">Speakers / participants</div>
                <ul className="expect-list">
                  {body.speakers.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}

            {body && body.links.length > 0 && (
              <>
                <div className="section-sub">Official links</div>
                <div className="ext-links">
                  {body.links.map((l, i) => (
                    <a key={i} href={l.url} target="_blank" rel="noopener">
                      {l.label} <span className="arr">↗</span>
                    </a>
                  ))}
                </div>
              </>
            )}

            <div className="section-sub">Other events this month</div>
            <div className="related-grid">
              {related.length > 0 ? (
                related.map((r) => (
                  <Link key={r.href} className="related-card" href={r.href}>
                    <span className="rc-tag ev-kind" style={{
                      background: r.kind === "tech" ? "rgba(31,22,17,.08)" : "rgba(200,71,43,.12)",
                      color: r.kind === "tech" ? "var(--ink)" : "var(--terra-deep)",
                      display: "inline-block", padding: "3px 7px", borderRadius: 4,
                      fontFamily: "var(--mono)", fontSize: 9.5, fontWeight: 700,
                      letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 10,
                    }}>
                      {r.kind.toUpperCase()}
                    </span>
                    <div className="rc-head">{r.title}</div>
                    <div className="rc-meta">
                      {r.city} · {r.dateLabel}
                    </div>
                  </Link>
                ))
              ) : (
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--muted)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    gridColumn: "1 / -1",
                  }}
                >
                  No other events this month.
                </p>
              )}
            </div>
          </article>

          <aside className="detail-side">
            <div className="side-cta">
              <h4>
                {event.fee === "free"
                  ? "REGISTER — FREE"
                  : event.fee === "paid"
                  ? "BUY TICKETS"
                  : "REGISTER"}
              </h4>
              <p>Open registration link to RSVP or buy tickets for this event.</p>
              <div className="btn-row">
                <a className="primary" href="#" target="_blank" rel="noopener">
                  {event.rsvp} ↗
                </a>
                <button
                  className="secondary"
                  onClick={() => downloadSingleIcs(event)}
                >
                  + Add to calendar (.ics)
                </button>
              </div>
            </div>

            <div className="side-block">
              <h4>Event facts</h4>
              <div className="row">
                <span className="k">Kind</span>
                <span className="v">{event.kind.toUpperCase()}</span>
              </div>
              <div className="row">
                <span className="k">Date</span>
                <span className="v">{event.dateLabel}</span>
              </div>
              <div className="row">
                <span className="k">City</span>
                <span className="v">{event.city}</span>
              </div>
              <div className="row">
                <span className="k">Venue</span>
                <span className="v">{event.venue}</span>
              </div>
              <div className="row">
                <span className="k">Organiser</span>
                <span className="v">{event.organiser}</span>
              </div>
              <div className="row">
                <span className="k">Fee</span>
                <span className="v">{feeLabel}</span>
              </div>
            </div>

            <div className="side-block">
              <h4>Submit an event</h4>
              <div
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                  marginBottom: 12,
                }}
              >
                Hosting something in TN that should be listed here? Open an
                issue with a public source.
              </div>
              <div className="ext-links">
                <a
                  href="https://github.com/tamilnadu-info/issues"
                  target="_blank"
                  rel="noopener"
                >
                  Submit event <span className="arr">↗</span>
                </a>
                <a href="/#rss">
                  Events RSS <span className="arr">↗</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
