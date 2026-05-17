import { NextResponse } from "next/server";

const REPO = "tamilnadu-info/tn-info";

export const revalidate = 3600;

export async function GET() {
  try {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "tn-info-web/1.0",
    };
    const [repoRes, commitRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);
    const repo = repoRes.ok ? await repoRes.json() : null;
    const commits = commitRes.ok ? await commitRes.json() : [];
    const latestCommit = Array.isArray(commits) ? commits[0] : null;
    return NextResponse.json(
      {
        stars: repo?.stargazers_count ?? 0,
        commit: latestCommit?.sha?.slice(0, 7) ?? "unknown",
        commitDate: latestCommit?.commit?.author?.date ?? null,
        pushedAt: repo?.pushed_at ?? null,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json({
      stars: 0,
      commit: "unknown",
      commitDate: null,
      pushedAt: null,
    });
  }
}
