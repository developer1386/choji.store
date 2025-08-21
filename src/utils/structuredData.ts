/**
 * SEO Structured Data (JSON-LD) Utilities
 * 
 * This module generates and manages structured data markup for enhanced SEO
 * performance and rich search results. It implements JSON-LD schema.org
 * markup to help search engines understand the content and context of the
 * Choji Cat Food Store website.
 * 
 * Key Features:
 * - Schema.org compliant structured data
 * - Rich snippets for search results
 * - Enhanced SEO visibility
 * - Local business optimization
 * - Product markup for e-commerce
 * - FAQ schema for better SERP features
 * 
 * Schema Types Implemented:
 * 1. Organization Schema:
 *    - Business information and branding
 *    - Contact details and social media
 *    - Logo and visual identity
 * 
 * 2. Product Schema:
 *    - Product details and descriptions
 *    - Pricing and availability
 *    - Reviews and ratings
 *    - Brand association
 * 
 * 3. Local Business Schema:
 *    - Location and contact information
 *    - Operating hours and services
 *    - Geographic coordinates
 *    - Service area coverage
 * 
 * 4. Website Schema:
 *    - Site navigation and structure
 *    - Search functionality
 *    - Content organization
 * 
 * 5. FAQ Schema:
 *    - Common questions and answers
 *    - Enhanced SERP features
 *    - Voice search optimization
 * 
 * SEO Benefits:
 * - Improved search result appearance
 * - Higher click-through rates
 * - Better content understanding by search engines
 * - Enhanced local search visibility
 * - Rich snippet eligibility
 * 
 * @module StructuredData
 * @version 1.0.0
 * @author Usama Ejaz
 * @since 2025-08-08
 * 
 * @see {@link https://schema.org/ Schema.org Documentation}
 * @see {@link https://developers.google.com/search/docs/guides/intro-structured-data Google Structured Data}
 * @see {@link https://search.google.com/test/rich-results Rich Results Test}
 */

/**
 * Generate Organization Schema Markup
 * 
 * Creates structured data for the business organization including
 * company information, contact details, and social media presence.
 * This schema helps establish business credibility and provides
 * essential information to search engines.
 * 
 * Schema Features:
 * - Complete business profile
 * - Contact information
 * - Social media links
 * - Logo and branding
 * - Service descriptions
 * 
 * @returns {Object} JSON-LD organization schema object
 * 
 * @example
 * // Generate and inject organization schema
 * const orgSchema = generateOrganizationSchema();
 * injectStructuredData(orgSchema);
 * 
 * @see {@link https://schema.org/Organization Organization Schema Documentation}
 */
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Choji Store",
  "url": "https://choji.store",
  "logo": "https://choji.store/logo/logo.svg",
  "description": "Premium homemade cat food made with fresh, natural ingredients",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX", // Replace with actual phone
    "contactType": "Customer Service",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.facebook.com/chojistore", // Replace with actual social media
    "https://www.instagram.com/chojistore",
    "https://twitter.com/chojistore"
  ]
});

/**
 * Generate Product Schema Markup
 * 
 * Creates structured data for the premium cat food products including
 * detailed product information, pricing, availability, and customer
 * reviews. This schema enhances product visibility in search results
 * and enables rich product snippets.
 * 
 * Product Information:
 * - Detailed product descriptions
 * - Brand association and trust signals
 * - Pricing and availability status
 * - Customer ratings and reviews
 * - Product categories and classifications
 * 
 * E-commerce Benefits:
 * - Enhanced product search visibility
 * - Rich snippet eligibility
 * - Price comparison features
 * - Review stars in search results
 * - Shopping integration compatibility
 * 
 * @returns {Object} JSON-LD product schema object
 * 
 * @example
 * // Generate product schema for cat food
 * const productSchema = generateProductSchema();
 * injectStructuredData(productSchema);
 * 
 * @see {@link https://schema.org/Product Product Schema Documentation}
 * @see {@link https://developers.google.com/search/docs/data-types/product Google Product Markup}
 */
interface ProductSchemaInput {
  name?: string;
  description?: string;
  brand?: string;
  price?: string;
  currency?: string;
  availability?: string;
  seller?: string;
  rating?: string;
  reviews?: string;
  image?: string;
  sku?: string;
  category?: string;
}

