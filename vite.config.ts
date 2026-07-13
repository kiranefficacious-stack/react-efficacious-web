import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        tailwindcss(),
        {
          name: 'multi-spa-fallback',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              if (req.url && !req.url.includes('.')) {
                if (req.url.startsWith('/products/esmart-restaurant')) {
                  req.url = '/products/esmart-restaurant/index.html';
                } else if (req.url.startsWith('/products/emart-queue')) {
                  req.url = '/products/emart-queue/index.html';
                }
              }
              next();
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
        dedupe: ['react', 'react-dom']
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            esmart: path.resolve(__dirname, 'products/esmart-school/index.html'),
            restaurant: path.resolve(__dirname, 'products/esmart-restaurant/index.html'),
            queue: path.resolve(__dirname, 'products/emart-queue/index.html'),
          }
        }
      }
    };
});
