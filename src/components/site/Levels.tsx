import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/* ───────── Niveau 2: intro-gordijn ───────── */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");
  const [n, setN] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / 1500);
      setN(Math.round(p * 100));
      if (p >= 1) clearInterval(iv);
    }, 40);
    // CSS-gestuurd en met harde bovengrenzen: het gordijn mag nooit blijven hangen
    const t1 = setTimeout(() => setPhase("out"), 1750);
    const t2 = setTimeout(() => {
      setPhase("gone");
      onDone();
    }, 2750);
    return () => {
      clearInterval(iv);
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink text-background"
      style={{
        transform: phase === "out" ? "translateY(-100%)" : "none",
        transition: "transform 950ms cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="flex items-center gap-3 font-display text-[16vw] leading-none md:text-[9vw]">
        <span className="pre-dot h-[0.28em] w-[0.28em] rounded-full bg-accent" />
        {"novela".split("").map((c, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className="pre-letter inline-block"
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              {c}
            </span>
          </span>
        ))}
      </div>
      <div className="mt-8 w-56 md:w-80">
        <div className="h-px w-full bg-background/20">
          <div className="h-px bg-accent" style={{ width: `${n}%` }} />
        </div>
        <div className="mt-3 flex justify-between text-xs uppercase tracking-[0.25em] text-background/60">
          <span>Webdesign studio</span>
          <span className="tabular-nums">{n}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────── Niveau 2: band die versnelt en scheeftrekt met scrollen ───────── */
const WORDS = ["Websites", "Webshops", "SEO", "Live in 14 dagen", "Vaste prijs"];

export function VelocityBand() {
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const sv = useSpring(vel, { damping: 50, stiffness: 400 });
  const skew = useTransform(sv, [-3000, 3000], [9, -9], { clamp: true });
  const pos = useRef(0);
  const x = useMotionValue("0%");

  useAnimationFrame((_, delta) => {
    const speed = 0.012 * delta + Math.abs(sv.get()) * delta * 0.00004;
    pos.current -= speed;
    if (pos.current <= -50) pos.current += 50;
    x.set(`${pos.current}%`);
  });

  const set = (
    <>
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center gap-[0.35em] pr-[0.35em]">
          <span
            className={
              i % 2
                ? "text-accent"
                : "text-transparent [-webkit-text-stroke:2px_var(--color-ink)] md:[-webkit-text-stroke:3px_var(--color-ink)]"
            }
          >
            {w}
          </span>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <section aria-hidden className="overflow-hidden bg-background py-6 md:py-10">
      <motion.div style={{ skewX: skew }}>
        <motion.div
          style={{ x }}
          className="flex w-max whitespace-nowrap font-display text-[16vw] leading-[1.05] md:text-[9vw]"
        >
          {set}
          {set}
          {set}
          {set}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────── Niveau 3: gepinde horizontale galerij ───────── */
type Mini = {
  url: string;
  brand: string;
  title: [string, string];
  cta: string;
  bg: string;
  fg: string;
  accent: string;
  tiles: [string, string, string];
};

const MINIS: Mini[] = [
  {
    url: "bakkerijdekorst.nl",
    brand: "De Korst",
    title: ["Vers brood,", "elke ochtend."],
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
    cta: "Offerte aanvragen",
    bg: "#EAF1EC",
    fg: "#14261B",
    accent: "#2F8F5B",
    tiles: ["#B7D8C3", "#2F8F5B", "#14402A"],
  },
  {
    url: "trattorialupo.nl",
    brand: "Lupo",
    title: ["Tafel voor", "twee?"],
    cta: "Reserveren",
    bg: "#FFE9D6",
    fg: "#3B1209",
    accent: "#E0452B",
    tiles: ["#F7B79B", "#E0452B", "#7C1E0E"],
  },
  {
    url: "atelierwonen.nl",
    brand: "Atelier Wonen",
    title: ["Ruimte voor", "jouw stijl."],
    cta: "Bekijk portfolio",
    bg: "#E8EEF2",
    fg: "#10222E",
    accent: "#2D6C9C",
    tiles: ["#B6CCDB", "#2D6C9C", "#12344D"],
  },
  {
    url: "lieke-coaching.nl",
    brand: "Lieke Coaching",
    title: ["Groei begint", "met een gesprek."],
    cta: "Plan kennismaking",
    bg: "#E3F4F1",
    fg: "#082E29",
    accent: "#15998A",
    tiles: ["#A9E0D8", "#15998A", "#0B4D44"],
  },
];

function MiniCard({ m }: { m: Mini }) {
  return (
    <div className="w-[78vw] shrink-0 overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_40px_80px_-30px_rgba(60,20,10,0.4)] md:w-[34vw] md:max-w-[520px]">
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#F6F1EA] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="mx-auto w-[60%] rounded-md bg-white px-3 py-1 text-center text-[10px] text-black/55">
          {m.url}
        </div>
      </div>
      <div
        className="grid aspect-[16/11] grid-cols-[1.15fr_1fr] gap-4 p-5"
        style={{ background: m.bg, color: m.fg }}
      >
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2 font-display text-[15px] font-semibold">
            <span className="h-3 w-3 rounded-full" style={{ background: m.accent }} />
            {m.brand}
          </div>
          <div>
            <div className="font-display text-[clamp(22px,2.4vw,34px)] leading-[1.02] tracking-tight">
              {m.title[0]}
              <br />
              <span className="italic" style={{ color: m.accent }}>
                {m.title[1]}
              </span>
            </div>
            <div
              className="mt-3 w-fit rounded-full px-3 py-1.5 text-[10px] font-semibold text-white"
              style={{ background: m.accent }}
            >
              {m.cta} →
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {m.tiles.map((c, i) => (
            <div
              key={c}
              className={`rounded-xl ${i === 0 ? "row-span-2" : ""}`}
              style={{ background: `linear-gradient(145deg, ${c}, ${m.accent}66)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PinnedGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-58%"]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-surface">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="text-base uppercase tracking-[0.24em] text-ink-soft">Elke branche</div>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] text-ink md:text-7xl xl:text-8xl">
            Eén studio, <span className="italic text-accent">elke stijl.</span>
          </h2>
        </div>
        <motion.div style={{ x }} className="mt-10 flex gap-6 pl-6 md:mt-14 md:gap-10 lg:pl-12">
          {MINIS.map((m) => (
            <MiniCard key={m.url} m={m} />
          ))}
        </motion.div>
        <div className="mx-auto mt-10 h-px w-[calc(100%-3rem)] max-w-[1500px] bg-ink/15 md:mt-14">
          <motion.div style={{ width: bar }} className="h-px bg-accent" />
        </div>
      </div>
    </section>
  );
}
