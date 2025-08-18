import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/auth': {
        target: 'http://localhost:18082/api/auth',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      },
      '/menu': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/menu/, '')
      },
      '/order': {
        target: 'http://localhost:8081/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/order/, '')
      }
    }
  }
});


