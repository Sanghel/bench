# Routing

Routes are split by **area**; each area is an exported `RouteObject[]` in `src/core/router/routes/`, composed in `AppRoutes.tsx`:

```ts
;[...landingRoutes, ...toolsRoutes, notFoundRoute]
```

| Area file           | Layout                                     | Phase                                 |
| ------------------- | ------------------------------------------ | ------------------------------------- |
| `landingRoutes.tsx` | `LandingLayout` (header + footer injected) | 1                                     |
| `toolsRoutes.tsx`   | `LandingLayout` → placeholder page         | 1 (placeholder) → 2 (dashboard shell) |

Unknown paths redirect to `HOME`. There are no guards — bench has no accounts; everything runs locally.

## Route constants — don't hardcode

`src/core/router/routes.config.ts` holds `HOME`, `TOOLS_HOME`, `toolPath(id)`, `EXTERNAL_LINKS` and the `ToolsLocationState` type.

## Handing data to the tools area

The landing never parses input itself. It navigates with router state:

```ts
navigate(toolPath('json'), { state: { input } satisfies ToolsLocationState })
navigate(TOOLS_HOME, { state: { openPalette: true } }) // ⌘K / "Search a tool"
```

Phase 2 reads `location.state` in the tools controller.

## Page titles

Wrap route elements in `RouteTitle` (`title` optional → default title). Titles render as `<Title> · bench.`.

## In-page anchors

Internal anchors are router links to `/#<id>` (`/#tools`, `/#features`); `ScrollToHash` scrolls to them after navigation and to the top otherwise. Anchored sections set `scroll-margin-top: var(--header-height)`.
