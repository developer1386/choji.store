# 🛠️ Utilities Documentation

This directory contains utility functions and modules used throughout the Choji Store application.

## 📁 Directory Structure

```
utils/
├── README.md              # This documentation file
├── analytics.ts          # Analytics integration utilities
├── cookieConsent.ts     # Cookie consent management
├── errors.ts            # Custom error classes
├── schemaGenerators.ts  # Schema.org data generators
├── sentry.ts           # Sentry error tracking setup
├── structuredData.ts   # Structured data initialization
├── structuredData.test.ts # Tests for structured data
├── types.ts           # TypeScript type definitions
└── validators.ts      # Data validation utilities
```

## 🔧 Core Modules

### Schema Generation & Validation

- **schemaGenerators.ts**: Generates JSON-LD structured data
  - Organization schema for business info
  - Product schema for cat food products
  - Website schema for site metadata
  - Type-safe with validation

- **validators.ts**: Data validation utilities
  - URL validation
  - Currency code validation (ISO 4217)
  - Availability state validation
  - Rating and review count validation

- **types.ts**: TypeScript type definitions
  - Schema interfaces
  - Type safety for structured data
  - Documentation of data structures

- **errors.ts**: Custom error handling
  - Validation error classes
  - Structured error messages
  - Error type definitions

### Analytics & Tracking

- **analytics.ts**: Privacy-focused analytics
  - Umami analytics integration
  - Event tracking utilities
  - Performance monitoring

- **sentry.ts**: Error tracking setup
  - Error capture configuration
  - Performance monitoring
  - Release tracking

### User Consent

- **cookieConsent.ts**: Cookie management
  - GDPR-compliant consent handling
  - Cookie preferences storage
  - Consent UI management

## 🧪 Testing

### Test Files

- **structuredData.test.ts**: Test coverage for structured data
  - Schema generation tests
  - Validation tests
  - Edge case handling
  - Error scenarios

## 📚 Usage Examples

### Schema Generation

```typescript
import { generateOrganizationSchema } from './schemaGenerators';

// Generate organization schema
const schema = generateOrganizationSchema({
  name: 'Custom Store',
  url: 'https://example.com'
});
```

### Validation

```typescript
import { isValidUrl, isValidCurrency } from './validators';

// Validate data
const isValid = isValidUrl('https://example.com');
const isCurrencyValid = isValidCurrency('USD');
```

### Analytics

```typescript
import { trackEvent } from './analytics';

// Track custom event
trackEvent('purchase_completed', {
  product: 'Premium Cat Food',
  value: 29.99
});
```

## 🔐 Error Handling

### Custom Errors

```typescript
import { InvalidUrlError } from './errors';

// Handle validation errors
try {
  validateUrl('invalid-url');
} catch (error) {
  if (error instanceof InvalidUrlError) {
    // Handle URL validation error
  }
}
```

## 🚀 Best Practices

1. **Type Safety**
   - Always use TypeScript types
   - Validate data at runtime
   - Handle errors gracefully

2. **Testing**
   - Write comprehensive tests
   - Cover edge cases
   - Test error scenarios

3. **Documentation**
   - Keep JSDoc comments up to date
   - Document complex logic
   - Include usage examples

4. **Performance**
   - Optimize validation logic
   - Use efficient data structures
   - Consider bundle size

## 📚 Additional Resources

- [Schema.org Documentation](https://schema.org/docs/documents.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Testing Guide](https://vitest.dev/guide/)
