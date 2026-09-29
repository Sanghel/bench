import { render, screen } from '@testing-library/react'
import { matchMedia } from 'test/setup'
import { HeroBackground } from 'modules/landing/components'

describe('HeroBackground', () => {
  it('is hidden from assistive tech and renders two glyph layers', () => {
    render(<HeroBackground />)
    const root = screen.getByTestId('hero-background')
    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(root.querySelectorAll('span')).toHaveLength(54 * 2)
  })

  it('animates glyphs from invisible by default', () => {
    render(<HeroBackground />)
    const glyph = screen.getByTestId('hero-background').querySelector('span') as HTMLElement
    expect(glyph.style.opacity).toBe('0')
    expect(glyph.style.animationName).toBe('')
  })

  it('holds glyphs still and visible when reduced motion is requested', () => {
    matchMedia.set({ '(prefers-reduced-motion: reduce)': true })
    render(<HeroBackground />)
    const glyph = screen.getByTestId('hero-background').querySelector('span') as HTMLElement
    expect(glyph.style.animationName).toBe('none')
    expect(Number(glyph.style.opacity)).toBeGreaterThan(0)
  })
})
