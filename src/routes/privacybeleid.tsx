import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/privacybeleid")({
  head: () => ({
    meta: [
      { title: "Privacybeleid — Novela Webdesign" },
      { name: "description", content: "Lees hoe Novela Webdesign omgaat met uw persoonsgegevens." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.novelawebdesign.nl/privacybeleid" }],
  }),
  component: Privacybeleid,
});

function Privacybeleid() {
  return (
    <article className="px-6 pb-32 pt-40 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h1 className="font-display text-5xl text-ink md:text-6xl">Privacybeleid</h1>
          <p className="mt-4 text-sm text-ink-faint">Laatst bijgewerkt: juni 2026</p>
        </Reveal>

        <div className="mt-12 space-y-10 text-ink-soft leading-relaxed">
          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">1. Wie zijn wij?</h2>
            <p>
              Novela Webdesign is een digitaal design- en development studio gevestigd aan Ansemhoek
              5, 5708 LZ Helmond (KvK 93792816), Nederland. Wij bouwen websites, webshops en
              digitale producten voor ondernemers.
            </p>
            <p className="mt-2">
              Contactgegevens:{" "}
              <a
                href="mailto:info@novelawebdesign.nl"
                className="text-accent underline underline-offset-2"
              >
                info@novelawebdesign.nl
              </a>{" "}
              · +31 6 11 27 76 32
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">
              2. Welke gegevens verzamelen wij?
            </h2>
            <p>Via ons contactformulier en offerteformulier verzamelen wij:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Naam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer (optioneel)</li>
              <li>Bedrijfsnaam en omschrijving van de opdracht</li>
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">
              3. Waarvoor gebruiken wij uw gegevens?
            </h2>
            <p>Uw gegevens worden uitsluitend gebruikt om:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Contact met u op te nemen naar aanleiding van uw aanvraag</li>
              <li>Een offerte op te stellen</li>
              <li>De overeengekomen diensten te leveren</li>
            </ul>
            <p className="mt-3">
              Wij verkopen uw gegevens nooit aan derden en gebruiken ze niet voor
              marketingdoeleinden zonder uw toestemming.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">4. Cookies</h2>
            <p>
              Wij maken gebruik van functionele cookies (noodzakelijk voor de werking van de site)
              en — met uw toestemming — analytische cookies via Google Analytics 4 om inzicht te
              krijgen in het bezoekersgedrag. U kunt uw toestemming altijd intrekken via de
              cookiebanner.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">5. Bewaartermijn</h2>
            <p>
              Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk. Contactverzoeken worden
              maximaal 2 jaar bewaard, tenzij er een lopende zakelijke relatie is.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">6. Uw rechten</h2>
            <p>
              U heeft het recht op inzage, correctie of verwijdering van uw persoonsgegevens. Stuur
              hiervoor een e-mail naar{" "}
              <a
                href="mailto:info@novelawebdesign.nl"
                className="text-accent underline underline-offset-2"
              >
                info@novelawebdesign.nl
              </a>
              . Wij reageren binnen 30 dagen.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">7. Beveiliging</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om uw gegevens te
              beschermen tegen ongeautoriseerde toegang, verlies of misbruik.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">8. Contact</h2>
            <p>
              Heeft u vragen over dit privacybeleid? Neem contact op via{" "}
              <a
                href="mailto:info@novelawebdesign.nl"
                className="text-accent underline underline-offset-2"
              >
                info@novelawebdesign.nl
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
