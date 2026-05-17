import { TN_DATA } from "./tn-data";

export interface Slide {
  caption: string;
  ta: string;
  mood: "sunrise" | "gopuram" | "heritage" | "urban";
}

export interface NewsItem {
  tag: string;
  en: string;
  time: string;
}

export interface DistrictDetail {
  introEn: string;
  introTa: string;
  slides: Slide[];
  constituencies: string[];
  colleges: string[];
  news: NewsItem[];
  isFallback?: boolean;
}

const detail: Record<string, DistrictDetail> = {
  chennai: {
    introEn: "Tamil Nadu's capital and largest metro — port city, IT corridor anchor, and the cultural pulse of the south.",
    introTa: "தமிழ்நாட்டின் தலைநகர் — துறைமுக நகரம், ஐ.டி. மையம், கலாச்சார தலம்.",
    slides: [
      { caption: "Marina Beach",          ta: "மரினா கடற்கரை",    mood: "sunrise"  },
      { caption: "Kapaleeshwarar Temple",  ta: "கபாலீச்சரர்",       mood: "gopuram"  },
      { caption: "T. Nagar Bazaar",        ta: "டி. நகர் சந்தை",   mood: "urban"    },
      { caption: "Chennai Central",        ta: "சென்னை சென்ட்ரல்", mood: "heritage" },
    ],
    constituencies: [
      "Dr. Radhakrishnan Nagar","Perambur","Kolathur","Villivakkam",
      "Thiru-Vi-Ka-Nagar","Egmore","Royapuram","Harbour",
      "Chepauk-Thiruvallikeni","Thousand Lights","Anna Nagar","Virugambakkam",
      "Saidapet","T. Nagar","Mylapore","Velachery",
    ],
    colleges: [
      "IIT Madras","Anna University","Madras Christian College",
      "Loyola College","Stella Maris","Presidency College",
      "Madras Medical College","MOP Vaishnav","SRM Easwari",
      "Hindustan University","Sathyabama","SSN College of Engineering",
    ],
    news: [
      { tag: "ELECTION",  en: "Cabinet expansion: 2 new MoS portfolios notified",       time: "12 min ago" },
      { tag: "EVENT",     en: "FOSS United Chennai — registrations live",                time: "5 hr ago"   },
      { tag: "SCHEME",    en: "Magalir Urimai disbursement: ₹47 Cr in Chennai",          time: "1 day ago"  },
      { tag: "EDUCATION", en: "IIT-M opens summer fellowship applications",              time: "2 days ago" },
    ],
  },

  madurai: {
    introEn: "Temple city of the south — 2,500 years old, home to Meenakshi Amman Temple and the storied Vaigai river.",
    introTa: "கோயில் நகரம் — 2,500 ஆண்டுகள் வரலாறு, மீனாட்சி கோயில், வைகை ஆற்றின் கரையில்.",
    slides: [
      { caption: "Meenakshi Amman Temple",    ta: "மீனாட்சி அம்மன்",   mood: "gopuram"  },
      { caption: "Vaigai River",              ta: "வைகை ஆறு",           mood: "sunrise"  },
      { caption: "Thirumalai Nayakkar Mahal", ta: "திருமலை நாயக்கர்",   mood: "heritage" },
      { caption: "Madurai Pudhumandapam",     ta: "புதுமண்டபம்",         mood: "urban"    },
    ],
    constituencies: [
      "Melur","Madurai East","Sholavandan","Madurai North",
      "Madurai South","Madurai Central","Madurai West","Thirupparankundram",
      "Thiruamangalam","Usilampatti",
    ],
    colleges: [
      "Madurai Kamaraj University","American College","Thiagarajar College",
      "Thiagarajar College of Engineering","Lady Doak College",
      "Madurai Medical College","Fatima College","SBOA",
    ],
    news: [
      { tag: "ELECTION",  en: "Madurai Lok Sabha MP Su. Venkatesan inaugurates new library", time: "3 hr ago"   },
      { tag: "EDUCATION", en: "Madurai Kamaraj University releases UG counselling schedule", time: "1 day ago"  },
      { tag: "EVENT",     en: "Madurai Devs Hack — registrations open (Jun 14)",             time: "2 days ago" },
    ],
  },

  coimbatore: {
    introEn: "Manchester of the South — textile capital, engineering hub, and India's pump-set manufacturing heartland.",
    introTa: "தென் இந்திய மான்செஸ்டர் — ஜவுளி தலைநகர், பொறியியல் மையம்.",
    slides: [
      { caption: "Marudhamalai Temple",  ta: "மருதமலை",        mood: "gopuram"  },
      { caption: "Race Course",          ta: "ரேஸ் கோர்ஸ்",    mood: "urban"    },
      { caption: "Siruvani Hills",       ta: "சிறுவாணி",        mood: "sunrise"  },
      { caption: "Coimbatore Junction",  ta: "கோவை சந்திப்பு", mood: "heritage" },
    ],
    constituencies: [
      "Mettupalayam","Sulur","Kavundampalayam","Coimbatore North",
      "Thondamuthur","Coimbatore South","Singanallur","Kinathukadavu",
      "Pollachi","Valparai",
    ],
    colleges: [
      "PSG College of Technology","Coimbatore Institute of Technology","Amrita Vishwa Vidyapeetham",
      "Government Arts College","GCT Coimbatore","PSGR Krishnammal",
      "Kumaraguru College of Technology","Avinashilingam University",
    ],
    news: [
      { tag: "ELECTION", en: "Coimbatore South MLA reviews ward-level Magalir Urimai rollout", time: "6 hr ago"   },
      { tag: "EVENT",    en: "Coimbatore AI Summit — 21 Jun, Codissia Trade Fair Complex",      time: "1 day ago"  },
      { tag: "SCHEME",   en: "Pump-set energy subsidy revised for Pollachi farmers",            time: "3 days ago" },
    ],
  },

  trichy: {
    introEn: "Junction city on the Kaveri — Rockfort, ancient Chola heart, and central TN's industrial node.",
    introTa: "காவிரிக் கரை சந்திப்பு நகரம் — ராக் ஃபோர்ட், சோழ வரலாறு.",
    slides: [
      { caption: "Rockfort Temple",       ta: "ராக் ஃபோர்ட்",       mood: "heritage" },
      { caption: "Srirangam",             ta: "ஸ்ரீரங்கம்",           mood: "gopuram"  },
      { caption: "Kaveri River",          ta: "காவிரி ஆறு",           mood: "sunrise"  },
      { caption: "NIT Trichy Campus",     ta: "என்.ஐ.டி. திருச்சி", mood: "urban"    },
    ],
    constituencies: [
      "Manapparai","Srirangam","Tiruchirappalli West","Tiruchirappalli East",
      "Thiruverumbur","Lalgudi","Manachanallur","Musiri","Thottiyam",
    ],
    colleges: [
      "NIT Trichy","Bishop Heber College","SASTRA University",
      "Jamal Mohamed College","Holy Cross","Government Medical College",
      "Anna University Regional Campus",
    ],
    news: [
      { tag: "EDUCATION", en: "NIT Trichy releases JEE Advanced cutoff for 2025",  time: "4 hr ago"   },
      { tag: "EVENT",     en: "Trichy Open Hardware Day — 5 July",                  time: "2 days ago" },
      { tag: "SCHEME",    en: "Kaveri delta rice procurement price revised",        time: "4 days ago" },
    ],
  },

  tirunelveli: {
    introEn: "Southernmost grain bowl — halwa-famous, paddy-rich, gateway to Western Ghats and the Pothigai hills.",
    introTa: "தென் தமிழ்நாட்டின் தானிய களம் — அல்வா, நெல்மணி, பொதிகை மலை.",
    slides: [
      { caption: "Nellaiappar Temple",  ta: "நெல்லையப்பர்",  mood: "gopuram"  },
      { caption: "Courtallam Falls",    ta: "குற்றாலம்",       mood: "sunrise"  },
      { caption: "Tamirabarani River",  ta: "தாமிரபரணி",       mood: "heritage" },
      { caption: "Iruttu Kadai Halwa",  ta: "இருட்டுக் கடை",   mood: "urban"    },
    ],
    constituencies: [
      "Tirunelveli","Ambasamudram","Palayamkottai","Nanguneri",
      "Radhapuram","Alangulam",
    ],
    colleges: [
      "Manonmaniam Sundaranar University","St. Xavier's College","Sarah Tucker",
      "Tirunelveli Medical College","Government Engineering College","M.D.T. Hindu College",
    ],
    news: [
      { tag: "SCHEME",    en: "Tamirabarani drinking-water grant: ₹220 Cr cleared", time: "1 day ago"  },
      { tag: "EDUCATION", en: "MSU announces 4-year UG programme rollout",          time: "3 days ago" },
    ],
  },

  salem: {
    introEn: "Steel city in the Yercaud foothills — mango orchards, granite belt, and a junction of three highways.",
    introTa: "எர்காட்டின் அடிவாரத்தில் எஃகு நகரம் — மா தோட்டங்கள், கருங்கல் மண்டலம்.",
    slides: [
      { caption: "Yercaud Hills",      ta: "ஏற்காடு",             mood: "sunrise"  },
      { caption: "Salem Steel Plant",  ta: "எஃகு ஆலை",            mood: "urban"    },
      { caption: "Kottai Mariamman",   ta: "கோட்டை மாரியம்மன்",   mood: "gopuram"  },
      { caption: "Mango Orchards",     ta: "மா தோட்டம்",           mood: "heritage" },
    ],
    constituencies: [
      "Edappadi","Sankari","Salem West","Salem North","Salem South",
      "Veerapandi","Yercaud","Omalur","Mettur","Vazhapadi","Gangavalli",
    ],
    colleges: [
      "Government Mohan Kumaramangalam Medical College","Periyar University",
      "Government Arts College","Vinayaka Mission Engineering",
      "Sona College of Technology","AVS Engineering",
    ],
    news: [
      { tag: "EVENT", en: "Yercaud Summer Festival — May 24-26", time: "8 hr ago" },
    ],
  },

  thanjavur: {
    introEn: "Rice bowl of TN — Brihadeeswarar temple, Carnatic music, Tanjore painting, paddy beyond the horizon.",
    introTa: "தமிழ்நாட்டின் நெல் களம் — பெருவுடையார் கோயில், கர்நாடக சங்கீதம், தஞ்சை ஓவியம்.",
    slides: [
      { caption: "Brihadeeswarar Temple",  ta: "பெருவுடையார்",  mood: "gopuram"  },
      { caption: "Cauvery Delta",          ta: "காவிரி டெல்டா",  mood: "sunrise"  },
      { caption: "Saraswathi Mahal",       ta: "சரசுவதி மகால்", mood: "heritage" },
      { caption: "Tanjore Painting",       ta: "தஞ்சை ஓவியம்",  mood: "urban"    },
    ],
    constituencies: [
      "Thiruvidaimarudur","Kumbakonam","Papanasam","Thiruvaiyaru",
      "Thanjavur","Orathanadu","Pattukkottai","Peravurani",
    ],
    colleges: [
      "TN Agricultural University (Thanjavur)","SASTRA","Government Medical College",
      "Periyar EVR College","Bharathidasan University Constituent College",
    ],
    news: [
      { tag: "SCHEME", en: "Kuruvai paddy MSP: ₹2,275/quintal notified", time: "2 days ago" },
    ],
  },

  kanyakumari: {
    introEn: "Land's end of India — three seas, Vivekananda Rock, rubber and clove plantations of the Western Ghats.",
    introTa: "இந்தியாவின் தெற்கு முனை — மூன்று கடல்கள், விவேகானந்தர் பாறை.",
    slides: [
      { caption: "Vivekananda Rock",     ta: "விவேகானந்தர் பாறை", mood: "sunrise"  },
      { caption: "Thiruvalluvar Statue", ta: "திருவள்ளுவர்",         mood: "heritage" },
      { caption: "Sunset Point",         ta: "சூரிய அஸ்தமன மேடை", mood: "gopuram"  },
      { caption: "Padmanabhapuram",      ta: "பத்மநாபபுரம்",         mood: "urban"    },
    ],
    constituencies: [
      "Killiyoor","Kanniyakumari","Nagercoil","Colachel","Padmanabhapuram","Vilavancode",
    ],
    colleges: [
      "Scott Christian College","Nesamony Memorial Christian","S.T. Hindu College",
      "Government Medical College, Asaripallam",
    ],
    news: [
      { tag: "EVENT", en: "Coastal cleanup drive — Kanyakumari beach (Sat)", time: "1 day ago" },
    ],
  },
};

