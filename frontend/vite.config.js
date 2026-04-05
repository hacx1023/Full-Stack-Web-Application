import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-768992935856.us-central1.run.app',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://backend-768992935856.us-central1.run.app',
        changeOrigin: true
      }
    }
  }
})
