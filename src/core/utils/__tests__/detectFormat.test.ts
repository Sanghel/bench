import { detectFormat } from 'core/utils/detectFormat'

describe('detectFormat', () => {
  it('returns null for empty or whitespace-only input', () => {
    expect(detectFormat('')).toBeNull()
    expect(detectFormat('   \n ')).toBeNull()
  })

  it.each([
    ['eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig', 'a JWT', 'jwt'],
    ['{"a":1}', 'JSON', 'json'],
    ['[1, 2, 3]', 'JSON', 'json'],
    ['https://bench.dev/tools?q=1', 'a URL', 'url'],
    ['3f2504e0-4f89-11d3-9a0c-0305e82c3301', 'a UUID', 'uuid'],
    ['SELECT id FROM tools', 'SQL', 'sql'],
    ['<root><a/></root>', 'XML', 'xml'],
    ['aGVsbG8gZnJvbSBiZW5jaA==', 'Base64', 'b64'],
    ['user profile settings', 'plain text', 'case'],
  ])('detects %s as %s', (input, label, toolId) => {
    expect(detectFormat(input)).toEqual({ label, toolId })
  })

  it('trims surrounding whitespace before detecting', () => {
    expect(detectFormat('  {"a":1}\n')?.toolId).toBe('json')
  })

  it('does not treat JSON primitives as JSON', () => {
    expect(detectFormat('42')?.toolId).toBe('case')
    expect(detectFormat('null')?.toolId).toBe('case')
  })

  it('does not treat short base64-looking words as Base64', () => {
    expect(detectFormat('abcd')?.toolId).toBe('case')
  })
})
