/**
 * TypeScript type definitions for structured data schemas
 * 
 * This file contains type definitions for the structured data (JSON-LD)
 * schemas used in the application. These types ensure type safety and
 * provide better IDE support for schema development.
 */

/**
 * Base schema interface with common properties
 */
export interface BaseSchema {
  '@context': 'https://schema.org';
  '@type': string;
  name: string;
  url?: string;
  description?: string;
}

/**
 * Contact point information for organizations
 */
export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  availableLanguage?: string;
}

/**
 * Organization schema interface
 */
export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  logo: string;
  contactPoint?: ContactPoint;
  sameAs?: string[];
}

/**
 * Brand information for products
 */
export interface Brand {
  '@type': 'Brand';
  name: string;
}

/**
 * Offer information for products
 */
export interface Offer {
  '@type': 'Offer';
  priceCurrency: string;
  availability: string;
  seller: {
    '@type': 'Organization';
    name: string;
  };
}

/**
 * Aggregate rating information
 */
export interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
}

/**
 * Product schema interface
 */
export interface ProductSchema extends BaseSchema {
  '@type': 'Product';
  brand: Brand;
  category?: string;
  offers: Offer;
  aggregateRating?: AggregateRating;
}

/**
 * Website schema interface
 */
export interface WebsiteSchema extends BaseSchema {
  '@type': 'WebSite';
}

/**
 * Valid availability values for product offers
 */
export const VALID_AVAILABILITY_STATES = [
  'https://schema.org/InStock',
  'https://schema.org/OutOfStock',
  'https://schema.org/PreOrder',
  'https://schema.org/Discontinued'
] as const;

/**
 * Valid currency codes
 */
export const VALID_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] as const;

/**
 * Type for valid availability states
 */
export type AvailabilityState = typeof VALID_AVAILABILITY_STATES[number];

/**
 * Type for valid currency codes
 */
export type CurrencyCode = typeof VALID_CURRENCIES[number];