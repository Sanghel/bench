---
adr: ADR-0003
title: Follow the FMF front-end conventions
status: accepted
date: 2026-09-28
tags: [adr]
---

# ADR-0003 — Follow the FMF front-end conventions

## Context

The author's production front-ends (`fixmyfees/merchants-fr`, `fixmyfees/partners-fr`) already have documented, battle-tested conventions in `rules/`. bench should feel familiar to work on.

## Decision

Reuse them, adapted for an app with no API and no auth:

- `src/core` (shared) / `src/modules/<module>` (features); alias-only imports (`core/`, `modules/`, `assets/`, `test/`).
- Pages: `index.tsx` (default export) + `useController.<page>.tsx` + `<page>Types.ts` + `<Page>.module.css`.
- Components: PascalCase folder, `index.tsx` (named export), `types.ts`, `use<Name>.hook.ts`, `<Name>.module.css`.
- Same ESLint flat config (`--max-warnings 0`, explicit return types, `type` over `interface`), same TS strictness, same Prettier config.
- Same GitHub flow: `main` ← `develop` ← `task/<issue>-<slug>`, phase PRs, Conventional Commits, the same PR/issue templates and CI jobs (Lint, TypeScript, Tests, Build).

Dropped as not applicable: antd, react-query, services/adapters/endpoints, guards/permissions, MSW, breadcrumbs, forms, modals and notifications rules (each comes back if needed).

## Consequences

The `rules/` folder is copied and adapted; `rules/` is canonical, as in FMF.
