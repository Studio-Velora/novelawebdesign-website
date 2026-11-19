import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { BentoFeatures } from "@/components/site/BentoFeatures";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/Section";

const I = {
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  ),
  reservation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3C8.7 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.4 15 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8zm4.5-5.6c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.4-.7-2.4-1.3-3.3-2.9-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5 0-.1-.7-1.6-.9-2.2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.9.9-.9 2.1-.9 2.3.2.3 1.5 2.4 3.7 3.4 2.2.9 2.2.6 2.6.6.6 0 1.8-.7 2-1.4.3-.7.3-1.2.2-1.4z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M21 11.5a8 8 0 0 1-11.5 7.2L3 21l2.3-6.5A8 8 0 1 1 21 11.5z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" />
      <path d="M19 14l.7 1.8 1.8.7-1.8.7L19 19l-.7-1.8L16.5 16.5l1.8-.7z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6 7h12l1 13H5z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  ),
  receipt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2z" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
  newsletter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  geo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="M14 6l4 4" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  portal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  ),
  login: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  ),
};

type Cat = "Alle" | "Klantcontact" | "Verkoop & betalen" | "Automatisering" | "Beheer & content";
type Mog = { icon: ReactNode; cat: Exclude<Cat, "Alle">; title: string; desc: string; ex: string };

