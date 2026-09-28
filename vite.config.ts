import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      core: '/src/core',
      modules: '/src/modules',
      assets: '/src/assets',
      // Test-only helpers (setup, doubles). Aliased so specs can reach them
      // without the deep relative imports `rules/linting-and-types.md` bans.
      test: '/src/test',
    },
  },
})
