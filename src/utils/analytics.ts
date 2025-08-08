// Analytics and monitoring utilities
import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

// Type definitions for analytics
type AnalyticsParameters = Record<string, string | number | boolean>;
type GtagCommand = 'config' | 'event' | 'set';
type GtagArgs = [GtagCommand, string, AnalyticsParameters?] | [GtagCommand, string];

// Web Vitals reporting
export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

// Send web vitals to analytics
export const sendToAnalytics = (metric: Metric) => {
  // Send to Google Analytics 4 if available
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to Umami if available
  if (typeof umami !== 'undefined') {
    umami.track('web-vitals', {
      metric: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      id: metric.id,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
};

// Google Analytics 4 helper functions
export const gtag = (...args: GtagArgs) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: AnalyticsParameters) => {
  // Google Analytics 4
  gtag('event', eventName, parameters);
  
  // Umami
  if (typeof umami !== 'undefined') {
    umami.track(eventName, parameters);
  }
  
  // Microsoft Clarity custom tags
  if (typeof clarity !== 'undefined') {
    clarity('set', eventName, parameters ? JSON.stringify(parameters) : 'true');
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  // Google Analytics 4
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: title,
    page_location: url,
  });
  
  // Umami (automatically tracks page views)
  // Microsoft Clarity (automatically tracks page views)
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    source: source,
  });
};

// Track product interactions
export const trackProductView = (productName: string) => {
  trackEvent('view_item', {
    item_name: productName,
    item_category: 'cat_food',
  });
};

// Error tracking helper
export const trackError = (error: Error, context?: string) => {
  trackEvent('exception', {
    description: error.message,
    fatal: false,
    context: context,
  });
};

// Declare global types for TypeScript
declare global {
  interface Window {
    gtag: (...args: GtagArgs) => void;
    umami: {
      track: (event: string, data?: AnalyticsParameters) => void;
    };
    clarity: (command: string, ...args: (string | AnalyticsParameters)[]) => void;
  }
  
  // Global variables that might be available
  const umami: {
    track: (event: string, data?: AnalyticsParameters) => void;
  } | undefined;
  
  const clarity: ((command: string, ...args: (string | AnalyticsParameters)[]) => void) | undefined;
}
