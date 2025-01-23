import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build:{
    outDir: 'dist-react',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'leaflet', 'react-leaflet'],
  }
  // server: {
  //   port: 199,
  //   strictPort: true,
  // },
})
