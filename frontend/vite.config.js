import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",   // ✅ VERY IMPORTANT
    port: 5173,        // (optional but good)
    proxy: {
      '/api': 'http://backend-cont:5000',     // ✅ use container name
      '/uploads': 'http://backend-cont:5000'
    }
  }
})
