# Instructies voor AI-agents

<!-- STUDIO-VELORA:BEGIN -->
## Project (Studio Velora)

Onze eigen website, novelawebdesign.nl. studiovelora.nl stuurt hierheen door (`vercel.json`). Stack: TanStack Start (React 19, Vite), Tailwind CSS, shadcn/ui; gebouwd met Lovable. Hosting: Vercel (`nitro: { preset: "vercel" }` in `vite.config.ts`). Wordt verhuisd naar Cloudflare, zie taak 01 in `team-taken`.

### Commando's
- `bun install`, `bun run dev`, `bun run build`, `bun run lint`

### Waar staat wat
- Pagina's: `src/routes/` (één bestand per route). Begin daar.
- Eigen componenten: `src/components/`.

### Niet lezen tenzij echt nodig (bespaart tokens)
- `src/components/ui/`: ± 46 standaard shadcn-componenten, niet aanpassen
- `src/routeTree.gen.ts`: wordt automatisch gegenereerd
- `bun.lock`, `bun.lockb`, `package-lock.json`: lockfiles
- `public/` en andere afbeeldingen; `node_modules/`, `dist/`, `.output/`

### Regels
- Gekoppeld aan Lovable: geen force push, geen gepushte commits herschrijven, repo nooit hernoemen.
- Grotere wijzigingen in een branch met een PR, niet direct op `main`.
- Geen API-sleutels, wachtwoorden of tokens in de code; die horen in omgevingsvariabelen.
- Teksten op de site zijn Nederlands.
- `netlify.toml` is een oude Netlify-koppeling; opruimen staat als taak 04 in `team-taken`.
<!-- STUDIO-VELORA:END -->
