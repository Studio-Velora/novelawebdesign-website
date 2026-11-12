import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { ServiceStack, ServiceStackMobile } from "@/components/site/ServiceStack";
import { BentoFeatures } from "@/components/site/BentoFeatures";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { TestimonialMarquee } from "@/components/site/TestimonialMarquee";
import { FaqList } from "@/components/site/FaqList";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { SectionLabel, ParallaxY } from "@/components/site/Section";
import { Magnetic } from "@/components/site/Magnetic";
import { FactsStrip, ScrollStatement, SpotlightCard } from "@/components/site/Wow";
import { AUDIENCES, PROMISES, SEO_STEPS, CONTACT } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Novela Webdesign — Digitaal design & development studio" },
      {
        name: "description",
        content:
          "Snelle websites en webshops voor ondernemers. Vaste prijzen, SEO inbegrepen, in 14 dagen live.",
      },
      { property: "og:title", content: "Novela Webdesign — Digitaal design & development studio" },
      {
        property: "og:description",
        content:
          "Wij bouwen schaalbare digitale producten met doordacht design en zorgvuldige ontwikkeling.",
      },
    ],
  }),
  component: Home,
});

const PARTNERS = [
  "Stripe",
  "iDEAL",
  "Mollie",
  "Shopify",
  "Wero",
  "Google",
  "Search Console",
  "Cloudflare",
];

