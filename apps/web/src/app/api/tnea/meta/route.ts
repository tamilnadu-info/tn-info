import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";
export const revalidate = 86400;

let cached: unknown = null;

export function GET() {
  if (!cached) {
    cached = JSON.parse(
      readFileSync(join(process.cwd(), "src", "data", "tnea", "meta.json"), "utf8")
    );
  }
  return NextResponse.json(cached);
}
