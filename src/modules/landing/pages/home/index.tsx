import type { JSX } from 'react'
import {
  FeatureStrip,
  HeroBackground,
  HeroSection,
  PasteDetect,
  ProductPreview,
  ToolCatalog,
} from 'modules/landing/components'
import { useHomeController } from './useController.home'
import styles from './HomePage.module.css'

export default function HomePage(): JSX.Element {
  const { heroRef, onHeroPointerMove, openSearch } = useHomeController()
  return (
    <>
      <div ref={heroRef} className={styles.hero} onPointerMove={onHeroPointerMove}>
        <HeroBackground />
        <HeroSection onOpenSearch={openSearch} />
        <ProductPreview />
      </div>
      <FeatureStrip />
      <ToolCatalog />
      <PasteDetect />
    </>
  )
}
