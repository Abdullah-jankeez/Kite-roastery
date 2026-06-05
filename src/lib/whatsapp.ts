/** Kite Coffee WhatsApp number in international format (no +). */
export const KITE_WHATSAPP = "9647846221065";

/** Build a wa.me link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${KITE_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/** Open WhatsApp with the given message in a new tab. */
export function openWhatsApp(message: string): void {
  if (typeof window !== "undefined") {
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }
}
