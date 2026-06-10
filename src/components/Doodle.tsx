"use client";

import { motion } from "framer-motion";

export type DoodleName = "kite" | "steam" | "swirlArrow" | "beans";

/**
 * Hand-drawn brand doodles (per the Kite brand book, p.14) that draw
 * themselves in with an SVG line animation when scrolled into view.
 */
const PATHS: Record<DoodleName, { viewBox: string; d: string[] }> = {
  // Diamond kite with a cross spar and a wavy tail
  kite: {
    viewBox: "0 0 120 160",
    d: [
      "M60 8 L102 52 L60 96 L18 52 Z",
      "M60 8 L60 96 M18 52 L102 52",
      "M60 96 C 52 112, 72 118, 62 132 C 54 143, 70 148, 64 158",
    ],
  },
  // Three rising steam squiggles
  steam: {
    viewBox: "0 0 100 90",
    d: [
      "M22 84 C 14 68, 32 60, 24 44 C 17 30, 32 22, 27 8",
      "M52 88 C 44 70, 62 62, 54 44 C 46 28, 62 20, 56 4",
      "M82 84 C 74 68, 92 60, 84 44 C 77 30, 92 22, 87 8",
    ],
  },
  // Curly arrow pointing down-right
  swirlArrow: {
    viewBox: "0 0 140 100",
    d: [
      "M10 18 C 50 2, 96 14, 102 44 C 106 66, 86 76, 74 66 C 64 57, 76 44, 92 50 C 110 57, 118 74, 120 86",
      "M108 76 L121 88 L130 72",
    ],
  },
  // Two coffee beans
  beans: {
    viewBox: "0 0 120 80",
    d: [
      "M34 16 C 50 8, 62 22, 56 40 C 50 58, 28 62, 20 48 C 13 36, 20 22, 34 16 Z",
      "M37 20 C 31 30, 35 44, 30 54",
      "M88 30 C 103 26, 112 42, 103 56 C 94 70, 73 68, 69 53 C 66 41, 75 33, 88 30 Z",
      "M89 34 C 84 42, 88 54, 82 62",
    ],
  },
};

type Props = {
  name: DoodleName;
  className?: string;
  color?: string;
  strokeWidth?: number;
  /** seconds for the full draw */
  duration?: number;
  delay?: number;
};

export default function Doodle({
  name,
  className = "",
  color = "#383836",
  strokeWidth = 3,
  duration = 1.4,
  delay = 0,
}: Props) {
  const doodle = PATHS[name];
  return (
    <svg
      viewBox={doodle.viewBox}
      fill="none"
      className={className}
      aria-hidden
    >
      {doodle.d.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: duration * 0.7,
            delay: delay + i * (duration * 0.25),
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
