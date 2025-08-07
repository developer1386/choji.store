# AI Agent Instructions for choji.store

## Project Overview
This is a React + TypeScript e-commerce landing page for premium homemade cat food, built with Vite and styled with Tailwind CSS. The site features a simple, single-page design with WhatsApp integration for order placement.

## Key Technologies
- React 18.3.1 with TypeScript 5.5.3
- Vite 7.1.0 for build tooling
- Tailwind CSS 3.4.1 for styling
- Lucide React 0.344.0 for icons

## Project Structure
```
src/
  App.tsx      # Main application component with all UI logic
  index.css    # Global styles and Tailwind imports
  main.tsx     # Application entry point
```

## Development Workflow

### Getting Started
```bash
npm install    # Install dependencies
npm run dev    # Start development server
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Key Patterns and Conventions

### State Management
- Local React state using `useState` hooks for form handling
- State is contained within the `App.tsx` component

### Styling
- Tailwind CSS classes for all styling with consistent patterns:
  ```tsx
  // Gradient backgrounds
  "bg-gradient-to-b from-orange-50 to-green-50"    // Main page gradient
  "bg-gradient-to-br from-orange-100 to-green-100" // Card gradients
  
  // Common button styles
  "bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
  
  // Responsive layouts
  "grid md:grid-cols-2 lg:grid-cols-4 gap-8"      // Responsive grid system
  "flex flex-col sm:flex-row gap-4"               // Stack on mobile, row on desktop
  
  // Common UI elements
  "shadow-lg hover:shadow-xl transition-shadow"    // Interactive cards
  "w-24 h-1 bg-orange-500 mx-auto mb-8"          // Section dividers
  ```
- Color palette:
  - Primary: orange-500 (buttons, highlights)
  - Secondary: green-500 (accents)
  - Backgrounds: white, orange-50, green-50
  - Text: gray-800 (headings), gray-600 (body)

### Component Architecture
- Single page application with all logic in `App.tsx`
- Sections are organized as nested components within `App.tsx`
- UI components use Lucide React icons

### Form Handling and WhatsApp Integration
- WhatsApp integration implemented in `App.tsx`:
  ```tsx
  // Phone number validation
  if (!whatsappNumber) {
    alert('Please enter your WhatsApp number');
    return;
  }
  
  // Message construction
  const message = `Hi, I'd like to order ${selectedQuantity} of Choji's homemade cat food.`;
  
  // WhatsApp deep linking
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  ```
- Form state managed with React hooks:
  ```tsx
  const [selectedQuantity, setSelectedQuantity] = useState('250g');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  ```
- Phone numbers are stripped of non-digits before URL construction
- Messages are URL-encoded for proper WhatsApp deep linking

### TypeScript Configuration
- Advanced TypeScript 5.5.3 configuration with enhanced type checking:
  ```json
  {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
  ```
- Modern features enabled:
  - Target: ES2020
  - React JSX transform
  - Bundler-mode module resolution
- Split configuration:
  - `tsconfig.json`: Root config with references
  - `tsconfig.app.json`: App-specific settings
  - `tsconfig.node.json`: Node.js build settings

### Constants and Configuration
- Configuration is managed through `vite.config.ts`
- Lucide React is excluded from dependency optimization

## Integration Points
- WhatsApp API for order messaging
- Links are constructed using `wa.me` URLs with encoded parameters

## Testing and Quality
- ESLint for code quality (configuration in `eslint.config.js`)
- TypeScript for type safety

## Debugging Workflows

### Common Development Issues
1. WhatsApp Integration
   - Test with different phone number formats
   - Check URL encoding of special characters in messages
   - Verify WhatsApp deep link construction in browser console

2. Style Issues
   - Use browser dev tools to inspect Tailwind classes
   - Check responsive breakpoints with browser device toolbar
   - Verify gradient overlays and transitions

3. TypeScript Errors
   - Check component prop types
   - Verify event handler type definitions
   - Run `npm run lint` to catch type issues

### Development Tools
- Vite Dev Server: `npm run dev`
  - Hot Module Replacement (HMR)
  - Fast refresh for React components
- Browser DevTools
  - React DevTools for component inspection
  - Network tab for WhatsApp API debugging
- VS Code Extensions
  - Tailwind CSS IntelliSense
  - ESLint
  - TypeScript support
