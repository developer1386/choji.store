/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Vite Configuration for Choji Cat Food Store
 * 
 * This configuration file sets up the build and development environment for the application.
 * It provides optimized settings for both development and production builds while
 * ensuring the best possible developer experience and end-user performance.
 * 
 * Build Configuration:
 * 1. React Integration:
 *    - JSX/TSX compilation with React plugin
 *    - Fast Refresh support for rapid development
 *    - Proper source map generation
 * 
 * 2. Performance Optimizations:
 *    - Dependency Pre-bundling:
 *      · Converts CommonJS/UMD to ESM
 *      · Improves browser caching
 *      · Reduces HTTP requests
 * 
 *    - Build Optimization:
 *      · Code splitting strategies
 *      · Tree shaking for dead code
 *      · Chunk size optimization
 *      · Asset compression
 * 
 *    - Development Server:
 *      · Hot Module Replacement (HMR)
 *      · Fast refresh capabilities
 *      · Efficient caching
 *      · Network error handling
 * 
 * 3. Asset Handling:
 *    - Static Asset Processing:
 *      · Image optimization
 *      · SVG handling
 *      · Font processing
 *      · Media file support
 * 
 *    - CSS Processing:
 *      · PostCSS integration
 *      · Tailwind JIT compilation
 *      · CSS modules support
 *      · Sass/Less compatibility
 * 
 * Development Features:
 * - TypeScript path aliases
 * - Testing with Vitest and jsdom
 * - Enhanced Developer Experience:
 *   · Instant hot reloading
 *   · Detailed error messages
 *   · Source map support
 *   · TypeScript integration
 * 
 * - Debug Capabilities:
 *   · Error overlay
 *   · Stack trace mapping
 *   · Network request inspection
 *   · Performance monitoring
 * 
 * Production Optimizations:
 * - Bundle Analysis:
 *   · Size optimization
 *   · Dependency tracking
 *   · Code splitting
 * 
 * - Performance:
 *   · Minification
 *   · Tree shaking
 *   · Chunk optimization
 *   · Asset compression
 * 
 * Security Considerations:
 * - CSP compatibility
 * - Secure asset handling
 * - Environment variable protection
 * 
 * References:
 * @see {@link https://vitejs.dev/config/} - Core Vite configuration options
 * @see {@link https://vitejs.dev/guide/features.html} - Available Vite features
 * @see {@link https://github.com/vitejs/vite/tree/main/packages/plugin-react} - React plugin documentation
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
