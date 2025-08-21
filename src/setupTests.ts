/// <reference types="@testing-library/jest-dom" />
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserver;
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      supportsFiber: boolean;
      inject: () => void;
      onCommitFiberRoot: () => void;
      onCommitFiberUnmount: () => void;
    };
  }
}

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock new React 19 APIs if needed
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  };
}

// Configure error boundary behavior for tests
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    // Prevent default error handling in tests
    event.preventDefault();
  });

  // Enable strict mode for development
  if (process.env.NODE_ENV === 'development') {
    // React 19's new development-only features
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
      supportsFiber: true,
      inject: () => {},
      onCommitFiberRoot: () => {},
      onCommitFiberUnmount: () => {},
    };
  }
}
