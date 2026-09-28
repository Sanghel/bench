---
spec_id: BENCH-PLAT-002
title: Vercel deployment
status: accepted
phase: 2
owner: Sanghel González
last_reviewed: 2026-09-28
design:
depends_on: ['[[BENCH-PLAT-001 Base project]]', '[[ADR-0001 Vite React TypeScript SPA]]']
code: [vercel.json, vite.config.ts, tsconfig.json, .github/workflows/ci.yml]
tests: [src/core/__tests__/vercelConfig.test.ts]
open_decisions: [DEC-007]
tags: [spec, platform, phase-2]
---

# Vercel deployment

## Context

[[BENCH-PLAT-001 Base project]] left the hosting target open (DEC-003). bench. is a static SPA with no server code, so a static host is enough. The FMF fronts ship an nginx container, which would add a Dockerfile and a server to run for no gain here.

bench. is hosted on **Vercel** at **`bench.sanghel.dev`**, with `main` as the only branch that deploys. `main` is production and only takes the `develop → main` phase PR (`rules/github-flow.md`), so every deploy has already passed CI and a manual review.

## Goals

- Every merge to `main` publishes the app to `https://bench.sanghel.dev`, with no manual step.
- No other branch deploys: `develop`, `task/*`, `chore/*` and so on.
- Deep links (`/tools`, `/tools/:toolId`) work on a hard reload.
- Hashed assets are cached for good. `index.html` is always revalidated.
- Security headers back up the "nothing leaves your browser" promise.
- The whole setup lives in a versioned `vercel.json`. The dashboard only holds what cannot live in the file.

## Non-goals

- Preview deployments for PRs or `develop`. Might come later, see _Open decisions_.
- Server code: Vercel Functions, middleware, edge config. bench. has no backend.
- Analytics and Speed Insights. bench. tracks nothing, by design.
- Moving CI to Vercel. GitHub Actions stays the gate (`Lint`, `TypeScript`, `Tests`, `Build`).

## Behavior

### Deploy flow

```
task/* ──PR──▶ develop ──phase PR (CI + manual review)──▶ main ──push──▶ Vercel production
   ✗ no deploy       ✗ no deploy                                          ✓ deploy
```

1. The `develop → main` phase PR is merged by hand (see `rules/github-flow.md`).
2. The push to `main` fires the Vercel Git integration.
3. Vercel runs `pnpm install --frozen-lockfile` then `pnpm build`, and serves `dist/`.
4. When the build succeeds, `bench.sanghel.dev` points to the new deploy. When it fails, the previous deploy stays live.

### Routing

- Vercel checks the filesystem first, so real files are served as they are: `/assets/*`, `/favicon.svg`.
- Every other path is rewritten to `/index.html`. React Router then resolves it, and unknown routes redirect to `/` (BENCH-PLAT-001 AC-6).

### Caching

| Path            | `Cache-Control`                               |
| --------------- | --------------------------------------------- |
| `/assets/(.*)`  | `public, max-age=31536000, immutable`         |
| everything else | Vercel default (revalidated on every request) |

### Headers (every path)

| Header                      | Value                                                                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy`   | `default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` |
| `X-Content-Type-Options`    | `nosniff`                                                                                                                                                                                                                         |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                                                                                                                                                                                                 |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()`                                                                                                                                                                                        |
| `Strict-Transport-Security` | Vercel default (already sent on its domains)                                                                                                                                                                                      |

`connect-src 'self'` enforces "nothing is uploaded": a tool that tries to `fetch` to another origin is blocked by the browser. The Google Fonts origins are the only external ones allowed, because `index.html` loads Geist from there.

## Acceptance criteria

- **AC-1** — `vercel.json` exists at the repo root with `framework: "vite"`, `installCommand: "pnpm install --frozen-lockfile"`, `buildCommand: "pnpm build"` and `outputDirectory: "dist"`. _(vercelConfig test)_
- **AC-2** — `git.deploymentEnabled` is `{ "**": false, "main": true }`. `**` also matches branch names with `/` (`task/…`). When a branch matches several rules and one of them is `true`, Vercel deploys, so only `main` deploys. _(vercelConfig test)_
- **AC-3** — A push to `main` creates a production deploy served at `https://bench.sanghel.dev`. _(manual check after the first merge, recorded in the Changelog)_
- **AC-4** — A push to `develop` or to a `task/*` branch creates no deploy and no PR comment with a preview URL. _(manual check)_
- **AC-5** — A hard reload of `/tools` and of `/tools/json` on production returns the app, not a 404. _(vercelConfig test for the rewrite + manual check)_
- **AC-6** — Files under `/assets/` answer with `Cache-Control: public, max-age=31536000, immutable`. `/` does not. _(vercelConfig test + `curl -I`)_
- **AC-7** — Every response carries the headers in the _Headers_ table. The landing and `/tools` render with no CSP violation in the console, fonts included. _(vercelConfig test + manual check)_
- **AC-8** — A failed build on Vercel leaves the previous production deploy live. _(Vercel default, verified once)_

## Implementation notes

- **Repo:** one `vercel.json` at the root, with `"$schema": "https://openapi.vercel.sh/vercel.json"`. No `vercel.ts`, since it would need the `@vercel/config` dependency for a static config.
- **Test:** `src/core/__tests__/vercelConfig.test.ts` imports `vercel.json` through a narrow `vercel.json` alias (`vite.config.ts` + `paths` in `tsconfig.json`), since `rules/linting-and-types.md` bans deep relative imports. It and asserts AC-1, AC-2, and the rewrite, cache and header rules of AC-5 to AC-7. This keeps AC coverage in the normal test run (`rules/testing.md`).
- **CI:** `vercel.json` is in the `src` filter in `.github/workflows/ci.yml` so a change to it runs the checks.
- **Dashboard (one-off, done by the owner):**
  1. Import `Sanghel/bench` into Vercel. The framework preset is detected as Vite, and `vercel.json` overrides it.
  2. Settings → Environments → Production: branch `main`. It is also the repo's default branch.
  3. Settings → Git: leave "Pull request comments" on only if previews are ever turned on.
  4. Settings → Domains: add `bench.sanghel.dev` to Production. At the DNS provider of `sanghel.dev`, create the `CNAME` record `bench` with the value Vercel shows. Vercel issues the TLS certificate once DNS resolves.
  5. Node.js version: see DEC-007.
- **Env vars:** none. The app has no runtime config.
- **Docs:** DEC-003 is resolved in [[BENCH-PLAT-001 Base project]] and `00 Index.md`. `README.md` has a _Deploy_ section.
- **Local check:** `pnpm build` served with the `vercel.json` rewrites and headers applied: `/` and `/tools/json` render with no CSP violation, Geist and Geist Mono load, `/assets/*` carries the immutable `Cache-Control`.

## Open decisions

- **DEC-007** — Node version. CI and `.nvmrc` use Node 20, which reached end of life in April 2026, and `engines` allows `>=20 <25`. Vercel builds with the newest version the project setting allows. Options: move `.nvmrc`, CI and the Vercel setting to 22.x or 24.x together, or pin Vercel to the same major as CI.

## Changelog

- 2026-09-28 — created (draft). Proposes Vercel as the resolution of DEC-003.
- 2026-09-28 — accepted and implemented in the repo (`vercel.json` + test). DEC-006 resolved: `bench.sanghel.dev`. Dropped `interest-cohort` from `Permissions-Policy`, since browsers no longer recognize it and log a warning. Moves to `implemented` once AC-3, AC-4 and AC-8 are checked on the first production deploy.
