# Git & GitHub Workflow

> **All issues, PRs, commits and branch names MUST be written in English.**
> Templates: `.github/ISSUE_TEMPLATE/task.yaml`, `.github/pull_request_template.md`.

## Branch structure

```
main         (production — protected)
  ↑  PR develop → main at the end of each phase (manual review)
develop      (integration — default branch, protected)
  ↑  PR task → develop per task (auto-merge by default)
task/<issue-number>-<slug>   (short-lived, branched from develop)
```

There is **one flow**: phase-based work coming from `main`, broken into tasks that merge into `develop`, and a final phase PR `develop → main`.

---

## Issues

- **Phase issue** — created from `main` context. Title: `[PHASE N] <description>`. Label: `type: phase` (or `documentation` if there is no phase label). The phase issue **closes when the `develop → main` PR is merged**.
- **Task issue** — created from `develop` context, one per task within a phase. Title: `[TASK] <description>`. Body must include `Part of #<phase-issue>`. The task issue **does not close when its task PR is merged into `develop`** — see _Closing keywords_ below. It closes with the phase, or by hand.

### Closing keywords

GitHub fires a `Closes #N` keyword **only when the PR merges into the repository's default branch**, and this repo's default branch is `main`. A task PR merges into `develop`, so its `Closes` line records the link and nothing more.

Write the `Closes #N` in the task PR anyway — it is what links the issue to the PR that resolved it. Just do not expect it to close anything. Two ways to actually close a task issue:

- the `develop → main` PR at the end of the phase carries a `Closes` line for every task issue in it (see _End of phase_), or
- close it by hand when its PR merges, with a comment linking that PR.

---

## Per-task workflow (task → develop)

1. From `develop`, create the branch:
   ```
   git checkout develop && git pull
   git checkout -b task/<issue-number>-<short-slug>
   ```
2. Commit using Conventional Commits, push the branch.
3. Open the PR:
   ```
   base: develop   head: task/<issue-number>-<short-slug>
   body: "Closes #<task-issue>
          Part of #<phase-issue>"
   ```
4. Optional: request AI review (`request_copilot_review`).
5. Merge once CI is green (`Lint`, `TypeScript`, `Tests`, `Build`).
   Auto-merge is **not** available: the repo has _Allow auto-merge_ turned off, so
   `enable_pr_auto_merge` answers `Auto-merge is not enabled for this repository`. If it is
   ever enabled, `merge_method: "SQUASH"` is the convention.
6. On merge: the `task/*` branch is deleted automatically (repo setting). The task issue
   stays open — see _Closing keywords_.

---

## End of phase (develop → main)

When every task PR of the current phase is merged to `develop`:

1. Verify locally:
   ```
   pnpm lint && pnpm typecheck && pnpm test && pnpm build
   ```
2. Open the phase PR, listing **every** task issue of the phase, not just the phase issue:
   ```
   base: main   head: develop
   title: "Phase N: <description>"
   body : "Closes #<phase-issue>
           Closes #<task-issue-1>
           Closes #<task-issue-2>
           ..."
   ```
   This is the only merge that reaches the default branch, so it is the only place those
   keywords fire. Omit a task issue here and it stays open indefinitely — unless it was
   already closed by hand.
3. **STOP. Notify the user. Do NOT enable auto-merge. Do NOT merge.** `main` is production.
4. Wait for: (a) all CI checks green, (b) explicit user approval, (c) the user merges manually (or authorizes Claude to merge).
5. On merge, GitHub closes the phase issue and every task issue listed, and `develop` stays as the working branch for the next phase.

---

## Commits

Conventional Commits, body in English, one logical change per commit:

```
feat: add CaptchaModal
fix: handle 401 on token refresh
docs: update github-flow rules
refactor | test | chore | style
```

---

## Required GitHub configuration

### Branch protection — `main`

- Require PR before merging.
- Require all CI status checks to pass: `Lint`, `TypeScript`, `Tests`, `Build`.
- Require linear history.
- Disallow force-pushes and direct pushes.

### Branch protection — `develop`

- Require PR before merging.
- Require all CI status checks to pass.
- Disallow force-pushes and direct pushes.
- _Allow auto-merge_ — **not enabled today**; step 5 of the per-task workflow assumes a manual merge.

### Repo settings

- **Automatically delete head branches**: enabled (this replaces the previous cleanup workflow).
- Default branch: **`main`**. This is what makes `Closes #N` inert on a task PR — see _Closing keywords_.

---

## Quick reference

```
# Issues      ─ mcp__github__issue_write / issue_read
# PRs         ─ mcp__github__create_pull_request / pull_request_read
# Review      ─ mcp__github__request_copilot_review
# Merge       ─ mcp__github__merge_pull_request
# Auto-merge  ─ mcp__github__enable_pr_auto_merge
# Branch      ─ mcp__github__create_branch / list_branches
git log --oneline --graph --all
pnpm dev | lint | typecheck | test | build
```

---

## Never

- Work directly on `develop` or `main`.
- Force-push to `develop` or `main`.
- Commit `.env`, API keys, or credentials.
- Mix multiple tasks in a single PR.
- Push code that does not build or fails CI.
- Merge the phase PR (`develop → main`) without explicit user approval.
- Enable auto-merge on the phase PR.
