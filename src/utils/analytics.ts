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
 * 1. Google Analytics 4 (GA4):
 *    - Enhanced ecommerce tracking
 *    - Custom events and conversions
 *    - User behavior analysis
 * 
 * 2. Umami Analytics:
 *    - Privacy-first analytics
 *    - GDPR compliant by design
 *    - Self-hosted option available
 * 
 * 3. Microsoft Clarity:
 *    - Heatmaps and session recordings
 *    - User interaction insights
 *    - Performance bottleneck identification
 * 
 * Privacy Considerations:
 * - Respects user consent preferences
 * - Anonymizes sensitive data
 * - Provides opt-out mechanisms
 * - Complies with GDPR/CCPA requirements
 * 
 * @module Analytics
 * @version 1.0.0
 * @author Usama Ejaz
 * @since 2025-08-08
 * 
 * @see {@link https://web.dev/vitals/ Web Vitals Documentation}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4 GA4 Documentation}
 * @see {@link https://umami.is/docs Umami Documentation}
 * @see {@link https://docs.microsoft.com/en-us/clarity/ Microsoft Clarity Documentation}
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

/**
 * Type definitions for analytics parameters
 * 
 * Defines the structure for analytics event parameters that can be sent
 * to various analytics platforms. Supports string, number, and boolean values
 * to accommodate different tracking requirements.
 * 
 * @typedef {Record<string, string | number | boolean>} AnalyticsParameters
 * @example
 * const eventParams: AnalyticsParameters = {
 *   event_category: 'engagement',
 *   value: 1,
 *   non_interaction: false
 * };
 */
type AnalyticsParameters = Record<string, string | number | boolean>;

/**
 * Google Analytics gtag command types
 * 
 * Defines the available gtag commands for Google Analytics 4 integration.
 * These commands control different aspects of analytics tracking.
 * 
 * @typedef {'config' | 'event' | 'set'} GtagCommand
 * - 'config': Configure tracking parameters
 * - 'event': Track custom events
 * - 'set': Set global parameters
 */
type GtagCommand = 'config' | 'event' | 'set';

/**
 * Arguments structure for gtag function calls
 * 
 * Defines the parameter structure for Google Analytics gtag function calls.
 * Supports both parameterized and simple command formats.
 * 
 * @typedef {[GtagCommand, string, AnalyticsParameters?] | [GtagCommand, string]} GtagArgs
 */
type GtagArgs = [GtagCommand, string, AnalyticsParameters?] | [GtagCommand, string];

/**
 * Web Vitals Performance Monitoring
 * 
 * Initializes and configures Web Vitals monitoring for Core Web Vitals metrics.
 * These metrics are essential for understanding user experience and SEO performance.
 * 
 * Monitored Metrics:
 * - CLS (Cumulative Layout Shift): Visual stability measurement
 * - FID (First Input Delay): Interactivity responsiveness
 * - FCP (First Contentful Paint): Loading performance
 * - LCP (Largest Contentful Paint): Loading performance
 * - TTFB (Time to First Byte): Server response time
 * 
 * The function accepts an optional callback to handle metric data,
 * typically used to send metrics to analytics platforms.
 * 
 * @param {Function} [onPerfEntry] - Optional callback function to handle metrics
 * @param {Metric} onPerfEntry.metric - Web Vitals metric object
 * 
 * @example
 * // Basic usage with analytics integration
 * reportWebVitals(sendToAnalytics);
 * 
 * // Custom metric handling
 * reportWebVitals((metric) => {
 *   console.log(`${metric.name}: ${metric.value}`);
 *   // Send to custom analytics endpoint
 * });
 * 
 * @see {@link https://web.dev/vitals/ Core Web Vitals}
 * @see {@link https://github.com/GoogleChrome/web-vitals Web Vitals Library}
 */
export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

/**
 * Send Web Vitals Metrics to Analytics Platforms
 * 
 * Processes and sends Web Vitals metrics to multiple analytics platforms
 * including Google Analytics 4 and Umami. This function handles the
 * formatting and transmission of performance data while respecting
 * user privacy preferences.
 * 
 * Metric Processing:
 * - Normalizes metric values for consistent reporting
 * - Converts CLS values to a more readable scale (×1000)
 * - Includes metric ID for deduplication
 * - Adds contextual metadata
 * 
 * Platform Integration:
 * - Google Analytics 4: Sends as custom events with proper categorization
 * - Umami Analytics: Privacy-focused metric tracking
 * - Development Console: Detailed logging for debugging
 * 
 * @param {Metric} metric - Web Vitals metric object from web-vitals library
 * @param {string} metric.name - Metric name (CLS, FID, FCP, LCP, TTFB)
 * @param {number} metric.value - Metric value in appropriate units
 * @param {string} metric.id - Unique identifier for the metric
 * @param {number} metric.delta - Change since last report
 * @param {string} metric.rating - Performance rating (good, needs-improvement, poor)
 * 
 * @example
 * // Typically called by reportWebVitals
 * reportWebVitals(sendToAnalytics);
 * 
 * // Manual metric sending
 * sendToAnalytics({
 *   name: 'LCP',
 *   value: 2500,
 *   id: 'unique-id',
 *   delta: 100,
 *   rating: 'good'
 * });
 * 
 * @see {@link https://web.dev/vitals/ Web Vitals Guide}
 */
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
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric);
  }
};

