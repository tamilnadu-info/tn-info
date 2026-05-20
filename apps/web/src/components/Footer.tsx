import { fetchGitHubData } from "@/lib/github";
import { formatBuildDate } from "@/lib/time";

export default async function Footer() {
  const gh = await fetchGitHubData();
  const commitHash = gh.commit !== "unknown" ? gh.commit : "—";
  const buildDate = formatBuildDate(gh.commitDate);
  const contributorCount = gh.contributors > 0 ? gh.contributors : 1;

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
              An open-source civic data platform for Tamil Nadu, built and run by{" "}
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
              and {contributorCount} contributor{contributorCount !== 1 ? "s" : ""}. <strong>Not affiliated</strong> with any government body or
              political party.
            </p>
            <div className="foot-cta">
              <a
                className="btn btn-primary"
                href="#donate"
                style={{ padding: "10px 16px", fontSize: "13px" }}
              >
                ♥ Donate
              </a>
              <a
                className="btn btn-secondary"
                href="#contribute"
                style={{ padding: "10px 16px", fontSize: "13px" }}
              >
                Contribute
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Coverage</h4>
            <ul>
              <li>
                <a href="#election">
                  Election<span className="ta tonly">தேர்தல்</span>
                </a>
              </li>
              <li>
                <a href="#education">
                  Education<span className="ta tonly">கல்வி</span>
                </a>
              </li>
              <li>
                <a href="#schemes">
                  Benefits<span className="ta tonly">நலத்திட்டம்</span>
                </a>
              </li>
              <li>
                <a href="#events">
                  Tech events<span className="ta tonly">நிகழ்வுகள்</span>
                </a>
              </li>
              <li>
                <a href="#districts">All 38 districts</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Developers</h4>
            <ul>
              <li>
                <a href="#api">API docs</a>
              </li>
              <li>
                <a href="#rss">RSS feeds</a>
              </li>
              <li>
                <a href="#webhooks">Webhooks</a>
              </li>
              <li>
                <a href="#dumps">Bulk data</a>
              </li>
              <li>
                <a
                  href="https://github.com/tamilnadu-info"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub · 1.2k ★
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>About</h4>
            <ul>
              <li>
                <a href="#mission">Mission</a>
              </li>
              <li>
                <a href="#contributors">Contributors · {contributorCount}</a>
              </li>
              <li>
                <a href="#sources">Data sources</a>
              </li>
              <li>
                <a href="#license">MIT license</a>
              </li>
              <li>
                <a
                  href="https://destrosec.com/contact"
                  target="_blank"
                  rel="noopener"
                >
                  Contact Destrosec
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-disc">
          <div className="lb">⚠ Important — please read</div>
          <p>
            <strong>TN-Info.in is not affiliated with the Government of Tamil Nadu.</strong> Data
            is aggregated from public sources and offered on a best-effort basis. Our goal is 100%
            accuracy, but <strong>Destrosec accepts no responsibility</strong> for any decision
            made on the basis of information shown here. We are open to corrections — if you spot
            an error, please{" "}
            <a href="https://github.com/tamilnadu-info/issues">open an issue</a> and we&apos;ll
            ship a fix within 24 hours.
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
          <span>
            Last build · {buildDate} · commit{" "}
            <span className="commit">{commitHash}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
