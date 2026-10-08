# AGENTS.md

Instructions for AI coding assistants in this repo (`CLAUDE.md` imports this file).

## Who you're working with

The person driving this repo is a designer prototyping by vibe coding — not a developer.

- Reply in the language the user writes in (usually Polish). Plain words; when a technical term is
  unavoidable, explain it in one short sentence.
- The prototype itself is **always in English** — UI copy, screen titles, URL paths, mock data,
  file names — even when the user writes to you in Polish. Translate their Polish wording into
  natural English UI copy; ask only if the meaning is unclear.
- Do the technical work yourself (git, npm, fixing build errors). Don't hand the user commands you
  can run.
- After a visual change, say which URL to open, e.g. `http://localhost:5173/customers`.
- Ask before anything that publishes (`git push`) or is hard to undo.

## What this is

A clickable, front-end-only prototype, served by Cloudflare Workers as static files. No backend, no
database, no real APIs.

- Vite + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui (Radix base, `nova` preset), icons from `lucide-react`
- React Router (declarative mode, `BrowserRouter`)
- Cloudflare Workers static assets (`wrangler.jsonc`); unknown paths fall back to `index.html`, so
  every screen URL can be opened directly

## Commands

```bash
npm install                          # once after cloning
npm run dev                          # local preview on http://localhost:5173, opens the browser (hot reload)
npm run build                        # type-check + production build into dist/
npm run lint                         # oxlint
npx shadcn@latest add <component>    # add a shadcn/ui component into src/components/ui/
```

## Layout

```
src/
  prototype.ts           # prototype name + description shown on the home page
  screens/
    index.ts             # screen registry: each entry = one URL + one card on the home page
    HomeScreen.tsx       # "All screens" index, lists every registered screen
    <Name>Screen.tsx     # one file per screen
  mocks/                 # typed fake data used by screens
  components/
    ui/                  # shadcn/ui, generated: don't hand-edit, re-add with the CLI
    PrototypeLayout.tsx  # wraps all screens, renders the floating "All screens" button
  index.css              # Tailwind + theme tokens (colors, radius, font)
```

## Conventions

- **New screen** = `src/screens/<Name>Screen.tsx` (named export) + an entry in
  `src/screens/index.ts`. Paths are English, lowercase, kebab-case (`/new-order`). Nothing else
  is needed for it to get a URL and show up on the home page.
- **Flows between screens**: `<Link to="…">` / `useNavigate()` from `react-router`. Put state the
  client might want to deep-link to (selected tab, item id) in the URL.
- **Data**: typed mocks in `src/mocks/`. Fake people and companies only — never real client data,
  real emails, passwords or API keys. The repo and the link can be seen by others.
- **Fake interactions** (save, send, log in) update React state and/or navigate; no network
  requests. Use `localStorage` only when surviving a reload actually matters for the demo.
- **UI**: compose shadcn/ui components first (`npx shadcn@latest add dialog tabs select …`), style
  with Tailwind classes. No other UI kits, no CSS-in-JS, no extra CSS files. Theme changes go into
  the CSS variables in `src/index.css`.
- Import via the `@/` alias (`@/components/ui/button`), not `../../`.
- It's a prototype: no tests, no state-management libraries, no abstractions "for later".
- New npm packages only when clearly needed — tell the user which and why. `.npmrc` blocks install
  scripts and packages published less than 7 days ago; if an install fails on that, pick an older
  version instead of loosening `.npmrc`.

## Definition of done

1. `npm run build` passes (it also type-checks). Fix errors yourself.
2. The change works in `npm run dev` — tell the user which URL to open.

## Publishing (Cloudflare Workers Builds)

The GitHub repo is connected to Cloudflare:

- push to `main` → the production link updates in ~1–2 min
- push to any other branch → that branch gets its own Preview link:
  `https://<branch>-<worker-name>.<account-subdomain>.workers.dev`

Links (fill in after the first deploy):

- Production: `https://claude-vibecoding-cloudflare.<account-subdomain>.workers.dev`
- Cloudflare dashboard (Worker): TODO

Use the `/opublikuj` skill to publish and `/wariant` to start a variant on its own link.

- Never push without the user's OK. Never force-push or rewrite `main` history.
- Variant branch names: lowercase letters, digits and dashes, ≤ 25 chars — they become part of a URL.
- Don't change `name` or `assets` in `wrangler.jsonc` without asking: it changes or breaks the
  shared links.
- Fallback without GitHub (needs `npx wrangler login` once): `npm run deploy` (production),
  `npm run deploy:preview` (Preview for the current branch).
