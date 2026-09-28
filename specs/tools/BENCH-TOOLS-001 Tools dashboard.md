---
spec_id: BENCH-TOOLS-001
title: Tools dashboard
status: draft
phase: 2
owner: Sanghel González
last_reviewed: 2026-09-28
design: design/project/Bench Dashboard.dc.html
depends_on: ['[[BENCH-DS-001 Ink × Cobalt tokens]]', '[[BENCH-LAND-001 Landing page]]']
code: [src/modules/tools/]
tests: []
open_decisions: [DEC-004, DEC-005]
tags: [spec, tools, phase-2]
---

# Tools dashboard

> **Draft.** Captured from the `Bench Dashboard` prototype so phase 2 starts from a spec. Review and split into per-tool specs (`BENCH-TOOLS-0NN`) before building.

## Context

Phase 1 ships `/tools` and `/tools/:toolId` as a placeholder that already receives `{ input, openPalette }` from the landing (see `rules/routing.md`).

## Scope (from the prototype)

- **App shell**: a 248px sidebar (wordmark + `v0.1`, a search button with ⌘K, Home, Favorites, tools grouped by category, a Light/Dark segmented control at the bottom) and a 52px top bar (breadcrumb Home / Category / Tool, "Runs locally").
- **Home**: quick-paste box (detects the format and opens the tool with the text loaded), Recent list, Favorites cards (star toggles), All tools grouped by category.
- **Command palette (⌘K)**: searches tools and actions (theme switch, go home); ↑↓ / ↵ / esc.
- **Tool view**: header (icon, name, star, description, mode segmented control, tool-specific controls, Copy output), an input/output split, and a status line (state dot, lines · bytes).
- **Toast** "Copied to clipboard".

## Live tools in the prototype

JSON Formatter (sort keys), Base64 (encode/decode), URL Encode (encode/decode), Case Converter, JWT Debugger (with expiry), UUID Generator (regenerate), Hash Generator (SHA-1/256/512 via WebCrypto).

Designed next: Text Diff (split / unified), JSON Diff, SQL, XML, JSON → TypeScript, YAML ↔ JSON, Regex Tester.

## Open decisions

- **DEC-004** — Tool descriptions: landing vs dashboard copy (Base64 "text or files", UUID "v4 and v7", Hash "MD5…").
- **DEC-005** — Palette on the landing: navigate to `/tools` (current) or open in place?

## Changelog

- 2026-09-28 — draft from the Dashboard prototype.
