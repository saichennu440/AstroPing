// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_BASE': JSON.stringify(env.VITE_API_BASE)
    },
    server: {
      port: 3001,           // ← front end will run on :3001
      proxy: {
        // proxy all /api calls to your Vercel Dev server on :3000
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
