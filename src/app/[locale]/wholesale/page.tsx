"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Icon from "@/components/Icon";
import { openWhatsApp } from "@/lib/whatsapp";

export default function WholesalePage() {
  const t = useTranslations("wholesale");
  const [form, setForm] = useState({ business: "", name: "", email: "", phone: "", volume: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg =
      `*Kite Coffee — Wholesale inquiry*\n` +
      `Business: ${form.business}\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Est. weekly volume: ${form.volume} kg\n` +
      `Message: ${form.message}`;
    openWhatsApp(msg);
    setSent(true);
  }

  const benefits = ["b1", "b2", "b3", "b4"] as const;
  const benefitColors = ["#91d3c7", "#fdd451", "#f179af", "#96d2b2"];

  return (
    <div className="min-h-screen bg-cream">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — info */}
        <div>
          <FadeIn>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">{t("body")}</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2
              className="text-xl font-black mb-6"
              style={{ color: "#383836" }}
            >
              {t("benefits")}
            </h2>
          </FadeIn>

          <ul className="flex flex-col gap-4">
            {benefits.map((b, i) => (
              <FadeIn key={b} delay={0.15 + i * 0.08} direction="left">
                <li className="flex items-start gap-3 group">
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: benefitColors[i] }}
                  >
                    <Icon name="check" className="w-4 h-4 text-[#383836]" strokeWidth={2.5} />
                  </motion.span>
                  <span className="text-gray-600 group-hover:text-[#383836] transition-colors pt-0.5">
                    {t(b)}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>

          {/* Direct contact — living gradient */}
          <FadeIn delay={0.4}>
            <div
              className="relative mt-12 p-6 rounded-2xl overflow-hidden bg-grain bg-living"
              style={{
                background:
                  "linear-gradient(135deg, #383836 0%, #4a4a48 50%, #383836 100%)",
              }}
            >
              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl"
                style={{ background: "#91d3c7" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative">
                <p className="text-white font-semibold mb-3 uppercase text-xs tracking-widest">
                  Direct Contact
                </p>
                <a
                  href="tel:07846221065"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#fdd451] transition-colors text-sm w-fit"
                >
                  <Icon name="phone" className="w-4 h-4" /> 07846221065
                </a>
                <a
                  href="mailto:Kiteroastery@gmail.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#fdd451] transition-colors text-sm mt-2 w-fit"
                >
                  <Icon name="mail" className="w-4 h-4" /> Kiteroastery@gmail.com
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right — form */}
        <div>
          <FadeIn>
            <h2 className="text-xl font-black mb-6" style={{ color: "#383836" }}>
              {t("contactUs")}
            </h2>
          </FadeIn>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center py-12"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#96d2b2" }}
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
              >
                <Icon name="check" className="w-8 h-8 text-[#383836]" strokeWidth={2.5} />
              </motion.div>
              <p className="font-semibold" style={{ color: "#383836" }}>
                Inquiry sent! We'll be in touch soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { key: "business", label: t("form.business") },
                { key: "name",     label: t("form.name") },
                { key: "email",    label: t("form.email"), type: "email" },
                { key: "phone",    label: t("form.phone"), type: "tel" },
                { key: "volume",   label: t("form.volume"), type: "number" },
              ].map(({ key, label, type = "text" }, i) => (
                <FadeIn key={key} delay={i * 0.05}>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#383836" }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#91d3c7] focus:ring-4 focus:ring-[#91d3c7]/20 transition-all"
                  />
                </FadeIn>
              ))}

              <FadeIn delay={0.3}>
                <label className="block text-sm font-medium mb-1" style={{ color: "#383836" }}>
                  {t("form.message")}
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#91d3c7] focus:ring-4 focus:ring-[#91d3c7]/20 transition-all resize-none"
                />
              </FadeIn>

              <FadeIn delay={0.4}>
                <MagneticButton className="w-full">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 text-sm font-bold rounded-full uppercase tracking-widest mt-2 shadow-md hover:shadow-xl transition-shadow"
                    style={{ backgroundColor: "#383836", color: "#fdd451" }}
                  >
                    {t("form.submit")}
                  </motion.button>
                </MagneticButton>
              </FadeIn>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
