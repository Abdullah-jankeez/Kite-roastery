"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/lib/CartContext";
import Icon from "@/components/Icon";

/**
 * Small confirmation toast shown whenever a product is added to the cart.
 * Slides up near the bottom centre, auto-dismisses after 2.5s, links to the cart.
 */
export default function CartToast() {
  const { lastAdded } = useCart();
  const locale = useLocale();
  const isAr = locale === "ar";
  const nav = useTranslations("nav");
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [lastAdded]);

  const name = lastAdded
    ? isAr
      ? lastAdded.product.nameAr
      : lastAdded.product.nameEn
    : "";

  return (
    <AnimatePresence>
      {visible && lastAdded && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-md"
        >
          <Link
            href={`/${locale}/cart`}
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl glass-card border border-black/5"
            style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
          >
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#96d2b2" }}
            >
              <Icon name="check" className="w-5 h-5 text-[#383836]" strokeWidth={2.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-semibold truncate" style={{ color: "#383836" }}>
                {name}
              </span>
              <span className="block text-xs text-gray-500">
                {isAr ? "أُضيف إلى السلة — اضغط لعرض السلة" : "Added to cart — tap to view"}
              </span>
            </span>
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#383836", color: "#fdd451" }}
            >
              {nav("cart")}
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
