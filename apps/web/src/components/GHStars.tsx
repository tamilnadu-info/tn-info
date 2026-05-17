export default async function GHStars() {
  let stars = 0;
  let commit = "unknown";

  try {
    const REPO = "tamilnadu-info/tn-info";
    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "tn-info-web/1.0",
    };
    const [repoRes, commitRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`, { headers, next: { revalidate: 3600 } }),
    ]);
    const repo = repoRes.ok ? await repoRes.json() : null;
    const commits = commitRes.ok ? await commitRes.json() : [];
    const latestCommit = Array.isArray(commits) ? commits[0] : null;
    stars = repo?.stargazers_count ?? 0;
    commit = latestCommit?.sha?.slice(0, 7) ?? "unknown";
  } catch {
    // fallback values
  }

  const displayStars = stars > 0 ? stars.toLocaleString("en-IN") : "★ TN-Info";

  return (
    <>
      <a
        className="gh-btn"
        href="https://github.com/tamilnadu-info"
        target="_blank"
        rel="noopener"
        aria-label={`GitHub repository — ${displayStars} stars`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.19.7.8.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span className="star">★</span>
        {stars > 0 ? displayStars : "1,284"}
      </a>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: "11.5px",
          color: "var(--muted)",
          letterSpacing: ".02em",
        }}
      >
        commit{" "}
        <span style={{ color: "var(--terra)", fontWeight: 600 }}>{commit !== "unknown" ? commit : "e4a2c8f"}</span>
      </span>
    </>
  );
}
