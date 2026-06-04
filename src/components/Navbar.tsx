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

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/coffee`, label: t("coffee") },
    { href: `/${locale}/shop`, label: t("shop") },
    { href: `/${locale}/brewing`, label: t("brewing") },
    { href: `/${locale}/wholesale`, label: t("wholesale") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(40,40,38,0.72)" : "rgba(40,40,38,1)",
      }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 text-white ${
        scrolled ? "glass-dark shadow-lg" : "shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{ height: scrolled ? 64 : 80 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          {/* Logo — official KITE master artwork (full lockup, white-on-dark) */}
          <Link
            href={`/${locale}`}
            className="group flex items-center"
            aria-label="Kite Coffee Roastery — Home"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              animate={{ width: scrolled ? 190 : 240, height: scrolled ? 52 : 64 }}
              className="relative"
            >
              <Image
                src="/logo/kite-full-white.png"
                alt="Kite Coffee Roastery"
                fill
                priority
                sizes="240px"
                className="object-contain object-left group-hover:opacity-90 transition-opacity"
              />
            </motion.div>
          </Link>

          {/* Desktop links — animated active pill */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-3 py-2 rounded-full transition-colors ${
                    active ? "text-[#383836]" : "text-white/90 hover:text-[#91d3c7]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "#91d3c7" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={switchLocale}
              className="text-xs font-semibold border border-white/30 rounded-full px-3 py-1.5 hover:border-[#91d3c7] hover:text-[#91d3c7] transition-colors cursor-pointer"
            >
              {otherLabel}
            </button>

            {/* Cart */}
            <Link
              href={`/${locale}/cart`}
              className="relative p-1.5 rounded-full hover:text-[#91d3c7] hover:bg-white/5 transition-colors"
              aria-label="Cart"
            >
              <Icon name="cart" className="h-6 w-6" />
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1 cursor-pointer"
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
              <div className="pb-4 border-t border-white/10 pt-3 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                      isActive(l.href)
                        ? "bg-[#91d3c7] text-[#383836] font-semibold"
                        : "hover:text-[#91d3c7] hover:bg-white/5"
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
