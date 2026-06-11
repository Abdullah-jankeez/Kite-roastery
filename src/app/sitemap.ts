import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

const LOCALES = ["en", "ar"] as const;

const STATIC_PATHS = [
  "",
  "/about",
  "/coffee",
  "/shop",
  "/brewing",
  "/wholesale",
  "/subscriptions",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const pagePaths = [
    ...STATIC_PATHS,
    ...products
      .filter((p) => p.category === "beans")
      .map((p) => `/coffee/${p.id}`),
  ];

  for (const path of pagePaths) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/coffee/") ? 0.8 : 0.6,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${path}`,
            ar: `${SITE_URL}/ar${path}`,
          },
        },
      });
    }
  }

  return entries;
}
