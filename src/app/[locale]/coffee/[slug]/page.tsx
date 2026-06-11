import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductById } from "@/lib/products";
import CoffeeDetail from "@/components/CoffeeDetail";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductById(slug);
  if (!product) return { title: "Coffee" };

  const isAr = locale === "ar";
  const title = isAr ? product.nameAr : product.nameEn;
  const description = isAr ? product.descAr : product.descEn;
  const image = product.origin?.heroImage || product.image || "/og-image.png";
  const path = `/coffee/${product.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, ar: `/ar${path}` },
    },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      type: "website",
      url: `/${locale}${path}`,
      images: [{ url: image, width: 1400, height: 933, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CoffeeBeanPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductById(slug);

  // Only coffee beans have detail pages.
  if (!product || product.category !== "beans") {
    notFound();
  }

  const beanIndex = products
    .filter((p) => p.category === "beans")
    .findIndex((p) => p.id === slug);

  const isAr = locale === "ar";

  // Product structured data so Google can show rich results (price, brand).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isAr ? product.nameAr : product.nameEn,
    description: isAr ? product.descAr : product.descEn,
    image: product.origin?.heroImage
      ? `${SITE_URL}${product.origin.heroImage}`
      : undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IQD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/${locale}/coffee/${product.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoffeeDetail product={product} index={beanIndex} />
    </>
  );
}
