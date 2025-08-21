/**
 * Sentry Error Monitoring and Performance Tracking
 * 
 * This module configures Sentry for comprehensive error monitoring, performance
 * tracking, and user session replay for the Choji Cat Food Store. It provides
 * real-time error reporting, performance insights, and debugging capabilities
 * to ensure optimal user experience and application reliability.
 * 
 * Key Features:
 * - Real-time error tracking and reporting
 * - Performance monitoring and tracing
 * - User session replay for debugging
 * - Release health monitoring
 * - Custom error context and breadcrumbs
 * - Environment-specific configuration
 * 
 * Monitoring Capabilities:
 * 1. Error Tracking:
 *    - JavaScript exceptions and errors
 *    - Unhandled promise rejections
 *    - Custom error reporting
 *    - Error grouping and deduplication
 * 
 * 2. Performance Monitoring:
 *    - Page load times and metrics
 *    - API request performance
 *    - User interaction timing
 *    - Core Web Vitals integration
 * 
 * 3. Session Replay:
 *    - Visual reproduction of user sessions
 *    - Error context and user actions
 *    - Privacy-compliant recording
 *    - Selective session sampling
 * 
 * Privacy and Compliance:
 * - Configurable data scrubbing
 * - PII protection mechanisms
 * - Consent-aware data collection
 * - GDPR compliance features
 * 
 * Environment Configuration:
 * - Development: Full error reporting and debugging
 * - Production: Optimized sampling and filtering
 * - Staging: Comprehensive monitoring for testing
 * 
 * @module Sentry
 * @version 1.0.0
 * @author Usama Ejaz
 * @since 2025-08-08
 * 
 * @see {@link https://docs.sentry.io/platforms/javascript/guides/react/ Sentry React Documentation}
 * @see {@link https://docs.sentry.io/product/performance/ Performance Monitoring}
 * @see {@link https://docs.sentry.io/product/session-replay/ Session Replay}
 */

/**
 * Sentry Error Monitoring and Performance Tracking
 * 
 * This module configures and initializes Sentry for error monitoring, crash reporting,
 * and performance tracking in the Choji Cat Food Store application. It provides comprehensive
 * error tracking, performance monitoring, and debugging capabilities.
 * 
 * Key Features:
 * 1. Error Monitoring:
 *    - Real-time error tracking
 *    - Stack trace analysis
 *    - Error grouping and prioritization
 *    - Custom error contexts
 * 
 * 2. Performance Monitoring:
 *    - Transaction tracking
 *    - Performance bottleneck detection
 *    - Resource load timing
 *    - Custom performance marks
 * 
 * 3. Release Tracking:
 *    - Source map integration
 *    - Release versioning
 *    - Deploy tracking
 *    - Code ownership
 * 
 * 4. User Context:
 *    - User identification
 *    - Session tracking
 *    - Custom user attributes
 *    - User feedback collection
 * 
 * 5. Environment Management:
 *    - Environment segregation
 *    - Configuration per environment
 *    - Sampling rates
 *    - Error filtering
 * 
 * @module sentry
 */

