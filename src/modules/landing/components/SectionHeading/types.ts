import type { ReactNode } from 'react'

export type SectionHeadingProps = {
  id?: string
  title: string
  subtitle: ReactNode
  align?: 'start' | 'center'
}
