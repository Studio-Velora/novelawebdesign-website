import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useMemo, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Cursor } from "@/components/site/Cursor";
import { SafeAreaFill } from "@/components/site/SafeAreaFill";
import { CookieBanner } from "@/components/site/CookieBanner";
import { SectionFade } from "@/components/site/SectionFade";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <div className="font-display text-[12rem] leading-none text-accent">404</div>
        <h2 className="mt-4 font-display text-3xl text-ink">Pagina niet gevonden</h2>
        <p className="mt-3 text-ink-soft">De pagina die je zoekt bestaat niet of is verplaatst.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-background hover:bg-accent"
          >
            Terug naar home →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error: rawError, reset }: { error: unknown; reset: () => void }) {
  const error = useMemo(
    () => (rawError instanceof Error ? rawError : new Error(String(rawError))),
    [rawError],
  );
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ink">Er ging iets mis</h1>
        <p className="mt-3 text-ink-soft">Probeer het opnieuw of ga terug naar home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-ink px-5 py-2.5 text-sm text-background"
          >
            Probeer opnieuw
          </button>
          <a href="/" className="rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      // viewport-meta staat statisch in RootShell <head> (zie onder), exact zoals
      // op de werkende kale testpagina, zodat Safari viewport-fit=cover bij de
      // eerste parse vastlegt. Hier dus NIET nogmaals opnemen.
      { name: "theme-color", content: "#fbfaf7" },
      { title: "Novela Webdesign — Digitaal design & development studio" },
      {
        name: "description",
        content:
          "Novela Webdesign bouwt snelle websites, webshops en merken voor ondernemers. Vaste prijzen, SEO inbegrepen, binnen een week live.",
      },
      { property: "og:title", content: "Novela Webdesign — Digitaal design & development studio" },
      {
        property: "og:description",
        content:
          "Snelle websites en webshops met SEO inbegrepen. Vaste prijzen, persoonlijk contact, binnen een week live.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_NL" },
      { property: "og:site_name", content: "Novela Webdesign" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Novela Webdesign — Digitaal design & development studio" },
      { property: "og:image", content: "https://www.novelawebdesign.nl/og-image.png" },
      {
        name: "twitter:description",
        content:
          "Snelle websites en webshops met SEO inbegrepen. Vaste prijzen, persoonlijk contact, binnen een week live.",
      },
      { name: "twitter:image", content: "https://www.novelawebdesign.nl/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter+Tight:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Novela Webdesign",
          description:
            "Novela Webdesign bouwt snelle websites, webshops en merken voor ondernemers. Vaste prijzen, SEO inbegrepen, binnen een week live.",
          url: "https://www.novelawebdesign.nl",
          telephone: "+31611277632",
          email: "info@novelawebdesign.nl",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Den Haag",
            addressCountry: "NL",
          },
          areaServed: "NL",
          priceRange: "€€",
          openingHours: "Mo-Su 09:00-20:00",
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <head>
        {/* Statisch & als eerste, exact zoals de werkende kale testpagina:
            Safari legt viewport-fit=cover bij de eerste parse vast. */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <SafeAreaFill />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-background"
      >
        Naar de inhoud
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <SectionFade />
    </QueryClientProvider>
  );
}
