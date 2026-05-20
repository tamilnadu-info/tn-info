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
  return TN_EVENTS.map((ev) => ({ slug: ev.id ?? ev.href.replace("/events/", "") }));
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
    description: `${ev.dateLabel} · ${ev.city} · ${ev.venue} · ${ev.organiser}`,
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

  const related = TN_EVENTS.filter(
    (e) => getSlug(e) !== slug && getMonthKey(e.date) === getMonthKey(ev.date),
  ).slice(0, 3);

  const feeLabel = ev.fee === "free" ? "Free" : ev.fee === "paid" ? "Paid" : ev.fee === "invite" ? "Invite only" : "Public";

  return (
    <div className="page" style={{ paddingTop: 40 }}>
      <nav className="crumbs" aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
        <a href="/">TN-Info.in</a>
        <span className="sep">/</span>
        <a href="/events">Events</a>
        <span className="sep">/</span>
        <span>{ev.title}</span>
      </nav>

      <div className={`ed-hero kind-${ev.kind}`}>
        <div className="ed-date-block">
          <div className="day">{day}</div>
          <div className="mon">{mon}</div>
          <div className="yr">{yr}</div>
        </div>
        <div>
          <div className="ed-meta">
            <span className={`ev-kind`}>{ev.kind.toUpperCase()}</span>
            <span className="ev-cat">{ev.cat}</span>
            <span className={`ev-fee fee-${ev.fee}`}>{feeLabel}</span>
          </div>
          <h1 className="detail-h1">{ev.title}</h1>
          {ev.titleTa && <div className="detail-h1-ta">{ev.titleTa}</div>}
          <div style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.5 }}>
            <strong>{ev.city}</strong> · {ev.venue}<br />
            <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase" }}>
              Organised by{" "}
            </span>
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>{ev.organiser}</span>
          </div>
        </div>
      </div>

      <div className="detail-wrap">
        <article>
          {(body?.what ?? []).length > 0 && (
            <>
              <div className="section-sub">About this event</div>
              <div className="detail-body">
                {(body?.what ?? []).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </>
          )}

          {(body?.expect ?? []).length > 0 && (
            <>
              <div className="section-sub">What to expect</div>
              <ul className="expect-list">
                {(body?.expect ?? []).map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </>
          )}

          {(body?.speakers ?? []).length > 0 && (
            <>
              <div className="section-sub">Speakers / participants</div>
              <ul className="expect-list">
                {(body?.speakers ?? []).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}

          {(body?.links ?? []).length > 0 && (
            <>
              <div className="section-sub">Official links</div>
              <div className="ext-links">
                {(body?.links ?? []).map((lk, i) => (
                  <a key={i} href={lk.url} target="_blank" rel="noopener noreferrer">
                    {lk.label} <span className="arr">↗</span>
                  </a>
                ))}
              </div>
            </>
          )}

          {related.length > 0 && (
            <>
              <div className="section-sub">Other events this month</div>
              <div className="related-grid">
                {related.map((rel) => {
                  const rd = new Date(rel.date);
                  return (
                    <a key={rel.href} className={`related-card kind-${rel.kind}`} href={rel.href}>
                      <span className={`rc-tag ev-kind`} style={{ marginBottom: 10, display: "inline-block" }}>{rel.kind.toUpperCase()}</span>
                      <div className="rc-head">{rel.title}</div>
                      <div className="rc-meta">{rd.getDate()} {rd.toLocaleString("en", { month: "short" })} · {rel.city}</div>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </article>

        <aside className="detail-side">
          <div className="side-cta">
            <h4>Register / RSVP</h4>
            <p>{ev.rsvp}</p>
            <div className="cta-row">
              <a
                className="primary"
                href={ev.rsvp.startsWith("http") ? ev.rsvp : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register ↗
              </a>
              <AddToCalendar ev={ev} />
            </div>
          </div>

          <div className="side-block">
            <h4>Event facts</h4>
            <div className="row"><span className="k">Kind</span><span className="v">{ev.kind}</span></div>
            <div className="row"><span className="k">Date</span><span className="v">{ev.dateLabel}</span></div>
            <div className="row"><span className="k">City</span><span className="v">{ev.city}</span></div>
            <div className="row"><span className="k">Venue</span><span className="v">{ev.venue}</span></div>
            <div className="row"><span className="k">Organiser</span><span className="v">{ev.organiser}</span></div>
            <div className="row"><span className="k">Fee</span><span className="v">{feeLabel}</span></div>
          </div>

          <div className="side-block">
            <h4>Submit an event</h4>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-2)", marginBottom: 12 }}>
              Hosting something in TN that should be listed here? Open an issue with a public source.
            </p>
            <div className="ext-links">
              <a href="https://github.com/tamilnadu-info/tn-info/issues" target="_blank" rel="noopener">
                Submit event <span className="arr">↗</span>
              </a>
              <a href="/events#rss">
                Events RSS <span className="arr">↗</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
