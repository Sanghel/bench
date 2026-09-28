type Listener = (e: MediaQueryListEvent) => void

export type MatchMediaController = {
  /** Sets which queries match, e.g. `set({ '(prefers-reduced-motion: reduce)': true })`. */
  set: (matches: Record<string, boolean>) => void
  reset: () => void
}

export function installMatchMediaMock(): MatchMediaController {
  let matches: Record<string, boolean> = {}
  const listeners = new Map<string, Set<Listener>>()

  window.matchMedia = (query: string): MediaQueryList =>
    ({
      get matches(): boolean {
        return matches[query] ?? false
      },
      media: query,
      onchange: null,
      addEventListener: (_: string, cb: Listener): void => {
        if (!listeners.has(query)) listeners.set(query, new Set())
        listeners.get(query)?.add(cb)
      },
      removeEventListener: (_: string, cb: Listener): void => {
        listeners.get(query)?.delete(cb)
      },
      addListener: (): void => undefined,
      removeListener: (): void => undefined,
      dispatchEvent: (): boolean => true,
    }) as MediaQueryList

  return {
    set: (next): void => {
      matches = { ...matches, ...next }
      Object.keys(next).forEach((q) =>
        listeners
          .get(q)
          ?.forEach((cb) => cb({ matches: next[q], media: q } as MediaQueryListEvent)),
      )
    },
    reset: (): void => {
      matches = {}
      listeners.clear()
    },
  }
}
