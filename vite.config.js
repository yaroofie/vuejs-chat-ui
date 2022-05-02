import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@c': fileURLToPath( new URL( './src/Controllers/', import.meta.url ) ),
      '@m': fileURLToPath( new URL( './src/Models/', import.meta.url ) ),
      '@r': fileURLToPath( new URL( './src/Routes/', import.meta.url ) ),
      '@v': fileURLToPath( new URL( './src/Views/', import.meta.url ) ),
    }
  }
})
