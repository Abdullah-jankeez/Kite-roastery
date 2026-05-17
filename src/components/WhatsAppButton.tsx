"use client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function WhatsAppButton() {
  const locale = useLocale();
  const message = locale === "ar"
    ? "مرحباً، أريد الطلب من كايت كوفي روستري"
    : "Hello, I'd like to place an order from Kite Coffee Roastery";

  const phone = "9647846221065"; // international format, no +
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order via WhatsApp"
      className="ping-soft fixed bottom-6 end-6 z-50 flex items-center gap-2 rounded-full shadow-2xl text-white text-sm font-semibold px-4 py-3"
      style={{ backgroundColor: "#25D366" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 fill-white flex-shrink-0"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.437-2.01A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.854l-.486-.289-5.008 1.194 1.22-4.878-.317-.501A13.267 13.267 0 012.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.27-9.878c-.398-.199-2.356-1.162-2.72-1.295-.365-.133-.631-.199-.897.199s-1.029 1.295-1.261 1.561-.464.299-.862.1c-.398-.199-1.681-.619-3.202-1.977-1.184-1.056-1.983-2.361-2.215-2.759-.232-.398-.025-.613.174-.811.179-.179.398-.464.597-.696.199-.232.265-.398.398-.664.133-.265.066-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.777-.653-.672-.897-.684l-.764-.013c-.265 0-.697.1-1.062.498s-1.394 1.362-1.394 3.322 1.428 3.853 1.627 4.119c.199.265 2.809 4.287 6.806 5.013 4 .727 4 .484 4.722.454.722-.03 2.356-.963 2.688-1.894.332-.931.332-1.729.232-1.894-.099-.165-.365-.265-.763-.464z"/>
      </svg>
      <span className="hidden sm:block">
        {locale === "ar" ? "اطلب عبر واتساب" : "Order via WhatsApp"}
      </span>
    </motion.a>
  );
}
