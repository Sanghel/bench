import { useMemo } from 'react'
import { usePrefersReducedMotion } from 'core/hooks'
import { HERO_GLYPH_COUNT, HERO_GLYPH_SEED, HERO_SYMBOLS } from 'modules/landing/constants'
import { generateHeroGlyphs } from 'modules/landing/utils'
import type { HeroGlyph } from 'modules/landing/utils'

type UseHeroBackgroundReturn = {
  glyphs: HeroGlyph[]
  reduceMotion: boolean
}

export function useHeroBackground(): UseHeroBackgroundReturn {
  const reduceMotion = usePrefersReducedMotion()
  const glyphs = useMemo(
    (): HeroGlyph[] =>
      generateHeroGlyphs({ count: HERO_GLYPH_COUNT, seed: HERO_GLYPH_SEED, symbols: HERO_SYMBOLS }),
    [],
  )
  return { glyphs, reduceMotion }
}
