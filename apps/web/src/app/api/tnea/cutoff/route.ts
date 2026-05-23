import { NextRequest, NextResponse } from "next/server";
import { loadTneaData, applyFilters, paginate } from "@/lib/tnea-data";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const rows = loadTneaData("cutoff");
  const filtered = applyFilters(rows, req.nextUrl.searchParams);
  return NextResponse.json(paginate(filtered, req.nextUrl.searchParams));
}
