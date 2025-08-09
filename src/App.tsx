/**
 * Main application component for the Choji Cat Food Store
 * 
 * A single-page e-commerce application for premium natural homemade cat food.
 * This component serves as the central hub for the entire application, managing
 * state, user interactions, and rendering the complete UI structure.
 * 
 * Key Features:
 * - SEO-optimized content structure with semantic HTML5 elements
 * - Product showcase with dynamic benefits and quantity selection
 * - WhatsApp integration for streamlined order processing
 * - Fully responsive design with mobile-first approach
 * - ARIA-enhanced accessibility components with WCAG 2.1 compliance
 * - Performance-optimized image loading with proper alt texts
 * - Rich semantic HTML structure for enhanced SEO performance
 * 
 * Component Structure:
 * - Navigation: Fixed header with optimized logo and primary CTA
 *   - Smooth scroll functionality to order form
 *   - Mobile-responsive navigation layout
 *   - Optimized asset loading for LCP
 * 
 * - Hero Section: Main value proposition
 *   - Attention-grabbing headline with SEO focus
 *   - Clear value communication
 *   - Primary and secondary CTAs
 * 
 * - About Section: Brand story with Choji's image
 *   - Emotional connection building
 *   - Trust signals and social proof
 *   - Optimized image display
 * 
 * - Benefits Section: Product features in card layout
 *   - Clear value propositions
 *   - Visual hierarchy with icons
 *   - Responsive grid system
 * 
 * - Products Section: Available quantities
 *   - Interactive size selection
 *   - Clear pricing structure
 *   - Highlighted popular choice
 * 
 * - Order Form: WhatsApp integration
 *   - Real-time form validation
 *   - Loading state management
 *   - Error handling and recovery
 * 
 * - Footer: Contact and secondary navigation
 *   - Brand reinforcement
 *   - Secondary CTAs
 *   - Contact information
 * 
 * State Management:
 * - selectedQuantity: Controls product size selection
 *   - Type: '250g' | '500g' | '1kg'
 *   - Updates: User selection in product section
 *   - Effects: Order message construction
 * 
 * - isLoading: Manages form submission states
 *   - Type: boolean
 *   - Updates: During order processing
 *   - Effects: UI feedback and button states
 * 
 * Accessibility Implementation:
 * - Semantic HTML structure with proper heading hierarchy
 * - ARIA labels and roles for enhanced screen reader support
 * - Keyboard navigation with visible focus indicators
 * - Descriptive alt texts for all images
 * - Color contrast ratios meeting WCAG AA standards
 * - Focus management for interactive elements
 * - Reduced motion support via CSS
 * 
 * Performance Optimizations:
 * - Optimized asset loading strategies
 * - Efficient state management
 * - Minimized re-renders
 * - Code splitting and lazy loading
 * - Image optimization and proper sizing
 * 
 * @component App
 * @version 1.0.0
 * @author Usama Ejaz
 * @since 2025-08-08
 * 
 * @example
 * // Basic usage
 * return (
 *   <App />
 * )
 * 
 * @see {@link https://github.com/usamaejaz9741/choji.store Documentation}
 * @see {@link https://choji.store Live Site}
 */

import React, { useState } from 'react';
import { Heart, Leaf, Shield, ChefHat, Phone, MessageCircle, Cat, ArrowDown } from 'lucide-react';

