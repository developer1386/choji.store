/**
 * PostCSS Configuration for Choji Cat Food Store
 * 
 * This configuration file sets up PostCSS processing for the application's
 * CSS pipeline. It integrates Tailwind CSS and Autoprefixer to provide
 * modern CSS features with optimal browser compatibility.
 * 
 * Plugin Configuration:
 * - Tailwind CSS: Utility-first CSS framework integration
 * - Autoprefixer: Automatic vendor prefix addition for browser compatibility
 * 
 * Processing Pipeline:
 * 1. Tailwind CSS processes utility classes and generates CSS
 * 2. Autoprefixer adds vendor prefixes for cross-browser support
 * 3. Final CSS is optimized and minified for production
 * 
 * Browser Support:
 * - Modern browsers with automatic fallbacks
 * - Legacy browser compatibility via autoprefixer
 * - Mobile-first responsive design support
 * 
 * @see {@link https://postcss.org/ PostCSS Documentation}
 * @see {@link https://tailwindcss.com/docs/using-with-preprocessors Tailwind with PostCSS}
 * @see {@link https://autoprefixer.github.io/ Autoprefixer Documentation}
 */
export default {
  plugins: {
    // Tailwind CSS utility framework
    tailwindcss: {},
    
    // Automatic vendor prefixing for browser compatibility
    autoprefixer: {},
  },
};
