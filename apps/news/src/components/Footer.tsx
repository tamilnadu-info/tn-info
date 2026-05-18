export default function Footer() {
  return (
    <footer className="foot">
      <div className="page">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              <div className="brand-glyph">த</div>
              <div>
                <div className="brand-name">
                  TN-Info<em>.in</em>
                </div>
                <div className="brand-sub">OPEN · STRUCTURED · FREE</div>
              </div>
            </div>
            <p>
              An open-source civic data platform for Tamil Nadu, built and run
              by{" "}
              <strong>
                <a
                  href="https://destrosec.com"
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: "var(--terra)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Destrosec
                </a>
              </strong>{" "}
              and 41 contributors. <strong>Not affiliated</strong> with any
              government body or political party.
            </p>
          </div>
          <div className="foot-col">
            <h4>Coverage</h4>
            <ul>
              <li>
                <a href="https://tn-info.in#districts">All 38 districts</a>
              </li>
              <li>
                <a href="https://tn-info.in#feed">Live wire</a>
              </li>
              <li>
                <a href="/">News desk</a>
              </li>
              <li>
                <a href="https://events.tn-info.in">Events calendar</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Developers</h4>
            <ul>
              <li>
                <a href="https://tn-info.in#api">API docs</a>
              </li>
              <li>
                <a href="#rss">News RSS</a>
              </li>
              <li>
                <a
                  href="https://github.com/tamilnadu-info"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>About</h4>
            <ul>
              <li>
                <a href="https://tn-info.in#mission">Mission</a>
              </li>
              <li>
                <a
                  href="https://destrosec.com"
                  target="_blank"
                  rel="noopener"
                >
                  Destrosec ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tamilnadu-info/issues"
                  target="_blank"
                  rel="noopener"
                >
                  Report a story
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-disc">
          <span className="lb">⚠ Editorial note</span>
          <p>
            News items are summarised by TN-Info editors and link to original
            sources. Hidden-lane provenance is documented per row; if you spot
            an error,{" "}
            <a href="https://github.com/tamilnadu-info/issues">open an issue</a>{" "}
            — we ship corrections within 24h.
          </p>
        </div>

        <div className="foot-bot">
          <span>
            © 2026{" "}
            <a href="https://destrosec.com" target="_blank" rel="noopener">
              Destrosec
            </a>{" "}
            · MIT licensed · <span className="lt">♥</span> from Tamil Nadu
          </span>
          <span>News desk · last edit 17 May 2026, 04:21 IST</span>
        </div>
      </div>
    </footer>
  );
}
