"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import Icon, { IconName } from "@/components/Icon";

const guides: {
  key: "pourOver" | "frenchPress" | "espresso" | "coldBrew" | "aeropress";
  icon: IconName;
  color: string;
  ratio: string;
  temp: string;
  time: string;
  grind: string;
  steps: string[];
}[] = [
  {
    key: "pourOver",
    icon: "droplet",
    color: "#91d3c7",
    ratio: "1:15",
    temp: "92–96°C",
    time: "3–4 min",
    grind: "Medium-Fine",
    steps: [
      "Rinse your filter with hot water and discard.",
      "Add 20g of medium-fine ground coffee.",
      "Bloom: pour 50ml of water, wait 30 seconds.",
      "Continue pouring in slow circles up to 300ml.",
      "Total brew time: 3–4 minutes.",
    ],
  },
  {
    key: "frenchPress",
    icon: "beaker",
    color: "#fdd451",
    ratio: "1:12",
    temp: "93–95°C",
    time: "4 min",
    grind: "Coarse",
    steps: [
      "Add 30g of coarsely ground coffee.",
      "Pour 360ml of hot water, stir gently.",
      "Place the lid on (don't press yet). Wait 4 minutes.",
      "Press the plunger slowly and steadily.",
      "Pour immediately to avoid over-extraction.",
    ],
  },
  {
    key: "espresso",
    icon: "zap",
    color: "#e79a3d",
    ratio: "1:2",
    temp: "90–93°C",
    time: "25–30 sec",
    grind: "Fine",
    steps: [
      "Dose 18–20g of finely ground coffee into the portafilter.",
      "Distribute evenly and tamp with 15–20kg pressure.",
      "Lock in and start the shot immediately.",
      "Target 36–40g out in 25–30 seconds.",
      "Adjust grind size if time is off.",
    ],
  },
  {
    key: "coldBrew",
    icon: "thermometer",
    color: "#303895",
    ratio: "1:8",
    temp: "Cold water",
    time: "12–18 hrs",
    grind: "Extra Coarse",
    steps: [
      "Combine 100g extra-coarse ground coffee with 800ml cold water.",
      "Stir gently to ensure all grounds are saturated.",
      "Cover and refrigerate for 12–18 hours.",
      "Strain through a fine mesh or coffee filter.",
      "Serve over ice. Keeps in the fridge for up to 2 weeks.",
    ],
  },
  {
    key: "aeropress",
    icon: "settings",
    color: "#f179af",
    ratio: "1:10",
    temp: "80–85°C",
    time: "2 min",
    grind: "Medium",
    steps: [
      "Insert filter, rinse. Place AeroPress on a sturdy cup.",
      "Add 17g of medium ground coffee.",
      "Pour 170ml of water at 80–85°C, stir for 10 seconds.",
      "Attach plunger and wait 1 minute.",
      "Press down slowly over 30 seconds. Enjoy!",
    ],
  },
];

export default function BrewingPage() {
  const t = useTranslations("brewing");

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      {/* Guides */}
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-12">
        {guides.map((g, idx) => (
          <FadeIn key={g.key} delay={idx * 0.05}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              {/* Accent stripe (reveals on hover) */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: g.color }}
              />

              {/* Guide header — living gradient */}
              <div
                className="relative flex items-center gap-4 px-8 py-6 overflow-hidden bg-grain"
                style={{
                  background:
                    "linear-gradient(120deg, #383836 0%, #4a4a48 50%, #383836 100%)",
                }}
              >
                <motion.div
                  className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 blur-2xl"
                  style={{ background: g.color }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 6 + idx,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.span
                  className="relative w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg"
                  style={{ backgroundColor: g.color }}
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon name={g.icon} className="w-8 h-8 text-[#383836]" strokeWidth={1.8} />
                </motion.span>
                <div className="relative">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-white">{t(g.key)}</h2>
                  <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="scaleRatio" className="w-3.5 h-3.5" /> {g.ratio} ratio
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="thermometer" className="w-3.5 h-3.5" /> {g.temp}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="timer" className="w-3.5 h-3.5" /> {g.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="settings" className="w-3.5 h-3.5" /> {g.grind}
                    </span>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <ol className="p-8 flex flex-col gap-4">
                {g.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex gap-4 text-sm leading-relaxed text-gray-600 group/step"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5 shadow-sm"
                      style={{ backgroundColor: g.color }}
                    >
                      {i + 1}
                    </motion.span>
                    <span className="group-hover/step:text-[#383836] transition-colors">
                      {step}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
