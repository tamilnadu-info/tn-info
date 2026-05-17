"use client";

export default function HamburgerBtn() {
  return (
    <button
      className="hamburger"
      id="hamburger"
      aria-label="Open menu"
      aria-expanded="false"
      onClick={() => window.dispatchEvent(new CustomEvent("tn-toggle-drawer"))}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
