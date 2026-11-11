import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

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
        <p className="mt-3 text-ink-soft">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
          <a
            href="/"
            className="rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink"
          >
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
          "Novela Webdesign bouwt snelle websites, webshops en merken voor ondernemers. Vaste prijzen, SEO inbegrepen, in 1 week live.",
      },
      { property: "og:title", content: "Novela Webdesign — Digitaal design & development studio" },
      {
        property: "og:description",
        content:
          "Snelle websites en webshops met SEO inbegrepen. Vaste prijzen, persoonlijk contact, in 1 week live.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Novela Webdesign — Digitaal design & development studio" },
      { name: "description", content: "Novela Webdesign is a dynamic website showcasing a web development studio's creative capabilities." },
      { property: "og:description", content: "Novela Webdesign is a dynamic website showcasing a web development studio's creative capabilities." },
      { name: "twitter:description", content: "Novela Webdesign is a dynamic website showcasing a web development studio's creative capabilities." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4a4220ae-413f-4dc8-b7a6-ef86ba57ac9e/id-preview-2700496c--a4b518c4-718f-445e-b842-1a86bc0abe27.lovable.app-1781131761725.png" },
      { property: "og:image", content: "https://www.novelawebdesign.nl/og-image.png" },
      { name: "twitter:image", content: "https://www.novelawebdesign.nl/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "canonical", href: "https://www.novelawebdesign.nl/" },
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
          "name": "Novela Webdesign",
          "description": "Novela Webdesign bouwt snelle websites, webshops en merken voor ondernemers. Vaste prijzen, SEO inbegrepen, in 1 week live.",
          "url": "https://www.novelawebdesign.nl",
          "telephone": "+31611277632",
          "email": "info@novelawebdesign.nl",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Den Haag",
            "addressCountry": "NL"
          },
          "areaServed": "NL",
          "priceRange": "€€",
          "openingHours": "Mo-Su 09:00-20:00",
          "sameAs": []
        }),
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-7B61B4GNTB",
        async: true,
      },
      {
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());var consent=localStorage.getItem('sv_cookie_consent');if(consent==='all'){gtag('config','G-7B61B4GNTB');}`,
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
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <SectionFade />
    </QueryClientProvider>
  );
}
