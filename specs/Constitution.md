---
title: bench. Constitution
version: 1.0.0
ratified: 2026-09-29
last_amended: 2026-09-29
owner: Sanghel González
tags: [constitution, governance]
---

# bench. Constitution

bench. is a set of developer tools that run in the browser by default: format, convert,
compare and decode, locally unless a tool declares otherwise (Principle I). This constitution states the non-negotiable rules of the project.
The detailed, day-to-day guidance lives in `rules/` in the repository and MUST stay
consistent with it.

## Core Principles

### I. Local by Default, Server by Declaration

- Tools process user input (pasted text, files, tokens, payloads) in the browser by default.
  A browser-local tool MUST NOT send input anywhere and MUST keep working offline once the
  page is loaded.
- A tool MAY use a bench backend only when its spec declares it (`processing: server`) and
  explains why local processing is not viable. The first backend, and any new backend
  service, requires an ADR.
- Server-processed tools MUST be visibly marked as such in the UI before the user submits
  input, and MUST NOT retain or log input beyond what the request needs unless the spec says
  so and the user is told.
- User input MUST NOT be sent to third-party analytics or tracking endpoints, under any
  processing mode. Calls to other third-party APIs follow the same rule as a backend: declared
  in the spec, justified, and visible to the user.
- Persisted state is limited to per-device preferences (e.g. theme in `localStorage`);
  user input MUST NOT be persisted without an explicit, visible user action.

Rationale: "Runs locally" is the product's default promise (ADR-0001), but some future tools
need server-side processing. Declaring the processing mode per tool keeps that promise honest:
the user always knows where their data goes.

### II. Specs Are the Source of Intent

- Every feature starts from a spec in the Obsidian vault (`specs/`) before any code is
  written. Code implements specs; it never overrides them.
- When code and spec disagree, the same PR MUST fix one of them.
- Specs follow `rules/specs.md`: `BENCH-{AREA}-{NNN}` ids, mandatory frontmatter, status
  lifecycle `draft → accepted → implemented → deprecated`, and every note linked from
  `00 Index.md`.
- Decisions that shape more than one spec MUST be recorded as an ADR; unresolved questions
  MUST be recorded as `DEC-NNN` in the spec and in the index.
- Spec Kit artifacts (`spec.md`, `plan.md`, `tasks.md`) live in the vault next to the
  `BENCH-*` spec they implement and MUST reference its id.

Rationale: the vault is the single place where intent is reviewed (ADR-0004); keeping it
authoritative prevents the code from silently redefining the product.

### III. Every Acceptance Criterion Is Tested

- Each acceptance criterion has an id (`AC-n`) and at least one automated test (Vitest +
  Testing Library) listed in the spec's `tests:` frontmatter.
- The coverage gate is 80% for lines, branches, functions and statements
  (`pnpm test:coverage`); a PR MUST NOT lower it below the gate.
- Tests assert visible behavior (text, roles, links, states), never internal state, and
  mirror the source path under `__tests__/` as described in `rules/testing.md`.
- Pure transforms (formatters, converters, decoders) MUST include edge-case tables
  (`it.each`), including invalid input.

Rationale: tools transform user data; a silent regression produces wrong output the user
may copy into production.

### IV. Strict Types, Zero Warnings

- TypeScript runs in `strict` mode with `noUnusedLocals`, `noUnusedParameters` and
  `noFallthroughCasesInSwitch`.
- ESLint runs with `--max-warnings 0`; a single warning fails CI.
- Every function declares an explicit return type; types use `type`, never `interface`.
- Imports use the path aliases (`core/`, `modules/`, `assets/`, `test/`); deep relative
  imports (`../../`) are forbidden.

Rationale: a small codebase stays small only if the compiler and linter reject drift
(`rules/linting-and-types.md`).

### V. Conventional Structure (FMF)

- Pages follow `rules/page-structure.md`: exactly `index.tsx` (default export, no logic),
  `useController.<page>.tsx`, `<page>Types.ts` and `<Page>.module.css`.
