# Data Sources

All data in TN-Info is sourced from **official government portals or public registries**. This file records where each dataset came from, how it was collected, and where it lives in the codebase.

> If a data item looks wrong, check the source URL listed here and open a **Data error** issue with a link to the correct official value.

---

## Education

### Engineering Colleges (TNEA)

| Item | Source | Method | File |
|---|---|---|---|
| 423 engineering colleges (name, code, district, type, branches) | [tneaonline.org](https://tneaonline.org) — official TNEA counselling portal | Scraped from TNEA public API | `tnea/colleges.json` |
| Cutoff scores 2025 (closing ranks per branch, all rounds) | TNEA 2025 counselling results | Scraped from `/api/tnea/cutoff` endpoint | `tnea/cutoff_2025.json` |
| Rank-to-college lookup 2025 | TNEA 2025 | Processed from allotment data | `tnea/rank_2025.json` |
| Seat allotment records 2025 | TNEA 2025 counselling | Scraped from allotment API | `tnea/allotments_2025.json` |
| College + branch master metadata | TNEA public API (`/api/tnea/meta`) | API call with 24h cache | `tnea/meta.json` |

### Arts & Science Colleges

| Item | Source | Method | File |
|---|---|---|---|
| 471 govt + aided arts colleges (name, district, region, NAAC, intake) | TNDCE (Tamil Nadu Directorate of Collegiate Education) — official 2026 prospectus | Manual export from PDF/HTML prospectus | `tnea/arts_colleges_2026.json` |
| ~431 private (self-financing) arts colleges | TNDCE 2026 private prospectus | Manual export | `tnea/arts_colleges_private.json` |

**Key fields per college:** `college_code`, `region`, `district`, `taluk`, `management` (Govt/Aided/SF), `sanctioned_seats`, `naac_grade`, `nirf_rank`, `hostel`, nodal officer contact.

### Polytechnic Colleges

| Item | Source | Method | File |
|---|---|---|---|
| 58 government polytechnics (name, DOTE code, district, hostel) | [tnpoly.in](https://tnpoly.in) REST API (`/api/master/colleges`) | Python fetch script (`/Downloads/tnea/fetch_poly_aicte.py`) | merged into final JSON |
| 406 polytechnics — all types (branches, intake, AICTE ID) | [AICTE dashboard](https://facilities.aicte-india.org/dashboard/pages/approvedinstitutes.php) — `approvedinstituteserver.php` + `approvedcourse.php` APIs | Python fetch script | `tnea/polytechnic_colleges.json` |

**Merge logic:** Government colleges from tnpoly.in (authoritative for DOTE code + hostel) merged with AICTE (authoritative for diploma branches + intake) using city/code/name matching (`/Downloads/tnea/merge_poly.py`). Final dataset: **441 colleges** (81 Govt, 30 Aided, 330 SF).

### Medical Colleges

| Item | Source | Method | File |
|---|---|---|---|
| 52 NMC-approved MBBS colleges in Tamil Nadu (name, type, district, address, website, university) | [NMC MSMER portal](https://msmer.nmc.org.in/public/performaAdminDetails) | Python: parse DataTable HTML → detail page per college (`/Downloads/tnea/fetch_medical_detail.py`) | `tnea/medical_colleges.json` |

**How it was collected:**
1. Fetched the 1.4 MB MSMER list page — 684 colleges all-India
2. Extracted all college codes from `performaAdminCollegeDetails/{code}` links
3. Filtered candidates by Tamil Nadu city/district keywords in college names (52 candidates)
4. Fetched each detail page and parsed `<th scope="row">` / `<td>` row pairs
5. Confirmed state = "Tamil Nadu" from `College State` field

**Note:** MBBS seat counts are `null` for most entries — the NMC College Details page does not expose intake; this comes from a separate `performaAdminStudentAdmissionDetails` sub-page (future work).

---

## Elections

| Item | Source | Method | File |
|---|---|---|---|
| 234 constituency winners — 2026 TN Assembly election | [Election Commission of India](https://eci.gov.in) — official results | Manual data entry from ECI results page | `constituency-winner-2026.ts` |
| Constituency → party mapping | ECI 2026 results | Derived from winners data | `constituency-party-2026.ts` |
| 39 Lok Sabha winners (TN + Puducherry) — 2024 | ECI 2024 general election results | Manual data entry | in `tn-data.ts` |
| 35 state cabinet ministers | Official TN government press releases | Manual data entry | in `tn-data.ts` |

---

## Districts & Geography

| Item | Source | Method | File |
|---|---|---|---|
| 38 district profiles (area, population, literacy, HQ, constituencies) | Census 2011 + TN government district handbooks | Manual compilation | `district-detail.ts` |
| District boundary polygons for map rendering | [Datameet TN GeoJSON](https://github.com/datameet/india-village-boundaries) | Simplified and converted to TypeScript | `tn-geo.ts` |
| MLA names per constituency | TN Legislative Assembly official roster | Manual data entry | `tn-data.ts` |

---

## Government Schemes

| Item | Source | Method | File |
|---|---|---|---|
| 28 active welfare schemes (name, beneficiaries, budget, eligibility) | [tn.gov.in](https://tn.gov.in) scheme registry + budget documents | Manual research | in `tn-data.ts` |

Schemes include: Pudhumai Penn scholarship, CM Breakfast, Kalaignar Magalir Urimai Thogai, free bus pass, free laptop, and more.

---

## News

| Item | Source | Method | File |
|---|---|---|---|
| Curated news items (hot + hidden) | Various: The Hindu, The News Minute, Dinamalar, RTI replies, government press releases, audit reports | Editorial curation — no automated scraping | `news.ts`, `news-bodies.ts` |

**"Hidden" stories** are specifically sourced from:
- RTI (Right to Information) replies published by activists
- CAG (Comptroller and Auditor General) audit reports
- NHRC / SHRC (Human Rights Commission) case filings
- Academic studies and ground reports not covered by mainstream outlets

---

## Events

| Item | Source | Method | File |
|---|---|---|---|
| Tech meetups | [FOSS United](https://fossunited.org), Chennai Geeks, various Meetup.com groups | Manual curation | `events.ts` |
| Government exam dates | TNPSC, TNEA, TANCA official notifications | Manual data entry | `events.ts` |
| Cultural events | State tourism, Music Academy, Sabhas | Manual curation | `events.ts` |

---

## Scraper Scripts

All scraper/fetch scripts are stored locally at `/home/karuppan/Downloads/tnea/` (not committed to the repo — they are one-time collection tools):

| Script | Purpose |
|---|---|
| `fetch_poly_aicte.py` | Fetch all TN polytechnics from AICTE dashboard API |
| `merge_poly.py` | Merge tnpoly.in (hostel/DOTE code) with AICTE (branches) |
| `fetch_medical.py` | Parse MSMER portal list page for all-India colleges |
| `fetch_medical_detail.py` | Fetch + parse individual NMC college detail pages |
| `parse_medical.py` | Final parsing pass to produce `medical_colleges.json` |

---

## Data Freshness

| Dataset | Last updated | Update frequency |
|---|---|---|
| Engineering colleges + cutoffs | TNEA 2025 season | Annually (post-counselling) |
| Arts colleges | TNDCE 2026 prospectus | Annually |
| Polytechnic colleges | AICTE 2024-25 | Annually |
| Medical colleges | NMC MSMER May 2026 | As NMC approvals change |
| Election results | May 2026 TN Assembly | Every 5 years |
| Cabinet ministers | May 2026 | On reshuffle |
| Schemes | May 2026 | On new scheme announcement |
| News & Events | Manual, ongoing | Weekly |

---

## Attributions

Data is sourced from public portals and is reproduced here for non-commercial public interest. Original sources retain all rights to their data. If any source objects to their data being included, please [open an issue](https://github.com/tamilnadu-info/tn-info/issues).

- Tamil Nadu Directorate of Technical Education (DoTE) — [tndte.gov.in](https://tndte.gov.in)
- Tamil Nadu Engineering Admissions — [tneaonline.org](https://tneaonline.org)
- All India Council for Technical Education (AICTE) — [aicte-india.org](https://aicte-india.org)
- National Medical Commission (NMC) — [nmc.org.in](https://nmc.org.in)
- Tamil Nadu Polytechnic Admissions — [tnpoly.in](https://tnpoly.in)
- Election Commission of India — [eci.gov.in](https://eci.gov.in)
- Tamil Nadu Government — [tn.gov.in](https://tn.gov.in)
- Tamil Nadu Directorate of Collegiate Education — [tnche.ac.in](https://tnche.ac.in)
