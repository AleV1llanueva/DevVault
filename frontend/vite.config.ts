
// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      overlay: false, // opcional: silencia el overlay si vuelve el error transitorio
    },
  },
  optimizeDeps: {
    // Fuerza el bundle de deps sospechosas en un solo paso, no incremental
    force: true,
  },
});
