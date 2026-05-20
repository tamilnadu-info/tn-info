export interface NewsItem {
  id: string;
  tag: string;
  district: string;
  glyph?: string;
  headline: string;
  headlineTa: string;
  summary: string;
  source: string;
  sourceUrl: string;
  date: string;
  isoDate: string;
  href: string;
  whyHidden?: string;
}

export interface TnNews {
  hot: NewsItem[];
  hidden: NewsItem[];
}

export const TN_NEWS: TnNews = {
  hot: [
    {
      id: "tnea-2026-reg",
      tag: "EDUCATION",
      district: "TN-WIDE",
      glyph: "TNEA",
      headline:
        "TNEA 2026 registration window closes 2 June — choice-filling opens after merit list",
      headlineTa:
        "டி.என்.இ.ஏ. 2026 பதிவு ஜூன் 2 உடன் முடிகிறது — தரவரிசை பட்டியலுக்குப் பிறகு கல்லூரித் தேர்வு",
      summary:
        "DoTE opened registration on 3 May at tneaonline.org. ~1.34 lakh seats across 455 institutes; counselling is online only, 4 rounds (choice-filling → allotment → reporting → fee).",
      source: "DoTE · tneaonline.org",
      sourceUrl: "https://www.tneaonline.org/",
      date: "17 May 2026",
      isoDate: "2026-05-17",
      href: "/news/tnea-2026-reg",
    },
    {
      id: "mut-may",
      tag: "SCHEME",
      district: "TN-WIDE",
      glyph: "₹1k",
      headline:
        "Magalir Urimai Thogai — May ₹1,000 transfer reaches 1.15 Cr women",
      headlineTa:
        "மகளிர் உரிமைத் தொகை — மே மாதம் 1.15 கோடி பெண்களுக்கு ₹1,000 சென்றது",
      summary:
        "Direct transfer concluded on 15 May. 4.2L pending KYC mismatches flagged by Social Welfare Dept; verification window open till 31 May at the e-Sevai centres.",
      source: "Social Welfare Dept",
      sourceUrl: "#",
      date: "16 May 2026",
      isoDate: "2026-05-16",
      href: "/news/mut-may",
    },
    {
      id: "metro-c4",
      tag: "INFRA",
      district: "CHENNAI",
      glyph: "Y4",
      headline:
        "Yellow Line passenger ops cross 100 days · Poonamallee Bypass ↔ Vadapalani",
      headlineTa:
        "மஞ்சள் வழித்தடம் தொடங்கி 100 நாட்கள் — பூனமல்லி பைபாஸ் ↔ வடபழனி",
      summary:
        'CMRL Corridor 4 partial opening (~10 km, 8 stations) — Lighthouse end still under construction. TBM "Peacock" cleared first underground breakthrough July 2025; full line slated 2027.',
      source: "CMRL bulletin",
      sourceUrl: "https://chennaimetrorail.org/",
      date: "14 May 2026",
      isoDate: "2026-05-14",
      href: "/news/metro-c4",
    },
    {
      id: "cabinet-rejig",
      tag: "ELECTION",
      district: "TN-WIDE",
      glyph: "CAB",
      headline:
        "Cabinet rejig — Three portfolios reassigned, one new ministry announced",
      headlineTa:
        "அமைச்சரவை மாற்றம் — மூன்று துறைகள் புதிதாக ஒதுக்கப்பட்டன",
      summary:
        "Health, Higher Ed and Industries reshuffled by Raj Bhavan order on 13 May. New Ministry of Civic Data formed — a first in India.",
      source: "Raj Bhavan release",
      sourceUrl: "#",
      date: "13 May 2026",
      isoDate: "2026-05-13",
      href: "/news/cabinet-rejig",
    },
    {
      id: "heatwave",
      tag: "ENVIRO",
      district: "VELLORE · KARUR · SALEM",
      glyph: "43°",
      headline: "Heatwave: Vellore, Karur, Salem cross 43°C for 5 consecutive days",
      headlineTa:
        "வெப்ப அலை: வேலூர், கரூர், சேலம் தொடர்ந்து 43°C கடந்தன",
      summary:
        "IMD red alert across 7 districts. State opened 412 temporary cooling shelters; outdoor-work advisories issued by Labour Dept until 22 May.",
      source: "IMD Chennai",
      sourceUrl: "https://mausam.imd.gov.in/",
      date: "15 May 2026",
      isoDate: "2026-05-15",
      href: "/news/heatwave",
    },
    {
      id: "free-bus",
      tag: "SCHEME",
      district: "TN-WIDE",
      glyph: "BUS",
      headline: "Free bus scheme — 8.7 crore women trips logged in April alone",
      headlineTa:
        "பெண்களுக்கான இலவச பேருந்து — ஏப்ரல் மாதம் 8.7 கோடி பயணங்கள்",
      summary:
        "TNSTC dashboard reports a 31% jump year-on-year. Fare substitution cost to the exchequer: ₹468 Cr in April. Scheme entering its fifth year.",
      source: "TNSTC dashboard",
      sourceUrl: "#",
      date: "12 May 2026",
      isoDate: "2026-05-12",
      href: "/news/free-bus",
    },
    {
      id: "tneb-tariff",
      tag: "INFRA",
      district: "TN-WIDE",
      glyph: "EB",
      headline: "TNERC opens public consultation on FY27 power tariff revision",
      headlineTa:
        "எரிசக்தி கட்டண திருத்தம் — TNERC பொதுக் கருத்து கேட்பு",
      summary:
        "Comments accepted till 30 May 2026 via tnerc.gov.in. Domestic slab proposed unchanged; industrial HT-II proposed +4.2%. Public hearing 14 Jun.",
      source: "TNERC notice",
      sourceUrl: "https://www.tnerc.gov.in/",
      date: "11 May 2026",
      isoDate: "2026-05-11",
      href: "/news/tneb-tariff",
    },
    {
      id: "tnpsc-g2",
      tag: "EDUCATION",
      district: "TN-WIDE",
      glyph: "G2A",
      headline: "TNPSC Group 2A — 4,002 vacancies notified; apply by 11 June",
      headlineTa:
        "டி.என்.பி.எஸ்.சி. குழு 2A — 4,002 காலியிடங்கள்; ஜூன் 11 க்குள் விண்ணப்பிக்கவும்",
      summary:
        "Largest Group 2A notification since 2022. Includes 1,124 Assistant posts across Revenue, Commercial Tax and Treasuries. CBT exam tentative August 2026.",
      source: "TNPSC notification",
      sourceUrl: "https://www.tnpsc.gov.in/",
      date: "10 May 2026",
      isoDate: "2026-05-10",
      href: "/news/tnpsc-g2",
    },
  ],
  hidden: [
    {
      id: "coast-erosion",
      tag: "ENVIRO",
      district: "NAGAPATTINAM · CUDDALORE",
      headline:
        "Coromandel coast lost 2.4 km of beach since 2023 — NCSCM internal survey",
      headlineTa:
        "கோரமண்டல் கடற்கரை 2023 முதல் 2.4 கி.மீ. அரிக்கப்பட்டது",
      summary:
        "National Centre for Sustainable Coastal Management mapped 14 erosion hotspots from Pulicat to Point Calimere; worst spot lost 380m in 14 months.",
      whyHidden:
        "Report uploaded to NCSCM portal in March; no press release issued. Found via the FTP archive.",
      source: "NCSCM survey · RTI #2914",
      sourceUrl: "#",
      date: "Mar 2026",
      isoDate: "2026-03-12",
      href: "/news/coast-erosion",
    },
    {
      id: "scavenging",
      tag: "HEALTH",
      district: "TN-WIDE",
      headline:
        "11 manual-scavenging deaths in TN over 12 months — DPH internal log",
      headlineTa:
        "12 மாதங்களில் 11 கைமுறைத் தூய்மைப் பணியாளர் உயிரிழப்புகள் — DPH உள் பதிவு",
      summary:
        "No public dashboard exists. State has zero pending convictions under PEMSR Act, 2013. Five cases sub-judice in Madurai Sessions Court.",
      whyHidden:
        "Pieced together from DPH log + Safai Karamchari Andolan records. Not reflected in any state response on the floor of the Assembly.",
      source: "DPH log · SKA",
      sourceUrl: "#",
      date: "Apr 2026",
      isoDate: "2026-04-08",
      href: "/news/scavenging",
    },
    {
      id: "cauvery-sand",
      tag: "INFRA",
      district: "TIRUCHY · THANJAVUR",
      headline: "Cauvery delta sand-mining audit pending 14 months past deadline",
      headlineTa:
        "காவிரி டெல்டா மணல் தணிக்கை 14 மாதங்களாக நிலுவையில்",
      summary:
        'Comptroller flagged irregularities in 9 of 17 quarries. Final report due Mar 2025; status still "with department".',
      whyHidden:
        "Tracked via the CAG online queue — no quarterly update on the department website since the original flag.",
      source: "CAG queue",
      sourceUrl: "#",
      date: "Stuck since 2024",
      isoDate: "2025-03-01",
      href: "/news/cauvery-sand",
    },
    {
      id: "phc-vacant",
      tag: "HEALTH",
      district: "ARIYALUR · KRISHNAGIRI · THENI",
      headline:
        "23% of govt PHCs operate without a pediatric MO — internal posting tracker",
      headlineTa:
        "அரசு ஆ.ம.நி-களில் 23% குழந்தைகள் நல மருத்துவர் இல்லை",
      summary:
        "385 of 1,694 PHCs unfilled. Worst: Ariyalur (47%), Krishnagiri (41%), Theni (38%). DPH advertised the same 92 posts twice in 18 months.",
      whyHidden:
        "Posting tracker is an internal Excel sheet — RTI #4711/2026 surfaced it. Not on TN Govt jobs portal.",
      source: "RTI #4711/2026",
      sourceUrl: "#",
      date: "Apr 2026",
      isoDate: "2026-04-22",
      href: "/news/phc-vacant",
    },
    {
      id: "scert-tamil",
      tag: "EDUCATION",
      district: "TN-WIDE",
      headline:
        "SCERT Tamil literature revision panel report unpublished for 11 months",
      headlineTa:
        "எஸ்.சி.இ.ஆர்.டி. தமிழ் இலக்கிய திருத்த குழுவின் அறிக்கை 11 மாதங்களாக வெளியிடப்படவில்லை",
      summary:
        'Panel submitted recommendations on Class 9–12 syllabus in Jun 2025. SCERT says "under review". Six members resigned in protest between Sep–Dec 2025.',
      whyHidden:
        "Existence of the report confirmed only via member resignation letters published on personal blogs.",
      source: "Resignation letters",
      sourceUrl: "#",
      date: "Jun 2025",
      isoDate: "2025-06-15",
      href: "/news/scert-tamil",
    },
    {
      id: "ulb-waste",
      tag: "INFRA",
      district: "CUDDALORE · SIVAKASI · KARUR",
      headline:
        "Solid-waste data missing for 47 of 234 urban wards — ULB dashboards",
      headlineTa:
        "234 நகர்ப்புற வார்டுகளில் 47 இடங்களின் திடக்கழிவு தரவு காணவில்லை",
      summary:
        "Worst gaps in Tier-2 ULBs: Cuddalore, Sivakasi, Karur, Hosur. National Swachh dashboard reports the same wards as 100% compliant.",
      whyHidden:
        "Cross-referenced TN ULB portal against national SBM dashboard — only the diff revealed the missing wards.",
      source: "ULB + SBM diff",
      sourceUrl: "#",
      date: "May 2026",
      isoDate: "2026-05-04",
      href: "/news/ulb-waste",
    },
    {
      id: "forest-encroach",
      tag: "ENVIRO",
      district: "NILGIRIS · ERODE",
      headline:
        "2,118 acres of reserve forest under un-acted encroachment notices in Western Ghats districts",
      headlineTa:
        "மேற்கு தொடர்ச்சி மலை மாவட்டங்களில் 2,118 ஏக்கர் காப்புக்காடு அத்துமீறல்",
      summary:
        "Forest Dept issued Section 26 notices for 78 plots — only 11 acted on in last 36 months. Six plots have since been transferred via Patta correction.",
      whyHidden:
        "Pulled from district forest officers' monthly compliance returns — only available on request, not aggregated anywhere.",
      source: "DFO returns · RTI #5102",
      sourceUrl: "#",
      date: "Feb 2026",
      isoDate: "2026-02-19",
      href: "/news/forest-encroach",
    },
    {
      id: "tnea-fee-refund",
      tag: "EDUCATION",
      district: "TN-WIDE",
      headline:
        "₹3.7 Cr in TNEA 2024 counselling fee refunds pending for 11 months",
      headlineTa:
        "TNEA 2024 கலந்தாய்வு கட்டண திருப்பித்தரல் — ₹3.7 கோடி 11 மாதங்களாக நிலுவையில்",
      summary:
        '7,412 candidates affected — primarily SC/SCA who opted out after Round 2. DoTE response: "bank reconciliation pending".',
      whyHidden:
        "Surfaced via a parent-collective's aggregated TNEA refund tracker. No mention on DoTE's grievance dashboard.",
      source: "TNEA Refund Tracker",
      sourceUrl: "#",
      date: "May 2026",
      isoDate: "2026-05-01",
      href: "/news/tnea-fee-refund",
    },
  ],
};
