/**
 * Main application component for the Choji Cat Food Store
 * A single-page e-commerce application for premium homemade cat food
 * Features include product showcase, quantity selection, and WhatsApp integration for orders
 */

import React, { useState } from 'react';
import { Heart, Leaf, Shield, ChefHat, Phone, MessageCircle, Cat, ArrowDown } from 'lucide-react';

function App() {
  // State for managing order form
  const [selectedQuantity, setSelectedQuantity] = useState('250g');  // Track selected product quantity
  const [whatsappNumber, setWhatsappNumber] = useState('');         // Store customer's WhatsApp number
  const [isLoading, setIsLoading] = useState(false);                // Loading state for form submission

  /**
   * Smoothly scrolls the page to the order form section
   * Used by various CTA buttons throughout the page
   */
  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Validates the provided phone number
   * @param number - The phone number to validate
   * @returns boolean - True if number is valid (10-15 digits), false otherwise
   */
  const validatePhoneNumber = (number: string) => {
    const cleanNumber = number.replace(/\D/g, ''); // Remove all non-digit characters
    return cleanNumber.length >= 10 && cleanNumber.length <= 15;
  };

  /**
   * Handles the order form submission
   * Validates phone number, constructs WhatsApp message, and opens WhatsApp chat
   * @param e - Form submission event
   */
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!whatsappNumber) {
      alert('Please enter your WhatsApp number');
      setIsLoading(false);
      return;
    }

    if (!validatePhoneNumber(whatsappNumber)) {
      alert('Please enter a valid phone number (10-15 digits)');
      setIsLoading(false);
      return;
    }
    
    const message = `Hi, I'd like to order ${selectedQuantity} of Choji's homemade cat food.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    try {
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      alert('Failed to open WhatsApp. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50">
      {/* Navigation Bar
       * Fixed position header with brand logo and CTA button
       * Features:
       * - Blurred background effect
       * - Responsive layout
       * - Smooth scroll to order form
       */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cat className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-800">choji.store</span>
          </div>
          <button
            onClick={scrollToOrder}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Order Now
          </button>
        </div>
      </nav>

      {/* Hero Section - Main landing area
       * Features:
       * - Large, attention-grabbing headline
       * - Brand value proposition
       * - Primary and secondary CTAs
       */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Premium Homemade
            <span className="text-orange-500 block">Cat Food</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Made with love from fresh chicken, wholesome potatoes, and nutritious carrots. 
            Give your feline friend the natural nutrition they deserve.
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

      {/* About Section 
       * Brand story and value proposition
       * Features:
       * - Two-column layout on desktop
       * - Gradient background illustration
       * - Responsive text layout
       */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Choji</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-orange-100 to-green-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <Cat className="w-32 h-32 text-orange-500" />
            </div>
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Choji was a beloved family cat who inspired us to create the healthiest, 
                most natural cat food possible. After struggling to find quality commercial 
                options that met our high standards, we decided to make our own.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every batch is carefully prepared in small quantities using only the 
                finest ingredients: premium chicken breast, organic potatoes, and fresh 
                carrots. No preservatives, no fillers, no compromises—just pure, 
                wholesome nutrition that cats love and owners trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section
       * Product features and unique selling points
       * Features:
       * - Card-based layout with icons
       * - Hover animations
       * - Responsive grid system (1 column mobile, 2 tablet, 4 desktop)
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
              <p className="text-gray-600">Premium chicken breast as the main protein source, rich in essential amino acids.</p>
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

      {/* Product Section
       * Available product quantities and pricing options
       * Features:
       * - Three-tier product selection
       * - Highlighted popular choice
       * - Responsive grid layout
       * - Hover effects and transitions
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
                <p className="text-gray-600 mb-4">Best value for multiple cats</p>
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Cat className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section
       * Main conversion point with WhatsApp integration
       * Features:
       * - Quantity selection with visual feedback
       * - Phone number validation
       * - Loading states
       * - WhatsApp deep linking
       * - Form validation and error handling
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
            <div className="mb-6">
              <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-3">
                WhatsApp Number
              </label>
              <input
                type="tel"
                id="whatsapp"
                value={whatsappNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow digits, +, and spaces
                  const cleaned = value.replace(/[^\d\s+]/g, '');
                  // Limit to 15 characters
                  const truncated = cleaned.slice(0, 15);
                  setWhatsappNumber(truncated);
                }}
                placeholder="e.g., +1234567890"
                className={`w-full p-4 border-2 rounded-xl focus:outline-none text-lg transition-colors ${
                  whatsappNumber && !validatePhoneNumber(whatsappNumber)
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 focus:border-orange-500'
                }`}
                required
                pattern="[+\d\s]{10,15}"
                title="Please enter a valid phone number with 10-15 digits"
              />
              {whatsappNumber && !validatePhoneNumber(whatsappNumber) && (
                <p className="mt-2 text-sm text-red-600">
                  Please enter a valid phone number (10-15 digits)
                </p>
              )}
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

      {/* Footer Section
       * Site footer with branding and contact information
       * Features:
       * - Responsive three-column layout
       * - Brand information
       * - Contact details
       * - Secondary CTA
       * - Copyright notice
       */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <Cat className="w-8 h-8 text-orange-500" />
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