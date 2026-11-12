"use client";

import { useEffect, useRef, useState } from "react";

const COUNT_DURATION = 1400;

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <g className="visitor-eye-pupil">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </g>
    </svg>
  );
}

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);
  const [settled, setSettled] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/visitors", {
      method: "POST",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { views?: number } | null) => {
        if (data?.views) setViews(data.views);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (views === null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(views);
      setSettled(true);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(views * eased));

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setSettled(true);
      }
    };

    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [views]);

  if (views === null) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-2.5 py-1 text-xs shadow-sm backdrop-blur-sm">
      <EyeIcon className="visitor-eye size-3.5 text-primary" />
      <span
        className={`font-medium tabular-nums text-foreground ${
          settled ? "view-count-pop" : ""
        }`}
      >
        {display.toLocaleString()}
      </span>
      <span className="text-muted-foreground">
        {views === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
