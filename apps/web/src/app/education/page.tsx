import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
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

export interface College {
  code: number;
  name: string;
  type: string;
  city: string;
  constituency: string;
  district: string;
  pincode: string;
  college_url: string;
  gmaps_url: string;
  branches: string[];
  category: string;
}

export interface ArtsCollege {
  college_code: string | null;
  sno?: number | null;
  region: string;
  district: string;
  taluk: string | null;
  college_name: string;
  management: string; // "Government" | "Government Aided" | "Self Financing"
  sanctioned_seats: number | null;
  admit_pct_2025?: number | null;
  naac_grade: string | null;
  nirf_rank: string | null;
  male_seats?: number;
  female_seats?: number;
  hostel: string | null;
  nodal_officer_name?: string | null;
  nodal_mobile?: string | null;
  nodal_email?: string | null;
  addl_nodal_name?: string | null;
  addl_mobile?: string | null;
  addl_email?: string | null;
}

export interface PolyBranch {
  name: string;
  intake: number;
}

export interface PolyCollege {
  college_code: string | null;
  aicte_id: string | null;
  college_name: string;
  address: string | null;
  city: string | null;
  district: string;
  college_type: string;
  category: string;
  male_hostel: string | null;
  female_hostel: string | null;
  branches: PolyBranch[];
  total_intake: number | null;
}

export interface MedicalCollege {
  college_code: string;
  college_name: string;
  college_type: string; // "Government" | "Private" | "Government Aided"
  district: string | null;
  city: string | null;
  pincode: string | null;
  address: string | null;
  website: string | null;
  university: string | null;
  mbbs_intake: number | null;
  courses: string[];
}

function loadColleges(): College[] {
  try {
    return JSON.parse(
      readFileSync(join(process.cwd(), "src", "data", "tnea", "colleges.json"), "utf8")
    ) as College[];
  } catch {
    return [];
  }
}

function loadArtsColleges(): ArtsCollege[] {
  try {
    const govt = JSON.parse(
      readFileSync(join(process.cwd(), "src", "data", "tnea", "arts_colleges_2026.json"), "utf8")
    ) as ArtsCollege[];
    const pvt = JSON.parse(
      readFileSync(join(process.cwd(), "src", "data", "tnea", "arts_colleges_private.json"), "utf8")
    ) as ArtsCollege[];
    return [...govt, ...pvt];
  } catch {
    return [];
  }
}

function loadPolyColleges(): PolyCollege[] {
  try {
    return JSON.parse(
      readFileSync(join(process.cwd(), "src", "data", "tnea", "polytechnic_colleges.json"), "utf8")
    ) as PolyCollege[];
  } catch {
    return [];
  }
}

function loadMedicalColleges(): MedicalCollege[] {
  try {
    return JSON.parse(
      readFileSync(join(process.cwd(), "src", "data", "tnea", "medical_colleges.json"), "utf8")
    ) as MedicalCollege[];
  } catch {
    return [];
  }
}

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
  const colleges = loadColleges();
  const artsColleges = loadArtsColleges();
  const polyColleges = loadPolyColleges();
  const medicalColleges = loadMedicalColleges();

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
                    {colleges.length || 423}
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
            colleges={colleges}
            artsColleges={artsColleges}
            polyColleges={polyColleges}
            medicalColleges={medicalColleges}
            districts={districts}
          />
        </div>
      </main>
    </>
  );
}
