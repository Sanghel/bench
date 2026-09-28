---
adr: ADR-0002
title: Ink × Cobalt design system
status: accepted
date: 2026-09-28
tags: [adr]
---

# ADR-0002 — Ink × Cobalt design system

## Context

Three palettes were explored (Cobalt, Signal, Mint) on top of the Modernist system (square corners, Archivo). The user picked **Cobalt**, found the square components too boxy, and chose style **2c Ink** from three modern options (Soft, Pill, Ink), in the spirit of the Next.js / Vercel docs.

- Cobalt (blue) doesn't clash with the green/red used for diff added/removed, errors and syntax colors.
- Ink keeps primary actions black or white, which gives the highest contrast (the user had complained about low contrast).

## Decision

Adopt **Ink × Cobalt v0.3** (`design/project/Bench Design System v3.dc.html`) as the only design system: Geist and Geist Mono, 17 color roles in light and dark, radii 4/6/10/16/full, a 4px spacing grid and three elevation levels. The Modernist system is dropped.

## Consequences

- Tokens: [[BENCH-DS-001 Ink × Cobalt tokens]]; rules: `rules/theming.md`.
- `design/project/_ds/modernist-*` and v1/v2 design files are reference only.
