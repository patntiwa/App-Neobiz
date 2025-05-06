import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { securityConfig } from './security.config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Charger les variables d'environnement basées sur `mode`
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      headers: {
        ...securityConfig.headers,
      },
    },
    worker: {
      format: 'es',
      plugins: [react()],
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-icons', '@radix-ui/react-slot'],
            'chart-vendor': ['recharts', '@nivo/core'],
            'form-vendor': ['react-hook-form', 'zod'],
          },
        },
      },
      target: 'esnext',
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      minify: 'esbuild',
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@radix-ui/react-icons',
        '@radix-ui/react-slot',
        'recharts',
        '@nivo/core',
        'react-hook-form',
        'zod'
      ],
    },
  };
});
