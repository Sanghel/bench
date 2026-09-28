import {
  createRandom,
  generateHeroGlyphs,
  isInHeadlineZone,
} from 'modules/landing/utils/heroGlyphs'

const SYMBOLS = ['{ }', '=>', '</>']

describe('createRandom', () => {
  it('is deterministic for a seed and stays in [0, 1)', () => {
    const a = createRandom(7)
    const b = createRandom(7)
    const values = Array.from({ length: 50 }, () => a())
    expect(values).toEqual(Array.from({ length: 50 }, () => b()))
    values.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    })
  })
})

describe('isInHeadlineZone', () => {
  it('detects the box behind the headline', () => {
    expect(isInHeadlineZone(50, 20)).toBe(true)
    expect(isInHeadlineZone(10, 20)).toBe(false)
    expect(isInHeadlineZone(50, 60)).toBe(false)
  })
})

describe('generateHeroGlyphs', () => {
  const glyphs = generateHeroGlyphs({ count: 54, seed: 7, symbols: SYMBOLS })

  it('produces the requested number of glyphs, identically every time', () => {
    expect(glyphs).toHaveLength(54)
    expect(generateHeroGlyphs({ count: 54, seed: 7, symbols: SYMBOLS })).toEqual(glyphs)
  })

  it('keeps values within their design ranges', () => {
    glyphs.forEach((g) => {
      expect(SYMBOLS).toContain(g.symbol)
      expect(g.size).toBeGreaterThanOrEqual(12)
      expect(g.size).toBeLessThan(24)
      expect(g.duration).toBeGreaterThanOrEqual(4)
      expect(g.duration).toBeLessThan(10)
      expect(g.delay).toBeLessThanOrEqual(0)
      expect(g.opacity).toBeGreaterThanOrEqual(0.25)
      expect(g.opacity).toBeLessThan(0.6)
    })
  })

  it('keeps most glyphs out of the headline zone', () => {
    const inZone = glyphs.filter((g) => isInHeadlineZone(g.x, g.y)).length
    expect(inZone / glyphs.length).toBeLessThan(0.15)
  })
})
