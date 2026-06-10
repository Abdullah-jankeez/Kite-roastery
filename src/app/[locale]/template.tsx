"use client";

import { motion } from "framer-motion";

/**
 * Page transition: every route change re-mounts this template, so each page
 * enters with a soft fade + slide-up. Kept short (350ms) so navigation
 * still feels instant.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
