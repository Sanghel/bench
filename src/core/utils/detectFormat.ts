import type { ToolId } from 'core/catalogues'

export type DetectedFormat = {
  /** Human label used after "Looks like…", e.g. "a JWT". */
  label: string
  toolId: ToolId
}

type Rule = [test: (s: string) => boolean, label: string, toolId: ToolId]

const isJsonObject = (s: string): boolean => {
  try {
    const v: unknown = JSON.parse(s)
    return v !== null && typeof v === 'object'
  } catch {
    return false
  }
}

/** Ordered: the first matching rule wins, plain text is the fallback. */
const RULES: Rule[] = [
  [(s): boolean => /^eyJ[\w-]*\.[\w-]+\.[\w-]*$/.test(s), 'a JWT', 'jwt'],
  [isJsonObject, 'JSON', 'json'],
  [(s): boolean => /^https?:\/\/\S+$/i.test(s), 'a URL', 'url'],
  [
    (s): boolean => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s),
    'a UUID',
    'uuid',
  ],
  [(s): boolean => /^(select|insert|update|delete|with|create)\b/i.test(s), 'SQL', 'sql'],
  [(s): boolean => /^<[\s\S]*>$/.test(s), 'XML', 'xml'],
  [
    (s): boolean => s.length >= 8 && s.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(s),
    'Base64',
    'b64',
  ],
]

const FALLBACK: DetectedFormat = { label: 'plain text', toolId: 'case' }

/** Returns null for empty input; otherwise the best tool for the pasted text. */
export function detectFormat(input: string): DetectedFormat | null {
  const s = input.trim()
  if (!s) return null
  const rule = RULES.find(([test]) => test(s))
  return rule ? { label: rule[1], toolId: rule[2] } : FALLBACK
}
