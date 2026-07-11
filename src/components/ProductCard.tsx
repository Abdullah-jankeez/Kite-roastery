"use client";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Product, formatIQD } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { motion } from "framer-motion";
import Icon, { IconName } from "@/components/Icon";
import { flyToCart } from "@/components/FlyToCart";

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("shop");
  const cp = useTranslations("coffeePage");
  const locale = useLocale();
  const { addItem } = useCart();
  const isAr = locale === "ar";
  const imgAreaRef = useRef<HTMLDivElement>(null);

  function handleAdd() {
    addItem(product);
    if (product.image && product.image.startsWith("/coffee/")) {
      flyToCart(product.image, imgAreaRef.current);
    }
  }

  const name = isAr ? product.nameAr : product.nameEn;
  const origin = isAr ? product.originAr : product.originEn;
  const roast = isAr ? product.roastAr : product.roastEn;
  const notes = isAr ? product.notesAr : product.notesEn;

  const accent =
    product.category === "beans"
      ? "#91d3c7"
      : product.category === "subscription"
      ? "#fdd451"
      : "#e79a3d";

  const productIcon: IconName =
    product.category === "beans"
      ? "coffee"
      : product.category === "subscription"
      ? "repeat"
      : "beaker";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full"
    >
      {/* Accent top stripe — reveals on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: accent }}
      />

      {/* Image area */}
      <div
        ref={imgAreaRef}
        className="relative h-52 overflow-hidden"
        style={{ backgroundColor: "#dcdddd" }}
      >
        {/* Real product photo when available, else an animated line-icon */}
        {product.image && product.image.startsWith("/coffee/") ? (
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(max-width:640px) 100vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.12, rotate: 4 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            <motion.div
              className="opacity-50"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon name={productIcon} className="w-16 h-16 text-[#383836]" strokeWidth={1.25} />
            </motion.div>
          </motion.div>
        )}

        {/* Color sweep overlay on hover */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 80%, ${accent} 0%, transparent 60%)`,
          }}
        />

        {/* Category badge */}
        <span
          className="absolute top-3 start-3 text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm"
          style={{ backgroundColor: accent, color: "#383836" }}
        >
          {product.category === "beans"
            ? t("filterBeans")
            : product.category === "subscription"
            ? t("filterSubs")
            : t("filterTools")}
        </span>

        {/* "Read the story" reveal — beans only, slides up on hover */}
        {product.category === "beans" && (
          <Link
            href={`/${locale}/coffee/${product.id}`}
            className="absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-white text-xs font-semibold uppercase tracking-widest text-center py-2.5"
            style={{ backgroundColor: "rgba(56,56,54,0.85)", backdropFilter: "blur(4px)" }}
          >
            {cp("readStory")} →
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {product.category === "beans" ? (
          <Link href={`/${locale}/coffee/${product.id}`}>
            <h3
              className="font-bold text-base leading-snug mb-1 transition-colors hover:text-[#91d3c7] cursor-pointer"
              style={{ color: "#383836" }}
            >
              {name}
            </h3>
          </Link>
        ) : (
          <h3 className="font-bold text-base leading-snug mb-1" style={{ color: "#383836" }}>
            {name}
          </h3>
        )}

        {origin && (
          <p className="text-xs text-gray-500 mb-2">
            {t("origin")}: {origin}
            {roast ? ` · ${t("roast")}: ${roast}` : ""}
          </p>
        )}

        {/* Notes area always reserves the same height so all cards stay equal */}
        <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2 min-h-[2.6rem]">
          {notes || " "}
        </p>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <span className="text-lg font-bold" style={{ color: "#383836" }}>
              {formatIQD(product.price)}
            </span>
            {product.weight && (
              <span className="text-xs text-gray-400 ms-1">/ {product.weight}</span>
            )}
          </div>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative overflow-hidden text-sm font-semibold px-4 py-2 rounded-xl"
            style={{ backgroundColor: "#383836", color: "#fdd451" }}
          >
            {/* Sweep highlight on hover */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
              }}
            />
            <span className="relative">{t("addToCart")}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
