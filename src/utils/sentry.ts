// Sentry configuration for error monitoring
import * as Sentry from '@sentry/react';

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN || '', // Add your Sentry DSN to .env
    environment: process.env.NODE_ENV || 'development',
    integrations: [
      new Sentry.BrowserTracing({
        // Set tracing origins to connect sentry for performance monitoring
        tracePropagationTargets: ['localhost', /^https:\/\/choji\.store\/api/],
      }),
      new Sentry.Replay({
        // Capture 10% of all sessions,
        // plus 100% of sessions with an error
        sessionSampleRate: 0.1,
        errorSampleRate: 1.0,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Release Health
    autoSessionTracking: true,
    // Capture Console
    beforeSend(event) {
      // Filter out non-critical errors in production
      if (process.env.NODE_ENV === 'production') {
        if (event.exception) {
          const error = event.exception.values?.[0];
          if (error?.type === 'ChunkLoadError' || error?.type === 'ResizeObserver loop limit exceeded') {
            return null; // Don't send these common, non-critical errors
          }
        }
      }
      return event;
    },
  });
};

// Custom error boundary component
export const SentryErrorBoundary = Sentry.withErrorBoundary;

// Manual error reporting
export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional_info', context);
    }
    Sentry.captureException(error);
  });
};

// Performance monitoring
export const startTransaction = (name: string, operation: string) => {
  return Sentry.startTransaction({ name, op: operation });
};

// User context
export const setUserContext = (user: { id?: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// Add breadcrumb
export const addBreadcrumb = (message: string, category: string, level: 'info' | 'warning' | 'error' = 'info') => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
};
