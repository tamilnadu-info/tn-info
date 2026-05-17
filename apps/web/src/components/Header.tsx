import GHStars from "./GHStars";
import LanguageToggle from "./LanguageToggle";
import StatRotator from "./StatRotator";

export default function Header() {
  return (
    <header className="hdr" data-testid="header">
      <div className="page">
        <div className="hdr-row">
          <div className="brand">
            <div className="brand-glyph">த</div>
            <div>
              <div className="brand-name">
                TN-Info<em>.in</em>
              </div>
              <div className="brand-sub">தமிழ்நாடு · OPEN DATA</div>
            </div>
            <a
              className="by-destrosec"
              href="https://destrosec.com"
              target="_blank"
              rel="noopener"
              title="Built &amp; maintained by Destrosec — destrosec.com"
            >
              <span className="label">by</span>
              <b>Destrosec</b>
              <span className="arr">↗</span>
            </a>
          </div>
          <nav className="nav">
            <a href="#districts">Districts</a>
            <a href="#feed">Updates</a>
            <a href="#news">News</a>
            <a href="#events">Events</a>
            <a href="#api" className="api">
              API
            </a>
          </nav>
          <div className="actions">
            <LanguageToggle />
            <GHStars />
          </div>
        </div>
      </div>
      <div className="status-strip">
        <div className="page">
          <div className="status-row">
            <span>
              <span className="pulse">All systems operational</span>{" "}
              <span className="sep">·</span> 6 pipelines · last sync 12 min ago
            </span>
            <StatRotator />
            <span>
              Build{" "}
              <span style={{ color: "var(--terra)", fontWeight: 600 }}>e4a2c8f</span> ·{" "}
              2026-05-17 04:21 IST
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
