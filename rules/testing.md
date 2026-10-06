# Testing

Vitest + Testing Library in `happy-dom`. Coverage gate: **80%** lines/branches/functions/statements (`pnpm test:coverage`).

## File locations

Mirror the source path under `__tests__/`:

```
src/core/utils/detectFormat.ts                 → src/core/utils/__tests__/detectFormat.test.ts
src/modules/landing/components/PasteDetect/    → PasteDetect/__tests__/PasteDetect.test.tsx
src/modules/landing/pages/home/                → pages/home/__tests__/HomePage.test.tsx
```

## Categories

1. **Pure functions** (utils, catalogues, glyph generation) — input → output, include edge cases. Prefer `it.each` tables.
2. **Hooks / controllers** — `renderHook` with a `makeWrapper` factory providing `MemoryRouter` (+ route params when needed).
3. **Components** — `render` + `screen`. Test visible behavior only: text, ARIA roles, links, disabled states. Never assert internal state.
4. **Navigation** — use `renderWithRouter` (`test/renderWithRouter`), which renders a `LocationProbe` (`data-testid="location"`, `data-state` = JSON of router state).

## Test helpers (`src/test/`)

| Helper                           | Use                                                                       |
| -------------------------------- | ------------------------------------------------------------------------- |
| `setup.ts`                       | jest-dom, cleanup, resets `matchMedia` and `localStorage` after each test |
| `matchMedia` (from `test/setup`) | `matchMedia.set({ '(prefers-reduced-motion: reduce)': true })`            |
| `renderWithRouter(ui, entry?)`   | render inside `MemoryRouter` + `LocationProbe`                            |

## General rules

- One `describe` per unit, one `it` per observable behavior; names are full English sentences.
- Aliases only (`core/`, `modules/`, `test/`), never `../../../`.
- Don't rely on browser APIs happy-dom lacks (`matchMedia` is mocked; `scrollIntoView`/`scrollTo` must be stubbed per test).
- Every requirement scenario (and legacy `AC-n`) in a spec maps to at least one test — name the test file in the change's `tasks.md`.
