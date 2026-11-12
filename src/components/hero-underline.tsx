"use client";

import { useEffect, useState } from "react";

/**
 * The underline is split into two halves that share the middle point of the
 * original curve (158, 10.5). Each half is written in the direction of travel
 * — outwards from that shared middle — so the stroke unrolls out from the
 * centre of the greeting like a snake.
 */
const RIGHT_HALF =
  "M158 10.5 C 181.5 12, 205.75 11.375, 229.25 10.8125 C 252.75 10.25, 275.5 9.75, 296 11.5";
const LEFT_HALF =
  "M158 10.5 C 131.5 8.5, 105.75 10, 80.25 11.5625 C 54.75 13.125, 29.5 14.75, 4 13";

const HALVES = [
  { d: RIGHT_HALF, side: "right" },
  { d: LEFT_HALF, side: "left" },
] as const;

const DRAW_MS = 700;
/** Hard fallback so the underline always plays, even if a resource stalls. */
const MAX_WAIT_MS = 1400;

export default function HeroUnderline() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    let fallback: number | undefined;

    const begin = () => {
      if (timer) window.clearTimeout(timer);
      // let the heading settle in first, then let the stroke chase it
      timer = window.setTimeout(() => setStarted(true), 220);
    };

    if (document.readyState === "complete") {
      begin();
    } else {
      window.addEventListener("load", begin, { once: true });
      fallback = window.setTimeout(begin, MAX_WAIT_MS);
    }

    return () => {
      window.removeEventListener("load", begin);
      if (timer) window.clearTimeout(timer);
      if (fallback) window.clearTimeout(fallback);
    };
  }, []);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute -bottom-2 -left-[3%] h-3 w-[106%] max-w-none overflow-visible ${
        started ? "hero-underline--start" : ""
      }`}
      viewBox="0 0 300 20"
      fill="none"
      preserveAspectRatio="none"
    >
      {HALVES.map((half) => (
        <g key={half.d}>
          {/* the stroke itself, unrolling from the middle */}
          <path
            d={half.d}
            stroke="#5489D8"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            className={`hero-underline-path hero-underline-path--${half.side}`}
          />
          {/* the head of the snake, riding the growing edge */}
          <path
            d={half.d}
            stroke="#5489D8"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            className={`hero-underline-tip hero-underline-tip--${half.side}`}
          />
        </g>
      ))}
    </svg>
  );
}
