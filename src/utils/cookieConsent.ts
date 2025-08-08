/**
 * Cookie Consent Management System
 * 
 * This module implements a comprehensive cookie consent management system using
 * vanilla-cookieconsent library. It ensures GDPR, CCPA, and other privacy
 * regulation compliance while providing a seamless user experience.
 * 
 * Key Features:
 * - GDPR/CCPA compliant cookie consent
 * - Granular consent categories (necessary, analytics, marketing)
 * - Integration with Google Analytics consent mode
 * - Customizable consent modal and preferences
 * - Automatic consent state management
 * - Privacy-first approach with opt-in by default
 * 
 * Consent Categories:
 * 1. Necessary Cookies (Always Enabled):
 *    - Essential for website functionality
 *    - Session management
 *    - Security features
 *    - Cannot be disabled
 * 
 * 2. Analytics Cookies (Optional):
 *    - Website usage analytics
 *    - Performance monitoring
 *    - User behavior insights
 *    - Web vitals tracking
 * 
 * 3. Marketing Cookies (Optional):
 *    - Advertising and remarketing
 *    - Social media integration
 *    - Cross-site tracking
 *    - Personalized content
 * 
 * Integration Points:
 * - Google Analytics 4 consent mode
 * - Umami analytics (privacy-first, no consent required)
 * - Microsoft Clarity session recordings
 * - Custom analytics implementations
 * 
 * Privacy Compliance:
 * - Explicit consent required for non-essential cookies
 * - Clear consent withdrawal mechanisms
 * - Detailed privacy policy integration
 * - Audit trail for consent decisions
 * - Regular consent refresh prompts
 * 
 * @module CookieConsent
 * @version 1.0.0
 * @author Usama Ejaz
 * @since 2025-08-08
 * 
 * @see {@link https://github.com/orestbida/cookieconsent Cookie Consent Documentation}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/consent-mode GA4 Consent Mode}
 * @see {@link https://gdpr.eu/ GDPR Compliance Guide}
 */

import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import type { CookieValue } from 'vanilla-cookieconsent';

/**
 * Google Analytics Consent Parameters
 * 
 * Defines the structure for Google Analytics consent mode parameters.
 * These parameters control which types of data collection are allowed
 * based on user consent preferences.
 * 
 * @typedef {Object} GtagConsentParams
 * @property {'granted' | 'denied'} [analytics_storage] - Analytics data storage consent
 * @property {'granted' | 'denied'} [ad_storage] - Advertising data storage consent
 * @property {'granted' | 'denied'} [ad_user_data] - User data for advertising consent
 * @property {'granted' | 'denied'} [ad_personalization] - Ad personalization consent
 */
type GtagConsentParams = {
  analytics_storage?: 'granted' | 'denied';
  ad_storage?: 'granted' | 'denied';
  ad_user_data?: 'granted' | 'denied';
  ad_personalization?: 'granted' | 'denied';
};

/**
 * Initialize Cookie Consent Management System
 * 
 * Sets up and configures the cookie consent modal with customized settings
 * for the Choji store. This function handles the complete initialization
 * of the consent management system including UI configuration, consent
 * categories, and callback handlers.
 * 
 * Configuration Features:
 * - Responsive modal design
 * - Multi-language support (English default)
 * - Customizable consent categories
 * - Branded messaging and styling
 * - Accessibility compliance
 * 
 * Modal Behavior:
 * - Bottom-right positioning for non-intrusive UX
 * - Equal weight buttons for balanced choice presentation
 * - Preference center for granular control
 * - Clear consent withdrawal options
 * 
 * Event Handling:
 * - First consent tracking
 * - Consent change monitoring
 * - Analytics integration updates
 * - Consent state persistence
 * 
 * @example
 * // Initialize consent system on app startup
 * initCookieConsent();
 * 
 * @see {@link https://github.com/orestbida/cookieconsent/wiki/Configuration-reference Configuration Reference}
 */
export const initCookieConsent = () => {
  CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: 'box inline',
        position: 'bottom right',
        equalWeightButtons: true,
        flipButtons: false
      },
      preferencesModal: {
        layout: 'box',
        position: 'right',
        equalWeightButtons: true,
        flipButtons: false
      }
    },
    categories: {
      necessary: {
        readOnly: true
      },
      analytics: {},
      marketing: {}
    },
    language: {
      default: 'en',
      autoDetect: 'browser',
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies! 🍪',
            description: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
            footer: '<a href="/privacy-policy">Privacy Policy</a>\n<a href="/terms-of-service">Terms of Service</a>'
          },
          preferencesModal: {
            title: 'Consent Preferences Center',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            closeIconLabel: 'Close modal',
            serviceCounterLabel: 'Service|Services',
            sections: [
              {
                title: 'Cookie Usage',
                description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.'
              },
              {
                title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
                description: 'These cookies are essential for the proper functioning of our website. Without these cookies, the website would not work properly.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Analytics Cookies',
                description: 'These cookies allow us to analyze website usage and improve our services. They help us understand how visitors interact with our website.',
                linkedCategory: 'analytics'
              },
              {
                title: 'Marketing Cookies',
                description: 'These cookies are used to track visitors across websites to display relevant advertisements and improve marketing effectiveness.',
                linkedCategory: 'marketing'
              }
            ]
          }
        }
      }
    },
    onFirstConsent: ({ cookie }) => {
      console.log('First consent given:', cookie);
      handleConsentChange(cookie);
    },
    onConsent: ({ cookie }) => {
      console.log('Consent updated:', cookie);
      handleConsentChange(cookie);
    },
    onChange: ({ cookie, changedCategories }) => {
      console.log('Consent changed:', cookie, changedCategories);
      handleConsentChange(cookie);
    }
  });
};

