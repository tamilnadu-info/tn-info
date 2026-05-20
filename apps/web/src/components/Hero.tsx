import HeroTicker from "./HeroTicker";
import TNMap from "./TNMap";

export default function Hero() {
  return (
    <section className="hero">
      <div className="page">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">
              <span className="ind"></span> An open civic data platform · v1.0
            </span>
            <h1 className="hh">
              <span className="eonly">
                Everything
                <br />
                about <em>Tamil&nbsp;Nadu.</em>
                <br />
                Open. Free. <em>For everyone.</em>
              </span>
              <span className="tonly">
                <span className="ta">தமிழ்நாடு பற்றிய</span>
                <br />
                <em>அனைத்தும்.</em>
                <br />
                <span className="ta">திறந்த. இலவசம்.</span>
              </span>
              <sup>v1</sup>
            </h1>
            <p className="lede">
              <strong>38 districts. 234 constituencies. 47 schemes. 591 colleges.</strong> Real
              Tamil Nadu data — aggregated from public sources, kept fresh, and offered free as a
              website, REST API, and RSS feed. Built by the community, maintained by{" "}
              <a
                href="https://destrosec.com"
                target="_blank"
                rel="noopener"
                style={{
                  color: "var(--terra)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  fontWeight: 600,
                }}
              >
                Destrosec
              </a>
              .
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#districts">
                Browse the data →
              </a>
              <a className="btn btn-secondary" href="#api">
                Use the API
              </a>
              <a className="btn btn-ghost" href="/news">
                See what&apos;s new
              </a>
            </div>

            <div className="ticker-strip">
              <div className="tt">
                <span className="blink"></span> Latest
              </div>
              <div className="tw">
                <HeroTicker />
              </div>
            </div>
          </div>

          {/* TN map */}
          <div>
            <TNMap />
          </div>
        </div>

        {/* hero stat strip */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="v">38</div>
            <div className="k eonly">Districts</div>
            <div
              className="k tonly"
              style={{
                fontFamily: "var(--ta)",
                textTransform: "none",
                letterSpacing: 0,
                fontSize: "13px",
              }}
            >
              மாவட்டங்கள்
            </div>
          </div>
          <div className="hero-stat">
            <div className="v">234</div>
            <div className="k eonly">Constituencies</div>
            <div
              className="k tonly"
              style={{
                fontFamily: "var(--ta)",
                textTransform: "none",
                letterSpacing: 0,
                fontSize: "13px",
              }}
            >
              தொகுதிகள்
            </div>
          </div>
          <div className="hero-stat">
            <div className="v">47</div>
            <div className="k eonly">Schemes</div>
            <div
              className="k tonly"
              style={{
                fontFamily: "var(--ta)",
                textTransform: "none",
                letterSpacing: 0,
                fontSize: "13px",
              }}
            >
              திட்டங்கள்
            </div>
          </div>
          <div className="hero-stat">
            <div className="v">591</div>
            <div className="k eonly">Colleges</div>
            <div
              className="k tonly"
              style={{
                fontFamily: "var(--ta)",
                textTransform: "none",
                letterSpacing: 0,
                fontSize: "13px",
              }}
            >
              கல்லூரிகள்
            </div>
          </div>
          <div className="hero-stat">
            <div className="v">
              <em>1.24M</em>
            </div>
            <div className="k">API calls / 7d</div>
          </div>
        </div>
      </div>
    </section>
  );
}
