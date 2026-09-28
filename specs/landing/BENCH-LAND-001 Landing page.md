---
spec_id: BENCH-LAND-001
title: Landing page
status: implemented
phase: 1
owner: Sanghel González
last_reviewed: 2026-09-28
design: design/project/Bench Landing.dc.html
depends_on: ['[[BENCH-DS-001 Ink × Cobalt tokens]]', '[[BENCH-PLAT-001 Base project]]']
code: [src/modules/landing/, src/core/layouts/LandingLayout/]
tests: [src/modules/landing/**/__tests__/]
open_decisions: [DEC-001, DEC-002]
tags: [spec, landing, phase-1]
---

# Landing page

## Context

The public page at `/`, designed in Claude Design (`Bench Landing`). Iterations requested by the user:

- Footer: **"Crafted with ♥ and [React] [TypeScript] by Sanghel González"**, the author's signature across all their sites, linking to sanghel.dev.
- The bottom call to action shouldn't look like an ad banner. It became a paste box that detects the format.
- The page needed more life: a dot grid, twinkling code glyphs and a cursor-following cobalt light, all respecting reduced motion.

## Goals

- Explain bench in one screen and get people into a tool in one action.
- Show the product (a static JSON Formatter preview) and the full catalogue.

## Non-goals

- The tools themselves (phase 2 — [[BENCH-TOOLS-001 Tools dashboard]]).
- Changelog / privacy pages (DEC-001).

## Sections (top → bottom)

1. **Header** (sticky, 60px, blurred `--bg` at 85%): `bench.` → `/` · nav _Tools_ (`/#tools`), _Shortcuts_ (`/#features`), _Changelog_ (soon) · search button "Search tools… ⌘K" · theme toggle · GitHub.
2. **Hero** (`--mx/--my` pointer vars on the wrapper):
   - Background: 24px dot grid (`--border-strong`, 45%), a 560px glow following the cursor, cobalt dots revealed in a 240px circle around it, 54 seeded glyphs twinkling (4–10s) with a cobalt copy revealed in a 220px circle. Fades out at the bottom (mask 55% → 0). Glyphs mostly avoid the headline box.
   - Pill "New · Word-level JSON diff →" links to `/tools/jdiff`.
   - H1 "The dev tools you reach for, in one quiet place." and the subtitle.
   - CTAs: **Open the tools →** (ink, links to `/tools`) and **Search a tool ⌘ K** (secondary, opens search).
   - Checks: Free · No sign-up · Works offline.
3. **Product preview**: a framed static JSON Formatter (sidebar, toolbar with Sort keys toggle and Format, input/output with line numbers and syntax colors, status bar). Decorative: `role="img"`, nothing focusable. The sidebar hides under 640px.
4. **Feature strip** (`#features`): Private by default · Keyboard-first · Instant results.
5. **Tool catalogue** (`#tools`): "Every tool, one shortcut away", "14 tools across five categories.", a segmented filter (All + 5 categories), and cards linking to `/tools/<id>`. JSON Diff carries a **New** badge.
6. **Paste anything**: a textarea; when empty, "Try" sample chips (JSON, JWT, Base64, SQL); when filled, "Looks like **<format>**" with the tool icon. The CTA reads "Open <Tool>" (or "Browse all tools") with ⌘↵ and navigates to `/tools/<id>` carrying `{ input }`.
7. **Footer**: wordmark · the credit line · GitHub / Changelog (soon) / Privacy (soon).

## Acceptance criteria

- **AC-1** — The page renders every section above in light and dark with the tokens from [[BENCH-DS-001 Ink × Cobalt tokens]]. _(HomePage.test)_
- **AC-2** — The hero light follows a mouse or pen pointer; touch doesn't move it. _(HomePage.test)_
- **AC-3** — With `prefers-reduced-motion: reduce`, glyphs are static and visible at 60% of their opacity. _(HeroBackground.test)_
- **AC-4** — ⌘K / Ctrl+K anywhere, the header search and "Search a tool" all navigate to `/tools` with `{ openPalette: true }`. _(LandingHeader.test, HomePage.test, HeroSection.test)_
- **AC-5** — The catalogue shows 14 tools and filters by category. _(ToolCatalog.test)_
- **AC-6** — Pasting detects the format live; the CTA and ⌘↵ open the detected tool with the trimmed input. Empty input browses `/tools`. _(PasteDetect.test)_
- **AC-7** — The footer credits Sanghel González with a link to sanghel.dev and local React/TypeScript logos. _(LandingFooter.test)_
- **AC-8** — No horizontal scroll at 390px; the header nav hides under 768px and the search label under 480px.
- **AC-9** — Links to destinations that don't exist yet render as non-interactive "Coming soon" text. _(NavItem.test)_

## Implementation notes

- Page: `src/modules/landing/pages/home/` (controller owns the hero pointer handler and `openSearch`).
- Components: `LandingHeader`, `HeroBackground`, `HeroSection`, `ProductPreview`, `FeatureStrip`, `ToolCatalog`, `ToolCard`, `PasteDetect`, `SectionHeading`, `NavItem`, `LandingFooter`.
- Copy and static data: `src/modules/landing/constants/`. Glyph layout: `utils/heroGlyphs.ts` (Park–Miller PRNG, seed 7).
- Detection is shared: `core/utils/detectFormat.ts`. The dashboard's quick-paste reuses it in phase 2.

## Open decisions

- **DEC-001** — Changelog and Privacy destinations.
- **DEC-002** — GitHub: profile or repo.

## Changelog

- 2026-09-28 — created from the final Claude Design landing; implemented.
