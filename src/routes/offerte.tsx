import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/Section";
import { Magnetic } from "@/components/site/Magnetic";
import { ProgressIndicator } from "@/components/ui/progress-indicator";

export const Route = createFileRoute("/offerte")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { pakket?: string; beheer?: string; facturatie?: string } => ({
    pakket: typeof search.pakket === "string" ? search.pakket : undefined,
    beheer: typeof search.beheer === "string" ? search.beheer : undefined,
    facturatie: search.facturatie === "jaarlijks" ? "jaarlijks" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Offerte aanvragen — Novela Webdesign" },
      {
        name: "description",
        content:
          "Vraag een vrijblijvende offerte aan. Geen verplichtingen, gewoon een eerlijk plan.",
      },
      { property: "og:title", content: "Offerte aanvragen — Novela Webdesign" },
      { property: "og:description", content: "In 3 stappen een vrijblijvende offerte op maat." },
    ],
    links: [{ rel: "canonical", href: "https://www.novelawebdesign.nl/offerte" }],
  }),
  component: Offerte,
});

const PROJECT_TYPES: { label: string; desc: string }[] = [
  {
    label: "Website",
    desc: "Professionele zakelijke website — mobiel-vriendelijk en SEO-klaar opgeleverd.",
  },
  {
    label: "Webshop",
    desc: "Online verkopen met productbeheer en betaling via iDEAL, Stripe & Mollie.",
  },
  {
    label: "SEO",
    desc: "Beter te vinden in Google: zoekwoorden, techniek en lokale vindbaarheid.",
  },
  {
    label: "Iets anders",
    desc: "Maatwerk of even sparren? Vertel het ons, wij denken vrijblijvend mee.",
  },
];
const FEATURES = [
  "Afspraakmodule",
  "Online reserveringen",
  "Webshop / betalen",
  "Reviews",
  "Google Maps",
  "WhatsApp-knop",
  "Live chat",
  "AI chatbot",
  "Klantportaal",
  "Loginomgeving",
  "Admin dashboard",
  "Nieuwsbrief",
  "Blog / nieuws",
  "Meertalig",
  "Analytics",
  "CMS / zelf aanpassen",
];

// ⚠️ PLAK HIER JE GRATIS WEB3FORMS ACCESS KEY (via https://web3forms.com — e-mail: shakir.studiovelora@gmail.com)
// Zolang dit niet is ingevuld, werkt het formulier wel maar wordt er geen mail verstuurd.
const WEB3FORMS_KEY = "d225a492-154d-4a96-8be2-eaa01d552447";

