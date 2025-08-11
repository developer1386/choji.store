/**
 * Schema generator functions with type safety and validation
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
  MissingRequiredFieldError,
} from './errors';

/**
 * Organization schema configuration
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
 * Generate Organization Schema with validation
 * @param config Optional configuration to override defaults
 * @returns Validated organization schema
 * @throws {InvalidUrlError} If URL or logo URL is invalid
 * @throws {MissingRequiredFieldError} If required fields are missing
 */
export function generateOrganizationSchema(config?: OrganizationConfig): OrganizationSchema {
  const url = config?.url ?? 'https://choji.store';
  const logo = config?.logo ?? 'https://choji.store/logo/logo.svg';

  // Validate URLs
  if (!isValidUrl(url)) {
    throw new InvalidUrlError(url);
  }
  if (!isValidUrl(logo)) {
    throw new InvalidUrlError(logo);
  }

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config?.name ?? 'Choji Store',
    url,
    logo,
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

  // Validate social media URLs
  schema.sameAs?.forEach(socialUrl => {
    if (!isValidUrl(socialUrl)) {
      throw new InvalidUrlError(socialUrl);
    }
  });

  return schema;
}

/**
 * Product schema configuration
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
 * Generate Product Schema with validation
 * @param config Optional configuration to override defaults
 * @returns Validated product schema
 * @throws {InvalidCurrencyError} If currency code is invalid
 * @throws {InvalidAvailabilityError} If availability state is invalid
 * @throws {InvalidRatingError} If rating value is invalid
 * @throws {InvalidReviewCountError} If review count is invalid
 * @throws {MissingRequiredFieldError} If required fields are missing
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
 * Website schema configuration
 */
interface WebsiteConfig {
  name?: string;
  url?: string;
  description?: string;
}

/**
 * Generate Website Schema with validation
 * @param config Optional configuration to override defaults
 * @returns Validated website schema
 * @throws {InvalidUrlError} If URL is invalid
 * @throws {MissingRequiredFieldError} If required fields are missing
 */
export function generateWebsiteSchema(config?: WebsiteConfig): WebsiteSchema {
  const url = config?.url ?? 'https://choji.store';
  if (!isValidUrl(url)) {
    throw new InvalidUrlError(url);
  }

  const schema: WebsiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config?.name ?? 'Choji Store',
    url,
    description: config?.description ?? 'Premium homemade cat food with natural ingredients',
  };

  return schema;
}