function Home() {
  return (
    <>
      <Hero />

      {/* Trust marquee */}
      <section className="border-y border-ink/10 bg-background py-10">
        <Marquee
          duration={50}
          items={PARTNERS.map((p) => (
            <span
              key={p}
              className="font-display text-3xl leading-[1.3] text-ink/40 transition-colors hover:text-accent md:text-5xl"
            >
              {p}
            </span>
          ))}
        />
      </section>

      <FactsStrip />
      <ScrollStatement />

      {/* Over ons */}
      <section className="relative bg-background py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-16 md:grid-cols-2">
            <div className="md:sticky md:top-32 md:self-start">
              <SectionLabel>Over ons</SectionLabel>
              <h2 className="mt-8 font-display text-5xl leading-[1.05] text-ink md:text-7xl xl:text-8xl">
                <RevealWords text="Gebouwd voor" /> <br />
                <span className="italic">
                  <RevealWords text="lokale" wordClassName="text-accent" />
                </span>{" "}
                <RevealWords text="ondernemers." />
              </h2>
            </div>
            <div className="space-y-8">
              <Reveal>
                <p className="text-lg text-ink-soft md:text-xl">
                  Novela Webdesign is een digitaal design & development studio. Geen groot bedrijf
                  met dure tussenpersonen, maar rechtstreeks contact met degene die jouw website
                  bouwt.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg text-ink-soft md:text-xl">
                  Wij bouwen websites en webshops die er niet alleen strak uitzien, maar ook echt
                  werken: snel laden, goed gevonden op Google, en ontworpen om bezoekers om te
                  zetten in klanten.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-2 pt-4">
                  {[
                    "Maatwerk design",
                    "Persoonlijk contact",
                    "Vaste prijzen",
                    "Meertalig",
                    "SEO inbegrepen",
                    "Mobile-first",
                  ].map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-ink/15 bg-surface/40 px-4 py-2 text-sm text-ink"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Diensten — horizontal pinned scroll */}
      <ServiceStack />
      <ServiceStackMobile />

      {/* Mogelijkheden */}
      <section className="relative bg-background py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Mogelijkheden</SectionLabel>
              <h2 className="mt-6 font-display text-5xl leading-[1.05] text-ink md:text-7xl xl:text-8xl">
                Alles mogelijk. <br />
                <span className="italic text-accent">Niets te veel.</span>
              </h2>
            </div>
            <p className="max-w-md text-ink-soft">
              Van een eenvoudige contactpagina tot een volledig klantportaal met AI. Een greep uit
              wat wij bouwen.
            </p>
          </div>
        </div>
        <div className="my-12 md:my-16">
          <BentoFeatures />
        </div>
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="flex flex-wrap items-center gap-4">
            <Link
              to="/mogelijkheden"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-background"
            >
              Ontdek alle mogelijkheden
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/offerte"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm text-ink hover:bg-ink hover:text-background"
            >
              Vraag een prijsindicatie aan
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SEO sectie met parallax */}
      <section className="relative overflow-hidden bg-surface py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-16 md:grid-cols-2">
            <div className="min-w-0 md:sticky md:top-32 md:self-start">
              <SectionLabel>SEO · GEO · AEO</SectionLabel>
              <h2 className="mt-8 font-display text-4xl leading-[1.05] text-ink sm:text-5xl md:text-7xl xl:text-8xl">
                Gevonden worden <br />
                <span className="italic text-accent">op Google.</span>
              </h2>
              <p className="mt-6 max-w-md text-ink-soft">
                Een strakke website zonder bezoekers heeft weinig zin. Met SEO én GEO zorgen wij dat
                klanten je vinden wanneer ze zoeken naar wat jij aanbiedt — op Google én in
                AI-zoekmachines zoals ChatGPT.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/seo"
                  className="rounded-full bg-ink px-6 py-3 text-sm text-background hover:bg-accent"
                >
                  Meer over SEO
                </Link>
              </div>
            </div>
            <div className="min-w-0 space-y-12">
              {SEO_STEPS.map(([n, t, b], i) => (
                <div
                  key={n}
                  className="relative grid grid-cols-[auto_1fr] items-center gap-5 sm:gap-6"
                >
                  <ParallaxY amount={14 + i * 4}>
                    <div className="w-[1.3em] font-display text-5xl leading-none text-accent/30 sm:w-[1.7em] sm:text-6xl md:text-8xl">
                      {n}
                    </div>
                  </ParallaxY>
                  <Reveal className="min-w-0">
                    <h3 className="font-display text-2xl leading-tight text-ink [hyphens:auto] md:text-3xl">
                      {t}
                    </h3>
                    <p className="mt-2 text-ink-soft">{b}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="bg-background py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="mb-20">
            <SectionLabel>Werkwijze</SectionLabel>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] text-ink md:text-7xl xl:text-8xl">
              Van gesprek <br />
              <span className="italic">tot </span>
              <span className="italic text-accent">live website.</span>
            </h2>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* Voor wie */}
      <section className="bg-surface py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="mb-16">
            <SectionLabel>Voor wie</SectionLabel>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] text-ink md:text-7xl xl:text-8xl">
              Welke bedrijven <br />
              <span className="italic text-accent">helpen wij?</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map(([t, b], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
                className="overflow-hidden rounded-2xl border border-ink/10 bg-background transition-colors hover:border-accent/40"
              >
                <SpotlightCard className="p-6">
                  <div className="text-xs text-ink-soft">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-3 font-display text-2xl text-ink">{t}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{b}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-ink/10 bg-background p-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-lg text-ink-soft">
              <span className="font-semibold text-ink">Staat jouw branche er niet tussen?</span>{" "}
              Geen zorgen — dit is maar een greep. Of je nu een winkel, praktijk, vereniging of iets
              compleet anders hebt: wij helpen{" "}
              <span className="font-semibold text-accent">elk</span> bedrijf online groeien.
            </p>
            <Link
              to="/offerte"
              className="shrink-0 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-background transition-colors hover:bg-accent"
            >
              Vraag een prijsindicatie aan →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-32 md:py-40">
        <div className="mx-auto mb-12 max-w-[1600px] px-6 lg:px-12">
          <SectionLabel>Ervaringen</SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] text-ink md:text-7xl xl:text-8xl">
            Wat klanten <span className="italic text-accent">zeggen.</span>
          </h2>
        </div>
        <TestimonialMarquee />
      </section>

      {/* Belofte */}
      <section className="bg-ink py-32 text-background md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <SectionLabel>
            <span className="text-background/60">Onze belofte</span>
          </SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl xl:text-8xl">
            Jij neemt <span className="italic text-accent">geen risico.</span>
          </h2>
          <div className="mt-16 grid gap-4 md:grid-cols-4">
            {PROMISES.map(([t, b], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="overflow-hidden rounded-2xl border border-background/15 transition-colors hover:border-accent/60"
              >
                <SpotlightCard dark className="p-8">
                  <div className="font-display text-2xl">{t}</div>
                  <p className="mt-3 text-sm text-background/70">{b}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-32 md:py-48">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] text-ink md:text-7xl xl:text-8xl">
            Veelgestelde <span className="italic text-accent">vragen.</span>
          </h2>
          <div className="mt-16">
            <FaqList />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-surface py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <SectionLabel>Klaar om te beginnen?</SectionLabel>
          <h2 className="mt-6 font-display text-[12vw] leading-[0.95] tracking-tight text-ink md:text-[7vw]">
            <RevealWords text="Jouw website kan" /> <br />
            <span className="italic">
              <RevealWords text="dit weekend" wordClassName="text-accent" />
            </span>{" "}
            <br />
            <RevealWords text="live zijn." />
          </h2>
          <Reveal
            delay={0.3}
            className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-4"
          >
            <Magnetic strength={25}>
              <Link
                to="/offerte"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-8 py-5 text-base text-background"
              >
                <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative">Plan een gesprek</span>
                <span className="relative">→</span>
              </Link>
            </Magnetic>
            <Magnetic strength={20}>
              <Link
                to="/contact"
                className="rounded-full border border-ink/20 px-8 py-5 text-base text-ink hover:bg-ink hover:text-background"
              >
                Liever even sparren?
              </Link>
            </Magnetic>
          </Reveal>

          <Reveal
            delay={0.4}
            className="mt-16 grid gap-6 border-t border-ink/10 pt-12 md:grid-cols-3"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-ink-soft">Bel direct</div>
              <a
                href={CONTACT.phoneHref}
                className="mt-2 block font-display text-2xl text-ink hover:text-accent"
              >
                {CONTACT.phone}
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-ink-soft">E-mail</div>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 block font-display text-2xl text-ink hover:text-accent"
              >
                {CONTACT.email}
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-ink-soft">
                Beschikbaarheid
              </div>
              <div className="mt-2 font-display text-2xl text-ink">{CONTACT.hours}</div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
