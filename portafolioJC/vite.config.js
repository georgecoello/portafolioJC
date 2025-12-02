import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // Ocultar algunos mensajes del servidor
    hmr: {
      overlay: false
    }
  }
})