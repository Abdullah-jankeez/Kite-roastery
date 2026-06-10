"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brand-teal progress bar fixed to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[80] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #91d3c7, #3f9c8b)",
      }}
    />
  );
}
