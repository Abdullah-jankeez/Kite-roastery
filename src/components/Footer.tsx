"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  }

  const links = [
    { href: `/${locale}`, label: nav("home") },
    { href: `/${locale}/about`, label: nav("about") },
    { href: `/${locale}/shop`, label: nav("shop") },
    { href: `/${locale}/brewing`, label: nav("brewing") },
    { href: `/${locale}/wholesale`, label: nav("wholesale") },
    { href: `/${locale}/contact`, label: nav("contact") },
  ];

  return (
    <footer style={{ backgroundColor: "#383836" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand — official Kite Coffee Roastery master artwork (white variant) */}
          <div>
            <div className="mb-4 relative h-20 w-full max-w-[260px]">
              <Image
                src="/logo/kite-full-white.png"
                alt="Kite Coffee Roastery"
                fill
                sizes="260px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-gray-400">{t("tagline")}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-gray-400">
              <a
                href="https://maps.google.com/?q=33.30714416503906,44.44929504394531"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#91d3c7] transition-colors"
              >
                📍 {locale === "ar" ? "العراق / بغداد / الكرادة / مجاور حلويات الخاصكي" : "Karada, Baghdad, Iraq"}
              </a>
              <a
                href="tel:07846221065"
                className="hover:text-[#91d3c7] transition-colors"
              >
                📞 07846221065
              </a>
              <a
                href="mailto:Kiteroastery@gmail.com"
                className="hover:text-[#91d3c7] transition-colors"
              >
                ✉️ Kiteroastery@gmail.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest text-gray-300">
              {t("links")}
            </h3>
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-[#91d3c7] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest text-gray-300">
              {t("newsletter")}
            </h3>
            {subscribed ? (
              <p className="text-[#91d3c7] text-sm">{t("newsletterSuccess")}</p>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="flex flex-col gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  required
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#91d3c7] text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#fdd451", color: "#383836" }}
                >
                  {t("newsletterBtn")}
                </button>
              </form>
            )}

            {/* Social */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-widest text-gray-300">
                {t("social")}
              </h3>
              <a
                href="https://www.instagram.com/kiteroastery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#91d3c7] transition-colors"
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
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