- Components follow `rules/component-structure.md`: one PascalCase folder per component,
  named exports only, reusable primitives in `core/components`, module-specific ones in
  `modules/<module>/components`.
- Names follow `rules/naming-conventions.md`; route paths come from
  `core/router/routes.config.ts` and are never inlined (`rules/routing.md`).
- Static copy and data live in `constants/`, not in page folders.

Rationale: the project mirrors the author's production front-ends (ADR-0003) so any change
is predictable to write and to review.

### VI. Ink × Cobalt Design Discipline

- Colors, radii, spacing and type come only from the Ink × Cobalt tokens (ADR-0002,
  `BENCH-DS-001`); hardcoded hex values in CSS modules are forbidden (except the documented
  `#ffffff` toggle knob).
- "Ink does the work, cobalt points": primary actions use `--ink`; `--accent` is reserved for
  focus, selection, active navigation, toggles and links; status colors carry meaning only.
- Every UI change MUST work in light and dark themes, keep the global `:focus-visible`
  outline, respect `prefers-reduced-motion`, and show no horizontal overflow at 390px.
- Icons come from `lucide-react` only.

Rationale: a consistent, accessible interface is part of the product, and the design system
is the contract between the Claude Design handoff (`design/`) and the code.

## Technology & Platform Constraints

- Stack: React 19 + TypeScript + Vite single-page app, `react-router-dom`, Zustand for shared
  state, CSS Modules, `lucide-react`. Package manager: **pnpm** only.
- Node.js: a single LTS version pinned in `.nvmrc`, matched by `engines` in `package.json`,
  CI and the Vercel build. Changing it requires updating all four together.
- Hosting: Vercel, production deploys from `main` only, at `bench.sanghel.dev`
  (`BENCH-PLAT-002`). Preview deploys MUST NOT be promoted by hand.
- Design source: `design/` (Claude Design handoff). Final references are
  `Bench Design System v3`, `Bench Landing` and `Bench Dashboard`; the rest are explorations.
- Backend: none today. Introducing one (runtime, hosting, API contract) requires an ADR, and
  the front-end MUST keep working for browser-local tools when the backend is unavailable.
- Adding a runtime dependency requires a justification in the plan; adding a framework or
  replacing a stack element requires an ADR.

## Development Workflow & Quality Gates

- Git flow per `rules/github-flow.md`: work on short-lived branches, never directly on
  `develop` or `main`; one task per PR; Conventional Commits; issues, PRs, commits and branch
  names in English.
- Required CI checks before merging: `Lint`, `TypeScript`, `Tests`, `Build`. Locally, nothing
  is "done" until `pnpm lint && pnpm typecheck && pnpm test && pnpm build` passes.
- A PR that implements a spec links it and updates its `status` and `last_reviewed`.
- Every Spec Kit plan MUST include a Constitution Check against these principles; any
  violation MUST be listed with its justification or the plan is rejected.
- Merges into `main` (production) require explicit approval from the owner; auto-merge is
  never enabled for them.

## Governance

- This constitution supersedes any other practice in the project. `rules/`, `CLAUDE.md` and the
  ADRs refine it; when they conflict, the conflict is resolved in the same PR by amending one
  of them.
- Amendments are made with `/speckit-constitution`, reviewed in a PR, and recorded with a
  version bump:
  - MAJOR — a principle is removed or redefined in a backward-incompatible way (also needs an
    ADR).
  - MINOR — a principle or section is added or materially expanded.
  - PATCH — clarifications and wording.
- Compliance is reviewed on every PR and every Spec Kit plan. Complexity or deviations MUST be
  justified in writing; unjustified deviations block the merge.
- Runtime development guidance: `CLAUDE.md` and `rules/` in the repository.

**Version**: 1.0.0 | **Ratified**: 2026-09-29 | **Last Amended**: 2026-09-29
