"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Bean = {
  x: number;       // starting % of width
  delay: number;
  duration: number;
  size: number;    // px
  drift: number;   // horizontal drift in px
  rotate: number;
};

/**
 * Floating coffee-bean SVG particles. Render absolutely inside a relative parent.
 * Subtle, decorative — pointer-events disabled. Client-only to avoid
 * SSR/CSR number-precision mismatches with framer-motion.
 */
export default function FloatingBeans({
  count = 14,
  color = "rgba(253, 212, 81, 0.18)", // mustard, low opacity
}: { count?: number; color?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const beans = useMemo<Bean[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Deterministic pseudo-random, rounded to 2 decimals to avoid float drift
      const r = (n: number) =>
        Math.round((Math.abs(Math.sin((i + 1) * n * 9.13)) % 1) * 100) / 100;
      return {
        x: r(1.7) * 100,
        delay: r(2.3) * 8,
        duration: 14 + r(3.1) * 16,
        size: 12 + r(4.5) * 22,
        drift: Math.round((r(5.7) - 0.5) * 200),
        rotate: Math.round(r(6.3) * 360),
      };
    });
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {beans.map((b, i) => (
        <motion.svg
          key={i}
          aria-hidden
          viewBox="0 0 24 32"
          width={b.size}
          height={(b.size * 32) / 24}
          className="absolute"
          style={{ left: `${b.x}%`, top: "-10%", color }}
          initial={{ y: "-10vh", x: 0, rotate: b.rotate, opacity: 0 }}
          animate={{
            y: "120vh",
            x: b.drift,
            rotate: b.rotate + 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
          fill="currentColor"
        >
          <ellipse cx="12" cy="16" rx="9" ry="14" />
          <path
            d="M12 4 C 17 10, 17 22, 12 28 C 7 22, 7 10, 12 4 Z"
            fill="rgba(0,0,0,0.18)"
          />
        </motion.svg>
      ))}
    </div>
  );
}
