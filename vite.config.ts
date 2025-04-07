import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    cors: true,
    allowedHosts: ['ringtail-alive-intensely.ngrok-free.app']// 配置允许跨域的域名
  }
})
