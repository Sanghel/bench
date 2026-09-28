---
spec_id: BENCH-PLAT-001
title: Base project
status: implemented
phase: 1
owner: Sanghel González
last_reviewed: 2026-09-28
design:
depends_on: ['[[ADR-0001 Vite React TypeScript SPA]]', '[[ADR-0003 FMF front-end conventions]]']
code:
  [
    package.json,
    eslint.config.js,
    tsconfig.json,
    vite.config.ts,
    vitest.config.ts,
    src/core/,
    .github/,
  ]
tests: [src/core/**/__tests__/]
open_decisions: [DEC-003]
tags: [spec, platform, phase-1]
---

# Base project

## Context

The foundation every later feature builds on. It follows [[ADR-0003 FMF front-end conventions]].

## Goals

- A Vite + React + TS app that builds, lints, typechecks and tests cleanly from a fresh clone.
- A folder structure that scales to ~15 tools without reshuffling.
- A single source for theme, tool catalogue, format detection and routes.

## Non-goals

- Deploy pipeline (DEC-003). Analytics (bench tracks nothing, by design).

## Structure

```
src/
  main.tsx · App.tsx · index.css
  assets/logos/                 React & TypeScript SVGs (local, offline)
  core/
    catalogues/tools.ts         TOOLS, TOOL_CATEGORIES, getTool, isToolId
    components/                 AppBrand, AppButton, AppKbd, AppBadge, AppSegmented, ThemeToggle
    hooks/                      usePageTitle, usePrefersReducedMotion, useHotkey
    layouts/LandingLayout/
    router/                     AppRoutes, routes/, routes.config.ts, components/
    theme/                      tokens.css, store/theme.store.ts, hooks/useColorScheme
    utils/detectFormat.ts
  modules/
    landing/                    see [[BENCH-LAND-001 Landing page]]
    tools/                      phase 1 placeholder, see [[BENCH-TOOLS-001 Tools dashboard]]
  test/                         setup, matchMedia mock, renderWithRouter
```

## Acceptance criteria

- **AC-1** — `pnpm install && pnpm lint && pnpm typecheck && pnpm test && pnpm build` passes with zero warnings.
- **AC-2** — Coverage ≥ 80% on every metric (`pnpm test:coverage`).
- **AC-3** — CI runs Lint, TypeScript, Tests and Build on PRs to `develop` / `main`.
- **AC-4** — The theme persists across reloads and defaults to the OS preference. _(theme.store tests)_
- **AC-5** — Format detection covers JWT, JSON, URL, UUID, SQL, XML and Base64, with plain text as the fallback. _(detectFormat tests)_
- **AC-6** — Unknown routes redirect to `/`; `/tools` and `/tools/:toolId` resolve. _(AppRoutes tests)_

## Implementation notes

- Commands: `pnpm dev | lint | typecheck | test | test:coverage | build | format`.
- Node 20 (`.nvmrc`), pnpm 10.
- Fonts come from Google Fonts in `index.html`, with system fallbacks.

## Open decisions

- **DEC-003** — Hosting target. The FMF fronts ship an nginx Dockerfile; a static host (Vercel/Netlify/Pages) is simpler here. Vercel is proposed in [[BENCH-PLAT-002 Vercel deployment]].

## Changelog

- 2026-09-28 — created and implemented (phase 1).
