"use client";

import { useEffect, useRef } from "react";
import { TN_DATA } from "@/data/tn-data";
import { TN_GEO } from "@/data/tn-geo";

/* ── Compact label abbreviations for tight polygons ─────────── */
const ABBR: Record<string, string> = {
  "Tiruchchirappalli":   "TRICHY",
  "Tirunelveli Kattabo": "NELVELI",
  "Tirunelveli":         "NELVELI",
  "Kanniyakumari":       "KANYA",
  "Kanyakumari":         "KANYA",
  "Ramanathapuram":      "R'PURAM",
  "Virudhunagar":        "V'NAGAR",
  "Thoothukudi":         "TUTI",
  "Pudukkottai":         "PUDUK",
  "Perambalur":          "PRMBLR",
  "Mayiladuthurai":      "MAYIL",
  "Kancheepuram":        "KANCHI",
  "Nagapattinam":        "NAGAI",
  "Sivaganga":           "SIVAGA",
  "Thanjavur":           "THANJA",
  "Thiruvallur":         "T'VALLUR",
  "Tiruvallur":          "T'VALLUR",
  "Tiruvannamalai":      "T'MALAI",
  "Thiruvarur":          "TVARUR",
  "Villupuram":          "VILLUPM",
  "Cuddalore":           "CUDDA",
  "Dharmapuri":          "DHARMA",
  "Dindigul":            "DINDI",
  "Coimbatore":          "COIMB",
  "Vellore":             "VELLR",
  "Namakkal":            "NMKL",
  "Ariyalur":            "ARIYA",
  "Nilgiris":            "NILGIR",
};

const FIT = {
  MAX_SIZE_DEFAULT: 9,
  MAX_SIZE_CAPITAL: 9,
  MIN_SIZE:         4.5,
  WIDTH_FACTOR:     0.65,
  HEIGHT_FACTOR:    0.42,
  MAX_HEIGHT:       12,
  GOOD_ENOUGH:      7,
};

import type { GeoDistrict } from "@/data/tn-geo";

function labelFor(g: GeoDistrict, mode: "long" | "short"): string {
  const name = g.displayName || g.name;
  return (mode === "short" ? (ABBR[g.name] || name.slice(0, 6)) : name).toUpperCase();
}

