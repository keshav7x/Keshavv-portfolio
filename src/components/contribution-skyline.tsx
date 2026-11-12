"use client";

import * as React from "react";

export type ContributionDay = { date: string; count: number };

const COLORS = {
  github: { light: ["#c6e48b", "#7bc96f", "#239a3b", "#196127"], dark: ["#0e4429", "#006d32", "#26a641", "#39d353"] },
  halloween: {
    light: ["#ffee4a", "#ffc501", "#fe9600", "#b33c00"],
    dark: ["#631c03", "#bd561d", "#fa7a18", "#fddf68"],
  },
  ocean: {
    light: ["#b8e3f5", "#6ec3eb", "#2a8fd1", "#0b4f8a"],
    dark: ["#0c2d4a", "#12508a", "#2a88d8", "#7cc7ff"],
  },
  ember: {
    light: ["#fde2c4", "#fbad6e", "#f06b3a", "#b3261e"],
    dark: ["#4a1a10", "#8f2f16", "#e0572a", "#ffa46b"],
  },
  grape: {
    light: ["#e4d4fb", "#b794f4", "#805ad5", "#44337a"],
    dark: ["#2d1f4f", "#553c9a", "#8b5cf6", "#c4b5fd"],
  },
  mono: {
    light: ["#d4d4d4", "#a3a3a3", "#525252", "#171717"],
    dark: ["#333333", "#5c5c5c", "#a3a3a3", "#fafafa"],
  },
};

type Palette = {
  light: string[];
  dark: string[];
  accent?: string;
};

type PaletteInput = keyof typeof COLORS | Palette;

type ResolvedPalette = { light: string[]; dark: string[]; accent: string };

function resolvePalette(palette: PaletteInput): ResolvedPalette {
  if (typeof palette === "string") {
    const p = COLORS[palette] ?? COLORS.github;
    return { ...p, accent: p.light[2] };
  }
  if (palette.light && palette.dark) {
    return {
      light: palette.light,
      dark: palette.dark,
      accent: palette.accent ?? palette.light[2],
    };
  }
  const p = COLORS.github;
  return { ...p, accent: p.light[2] };
}

export interface ContributionSkylineProps {
  data?: ContributionDay[];
  endDate?: string | Date;
  view?: "2d" | "3d";
  defaultView?: "2d" | "3d";
  onViewChange?: (view: "2d" | "3d") => void;
  palette?: PaletteInput;
  title?: React.ReactNode;
  unit?: string;
  unitPlural?: string;
  heightScale?: number;
  duration?: number;
  weekStart?: 0 | 1;
  orbit?: boolean;
  showStats?: boolean;
  showLegend?: boolean;
  showToggle?: boolean;
  footer?: React.ReactNode;
  locale?: string;
  seed?: number;
  onCellClick?: (day: ContributionDay) => void;
  className?: string;
}

// ... rest of the component (generateContributions, buildGrid, computeStats stay the same)
// ... ContributionSkyline component stays the same

