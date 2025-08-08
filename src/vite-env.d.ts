/**
 * Vite Environment Type Definitions
 * 
 * This file provides TypeScript type definitions for Vite-specific
 * environment variables and client-side APIs. It ensures proper
 * type checking and IntelliSense support for Vite features.
 * 
 * Vite Client Types:
 * - import.meta.env: Environment variables
 * - import.meta.hot: Hot Module Replacement API
 * - import.meta.glob: Dynamic imports
 * - Vite-specific module resolution
 * 
 * Environment Variables:
 * - VITE_*: Public environment variables
 * - DEV: Development mode flag
 * - PROD: Production mode flag
 * - MODE: Current build mode
 * 
 * @see {@link https://vitejs.dev/guide/env-and-mode.html Vite Environment Variables}
 * @see {@link https://vitejs.dev/guide/api-hmr.html Vite HMR API}
 */

/// <reference types="vite/client" />
