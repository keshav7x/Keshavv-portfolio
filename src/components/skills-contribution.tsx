"use client";

import { useState } from "react";

import type { ContributionsData } from "@/lib/contributions";

type Cell = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

const LEVEL_STYLES = [
  "bg-muted/60 dark:bg-muted/25",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function levelToStyleLevel(level: number): Cell["level"] {
  return Math.min(4, Math.max(0, level)) as Cell["level"];
}

/**
 * Contribution calendar.
 *
 * The calendar itself is fetched on the server (see `lib/contributions`) and
 * handed down as props, so the graph is painted with the rest of the page
 * instead of after a client-side round trip.
 */
export default function SkillsContribution({
  data,
}: {
  data: ContributionsData;
}) {
  const [hovered, setHovered] = useState<{
    cell: Cell;
    x: number;
    y: number;
  } | null>(null);

  const cells: Cell[] = (data.contributions ?? []).map((c) => ({
    date: c.date,
    count: c.count,
    level: levelToStyleLevel(c.level),
  }));
  const total = data.total ?? 0;

  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const monthLabels: { col: number; label: string }[] = [];
  weeks.forEach((week, col) => {
    const first = week[0];
    if (!first) return;
    const d = new Date(first.date);
    const prev = weeks[col - 1]?.[0];
    if (!prev || new Date(prev.date).getMonth() !== d.getMonth()) {
      monthLabels.push({ col, label: MONTHS[d.getMonth()] });
    }
  });

  return (
    <div className="w-full">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            github.com/Keshav7x
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {total.toLocaleString()} contributions
            <span className="text-muted-foreground">.</span>
          </h2>
        </div>
        <span className="hidden font-mono text-xs text-muted-foreground sm:block">
          LAST 12 MONTHS
        </span>
      </div>

      <div className="relative rounded-xl border border-border/70 bg-card/40 p-4">
        <div className="overflow-x-auto pb-1">
          <div className="inline-flex min-w-max flex-col">
            <div className="mb-1 ml-7 flex h-4 gap-[3px]">
              {weeks.map((_, col) => {
                const label = monthLabels.find((m) => m.col === col);
                return (
                  <div
                    key={col}
                    className="w-[11px] font-mono text-[9px] text-muted-foreground"
                  >
                    {label ? label.label : ""}
                  </div>
                );
              })}
            </div>

            <div
              className="flex gap-[3px]"
              role="img"
              aria-label={`GitHub contribution calendar: ${total.toLocaleString()} contributions in the last 12 months.`}
            >
              <div className="flex w-7 flex-col justify-between gap-[3px] py-[1px] font-mono text-[9px] text-muted-foreground">
                <span />
                <span>Mon</span>
                <span />
                <span>Wed</span>
                <span />
                <span>Fri</span>
                <span />
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((cell) => (
                    <div
                      key={cell.date}
                      className={`size-[11px] rounded-[2px] transition-transform duration-100 ${
                        LEVEL_STYLES[cell.level]
                      } ${
                        hovered?.cell.date === cell.date
                          ? "z-10 scale-125 ring-1 ring-foreground/50"
                          : ""
                      }`}
                      onMouseEnter={(e) => {
                        const rect = (
                          e.target as HTMLElement
                        ).getBoundingClientRect();
                        const parent = (
                          e.currentTarget as HTMLElement
                        )
                          .closest(".relative")
                          ?.getBoundingClientRect();
                        if (parent) {
                          setHovered({
                            cell,
                            x: rect.left - parent.left + rect.width / 2,
                            y: rect.top - parent.top,
                          });
                        }
                      }}
                      onMouseLeave={() => setHovered(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {hovered && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-lg"
            style={{ left: hovered.x, top: hovered.y }}
          >
            <span className="font-medium">
              {hovered.cell.count === 0 ? "No" : hovered.cell.count}{" "}
              contribution{hovered.cell.count === 1 ? "" : "s"}
            </span>
            <span className="text-muted-foreground"> on </span>
            <span className="text-muted-foreground">
              {new Date(hovered.cell.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span>Less</span>
          {LEVEL_STYLES.map((style, i) => (
            <div key={i} className={`size-[11px] rounded-[2px] ${style}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
