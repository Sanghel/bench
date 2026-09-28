import { useEffect } from 'react'

export const APP_TITLE = 'bench.'

export function usePageTitle(title?: string): void {
  useEffect((): void => {
    document.title = title
      ? `${title} · ${APP_TITLE}`
      : `${APP_TITLE} — dev tools in one quiet place`
  }, [title])
}
