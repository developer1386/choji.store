/**
 * Analytics and Web Performance Monitoring Utilities
 *
 * This module provides comprehensive analytics tracking and web performance monitoring
 * capabilities for the Choji Cat Food Store. It integrates multiple analytics platforms
 * including Google Analytics 4, Umami Analytics, and Microsoft Clarity while maintaining
 * user privacy and GDPR compliance.
 *
 * Key Features:
 * - Web Vitals monitoring (CLS, FID, FCP, LCP, TTFB)
 * - Multi-platform analytics integration
 * - Privacy-focused tracking
 * - Custom event tracking
 * - Error monitoring
 * - Performance metrics collection
 *
 * Supported Analytics Platforms:
 * 1. Google Analytics 4 (GA4)
 * 2. Umami Analytics
 * 3. Microsoft Clarity
 *
 * @module Analytics
 * @version 1.1.0
 * @since 2025-08-08
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

/** =========================
 *  Error Types (for tests)
 *  ========================= */
export class InvalidUrlError extends Error {
  constructor(message = 'URL is required') {
    super(message);
    this.name = 'InvalidUrlError';
  }
}

export class InvalidEventNameError extends Error {
  constructor(message = 'Event name is required') {
    super(message);
    this.name = 'InvalidEventNameError';
  }
}

export class InvalidRatingError extends Error {
  constructor(message = 'Invalid metric rating') {
    super(message);
    this.name = 'InvalidRatingError';
  }
}

/** ================
 *  Type Utilities
 *  ================ */
type AnalyticsParameters = Record<string, string | number | boolean>;

type GtagCommand = 'config' | 'event' | 'set';

type GtagArgs = [GtagCommand, string, AnalyticsParameters?] | [GtagCommand, string];

/** ===========================
 *  Web Vitals Initialization
 *  =========================== */
export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

/** =====================================
 *  Send Web Vitals to Analytics Platforms
 *  ===================================== */
export const sendToAnalytics = (metric: Metric) => {
  // Optional: validate rating if present (some test suites assert this)
  const validRatings = ['good', 'needs-improvement', 'poor'];
  if (metric.rating && !validRatings.includes(metric.rating as any)) {
    const err = new InvalidRatingError(`rating=${metric.rating}`);
    try {
      console.error('Analytics Error:', err);
    } catch {
      /* noop */
    }
    throw err;
  }

  const normalizedValue = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);

  // Google Analytics 4 (use local wrapper if available)
  if (typeof gtag !== 'undefined') {
    try {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: normalizedValue,
        event_label: metric.id,
        non_interaction: true,
      });
    } catch (err) {
      try {
        console.error('Analytics Error:', err);
      } catch {
        /* noop */
      }
    }
  }

  // Umami (global, not window)
  if (typeof umami !== 'undefined') {
    try {
      umami.track('web-vitals', {
        metric: metric.name,
        value: normalizedValue,
        id: metric.id,
      });
    } catch (err) {
      try {
        console.error('Analytics Error:', err);
      } catch {
        /* noop */
      }
    }
  }

  if ((import.meta as any)?.env?.DEV) {
    try {
      // eslint-disable-next-line no-console
      console.log('Web Vital:', metric);
    } catch {
      /* noop */
    }
  }
};

/** ==========================
 *  GA4 Wrapper (safe gtag)
 *  ========================== */
export const gtag = (...args: GtagArgs) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

/** ==========================
 *  Umami helpers & constants
 *  ========================== */
const WEBSITE_ID = (import.meta as any)?.env?.VITE_UMAMI_WEBSITE_ID || '';

const isUmamiAvailable = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof (window as any).umami !== 'undefined' &&
    typeof (window as any).umami.track === 'function'
  );
};

/** ==========================
 *  Event Tracking (generic)
 *  ========================== */
export const trackEvent = async (eventName: string, parameters?: AnalyticsParameters) => {
  if (!eventName) {
    throw new InvalidEventNameError();
  }

  try {
    if (isUmamiAvailable()) {
      await (window as any).umami.track(eventName, {
        ...parameters,
        websiteId: WEBSITE_ID,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Analytics Error:', error);
  }
};

/** ==========================
 *  Page View Tracking (SPA)
 *  ========================== */
export const trackPageView = async (url: string, referrer?: string) => {
  if (!url) {
    throw new InvalidUrlError();
  }

  try {
    if (isUmamiAvailable()) {
      await (window as any).umami.track('pageview', {
        url,
        referrer: referrer || '',
        websiteId: WEBSITE_ID,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Analytics Error:', error);
  }

  // Umami & Clarity auto-track pageviews via their scripts; nothing else needed here.
};

/** ==========================
 *  Convenience wrappers
 *  ========================== */
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    source,
  });
};

export const trackProductView = (productName: string) => {
  trackEvent('view_item', {
    item_name: productName,
    item_category: 'cat_food',
  });
};

export const trackError = (error: Error, context?: string) => {
  const errorParams: AnalyticsParameters = {
    description: error.message,
    fatal: false,
  };
  if (context) {
    (errorParams as any).context = context;
  }
  trackEvent('exception', errorParams);
};

/** =========================================
 *  Global Declarations for TypeScript safety
 *  ========================================= */
declare global {
  interface Window {
    gtag: (...args: GtagArgs) => void;
    umami: {
      track: (event: string, data?: AnalyticsParameters) => void | Promise<void>;
    };
    clarity: (command: string, ...args: (string | AnalyticsParameters)[]) => void;
  }

  // Umami may also exist as a global (non-window) export; we model both
  // to make tests and runtime happy.
  // eslint-disable-next-line no-var
  var umami:
    | {
        track: (event: string, data?: AnalyticsParameters) => void | Promise<void>;
      }
    | undefined;

  // eslint-disable-next-line no-var
  var gtag: ((...args: GtagArgs) => void) | undefined;

  // eslint-disable-next-line no-var
  var clarity: ((command: string, ...args: (string | AnalyticsParameters)[]) => void) | undefined;
}
