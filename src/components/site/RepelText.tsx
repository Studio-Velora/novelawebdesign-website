import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/** Woord waarvan de letters voor de cursor wegspringen en veerkrachtig terugkomen. */
export function RepelText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mouse = { x: -9999, y: -9999 };
    const st = refs.current.map(() => ({ x: 0, y: 0, r: 0 }));
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    const tick = () => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const b = el.getBoundingClientRect();
        // positie zonder de eigen verplaatsing
        const cx = b.left + b.width / 2 - st[i].x;
        const cy = b.top + b.height / 2 - st[i].y;
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        const R = 190;
        const f = d < R ? (1 - d / R) ** 2 : 0;
        const tx = (dx / d) * f * 70;
        const ty = (dy / d) * f * 70;
        const tr = (dx / d) * f * 22;
        const s = st[i];
        s.x += (tx - s.x) * 0.14;
        s.y += (ty - s.y) * 0.14;
        s.r += (tr - s.r) * 0.14;
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.r}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const chars = Array.from(text);
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} aria-label={text}>
      {chars.map((c, i) => (
        <Fragment key={i}>
          <span className="inline-block align-bottom" aria-hidden>
            <motion.span
              className="inline-block"
              initial={{ y: "70%", opacity: 0, rotate: 10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: delay + i * 0.045, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="inline-block will-change-transform"
              >
                {c}
              </span>
            </motion.span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
