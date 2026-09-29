---
title: bench. — spec index
tags: [index]
last_reviewed: 2026-09-28
---

# bench. — spec index

Map of content for the bench. vault. Rules for writing specs: `rules/specs.md`.

> **bench.** — developer tools that never leave your browser. Format, convert, compare and decode, all local.

## Roadmap

| Phase | Scope                                                                   | Status         |
| ----- | ----------------------------------------------------------------------- | -------------- |
| **1** | Base project + landing                                                  | ✅ implemented |
| **2** | Tools dashboard (sidebar, ⌘K palette, favorites) + the first live tools | 📝 draft       |

## Specs

| ID                                   | Title                               | Phase | Status      |
| ------------------------------------ | ----------------------------------- | ----- | ----------- |
| [[BENCH-PLAT-001 Base project]]      | Stack, structure, tooling, CI       | 1     | implemented |
| [[BENCH-DS-001 Ink × Cobalt tokens]] | Color, type, shape, core components | 1     | implemented |
| [[BENCH-LAND-001 Landing page]]      | Public landing at `/`               | 1     | implemented |
| [[BENCH-TOOLS-001 Tools dashboard]]  | Dashboard shell + live tools        | 2     | draft       |
| [[BENCH-PLAT-002 Vercel deployment]] | Production deploys from `main`      | 2     | accepted    |

## Decisions (ADR)

- [[ADR-0001 Vite React TypeScript SPA]]
- [[ADR-0002 Ink × Cobalt design system]]
- [[ADR-0003 FMF front-end conventions]]
- [[ADR-0004 Specs as source in an Obsidian vault]]

## Open decisions

| ID      | Question                                                                                                               | Where                                |
| ------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| DEC-001 | Where do **Changelog** and **Privacy** link? Rendered as "Coming soon" for now.                                        | [[BENCH-LAND-001 Landing page]]      |
| DEC-002 | GitHub link: profile (`github.com/Sanghel`, current) or the bench repo once public?                                    | [[BENCH-LAND-001 Landing page]]      |
| DEC-004 | Tool descriptions differ between the landing and dashboard designs (Base64, UUID, Hash). Landing copy is used for now. | [[BENCH-TOOLS-001 Tools dashboard]]  |
| DEC-005 | ⌘K on the landing navigates to `/tools` and opens the palette there. Or should the palette open in place?              | [[BENCH-TOOLS-001 Tools dashboard]]  |
| DEC-007 | Node version: CI/`.nvmrc` on 20 (EOL) vs what Vercel builds with.                                                      | [[BENCH-PLAT-002 Vercel deployment]] |

## Resolved decisions

| ID      | Decision                                              | Where                                |
| ------- | ----------------------------------------------------- | ------------------------------------ |
| DEC-003 | Hosting: Vercel, production deploys from `main` only. | [[BENCH-PLAT-002 Vercel deployment]] |
| DEC-006 | Production domain: `bench.sanghel.dev`.               | [[BENCH-PLAT-002 Vercel deployment]] |

## Design source

The Claude Design handoff lives in `design/` (the transcript is in `design/chats/chat1.md`). Final files: `Bench Design System v3`, `Bench Landing`, `Bench Dashboard`. `Bench Design System` (v1) and `Bench Components v2` are explorations and reference only.
