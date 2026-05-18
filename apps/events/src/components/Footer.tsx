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
                <a href="https://news.tn-info.in">News desk</a>
              </li>
              <li>
                <a href="/">Events calendar</a>
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
                <a href="#rss">Events RSS</a>
              </li>
              <li>
                <a href="#ics">Events iCal</a>
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
                  Submit an event
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-disc">
          <span className="lb">⚠ Editorial note</span>
          <p>
            Political events are listed strictly as schedule (date / venue /
            organiser). TN-Info offers no opinion on any party or candidate. To
            submit a missing event,{" "}
            <a href="https://github.com/tamilnadu-info/issues">open an issue</a>{" "}
            with a public source.
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
          <span>Calendar · all times IST</span>
        </div>
      </div>
    </footer>
  );
}
