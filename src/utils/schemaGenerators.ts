/**
 * @fileoverview Schema generator functions for creating validated JSON-LD structured data
 * 
 * This module provides a set of strongly-typed functions for generating schema.org
 * structured data with built-in validation. Each generator function creates a specific
 * type of schema (Organization, Product, or Website) with proper TypeScript types
 * and runtime validation.
 * 
 * Features:
 * - Type-safe schema generation with TypeScript
 * - Runtime validation of required fields
 * - URL validation for all URL fields
 * - Currency code validation
 * - Availability state validation
 * - Rating value validation
 * - Review count validation
 * - Default values for all fields
 * 
 * @example
 * ```typescript
 * // Generate a basic organization schema
 * const orgSchema = generateOrganizationSchema();
 * 
 * // Generate a product schema with custom values
 * const productSchema = generateProductSchema({
 *   name: 'Custom Product',
 *   priceCurrency: 'USD',
 *   ratingValue: '4.5'
 * });
 * ```
 */

import {
  type OrganizationSchema,
  type ProductSchema,
  type WebsiteSchema,
  type CurrencyCode,
  type AvailabilityState,
} from './types';

import {
  isValidUrl,
  isValidCurrency,
  isValidAvailability,
  isValidRating,
  isValidReviewCount,
} from './validators';

import {
  InvalidUrlError,
  InvalidCurrencyError,
  InvalidAvailabilityError,
  InvalidRatingError,
  InvalidReviewCountError,
} from './errors';

/**
 * Configuration options for generating an Organization schema
 * 
 * All fields are optional and have sensible defaults for Choji Store.
 * When not provided, default branding and contact information will be used.
 * 
 * @interface OrganizationConfig
 * @property {string} [name] - The name of the organization. Defaults to "Choji Store"
 * @property {string} [url] - The organization's website URL. Defaults to "https://choji.store"
 * @property {string} [logo] - URL of the organization's logo. Defaults to Choji Store logo
 * @property {string} [description] - Brief description of the organization. Defaults to product description
 * @property {string} [phone] - Customer service contact number. Defaults to placeholder
 * @property {string[]} [socialMedia] - Array of social media profile URLs. Defaults to Choji Store profiles
 * 
 * @example
 * ```typescript
 * const config: OrganizationConfig = {
 *   name: "My Store",
 *   url: "https://mystore.com",
 *   logo: "https://mystore.com/logo.png",
 *   phone: "+1-555-123-4567"
 * };
 * ```
 */
interface OrganizationConfig {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  phone?: string;
  socialMedia?: string[];
}

/**
 * Generates a validated Organization schema with the specified configuration
 * 
 * Creates a schema.org Organization representation with proper JSON-LD structure.
 * All URLs (main URL, logo, social media) are validated before the schema is returned.
 * 
 * Features:
 * - Automatic generation of required schema.org context and type
 * - URL validation for all web addresses
 * - Social media profile validation
 * - Default branding and contact information
 * - TypeScript type safety
 * 
 * @param {OrganizationConfig} [config] - Optional configuration to customize the schema
 * @returns {OrganizationSchema} A validated organization schema ready for use
 * @throws {InvalidUrlError} If any URL (main URL, logo URL, or social media URLs) is invalid
 * 
 * @example
 * ```typescript
 * // Basic usage with defaults
 * const schema = generateOrganizationSchema();
 * 
 * // Custom configuration
 * const schema = generateOrganizationSchema({
 *   name: "My Store",
 *   url: "https://mystore.com",
 *   socialMedia: ["https://facebook.com/mystore"]
 * });
 * ```
 */
import { schemaCache } from './schemaCache';

