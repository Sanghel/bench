export type HeroGlyph = {
  /** Position in % of the hero box. */
  x: number
  y: number
  symbol: string
  size: number
  duration: number
  delay: number
  opacity: number
  accent: boolean
}

type GlyphOptions = {
  count: number
  seed: number
  symbols: readonly string[]
}

/** Park–Miller PRNG so the layout is identical on every render and in tests. */
export function createRandom(seed: number): () => number {
  let state = seed
  return (): number => {
    state = (state * 16807) % 2147483647
    return state / 2147483647
  }
}

/** Keeps most glyphs out of the headline box so the title stays legible. */
export function isInHeadlineZone(x: number, y: number): boolean {
  return x > 22 && x < 78 && y > 8 && y < 42
}

export function generateHeroGlyphs({ count, seed, symbols }: GlyphOptions): HeroGlyph[] {
  const rnd = createRandom(seed)
  const out: HeroGlyph[] = []
  while (out.length < count) {
    const x = rnd() * 100
    const y = rnd() * 100
    if (isInHeadlineZone(x, y) && rnd() > 0.2) continue
    out.push({
      x,
      y,
      symbol: symbols[Math.floor(rnd() * symbols.length)],
      size: 12 + rnd() * 12,
      duration: 4 + rnd() * 6,
      delay: -rnd() * 10,
      opacity: 0.25 + rnd() * 0.35,
      accent: rnd() < 0.18,
    })
  }
  return out
}
