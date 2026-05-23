export default function FocusCards() {
  return (
    <section className="section" id="now" data-testid="focus-cards">
      <div className="page">
        <div className="section-head">
          <div>
            <span className="kicker">Coverage · in production</span>
            <h2 className="eonly">
              What&apos;s <em>live</em> today.
            </h2>
            <h2 className="tonly">
              இன்று <em>செயலில்</em>.
            </h2>
            <p className="lead eonly">
              We start with four areas. Each is a fully-explorable section with real, structured
              data. Coverage grows monthly.
            </p>
          </div>
          <div className="rhs">
            2 live · 2 in dev
            <br />
            more shipping monthly →
          </div>
        </div>
        <div className="focus-grid">
          <div className="focus f-elect focus-dev">
            <div className="hd">
              <div className="ico-wrap">p</div>
              <span className="wip">Dev</span>
            </div>
            <h3 className="eonly">
              <em>Politics</em>
            </h3>
            <h3 className="tonly" style={{ fontFamily: "var(--ta)" }}>
              <em>அரசியல்</em>
            </h3>
            <div className="t-ta eonly">அரசியல்</div>
            <p className="blurb">
              2026 Assembly results, all 234 constituencies, MLA profiles, cabinet ministers, vote
              counts.
            </p>
            <div className="stats">
              <div className="s">
                <b>234</b>
                <span>Constituencies</span>
              </div>
              <div className="s">
                <b>39/39</b>
                <span>2024 sweep</span>
              </div>
            </div>
          </div>
          <a className="focus f-edu" href="/education">
            <div className="hd">
              <div className="ico-wrap">e</div>
              <span className="live">Live</span>
            </div>
            <h3 className="eonly">
              <em>Education</em>
            </h3>
            <h3 className="tonly" style={{ fontFamily: "var(--ta)" }}>
              <em>கல்வி</em>
            </h3>
            <div className="t-ta eonly">கல்வி</div>
            <p className="blurb">
              TNEA / TANCA counselling dates, college codes, round-by-round allotments.
            </p>
            <div className="stats">
              <div className="s">
                <b>591</b>
                <span>Colleges</span>
              </div>
              <div className="s">
                <b>4</b>
                <span>Active rounds</span>
              </div>
            </div>
            <span className="arr">→</span>
          </a>
          <div className="focus f-ben focus-dev">
            <div className="hd">
              <div className="ico-wrap">b</div>
              <span className="wip">Dev</span>
            </div>
            <h3 className="eonly">
              <em>Benefits</em>
            </h3>
            <h3 className="tonly" style={{ fontFamily: "var(--ta)" }}>
              <em>நலத்திட்டம்</em>
            </h3>
            <div className="t-ta eonly">நலத்திட்டங்கள்</div>
            <p className="blurb">
              Government schemes, eligibility rules, application links, rule-change alerts.
            </p>
            <div className="stats">
              <div className="s">
                <b>28</b>
                <span>Schemes</span>
              </div>
              <div className="s">
                <b>1.15Cr</b>
                <span>Beneficiaries</span>
              </div>
            </div>
          </div>
          <a className="focus f-ev" href="/events">
            <div className="hd">
              <div className="ico-wrap">t</div>
              <span className="live">Live</span>
            </div>
            <h3 className="eonly">
              <em>Tech events</em>
            </h3>
            <h3 className="tonly" style={{ fontFamily: "var(--ta)" }}>
              <em>நிகழ்வுகள்</em>
            </h3>
            <div className="t-ta eonly">நிகழ்வுகள்</div>
            <p className="blurb">
              Workshops, hackathons, meetups across TN — community-curated, RSS-friendly.
            </p>
            <div className="stats">
              <div className="s">
                <b>128</b>
                <span>Events</span>
              </div>
              <div className="s">
                <b>14</b>
                <span>Cities</span>
              </div>
            </div>
            <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
