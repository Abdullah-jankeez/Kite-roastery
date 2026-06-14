"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Product, getProductsByCategory, formatIQD } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import Icon, { IconName } from "@/components/Icon";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import CountUp from "@/components/CountUp";
import { flyToCart } from "@/components/FlyToCart";

const ACCENTS = ["#91d3c7", "#f179af", "#fdd451", "#e79a3d", "#96d2b2", "#303895"];

/** Renders a real image if `src` is given, otherwise an elegant branded placeholder. */
function PhotoSlot({
  src,
  alt,
  accent,
  icon = "coffee",
  label,
  className = "",
  rounded = "rounded-3xl",
}: {
  src?: string;
  alt: string;
  accent: string;
  icon?: IconName;
  label: string;
  className?: string;
  rounded?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 600px" />
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden ${rounded} bg-grain flex flex-col items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 50%, ${accent} 100%)` }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="opacity-50"
      >
        <Icon name={icon} className="w-20 h-20 text-white" strokeWidth={1} />
      </motion.div>
      <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/70">
        {label}
      </span>
    </div>
  );
}

export default function CoffeeDetail({ product, index }: { product: Product; index: number }) {
  const t = useTranslations("coffeeDetail");
  const shop = useTranslations("shop");
  const locale = useLocale();
  const isAr = locale === "ar";
  const { addItem } = useCart();

  const accent = ACCENTS[index % ACCENTS.length];
  const name = isAr ? product.nameAr : product.nameEn;
  const originLabel = isAr ? product.originAr : product.originEn;
  const roast = isAr ? product.roastAr : product.roastEn;
  const notes = isAr ? product.notesAr : product.notesEn;
  const desc = isAr ? product.descAr : product.descEn;
  const o = product.origin;

  // Parallax: hero photo drifts gently as the page scrolls.
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  function handleAdd() {
    addItem(product);
    if (o?.heroImage) flyToCart(o.heroImage, heroRef.current);
  }

  const related = getProductsByCategory("beans").filter((p) => p.id !== product.id).slice(0, 3);

  const farmRows = o
    ? ([
        { label: t("producer"), value: isAr ? o.farm.producerAr : o.farm.producerEn, icon: "handshake" },
        { label: t("farm"), value: isAr ? o.farm.farmAr : o.farm.farmEn, icon: "sprout" },
        { label: t("region"), value: isAr ? o.farm.regionAr : o.farm.regionEn, icon: "mapPin" },
        { label: t("altitude"), value: o.farm.altitude, icon: "scaleRatio" },
        { label: t("variety"), value: isAr ? o.farm.varietyAr : o.farm.varietyEn, icon: "leaf" },
        { label: t("process"), value: isAr ? o.farm.processAr : o.farm.processEn, icon: "droplet" },
        { label: t("score"), value: isAr ? o.farm.scoreAr : o.farm.scoreEn, icon: "star" },
      ] as { label: string; value?: string; icon: IconName }[]).filter((r) => r.value)
    : [];

  return (
    <div className="bg-cream">
      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <Link
          href={`/${locale}/coffee`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#383836] transition-colors"
        >
          <Icon name="arrowRight" className="w-4 h-4 rotate-180 rtl:rotate-0" />
          {t("backToCoffee")}
        </Link>
      </div>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <FadeIn direction="right">
          <motion.div ref={heroRef} style={{ y: heroY }}>
            <PhotoSlot
              src={o?.heroImage}
              alt={name}
              accent={accent}
              icon="coffee"
              label={t("photoComingSoon")}
              className="aspect-square w-full shadow-xl"
            />
          </motion.div>
        </FadeIn>

        <FadeIn direction="left">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: accent, color: "#383836" }}
          >
            {originLabel}
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mb-4" style={{ color: "#383836" }}>
            {name}
          </h1>

          {roast && (
            <p className="text-sm text-gray-500 mb-4">
              {shop("roast")}:{" "}
              <span className="font-semibold" style={{ color: "#383836" }}>{roast}</span>
            </p>
          )}

          {notes && (
            <div className="flex flex-wrap gap-2 mb-6">
              {notes.split("·").map((n) => (
                <span
                  key={n}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{ borderColor: accent, color: "#383836" }}
                >
                  {n.trim()}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-600 leading-relaxed mb-8">{desc}</p>

          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <span className="text-3xl font-black" style={{ color: "#383836" }}>
                {formatIQD(product.price)}
              </span>
              {product.weight && <span className="text-sm text-gray-400 ms-1">/ {product.weight}</span>}
            </div>
            <MagneticButton>
              <motion.button
                onClick={handleAdd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 text-sm font-bold rounded-full uppercase tracking-widest shadow-md hover:shadow-xl transition-shadow"
                style={{ backgroundColor: "#383836", color: "#fdd451" }}
              >
                {shop("addToCart")}
              </motion.button>
            </MagneticButton>
          </div>
        </FadeIn>
      </section>

      {o && (
        <>
          {/* ── THE STORY ── */}
          <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: "#383836" }}>
            <div
              aria-hidden
              className="absolute -top-20 -end-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
              style={{ background: accent }}
            />
            <FadeIn className="relative max-w-3xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 text-white">
                {t("theStory")}
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-white/85">
                {isAr ? o.storyAr : o.storyEn}
              </p>
            </FadeIn>
          </section>

          {/* ── FROM THE FARM ── */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <FadeIn className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-semibold" style={{ color: "#383836" }}>
                  {t("fromTheFarm")}
                </h2>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {farmRows.map(({ label, value, icon }, i) => (
                  <FadeIn key={label} delay={i * 0.06} direction="up">
                    <div className="group flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-100 h-full hover:shadow-lg transition-shadow">
                      <span
                        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: accent }}
                      >
                        <Icon name={icon} className="w-5 h-5 text-[#383836]" strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                        <p className="font-semibold leading-snug" style={{ color: "#383836" }}>
                          {label === t("score") && value && !isNaN(parseFloat(value)) ? (
                            <CountUp
                              value={parseFloat(value)}
                              suffix=" / 100"
                              className="text-lg font-bold"
                            />
                          ) : (
                            value
                          )}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ── MEET THE PRODUCER ── */}
          {(o.farmerNameEn || o.farmerNameAr) && (
            <section className="py-20 px-4" style={{ backgroundColor: "#fafafa" }}>
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <FadeIn direction="right">
                  <PhotoSlot
                    src={o.farmerImage}
                    alt={isAr ? o.farmerNameAr || "" : o.farmerNameEn || ""}
                    accent={accent}
                    icon="handshake"
                    label={t("farmerPhotoSoon")}
                    className="aspect-[4/5] w-full max-w-sm mx-auto shadow-xl"
                  />
                </FadeIn>
                <FadeIn direction="left">
                  <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: accent }}>
                    {t("meetTheFarmer")}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold mb-4" style={{ color: "#383836" }}>
                    {isAr ? o.farmerNameAr : o.farmerNameEn}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {isAr ? o.farmerBioAr : o.farmerBioEn}
                  </p>
                </FadeIn>
              </div>
            </section>
          )}

          {/* ── GALLERY ── */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <FadeIn className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-semibold" style={{ color: "#383836" }}>
                  {t("gallery")}
                </h2>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[0, 1, 2].map((i) => (
                  <FadeIn key={i} delay={i * 0.1} direction="up">
                    <PhotoSlot
                      src={o.gallery?.[i]}
                      alt={`${name} ${i + 1}`}
                      accent={ACCENTS[(index + i + 1) % ACCENTS.length]}
                      icon={i === 1 ? "sprout" : i === 2 ? "flame" : "coffee"}
                      label={t("photoComingSoon")}
                      className="aspect-square w-full"
                      rounded="rounded-2xl"
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: "#383836" }}>
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
                {t("relatedTitle")}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p, i) => {
                const rAccent = ACCENTS[(index + i + 1) % ACCENTS.length];
                return (
                  <FadeIn key={p.id} delay={i * 0.1} direction="up">
                    <Link href={`/${locale}/coffee/${p.id}`} className="group block">
                      <div
                        className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center mb-4 bg-grain"
                        style={{ background: `linear-gradient(135deg, ${rAccent} 0%, ${rAccent}cc 100%)` }}
                      >
                        {p.image && p.image.startsWith("/coffee/") ? (
                          <Image
                            src={p.image}
                            alt={isAr ? p.nameAr : p.nameEn}
                            fill
                            sizes="(max-width:768px) 100vw, 360px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Icon name="coffee" className="w-16 h-16 text-white opacity-50" strokeWidth={1} />
                        )}
                        <span className="absolute top-3 start-3 z-10 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#383836] text-white">
                          {isAr ? p.originAr : p.originEn}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-white group-hover:text-[#91d3c7] transition-colors">
                        {isAr ? p.nameAr : p.nameEn}
                      </h3>
                      <p className="text-sm text-white/60">{formatIQD(p.price)}</p>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