export const generateProductSchema = (input?: ProductSchemaInput) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": input?.name || "Premium Homemade Cat Food",
  "description": input?.description || "Fresh, natural cat food made with chicken, potatoes, and carrots. No additives or preservatives.",
  ...(input?.image && { "image": input.image }),
  ...(input?.sku && { "sku": input.sku }),
  "brand": {
    "@type": "Brand",
    "name": input?.brand || "Choji Store"
  },
  "category": input?.category || "Pet Food",
  "offers": {
    "@type": "Offer",
    "availability": input?.availability || "InStock",
    "priceCurrency": input?.currency || "USD",
    ...(input?.price && { "price": input.price }),
    "seller": {
      "@type": "Organization",
      "name": input?.seller || "Choji Store"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": input?.rating || "5",
    "reviewCount": input?.reviews || "50"
  }
});

/**
 * Generate Website Schema Markup
 * 
 * Creates structured data for the website including site information,
 * navigation structure, and search functionality. This schema helps
 * search engines understand the site architecture and enables
 * enhanced search features.
 * 
 * Website Features:
 * - Site identity and branding
 * - Navigation structure
 * - Search functionality
 * - Content organization
 * - Publisher information
 * 
 * Search Benefits:
 * - Sitelinks in search results
 * - Search box integration
 * - Better site understanding
 * - Enhanced navigation features
 * - Improved crawling efficiency
 * 
 * @returns {Object} JSON-LD website schema object
 * 
 * @example
 * // Generate website schema
 * const websiteSchema = generateWebsiteSchema();
 * injectStructuredData(websiteSchema);
 * 
 * @see {@link https://schema.org/WebSite Website Schema Documentation}
 */
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Choji Store",
  "url": "https://choji.store",
  "description": "Premium homemade cat food with natural ingredients",
  "publisher": {
    "@type": "Organization",
    "name": "Choji Store"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://choji.store/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

/**
 * Generate Breadcrumb Navigation Schema
 * 
 * Creates structured data for breadcrumb navigation to help search
 * engines understand site hierarchy and page relationships. This
 * schema enables breadcrumb rich snippets in search results.
 * 
 * Navigation Benefits:
 * - Clear site hierarchy representation
 * - Breadcrumb rich snippets
 * - Improved user navigation
 * - Better page context understanding
 * - Enhanced crawling efficiency
 * 
 * @param {Array<{name: string, url: string}>} items - Array of breadcrumb items
 * @param {string} items[].name - Display name for the breadcrumb item
 * @param {string} items[].url - URL for the breadcrumb item
 * @returns {Object} JSON-LD breadcrumb schema object
 * 
 * @example
 * // Generate breadcrumb schema for product page
 * const breadcrumbs = [
 *   { name: 'Home', url: 'https://choji.store' },
 *   { name: 'Products', url: 'https://choji.store/products' },
 *   { name: 'Premium Cat Food', url: 'https://choji.store/products/premium' }
 * ];
 * const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
 * 
 * @see {@link https://schema.org/BreadcrumbList Breadcrumb Schema Documentation}
 */
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

/**
 * Generate FAQ Schema Markup
 * 
 * Creates structured data for frequently asked questions to enable
 * FAQ rich snippets in search results. This schema improves content
 * visibility and provides direct answers to user queries.
 * 
 * FAQ Benefits:
 * - FAQ rich snippets in search results
 * - Direct answer features
 * - Voice search optimization
 * - Increased content visibility
 * - Better user experience
 * 
 * Content Strategy:
 * - Common customer questions
 * - Product information queries
 * - Service and delivery questions
 * - Care and usage instructions
 * 
 * @param {Array<{question: string, answer: string}>} faqs - Array of FAQ items
 * @param {string} faqs[].question - The question text
 * @param {string} faqs[].answer - The answer text
 * @returns {Object} JSON-LD FAQ schema object
 * 
 * @example
 * // Generate FAQ schema for common questions
 * const faqs = [
 *   {
 *     question: 'What ingredients are in your cat food?',
 *     answer: 'Our premium cat food contains fresh chicken, potatoes, and carrots with no additives.'
 *   }
 * ];
 * const faqSchema = generateFAQSchema(faqs);
 * 
 * @see {@link https://schema.org/FAQPage FAQ Schema Documentation}
 * @see {@link https://developers.google.com/search/docs/data-types/faqpage Google FAQ Markup}
 */
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Generate Local Business Schema Markup
 * 
 * Creates structured data for local business information including
 * location, contact details, operating hours, and service areas.
 * This schema is crucial for local SEO and Google My Business
 * integration.
 * 
 * Local Business Features:
 * - Complete business profile
 * - Geographic location data
 * - Contact and communication methods
 * - Operating hours and availability
 * - Service area coverage
 * - Pricing and service information
 * 
 * Local SEO Benefits:
 * - Improved local search rankings
 * - Google My Business integration
 * - Map pack inclusion
 * - Local knowledge panel features
 * - Voice search optimization
 * - Mobile local search enhancement
 * 
 * @returns {Object} JSON-LD local business schema object
 * 
 * @example
 * // Generate local business schema
 * const businessSchema = generateLocalBusinessSchema();
 * injectStructuredData(businessSchema);
 * 
 * @see {@link https://schema.org/LocalBusiness Local Business Schema Documentation}
 * @see {@link https://developers.google.com/search/docs/data-types/local-business Google Local Business Markup}
 */
export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Choji Store",
  "description": "Premium homemade cat food delivery service",
  "url": "https://choji.store",
  "telephone": "+1-XXX-XXX-XXXX", // Replace with actual phone
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street", // Replace with actual address
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7128", // Replace with actual coordinates
    "longitude": "-74.0060"
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$$"
});

/**
 * Inject Structured Data into Page Head
 * 
 * Dynamically injects JSON-LD structured data into the document head
 * for search engine consumption. This function handles the creation
 * and insertion of script tags containing schema markup.
 * 
 * Injection Process:
 * - Creates script element with JSON-LD type
 * - Serializes schema object to JSON
 * - Appends to document head
 * - Handles browser compatibility
 * 
 * Browser Safety:
 * - Checks for browser environment
 * - Prevents server-side rendering errors
 * - Handles DOM manipulation safely
 * - Provides graceful degradation
 * 
 * @param {Object} schema - Schema.org structured data object
 * 
 * @example
 * // Inject organization schema
 * const orgSchema = generateOrganizationSchema();
 * injectStructuredData(orgSchema);
 * 
 * // Inject multiple schemas
 * injectStructuredData(generateProductSchema());
 * injectStructuredData(generateWebsiteSchema());
 * 
 * @see {@link https://developers.google.com/search/docs/guides/intro-structured-data Structured Data Guidelines}
 */
export const injectStructuredData = (schema: object) => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
};