import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry Error Monitoring System
 * 
 * Configures and initializes Sentry with environment-specific settings
 * for error tracking, performance monitoring, and session replay.
 * This function should be called early in the application lifecycle
 * to ensure comprehensive error coverage.
 * 
 * Configuration Features:
 * - Environment-aware DSN configuration
 * - Performance monitoring with sampling
 * - Session replay with privacy controls
 * - Error filtering for production
 * - Breadcrumb collection for context
 * 
 * Integrations:
 * - BrowserTracing: Performance monitoring
 * - Replay: Session recording and replay
 * - Console: Console message capture
 * - GlobalHandlers: Unhandled errors
 * 
 * Sampling Strategy:
 * - Development: 100% error and performance tracking
 * - Production: 10% performance sampling for efficiency
 * - Session Replay: 10% normal sessions, 100% error sessions
 * 
 * @example
 * // Initialize Sentry on application startup
 * initSentry();
 * 
 * // Typically called in main.tsx or App.tsx
 * import { initSentry } from './utils/sentry';
 * initSentry();
 * 
 * @see {@link https://docs.sentry.io/platforms/javascript/configuration/ Configuration Options}
 */
export const initSentry = () => {
  Sentry.init({
    dsn: 'https://6c0941cad5e70e813b4913cebac4c8fc@o4509810371788800.ingest.us.sentry.io/4509820215230464',
    environment: import.meta.env.MODE || 'development',

    // ✅ Put it here (top-level), not inside browserTracingIntegration
    tracePropagationTargets: ['localhost', /^https:\/\/choji\.store\/api/],

    // ✅ Replay sampling is top-level in v8+
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // optional privacy options here, e.g. maskAllText: true
      }),
    ],

    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,

    // ❌ remove in v9+: autoSessionTracking
    // autoSessionTracking: true,

    beforeSend(event) {
      if (import.meta.env.PROD) {
        const err = event.exception?.values?.[0];
        if (err?.type === 'ChunkLoadError' || err?.type === 'ResizeObserver loop limit exceeded') {
          return null;
        }
      }
      return event;
    },
    debug: true,
  });

  console.log('Sentry DSN:', import.meta.env.VITE_SENTRY_DSN);
  console.log('Sentry client initialized?', !!Sentry.getClient());
};

/**
 * Sentry Error Boundary Component
 * 
 * Higher-order component that wraps React components with Sentry's
 * error boundary functionality. This provides automatic error capture
 * for React component errors and renders fallback UI when errors occur.
 * 
 * Features:
 * - Automatic error capture and reporting
 * - Customizable fallback UI
 * - Error context preservation
 * - Component stack traces
 * - User session information
 * 
 * @example
 * // Wrap a component with error boundary
 * const SafeComponent = SentryErrorBoundary(MyComponent, {
 *   fallback: ({ error, resetError }) => (
 *     <div>
 *       <h2>Something went wrong</h2>
 *       <button onClick={resetError}>Try again</button>
 *     </div>
 *   )
 * });
 * 
 * // Use as HOC
 * export default SentryErrorBoundary(App);
 * 
 * @see {@link https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/ Error Boundary Documentation}
 */
export const SentryErrorBoundary = Sentry.withErrorBoundary;

/**
 * Manual Error Capture and Reporting
 * 
 * Manually captures and reports errors to Sentry with optional
 * contextual information. This function is useful for handling
 * caught exceptions and providing additional debugging context.
 * 
 * Context Information:
 * - Custom tags and metadata
 * - User interaction context
 * - Application state information
 * - Business logic context
 * 
 * Use Cases:
 * - Caught exceptions in try-catch blocks
 * - Business logic errors
 * - Integration failures
 * - Custom error scenarios
 * 
 * @param {Error} error - JavaScript Error object to capture
 * @param {Record<string, string | number | boolean>} [context] - Additional context information
 * 
 * @example
 * // Basic error capture
 * try {
 *   riskyOperation();
 * } catch (error) {
 *   captureError(error);
 * }
 * 
 * // Error with context
 * captureError(new Error('Payment failed'), {
 *   user_id: '12345',
 *   order_amount: 99.99,
 *   payment_method: 'credit_card'
 * });
 * 
 * // API integration error
 * captureError(apiError, {
 *   endpoint: '/api/orders',
 *   method: 'POST',
 *   status_code: 500
 * });
 */
export const captureError = (error: Error, context?: Record<string, string | number | boolean>) => {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional_info', context);
    }
    Sentry.captureException(error);
  });
};

