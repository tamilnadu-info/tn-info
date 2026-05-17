import CodeWindow from "./CodeWindow";

export default function DevSection() {
  return (
    <section className="dev" id="api">
      <div className="page">
        <div style={{ maxWidth: "720px" }}>
          <span className="kicker">For developers · free, forever</span>
          <h2 className="eonly">
            A real <em>public API</em>
            <br />
            for Tamil&nbsp;Nadu.
          </h2>
          <h2 className="tonly">
            தமிழ்நாட்டிற்கான
            <br />
            <em>பொது API</em>.
          </h2>
        </div>
        <div className="dev-grid">
          <div>
            <p className="lead">
              REST endpoints. JSON only. No auth. No rate limits worth complaining about. No
              surprise paywalls.{" "}
              <strong>Build whatever you want</strong> — voter info bots, college-admissions
              trackers, scheme-eligibility assistants, hyperlocal news scrapers, civic dashboards.
            </p>
            <div className="dev-feat-grid">
              <div className="dev-feat">
                <div className="lbl">REST</div>
                <div className="t">
                  <em>JSON</em> API
                </div>
                <div className="d">
                  Versioned, paginated, ETag&apos;d. Latency &lt;80ms p95 from Chennai.
                </div>
              </div>
              <div className="dev-feat">
                <div className="lbl">RSS</div>
                <div className="t">
                  Drop-in <em>feeds</em>
                </div>
                <div className="d">
                  One feed per category, per district, or per query string.
                </div>
              </div>
              <div className="dev-feat">
                <div className="lbl">Webhooks</div>
                <div className="t">
                  Push, <em>not</em> poll
                </div>
                <div className="d">
                  Subscribe to scheme rule changes or counselling rounds.
                </div>
              </div>
              <div className="dev-feat">
                <div className="lbl">CSV / Parquet</div>
                <div className="t">
                  Bulk <em>dumps</em>
                </div>
                <div className="d">
                  Full history snapshots refreshed nightly. ~3.4 GB total.
                </div>
              </div>
            </div>
            <div className="dev-ctas">
              <a className="btn btn-primary" href="#docs">
                Read the docs →
              </a>
              <a
                className="btn btn-secondary"
                href="https://github.com/tamilnadu-info"
                target="_blank"
                rel="noopener"
              >
                ★ Star on GitHub
              </a>
              <a className="btn btn-secondary" href="#postman">
                Postman
              </a>
            </div>
          </div>
          <div>
            <CodeWindow />

            <div className="endpoints">
              <div className="ep">
                <span className="v">GET</span>
                <span className="p">
                  /v1/districts<span className="va">/:id</span>
                </span>
                <span className="r">Drill into a district</span>
              </div>
              <div className="ep">
                <span className="v">GET</span>
                <span className="p">
                  /v1/constituencies<span className="va">/:n</span>
                </span>
                <span className="r">MLA, vote share, history</span>
              </div>
              <div className="ep">
                <span className="v">GET</span>
                <span className="p">/v1/schemes</span>
                <span className="r">All 47 with eligibility</span>
              </div>
              <div className="ep">
                <span className="v">GET</span>
                <span className="p">
                  /v1/counselling/tnea<span className="va">/rounds</span>
                </span>
                <span className="r">TNEA rounds + dates</span>
              </div>
              <div className="ep">
                <span className="v">GET</span>
                <span className="p">
                  /v1/events<span className="va">?city=madurai</span>
                </span>
                <span className="r">Tech &amp; community events</span>
              </div>
              <div className="ep">
                <span className="v">GET</span>
                <span className="p">
                  /v1/updates<span className="va">.rss</span>
                </span>
                <span className="r">Cross-category live feed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
