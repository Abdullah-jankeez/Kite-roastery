"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

type Category = "all" | Product["category"];

export default function ShopPage() {
  const t = useTranslations("shop");
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  const filters: { key: Category; label: string; color: string }[] = [
    { key: "all",          label: t("filterAll"),   color: "#383836" },
    { key: "beans",        label: t("filterBeans"), color: "#91d3c7" },
    { key: "tools",        label: t("filterTools"), color: "#e79a3d" },
    { key: "subscription", label: t("filterSubs"),  color: "#fdd451" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      {/* Sticky filter tabs — animated underline pill */}
      <div className="sticky top-[72px] z-30 bg-cream/95 backdrop-blur-md border-b border-gray-200 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {filters.map(({ key, label, color }) => {
            const isActive = active === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActive(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors"
                style={{
                  color: isActive ? "#fdd451" : "#383836",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-filter"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: color === "#383836" ? "#383836" : "#383836" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
                {/* Color dot indicator */}
                {key !== "all" && (
                  <span
                    className="relative inline-block w-2 h-2 rounded-full ms-2"
                    style={{ backgroundColor: color }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Grid — animated layout when filter changes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="h-full"
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-20">No products in this category.</p>
        )}
      </div>
    </div>
  );
}