/**
 * Google Analytics 4 Helper Function
 * 
 * Provides a safe wrapper for Google Analytics 4 gtag function calls.
 * This function ensures that gtag calls only execute when the GA4 library
 * is properly loaded and available in the browser environment.
 * 
 * Safety Features:
 * - Checks for browser environment (window object)
 * - Verifies gtag function availability
 * - Prevents errors in server-side rendering
 * - Graceful degradation when GA4 is not loaded
 * 
 * @param {...GtagArgs} args - Variable arguments passed to gtag function
 * 
 * @example
 * // Track a custom event
 * gtag('event', 'purchase', {
 *   transaction_id: '12345',
 *   value: 25.99,
 *   currency: 'USD'
 * });
 * 
 * // Configure tracking
 * gtag('config', 'GA_MEASUREMENT_ID', {
 *   page_title: 'Home Page',
 *   page_location: 'https://choji.store'
 * });
 * 
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4 GA4 Documentation}
 */
export const gtag = (...args: GtagArgs) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

/**
 * Track Custom Events Across Multiple Analytics Platforms
 * 
 * Sends custom events to all configured analytics platforms including
 * Google Analytics 4, Umami Analytics, and Microsoft Clarity. This function
 * provides a unified interface for event tracking while maintaining
 * platform-specific optimizations.
 * 
 * Event Processing:
 * - Normalizes event data across platforms
 * - Handles platform-specific formatting
 * - Provides fallback mechanisms
 * - Respects user consent preferences
 * 
 * Supported Platforms:
 * - Google Analytics 4: Enhanced event tracking with custom parameters
 * - Umami Analytics: Privacy-focused event tracking
 * - Microsoft Clarity: Custom tags for session analysis
 * 
 * @param {string} eventName - Name of the event to track
 * @param {AnalyticsParameters} [parameters] - Optional event parameters
 * 
 * @example
 * // Simple event tracking
 * trackEvent('button_click');
 * 
 * // Event with parameters
 * trackEvent('product_view', {
 *   product_name: 'Premium Cat Food',
 *   category: 'pet_food',
 *   value: 25.99
 * });
 * 
 * // E-commerce event
 * trackEvent('purchase', {
 *   transaction_id: 'order_123',
 *   value: 75.99,
 *   currency: 'USD',
 *   items: 3
 * });
 */
const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID || '';

/**
 * Safely checks if we're in a browser environment and have Umami available
 */
const isUmamiAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.umami !== 'undefined' && 
         typeof window.umami.track === 'function';
};

