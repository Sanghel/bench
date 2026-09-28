# bench. — project guide

Developer tools that never leave the browser. React 19 + TypeScript + Vite SPA (react-router-dom, Zustand, lucide-react, CSS Modules). Package manager: **pnpm**. Conventions follow the FMF front-ends (`fixmyfees/merchants-fr`).

## Specs first — `specs/`

`specs/` is the source of truth for intent (an Obsidian vault). **Read the relevant spec before writing code, and update it in the same change.** Start at `specs/00 Index.md`; process in `rules/specs.md`.

## Project standards live in `rules/`

`rules/` is canonical. Read the relevant rule before writing code in that area.

| Rule                           | Read it when…                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `rules/specs.md`               | starting any feature — spec → issue → code + tests → spec status                                         |
| `rules/linting-and-types.md`   | writing any code — `--max-warnings 0`, explicit return types, `type` not `interface`, alias-only imports |
| `rules/naming-conventions.md`  | adding files/exports                                                                                     |
| `rules/page-structure.md`      | adding a page (`index.tsx` + `useController.<page>.tsx` + `<page>Types.ts` + css)                        |
| `rules/component-structure.md` | adding a component (`core/components` vs `modules/<m>/components`)                                       |
| `rules/theming.md`             | colors/styles — Ink × Cobalt tokens, dark/light, focus, motion                                           |
| `rules/routing.md`             | routes, route constants, handing state to the tools area                                                 |
| `rules/testing.md`             | writing tests (Vitest + Testing Library, 80% coverage)                                                   |
| `rules/github-flow.md`         | branches/commits/PRs                                                                                     |

## Design source

`design/` holds the Claude Design handoff (HTML prototypes and the chat transcript). The final designs are `Bench Design System v3`, `Bench Landing` and `Bench Dashboard`; the others are explorations.

## Day-to-day commands

```bash
pnpm dev            # run the app
pnpm lint           # eslint, zero-warning policy
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest run
pnpm test:coverage  # with the 80% gate
```

Before claiming work is done: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
