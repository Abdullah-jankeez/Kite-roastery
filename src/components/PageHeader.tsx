"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import FloatingBeans from "@/components/FloatingBeans";

type Props = {
  title: string;
  subtitle?: string;
  /** Accent color for the slogan/strip, defaults to brand teal */
  accent?: string;
  /** Optional children rendered below subtitle (e.g. CTA) */
  children?: ReactNode;
  /** Bean density */
  beans?: number;
};

/**
 * Shared dark animated hero header used at the top of every sub-page.
 * Adds: living radial gradient, grain, floating beans, brand palette strip,
 * and a subtle scale-on-mount animation for the title.
 */
export default function PageHeader({
  title,
  subtitle,
  accent = "#91d3c7",
  children,
  beans = 10,
}: Props) {
  return (
    <section
      className="relative py-24 px-4 text-center overflow-hidden bg-grain"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #4a4a48 0%, #383836 55%, #2b2b2a 100%)",
      }}
    >
      <FloatingBeans count={beans} color="rgba(253, 212, 81, 0.12)" />

      <div className="relative max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white"
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
