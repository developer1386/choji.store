/**
 * Entry point for the Choji Cat Food Store application
 * 
 * This file initializes the React 18 application with TypeScript and Strict Mode.
 * It serves as the primary bootstrap point for the entire application.
 * 
 * Key Responsibilities:
 * - Sets up React 18 with TypeScript support
 * - Enables Strict Mode for development safety
 * - Imports global styles and Tailwind utilities
 * - Mounts the application to the root DOM element
 * 
 * Technical Details:
 * - Uses React 18's createRoot API
 * - Implements TypeScript for type safety
 * - Leverages Strict Mode for:
 *   · Double-rendering checks
 *   · Deprecated lifecycle detection
 *   · Side effect verification
 * 
 * Performance Considerations:
 * - Minimal entry point size
 * - Efficient style importing
 * - Optimal mounting strategy
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';  // Global styles and Tailwind imports

// Initialize React 18 app with Strict Mode for additional development checks
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}
