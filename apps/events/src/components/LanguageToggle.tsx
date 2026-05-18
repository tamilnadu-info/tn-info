"use client";

import { useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "ta">("en");

  const toggle = (l: "en" | "ta") => {
    setLang(l);
    document.body.dataset.lang = l;
  };

  return (
    <div className="lang-pill" id="langToggle" data-testid="lang-toggle">
      <button
        className={lang === "en" ? "on" : ""}
        data-lang="en"
        onClick={() => toggle("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        className={lang === "ta" ? "on" : ""}
        data-lang="ta"
        style={{ fontFamily: "var(--ta)" }}
        onClick={() => toggle("ta")}
        aria-pressed={lang === "ta"}
      >
        த
      </button>
    </div>
  );
}
