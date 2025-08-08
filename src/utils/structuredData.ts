// SEO Structured Data (JSON-LD) utilities
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

export const generateProductSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Premium Homemade Cat Food",
  "description": "Fresh, natural cat food made with chicken, potatoes, and carrots. No additives or preservatives.",
  "brand": {
    "@type": "Brand",
    "name": "Choji Store"
  },
  "category": "Pet Food",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "seller": {
      "@type": "Organization",
      "name": "Choji Store"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "50"
  }
});

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

// Helper function to inject structured data into the page
export const injectStructuredData = (schema: object) => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
};

// Initialize all structured data
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
