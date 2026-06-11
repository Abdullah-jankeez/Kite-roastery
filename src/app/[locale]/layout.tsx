import type { Metadata } from "next";
import { Poppins, Cormorant } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartToast from "@/components/CartToast";
import ScrollProgress from "@/components/ScrollProgress";
import FlyToCart from "@/components/FlyToCart";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    languages: { en: "/en", ar: "/ar" },
  },
  title: {
    default: "Kite Coffee Roastery",
    template: "%s · Kite Coffee Roastery",
  },
  description:
    "Specialty coffee roasted with passion in Baghdad, Iraq. A sip lifts you up!",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Kite Coffee Roastery",
    description:
      "Specialty coffee roasted with passion in Baghdad, Iraq. A sip lifts you up!",
    siteName: "Kite Coffee Roastery",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Kite Coffee Roastery" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kite Coffee Roastery",
    description: "Specialty coffee roasted with passion in Baghdad, Iraq.",
    images: ["/og-image.png"],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${poppins.variable} ${cormorant.variable}`}>
      <body style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
            <CartToast />
            <FlyToCart />
            <Analytics />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