/**
 * Start Performance Transaction
 * 
 * Creates a new Sentry performance transaction for monitoring
 * specific operations or user interactions. This helps track
 * performance bottlenecks and optimize user experience.
 * 
 * Transaction Types:
 * - Navigation: Page loads and route changes
 * - User Interaction: Button clicks, form submissions
 * - API Calls: External service requests
 * - Background Tasks: Data processing, calculations
 * 
 * Performance Metrics:
 * - Transaction duration
 * - Child span timing
 * - Resource usage
 * - User experience impact
 * 
 * @param {string} name - Descriptive name for the transaction
 * @param {string} operation - Operation type (navigation, interaction, etc.)
 * @returns {Transaction} Sentry transaction object
 * 
 * @example
 * // Track page navigation
 * const transaction = startTransaction('Home Page Load', 'navigation');
 * // ... page loading logic
 * transaction.finish();
 * 
 * // Track form submission
 * const submitTransaction = startTransaction('Order Form Submit', 'interaction');
 * // ... form processing
 * submitTransaction.finish();
 * 
 * // Track API call
 * const apiTransaction = startTransaction('Fetch Products', 'http.client');
 * // ... API request
 * apiTransaction.finish();
 */
export const startTransaction = (name: string, operation: string) => {
  // Creates a root span if none exists and lets you end it manually.
  const span = Sentry.startSpanManual(
    { name, op: operation, forceTransaction: true },
    // The callback receives the span; we just return it so callers can keep a handle.
    (s) => s
  );

  // Backwards-compatible "finish" method (was tx.finish() before)
  // so you don't have to touch existing call sites.
  return Object.assign(span, {
    finish: () => span.end(),
  });
};

/**
 * Set User Context for Error Tracking
 * 
 * Associates user information with error reports and performance
 * data to provide better debugging context and user impact analysis.
 * This information helps prioritize fixes based on affected users.
 * 
 * User Information:
 * - User identification (ID, email, username)
 * - Session information
 * - User preferences and settings
 * - Subscription or account status
 * 
 * Privacy Considerations:
 * - Only collect necessary identification
 * - Respect user privacy preferences
 * - Comply with data protection regulations
 * - Provide opt-out mechanisms
 * 
 * @param {Object} user - User information object
 * @param {string} [user.id] - Unique user identifier
 * @param {string} [user.email] - User email address
 * @param {string} [user.username] - User display name
 * 
 * @example
 * // Set user context after login
 * setUserContext({
 *   id: 'user_12345',
 *   email: 'customer@example.com',
 *   username: 'cat_lover_2024'
 * });
 * 
 * // Anonymous user tracking
 * setUserContext({
 *   id: 'anonymous_' + sessionId
 * });
 * 
 * // Clear user context on logout
 * setUserContext({});
 */
export const setUserContext = (user: { id?: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

/**
 * Add Debugging Breadcrumb
 * 
 * Records a breadcrumb trail of user actions and application events
 * that provide context for error reports. Breadcrumbs help understand
 * the sequence of events leading to an error or performance issue.
 * 
 * Breadcrumb Categories:
 * - Navigation: Page changes, route transitions
 * - User Interaction: Clicks, form inputs, gestures
 * - Network: API calls, resource loading
 * - State Changes: Data updates, configuration changes
 * 
 * Severity Levels:
 * - info: General information and normal operations
 * - warning: Potential issues or unusual conditions
 * - error: Error conditions and failures
 * 
 * @param {string} message - Descriptive message for the breadcrumb
 * @param {string} category - Category of the event (ui, navigation, http, etc.)
 * @param {'info' | 'warning' | 'error'} [level='info'] - Severity level
 * 
 * @example
 * // User interaction breadcrumb
 * addBreadcrumb('User clicked order button', 'ui.click', 'info');
 * 
 * // Navigation breadcrumb
 * addBreadcrumb('Navigated to product page', 'navigation', 'info');
 * 
 * // API call breadcrumb
 * addBreadcrumb('Failed to load user data', 'http.request', 'error');
 * 
 * // State change breadcrumb
 * addBreadcrumb('Shopping cart updated', 'state.change', 'info');
 */
export const addBreadcrumb = (message: string, category: string, level: 'info' | 'warning' | 'error' = 'info') => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
};
