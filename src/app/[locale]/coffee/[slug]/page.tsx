import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductById } from "@/lib/products";
import CoffeeDetail from "@/components/CoffeeDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) return { title: "Coffee" };
  return {
    title: product.nameEn,
    description: product.descEn,
  };
}

export default async function CoffeeBeanPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductById(slug);

  // Only coffee beans have detail pages.
  if (!product || product.category !== "beans") {
    notFound();
  }

  const beanIndex = products
    .filter((p) => p.category === "beans")
    .findIndex((p) => p.id === slug);

  return <CoffeeDetail product={product} index={beanIndex} />;
}
