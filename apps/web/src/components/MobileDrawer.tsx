"use client";

import { useState, useEffect, useCallback } from "react";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = "hidden";
    document.getElementById("hamburger")?.setAttribute("aria-expanded", "true");
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    document.getElementById("hamburger")?.setAttribute("aria-expanded", "false");
  }, []);

  // Listen for hamburger toggle event
  useEffect(() => {
    const onToggle = () => (open ? closeDrawer() : openDrawer());
    window.addEventListener("tn-toggle-drawer", onToggle);
    return () => window.removeEventListener("tn-toggle-drawer", onToggle);
  }, [open, openDrawer, closeDrawer]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeDrawer]);

  return (
    <>
      {/* Shade */}
      <div
        className={`drawer-shade${open ? " show" : ""}`}
        id="drawerShade"
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <aside
        className={`drawer${open ? " show" : ""}`}
        id="drawer"
        aria-hidden={!open}
        aria-label="Navigation menu"
      >
        <div className="drawer-hd">
          <div className="brand">
            <div className="brand-glyph">த</div>
            <div>
              <div className="brand-name">TN-Info<em>.in</em></div>
              <div className="brand-sub">தமிழ்நாடு · OPEN DATA</div>
            </div>
          </div>
          <button
            className="drawer-close"
            id="drawerClose"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            ×
          </button>
        </div>

        <nav className="drawer-nav" onClick={closeDrawer}>
          <a href="#districts">
            Districts <span className="ta">· மாவட்டங்கள்</span>
            <span className="arr">→</span>
          </a>
          <a href="#mission">
            About Us <span className="ta">· எங்களைப் பற்றி</span>
            <span className="arr">→</span>
          </a>
          <a href="/news">
            News <span className="ta">· செய்திகள்</span>
            <span className="arr">→</span>
          </a>
          <a href="/events">
            Events <span className="ta">· நிகழ்வுகள்</span>
            <span className="arr">→</span>
          </a>
          <a href="#api" className="primary">
            API <span className="arr">→</span>
          </a>
        </nav>

        <div className="drawer-ft">
          <a
            className="by-destrosec"
            href="https://destrosec.com"
            target="_blank"
            rel="noopener"
          >
            <span className="label">by</span>
            <b>Destrosec</b>
            <span className="arr">↗</span>
          </a>
          <a
            className="drawer-gh"
            href="https://github.com/tamilnadu-info"
            target="_blank"
            rel="noopener"
          >
            <span className="star">★</span> GitHub · tamilnadu-info
          </a>
        </div>
      </aside>
    </>
  );
}
