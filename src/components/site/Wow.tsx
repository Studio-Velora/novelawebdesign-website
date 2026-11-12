import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Telt omhoog naar `to` zodra het in beeld komt. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const fmt = (v: number) =>
    prefix +
    v.toLocaleString("nl-NL", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce || !inView) {
      el.textContent = fmt(reduce ? to : 0);
      return;
    }
    const c = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = fmt(v);
      },
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, reduce]);

  return <span ref={ref}>{fmt(0)}</span>;
}

const FACTS: { to: number; decimals?: number; prefix?: string; suffix?: string; label: string }[] =
  [
    { to: 14, label: "dagen tot jouw website live staat" },
    { to: 450, prefix: "€", label: "vanaf, met vaste prijs vooraf" },
    { to: 5, decimals: 1, label: "gemiddelde klantbeoordeling" },
    { to: 1, label: "aanspreekpunt: degene die bouwt" },
  ];

export function FactsStrip() {
  return (
    <section className="relative bg-ink text-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 px-6 lg:grid-cols-4 lg:px-12">
        {FACTS.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`py-10 md:py-14 ${i > 0 ? "lg:border-l lg:border-background/15 lg:pl-10" : ""} ${
              i % 2 === 1 ? "pl-6 lg:pl-10" : ""
            }`}
          >
            <div className="font-display text-6xl leading-none text-accent md:text-7xl xl:text-8xl">
              <CountUp {...f} />
            </div>
            <div className="mt-3 max-w-[16rem] text-sm text-background/70">{f.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Word({
  word,
  range,
  progress,
  accent,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] inline-block ${accent ? "italic text-accent" : ""}`}
    >
      {word}
    </motion.span>
  );
}

/** Grote tekst die woord voor woord oplicht terwijl je scrolt. */
export function ScrollStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const text =
    "Je website is het eerste wat klanten van je zien. Wij bouwen er een die opvalt, razendsnel laadt en bezoekers verandert in klanten.";
  const accents = new Set(["opvalt,", "klanten."]);
  const words = text.split(" ");

  return (
    <section className="bg-background py-32 md:py-52">
      <div ref={ref} className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="font-display text-4xl leading-[1.12] text-ink md:text-6xl xl:text-7xl">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={`${w}-${i}`}
                word={w}
                range={[start, end]}
                progress={scrollYProgress}
                accent={accents.has(w)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Kaart met een lichtvlek die de muis volgt. */
export function SpotlightCard({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const bg = useTransform(
    [mx, my] as MotionValue<number>[],
    ([x, y]: number[]) =>
      `radial-gradient(360px circle at ${x}px ${y}px, ${
        dark ? "rgba(233,79,55,0.28)" : "rgba(233,79,55,0.16)"
      }, transparent 70%)`,
  );

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-300);
        my.set(-300);
      }}
      className={`group relative ${className}`}
    >
      <motion.div
        aria-hidden
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
