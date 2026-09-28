# Page Structure

Every page lives in `src/modules/<module>/pages/<page-name>/` and contains exactly these files:

| File                           | Purpose                                                      |
| ------------------------------ | ------------------------------------------------------------ |
| `index.tsx`                    | Page component — **default export**, consumes the controller |
| `useController.<pageName>.tsx` | All page logic: state, mutations, handlers                   |
| `<pageName>Types.ts`           | Controller return type                                       |
| `<PageName>.module.css`        | Page-level styles                                            |

## What Does NOT Belong in the Page Folder

| Item                                      | Where it goes                               |
| ----------------------------------------- | ------------------------------------------- |
| Copy, option lists, static data           | `src/modules/<module>/constants/<topic>.ts` |
| Standalone UI component used by this page | `src/modules/<module>/components/<Name>/`   |
| Shared component                          | `src/core/components/<Name>/`               |

## Controller Convention

- Hook name: `use<PageName>Controller`
- Return type: `Use<PageName>ControllerReturn` declared in the types file
- Returns a **single typed object** — not multiple values

## Example

```
src/modules/auth/pages/register/
  index.tsx                   → default export RegisterPage (consumes useRegisterController)
  useController.register.tsx  → export function useRegisterController(): UseRegisterControllerReturn
  registerTypes.ts            → export type UseRegisterControllerReturn = { ... }
  RegisterPage.module.css
```

## Rules

- `index.tsx` must be a default export
- No business logic in `index.tsx` — all logic lives in the controller
- The page folder must contain exactly these 4 files
- Static copy and data are constants: `hero.ts` → `landing/constants/`, not inside `pages/home/`
- Tests live in `pages/<page>/__tests__/` (not counted among the 4 files)

> Reference implementation: `src/modules/landing/pages/home/`.
