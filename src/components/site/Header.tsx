import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { NAV } from "@/lib/site-content";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-background transition-all duration-500 pb-3"
      style={{ paddingTop: "var(--app-safe-top)" }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 pt-4 lg:px-12">
        <Link to="/" className="group flex items-center gap-2" aria-label="Novela home">
          <span className="relative inline-block h-3.5 w-3.5 rounded-full bg-accent">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40" />
          </span>
          <span className="font-display text-3xl tracking-tight text-ink">novela</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const isActive = pathname === n.to;
            return (
              <Magnetic key={n.to} strength={10}>
                <Link
                  to={n.to}
                  className="group relative px-4 py-2 text-base text-ink"
                  activeProps={{ className: "text-accent" }}
                >
                  <span>{n.label}</span>
                  <span
                    className={`pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-left bg-current transition-transform duration-500 group-hover:scale-x-100 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </Magnetic>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+31611277632"
            className="text-sm text-ink-soft hover:text-accent transition-colors"
          >
            +31 6 11 27 76 32
          </a>
          <Magnetic strength={15}>
            <Link
              to="/pakketten"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-background"
            >
              <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative">Bekijk pakketten</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/offerte"
            className="inline-flex h-11 items-center rounded-full bg-accent-deep px-4 text-sm font-semibold text-white"
          >
            Offerte
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Sluit menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink/10 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-display text-2xl text-ink"
                  activeProps={{ className: "text-accent" }}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href="tel:+31611277632"
                onClick={() => setOpen(false)}
                className="mt-2 px-3 py-2 text-sm text-ink-soft"
              >
                +31 6 11 27 76 32
              </a>
              <Link
                to="/pakketten"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-semibold text-background"
              >
                Bekijk pakketten &rarr;
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
