export type AppSegmentedProps<T extends string> = {
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  /** Accessible name for the group. */
  label: string
  className?: string
}
