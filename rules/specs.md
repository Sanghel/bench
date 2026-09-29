# Specs — spec-driven development

`specs/` is the **source of truth for intent**. It is an Obsidian vault: open the `specs/` folder as a vault (or symlink it into your main vault). Code implements specs; it never overrides them. When code and spec disagree, fix one of them in the same PR.

Adapted from the FMF spec governance (`fixmyfees/docs → fmf-v2-spec/SPEC-GOVERNANCE.md`).

## Flow

```
idea → spec (draft) → review → accepted → task issue(s) → code + tests → spec status: implemented
```

1. Write or update the spec **before** code. Start from `specs/_templates/Spec.md`.
2. Every acceptance criterion gets an id (`AC-1`, `AC-2`…) and at least one test.
3. A PR that implements a spec links it in the description and updates `status` / `last_reviewed`.
4. Decisions that shape more than one spec become an ADR (`specs/adr/`, template `_templates/ADR.md`).
5. Unresolved questions go in the spec's **Open decisions** as `DEC-NNN`, and in `specs/00 Index.md`.

## Identifiers

| Artifact             | Scheme                       | Example               |
| -------------------- | ---------------------------- | --------------------- |
| Spec                 | `BENCH-{AREA}-{NNN}`         | `BENCH-LAND-001`      |
| Acceptance criterion | `AC-{n}` inside a spec       | `BENCH-LAND-001 AC-4` |
| ADR                  | `ADR-{NNNN}`                 | `ADR-0002`            |
| Open decision        | `DEC-{NNN}` (global counter) | `DEC-003`             |

Areas: `PLAT` (platform/base), `DS` (design system), `LAND` (landing), `TOOLS` (dashboard + tools).

## Frontmatter (mandatory)

```yaml
---
spec_id: BENCH-LAND-001
title: Landing page
status: draft | accepted | implemented | deprecated
phase: 1
owner: Sanghel González
last_reviewed: YYYY-MM-DD
design: '[[design/project/Bench Landing.dc.html]]' # or a plain path
depends_on: ['[[BENCH-DS-001 Ink × Cobalt tokens]]']
code: [src/modules/landing/]
tests: [src/modules/landing/**/__tests__/]
open_decisions: [DEC-001]
tags: [spec, landing]
---
```

## Obsidian conventions

- File name = `<ID> <Title>.md`, so `[[BENCH-LAND-001 Landing page]]` links resolve.
- Link specs with wikilinks; link code with plain relative paths (Obsidian can't open them, GitHub can).
- Tags: `#spec`, `#adr`, `#phase-1`, `#phase-2`, `#open-decision`.
- `00 Index.md` is the map of content — add every new note there.
- No `.obsidian/` folder is committed (it's personal config).
