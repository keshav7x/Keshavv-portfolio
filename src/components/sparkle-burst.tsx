"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide sparkle burst micro-interaction.
 *
 * A single delegated listener set on the document covers every click
 * anywhere on the page, so no component has to opt in.
 *
 * The burst is driven by `pointerdown` / `pointerup` / `keydown` only — never
 * by `click` — so a single interaction can never produce two bursts, and the
 * pointer coordinates are exact by construction.
 *
 * Particles are created and removed imperatively, so React never re-renders.
 */

/** Form controls and editable regions never trigger a burst. */
const EXCLUDED_SELECTOR = [
  "input",
  "textarea",
  "select",
  "option",
  "[contenteditable='true']",
  "[contenteditable='']",
  "[data-no-sparkle]",
].join(", ");

/** Elements that can be activated by the keyboard. */
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  "[role='button']",
  "[role='link']",
  "[role='tab']",
  "[role='menuitem']",
  "[role='option']",
  "[role='switch']",
].join(", ");

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Particles per burst. */
const PARTICLE_COUNT = { min: 4, max: 7 };

type Shape = "star" | "dot" | "diamond";

/** Particle size ranges in px — deliberately tiny (3–7px). */
const SHAPE_SIZES: Record<Shape, [number, number]> = {
  star: [5, 7],
  dot: [3, 4],
  diamond: [4, 5],
};

/**
 * Weighted shape pool — repeats encode the weighting.
 * The four-point star leads every burst, the rest scatter around it.
 */
const SHAPE_POOL: Shape[] = [
  "star",
  "star",
  "star",
  "star",
  "dot",
  "dot",
  "dot",
  "diamond",
  "diamond",
];

/** Shapes that read better with a little spin. */
const SPINNING_SHAPES: Shape[] = ["star", "diamond"];

/** Total effect window stays inside the 250–400ms budget. */
const DURATION = { min: 250, max: 320 };
const DELAY = { min: 0, max: 24 };

/** How far particles travel from the interaction point, in px. */
const TRAVEL = { min: 6, max: 16 };

const MAX_LIVE_PARTICLES = 60;
const TOUCH_MOVE_TOLERANCE = 12;

/**
 * Weighted palette: mostly muted blue/white with occasional rose accents.
 * Repeats encode the weighting.
 */
const PALETTE: string[] = [
  "var(--sparkle-mist)",
  "var(--sparkle-mist)",
  "var(--sparkle-mist)",
  "var(--sparkle-chalk)",
  "var(--sparkle-chalk)",
  "var(--sparkle-blue)",
  "var(--sparkle-blue)",
  "var(--sparkle-blue-soft)",
  "var(--sparkle-rose)",
  "var(--sparkle-rose-soft)",
];

interface Gesture {
  x: number;
  y: number;
  particles: HTMLElement[];
  selectionWasCollapsed: boolean;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomInt(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

export default function SparkleBurst() {
  const layerRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<Gesture | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const isExcluded = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest(EXCLUDED_SELECTOR);

    const spawn = (x: number, y: number): HTMLElement[] => {
      const particles: HTMLElement[] = [];
      if (prefersReducedMotion()) return particles;

      const count = randomInt(PARTICLE_COUNT.min, PARTICLE_COUNT.max);
      const baseAngle = Math.random() * Math.PI * 2;

      for (let index = 0; index < count; index++) {
        // Always lead with the signature four-point star.
        const shape: Shape = index === 0 ? "star" : pick<Shape>(SHAPE_POOL);

        const [minSize, maxSize] = SHAPE_SIZES[shape];
        const size = randomBetween(minSize, maxSize);

        // Particles fan out in slightly different directions.
        const angle =
          baseAngle +
          (Math.PI * 2 * index) / count +
          randomBetween(-0.4, 0.4);
        const distance = randomBetween(TRAVEL.min, TRAVEL.max);

        const duration = randomBetween(DURATION.min, DURATION.max);
        const delay = randomBetween(DELAY.min, DELAY.max);

        const particle = document.createElement("i");
        particle.className = "sparkle-particle";
        particle.dataset.shape = shape;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;
        particle.style.setProperty(
          "--sparkle-tx",
          `${Math.cos(angle) * distance}px`
        );
        particle.style.setProperty(
          "--sparkle-ty",
          `${Math.sin(angle) * distance}px`
        );
        particle.style.setProperty(
          "--sparkle-scale",
          randomBetween(0.85, 1.3).toFixed(2)
        );
        if (SPINNING_SHAPES.includes(shape)) {
          particle.style.setProperty(
            "--sparkle-rot",
            `${randomBetween(-25, 25).toFixed(1)}deg`
          );
        }
        particle.style.setProperty("--sparkle-duration", `${duration}ms`);
        particle.style.setProperty("--sparkle-delay", `${delay}ms`);
        particle.style.setProperty(
          "--sparkle-opacity",
          randomBetween(0.5, 0.9).toFixed(2)
        );
        particle.style.setProperty("--sparkle-color", pick(PALETTE));

        const remove = () => particle.remove();
        particle.addEventListener("animationend", remove, { once: true });
        // Safety net in case the animation never fires (e.g. display changes).
        window.setTimeout(remove, duration + delay + 150);

        layer.appendChild(particle);
        particles.push(particle);
      }

      // Keep the DOM bounded if interactions happen very rapidly.
      while (layer.childElementCount > MAX_LIVE_PARTICLES) {
        layer.firstElementChild?.remove();
      }

      return particles;
    };

    const discard = (particles: HTMLElement[]) => {
      particles.forEach((particle) => particle.remove());
    };

    const hasTextSelection = () => {
      const selection = window.getSelection();
      return !!selection && !selection.isCollapsed;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (isExcluded(event.target)) {
        gestureRef.current = null;
        return;
      }

      const isTouch = event.pointerType === "touch";

      gestureRef.current = {
        x: event.clientX,
        y: event.clientY,
        particles: [],
        selectionWasCollapsed: !hasTextSelection(),
      };

      // Mouse and pen respond instantly on press. Touch waits for the
      // release so that a scrolling gesture never leaves a stray burst.
      if (!isTouch) {
        gestureRef.current.particles = spawn(event.clientX, event.clientY);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      const gesture = gestureRef.current;
      gestureRef.current = null;

      if (!gesture) return;

      // The gesture turned into a text selection — that was not a click.
      if (gesture.selectionWasCollapsed && hasTextSelection()) {
        discard(gesture.particles);
        return;
      }

      if (event.pointerType !== "touch") return;

      const moved = Math.hypot(
        event.clientX - gesture.x,
        event.clientY - gesture.y
      );
      if (moved > TOUCH_MOVE_TOLERANCE) return;

      spawn(event.clientX, event.clientY);
    };

    const onPointerCancel = () => {
      const gesture = gestureRef.current;
      gestureRef.current = null;
      if (gesture) discard(gesture.particles);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      const isEnter = event.key === "Enter";
      const isSpace = event.key === " " || event.key === "Spacebar";
      if (!isEnter && !isSpace) return;
      if (isExcluded(event.target)) return;

      const element =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(INTERACTIVE_SELECTOR)
          : null;
      if (!element) return;

      // Space scrolls the page instead of activating links.
      if (isSpace && element.tagName === "A") return;

      const rect = element.getBoundingClientRect();
      if (!rect.width && !rect.height) return;

      spawn(rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerup", onPointerUp, true);
    document.addEventListener("pointercancel", onPointerCancel, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerup", onPointerUp, true);
      document.removeEventListener("pointercancel", onPointerCancel, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return (
    <div ref={layerRef} className="sparkle-layer" aria-hidden="true" />
  );
}
