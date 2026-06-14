"use client";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { products, formatIQD } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import Icon, { IconName } from "@/components/Icon";

export default function SubscriptionsPage() {
  const t = useTranslations("subscriptions");
  const locale = useLocale();
  const isAr = locale === "ar";
  const { addItem } = useCart();
  const subs = products.filter((p) => p.category === "subscription");

  const plans: { key: string; icon: IconName; popular: boolean; color: string }[] = [
    { key: "weekly",   icon: "flame", popular: false, color: "#e79a3d" },
    { key: "biweekly", icon: "star",  popular: true,  color: "#fdd451" },
    { key: "monthly",  icon: "leaf",  popular: false, color: "#96d2b2" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* How it works */}
        <FadeIn className="text-center mb-14">
          <p className="text-gray-500 text-lg mb-2">{t("customize")}</p>
          <p className="text-gray-400 text-sm">{t("cancel")}</p>
        </FadeIn>

        {/* Frequency plans — tilt + glow on hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map(({ key, icon, popular, color }, i) => (
            <FadeIn key={key} delay={i * 0.1} direction="up">
              <TiltCard glowColor={`${color}55`} maxTilt={popular ? 12 : 8}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative border-2 rounded-3xl p-8 text-center hover:shadow-2xl h-full"
                  style={{
                    borderColor: popular ? "#383836" : "#e5e7eb",
                    backgroundColor: popular ? "#383836" : "white",
                  }}
                >
                  {popular && (
                    <motion.span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md"
                      style={{ backgroundColor: "#fdd451", color: "#383836" }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Most Popular
                    </motion.span>
                  )}
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-md"
                    style={{ backgroundColor: color }}
                    whileHover={{ rotate: [0, -12, 12, 0], scale: 1.12 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon name={icon} className="w-8 h-8 text-[#383836]" strokeWidth={1.8} />
                  </motion.div>
                  <h3
                    className="font-display text-2xl font-semibold mb-2"
                    style={{ color: popular ? "#fdd451" : "#383836" }}
                  >
                    {t(key)}
                  </h3>
                </motion.div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        {/* Subscription products */}
        <FadeIn>
          <h2
            className="text-2xl font-black mb-8 text-center"
            style={{ color: "#383836" }}
          >
            {t("title")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subs.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1} direction="up">
              <TiltCard glowColor="rgba(253, 212, 81, 0.35)" maxTilt={6}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group border border-gray-100 rounded-3xl p-8 hover:shadow-2xl transition-shadow h-full bg-white"
                >
                  <motion.div
                    className="w-14 h-14 mb-4 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#fdd451" }}
                    animate={{ rotate: [0, -6, 6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2 + i,
                    }}
                  >
                    <Icon name="repeat" className="w-7 h-7 text-[#383836]" strokeWidth={1.8} />
                  </motion.div>
                  <h3
                    className="text-lg font-black mb-2"
                    style={{ color: "#383836" }}
                  >
                    {isAr ? p.nameAr : p.nameEn}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {isAr ? p.descAr : p.descEn}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black" style={{ color: "#383836" }}>
                      {formatIQD(p.price)}
                      <span className="text-sm font-normal text-gray-400">/delivery</span>
                    </span>
                    <MagneticButton>
                      <motion.button
                        onClick={() => addItem(p)}
                        whileTap={{ scale: 0.94 }}
                        className="relative overflow-hidden px-6 py-2 text-sm font-bold rounded-full shadow-md hover:shadow-xl transition-shadow"
                        style={{ backgroundColor: "#383836", color: "#fdd451" }}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                          style={{
                            background:
                              "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                          }}
                        />
                        <span className="relative">{t("subscribe")}</span>
                      </motion.button>
                    </MagneticButton>
                  </div>
                </motion.div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
