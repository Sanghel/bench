# Linting & Types

The lint script runs with **`--max-warnings 0`** (`package.json`). A single warning fails CI and local lint. Run `pnpm lint && pnpm typecheck` before considering any change done.

> Config lives in `eslint.config.js` (flat config) and `tsconfig.json`. This file documents the rules that bite most often — when they conflict with the config, the config wins.

## ESLint rules that bite

| Rule                                               | Setting                                                       | What it forces                                                                                                                                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@typescript-eslint/explicit-function-return-type` | `error`, `allowExpressions: false`                            | **Every** function needs an explicit return type — including arrow callbacks. `() => doX()` fails; `(): void => doX()` passes. `allowTypedFunctionExpressions` is on, so a callback whose type is already inferred from context (e.g. a typed prop) is fine. |
| `@typescript-eslint/no-unused-vars`                | `error`, `argsIgnorePattern: '^_'`, `varsIgnorePattern: '^_'` | No unused vars/args. To intentionally ignore one, prefix with `_` (e.g. `onSuccess: (result, _variables) => …`).                                                                                                                                             |
| `@typescript-eslint/consistent-type-definitions`   | `['error', 'type']`                                           | Use `type X = {…}`, never `interface X {…}`.                                                                                                                                                                                                                 |
| `max-lines-per-function`                           | `error`, `max: 300`                                           | Split functions/components over 300 lines.                                                                                                                                                                                                                   |
| `react-refresh/only-export-components`             | `warn`, `allowConstantExport: true`                           | A component file should export the component (and constants), not arbitrary runtime values.                                                                                                                                                                  |
| `react-hooks/exhaustive-deps`                      | recommended                                                   | Keep dependency arrays complete. When you deliberately omit a stable ref, add `// eslint-disable-next-line react-hooks/exhaustive-deps` with a one-line reason.                                                                                              |

Type-aware rules apply (e.g. `no-floating-promises` → prefix fire-and-forget promises with `void`, as in `void queryClient.invalidateQueries(...)`).

### Tests are relaxed

Files under `**/*.test.{ts,tsx}`, `**/__tests__/**` and `src/test/**` turn **off** `@typescript-eslint/explicit-function-return-type` and `react-refresh/only-export-components` — test helpers don't need explicit return types. Everything else (e.g. `no-unused-vars`, `max-lines-per-function`) still applies.

## TypeScript

`strict: true` plus `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. Consequences:

- No implicit `any`; type every parameter and public return.
- Dead locals/params are compile errors (same `_` escape hatch as ESLint).
- `switch` cases must not fall through.

## Imports — aliases only

`baseUrl: src` with aliases `core/*`, `modules/*`, `assets/*`, `test/*`. **Never** use deep relative imports (`../../../`). Same-folder/child relatives (`./registerTypes`, `./useController.login`) are fine.

```ts
import { httpClient } from 'core/utils/httpClient' // ✓
import { foo } from '../../../core/utils/foo' // ✗ use core/utils/foo
```

## Quick pre-flight

```bash
pnpm lint && pnpm typecheck && pnpm test
```
