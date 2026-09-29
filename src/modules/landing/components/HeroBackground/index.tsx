import type { CSSProperties, JSX } from 'react'
import type { HeroGlyph } from 'modules/landing/utils'
import { useHeroBackground } from './useHeroBackground.hook'
import styles from './HeroBackground.module.css'

type GlyphStyle = CSSProperties & { '--o': number }

function glyphStyle(g: HeroGlyph, spotlight: boolean, reduceMotion: boolean): GlyphStyle {
  return {
    left: `${g.x}%`,
    top: `${g.y}%`,
    fontSize: `${g.size}px`,
    '--o': spotlight ? 1 : g.opacity,
    opacity: reduceMotion ? g.opacity * 0.6 : 0,
    animationName: reduceMotion ? 'none' : undefined,
    animationDuration: `${g.duration}s`,
    animationDelay: `${g.delay}s`,
  }
}

/**
 * Decorative hero backdrop: dot grid, code glyphs that twinkle, and a cobalt
 * light that follows the cursor. The parent sets `--mx` / `--my`.
 */
export function HeroBackground(): JSX.Element {
  const { glyphs, reduceMotion } = useHeroBackground()

  const renderLayer = (spotlight: boolean): JSX.Element => (
    <div className={[styles.layer, spotlight && styles.spotlight].filter(Boolean).join(' ')}>
      {glyphs.map((g, i) => (
        <span
          key={i}
          className={[styles.glyph, (spotlight || g.accent) && styles.accent]
            .filter(Boolean)
            .join(' ')}
          style={glyphStyle(g, spotlight, reduceMotion)}
        >
          {g.symbol}
        </span>
      ))}
    </div>
  )

  return (
    <div className={styles.root} aria-hidden="true" data-testid="hero-background">
      <div className={styles.dots} />
      <div className={styles.glow} />
      <div className={styles.hotDots} />
      {renderLayer(false)}
      {renderLayer(true)}
    </div>
  )
}
