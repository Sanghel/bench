import type { JSX, ReactNode } from 'react'
import { usePageTitle } from 'core/hooks'

type RouteTitleProps = {
  title?: string
  children: ReactNode
}

export function RouteTitle({ title, children }: RouteTitleProps): JSX.Element {
  usePageTitle(title)
  return <>{children}</>
}
