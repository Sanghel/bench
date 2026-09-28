import { useMemo, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTool } from 'core/catalogues'
import type { Tool } from 'core/catalogues'
import { detectFormat } from 'core/utils'
import type { DetectedFormat } from 'core/utils'
import { TOOLS_HOME, toolPath } from 'core/router/routes.config'
import type { ToolsLocationState } from 'core/router/routes.config'

type UsePasteDetectReturn = {
  input: string
  detected: DetectedFormat | null
  detectedTool: Tool | null
  ctaLabel: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void
  applySample: (value: string) => void
  submit: () => void
}

export function usePasteDetect(): UsePasteDetectReturn {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const detected = useMemo((): DetectedFormat | null => detectFormat(input), [input])
  const detectedTool = detected ? getTool(detected.toolId) : null

  const submit = (): void => {
    if (!detected) {
      void navigate(TOOLS_HOME)
      return
    }
    const state: ToolsLocationState = { input: input.trim() }
    void navigate(toolPath(detected.toolId), { state })
  }

  return {
    input,
    detected,
    detectedTool,
    ctaLabel: detectedTool ? `Open ${detectedTool.name}` : 'Browse all tools',
    onChange: (e): void => setInput(e.target.value),
    onKeyDown: (e): void => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        submit()
      }
    },
    applySample: (value): void => setInput(value),
    submit,
  }
}