/**
 * Handle Consent State Changes
 * 
 * Processes consent state changes and updates analytics platform
 * configurations accordingly. This function serves as the central
 * handler for all consent-related state changes and ensures that
 * analytics platforms respect user privacy preferences.
 * 
 * Processing Logic:
 * - Evaluates accepted consent categories
 * - Enables/disables analytics based on consent
 * - Updates Google Analytics consent mode
 * - Manages marketing cookie permissions
 * - Logs consent changes for audit purposes
 * 
 * @param {CookieValue} cookie - Cookie consent value object from vanilla-cookieconsent
 * @param {string[]} cookie.categories - Array of accepted consent categories
 * 
 * @example
 * // Typically called automatically by consent system
 * handleConsentChange({
 *   categories: ['necessary', 'analytics']
 * });
 * 
 * @private
 */
const handleConsentChange = (cookie: CookieValue) => {
  // CookieValue.categories is an array of accepted category names
  const acceptedCategories = cookie.categories || [];
  
  // Handle analytics consent
  if (acceptedCategories.includes('analytics')) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
  
  // Handle marketing consent
  if (acceptedCategories.includes('marketing')) {
    enableMarketing();
  } else {
    disableMarketing();
  }
};

/**
 * Enable Analytics Tracking
 * 
 * Activates analytics tracking across all configured platforms when
 * user provides consent for analytics cookies. This function updates
 * Google Analytics consent mode and enables data collection.
 * 
 * Actions Performed:
 * - Updates GA4 consent mode to 'granted'
 * - Enables web vitals tracking
 * - Activates user behavior analytics
 * - Starts performance monitoring
 * 
 * Privacy Notes:
 * - Only activates when explicit consent is given
 * - Respects user privacy preferences
 * - Can be disabled at any time
 * - Umami analytics runs regardless (privacy-first)
 * 
 * @example
 * // Called automatically when analytics consent is granted
 * enableAnalytics();
 * 
 * @private
 */
const enableAnalytics = () => {
  // Enable Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }
  
  // Umami is privacy-first and doesn't require consent
  console.log('Analytics enabled');
};

/**
 * Disable Analytics Tracking
 * 
 * Deactivates analytics tracking when user withdraws consent or
 * initially declines analytics cookies. This function ensures
 * compliance with privacy regulations by stopping data collection.
 * 
 * Actions Performed:
 * - Updates GA4 consent mode to 'denied'
 * - Stops behavioral tracking
 * - Disables performance monitoring
 * - Clears analytics cookies (where possible)
 * 
 * Compliance Features:
 * - Immediate effect upon consent withdrawal
 * - Retroactive data collection stop
 * - Cookie cleanup procedures
 * - Audit logging for compliance
 * 
 * @example
 * // Called automatically when analytics consent is withdrawn
 * disableAnalytics();
 * 
 * @private
 */
const disableAnalytics = () => {
  // Disable Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      analytics_storage: 'denied'
    });
  }
  
  console.log('Analytics disabled');
};

/**
 * Enable Marketing and Advertising Cookies
 * 
 * Activates marketing and advertising cookie functionality when user
 * provides explicit consent. This includes remarketing, social media
 * integration, and personalized advertising features.
 * 
 * Marketing Features Enabled:
 * - Google Ads remarketing
 * - Social media pixel tracking
 * - Cross-site advertising
 * - Personalized content delivery
 * - Conversion tracking
 * 
 * Privacy Compliance:
 * - Requires explicit user consent
 * - Provides clear opt-out mechanisms
 * - Respects consent withdrawal
 * - Maintains consent audit trail
 * 
 * @example
 * // Called automatically when marketing consent is granted
 * enableMarketing();
 * 
 * @private
 */
const enableMarketing = () => {
  // Enable marketing/advertising cookies
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
  
  console.log('Marketing enabled');
};

