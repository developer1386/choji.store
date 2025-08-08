/**
 * ESLint Configuration for Choji Cat Food Store
 * 
 * This configuration file sets up comprehensive linting rules for the React
 * TypeScript application. It ensures code quality, consistency, and follows
 * React best practices while maintaining optimal development experience.
 * 
 * Configuration Features:
 * - TypeScript-aware linting with strict rules
 * - React Hooks rules for proper hook usage
 * - React Fast Refresh compatibility
 * - Modern JavaScript/TypeScript standards
 * - Browser globals and environment setup
 * 
 * Linting Rules:
 * - JavaScript recommended rules from @eslint/js
 * - TypeScript recommended rules from typescript-eslint
 * - React Hooks best practices
 * - React Fast Refresh component export validation
 * 
 * Development Benefits:
 * - Catches potential bugs during development
 * - Enforces consistent code style
 * - Prevents React anti-patterns
 * - Maintains TypeScript type safety
 * - Optimizes development workflow
 * 
 * @see {@link https://eslint.org/docs/latest/use/configure/ ESLint Configuration}
 * @see {@link https://typescript-eslint.io/getting-started TypeScript ESLint}
 * @see {@link https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks React Hooks ESLint}
 */

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignore build output directory
  { ignores: ['dist'] },
  
  // Main configuration for TypeScript and React files
  {
    // Extend recommended configurations
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    
    // Apply to TypeScript and TSX files
    files: ['**/*.{ts,tsx}'],
    
    // Language and environment settings
    languageOptions: {
      ecmaVersion: 2020,           // Modern JavaScript features
      globals: globals.browser,    // Browser environment globals
    },
    
    // ESLint plugins for React development
    plugins: {
      'react-hooks': reactHooks,     // React Hooks linting
      'react-refresh': reactRefresh, // Fast Refresh compatibility
    },
    
    // Linting rules configuration
    rules: {
      // Apply React Hooks recommended rules
      ...reactHooks.configs.recommended.rules,
      
      // React Fast Refresh component export validation
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow constant exports
      ],
    },
  }
);
