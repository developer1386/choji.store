/**
 * Vite Configuration for Choji Cat Food Store
 * 
 * Configuration includes:
 * - React plugin setup for JSX/TSX support
 * - Optimization settings for dependencies
 * - Development server configuration
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
