/**
 * Entry point for the Choji Cat Food Store application
 * Sets up React 18 with TypeScript and Strict Mode
 * Mounts the application to the root DOM element
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
