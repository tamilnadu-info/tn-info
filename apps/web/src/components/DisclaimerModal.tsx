"use client";

import { useState, useEffect, useCallback } from "react";

export default function DisclaimerModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("tn-disc-dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    const checkbox = document.getElementById("discAck") as HTMLInputElement | null;
    if (checkbox?.checked) {
      localStorage.setItem("tn-disc-dismissed", "1");
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      className="modal-shade show"
      id="discModal"
      data-testid="disclaimer-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="modal" role="dialog" aria-labelledby="dt">
        <div className="modal-illus"></div>
        <div className="modal-hd">
          <span className="ki">Heads up · before you dive in</span>
          <h3 id="dt">
            Open data, <em>best-effort</em> accuracy.
          </h3>
          <div className="ta tonly">திறந்த தரவு, துல்லியத்திற்கான முயற்சி.</div>
        </div>
        <div className="modal-body">
          <p>
            TN-Info.in is a <strong>community-run, open-source</strong> platform built by{" "}
            <strong>
              <a
                href="https://destrosec.com"
                target="_blank"
                rel="noopener"
                style={{ color: "var(--terra)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Destrosec
              </a>
            </strong>{" "}
            and contributors. We are{" "}
            <strong>not affiliated with the Government of Tamil Nadu</strong> or any political party.
          </p>
          <p>
            Our goal is 100% accuracy. We do our best to keep data fresh and faithful to the source.
            That said — if something turns out to be wrong,{" "}
            <strong>Destrosec accepts no responsibility</strong> for decisions made on the basis of
            it, and we are very open to corrections.
          </p>
          <ul>
            <li>Before applying for any scheme, verify on the official portal.</li>
            <li>
              For TNEA / TANCA / medical counselling, refer to the official Anna University, DoTE,
              and TNMCC websites.
            </li>
            <li>
              Spot an error? Open an issue on{" "}
              <span style={{ fontFamily: "var(--mono)", color: "var(--terra)" }}>
                github.com/tamilnadu-info
              </span>{" "}
              — we ship fixes within 24h.
            </li>
          </ul>
        </div>
        <div className="modal-ft">
          <label className="ack" htmlFor="discAck">
            <input type="checkbox" id="discAck" /> Don&apos;t show this again on this device
          </label>
          <div className="btn-row">
            <a
              className="btn btn-secondary"
              href="https://github.com/tamilnadu-info"
              target="_blank"
              rel="noopener"
            >
              Report an issue
            </a>
            <button className="btn btn-primary" id="discDismiss" onClick={dismiss}>
              I understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
