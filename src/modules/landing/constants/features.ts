import { Command, Lock, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Feature = {
  title: string
  body: string
  icon: LucideIcon
}

export const FEATURES: Feature[] = [
  {
    title: 'Private by default',
    body: 'Everything runs on your device. Paste tokens, keys and customer data without a second thought.',
    icon: Lock,
  },
  {
    title: 'Keyboard-first',
    body: 'Jump to any tool with ⌘K, format with ⌘↵ and copy the output with ⇧⌘C.',
    icon: Command,
  },
  {
    title: 'Instant results',
    body: 'Output updates as you type. No buttons to hunt for and no loading spinners.',
    icon: Zap,
  },
]
