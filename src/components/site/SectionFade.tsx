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

function isDonker(kleur: string) {
  const { r, g, b } = naarRGB(kleur);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.3;
}

function pasFadeToe() {
  document.querySelectorAll("[data-section-fade]").forEach((el) => el.remove());

  const main = document.querySelector("main");
  if (!main) return;
  // Alleen zichtbare secties (een verborgen tabpaneel heeft hoogte 0).
  const sections = (Array.from(main.querySelectorAll("section")) as HTMLElement[]).filter(
    (el) => el.offsetHeight > 0 && el.getClientRects().length > 0,
  );

  for (let i = 0; i < sections.length - 1; i++) {
    const a = sections[i];
    const b = sections[i + 1];
    const kleurA = getComputedStyle(a).backgroundColor;
    const kleurB = getComputedStyle(b).backgroundColor;
    if (kleurA === kleurB) continue;
    // Geen vervaging rond de donkere (bg-ink) secties — daar moet de
    // overgang scherp blijven in plaats van doorlopen in de kleur.
    if (isDonker(kleurA) || isDonker(kleurB)) continue;

    // De fade blijft binnen de witruimte van beide secties, zodat hij nooit inhoud afdekt.
    const padOnder = parseFloat(getComputedStyle(a).paddingBottom) || 0;
    const padBoven = parseFloat(getComputedStyle(b).paddingTop) || 0;
    const half = Math.min(FADE_HOOGTE / 2, padOnder, padBoven);
    if (half < 16) continue;

    const overlay = document.createElement("div");
    overlay.setAttribute("data-section-fade", "1");
    Object.assign(overlay.style, {
      position: "absolute",
      left: "0",
      right: "0",
      height: `${half * 2}px`,
      top: `${a.offsetTop + a.offsetHeight - half}px`,
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

    // Hertekenen zodra de pagina van hoogte verandert of een tabpaneel wisselt.
    const main = document.querySelector("main");
    const ro = main ? new ResizeObserver(plan) : null;
    if (main) ro?.observe(main);
    const mo = main ? new MutationObserver(plan) : null;
    mo?.observe(main ?? document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden"],
    });

    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", plan);
      ro?.disconnect();
      mo?.disconnect();
      document.querySelectorAll("[data-section-fade]").forEach((el) => el.remove());
    };
  }, [pathname]);

  return null;
}
