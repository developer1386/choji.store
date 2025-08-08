# Choji.store 🐱

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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Choji - The inspiration behind this project
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)

## License

This project is open source and available under the MIT License.