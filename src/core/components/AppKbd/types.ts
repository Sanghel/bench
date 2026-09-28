import type { ReactNode } from 'react'

/** plain = hairline · raised = thicker bottom edge · inverse = on an ink button. */
export type AppKbdVariant = 'plain' | 'raised' | 'inverse'

export type AppKbdProps = {
  variant?: AppKbdVariant
  children: ReactNode
  className?: string
}
