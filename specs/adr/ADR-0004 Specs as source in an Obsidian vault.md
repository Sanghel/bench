---
adr: ADR-0004
title: Specs as source, kept in an Obsidian vault
status: accepted
date: 2026-09-28
tags: [adr]
---

# ADR-0004 — Specs as source, kept in an Obsidian vault

## Context

The author wants to manage the project with specs in Obsidian, following the spec-as-source model used at FMF (`fixmyfees/docs`).

## Decision

`specs/` in this repo **is** the vault: plain Markdown with YAML frontmatter, wikilinks, and templates in `specs/_templates/`. It's versioned with the code, so a PR can change spec and implementation together. Open it directly in Obsidian or symlink it into a personal vault:

```bash
ln -s /path/to/bench/specs ~/Obsidian/Main/bench
```

## Consequences

- `.obsidian/` is gitignored (personal settings).
- Point Obsidian's _Templates_ core plugin at `_templates/`.
- Process: `rules/specs.md`.
