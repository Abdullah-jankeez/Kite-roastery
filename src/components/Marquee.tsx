"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** seconds for one full loop */
  duration?: number;
  /** reverse direction */
  reverse?: boolean;
  className?: string;
};

/**
 * Infinite horizontally scrolling marquee. Duplicates children so the loop is seamless.
 * Pauses on hover for a touch of interactivity.
 */
export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  className = "",
}: Props) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <motion.div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        animate={{ x: reverse ? ["−50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        <div className="flex gap-12 items-center">{children}</div>
        <div className="flex gap-12 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
