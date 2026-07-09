import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        mobileApp: resolve(__dirname, 'services/mobile-app.html'),
        webDev: resolve(__dirname, 'services/web-dev.html'),
        ecomStore: resolve(__dirname, 'services/ecom-store.html'),
        systems: resolve(__dirname, 'services/systems.html'),
        uiuxDesign: resolve(__dirname, 'services/uiux-design.html'),
        socialMedia: resolve(__dirname, 'services/social-media.html'),
        brandingDesign: resolve(__dirname, 'services/branding-design.html'),
        videoEditing: resolve(__dirname, 'services/video-editing.html'),
        postDesign: resolve(__dirname, 'services/post-design.html'),
        videoPresenting: resolve(__dirname, 'services/video-presenting.html'),
        seoOptimization: resolve(__dirname, 'services/seo-optimization.html'),
      }
    }
  }
})
