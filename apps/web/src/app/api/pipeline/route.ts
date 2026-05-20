import { NextResponse } from "next/server";

export const revalidate = 3600;

const STATUS_URL =
  "https://raw.githubusercontent.com/tamilnadu-info/tn-info/pipeline-data/pipeline-status.json";

export interface PipelineEntry {
  name: string;
  source: string;
  status: "ok" | "warn";
  latencyMs: number;
  checkedAt: string;
}

export interface PipelineStatus {
  checkedAt: string;
  pipelines: PipelineEntry[];
}

const FALLBACK: PipelineStatus = {
  checkedAt: "",
  pipelines: [
    { name: "Election results",  source: "ECI",                status: "ok",   latencyMs: 0, checkedAt: "" },
    { name: "TNEA counselling",  source: "tneaonline.org",    status: "ok",   latencyMs: 0, checkedAt: "" },
    { name: "TANCA",             source: "tanca.annauniv.edu", status: "ok",   latencyMs: 0, checkedAt: "" },
    { name: "Schemes registry",  source: "tn.gov.in",         status: "warn", latencyMs: 0, checkedAt: "" },
    { name: "Cabinet notify.",   source: "Govt. Gazette",     status: "ok",   latencyMs: 0, checkedAt: "" },
    { name: "Events feed",       source: "FOSS United",       status: "ok",   latencyMs: 0, checkedAt: "" },
  ],
};

export async function GET() {
  try {
    const res = await fetch(STATUS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("fetch failed");
    const data: PipelineStatus = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json(FALLBACK, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }
}
