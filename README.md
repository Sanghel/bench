# bench.

**The dev tools you reach for, in one quiet place.** Format, convert, compare and decode in your browser. Nothing is uploaded and nothing is tracked.

- **Phase 1 (this):** base project + landing page.
- **Phase 2:** tools dashboard with ⌘K palette, favorites and the first live tools. See `specs/tools/`.

## Getting started

```bash
nvm use            # Node 20
pnpm install
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

## Repository map

| Path                   | What                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `src/core/`            | shared: theme tokens + store, components, hooks, router, tool catalogue, format detection |
| `src/modules/landing/` | landing page (`/`)                                                                        |
| `src/modules/tools/`   | tools area (phase 1 placeholder)                                                          |
| `specs/`               | **specs, the source of truth**, as an Obsidian vault. Start at `specs/00 Index.md`        |
| `rules/`               | coding standards (adapted from the FMF front-ends)                                        |
| `design/`              | Claude Design handoff: prototypes + transcript                                            |

## Stack

Vite 8 · React 19 · TypeScript 6 (strict) · react-router-dom 7 · Zustand 5 · lucide-react · CSS Modules + custom properties · Vitest 4 + Testing Library + happy-dom.

Design system: **Ink × Cobalt**. Geist and Geist Mono; ink for primary actions, cobalt for focus, selection and links. See `rules/theming.md`.

---

Crafted with ♥ and React + TypeScript by [Sanghel González](https://sanghel.dev).
