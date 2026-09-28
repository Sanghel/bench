import type { PointerEvent, RefObject } from 'react'

export type UseHomeControllerReturn = {
  heroRef: RefObject<HTMLDivElement | null>
  onHeroPointerMove: (e: PointerEvent<HTMLDivElement>) => void
  openSearch: () => void
}
