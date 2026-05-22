"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TN_DATA } from "@/data/tn-data";
import { DISTRICT_DETAIL, type DistrictDetail, type Slide } from "@/data/district-detail";
import { CONSTITUENCY_PARTY_2026 } from "@/data/constituency-party-2026";

const MOOD_PALETTES: Record<string, { from: string; to: string; glyph: string }> = {
  sunrise:  { from: "#E2A03F", to: "#C8472B", glyph: "☼" },
  gopuram:  { from: "#C8472B", to: "#8B2F1F", glyph: "⌂" },
  heritage: { from: "#3F5B3A", to: "#1F1611", glyph: "⌬" },
  urban:    { from: "#1F1611", to: "#3F2F23", glyph: "◳" },
};
const SLIDE_INTERVAL_MS = 3800;

function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const r = (n >> 16) & 0xff, g = (n >> 8) & 0xff, b = n & 0xff;
  return `rgba(${r},${g},${b},${a})`;
}

function Slideshow({ slides, idx, onGo }: { slides: Slide[]; idx: number; onGo: (i: number) => void }) {
  return (
    <>
      <div className="dm-slides">
        {slides.map((s, i) => {
          const p = MOOD_PALETTES[s.mood] || MOOD_PALETTES.urban;
          return (
            <div
              key={i}
              className={`dm-slide${i === idx ? " on" : ""}`}
              style={{
                background: `radial-gradient(circle at 30% 70%, ${hexA(p.from, 0.85)}, transparent 60%), linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
              }}
            >
              <span className="dm-glyph">{p.glyph}</span>
              <div className="dm-slide-caption">
                <span className="dm-loc">{s.caption}</span>
                <span className="dm-loc-ta">{s.ta}</span>
              </div>
              <span className="dm-counter">{i + 1} / {slides.length}</span>
            </div>
          );
        })}
      </div>
      <div className="dm-nav">
        <div className="dm-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dm-dot${i === idx ? " on" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => onGo(i)}
            />
          ))}
        </div>
        <div className="dm-arrows">
          <button
            className="dm-arrow"
            aria-label="Previous slide"
            onClick={() => onGo((idx - 1 + slides.length) % slides.length)}
          >‹</button>
          <button
            className="dm-arrow"
            aria-label="Next slide"
            onClick={() => onGo((idx + 1) % slides.length)}
          >›</button>
        </div>
      </div>
    </>
  );
}

export default function DistrictModal() {
  const [slug, setSlug] = useState<string | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const district = slug ? TN_DATA.districts.find((d) => d.id === slug) : null;
  const detail: DistrictDetail | null = slug
    ? (DISTRICT_DETAIL.detail[slug] ?? DISTRICT_DETAIL.defaultFor(slug))
    : null;

  const openModal = useCallback((e: Event) => {
    const s = (e as CustomEvent<{ slug: string }>).detail?.slug;
    if (s) { setSlug(s); setSlideIdx(0); }
  }, []);

  const closeModal = useCallback(() => setSlug(null), []);

  // Listen for open events from TNMap + Atlas
  useEffect(() => {
    window.addEventListener("tn-open-district", openModal);
    return () => window.removeEventListener("tn-open-district", openModal);
  }, [openModal]);

  // Escape key
  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [slug, closeModal]);

  // Body overflow lock
  useEffect(() => {
    if (slug) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [slug]);

  // Slideshow auto-advance
  useEffect(() => {
    if (!detail || detail.slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setSlideIdx((i) => (i + 1) % detail.slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slug, detail]);

  // Reset slide on manual nav
  const goToSlide = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSlideIdx(i);
    if (detail && detail.slides.length > 1) {
      timerRef.current = setInterval(() => {
        setSlideIdx((prev) => (prev + 1) % detail.slides.length);
      }, SLIDE_INTERVAL_MS);
    }
  };

  if (!slug || !district || !detail) return null;

  const kicker = `District${district.capital ? " · Capital" : ""}`;

  return (
    <div
      className="dm-shade show"
      id="distModal"
      role="dialog"
      aria-labelledby="dmName"
      data-testid="district-modal"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="dm-modal">
        <button className="dm-close" aria-label="Close" onClick={closeModal}>×</button>

        {/* LEFT 35% */}
        <div className="dm-left">
          <Slideshow slides={detail.slides} idx={slideIdx} onGo={goToSlide} />
          <div className="dm-meta">
            <span className="dm-kicker">{kicker}</span>
            {detail.rulingParty && (
              <span className="dm-party-badge" data-party={detail.rulingParty}>
                {detail.rulingParty}
              </span>
            )}
            <h2 className="dm-name" id="dmName">{district.en}</h2>
            <div className="dm-name-ta">{district.ta}</div>
            <p className="dm-intro eonly">{detail.introEn}</p>
            <p className="dm-intro tonly" style={{ fontFamily: "var(--ta)", fontSize: "14.5px" }}>
              {detail.introTa}
            </p>
            <div className="dm-quick">
              <div className="q">
                <b>{district.mlas}</b>
                <span>Constituencies</span>
              </div>
              <div className="q">
                <b>{district.pop}</b>
                <span>Population</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 65% */}
        <div className="dm-right">
          <section className="dm-section">
            <h3>
              Constituencies <span className="ta">· தொகுதிகள்</span>
              <span className="cnt"><span>{detail.constituencies.length}</span> total</span>
            </h3>
            <div className="chip-grid">
              {detail.constituencies.length > 0
                ? detail.constituencies.map((c) => {
                    const party = CONSTITUENCY_PARTY_2026[c];
                    return (
                      <span key={c} className="chip chip-const">
                        {c}
                        {party && <span className="chip-party" data-party={party}>{party}</span>}
                      </span>
                    );
                  })
                : <span className="chip chip-muted">No data yet</span>
              }
            </div>
          </section>

          <section className="dm-section">
            <h3>
              Colleges <span className="ta">· கல்லூரிகள்</span>
              <span className="cnt"><span>{detail.colleges.length}</span> listed</span>
            </h3>
            <div className="chip-grid">
              {detail.colleges.length > 0
                ? detail.colleges.map((c) => (
                    <span key={c} className="chip chip-coll">{c}</span>
                  ))
                : <span className="chip chip-muted">No data yet</span>
              }
            </div>
          </section>

          <section className="dm-section">
            <h3>
              News &amp; updates <span className="ta">· செய்திகள்</span>
              <span className="cnt"><span>{detail.news.length}</span> recent</span>
            </h3>
            <div className="chip-feed">
              {detail.news.length > 0
                ? detail.news.map((n, i) => (
                    <div key={i} className="news-chip">
                      <span className={`news-tag tag-${n.tag}`}>{n.tag}</span>
                      <span className="news-text">{n.en}</span>
                      <span className="news-time">{n.time}</span>
                    </div>
                  ))
                : <span className="chip chip-muted">No updates yet</span>
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
