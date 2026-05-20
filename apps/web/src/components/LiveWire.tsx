import { TN_DATA } from "@/data/tn-data";
import { timeAgo } from "@/lib/time";

interface PipelineEntry {
  name: string;
  source: string;
  status: "ok" | "warn";
  latencyMs: number;
  checkedAt: string;
}

async function getPipelines(): Promise<PipelineEntry[]> {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/tamilnadu-info/tn-info/pipeline-data/pipeline-status.json",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.pipelines ?? [];
  } catch {
    return TN_DATA.pipelines as unknown as PipelineEntry[];
  }
}

export default async function LiveWire() {
  const { ticker } = TN_DATA;
  const pipelines = await getPipelines();

  const okCount = pipelines.filter((p) => p.status === "ok").length;
  const warnCount = pipelines.filter((p) => p.status === "warn").length;
  const healthLabel = `${okCount} ok${warnCount > 0 ? ` · ${warnCount} lag` : ""}`;

  return (
    <section
      className="section"
      id="feed"
      style={{ paddingTop: "32px" }}
      data-testid="live-wire"
    >
      <div className="page">
        <div className="section-head">
          <div>
            <span className="kicker">The live wire</span>
            <h2 className="eonly">
              What <em>just</em> changed.
            </h2>
            <h2 className="tonly">
              இப்போது <em>மாறியது</em>.
            </h2>
            <p className="lead eonly">
              Every scheme rule, cabinet move, counselling date, by-poll notification —
              chronologically. Subscribe via RSS or webhooks.
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <a
              className="btn btn-secondary"
              href="#rss"
              style={{ padding: "10px 16px", fontSize: "13px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.18 17.82c0 1.2-.97 2.18-2.18 2.18S1.82 19.02 1.82 17.82s.98-2.18 2.18-2.18 2.18.97 2.18 2.18zM4 4.44v3.13C12.18 7.57 18.43 13.82 18.43 22h3.13C21.56 11.74 12.26 4.44 4 4.44zM4 10.56v3.13c4.61 0 8.31 3.7 8.31 8.31h3.13c0-6.36-5.08-11.44-11.44-11.44z" />
              </svg>
              RSS
            </a>
            <a
              className="btn btn-secondary"
              href="#webhooks"
              style={{ padding: "10px 16px", fontSize: "13px" }}
            >
              Webhook
            </a>
          </div>
        </div>
        <div className="wire-grid">
          <div className="wire-list" id="wireList">
            {ticker.map((t, i) => (
              <div className="wire-row" key={i}>
                <div className="tm">{timeAgo(t.time)}</div>
                <div className="bd">
                  <span className={`tag ${t.tag}`}>{t.tag}</span>
                  <div className="h eonly">{t.en}</div>
                  <div
                    className="h tonly"
                    style={{ fontFamily: "var(--ta)", fontStyle: "normal" }}
                  >
                    {t.ta}
                  </div>
                  <div className="ta eonly">{t.ta}</div>
                </div>
                <div className="vf">verified</div>
              </div>
            ))}
          </div>
          <div className="side">
            <div className="side-card">
              <div className="sh">
                <div>
                  <h4 className="eonly">
                    Pipeline <em>health</em>
                  </h4>
                  <h4 className="tonly">
                    தரவு <em>நிலை</em>
                  </h4>
                </div>
                <span className="ok">{healthLabel}</span>
              </div>
              <div className="pipe-list" id="pipeList">
                {pipelines.map((p, i) => (
                  <div className="pipe-row" key={i}>
                    <span className={`pipe-dot ${p.status}`}></span>
                    <div className="nm">
                      {p.name}
                      <small>{p.source}</small>
                    </div>
                    <div className="fr">
                      {p.latencyMs > 0 ? `${p.latencyMs}ms` : "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="trust-card">
              <h5>Source transparency</h5>
              <p>
                Every datapoint lists its source and last-fetched timestamp. The entire pipeline is
                open-source — review what we scrape, how we structure it, and where the gaps are
                at{" "}
                <a href="https://github.com/tamilnadu-info">github.com/tamilnadu-info</a>.
              </p>
            </div>
            <div
              className="trust-card"
              style={{
                background: "var(--card)",
                borderStyle: "solid",
                borderColor: "var(--line)",
              }}
            >
              <h5 style={{ color: "var(--ink)", display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ color: "var(--terra)" }}>♥</span> keep it running
              </h5>
              <p>
                This site runs on donations and volunteer effort. ₹400/mo covers infra for ~1000
                daily users. Consider chipping in — every rupee is logged publicly.
              </p>
              <a
                href="#donate"
                className="btn btn-primary"
                style={{ marginTop: "14px", padding: "10px 16px", fontSize: "13px" }}
              >
                Support TN-Info →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
