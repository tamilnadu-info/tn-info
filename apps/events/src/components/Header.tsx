import LanguageToggle from "./LanguageToggle";
import HamburgerBtn from "./HamburgerBtn";

export default function Header() {
  return (
    <header className="hdr" data-testid="header">
      <div className="page">
        <div className="hdr-row">
          <a
            className="brand"
            href="https://tn-info.in"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="brand-glyph">த</div>
            <div>
              <div className="brand-name">
                TN-Info<em>.in</em>
              </div>
              <div className="brand-sub">தமிழ்நாடு · OPEN DATA</div>
            </div>
          </a>
          <nav className="nav">
            <a href="https://tn-info.in#districts">Districts</a>
            <a href="https://tn-info.in#feed">Updates</a>
            <a href="https://news.tn-info.in">News</a>
            <a href="/" className="active">
              Events
            </a>
            <a href="https://tn-info.in#api" className="api">
              API
            </a>
          </nav>
          <div className="actions">
            <LanguageToggle />
            <a
              className="gh-btn"
              href="https://github.com/tamilnadu-info"
              target="_blank"
              rel="noopener"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.19.7.8.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="star">★</span> GitHub
            </a>
            <HamburgerBtn />
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
            <span style={{ color: "var(--muted)" }}>
              Calendar · all times IST
            </span>
            <span>
              Build{" "}
              <span style={{ color: "var(--terra)", fontWeight: 600 }}>
                e4a2c8f
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
