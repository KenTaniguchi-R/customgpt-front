import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/customgpt-front/', // uncomment this line to deploy to github pages
  plugins: [react()],
})
