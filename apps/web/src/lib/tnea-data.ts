import { readFileSync } from "fs";
import { join } from "path";

export interface TneaRow {
  college_code: number;
  college_name: string;
  district: string;
  college_type: string;
  branch_code: string;
  branch_name: string;
  oc: number;
  bc: number;
  bcm: number;
  mbc: number;
  sc: number;
  sca: number;
  st: number;
  oc_partial: number;
  bc_partial: number;
  bcm_partial: number;
  mbc_partial: number;
  sc_partial: number;
  sca_partial: number;
  st_partial: number;
}

export type DataType = "cutoff" | "rank" | "allotments";

const cache: Partial<Record<DataType, TneaRow[]>> = {};

function dataPath(type: DataType) {
  return join(process.cwd(), "src", "data", "tnea", `${type}_2025.json`);
}

export function loadTneaData(type: DataType): TneaRow[] {
  if (!cache[type]) {
    cache[type] = JSON.parse(readFileSync(dataPath(type), "utf8")) as TneaRow[];
  }
  return cache[type]!;
}

export function applyFilters(rows: TneaRow[], params: URLSearchParams): TneaRow[] {
  let result = rows;

  const district = params.get("district");
  if (district) {
    const dists = district.split(",").map((d) => d.toUpperCase());
    result = result.filter((r) => dists.includes(r.district.toUpperCase()));
  }

  const branch = params.get("branch");
  if (branch) {
    const branches = branch.split(",").map((b) => b.toUpperCase());
    result = result.filter((r) => branches.includes(r.branch_code.toUpperCase()));
  }

  const college = params.get("college");
  if (college) {
    const codes = college.split(",").map(Number);
    result = result.filter((r) => codes.includes(r.college_code));
  }

  const collegeType = params.get("collegeType");
  if (collegeType) {
    const types = collegeType.split(",").map((t) => t.toUpperCase());
    result = result.filter((r) => types.includes(r.college_type.toUpperCase()));
  }

  return result;
}

export function paginate<T>(rows: T[], params: URLSearchParams) {
  const page = Math.max(1, parseInt(params.get("page") ?? "1"));
  const pageSize = Math.min(200, Math.max(1, parseInt(params.get("pageSize") ?? "50")));
  const total = rows.length;
  const data = rows.slice((page - 1) * pageSize, page * pageSize);
  return { data, total, page, pageSize };
}
