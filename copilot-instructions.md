# 🤖 AI Assistant Instructions for Choji Store

> **Comprehensive guidelines for AI assistants working on the Choji Store project**

This document provides detailed instructions and context for AI coding assistants (GitHub Copilot, Cascade, etc.) to effectively contribute to the Choji Store project while maintaining code quality, consistency, and project standards.

## 📋 Project Overview

**Choji Store** is a premium natural homemade cat food e-commerce landing page featuring:

- **Tech Stack**: React 18 + TypeScript 5 + Vite 7 + Tailwind CSS 3
- **Architecture**: Single-page application with component-based design
- **Integration**: WhatsApp ordering, multi-platform analytics, PWA features
- **Focus**: Performance, accessibility, SEO optimization, and privacy compliance

## 🎯 Core Principles

### 1. Code Quality Standards
- **TypeScript First**: Always use strict TypeScript with proper typing
- **Functional Components**: Prefer React functional components with hooks
- **Type Safety**: No `any` types, comprehensive interface definitions
- **Error Handling**: Robust error boundaries and async error handling
- **Performance**: Optimize for Core Web Vitals and mobile performance

### 2. Design System Adherence
- **Tailwind CSS**: Use utility-first approach with consistent spacing
- **Color Palette**: Orange (#F97316) and Green (#22C55E) primary colors
- **Typography**: Responsive text scales with proper hierarchy
- **Gradients**: Subtle orange-to-green gradients for backgrounds
- **Animations**: Smooth transitions with `hover:scale-105` patterns

### 3. Privacy and Compliance
- **GDPR/CCPA**: Implement proper cookie consent management
- **Analytics**: Use privacy-focused Umami alongside Google Analytics
- **Data Handling**: Minimize data collection, respect user preferences
- **Consent**: Granular consent categories for different tracking types

## 🔧 Development Guidelines

### File Organization
```
src/
├── App.tsx              # Main component (679 lines) - avoid splitting
├── main.tsx             # Entry point with service worker registration
├── index.css            # Global styles and Tailwind imports
└── utils/               # Utility functions (well-documented)
    ├── analytics.ts     # Multi-platform analytics
    ├── cookieConsent.ts # GDPR/CCPA compliance
    ├── sentry.ts        # Error monitoring
    └── structuredData.ts # SEO structured data
```

### Coding Patterns

#### React Components
```typescript
// Preferred component pattern
interface ComponentProps {
  title: string;
  isActive?: boolean;
  onAction: (data: ActionData) => void;
}

const Component: React.FC<ComponentProps> = ({ title, isActive = false, onAction }) => {
  const [state, setState] = useState<StateType>(initialState);
  
  const handleEvent = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Handle event logic
  }, [dependencies]);

  return (
    <div className="responsive-classes">
      {/* JSX content */}
    </div>
  );
};
```

#### State Management
```typescript
// Use proper typing for all state
const [orderData, setOrderData] = useState<OrderFormData>({
  customerName: '',
  phoneNumber: '',
  productType: 'chicken',
  quantity: 1
});

// Update state with type safety
const updateOrderData = (field: keyof OrderFormData, value: string | number) => {
  setOrderData(prev => ({ ...prev, [field]: value }));
};
```

#### Environment Variables
```typescript
// Always use Vite environment variables
const apiKey = import.meta.env.VITE_API_KEY;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// Never use process.env in browser code
```

### Styling Guidelines

#### Tailwind CSS Classes
```typescript
// Responsive design patterns
"text-lg md:text-xl lg:text-2xl"     // Responsive typography
"px-4 md:px-8 lg:px-16"              // Responsive padding
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // Responsive grids

// Component styling patterns
"bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
"border border-gray-200 hover:border-orange-300"
"text-gray-800 hover:text-orange-600"

// Interactive elements
"bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
```

#### CSS Custom Properties
```css
/* Use CSS variables for dynamic values */
:root {
  --primary-orange: #F97316;
  --primary-green: #22C55E;
  --gradient-bg: linear-gradient(to bottom, #FFF7ED, #F0FDF4);
}
```

## 🚀 Feature Implementation

### WhatsApp Integration
```typescript
// WhatsApp order functionality
const generateWhatsAppUrl = (orderData: OrderFormData): string => {
  const message = `Hi! I'd like to order ${orderData.quantity} of ${orderData.productType} cat food.`;
  const businessNumber = import.meta.env.VITE_WHATSAPP_BUSINESS_NUMBER;
  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
};

const handleWhatsAppOrder = (orderData: OrderFormData) => {
  const url = generateWhatsAppUrl(orderData);
  window.open(url, '_blank', 'noopener,noreferrer');
};
```

### Analytics Implementation
```typescript
// Multi-platform analytics tracking
import { trackEvent, trackPageView } from './utils/analytics';