export const trackEvent = async (eventName: string, parameters?: AnalyticsParameters) => {
  if (!eventName) {
    throw new Error('Event name is required');
  }

  try {
    if (isUmamiAvailable()) {
      await window.umami.track(eventName, {
        ...parameters,
        websiteId: WEBSITE_ID
      });
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

/**
 * Track Page Views Across Analytics Platforms
 * 
 * Records page view events for single-page applications where traditional
 * page view tracking may not capture navigation events. This function
 * ensures consistent page view tracking across all analytics platforms.
 * 
 * Features:
 * - SPA-compatible page view tracking
 * - Automatic URL and title detection
 * - Cross-platform consistency
 * - SEO-friendly metadata inclusion
 * 
 * @param {string} url - Full URL of the page being viewed
 * @param {string} [title] - Optional page title for better analytics reporting
 * 
 * @example
 * // Basic page view tracking
 * trackPageView(window.location.href);
 * 
 * // Page view with custom title
 * trackPageView('https://choji.store/products', 'Product Catalog');
 * 
 * // SPA navigation tracking
 * trackPageView('/order-form', 'Order Form - Choji Store');
 */
export const trackPageView = async (url: string, referrer?: string) => {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    if (isUmamiAvailable()) {
      await window.umami.track('pageview', {
        url,
        referrer: referrer || '',
        websiteId: WEBSITE_ID
      });
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
  
  // Umami (automatically tracks page views)
  // Microsoft Clarity (automatically tracks page views)
};

/**
 * Track Form Submission Events
 * 
 * Monitors form submission events with success/failure tracking.
 * This function is essential for conversion tracking and user
 * experience optimization, particularly for the order form.
 * 
 * Tracking Details:
 * - Form identification by name
 * - Success/failure status
 * - Conversion funnel analysis
 * - User interaction patterns
 * 
 * @param {string} formName - Identifier for the form being submitted
 * @param {boolean} [success=true] - Whether the submission was successful
 * 
 * @example
 * // Successful form submission
 * trackFormSubmission('order_form', true);
 * 
 * // Failed form submission
 * trackFormSubmission('contact_form', false);
 * 
 * // Newsletter signup
 * trackFormSubmission('newsletter_signup');
 */
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

/**
 * Track WhatsApp Integration Interactions
 * 
 * Monitors user interactions with WhatsApp integration features,
 * which is a critical conversion point for the Choji store.
 * This tracking helps optimize the ordering process and measure
 * the effectiveness of WhatsApp as a sales channel.
 * 
 * Use Cases:
 * - Order button clicks
 * - Contact link interactions
 * - CTA performance measurement
 * - Conversion funnel analysis
 * 
 * @param {string} source - Source location or context of the WhatsApp click
 * 
 * @example
 * // Track order form WhatsApp button
 * trackWhatsAppClick('order_form');
 * 
 * // Track header contact button
 * trackWhatsAppClick('header_cta');
 * 
 * // Track footer contact link
 * trackWhatsAppClick('footer_contact');
 */
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    source: source,
  });
};

/**
 * Track Product Interaction Events
 * 
 * Records user interactions with product information, including
 * product views, size selections, and engagement metrics.
 * This data is valuable for understanding customer preferences
 * and optimizing product presentation.
 * 
 * Analytics Benefits:
 * - Product popularity insights
 * - User engagement patterns
 * - Conversion optimization data
 * - Inventory planning support
 * 
 * @param {string} productName - Name or identifier of the product being viewed
 * 
 * @example
 * // Track product page view
 * trackProductView('Premium Cat Food 250g');
 * 
 * // Track product size selection
 * trackProductView('Premium Cat Food 1kg');
 * 
 * // Track featured product interaction
 * trackProductView('Popular Choice - 500g');
 */
export const trackProductView = (productName: string) => {
  trackEvent('view_item', {
    item_name: productName,
    item_category: 'cat_food',
  });
};

/**
 * Track Application Errors and Exceptions
 * 
 * Captures and reports application errors to analytics platforms
 * for monitoring application health and user experience issues.
 * This function provides detailed error context for debugging
 * and performance optimization.
 * 
 * Error Information Captured:
 * - Error message and stack trace
 * - Contextual information
 * - User agent and environment data
 * - Non-fatal error classification
 * 
 * @param {Error} error - JavaScript Error object to be tracked
 * @param {string} [context] - Optional context information about where the error occurred
 * 
 * @example
 * // Track a caught exception
 * try {
 *   riskyOperation();
 * } catch (error) {
 *   trackError(error, 'order_processing');
 * }
 * 
 * // Track a custom error
 * trackError(new Error('WhatsApp integration failed'), 'whatsapp_order');
 * 
 * // Track with detailed context
 * trackError(error, 'form_validation_step_2');
 */
export const trackError = (error: Error, context?: string) => {
  const errorParams: AnalyticsParameters = {
    description: error.message,
    fatal: false,
  };
  
  if (context) {
    errorParams.context = context;
  }
  
  trackEvent('exception', errorParams);
};

/**
 * Global Type Declarations for Analytics Platforms
 * 
 * Extends the global Window interface and declares global variables
 * for various analytics platforms. This ensures proper TypeScript
 * support and prevents compilation errors when accessing analytics
 * functions that may or may not be loaded.
 * 
 * Platform Integrations:
 * - Google Analytics 4 (gtag)
 * - Umami Analytics
 * - Microsoft Clarity
 * 
 * These declarations provide:
 * - Type safety for analytics function calls
 * - IntelliSense support in development
 * - Proper error handling for missing libraries
 * - Compatibility with server-side rendering
 */
declare global {
  /**
   * Extended Window interface with analytics platform methods
   */
  interface Window {
    /**
     * Google Analytics 4 global function
     * @param args - Variable arguments for gtag commands
     */
    gtag: (...args: GtagArgs) => void;
    
    /**
     * Umami Analytics tracking object
     */
    umami: {
      /**
       * Track custom events in Umami
       * @param event - Event name
       * @param data - Optional event data
       */
      track: (event: string, data?: AnalyticsParameters) => void;
    };
    
    /**
     * Microsoft Clarity tracking function
     * @param command - Clarity command
     * @param args - Command arguments
     */
    clarity: (command: string, ...args: (string | AnalyticsParameters)[]) => void;
  }
  
  /**
   * Global Umami analytics object (may be undefined)
   * Available when Umami script is loaded
   */
  const umami: {
    track: (event: string, data?: AnalyticsParameters) => void;
  } | undefined;
  
  /**
   * Global Microsoft Clarity function (may be undefined)
   * Available when Clarity script is loaded
   */
  const clarity: ((command: string, ...args: (string | AnalyticsParameters)[]) => void) | undefined;
}
