# Choji.store 🐱

Premium homemade cat food e-commerce landing page built with React, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive single-page design
- WhatsApp integration for easy order placement
- Gradient-based UI with smooth transitions
- Mobile-first design approach
- Advanced TypeScript configuration
- Enhanced accessibility features

## Tech Stack

- React 18.3.1
- TypeScript 5.5.3
- Vite 7.1.0
- Tailwind CSS 3.4.17
- Lucide React 0.344.0
- ESLint 9.9.1
- PostCSS 8.5.6

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

## Project Structure

```
src/
  ├── App.tsx      # Main application component with UI logic
  ├── index.css    # Global styles and Tailwind imports
  └── main.tsx     # Application entry point
```

## Styling

The project uses Tailwind CSS with consistent patterns:

### Common Patterns

```tsx
// Gradient backgrounds
"bg-gradient-to-b from-orange-50 to-green-50"    // Main page gradient
"bg-gradient-to-br from-orange-100 to-green-100" // Card gradients

// Button styles
"bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"

// Responsive layouts
"grid md:grid-cols-2 lg:grid-cols-4 gap-8"      // Grid system
"flex flex-col sm:flex-row gap-4"               // Flex layouts
```

### Color Palette

- Primary: orange-500 (buttons, highlights)
- Secondary: green-500 (accents)
- Backgrounds: white, orange-50, green-50
- Text: gray-800 (headings), gray-600 (body)

## TypeScript Configuration

The project uses advanced TypeScript 5.5.3 configuration with:

- Strict type checking
- No unused locals/parameters
- React JSX transform
- ES2020 target
- Split configuration files for app and node environments

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.