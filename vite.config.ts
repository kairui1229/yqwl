import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression({
      verbose: true,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),
    viteImagemin({
      // 配置图片压缩选项
      gifsicle: {
        optimizationLevel: 3, // 0 - 3 之间，值越高压缩效果越强
        interlaced: false, // 是否优化gif动画
      },
      mozjpeg: {
        quality: 75, // 0 - 100，数值越小压缩越强，质量越低
      },
      pngquant: {
        quality: [0.6, 0.8], // 数组中两项分别为最小和最大质量
        speed: 4, // 1 - 10，值越高速度越快，但压缩效果会差一些
      },
      svgo: {
        plugins: [
          { removeViewBox: false }, // 保留 viewBox，避免破坏 SVG 的缩放功能
          { cleanupIDs: false }, // 保留 ID，避免被删除
        ]
      },
      webp: {
        quality: 50, // WebP 图像压缩质量
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    cors: true,
    allowedHosts: ['ringtail-alive-intensely.ngrok-free.app']// 配置允许跨域的域名
  },
   build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('echarts')) return 'echarts';
          if (id.includes('element-plus')) return 'element-plus';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
      terserOptions: {
      compress: {
        drop_console: true, // 去除 console.log
        drop_debugger: true, // 去除 debugger
      }
    }
  },
})
