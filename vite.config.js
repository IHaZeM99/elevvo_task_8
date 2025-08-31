import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/elevvo_task_8/';
  
  return {
    base,
    plugins: [react(), tailwindcss()],
  };
})
