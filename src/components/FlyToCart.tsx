"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Flight = {
  id: number;
  src: string;
  from: { x: number; y: number; w: number; h: number };
  to: { x: number; y: number };
};

/** Fire from any product card: sends an image flying into the navbar cart. */
export function flyToCart(src: string, fromEl: HTMLElement | null) {
  if (typeof window === "undefined" || !fromEl || !src) return;
  const r = fromEl.getBoundingClientRect();
  window.dispatchEvent(
    new CustomEvent("kite:fly", {
      detail: { src, from: { x: r.left, y: r.top, w: r.width, h: r.height } },
    })
  );
}

let nextId = 1;

/**
 * Renders the in-flight product images. Mounted once in the locale layout.
 * Listens for "kite:fly" events and animates a shrinking copy of the product
 * photo into the #cart-target icon in the navbar.
 */
export default function FlyToCart() {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    function onFly(e: Event) {
      const { src, from } = (e as CustomEvent).detail as {
        src: string;
        from: Flight["from"];
      };
      const target = document.getElementById("cart-target");
      if (!target) return;
      const t = target.getBoundingClientRect();
      setFlights((prev) => [
        ...prev,
        {
          id: nextId++,
          src,
          from,
          to: { x: t.left + t.width / 2, y: t.top + t.height / 2 },
        },
      ]);
    }
    window.addEventListener("kite:fly", onFly);
    return () => window.removeEventListener("kite:fly", onFly);
  }, []);

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none" aria-hidden>
      <AnimatePresence>
        {flights.map((f) => (
          <motion.img
            key={f.id}
            src={f.src}
            alt=""
            className="absolute rounded-xl object-cover shadow-xl"
            style={{ width: f.from.w, height: f.from.h }}
            initial={{ x: f.from.x, y: f.from.y, scale: 1, opacity: 0.95 }}
            animate={{
              x: f.to.x - f.from.w / 2,
              y: f.to.y - f.from.h / 2,
              scale: 0.08,
              opacity: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.3, 0.7, 0.4, 1] }}
            onAnimationComplete={() =>
              setFlights((prev) => prev.filter((x) => x.id !== f.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
