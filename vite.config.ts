import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
  resolve: {
    alias: {
      '@/app': '/src/app',
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/features': '/src/features',
      '@/hooks': '/src/hooks',
      '@/pages': '/src/pages',
      '@/routes': '/src/routes',
      '@/themes': '/src/themes',
      '@/styles': '/src/styles',
      '@/utils': '/src/utils',
      '@/services': '/src/services',
      '@/config': '/src/config',
      '@/types': '/src/types',
      '@/store': '/src/store',
      '@/layout': '/src/layout',
      '@/data': '/src/data',
      '@/i18n': '/src/i18n',
      '@/helpers': '/src/helpers',
      '@/providers': '/src/providers',
      '@/configs': '/src/configs',
      '@/abilities': '/src/abilities',
      '@/roles': '/src/roles',
      '@/contexts': '/src/contexts',
      '@abilities': '/src/abilities',
    },
  },
});
