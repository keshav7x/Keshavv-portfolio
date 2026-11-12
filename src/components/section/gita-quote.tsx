"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const LINE_1 = "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।";
const LINE_2 = "मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥";
const TRANSLATION =
  "You have the right to perform your actions, but never to the fruits of those actions.";

interface GitaQuoteProps {
  className?: string;
}

/**
 * Bhagavad Gita 2.47 — a quiet editorial pause before the contact section.
 *
 * Sequenced reveal driven by `useInView` (once), mirroring the house
 * BlurFade pattern: opacity / y / blur only, `easeOut`, short durations.
 * Decorative gold details read from the theme-scoped `--gita-gold` var.
 * With `prefers-reduced-motion`, the sequence is skipped entirely and the
 * verse renders statically.
 */
export default function GitaQuote({ className }: GitaQuoteProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" as never });
  const reduceMotion = useReducedMotion();

  const revealed = reduceMotion || isInView;

  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut", delay },
    },
  });

  const drawLine: Variants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.9 },
    },
  };

  return (
    <section
      ref={ref}
      aria-label="Verse from the Bhagavad Gita"
      className={cn("gita-quote border-y border-border", className)}
    >
      <figure className="mx-auto w-full max-w-2xl px-6 py-20 text-center sm:py-28">
        <motion.span
          aria-hidden="true"
          initial={revealed ? false : "hidden"}
          animate={revealed ? "visible" : "hidden"}
          variants={fadeUp(0)}
          className="mx-auto mb-10 block size-1.5 rotate-45 bg-[var(--gita-gold)]"
        />

        <blockquote>
          <motion.p
            lang="sa"
            initial={revealed ? false : "hidden"}
            animate={revealed ? "visible" : "hidden"}
            variants={fadeUp(0.15)}
            className="font-gita text-foreground text-2xl leading-[1.9] sm:text-3xl"
          >
            {LINE_1}
          </motion.p>
          <motion.p
            lang="sa"
            initial={revealed ? false : "hidden"}
            animate={revealed ? "visible" : "hidden"}
            variants={fadeUp(0.5)}
            className="font-gita text-foreground text-2xl leading-[1.9] sm:text-3xl"
          >
            {LINE_2}
          </motion.p>
        </blockquote>

        <motion.span
          aria-hidden="true"
          initial={revealed ? false : "hidden"}
          animate={revealed ? "visible" : "hidden"}
          variants={drawLine}
          className="mx-auto mt-10 mb-8 block h-px w-20 bg-[var(--gita-gold)]"
        />

        <blockquote>
          <motion.p
            lang="en"
            initial={revealed ? false : "hidden"}
            animate={revealed ? "visible" : "hidden"}
            variants={fadeUp(1.3)}
            className="mx-auto max-w-md text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg"
          >
            &ldquo;{TRANSLATION}&rdquo;
          </motion.p>
        </blockquote>

        <motion.figcaption
          initial={revealed ? false : "hidden"}
          animate={revealed ? "visible" : "hidden"}
          variants={fadeUp(1.7)}
          className="mt-8 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase"
        >
          Bhagavad Gita — 2.47
        </motion.figcaption>
      </figure>
    </section>
  );
}
