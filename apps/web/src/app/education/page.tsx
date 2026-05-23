import type { Metadata } from "next";
import { TN_NEWS, type NewsItem } from "@/data/news";
import { TN_DATA } from "@/data/tn-data";
import EduInteractive from "./EduInteractive";

export const metadata: Metadata = {
  title: "Education · TN-Info.in",
  description:
    "Tamil Nadu education updates — TNEA, TANCA, TNPSC notifications, scholarships, SCERT, and all 591 colleges.",
};

const EDU_UPDATES = [
  {
    id: "tnea-reg",
    tag: "TNEA",
    status: "active",
    headline: "TNEA 2026 registration closes 2 June",
    source: "DoTE",
    date: "17 May 2026",
    isoDate: "2026-05-17",
    href: "/tnea-2026-reg",
    summary: "~1.34L seats across 455 institutes. Online only, 4 rounds.",
  },
  {
    id: "tnpsc-g2a",
    tag: "TNPSC",
    status: "active",
    headline: "TNPSC Group 2A — 4,002 vacancies, apply by 11 Jun",
    source: "TNPSC",
    date: "10 May 2026",
    isoDate: "2026-05-10",
    href: "/tnpsc-g2",
    summary:
      "Largest G2A notification since 2022. CBT exam tentative August 2026.",
  },
  {
    id: "tanca-2026",
    tag: "TANCA",
    status: "upcoming",
    headline: "TANCA 2026 registration expected July–August",
    source: "Anna University",
    date: "Apr 2026",
    isoDate: "2026-04-01",
    href: "#",
    summary:
      "ME/MTech/MBA counselling via Anna University. Dates not yet announced.",
  },
  {
    id: "pudhumai-penn-edu",
    tag: "Scholarship",
    status: "active",
    headline: "Pudhumai Penn — ₹1,000/month for govt school girls in college",
    source: "Adi Dravidar Welfare",
    date: "May 2026",
    isoDate: "2026-05-01",
    href: "#",
    summary:
      "3.7L beneficiaries. Apply via e-Sevai with college enrollment proof.",
  },
  {
    id: "scert-tamil",
    tag: "SCERT",
    status: "closed",
    headline: "SCERT Std 8 Tamil revision — committee report submitted",
    source: "SCERT",
    date: "Mar 2026",
    isoDate: "2026-03-15",
    href: "#",
    summary:
      "Panel recommended 3 new lesson units covering Sangam literature and digital literacy.",
  },
  {
    id: "cm-breakfast",
    tag: "School",
    status: "active",
    headline: "CM Breakfast scheme: 17,412 schools, 17.5L students enrolled",
    source: "School Education Dept",
    date: "May 2026",
    isoDate: "2026-05-05",
    href: "#",
    summary:
      "Daily hot breakfast before first period. Budget: ₹48 Cr/month.",
  },
];

export type EduUpdate = (typeof EDU_UPDATES)[number];

const SAMPLE_COLLEGES = [
  { code: "1101", name: "Anna University", dist: "Chennai", type: "Government" },
  {
    code: "1201",
    name: "College of Engineering Guindy",
    dist: "Chennai",
    type: "Government",
  },
  {
    code: "2301",
    name: "PSG College of Technology",
    dist: "Coimbatore",
    type: "Private Aided",
  },
  {
    code: "2302",
    name: "Coimbatore Institute of Technology",
    dist: "Coimbatore",
    type: "Private Aided",
  },
  {
    code: "3501",
    name: "Madurai Kamaraj University",
    dist: "Madurai",
    type: "Government",
  },
  {
    code: "4201",
    name: "NIT Trichy",
    dist: "Tiruchirapalli",
    type: "Government",
  },
  {
    code: "1502",
    name: "SRM Institute of Science and Technology",
    dist: "Kancheepuram",
    type: "Private Self-Financed",
  },
  {
    code: "1503",
    name: "Saveetha Engineering College",
    dist: "Kancheepuram",
    type: "Private Self-Financed",
  },
];

export type College = (typeof SAMPLE_COLLEGES)[number];

