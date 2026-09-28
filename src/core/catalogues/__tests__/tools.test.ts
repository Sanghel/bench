import { getTool, isToolId, TOOL_CATEGORIES, TOOLS } from 'core/catalogues/tools'

describe('tools catalogue', () => {
  it('has 14 tools with unique ids', () => {
    expect(TOOLS).toHaveLength(14)
    expect(new Set(TOOLS.map((t) => t.id)).size).toBe(TOOLS.length)
  })

  it('puts every tool in a known category and every category has tools', () => {
    TOOLS.forEach((t) => expect(TOOL_CATEGORIES).toContain(t.category))
    TOOL_CATEGORIES.forEach((c) => expect(TOOLS.some((t) => t.category === c)).toBe(true))
  })

  it('marks only JSON Diff as new', () => {
    expect(TOOLS.filter((t) => t.isNew).map((t) => t.id)).toEqual(['jdiff'])
  })

  it('finds a tool by id', () => {
    expect(getTool('jwt').name).toBe('JWT Debugger')
  })

  it('throws for an unknown id', () => {
    expect(() => getTool('nope' as never)).toThrow('Unknown tool: nope')
  })

  it('validates tool ids', () => {
    expect(isToolId('json')).toBe(true)
    expect(isToolId('nope')).toBe(false)
    expect(isToolId(undefined)).toBe(false)
  })
})
