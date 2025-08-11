# Choji Store AI Coding Guide 🐱

This guide helps AI agents understand key patterns and workflows in the Choji Store codebase.

## 🏗️ Architecture Overview

- **Single Page Application** built with React + TypeScript + Vite
- **Mobile-first** design using Tailwind CSS
- **SEO-optimized** with structured data and meta tags
- **Privacy-focused** analytics using Umami
- **Error tracking** via Sentry

## 🔑 Key Components & Patterns

### Schema Generation
- Use `src/utils/schemaGenerators.ts` for JSON-LD structured data
- Always validate schema data using `validators.ts` before generation
- Examples of valid schema generation:
```typescript
generateProductSchema({
  name: 'Premium Cat Food',
  price: '29.99',
  currency: 'USD',
  availability: 'InStock'
});
```

### Error Handling
- Custom error classes in `src/utils/errors.ts`
- Always use specific error types (e.g., `InvalidUrlError`, `InvalidCurrencyError`)
- Sentry integration for production error tracking

### Testing Patterns
- Use Vitest for unit testing
- Follow `*.test.ts` naming convention
- Test files should be co-located with implementation
- Mock external services in tests
- Example test pattern:
```typescript
describe('Component/Util', () => {
  it('should handle expected case', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## 🛠️ Development Workflows

### Local Development
```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run test   # Run tests
npm run build  # Production build
```

### Type Safety
- Enable strict mode TypeScript
- Define interfaces in `src/utils/types.ts`
- Use type inference where possible
- Avoid `any` type

### SEO Requirements
- All pages require proper meta tags
- Structured data must be validated
- Images need descriptive alt text
- Follow semantic HTML structure

## 🤝 Contributing Guidelines

1. Branch from `main`
2. Follow TypeScript strict mode
3. Add tests for new features
4. Validate SEO schemas
5. Check accessibility (ARIA, contrast)
6. Run full test suite before PR

## 📁 Critical Files

- `src/App.tsx` - Main application component
- `src/utils/schemaGenerators.ts` - SEO schema generation
- `src/utils/validators.ts` - Data validation
- `src/utils/analytics.ts` - Privacy-focused tracking
- `public/sw.js` - Service worker for PWA
