# bench. — project guide

Developer tools that never leave the browser. React 19 + TypeScript + Vite SPA (react-router-dom, Zustand, lucide-react, CSS Modules). Package manager: **pnpm**. Conventions follow the FMF front-ends (`fixmyfees/merchants-fr`).

## Specs first — OpenSpec store `bench`

Specs are the source of truth for intent and live **only in the Obsidian vault**, in the OpenSpec **store `bench`**:
`~/Documents/Obsidian Vault/bench/openspec/` (registered with `openspec store register`; ADR-0004). Never write specs,
changes or design docs as repo files. **Read the relevant spec before writing code, and keep it in sync in the same change.**

- `openspec/config.yaml` in this repo contains only `store: bench`, so any `openspec` / `/opsx:*` command run from the
  repo acts on the vault. Check for the line `Using OpenSpec root: bench`.
  **Never** create real `openspec/specs` or `openspec/changes` folders in the repo: they would shadow the store.
- `/opsx:*` skills are installed globally; nothing is needed per project.
- Reference docs (not specs) live in the vault under `bench/docs/`: `constitution.md` (governing principles),
  `decisions.md` (roadmap + `DEC-NNN` log) and `adr/`. Legacy Spec Kit ids (`BENCH-…`, `AC-n`, `FR-NNN`) are kept
  inside the OpenSpec specs for traceability.
- Overview: `openspec list --specs` (what the system is today), `openspec list` (changes in flight),
  `openspec show <id>`. Process details: `rules/specs.md`.

### Classify every request before acting

Start **every answer** with a line `**Type:** <category>` and act accordingly:

| Category       | What it is                                                                  | What to do                                                                                                                                                      |
| -------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `question`     | Question, analysis, review, explanation                                     | Answer. No changes to code or to the vault.                                                                                                                     |
| `modification` | Change an existing spec or an already implemented behavior (includes fixes) | If a requirement changes: an OpenSpec change (`/opsx:propose`) with a `MODIFIED` delta. A fix that changes no requirement goes straight to issue → branch → PR. |
| `new feature`  | Functionality with no spec in the store                                     | Full OpenSpec flow (below).                                                                                                                                     |

If a message fits more than one category, or it is unclear, say which one you assume and ask before touching anything.
A `modification` that widens the scope enough to deserve its own capability is proposed as a `new feature`.

### New feature: OpenSpec with approval stops

Each step **stops and waits for Sanghel's explicit approval** before the next one. Never chain steps.

1. (Optional) `/opsx:explore` to clarify ideas. No artifacts written.
2. `/opsx:propose <change-id>` → creates `changes/<change-id>/` in the store with `proposal.md`, `specs/` (deltas),
   `design.md` (with a Constitution Check) and `tasks.md`. Run `openspec validate <change-id> --strict`. **Stop.**
3. After review: adjust with `/opsx:update`; once approved, create the issue(s) (`rules/github-flow.md`) and record them
   in the proposal's frontmatter (`issue:`) and _Seguimiento_. **Stop.**
4. Approved → `/opsx:apply` on a `task/<issue>-<slug>` branch from `develop`; tick `tasks.md` as work lands.
5. After the work reaches `main` (phase PR `develop → main`, merged by Sanghel) → `/opsx:archive <change-id>`: merges the
   deltas into `openspec/specs/` and moves the change to `changes/archive/`. Never delete artifacts by hand.

### Traceability in `proposal.md`

End every `proposal.md` with:

```markdown
## Seguimiento

- Repos: bench
- Issues: bench#N (Part of #<phase-issue>)
- Branch: task/N-slug
- PRs: bench#M
- Relacionado: [[bench/openspec/specs/landing-page/spec|landing-page]]
```

Wikilinks always use the full path from the vault root (`[[bench/...]]`).

## Project standards live in `rules/`

`rules/` is canonical. Read the relevant rule before writing code in that area.

| Rule                           | Read it when…                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `rules/specs.md`               | starting any feature — OpenSpec change → issue → code + tests → archive                                  |
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
