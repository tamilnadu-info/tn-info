import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TN_EVENTS, type EventItem } from "@/data/events";
import { EVENT_BODIES } from "@/data/event-bodies";
import AddToCalendar from "./AddToCalendar";

function getSlug(ev: EventItem): string {
  return ev.id ?? ev.href.split("/events/")[1];
}

function getMonthKey(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${d.getMonth()}`;
}

export function generateStaticParams() {
  return TN_EVENTS.map((ev) => ({
    slug: ev.id ?? ev.href.replace("/events/", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = TN_EVENTS.find((e) => getSlug(e) === slug);
  if (!ev) return {};
  return {
    title: ev.title,
    description: `${ev.dateLabel} · ${ev.city} · ${ev.venue} · ${ev.organiser}. ${ev.note}`,
    openGraph: {
      title: ev.title,
      description: ev.note,
      url: `https://tn-info.in/events/${slug}`,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = TN_EVENTS.find((e) => getSlug(e) === slug);
  if (!ev) notFound();

  const body = EVENT_BODIES[slug];
  const d = new Date(ev.date);
  const day = d.getDate();
  const mon = d.toLocaleString("en", { month: "short" }).toUpperCase();
  const yr = d.getFullYear();

  const monthKey = getMonthKey(ev.date);
  const related = TN_EVENTS.filter(
    (e) => getSlug(e) !== slug && getMonthKey(e.date) === monthKey,
  ).slice(0, 3);

  return (
    <>
      <div className="page-hero">
        <div className="page">
          <nav className="crumbs">
            <a href="/">TN-Info.in</a>
            <span className="sep">/</span>
            <a href="/events">Events</a>
            <span className="sep">/</span>
            <span>{ev.title}</span>
          </nav>
          <h1>{ev.title}</h1>
          <p className="lead">
            {ev.dateLabel} · <strong>{ev.city}</strong> · {ev.venue} · {ev.organiser}
          </p>
        </div>
      </div>

      <div className="page">
        <div className="ed-layout">
          <main>
            {(body?.what ?? []).length > 0 && (
              <div className="ed-section">
                <h3>About</h3>
                {(body?.what ?? []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {(body?.expect ?? []).length > 0 && (
              <div className="ed-section">
                <h3>What to expect</h3>
                <ul>
                  {(body?.expect ?? []).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {(body?.speakers ?? []).length > 0 && (
              <div className="ed-section">
                <h3>Speakers / Organiser</h3>
                <ul>
                  {(body?.speakers ?? []).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </main>

          <aside className="ed-rail">
            <div className="ed-rail-card ed-date-block">
              <div className="day">{day}</div>
              <div className="mon">{mon}</div>
              <div className="yr">{yr}</div>
            </div>

            <div className="ed-rail-card">
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)", marginBottom: 6 }}>
                Location
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{ev.city}</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>{ev.venue}</div>
            </div>

            <div className="ed-rail-card" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)" }}>
                Fee
              </div>
              <span className={`ev-fee fee-${ev.fee}`}>{ev.fee.toUpperCase()}</span>
            </div>

            <div className="ed-rail-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a
                href={ev.rsvp.startsWith("http") ? ev.rsvp : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
              >
                {ev.rsvp}
              </a>
              <AddToCalendar ev={ev} />
            </div>

            {(body?.links ?? []).length > 0 && (
              <div className="ed-rail-card">
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--muted)", marginBottom: 10, fontWeight: 700 }}>
                  Official links
                </div>
                <div className="ed-links">
                  {(body?.links ?? []).map((lk, i) => (
                    <a key={i} href={lk.url} target="_blank" rel="noopener noreferrer">
                      {lk.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <div style={{ paddingBottom: 80 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--muted)", fontWeight: 700, marginBottom: 18, paddingTop: 8, borderTop: "1px solid var(--line)" }}>
              Other events this month
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14 }}>
              {related.map((rel) => {
                const rd = new Date(rel.date);
                const rday = rd.getDate();
                const rmon = rd.toLocaleString("en", { month: "short" }).toUpperCase();
                return (
                  <a
                    key={rel.href}
                    className={`ev-card kind-${rel.kind}`}
                    href={rel.href}
                  >
                    <div className="ev-date">
                      <div className="ev-day">{rday}</div>
                      <div className="ev-mon">{rmon}</div>
                    </div>
                    <div className="ev-body">
                      <div className="ev-meta">
                        <span className="ev-kind">{rel.kind.toUpperCase()}</span>
                        <span className="ev-cat">{rel.cat}</span>
                        <span className={`ev-fee fee-${rel.fee}`}>{rel.fee.toUpperCase()}</span>
                      </div>
                      <h4 className="ev-title">{rel.title}</h4>
                      <div className="ev-where">
                        <b>{rel.city}</b> · {rel.venue}
                      </div>
                      <p className="ev-note">{rel.note}</p>
                      <div className="ev-foot">
                        <span className="ev-org">{rel.organiser}</span>
                        <span className="ev-rsvp">{rel.rsvp} →</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
