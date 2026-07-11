"use client";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import Icon from "@/components/Icon";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "en" ? "ar" : "en";
  const otherLabel = locale === "en" ? "العربية" : "English";

  function switchLocale() {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    router.push(segments.join("/") || `/${otherLocale}`);
  }

  // Per client direction: Shop – Subscription – Wholesale – About.
  // (Other pages stay reachable through the footer; the logo is the home button.)
  const links = [
    { href: `/${locale}/shop`, label: t("shop") },
    { href: `/${locale}/subscriptions`, label: t("subscriptions") },
    { href: `/${locale}/wholesale`, label: t("wholesale") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.72)" : "rgba(250,249,247,1)",
      }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 text-[#383836] ${
        scrolled ? "glass-light shadow-md" : "shadow-sm border-b border-black/5"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{ height: scrolled ? 72 : 92 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
        >
          {/* LEFT — desktop nav links (+ mobile hamburger) */}
          <div className="flex items-center justify-start">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1 -ms-1 cursor-pointer"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop links — plain text, simple underline on hover (coffeecollective style) */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`pb-0.5 border-b transition-colors text-[#383836] ${
                      active
                        ? "border-[#383836]"
                        : "border-transparent hover:border-[#383836]"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CENTER — bigger logo, acts as the home button */}
          <Link
            href={`/${locale}`}
            className="group flex items-center justify-center"
            aria-label="Kite Coffee Roastery — Home"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative transition-all duration-300"
              style={{
                width: scrolled ? "clamp(180px, 42vw, 250px)" : "clamp(200px, 48vw, 310px)",
                height: scrolled ? 58 : 74,
              }}
            >
              <Image
                src="/logo/kite-full-dark.png"
                alt="Kite Coffee Roastery"
                fill
                priority
                sizes="310px"
                className="object-contain object-center group-hover:opacity-90 transition-opacity"
              />
            </motion.div>
          </Link>

          {/* RIGHT — language toggle + cart */}
          <div className="flex items-center justify-end gap-3">
            {/* Language toggle — plain text, underline on hover */}
            <button
              onClick={switchLocale}
              className="text-sm font-medium text-[#383836] pb-0.5 border-b border-transparent hover:border-[#383836] transition-colors cursor-pointer"
            >
              {otherLabel}
            </button>

            {/* Cart — icon only */}
            <Link
              id="cart-target"
              href={`/${locale}/cart`}
              className="relative p-1.5 text-[#383836] hover:opacity-70 transition-opacity"
              aria-label="Cart"
            >
              {/* key remount wiggles the icon whenever the count changes */}
              <motion.span
                key={count}
                className="block"
                initial={false}
                animate={{ rotate: [0, -14, 12, -6, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Icon name="cart" className="h-6 w-6" />
              </motion.span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                    style={{ backgroundColor: "#fdd451", color: "#383836" }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pb-4 border-t border-black/10 pt-3 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                      isActive(l.href)
                        ? "bg-[#91d3c7] text-[#383836] font-semibold"
                        : "text-[#383836]/80 hover:text-[#3f9c8b] hover:bg-black/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