export function generateOrganizationSchema(config?: OrganizationConfig): OrganizationSchema {
  // Check cache first
  const cached = schemaCache.get<OrganizationSchema>('organization', config);
  if (cached) {
    return cached;
  }

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config?.name ?? 'Choji Store',
    url: config?.url ?? 'https://choji.store',
    logo: config?.logo ?? 'https://choji.store/logo/logo.svg',
    description: config?.description ?? 'Premium homemade cat food made with fresh, natural ingredients',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: config?.phone ?? '+1-XXX-XXX-XXXX',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: config?.socialMedia ?? [
      'https://www.facebook.com/chojistore',
      'https://www.instagram.com/chojistore',
      'https://twitter.com/chojistore',
    ],
  };

  // Validate required URLs
  if (!schema.url || !isValidUrl(schema.url)) {
    throw new InvalidUrlError(
      `Organization URL "${schema.url}" is invalid. Must be a valid HTTP(S) URL.`
    );
  }

  if (!schema.logo || !isValidUrl(schema.logo)) {
    throw new InvalidUrlError(
      `Organization logo URL "${schema.logo}" is invalid. Must be a valid HTTP(S) URL pointing to an image.`
    );
  }

  // Validate social media URLs with descriptive errors
  schema.sameAs?.forEach((socialUrl, index) => {
    if (!isValidUrl(socialUrl)) {
      throw new InvalidUrlError(
        `Social media URL "${socialUrl}" at index ${index} is invalid. Must be a valid HTTP(S) URL.`
      );
    }
  });

  // Cache the validated schema
  schemaCache.set('organization', schema, config);

  return schema;
}

/**
 * Configuration options for generating a Product schema
 * 
 * All fields are optional and have defaults suitable for Choji Store products.
 * Currency codes and availability states are strictly typed for validation.
 * 
 * @interface ProductConfig
 * @property {string} [name] - Product name. Defaults to "Premium Homemade Cat Food"
 * @property {string} [description] - Detailed product description
 * @property {string} [brandName] - Brand name. Defaults to "Choji Store"
 * @property {string} [category] - Product category. Defaults to "Pet Food"
 * @property {CurrencyCode} [priceCurrency] - ISO 4217 currency code (e.g., "USD", "EUR")
 * @property {AvailabilityState} [availability] - schema.org availability state
 * @property {string} [ratingValue] - Product rating (0-5). Defaults to "5"
 * @property {string} [reviewCount] - Number of reviews. Defaults to "50"
 * 
 * @example
 * ```typescript
 * const config: ProductConfig = {
 *   name: "Organic Cat Food",
 *   priceCurrency: "USD",
 *   availability: "https://schema.org/InStock",
 *   ratingValue: "4.8",
 *   reviewCount: "100"
 * };
 * ```
 */
interface ProductConfig {
  name?: string;
  description?: string;
  brandName?: string;
  category?: string;
  priceCurrency?: CurrencyCode;
  availability?: AvailabilityState;
  ratingValue?: string;
  reviewCount?: string;
}

/**
 * Generates a validated Product schema with the specified configuration
 * 
 * Creates a schema.org Product representation with proper JSON-LD structure.
 * Performs extensive validation on all fields including currency codes,
 * availability states, rating values, and review counts.
 * 
 * Features:
 * - Automatic generation of required schema.org context and type
 * - Currency code validation (ISO 4217)
 * - Availability state validation (schema.org states)
 * - Rating value validation (0-5 range)
 * - Review count validation (non-negative integers)
 * - Default product information
 * - TypeScript type safety
 * 
 * Validation Rules:
 * - Currency codes must be valid ISO 4217 codes (e.g., "USD", "EUR")
 * - Availability must be a valid schema.org availability state
 * - Rating values must be between 0 and 5
 * - Review counts must be non-negative integers
 * 
 * @param {ProductConfig} [config] - Optional configuration to customize the schema
 * @returns {ProductSchema} A validated product schema ready for use
 * @throws {InvalidCurrencyError} If the currency code is not a valid ISO 4217 code
 * @throws {InvalidAvailabilityError} If the availability state is not valid
 * @throws {InvalidRatingError} If the rating value is not between 0 and 5
 * @throws {InvalidReviewCountError} If the review count is not a valid non-negative integer
 * 
 * @example
 * ```typescript
 * // Basic usage with defaults
 * const schema = generateProductSchema();
 * 
 * // Custom configuration
 * const schema = generateProductSchema({
 *   name: "Premium Cat Food",
 *   priceCurrency: "USD",
 *   availability: "https://schema.org/InStock",
 *   ratingValue: "4.8"
 * });
 * ```
 */
