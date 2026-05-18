"use client";

import { TN_NEWS } from "@/data/news";

const NEWS_URL = "https://news.tn-info.in";

export default function NewsPreview() {
  const hotItems = TN_NEWS.hot.slice(0, 3);
  const hiddenItems = TN_NEWS.hidden.slice(0, 4);

  return (
    <section className="section" id="news" style={{ paddingTop: "32px" }}>
      <div className="page">
        <div className="section-head">
          <div>
            <span className="kicker">The news desk</span>
            <h2 className="eonly">What&apos;s <em>hot</em> · what&apos;s <em>hidden</em>.</h2>
            <h2 className="tonly">முக்கிய <em>செய்திகள்</em> · கண்டுபிடித்த <em>செய்திகள்</em>.</h2>
            <p className="lead eonly">
              A weekly editorial pick. <strong>HOT</strong> = stories every Tamil Nadu resident should know.{" "}
              <strong>HIDDEN</strong> = stories we surfaced from RTI replies, audit queues, and dashboards.
            </p>
          </div>
          <div className="rhs">Curated weekly<br />Editorial · not algorithmic</div>
        </div>

        <div className="news-section-grid">
          {/* HOT lane */}
          <div>
            <div className="news-lane-hd">
              <span className="badge hot">HOT</span>
              <h3 className="eonly">Everyone should <em>know</em> this</h3>
              <h3 className="tonly">அனைவரும் <em>அறிய</em> வேண்டியது</h3>
              <span className="lane-cnt">{TN_NEWS.hot.length} stories total</span>
            </div>
            <p className="news-lane-blurb">Showing this week&apos;s top three. Open the full desk for the rest.</p>
            <div className="feat-grid">
              {hotItems.map((item) => (
                <a key={item.id} className="feat-card" href={`${NEWS_URL}/${item.id}`} target="_blank" rel="noopener">
                  <div className={`feat-thumb tag-${item.tag}`}>
                    <span className="glyph">{item.glyph}</span>
                    <span className="tag-pill">{item.tag}</span>
                    <span className="dist-pill">{item.district}</span>
                  </div>
                  <div className="feat-body">
                    <div className="feat-date">{item.date}</div>
                    <h4 className="feat-headline">{item.headline}</h4>
                    <p className="feat-summary">{item.summary}</p>
                    <div className="feat-foot">
                      <span className="src">{item.source}</span>
                      <span className="arr">Read →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* HIDDEN lane */}
          <div>
            <div className="news-lane-hd">
              <span className="badge hidden">HIDDEN</span>
              <h3 className="eonly">Stories we <em>surfaced</em></h3>
              <h3 className="tonly">நாம் <em>கண்டுபிடித்தவை</em></h3>
              <span className="lane-cnt">{TN_NEWS.hidden.length} stories total</span>
            </div>
            <p className="news-lane-blurb">Pulled from RTI replies, internal trackers, audit queues. Each row carries a provenance line.</p>
            <div className="hid-list">
              {hiddenItems.map((item) => (
                <div key={item.id} className="hid-row">
                  <div className="meta-col">
                    <span className={`nc-tag tag-${item.tag}`}>{item.tag}</span>
                    <span className="dist">{item.district}</span>
                  </div>
                  <div className="body-col">
                    <p className="head">
                      <a href={`${NEWS_URL}/${item.id}`} target="_blank" rel="noopener">{item.headline}</a>
                    </p>
                    <div className="why">
                      <span className="why-lbl">Why hidden</span>
                      {item.whyHidden}
                    </div>
                  </div>
                  <div className="src-col">
                    <span className="src">{item.source}</span>
                    <span className="arr">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="see-all">
          <a href={NEWS_URL} target="_blank" rel="noopener">
            Open the full news desk <span className="arr">→</span>
            <span className="ct">{TN_NEWS.hot.length + TN_NEWS.hidden.length} stories</span>
          </a>
        </div>
      </div>
    </section>
  );
}
