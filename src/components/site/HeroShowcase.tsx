import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type Theme = {
  url: string;
  brand: string;
  title: [string, string];
  sub: string;
  cta: string;
  bg: string;
  fg: string;
  accent: string;
  tiles: string[];
};

const THEMES: Theme[] = [
  {
    url: "bakkerijdekorst.nl",
    brand: "De Korst",
    title: ["Vers brood,", "elke ochtend."],
    sub: "Ambachtelijke bakkerij in het hart van de stad.",
    cta: "Bestel online",
    bg: "#FFF4E0",
    fg: "#3A2412",
    accent: "#D9822B",
    tiles: ["#F0C987", "#D9822B", "#8A4B1E"],
  },
  {
    url: "studiomila.nl",
    brand: "Studio Mila",
    title: ["Jouw haar,", "ons vak."],
    sub: "Boek in 30 seconden je volgende afspraak.",
    cta: "Afspraak maken",
    bg: "#F4EFFA",
    fg: "#231A38",
    accent: "#7C5CE0",
    tiles: ["#CDBEF2", "#7C5CE0", "#35245F"],
  },
  {
    url: "vandijkbouw.nl",
    brand: "Van Dijk Bouw",
    title: ["Bouwen met", "vakmanschap."],
    sub: "Verbouwing, uitbouw of nieuwbouw. Vaste prijs.",
    cta: "Offerte aanvragen",
    bg: "#EAF1EC",
    fg: "#14261B",
    accent: "#2F8F5B",
    tiles: ["#B7D8C3", "#2F8F5B", "#14402A"],
  },
];

function Typed({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let int: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      int = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(int);
      }, 38);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(int);
    };
  }, [text, delay, reduce]);
  return <>{text.slice(0, n)}</>;
}

function MiniSite({ t }: { t: Theme }) {
  return (
    <motion.div
      key={t.url}
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col"
      style={{ background: t.bg, color: t.fg }}
    >
      {/* nav */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-2 font-display text-[15px] font-semibold">
          <span className="h-3 w-3 rounded-full" style={{ background: t.accent }} />
          {t.brand}
        </div>
        <div className="flex gap-3 text-[9px] opacity-60">
          <span>Home</span>
          <span>Over</span>
          <span>Contact</span>
        </div>
      </div>

      {/* hero */}
      <div className="grid flex-1 grid-cols-[1.15fr_1fr] gap-4 px-5 pb-5 pt-4">
        <div className="flex flex-col justify-center">
          <div className="font-display text-[26px] leading-[1.02] tracking-tight">
            <Typed text={t.title[0]} delay={250} />
            <br />
            <span style={{ color: t.accent }} className="italic">
              <Typed text={t.title[1]} delay={250 + t.title[0].length * 38} />
            </span>
          </div>
          <div className="mt-2 text-[9.5px] leading-snug opacity-70">{t.sub}</div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 18 }}
            className="mt-3 w-fit rounded-full px-3 py-1.5 text-[9.5px] font-semibold text-white"
            style={{ background: t.accent }}
          >
            {t.cta} →
          </motion.div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {t.tiles.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-xl ${i === 0 ? "row-span-2" : ""}`}
              style={{
                background: `linear-gradient(145deg, ${c}, ${t.accent}55)`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Chip({
  children,
  className,
  depth,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  depth: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 16 }}
      className={`absolute ${className}`}
      style={{ transform: `translateZ(${depth}px)` }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + depth / 40, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-2 whitespace-nowrap rounded-2xl border border-white/60 bg-white/80 px-4 py-2.5 shadow-[0_18px_40px_-12px_rgba(120,40,20,0.35)] backdrop-blur-md"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroShowcase() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-22, -4]);
  const rotX = useTransform(sy, [-1, 1], [14, 2]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % THEMES.length), 4200);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const t = THEMES[idx];

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mx-auto w-full max-w-[640px]"
      style={{ perspective: 1600 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, rotateY: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", rotateY: rotY, rotateX: rotX }}
        className="relative"
      >
        {/* browser */}
        <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-[0_60px_120px_-30px_rgba(110,35,15,0.55),0_20px_40px_-20px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-2 border-b border-black/5 bg-[#F6F1EA] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <div className="mx-auto flex w-[62%] items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1 text-[10px] text-black/55">
              <span className="text-[8px]">🔒</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={t.url}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {t.url}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="relative aspect-[16/10.5]">
            <AnimatePresence mode="wait">
              <MiniSite t={t} key={t.url} />
            </AnimatePresence>
          </div>
        </div>

        {/* zwevende chips met diepte */}
        <Chip className="-left-6 top-[18%] sm:-left-12" depth={90} delay={1.4}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 font-display text-sm font-bold text-emerald-700">
            100
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-semibold text-black">Lighthouse</span>
            <span className="block text-[10px] text-black/50">Razendsnel</span>
          </span>
        </Chip>

        <Chip className="-right-3 top-[-4%] sm:-right-8" depth={130} delay={1.7}>
          <span className="text-lg">🚀</span>
          <span className="leading-tight">
            <span className="block text-[11px] font-semibold text-black">Live in 14 dagen</span>
            <span className="block text-[10px] text-black/50">Zonder gedoe</span>
          </span>
        </Chip>

        <Chip className="-bottom-6 right-[8%]" depth={70} delay={2}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E94F37]/15 text-sm text-[#E94F37]">
            ↗
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-semibold text-black">SEO inbegrepen</span>
            <span className="block text-[10px] text-black/50">Gevonden op Google</span>
          </span>
        </Chip>
      </motion.div>
    </div>
  );
}
