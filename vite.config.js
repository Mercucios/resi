import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

// Die App läuft unter https://mercucios.github.io/resi/
// GitHub Pages veröffentlicht den Ordner /docs.
export default defineConfig({
  base: '/resi/',
  build: { outDir: 'docs', emptyOutDir: true },
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Resi',
        short_name: 'Resi',
        description: 'Für den Moment danach. Anonyme Begleit-App für Pflegekräfte.',
        lang: 'de-AT',
        start_url: '/resi/',
        scope: '/resi/',
        display: 'standalone',
        background_color: '#F3F5F4',
        theme_color: '#1E6A60',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,mp3,woff2}']
      }
    })
  ]
});
