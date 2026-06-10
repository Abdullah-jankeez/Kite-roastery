"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type Props = {
  /** Target number, e.g. 89 or 84.5 */
  value: number;
  /** Decimal places to render (auto-detected from value if omitted) */
  decimals?: number;
  /** Text rendered after the number, e.g. " / 100" */
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Animates a number from 0 → value when it scrolls into view. */
export default function CountUp({
  value,
  decimals,
  suffix = "",
  duration = 1.4,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");
  const dp = decimals ?? (Number.isInteger(value) ? 0 : 1);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setDisplay(v.toFixed(dp)),
    });
    return () => controls.stop();
  }, [inView, value, duration, dp]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
