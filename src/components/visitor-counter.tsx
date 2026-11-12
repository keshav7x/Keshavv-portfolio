"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type VisitorStats = {
  views: number;
  visitors: number;
};

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/visitors", {
      method: "POST",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: VisitorStats | null) => {
        if (data) setStats(data);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (!stats) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 tabular-nums">
      <Eye className="size-3.5" aria-hidden />
      <span>
        {stats.visitors.toLocaleString()}{" "}
        {stats.visitors === 1 ? "visitor" : "visitors"}
      </span>
      <span className="text-muted-foreground/40">·</span>
      <span>{stats.views.toLocaleString()} views</span>
    </div>
  );
}
