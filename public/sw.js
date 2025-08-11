/**
 * Service Worker Configuration
 *
 * This service worker enables offline functionality and improved performance
 * through strategic caching of application assets and API responses.
 *
 * Cache Strategy:
 * - Cache-first with network fallback for uncached requests
 * - Offline support for previously cached resources
 */

/**
 * Cache name with version control
 * Update this version when deploying changes to cached resources
 * Format: 'choji-store-v{major}.{minor}'
 */
const CACHE_NAME = "choji-store-v1";

/**
 * List of URLs to cache during service worker installation
 *
 * Critical Resources:
 * - HTML: Main entry point and static pages
 * - Assets: Logos, images, and favicons
 * - Styles: CSS files (handled by build process)
 * - Scripts: JavaScript bundles (handled by build process)
 *
 * Note: Keep this list minimal to optimize installation time
 * Update this list when adding new critical resources
 */
const urlsToCache = [
  "/", // Root path for SPA
  "/index.html", // Main HTML file
  "/logo/logo.svg", // Primary branding
  "/logo/logo-footer.svg", // Footer branding
  "/images/choji.webp", // Hero image
  "/favicon/favicon.svg", // Vector favicon
  "/favicon/favicon.ico", // Legacy favicon
];

/**
 * Service Worker Installation Event Handler
 *
 * Triggered when the service worker is first installed.
 * Responsible for caching all critical application resources.
 *
 * Process:
 * 1. Open cache storage with current version
 * 2. Add all critical resources to cache
 * 3. Ensure successful installation
 *
 * Error Handling:
 * - Fails installation if caching fails
 * - Provides cleanup on failure
 *
 * @param {ExtendableEvent} event - Installation event
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => {
        console.error("Cache installation failed:", error);
        throw error;
      })
  );
});

/**
 * Service Worker Fetch Event Handler
 *
 * Intercepts all fetch requests and applies caching strategy.
 * Implements a cache-first strategy with network fallback.
 *
 * Strategy:
 * 1. Check cache for requested resource
 * 2. Return cached version if available
 * 3. Fetch from network if not in cache
 * 4. Update cache with new network response
 *
 * Optimization:
 * - Fast response for cached resources
 * - Fresh content when cache misses
 * - Offline support for cached items
 *
 * @param {FetchEvent} event - Fetch event
 */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request for multiple use
        const fetchRequest = event.request.clone();

        // Fetch from network and update cache
        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response for cache and return
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
        // Implement offline fallback if needed
      })
  );
});
