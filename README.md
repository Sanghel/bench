# bench.

**The dev tools you reach for, in one quiet place.** Format, convert, compare and decode in your browser. Nothing is uploaded and nothing is tracked.

- **Phase 1 (this):** base project + landing page.
- **Phase 2:** tools dashboard with ⌘K palette, favorites and the first live tools. See the OpenSpec change `add-tools-dashboard-shell` (`openspec show add-tools-dashboard-shell`).

## Getting started

```bash
nvm use            # Node 22
pnpm install
openspec store register "<your vault>/bench" --id bench --yes   # specs live in Obsidian (OpenSpec store), see rules/specs.md
pnpm dev           # http://localhost:5173
```

| Script                        |                                         |
| ----------------------------- | --------------------------------------- |
| `pnpm dev`                    | Vite dev server                         |
| `pnpm build`                  | typecheck + production build to `dist/` |
| `pnpm lint`                   | ESLint, zero warnings                   |
| `pnpm typecheck`              | `tsc --noEmit`                          |
| `pnpm test` / `test:coverage` | Vitest (80% gate)                       |
| `pnpm format`                 | Prettier                                |

## Deploy

Hosted on Vercel at **[bench.sanghel.dev](https://bench.sanghel.dev)**. Only `main` deploys: every merge of the `develop → main` phase PR goes to production, and no other branch builds. The config lives in `vercel.json` (SPA rewrite, cache and security headers). See the `vercel-deployment` spec in the OpenSpec store.

## Repository map

| Path                   | What                                                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `src/core/`            | shared: theme tokens + store, components, hooks, router, tool catalogue, format detection                                           |
| `src/modules/landing/` | landing page (`/`)                                                                                                                  |
| `src/modules/tools/`   | tools area (phase 1 placeholder)                                                                                                    |
| `openspec/config.yaml` | points OpenSpec at the store `bench` in the Obsidian vault, **the source of truth** for specs (not in git). `openspec list --specs` |
| `rules/`               | coding standards (adapted from the FMF front-ends)                                                                                  |
| `design/`              | Claude Design handoff: prototypes + transcript                                                                                      |

## Stack

Vite 8 · React 19 · TypeScript 6 (strict) · react-router-dom 7 · Zustand 5 · lucide-react · CSS Modules + custom properties · Vitest 4 + Testing Library + happy-dom.

Design system: **Ink × Cobalt**. Geist and Geist Mono; ink for primary actions, cobalt for focus, selection and links. See `rules/theming.md`.

---

Crafted with ♥ and React + TypeScript by [Sanghel González](https://sanghel.dev).
