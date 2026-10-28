# bench. — project guide

Developer tools that never leave the browser. React 19 + TypeScript + Vite SPA (react-router-dom, Zustand, lucide-react, CSS Modules). Package manager: **pnpm**. Conventions follow the FMF front-ends (`fixmyfees/merchants-fr`).

## Docs and workflow

Reference docs live in the Obsidian vault under `~/Documents/Obsidian Vault/bench/docs/`: `constitution.md` (governing
principles), `decisions.md` (roadmap + `DEC-NNN` log) and `adr/`. Read the relevant doc before changing behavior it covers.

### Classify every request before acting

Start **every answer** with a line `**Type:** <category>` and act accordingly:

| Category       | What it is                                              | What to do                                                         |
| -------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| `question`     | Question, analysis, review, explanation                 | Answer. No changes to code or to the vault.                        |
| `modification` | Change an already implemented behavior (includes fixes) | Issue → branch → PR (`rules/github-flow.md`).                      |
| `new feature`  | New functionality                                       | Short plan, approved by Sanghel, then issue → branch → PR (below). |

If a message fits more than one category, or it is unclear, say which one you assume and ask before touching anything.

### New feature: plan, then issue → branch → PR

1. Write a short plan (scope, files touched, tests). **Stop** and wait for Sanghel's approval.
2. Approved → create the issue(s) (`rules/github-flow.md`).
3. Work on a `task/<issue>-<slug>` branch from `develop`, with tests, and open the PR to `develop`.
4. Phases reach production through the `develop → main` phase PR.

## Project standards live in `rules/`

`rules/` is canonical. Read the relevant rule before writing code in that area.

| Rule                           | Read it when…                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
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
