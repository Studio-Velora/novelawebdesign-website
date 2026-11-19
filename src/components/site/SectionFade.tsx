import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const FADE_HOOGTE = 220;

// De site gebruikt oklch()-kleuren; getComputedStyle geeft die soms terug als
// lab(...) i.p.v. rgb(...). Via canvas normaliseren we elke geldige
// CSS-kleurnotatie naar RGB, zodat de donker-check altijd klopt.
let kleurCanvas: HTMLCanvasElement | null = null;
function naarRGB(kleur: string) {
  if (!kleurCanvas) kleurCanvas = document.createElement("canvas");
  kleurCanvas.width = 1;
  kleurCanvas.height = 1;
  const ctx = kleurCanvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { r: 255, g: 255, b: 255 };
  ctx.fillStyle = kleur;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return { r, g, b };
}

/** De echte achtergrond van een sectie: een transparante sectie neemt de kleur van haar ouder of de pagina. */
function echteAchtergrond(el: HTMLElement) {
  let cur: HTMLElement | null = el;
  while (cur) {
    const c = getComputedStyle(cur).backgroundColor;
    if (c && c !== "transparent" && !/^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$/.test(c)) return c;
    cur = cur.parentElement;
  }
  return getComputedStyle(document.body).backgroundColor;
}

function isDonker(kleur: string) {
  const { r, g, b } = naarRGB(kleur);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.3;
}

function pasFadeToe() {
  document.querySelectorAll("[data-section-fade]").forEach((el) => el.remove());

  const main = document.querySelector("main");
  if (!main) return;
  const mainRect = main.getBoundingClientRect();
  // Alleen zichtbare secties (een verborgen tabpaneel heeft hoogte 0).
  const sections = (Array.from(main.querySelectorAll("section")) as HTMLElement[]).filter(
    (el) => el.offsetHeight > 0 && el.getClientRects().length > 0,
  );

  for (let i = 0; i < sections.length - 1; i++) {
    const a = sections[i];
    const b = sections[i + 1];
    const kleurA = echteAchtergrond(a);
    const kleurB = echteAchtergrond(b);
    if (kleurA === kleurB) continue;
    // Geen vervaging rond de donkere (bg-ink) secties — daar moet de
    // overgang scherp blijven in plaats van doorlopen in de kleur.
    if (isDonker(kleurA) || isDonker(kleurB)) continue;

    // De fade blijft binnen de witruimte van beide secties, zodat hij nooit inhoud afdekt.
    const padOnder = parseFloat(getComputedStyle(a).paddingBottom) || 0;
    const padBoven = parseFloat(getComputedStyle(b).paddingTop) || 0;
    // 12 px veiligheidsmarge: de fade raakt nooit de inhoud, ook niet als de lay-out nog een paar pixels verschuift.
    const half = Math.min(FADE_HOOGTE / 2, padOnder - 12, padBoven - 12);
    if (half < 16) continue;

    const overlay = document.createElement("div");
    overlay.setAttribute("data-section-fade", "1");
    Object.assign(overlay.style, {
      position: "absolute",
      left: "0",
      right: "0",
      height: `${half * 2}px`,
      top: `${a.getBoundingClientRect().bottom - mainRect.top - main.clientTop - half}px`,
      pointerEvents: "none",
      zIndex: "1",
      background: `linear-gradient(to bottom, ${kleurA}, ${kleurB})`,
    });
    main.appendChild(overlay);
  }
}

/**
 * Laat de overgang tussen secties met een verschillende achtergrondkleur
 * vloeiend in elkaar overlopen, behalve rond de donkere (bg-ink) secties.
 */
export function SectionFade() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let raf = 0;
    const plan = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pasFadeToe);
    };
    const id = window.setTimeout(pasFadeToe, 150);
    window.addEventListener("resize", plan);

    // Hertekenen zodra de pagina, een sectie of de lettertypes van maat veranderen, of een tabpaneel wisselt.
    const main = document.querySelector("main");
    const ro = new ResizeObserver(plan);
    const gevolgd = new WeakSet<Element>();
    const volgSecties = () => {
      main?.querySelectorAll("section").forEach((sec) => {
        if (!gevolgd.has(sec)) {
          gevolgd.add(sec);
          ro.observe(sec);
        }
      });
    };
    if (main) ro.observe(main);
    volgSecties();
    const mo = new MutationObserver(() => {
      volgSecties();
      plan();
    });
    mo.observe(main ?? document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden"],
    });
    document.fonts?.ready.then(plan);
    window.addEventListener("load", plan);

    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", plan);
      window.removeEventListener("load", plan);
      ro?.disconnect();
      mo?.disconnect();
      document.querySelectorAll("[data-section-fade]").forEach((el) => el.remove());
    };
  }, [pathname]);

  return null;
}
