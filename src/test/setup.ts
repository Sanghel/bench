import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { installMatchMediaMock } from './matchMediaMock'

/** happy-dom has no matchMedia; the double lets suites flip media queries. */
export const matchMedia = installMatchMediaMock()

afterEach(() => {
  cleanup()
  matchMedia.reset()
  localStorage.clear()
})
