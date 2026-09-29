import { Children } from 'react'
import type { JSX, ReactNode } from 'react'
import {
  Braces,
  Binary,
  Copy,
  Database,
  FileJson,
  GitCompare,
  Lock,
  Search,
  WandSparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import styles from './ProductPreview.module.css'

type PreviewNavGroup = {
  label: string
  items: { name: string; icon: LucideIcon; active?: boolean }[]
}

const NAV: PreviewNavGroup[] = [
  {
    label: 'Format',
    items: [
      { name: 'JSON Formatter', icon: Braces, active: true },
      { name: 'SQL Formatter', icon: Database },
    ],
  },
  {
    label: 'Convert',
    items: [
      { name: 'JSON → TypeScript', icon: FileJson },
      { name: 'Base64', icon: Binary },
    ],
  },
  { label: 'Compare', items: [{ name: 'Text diff', icon: GitCompare }] },
]

const INPUT =
  '{"name":"bench","version":"0.1.0","private":true,"tools":24,"tags":["json","diff"],"author":null}'

const key = (k: string): JSX.Element => <span className={styles.key}>&quot;{k}&quot;</span>
const str = (v: string): JSX.Element => <span className={styles.str}>&quot;{v}&quot;</span>

const INDENT = '  '
const bool = (v: string): JSX.Element => <span className={styles.bool}>{v}</span>
const num = (v: string): JSX.Element => <span className={styles.num}>{v}</span>

type OutputLine = { content: ReactNode; highlight?: boolean }

const OUTPUT: OutputLine[] = [
  { content: '{' },
  { content: [INDENT, key('author'), ': ', bool('null'), ','] },
  { content: [INDENT, key('name'), ': ', str('bench'), ','] },
  { content: [INDENT, key('private'), ': ', bool('true'), ','], highlight: true },
  { content: [INDENT, key('tags'), ': [', str('json'), ', ', str('diff'), '],'] },
  { content: [INDENT, key('tools'), ': ', num('24'), ','] },
  { content: [INDENT, key('version'), ': ', str('0.1.0')] },
  { content: '}' },
]

/** Static illustration of the JSON Formatter — decorative, not interactive. */
export function ProductPreview(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.frame} role="img" aria-label="Preview of the bench JSON Formatter">
        <div className={styles.window} aria-hidden="true">
          <div className={styles.sidebar}>
            <span className={styles.search}>
              <Search size={13} />
              <span className={styles.grow}>Search</span>
              <span className={styles.mono10}>⌘K</span>
            </span>
            <div className={styles.navList}>
              {NAV.map((group, gi) => (
                <div key={group.label} className={styles.navGroup}>
                  <span
                    className={[styles.navLabel, gi > 0 && styles.navLabelSpaced]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {group.label}
                  </span>
                  {group.items.map(({ name, icon: Icon, active }) => (
                    <span
                      key={name}
                      className={[styles.navItem, active && styles.navActive]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <Icon size={14} />
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.toolbar}>
              <span className={styles.toolTitle}>JSON Formatter</span>
              <span className={styles.toggleRow}>
                <span className={styles.toggle}>
                  <span className={styles.knob} />
                </span>
                Sort keys
              </span>
              <span className={styles.formatBtn}>
                <WandSparkles size={14} />
                Format
              </span>
            </div>
            <div className={styles.panes}>
              <div className={styles.inputPane}>
                <div className={styles.paneHead}>Input</div>
                <div className={styles.inputCode}>{INPUT}</div>
              </div>
              <div className={styles.outputPane}>
                <div className={styles.paneHead}>
                  <span className={styles.grow}>Output</span>
                  <span className={styles.copy}>
                    <Copy size={13} />
                    Copy
                  </span>
                </div>
                <div className={styles.outputCode}>
                  <div className={styles.gutter}>
                    {OUTPUT.map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                  <div className={styles.lines}>
                    {OUTPUT.map((line, i) => (
                      <span key={i} className={line.highlight ? styles.highlight : undefined}>
                        {Children.toArray(line.content)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.status}>
              <span className={styles.valid}>
                <span className={styles.dot} />
                Valid JSON
              </span>
              <span className={styles.mono}>8 lines · 128 B</span>
              <span className={styles.local}>
                <Lock size={12} />
                Runs locally
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
