import {
  ArrowLeftRight,
  Binary,
  Braces,
  CodeXml,
  Database,
  FileJson,
  Fingerprint,
  GitCompare,
  GitCompareArrows,
  Hash,
  KeyRound,
  Link,
  Regex,
  Type,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ToolCategory = 'Format' | 'Convert' | 'Compare' | 'Inspect' | 'Generate'

export type ToolId =
  | 'json'
  | 'sql'
  | 'xml'
  | 'ts'
  | 'yaml'
  | 'b64'
  | 'url'
  | 'case'
  | 'diff'
  | 'jdiff'
  | 'jwt'
  | 'regex'
  | 'uuid'
  | 'hash'

export type Tool = {
  id: ToolId
  name: string
  desc: string
  category: ToolCategory
  icon: LucideIcon
  isNew?: boolean
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  'Format',
  'Convert',
  'Compare',
  'Inspect',
  'Generate',
]

/** Single catalogue shared by the landing page and (phase 2) the dashboard. */
export const TOOLS: Tool[] = [
  {
    id: 'json',
    name: 'JSON Formatter',
    desc: 'Beautify, validate and minify JSON.',
    category: 'Format',
    icon: Braces,
  },
  {
    id: 'sql',
    name: 'SQL Formatter',
    desc: 'Readable queries for any dialect.',
    category: 'Format',
    icon: Database,
  },
  {
    id: 'xml',
    name: 'XML Formatter',
    desc: 'Indent and validate XML.',
    category: 'Format',
    icon: CodeXml,
  },
  {
    id: 'ts',
    name: 'JSON → TypeScript',
    desc: 'Generate interfaces from a sample.',
    category: 'Convert',
    icon: FileJson,
  },
  {
    id: 'yaml',
    name: 'YAML ↔ JSON',
    desc: 'Convert config files both ways.',
    category: 'Convert',
    icon: ArrowLeftRight,
  },
  {
    id: 'b64',
    name: 'Base64',
    desc: 'Encode and decode text or files.',
    category: 'Convert',
    icon: Binary,
  },
  {
    id: 'url',
    name: 'URL Encode',
    desc: 'Escape and unescape query strings.',
    category: 'Convert',
    icon: Link,
  },
  {
    id: 'case',
    name: 'Case Converter',
    desc: 'camelCase, snake_case, kebab-case…',
    category: 'Convert',
    icon: Type,
  },
  {
    id: 'diff',
    name: 'Text Diff',
    desc: 'Compare two texts line by line.',
    category: 'Compare',
    icon: GitCompare,
  },
  {
    id: 'jdiff',
    name: 'JSON Diff',
    desc: 'Semantic diff that ignores key order.',
    category: 'Compare',
    icon: GitCompareArrows,
    isNew: true,
  },
  {
    id: 'jwt',
    name: 'JWT Debugger',
    desc: 'Decode and inspect tokens.',
    category: 'Inspect',
    icon: KeyRound,
  },
  {
    id: 'regex',
    name: 'Regex Tester',
    desc: 'Live matches with group highlights.',
    category: 'Inspect',
    icon: Regex,
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    desc: 'v4 and v7, one or a thousand.',
    category: 'Generate',
    icon: Fingerprint,
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    desc: 'MD5, SHA-1, SHA-256 and more.',
    category: 'Generate',
    icon: Hash,
  },
]

export function getTool(id: ToolId): Tool {
  const tool = TOOLS.find((t) => t.id === id)
  if (!tool) throw new Error(`Unknown tool: ${id}`)
  return tool
}

export function isToolId(value: string | undefined): value is ToolId {
  return TOOLS.some((t) => t.id === value)
}
