import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    allowedHosts: [
      "fe8f-197-146-70-206.ngrok-free.app",
    ],
  },
  
})
