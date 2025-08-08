# AI Agent Instructions for choji.store

## Project Overview
This is a React + TypeScript e-commerce landing page for premium natural homemade cat food, built with Vite and styled with Tailwind CSS. The site features a SEO-optimized single-page design with WhatsApp integration for order placement, enhanced accessibility features, and optimized performance.

## Key Technologies
- React 18.3.1 with TypeScript 5.5.3
- Vite 7.1.0 for build tooling
- Tailwind CSS 3.4.17 for styling
- Lucide React 0.344.0 for icons
- ESLint 9.9.1 for code quality
- PostCSS 8.5.6 for CSS processing

## Project Structure
```
├── public/
│   ├── logo/           # Logo assets (SVG, PNG)
│   │   ├── logo.svg          # Main logo
│   │   └── logo-footer.svg   # Footer variant
│   ├── images/         # Content images
│   │   └── choji.jpg        # Hero image
│   └── favicon/        # Favicon assets
│       ├── favicon.svg
│       ├── favicon.ico
│       └── site.webmanifest
├── src/
│   ├── App.tsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.tsx       # Entry point
└── ...config files    # TypeScript, ESLint, etc.
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

### SEO Implementation
- Semantic HTML structure with proper heading hierarchy
- Meta tags optimization for search engines and social sharing:
  ```html
  <meta name="description" content="Premium homemade cat food made with fresh chicken, potatoes, and carrots." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Premium Natural Homemade Cat Food | Fresh Ingredients" />
  <meta name="twitter:card" content="summary_large_image" />
  ```
- Canonical URLs and proper meta tags
- Rich content structure for better SEO ranking

### Accessibility Features
- ARIA attributes and roles:
  ```tsx
  role="navigation"
  aria-label="Main navigation"
  aria-labelledby="about-heading"
  ```
- Keyboard navigation support
- Screen reader optimizations
- Color contrast compliance
- Focus management
- Reduced motion support

### State Management
- Local React state using `useState` hooks for form handling
- Loading states for better UX:
  ```tsx
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState('250g');
  ```
- Form validation and error handling

### Design System
```tsx
// Typography Scale
"text-5xl md:text-6xl"  // Hero headings
"text-4xl"              // Section headings
"text-2xl"              // Subsection headings
"text-lg"               // Body large

// Spacing System
"px-4 py-16"           // Section padding
"gap-8"                // Grid gaps
"space-x-2"            // Inline spacing

// Interactive Elements
"hover:scale-105"      // Hover animations
"transition-colors"     // Color transitions
"shadow-lg hover:shadow-xl" // Elevation changes

// Color System
Primary:
- Orange: orange-500 (#F97316)
- Green: green-500 (#22C55E)

Neutrals:
- Headings: gray-800 (#1F2937)
- Body: gray-600 (#4B5563)
- Subtle: gray-400 (#9CA3AF)

Backgrounds:
- White: white (#FFFFFF)
- Light Orange: orange-50 (#FFF7ED)
- Light Green: green-50 (#F0FDF4)
```

### Component Architecture
- Single page application with semantic sections:
  ```tsx
  <nav role="navigation" aria-label="Main navigation">
  <section role="banner">
  <section aria-labelledby="about-heading">
  ```
- Responsive image handling:
  ```tsx
  <img 
    src="/images/choji.jpg"
    alt="Choji - The inspiration behind our premium homemade cat food"
    loading="eager"
    fetchPriority="high"
    className="w-full h-full object-cover"
  />
  ```
- Performance-optimized assets

### WhatsApp Integration and Form Handling
- Accessible form structure with proper ARIA attributes
- Loading states and error handling:
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
- Visual feedback for user actions:
  ```tsx
  <button
    type="submit"
    disabled={isLoading}
    className={\`...$\{
      isLoading && 'opacity-75 cursor-not-allowed'
    }\`}
  >
    {isLoading ? 'Processing...' : 'Place Order via WhatsApp'}
  </button>
  ```

### Performance Optimization
- Image optimization:
  - Proper sizing and formats
  - Lazy loading where appropriate
  - High priority loading for critical images
- Bundle optimization:
  - Modern ES modules
  - Code splitting
  - Tree shaking
- Resource hints:
  - Preload critical assets
  - Preconnect to required origins

### TypeScript Configuration
- Advanced TypeScript 5.5.3 configuration:
  ```json
  {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx",
    "target": "ES2020",
    "module": "ESNext"
  }
  ```
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
- Automated accessibility checks using ESLint rules

### Accessibility Best Practices
- Use semantic HTML elements for better screen reader support
- Maintain proper heading hierarchy (h1 -> h2 -> h3)
- Provide alt text for all images
- Ensure sufficient color contrast (WCAG 2.1 compliant)
- Implement keyboard navigation support
- Use ARIA attributes when necessary

### Performance Optimization
- Lazy loading of images using native loading="lazy"
- Component code splitting for better initial load time
- Tailwind's JIT mode for minimal CSS bundle size
- Asset optimization using Vite's built-in features
- Responsive image handling for different device sizes

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
  - Asset optimization and bundling
  - Development server with HTTPS support
- Browser DevTools
  - React DevTools for component inspection
  - Network tab for WhatsApp API debugging
  - Lighthouse for performance auditing
  - Elements panel for style debugging
- VS Code Extensions
  - Tailwind CSS IntelliSense for class suggestions
  - ESLint for real-time linting
  - TypeScript for type checking
  - Prettier for code formatting
  - GitHub Copilot for AI-assisted development
  - Error Lens for inline error display

### Environment Setup
- Node.js 18.x or later recommended
- npm 9.x or later for package management
- Git for version control
- VS Code as the recommended IDE
- Chrome or Firefox for development
