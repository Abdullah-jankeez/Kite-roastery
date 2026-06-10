"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProductsByCategory, formatIQD } from "@/lib/products";

// Brand accent colour per coffee (cycled), echoing the rest of the site.
const ACCENTS = ["#91d3c7", "#f179af", "#fdd451", "#e79a3d", "#96d2b2", "#303895"];
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export default function CoffeeShowcase() {
  const locale = useLocale();
  const cp = useTranslations("coffeePage");
  const isAr = locale === "ar";

  // Only beans that have a real photo.
  const beans = useMemo(
    () =>
      getProductsByCategory("beans").filter(
        (p) => p.image && p.image.startsWith("/coffee/")
      ),
    []
  );

  const n = beans.length;
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hovering, setHovering] = useState(false);
  const lastInteract = useRef(0);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function navigate(dir: "next" | "prev", manual = true) {
    if (animating || n === 0) return;
    if (manual) lastInteract.current = Date.now();
    setAnimating(true);
    setActive((p) => (dir === "next" ? (p + 1) % n : (p + n - 1) % n));
    setTimeout(() => setAnimating(false), 650);
  }

  // Autoplay: advance every 5s unless hovering, recently touched, or tab hidden.
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden || hovering) return;
      if (Date.now() - lastInteract.current < 8000) return;
      navigate("next", false);
    }, 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovering, n, animating]);

  // Touch swipe (mobile): horizontal drag > 50px flips a card.
  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    // In LTR a left-swipe (dx<0) means "next"; mirrored in RTL.
    const forward = isAr ? dx > 0 : dx < 0;
    navigate(forward ? "next" : "prev");
  }

  if (n === 0) return null;

  const accent = ACCENTS[active % ACCENTS.length];
  const current = beans[active];

  // Compute the visual role of each card relative to the active one.
  function roleStyle(i: number): React.CSSProperties {
    const offset = (i - active + n) % n;
    const base: React.CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: isMobile ? 230 : 380,
      aspectRatio: "3 / 2",
      transition: `transform 650ms ${EASE}, opacity 650ms ${EASE}, filter 650ms ${EASE}`,
      willChange: "transform, opacity, filter",
    };
    const make = (
      xPct: number,
      scale: number,
      blur: number,
      opacity: number,
      z: number,
      pointer = true
    ): React.CSSProperties => ({
      ...base,
      transform: `translate(calc(-50% + ${xPct}%), -50%) scale(${scale})`,
      filter: blur ? `blur(${blur}px)` : "none",
      opacity,
      zIndex: z,
      pointerEvents: pointer ? "auto" : "none",
    });

    if (offset === 0) return make(0, isMobile ? 1.05 : 1.15, 0, 1, 30);
    if (offset === 1) return make(isMobile ? 70 : 78, 0.78, 1.2, 0.85, 20);          // right
    if (offset === n - 1) return make(isMobile ? -70 : -78, 0.78, 1.2, 0.85, 20);    // left
    if (offset === 2) return make(isMobile ? 120 : 135, 0.6, 3, 0.45, 10);           // far right
    if (offset === n - 2) return make(isMobile ? -120 : -135, 0.6, 3, 0.45, 10);     // far left
    return make(0, 0.5, 0, 0, 1, false);                                             // hidden
  }

  const originText = (isAr ? current.originAr : current.originEn) || "";

  return (
    <section
      className="relative w-full overflow-hidden bg-grain"
      style={{
        backgroundColor: accent,
        transition: `background-color 650ms ${EASE}`,
        minHeight: isMobile ? 560 : 680,
        touchAction: "pan-y",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* eyebrow */}
      <div className="absolute top-6 inset-x-0 z-40 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/90">
          {cp("title")}
        </p>
      </div>

      {/* Giant ghost origin text */}
      <div
        dir="ltr"
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
        style={{ top: "20%", zIndex: 2 }}
      >
        <motion.span
          key={originText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.35, y: 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="font-black uppercase text-white whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(70px, 17vw, 240px)", letterSpacing: "-0.02em" }}
        >
          {originText}
        </motion.span>
      </div>

      {/* Cards */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {beans.map((p, i) => (
          <Link
            key={p.id}
            href={`/${locale}/coffee/${p.id}`}
            style={roleStyle(i)}
            aria-label={isAr ? p.nameAr : p.nameEn}
            tabIndex={(i - active + n) % n === 0 ? 0 : -1}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src={p.image}
                alt={isAr ? p.nameAr : p.nameEn}
                fill
                sizes="(max-width:640px) 230px, 380px"
                className="object-cover"
                draggable={false}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom-left: name + notes */}
      <div
        className="absolute bottom-6 start-4 sm:bottom-12 sm:start-12 z-40"
        style={{ maxWidth: 360 }}
      >
        <motion.h3
          key={current.id + "-name"}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-5xl font-semibold text-white mb-1"
        >
          {isAr ? current.nameAr : current.nameEn}
        </motion.h3>
        <p className="text-white/85 text-sm sm:text-base mb-1">
          {isAr ? current.notesAr : current.notesEn}
        </p>
        <p className="text-white font-bold text-lg mb-5">{formatIQD(current.price)}</p>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(isAr ? "next" : "prev")}
            aria-label="Previous"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/70 text-white flex items-center justify-center transition-all hover:scale-110 hover:bg-white/15 cursor-pointer"
          >
            <ArrowLeft size={24} strokeWidth={2.25} />
          </button>
          <button
            onClick={() => navigate(isAr ? "prev" : "next")}
            aria-label="Next"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/70 text-white flex items-center justify-center transition-all hover:scale-110 hover:bg-white/15 cursor-pointer"
          >
            <ArrowRight size={24} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      {/* Bottom-right: read the story */}
      <Link
        href={`/${locale}/coffee/${current.id}`}
        className="absolute bottom-6 end-4 sm:bottom-12 sm:end-12 z-40 flex items-center gap-2 text-white font-display uppercase hover:opacity-100 opacity-90 transition-opacity"
        style={{ fontSize: "clamp(18px, 3.5vw, 44px)", letterSpacing: "-0.02em" }}
      >
        {cp("readStory")}
        <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 rtl:rotate-180" strokeWidth={2.25} />
      </Link>
    </section>
  );
}
