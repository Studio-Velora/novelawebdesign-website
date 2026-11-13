import { createFileRoute, Link } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";

export const Route = createFileRoute("/wow/$level")({
  head: () => ({
    meta: [{ title: "Novela Webdesign — wow-model" }, { name: "robots", content: "noindex" }],
  }),
  component: WowPage,
});

const LABELS = ["Basis", "Intro", "Galerij", "Interactief", "3D"];

function WowPage() {
  const { level } = Route.useParams();
  const n = Math.min(5, Math.max(1, parseInt(level, 10) || 1));
  return (
    <>
      <HomePage key={n} level={n} />
      <div className="fixed bottom-4 left-1/2 z-[150] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/80 p-1.5 text-white shadow-2xl backdrop-blur-md">
        {LABELS.map((l, i) => (
          <Link
            key={l}
            to="/wow/$level"
            params={{ level: String(i + 1) }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              n === i + 1 ? "bg-white text-black" : "text-white/70 hover:text-white"
            }`}
          >
            {i + 1} <span className="hidden sm:inline">{l}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
