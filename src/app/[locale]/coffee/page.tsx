"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProductsByCategory, formatIQD } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import Icon, { IconName } from "@/components/Icon";

export default function CoffeePage() {
  const t = useTranslations("coffeePage");
  const shop = useTranslations("shop");
  const locale = useLocale();
  const isAr = locale === "ar";
  const { addItem } = useCart();

  const beans = getProductsByCategory("beans");

  // Accent colors from brand palette, cycled per origin
  const accents = ["#91d3c7", "#f179af", "#fdd451", "#e79a3d", "#96d2b2", "#303895"];

  return (
    <div className="bg-white">
      <PageHeader title={t("title")} subtitle={t("subtitle")} beans={14} />

      {/* Process strip — icons wobble on hover */}
      <section className="py-16 px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {([
            { icon: "sprout",  key: "sourced",   color: "#96d2b2" },
            { icon: "flame",   key: "roasted",   color: "#e79a3d" },
            { icon: "package", key: "packed",    color: "#fdd451" },
            { icon: "truck",   key: "delivered", color: "#91d3c7" },
          ] as { icon: IconName; key: string; color: string }[]).map(({ icon, key, color }, i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <div className="group">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-md"
                  style={{ backgroundColor: color }}
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.12 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon name={icon} className="w-8 h-8 text-[#383836]" strokeWidth={1.8} />
                </motion.div>
                <h3
                  className="font-bold text-sm uppercase tracking-widest mb-2"
                  style={{ color: "#383836" }}
                >
                  {t(`process.${key}.title`)}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-[#383836] transition-colors">
                  {t(`process.${key}.desc`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Coffee list */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {beans.map((p, i) => {
            const accent = accents[i % accents.length];
            const name = isAr ? p.nameAr : p.nameEn;
            const origin = isAr ? p.originAr : p.originEn;
            const roast = isAr ? p.roastAr : p.roastEn;
            const notes = isAr ? p.notesAr : p.notesEn;
            const desc = isAr ? p.descAr : p.descEn;
            const reverse = i % 2 === 1;

            return (
              <FadeIn key={p.id}>
                <article
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                    reverse ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image / accent panel — animated background + floating cup */}
                  <TiltCard glowColor={`${accent}66`} maxTilt={8}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative aspect-square rounded-3xl overflow-hidden flex items-center justify-center bg-grain bg-living shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 50%, ${accent} 100%)`,
                      }}
                    >
                      <motion.div
                        className="opacity-50"
                        animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon name="coffee" className="w-32 h-32 text-white" strokeWidth={1} />
                      </motion.div>
                      <motion.span
                        className="absolute top-4 start-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg"
                        style={{ backgroundColor: "#383836", color: "#ffffff" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {origin}
                      </motion.span>
                    </motion.div>
                  </TiltCard>

                  {/* Details */}
                  <div className="[direction:ltr]" style={{ direction: isAr ? "rtl" : "ltr" }}>
                    <p
                      className="text-xs uppercase tracking-widest mb-2 font-bold"
                      style={{ color: accent }}
                    >
                      {shop("origin")}: {origin}
                    </p>
                    <h2
                      className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-3"
                      style={{ color: "#383836" }}
                    >
                      {name}
                    </h2>
                    {roast && (
                      <p className="text-sm text-gray-500 mb-2">
                        {shop("roast")}:{" "}
                        <span className="font-semibold" style={{ color: "#383836" }}>
                          {roast}
                        </span>
                      </p>
                    )}
                    {notes && (
                      <div className="my-4">
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                          {shop("tastingNotes")}
                        </p>
                        <p className="text-base font-medium" style={{ color: "#383836" }}>
                          {notes}
                        </p>
                      </div>
                    )}
                    <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>

                    <div className="flex items-center gap-4 flex-wrap">
                      <div>
                        <span className="text-2xl font-black" style={{ color: "#383836" }}>
                          {formatIQD(p.price)}
                        </span>
                        {p.weight && (
                          <span className="text-sm text-gray-400 ms-1">/ {p.weight}</span>
                        )}
                      </div>
                      <MagneticButton>
                        <motion.button
                          onClick={() => addItem(p)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 text-sm font-bold rounded-full uppercase tracking-widest shadow-md hover:shadow-xl transition-shadow"
                          style={{ backgroundColor: "#383836", color: "#ffffff" }}
                        >
                          {shop("addToCart")}
                        </motion.button>
                      </MagneticButton>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: "#91d3c7" }}>
        <FadeIn className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-black tracking-tight mb-4"
            style={{ color: "#383836" }}
          >
            {t("ctaTitle")}
          </h2>
          <p className="mb-8" style={{ color: "#383836" }}>
            {t("ctaSubtitle")}
          </p>
          <MagneticButton>
            <Link
              href={`/${locale}/shop`}
              className="inline-block px-8 py-4 text-sm font-bold rounded-full uppercase tracking-widest shadow-lg hover:shadow-2xl transition-shadow"
              style={{ backgroundColor: "#383836", color: "#ffffff" }}
            >
              {t("ctaButton")}
            </Link>
          </MagneticButton>
        </FadeIn>
      </section>
    </div>
  );
}