function Offerte() {
  const search = Route.useSearch();
  const vanuitPakketten = !!search.pakket;
  const beheerTekst = search.beheer
    ? ` + ${search.beheer}${search.facturatie === "jaarlijks" ? " (jaarlijks betaald, 20% korting)" : " (maandelijks)"}`
    : "";

  const [step, setStep] = useState(vanuitPakketten ? 2 : 0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState({
    type: search.pakket?.includes("Webshop") ? "Webshop" : search.pakket ? "Website" : "",
    features: [] as string[],
    name: "",
    email: "",
    company: "",
    message: vanuitPakketten
      ? `Gekozen op de pakkettenpagina: ${search.pakket}${beheerTekst}.`
      : "",
  });

  const total = 4;
  const progress = ((step + 1) / total) * 100;
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    // Scroll zo dat de bovenkant van het vakje (incl. de vraag) onder de
    // vaste header valt — anders dekt de header de eerste regels af.
    const headerOffset = 110;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, [step]);

  function toggleFeature(f: string) {
    setData((d) => ({
      ...d,
      features: d.features.includes(f) ? d.features.filter((x) => x !== f) : [...d.features, f],
    }));
  }

  async function submit() {
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: "Nieuwe gespreksaanvraag via novelawebdesign.nl",
      from_name: "Novela Webdesign website",
      replyto: data.email,
      Naam: data.name,
      Email: data.email,
      Bedrijf: data.company,
      Project: data.type,
      Functies: data.features.join(", "),
      Bericht: data.message,
    };
    // Nog geen key ingevuld → toon succes zonder te versturen
    if (WEB3FORMS_KEY.indexOf("PLAK-HIER") === 0) {
      setDone(true);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || data?.success === false) throw new Error("submit_failed");
      setDone(true);
    } catch {
      alert("Er ging iets mis met versturen. Bel of app ons gerust op +31 6 11 27 76 32.");
    } finally {
      setSending(false);
    }
  }

  function next() {
    if (step < total - 1) setStep(step + 1);
    else submit();
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  const emailError =
    step === 3 && data.email.length > 0 && !isValidEmail(data.email)
      ? "Vul een geldig e-mailadres in"
      : "";

  const canNext =
    (step === 0 && !!data.type) ||
    step === 1 ||
    step === 2 ||
    (step === 3 && !!data.name && isValidEmail(data.email));

  return (
    <article>
      <section className="px-6 pt-40 pb-12 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <SectionLabel>Offerte</SectionLabel>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] text-ink md:text-7xl xl:text-8xl 2xl:text-[9rem]">
            <RevealWords text="Vraag een" />{" "}
            <span className="italic">
              <RevealWords text="vrijblijvende" wordClassName="text-accent" />
            </span>{" "}
            <br />
            <RevealWords text="offerte aan." />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              Geen verplichtingen, geen verkooppraatjes — gewoon een eerlijk plan. Een paar korte
              stappen, daarna plannen wij een gesprek.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-32 lg:px-12">
        <div className="mx-auto max-w-[1100px] space-y-4">
          {vanuitPakketten && !done && (
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-accent/30 bg-accent/5 px-5 py-3 text-sm text-ink">
              <span className="font-semibold text-accent">Gekozen:</span>
              <span>
                {search.pakket}
                {beheerTekst}
              </span>
            </div>
          )}

          {/* Stap content — alleen dit blok animeert per stap */}
          <div
            ref={formRef}
            className="overflow-hidden rounded-3xl border border-ink/10 bg-background"
          >
            <div className="p-8 md:p-14 min-h-[480px]">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl text-accent-foreground">
                      ✓
                    </div>
                    <h2 className="mt-6 font-display text-4xl text-ink md:text-5xl">
                      Dankjewel, {data.name.split(" ")[0] || "vriend"}!
                    </h2>
                    <p className="mt-4 text-ink-soft">
                      Wij hebben je aanvraag ontvangen en sturen je binnen 24 uur een persoonlijke
                      prijsindicatie.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                  >
                    {step === 0 && (
                      <div>
                        <h3 className="font-display text-3xl text-ink md:text-4xl">
                          Wat voor project?
                        </h3>
                        <p className="mt-2 text-ink-soft">
                          Kies wat het beste past — wij adviseren je graag verder.
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {PROJECT_TYPES.map((t) => (
                            <button
                              key={t.label}
                              onClick={() => setData({ ...data, type: t.label })}
                              className={`rounded-2xl border p-5 text-left transition-all ${
                                data.type === t.label
                                  ? "border-accent bg-accent/10"
                                  : "border-ink/15 bg-background hover:border-ink"
                              }`}
                            >
                              <div className="font-display text-xl text-ink">{t.label}</div>
                              <div className="mt-1 text-sm text-ink-soft">{t.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <h3 className="font-display text-3xl text-ink md:text-4xl">
                          Welke functies wil je?
                        </h3>
                        <p className="mt-2 text-ink-soft">
                          Optioneel — selecteer wat interessant is. Meerdere mogen, wij denken graag
                          mee.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {FEATURES.map((f) => (
                            <Chip
                              key={f}
                              active={data.features.includes(f)}
                              onClick={() => toggleFeature(f)}
                            >
                              {f}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <h3 className="font-display text-3xl text-ink md:text-4xl">
                          Vertel ons over je bedrijf
                        </h3>
                        <p className="mt-2 text-ink-soft">
                          Optioneel. Doelgroep, stijl, kleuren, een bestaand logo — deel gerust wat
                          je al weet. De rest bespreken we gewoon in het gesprek.
                        </p>
                        <textarea
                          value={data.message}
                          onChange={(e) => setData({ ...data, message: e.target.value })}
                          rows={6}
                          placeholder="Bijvoorbeeld: wie zijn je klanten, hoe vinden ze je nu, en heb je al een huisstijl of logo?"
                          className="mt-4 w-full resize-none rounded-2xl border border-ink/15 bg-surface/30 p-4 text-ink outline-none focus:border-accent"
                        />
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <h3 className="font-display text-3xl text-ink md:text-4xl">
                          Waar bereiken wij je?
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field
                            label="Naam *"
                            value={data.name}
                            onChange={(v) => setData({ ...data, name: v })}
                          />
                          <Field
                            label="E-mail *"
                            type="email"
                            value={data.email}
                            onChange={(v) => setData({ ...data, email: v })}
                            error={emailError}
                          />
                          <div className="md:col-span-2">
                            <Field
                              label="Bedrijf (optioneel)"
                              value={data.company}
                              onChange={(v) => setData({ ...data, company: v })}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress + navigatie — buiten de animerende kaart, altijd vloeiend */}
          {!done && (
            <div className="rounded-3xl border border-ink/10 bg-background p-6 md:p-8">
              <ProgressIndicator
                step={step + 1}
                total={total}
                canNext={canNext}
                sending={sending}
                onNext={next}
                onPrev={prev}
              />
            </div>
          )}
        </div>
      </section>
    </article>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={{ y: active ? 6 : 0 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
        active
          ? "border-accent bg-accent text-accent-foreground shadow-sm shadow-accent/20"
          : "border-ink/15 bg-background text-ink hover:border-ink"
      }`}
    >
      {children}
    </motion.button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full rounded-xl border bg-surface/30 px-4 py-3 text-ink outline-none focus:border-accent ${error ? "border-red-400" : "border-ink/15"}`}
      />
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
