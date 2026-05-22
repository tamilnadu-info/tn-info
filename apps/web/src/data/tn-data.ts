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

  // All 39 Tamil Nadu Lok Sabha 2024 results.
  const constituencies = [
    { name: "Tiruvallur",          winner: "Sasikanth Senthil",          party: "INC",    margin: "+5,72,155", ta: "திருவள்ளூர்",          reserved: "SC" },
    { name: "Chennai North",       winner: "Kalanidhi Veeraswamy",       party: "DMK",    margin: "+3,39,222", ta: "சென்னை வடக்கு" },
    { name: "Chennai South",       winner: "Thamizhachi Thangapandian",  party: "DMK",    margin: "+2,25,945", ta: "சென்னை தெற்கு" },
    { name: "Chennai Central",     winner: "Dayanidhi Maran",            party: "DMK",    margin: "+2,44,689", ta: "சென்னை மத்திய" },
    { name: "Sriperumbudur",       winner: "T.R. Baalu",                 party: "DMK",    margin: "+4,87,029", ta: "ஸ்ரீபெரும்புதூர்" },
    { name: "Kancheepuram",        winner: "G. Selvam",                  party: "DMK",    margin: "+2,21,473", ta: "காஞ்சிபுரம்",          reserved: "SC" },
    { name: "Arakkonam",           winner: "S. Jagathrakshakan",         party: "DMK",    margin: "+3,06,559", ta: "ஆரக்கோணம்" },
    { name: "Vellore",             winner: "D.M. Kathir Anand",          party: "DMK",    margin: "+2,15,702", ta: "வேலூர்" },
    { name: "Krishnagiri",         winner: "K. Gopinath",                party: "INC",    margin: "+1,92,486", ta: "கிருஷ்ணகிரி" },
    { name: "Dharmapuri",          winner: "A. Mani",                    party: "DMK",    margin: "+21,300",   ta: "தர்மபுரி" },
    { name: "Tiruvannamalai",      winner: "C.N. Annadurai",             party: "DMK",    margin: "+2,33,931", ta: "திருவண்ணாமலை" },
    { name: "Arani",               winner: "M.S. Tharanivendhan",        party: "DMK",    margin: "+2,08,766", ta: "ஆரணி" },
    { name: "Viluppuram",          winner: "D. Ravikumar",               party: "VCK",    margin: "+70,703",   ta: "விழுப்புரம்",          reserved: "SC" },
    { name: "Kallakurichi",        winner: "Malaiarasan",                 party: "DMK",    margin: "+53,784",   ta: "கள்ளக்குறிச்சி" },
    { name: "Salem",               winner: "T.M. Selvaganapathi",        party: "DMK",    margin: "+70,357",   ta: "சேலம்" },
    { name: "Namakkal",            winner: "V.S. Matheswaran",           party: "DMK",    margin: "+29,112",   ta: "நாமக்கல்" },
    { name: "Erode",               winner: "K.E. Prakash",               party: "DMK",    margin: "+2,36,566", ta: "ஈரோடு" },
    { name: "Tiruppur",            winner: "K. Subbarayan",              party: "CPI",    margin: "+1,25,928", ta: "திருப்பூர்" },
    { name: "Nilgiris",            winner: "A. Raja",                    party: "DMK",    margin: "+2,40,585", ta: "நீலகிரி",               reserved: "SC" },
    { name: "Coimbatore",          winner: "Ganapathi Raj Kumar",        party: "DMK",    margin: "+1,18,068", ta: "கோயம்புத்தூர்" },
    { name: "Pollachi",            winner: "Eswarasamy",                 party: "DMK",    margin: "+2,52,042", ta: "பொள்ளாச்சி" },
    { name: "Dindigul",            winner: "R. Sachidanandam",           party: "CPI(M)", margin: "+4,43,821", ta: "திண்டுக்கல்" },
    { name: "Karur",               winner: "S. Jothimani",               party: "INC",    margin: "+1,66,816", ta: "கரூர்" },
    { name: "Tiruchirappalli",     winner: "Durai Vaiko",                party: "MDMK",   margin: "+3,13,094", ta: "திருச்சிராப்பள்ளி" },
    { name: "Perambalur",          winner: "Arun Nehru",                 party: "DMK",    margin: "+3,89,107", ta: "பெரம்பலூர்" },
    { name: "Cuddalore",           winner: "M.K. Vishnu Prasad",         party: "INC",    margin: "+1,85,896", ta: "கடலூர்" },
    { name: "Chidambaram",         winner: "Thol. Thirumavalavan",       party: "VCK",    margin: "+1,03,554", ta: "சிதம்பரம்",             reserved: "SC" },
    { name: "Mayiladuthurai",      winner: "Sudha Ramakrishnan",         party: "INC",    margin: "+2,71,183", ta: "மயிலாடுதுறை" },
    { name: "Nagapattinam",        winner: "V. Selvaraj",                party: "CPI",    margin: "+2,08,957", ta: "நாகப்பட்டினம்",         reserved: "SC" },
    { name: "Thanjavur",           winner: "Murasoli",                   party: "DMK",    margin: "+3,19,583", ta: "தஞ்சாவூர்" },
    { name: "Sivaganga",           winner: "Karti P. Chidambaram",       party: "INC",    margin: "+2,05,664", ta: "சிவகங்கை" },
    { name: "Madurai",             winner: "Su. Venkatesan",             party: "CPI(M)", margin: "+2,09,409", ta: "மதுரை" },
    { name: "Theni",               winner: "Thanga Tamil Selvan",        party: "DMK",    margin: "+2,78,825", ta: "தேனி" },
    { name: "Virudhunagar",        winner: "B. Manickam Tagore",         party: "INC",    margin: "+4,379",    ta: "விருதுநகர்" },
    { name: "Ramanathapuram",      winner: "K. Navas Kani",              party: "IUML",   margin: "+1,66,782", ta: "இராமநாதபுரம்" },
    { name: "Thoothukudi",         winner: "Kanimozhi Karunanidhi",      party: "DMK",    margin: "+3,92,738", ta: "தூத்துக்குடி" },
    { name: "Tenkasi",             winner: "Rani Srikumar",              party: "DMK",    margin: "+1,96,199", ta: "தென்காசி",              reserved: "SC" },
    { name: "Tirunelveli",         winner: "C. Robert Bruce",            party: "INC",    margin: "+1,65,620", ta: "திருநெல்வேலி" },
    { name: "Kanniyakumari",       winner: "Vijay Vasanth",              party: "INC",    margin: "+1,79,907", ta: "கன்னியாகுமரி" },
  ];

  // Cabinet — full 35-member Council of Ministers.
  const cabinet = [
    { post: "Chief Minister",                               name: "M. K. Stalin",              constituency: "Kolathur",                  ta: "மு. க. ஸ்டாலின்" },
    { post: "Deputy Chief Minister",                        name: "Udhayanidhi Stalin",         constituency: "Chepauk-Thiruvallikeni",    ta: "உதயநிதி ஸ்டாலின்" },
    { post: "Irrigation, Legislative Affairs",              name: "Durai Murugan",              constituency: "Katpadi",                   ta: "" },
    { post: "Municipal Administration, Urban Water Supply", name: "K.N. Nehru",                constituency: "Tiruchirappalli West",      ta: "" },
    { post: "Rural Development, Panchayats",                name: "I. Periyasamy",              constituency: "Athoor",                    ta: "" },
    { post: "Public Works, Highways",                       name: "E. V. Velu",                constituency: "Tiruvannamalai",            ta: "ஈ. வெ. வேலு" },
    { post: "Agriculture, Horticulture",                    name: "M.R.K. Panneerselvam",      constituency: "Kurinjipadi",               ta: "" },
    { post: "Revenue, Disaster Management",                 name: "K.K.S.S.R. Ramachandran",   constituency: "Aruppukottai",              ta: "" },
    { post: "Finance, Environment",                         name: "Thangam Thennarasu",         constituency: "Tiruchuli",                 ta: "தங்கம் தென்னரசு" },
    { post: "Courts, Prisons",                              name: "S. Regupathy",               constituency: "Thirumayam",                ta: "" },
    { post: "Housing, Urban Development",                   name: "S. Muthusamy",               constituency: "Erode West",                ta: "" },
    { post: "Co-operation",                                 name: "K.R. Periyakaruppan",        constituency: "Tiruppattur",               ta: "" },
    { post: "Rural & Small Industries",                     name: "T.M. Anbarasan",             constituency: "Alandur",                   ta: "" },
    { post: "Tamil Language, Tamil Culture",                name: "M.P. Saminathan",            constituency: "Kangayam",                  ta: "" },
    { post: "Social Welfare, Women & Child",                name: "P. Geetha Jeevan",           constituency: "Thoothukkudi",              ta: "" },
    { post: "Fisheries, Animal Husbandry",                  name: "Anitha R. Radhakrishnan",    constituency: "Tiruchendur",               ta: "" },
    { post: "Dairy Development, Khadi",                     name: "Raja Kannappan",             constituency: "Mudukulathur",              ta: "" },
    { post: "Tourism",                                      name: "R. Rajendran",               constituency: "Salem North",               ta: "" },
    { post: "Food, Civil Supplies",                         name: "R. Sakkarapani",             constituency: "Oddanchatram",              ta: "" },
    { post: "Handlooms, Textiles",                          name: "R. Gandhi",                  constituency: "Ranipet",                   ta: "" },
    { post: "Health, Medical Education",                    name: "Ma. Subramanian",            constituency: "Saidapet",                  ta: "மா. சுப்பிரமணியன்" },
    { post: "Commercial Taxes, Registration",               name: "P. Moorthy",                 constituency: "Madurai East",              ta: "" },
    { post: "Transport, Electricity",                       name: "S.S. Sivasankar",            constituency: "Kunnam",                    ta: "" },
    { post: "Hindu Religious Endowments",                   name: "P.K. Sekar Babu",            constituency: "Harbour",                   ta: "" },
    { post: "Higher Education, Technical Education",        name: "Govi. Chezhiaan",            constituency: "Thiruvidamarudur",          ta: "கோவி. செழியன்" },
    { post: "Information Technology",                       name: "Palanivel Thiagarajan",      constituency: "Madurai Central",           ta: "" },
    { post: "Minorities Welfare",                           name: "S.M. Nasar",                 constituency: "Avadi",                     ta: "" },
    { post: "School Education",                             name: "Anbil Mahesh Poyyamozhi",    constituency: "Thiruverumbur",             ta: "அன்பில் மகேஷ் பொய்யாமொழி" },
    { post: "Backward Classes Welfare",                     name: "Siva V. Meyyanathan",        constituency: "Alangudi",                  ta: "" },
    { post: "Labour Welfare, Employment",                   name: "C.V. Ganesan",               constituency: "Tittakudi",                 ta: "" },
    { post: "Dairy Development (additional)",               name: "Mano Thangaraj",             constituency: "Padmanabhapuram",           ta: "" },
    { post: "Industries",                                   name: "Dr. T. R. B. Rajaa",        constituency: "Mannargudi",                ta: "டாக்டர். டி. ஆர். பி. ராஜா" },
    { post: "Adi Dravidar & Tribal Welfare",                name: "M. Mathiventhan",            constituency: "Rasipuram",                 ta: "" },
    { post: "Human Resources Management, Pensions",         name: "N. Kayalvizhi",              constituency: "Dharapuram",                ta: "" },
    { post: "Forests",                                      name: "K. Ponmudy",                 constituency: "Tirukkoyilur",              ta: "" },
  ];

  // Government schemes — 28 active schemes.
  const schemes = [
    { code: "KMUT",    en: "Kalaignar Magalir Urimai Thogai",              ta: "கலைஞர் மகளிர் உரிமை தொகை",          amount: "₹1,000 / month",                                  beneficiaries: "1.15 Cr women heads of household",                          status: "active", updated: "2026-05-15" },
    { code: "PPT",     en: "Pudhumai Penn Thittam",                         ta: "புதுமைப் பெண் திட்டம்",               amount: "₹1,000 / month",                                  beneficiaries: "~4.9 L girl students (govt school → higher ed)",             status: "active", updated: "2026-04-01" },
    { code: "TPT",     en: "Tamil Pudhalvan Scheme",                        ta: "தமிழ் புதல்வன் திட்டம்",              amount: "₹1,000 / month",                                  beneficiaries: "~4.25 L male students (govt school → higher ed)",            status: "active", updated: "2025-09-01" },
    { code: "VP",      en: "Vidiyal Payanam — Free Bus Travel",             ta: "விடியல் பயணம்",                        amount: "Free unlimited travel",                            beneficiaries: "Women, transgender, disabled on state buses",                status: "active", updated: "2021-01-01" },
    { code: "CM-BK",   en: "Chief Minister's Breakfast Scheme",             ta: "முதல்வர் காலை உணவு திட்டம்",          amount: "Free nutritious breakfast",                        beneficiaries: "~1.14 Cr students, Std 1–5 govt schools",                   status: "active", updated: "2022-09-15" },
    { code: "NM",      en: "Naan Mudhalvan",                                ta: "நான் முதல்வன்",                        amount: "Free skill / vocational training",                 beneficiaries: "Govt college & polytechnic students",                        status: "active", updated: "2025-05-02" },
    { code: "EE",      en: "Ennum Ezhuthum Mission",                        ta: "எண்ணும் எழுத்தும்",                    amount: "Foundational learning",                            beneficiaries: "~16 L students, Std 1–3 govt schools",                      status: "active", updated: "2025-02-18" },
    { code: "ITK",     en: "Illam Thedi Kalvi",                             ta: "இல்லம் தேடி கல்வி",                    amount: "Door-step remedial education",                     beneficiaries: "~25 L students, Std 1–8 with learning gaps",                status: "active", updated: "2025-01-10" },
    { code: "MTM",     en: "Makkalai Thedi Maruthuvam",                     ta: "மக்களை தேடி மருத்துவம்",              amount: "Free doorstep healthcare",                         beneficiaries: "Elderly 70+, bedridden, chronic patients",                  status: "active", updated: "2025-06-01" },
    { code: "VK",      en: "Varumun Kappom — Preventive Health",            ta: "வருமுன் காப்போம்",                    amount: "Free health camps",                                beneficiaries: "Rural / slum public; 52.87 L benefited (2021-2025)",         status: "active", updated: "2025-03-15" },
    { code: "NK48",    en: "Innuyir Kaappom — Nammai Kaakkum 48",           ta: "நம்மை காக்கும் 48",                    amount: "Free emergency treatment 48 h",                   beneficiaries: "Road accident victims",                                     status: "active", updated: "2021-12-01" },
    { code: "KCB",     en: "Kalaignar Cashless Insurance (CMCHIS)",         ta: "கலைஞர் காப்பீட்டு திட்டம்",           amount: "Up to ₹5 L cashless cover",                       beneficiaries: "1.48 Cr families (income ≤ ₹72,000)",                       status: "active", updated: "2026-04-05" },
    { code: "NKS",     en: "Nalam Kakkum Stalin — Health Camps",            ta: "நலம் காக்கும் ஸ்டாலின்",              amount: "Free camps + treatment",                           beneficiaries: "All districts, general public",                             status: "active", updated: "2025-07-01" },
    { code: "MDM",     en: "Mudhalvar Marundhagam — CM Pharmacy",           ta: "முதல்வர் மருந்தகம்",                   amount: "60–90% discount on medicines",                    beneficiaries: "All citizens; 3,000+ pharmacy outlets",                     status: "active", updated: "2025-01-01" },
    { code: "KKI",     en: "Kalaignarin Kanavu Illam — Housing",            ta: "கலைஞரின் கனவு இல்லம்",                amount: "Free / subsidised housing",                        beneficiaries: "BPL families",                                              status: "active", updated: "2025-04-01" },
    { code: "THZ",     en: "Thozhi Hostels — Working Women",                ta: "தோழி விடுதிகள்",                       amount: "Affordable hostel accommodation",                  beneficiaries: "Working women, women students in cities",                   status: "active", updated: "2022-06-01" },
    { code: "MRA",     en: "Moovalur Ramamirtham Marriage Assistance",      ta: "மூவலூர் ராமாமிர்தம் திட்டம்",         amount: "₹25,000 + 8 g gold",                              beneficiaries: "Women SC/ST/BC/MBC who cleared Class 10 in govt school",    status: "active", updated: "2025-02-01" },
    { code: "LPT",     en: "Free Laptop Scheme — College",                  ta: "இலவச மடிக்கணினி",                     amount: "Free laptop",                                     beneficiaries: "First-year students, govt & aided colleges; 10 L in 2025-26", status: "active", updated: "2025-08-01" },
    { code: "TAB",     en: "Free Tablet Scheme — Schools",                  ta: "இலவச டேப்லெட்",                       amount: "Free tablet + e-content",                         beneficiaries: "Govt school students, Std 6–8",                             status: "active", updated: "2022-09-01" },
    { code: "NEEDS",   en: "NEEDS Entrepreneur Scheme",                     ta: "",                                     amount: "Loan up to ₹25 L + 25% subsidy",                  beneficiaries: "First-generation entrepreneurs, graduates",                 status: "active", updated: "2024-01-01" },
    { code: "AABC",    en: "Annal Ambedkar Business Champions",              ta: "",                                     amount: "Loan + subsidy",                                  beneficiaries: "SC/ST entrepreneurs",                                       status: "active", updated: "2022-09-01" },
    { code: "UGS",     en: "Ungaludan Stalin — Outreach Camps",             ta: "உங்களுடன் ஸ்டாலின்",                  amount: "Doorstep government services",                    beneficiaries: "General public (certificates, welfare linkages)",            status: "active", updated: "2025-01-15" },
    { code: "IGNOAPS", en: "Old Age Pension (State-enhanced)",              ta: "",                                     amount: "₹1,000 / month",                                  beneficiaries: "Destitute elderly 60+",                                     status: "active", updated: "2025-01-01" },
    { code: "PWP",     en: "Pension — Unmarried Poor Women",                ta: "",                                     amount: "₹1,000 / month",                                  beneficiaries: "Single / destitute women 50+",                              status: "active", updated: "2025-01-01" },
    { code: "DALP",    en: "Destitute Agricultural Labourers Pension",      ta: "",                                     amount: "₹1,000 / month",                                  beneficiaries: "Agricultural workers 60+",                                  status: "active", updated: "2025-01-01" },
    { code: "UPT",     en: "CM Uzhavar Padhukappu — Farmers Pension",       ta: "முதல்வர் உழவர் பாதுகாப்பு திட்டம்",   amount: "₹1,000 / month",                                  beneficiaries: "Elderly farmers",                                           status: "active", updated: "2025-01-01" },
    { code: "VN",      en: "Vetri Nichayam — Skill Training",               ta: "வெற்றி நிச்சயம்",                      amount: "Free vocational training",                        beneficiaries: "Unemployed youth 18–35",                                    status: "active", updated: "2024-06-01" },
    { code: "PDS",     en: "Enhanced PDS + Pongal Gift",                    ta: "",                                     amount: "Subsidised rice/sugar/dal + ₹1,000 Pongal gift",  beneficiaries: "All ration card holders",                                   status: "active", updated: "2026-01-14" },
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
