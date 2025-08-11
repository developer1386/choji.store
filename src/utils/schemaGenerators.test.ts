import { describe, it, expect } from 'vitest';
import {
  generateOrganizationSchema,
  generateProductSchema,
  generateWebsiteSchema,
} from './schemaGenerators';
import { type CurrencyCode, type AvailabilityState } from './types';
import {
  InvalidUrlError,
  InvalidCurrencyError,
  InvalidAvailabilityError,
  InvalidRatingError,
  InvalidReviewCountError,
} from './errors';

describe('Schema Generators', () => {
  describe('generateOrganizationSchema', () => {
    it('generates valid organization schema with defaults', () => {
      const schema = generateOrganizationSchema();
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Choji Store');
      expect(schema.url).toBe('https://choji.store');
      expect(schema.logo).toBe('https://choji.store/logo/logo.svg');
      expect(schema.contactPoint).toBeDefined();
      expect(schema.sameAs).toBeDefined();
    });

    it('accepts custom configuration', () => {
      const config = {
        name: 'Custom Store',
        url: 'https://example.com',
        logo: 'https://example.com/logo.png',
        description: 'Custom description',
        phone: '+1-123-456-7890',
        socialMedia: ['https://facebook.com/custom'],
      };
      const schema = generateOrganizationSchema(config);
      expect(schema.name).toBe(config.name);
      expect(schema.url).toBe(config.url);
      expect(schema.logo).toBe(config.logo);
      expect(schema.description).toBe(config.description);
      expect(schema.contactPoint?.telephone).toBe(config.phone);
      expect(schema.sameAs).toEqual(config.socialMedia);
    });

    it('throws on invalid URLs', () => {
      expect(() =>
        generateOrganizationSchema({ url: 'invalid-url' })
      ).toThrow(InvalidUrlError);
      expect(() =>
        generateOrganizationSchema({ logo: 'invalid-logo' })
      ).toThrow(InvalidUrlError);
      expect(() =>
        generateOrganizationSchema({
          socialMedia: ['https://valid.com', 'invalid-social'],
        })
      ).toThrow(InvalidUrlError);
    });
  });

  describe('generateProductSchema', () => {
    it('generates valid product schema with defaults', () => {
      const schema = generateProductSchema();
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('Premium Homemade Cat Food');
      expect(schema.offers.priceCurrency).toBe('USD');
      expect(schema.offers.availability).toBe('https://schema.org/InStock');
      expect(schema.aggregateRating?.ratingValue).toBe('5');
      expect(schema.aggregateRating?.reviewCount).toBe('50');
    });

    it('accepts custom configuration', () => {
      const config = {
        name: 'Custom Product',
        description: 'Custom description',
        brandName: 'Custom Brand',
        category: 'Custom Category',
        priceCurrency: 'EUR' as const,
        availability: 'https://schema.org/OutOfStock' as const,
        ratingValue: '4.5',
        reviewCount: '100',
      };
      const schema = generateProductSchema(config);
      expect(schema.name).toBe(config.name);
      expect(schema.description).toBe(config.description);
      expect(schema.brand.name).toBe(config.brandName);
      expect(schema.category).toBe(config.category);
      expect(schema.offers.priceCurrency).toBe(config.priceCurrency);
      expect(schema.offers.availability).toBe(config.availability);
      expect(schema.aggregateRating?.ratingValue).toBe(config.ratingValue);
      expect(schema.aggregateRating?.reviewCount).toBe(config.reviewCount);
    });

    it('throws on invalid currency', () => {
      expect(() =>
        generateProductSchema({ priceCurrency: 'INVALID' as CurrencyCode })
      ).toThrow(InvalidCurrencyError);
    });

    it('throws on invalid availability', () => {
      expect(() =>
        generateProductSchema({ availability: 'invalid' as AvailabilityState })
      ).toThrow(InvalidAvailabilityError);
    });

    it('throws on invalid rating value', () => {
      expect(() =>
        generateProductSchema({ ratingValue: '6' })
      ).toThrow(InvalidRatingError);
      expect(() =>
        generateProductSchema({ ratingValue: '-1' })
      ).toThrow(InvalidRatingError);
    });

    it('throws on invalid review count', () => {
      expect(() =>
        generateProductSchema({ reviewCount: '-1' })
      ).toThrow(InvalidReviewCountError);
      expect(() =>
        generateProductSchema({ reviewCount: 'abc' })
      ).toThrow(InvalidReviewCountError);
    });
  });

  describe('generateWebsiteSchema', () => {
    it('generates valid website schema with defaults', () => {
      const schema = generateWebsiteSchema();
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('Choji Store');
      expect(schema.url).toBe('https://choji.store');
      expect(schema.description).toBeDefined();
    });

    it('accepts custom configuration', () => {
      const config = {
        name: 'Custom Website',
        url: 'https://example.com',
        description: 'Custom description',
      };
      const schema = generateWebsiteSchema(config);
      expect(schema.name).toBe(config.name);
      expect(schema.url).toBe(config.url);
      expect(schema.description).toBe(config.description);
    });

    it('throws on invalid URL', () => {
      expect(() =>
        generateWebsiteSchema({ url: 'invalid-url' })
      ).toThrow(InvalidUrlError);
    });
  });
});
