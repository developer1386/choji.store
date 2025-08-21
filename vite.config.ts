/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Vite Configuration for Choji Cat Food Store
 * 
 * Configures the development and production environment with:
 * - React Fast Refresh
 * - TypeScript path aliases
 * - Testing with Vitest and jsdom
 * - Build optimizations
 * - Development server settings
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
      ],
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude from optimization as it's tree-shakeable
  },
});