function generateContributions(
  endMs: number,
  seed = 7,
  days = 371
): ContributionDay[] {
  const DAY_MS = 86400000;
  const rng = (seed: number) => {
    let a = seed >>> 0;
    return (): number => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const r = rng(seed);
  const bursts = Array.from({ length: 4 }, () => ({
    at: r(),
    width: 0.035 + r() * 0.07,
    gain: 0.6 + r() * 1.1,
  }));
  const out: ContributionDay[] = [];
  let mood = 0.5;
  for (let i = 0; i < days; i++) {
    const ms = endMs - (days - 1 - i) * DAY_MS;
    const x = i / Math.max(1, days - 1);
    const dow = new Date(ms).getUTCDay();
    const weekend = dow === 0 || dow === 6;
    let heat = 0.2;
    for (const b of bursts) {
      heat += b.gain * Math.exp(-((x - b.at) ** 2) / (2 * b.width ** 2));
    }
    mood = mood * 0.85 + r() * 0.15;
    heat *= 0.55 + mood * 0.9;
    const pActive = Math.min(0.94, (weekend ? 0.22 : 0.5) + heat * 0.4);
    let count = 0;
    if (r() < pActive) {
      count = 1 + Math.floor(-Math.log(1 - r()) * (1.2 + heat * 7) * (weekend ? 0.5 : 1));
    }
    if (r() < 0.01) {
      count += 18 + Math.floor(r() * 24);
    }
    out.push({ date: new Date(ms).toISOString().slice(0, 10), count });
  }
  return out;
}

function buildGrid(
  data: ContributionDay[],
  endMs: number,
  weekStart = 0
) {
  const counts = new Map<string, number>();
  for (const d of data) {
    if (!d || typeof d.date !== "string") continue;
    const ms = new Date(d.date).getTime();
    const c = Number(d.count);
    if (!Number.isFinite(ms) || !(c > 0) || !Number.isFinite(c)) continue;
    const k = new Date(ms).toISOString().slice(0, 10);
    counts.set(k, (counts.get(k) ?? 0) + c);
  }
  let start = endMs - 364 * 86400000;
  const startDate = new Date(start);
  start -= ((startDate.getUTCDay() - weekStart + 7) % 7) * 86400000;
  const cells: any[] = [];
  for (let ms = start, i = 0; ms <= endMs; ms += 86400000, i++) {
    const date = new Date(ms).toISOString().slice(0, 10);
    cells.push({
      date,
      count: counts.get(date) ?? 0,
      level: 0,
      week: Math.floor(i / 7),
      day: i % 7,
    });
  }
  const nz = cells.map((c) => c.count).filter((c) => c > 0).sort((a, b) => a - b);
  const busy = nz.length ? nz[Math.floor(0.95 * (nz.length - 1))] : 0;
  for (const c of cells) {
    if (c.count <= 0) {
      c.level = 0;
    } else if (busy <= 0) {
      c.level = 4;
    } else {
      c.level = 1 + Math.min(3, Math.floor((c.count / busy) * 4));
    }
  }
  return {
    cells,
    weeks: cells.length ? cells[cells.length - 1].week + 1 : 0,
    max: nz.length ? nz[nz.length - 1] : 0,
  };
}

function computeStats(cells: any[]) {
  let total = 0;
  let best = 0;
  let bestDate: string | null = null;
  let run = 0;
  let runStart: string | null = null;
  let longest: { days: number; start: string | null; end: string | null } = {
    days: 0,
    start: null,
    end: null,
  };

  for (const c of cells) {
    total += c.count;
    if (c.count > best) {
      best = c.count;
      bestDate = c.date;
    }
    if (c.count > 0) {
      if (run === 0) runStart = c.date;
      run++;
      if (run > longest.days) {
        longest = { days: run, start: runStart, end: c.date };
      }
    } else {
      run = 0;
    }
  }

  let currentDays = 0;
  let currentStart: string | null = null;
  let currentEnd: string | null = null;
  for (let i = cells.length - 1; i >= 0; i--) {
    const c = cells[i];
    if (c.count > 0) {
      if (currentDays === 0) currentStart = c.date;
      currentDays++;
      currentEnd = c.date;
    } else if (currentDays > 0) {
      break;
    }
  }

  return {
    total,
    first: cells.length ? cells[0].date : null,
    last: cells.length ? cells[cells.length - 1].date : null,
    busiest: { count: best, date: bestDate },
    longest,
    current: { days: currentDays, start: currentStart, end: currentEnd },
  };
}

function ContributionSkyline({
  data,
  endDate,
  view: viewProp,
  defaultView = "3d",
  onViewChange,
  palette = "github",
  title,
  unit = "contribution",
  unitPlural,
  heightScale = 1,
  duration = 1300,
  weekStart = 0,
  orbit = true,
  showStats = true,
  showLegend = true,
  showToggle = true,
  footer,
  locale = "en-US",
  seed = 7,
  onCellClick,
  className = "",
}: ContributionSkylineProps) {
  const [fallbackNow] = React.useState(() => Date.now());
  const endKey = endDate == null ? null : new Date(endDate).getTime();
  const model = React.useMemo(() => {
    const dates = (data ?? []).map((d) => new Date(d.date).getTime()).filter(
      (t) => !isNaN(t)
    );
    const end = endKey ?? (dates.length ? Math.max(...dates) : fallbackNow);
    const daysData = data ?? generateContributions(end, seed);
    const grid = buildGrid(daysData, end, weekStart);
    return {
      ...grid,
      stats: computeStats(grid.cells),
    };
  }, [data, endKey, fallbackNow, seed, weekStart]);

  const [innerView, setInnerView] = React.useState<"2d" | "3d">(defaultView);
  const view = viewProp ?? innerView;
  const setView = (v: "2d" | "3d") => {
    if (viewProp === undefined) setInnerView(v);
    onViewChange?.(v);
  };

  const paletteTheme = React.useMemo(() => resolvePalette(palette), [palette]);
  const { dark, light, accent: themeAccent } = paletteTheme;
  const swatches = light;

  const [width, setWidth] = React.useState(0);
  const [active, setActive] = React.useState(-1);
  const [legendLevel, setLegendLevel] = React.useState(-1);
  const [announce, setAnnounce] = React.useState("");

  const rootRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const tipRef = React.useRef<HTMLDivElement>(null);

  const handleRef = (node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
  };

  return (
    <div className={className} style={{ background: "var(--color-background, #fff)", color: "var(--color-foreground, #171717)" }}>
      <header className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3 className="m-0 text-[15px] font-normal leading-snug">
          {title ?? `${model.stats.total} ${unit} in the last year`}
        </h3>
        {showToggle && (
          <div
            role="group"
            aria-label="Chart view"
            className="relative inline-flex rounded-md border p-0.5"
          >
            <span
              aria-hidden="true"
              className="absolute top-0.5 bottom-0.5 left-0.5 w-8 rounded transition-transform duration-500"
              style={{
                background: "var(--color-foreground, #171717)",
                transform: view === "3d" ? "translateX(100%)" : "translateX(0)",
              }}
            />
            {(["2d", "3d"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                aria-label={v === "2d" ? "Flat heat map" : "3D skyline"}
                title={v === "2d" ? "Flat heat map" : "3D skyline"}
                onClick={() => setView(v)}
                className="relative z-10 grid h-7 w-8 cursor-pointer place-items-center rounded border-0 bg-transparent p-0 transition-colors duration-500"
                style={{
                  color: view === v ? "var(--color-background, #ffffff)" : "var(--color-muted-foreground, #737373)",
                }}
              >
                {v === "2d" ? "2D" : "3D"}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="relative pt-3">
        <canvas
          ref={handleRef}
          tabIndex={0}
          role="img"
          aria-label={
            `${model.stats.total} ${unit} between ${
              model.stats.first || "?"
            } and ${model.stats.last || "?"}, shown as a ${
              view === "3d" ? "3D skyline" : "heat map"
            }. Use arrow keys to read individual days.`
          }
          className="block"
          style={{ maxWidth: "none" }}
        />

        {showStats && width >= 560 && (
          <div className="grid grid-cols-2 gap-2 px-3 pt-2 pb-1 sm:px-4 md:grid-cols-4">
            <div>
              <strong>{model.stats.total}</strong> total
            </div>
            <div>
              <strong>{model.stats.busiest.count}</strong> busiest day
            </div>
            <div>
              <strong>{model.stats.longest.days}</strong> longest streak
            </div>
            <div>
              <strong>{model.stats.current.days}</strong> current streak
            </div>
          </div>
        )}

        <div
          ref={tipRef}
          role="tooltip"
          aria-hidden={active < 0}
          className="absolute top-3 left-3 z-10 w-24 p-2 rounded text-sm opacity-0 transition-opacity"
          style={{
            background: "var(--color-foreground, #171717)",
            color: "var(--color-background, #ffffff)",
          }}
        >
          {active >= 0 && model.cells[active]
            ? `${model.cells[active].count} ${unit} on ${new Date(
                model.cells[active].date
              ).toLocaleDateString(locale)}`
            : ""}
        </div>
      </div>
    </div>
  );
}

export default ContributionSkyline;