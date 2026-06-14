"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import { formatIQD } from "@/lib/products";
import MagneticButton from "@/components/MagneticButton";
import Icon from "@/components/Icon";

export default function CartPage() {
  const t = useTranslations("cart");
  const c = useTranslations("checkout");
  const locale = useLocale();
  const isAr = locale === "ar";
  const { items, removeItem, updateQty, clearCart, total } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderNo, setOrderNo] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form.name,
          phone: form.phone,
          address: form.address,
          notes: form.notes,
          locale,
          total,
          items: items.map(({ product, qty }) => ({
            id: product.id,
            name: product.nameEn,
            qty,
            price: product.price,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not place the order. Please try again.");
      }
      if (data.orderNo) setOrderNo(data.orderNo);
      clearCart();
      setSuccess(true);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Could not place the order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="w-20 h-20 mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#96d2b2" }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Icon name="check" className="w-10 h-10 text-[#383836]" strokeWidth={2.5} />
        </motion.div>
        <motion.h2
          className="text-2xl font-bold mb-3"
          style={{ color: "#383836" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {c("success")}
        </motion.h2>
        {orderNo && (
          <motion.p
            dir="ltr"
            className="text-sm font-semibold tracking-widest px-4 py-2 rounded-full"
            style={{ backgroundColor: "#eef9f6", color: "#3f9c8b" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {c("orderRef")}: #{orderNo}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MagneticButton>
            <Link
              href={`/${locale}/shop`}
              className="mt-6 inline-block px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-md hover:shadow-xl transition-shadow"
              style={{ backgroundColor: "#383836", color: "#fdd451" }}
            >
              {t("continueShopping")}
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="w-20 h-20 mb-6 rounded-full flex items-center justify-center bg-gray-100"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon name="cart" className="w-10 h-10 text-gray-400" />
        </motion.div>
        <h2 className="text-xl font-semibold mb-3 text-gray-500">{t("empty")}</h2>
        <MagneticButton>
          <Link
            href={`/${locale}/shop`}
            className="mt-4 inline-block px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-md hover:shadow-xl transition-shadow"
            style={{ backgroundColor: "#383836", color: "#fdd451" }}
          >
            {t("continueShopping")}
          </Link>
        </MagneticButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.h1
          className="text-3xl font-black tracking-tight mb-8"
          style={{ color: "#383836" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("title")}
        </motion.h1>

        {!checkout ? (
          <>
            {/* Items */}
            <div className="flex flex-col gap-4 mb-8">
              <AnimatePresence mode="popLayout">
                {items.map(({ product, qty }) => {
                  const name = isAr ? product.nameAr : product.nameEn;
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ type: "spring", stiffness: 240, damping: 22 }}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-2xl hover:border-[#91d3c7] hover:shadow-md transition-all"
                    >
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        className="relative w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#dcdddd" }}
                      >
                        {product.image && product.image.startsWith("/coffee/") ? (
                          <Image
                            src={product.image}
                            alt={name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <Icon name="coffee" className="w-8 h-8 text-[#383836]" strokeWidth={1.5} />
                        )}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate" style={{ color: "#383836" }}>
                          {name}
                        </p>
                        <p className="text-sm text-gray-500">{formatIQD(product.price)}</p>
                      </div>
                      {/* Qty */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-200 text-sm font-bold hover:border-[#383836] hover:bg-[#383836] hover:text-white transition-colors"
                        >
                          −
                        </motion.button>
                        <motion.span
                          key={qty}
                          initial={{ scale: 1.4 }}
                          animate={{ scale: 1 }}
                          className="w-6 text-center text-sm font-semibold"
                        >
                          {qty}
                        </motion.span>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-200 text-sm font-bold hover:border-[#383836] hover:bg-[#383836] hover:text-white transition-colors"
                        >
                          +
                        </motion.button>
                      </div>
                      <motion.p
                        key={qty + product.price}
                        initial={{ scale: 1.15, color: "#91d3c7" }}
                        animate={{ scale: 1, color: "#383836" }}
                        className="text-sm font-bold w-28 text-end"
                      >
                        {formatIQD(product.price * qty)}
                      </motion.p>
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(product.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors text-2xl leading-none"
                      >
                        ×
                      </motion.button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center py-4 border-t-2 border-gray-100 mb-6">
              <span className="font-semibold text-gray-600">{t("subtotal")}</span>
              <motion.span
                key={total}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-black"
                style={{ color: "#383836" }}
              >
                {formatIQD(total)}
              </motion.span>
            </div>

            <MagneticButton className="w-full">
              <motion.button
                onClick={() => setCheckout(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden w-full py-4 text-sm font-bold rounded-full uppercase tracking-widest shadow-lg hover:shadow-2xl transition-shadow"
                style={{ backgroundColor: "#383836", color: "#fdd451" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                  }}
                />
                <span className="relative">{t("checkout")}</span>
              </motion.button>
            </MagneticButton>
          </>
        ) : (
          /* Checkout form */
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-xl font-bold mb-2" style={{ color: "#383836" }}>
              {c("title")}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{c("cod")}</p>

            {[
              { key: "name",    label: c("name"),    type: "text" },
              { key: "phone",   label: c("phone"),   type: "tel" },
              { key: "address", label: c("address"), type: "text" },
            ].map(({ key, label, type }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <label className="block text-sm font-medium mb-1" style={{ color: "#383836" }}>
                  {label} *
                </label>
                <input
                  type={type}
                  required
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#91d3c7] focus:ring-4 focus:ring-[#91d3c7]/20 transition-all"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm font-medium mb-1" style={{ color: "#383836" }}>
                {c("notes")}
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#91d3c7] focus:ring-4 focus:ring-[#91d3c7]/20 transition-all resize-none"
              />
            </motion.div>

            {/* Order summary — animated reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200"
            >
              <p className="text-sm font-semibold mb-3" style={{ color: "#383836" }}>
                {t("subtotal")}: {formatIQD(total)}
              </p>
              {items.map(({ product, qty }) => (
                <p key={product.id} className="text-xs text-gray-500">
                  {isAr ? product.nameAr : product.nameEn} × {qty}
                </p>
              ))}
            </motion.div>

            {errorMsg && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {errorMsg}
              </p>
            )}

            <div className="flex gap-3">
              <motion.button
                type="button"
                onClick={() => setCheckout(false)}
                whileHover={{ scale: 1.02, x: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3 text-sm font-semibold rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
              >
                ← {t("continueShopping")}
              </motion.button>
              <MagneticButton className="flex-1">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.97 }}
                  className="w-full py-3 text-sm font-bold rounded-full shadow-md hover:shadow-xl transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#383836", color: "#fdd451" }}
                >
                  {submitting ? "…" : c("submit")}
                </motion.button>
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
