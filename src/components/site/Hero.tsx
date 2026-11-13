import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { RevealWords } from "./Reveal";
import { HeroShowcase } from "./HeroShowcase";
import { RepelText } from "./RepelText";

const Hero3D = lazy(() => import("./Hero3D").then((m) => ({ default: m.Hero3D })));
const HeroWebGL = lazy(() => import("./HeroWebGL").then((m) => ({ default: m.HeroWebGL })));

export function Hero({ level = 1 }: { level?: number }) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      {/* WebGL backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
        <Suspense fallback={null}>
          <HeroWebGL level={level} />
        </Suspense>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1600px] flex-col justify-between px-6 lg:px-12">
        <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-soft"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Welkom bij Novela Webdesign
            </motion.div>

            <h1 className="mt-8 font-display text-[14vw] leading-[1.04] tracking-tight text-ink md:text-[10vw] lg:text-[6.2rem] xl:text-[7.6rem] 2xl:text-[9rem]">
              {level >= 4 ? (
                <>
                  <RepelText text="Digitaal" delay={0.1} /> <br />
                  <span className="italic">
                    <RepelText text="webdesign" className="text-accent" delay={0.4} />
                  </span>{" "}
                  <br />
                  <RepelText text="studio." delay={0.9} />
                </>
              ) : (
                <>
                  <RevealWords text="Digitaal" /> <br />
                  <span className="italic">
                    <RevealWords text="webdesign" wordClassName="text-accent" />
                  </span>{" "}
                  <br />
                  <RevealWords text="studio." />
                </>
              )}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-8 max-w-2xl text-lg text-ink-soft xl:text-xl"
            >
              Wij helpen ondernemers en bedrijven schaalbare digitale producten bouwen — met
              doordacht design en zorgvuldige ontwikkeling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-4"
            >
              <Magnetic strength={20}>
                <Link
                  to="/pakketten"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-9 py-5 text-base font-semibold text-background"
                >
                  <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative">Bekijk pakketten en prijzen</span>
                  <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
              <Magnetic strength={15}>
                <Link
                  to="/portfolio"
                  className="rounded-full border border-ink/20 px-9 py-5 text-base font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-background"
                >
                  Bekijk ons werk
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.8 }}
              className="mt-6 flex items-center gap-2 text-sm text-ink-soft"
            >
              <span className="text-accent tracking-tight">★★★★★</span>
              <span>
                <strong className="font-semibold text-ink">5.0</strong> op basis van
                klantbeoordelingen
              </span>
            </motion.div>
          </div>

          {level >= 5 ? (
            <div className="lg:pr-4 xl:pr-6">
              <Suspense fallback={null}>
                <Hero3D />
              </Suspense>
            </div>
          ) : (
            <div className="hidden md:block lg:pr-4 xl:pr-10">
              <HeroShowcase />
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 pb-10"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface/70 px-4 py-2 text-sm shadow-sm">
              <span className="text-ink-soft">Websites</span>
              <strong className="font-semibold text-accent">vanaf €450</strong>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface/70 px-4 py-2 text-sm shadow-sm">
              <span className="text-ink-soft">Webshops</span>
              <strong className="font-semibold text-accent">vanaf €1.450</strong>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface/70 px-4 py-2 text-sm text-ink-soft shadow-sm">
              <span className="font-bold text-emerald-600">✓</span> SEO inbegrepen
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
