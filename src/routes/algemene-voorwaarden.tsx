import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/algemene-voorwaarden")({
  head: () => ({
    meta: [
      { title: "Algemene Voorwaarden — Novela Webdesign" },
      { name: "description", content: "De algemene voorwaarden van Novela Webdesign voor het leveren van design- en developmentdiensten." },
    ],
    links: [{ rel: "canonical", href: "https://www.novelawebdesign.nl/algemene-voorwaarden" }],
  }),
  component: AlgemeneVoorwaarden,
});

function AlgemeneVoorwaarden() {
  return (
    <article className="px-6 pb-32 pt-40 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h1 className="font-display text-5xl text-ink md:text-6xl">Algemene Voorwaarden</h1>
          <p className="mt-4 text-sm text-ink-faint">Laatst bijgewerkt: november 2026 · Novela Webdesign, Den Haag</p>
        </Reveal>

        <div className="mt-12 space-y-10 text-ink-soft leading-relaxed">
          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">1. Definities</h2>
            <p><strong>Novela Webdesign:</strong> de opdrachtnemer, gevestigd te Den Haag.</p>
            <p><strong>Opdrachtgever:</strong> de natuurlijke of rechtspersoon die handelt in de uitoefening van een beroep of bedrijf en een opdracht verstrekt aan Novela Webdesign.</p>
            <p><strong>Overeenkomst:</strong> de schriftelijke offerte, opdrachtbevestiging of contract tussen Novela Webdesign en de opdrachtgever.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">2. Toepasselijkheid</h2>
            <p>Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en leveringen van Novela Webdesign, tenzij schriftelijk anders overeengekomen.</p>
            <p className="mt-2">Novela Webdesign werkt uitsluitend voor zakelijke opdrachtgevers (ondernemers, waaronder zzp'ers en eenmanszaken, en organisaties). Particulieren (consumenten) kunnen geen opdracht verstrekken.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">3. Offertes</h2>
            <p>Offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld. Prijzen zijn in euro's en exclusief BTW, tenzij anders aangegeven.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">4. Betaling</h2>
            <p>Novela Webdesign hanteert standaard een aanbetaling van 50% bij start van de werkzaamheden. Het restant (50%) wordt gefactureerd zodra de opdrachtgever het eindresultaat heeft goedgekeurd. De website gaat live en het domein wordt gekoppeld nadat het restant is betaald. Betalingstermijn is 14 dagen na factuurdatum, tenzij anders overeengekomen.</p>
            <p className="mt-2">Bij te late betaling is de opdrachtgever in verzuim. Novela Webdesign behoudt zich het recht voor om vanaf dat moment wettelijke rente in rekening te brengen.</p>
            <p className="mt-2">Bij uitblijven van betaling na de vervaldatum stuurt Novela Webdesign per e-mail een herinnering. Blijft betaling daarna uit, dan volgt een laatste e-mail met een termijn van 7 dagen. Is er na het verstrijken van die termijn nog niet betaald, dan mag Novela Webdesign de website offline halen en de werkzaamheden opschorten. De website wordt niet verwijderd en wordt weer online gezet zodra de volledige betaling, inclusief eventuele rente en incassokosten, is ontvangen.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">5. Uitvoering</h2>
            <p>Novela Webdesign voert de opdracht naar beste inzicht en vermogen uit. Geleverde doorlooptijden zijn indicatief en geen fatale termijnen, tenzij uitdrukkelijk anders overeengekomen.</p>
            <p className="mt-2">De opdrachtgever zorgt voor tijdige aanlevering van content, feedback en goedkeuringen. Vertragingen aan de zijde van de opdrachtgever kunnen leiden tot uitloop van de opgegeven opleverdatum.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">6. Revisies</h2>
            <p>Bij elke opdracht zijn twee revisierondes inbegrepen. Aanvullende revisies worden in rekening gebracht op basis van uurtarief.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">7. Oplevering en eigendom</h2>
            <p>Na volledige betaling draagt Novela Webdesign alle relevante rechten van het eindproduct over aan de opdrachtgever. Novela Webdesign behoudt het recht om het werk te tonen in haar portfolio, tenzij anders afgesproken.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">8. Onderhoud en support</h2>
            <p>Na oplevering ontvangt de opdrachtgever 30 dagen gratis support voor bugs en kleine aanpassingen. Daarna is een onderhoudsabonnement af te sluiten of wordt gewerkt op basis van uurtarief (€85 per uur, vooraf geschat en uitgevoerd na akkoord).</p>
            <p className="mt-2">Een onderhoudsabonnement wordt aangegaan voor onbepaalde tijd en start nadat het restant van de opdracht is betaald. De opzegtermijn is 1 maand en opzeggen kan per e-mail. Bij betalingsachterstand is het bovenstaande over offline halen ook op het abonnement van toepassing.</p>
            <p className="mt-2">Na opzegging stopt de hosting per einddatum van het abonnement. De opdrachtgever ontvangt kosteloos de code van de website (als export of door overdracht van de repository) en blijft eigenaar van domein en eventuele externe accounts. Novela Webdesign bewaart nog 30 dagen een back-up en verwijdert daarna de gegevens.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">9. Aansprakelijkheid</h2>
            <p>Novela Webdesign is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst of bedrijfsstagnatie. De totale aansprakelijkheid is beperkt tot het factuurbedrag van de betreffende opdracht.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">10. Geheimhouding</h2>
            <p>Beide partijen verplichten zich tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar verkrijgen.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">11. Toepasselijk recht</h2>
            <p>Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter te Den Haag.</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-3">12. Contact</h2>
            <p>Vragen? Mail naar <a href="mailto:info@novelawebdesign.nl" className="text-accent underline underline-offset-2">info@novelawebdesign.nl</a>.</p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
