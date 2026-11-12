import { cn } from "@/lib/utils";

export function BlogMascot({ className }: { className?: string }) {
  return (
    <div className={cn("mascot", className)}>
      <svg
        viewBox="0 0 240 320"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mascot-svg"
        role="img"
        aria-label="Hand-drawn manga girl giving a thumbs up"
      >
        <g className="mascot-float">
          <g className="mascot-body">
            <path d="M104 138c0 10 2 16 6 20" />
            <path d="M134 136c0 10-2 16-5 20" />
            <path d="M76 172c4-17 22-26 44-26s40 9 44 26" />
            <path d="M76 172c-6 18-6 34-2 48" />
            <path d="M164 172c6 18 6 34 2 48" />
            <path d="M74 220c18 8 74 8 92 0" />
            <path d="M108 158c-1 10-2 18-2 26" />
            <path d="M132 156c1 10 2 18 2 26" />
            <path d="M100 176c-4 12-5 26-4 38" />
            <path d="M142 178c3 12 4 24 3 36" />
          </g>

          <g className="mascot-legs">
            <path d="M96 216c-12 8-28 16-36 28-5 8 0 16 10 14" />
            <path d="M70 258c14 6 30 6 42 0" />
            <path d="M144 216c12 8 28 16 36 28 5 8 0 16-10 14" />
            <path d="M170 258c-14 6-30 6-42 0" />
            <path d="M104 258c-6 6-2 14 6 12" />
            <path d="M134 258c6 6 2 14-6 12" />
          </g>

          <g className="mascot-arm-rest">
            <path d="M78 174c-12 12-18 32-14 48" />
            <path d="M90 182c-8 10-12 24-10 36" />
            <path d="M64 222c-2 8 4 14 12 12" />
          </g>

          <g className="mascot-arm-thumbs">
            <path d="M158 170c18 2 34 14 39 30 4-14 4-30 0-44-2-6-9-8-12-4-3 4-1 10 1 16 4 10 4 20 0 28-6-8-18-14-32-16" />
            <path d="M178 146c-3-8 1-16 8-16s11 6 10 13c-1 7-6 11-12 10" />
            <path d="M184 132c-2-10 1-20 7-20s6 4 5 9c-2 7-5 12-7 15" />
            <path d="M186 116c1 4 4 6 7 5" />
          </g>

          <g className="mascot-head">
            <g className="mascot-hair">
              <path d="M66 96c-8-22-8-50 6-66C84 16 102 8 118 14c14-10 34-4 40 12 14 8 18 32 12 54-3 12-8 22-14 30l8 18c-16-6-30-10-44-10s-28 4-44 12l8-18c-8-4-14-9-18-16Z" />
              <path d="M78 70c-2-22 10-42 28-50-10 14-14 30-12 46-4-10-10-12-16 4Z" />
              <path d="M100 62c-2-20 8-36 24-42-12 14-16 28-14 42-4-8-8-10-10 0Z" />
              <path d="M124 58c2-18 16-32 30-32-14 10-20 22-20 36-4-8-8-10-10-4Z" />
              <path d="M90 40c14-10 32-14 48-10" />
              <path d="M72 60c-8 16-10 36-6 52 2 8 8 12 12 8-6-10-8-28-4-44" />
              <path d="M166 56c8 18 10 38 6 56-2 10-10 14-14 8 8-12 10-30 6-46" />
              <path d="M116 22c6-16 24-20 32-12 6 6 0 16-10 18" />
              <path d="M64 44c-6-10-4-18 2-24" />
              <path d="M152 22c8-6 16-4 20 4" />
              <path d="M168 96c8 0 14 6 14 16" />
              <path d="M70 100c-8 4-12 12-10 22" />
            </g>

            <path d="M78 72c0 28 16 54 42 72 26-18 42-44 42-72" />

            <g className="mascot-face">
              <path d="M88 94c4-16 20-20 28-10" strokeWidth="3.2" />
              <path d="M92 102c6 6 16 4 20-2" strokeWidth="2" />
              <path
                d="M103 78a12 14 0 1 0 0 28 12 14 0 1 0 0-28Zm-3.5 3.5a4.5 5 0 1 0 0 10 4.5 5 0 1 0 0-10Zm9 11a2 2 0 1 0 0 4 2 2 0 1 0 0-4Z"
                fill="currentColor"
                fillRule="evenodd"
                stroke="none"
              />
              <path d="M126 88c4-14 20-16 27-6" strokeWidth="3.2" />
              <path d="M130 96c6 6 16 4 20-2" strokeWidth="2" />
              <path
                d="M140 76a10.5 12 0 1 0 0 24 10.5 12 0 1 0 0-24Zm-3 3a4 4.5 0 1 0 0 9 4 4.5 0 1 0 0-9Z"
                fill="currentColor"
                fillRule="evenodd"
                stroke="none"
              />
              <path d="M88 72c6-6 16-7 23-4" />
              <path d="M128 64c7-7 18-7 24-3" />
              <path d="M118 104c3 3 4 4 6 4" strokeWidth="2" />
              <path d="M108 116c8 6 20 4 24-4" />
              <path d="M132 112c3 1 4 3 4 5" strokeWidth="2" />
              <path d="M86 108l8 3" strokeWidth="2" />
              <path d="M148 106l8-3" strokeWidth="2" />
              <path d="M92 112l6 2" strokeWidth="1.6" />
              <path d="M146 110l6-2" strokeWidth="1.6" />
            </g>
          </g>

          <g className="mascot-spark" strokeWidth="2.2">
            <path d="M204 62c1 7 3 9 10 10-7 1-9 3-10 10-1-7-3-9-10-10 7-1 9-3 10-10Z" />
            <path d="M58 30c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z" />
            <path d="M196 104c1 4 2 5 6 6-4 1-5 2-6 6-1-4-2-5-6-6 4-1 5-2 6-6Z" />
          </g>
        </g>
      </svg>
    </div>
  );
}
