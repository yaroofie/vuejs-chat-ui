import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath( new URL( './src', import.meta.url ) ),
      '@atoms': fileURLToPath( new URL( './src/components/atoms/', import.meta.url ) ),
      '@molecules': fileURLToPath( new URL( './src/components/molecules/', import.meta.url ) ),
      '@organisms': fileURLToPath( new URL( './src/components/organisms/', import.meta.url ) ),
      '@templates': fileURLToPath( new URL( './src/components/templates/', import.meta.url ) ),
      '@pages': fileURLToPath( new URL( './src/components/pages/', import.meta.url ) ),
      '@stores': fileURLToPath( new URL( './src/stores/', import.meta.url ) ),
      '@mixins': fileURLToPath( new URL( './src/mixins/', import.meta.url ) ),
      '@middlewares': fileURLToPath( new URL( './src/routes/middlewares/', import.meta.url ) ),
    }
  }
})
