# Component Structure

Every reusable component lives in its own folder. The folder name is PascalCase and matches the export name.

## Required Files

| File                         | Purpose                                                             |
| ---------------------------- | ------------------------------------------------------------------- |
| `index.tsx`                  | Component implementation — named export                             |
| `types.ts`                   | Props type and component-specific types (skip if props are trivial) |
| `use<Name>.hook.ts`          | Component logic hook (skip if stateless)                            |
| `<ComponentName>.module.css` | Scoped styles — create when the component needs custom styles       |

## Folder Locations

- Reusable across the app → `src/core/components/<ComponentName>/`
- Specific to one module → `src/modules/<module>/components/<ComponentName>/`

## Naming Rules

- Component function: PascalCase **named export** — `export function AppBrand(...)` or `export const AppBrand = ...`
- Props type: `<ComponentName>Props` in `types.ts`
- Hook file: `use<ComponentName>.hook.ts`, returns a typed object

## Example

```
src/core/components/AppBrand/
  index.tsx           → export function AppBrand(props: AppBrandProps): JSX.Element
  types.ts            → export type AppBrandProps = { variant: 'horizontal' | 'vertical'; ... }
  useAppBrand.hook.ts → export function useAppBrand(...) (if logic exists)
```

## Tests

Component tests go in `<ComponentName>/__tests__/<ComponentName>.test.tsx` — see `testing.md`.

## Rules

- Never use default exports for components
- Never co-locate two unrelated components in the same folder
- `types.ts` is required when props have more than two fields
- Hook file is required when the component has non-trivial state or side effects
- CSS module filename must match the component name: `AppBrand.module.css`, not `styles.module.css`
- `core/components` is for UI primitives reusable across modules — module-specific components live in the module
