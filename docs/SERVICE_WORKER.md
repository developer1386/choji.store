# 🔧 Service Worker Documentation

> **Progressive Web App (PWA) Implementation for Choji Store**

The service worker implementation in this project provides comprehensive offline capabilities, intelligent caching strategies, and Progressive Web App (PWA) features for the Choji Store website, ensuring optimal performance and user experience across all network conditions.

## 🌟 Overview

The service worker (`public/sw.js`) implements an intelligent **cache-first strategy** with network fallback for critical application assets. This advanced caching system ensures that the Choji Store application:

- ⚡ **Loads instantly** on repeat visits
- 🌐 **Works offline** after the initial visit
- 📱 **Functions as a PWA** with app-like experience
- 🚀 **Optimizes performance** through strategic asset caching
- 🔄 **Updates seamlessly** with versioned cache management

### Key Benefits

| Feature | Benefit | Impact |
|---------|---------|--------|
| **Offline Support** | Users can browse products without internet | Improved UX in poor connectivity |
| **Instant Loading** | Cached assets load immediately | Better Core Web Vitals scores |
| **Reduced Bandwidth** | Fewer network requests for repeat visits | Lower data usage for users |
| **PWA Features** | App-like installation and behavior | Enhanced mobile experience |

## ⚙️ Cache Configuration

### Cache Strategy Overview

The service worker uses a **versioned caching system** with strategic asset prioritization:

```javascript
// Cache version for easy updates and cache busting
const CACHE_NAME = 'choji-store-v1';

// Critical assets for offline functionality
const urlsToCache = [
  '/',                          // Root page (App shell)
  '/index.html',               // Main HTML document
  '/logo/logo.svg',            // Primary brand logo
  '/logo/logo-footer.svg',     // Footer logo variant
  '/images/choji.jpg',         // Hero image (Choji's photo)
  '/favicon/favicon.svg',      // Scalable favicon
  '/favicon/favicon.ico'       // Fallback favicon
];
```

### Asset Prioritization