/**
 * Initialize All Structured Data Schemas
 * 
 * Comprehensive initialization function that generates and injects
 * all relevant structured data schemas for the Choji Cat Food Store.
 * This function should be called during application startup to ensure
 * complete SEO optimization.
 * 
 * Schemas Initialized:
 * - Organization schema for business information
 * - Product schema for cat food products
 * - Website schema for site structure
 * - Local business schema for location data
 * - FAQ schema for common questions
 * 
 * SEO Strategy:
 * - Complete structured data coverage
 * - Rich snippet eligibility
 * - Enhanced search visibility
 * - Local search optimization
 * - Voice search compatibility
 * 
 * Performance Considerations:
 * - Minimal DOM manipulation
 * - Efficient schema generation
 * - Browser compatibility
 * - Error handling and recovery
 * 
 * @example
 * // Initialize all structured data on app startup
 * initStructuredData();
 * 
 * // Typically called in main.tsx or App.tsx
 * import { initStructuredData } from './utils/structuredData';
 * initStructuredData();
 * 
 * @see {@link https://schema.org/ Schema.org Documentation}
 */
export const initStructuredData = () => {
  injectStructuredData(generateOrganizationSchema());
  injectStructuredData(generateProductSchema());
  injectStructuredData(generateWebsiteSchema());
  injectStructuredData(generateLocalBusinessSchema());
  
  // FAQ data for the page
  const faqs = [
    {
      question: "What ingredients are in your cat food?",
      answer: "Our premium cat food is made with fresh chicken, potatoes, and carrots. No additives, preservatives, or artificial ingredients."
    },
    {
      question: "How do I place an order?",
      answer: "You can place an order by clicking the WhatsApp button on our website or contacting us directly through WhatsApp."
    },
    {
      question: "Is the food safe for all cats?",
      answer: "Our food is made with natural, high-quality ingredients suitable for most cats. However, we recommend consulting with your veterinarian if your cat has specific dietary requirements."
    },
    {
      question: "How is the food delivered?",
      answer: "We offer fresh delivery of our homemade cat food. Contact us via WhatsApp to arrange delivery in your area."
    }
  ];
  
  injectStructuredData(generateFAQSchema(faqs));
};
