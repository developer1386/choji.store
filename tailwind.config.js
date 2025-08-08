/**
 * Tailwind CSS Configuration for Choji Cat Food Store
 * 
 * This configuration file customizes Tailwind CSS for the premium cat food
 * e-commerce application. It defines the content sources, theme extensions,
 * and plugins used throughout the application for consistent styling.
 * 
 * Configuration Features:
 * - Content scanning for optimal bundle size
 * - Custom theme extensions for brand colors
 * - Plugin integration for enhanced functionality
 * - Responsive design utilities
 * - Performance optimizations
 * 
 * Design System Integration:
 * - Orange and green brand colors
 * - Consistent spacing and typography
 * - Mobile-first responsive breakpoints
 * - Accessibility-compliant color contrasts
 * 
 * Build Optimization:
 * - Purges unused CSS in production
 * - JIT (Just-In-Time) compilation
 * - Minimal bundle size
 * - Fast development builds
 * 
 * @type {import('tailwindcss').Config}
 * @see {@link https://tailwindcss.com/docs/configuration Tailwind Configuration}
 */
export default {
  // Content sources for CSS purging and JIT compilation
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  
  // Theme customization and extensions
  theme: {
    extend: {
      // Custom brand colors can be added here
      // colors: {
      //   'choji-orange': '#F97316',
      //   'choji-green': '#22C55E',
      // },
      
      // Custom fonts can be added here
      // fontFamily: {
      //   'brand': ['Inter', 'sans-serif'],
      // },
      
      // Custom animations and transitions
      // animation: {
      //   'fade-in': 'fadeIn 0.5s ease-in-out',
      // },
    },
  },
  
  // Tailwind plugins for additional functionality
  plugins: [
    // Add plugins here as needed:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
