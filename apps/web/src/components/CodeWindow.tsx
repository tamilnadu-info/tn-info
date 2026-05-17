"use client";

import { useState } from "react";

type Tab = "curl" | "javascript" | "python";

const CODE: Record<Tab, React.ReactNode> = {
  curl: (
    <>
      <div className="ln">
        <span className="gut">1</span>
        <span>
          <span className="com"># Get 2024 results + MLA list for Madurai district</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">2</span>
        <span>
          <span className="fn">curl</span>{" "}
          <span className="str">
            &quot;https://api.tn-info.in/v1/districts/madurai/election/2024&quot;
          </span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">3</span>
        <span></span>
      </div>
      <div className="ln">
        <span className="gut">4</span>
        <span>
          <span className="pn">{"{"}</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">5</span>
        <span>
          {"  "}
          <span className="key">&quot;district&quot;</span>
          <span className="pn">:</span>{" "}
          <span className="str">&quot;Madurai&quot;</span>
          <span className="pn">,</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">6</span>
        <span>
          {"  "}
          <span className="key">&quot;tamil_name&quot;</span>
          <span className="pn">:</span>{" "}
          <span className="str">&quot;மதுரை&quot;</span>
          <span className="pn">,</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">7</span>
        <span>
          {"  "}
          <span className="key">&quot;constituencies&quot;</span>
          <span className="pn">:</span>{" "}
          <span className="num">10</span>
          <span className="pn">,</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">8</span>
        <span>
          {"  "}
          <span className="key">&quot;lok_sabha_2024&quot;</span>
          <span className="pn">{": {"}</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">9</span>
        <span>
          {"    "}
          <span className="key">&quot;winner&quot;</span>
          <span className="pn">:</span>{" "}
          <span className="str">&quot;Su. Venkatesan&quot;</span>
          <span className="pn">,</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">10</span>
        <span>
          {"    "}
          <span className="key">&quot;party&quot;</span>
          <span className="pn">:</span>{" "}
          <span className="str">&quot;CPI(M)&quot;</span>
          <span className="pn">,</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">11</span>
        <span>
          {"    "}
          <span className="key">&quot;margin&quot;</span>
          <span className="pn">:</span>{" "}
          <span className="num">208556</span>
          <span className="pn">,</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">12</span>
        <span>
          {"    "}
          <span className="key">&quot;verified&quot;</span>
          <span className="pn">:</span>{" "}
          <span className="bo">true</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">13</span>
        <span>
          {"  "}
          <span className="pn">{"}"}</span>
          <span className="pn">,</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">14</span>
        <span>
          {"  "}
          <span className="key">&quot;updated_at&quot;</span>
          <span className="pn">:</span>{" "}
          <span className="str">&quot;2026-05-17T04:21:00Z&quot;</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">15</span>
        <span>
          <span className="pn">{"}"}</span>
        </span>
      </div>
    </>
  ),
  javascript: (
    <>
      <div className="ln">
        <span className="gut">1</span>
        <span>
          <span className="com">// Fetch district election data</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">2</span>
        <span>
          <span className="key">const</span>{" "}
          <span className="fn">res</span>{" "}
          <span className="pn">=</span>{" "}
          <span className="fn">await</span>{" "}
          <span className="fn">fetch</span>
          <span className="pn">(</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">3</span>
        <span>
          {"  "}
          <span className="str">
            &apos;https://api.tn-info.in/v1/districts/madurai/election/2024&apos;
          </span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">4</span>
        <span>
          <span className="pn">);</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">5</span>
        <span>
          <span className="key">const</span>{" "}
          <span className="fn">data</span>{" "}
          <span className="pn">=</span>{" "}
          <span className="fn">await</span>{" "}
          <span className="fn">res</span>
          <span className="pn">.</span>
          <span className="fn">json</span>
          <span className="pn">();</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">6</span>
        <span>
          <span className="fn">console</span>
          <span className="pn">.</span>
          <span className="fn">log</span>
          <span className="pn">(</span>
          <span className="fn">data</span>
          <span className="pn">.</span>
          <span className="fn">lok_sabha_2024</span>
          <span className="pn">);</span>
        </span>
      </div>
    </>
  ),
  python: (
    <>
      <div className="ln">
        <span className="gut">1</span>
        <span>
          <span className="key">import</span>{" "}
          <span className="fn">requests</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">2</span>
        <span></span>
      </div>
      <div className="ln">
        <span className="gut">3</span>
        <span>
          <span className="fn">r</span>{" "}
          <span className="pn">=</span>{" "}
          <span className="fn">requests</span>
          <span className="pn">.</span>
          <span className="fn">get</span>
          <span className="pn">(</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">4</span>
        <span>
          {"    "}
          <span className="str">
            &apos;https://api.tn-info.in/v1/districts/madurai/election/2024&apos;
          </span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">5</span>
        <span>
          <span className="pn">)</span>
        </span>
      </div>
      <div className="ln">
        <span className="gut">6</span>
        <span>
          <span className="fn">print</span>
          <span className="pn">(</span>
          <span className="fn">r</span>
          <span className="pn">.</span>
          <span className="fn">json</span>
          <span className="pn">()[</span>
          <span className="str">&apos;lok_sabha_2024&apos;</span>
          <span className="pn">])</span>
        </span>
      </div>
    </>
  ),
};

const CURL_CMD =
  'curl "https://api.tn-info.in/v1/districts/madurai/election/2024"';

export default function CodeWindow() {
  const [tab, setTab] = useState<Tab>("curl");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CURL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div className="code-win" data-testid="code-window">
      <div className="code-tabs">
        <div className="code-traffic">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {(["curl", "javascript", "python"] as Tab[]).map((t) => (
          <div
            key={t}
            className={`code-tab${tab === t ? " on" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </div>
        ))}
        <div className="code-spacer"></div>
        <div className="code-method">
          <span>GET</span> /v1/districts/madurai/election/2024
        </div>
      </div>
      <div className="code-body" id="codeBody">
        {CODE[tab]}
      </div>
      <div className="code-foot">
        <span>
          <span className="stat">200 OK</span>
          &nbsp;·&nbsp; 47ms &nbsp;·&nbsp; cached 5m &nbsp;·&nbsp; etag d8a1c3
        </span>
        <button onClick={handleCopy}>{copied ? "Copied!" : "Copy curl"}</button>
      </div>
    </div>
  );
}
