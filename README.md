# Novela Webdesign

Onze eigen website, novelawebdesign.nl. studiovelora.nl stuurt hierheen door (`vercel.json`).

| | |
|---|---|
| Soort | Eigen site |
| Gebouwd met | Lovable, daarna afgewerkt in code |
| Stack | TanStack Start (React 19, Vite), Tailwind CSS, shadcn/ui |
| Hosting | Vercel (`nitro: { preset: "vercel" }` in `vite.config.ts`). Wordt verhuisd naar Cloudflare, zie taak 01 in `team-taken`. |
| Package manager | bun |

## Lokaal draaien

```bash
bun install
bun run dev
```

Bouwen: `bun run build`.

## Waar staat wat

- `src/routes/`: de pagina's, één bestand per route
- `src/components/`: eigen componenten (`src/components/ui/` zijn standaard shadcn-componenten)
- `public/`: afbeeldingen en andere statische bestanden

`netlify.toml` is een oude Netlify-koppeling; opruimen staat als taak 04 in `team-taken`.

Handboek voor het hele bouwproces: repo `Studio-Velora/website-bouw-proces`. Openstaande teamtaken: `Studio-Velora/team-taken`.