const TOP_3_HOT = TN_NEWS.hot.filter((n) => n.tag === "EDUCATION").slice(0, 3);
const TOP_3_HIDDEN = TN_NEWS.hidden.filter((n) => n.tag === "EDUCATION");
const TOP_3 = [...TOP_3_HOT, ...TOP_3_HIDDEN].slice(0, 3);

const HIDDEN_EDU = TN_NEWS.hidden.filter(
  (n) => n.tag === "EDUCATION" || n.tag === "HEALTH" || n.tag === "ENVIRO"
);

const CNSL_ROWS = [
  {
    name: "TNEA 2026",
    sub: "DoTE · tneaonline.org",
    status: "active" as const,
  },
  {
    name: "TANCA 2026",
    sub: "Anna University",
    status: "upcoming" as const,
  },
  {
    name: "TNMCC 2026",
    sub: "NHM Tamil Nadu",
    status: "upcoming" as const,
  },
];

function TopCard({ item }: { item: NewsItem }) {
  return (
    <a className="edu-top-card" href={item.href} style={{ display: "grid", textDecoration: "none" }}>
      <div className="glyph">{item.glyph ?? item.tag.slice(0, 3)}</div>
      <div className="body">
        <div className="tag-line">
          <span className={`nc-tag tag-${item.tag}`}>{item.tag}</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--muted)", letterSpacing: ".06em" }}>
            {item.date}
          </span>
        </div>
        <h4>{item.headline}</h4>
        <span className="src">{item.source}</span>
      </div>
    </a>
  );
}

export default function EducationPage() {
  const districts = TN_DATA.districts.map((d) => d.en);

  return (
    <>
      <header className="page-hero">
        <div className="page">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">TN-Info.in</a>
            <span className="sep">/</span>
            <a href="/news">News</a>
            <span className="sep">/</span>
            <span>Education</span>
          </nav>
          <h1>
            Education in Tamil Nadu —{" "}
            <em>every counselling round, every notification, every college</em>
          </h1>
          <p className="lead">
            TNEA, TANCA, TNPSC Group 2A, scholarships, SCERT revisions — every
            update that matters to students, parents, and educators in Tamil
            Nadu. Updated from official sources.
          </p>
          <p className="lede-ta">
            மாணவர்கள், பெற்றோர், ஆசிரியர்களுக்கு தேவையான கல்வி
            அறிவிப்புகள் — TNEA, TANCA, TNPSC, உதவித்தொகை மற்றும் அனைத்து
            கல்லூரிகளும்.
          </p>
        </div>
      </header>

      <main>
        <div className="page" style={{ paddingBottom: "80px" }}>
          <div className="edu-hero">
            <div>
              <div className="hh">
                <span className="live">Live</span>
                Key numbers
              </div>
              <div className="edu-numbers">
                <div className="edu-num">
                  <b>
                    591<em>+</em>
                  </b>
                  <span>Engineering Colleges</span>
                </div>
                <div className="edu-num">
                  <b>
                    1.34<em>L</em>
                  </b>
                  <span>TNEA Seats</span>
                </div>
                <div className="edu-num">
                  <b>
                    4,002
                  </b>
                  <span>TNPSC G2A Vacancies</span>
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <div className="hh" style={{ marginBottom: "12px" }}>
                  Counselling rounds
                </div>
                <div className="cnsl-list">
                  {CNSL_ROWS.map((row) => (
                    <div className="cnsl-row" key={row.name}>
                      <div>
                        <div className="cnsl-name">{row.name}</div>
                        <div className="cnsl-sub">{row.sub}</div>
                      </div>
                      <span className={`cnsl-badge ${row.status}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="hh" style={{ marginBottom: "14px" }}>
                Three you should not miss
              </div>
              {TOP_3.length > 0 ? (
                TOP_3.map((item) => <TopCard key={item.id} item={item} />)
              ) : (
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    color: "var(--muted)",
                  }}
                >
                  No critical education updates right now.
                </p>
              )}
            </div>
          </div>

          <EduInteractive
            updates={EDU_UPDATES}
            hiddenEdu={HIDDEN_EDU}
            colleges={SAMPLE_COLLEGES}
            districts={districts}
          />
        </div>
      </main>
    </>
  );
}