// Track user interactions
const handleProductView = (productType: string) => {
  trackEvent('product_view', {
    product_type: productType,
    timestamp: new Date().toISOString()
  });
};

// Track page navigation
useEffect(() => {
  trackPageView(window.location.pathname);
}, []);
```

### SEO Optimization
```typescript
// Structured data injection
import { injectStructuredData } from './utils/structuredData';

useEffect(() => {
  // Inject organization schema
  injectStructuredData('organization', organizationData);
  
  // Inject product schema
  injectStructuredData('product', productData);
}, []);
```

## 🛡️ Security and Privacy

### Data Protection
- **Minimal Data Collection**: Only collect necessary order information
- **No Persistent Storage**: Avoid storing sensitive user data locally
- **Consent Management**: Implement granular consent for all tracking
- **Error Reporting**: Filter sensitive information from error logs

### Environment Security
```typescript
// Environment variable validation
const validateEnvVars = () => {
  const required = [
    'VITE_WHATSAPP_BUSINESS_NUMBER',
    'VITE_SENTRY_DSN'
  ];
  
  required.forEach(key => {
    if (!import.meta.env[key] && import.meta.env.PROD) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
};
```

## 🧪 Testing Patterns

### Component Testing
```typescript
// Test component behavior
describe('OrderForm', () => {
  it('should handle form submission correctly', () => {
    // Test implementation
  });
  
  it('should validate required fields', () => {
    // Validation testing
  });
});
```

### Integration Testing
```typescript
// Test WhatsApp integration
describe('WhatsApp Integration', () => {
  it('should generate correct WhatsApp URL', () => {
    const orderData = { /* test data */ };
    const url = generateWhatsAppUrl(orderData);
    expect(url).toContain('wa.me');
  });
});
```

## 📚 Documentation Standards

### Code Comments
```typescript
/**
 * Brief description of function/component purpose
 * 
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 * 
 * @example
 * ```typescript
 * const result = functionName(value1, value2);
 * ```
 */
```

### File Headers
```typescript
/**
 * @fileoverview Brief description of file purpose
 * @author Choji Store Team
 * @since 2025-08-09
 * 
 * This file contains [specific functionality description]
 * Key features: [list main features]
 * Dependencies: [list main dependencies]
 */
```

## 🚨 Common Pitfalls to Avoid

### ❌ Don't Do
- Use `process.env` in browser code (use `import.meta.env`)
- Add `any` types without proper justification
- Hardcode sensitive values (API keys, phone numbers)
- Skip error handling for async operations
- Ignore accessibility requirements
- Use inline styles instead of Tailwind classes
- Create unnecessary component splits (keep App.tsx as single component)

### ✅ Do Instead
- Use proper TypeScript interfaces and types
- Implement comprehensive error boundaries
- Follow privacy-first analytics approach
- Use semantic HTML elements
- Implement proper loading states
- Add ARIA attributes for accessibility
- Use environment variables for configuration

## 🔄 Deployment Considerations

### Build Optimization
- Ensure all environment variables are properly configured
- Test service worker functionality in production build
- Verify analytics tracking works correctly
- Check PWA installation flow
- Validate structured data markup

### Performance Monitoring
- Monitor Core Web Vitals scores
- Track bundle size changes
- Verify caching strategies effectiveness
- Check mobile performance metrics

## 📞 Support and Resources

### Documentation References
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guidelines
- [docs/SERVICE_WORKER.md](docs/SERVICE_WORKER.md) - PWA implementation
- [docs/TYPESCRIPT.md](docs/TYPESCRIPT.md) - TypeScript patterns

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

---

## 🎯 Quick Reference

### Key Commands
```bash
npm run dev          # Start development
npm run build        # Production build
npm run lint         # Code quality check
npm run preview      # Test production build
```

### Environment Variables
```env
VITE_WHATSAPP_BUSINESS_NUMBER=1234567890
VITE_SENTRY_DSN=https://...
VITE_GA_MEASUREMENT_ID=G-...
VITE_UMAMI_WEBSITE_ID=...
VITE_CLARITY_PROJECT_ID=...
```

### Important File Paths
- Main component: `src/App.tsx`
- Utilities: `src/utils/`
- Documentation: `docs/`
- Configuration: Root level config files

---

*Last updated: August 2025 - AI Assistant Guidelines v1.0*

---

**Remember**: This project represents a labor of love for Choji, a beloved cat. Maintain the warm, personal touch while ensuring professional code quality and user experience. 🐱💝
