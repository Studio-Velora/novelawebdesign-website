import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CONTACT, NAV } from "@/lib/site-content";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-background">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 pb-12 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-3xl">Novela Webdesign</div>
            <p className="mt-4 max-w-sm text-sm text-background/70">
              Digitaal design & development studio uit Nederland. Wij bouwen websites, webshops en
              merken die werken.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={CONTACT.phoneHref}
                className="rounded-full border border-background/20 px-4 py-2 text-sm transition-colors hover:bg-accent hover:border-accent"
              >
                Bel direct
              </a>
              <a
                href={CONTACT.whatsapp}
                className="rounded-full border border-background/20 px-4 py-2 text-sm transition-colors hover:bg-accent hover:border-accent"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-background/40">Site</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-accent">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/offerte" className="hover:text-accent">
                  Offerte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-background/40">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-accent">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-background/60">Bereikbaar {CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        <div className="relative mt-20 select-none">
          <h2 className="font-display text-[18vw] leading-[0.85] tracking-tight text-background/10">
            novela
          </h2>
          <motion.h2
            aria-hidden
            style={{ width }}
            className="font-display absolute inset-0 overflow-hidden whitespace-nowrap text-[18vw] leading-[0.85] tracking-tight text-accent"
          >
            novela
          </motion.h2>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/50">
          <div>
            © {new Date().getFullYear()} Novela Webdesign — Alle rechten voorbehouden.
            <br />
            KvK 93792816 · Ansemhoek 5, 5708 LZ Helmond
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href="/privacybeleid" className="hover:text-background/80 transition-colors">
              Privacybeleid
            </a>
            <span>·</span>
            <a href="/algemene-voorwaarden" className="hover:text-background/80 transition-colors">
              Algemene Voorwaarden
            </a>
            <span>·</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("sv-cookie-open"))}
              className="hover:text-background/80 transition-colors"
            >
              Cookievoorkeuren
            </button>
            <span>·</span>
            <span>Met zorg gebouwd in Nederland.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
