"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import TiltCard from "@/components/TiltCard";
import Icon, { IconName } from "@/components/Icon";

export default function AboutPage() {
  const t = useTranslations("about");

  const pillars: { icon: IconName; label: string; color: string }[] = [
    { icon: "scale",     label: "Consistency",  color: "#91d3c7" },
    { icon: "lightbulb", label: "Innovation",   color: "#fdd451" },
    { icon: "eye",       label: "Transparency", color: "#f179af" },
    { icon: "handshake", label: "Partnership",  color: "#96d2b2" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      {/* Story */}
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="flex flex-col gap-6 text-lg leading-relaxed text-gray-600">
          {[t("body1"), t("body2"), t("body3")].map((p, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <p>{p}</p>
            </FadeIn>
          ))}
        </div>

        {/* Pillars — tilt + colored glow */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {pillars.map(({ icon, label, color }, i) => (
            <FadeIn key={label} delay={i * 0.1} direction="up">
              <TiltCard glowColor={`${color}55`} maxTilt={12}>
                <div className="p-6 rounded-2xl border-2 border-gray-100 bg-white h-full hover:shadow-xl transition-shadow">
                  <motion.div
                    className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3 shadow-md"
                    style={{ backgroundColor: color }}
                    whileHover={{ rotate: [0, -12, 12, 0], scale: 1.12 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon name={icon} className="w-7 h-7 text-[#383836]" strokeWidth={1.8} />
                  </motion.div>
                  <p className="font-bold text-sm" style={{ color: "#383836" }}>
                    {label}
                  </p>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        {/* Founder card — living gradient */}
        <FadeIn className="mt-16">
          <div
            className="relative p-8 rounded-3xl overflow-hidden bg-grain bg-living"
            style={{
              background:
                "linear-gradient(135deg, #383836 0%, #4a4a48 50%, #383836 100%)",
            }}
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl"
              style={{ background: "#fdd451" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative">
              <p className="text-gray-300 text-sm uppercase tracking-widest mb-2">Co-Founder</p>
              <p className="text-white text-xl font-bold">Ahmed Mazin Shaheen</p>
              <p className="text-gray-400 text-sm mt-1">Baghdad, Iraq · 2025</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
