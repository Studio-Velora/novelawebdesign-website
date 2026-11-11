import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS } from "@/lib/site-content";
import { ProcessVisual } from "./ProcessVisual";

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative grid gap-12 md:grid-cols-[200px_1fr] xl:grid-cols-[200px_1fr_380px]">
      <div className="relative">
        <div className="sticky top-32 hidden md:block">
          <div className="text-xs uppercase tracking-[0.25em] text-ink-soft">6 stappen</div>
          <div className="mt-3 font-display text-4xl text-ink">In 1 week live.</div>
        </div>
      </div>
      <ol className="relative space-y-16 md:space-y-24">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-ink/10 md:left-[19px]" />
        <motion.div
          style={{ height: lineH }}
          className="absolute left-[15px] top-2 w-px bg-accent md:left-[19px]"
        />
        {PROCESS.map((p, i) => (
          <motion.li
            key={p.n}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-12 md:pl-16"
          >
            <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-background text-xs font-medium text-ink md:h-10 md:w-10 md:text-sm">
              {p.n}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-accent">{p.day}</div>
            <h3 className="mt-2 font-display text-3xl text-ink md:text-4xl">{p.title}</h3>
            <p className="mt-3 max-w-xl text-ink-soft">{p.body}</p>
          </motion.li>
        ))}
      </ol>
      <div className="relative hidden xl:block">
        <div className="sticky top-32">
          <ProcessVisual progress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}
