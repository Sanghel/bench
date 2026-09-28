import type { JSX } from 'react'
import type { AppSegmentedProps } from './types'
import styles from './AppSegmented.module.css'

export function AppSegmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: AppSegmentedProps<T>): JSX.Element {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={[styles.track, className].filter(Boolean).join(' ')}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={option === value}
          className={[styles.option, option === value && styles.active].filter(Boolean).join(' ')}
          onClick={(): void => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
