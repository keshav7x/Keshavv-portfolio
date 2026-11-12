import { NextResponse } from "next/server";

import { isViewCounterEnabled, recordView } from "@/lib/visitors";

export async function POST() {
  if (!isViewCounterEnabled()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const stats = await recordView();

  if (!stats) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  return NextResponse.json(stats, {
    headers: { "Cache-Control": "no-store" },
  });
}
