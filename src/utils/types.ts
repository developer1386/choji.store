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
 * Offer information for products following schema.org standards.
 * Represents pricing, availability, and seller information for a product.
 * @see {@link https://schema.org/Offer}
 */
export interface Offer {
  /** Fixed value 'Offer' for schema.org type */
  '@type': 'Offer';
  /** ISO 4217 currency code from VALID_CURRENCIES */
  priceCurrency: CurrencyCode;
  /** Schema.org availability state URL from VALID_AVAILABILITY_STATES */
  availability: AvailabilityState;
  /** Organization offering the product */
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
 * Valid availability values for product offers following schema.org standards.
 * These URLs are used in the Offer interface's availability field.
 * @see {@link https://schema.org/ItemAvailability}
 */
export const VALID_AVAILABILITY_STATES = [
  'https://schema.org/InStock',
  'https://schema.org/OutOfStock',
  'https://schema.org/PreOrder',
  'https://schema.org/Discontinued'
] as const;

/**
 * Valid ISO 4217 currency codes supported by the application.
 * Used in product offers and pricing information.
 * @see {@link https://en.wikipedia.org/wiki/ISO_4217}
 */
export const VALID_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] as const;

/**
 * Union type of valid schema.org availability state URLs.
 * Created from VALID_AVAILABILITY_STATES array for type safety.
 * @example
 * ```typescript
 * const state: AvailabilityState = 'https://schema.org/InStock';
 * ```
 */
export type AvailabilityState = typeof VALID_AVAILABILITY_STATES[number];

/**
 * Union type of supported ISO 4217 currency codes.
 * Created from VALID_CURRENCIES array for type safety.
 * @example
 * ```typescript
 * const currency: CurrencyCode = 'USD';
 * ```
 */
export type CurrencyCode = typeof VALID_CURRENCIES[number];
