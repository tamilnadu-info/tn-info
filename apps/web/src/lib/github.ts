const REPO = "tamilnadu-info/tn-info";
const HEADERS = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "tn-info-web/1.0",
};

export interface GitHubData {
  stars: number;
  commit: string;
  commitDate: string | null;
  pushedAt: string | null;
  contributors: number;
}

export async function fetchGitHubData(): Promise<GitHubData> {
  try {
    const [repoRes, commitRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/repos/${REPO}/contributors?per_page=100&anon=true`, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      }),
    ]);
    const repo = repoRes.ok ? await repoRes.json() : null;
    const commits = commitRes.ok ? await commitRes.json() : [];
    const contribs = contribRes.ok ? await contribRes.json() : [];
    const latestCommit = Array.isArray(commits) ? commits[0] : null;
    return {
      stars: repo?.stargazers_count ?? 0,
      commit: latestCommit?.sha?.slice(0, 7) ?? "unknown",
      commitDate: latestCommit?.commit?.author?.date ?? null,
      pushedAt: repo?.pushed_at ?? null,
      contributors: Array.isArray(contribs) ? contribs.length : 0,
    };
  } catch {
    return { stars: 0, commit: "unknown", commitDate: null, pushedAt: null, contributors: 0 };
  }
}
