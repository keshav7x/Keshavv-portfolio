import { NextResponse } from "next/server";

import { getContributions } from "@/lib/contributions";

export async function GET() {
  const data = await getContributions();

  return NextResponse.json({ ...data, source: "cached" }, {
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
  });
}