const MOGELIJKHEDEN: Mog[] = [
  {
    icon: I.calendar,
    cat: "Klantcontact",
    title: "Afspraakmodule",
    desc: "Klanten plannen zelf een afspraak — geen heen-en-weer bellen. Jij bepaalt je beschikbaarheid, met automatische bevestigingsmail.",
    ex: "Een kapper laat klanten online een tijdslot kiezen. Jij krijgt een melding, de klant een bevestiging.",
  },
  {
    icon: I.reservation,
    cat: "Klantcontact",
    title: "Online reserveringen",
    desc: "Tafels, kamers, plekken of diensten online reserveren. Real-time beschikbaarheid, automatische bevestiging per mail.",
    ex: "Een restaurant laat gasten zelf een tafel reserveren — geen telefoontjes meer, altijd up-to-date bezetting.",
  },
  {
    icon: I.whatsapp,
    cat: "Klantcontact",
    title: "WhatsApp-knop",
    desc: "Een directe WhatsApp-knop waarmee bezoekers met één klik een gesprek starten. Lage drempel, werkt op mobiel en desktop.",
    ex: "Een installateur ontvangt een foto van het probleem en reageert direct via WhatsApp.",
  },
  {
    icon: I.chat,
    cat: "Klantcontact",
    title: "Live chat",
    desc: "Realtime chatten met bezoekers terwijl ze op de site zijn. Beantwoord vragen op het moment dat interesse het hoogst is.",
    ex: "Een webshop stuurt proactief een berichtje als iemand lang op de betaalpagina staat.",
  },
  {
    icon: I.ai,
    cat: "Klantcontact",
    title: "AI chatbot",
    desc: "Een slimme chatbot die 24/7 vragen beantwoordt op basis van jouw site-inhoud — ook buiten kantooruren.",
    ex: "Een salon laat 's nachts gewoon afspraken inplannen via de AI chatbot.",
  },
  {
    icon: I.star,
    cat: "Klantcontact",
    title: "Reviews tonen",
    desc: "Automatisch je Google-reviews ophalen en mooi tonen. Verse reviews verschijnen vanzelf — vertrouwen winnen bij bezoekers.",
    ex: "Een schoonheidssalon toont haar nieuwste Google-reviews prominent op de homepage.",
  },
  {
    icon: I.pin,
    cat: "Klantcontact",
    title: "Google Maps",
    desc: "Een interactieve kaart op de contactpagina zodat bezoekers je direct vinden en de route kunnen openen.",
    ex: "Een restaurant heeft een kaart; bezoekers klikken op 'Route' en gaan direct naar Google Maps.",
  },
  {
    icon: I.bag,
    cat: "Verkoop & betalen",
    title: "Webshop",
    desc: "Een complete online winkel met productbeheer, winkelwagen en betaling. Geschikt voor fysieke én digitale producten.",
    ex: "Een kaarsenmaker verkoopt via een webshop; klanten betalen via iDEAL en krijgen automatisch een bevestiging.",
  },
  {
    icon: I.card,
    cat: "Verkoop & betalen",
    title: "iDEAL & online betalen",
    desc: "Veilig betalen via iDEAL, creditcard, Wero of Klarna — geïntegreerd via Stripe of Mollie. Geld direct op je rekening.",
    ex: "Een coach verkoopt sessies; klanten betalen direct en ontvangen automatisch een factuur.",
  },
  {
    icon: I.receipt,
    cat: "Verkoop & betalen",
    title: "Factuurmodule",
    desc: "Automatisch facturen aanmaken en versturen na een betaling of afspraak. Inclusief BTW-vermelding en PDF-download.",
    ex: "Een fotograaf ontvangt betaling en de klant krijgt direct een nette factuur in zijn inbox.",
  },
  {
    icon: I.mail,
    cat: "Automatisering",
    title: "Geautomatiseerde e-mails",
    desc: "Bevestigingen, herinneringen en bedankmails verstuurt de site automatisch — taken die je nu handmatig doet.",
    ex: "Een tandarts stuurt automatisch een herinnering 24 uur vóór de afspraak.",
  },
  {
    icon: I.chart,
    cat: "Automatisering",
    title: "Analytics",
    desc: "Inzicht in hoeveel bezoekers je hebt, waar ze vandaan komen en welke pagina's werken. AVG-proof via Google Analytics.",
    ex: "Een ondernemer ziet dat 60% via Google op de contactpagina landt en past de tekst aan — meer aanvragen.",
  },
  {
    icon: I.newsletter,
    cat: "Automatisering",
    title: "Nieuwsbrief",
    desc: "Een aanmeldmodule op de site die direct koppelt aan Mailchimp of Brevo. Bouw een e-maillijst op en stuur gerichte mails.",
    ex: "Een winkel stuurt elke maand een mail met acties aan 800 abonnees — gratis via Brevo.",
  },
  {
    icon: I.geo,
    cat: "Automatisering",
    title: "AI-vindbaarheid (GEO)",
    desc: "Geoptimaliseerd voor AI-zoekmachines zoals ChatGPT, Perplexity en Google AI Overviews — naast gewone SEO.",
    ex: "Als iemand in ChatGPT vraagt 'beste webdesigner Helmond', verschijnt Novela Webdesign in het antwoord.",
  },
  {
    icon: I.api,
    cat: "Automatisering",
    title: "API koppelingen",
    desc: "Koppel de site aan je bestaande systemen: boekhoudpakket, CRM, agenda of voorraadbeheer. Alles gesynchroniseerd.",
    ex: "Een grossier koppelt zijn webshop aan zijn voorraadsysteem — de site toont altijd actuele voorraad.",
  },
  {
    icon: I.edit,
    cat: "Beheer & content",
    title: "CMS — zelf aanpassen",
    desc: "Pas zelf teksten, foto's en pagina's aan zonder technische kennis. Geen developer nodig voor elke wijziging.",
    ex: "Een restaurant past zelf het seizoensmenu aan: inloggen, tekst wijzigen, opslaan — binnen 2 minuten online.",
  },
  {
    icon: I.blog,
    cat: "Beheer & content",
    title: "Blog & nieuws",
    desc: "Publiceer artikelen, tips en nieuws om gevonden te worden op Google en bezoekers terug te laten komen.",
    ex: "Een klusser schrijft maandelijks een artikel over onderhoudstips — en komt daarmee bovenaan Google.",
  },
  {
    icon: I.portal,
    cat: "Beheer & content",
    title: "Klantportaal",
    desc: "Een afgeschermde omgeving per klant voor documenten, facturen of voortgang. Professioneel en efficiënt.",
    ex: "Een boekhouder geeft elke klant een eigen portaal voor jaarstukken en BTW-aangiftes.",
  },
  {
    icon: I.login,
    cat: "Beheer & content",
    title: "Loginomgeving",
    desc: "Beveiligde inlogpagina voor medewerkers of klanten. Elk account heeft eigen rechten en ziet alleen wat voor hem bedoeld is.",
    ex: "Een sportschool geeft leden toegang tot hun trainingsschema via een persoonlijk account.",
  },
  {
    icon: I.dashboard,
    cat: "Beheer & content",
    title: "Admin dashboard",
    desc: "Een overzichtspaneel om bestellingen, afspraken of leads te beheren — alles op één plek, zonder in de code te duiken.",
    ex: "Een cateraar ziet in één scherm alle bestellingen van de week, gesorteerd op datum en status.",
  },
  {
    icon: I.globe,
    cat: "Beheer & content",
    title: "Meertalige website",
    desc: "De site in meerdere talen aanbieden; bezoekers zien de versie in hún taal. Belangrijk voor internationale klanten.",
    ex: "Een Amsterdamse B&B toont buitenlandse bezoekers automatisch de Engelse versie.",
  },
];

