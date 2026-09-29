---
spec_id: BENCH-DS-001
title: Ink × Cobalt tokens
status: implemented
phase: 1
owner: Sanghel González
last_reviewed: 2026-09-28
design: design/project/Bench Design System v3.dc.html
depends_on: ['[[ADR-0002 Ink × Cobalt design system]]']
code: [src/core/theme/tokens.css, src/index.css, src/core/components/]
tests: [src/core/components/**/__tests__/, src/core/theme/**/__tests__/]
open_decisions: []
tags: [spec, design-system, phase-1]
---

# Ink × Cobalt tokens

## Context

The final design system chosen in Claude Design, see [[ADR-0002 Ink × Cobalt design system]]. **Ink does the work, cobalt points.**

## Color roles

| Token                                | Light                             | Dark                              | Use for                                  |
| ------------------------------------ | --------------------------------- | --------------------------------- | ---------------------------------------- |
| `--bg`                               | `#fafafb`                         | `#0a0a0c`                         | Page background                          |
| `--surface`                          | `#ffffff`                         | `#111114`                         | Cards, editors, inputs                   |
| `--surface-2`                        | `#f2f2f4`                         | `#1b1b1f`                         | Hover, selected rows, segmented track    |
| `--border`                           | `#e4e4e8`                         | `#27272c`                         | Hairlines, dividers, control borders     |
| `--border-strong`                    | `#c9c9cf`                         | `#3a3a41`                         | Checkbox, hovered card                   |
| `--text`                             | `#111113`                         | `#ededf0`                         | Body text                                |
| `--text-muted`                       | `#5e5e66`                         | `#a0a0a9`                         | Labels, hints, line numbers              |
| `--accent`                           | `#2f5bea`                         | `#7d9cff`                         | Focus ring, caret, toggles, links, stars |
| `--accent-hover`                     | `#2449c9`                         | `#9db4ff`                         | Hover on accent elements                 |
| `--accent-tint`                      | `#e7edfd`                         | `#1c2442`                         | Active nav item, selection, focus halo   |
| `--accent-text`                      | `#1d3aa3`                         | `#b9c9ff`                         | Text on tint, JSON keys                  |
| `--success` / `-bg`                  | `#1c7f45` / `#e3f4e8`             | `#55c787` / `#15301f`             | Valid, added lines, strings              |
| `--danger` / `-bg`                   | `#c23a2b` / `#fbe7e4`             | `#f27a6a` / `#3a1a16`             | Errors, removed lines, destructive       |
| `--warning` / `-bg`                  | `#8a5a00` / `#fdf1d8`             | `#e6b450` / `#33280f`             | Large file, deprecated                   |
| `--ink` / `--ink-hover` / `--ink-fg` | `#111113` / `#2c2c31` / `#fafafb` | `#ededf0` / `#d2d2d8` / `#0a0a0c` | Primary action                           |
| `--syntax-number` / `--syntax-bool`  | `#a85a00` / `#9b3a8c`             | `#f0a35c` / `#e08ad4`             | Code                                     |

## Type

Geist (UI) + Geist Mono (code). Scale: Display 44/600 · H1 32/600 · H2 22/600 · H3 16/600 · Body 14/400 · Label 13/500 · Mono 13/400. Headlines use negative tracking (-0.02 to -0.045em). The landing hero uses `clamp(40px, 6.4vw, 76px)`.

## Shape, space, elevation

- Radius: 4 kbd · 6 controls · 8 large controls · 10 cards · 12 panels · 16 frames · full for tags/pills.
- Spacing: multiples of 4 (4 → 64).
- Elevation: flat (panels) · `--shadow-1` raised (controls) · `--shadow-2` overlay (menus, hovered cards).

## Core components (phase 1)

| Component      | Variants                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `AppButton`    | `primary` (ink) · `secondary` · `ghost` · `icon`; sizes `sm 32` · `md 38` · `lg 44`; `to` renders a router link |
| `AppKbd`       | `plain` · `raised` · `inverse` (on ink)                                                                         |
| `AppBadge`     | `accent` (tint pill) · `outline`                                                                                |
| `AppSegmented` | radiogroup with a surface-2 track and a raised active option                                                    |
| `AppBrand`     | `bench.` wordmark with a cobalt dot; `sm` · `md` · `lg`                                                         |
| `ThemeToggle`  | icon button, sun/moon                                                                                           |

Phase 2 adds: input/textarea, select, toggle, tabs, editor panes, diff view, toast and command palette (all present in the v3 design file).

## Acceptance criteria

- **AC-1** — Every token above exists in `tokens.css` for both themes, with values matching the design file.
- **AC-2** — No hex values in CSS modules except the white toggle knob.
- **AC-3** — Keyboard focus shows a 2px cobalt outline on every interactive element.
- **AC-4** — Primary buttons are ink; cobalt never fills a primary action.

## Changelog

- 2026-09-28 — created from design v0.3; implemented.
