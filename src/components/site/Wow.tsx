import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const PANEL: [string, string][] = [
  ["7 dagen", "tot live"],
  ["€450", "vanaf, vaste prijs"],
  ["5,0 ★", "klantbeoordeling"],
  ["SEO", "inbegrepen"],
];

/** Variant 3: zwevend paneel dat over de rand van de hero valt, met knop. */
function FactsPanel() {
  return (
    <section className="relative z-10 -mt-10 bg-[linear-gradient(to_bottom,transparent_2.5rem,var(--color-background)_2.5rem)] px-6 pb-10 md:-mt-14 md:bg-[linear-gradient(to_bottom,transparent_3.5rem,var(--color-background)_3.5rem)] lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-[1400px] items-center gap-6 rounded-[28px] bg-ink p-6 text-background shadow-[0_40px_80px_-30px_rgba(40,12,6,0.55)] md:p-8 lg:grid-cols-[1fr_auto] lg:gap-10"
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {PANEL.map(([a, b], i) => (
            <div key={a} className={i > 0 ? "md:border-l md:border-background/15 md:pl-6" : ""}>
              <div className="font-display text-3xl leading-none text-accent md:text-4xl">{a}</div>
              <div className="mt-2 text-sm text-background/70">{b}</div>
            </div>
          ))}
        </div>
        <Link
          to="/offerte"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          Plan een gesprek
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>
    </section>
  );
}

export function FactsStrip() {
  return <FactsPanel />;
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
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  tilt?: boolean;
}) {
  const rxRaw = useMotionValue(0);
  const ryRaw = useMotionValue(0);
  const rx = useSpring(rxRaw, { stiffness: 200, damping: 18 });
  const ry = useSpring(ryRaw, { stiffness: 200, damping: 18 });
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
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
        if (tilt) {
          ryRaw.set(((e.clientX - r.left) / r.width - 0.5) * 14);
          rxRaw.set(((e.clientY - r.top) / r.height - 0.5) * -14);
        }
      }}
      onPointerLeave={() => {
        mx.set(-300);
        my.set(-300);
        rxRaw.set(0);
        ryRaw.set(0);
      }}
      className={`group relative ${className}`}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 800 } : undefined}
    >
      <motion.div
        aria-hidden
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
