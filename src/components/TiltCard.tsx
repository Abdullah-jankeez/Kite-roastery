"use client";
import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  /** Max tilt in degrees */
  maxTilt?: number;
};

/**
 * Adds a 3D mouse-following tilt + glow effect to its children.
 * Tracks cursor position over the element and tilts the card on X/Y axes,
 * while also moving a soft glow towards the cursor.
 */
export default function TiltCard({
  children,
  className = "",
  glowColor = "rgba(145, 211, 199, 0.35)",
  maxTilt = 8,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Raw cursor position (normalized -0.5 .. 0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring smoothing so tilt feels organic
  const sx = useSpring(mx, { stiffness: 200, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 200, damping: 20, mass: 0.4 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);

  // Glow follows cursor
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={`relative ${className}`}
    >
      {/* Cursor-following glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 60%)`,
          // re-bind the gradient by using a CSS variable that updates each frame
          ["--gx" as never]: glowX,
          ["--gy" as never]: glowY,
        }}
      />
      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