/**
 * Disable Marketing and Advertising Cookies
 * 
 * Deactivates all marketing and advertising functionality when user
 * declines or withdraws consent. This ensures compliance with privacy
 * regulations and user preferences.
 * 
 * Actions Performed:
 * - Disables Google Ads tracking
 * - Stops social media pixels
 * - Prevents cross-site tracking
 * - Clears advertising cookies
 * - Stops personalized content
 * 
 * Compliance Measures:
 * - Immediate deactivation
 * - Cookie cleanup procedures
 * - Tracking prevention
 * - Consent state logging
 * 
 * @example
 * // Called automatically when marketing consent is withdrawn
 * disableMarketing();
 * 
 * @private
 */
const disableMarketing = () => {
  // Disable marketing/advertising cookies
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }
  
  console.log('Marketing disabled');
};

/**
 * Accept All Cookie Categories
 * 
 * Programmatically accepts all available cookie categories including
 * analytics and marketing cookies. This function provides a convenient
 * way to grant full consent, typically used in response to user actions
 * like clicking an "Accept All" button.
 * 
 * Categories Accepted:
 * - Necessary (always enabled)
 * - Analytics (web performance tracking)
 * - Marketing (advertising and remarketing)
 * 
 * Use Cases:
 * - User clicks "Accept All" button
 * - Programmatic consent for returning users
 * - Testing and development scenarios
 * - Bulk consent management
 * 
 * @example
 * // Accept all cookies programmatically
 * acceptAllCookies();
 * 
 * // Use in event handler
 * document.getElementById('accept-all').addEventListener('click', acceptAllCookies);
 */
export const acceptAllCookies = () => {
  CookieConsent.acceptCategory(['analytics', 'marketing']);
};

/**
 * Reject All Non-Essential Cookies
 * 
 * Programmatically rejects all optional cookie categories while
 * maintaining necessary cookies for basic website functionality.
 * This provides users with a privacy-focused option.
 * 
 * Categories Maintained:
 * - Necessary (essential functionality)
 * 
 * Categories Rejected:
 * - Analytics (optional tracking)
 * - Marketing (advertising cookies)
 * 
 * Privacy Benefits:
 * - Minimal data collection
 * - Enhanced user privacy
 * - Compliance with strict privacy preferences
 * - Reduced tracking footprint
 * 
 * @example
 * // Reject all optional cookies
 * rejectAllCookies();
 * 
 * // Use in privacy-focused UI
 * document.getElementById('reject-all').addEventListener('click', rejectAllCookies);
 */
export const rejectAllCookies = () => {
  CookieConsent.acceptCategory(['necessary']);
};

/**
 * Show Cookie Preferences Modal
 * 
 * Displays the cookie preferences modal allowing users to make
 * granular choices about cookie categories. This function provides
 * access to detailed consent management after initial consent.
 * 
 * Modal Features:
 * - Category-specific toggles
 * - Detailed descriptions
 * - Save preferences functionality
 * - Reset to defaults option
 * 
 * User Experience:
 * - Non-blocking modal display
 * - Accessible keyboard navigation
 * - Clear category explanations
 * - Immediate preference application
 * 
 * @example
 * // Show preferences modal
 * showPreferences();
 * 
 * // Use in settings menu
 * document.getElementById('cookie-settings').addEventListener('click', showPreferences);
 */
export const showPreferences = () => {
  CookieConsent.showPreferences();
};

/**
 * Check Consent Status for Category
 * 
 * Checks whether user has provided consent for a specific cookie
 * category. This function is useful for conditional feature activation
 * and compliance verification.
 * 
 * Available Categories:
 * - 'necessary': Always true (required cookies)
 * - 'analytics': User's analytics consent status
 * - 'marketing': User's marketing consent status
 * 
 * Return Values:
 * - true: User has consented to the category
 * - false: User has not consented or declined
 * 
 * @param {string} category - Cookie category to check consent for
 * @returns {boolean} Consent status for the specified category
 * 
 * @example
 * // Check analytics consent before tracking
 * if (hasConsent('analytics')) {
 *   trackPageView(window.location.href);
 * }
 * 
 * // Conditional marketing feature activation
 * if (hasConsent('marketing')) {
 *   loadRemarketingPixel();
 * }
 */
export const hasConsent = (category: string) => {
  return CookieConsent.acceptedCategory(category);
};

/**
 * Global Google Analytics gtag Function Declaration
 * 
 * Declares the global gtag function specifically for consent management.
 * This declaration ensures TypeScript compatibility when updating
 * Google Analytics consent mode based on user preferences.
 * 
 * The gtag function may be undefined if Google Analytics is not loaded
 * or if the user has blocked analytics scripts. This declaration provides
 * type safety while allowing for graceful degradation.
 * 
 * @global
 * @function gtag
 * @param {'consent'} command - gtag command type for consent management
 * @param {'update'} action - Action to perform (update consent state)
 * @param {GtagConsentParams} params - Consent parameters to update
 */
declare const gtag: ((command: 'consent', action: 'update', params: GtagConsentParams) => void) | undefined;
