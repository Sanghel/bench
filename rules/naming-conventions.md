# Naming Conventions

One source of truth for how files, exports and symbols are named. Page and component layout details live in `page-structure.md` and `component-structure.md`; this is the cross-cutting quick reference.

## File names

| Kind                        | Pattern                                                  | Example                    |
| --------------------------- | -------------------------------------------------------- | -------------------------- |
| Page component              | `index.tsx` (in `pages/<page>/`)                         | `pages/login/index.tsx`    |
| Page controller             | `useController.<page>.tsx`                               | `useController.login.tsx`  |
| Page controller return type | `<page>Types.ts`                                         | `loginTypes.ts`            |
| Reusable component          | `index.tsx` (in `PascalCase/` folder)                    | `AppButton/index.tsx`      |
| Component props type        | `types.ts`                                               | `AppButton/types.ts`       |
| Component logic hook        | `use<Name>.hook.ts`                                      | `useAppInput.hook.ts`      |
| CSS module                  | `<PascalCase>.module.css`                                | `AppPhoneInput.module.css` |
| Shared hook                 | `use<Name>.hook.ts` (in `core/hooks/`)                   | `useHotkey.hook.ts`        |
| Pure util                   | `<camelName>.ts` (in `core/utils/` or `<module>/utils/`) | `detectFormat.ts`          |
| Catalogue (shared data)     | `<name>.ts` (in `core/catalogues/`)                      | `tools.ts`                 |
| Module constants            | `<topic>.ts` (in `<module>/constants/`)                  | `hero.ts`                  |
| Tool transform (phase 2)    | `<tool>.transform.ts` (in `modules/tools/transforms/`)   | `json.transform.ts`        |
| Tests                       | mirror source path under `__tests__/`                    | see `testing.md`           |

## Exports

- **Components → named exports.** `export const AppButton = (…): JSX.Element => …` or `export function AppBrand(…)`. Never default-export a component.
- **Pages → default export.** `export default function LoginPage(): JSX.Element`. The route file imports the default.
- **Everything else (services, adapters, hooks, utils, constants) → named exports**, re-exported through a `constants/index.ts` barrel where one exists (`export * from './loginForm'`).

## Symbols

- Components / types: `PascalCase`. Controller return type: `Use<Page>ControllerReturn`.
- Hooks: `useX`. Constants: `SCREAMING_SNAKE_CASE` (`TOOLS_HOME`, `HERO_SYMBOLS`, `PASTE_SAMPLES`).
- Route paths and builders live in `core/router/routes.config.ts` (`HOME`, `TOOLS_HOME`, `toolPath(id)`) — never inline a path string.

## Return types

Explicit on every function — see `linting-and-types.md`. Components return `JSX.Element`; effects/handlers return `void`; services return `Promise<T>`.

## Specs

Spec notes in `specs/` are named `<SPEC-ID> <Title>.md` (e.g. `BENCH-LAND-001 Landing page.md`). See `rules/specs.md`.
