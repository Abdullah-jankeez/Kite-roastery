/**
 * Canonical site URL used for metadata, sitemap, and structured data.
 * Override with NEXT_PUBLIC_SITE_URL in Vercel once the custom GoDaddy
 * domain is connected — everything else picks it up automatically.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kite-roastery-roan.vercel.app";

export const SITE_NAME = "Kite Coffee Roastery";
