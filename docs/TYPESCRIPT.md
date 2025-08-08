# 🔷 TypeScript Implementation Guide

> **Comprehensive TypeScript patterns and best practices for Choji Store**

This document provides detailed TypeScript code examples, patterns, and best practices specifically used in the Choji Store application. It serves as a reference for developers working with our React + TypeScript + Vite stack.

## 📝 Form Event Handling

### Form Submission with Type Safety

```typescript
/**
 * Handles form submission with comprehensive type safety
 * Used in order forms, contact forms, and user input validation
 */
interface OrderFormData {
  customerName: string;
  phoneNumber: string;
  productType: 'chicken' | 'fish' | 'mixed';
  quantity: number;
  specialInstructions?: string;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Type-safe form data extraction
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries()) as Record<string, string>;
  
  // Validate and transform data with proper typing
  const orderData: OrderFormData = {
    customerName: data.customerName,
    phoneNumber: data.phoneNumber,
    productType: data.productType as OrderFormData['productType'],
    quantity: parseInt(data.quantity, 10),
    specialInstructions: data.specialInstructions || undefined
  };
  
  // Process validated form data
  submitOrder(orderData);
};
```

### Input Change Handlers

```typescript
/**
 * Generic input change handler with type inference
 * Supports text inputs, selects, textareas, and checkboxes
 */
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  
  // Handle different input types
  const processedValue = type === 'checkbox' 
    ? (e.target as HTMLInputElement).checked
    : type === 'number' 
      ? parseFloat(value) || 0
      : value;
  
  setFormData(prev => ({
    ...prev,
    [name]: processedValue
  }));
};

/**
 * Specialized handler for quantity inputs with validation
 */
const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
  setOrderData(prev => ({ ...prev, quantity }));
};
```

## 🎯 State Management Patterns

```typescript
/**
 * State management patterns used throughout Choji Store
 * Demonstrates proper typing for React hooks and state updates
 */

// Product quantity state with union types
const [selectedQuantity, setSelectedQuantity] = useState<'250g' | '500g' | '1kg'>('250g');

// Loading states for async operations
const [isLoading, setIsLoading] = useState<boolean>(false);
const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

// Complex state objects with interfaces
interface OrderState {
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  productSelection: {
    quantity: ProductQuantity;
    specialRequests: string[];
  };
  delivery: {
    address: string;
    preferredTime?: string;
  };
}

const [orderState, setOrderState] = useState<OrderState>({
  customerInfo: { name: '', phone: '' },
  productSelection: { quantity: '250g', specialRequests: [] },
  delivery: { address: '' }
});

// State update patterns with type safety
const updateCustomerInfo = (field: keyof OrderState['customerInfo'], value: string) => {
  setOrderState(prev => ({
    ...prev,
    customerInfo: { ...prev.customerInfo, [field]: value }
  }));
};
```

## 🎮 Event Handlers with TypeScript

```tsx
// Button click handler
const handleQuantitySelect = (quantity: '250g' | '500g' | '1kg') => {
  setSelectedQuantity(quantity);
};

// Smooth scroll handler
const scrollToOrder = (): void => {
  document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
};
```

## Component Props

```tsx
interface OrderButtonProps {
  quantity: string;
  isSelected: boolean;
  onSelect: (quantity: string) => void;
  className?: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  quantity,
  isSelected,
  onSelect,
  className
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(quantity)}
      className={`${className} ${
        isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
      }`}
    >
      {quantity}
    </button>
  );
};
```

## Type Definitions

```tsx
type ProductQuantity = '250g' | '500g' | '1kg';
type OrderStatus = 'idle' | 'loading' | 'success' | 'error';

interface Product {
  size: ProductQuantity;
  label: string;
  description: string;
  isPopular: boolean;
}

interface WhatsAppOrder {
  quantity: ProductQuantity;
  timestamp: Date;
  status: OrderStatus;
}
```

## Utility Functions

```tsx
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const encodeWhatsAppMessage = (message: string): string => {
  return encodeURIComponent(message);
};
```

## Error Handling

```typescript
/**
 * Comprehensive error handling patterns for TypeScript
 * Includes type guards, error boundaries, and async error handling
 */

// Type-safe error handling with unknown type
const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

// Async error handling with proper typing
const trySendOrder = async (order: WhatsAppOrder): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate WhatsApp order processing
    const whatsappUrl = generateWhatsAppUrl(order);
    window.open(whatsappUrl, '_blank');
    
    return { success: true };
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error('Order submission failed:', errorMessage);
    
    return { success: false, error: errorMessage };
  }
};

// Error boundary component typing
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }

    return this.props.children;
  }
}
```

## 🔧 Advanced TypeScript Patterns

### Custom Hooks with Generic Types

```typescript
/**
 * Custom hook for managing async operations with loading states
 * Generic type T represents the expected return data type
 */
interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
}

function useAsync<T>(asyncFunction: (...args: any[]) => Promise<T>): UseAsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction(...args);
      setData(result);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { data, loading, error, execute };
}

// Usage example
const { data: orderResult, loading: orderLoading, execute: submitOrder } = useAsync(
  async (orderData: OrderFormData) => {
    // Process order logic
    return { orderId: '123', status: 'confirmed' };
  }
);
```

### Environment Variables with Type Safety

```typescript
/**
 * Type-safe environment variable access for Vite
 * Ensures all required environment variables are properly typed
 */
interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_UMAMI_WEBSITE_ID: string;
  readonly VITE_CLARITY_PROJECT_ID: string;
  readonly VITE_WHATSAPP_BUSINESS_NUMBER: string;
  readonly VITE_APP_VERSION: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Type-safe environment variable helper
const getEnvVar = (key: keyof ImportMetaEnv): string => {
  const value = import.meta.env[key];
  if (!value && import.meta.env.PROD) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
};

// Usage examples
const sentryDsn = getEnvVar('VITE_SENTRY_DSN');
const whatsappNumber = getEnvVar('VITE_WHATSAPP_BUSINESS_NUMBER');
```

---

## 📚 TypeScript Configuration Notes

### Strict Mode Benefits

Our `tsconfig.json` enables strict mode for enhanced type safety:

- **`strict: true`**: Enables all strict type checking options
- **`noImplicitAny: true`**: Prevents implicit any types
- **`strictNullChecks: true`**: Ensures null/undefined handling
- **`noImplicitReturns: true`**: Requires explicit return statements

### Vite Integration

- **`moduleResolution: "bundler"`**: Optimized for Vite bundling
- **`allowImportingTsExtensions: true`**: Direct .ts/.tsx imports
- **`isolatedModules: true`**: Better build performance
- **`skipLibCheck: true`**: Faster compilation

---

*Last updated: August 2025 - TypeScript v5.x patterns*
