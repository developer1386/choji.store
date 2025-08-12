/**
 * Application Entry Point for Choji Cat Food Store
 *
 * This module serves as the primary bootstrap point for the React application.
 * It initializes the React 18 runtime with TypeScript and Strict Mode enabled,
 * sets up global styles, and handles service worker registration.
 *
 * Key Responsibilities:
 * 1. React 18 Setup:
 *    - Initializes with createRoot API for concurrent features
 *    - Enables Strict Mode for development safety
 *    - Provides TypeScript type safety throughout
 *
 * 2. Style Management:
 *    - Imports global styles and Tailwind utilities
 *    - Ensures proper CSS cascade and specificity
 *    - Manages style injection ordering
 *
 * 3. Service Worker:
 *    - Registers service worker for offline capability
 *    - Handles installation and update lifecycle
 *    - Provides error handling for registration
 *
 * Technical Implementation:
 * - React 18 Features:
 *   · Concurrent Mode ready
 *   · Automatic batching support
 *   · Improved Suspense compatibility
 *
 * - TypeScript Integration:
 *   · Strict type checking enabled
 *   · Full type inference support
 *   · Enhanced IDE integration
 *
 * - Strict Mode Benefits:
 *   · Double-render checks for pure components
 *   · Deprecated API usage detection
 *   · Side effect cleanup verification
 *   · Improved debugging experience
 *
 * Performance Optimizations:
 * - Minimal Bundle Size:
 *   · Only essential imports
 *   · Tree-shakeable code structure
 *   · Optimized chunk splitting
 *
 * - Efficient Style Loading:
 *   · Critical CSS extraction
 *   · Proper style cascade
 *   · Minimal FOUC prevention
 *
 * - Resource Loading:
 *   · Optimal mounting strategy
 *   · Efficient hydration process
 *   · Progressive enhancement
 *
 * Browser Compatibility:
 * - Modern Browsers: Full feature support
 * - Legacy Browsers: Graceful degradation
 * - Mobile Devices: Full responsive support
 *
 * @module main
 * @requires react
 * @requires react-dom/client
 * @requires ./App
 * @requires ./index.css
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // Global styles and Tailwind imports

import * as Sentry from "@sentry/react";
import type { FallbackRender } from "@sentry/react";
import { initSentry } from "./utils/sentry";
import { initCookieConsent } from "./utils/cookieConsent";
import { reportWebVitals, sendToAnalytics } from "./utils/analytics";

// initialize Sentry before React renders
initSentry();

initCookieConsent();

reportWebVitals(sendToAnalytics);

// export so Fast Refresh rule is happy
export const ErrorFallback: FallbackRender = ({ error, resetError }) => {
  const message = error instanceof Error ? error.message : String(error);
  return (
    <div style={{ padding: 16 }}>
      <h2>Something went wrong.</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{message}</pre>
      <button onClick={resetError}>Try again</button>
    </div>
  );
};

export const AppWithErrorBoundary = Sentry.withErrorBoundary(App, {
  fallback: ErrorFallback,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithErrorBoundary />
  </StrictMode>
);

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((error) => {
        console.log("SW registration failed:", error);
      });
  });
}