export function generateProductSchema(config?: ProductConfig): ProductSchema {
  const currency = (config?.priceCurrency ?? 'USD') as CurrencyCode;
  if (!isValidCurrency(currency)) {
    throw new InvalidCurrencyError(currency);
  }

  const availability = (config?.availability ?? 'https://schema.org/InStock') as AvailabilityState;
  if (!isValidAvailability(availability)) {
    throw new InvalidAvailabilityError(availability);
  }

  const ratingValue = config?.ratingValue ?? '5';
  if (!isValidRating(ratingValue)) {
    throw new InvalidRatingError(ratingValue);
  }

  const reviewCount = config?.reviewCount ?? '50';
  if (!isValidReviewCount(reviewCount)) {
    throw new InvalidReviewCountError(reviewCount);
  }

  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: config?.name ?? 'Premium Homemade Cat Food',
    description: config?.description ?? 'Fresh, natural cat food made with chicken, potatoes, and carrots. No additives or preservatives.',
    brand: {
      '@type': 'Brand',
      name: config?.brandName ?? 'Choji Store',
    },
    category: config?.category ?? 'Pet Food',
    offers: {
      '@type': 'Offer',
      availability,
      priceCurrency: currency,
      seller: {
        '@type': 'Organization',
        name: config?.brandName ?? 'Choji Store',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
    },
  };

  return schema;
}

/**
 * Configuration options for generating a Website schema
 * 
 * All fields are optional and have defaults suitable for the Choji Store website.
 * The URL field is validated to ensure it's a properly formatted web address.
 * 
 * @interface WebsiteConfig
 * @property {string} [name] - Website name. Defaults to "Choji Store"
 * @property {string} [url] - Website URL. Defaults to "https://choji.store"
 * @property {string} [description] - Website description. Defaults to product description
 * 
 * @example
 * ```typescript
 * const config: WebsiteConfig = {
 *   name: "My Store Website",
 *   url: "https://mystore.com",
 *   description: "Premium products for your pets"
 * };
 * ```
 */
interface WebsiteConfig {
  name?: string;
  url?: string;
  description?: string;
}

/**
 * Generates a validated Website schema with the specified configuration
 * 
 * Creates a schema.org WebSite representation with proper JSON-LD structure.
 * The website URL is validated to ensure it's properly formatted.
 * 
 * Features:
 * - Automatic generation of required schema.org context and type
 * - URL validation
 * - Default website information
 * - TypeScript type safety
 * 
 * The WebSite schema is particularly useful for:
 * - Identifying your website to search engines
 * - Providing basic metadata about your site
 * - Improving SEO and search result presentation
 * 
 * @param {WebsiteConfig} [config] - Optional configuration to customize the schema
 * @returns {WebsiteSchema} A validated website schema ready for use
 * @throws {InvalidUrlError} If the website URL is not a valid URL
 * 
 * @example
 * ```typescript
 * // Basic usage with defaults
 * const schema = generateWebsiteSchema();
 * 
 * // Custom configuration
 * const schema = generateWebsiteSchema({
 *   name: "My Store",
 *   url: "https://mystore.com",
 *   description: "Premium pet products"
 * });
 * ```
 */
export function generateWebsiteSchema(config?: WebsiteConfig): WebsiteSchema {
  const schema: WebsiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config?.name ?? 'Choji Store',
    url: config?.url ?? 'https://choji.store',
    description: config?.description ?? 'Premium homemade cat food with natural ingredients',
  };

  // URL will never be undefined due to default value
  const url = schema.url!;

  if (!isValidUrl(url)) {
    throw new InvalidUrlError(url);
  }

  return schema;
}
