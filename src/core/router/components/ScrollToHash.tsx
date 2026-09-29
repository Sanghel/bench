import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to `#hash` targets after navigation, and to the top otherwise. */
export function ScrollToHash(): null {
  const { pathname, hash } = useLocation()
  useEffect((): void => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
