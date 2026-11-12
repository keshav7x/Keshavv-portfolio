
import { cn } from "@/lib/utils";

const highlights = [
  "Full-stack product development",
  "Backend architecture & API design",
  "Databases, transactions & event-driven systems",
  "Distributed systems & infrastructure",
];

export default function StudentSection() {
  return (
    <section id="experience" className="w-full">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Background
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Experience
          </h2>
        </div>

        <span className="hidden font-mono text-xs text-muted-foreground sm:block">
          01 ENTRY
        </span>
      </div>

      <div className="relative grid grid-cols-1 gap-6 border-t border-border py-8 md:grid-cols-[180px_1fr] md:gap-12">
        {/* Timeline metadata */}
        <div className="flex flex-row items-center justify-between md:flex-col md:items-start md:justify-start md:gap-3">
          <span className="font-mono text-sm text-muted-foreground">
            2025 — Present
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Ongoing
          </span>
        </div>

        {/* Main content */}
        <div className="min-w-0">
          <div className="mb-6">
            <h3 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">
              Student & Independent Builder
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Independent · Software Engineering
            </p>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Balancing academics with building software products. I enjoy
            taking ideas from concept to implementation while exploring
            the engineering decisions that make software reliable,
            maintainable, and scalable.
          </p>

          <div className="mt-8 border-t border-border pt-5">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Areas of focus
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center gap-3 text-sm text-foreground/80"
                >
                  <span className="font-mono text-xs text-muted-foreground/60">
                    0{index + 1}
                  </span>
                  <span
                    className={cn(
                      "transition-colors duration-200",
                      "group-hover:text-foreground"
                    )}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
