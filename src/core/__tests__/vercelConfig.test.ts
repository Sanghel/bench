import vercelConfig from 'vercel.json'

type HeaderRule = (typeof vercelConfig.headers)[number]

const headersFor = (source: string): HeaderRule['headers'] => {
  const rule = vercelConfig.headers.find((h) => h.source === source)
  if (!rule) throw new Error(`No header rule for ${source}`)
  return rule.headers
}

const headerValue = (source: string, key: string): string | undefined =>
  headersFor(source).find((h) => h.key === key)?.value

const matches = (source: string, path: string): boolean => new RegExp(`^${source}$`).test(path)

describe('vercel.json (BENCH-PLAT-002)', () => {
  it('builds the Vite app with pnpm into dist (AC-1)', () => {
    expect(vercelConfig).toMatchObject({
      framework: 'vite',
      installCommand: 'pnpm install --frozen-lockfile',
      buildCommand: 'pnpm build',
      outputDirectory: 'dist',
    })
  })

  it('deploys only the main branch (AC-2)', () => {
    expect(vercelConfig.git.deploymentEnabled).toEqual({ '**': false, main: true })
  })

  it.each(['/', '/tools', '/tools/json', '/nope/deep'])(
    'rewrites %s to index.html so the router resolves it (AC-5)',
    (path) => {
      const rewrite = vercelConfig.rewrites.find((r) => matches(r.source, path))
      expect(rewrite?.destination).toBe('/index.html')
    },
  )

  it('caches hashed assets for good and leaves other paths revalidated (AC-6)', () => {
    expect(headerValue('/assets/(.*)', 'Cache-Control')).toBe('public, max-age=31536000, immutable')
    expect(headerValue('/(.*)', 'Cache-Control')).toBeUndefined()
  })

  it('sends the security headers on every path (AC-7)', () => {
    expect(headerValue('/(.*)', 'X-Content-Type-Options')).toBe('nosniff')
    expect(headerValue('/(.*)', 'Referrer-Policy')).toBe('strict-origin-when-cross-origin')
    expect(headerValue('/(.*)', 'Permissions-Policy')).toBe(
      'camera=(), microphone=(), geolocation=()',
    )
  })

  it('keeps every request on its own origin except Google Fonts (AC-7)', () => {
    const csp = headerValue('/(.*)', 'Content-Security-Policy') ?? ''
    const directives = Object.fromEntries(
      csp.split(';').map((d) => {
        const [name, ...values] = d.trim().split(/\s+/)
        return [name, values.join(' ')]
      }),
    )
    expect(directives).toMatchObject({
      'default-src': "'self'",
      'script-src': "'self'",
      'style-src': "'self' https://fonts.googleapis.com",
      'font-src': 'https://fonts.gstatic.com',
      'connect-src': "'self'",
      'frame-ancestors': "'none'",
    })
  })
})
