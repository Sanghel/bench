import type { JSX } from 'react'
import { AppButton, AppKbd } from 'core/components'
import { PASTE_SAMPLES } from 'modules/landing/constants'
import { SectionHeading } from 'modules/landing/components/SectionHeading'
import { usePasteDetect } from './usePasteDetect.hook'
import styles from './PasteDetect.module.css'

export function PasteDetect(): JSX.Element {
  const { input, detected, detectedTool, ctaLabel, onChange, onKeyDown, applySample, submit } =
    usePasteDetect()
  const DetectedIcon = detectedTool?.icon

  return (
    <section className={styles.section} aria-labelledby="paste-title">
      <SectionHeading
        id="paste-title"
        align="center"
        title="Paste anything. We’ll pick the tool."
        subtitle="Drop in JSON, a JWT, Base64, a URL or a SQL query."
      />
      <div className={styles.box}>
        <label htmlFor="paste-input" className="sr-only">
          Paste content to detect its format
        </label>
        <textarea
          id="paste-input"
          className={styles.textarea}
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Paste here…"
          spellCheck={false}
        />
        <div className={styles.bar}>
          {detected && DetectedIcon ? (
            <span className={styles.detected} aria-live="polite">
              <span className={styles.detectedIcon}>
                <DetectedIcon size={15} aria-hidden />
              </span>
              <span className={styles.muted}>Looks like</span>
              <strong>{detected.label}</strong>
            </span>
          ) : (
            <span className={styles.samples}>
              Try
              {PASTE_SAMPLES.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  className={styles.sample}
                  onClick={(): void => applySample(sample.value)}
                >
                  {sample.label}
                </button>
              ))}
            </span>
          )}
          <AppButton className={styles.cta} onClick={submit}>
            {ctaLabel}
            <AppKbd variant="inverse">⌘↵</AppKbd>
          </AppButton>
        </div>
      </div>
    </section>
  )
}
