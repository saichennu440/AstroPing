// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // load .env files
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      // expose to client
      'import.meta.env.VITE_API_BASE': JSON.stringify(env.VITE_API_BASE)
    },
  }
})
