/**
 * Vite Configuration for Choji Cat Food Store
 * 
 * Primary build and development configuration for the application.
 * Optimizes the development experience and production build process.
 * 
 * Build Features:
 * - React plugin for JSX/TSX compilation
 * - Dependency optimization settings
 * - Development server configuration
 * - Asset handling setup
 * 
 * Performance Optimizations:
 * - Excludes specific dependencies from optimization
 * - Enables fast refresh in development
 * - Optimizes chunk splitting
 * - Handles asset optimization
 * 
 * Development Features:
 * - Hot Module Replacement (HMR)
 * - Fast refresh for React components
 * - Source map generation
 * - Error overlay integration
 * 
 * @see https://vitejs.dev/config/
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
