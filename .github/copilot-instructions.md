# Choji Store AI Coding Guide 🐱

This guide helps AI agents understand key patterns and workflows in the Choji Store codebase.

## 🏗️ Architecture Overview

- **Mobile-First SPA**: React + TypeScript + Vite for a performant single page application
- **SEO-Optimized**: Structured data, meta tags, and semantic HTML
- **Analytics & Tracking**: Privacy-focused Umami analytics + Sentry error tracking
- **Progressive Web App**: Service worker with offline capabilities
- **WhatsApp Integration**: Direct order processing via messaging
- **High Performance**: Optimized asset loading, lazy components, and minimal re-renders

## 🔑 Key Components & Patterns

### Structured Data Generation
```typescript
// Use typed schema generators with validation
import { generateProductSchema } from './utils/schemaGenerators';

const schema = generateProductSchema({
  name: 'Premium Cat Food',
  priceCurrency: 'USD', // Validated ISO 4217 code
  availability: 'https://schema.org/InStock',
  ratingValue: '4.8'
});
```

### Component Documentation
- Use detailed JSDoc comments to document component responsibilities
- Include key sections: Features, SEO, Accessibility, Performance
```typescript
/**
 * Component Structure:
 * - Features: List key capabilities
 * - SEO: Document structured data, meta tags
 * - Accessibility: ARIA roles, labels, contrast
 * - Performance: Loading strategies, optimizations
 */
```

### Error Handling Pattern
```typescript
import { InvalidUrlError } from './utils/errors';
import { captureError } from './utils/sentry';

try {
  // Validate inputs with specific error types
  if (!isValidUrl(url)) {
    throw new InvalidUrlError(url);
  }
} catch (error) {
  // Track errors with context
  captureError(error, {
    component: 'ComponentName',
    action: 'ActionName'
  });
}
```

## 🛠️ Development Workflow

### Local Development
```bash
npm install     # Install dependencies
npm run dev     # Start dev server (http://localhost:5173)
npm test       # Run test suite
npm run build  # Production build
```

### Key Directories
- `src/utils/`: Core utilities and schema generation
- `src/components/`: React components (co-located with tests)
- `public/`: Static assets and PWA files
- `docs/`: Technical documentation

### Testing Guidelines
- Co-locate tests with implementation (`*.test.ts`)
- Test error cases and validation
- Mock external services
- Test schema generation comprehensively

## 📋 Code Conventions

### TypeScript Standards
- Enable strict mode
- Define interfaces in `src/utils/types.ts`
- Use type inference where possible
- Avoid `any` type
- Use built-in utility types
- Follow `ISchemeName` interface naming

### Component Structure
1. Component JSDoc with full documentation
2. Import statements grouped by type
3. State declarations with detailed comments
4. Helper functions/hooks
5. Component render logic
6. Export statement

### Schema Generation Pattern
1. Define interface with JSDoc
2. Implement validator functions
3. Create generator with validation
4. Add comprehensive tests

## 🌟 Key Files & Patterns

### Core Application Files
- `src/App.tsx`: Main component with layout and routing
- `src/main.tsx`: Application bootstrap and initialization
- `src/utils/schemaGenerators.ts`: SEO schema generation
- `src/utils/validators.ts`: Data validation
- `public/sw.js`: Service worker configuration

### State Management
- Use React hooks for local state
- Props for component communication
- Context for theme/preferences (if needed)
- Avoid unnecessary global state

### Performance Optimization
- Lazy load below-the-fold images
- Optimize asset loading order
- Use correct image dimensions
- Implement proper caching strategies

Questions? Want to understand specific patterns or workflows better? Let me know!