**Tier 1 - Critical Assets (Always Cached):**
- Application shell (HTML, CSS, JS)
- Brand assets (logos, favicons)
- Hero content (Choji's image)

**Tier 2 - Dynamic Content (Cache on Demand):**
- API responses
- User-generated content
- Analytics scripts

**Tier 3 - External Resources (Network First):**
- Third-party scripts
- Social media embeds
- External fonts

## 🚀 Advanced Features

### 1. Intelligent Caching Strategy

```javascript
// Cache-first with network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Fetch from network and cache the response
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone and cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});
```

### 2. Performance Optimizations

- **⚡ Cache-First Strategy**: Instant loading for cached resources
- **🔄 Background Updates**: Fresh content fetched in background
- **📦 Selective Caching**: Only cache successful responses
- **🗑️ Cache Management**: Automatic cleanup of old cache versions
- **📊 Performance Monitoring**: Integration with Web Vitals tracking

### 3. Offline Capabilities

- **🌐 Full Offline Browsing**: Complete product catalog available offline
- **📱 App Shell Model**: Core UI loads instantly without network
- **💾 Persistent Storage**: Critical data stored locally
- **🔄 Sync on Reconnect**: Automatic data synchronization when online

### 4. PWA Features

- **📲 Install Prompt**: Native app installation experience
- **🏠 Home Screen Icon**: Branded app icon on device
- **🎨 Splash Screen**: Custom loading screen
- **📱 App-like Navigation**: Seamless, native-feeling interactions

## 🔧 Implementation Details

### Service Worker Registration

The service worker is strategically registered in `src/main.tsx` after the main application loads:

```typescript
/**
 * Service Worker Registration
 * 
 * Registers the service worker for PWA functionality and offline support.
 * Registration happens after the main application loads to avoid blocking
 * the initial render and ensure optimal performance.
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          console.log('🔄 Service Worker update found');
        });
      })
      .catch((error) => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
}
```

### Registration Benefits

- **⚡ Non-blocking**: Registered after app load to avoid performance impact
- **🔄 Update Detection**: Automatic detection of service worker updates
- **📊 Logging**: Comprehensive logging for debugging and monitoring
- **🛡️ Error Handling**: Graceful fallback when service worker fails

### Detailed Caching Strategy

#### 1. Install Event - Pre-caching Critical Assets

```javascript
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching critical assets...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Critical assets cached successfully');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});
```

#### 2. Activate Event - Cache Cleanup

```javascript
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old cache versions
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});
```

#### 3. Fetch Event - Intelligent Request Handling

**Request Routing Strategy:**

| Request Type | Strategy | Rationale |
|--------------|----------|----------|
| **HTML Pages** | Cache First | Instant loading, offline support |
| **Static Assets** | Cache First | Performance optimization |
| **API Calls** | Network First | Fresh data priority |
| **Images** | Cache First | Bandwidth optimization |
| **External Scripts** | Network Only | Security and freshness |

## 🛠️ Development Guidelines

### Cache Version Management

```javascript
// Update version when deploying changes to cached resources
const CACHE_NAME = 'choji-store-v2'; // Increment version number

// Add new critical assets to the cache list
const urlsToCache = [
  // Existing assets...
  '/new-feature/assets.js',    // New feature assets
  '/updated-styles.css',       // Updated stylesheets
];
```

### Testing and Debugging

#### Chrome DevTools Testing

1. **Application Tab**:
   - Monitor cache storage
   - View cached resources
   - Clear cache for testing

2. **Network Tab**:
   - Test offline functionality
   - Verify cache-first behavior
   - Monitor network requests

3. **Console Logging**:
   ```javascript
   // Enable verbose service worker logging
   self.addEventListener('message', (event) => {
     if (event.data && event.data.type === 'SKIP_WAITING') {
       console.log('🔄 Skipping waiting, activating new service worker');
       self.skipWaiting();
     }
   });
   ```

#### Testing Checklist

- [ ] **Offline Functionality**: Test with network disabled
- [ ] **Cache Updates**: Verify new versions deploy correctly
- [ ] **Performance Impact**: Monitor Core Web Vitals
- [ ] **Error Handling**: Test service worker registration failures
- [ ] **Cross-browser**: Test in different browsers
- [ ] **Mobile Devices**: Test PWA installation

### Best Practices

#### 1. Cache Strategy Optimization

```javascript
// Implement cache expiration for dynamic content
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

const isCacheExpired = (response) => {
  const cachedDate = response.headers.get('sw-cache-date');
  if (!cachedDate) return true;
  
  return Date.now() - parseInt(cachedDate) > CACHE_EXPIRY;
};
```

#### 2. Performance Monitoring

```javascript
// Track cache hit rates
self.addEventListener('fetch', (event) => {
  const startTime = performance.now();
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const cacheHit = !!cachedResponse;
      const responseTime = performance.now() - startTime;
      
      // Log performance metrics
      console.log(`${cacheHit ? '💾' : '🌐'} ${event.request.url} - ${responseTime.toFixed(2)}ms`);
      
      return cachedResponse || fetch(event.request);
    })
  );
});
```

#### 3. Error Recovery

```javascript
// Implement fallback for failed requests
const handleFailedRequest = (request) => {
  if (request.destination === 'document') {
    // Return cached index.html for navigation requests
    return caches.match('/index.html');
  }
  
  if (request.destination === 'image') {
    // Return placeholder image for failed image requests
    return caches.match('/images/placeholder.jpg');
  }
  
  // Return generic error response
  return new Response('Offline - Content not available', {
    status: 503,
    statusText: 'Service Unavailable'
  });
};
```

### Deployment Checklist

- [ ] **Update CACHE_NAME** version number
- [ ] **Add new assets** to urlsToCache array
- [ ] **Test offline functionality** thoroughly
- [ ] **Verify cache cleanup** removes old versions
- [ ] **Monitor performance** impact after deployment
- [ ] **Check PWA features** (install prompt, splash screen)

---

## 📚 Additional Resources

- [Service Worker API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Best Practices](https://web.dev/pwa/)
- [Cache API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [Workbox (Advanced Service Worker Library)](https://developers.google.com/web/tools/workbox)

---

*Last updated: August 2025 - Service Worker v1.2*
