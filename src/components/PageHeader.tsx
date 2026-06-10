"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import FloatingBeans from "@/components/FloatingBeans";

type Props = {
  title: string;
  subtitle?: string;
  /** Accent color for the subtitle, defaults to deep brand teal (readable on white) */
  accent?: string;
  /** Optional children rendered below subtitle (e.g. CTA) */
  children?: ReactNode;
  /** Bean density */
  beans?: number;
};

/**
 * Shared light animated hero header used at the top of every sub-page.
 * White-dominant per brand direction: soft cream radial, charcoal serif title,
 * subtle floating beans, brand palette strip.
 */
export default function PageHeader({
  title,
  subtitle,
  accent = "#3f9c8b",
  children,
  beans = 10,
}: Props) {
  return (
    <section
      className="relative py-24 px-4 text-center overflow-hidden bg-grain"
      style={{
        background:
          "radial-gradient(ellipse at 30% 15%, #ffffff 0%, #faf9f7 55%, #f1efe9 100%)",
      }}
    >
      {/* Soft brand-colour washes */}
      <div
        aria-hidden
        className="absolute -top-24 -start-24 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "#91d3c7" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -end-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "#fdd451" }}
      />

      <FloatingBeans count={beans} color="rgba(56, 56, 54, 0.08)" />

      <div className="relative max-w-3xl mx-auto">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-semibold tracking-tight mb-4"
          style={{ color: "#383836" }}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-lg max-w-xl mx-auto"
            style={{ color: accent }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Brand palette strip */}
        <motion.div
          className="flex justify-center gap-1 mt-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {["#91d3c7", "#f179af", "#fdd451", "#e79a3d", "#303895"].map((c, i) => (
            <motion.span
              key={c}
              className="h-1.5 w-8 rounded-full"
              style={{ backgroundColor: c }}
              animate={{ scaleY: [1, 1.8, 1] }}
              transition={{
                duration: 1.4,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
