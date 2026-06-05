"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Icon, { IconName } from "@/components/Icon";
import { openWhatsApp } from "@/lib/whatsapp";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg =
      `*Kite Coffee — Contact message*\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Message: ${form.message}`;
    openWhatsApp(msg);
    setSent(true);
  }

  const infoItems: { label: string; value: string; href: string; icon: IconName; color: string }[] = [
    {
      label: t("email"),
      value: "Kiteroastery@gmail.com",
      href: "mailto:Kiteroastery@gmail.com",
      icon: "mail",
      color: "#91d3c7",
    },
    {
      label: t("phone"),
      value: "07846221065",
      href: "tel:07846221065",
      icon: "phone",
      color: "#fdd451",
    },
    {
      label: t("address"),
      value: t("addressVal"),
      href: "https://maps.google.com/?q=33.30714416503906,44.44929504394531",
      icon: "mapPin",
      color: "#f179af",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — info */}
        <div className="flex flex-col gap-8">
          {infoItems.map(({ label, value, href, icon, color }, i) => (
            <FadeIn key={label} delay={i * 0.1} direction="left">
              <div className="group flex gap-4 items-start">
                <motion.span
                  className="w-12 h-12 flex items-center justify-center rounded-2xl shadow-md flex-shrink-0"
                  style={{ backgroundColor: color }}
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.12 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon name={icon} className="w-6 h-6 text-[#383836]" strokeWidth={1.8} />
                </motion.span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                    {label}
                  </p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-semibold transition-colors"
                    style={{ color: "#383836" }}
                  >
                    {value}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Map */}
          <FadeIn delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="rounded-2xl overflow-hidden mt-4 h-64 shadow-md hover:shadow-2xl transition-shadow border-2 border-gray-100"
              style={{ backgroundColor: "#dcdddd" }}
            >
              <iframe
                title="Kite Coffee Roastery Location"
                src="https://maps.google.com/maps?q=33.30714416503906,44.44929504394531&z=17&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </motion.div>
          </FadeIn>

          {/* Social */}
          <FadeIn delay={0.5}>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                {t("followUs")}
              </p>
              <motion.a
                href="https://www.instagram.com/kiteroastery"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 4 }}
                className="link-underline inline-flex items-center gap-2 font-semibold text-sm transition-colors"
                style={{ color: "#383836" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @kiteroastery
              </motion.a>
            </div>
          </FadeIn>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center py-16"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#96d2b2" }}
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
              >
                <Icon name="check" className="w-8 h-8 text-[#383836]" strokeWidth={2.5} />
              </motion.div>
              <p className="font-semibold text-lg" style={{ color: "#383836" }}>
                {t("form.success")}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[
                { key: "name",  label: t("form.name"),  type: "text" },
                { key: "email", label: t("form.email"), type: "email" },
              ].map(({ key, label, type }, i) => (
                <FadeIn key={key} delay={i * 0.08}>
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

              <FadeIn delay={0.2}>
                <label className="block text-sm font-medium mb-1" style={{ color: "#383836" }}>
                  {t("form.message")}
                </label>
                <textarea
                  rows={6}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#91d3c7] focus:ring-4 focus:ring-[#91d3c7]/20 transition-all resize-none"
                />
              </FadeIn>

              <FadeIn delay={0.3}>
                <MagneticButton className="w-full">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 text-sm font-bold rounded-full uppercase tracking-widest shadow-md hover:shadow-xl transition-shadow"
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
