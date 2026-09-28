# Theming — Ink × Cobalt, Dark / Light

Source design: `design/project/Bench Design System v3.dc.html`. Spec: `specs/design-system/BENCH-DS-001 Ink × Cobalt tokens.md`.

## The style rule

**Ink does the work, cobalt points.**

- Primary actions use `--ink` (black on light, white on dark), hover `--ink-hover`, text `--ink-fg`.
- `--accent` (cobalt) is only for focus, selection, active navigation, toggles, stars and links.
- `--success` / `--danger` / `--warning` are reserved for meaning: valid/added, error/removed, warning. Never decorative.

## State source of truth

Theme mode lives in `useThemeStore` (`src/core/theme/store/theme.store.ts`). It writes `data-theme` on `<html>` and persists to `localStorage` (`bench-theme-mode`). Initial mode: saved choice → OS `prefers-color-scheme` → `light`.

- Read + toggle in components with `useColorScheme()` (`core/theme`).
- Never create local `useState` for theme mode. Never pass a theme prop down.
- `ThemeToggle` (`core/components`) is the only toggle UI on the landing.

## Tokens

All color tokens are CSS custom properties in `src/core/theme/tokens.css`, redefined under `[data-theme='dark']`. Type, radius and spacing live in `src/index.css`.

| Purpose                               | Variable                                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Page background                       | `--bg`                                                                                                           |
| Cards, editors, inputs                | `--surface`                                                                                                      |
| Hover, selected rows, segmented track | `--surface-2`                                                                                                    |
| Hairlines / control borders           | `--border`                                                                                                       |
| Hovered card, checkbox                | `--border-strong`                                                                                                |
| Body text                             | `--text`                                                                                                         |
| Labels, hints, line numbers           | `--text-muted`                                                                                                   |
| Focus, links, toggles                 | `--accent` / `--accent-hover`                                                                                    |
| Active nav, selection, focus halo     | `--accent-tint`                                                                                                  |
| Text on tint, JSON keys               | `--accent-text`                                                                                                  |
| Primary action                        | `--ink` / `--ink-hover` / `--ink-fg`                                                                             |
| Status                                | `--success(-bg)` `--danger(-bg)` `--warning(-bg)`                                                                |
| Syntax                                | `--syntax-number`, `--syntax-bool` (strings use `--success`)                                                     |
| Elevation                             | `--shadow-1` (controls), `--shadow-2` (overlays)                                                                 |
| Radius                                | `--radius-xs 4` kbd · `-sm 6` controls · `-md 8` · `-lg 10` cards · `-xl 12` panels · `-2xl 16` frames · `-full` |
| Spacing                               | `--space-1…16` (4px base)                                                                                        |
| Fonts                                 | `--font-sans` (Geist), `--font-mono` (Geist Mono)                                                                |

## Rules

- Never hardcode hex values in CSS modules — the only exception is `#ffffff` on toggle knobs, which is white in both themes.
- Never use `opacity` to dim text — use `--text-muted`.
- Focus is `:focus-visible { outline: 2px solid var(--accent) }` (global, `index.css`). Don't remove it.
- Icons: Lucide (`lucide-react`) only.
- Motion must respect `prefers-reduced-motion` (`usePrefersReducedMotion` + a CSS `@media` fallback).

## Testing both themes

Before opening a PR that touches visual code: check the page in light and dark, toggle with the header button, reload (the choice must persist), and check a 390px-wide viewport for horizontal overflow.
