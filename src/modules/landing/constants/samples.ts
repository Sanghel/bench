export type PasteSample = {
  label: string
  value: string
}

export const PASTE_SAMPLES: PasteSample[] = [
  { label: 'JSON', value: '{"name":"bench","tools":14,"private":true}' },
  {
    label: 'JWT',
    value:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJCZW5jaCJ9.dBjftJeZ4CVPmB92K27uhbUJU1p1r_wW1gFWFOEjXk',
  },
  { label: 'Base64', value: 'aGVsbG8gZnJvbSBiZW5jaA==' },
  { label: 'SQL', value: "select id, name from tools where category = 'format' order by name" },
]
