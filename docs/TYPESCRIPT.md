# TypeScript Code Examples

This document provides TypeScript code examples for common patterns used in the Choji Store application.

## Form Event Handling

```tsx
const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const message = `Hi, I'd like to order ${selectedQuantity} of Choji's homemade cat food.`;
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  } catch {
    alert('Failed to open WhatsApp. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

## State Management

```tsx
// Product quantity state
const [selectedQuantity, setSelectedQuantity] = useState<'250g' | '500g' | '1kg'>('250g');

// Loading state
const [isLoading, setIsLoading] = useState<boolean>(false);
```

## Event Handlers with TypeScript

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

```tsx
const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

const trySendOrder = async (order: WhatsAppOrder): Promise<void> => {
  try {
    // API call or WhatsApp link generation
  } catch (error) {
    const errorMessage = handleApiError(error);
    alert(errorMessage);
  }
};
```
