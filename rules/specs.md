# Specs — spec-driven development with OpenSpec

Specs are the **source of truth for intent**. They live only in the Obsidian vault, in the OpenSpec **store `bench`** (`<vault>/bench/openspec/`, ADR-0004). This repo holds just `openspec/config.yaml` with `store: bench`, so `openspec` and `/opsx:*` run from here act on the vault (`Using OpenSpec root: bench`). Never create real `openspec/specs` or `openspec/changes` folders in the repo: they would shadow the store. Governing principles: `bench/docs/constitution.md` in the vault. Code implements specs; it never overrides them. When code and spec disagree, fix one of them in the same change.

Adapted from the FMF spec governance (`fixmyfees/docs → fmf-v2-spec/SPEC-GOVERNANCE.md`) and the FMF OpenSpec store.

## Setup (once per machine)

```bash
openspec store register "<vault>/bench" --id bench --yes
openspec list --specs   # from the repo: prints "Using OpenSpec root: bench"
```

## Store layout

```
<vault>/bench/
├── openspec/
│   ├── config.yaml                  ← project context + per-artifact rules
│   ├── specs/<capability>/spec.md   ← what the system IS today (permanent)
│   └── changes/
│       ├── <change-id>/             ← proposal.md, design.md, tasks.md, specs/ (deltas)
│       └── archive/                 ← closed changes
└── docs/                            ← constitution.md, decisions.md (roadmap + DEC log), adr/
```

## Flow

```
idea → /opsx:propose (proposal + delta specs + design + tasks) → review → issue(s) → /opsx:apply (code + tests)
     → PR to develop → phase PR develop → main → /opsx:archive (deltas merged into specs/)
```

1. Write or update the change **before** code: `/opsx:propose <change-id>`, then `openspec validate <change-id> --strict`.
2. Each requirement has at least one `#### Scenario:` (WHEN/THEN), and every scenario gets at least one automated test.
3. `design.md` includes a Constitution Check; `tasks.md` groups land their own tests.
4. A PR that implements a change names the change id in its description; `tasks.md` is ticked as work lands, and `## Seguimiento` in `proposal.md` lists issues and PRs.
5. Decisions that shape more than one capability become an ADR in `bench/docs/adr/`.
6. Unresolved questions are recorded as `DEC-NNN` in the change (or spec) and in `bench/docs/decisions.md`.
7. Archive (`/opsx:archive <change-id>`) only after the work is released to `main`.

## Identifiers

| Artifact      | Scheme                                 | Example                     |
| ------------- | -------------------------------------- | --------------------------- |
| Capability    | kebab-case noun for a durable behavior | `landing-page`              |
| Change        | kebab-case verb phrase                 | `add-tools-dashboard-shell` |
| ADR           | `ADR-{NNNN}`                           | `ADR-0002`                  |
| Open decision | `DEC-{NNN}` (global counter)           | `DEC-003`                   |

Legacy Spec Kit ids (`BENCH-{AREA}-{NNN}`, `AC-n`, `FR-NNN`, `SC-NNN`) stay in the spec text for traceability; new requirements may keep using `AC-n` labels in scenarios.

## Obsidian conventions

- Wikilinks use the full path from the vault root: `[[bench/openspec/specs/landing-page/spec|landing-page]]`.
- Link code with plain relative paths (Obsidian can't open them, GitHub can).
- Frontmatter is allowed in OpenSpec files (e.g. `legacy_id`, `status`, `issue`, `pr`, `tags`).
- No `.obsidian/` folder is committed (it's personal config).
