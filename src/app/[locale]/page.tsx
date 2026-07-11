"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import FloatingBeans from "@/components/FloatingBeans";
import MagneticButton from "@/components/MagneticButton";
import Icon, { IconName } from "@/components/Icon";
import Doodle from "@/components/Doodle";

export default function HomePage() {
  const t = useTranslations("home");
  const hero = useTranslations("hero");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const featured = getFeaturedProducts();

  const pillars: { key: string; icon: IconName; color: string }[] = [
    { key: "consistency",  icon: "scale",     color: "#91d3c7" }, // green wave
    { key: "innovation",   icon: "lightbulb", color: "#fdd451" }, // mustard
    { key: "transparency", icon: "eye",       color: "#f179af" }, // soft pink
    { key: "partnership",  icon: "handshake", color: "#96d2b2" }, // lime green
  ];


  return (
    <div>
      {/* ── HERO — full-bleed video, minimal copy on the start side ──── */}
      <section className="relative flex items-center min-h-[92vh] overflow-hidden bg-[#1c1c1b]">
        {/* Background video, shown as-is (poster displays while it loads) */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          aria-hidden
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Subtle dark gradient on the text side only — keeps white copy legible */}
        <div
          aria-hidden
          className="absolute inset-y-0 start-0 w-full md:w-3/5 z-[1] pointer-events-none bg-gradient-to-r from-black/50 via-black/25 to-transparent rtl:bg-gradient-to-l"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-xl text-start">
            <motion.h1
              className="font-display text-white font-medium leading-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {hero("minimalTitle")}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <Link
                href={`/${locale}/shop`}
                className="inline-block px-9 py-4 text-sm font-semibold uppercase tracking-widest text-white border border-white/80 rounded-full hover:bg-white hover:text-[#383836] transition-colors"
              >
                {hero("exploreBtn")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COFFEES ─────────────────────────────────────────── */}
      <section className="relative py-20 px-4 bg-cream overflow-hidden">
        {/* Decorative SVG dots */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#383836 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="relative inline-block">
              <h2
                className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-3"
                style={{ color: "#383836" }}
              >
                {t("featuredTitle")}
              </h2>
              {/* hand-drawn arrow pointing at the coffees */}
              <Doodle
                name="swirlArrow"
                color="#f179af"
                strokeWidth={5}
                className="hidden md:block absolute -end-28 top-1/2 w-20 opacity-80 pointer-events-none rtl:-scale-x-100"
              />
            </div>
            <p className="text-gray-500 max-w-xl mx-auto">{t("featuredSubtitle")}</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.12} direction="up" className="h-full">
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <MagneticButton>
              <Link
                href={`/${locale}/shop`}
                className="inline-block px-8 py-3 text-sm font-bold rounded-full uppercase tracking-widest shadow-md hover:shadow-xl transition-shadow"
                style={{ backgroundColor: "#383836", color: "#fdd451" }}
              >
                {nav("shop")} →
              </Link>
            </MagneticButton>
          </FadeIn>
        </div>
      </section>

      {/* ── SUBSCRIPTION CTA — light teal wash (white-dominant) ──────── */}
      <section
        className="relative py-20 px-4 overflow-hidden bg-living"
        style={{
          background:
            "linear-gradient(135deg, #eef9f6 0%, #d9f0ea 50%, #eef9f6 100%)",
        }}
      >
        {/* faint brand kite pattern */}
        <div aria-hidden className="absolute inset-0 bg-kite-pattern pointer-events-none" />
        <Doodle
          name="kite"
          color="#3f9c8b"
          strokeWidth={4}
          className="hidden lg:block absolute top-10 end-[10%] w-20 opacity-50 pointer-events-none"
        />
        <FadeIn className="relative max-w-4xl mx-auto text-center">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: "#91d3c7" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="package" className="w-10 h-10 text-[#383836]" />
          </motion.div>
          <h2
            className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-4"
            style={{ color: "#383836" }}
          >
            {t("subscribeTitle")}
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "#4b4b48" }}>{t("subscribeSubtitle")}</p>
          <MagneticButton>
            <Link
              href={`/${locale}/subscriptions`}
              className="inline-block px-8 py-4 text-sm font-bold rounded-full uppercase tracking-widest shadow-lg hover:shadow-2xl transition-shadow"
              style={{ backgroundColor: "#fdd451", color: "#383836" }}
            >
              {t("subscribeBtn")}
            </Link>
          </MagneticButton>
        </FadeIn>
      </section>

      {/* ── WHY KITE — pillars with 3D tilt + glow ───────────────────── */}
      <section className="relative py-20 px-4 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="relative inline-block">
              <Doodle
                name="beans"
                color="#e79a3d"
                strokeWidth={4}
                className="hidden md:block absolute -start-28 top-1/2 -translate-y-1/2 w-20 opacity-70 pointer-events-none"
              />
              <h2
                className="font-display text-4xl md:text-6xl font-semibold tracking-tight"
                style={{ color: "#383836" }}
              >
                {t("whyTitle")}
              </h2>
            </div>
          </FadeIn>
          {/* Equal cards, neutral icons, scale-only hover (client direction) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {pillars.map(({ key, icon }, i) => (
              <FadeIn key={key} delay={i * 0.1} direction="up" className="h-full">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="text-center p-8 rounded-2xl border border-gray-200 h-full bg-white shadow-sm flex flex-col"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#f0ebe0" }}
                  >
                    <Icon name={icon} className="w-8 h-8 text-[#383836]" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#383836" }}>
                    {t(key)}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed min-h-[4rem]">
                    {t(`${key}Desc`)}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS CTA — living pink gradient ─────────────────────────── */}
      <section
        className="relative py-20 px-4 overflow-hidden bg-living bg-grain"
        style={{
          background:
            "linear-gradient(120deg, #f179af 0%, #f48fb9 50%, #f179af 100%)",
        }}
      >
        <FloatingBeans count={5} color="rgba(255,255,255,0.18)" />
        <FadeIn className="relative max-w-4xl mx-auto text-center">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/25"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="beaker" className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-4 text-white">
            {t("toolsTitle")}
          </h2>
          <p className="mb-8 max-w-xl mx-auto text-white/90">
            {t("toolsSubtitle")}
          </p>
          <MagneticButton>
            <Link
              href={`/${locale}/shop?cat=tools`}
              className="inline-block px-8 py-4 text-sm font-bold rounded-full uppercase tracking-widest shadow-lg hover:shadow-2xl transition-shadow"
              style={{ backgroundColor: "#383836", color: "#ffffff" }}
            >
              {t("shopTools")}
            </Link>
          </MagneticButton>
        </FadeIn>
      </section>
    </div>
  );
}