const FALLBACK_COLLEGE_SEEDS = [
  "Government Arts College",
  "Government Engineering College",
  "Government Polytechnic",
  "District Co-operative College",
  "Anjuman College",
  "Christian College",
  "St. Joseph's College",
  "Periyar Memorial College",
];

export function defaultFor(slug: string): DistrictDetail {
  const d = TN_DATA.districts.find((x) => x.id === slug);
  const en = d?.en || slug;
  const ta = d?.ta || "";
  const mlas = d?.mlas || 0;
  const pop = d?.pop || "—";
  return {
    introEn: `${en} — ${pop} residents across ${mlas} assembly constituencies. Detailed drill-page is in progress.`,
    introTa: `${en} — ${pop} மக்கள், ${mlas} சட்டமன்ற தொகுதிகள். விரிவான பக்கம் வரவிருக்கிறது.`,
    slides: [
      { caption: `${en} Town Centre`, ta: `${ta} நகரம்`,  mood: "urban"    },
      { caption: `${en} Heritage`,    ta: `${ta} மரபு`,    mood: "heritage" },
      { caption: `${en} Outskirts`,   ta: `${ta} புறநகர்`, mood: "sunrise"  },
    ],
    constituencies: Array.from({ length: Math.min(mlas, 12) }, (_, i) => `${en} Constituency #${i + 1}`),
    colleges: FALLBACK_COLLEGE_SEEDS.slice(0, 6).map((s) => `${s}, ${en}`),
    news: [
      { tag: "INFO", en: `Drill-page for ${en} coming soon — file an issue on GitHub to vote it up.`, time: "soon" },
    ],
    isFallback: true,
  };
}

export const DISTRICT_DETAIL = { detail, defaultFor };
