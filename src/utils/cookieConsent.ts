// Cookie consent management using vanilla-cookieconsent
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

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

const handleConsentChange = (cookie: any) => {
  const { categories } = cookie;
  
  // Handle analytics consent
  if (categories.analytics) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
  
  // Handle marketing consent
  if (categories.marketing) {
    enableMarketing();
  } else {
    disableMarketing();
  }
};

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

const disableAnalytics = () => {
  // Disable Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      analytics_storage: 'denied'
    });
  }
  
  console.log('Analytics disabled');
};

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

// Utility functions
export const acceptAllCookies = () => {
  CookieConsent.acceptCategory(['analytics', 'marketing']);
};

export const rejectAllCookies = () => {
  CookieConsent.acceptCategory(['necessary']);
};

export const showPreferences = () => {
  CookieConsent.showPreferences();
};

export const hasConsent = (category: string) => {
  return CookieConsent.acceptedCategory(category);
};

// Declare global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
