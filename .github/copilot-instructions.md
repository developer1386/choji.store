# Choji Store AI Development Guide 🐱

This guide helps AI agents understand the key patterns and workflows in the Choji Store codebase.

## 🏗️ Architecture Overview

- Single Page Application built with React + TypeScript + Vite
- Mobile-first design using Tailwind CSS with custom design system
- SEO and performance optimized with rich structured data
- Privacy-focused analytics (Umami) and error tracking (Sentry)

## 🔑 Key Components & Patterns

### Component Structure
- Components use functional style with TypeScript strict mode
- Mobile-first responsive design using Tailwind's utility classes
- Semantic HTML structure for SEO and accessibility
- Component documentation in JSDoc comments explains design decisions

Example from `App.tsx`:
```tsx
<section 
  className="py-16 px-4 bg-gradient-to-r from-orange-50 to-green-50"
  role="region"
  aria-labelledby="features-heading"
>
```

### SEO Implementation
- Schema.org data generation in `src/utils/schemaGenerators.ts`
- Strict validation using `validators.ts` for all structured data
- Meta tags and canonical URLs handled at component level
- Critical performance optimization via `public/sw.js` service worker

### Error Handling
- Custom error types in `src/utils/errors.ts`
- Sentry integration for production error tracking
- Error boundaries with fallback UI components
- TypeScript strict null checks enforced

### Analytics & Privacy
- Privacy-focused tracking via Umami in `src/utils/analytics.ts`
- GDPR-compliant cookie consent in `src/utils/cookieConsent.ts`
- Performance metrics tracking with Web Vitals
- User data minimization by design

## 🛠️ Development Workflow

### Local Development
```bash
npm install     # Install dependencies
npm run dev     # Start dev server
npm run test    # Run tests
npm run build   # Production build
```

### Type Safety
- Strict TypeScript configuration in `tsconfig.json`
- Type definitions centralized in `src/utils/types.ts`
- No implicit any types allowed
- Interfaces over type aliases preferred

### Code Style
- ESLint configuration optimized for React + TypeScript
- Tailwind classes grouped by concern (layout, typography, colors, effects)
- JSDocs required for complex components and utilities
- Atomic commits with descriptive messages

### Testing
- Vitest for unit testing with `.test.ts` naming
- Co-located test files with implementation
- Mock external services and APIs
- Test data validation extensively

## 📁 Critical Files

- `src/App.tsx` - Main application component
- `src/utils/schemaGenerators.ts` - SEO schema generation
- `src/utils/validators.ts` - Data validation
- `src/utils/analytics.ts` - Privacy-focused tracking
- `public/sw.js` - Service worker implementation
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Design system settings

## 🚀 Build & Deploy

- Vite handles bundling and optimization
- PostCSS processes Tailwind utilities
- Tree shaking enabled for minimal bundle size
- Automated deployment via GitHub Actions
- Environment-specific configuration via `.env` files