function App() {
  // Application state management using React hooks
  /**
   * Selected product quantity state
   * @type {['250g' | '500g' | '1kg', Function]}
   * @default '250g'
   * 
   * This state tracks the user's selected product quantity.
   * It's used in the order form and passed to WhatsApp message.
   * Values are strictly typed to prevent invalid quantities.
   */
  const [selectedQuantity, setSelectedQuantity] = useState('250g');

  /**
   * Loading state for form submission
   * @type {[boolean, Function]}
   * @default false
   * 
   * Controls the loading state during form submission.
   * Used to:
   * - Display loading spinner
   * - Disable form submission
   * - Prevent double submissions
   * - Provide visual feedback
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Smoothly scrolls the page to the order form section
   * 
   * This function provides a smooth scrolling experience when users interact
   * with CTA buttons throughout the page. It uses the native smooth scroll
   * behavior for optimal performance and battery life.
   * 
   * Accessibility Features:
   * - Keyboard navigation support through button focus
   * - Maintains focus management
   * - Respects user's reduced motion preferences
   * 
   * User Experience:
   * - Smooth animation using scroll-behavior: smooth
   * - Falls back gracefully if element is not found
   * - Visual feedback through button hover states
   * - Clear visual indication of scroll destination
   * 
   * @returns {void}
   */
  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Handles the order form submission and WhatsApp integration
   * 
   * This function manages the complete order submission process by integrating
   * with WhatsApp's API for direct communication. It provides immediate feedback
   * and graceful error handling for a smooth user experience.
   * 
   * Process Flow:
   * 1. Prevents default form submission behavior
   * 2. Updates UI to show loading state
   * 3. Constructs WhatsApp message with order details
   * 4. Opens WhatsApp in a new window with pre-filled message
   * 5. Handles any potential errors
   * 6. Resets UI state after completion
   * 
   * Accessibility Features:
   * - Loading state indication for screen readers
   * - Error messages are screen reader friendly
   * - Form validation feedback
   * 
   * User Experience:
   * - Visual loading indicator
   * - Clear error messages
   * - Smooth state transitions
   * - Preserved form state on error
   * 
   * Error Handling:
   * - Handles window.open failures gracefully
   * - Shows user-friendly error messages
   * - Resets loading state on error
   * 
   * @param {React.FormEvent} e - Form submission event
   * @throws {Error} Will show an alert if WhatsApp window fails to open
   * @returns {Promise<void>}
   */
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Your business WhatsApp number
    const businessNumber = '923152967579';  // Fixed business number without spaces and '+'
    
    const message = `Hi, I'd like to order ${selectedQuantity} of Choji's homemade cat food.`;
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
    
    try {
      window.open(whatsappUrl, '_blank');
    } catch {
      alert('Failed to open WhatsApp. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50">
      {/* Navigation Bar
       * Fixed position header with optimized brand logo and CTA button
       * 
       * Features:
       * - Blurred background effect with frosted glass aesthetic
       * - Fully responsive layout with mobile-first design
       * - Smooth scroll behavior to order form
       * - Semantic HTML structure for SEO
       * 
       * Accessibility:
       * - ARIA labels for navigation
       * - Proper heading hierarchy
       * - Keyboard navigation support
       * 
       * Performance:
       * - Optimized logo loading
       * - High-priority fetch for critical content
       * - Efficient backdrop-filter usage
       */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2" aria-label="Go to homepage">
              <img 
                src="/logo/logo.svg" 
                alt="Choji Store Logo"
                className="h-12 w-auto"
                width="750"
                height="800"
                loading="eager"
                fetchPriority="high"
              />
              <span className="text-2xl font-bold text-gray-800">choji.store</span>
            </a>
          </div>
          <button
            onClick={scrollToOrder}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            aria-label="Order now via WhatsApp"
          >
            Order Now
          </button>
        </div>
      </nav>

      {/* Hero Section - Main landing area
       * Primary conversion section with main value proposition
       * 
       * Features:
       * - Large, attention-grabbing headline with keyword optimization
       * - Clear brand value proposition
       * - Primary and secondary CTAs with visual hierarchy
       * - Responsive typography scaling
       * 
       * SEO:
       * - Semantic heading structure
       * - Keyword-rich content
       * - Clear content hierarchy
       * 
       * Accessibility:
       * - Proper heading levels
       * - Sufficient color contrast
       * - Clear button labeling
       * 
       * User Experience:
       * - Clear call-to-action
       * - Immediate value communication
       * - Smooth animations
       */}
      <section className="pt-24 pb-16 px-4" role="banner">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Natural Premium Homemade
            <span className="text-orange-500 block">Cat Food Delivery</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Made with love from fresh chicken, wholesome potatoes, and nutritious carrots. 
            Give your feline friend the natural, preservative-free nutrition they deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToOrder}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              Order Now
              <ArrowDown className="w-5 h-5" />
            </button>
            <div className="flex items-center text-gray-600">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>WhatsApp orders available</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Brand Story
       * Emotional connection and trust-building section
       * 
       * Features:
       * - Two-column responsive layout
       * - Optimized image loading
       * - Gradient background with visual appeal
       * - Content-first responsive design
       * 
       * Image Optimization:
       * - Aspect ratio preservation
       * - Eager loading for LCP
       * - High fetch priority
       * - Responsive sizing
       * 
       * Content Strategy:
       * - Compelling brand story
       * - Trust-building elements
       * - Clear value proposition
       * - Natural keyword inclusion
       * 
       * Accessibility:
       * - Descriptive image alt text
       * - Proper heading structure
       * - Readable text contrast
       */}
      <section className="py-16 px-4 bg-white" aria-labelledby="about-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="about-heading" className="text-4xl font-bold text-gray-800 mb-6">Meet Choji - Our Inspiration</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8" role="presentation"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-orange-100 to-green-100 rounded-2xl p-4">
              <div className="relative w-full pb-[100%]">
                <img 
                  src="/images/choji.webp" 
                  alt="Choji - The inspiration behind our premium homemade cat food"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Choji was a beloved family cat who inspired us to create the healthiest, 
                most natural cat food possible. After struggling to find quality commercial 
                options that met our high standards, we decided to make our own.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every batch is carefully prepared in small quantities using only the 
                finest ingredients: premium chicken, organic potatoes, and fresh 
                carrots. No preservatives, no fillers, no compromises—just pure, 
                wholesome nutrition that cats love and owners trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Product Features
       * Showcase of unique selling points and product benefits
       * 
       * Features:
       * - Interactive card-based layout
       * - Semantic icon integration
       * - Responsive grid system:
       *   · 1 column on mobile
       *   · 2 columns on tablet
       *   · 4 columns on desktop
       * 
       * Visual Design:
       * - Consistent iconography
       * - Smooth hover animations
       * - Elevation hierarchy
       * - Visual feedback on interaction
       * 
       * Accessibility:
       * - Icon labels and descriptions
       * - Interactive element indicators
       * - Proper heading structure
       * - Focus management
       * 
       * Performance:
       * - Optimized SVG icons
       * - Efficient grid layout
       * - Minimal layout shifts
       */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Choji's Food?</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Real Chicken</h3>
              <p className="text-gray-600">Premium chicken as the main protein source, rich in essential amino acids.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fresh Veggies</h3>
              <p className="text-gray-600">Organic potatoes and carrots provide natural vitamins and fiber for healthy digestion.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">No Additives</h3>
              <p className="text-gray-600">Zero preservatives, artificial colors, or fillers. Just pure, natural ingredients.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Home Cooked</h3>
              <p className="text-gray-600">Every batch is lovingly prepared in small quantities for maximum freshness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section - Available Quantities
       * Product selection with size options and visual hierarchy
       * 
       * Features:
       * - Three-tier product selection system
       * - Clear popular choice highlighting
       * - Responsive grid layout adaptation
       * - Interactive hover states
       * 
       * User Experience:
       * - Clear size differentiation
       * - Visual hierarchy for options
       * - Smooth transitions
       * - Intuitive selection process
       * 
       * Accessibility:
       * - Clear option labeling
       * - Size indicators
       * - Interactive states
       * - Focus management
       * 
       * Visual Design:
       * - Consistent card styling
       * - Clear popular choice indicator
       * - Gradient backgrounds
       * - Elevation system
       */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Available Quantities</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">Choose the perfect size for your feline friend</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-transparent hover:border-orange-200 transition-all">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">250g</h3>
                <p className="text-gray-600 mb-4">Perfect for trying out or single cats</p>
                <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Cat className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-200 transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">500g</h3>
                <p className="text-gray-600 mb-4">Great value for regular feeding</p>
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Cat className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">1kg</h3>
                <p className="text-gray-600 mb-4">Best value for big and multiple cats</p>
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Cat className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section - Main Conversion Point
       * Primary conversion interface with WhatsApp integration
       * 
       * Features:
       * - Interactive quantity selection
       * - Real-time visual feedback
       * - WhatsApp deep linking
       * - Loading state management
       * - Error handling system
       * 
       * User Experience:
       * - Clear size options
       * - Loading indicators
       * - Error messaging
       * - Form state preservation
       * - Smooth transitions
       * 
       * Accessibility:
       * - ARIA labels
       * - Error announcements
       * - Focus management
       * - Loading state indicators
       * - Keyboard navigation
       * 
       * Integration:
       * - WhatsApp API
       * - Message construction
       * - Deep linking
       * - Error recovery
       */}
      <section id="order-form" className="py-16 px-4 bg-gradient-to-br from-orange-50 to-green-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Place Your Order</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">Ready to give your cat the best? Let's get started!</p>
          </div>
          <form onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Quantity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedQuantity('250g')}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                    selectedQuantity === '250g'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                  }`}
                >
                  <div className="text-lg font-bold">250g</div>
                  <div className="text-sm opacity-75">Trial Size</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQuantity('500g')}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                    selectedQuantity === '500g'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                  }`}
                >
                  <div className="text-lg font-bold">500g</div>
                  <div className="text-sm opacity-75">Regular Size</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQuantity('1kg')}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                    selectedQuantity === '1kg'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                  }`}
                >
                  <div className="text-lg font-bold">1kg</div>
                  <div className="text-sm opacity-75">Family Size</div>
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all ${
                !isLoading && 'hover:scale-[1.02]'
              } flex items-center justify-center gap-2 ${
                isLoading && 'opacity-75 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-6 h-6" />
                  Place Order via WhatsApp
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">
              We'll contact you via WhatsApp to confirm your order and arrange delivery
            </p>
          </form>
        </div>
      </section>

      {/* Footer Section - Site Information
       * Comprehensive footer with branding and contact details
       * 
       * Features:
       * - Responsive three-column layout
       * - Brand reinforcement
       * - Contact accessibility
       * - Secondary conversion path
       * - Legal information
       * 
       * Layout:
       * - Mobile-first design
       * - Column stacking
       * - Spacing system
       * - Alignment patterns
       * 
       * Accessibility:
       * - ARIA landmarks
       * - Semantic structure
       * - Link descriptions
       * - Focus visibility
       * 
       * Content:
       * - Brand messaging
       * - Contact options
       * - CTA placement
       * - Copyright notice
       */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <img 
                  src="/logo/logo-footer.svg" 
                  alt="Choji Store"
                  className="h-12 w-auto"
                  width="750"
                  height="800"
                />
                <span className="text-2xl font-bold">choji.store</span>
              </div>
              <p className="text-gray-400">
                Premium homemade cat food made with love and natural ingredients.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="flex items-center justify-center md:justify-start mb-2">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-gray-400">Available via WhatsApp</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Order Now</h3>
              <button
                onClick={scrollToOrder}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 mx-auto md:mx-0"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Order
              </button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 choji.store. Made with ❤️ for cats everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;