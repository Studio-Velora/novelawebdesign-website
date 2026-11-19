// Google Analytics laadt pas na toestemming ("Accepteren") en nooit eerder.
const GA_ID = "G-7B61B4GNTB";

export const CONSENT_KEY = "sv_cookie_consent";
export const OPEN_COOKIE_SETTINGS = "sv-cookie-open";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __gaLoaded?: boolean;
};

export function loadAnalytics() {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (w.__gaLoaded) return;
  w.__gaLoaded = true;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Verwijdert de Google Analytics-cookies (_ga, _ga_*) als toestemming wordt ingetrokken. */
export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
      });
    }
  });
}
