"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import FloatingBeans from "@/components/FloatingBeans";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import TiltCard from "@/components/TiltCard";
import Icon, { IconName } from "@/components/Icon";
import CoffeeShowcase from "@/components/CoffeeShowcase";
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
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center min-h-[92vh] overflow-hidden bg-grain"
        style={{
          background:
            "radial-gradient(ellipse at 30% 15%, #ffffff 0%, #faf9f7 55%, #f1efe9 100%)",
        }}
      >
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Soft white scrim keeps the section light + text readable over the video */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.4) 45%, rgba(250,249,247,0.62) 100%)",
          }}
        />

        {/* Floating coffee beans — subtle charcoal on the light backdrop */}
        <FloatingBeans count={10} color="rgba(56, 56, 54, 0.10)" />

        {/* Hand-drawn steam doodle rising near the wordmark (brand book p.14) */}
        <Doodle
          name="steam"
          color="#3f9c8b"
          strokeWidth={4}
          className="hidden md:block absolute top-[16%] right-[16%] w-16 lg:w-20 opacity-70 pointer-events-none"
          delay={1.2}
        />
        <Doodle
          name="kite"
          color="#e79a3d"
          strokeWidth={4}
          className="hidden md:block absolute bottom-[18%] left-[12%] w-16 lg:w-20 opacity-60 pointer-events-none"
          delay={1.6}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* KITE wordmark — letter-by-letter reveal with hover lift.
              dir="ltr" so the Latin brand name never reverses in Arabic (RTL). */}
          <div
            dir="ltr"
            className="text-[clamp(5rem,18vw,14rem)] font-black tracking-tight leading-none mb-4 select-none flex justify-center"
            style={{ color: "#383836", textShadow: "0 2px 30px rgba(255,255,255,0.7)" }}
          >
            {"KITE".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotate: -8 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ y: -10, color: "#5BA499" }}
                className="inline-block cursor-default"
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Coloured accent bar */}
          <motion.div
            className="flex justify-center gap-1 mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {["#91d3c7", "#f179af", "#96d2b2", "#e79a3d", "#fdd451", "#303895"].map((c, i) => (
              <motion.span
                key={c}
                className="h-1.5 w-8 rounded-full"
                style={{ backgroundColor: c }}
                animate={{ scaleY: [1, 1.8, 1] }}
                transition={{
                  duration: 1.4,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          <motion.p
            className="text-lg md:text-2xl font-light mb-2 tracking-wide"
            style={{ color: "#3a3a38", textShadow: "0 1px 14px rgba(255,255,255,0.85)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {hero("tagline")}
          </motion.p>

          <motion.p
            className="text-2xl md:text-3xl font-semibold mb-10"
            style={{ color: "#2f8576", textShadow: "0 1px 14px rgba(255,255,255,0.85)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {hero("slogan")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <MagneticButton>
              <Link
                href={`/${locale}/shop`}
                className="inline-block px-8 py-4 text-sm font-bold rounded-full uppercase tracking-widest shadow-lg transition-shadow hover:shadow-xl"
                style={{ backgroundColor: "#91d3c7", color: "#383836" }}
              >
                {hero("shopNow")}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href={`/${locale}/about`}
                className="inline-block px-8 py-4 text-sm font-bold rounded-full border-2 uppercase tracking-widest hover:bg-black/5 transition-colors"
                style={{ borderColor: "rgba(56,56,54,0.25)", color: "#383836" }}
              >
                {hero("learnMore")}
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#383836]/40 text-xs tracking-widest flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>SCROLL</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </section>

      {/* ── BRAND MARQUEE ────────────────────────────────────────────── */}
      <section
        className="py-5 border-y"
        style={{ backgroundColor: "#fdd451", borderColor: "#383836" }}
      >
        <Marquee duration={28}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-2xl md:text-3xl font-black tracking-tight"
              style={{ color: "#383836" }}
            >
              <span>{hero("slogan")}</span>
              <span style={{ color: "#f179af" }}>✦</span>
              <span>BAGHDAD · IRAQ</span>
              <span style={{ color: "#303895" }}>✦</span>
              <span>SPECIALTY ROASTED</span>
              <span style={{ color: "#91d3c7" }}>✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ── COFFEE SHOWCASE — rotating coverflow of real bags ────────── */}
      <CoffeeShowcase />

      {/* ── FEATURED COFFEES ─────────────────────────────────────────── */}
      <section className="relative py-20 px-4 bg-white overflow-hidden">
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
              <FadeIn key={p.id} delay={i * 0.12} direction="up">
                <TiltCard maxTilt={6}>
                  <ProductCard product={p} />
                </TiltCard>
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
      <section className="relative py-20 px-4 bg-white overflow-hidden">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map(({ key, icon, color }, i) => (
              <FadeIn key={key} delay={i * 0.1} direction="up">
                <TiltCard glowColor={`${color}55`} maxTilt={10}>
                  <div
                    className="group text-center p-8 rounded-2xl border-2 transition-colors h-full bg-white hover:shadow-2xl"
                    style={{ borderColor: "#dcdddd" }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-md"
                      style={{ backgroundColor: color }}
                      whileHover={{ rotate: [0, -12, 12, 0], scale: 1.12 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon name={icon} className="w-8 h-8 text-[#383836]" strokeWidth={1.8} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "#383836" }}>
                      {t(key)}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{t(`${key}Desc`)}</p>
                  </div>
                </TiltCard>
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
