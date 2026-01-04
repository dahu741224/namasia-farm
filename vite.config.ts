import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base 使用 './' 確保在 GitHub Pages 的二級路徑下也能正確載入資源
  base: './', 
  build: {
    outDir: 'dist',
  },
  define: {
    // 這裡非常重要：它會將程式碼中的 process.env.API_KEY 替換為實際的字串值
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