export default function TNMap() {
  const regionsRef = useRef<SVGGElement>(null);
  const labelsRef = useRef<SVGGElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const regionsG = regionsRef.current;
    const labelsG = labelsRef.current;
    const popEl = popRef.current;
    const wrap = wrapRef.current;
    if (!regionsG || !labelsG || !popEl || !wrap) return;

    const geo = TN_GEO.districts;
    const dataBySlug = Object.fromEntries(TN_DATA.districts.map((d) => [d.id, d]));

    // Draw regions
    regionsG.innerHTML = geo
      .map((g) => {
        const d = dataBySlug[g.slug];
        const en = g.displayName || g.name;
        const ta = d?.ta || "";
        const mlas = d?.mlas || "—";
        const pop = d?.pop || "—";
        const isCap = g.slug === "chennai";
        return `<path
          class="tn-region${isCap ? " cap" : ""}"
          d="${g.d}"
          data-id="${g.slug}"
          data-en="${en}"
          data-ta="${ta}"
          data-mlas="${mlas}"
          data-pop="${pop}"
        ></path>`;
      })
      .join("");

    // Draw labels
    labelsG.innerHTML = geo
      .map((g) => {
        const isCap = g.slug === "chennai";
        return `<text
          class="region-label${isCap ? " cap" : ""}"
          data-slug="${g.slug}"
          x="${g.cx}" y="${g.cy}"
          font-size="10"
        >${labelFor(g, "long")}</text>`;
      })
      .join("");

    // Fit labels after paint
    requestAnimationFrame(() => {
      geo.forEach((g) => {
        const path = regionsG.querySelector(`[data-id="${g.slug}"]`) as SVGPathElement | null;
        const txt = labelsG.querySelector(`[data-slug="${g.slug}"]`) as SVGTextElement | null;
        if (!path || !txt) return;

        const pb = path.getBBox();
        const maxW = pb.width * FIT.WIDTH_FACTOR;
        const maxH = Math.min(pb.height * FIT.HEIGHT_FACTOR, FIT.MAX_HEIGHT);
        const maxSize = g.slug === "chennai" ? FIT.MAX_SIZE_CAPITAL : FIT.MAX_SIZE_DEFAULT;

        let chosenSize = 0;
        let chosenText = "";

        for (const mode of ["long", "short"] as const) {
          const candidate = labelFor(g, mode);
          txt.textContent = candidate;
          for (let s = maxSize; s >= FIT.MIN_SIZE; s -= 0.5) {
            txt.setAttribute("font-size", String(s));
            const tb = txt.getBBox();
            if (tb.width <= maxW && tb.height <= maxH) {
              if (s > chosenSize) {
                chosenSize = s;
                chosenText = candidate;
              }
              break;
            }
          }
          if (chosenSize >= FIT.GOOD_ENOUGH) break;
        }

        if (!chosenText) {
          chosenText = labelFor(g, "short");
          chosenSize = FIT.MIN_SIZE;
        }

        txt.textContent = chosenText;
        txt.setAttribute("font-size", String(chosenSize));
        txt.setAttribute("y", String(g.cy + chosenSize * 0.32));

        if (g.slug === "chennai") {
          txt.setAttribute("y", String(g.cy - 9));
          txt.classList.add("outside");
          txt.classList.remove("cap");
        }
      });
    });

    // Wire interactions
    const showPop = (target: SVGPathElement) => {
      const ds = target.dataset;
      const nm = popEl.querySelector(".nm");
      const ta = popEl.querySelector(".ta");
      const hm = popEl.querySelector(".hm");
      const hp = popEl.querySelector(".hp");
      const hcRow = popEl.querySelector(".hc-row") as HTMLElement | null;
      const hc = popEl.querySelector(".hc");

      if (nm) nm.textContent = ds.en || "";
      if (ta) ta.textContent = ds.ta || "";
      if (hm) hm.textContent = ds.mlas || "";
      if (hp) hp.textContent = ds.pop || "";

      if (hcRow) hcRow.style.display = "none";

      const bb = target.getBoundingClientRect();
      const wbb = wrap.getBoundingClientRect();
      let left = bb.left - wbb.left + bb.width / 2 - 110;
      let top = bb.top - wbb.top - 120;
      left = Math.max(8, Math.min(left, wbb.width - 240));
      if (top < 8) top = bb.bottom - wbb.top + 6;
      popEl.style.left = left + "px";
      popEl.style.top = top + "px";
      popEl.classList.add("show");
    };

    const hidePop = () => popEl.classList.remove("show");

    const handleMouseOver = (e: Event) => {
      const target = e.target as SVGElement;
      const h = target.closest(".tn-region") as SVGPathElement | null;
      if (h) showPop(h);
    };

    const handleMouseOut = (e: Event) => {
      const me = e as MouseEvent;
      const related = me.relatedTarget as Element | null;
      if (!related || !related.closest?.(".tn-region")) hidePop();
    };

    const handleClick = (e: Event) => {
      const target = e.target as SVGElement;
      const h = target.closest(".tn-region") as SVGPathElement | null;
      if (!h) return;
      regionsG.querySelectorAll(".tn-region").forEach((x) => x.classList.remove("active"));
      h.classList.add("active");

      // Open district modal
      if (h.dataset.id) {
        window.dispatchEvent(new CustomEvent("tn-open-district", { detail: { slug: h.dataset.id } }));
      }

      const tile = document.querySelector(`.dist-card[data-id="${h.dataset.id}"]`) as HTMLElement | null;
      if (tile) {
        tile.scrollIntoView({ block: "center", behavior: "smooth" });
        tile.style.boxShadow = "0 0 0 2px var(--terra)";
        setTimeout(() => { tile.style.boxShadow = ""; }, 1400);
      }
    };

    regionsG.addEventListener("mouseover", handleMouseOver);
    regionsG.addEventListener("mouseout", handleMouseOut);
    regionsG.addEventListener("click", handleClick);

    return () => {
      regionsG.removeEventListener("mouseover", handleMouseOver);
      regionsG.removeEventListener("mouseout", handleMouseOut);
      regionsG.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="map-card" data-testid="tn-map">
      <div className="mc-hd">
        <div>
          <h3 className="eonly">
            Tamil&nbsp;Nadu, <em>tile by tile.</em>
          </h3>
          <h3 className="tonly">
            தமிழ்நாடு, <em>மாவட்டம் வாரியாக.</em>
          </h3>
          <div className="ta">38 மாவட்டங்கள் · ஒன்றை தேர்ந்தெடு</div>
        </div>
        <div className="legend">
          <span className="dotc"></span> Capital
        </div>
      </div>
      <div style={{ position: "relative" }} id="hexWrap" ref={wrapRef}>
        <svg
          className="hex-svg"
          viewBox="0 0 600 800"
          id="hexMap"
          aria-label="Map of Tamil Nadu — district boundaries"
        >
          <text className="map-watermark" x="300" y="180">
            TAMIL NADU
          </text>
          <text
            className="map-watermark"
            x="300"
            y="230"
            style={{ fontFamily: "var(--ta)", fontSize: "48px" }}
          >
            தமிழ்நாடு
          </text>
          <line className="map-grat" x1="40" y1="180" x2="560" y2="180" />
          <line className="map-grat" x1="40" y1="380" x2="560" y2="380" />
          <line className="map-grat" x1="40" y1="580" x2="560" y2="580" />
          <g id="regions" ref={regionsRef}></g>
          <g id="labels" ref={labelsRef}></g>
        </svg>
        <div className="map-pop" id="hpop" ref={popRef}>
          <div className="nm"></div>
          <div className="ta"></div>
          <div className="rw">
            <span>Constituencies</span>
            <b className="hm"></b>
          </div>
          <div className="rw">
            <span>Population</span>
            <b className="hp"></b>
          </div>
          <div className="rw hc-row" style={{ display: "none" }}>
            <span>Includes</span>
            <b className="hc"></b>
          </div>
        </div>
      </div>
      <div className="mc-ft">
        <span>All 38 districts · click to explore</span>
        <a href="#districts">View atlas →</a>
      </div>
    </div>
  );
}
