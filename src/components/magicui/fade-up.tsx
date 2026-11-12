import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the element starts fading in. */
  delay?: number;
}

/**
 * Server-rendered reveal wrapper.
 *
 * The animation itself lives in CSS (`globals.css`), so this component ships
 * zero JavaScript and the content is part of the initial HTML. It replaces
 * the JS-driven `BlurFade` on the marketing pages, where `opacity: 0` was
 * painted until hydration finished.
 */
export default function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
  return (
    <div
      className={cn("fade-up", className)}
      style={{ "--fade-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
