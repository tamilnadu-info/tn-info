export interface EventBody {
  what: string[];
  expect: string[];
  speakers: string[];
  links: { label: string; url: string }[];
}

export const EVENT_BODIES: Record<string, EventBody> = {
  "cod-2026": {
    what: [
      "Open Data Day is a global event celebrating open data — TN-Info hosts the Chennai chapter at MOP Vaishnav College. The day is structured around two halves: lightning talks in the morning, open desks for OS contributors in the afternoon.",
      "We focus specifically on Tamil Nadu civic datasets — electoral, budgetary, environmental and welfare. The format is hands-on; bring a laptop.",
    ],
    expect: ["10 lightning talks · 8 mins each", "Open desks with maintainers of TN civic data projects", "A dedicated table for first-time open-source contributors", "Free lunch · powered by DataMeet Chennai"],
    speakers: ["Sruthi Krishnan · DataMeet Chennai", "Thejesh GN · Datameet", "TN-Info data team"],
    links: [{ label: "Open Data Day · global", url: "https://opendataday.org/" }, { label: "DataMeet Chennai", url: "https://datameet.org/" }],
  },
  "tamil-wiki": {
    what: [
      "Tamil Wikipedia's coverage of TN district-level content is thin — many districts have only stub articles, and crucial demographic + administrative facts are out of date.",
      "This edit-a-thon focuses on resolving 200+ stub articles, using TN-Info's structured district data as a reference base. Contributions count toward the Wikimedia Foundation's annual editor count.",
    ],
    expect: ["Orientation session at 10:00 IST", "Live Jitsi room + YouTube stream", "Mentor editors available for first-timers", "Recognition badges for top 10 editors"],
    speakers: ["Tamil Wikimedians chapter coordinators"],
    links: [{ label: "Tamil Wikipedia", url: "https://ta.wikipedia.org/" }],
  },
  "icdsaai-2026": {
    what: [
      "The 2nd International Conference on Data Science, Agents & Artificial Intelligence is hosted by Chennai Institute of Technology, in association with the IEEE Madras Chapter. Two tracks run in parallel: industry applications and academic research.",
      "All accepted papers go to the IEEE / Springer indexed proceedings. Early registration discounts are available for academic submissions until 15 June.",
    ],
    expect: ["2-day program · keynotes + parallel tracks", "~60 paper presentations", "Industry panel on agents in production", "Networking dinner on day 1"],
    speakers: ["Industry + academia panel (full list on conference site)"],
    links: [{ label: "CIT Chennai", url: "https://citchennai.edu.in/" }],
  },
  "civic-hack": {
    what: [
      "TN-Info, in partnership with IIT Madras Research Park's incubation cell, hosts a 24-hour hackathon focused on building tools on top of the TN-Info government schemes API.",
      "Themes: scheme-eligibility chatbots, application trackers, fraud-detection dashboards, multilingual interfaces. Total prize pool ₹1.5 lakh; 200 participant seats — apply by 30 June.",
    ],
    expect: ["24-hour sprint · starts 09:00 on day 1", "API mentors from TN-Info on-site", "Compute credits sponsored by AWS / Azure", "Demos + judging on day 2 evening"],
    speakers: ["TN-Info engineering team", "IIT Madras incubation mentors"],
    links: [{ label: "IIT Madras RP", url: "https://respark.iitm.ac.in/" }],
  },
  "icaccs-2026": {
    what: [
      "11th edition of the International Conference on Advanced Computing & Communication Systems, hosted at Sri Eshwar College of Engineering, Coimbatore. Tracks span AI/ML, sustainable smart cities, quantum, and cybersecurity.",
      "Registration is closed for paper authors; participant-only registration remains open until 10 July.",
    ],
    expect: ["2 days · 4 parallel tracks", "Keynotes from IISc and academia", "Best-paper awards per track", "Industry exhibition on day 1"],
    speakers: ["Conference committee · Sri Eshwar College"],
    links: [{ label: "Sri Eshwar College", url: "https://sece.ac.in/" }],
  },
  "madurai-pycon": {
    what: ["Single-track, Tamil-language Python conference held annually at Madurai Kamaraj University. Talks are in Tamil; slides may be bilingual. Focus on language pedagogy, Tamil NLP, and beginner-friendly tooling."],
    expect: ["~12 talks · 30 mins each", "Lightning talks at the end of day", "Beginner Python clinic in the lobby", "Free for students on production of ID"],
    speakers: ["PySangamam community speakers"],
    links: [{ label: "PySangamam", url: "https://pysangamam.org/" }],
  },
  "civic-salon": {
    what: ["Civic Tech Salon is a quarterly hybrid gathering — short talks (10 min each) on topics like government procurement transparency, RTI tooling, and operating civic dashboards over multi-year horizons.", "Walk-ins welcome; online participation via the streamed Jitsi link. No registration required."],
    expect: ["4–5 short talks", "Open Q+A · 30 mins", "Afterwork at the nearby cafe"],
    speakers: ["Civic Tech India · TN chapter"],
    links: [{ label: "Civic Tech India", url: "https://civictech.in/" }],
  },
  "chennaipy-jun": {
    what: ["ChennaiPy's recurring monthly meetup. June's topic block centres on async + typing: FastAPI in production, polars for data work, and a hands-on type-hint refactor session.", "Hosted at ThoughtWorks Tidel Park. 80 seat capacity, first-come first-served. Bring a laptop for the hands-on portion."],
    expect: ["3 talks · 25 mins each", "Hands-on session at the end", "Pizza + community time"],
    speakers: ["Speakers TBA · see ChennaiPy meetup page"],
    links: [{ label: "ChennaiPy", url: "https://chennaipy.org/" }],
  },
  "assembly-mon": {
    what: ["The Tamil Nadu Legislative Assembly's monsoon session begins on 9 June with the customary Governor's address. The legislative business calendar is published the previous evening on assembly.tn.gov.in.", "Live broadcast is available on Kalaignar Arasiyal Seithigal (Tamil) and on the Assembly's YouTube channel."],
    expect: ["Session starts 10:00 IST · 9 June", "Governor's address day 1", "Working calendar typically 12–14 sitting days", "Live broadcast · public access"],
    speakers: [],
    links: [{ label: "assembly.tn.gov.in", url: "https://www.assembly.tn.gov.in/" }],
  },
  "bypoll-jun": {
    what: ["Nomination filing closes for the local-body by-poll on 4 June at the respective returning officer offices. Four wards are in scope: Chennai Ward 142, Karur Municipality W-19, a Sivagangai panchayat ward, and Theni W-7."],
    expect: ["Filing deadline · 11:00–15:00 IST", "Returning officer office per ward", "Affidavit + nomination fee required", "Final candidate list published next day"],
    speakers: [],
    links: [{ label: "TN State Election Commission", url: "https://tnsec.tn.nic.in/" }],
  },
  "budget-fy26-supp": {
    what: ["The Finance Minister presents the Supplementary Budget statement for FY26 at 11:00 IST in the Legislative Assembly. The full PDF and demand-for-grants annex are released on the Finance Department portal immediately after the presentation."],
    expect: ["Statement at 11:00 IST", "PDF + annex on Finance portal", "Live broadcast via Assembly channel"],
    speakers: [],
    links: [{ label: "Finance Dept · TN", url: "https://fin.tn.gov.in/" }],
  },
  "dmk-gc": {
    what: ["The DMK General Council meeting is scheduled at Anna Arivalayam Annexe, Tiruchirappalli, per the party notification dated 14 May. The agenda has not been published. Coverage is restricted to accredited press; members only."],
    expect: ["Members + accredited press only", "Agenda not public", "Tentative duration: full day"],
    speakers: [],
    links: [{ label: "DMK official", url: "#" }],
  },
  "aiadmk-fd": {
    what: ["AIADMK's annual foundation-day rally at Tamukkam Grounds, Madurai. The event is open to the public. Permit issuance is pending with the Madurai City Police as of 17 May; updates will be reflected on this page."],
    expect: ["Public access · open ground", "Tentative start 16:00 IST", "Permit pending · check the day before"],
    speakers: [],
    links: [{ label: "AIADMK official", url: "#" }],
  },
  "eci-tn-review": {
    what: ["A routine pre-roll-revision review meeting between the Election Commission of India and Tamil Nadu's district election officers. Held at the Chief Electoral Officer's office, Chennai. Closed to the public."],
    expect: ["Officials only", "Pre-revision SOP review", "Press briefing expected on conclusion"],
    speakers: [],
    links: [{ label: "CEO Tamil Nadu", url: "https://elections.tn.gov.in/" }],
  },
  "tnerc-hearing": {
    what: ["TNERC public hearing on the FY27 tariff revision (Petition No. 04/2026). Held at TNERC Hall, Anna Salai, Chennai. Open to registered participants; submissions accepted till 30 May at tnerc.gov.in."],
    expect: ["Registration counter opens 09:30 IST", "Speaking slots allotted by registration order", "Streamed on TNERC YouTube"],
    speakers: [],
    links: [{ label: "tnerc.gov.in", url: "https://www.tnerc.gov.in/" }],
  },
};
