// Tamil Nadu data shared across both directions.
// Best-effort accuracy. Real district/MLA/scheme names where possible.

export const TN_DATA = (function () {
  // 38 districts with rough geo column/row for hex grid placement
  // (cols 0..7, rows 0..9; north = low row). Hand-tuned, not cartographic.
  const districts = [
    { id: "tiruvallur",       en: "Tiruvallur",        ta: "திருவள்ளூர்",          col: 5, row: 1, mlas: 7,  pop: "3.73M" },
    { id: "chennai",          en: "Chennai",           ta: "சென்னை",                col: 6, row: 1, mlas: 16, pop: "6.75M", capital: true },
    { id: "chengalpattu",     en: "Chengalpattu",      ta: "செங்கல்பட்டு",         col: 6, row: 2, mlas: 5,  pop: "2.55M" },
    { id: "kanchipuram",      en: "Kanchipuram",       ta: "காஞ்சிபுரம்",          col: 5, row: 2, mlas: 4,  pop: "1.66M" },
    { id: "vellore",          en: "Vellore",           ta: "வேலூர்",                col: 4, row: 1, mlas: 4,  pop: "1.61M" },
    { id: "ranipet",          en: "Ranipet",           ta: "ராணிப்பேட்டை",         col: 4, row: 2, mlas: 3,  pop: "1.21M" },
    { id: "tirupathur",       en: "Tirupathur",        ta: "திருப்பத்தூர்",         col: 3, row: 1, mlas: 3,  pop: "1.11M" },
    { id: "krishnagiri",      en: "Krishnagiri",       ta: "கிருஷ்ணகிரி",          col: 2, row: 1, mlas: 5,  pop: "1.88M" },
    { id: "dharmapuri",       en: "Dharmapuri",        ta: "தர்மபுரி",              col: 2, row: 2, mlas: 4,  pop: "1.51M" },
    { id: "tiruvannamalai",   en: "Tiruvannamalai",    ta: "திருவண்ணாமலை",         col: 4, row: 3, mlas: 8,  pop: "2.46M" },
    { id: "villupuram",       en: "Viluppuram",        ta: "விழுப்புரம்",          col: 5, row: 3, mlas: 7,  pop: "2.10M" },
    { id: "kallakurichi",     en: "Kallakurichi",      ta: "கள்ளக்குறிச்சி",       col: 4, row: 4, mlas: 5,  pop: "1.37M" },
    { id: "cuddalore",        en: "Cuddalore",         ta: "கடலூர்",                col: 6, row: 3, mlas: 6,  pop: "2.61M" },
    { id: "salem",            en: "Salem",             ta: "சேலம்",                  col: 2, row: 3, mlas: 11, pop: "3.48M" },
    { id: "namakkal",         en: "Namakkal",          ta: "நாமக்கல்",              col: 2, row: 4, mlas: 4,  pop: "1.72M" },
    { id: "erode",            en: "Erode",             ta: "ஈரோடு",                 col: 1, row: 3, mlas: 5,  pop: "2.25M" },
    { id: "nilgiris",         en: "The Nilgiris",      ta: "நீலகிரி",               col: 0, row: 3, mlas: 2,  pop: "0.74M" },
    { id: "tiruppur",         en: "Tiruppur",          ta: "திருப்பூர்",            col: 1, row: 4, mlas: 7,  pop: "2.47M" },
    { id: "coimbatore",       en: "Coimbatore",        ta: "கோயம்புத்தூர்",         col: 0, row: 4, mlas: 10, pop: "3.46M" },
    { id: "karur",            en: "Karur",             ta: "கரூர்",                  col: 2, row: 5, mlas: 3,  pop: "1.08M" },
    { id: "trichy",           en: "Tiruchirappalli",   ta: "திருச்சிராப்பள்ளி",    col: 3, row: 5, mlas: 9,  pop: "2.72M" },
    { id: "perambalur",       en: "Perambalur",        ta: "பெரம்பலூர்",            col: 4, row: 5, mlas: 2,  pop: "0.57M" },
    { id: "ariyalur",         en: "Ariyalur",          ta: "அரியலூர்",              col: 5, row: 5, mlas: 2,  pop: "0.75M" },
    { id: "thanjavur",        en: "Thanjavur",         ta: "தஞ்சாவூர்",             col: 5, row: 6, mlas: 6,  pop: "2.41M" },
    { id: "tiruvarur",        en: "Tiruvarur",         ta: "திருவாரூர்",            col: 6, row: 5, mlas: 4,  pop: "1.26M" },
    { id: "nagapattinam",     en: "Nagapattinam",      ta: "நாகப்பட்டினம்",         col: 7, row: 6, mlas: 3,  pop: "0.70M" },
    { id: "mayiladuthurai",   en: "Mayiladuthurai",    ta: "மயிலாடுதுறை",          col: 6, row: 6, mlas: 2,  pop: "0.92M" },
    { id: "pudukkottai",      en: "Pudukkottai",       ta: "புதுக்கோட்டை",         col: 3, row: 6, mlas: 5,  pop: "1.62M" },
    { id: "sivaganga",        en: "Sivaganga",         ta: "சிவகங்கை",              col: 3, row: 7, mlas: 5,  pop: "1.34M" },
    { id: "ramanathapuram",   en: "Ramanathapuram",    ta: "இராமநாதபுரம்",          col: 4, row: 7, mlas: 4,  pop: "1.35M" },
    { id: "dindigul",         en: "Dindigul",          ta: "திண்டுக்கல்",          col: 2, row: 6, mlas: 7,  pop: "2.16M" },
    { id: "theni",            en: "Theni",             ta: "தேனி",                   col: 1, row: 6, mlas: 4,  pop: "1.24M" },
    { id: "madurai",          en: "Madurai",           ta: "மதுரை",                  col: 2, row: 7, mlas: 10, pop: "3.04M" },
    { id: "virudhunagar",     en: "Virudhunagar",      ta: "விருதுநகர்",            col: 2, row: 8, mlas: 6,  pop: "1.94M" },
    { id: "thoothukudi",      en: "Thoothukudi",       ta: "தூத்துக்குடி",         col: 3, row: 8, mlas: 6,  pop: "1.75M" },
    { id: "tenkasi",          en: "Tenkasi",           ta: "தென்காசி",              col: 1, row: 8, mlas: 4,  pop: "1.41M" },
    { id: "tirunelveli",      en: "Tirunelveli",       ta: "திருநெல்வேலி",         col: 2, row: 9, mlas: 6,  pop: "1.67M" },
    { id: "kanyakumari",      en: "Kanyakumari",       ta: "கன்னியாகுமரி",          col: 1, row: 9, mlas: 6,  pop: "1.87M" },
  ];

  // Sample 2024 Lok Sabha results — DMK alliance swept TN.
  const lokSabha2024 = {
    headline: { en: "DMK Alliance: 39 of 39", ta: "தி.மு.க. கூட்டணி: 39 / 39" },
    parties: [
      { name: "DMK",        seats: 22, color: "#C8472B", votePct: 26.93 },
      { name: "INC",        seats: 9,  color: "#1F6FB5", votePct: 10.67 },
      { name: "VCK",        seats: 2,  color: "#3F5B3A", votePct: 1.55  },
      { name: "CPI",        seats: 2,  color: "#A82323", votePct: 2.45  },
      { name: "CPI(M)",     seats: 2,  color: "#8B2F1F", votePct: 2.46  },
      { name: "IUML",       seats: 1,  color: "#0E7A4A", votePct: 1.12  },
      { name: "MDMK",       seats: 1,  color: "#B68C2C", votePct: 1.27  },
    ],
  };

  // A few high-profile constituencies (Lok Sabha 2024).
  const constituencies = [
    { name: "Chennai South",   winner: "Thamizhachi Thangapandian", party: "DMK", margin: "+2,03,729", ta: "சென்னை தெற்கு" },
    { name: "Coimbatore",      winner: "Ganapathy Rajkumar",        party: "DMK", margin: "+1,18,068", ta: "கோயம்புத்தூர்" },
    { name: "Madurai",         winner: "Su. Venkatesan",            party: "CPI(M)", margin: "+2,08,556", ta: "மதுரை" },
    { name: "Sivaganga",       winner: "Karti Chidambaram",         party: "INC", margin: "+3,93,499", ta: "சிவகங்கை" },
    { name: "Kanyakumari",     winner: "Vijay Vasanth",             party: "INC", margin: "+1,95,374", ta: "கன்னியாகுமரி" },
    { name: "Thoothukudi",     winner: "Kanimozhi Karunanidhi",     party: "DMK", margin: "+4,21,193", ta: "தூத்துக்குடி" },
  ];

  // Cabinet — Chief Minister + a sample of senior portfolios.
  const cabinet = [
    { post: "Chief Minister",        name: "M. K. Stalin",     constituency: "Kolathur",      ta: "மு. க. ஸ்டாலின்" },
    { post: "Deputy Chief Minister", name: "Udhayanidhi Stalin", constituency: "Chepauk-Thiruvallikeni", ta: "உதயநிதி ஸ்டாலின்" },
    { post: "Finance",               name: "Thangam Thennarasu", constituency: "Tiruchuli", ta: "தங்கம் தென்னரசு" },
    { post: "Public Works",          name: "E. V. Velu",       constituency: "Tiruvannamalai", ta: "ஈ. வெ. வேலு" },
    { post: "Health",                name: "Ma. Subramanian",  constituency: "Saidapet",       ta: "மா. சுப்பிரமணியன்" },
    { post: "Higher Education",      name: "Govi Chezhiaan",   constituency: "Tiruvarur",      ta: "கோவி. செழியன்" },
    { post: "School Education",      name: "Anbil Mahesh Poyyamozhi", constituency: "Tiruchirappalli West", ta: "அன்பில் மகேஷ் பொய்யாமொழி" },
    { post: "Industries",            name: "Dr. T. R. B. Rajaa", constituency: "Mannargudi", ta: "டாக்டர். டி. ஆர். பி. ராஜா" },
  ];

  // Government schemes (a representative sample).
  const schemes = [
    { code: "MUT",  en: "Kalaignar Magalir Urimai Thittam", ta: "கலைஞர் மகளிர் உரிமை திட்டம்", amount: "₹1,000 / month", beneficiaries: "1.15 Cr women", status: "active", updated: "2025-04-12" },
    { code: "PP",   en: "Pudhumai Penn Thittam",            ta: "புதுமை பெண் திட்டம்",        amount: "₹1,000 / month", beneficiaries: "Girl students, Std 6–12 govt schools", status: "active", updated: "2025-03-30" },
    { code: "NM",   en: "Naan Mudhalvan",                   ta: "நான் முதல்வன்",              amount: "Skill program", beneficiaries: "College & polytechnic students", status: "active", updated: "2025-05-02" },
    { code: "MM",   en: "CM's Breakfast Scheme",            ta: "முதல்வரின் காலை உணவுத் திட்டம்", amount: "Free breakfast", beneficiaries: "17.5 L students, Std 1–5", status: "active", updated: "2025-04-25" },
    { code: "EBK",  en: "Ennum Ezhuthum",                   ta: "எண்ணும் எழுத்தும்",          amount: "Foundational learning", beneficiaries: "Std 1–3 govt schools", status: "active", updated: "2025-02-18" },
    { code: "KCB",  en: "Kalaignar Cashless Insurance",     ta: "கலைஞர் காப்பீட்டு திட்டம்",  amount: "Up to ₹5 L cover", beneficiaries: "1.37 Cr families", status: "active", updated: "2025-04-05" },
  ];

  // Education counselling — TNEA / TANCA rounds (illustrative, current-cycle).
  const counselling = [
    { code: "TNEA",  en: "TN Engineering Admissions",   round: "Phase 2 Choice Filling", from: "2025-06-08", to: "2025-06-14", status: "upcoming" },
    { code: "TNEA",  en: "TN Engineering Admissions",   round: "Phase 1 Allotment",      from: "2025-05-28", to: "2025-05-30", status: "closed" },
    { code: "TANCA", en: "TN Common Admissions (PG)",   round: "Registration",           from: "2025-05-20", to: "2025-06-04", status: "active" },
    { code: "TNMCC", en: "TN Medical Counselling",      round: "MBBS Round 1",           from: "2025-07-12", to: "2025-07-18", status: "scheduled" },
  ];

  // Tech & community events (illustrative).
  const events = [
    { en: "ChennaiPy Monthly Meetup", ta: "சென்னைபை மாதாந்திர சந்திப்பு", city: "Chennai",     date: "2025-05-24", kind: "Meetup",    org: "ChennaiPy" },
    { en: "FOSS United Chennai",      ta: "ஃபாஸ் ஐக்கிய சென்னை",          city: "Chennai",     date: "2025-06-07", kind: "Conference",org: "FOSS United" },
    { en: "Madurai Devs Hack",        ta: "மதுரை டெவ்ஸ் ஹேக்",            city: "Madurai",     date: "2025-06-14", kind: "Hackathon", org: "Madurai.dev" },
    { en: "Coimbatore AI Summit",     ta: "கோவை செயற்கை அறிவாற்றல் மாநாடு", city: "Coimbatore", date: "2025-06-21", kind: "Summit",    org: "CBE.AI" },
    { en: "Trichy Open Hardware Day", ta: "திருச்சி திறந்த வன்பொருள் நாள்", city: "Tiruchirappalli", date: "2025-07-05", kind: "Workshop", org: "MakerTrichy" },
  ];

  // Cross-category ticker — what 'just changed' on the platform.
  // time field is an ISO 8601 UTC timestamp; rendered as relative ("X ago") at display time.
  const ticker = [
    { tag: "ELECTION",  en: "Cabinet expansion: 2 new MoS portfolios notified",          ta: "அமைச்சரவை விரிவாக்கம்: 2 புதிய துணை அமைச்சர் துறைகள்",           time: "2026-05-19T09:00:00Z" },
    { tag: "SCHEME",    en: "Magalir Urimai eligibility: income proof rule simplified",   ta: "மகளிர் உரிமை: வருமான ஆதார விதி எளிமைப்படுத்தப்பட்டது",           time: "2026-05-19T07:30:00Z" },
    { tag: "EDUCATION", en: "TNEA Phase 2 choice filling window opens June 8",            ta: "TNEA இரண்டாம் கட்டம் ஜூன் 8 முதல்",                               time: "2026-05-19T05:00:00Z" },
    { tag: "EVENT",     en: "FOSS United Chennai — registrations live",                   ta: "ஃபாஸ் ஐக்கிய சென்னை — பதிவுகள் தொடங்கின",                        time: "2026-05-19T03:00:00Z" },
    { tag: "ELECTION",  en: "Constituency #143 (Madurai East) — by-poll date notified",  ta: "தொகுதி #143 (மதுரை கிழக்கு) — இடைத்தேர்தல் அறிவிப்பு",           time: "2026-05-18T22:00:00Z" },
    { tag: "PIPELINE",  en: "TNEA scraper restored after 22-min outage",                  ta: "TNEA தரவு பைப்லைன் 22 நிமிட இடைவெளிக்குப் பின் இயங்குகிறது",    time: "2026-05-18T10:00:00Z" },
    { tag: "SCHEME",    en: "Pudhumai Penn — May disbursement complete (₹172 Cr)",        ta: "புதுமை பெண் — மே மாத கொடுப்பனவு முடிந்தது (₹172 கோடி)",         time: "2026-05-18T08:00:00Z" },
  ];

  // Pipeline fallback — used only when the live pipeline-data branch is unreachable.
  const pipelines = [
    { name: "Election results",  source: "ECI",                status: "ok",   latencyMs: 0, checkedAt: "" },
    { name: "TNEA counselling",  source: "tneaonline.org",    status: "ok",   latencyMs: 0, checkedAt: "" },
    { name: "TANCA",             source: "tanca.annauniv.edu", status: "ok",   latencyMs: 0, checkedAt: "" },
    { name: "Schemes registry",  source: "tn.gov.in",         status: "warn", latencyMs: 0, checkedAt: "" },
    { name: "Cabinet notify.",   source: "Govt. Gazette",     status: "ok",   latencyMs: 0, checkedAt: "" },
    { name: "Events feed",       source: "FOSS United",       status: "ok",   latencyMs: 0, checkedAt: "" },
  ];

  // Headline platform stats — only values we can verify from the data or official sources.
  // stars and contributors are fetched live from GitHub; colleges/apiCalls pending data collection.
  const stats = {
    districts: 38,
    constituencies: 234,
    mlas: 234,
    schemes: 6,
    events: 16,
  };

  return { districts, lokSabha2024, constituencies, cabinet, schemes, counselling, events, ticker, pipelines, stats };
})();
