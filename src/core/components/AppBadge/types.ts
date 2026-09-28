import type { ReactNode } from 'react'

/** accent = cobalt tint pill · outline = hairline muted pill. */
export type AppBadgeTone = 'accent' | 'outline'

export type AppBadgeProps = {
  tone?: AppBadgeTone
  children: ReactNode
  className?: string
}