const CATS: Cat[] = [
  "Alle",
  "Klantcontact",
  "Verkoop & betalen",
  "Automatisering",
  "Beheer & content",
];
const IC_COLORS = ["bg-accent", "bg-ink", "bg-accent", "bg-ink"];

export const Route = createFileRoute("/mogelijkheden")({
  head: () => ({
    meta: [
      { title: "Mogelijkheden — Novela Webdesign" },
      {
        name: "description",
        content:
          "Alles dat wij kunnen bouwen: van afspraakmodules tot AI chatbots en klantportalen.",
      },
      { property: "og:title", content: "Mogelijkheden — Novela Webdesign" },
      {
        property: "og:description",
        content: "Een overzicht van features die wij toevoegen aan websites en webshops.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.novelawebdesign.nl/mogelijkheden" }],
  }),
  component: Mogelijkheden,
});

function Mogelijkheden() {
  const [activeFilter, setActiveFilter] = useState<Cat>("Alle");

  const filtered =
    activeFilter === "Alle" ? MOGELIJKHEDEN : MOGELIJKHEDEN.filter((m) => m.cat === activeFilter);

  return (
    <article>
      <section className="px-6 pt-40 pb-20 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <SectionLabel>Mogelijkheden</SectionLabel>
          <h1 className="mt-6 font-display text-6xl leading-[1.02] text-ink md:text-[8rem] xl:text-[9rem] 2xl:text-[10rem]">
            <RevealWords text="Alles" /> <RevealWords text="mogelijk." /> <br />
            <span className="italic">
              <RevealWords text="Niets te" wordClassName="text-accent" />
            </span>{" "}
            <span className="italic">
              <RevealWords text="veel." wordClassName="text-accent" />
            </span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-lg text-ink-soft">
              Van een eenvoudige contactpagina tot een volledig klantportaal met AI. Mis je iets?
              Wij bouwen het op maat.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <BentoFeatures />
      </section>

      {/* Filterbuttons */}
      <section className="px-6 pb-10 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap gap-2">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? "bg-ink text-background"
                    : "border border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink"
                }`}
              >
                {cat}
                {cat !== "Alle" && (
                  <span
                    className={`ml-1.5 text-xs ${activeFilter === cat ? "opacity-60" : "opacity-40"}`}
                  >
                    {MOGELIJKHEDEN.filter((m) => m.cat === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-32 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-surface/40 p-6">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-background [&_svg]:h-6 [&_svg]:w-6 ${IC_COLORS[i % IC_COLORS.length]}`}
                >
                  {m.icon}
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.18em] text-accent">{m.cat}</div>
                <h3 className="mt-1 font-display text-2xl text-ink">{m.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{m.desc}</p>
                <div className="mt-4 rounded-xl border border-ink/10 bg-background p-3 text-sm text-ink-soft">
                  <span className="mb-0.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">
                    Voorbeeld
                  </span>
                  {m.ex}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-[1600px] text-center">
          <h2 className="font-display text-4xl text-ink md:text-6xl">Iets specifieks nodig?</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Vertel ons wat je bedrijf nodig heeft. Wij bouwen het — gewoon zeggen wat het moet doen.
          </p>
          <Link
            to="/offerte"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm text-background hover:bg-accent transition-colors"
          >
            Vraag een prijsindicatie aan →
          </Link>
        </div>
      </section>
    </article>
  );
}
