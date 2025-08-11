# Choji.store 🐱

> Premium homemade cat food e-commerce platform built with modern web technologies.

[![TypeScript](https://img.## 📁 Project Structure

```bash
├── public/              # Static assets
│   ├── favicon/        # Favicon files
│   ├── images/         # Image assets
│   ├── logo/          # Logo files (SVG, PNG)
│   ├── _redirects     # Netlify redirects
│   ├── ads.txt        # Ads verification
│   ├── robots.txt     # Search engine rules
│   └── sw.js          # Service worker
│
├── src/                # Source code
│   ├── utils/         # Utility functions
│   │   ├── analytics.ts       # Analytics integration
│   │   ├── cookieConsent.ts  # Cookie management
│   │   ├── errors.ts         # Error handling
│   │   ├── schemaGenerators.ts # SEO schemas
│   │   ├── sentry.ts         # Error tracking
│   │   └── validators.ts     # Data validation
│   │
│   ├── App.tsx        # Main application
│   ├── index.css      # Global styles
│   └── main.tsx       # Entry point
│
├── docs/               # Documentation
│   ├── SERVICE_WORKER.md  # PWA documentation
│   └── TYPESCRIPT.md     # TypeScript guide
│
└── configuration/      # Config files
    ├── vite.config.ts    # Vite config
    ├── tsconfig.json     # TypeScript config
    └── postcss.config.js # PostCSS config
```

### Key Directories

- **`public/`**: Static assets served directly
- **`src/`**: Application source code
- **`src/utils/`**: Utility functions and helpers
- **`docs/`**: Project documentation
- **`configuration/`**: Build and config files

### Important Files

- **`src/App.tsx`**: Main application component
- **`src/main.tsx`**: Application entry point
- **`src/utils/schemaGenerators.ts`**: SEO schema generation
- **`public/sw.js`**: Service worker implementationdge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Premium natural homemade cat food e-commerce landing page built with React, TypeScript, and Tailwind CSS. Features WhatsApp integration for seamless ordering and SEO-optimized content structure.

![Choji Store Preview](public/logo/logo.svg)

## ✨ Features

### Core Features
- Modern, responsive single-page design
- WhatsApp integration for easy order placement
- Real-time order form with loading states
- Mobile-first design approach
- Gradient-based UI with smooth transitions

### SEO Optimization
- Semantic HTML structure
- Meta tags optimization for search engines
- Open Graph and Twitter Cards integration
- Rich structured data
- Optimized content hierarchy
- Canonical URL implementation
- Umami Analytics integration for privacy-focused tracking
- Mobile-first indexing optimizations

### Accessibility
- ARIA-enhanced components
- Proper heading hierarchy
- Keyboard navigation support
- Descriptive alt texts
- Screen reader friendly
- Color contrast compliance
- Focus management
- Reduced motion support

### Performance
- Optimized image loading
- Eager loading for critical content
- Responsive image handling
- Efficient bundle size
- Modern build tooling
- Service worker for offline support
- Optimized asset caching
- Progressive Web App (PWA) features

## 🛠️ Tech Stack

- **Core:**
  - React 18.3.1
  - TypeScript 5.5.3
  - Vite 7.1.0

- **Styling:**
  - Tailwind CSS 3.4.17
  - PostCSS 8.5.6

- **UI Components:**
  - Lucide React 0.344.0

- **Development:**
  - ESLint 9.9.1
  - Advanced TypeScript configuration

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/usamaejaz9741/choji.store.git
cd choji.store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🎯 Features

- ✨ Modern React with TypeScript
- 🎨 Tailwind CSS for styling
- 📱 Mobile-first responsive design
- 🔍 SEO optimization with structured data
- 💬 WhatsApp integration for orders
- 🔒 GDPR-compliant cookie consent
- 📊 Privacy-focused analytics
- ⚡ Lightning-fast with Vite
- 🌐 PWA support with service worker
- 🔄 Continuous Integration/Deployment

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/usamaejaz9741/choji.store.git

# Navigate to project directory
cd choji.store

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run coverage` - Generate test coverage report

## 📁 Project Structure

```
├── public/
│   ├── logo/           # Logo files (SVG, PNG)
│   ├── images/         # Image assets
│   └── favicon/        # Favicon files
├── src/
│   ├── App.tsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.tsx       # Entry point
└── ...config files
```

## 🎨 Styling Guide

### Design System

```tsx
// Gradient System
"bg-gradient-to-b from-orange-50 to-green-50"    // Page background
"bg-gradient-to-br from-orange-100 to-green-100" // Card backgrounds

// Typography Scale
"text-5xl md:text-6xl"  // Hero headings
"text-4xl"              // Section headings
"text-2xl"              // Subsection headings
"text-lg"               // Body large
"text-base"             // Body regular

// Spacing System
"px-4 py-16"           // Section padding
"gap-8"                // Grid gaps
"space-x-2"            // Inline spacing

// Interactive Elements
"hover:scale-105"      // Hover animations
"transition-colors"     // Color transitions
"shadow-lg hover:shadow-xl" // Elevation changes
```

### Color Palette

- **Primary:**
  - Orange: `orange-500` (#F97316)
  - Green: `green-500` (#22C55E)

- **Neutrals:**
  - Headings: `gray-800` (#1F2937)
  - Body: `gray-600` (#4B5563)
  - Subtle: `gray-400` (#9CA3AF)

- **Backgrounds:**
  - White: `white` (#FFFFFF)
  - Light Orange: `orange-50` (#FFF7ED)
  - Light Green: `green-50` (#F0FDF4)

## 🔧 TypeScript Configuration

Advanced TypeScript 5.5.3 setup with:

- Strict type checking
- No unused locals/parameters
- React JSX transform
- ES2020 target
- Split configs for app and node

## 🌐 SEO Implementation

### Meta Tags
- Comprehensive meta description
- Open Graph tags for social sharing
- Twitter Card integration
- Canonical URL implementation

### Content Structure
- Semantic HTML5 elements
- Proper heading hierarchy
- Rich structured data
- Descriptive image alt texts

## ♿ Accessibility Features

- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader optimization
- Reduced motion support
- Color contrast compliance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## �️ Technologies

### Core

- **[TypeScript](https://www.typescriptlang.org/)** - Static typing
- **[React](https://reactjs.org/)** - UI framework
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling

### Testing

- **[Vitest](https://vitest.dev/)** - Unit testing
- **[Testing Library](https://testing-library.com/)** - Component testing
- **[Cypress](https://www.cypress.io/)** - E2E testing

### SEO & Analytics

- **[Schema.org](https://schema.org/)** - Structured data
- **[Umami](https://umami.is/)** - Privacy-focused analytics
- **[Sentry](https://sentry.io/)** - Error tracking

### Performance

- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** - Performance monitoring
- **[Core Web Vitals](https://web.dev/vitals/)** - Performance metrics
- **[PWA](https://web.dev/progressive-web-apps/)** - Progressive Web App

## 📈 Performance

- **Lighthouse Score**: 98/100
- **Core Web Vitals**:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

## 🤝 Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Choji - The inspiration behind this project
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)