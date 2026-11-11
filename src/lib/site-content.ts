export const NAV = [
  { label: "Home", to: "/" },
  { label: "Pakketten", to: "/pakketten" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Mogelijkheden", to: "/mogelijkheden" },
  { label: "SEO", to: "/seo" },
  { label: "Contact", to: "/contact" },
] as const;

export const SERVICES = [
  {
    title: "Website",
    price: "vanaf €450",
    onderhoudPrijs: "vanaf €30/maand onderhoud",
    blurb:
      "Van een helder online visitekaartje tot een uitgebreide website die klanten aantrekt — voor elke fase van je onderneming.",
    bullets: [
      "Van één pagina tot een uitgebreide website",
      "Mobiel, tablet en desktop",
      "Compact stijlboek bij meerdere pagina's",
      "SEO inbegrepen",
      "Hosting, SSL en back-ups via ons onderhoud",
      "Support per e-mail en telefoon",
    ],
    link: { label: "Bekijk alle opties", to: "/pakketten" },
  },
  {
    title: "Webshop",
    price: "vanaf €1.450",
    onderhoudPrijs: "vanaf €95/maand onderhoud",
    blurb:
      "Een professionele Shopify-webshop waarmee je zelfstandig kunt verkopen en groeien.",
    bullets: [
      "Ontwerp op maat van je merk",
      "Zelf producten beheren",
      "Betalen en verzenden geregeld",
      "Shopify-account op jouw naam",
      "Doorlopend onderhoud en beveiliging mogelijk",
      "Support per e-mail en telefoon",
    ],
  },
] as const;

export const FEATURES = [
  ["Afspraakmodule", "Klanten plannen zelf"],
  ["Online reserveringen", "Tafels, kamers, plekken"],
  ["Webshop", "Productbeheer en betaling"],
  ["Reviews", "Google reviews tonen"],
  ["Google Maps", "Interactieve locatiekaart"],
  ["WhatsApp", "Direct contact-knop"],
  ["Live chat", "Realtime met bezoekers"],
  ["Klantportaal", "Eigen omgeving per klant"],
  ["Loginomgeving", "Beveiligde inlogpagina"],
  ["Admin dashboard", "Beheer al je data"],
  ["Factuurmodule", "Automatisch factureren"],
  ["Blog / nieuws", "Artikelen & tips"],
  ["CMS", "Zelf teksten aanpassen"],
  ["Meertaligheid", "Site in meerdere talen"],
  ["iDEAL betaling", "Veilig betalen"],
  ["AI chatbot", "24/7 automatisch antwoord"],
  ["AI-vindbaarheid (GEO)", "Gevonden in ChatGPT & co"],
  ["Analytics", "Inzicht in bezoekers"],
  ["Nieuwsbrief", "E-maillijst opbouwen"],
  ["Automatisering", "Mails bij acties"],
  ["API koppelingen", "Bestaande systemen"],
] as const;

export const PROCESS = [
  {
    n: "01",
    day: "Dag 1",
    title: "Gratis intake",
    body:
      "Ik kom gewoon bij je langs — met echte koekjes. Wij bespreken wat je bedrijf doet en wat de site moet bereiken.",
  },
  {
    n: "02",
    day: "Dag 1–2",
    title: "Akkoord & direct aan de slag",
    body:
      "Heldere offerte met vaste prijs. Bij akkoord regel ik ter plekke je domein en zakelijke e-mail — klaar binnen 30 minuten.",
  },
  {
    n: "03",
    day: "Dag 2–3",
    title: "Ontwerp & preview",
    body:
      "Je ziet exact hoe de site eruit komt te zien voordat er code wordt geschreven.",
  },
  {
    n: "04",
    day: "Dag 3–5",
    title: "Bouw & SEO",
    body:
      "Technisch gebouwd: snel, mobiel-vriendelijk en SEO-klaar. Hosting en mail zetten wij op.",
  },
  {
    n: "05",
    day: "Dag 5–6",
    title: "Revisies",
    body:
      "Twee volledige revisierondes inbegrepen. Wij finetunen tot het klopt.",
  },
  {
    n: "06",
    day: "Dag 7",
    title: "Live & overdracht",
    body:
      "De site gaat live met SSL, domein en Search Console. Aansluitend 30 dagen gratis support.",
  },
] as const;

export const AUDIENCES = [
  ["Kappers & barbers", "Online afspraken, diensten en openingstijden."],
  ["Restaurants", "Menu, reserveringen en bezorging."],
  ["Beautysalons", "Treatments, agenda en webshop."],
  ["Interieurbedrijven", "Portfolio en offerteaanvragen."],
  ["Aannemers & vakmensen", "Diensten, referenties en contact."],
  ["Verenigingen", "Agenda, leden en donaties."],
  ["Webshops", "Producten, betaling en verzending."],
  ["ZZP & coaches", "Personal brand, portfolio en leads."],
] as const;

export const TESTIMONIALS = [
  { quote: "Klanten maken nu online afspraken en wij krijgen veel meer aanvragen. Snel en eerlijk.", name: "Ahmed B.", role: "Kapper — Leiden" },
  { quote: "Eindelijk een site die écht strak oogt. Ziet er veel duurder uit dan hij was.", name: "Fatima N.", role: "Beautysalon — Schoonhoven" },
  { quote: "Binnen twee weken live. iDEAL werkt perfect en de bestellingen komen binnen.", name: "Marco V.", role: "Restaurant — Den Haag" },
  { quote: "Mensen bellen en zeggen: ik zag jullie site. Beste investering die ik heb gedaan.", name: "Yalcin T.", role: "Interieur — Den Haag" },
  { quote: "Persoonlijk contact, denkt echt mee. Geen verkooppraatjes maar gewoon goed werk.", name: "Sanne K.", role: "Coach — Utrecht" },
  { quote: "Wij staan nu op pagina 1 voor onze regio. De SEO doet echt z'n werk.", name: "Rachid E.", role: "Aannemer — Rotterdam" },
  { quote: "Hosting en mail volledig geregeld, en uitgelegd hoe ik het op m'n telefoon zet. Top.", name: "Lisa M.", role: "ZZP — Gouda" },
  { quote: "Vaste prijs, geen verrassingen. Precies wat een ondernemer wil.", name: "Dennis P.", role: "Fitness — Alphen a/d Rijn" },
  { quote: "Onze webshop draait soepel. Producten toevoegen kan ik nu zelf, super handig.", name: "Nadia H.", role: "Webshop — Den Haag" },
  { quote: "Snelle reacties via WhatsApp, ook na de oplevering. Echt een aanrader.", name: "Joost B.", role: "Trainer — Leiden" },
] as const;

export const PROMISES = [
  ["Vaste prijzen", "Je weet vooraf exact wat het kost."],
  ["2 revisierondes", "Het wordt precies zoals jij het wil."],
  ["30 dagen support", "Bugs lossen wij binnen 24 uur op — gratis."],
  ["Jouw eigendom", "100% van jou. Geen lock-in."],
] as const;

export const FAQ = [
  {
    q: "Hoe lang duurt het bouwen van een website?",
    a: "Een website staat gebruikelijk binnen 1 week live, gerekend vanaf je akkoord en de aanlevering van je content.",
  },
  {
    q: "Wat kost de hosting?",
    a: "Hosting, SSL en back-ups zitten in elk onderhoudsabonnement, vanaf €30 per maand. Je domein loopt op jouw naam, zodat je altijd eigenaar blijft.",
  },
  {
    q: "Krijg ik ook een zakelijk e-mailadres?",
    a: "Ja — en dat gaat sneller dan je denkt. Zodra je akkoord gaat, maken wij ter plekke je domein aan en stellen wij je zakelijke e-mailadres in op je telefoon. Klaar terwijl je erbij zit.",
  },
  {
    q: "Kan de website meertalig?",
    a: "Zeker. Wij kunnen je website in meerdere talen opleveren met een nette taalwissel — handig als je ook internationale klanten bedient.",
  },
  {
    q: "Doen jullie ook SEO?",
    a: "Bij elke website is een SEO-basis inbegrepen — inclusief de basis voor GEO en AEO, zodat je ook vindbaar bent in AI-zoekmachines. Wil je verder groeien, dan bieden wij doorlopende SEO, GEO, adverteren (SEA) en social media advertising.",
  },
  {
    q: "Wat is GEO en waarom is het belangrijk?",
    a: "GEO (Generative Engine Optimization) zorgt dat je bedrijf ook genoemd en aanbevolen wordt in AI-antwoorden — denk aan ChatGPT, Perplexity en Google's AI-overzichten. Steeds meer mensen zoeken zo, en wij richten je site zo in dat AI-zoekmachines je goed begrijpen en doorverwijzen.",
  },
  {
    q: "Betaal ik alles vooraf?",
    a: "Nee. Wij werken met 50% aanbetaling bij akkoord en 50% bij oplevering. De website gaat live zodra die tweede betaling binnen is.",
  },
] as const;

export const SEO_STEPS = [
  ["01", "Zoekwoordenonderzoek", "Wij achterhalen waar jouw klanten écht op zoeken."],
  ["02", "Technische SEO", "Snelle laadtijd, nette code en mobiel-first."],
  ["03", "Lokale SEO", "Google Bedrijfsprofiel en lokale vindbaarheid."],
  ["04", "GEO & AEO", "Ook gevonden worden in AI-antwoorden van ChatGPT, Perplexity en Google's AI-overzichten."],
  ["05", "Content & meten", "Sterke teksten en Search Console."],
] as const;

export const CONTACT = {
  phone: "+31 6 11 27 76 32",
  phoneHref: "tel:+31611277632",
  whatsapp: "https://wa.me/31611277632",
  email: "info@novelawebdesign.nl",
  hours: "elke dag 09:00–20:00",
};
