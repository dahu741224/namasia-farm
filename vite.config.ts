import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', 
  build: {
    outDir: 'dist',
  },
  define: {
    // 確保即使沒設定 API_KEY 也不會造成語法錯誤
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || "")
  }
});
