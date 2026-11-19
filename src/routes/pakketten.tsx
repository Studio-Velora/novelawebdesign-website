import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { CalendarDays, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { RepelText } from "@/components/site/RepelText";
import { SectionLabel } from "@/components/site/Section";

export const Route = createFileRoute("/pakketten")({
  head: () => ({
    meta: [
      { title: "Pakketten & prijzen — Novela Webdesign" },
      {
        name: "description",
        content:
          "Websitepakketten, abonnementen en webshop op een rij. Kies wat bij je past en zie direct de totaalprijs.",
      },
      { property: "og:title", content: "Pakketten & prijzen — Novela Webdesign" },
      {
        property: "og:description",
        content: "Stel je pakket samen: websitebouw, beheer en webshop, met heldere vaste prijzen.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.novelawebdesign.nl/pakketten" }],
  }),
  component: Pakketten,
});

type Pakket = {
  id: string;
  naam: string;
  prijs: number;
  vanaf?: boolean;
  prijsOpAanvraag?: boolean;
  frequentie: "eenmalig" | "maandelijks";
  subtitel: string;
  bullets: string[];
  populair?: boolean;
};

const WEBSITE_PAKKETTEN: Pakket[] = [
  {
    id: "start",
    naam: "Website Start",
    prijs: 450,
    frequentie: "eenmalig",
    subtitel: "Voor zelfstandigen die professioneel online zichtbaar en bereikbaar willen zijn.",
    bullets: [
      "Eén overzichtelijke pagina, met maximaal vijf secties",
      "Verzorgd ontwerp dat aansluit bij jouw onderneming",
      "Geschikt voor mobiel, tablet en desktop",
      "Eén contactformulier",
      "Duidelijke presentatie van jouw diensten en contactgegevens",
      "Technische basis voor vindbaarheid in zoekmachines",
    ],
  },
  {
    id: "groei",
    naam: "Website Groei",
    prijs: 950,
    frequentie: "eenmalig",
    populair: true,
    subtitel:
      "Voor ondernemers die meer aanvragen, afspraken en offerteverzoeken willen ontvangen.",
    bullets: [
      "Tot vijf pagina's, bijvoorbeeld diensten, projecten en klantbeoordelingen",
      "Maatwerkontwerp met subtiele animaties",
      "Gerichte opbouw die bezoekers helpt om contact op te nemen",
      "Compact stijlboek: kleuren, lettertypen en richtlijnen",
      "Integratie van één bestaande tool, zoals een afsprakenplanner",
      "Tot drie formulieren",
      "Basisoptimalisatie voor zoekmachines en AI-zoekdiensten",
    ],
  },
  {
    id: "organisatie",
    naam: "Website Organisatie",
    prijs: 2950,
    vanaf: true,
    frequentie: "eenmalig",
    subtitel: "Voor organisaties met meerdere diensten, doelgroepen of uitgebreidere informatie.",
    bullets: [
      "Alles uit Website Groei",
      "Tot vijftien pagina's binnen de basisuitvoering",
      "Uitgebreider ontwerp, afgestemd op jouw organisatie",
      "Overzichtelijke navigatie voor verschillende diensten en doelgroepen",
      "Formulieren en workflows afgestemd op jouw werkproces",
      "Koppelingen met de systemen die jouw organisatie gebruikt",
    ],
  },
];

const WEBSHOP_PAKKET: Pakket = {
  id: "webshop",
  naam: "Webshop",
  prijs: 1450,
  vanaf: true,
  frequentie: "eenmalig",
  subtitel: "Een professionele Shopify-webshop waarmee je zelfstandig kunt verkopen en groeien.",
  bullets: [
    "Ontwerp dat bij jouw merk past",
    "Overzichtelijke productpresentatie",
    "Betaal- en verzendinstellingen ingericht",
    "Zelf producten, prijzen en pagina's beheren",
    "Shopify-account op jouw naam — geen lock-in",
  ],
};

const SHOPIFY_VOORDELEN = [
  { titel: "Eenvoudig zelf beheren", tekst: "Producten, prijzen en pagina's pas je zelf aan." },
  {
    titel: "Gebruiksvriendelijke checkout",
    tekst: "Klanten rekenen soepel af met bekende betaalmethoden.",
  },
  { titel: "Centraal overzicht", tekst: "Producten, voorraad en bestellingen op één plek." },
  { titel: "Hosting via Shopify", tekst: "Techniek en updates zijn geregeld, zonder omkijken." },
  {
    titel: "Ruimte om uit te breiden",
    tekst: "Apps voor reviews, mail en verzending als je wil groeien.",
  },
];

const BEHEER_PAKKETTEN: Pakket[] = [
  {
    id: "beheer-basis",
    naam: "Beheer Basis",
    prijs: 30,
    frequentie: "maandelijks",
    subtitel: "Je website technisch verzorgd en bereikbaar.",
    bullets: [
      "Hosting, SSL en automatische back-ups",
      "Dagelijkse controle en beveiligingsupdates",
      "Google Analytics ingericht",
      "Support per e-mail en telefoon, binnen 1 werkdag",
    ],
  },
  {
    id: "beheer-groei",
    naam: "Beheer Groei",
    prijs: 95,
    frequentie: "maandelijks",
    populair: true,
    subtitel: "Je website actueel houden en gericht verbeteren.",
    bullets: [
      "Alles uit Beheer Basis",
      "24/7 controle en beveiligingsupdates",
      "Maandelijkse SEO- en AI-vindbaarheidscheck",
      "Tot vijf kleine wijzigingen per maand",
    ],
  },
  {
    id: "beheer-premium",
    naam: "Beheer Premium",
    prijs: 295,
    frequentie: "maandelijks",
    subtitel:
      "Intensieve, nauwe samenwerking — korte lijntjes en persoonlijk contact om je resultaten continu te verbeteren.",
    bullets: [
      "Alles uit Beheer Groei",
      "Maandelijkse analyse en gerichte verbeteringen",
      "Teksten en foto's aanpassen op bestaande pagina's",
      "Nauw contact: korte lijntjes en een vast aanspreekpunt",
    ],
  },
];

const WEBSHOP_BEHEER_PAKKET: Pakket = {
  id: "webshop-beheer",
  naam: "Beheer Webshop",
  prijs: 0,
  prijsOpAanvraag: true,
  frequentie: "maandelijks",
  subtitel:
    "Nauwe, doorlopende ondersteuning bij het beheren en laten groeien van je webshop — de omvang bepalen we samen.",
  bullets: [
    "Alles uit Beheer Premium, toegespitst op je webshop",
    "Aanpassingen aan productpagina's, collecties, teksten en afbeeldingen",
    "Afstemming over de winkelervaring en het bestelproces",
    "Nauw contact: korte lijntjes en een vast aanspreekpunt",
  ],
};

const ALLE_PAKKETTEN: Pakket[] = [
  ...WEBSITE_PAKKETTEN,
  WEBSHOP_PAKKET,
  ...BEHEER_PAKKETTEN,
  WEBSHOP_BEHEER_PAKKET,
];

/** Korting bij jaarlijks betalen. Grote websitebouwers (Squarespace, Shopify, Wix, Webflow) geven ongeveer 20-25%. */
const JAAR_KORTING = 0.2;
const KORTING_PCT = Math.round(JAAR_KORTING * 100);

type Facturatie = "maandelijks" | "jaarlijks";

const euro = (n: number) => `€${n.toLocaleString("nl-NL")}`;

/** Maandbedrag van een abonnement, met jaarkorting als er jaarlijks wordt betaald. */
function maandPrijs(p: Pakket, f: Facturatie) {
  if (p.prijsOpAanvraag || p.frequentie !== "maandelijks" || f === "maandelijks") return p.prijs;
  return Math.round(p.prijs * (1 - JAAR_KORTING));
}

function formatPrijs(p: Pakket, prijs: number = p.prijs) {
  if (p.prijsOpAanvraag) return "Prijs op aanvraag";
  const bedrag = `€${prijs.toLocaleString("nl-NL")}`;
  return p.vanaf ? `vanaf ${bedrag}` : bedrag;
}

function AnimatedPrice({ pakket }: { pakket: Pakket }) {
  const mv = useMotionValue(0);
  const [weergave, setWeergave] = useState(0);

  useEffect(() => {
    if (pakket.prijsOpAanvraag) return;
    const controls = animate(mv, pakket.prijs, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setWeergave(Math.round(v)),
    });
    return () => controls.stop();
  }, [pakket.prijs, pakket.prijsOpAanvraag, mv]);

  if (pakket.prijsOpAanvraag) return <>Op aanvraag</>;
  const bedrag = `€${weergave.toLocaleString("nl-NL")}`;
  return <>{pakket.vanaf ? `vanaf ${bedrag}` : bedrag}</>;
}

