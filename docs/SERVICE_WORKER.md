# Service Worker Documentation

The service worker implementation in this project provides offline capabilities and caching strategies for the Choji Store website.

## Overview

The service worker (`public/sw.js`) implements a basic cache-first strategy for critical application assets. This ensures that the application can load quickly and work offline after the initial visit.

## Cache Configuration

```js
const CACHE_NAME = 'choji-store-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo/logo.svg',
  '/logo/logo-footer.svg',
  '/images/choji.jpg',
  '/favicon/favicon.svg',
  '/favicon/favicon.ico'
];
```

## Features

- **Cache-First Strategy**: All cached resources are served from the cache first, falling back to network requests
- **Automatic Asset Caching**: Critical assets are pre-cached during service worker installation
- **Offline Support**: Core application functionality remains available without network connectivity
- **Performance Optimization**: Reduced network requests for frequently accessed resources

## Implementation Details

### Installation

The service worker is registered in `main.tsx`:

```tsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}
```

### Caching Strategy

1. **Install Event**: Pre-caches critical resources when the service worker is installed
2. **Fetch Event**: Implements a cache-first strategy with network fallback
3. **Cache Management**: Uses a versioned cache name for better cache control

## Development Considerations

- Update `CACHE_NAME` when deploying changes to cached resources
- Add new critical assets to `urlsToCache` array
- Test offline functionality in development using Chrome DevTools
- Consider implementing cache cleanup for older versions
