import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";

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
  component: () => <HomePage />,
});
