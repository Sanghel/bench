import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia?.(QUERY)
  if (!mql) return (): void => undefined
  mql.addEventListener('change', onChange)
  return (): void => mql.removeEventListener('change', onChange)
}

function getSnapshot(): boolean {
  return window.matchMedia?.(QUERY).matches ?? false
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, (): boolean => false)
}