type Soort = "website" | "webshop";

const FEITEN = [
  "Vaste prijzen",
  "Alle prijzen excl. btw",
  "2 revisierondes",
  "30 dagen gratis support",
  "Jouw eigendom, geen lock-in",
];

/** Beheer Groei en Premium gelden voor website en webshop; in de webshop-tab spreken we over je webshop. */
function voorWebshop(p: Pakket): Pakket {
  if (p.id === "beheer-groei")
    return { ...p, subtitel: "Je webshop actueel houden en gericht verbeteren." };
  return p;
}

function Pakketten() {
  const reduce = useReducedMotion();
  const [soort, setSoort] = useState<Soort>("website");
  const [eenmaligId, setEenmaligId] = useState<string | null>(null);
  const [maandelijksId, setMaandelijksId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [facturatie, setFacturatie] = useState<Facturatie>("maandelijks");

  useEffect(() => {
    if (window.location.hash === "#webshop") setSoort("webshop");
  }, []);

  function kiesSoort(next: Soort) {
    setSoort(next);
    const url = new URL(window.location.href);
    url.hash = next === "webshop" ? "webshop" : "";
    window.history.replaceState(null, "", url);
  }
  function selectEenmalig(id: string) {
    setEenmaligId((cur) => (cur === id ? null : id));
  }
  function selectMaandelijks(id: string) {
    setMaandelijksId((cur) => (cur === id ? null : id));
  }

  const gekozenEenmalig = ALLE_PAKKETTEN.find((p) => p.id === eenmaligId) ?? null;
  const gekozenMaandelijks = ALLE_PAKKETTEN.find((p) => p.id === maandelijksId) ?? null;
  const heeftSelectie = !!gekozenEenmalig || !!gekozenMaandelijks;

  const grid = {
    eenmaligId,
    maandelijksId,
    onEenmalig: selectEenmalig,
    onMaandelijks: selectMaandelijks,
    facturatie,
    onFacturatie: setFacturatie,
  };

  return (
    <article className={heeftSelectie ? "pb-32 md:pb-28" : undefined}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-14 pt-36 md:pt-40 lg:px-12">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-40 -top-32 h-[560px] w-[560px] rounded-full bg-accent/25 blur-[120px]"
          />
          <motion.div
            animate={reduce ? undefined : { x: [0, -30, 0], y: [0, -40, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-24 top-48 h-[420px] w-[420px] rounded-full bg-accent-glow/30 blur-[110px]"
          />
        </div>

        <div className="relative mx-auto max-w-[1600px]">
          <SectionLabel>Pakketten</SectionLabel>
          <h1
            aria-label="Kies je pakket."
            className="mt-6 font-display text-6xl leading-[1.02] text-ink md:text-[7rem] xl:text-[8rem]"
          >
            <RepelText text="Kies je" delay={0.1} /> <br />
            <span className="italic">
              <RepelText text="pakket." className="text-accent" delay={0.4} />
            </span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg text-ink-soft">
              Van een helder online visitekaartje tot een website of webshop die klanten aantrekt en
              jouw werk ondersteunt. Kies een pakket en je ziet onderaan direct je totaalprijs.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {FEITEN.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-ink/10 bg-background/70 px-4 py-2 text-sm text-ink backdrop-blur"
                >
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.5}>
            <div
              role="tablist"
              aria-label="Soort pakket"
              className="mt-10 inline-flex rounded-full border border-ink/10 bg-background/80 p-1.5 shadow-sm backdrop-blur"
            >
              {(["website", "webshop"] as const).map((k) => {
                const actief = soort === k;
                return (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    id={`tab-${k}`}
                    aria-selected={actief}
                    aria-controls={`pakketpaneel-${k}`}
                    onClick={() => kiesSoort(k)}
                    className="relative min-h-12 rounded-full px-8 text-base font-semibold transition-colors"
                  >
                    {actief && (
                      <motion.span
                        layoutId="soortpil"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-ink"
                      />
                    )}
                    <span className={`relative ${actief ? "text-background" : "text-ink"}`}>
                      {k === "website" ? "Website" : "Webshop"}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Beide panelen staan in de HTML (voor zoekmachines); alleen het gekozen paneel is zichtbaar. */}
      {(["website", "webshop"] as const).map((k) => (
        <div
          key={k}
          id={`pakketpaneel-${k}`}
          role="tabpanel"
          aria-labelledby={`tab-${k}`}
          hidden={soort !== k}
          className={soort === k ? "paneel-in" : undefined}
        >
          {k === "website" ? <WebsiteSecties {...grid} /> : <WebshopSecties {...grid} />}
        </div>
      ))}

      {/* Meerwerk */}
      <section className="px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="rounded-3xl border border-ink/10 bg-background p-8 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl text-ink md:text-3xl">
                Aanvullende werkzaamheden
              </h3>
              <div className="font-display text-3xl text-ink">
                €85<span className="text-base text-ink-soft"> /uur, excl. btw</span>
              </div>
            </div>
            <p className="mt-4 text-ink-soft">
              Voor werkzaamheden buiten het gekozen pakket ontvang je vooraf een inschatting. Wij
              voeren meerwerk alleen uit na jouw akkoord.
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              Nieuwe pagina's, nieuwe functionaliteiten, uitgebreide koppelingen en een volledig
              herontwerp vallen buiten kleine onderhoudswijzigingen. Externe abonnementen en
              licenties worden afzonderlijk vermeld.
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              Optimalisatie is gericht op betere vindbaarheid en conversie; specifieke posities,
              vermeldingen in AI-antwoorden of aantallen klanten worden niet gegarandeerd.
            </p>
          </div>
        </div>
      </section>

      <PrijsBalk
        eenmalig={gekozenEenmalig}
        maandelijks={gekozenMaandelijks}
        facturatie={facturatie}
        detailsOpen={detailsOpen}
        onToggleDetails={() => setDetailsOpen((v) => !v)}
        onRemove={(freq) => (freq === "eenmalig" ? setEenmaligId(null) : setMaandelijksId(null))}
      />
    </article>
  );
}

type GridProps = {
  eenmaligId: string | null;
  maandelijksId: string | null;
  onEenmalig: (id: string) => void;
  onMaandelijks: (id: string) => void;
  facturatie: Facturatie;
  onFacturatie: (f: Facturatie) => void;
};

function WebsiteSecties({
  eenmaligId,
  maandelijksId,
  onEenmalig,
  onMaandelijks,
  facturatie,
  onFacturatie,
}: GridProps) {
  return (
    <>
      <section className="px-6 pb-16 pt-6 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-6 pt-4 md:grid-cols-3 md:items-stretch">
            {WEBSITE_PAKKETTEN.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} className="h-full">
                <PakketCard
                  pakket={p}
                  selected={eenmaligId === p.id}
                  onSelect={() => onEenmalig(p.id)}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-sm text-ink-soft">
              Een bestaande afsprakenmodule, zoals Calendly, toevoegen? Een eenvoudige plaatsing is
              mogelijk vanaf €85, exclusief eventuele abonnementskosten van de aanbieder.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-3 max-w-2xl text-sm text-ink-soft">
              Het aantal formulieren, de workflows en de systeemkoppelingen voor Website Organisatie
              leggen wij vooraf vast in de offerte. Zo weet je precies wat je krijgt en wat het
              kost.
            </p>
          </Reveal>
        </div>
      </section>

      <BeheerSectie
        label="Websiteabonnementen"
        titel="Beheer & onderhoud."
        pakketten={BEHEER_PAKKETTEN}
        maandelijksId={maandelijksId}
        onMaandelijks={onMaandelijks}
        facturatie={facturatie}
        onFacturatie={onFacturatie}
      />
    </>
  );
}

function WebshopSecties({
  eenmaligId,
  maandelijksId,
  onEenmalig,
  onMaandelijks,
  facturatie,
  onFacturatie,
}: GridProps) {
  return (
    <>
      <section className="px-6 pb-16 pt-6 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-6 pt-4 md:grid-cols-3 md:items-start">
            <Reveal>
              <PakketCard
                pakket={WEBSHOP_PAKKET}
                selected={eenmaligId === WEBSHOP_PAKKET.id}
                onSelect={() => onEenmalig(WEBSHOP_PAKKET.id)}
              />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-2">
              <div className="h-full rounded-3xl border border-ink/10 bg-surface/40 p-8">
                <p className="text-ink-soft">
                  Wij richten jouw webshop in met een ontwerp op maat, duidelijke producten en de
                  juiste betaal- en verzendinstellingen. Omvang en koppelingen leggen wij vooraf
                  vast.
                </p>
                <p className="mt-5 font-display text-xl text-ink">Vijf Shopify-voordelen</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {SHOPIFY_VOORDELEN.map((v) => (
                    <li key={v.titel} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>
                        <span className="block font-semibold text-ink">{v.titel}</span>
                        <span className="text-sm text-ink-soft">{v.tekst}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-2xl border border-ink/10 bg-background p-4 text-sm text-ink-soft">
                  <strong className="font-semibold text-ink">Volledig in eigen beheer.</strong> Het
                  Shopify-account staat op jouw naam, geen lock-in.
                </p>
                <p className="mt-3 text-xs text-ink-soft">
                  Shopify-abonnement, betaal- en transactiekosten en betaalde thema's/apps niet
                  inbegrepen.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <BeheerSectie
        label="Webshopabonnementen"
        titel="Beheer voor je webshop."
        pakketten={[voorWebshop(BEHEER_PAKKETTEN[1]), BEHEER_PAKKETTEN[2], WEBSHOP_BEHEER_PAKKET]}
        maandelijksId={maandelijksId}
        onMaandelijks={onMaandelijks}
        facturatie={facturatie}
        onFacturatie={onFacturatie}
      />
    </>
  );
}

function BeheerSectie({
  label,
  titel,
  pakketten,
  maandelijksId,
  onMaandelijks,
  facturatie,
  onFacturatie,
}: {
  label: string;
  titel: string;
  pakketten: Pakket[];
  maandelijksId: string | null;
  onMaandelijks: (id: string) => void;
  facturatie: Facturatie;
  onFacturatie: (f: Facturatie) => void;
}) {
  return (
    <section className="bg-surface px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-6 font-display text-4xl text-ink md:text-6xl">{titel}</h2>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Hosting, SSL en back-ups zitten in elk abonnement.
        </p>
        <FacturatieKeuze facturatie={facturatie} onChange={onFacturatie} />
        <div className="mt-10 grid gap-6 pt-4 md:grid-cols-3 md:items-stretch">
          {pakketten.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06} className="h-full">
              <PakketCard
                pakket={p}
                selected={maandelijksId === p.id}
                onSelect={() => onMaandelijks(p.id)}
                facturatie={facturatie}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacturatieKeuze({
  facturatie,
  onChange,
}: {
  facturatie: Facturatie;
  onChange: (f: Facturatie) => void;
}) {
  const id = useId();
  // Grootste jaarbesparing van de getoonde abonnementen, als lokmiddel op de knop.
  const maxBesparing = Math.max(
    ...BEHEER_PAKKETTEN.map((p) => p.prijs * 12 - maandPrijs(p, "jaarlijks") * 12),
  );
  const opties = [
    {
      k: "maandelijks" as const,
      titel: "Maandelijks",
      sub: "Opzegbaar per maand",
      Icon: CalendarDays,
    },
    {
      k: "jaarlijks" as const,
      titel: "Jaarlijks",
      sub: `Tot ${euro(maxBesparing)} voordeel per jaar`,
      Icon: Sparkles,
    },
  ];

  return (
    <div className="mt-8 max-w-xl">
      <div
        role="radiogroup"
        aria-label="Betaalperiode beheer"
        className="relative grid grid-cols-2 gap-1.5 rounded-[1.75rem] border border-ink/10 bg-background/80 p-1.5 shadow-[0_24px_50px_-28px_rgba(60,20,10,0.45)] backdrop-blur"
      >
        {opties.map(({ k, titel, sub, Icon }) => {
          const actief = facturatie === k;
          return (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={actief}
              onClick={() => onChange(k)}
              className="group relative flex min-h-[4.5rem] items-center gap-3 rounded-[1.4rem] px-4 py-3 text-left transition-colors sm:px-5"
            >
              {actief && (
                <motion.span
                  layoutId={`facturatie-${id}`}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-[1.4rem] bg-ink shadow-[0_12px_30px_-12px_rgba(30,12,6,0.6)]"
                />
              )}
              <span
                className={`relative hidden h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors sm:flex ${
                  actief
                    ? "bg-background/15 text-background"
                    : "bg-ink/5 text-ink group-hover:bg-ink/10"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="relative min-w-0">
                <span
                  className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold ${
                    actief ? "text-background" : "text-ink"
                  }`}
                >
                  {titel}
                  {k === "jaarlijks" && (
                    <span className="rounded-full bg-accent-deep px-2 py-0.5 text-xs font-semibold text-white">
                      −{KORTING_PCT}%
                    </span>
                  )}
                </span>
                <span
                  className={`mt-0.5 block text-xs leading-snug ${
                    actief ? "text-background/70" : "text-ink-soft"
                  }`}
                >
                  {sub}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        {facturatie === "jaarlijks"
          ? `Je betaalt 12 maanden vooruit en krijgt ${KORTING_PCT}% korting. De voorwaarden voor jaarlijks betalen leggen we vast in de offerte.`
          : "Maandelijks opzegbaar met een opzegtermijn van 1 maand."}
      </p>
    </div>
  );
}

function PakketCard({
  pakket,
  selected,
  onSelect,
  facturatie = "maandelijks",
}: {
  pakket: Pakket;
  selected: boolean;
  onSelect: () => void;
  facturatie?: Facturatie;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const prijs = maandPrijs(pakket, facturatie);
  const metKorting = prijs !== pakket.prijs;

  return (
    <div className="relative h-full">
      {pakket.populair && (
        <span className="absolute -top-3 left-7 z-10 rounded-full bg-ink px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-background">
          Populairste keuze
        </span>
      )}
      <button
        ref={ref}
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        onPointerMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className={`group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border-2 p-7 text-left transition-all duration-300 hover:-translate-y-1 md:p-8 ${
          selected
            ? "border-accent-deep bg-accent/5 shadow-lg shadow-accent/15"
            : pakket.populair
              ? "border-ink/30 bg-background hover:border-ink/50"
              : "border-ink/10 bg-background hover:border-ink/30"
        }`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), rgba(233,79,55,0.14), transparent 70%)",
          }}
        />

        <h3 className="relative font-display text-2xl text-ink md:text-3xl">{pakket.naam}</h3>
        <p className="relative mt-2 text-sm italic text-ink-soft">{pakket.subtitel}</p>

        <div className="relative mt-5 flex items-baseline gap-2">
          <span className="font-display text-4xl text-ink">
            {metKorting && (
              <span className="mr-2 text-xl text-ink-soft line-through decoration-accent-deep/60">
                {euro(pakket.prijs)}
              </span>
            )}
            {formatPrijs(pakket, prijs)}
            {!pakket.prijsOpAanvraag && pakket.frequentie === "maandelijks" && (
              <span className="text-lg text-ink-soft">/maand</span>
            )}
          </span>
          {!pakket.prijsOpAanvraag && pakket.frequentie === "eenmalig" && (
            <span className="text-sm text-ink-soft">eenmalig, excl. btw</span>
          )}
          {!pakket.prijsOpAanvraag && pakket.frequentie === "maandelijks" && (
            <span className="text-sm text-ink-soft">excl. btw</span>
          )}
        </div>

        {metKorting && (
          <p className="relative mt-2 text-sm text-ink-soft">
            {euro(prijs * 12)} per jaar, vooruitbetaald. Je bespaart{" "}
            {euro(pakket.prijs * 12 - prijs * 12)}.
          </p>
        )}

        <ul className="relative mt-6 space-y-2.5 border-t border-ink/10 pt-6">
          {pakket.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-ink-soft">
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                  selected ? "bg-accent-deep" : "bg-ink/30"
                }`}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex-1" />

        <span
          className={`relative mt-6 block min-h-12 w-full rounded-full py-3.5 text-center text-sm font-semibold transition-all duration-300 ${
            selected
              ? "bg-accent-deep text-white"
              : "bg-ink/5 text-ink group-hover:bg-ink group-hover:text-background"
          }`}
        >
          {selected ? "Geselecteerd ✓" : "Kies dit pakket"}
        </span>
      </button>
    </div>
  );
}

function PrijsBalk({
  eenmalig,
  maandelijks: gekozenMaandelijks,
  facturatie,
  detailsOpen,
  onToggleDetails,
  onRemove,
}: {
  eenmalig: Pakket | null;
  maandelijks: Pakket | null;
  facturatie: Facturatie;
  detailsOpen: boolean;
  onToggleDetails: () => void;
  onRemove: (freq: "eenmalig" | "maandelijks") => void;
}) {
  const zichtbaar = !!eenmalig || !!gekozenMaandelijks;
  const jaarlijks =
    facturatie === "jaarlijks" && !!gekozenMaandelijks && !gekozenMaandelijks.prijsOpAanvraag;
  // Pakket met het bedrag dat de klant echt per maand betaalt (met jaarkorting).
  const maandelijks = gekozenMaandelijks
    ? { ...gekozenMaandelijks, prijs: maandPrijs(gekozenMaandelijks, facturatie) }
    : null;
  const jaarBedrag = maandelijks ? maandelijks.prijs * 12 : 0;
  const besparing = gekozenMaandelijks ? gekozenMaandelijks.prijs * 12 - jaarBedrag : 0;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-background/95 backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        zichtbaar ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!zichtbaar}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {detailsOpen && zichtbaar && (
          <div className="space-y-3 border-b border-ink/10 py-5">
            {eenmalig && (
              <PrijsRegel
                label="Eenmalig"
                pakket={eenmalig}
                onRemove={() => onRemove("eenmalig")}
              />
            )}
            {maandelijks && (
              <PrijsRegel
                label={jaarlijks ? "Per maand (jaarlijks betaald)" : "Per maand"}
                pakket={maandelijks}
                onRemove={() => onRemove("maandelijks")}
              />
            )}
            {jaarlijks && (
              <p className="text-xs text-ink-soft">
                Jaarlijks vooruitbetaald: {euro(jaarBedrag)} per jaar, {KORTING_PCT}% korting (je
                bespaart {euro(besparing)}).
              </p>
            )}
            <p className="text-xs text-ink-soft">Alle prijzen excl. btw.</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-6">
            {eenmalig && (
              <div>
                <div className="text-[0.65rem] uppercase tracking-[0.16em] text-ink-soft">
                  Eenmalig
                </div>
                <div className="font-display text-xl tabular-nums text-ink">
                  <AnimatedPrice pakket={eenmalig} />
                </div>
              </div>
            )}
            {maandelijks && (
              <div>
                <div className="text-[0.65rem] uppercase tracking-[0.16em] text-ink-soft">
                  {jaarlijks ? "Per maand, jaarlijks betaald" : "Per maand"}
                </div>
                <div className="font-display text-xl tabular-nums text-ink">
                  <AnimatedPrice pakket={maandelijks} />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleDetails}
              className="flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Overzicht
              <span
                className={`inline-block transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
              >
                ⌄
              </span>
            </button>
            <Link
              to="/offerte"
              search={{
                pakket: eenmalig?.naam,
                beheer: maandelijks?.naam,
                facturatie: jaarlijks ? "jaarlijks" : undefined,
              }}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent"
            >
              Plan een gesprek &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrijsRegel({
  label,
  pakket,
  onRemove,
}: {
  label: string;
  pakket: Pakket;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <div>
        <span className="text-ink-soft">{label}: </span>
        <span className="font-medium text-ink">{pakket.naam}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium tabular-nums text-ink">
          <AnimatedPrice pakket={pakket} />
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-ink-soft transition-colors hover:text-accent"
        >
          Verwijderen
        </button>
      </div>
    </div>
  );
}
